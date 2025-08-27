import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const STRIPE_PRODUCT_ID = process.env.STRIPE_PRODUCT_ID!;
export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!;

export const createCheckoutSession = async (userId: string, email?: string) => {
  console.log('Creating checkout session for user:', { userId, email });

  // First, check if customer already exists
  const customers = await stripe.customers.list({
    email: email,
    limit: 1,
  });

  let customerId: string;

  if (customers.data.length > 0) {
    customerId = customers.data[0].id;
    console.log('Found existing customer:', customerId);
  } else {
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        userId: userId,
      },
    });
    customerId = customer.id;
    console.log('Created new customer:', customerId);
  }
  
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXTAUTH_URL}/plans?canceled=true`,
    metadata: {
      userId,
    },
    payment_method_types: ['card'],
    subscription_data: {
      metadata: {
        userId,
      },
    },
  });

  console.log('Checkout session created:', {
    sessionId: session.id,
    customerId: session.customer,
    metadata: session.metadata,
  });

  return session;
};

export const createCustomerPortalSession = async (customerId: string) => {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/dashboard`,
  });

  return session;
}; 