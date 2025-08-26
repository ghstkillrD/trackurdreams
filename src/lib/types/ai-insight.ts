export interface AiInsight {
  id: string;
  dreamId: string;
  insightText: string;
  geminiApiRequestPayload?: any;
  geminiApiResponseRaw?: any;
  generatedAt: string;
}

export interface AiInsightRequest {
  dreamText: string;
  mood?: string;
  tags?: string[];
}

export interface AiInsightResponse {
  themes: string[];
  emotions: string[];
  connections: string[];
  summary: string;
} 