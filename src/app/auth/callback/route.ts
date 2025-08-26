import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient, createAdminClient } from '@/lib/db/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/dashboard';

  if (code) {
    const supabase = await createServerComponentClient();
    const adminSupabase = createAdminClient();
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.user) {
      // Check if user exists in our users table using admin client
      const { data: existingUser } = await adminSupabase
        .from('users')
        .select('*')
        .eq('id', data.user.id)
        .single();

      if (!existingUser) {
        // Create user record in our users table using admin client
        const { error: userCreateError } = await adminSupabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email,
            auth_provider: data.user.app_metadata?.provider || 'email',
            provider_id: data.user.user_metadata?.sub || null,
          });

        if (userCreateError) {
          console.error('Error creating user record:', userCreateError);
        } else {
          // Create free subscription for new user using admin client
          const { error: subscriptionError } = await adminSupabase
            .from('user_subscriptions')
            .insert({
              user_id: data.user.id,
              product_id: 'free',
              status: 'free',
              insights_used_this_period: 0,
            });

          if (subscriptionError) {
            console.error('Error creating subscription:', subscriptionError);
          }
        }
      }

      // Successful authentication, redirect to dashboard
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // If there's an error or no code, redirect to home page
  return NextResponse.redirect(new URL('/', request.url));
}
