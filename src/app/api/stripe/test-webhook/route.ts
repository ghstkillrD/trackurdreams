import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/stripe-client';
import { createServerComponentClient } from '@/lib/db/supabase';

export async function GET() {
  try {
    const supabase = await createServerComponentClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Create a test subscription
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: {
        userId: user.id,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: process.env.STRIPE_PRICE_ID }],
      metadata: {
        userId: user.id,
      },
      expand: ['latest_invoice.payment_intent'],
    });

    return NextResponse.json({
      message: 'Test subscription created',
      customerId: customer.id,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error('Error creating test subscription:', error);
    return NextResponse.json(
      { error: 'Failed to create test subscription' },
      { status: 500 }
    );
  }
}
