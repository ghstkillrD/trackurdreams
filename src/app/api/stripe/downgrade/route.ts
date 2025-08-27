import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/db/supabase';
import { stripe } from '@/lib/stripe/stripe-client';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user's subscription
    const { data: subscription, error: subError } = await supabase
      .from('user_subscriptions')
      .select('stripe_subscription_id, stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    if (subError || !subscription?.stripe_subscription_id) {
      return NextResponse.json({ error: 'No active subscription found' }, { status: 404 });
    }

    // Cancel the subscription in Stripe immediately
    await stripe.subscriptions.cancel(subscription.stripe_subscription_id, {
      invoice_now: true,
      prorate: true,
    });

    // Update subscription in database
    const { error: updateError } = await supabase
      .from('user_subscriptions')
      .update({
        product_id: 'free',
        status: 'canceled',
        stripe_subscription_id: null,
        current_period_start: null,
        current_period_end: null,
        cancel_at_period_end: false,
        insights_used_this_period: 0,
      })
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating subscription:', updateError);
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 });
    }

    return NextResponse.json({ 
      message: 'Successfully downgraded to free tier',
      success: true
    });
  } catch (error) {
    console.error('Error downgrading subscription:', error);
    return NextResponse.json({ 
      error: 'Failed to downgrade subscription',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
