export interface Subscription {
  id: string;
  userId: string;
  productId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status: 'active' | 'canceled' | 'trialing' | 'free';
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd: boolean;
  insightsUsedThisPeriod: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  priceUsd: number;
  maxAiInsights: number;
  stripeProductId?: string;
  createdAt: string;
  updatedAt: string;
} 