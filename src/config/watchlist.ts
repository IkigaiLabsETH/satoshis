import { WatchlistConfig } from '@/types/watchlist';

export const watchlistConfig: WatchlistConfig = {
  cryptoIds: [
    // Major Layer 1s & Infrastructure
    'bitcoin', 'ethereum', 'solana', 'sui', 'stacks', 'aptos',
    
    // AI & Compute
    'bittensor', 'render-token', 'arweave', 'kaspa',
    
    // DeFi & Trading
    'hyperliquid', 'aave', 'uniswap', 'chainlink',
    
    // Emerging & High-Potential
    'sei-network', 'celestia', 'immutable-x', 'avalanche-2', 'polygon', 'cosmos',
    
    // Meme Coins & Viral Assets
    'pepe', 'shiba-inu', 'dogecoin', 'penguin-karts', 'rekt', 'ena',
    
    // Additional High-Momentum
    'cardano', 'polkadot', 'optimism', 'arbitrum', 'ordi'
  ],
  stockSymbols: [
    // Bitcoin Holdings & Mining
    'MSTR', 'MARA', 'RIOT', 'CLSK', 'WULF', 'HUT',
    
    // Exchanges & Trading
    'COIN', 'HOOD', 'CRCL',
    
    // Infrastructure & Services
    'IREN', 'CORZ', 'CIFR', 'GLXY',
    
    // Tech Giants with Crypto Exposure
    'TSLA', 'NVDA', 'AMD', 'SQ'
  ],
  timeframes: ['day', 'week'], // Focus on actionable timeframes for better performance
  grok4Timeout: 6000, // 6 seconds (reduced from 10)
  maxTopPerformers: 6
};

// Asset Categories for Better Analysis
export const ASSET_CATEGORIES = {
  LAYER_1S: ['bitcoin', 'ethereum', 'solana', 'sui', 'aptos'],
  AI_COMPUTE: ['bittensor', 'render-token', 'arweave', 'kaspa'],
  DEFI_TRADING: ['hyperliquid', 'aave', 'uniswap', 'chainlink'],
  EMERGING: ['sei-network', 'celestia', 'immutable-x', 'avalanche-2', 'polygon', 'cosmos'],
  MEME_VIRAL: ['pepe', 'shiba-inu', 'dogecoin', 'penguin-karts', 'rekt', 'ena'],
  BITCOIN_PLAY: ['stacks', 'ordi'],
  SCALING: ['optimism', 'arbitrum', 'cardano', 'polkadot']
} as const;

// Stock Categories
export const STOCK_CATEGORIES = {
  BITCOIN_HOLDINGS: ['MSTR'],
  MINING: ['MARA', 'RIOT', 'CLSK', 'WULF', 'HUT'],
  EXCHANGES: ['COIN', 'HOOD', 'CRCL'],
  INFRASTRUCTURE: ['IREN', 'CORZ', 'CIFR', 'GLXY'],
  TECH_GIANTS: ['TSLA', 'NVDA', 'AMD', 'SQ']
} as const;

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