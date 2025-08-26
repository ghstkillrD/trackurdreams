import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/db/supabase';
import { generateDreamInsight, formatInsightForDisplay } from '@/lib/ai/gemini-service';
import { FREE_INSIGHT_LIMIT } from '@/lib/constants/app-constants';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { dreamId } = body;

    if (!dreamId) {
      return NextResponse.json({ error: 'Dream ID is required' }, { status: 400 });
    }

    // Fetch the dream
    const { data: dream, error: dreamError } = await supabase
      .from('dreams')
      .select('*')
      .eq('id', dreamId)
      .eq('user_id', user.id)
      .single();

    if (dreamError || !dream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 });
    }

    // Check if dream already has an AI insight
    if (dream.has_ai_insight) {
      return NextResponse.json({ error: 'AI insight already exists for this dream' }, { status: 400 });
    }

    // Check user's subscription and insight limit
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 });
    }

    // Count existing AI insights for this user
    const { count: insightCount } = await supabase
      .from('ai_insights')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Check if user has reached their limit
    if (subscription.product_id === 'free' && insightCount && insightCount >= FREE_INSIGHT_LIMIT) {
      return NextResponse.json({ 
        error: `You've reached your free limit of ${FREE_INSIGHT_LIMIT} AI insights. Please upgrade to generate more insights.` 
      }, { status: 403 });
    }

    // Generate AI insight
    const aiRequest = {
      dreamText: dream.dream_text,
      mood: dream.mood,
      tags: dream.tags,
    };

    const aiResponse = await generateDreamInsight(aiRequest);
    const formattedInsight = formatInsightForDisplay(aiResponse);

    // Save the AI insight to the database
    const { data: savedInsight, error: saveError } = await supabase
      .from('ai_insights')
      .insert({
        dream_id: dreamId,
        user_id: user.id,
        insight_text: formattedInsight,
        themes: aiResponse.themes,
        emotions: aiResponse.emotions,
        connections: aiResponse.connections,
        summary: aiResponse.summary,
        generated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (saveError) {
      console.error('Error saving AI insight:', saveError);
      return NextResponse.json({ error: 'Failed to save AI insight' }, { status: 500 });
    }

    // Update the dream to mark it as having an AI insight
    const { error: updateError } = await supabase
      .from('dreams')
      .update({ has_ai_insight: true })
      .eq('id', dreamId);

    if (updateError) {
      console.error('Error updating dream:', updateError);
      // Don't fail the request, just log the error
    }

    return NextResponse.json({ 
      success: true, 
      insight: savedInsight,
      message: 'AI insight generated successfully!' 
    });

  } catch (error) {
    console.error('Error in POST /api/ai-insight:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
