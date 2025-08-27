import { createAdminClient } from './supabase';
import { Dream, CreateDreamRequest, UpdateDreamRequest } from '@/lib/types/dream';
import { User, UserProfile } from '@/lib/types/user';
import { Subscription, Product } from '@/lib/types/subscription';
import { AiInsight } from '@/lib/types/ai-insight';
import { FREE_INSIGHT_LIMIT } from '@/lib/constants/app-constants';

const supabase = createAdminClient();

// Dream queries
export async function getDreamsByUserId(userId: string): Promise<Dream[]> {
  const { data, error } = await supabase
    .from('dreams')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getDreamById(dreamId: string): Promise<Dream | null> {
  const { data, error } = await supabase
    .from('dreams')
    .select('*')
    .eq('id', dreamId)
    .single();

  if (error) throw error;
  return data;
}

export async function createDream(userId: string, dreamData: CreateDreamRequest): Promise<Dream> {
  const { data, error } = await supabase
    .from('dreams')
    .insert({
      user_id: userId,
      dream_date: dreamData.dreamDate,
      title: dreamData.title,
      dream_text: dreamData.dreamText,
      mood: dreamData.mood,
      tags: dreamData.tags,
      sleep_quality: dreamData.sleepQuality,
      has_ai_insight: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDream(dreamId: string, dreamData: UpdateDreamRequest): Promise<Dream> {
  const { data, error } = await supabase
    .from('dreams')
    .update({
      title: dreamData.title,
      dream_text: dreamData.dreamText,
      mood: dreamData.mood,
      tags: dreamData.tags,
      sleep_quality: dreamData.sleepQuality,
      updated_at: new Date().toISOString(),
    })
    .eq('id', dreamId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteDream(dreamId: string): Promise<void> {
  const { error } = await supabase
    .from('dreams')
    .delete()
    .eq('id', dreamId);

  if (error) throw error;
}

// User queries
export async function getUserById(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  // First get the subscription data
  const { data: subData, error: subError } = await supabase
    .from('user_subscriptions')
    .select(`
      status,
      product_id,
      stripe_customer_id,
      stripe_subscription_id,
      current_period_start,
      current_period_end,
      cancel_at_period_end,
      insights_used_this_period,
      created_at,
      products:product_id (
        id,
        name,
        max_ai_insights
      )
    `)
    .eq('user_id', userId)
    .single();

  if (subError) throw subError;

  // Get the count of dreams with AI insights for this user
  const { count: insightCount, error: countError } = await supabase
    .from('dreams')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('has_ai_insight', true);

  if (countError) throw countError;

  if (!subData) {
    // Return default free profile with actual insight count
    return {
      id: userId,
      email: '', // Will be filled from auth
      subscriptionStatus: 'free',
      product: 'free',
      insightCount: insightCount || 0,
      maxInsights: FREE_INSIGHT_LIMIT,
    };
  }

  return {
    id: userId,
    email: '', // Will be filled from auth
    subscriptionStatus: subData.status,
    product: subData.product_id,
    insightCount: insightCount || 0,
    maxInsights: subData.product_id === 'premium' ? -1 : FREE_INSIGHT_LIMIT, // -1 indicates unlimited
    subscriptionDetails: subData.product_id === 'premium' ? {
      currentPeriodStart: subData.created_at || new Date().toISOString(),
      currentPeriodEnd: subData.current_period_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      cancelAtPeriodEnd: false,
      stripeCustomerId: subData.stripe_customer_id || 'N/A',
      nextPaymentDate: subData.current_period_end || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    } : undefined
  };
}

// Subscription queries
export async function getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubscriptionInsightCount(userId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_insight_count', { user_uuid: userId });

  if (error) throw error;
}

// AI Insight queries
export async function getAiInsightByDreamId(dreamId: string): Promise<AiInsight | null> {
  const { data, error } = await supabase
    .from('ai_insights')
    .select('*')
    .eq('dream_id', dreamId)
    .single();

  if (error) throw error;
  return data;
}

export async function createAiInsight(dreamId: string, insightText: string, apiPayload?: any, apiResponse?: any): Promise<AiInsight> {
  const { data, error } = await supabase
    .from('ai_insights')
    .insert({
      dream_id: dreamId,
      insight_text: insightText,
      gemini_api_request_payload: apiPayload,
      gemini_api_response_raw: apiResponse,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateDreamHasAiInsight(dreamId: string): Promise<void> {
  const { error } = await supabase
    .from('dreams')
    .update({ has_ai_insight: true })
    .eq('id', dreamId);

  if (error) throw error;
} 