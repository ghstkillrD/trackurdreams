import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/db/supabase';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { dreamText, title, mood, tags, sleepQuality } = body;

    if (!dreamText || !dreamText.trim()) {
      return NextResponse.json({ error: 'Dream text is required' }, { status: 400 });
    }

    // Create the dream record
    const { data: dream, error: dreamError } = await supabase
      .from('dreams')
      .insert({
        user_id: user.id,
        dream_date: new Date().toISOString().split('T')[0], // Today's date
        title: title?.trim() || null,
        dream_text: dreamText.trim(),
        mood: mood || null,
        tags: tags?.length > 0 ? tags : null,
        sleep_quality: sleepQuality || null,
        has_ai_insight: false,
      })
      .select()
      .single();

    if (dreamError) {
      console.error('Error creating dream:', dreamError);
      return NextResponse.json({ error: 'Failed to create dream' }, { status: 500 });
    }

    // Create a free subscription for the user if they don't have one
    const { data: existingSubscription } = await supabase
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (!existingSubscription) {
      const { error: subscriptionError } = await supabase
        .from('user_subscriptions')
        .insert({
          user_id: user.id,
          product_id: 'free',
          status: 'free',
          insights_used_this_period: 0,
        });

      if (subscriptionError) {
        console.error('Error creating subscription:', subscriptionError);
        // Don't fail the dream creation if subscription creation fails
      }
    }

    return NextResponse.json({ 
      success: true, 
      dream,
      message: 'Dream saved successfully!' 
    });

  } catch (error) {
    console.error('Error in POST /api/dreams:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerComponentClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get URL parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Fetch dreams for the user
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
      .range(offset, offset + limit - 1);

    if (dreamsError) {
      console.error('Error fetching dreams:', dreamsError);
      return NextResponse.json({ error: 'Failed to fetch dreams' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      dreams: dreams || [] 
    });

  } catch (error) {
    console.error('Error in GET /api/dreams:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
