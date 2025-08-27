import { cookies } from 'next/headers';
import { createServerComponentClient } from '@/lib/db/supabase';
import { getUserProfile } from '@/lib/db/queries';
import { UserProfile } from '@/lib/types/user';

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDeleteProfile = async () => {
    if (!confirm("Are you absolutely sure? This action cannot be undone and will permanently delete all your dreams and insights.")) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch('/api/user/delete', {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete profile');
      }

      router.push('/');
    } catch (error) {
      console.error('Error deleting profile:', error);
      alert('Failed to delete profile. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
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

      {/* Delete Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-red-200">
        <h2 className="text-xl font-medium mb-4 text-red-600">Danger Zone</h2>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Deleting your profile will permanently remove all your data, including:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 ml-4 space-y-1">
            <li>All your recorded dreams</li>
            <li>AI insights and analysis</li>
            <li>Profile and subscription information</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400">
            This action cannot be undone.
          </p>
          <div className="pt-4">
            <button
              onClick={handleDeleteProfile}
              disabled={isDeleting}
              className={`px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors ${
                isDeleting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isDeleting ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting Profile...
                </div>
              ) : (
                'Delete Profile'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
