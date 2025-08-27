export interface User {
  id: string;
  email: string;
  authProvider: string;
  providerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  subscriptionStatus: string;
  product: string;
  insightCount: number;
  maxInsights: number;
} 