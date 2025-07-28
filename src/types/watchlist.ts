// Centralized types for watchlist functionality
export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image?: string;
}

export interface StockData {
  symbol: string;
  c: number; // current price
  d: number; // change
  dp: number; // change percent
  h: number; // high
  l: number; // low
  o: number; // open
  pc: number; // previous close
  v: number; // volume
}

export interface NewsData {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  impact_score?: number;
  category?: string;
  keywords?: string[];
}

export interface MarketPrediction {
  timeframe: string;
  btcPrediction: {
    price: number;
    change: number;
    confidence: number;
    reasoning: string;
  };
  topPerformers: {
    asset: string;
    symbol: string;
    predictedOutperformance: number;
    confidence: number;
    reasoning: string;
    type: 'crypto' | 'stock';
  }[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface MarketState {
  fearGreedIndex: number;
  trend: 'up' | 'down' | 'sideways';
  volatility: number;
  bullMarketPeakSignals: {
    peakRisk: 'low' | 'medium' | 'high' | 'extreme';
  };
}

export interface GlobalMarketData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number; eth: number };
    market_cap_change_percentage_24h_usd?: number;
    active_cryptocurrencies: number;
    market_cap_rank: number;
  };
}

// Configuration types
export interface WatchlistConfig {
  cryptoIds: string[];
  stockSymbols: string[];
  timeframes: string[];
  grok4Timeout: number;
  maxTopPerformers: number;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
  source?: string;
} 