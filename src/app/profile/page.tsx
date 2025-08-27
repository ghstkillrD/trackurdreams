import { cookies } from 'next/headers';
import { createServerComponentClient } from '@/lib/db/supabase';
import { getUserProfile } from '@/lib/db/queries';
import { UserProfile } from '@/lib/types/user';

async function getProfile() {
  const supabase = await createServerComponentClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }

  const profile = await getUserProfile(user.id);
  return {
    ...profile,
    email: user.email,
  };
}

export default async function ProfilePage() {
  const profile = await getProfile();

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
        <h2 className="text-xl font-medium mb-4">Subscription Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100 capitalize">{profile.subscriptionStatus}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">AI Insights Usage</label>
            <p className="mt-1 text-gray-900 dark:text-gray-100">
              {profile.insightCount} / {profile.maxInsights} used this period
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
