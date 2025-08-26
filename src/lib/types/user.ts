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
  subscriptionStatus: 'free' | 'premium';
  insightCount: number;
  maxInsights: number;
} 