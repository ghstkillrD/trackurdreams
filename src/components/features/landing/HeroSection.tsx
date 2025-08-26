'use client';

import { Sparkles, Moon, Brain } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-shimmering-gold via-soft-mint to-shimmering-gold bg-clip-text text-transparent animate-glow">
          Track ur Dreams
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
          Unlock the Secrets of Your Subconscious
        </p>
        
        {/* Description */}
        <div className="max-w-3xl mx-auto mb-12">
          <p className="text-lg text-gray-600 leading-relaxed">
            Record your dreams and gain AI-powered insights to understand your subconscious mind. 
            Track patterns, emotions, and discover meaningful connections to your waking life.
          </p>
        </div>
        
        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="dreamy-card p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
              <Moon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Dream Tracking</h3>
            <p className="text-gray-600">Easily record and organize your dreams with rich metadata</p>
          </div>
          
          <div className="dreamy-card p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Insights</h3>
            <p className="text-gray-600">Get gentle, reflective analysis powered by advanced AI</p>
          </div>
          
          <div className="dreamy-card p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Pattern Discovery</h3>
            <p className="text-gray-600">Identify recurring themes and emotional patterns over time</p>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">
            Ready to explore your dreams? Start your journey below.
          </p>
        </div>
      </div>
    </section>
  );
} 