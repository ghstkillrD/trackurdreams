'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { createClientComponentClient } from '@/lib/db/supabase';
import type { UserProfile } from '@/lib/types/user';

interface SubscriptionContextType {
  userProfile: UserProfile | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  userProfile: null,
  loading: true,
  error: null,
  refreshProfile: async () => {},
});

export function useSubscription() {
  return useContext(SubscriptionContext);
}

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserProfile(null);
        return;
      }

      const response = await fetch('/api/user');
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const profile = await response.json();
      setUserProfile(profile);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      fetchUserProfile();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    userProfile,
    loading,
    error,
    refreshProfile: fetchUserProfile,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}
