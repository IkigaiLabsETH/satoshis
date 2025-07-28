import { WatchlistConfig } from '@/types/watchlist';

export const watchlistConfig: WatchlistConfig = {
  cryptoIds: [
    'bitcoin', 'ethereum', 'solana', 'bittensor', 'arweave', 'kaspa', 
    'hyperliquid', 'render-token', 'sui', 'penguin-karts', 'rekt', 'ena', 
    'pepe', 'shiba-inu', 'dogecoin', 'cardano', 'polkadot', 'chainlink', 
    'avalanche-2', 'polygon', 'cosmos', 'uniswap', 'aptos', 'optimism', 
    'arbitrum', 'stacks', 'ordi', 'sei-network', 'celestia', 'immutable-x'
  ],
  stockSymbols: [
    'MSTR', 'COIN', 'HOOD', 'CRCL', 'IREN', 'CORZ', 'CIFR', 'RIOT', 
    'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY', 'SQ', 'TSLA', 'NVDA', 'AMD'
  ],
  timeframes: ['day', 'week', 'month', 'year'],
  grok4Timeout: 6000, // 6 seconds (reduced from 10)
  maxTopPerformers: 6
};

// API endpoints
export const API_ENDPOINTS = {
  COINGECKO_BASE: 'https://api.coingecko.com/api/v3',
  FINNHUB_BASE: 'https://finnhub.io/api/v1',
  COINGECKO_SIMPLE_PRICE: 'https://api.coingecko.com/api/v3/simple/price',
  COINGECKO_MARKETS: 'https://api.coingecko.com/api/v3/coins/markets',
  COINGECKO_GLOBAL: 'https://api.coingecko.com/api/v3/global'
} as const;

// Market philosophy constants
export const MARKET_PHILOSOPHY = {
  TWO_YEAR_MA_MULTIPLIER: 0.6,
  TWO_YEAR_MA_X5_MULTIPLIER: 5,
  MILLENNIAL_ADOPTION: '49% of Millennials comfortable with crypto',
  WEALTH_TRANSFER: '$90T wealth transfer by 2044',
  EXPONENTIAL_AGE: 'Metcalfe\'s Law vs mean reversion'
} as const;

// Timeframe multipliers for predictions
export const TIMEFRAME_MULTIPLIERS = {
  day: 1,
  week: 7,
  month: 30,
  year: 365
} as const;

// Performance thresholds
export const PERFORMANCE_THRESHOLDS = {
  MARKET_STRENGTH_BULLISH: 0.6,
  MARKET_STRENGTH_BEARISH: 0.4,
  BASE_CHANGE_MULTIPLIER: 0.1,
  CRYPTO_OUTPERFORMANCE_BASE: 1.5,
  STOCK_OUTPERFORMANCE_BASE: 1.2,
  CONFIDENCE_DECAY: 5
} as const; 