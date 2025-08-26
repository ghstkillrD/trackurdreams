'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';
import { MOODS, DREAM_TAGS, SLEEP_QUALITY_OPTIONS } from '@/lib/constants/app-constants';
import { createClientComponentClient } from '@/lib/db/supabase';

interface EditDreamPageProps {
  params: Promise<{
    dreamId: string;
  }>;
}

export default function EditDreamPage({ params }: EditDreamPageProps) {
  const [dreamId, setDreamId] = useState<string>('');
  const [dreamText, setDreamText] = useState('');
  const [title, setTitle] = useState('');
  const [mood, setMood] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [sleepQuality, setSleepQuality] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // Load dream data
  useEffect(() => {
    const loadDream = async () => {
      try {
        const { dreamId: id } = await params;
        setDreamId(id);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/');
          return;
        }

        const { data: dream, error: dreamError } = await supabase
          .from('dreams')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (dreamError || !dream) {
          setError('Dream not found');
          return;
        }

        // Populate form with existing dream data
        setDreamText(dream.dream_text || '');
        setTitle(dream.title || '');
        setMood(dream.mood || '');
        setTags(dream.tags || []);
        setSleepQuality(dream.sleep_quality || undefined);
      } catch (error) {
        console.error('Error loading dream:', error);
        setError('Failed to load dream');
      } finally {
        setIsLoading(false);
      }
    };

    loadDream();
  }, [params, router, supabase.auth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dreamText.trim()) return;

    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await fetch(`/api/dreams/${dreamId}`, {
        method: 'PUT',
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
        throw new Error(result.error || 'Failed to update dream');
      }

      // Success! Show success message
      setSuccess(true);
      
      // Redirect to dream detail page after a short delay
      setTimeout(() => {
        router.push(`/dashboard/${dreamId}`);
      }, 2000);
    } catch (error: any) {
      console.error('Error updating dream:', error);
      setError(error.message || 'Error updating dream. Please try again.');
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center animate-spin">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-600">Loading dream...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="dreamy-button"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

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
            Back
          </button>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Edit Your Dream
            </h1>
            <p className="text-gray-600">
              Update the details of your dream
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5" />
              Dream updated successfully! Redirecting...
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
                      Updating Dream...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Update Dream
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
