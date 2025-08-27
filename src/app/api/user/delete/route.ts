import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
      });
    }

    // Delete all user data in this order:
    // 1. AI Insights
    await supabase
      .from('ai_insights')
      .delete()
      .eq('dream_user_id', user.id);

    // 2. Dreams
    await supabase
      .from('dreams')
      .delete()
      .eq('user_id', user.id);

    // 3. Subscription details
    await supabase
      .from('subscription_details')
      .delete()
      .eq('user_id', user.id);

    // 4. User profile
    await supabase
      .from('user_profiles')
      .delete()
      .eq('id', user.id);

    // 5. Finally, delete the user auth record
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({ message: 'Profile deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting profile:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to delete profile' }),
      { status: 500 }
    );
  }
}
