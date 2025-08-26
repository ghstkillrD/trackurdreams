import { createServerComponentClient } from '@/lib/db/supabase';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createServerComponentClient();
  
  // Check if user is authenticated
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    redirect('/');
  }

  // Fetch user's dreams
  const { data: dreams, error: dreamsError } = await supabase
    .from('dreams')
    .select(`
      *,
      ai_insights (
        id,
        insight_text,
        generated_at
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(10);

  if (dreamsError) {
    console.error('Error fetching dreams:', dreamsError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-lavender-mist via-misty-blue to-soft-pink">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Your Dream Journal
            </h1>
            <p className="text-gray-600">
              Welcome back! Here are your recent dreams and insights.
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="dreamy-button flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Dream
          </Link>
        </div>

        {/* Dreams Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {dreams && dreams.length > 0 ? (
            dreams.map((dream) => (
              <div key={dream.id} className="dreamy-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {dream.title || 'Untitled Dream'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(dream.dream_date).toLocaleDateString()}
                    </p>
                  </div>
                  {dream.mood && (
                    <span className="text-2xl">{dream.mood}</span>
                  )}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {dream.dream_text}
                </p>

                {dream.tags && dream.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {dream.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-lavender-mist/50 text-gray-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <Link
                    href={`/dashboard/${dream.id}`}
                    className="text-shimmering-gold hover:underline text-sm font-medium"
                  >
                    View Details
                  </Link>
                  
                  {dream.has_ai_insight ? (
                    <div className="flex items-center gap-1 text-soft-mint text-sm">
                      <Sparkles className="w-4 h-4" />
                      AI Insight
                    </div>
                  ) : (
                    <button className="text-gray-400 text-sm">
                      No insight yet
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-shimmering-gold to-soft-mint rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No dreams yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start your dream journey by recording your first dream
              </p>
              <Link
                href="/dashboard/new"
                className="dreamy-button inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Record Your First Dream
              </Link>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {dreams && dreams.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="dreamy-card p-6 text-center">
              <div className="text-3xl font-bold text-shimmering-gold mb-2">
                {dreams.length}
              </div>
              <div className="text-gray-600">Total Dreams</div>
            </div>
            <div className="dreamy-card p-6 text-center">
              <div className="text-3xl font-bold text-soft-mint mb-2">
                {dreams.filter(d => d.has_ai_insight).length}
              </div>
              <div className="text-gray-600">AI Insights</div>
            </div>
            <div className="dreamy-card p-6 text-center">
              <div className="text-3xl font-bold text-lavender-mist mb-2">
                {new Date().toLocaleDateString()}
              </div>
              <div className="text-gray-600">Today's Date</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
