import { createServerComponentClient } from '@/lib/db/supabase';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Calendar, Star } from 'lucide-react';

interface DreamDetailPageProps {
  params: Promise<{
    dreamId: string;
  }>;
}

export default async function DreamDetailPage({ params }: DreamDetailPageProps) {
  const { dreamId } = await params;
  const supabase = await createServerComponentClient();
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/');
  }

  // Fetch the specific dream
  const { data: dream, error: dreamError } = await supabase
    .from('dreams')
    .select(`
      *,
      ai_insights (
        id,
        insight_text,
        generated_at
      )
    `)
    .eq('id', dreamId)
    .eq('user_id', user.id)
    .single();

  if (dreamError || !dream) {
    notFound();
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
          <div className="dreamy-card p-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">AI Insight</h2>
            </div>
            
            {dream.has_ai_insight && dream.ai_insights ? (
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-lavender-mist/20 to-misty-blue/20 p-6 rounded-lg border border-lavender-mist/30">
                  <p className="text-gray-700 leading-relaxed">
                    {dream.ai_insights.insight_text}
                  </p>
                  <div className="mt-4 text-sm text-gray-500">
                    Generated on {new Date(dream.ai_insights.generated_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ) : (
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
                <button className="dreamy-button">
                  Generate AI Insight
                </button>
              </div>
            )}
          </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
