'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/db/supabase';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Calendar, Star, Trash2, AlertTriangle } from 'lucide-react';
import AIInsightDisplay from '@/components/features/dream-view/AIInsightDisplay';

interface DreamDetailPageProps {
  params: Promise<{
    dreamId: string;
  }>;
}

interface Dream {
  id: string;
  title: string | null;
  dream_text: string;
  mood: string | null;
  tags: string[] | null;
  sleep_quality: number | null;
  dream_date: string;
  has_ai_insight: boolean;
  ai_insights?: {
    id: string;
    insight_text: string;
    generated_at: string;
  } | null;
}

export default function DreamDetailPage({ params }: DreamDetailPageProps) {
  const [dreamId, setDreamId] = useState<string>('');
  const [dream, setDream] = useState<Dream | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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

        const { data: dreamData, error: dreamError } = await supabase
          .from('dreams')
          .select(`
            *,
            ai_insights (
              id,
              insight_text,
              generated_at
            )
          `)
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (dreamError || !dreamData) {
          setError('Dream not found');
          return;
        }

        setDream(dreamData);
      } catch (error) {
        console.error('Error loading dream:', error);
        setError('Failed to load dream');
      } finally {
        setIsLoading(false);
      }
    };

    loadDream();
  }, [params, router, supabase.auth]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/dreams/${dreamId}`, {
        method: 'DELETE',
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete dream');
      }

      // Success! Redirect to dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error deleting dream:', error);
      setError(error.message || 'Error deleting dream. Please try again.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
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

  if (error || !dream) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error || 'Dream not found'}</p>
          <Link href="/dashboard" className="dreamy-button">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {dream.title || 'Untitled Dream'}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(dream.dream_date).toLocaleDateString()}</span>
              </div>
              {dream.sleep_quality && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{dream.sleep_quality}/5</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Dream Content */}
          <div className="dreamy-card p-8">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Your Dream</h2>
              {dream.mood && (
                <span className="text-3xl">{dream.mood}</span>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {dream.dream_text}
              </p>
            </div>

            {/* Tags */}
            {dream.tags && dream.tags.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {dream.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-lavender-mist/50 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Insight */}
          {dream.has_ai_insight && dream.ai_insights ? (
            <AIInsightDisplay
              insightText={dream.ai_insights.insight_text}
              generatedAt={dream.ai_insights.generated_at}
            />
          ) : (
            <div className="dreamy-card p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">AI Insight</h2>
              </div>
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  No AI Insight Yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Get an AI-powered analysis of your dream to discover hidden meanings and patterns.
                </p>
                <button 
                  onClick={async () => {
                    try {
                      const response = await fetch('/api/ai-insight', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ dreamId }),
                      });

                      const result = await response.json();

                      if (!response.ok) {
                        alert(result.error || 'Failed to generate AI insight');
                        return;
                      }

                      // Refresh the page to show the new insight
                      window.location.reload();
                    } catch (error) {
                      console.error('Error generating AI insight:', error);
                      alert('Error generating AI insight. Please try again.');
                    }
                  }}
                  className="dreamy-button"
                >
                  Generate AI Insight
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard/new"
              className="dreamy-button"
            >
              Record Another Dream
            </Link>
            <Link
              href={`/dashboard/${dreamId}/edit`}
              className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Edit Dream
            </Link>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-6 py-3 border border-red-300 rounded-full text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete Dream
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Delete Dream</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this dream? This action cannot be undone and will also remove any associated AI insights.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
