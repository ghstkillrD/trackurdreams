'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@/lib/db/supabase';
import { Sparkles, Check } from 'lucide-react';
import { AuthModal } from '@/components/shared/AuthModal';
import { FREE_INSIGHT_LIMIT, SUBSCRIPTION_PRICE_USD } from '@/lib/constants/app-constants';

export default function PlansPage() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleSubscribe = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setShowAuthModal(true);
      setIsLoading(false);
      return;
    }

    // Create Stripe checkout session
    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const session = await response.json();
      
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Choose Your Plan</h1>
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200">
          <div className="text-2xl font-semibold mb-4">Free Tier</div>
          <div className="text-3xl font-bold mb-6">$0 <span className="text-lg font-normal text-gray-600">/month</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Unlimited dream recording</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>{FREE_INSIGHT_LIMIT} AI insights</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Basic dream analytics</span>
            </li>
          </ul>
          <button
            disabled
            className="w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-lg cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-shimmering-gold relative">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-shimmering-gold text-white px-4 py-1 rounded-full text-sm">
            RECOMMENDED
          </div>
          <div className="text-2xl font-semibold mb-4">Unlimited Insights Premium</div>
          <div className="text-3xl font-bold mb-6">${SUBSCRIPTION_PRICE_USD} <span className="text-lg font-normal text-gray-600">/month</span></div>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Everything in Free Tier</span>
            </li>
            <li className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-shimmering-gold" />
              <span className="font-medium">Unlimited AI insights</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span>Advanced dream analytics</span>
            </li>
          </ul>
          <button
            onClick={handleSubscribe}
            disabled={isLoading}
            className="w-full px-6 py-3 bg-shimmering-gold text-white rounded-lg hover:bg-shimmering-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Subscribe Now
              </>
            )}
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => handleSubscribe()}
        mode="signup"
      />
    </div>
  );
}
