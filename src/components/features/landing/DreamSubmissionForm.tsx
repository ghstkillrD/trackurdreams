'use client';

import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { MOODS, DREAM_TAGS, SLEEP_QUALITY_OPTIONS } from '@/lib/constants/app-constants';
import { AuthModal } from '@/components/shared/AuthModal';
import { createClientComponentClient } from '@/lib/db/supabase';

export function DreamSubmissionForm() {
  const [dreamText, setDreamText] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [sleepQuality, setSleepQuality] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) return;

    setIsSubmitting(true);
    
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // User is not authenticated, show auth modal
        setAuthMode('signup');
        setShowAuthModal(true);
        setIsSubmitting(false);
        return;
      }

      // User is authenticated, submit the dream
      await submitDream();
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      alert('Error submitting dream. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitDream = async () => {
    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dreamText,
          title,
          mood,
          tags,
          sleepQuality,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit dream');
      }

      // Success! Clear form and redirect to dashboard
      alert('Dream submitted successfully! Redirecting to your dashboard...');
      setDreamText('');
      setTitle('');
      setMood('');
      setTags([]);
      setSleepQuality(undefined);
      
      // Redirect to dashboard
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Error submitting dream:', error);
      alert('Error submitting dream. Please try again.');
    }
  };

  const handleAuthSuccess = async () => {
    // User successfully authenticated, now submit the dream
    await submitDream();
  };

  const handleTagToggle = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="dreamy-card p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Share Your Dream
              </h2>
              <p className="text-gray-600">
                Describe your dream and get started on your journey of self-discovery
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dream Text */}
              <div>
                <label htmlFor="dreamText" className="block text-sm font-medium text-gray-700 mb-2">
                  What did you dream? *
                </label>
                <textarea
                  id="dreamText"
                  value={dreamText}
                  onChange={(e) => setDreamText(e.target.value)}
                  placeholder="Describe your dream in as much detail as you can remember..."
                  className="dreamy-input w-full h-32 resize-none"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Dream Title (optional)
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your dream a short name..."
                  className="dreamy-input w-full"
                />
              </div>

              {/* Mood */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How did this dream make you feel?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {MOODS.map((moodOption) => (
                    <button
                      key={moodOption.value}
                      type="button"
                      onClick={() => setMood(moodOption.value)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        mood === moodOption.value
                          ? 'border-shimmering-gold bg-shimmering-gold/10'
                          : 'border-gray-200 hover:border-lavender-mist'
                      }`}
                    >
                      <div className="text-2xl mb-1">{moodOption.emoji}</div>
                      <div className="text-xs text-gray-600">{moodOption.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {DREAM_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        tags.includes(tag)
                          ? 'bg-shimmering-gold text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-lavender-mist/50'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sleep Quality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep Quality
                </label>
                <div className="flex gap-2">
                  {SLEEP_QUALITY_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setSleepQuality(option.value)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        sleepQuality === option.value
                          ? 'border-shimmering-gold bg-shimmering-gold/10'
                          : 'border-gray-200 hover:border-lavender-mist'
                      }`}
                    >
                      <div className="text-lg">⭐</div>
                      <div className="text-xs text-gray-600">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting || !dreamText.trim()}
                  className="dreamy-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Unveil My Dream
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        mode={authMode}
        dreamData={{
          dreamText,
          title,
          mood,
          tags,
          sleepQuality,
        }}
      />
    </>
  );
} 