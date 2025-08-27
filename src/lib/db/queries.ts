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
  const { data, error } = await supabase
    .from('user_subscriptions')
    .select(`
      *,
      products:product_id (
        id,
        name,
        max_ai_insights
      )
    `)
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  if (!data) {
    // Return default free profile
    return {
      id: userId,
      email: '', // Will be filled from auth
      subscriptionStatus: 'free',
      insightCount: 0,
      maxInsights: FREE_INSIGHT_LIMIT,
    };
  }

  return {
    id: userId,
    email: '', // Will be filled from auth
    subscriptionStatus: data.status,
    product: data.product_id,
    insightCount: data.insights_used_this_period || 0,
    maxInsights: data.products?.max_ai_insights || FREE_INSIGHT_LIMIT,
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
  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      insights_used_this_period: supabase.rpc('increment', { row_id: 'insights_used_this_period' }),
    })
    .eq('user_id', userId);

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