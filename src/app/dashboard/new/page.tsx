'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { MOODS, DREAM_TAGS, SLEEP_QUALITY_OPTIONS } from '@/lib/constants/app-constants';
import { createClientComponentClient } from '@/lib/db/supabase';

export default function NewDreamPage() {
  const [dreamText, setDreamText] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [sleepQuality, setSleepQuality] = useState<number | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) return;

    setIsSubmitting(true);
    setError('');
    
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

      // Success! Clear form and show success message
      setSuccess(true);
      setDreamText('');
      setTitle('');
      setMood('');
      setTags([]);
      setSleepQuality(undefined);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting dream:', error);
      setError(error.message || 'Error submitting dream. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagToggle = (tag: string) => {
    setTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Record Your Dream
            </h1>
            <p className="text-gray-600">
              Capture the details of your dream and unlock insights
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Dream saved successfully! Redirecting to dashboard...
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Dream Form */}
        <div className="max-w-4xl mx-auto">
          <div className="dreamy-card p-8">
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
                      Saving Dream...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Save Dream
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
