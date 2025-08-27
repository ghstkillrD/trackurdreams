import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/db/supabase';
import { stripe } from '@/lib/stripe/stripe-client';
import Stripe from 'stripe';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    console.log('🔧 Debug - Webhook Secret:', webhookSecret?.substring(0, 5) + '...');
    console.log('🔧 Debug - Signature:', signature?.substring(0, 5) + '...');
    console.log('🔧 Debug - Raw body preview:', body.substring(0, 100) + '...');

    if (!signature || !webhookSecret) {
      console.error('❌ Error: Missing signature or webhook secret');
      return NextResponse.json(
        { error: 'Missing stripe-signature or webhook secret' },
        { status: 400 }
      );
    }

    try {
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );

      console.log('✅ Webhook event constructed successfully:', event.type);
      console.log('🔧 Debug - Event data:', JSON.stringify(event.data.object, null, 2));

      const supabase = createAdminClient();
      console.log('✅ Supabase admin client created');

      switch (event.type) {
        case 'checkout.session.completed': {
          console.log('🎯 Processing checkout.session.completed');
          const session = event.data.object as Stripe.Checkout.Session;
          const userId = session.metadata?.userId;
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          console.log('🔧 Debug - Session details:', {
            userId,
            customerId,
            subscriptionId,
            metadata: session.metadata
          });

          if (!userId || !customerId || !subscriptionId) {
            console.error('❌ Error: Missing required fields in session:', {
              hasUserId: !!userId,
              hasCustomerId: !!customerId,
              hasSubscriptionId: !!subscriptionId
            });
            return NextResponse.json(
              { error: 'Missing required fields' },
              { status: 400 }
            );
          }
          
          console.log('🔄 Retrieving subscription details from Stripe...');
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          console.log('✅ Retrieved subscription:', {
            status: subscription.status,
            periodStart: new Date(subscription.current_period_start * 1000),
            periodEnd: new Date(subscription.current_period_end * 1000)
          });
          
          // Fetch the product ID from our products table
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('id')
            .eq('stripe_product_id', subscription.items.data[0].price.product)
            .single();

          if (productError || !productData) {
            console.error('❌ Error fetching product:', productError);
            return NextResponse.json(
              { error: 'Error fetching product' },
              { status: 500 }
            );
          }
          
          // Safely convert timestamps
          const current_period_start = subscription.current_period_start 
            ? new Date(subscription.current_period_start * 1000).toISOString()
            : null;
          const current_period_end = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;

          const subscriptionData = {
            user_id: userId,
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            product_id: productData.id,
            status: subscription.status,
            current_period_start,
            current_period_end,
            cancel_at_period_end: subscription.cancel_at_period_end,
            insights_used_this_period: 0, // reset counter for new subscription
          };

          console.log('🔄 Upserting subscription data:', subscriptionData);
          
          // First, try to update existing subscription for this user
          const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update(subscriptionData)
            .eq('user_id', userId);
          
          if (updateError) {
            // If update failed, try to insert new subscription
            const { error: insertError } = await supabase
              .from('user_subscriptions')
              .insert(subscriptionData);

            if (insertError) {
              console.error('❌ Error creating subscription:', insertError);
              return NextResponse.json(
                { error: 'Error creating subscription' },
                { status: 500 }
              );
            }
          }
          
          console.log('✅ Successfully processed checkout.session.completed');
          break;
        }

        case 'customer.subscription.updated': {
          const subscription = event.data.object as Stripe.Subscription;
          const customerId = subscription.customer as string;
          const subscriptionId = subscription.id;

          // Get the product ID for this subscription
          const { data: productData, error: productError } = await supabase
            .from('products')
            .select('id')
            .eq('stripe_product_id', subscription.items.data[0].price.product)
            .single();

          if (productError || !productData) {
            console.error('❌ Error fetching product:', productError);
            return NextResponse.json(
              { error: 'Error fetching product' },
              { status: 500 }
            );
          }

          // Safely convert timestamps
          const current_period_start = subscription.current_period_start 
            ? new Date(subscription.current_period_start * 1000).toISOString()
            : null;
          const current_period_end = subscription.current_period_end
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;

          // Update subscription status
          const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update({
              status: subscription.status,
              product_id: productData.id,
              current_period_start,
              current_period_end,
              cancel_at_period_end: subscription.cancel_at_period_end,
            })
            .eq('stripe_subscription_id', subscriptionId);

          if (updateError) {
            console.error('❌ Error updating subscription:', updateError);
            return NextResponse.json(
              { error: 'Error updating subscription' },
              { status: 500 }
            );
          }

          console.log('✅ Successfully processed customer.subscription.updated');
          break;
        }

        case 'customer.subscription.deleted': {
          const subscription = event.data.object as Stripe.Subscription;
          const subscriptionId = subscription.id;

          // Update subscription to free tier
          const { error: updateError } = await supabase
            .from('user_subscriptions')
            .update({
              status: 'canceled',
              product_id: 'free',
              stripe_subscription_id: null,
              current_period_start: null,
              current_period_end: null,
              cancel_at_period_end: false,
              insights_used_this_period: 0,
            })
            .eq('stripe_subscription_id', subscriptionId);

          if (updateError) {
            console.error('❌ Error updating subscription:', updateError);
            return NextResponse.json(
              { error: 'Error updating subscription' },
              { status: 500 }
            );
          }

          console.log('✅ Successfully processed customer.subscription.deleted');
          break;
        }
      }

      return NextResponse.json({ received: true });
    } catch (err) {
      console.error('❌ Error constructing webhook event:', err);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error('❌ Error processing webhook:', err);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
