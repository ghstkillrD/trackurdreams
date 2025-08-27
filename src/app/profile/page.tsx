import { cookies } from 'next/headers';
import { createServerComponentClient } from '@/lib/db/supabase';
import { getUserProfile } from '@/lib/db/queries';
import { UserProfile } from '@/lib/types/user';

'use client';

import { useSubscription } from '@/providers/SubscriptionProvider';

export default function ProfilePage() {
  const { userProfile: profile, loading } = useSubscription();

  if (!profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please sign in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8">My Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-medium mb-4">User Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Email</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">{profile.email}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-medium mb-4">Subscription & Billing Details</h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
              <p className={`mt-1 capitalize ${
                profile.subscriptionStatus === 'active' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-gray-900 dark:text-gray-100'
              }`}>
                {profile.subscriptionStatus}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Current Plan</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100 capitalize">
                {profile.product === 'premium' ? '✨ Premium' : '🔹 Free Tier'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">AI Insights Usage</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">
                {profile.insightCount} {profile.product === 'premium' ? 'insights generated' : `/ ${profile.maxInsights} used this period`}
              </p>
            </div>
          </div>

          {profile.subscriptionDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Billing Period</label>
                <p className="mt-1 text-gray-900 dark:text-gray-100">
                  {new Date(profile.subscriptionDetails.currentPeriodStart!).toLocaleDateString()} - {new Date(profile.subscriptionDetails.currentPeriodEnd!).toLocaleDateString()}
                </p>
              </div>
              {!profile.subscriptionDetails.cancelAtPeriodEnd && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Next Payment</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100">
                    {new Date(profile.subscriptionDetails.nextPaymentDate!).toLocaleDateString()}
                  </p>
                </div>
              )}
              {profile.subscriptionDetails.lastPaymentDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Last Payment</label>
                  <p className="mt-1 text-gray-900 dark:text-gray-100">
                    {new Date(profile.subscriptionDetails.lastPaymentDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              {profile.subscriptionDetails.cancelAtPeriodEnd && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Subscription Status</label>
                  <p className="mt-1 text-red-600 dark:text-red-400">
                    Your subscription will end on {new Date(profile.subscriptionDetails.currentPeriodEnd!).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Customer ID</label>
                <p className="mt-1 text-gray-500 dark:text-gray-400 font-mono text-sm">
                  {profile.subscriptionDetails.stripeCustomerId}
                </p>
              </div>
            </div>
          ) : (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400">
                You are currently on the free tier. Upgrade to premium to unlock unlimited AI insights and more features.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
