import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@/lib/db/supabase';

interface RouteParams {
  params: Promise<{
    dreamId: string;
  }>;
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { dreamId } = await params;
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

    // First, verify the dream belongs to the user
    const { data: existingDream, error: dreamCheckError } = await supabase
      .from('dreams')
      .select('*')
      .eq('id', dreamId)
      .eq('user_id', user.id)
      .single();

    if (dreamCheckError || !existingDream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 });
    }

    // Update the dream record
    const { data: updatedDream, error: updateError } = await supabase
      .from('dreams')
      .update({
        title: title?.trim() || null,
        dream_text: dreamText.trim(),
        mood: mood || null,
        tags: tags?.length > 0 ? tags : null,
        sleep_quality: sleepQuality || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', dreamId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating dream:', updateError);
      return NextResponse.json({ error: 'Failed to update dream' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      dream: updatedDream,
      message: 'Dream updated successfully!' 
    });

  } catch (error) {
    console.error('Error in PUT /api/dreams/[dreamId]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { dreamId } = await params;
    const supabase = await createServerComponentClient();
    
    // Get the current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // First, verify the dream belongs to the user
    const { data: existingDream, error: dreamCheckError } = await supabase
      .from('dreams')
      .select('*')
      .eq('id', dreamId)
      .eq('user_id', user.id)
      .single();

    if (dreamCheckError || !existingDream) {
      return NextResponse.json({ error: 'Dream not found' }, { status: 404 });
    }

    // Delete the dream record (this will also delete associated AI insights due to CASCADE)
    const { error: deleteError } = await supabase
      .from('dreams')
      .delete()
      .eq('id', dreamId)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Error deleting dream:', deleteError);
      return NextResponse.json({ error: 'Failed to delete dream' }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true,
      message: 'Dream deleted successfully!' 
    });

  } catch (error) {
    console.error('Error in DELETE /api/dreams/[dreamId]:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
