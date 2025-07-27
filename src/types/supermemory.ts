export interface SupermemoryConfig {
  apiKey: string;
  baseUrl: string;
}

export interface SupermemoryMemory {
  id: string;
  content: string;
  metadata: {
    type: string;
    userId?: string;
    timestamp: string;
    source: string;
    category?: string;
    [key: string]: unknown;
  };
  status: string;
}

export interface SupermemorySearchResponse {
  memories: SupermemoryMemory[];
  total: number;
}

export interface UserPreference {
  type: 'user_preferences';
  userId: string;
  preferences: {
    timeframes: string[];
    favoriteAssets: string[];
    alertSettings: Record<string, unknown>;
    analysisStyle: string;
    [key: string]: unknown;
  };
}

export interface MarketAnalysis {
  type: 'market_analysis';
  symbol: string;
  timeframe: string;
  analysis: {
    prediction: string;
    confidence: number;
    indicators: string[];
    reasoning: string;
    [key: string]: unknown;
  };
  accuracy?: number;
}

export interface MarketEvent {
  type: 'market_event';
  severity: 'low' | 'medium' | 'high' | 'critical';
  event: {
    title: string;
    description: string;
    impact: string;
    [key: string]: unknown;
  };
  affectedAssets: string[];
}

export interface ChartInteraction {
  type: 'chart_interaction';
  symbol: string;
  timeframe: string;
  indicators: string[];
  interaction: {
    action: string;
    parameters: Record<string, unknown>;
    [key: string]: unknown;
  };
} 