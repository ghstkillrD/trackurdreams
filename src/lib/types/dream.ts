export interface Dream {
  id: string;
  userId: string;
  dreamDate: string;
  title?: string;
  dreamText: string;
  mood?: string;
  tags?: string[];
  sleepQuality?: number;
  hasAiInsight: boolean;
  createdAt: string;
  updatedAt: string;
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