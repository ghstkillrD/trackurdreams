export interface Dream {
  id: string;
  user_id: string;
  dream_date: string;
  title?: string;
  dream_text: string;
  mood?: string;
  tags?: string[];
  sleep_quality?: number;
  has_ai_insight: boolean;
  created_at: string;
  updated_at: string;
  ai_insights?: {
    id: string;
    insight_text: string;
    generated_at: string;
  } | null;
}

export interface CreateDreamRequest {
  dreamDate: string;
  title?: string;
  dreamText: string;
  mood?: string;
  tags?: string[];
  sleepQuality?: number;
}

export interface UpdateDreamRequest {
  title?: string;
  dreamText?: string;
  mood?: string;
  tags?: string[];
  sleepQuality?: number;
} 