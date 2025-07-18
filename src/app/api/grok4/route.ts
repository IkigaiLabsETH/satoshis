import { Grok4Service, enhancedWebSearch, getXSentiment, getCryptoPrice, getMarketData } from './grok4';
import { logger } from '@/lib/logger';
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/index";
import type { ChatCompletion } from "openai/resources/chat/completions";
import { performance } from 'perf_hooks';
import { NextResponse } from 'next/server';

// Configure API route timeout for Grok4 API calls
export const maxDuration = 60; // 60 seconds timeout

// Enhanced types for multi-modal support
type RequestBody = {
  message: string;
  systemPrompt?: string;
  temperature?: number;
  stream?: boolean;
  imageUrl?: string; // For vision capabilities
  generateImage?: boolean; // For image generation
  imagePrompt?: string; // For image generation prompts
  mode?: string; // Optional mode for GODMODE requests
};

type ImageGenerationRequest = {
  prompt: string;
  model?: string;
  size?: '1024x1024' | '1792x1024' | '1024x1792';
  quality?: 'standard' | 'hd';
  style?: 'vivid' | 'natural';
};

type BTCPriceCache = {
  price: number;
  timestamp: number;
};

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

// Constants
const BTC_CACHE_TTL = 2 * 60 * 1000; // 2 minutes
const PREDICTION_TIMEOUT = 5000;
const BTC_FETCH_TIMEOUT = 3000;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute
const MAX_MESSAGE_LENGTH = 2000; // Prevent extremely long messages

// Prioritized stocks from @/stocks components
const PRIORITIZED_STOCKS = {
  // Crypto-related stocks
  crypto: ['MSTR', 'COIN', 'HOOD', 'NVDA', 'TSLA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'CRCL', 'BLOCK', 'PYPL'],
  
  // Bitcoin mining stocks
  mining: ['IREN', 'CORZ', 'CIFR', 'RIOT', 'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY'],
  
  // High-growth watchlist stocks
  growth: ['QBTS', 'CRSP', 'RGTI', 'QUBT', 'KTOS', 'DRS', 'IONQ'],
  
  // Innovating equities
  innovation: ['IONQ', 'RGTI', 'QBTS', 'IBM', 'NVDA', 'MSFT', 'GOOGL', 'AMZN', 'PLTR', 'VRTX', 'REGN', 'CRSP', 'MRNA', 'LMT', 'RTX', 'NOC', 'KTOS', 'DRS', 'GD', 'BA', 'TSM'],
  
  // Nuclear energy stocks
  nuclear: ['CCJ', 'CEG', 'ETR', 'UEC'],
  
  // All prioritized stocks combined
  all: [
    // Crypto & Tech
    'MSTR', 'COIN', 'HOOD', 'NVDA', 'TSLA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'CRCL', 'BLOCK', 'PYPL',
    // Mining
    'IREN', 'CORZ', 'CIFR', 'RIOT', 'CLSK', 'WULF', 'HUT', 'MARA', 'GLXY',
    // Growth
    'QBTS', 'CRSP', 'RGTI', 'QUBT', 'KTOS', 'DRS', 'IONQ',
    // Innovation
    'IBM', 'PLTR', 'VRTX', 'REGN', 'MRNA', 'LMT', 'RTX', 'NOC', 'GD', 'BA', 'TSM',
    // Nuclear
    'CCJ', 'CEG', 'ETR', 'UEC'
  ]
};

// Remove duplicates and create final prioritized list
const PRIORITIZED_STOCK_LIST = Array.from(new Set(PRIORITIZED_STOCKS.all));

// --- Stock Symbol Extraction Utility ---
// Map of common company names/aliases to tickers for prioritized stocks
const STOCK_NAME_MAP: Record<string, string> = {
  'mstr': 'MSTR', 'microstrategy': 'MSTR',
  'coin': 'COIN', 'coinbase': 'COIN',
  'hood': 'HOOD', 'robinhood': 'HOOD',
  'nvda': 'NVDA', 'nvidia': 'NVDA',
  'tsla': 'TSLA', 'tesla': 'TSLA',
  'aapl': 'AAPL', 'apple': 'AAPL',
  'msft': 'MSFT', 'microsoft': 'MSFT',
  'googl': 'GOOGL', 'google': 'GOOGL',
  'amzn': 'AMZN', 'amazon': 'AMZN',
  'meta': 'META', 'facebook': 'META',
  'crcl': 'CRCL',
  'block': 'BLOCK', 'sq': 'BLOCK', 'square': 'BLOCK',
  'pypl': 'PYPL', 'paypal': 'PYPL',
  'iren': 'IREN', 'iris': 'IREN',
  'corz': 'CORZ',
  'cifr': 'CIFR',
  'riot': 'RIOT',
  'clsk': 'CLSK',
  'wulf': 'WULF',
  'hut': 'HUT',
  'mara': 'MARA',
  'glxy': 'GLXY', 'galaxy': 'GLXY',
  'qbts': 'QBTS',
  'crsp': 'CRSP', 'crispr': 'CRSP',
  'rgti': 'RGTI',
  'qubt': 'QUBT',
  'ktos': 'KTOS',
  'drs': 'DRS',
  'ionq': 'IONQ',
  'ibm': 'IBM',
  'pltr': 'PLTR', 'palantir': 'PLTR',
  'vrtx': 'VRTX',
  'regn': 'REGN',
  'mrna': 'MRNA',
  'lmt': 'LMT',
  'rtx': 'RTX',
  'noc': 'NOC',
  'gd': 'GD',
  'ba': 'BA',
  'tsm': 'TSM',
  'ccj': 'CCJ',
  'ceg': 'CEG',
  'etr': 'ETR',
  'uec': 'UEC',
};

// Build a regex for all prioritized tickers and company names
const STOCK_REGEX = new RegExp(
  Object.keys(STOCK_NAME_MAP)
    .concat(PRIORITIZED_STOCK_LIST.map(s => s.toLowerCase()))
    .sort((a, b) => b.length - a.length) // match longer names first
    .map(s => `\\b${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`).join('|'),
  'gi'
);

/**
 * Extracts prioritized stock symbols from a query string.
 * Returns an array of unique, uppercased tickers.
 */
function extractPrioritizedStockSymbols(query: string): string[] {
  const matches = query.match(STOCK_REGEX);
  if (!matches) return [];
  const tickers = matches.map(m => {
    const key = m.toLowerCase();
    return STOCK_NAME_MAP[key] || key.toUpperCase();
  });
  // Only return tickers that are in the prioritized list
  return Array.from(new Set(tickers.filter(t => PRIORITIZED_STOCK_LIST.includes(t))));
}

// Caches
let cachedBTCPrice: BTCPriceCache | null = null;
const rateLimitCache = new Map<string, RateLimitEntry>();

// Finnhub data caching (5 minute TTL)
interface FinnhubCacheEntry {
  data: unknown;
  timestamp: number;
}

const FINNHUB_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const finnhubCache = new Map<string, FinnhubCacheEntry>();

// Get cached Finnhub data
function getCachedFinnhubData(key: string): unknown | null {
  const entry = finnhubCache.get(key);
  if (entry && (Date.now() - entry.timestamp) < FINNHUB_CACHE_TTL) {
    return entry.data;
  }
  return null;
}

// Set cached Finnhub data (no longer used)
// function setCachedFinnhubData(key: string, data: unknown): void {
//   finnhubCache.set(key, {
//     data,
//     timestamp: Date.now()
//   });
// }

// Performance tracking
class PerformanceTracker {
  private timings: Record<string, number> = {};
  
  start(label: string) {
    this.timings[label] = performance.now();
  }
  
  end(label: string) {
    if (this.timings[label]) {
      this.timings[label] = performance.now() - this.timings[label];
    }
  }
  
  getTimings() {
    return this.timings;
  }
  
  logTimings() {
    logger.info('Step timings (ms):', this.timings);
  }
}

// Rate limiting for client requests
function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimitCache.get(clientId);
  
  if (!entry || now > entry.resetTime) {
    rateLimitCache.set(clientId, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Finnhub API rate limiting (30 calls/second)
const FINNHUB_RATE_LIMIT = 30; // calls per second
const FINNHUB_RATE_WINDOW = 1000; // 1 second window
const finnhubRateLimitCache = new Map<string, { count: number; resetTime: number }>();

function checkFinnhubRateLimit(): boolean {
  const now = Date.now();
  const key = 'finnhub_global';
  const entry = finnhubRateLimitCache.get(key);
  
  if (!entry || now > entry.resetTime) {
    finnhubRateLimitCache.set(key, {
      count: 1,
      resetTime: now + FINNHUB_RATE_WINDOW
    });
    return true;
  }
  
  if (entry.count >= FINNHUB_RATE_LIMIT) {
    return false;
  }
  
  entry.count++;
  return true;
}

// Wait for Finnhub rate limit if needed
async function waitForFinnhubRateLimit(): Promise<void> {
  while (!checkFinnhubRateLimit()) {
    await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms
  }
}

function getClientId(request: Request): string {
  // Use IP address or user agent as client identifier
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  return forwardedFor || realIp || userAgent.substring(0, 50);
}

// Input sanitization
function sanitizeMessage(message: string): string {
  // Remove potential XSS and limit length
  return message
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, MAX_MESSAGE_LENGTH)
    .trim();
}

// Query classification functions
function needsWebSearch(query: string): boolean {
  const webSearchKeywords = [
    'price', 'current', 'live', 'now', 'today', 'market', 'trading',
    'bitcoin', 'btc', 'ethereum', 'eth', 'crypto', 'cryptocurrency',
    'gm', 'good morning', 'morning'
  ];
  
  const queryLower = query.toLowerCase();
  return webSearchKeywords.some(keyword => queryLower.includes(keyword));
}

function isGMQuery(q: string): boolean {
  const gmKeywords = ['gm', 'good morning', 'morning'];
  const queryLower = q.toLowerCase().trim();
  return gmKeywords.some(keyword => queryLower.includes(keyword));
}

function isPricePredictionQuery(q: string): boolean {
  // Only trigger for actual prediction requests, not simple price queries
  const hasPredictionKeyword = /price target|prediction|end of q4|end of year|forecast|target|what will|going to|expect|projection/i.test(q);
  
  // Check for specific prediction patterns
  const isPredictionQuery = hasPredictionKeyword || 
    /what.*price.*(will|going|expect|target)/i.test(q) ||
    /(will|going|expect).*price.*(be|reach|hit)/i.test(q);
  
  return isPredictionQuery;
}

// BTC Price fetching with better error handling and retry logic
async function getFastBTCPrice(retryCount = 0): Promise<number | null> {
  const now = Date.now();
  if (cachedBTCPrice && (now - cachedBTCPrice.timestamp) < BTC_CACHE_TTL) {
    return cachedBTCPrice.price;
  }
  
  try {
    const resp = await Promise.race([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd', {
        headers: {
          'User-Agent': 'LiveTheLifeTV-Grok4/1.0',
          'Accept': 'application/json'
        }
      }),
      new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('BTC price fetch timeout')), BTC_FETCH_TIMEOUT)
      )
    ]);
    
    if (!resp.ok) {
      throw new Error(`BTC price API error: ${resp.status} ${resp.statusText}`);
    }
    
    const data = await resp.json();
    const price = data.bitcoin?.usd;
    
    if (typeof price === 'number' && price > 0) {
      cachedBTCPrice = { price, timestamp: now };
      logger.info('BTC price fetched successfully:', price);
      return price;
    } else {
      throw new Error('Invalid BTC price data');
    }
  } catch (error) {
    logger.error('BTC price fetch error:', error);
    
    // Retry once if it's a network error
    if (retryCount === 0 && error instanceof Error && error.message.includes('timeout')) {
      logger.info('Retrying BTC price fetch...');
      return getFastBTCPrice(1);
    }
    
    return cachedBTCPrice ? cachedBTCPrice.price : null;
  }
}

// Response helpers with CORS support
function createErrorResponse(message: string, status: number = 500): Response {
  return new Response(message, {
    status,
    headers: { 
      'Content-Type': 'text/plain; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function createSuccessResponse(content: string): Response {
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    },
  });
}

// Enhanced request validation
async function validateRequest(request: Request): Promise<RequestBody> {
    if (request.method !== 'POST') {
    throw new Error('Method not allowed');
    }

    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Content-Type must be application/json');
    }

  let body: RequestBody;
    try {
      body = await request.json();
  } catch {
    throw new Error('Invalid JSON in request body');
  }

  if (!body.message || typeof body.message !== 'string') {
    throw new Error('Message is required and must be a string');
  }

  // Sanitize and validate message
  const sanitizedMessage = sanitizeMessage(body.message);
  if (!sanitizedMessage) {
    throw new Error('Message cannot be empty after sanitization');
  }

  // Validate temperature range
  if (body.temperature !== undefined && (body.temperature < 0 || body.temperature > 2)) {
    throw new Error('Temperature must be between 0 and 2');
  }

  return {
    ...body,
    message: sanitizedMessage
  };
}

// Price prediction handler with improved prompts
async function handlePricePrediction(message: string, systemPrompt?: string, temperature?: number): Promise<string> {
      const btcPrice = await getFastBTCPrice();
      const isPredictionQuery = /price target|prediction|end of q4|end of year|forecast|target/i.test(message);
      
      if (isPredictionQuery) {
        let prediction = '';
        try {
          const predictionPrompt = `Bitcoin is currently priced at $${btcPrice ? btcPrice.toLocaleString() : 'unknown'}. What is your price target for the end of Q4? Please answer in 2 sentences, and add a witty Satoshi-style remark.`;
          const predictionResp = await Promise.race([
            Grok4Service.chatCompletion({
              messages: [
                { role: 'system', content: systemPrompt || 'You are Grok, an AI assistant for LiveTheLifeTV.' },
                { role: 'user', content: predictionPrompt }
              ],
              temperature: temperature || 0.7,
              max_tokens: 120,
            }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Prediction timeout')), PREDICTION_TIMEOUT)
        )
          ]) as ChatCompletion;
          
          prediction = predictionResp.choices?.[0]?.message?.content || '';
          
          if (!prediction || !prediction.trim()) {
            prediction = `As Satoshi might say: "Predicting Bitcoin's price is like predicting the weather in a quantum storm. HODL on!"`;
          }
        } catch (error) {
          logger.error('Price prediction error:', error);
          prediction = `As Satoshi might say: "Predicting Bitcoin's price is like predicting the weather in a quantum storm. HODL on!"`;
        }
        
    return `Current BTC price: $${btcPrice ? btcPrice.toLocaleString() : 'unavailable'}\n\n${prediction}`;
      } else {
        if (btcPrice) {
      return `Current Bitcoin price: $${btcPrice.toLocaleString()}\n\nAs Satoshi would say: "The price is what the market decides!"`;
        } else {
      return `I'm having trouble getting the current Bitcoin price right now. You can check live prices on CoinGecko or CoinMarketCap. As Satoshi would say: "The price is what the market decides!"`;
    }
  }
}

// Image generation handler
async function generateImageWithXAI(request: ImageGenerationRequest): Promise<string> {
  try {
    const response = await fetch('https://api.x.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        prompt: request.prompt,
        model: request.model || 'grok-2-image',
        n: 1,
        size: request.size || '1024x1024',
        quality: request.quality || 'standard',
        style: request.style || 'vivid',
      }),
    });

    if (!response.ok) {
      throw new Error(`Image generation failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.[0]?.url || '';
  } catch (error) {
    logger.error('Image generation error:', error);
    throw error;
  }
}

// Vision analysis handler
async function analyzeImage(imageUrl: string, query: string): Promise<string> {
  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.XAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-4',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: query },
              { type: 'image_url', image_url: { url: imageUrl } }
            ]
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Vision analysis failed: ${response.status}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || '';
  } catch (error) {
    logger.error('Vision analysis failed:', error);
    throw error;
  }
}

// Enhanced tool functions for Grok 4 based on GROK420.md documentation
const ENHANCED_TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'search',
      description: 'Search the web for up-to-date information, with enhanced accuracy for cryptocurrency prices, market data, and financial news. Use this for current prices, market trends, and real-time information.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query - be specific and include relevant keywords for better results'
          }
        },
        required: ['query']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_crypto_price',
      description: 'Get real-time cryptocurrency prices from multiple sources. Use this for accurate, up-to-date price information for the most tracked assets: BTC, ETH, SOL, AAVE, MKR, UNI, etc.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The cryptocurrency symbol (e.g., BTC, ETH, SOL, AAVE, MKR, UNI)'
          },
          currency: {
            type: 'string',
            description: 'The currency to display price in (default: USD)',
            default: 'USD'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_market_data',
      description: 'Get comprehensive market data including price, volume, market cap, and 24h change for cryptocurrencies. Focus on the most tracked assets from the curated list.',
      parameters: {
        type: 'object',
        properties: {
          symbols: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of cryptocurrency symbols to get data for (e.g., ["BTC", "ETH", "SOL"])'
          }
        },
        required: ['symbols']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'verify_fact',
      description: 'Verify factual claims by searching multiple sources and cross-referencing information. Use this to prevent hallucination and ensure accuracy of statements about prices, dates, events, or any factual information.',
      parameters: {
        type: 'object',
        properties: {
          claim: {
            type: 'string',
            description: 'The factual claim to verify (e.g., "Bitcoin price is $50,000", "MSTR bought 1000 BTC yesterday")'
          },
          context: {
            type: 'string',
            description: 'Additional context about what aspect of the claim needs verification'
          }
        },
        required: ['claim']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_x_sentiment',
      description: 'Analyze sentiment and key points from a specific X (Twitter) post. Use this to summarize the impact, narrative, and key takeaways from a tweet URL. Essential for market sentiment analysis.',
      parameters: {
        type: 'object',
        properties: {
          tweetUrl: {
            type: 'string',
            description: 'The URL of the X (Twitter) post to analyze.'
          }
        },
        required: ['tweetUrl']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_stock_price',
      description: 'Get real-time stock and crypto stock prices via Yahoo Finance. Prioritizes stocks from @/stocks components: MSTR, COIN, HOOD, NVDA, TSLA, AAPL, MSFT, GOOGL, AMZN, META, CRCL, BLOCK, PYPL, IREN, CORZ, CIFR, RIOT, CLSK, WULF, HUT, MARA, GLXY, QBTS, CRSP, RGTI, QUBT, KTOS, DRS, IONQ, IBM, PLTR, VRTX, REGN, MRNA, LMT, RTX, NOC, GD, BA, TSM, CCJ, CEG, ETR, UEC, etc.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol (e.g., MSTR, COIN, HOOD, MARA, RIOT, NVDA, TSLA)'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_insider_sentiment',
      description: 'Get insider trading sentiment data from Finnhub API. This provides insights into executive trading patterns that can signal future stock movements. The Monthly Share Purchase Ratio (MSPR) indicates whether insiders are buying or selling, with values closer to 1 indicating bullish sentiment and values closer to -1 indicating bearish sentiment. Prioritizes stocks from @/stocks components.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol to analyze (e.g., MSTR, COIN, HOOD, NVDA, TSLA, AAPL)'
          },
          from: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format (optional, defaults to 3 months ago)',
            default: '2024-01-01'
          },
          to: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format (optional, defaults to today)',
            default: '2024-12-31'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_insider_transactions',
      description: 'Get detailed insider trading transactions from Finnhub API. This provides specific information about executive and insider trading activities including transaction types, amounts, and dates. Useful for analyzing individual insider moves and their potential impact on stock prices. Prioritizes stocks from @/stocks components.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol to analyze (e.g., MSTR, COIN, HOOD, NVDA, TSLA, AAPL)'
          },
          from: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format (optional, defaults to 1 month ago)',
            default: '2024-01-01'
          },
          to: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format (optional, defaults to today)',
            default: '2024-12-31'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_ipo_calendar',
      description: 'Get upcoming and recent IPO calendar data from Finnhub API. Track new market entrants, their expected pricing, and market reception. Useful for identifying new investment opportunities and market sentiment towards new listings.',
      parameters: {
        type: 'object',
        properties: {
          from: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format (optional, defaults to 1 month ago)',
            default: '2024-01-01'
          },
          to: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format (optional, defaults to 3 months from now)',
            default: '2024-12-31'
          }
        },
        required: []
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_company_earnings',
      description: 'Get company earnings data from Finnhub API. Track quarterly earnings, revenue, EPS, and analyst estimates. Essential for fundamental analysis and understanding company financial performance. Prioritizes stocks from @/stocks components.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol to analyze (e.g., MSTR, COIN, NVDA, AAPL, TSLA)'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_company_news',
      description: 'Get company news and press releases from Finnhub API. Track recent announcements, corporate events, and market-moving news. Useful for understanding company developments and market sentiment. Prioritizes stocks from @/stocks components.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol to analyze (e.g., MSTR, COIN, NVDA, AAPL, TSLA)'
          },
          from: {
            type: 'string',
            description: 'Start date in YYYY-MM-DD format (optional, defaults to 1 week ago)',
            default: '2024-01-01'
          },
          to: {
            type: 'string',
            description: 'End date in YYYY-MM-DD format (optional, defaults to today)',
            default: '2024-12-31'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_company_profile',
      description: 'Get comprehensive company profile data from Finnhub API. Access company fundamentals, financial metrics, and business information. Essential for fundamental analysis and company research. Prioritizes stocks from @/stocks components.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The stock symbol to analyze (e.g., MSTR, COIN, HOOD, NVDA, TSLA, AAPL)'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_market_status',
      description: 'Get real-time market status and trading information from Finnhub API. Track market hours, holidays, and trading sessions. Useful for understanding market timing and trading opportunities.',
      parameters: {
        type: 'object',
        properties: {
          exchange: {
            type: 'string',
            description: 'The exchange to check (optional, defaults to US markets)',
            default: 'US'
          }
        },
        required: []
      }
    }
  }
];

// Conversation memory (in-memory for now, could be moved to Redis/database)
const conversationMemory = new Map<string, ChatCompletionMessageParam[]>();

// Get conversation history
function getConversationHistory(clientId: string): ChatCompletionMessageParam[] {
  return conversationMemory.get(clientId) || [];
}

// Add message to conversation history
function addToConversationHistory(clientId: string, message: ChatCompletionMessageParam) {
  const history = getConversationHistory(clientId);
  history.push(message);
  
  // Keep only last 10 messages to prevent context overflow
  if (history.length > 10) {
    history.splice(0, history.length - 10);
  }
  
  conversationMemory.set(clientId, history);
}

// CORS preflight handler
export async function OPTIONS(_request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

// --- Prompt Engineering Guide for Grok 4 + X Data ---
// Enhanced system prompt focused on X sentiment analysis with anti-hallucination measures
const DEFAULT_SYSTEM_PROMPT = `You are a crypto market intelligence expert specializing in X (Twitter) sentiment analysis and live financial data.

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (Finnhub API, CoinGecko, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **When analyzing sentiment, stick to observable patterns rather than making definitive predictions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **If you make a factual statement, be prepared to verify it with live data**
- **Never state prices, dates, or events without verification**
- **When in doubt, say "I need to verify this information" and use available tools**

🎯 **CORE FOCUS:**
- Analyze thoughts, ideas, and opinions from X about Bitcoin, altcoins, and crypto stocks
- Identify key narratives, sentiment shifts, and emerging trends
- Provide actionable insights based on social sentiment and live market data

📊 **SENTIMENT ANALYSIS FRAMEWORK:**
- **Bitcoin**: Institutional adoption, ETF flows, halving impact, regulatory sentiment
- **Altcoins**: Memecoin vs DeFi sentiment, Layer 1 vs Layer 2 discussions, airdrop narratives
- **Crypto Stocks**: MSTR accumulation strategy, COIN exchange performance, HOOD retail sentiment
- **Macro**: Fed policy impact, inflation concerns, election effects on crypto

🔍 **KEY INFLUENCERS TO MONITOR:**
- Bitcoin maximalists and institutional voices
- DeFi protocol founders and developers
- Crypto exchange CEOs and executives
- Memecoin creators and community leaders
- Traditional finance commentators on crypto

💡 **ANALYSIS APPROACH:**
- Identify sentiment drivers and narrative shifts
- Highlight controversial opinions and debates
- Track viral tweets and emerging trends
- Connect social sentiment to price action
- Provide context for market movements

🎪 **FOR GM QUERIES:**
- Comprehensive X sentiment analysis for all tracked assets
- Focus on thoughts, ideas, and opinions driving market sentiment
- Identify key narratives and emerging trends
- Provide actionable insights based on social intelligence

⚠️ **TRUTH VERIFICATION RULES:**
1. **Data Sources**: Always use live APIs (Finnhub, CoinGecko) for current prices and market data
2. **Sentiment Analysis**: Base analysis on actual social media content, not assumptions
3. **Attribution**: When referencing specific tweets or statements, provide context about the source
4. **Uncertainty**: If information is unclear or conflicting, acknowledge the uncertainty
5. **Time Sensitivity**: Clearly indicate when data was last updated
6. **Disclaimers**: For any forward-looking statements, include appropriate risk disclaimers

🔒 **HALLUCINATION PREVENTION:**
- Before making any factual claim, verify you have reliable data
- If asked about specific events, dates, or numbers you're unsure about, decline to answer
- Never invent market movements, price changes, or trading volumes
- When analyzing sentiment, focus on observable patterns rather than definitive conclusions
- Always distinguish between facts and opinions in your analysis
- Use the verify_fact tool proactively for any claims about prices, dates, or events
- If you cannot verify a fact with available tools, explicitly state the uncertainty
- Never make definitive statements about future market movements
- Always qualify predictions with appropriate disclaimers
- When referencing social media sentiment, be specific about what you can observe vs. infer`;

// Helper to build Grok 4 prompt with Human/Assistant format and context-rich instructions
function buildGrok4Prompt(history: ChatCompletionMessageParam[], userMessage: string): string {
  // Only include user/assistant turns (ignore system/tool)
  const turns = history.filter(
    m => m.role === 'user' || m.role === 'assistant'
  ) as { role: 'user' | 'assistant'; content: string }[];
  let prompt = '';
  for (const turn of turns) {
    prompt += `${turn.role === 'user' ? 'Human' : 'Assistant'}: ${turn.content.trim()}
`;
  }
  // Example: If userMessage is about X sentiment, make it explicit
  // (You can add more logic here to auto-augment prompts for common use cases)
  // e.g., if (userMessage.toLowerCase().includes('sentiment')) { ... }
  prompt += `Human: ${userMessage.trim()}
Assistant:`;
  return prompt;
}

// --- Fetch with Timeout Helper ---
async function fetchWithTimeout(resource: RequestInfo, options: RequestInit = {}, timeout = 5000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, { ...options, signal: controller.signal });
    return response;
  } finally {
    clearTimeout(id);
  }
}

interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  market_cap: number;
  price_change_percentage_24h?: number;
  price_change_percentage_7d?: number;
  'price_change_percentage_1y_in_currency.usd'?: number;
  [key: string]: unknown;
}

/**
 * Fetches BTC outperformers and returns a single comprehensive table.
 * Returns: { btcOutperformersTable, btcChange, label }
 */
async function getBTCOutperformersAndAltcoinTables(period: "24h" | "7d" | "ytd" = "24h"): Promise<{ btcOutperformersTable: string; btcChange: number; label: string }> {
  try {
    const changeKey = period === "24h" ? "price_change_percentage_24h" : 
                     period === "7d" ? "price_change_percentage_7d" : 
                     "price_change_percentage_1y_in_currency.usd";
    
    const label = period === "24h" ? "24h" : period === "7d" ? "7d" : "YTD";
    
    // Fetch top 100 coins by market cap
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h,7d,1y_in_currency');
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data: CoinGeckoMarket[] = await response.json();
    
    // Find BTC data
    const btcData = data.find((coin: CoinGeckoMarket) => coin.id === 'bitcoin');
    if (!btcData) {
      throw new Error('Bitcoin data not found');
    }
    
    const btcChange = typeof btcData[changeKey] === 'number' ? btcData[changeKey] as number : 0;
    
    // Preferred altcoins (curated list)
    const preferredAlts = [
      'ETH', 'SOL', 'LINK', 'AVAX', 'AAVE', 'UNI', 'MKR', 'SNX', 'ARB', 'OP', 'LDO', 'INJ', 'TIA', 'JUP', 'PYTH', 'RUNE', 'STX', 'DOGE', 'PEPE', 'WIF', 'BONK'
    ];
    // Filter and sort outperformers
    const outperformers = data
      .filter((coin: CoinGeckoMarket) => {
        const change = typeof coin[changeKey] === 'number' ? coin[changeKey] as number : undefined;
        return typeof change === 'number' && change > btcChange && coin.id !== 'bitcoin';
      });
    // Preferred first, then others
    const preferredOutperformers = outperformers.filter(coin => preferredAlts.includes(coin.symbol.toUpperCase()));
    const otherOutperformers = outperformers.filter(coin => !preferredAlts.includes(coin.symbol.toUpperCase()));
    // Final list: preferred first, then others, max 10
    const finalOutperformers = [...preferredOutperformers, ...otherOutperformers].slice(0, 10);
    
    if (finalOutperformers.length === 0) {
      return {
        btcOutperformersTable: `No assets outperforming BTC (${label}: ${btcChange >= 0 ? '+' : ''}${btcChange.toFixed(2)}%)`,
        btcChange,
        label
      };
    }
    
    // Build comprehensive table with all columns
    let table = `**BTC Outperformers (${label})**\n\n`;
    table += `| Symbol | ${label} Change | vs BTC | Market Cap |\n`;
    table += `|--------|----------------|--------|------------|\n`;
    
    finalOutperformers.forEach((coin: CoinGeckoMarket) => {
      const change = typeof coin[changeKey] === 'number' ? coin[changeKey] as number : 0;
      const vsBTC = change - btcChange;
      const marketCap = coin.market_cap ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        maximumFractionDigits: 1
      }).format(coin.market_cap) : 'N/A';
      
      const changeEmoji = change >= 0 ? '🟢' : '🔴';
      const vsBTCEmoji = vsBTC >= 0 ? '🟢' : '🔴';
      
      table += `| ${coin.symbol.toUpperCase()} | ${changeEmoji} ${change >= 0 ? '+' : ''}${change.toFixed(2)}% | ${vsBTCEmoji} ${vsBTC >= 0 ? '+' : ''}${vsBTC.toFixed(2)}% | ${marketCap} |\n`;
    });
    // Narrative: mention which preferred alts are outperforming
    const preferredWinners = preferredOutperformers.map(c => c.symbol.toUpperCase());
    let narrative = '';
    if (preferredWinners.length > 0) {
      narrative = `Your favorite alts outperforming BTC: ${preferredWinners.join(', ')}.`;
    } else {
      narrative = `None of your favorite alts are outperforming BTC right now, but here are the top movers.`;
    }
    
    return { btcOutperformersTable: `${narrative}\n\n${table}`, btcChange, label };
  } catch (error) {
    logger.error('Error fetching BTC outperformers:', error);
    return {
      btcOutperformersTable: 'Failed to fetch market data.',
      btcChange: 0,
      label: period === "24h" ? "24h" : period === "7d" ? "7d" : "YTD"
    };
  }
}

// Enhanced crypto stocks data with Yahoo Finance


async function _getCryptoStocksData(btcChange: number): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured');
      return '**📈 Crypto Stocks:**\n_Unable to fetch stock data - API key not configured_';
    }

    // Focus on prioritized stocks from @/stocks components
    const stocks = PRIORITIZED_STOCK_LIST.slice(0, 12); // Limit to 12 for API efficiency
    logger.info('Fetching crypto stocks data for symbols:', stocks);

    // Fetch each stock individually (Finnhub free tier limitation)
    const stockPromises = stocks.map(async (symbol) => {
      try {
        await waitForFinnhubRateLimit();
        const response = await fetchWithTimeout(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
          {},
          3000
        );
        if (!response.ok) {
          logger.warn(`Finnhub API error for ${symbol}:`, response.status, response.statusText);
          return null;
        }
        const data = await response.json();
        if (!data || typeof data.c !== 'number' || typeof data.dp !== 'number') {
          logger.warn(`Invalid Finnhub data for ${symbol}:`, data);
          return null;
        }
        return {
          symbol,
          currentPrice: data.c,
          previousClose: data.pc,
          change: data.d,
          changePercent: data.dp,
          high: data.h,
          low: data.l,
          open: data.o
        };
      } catch (error) {
        logger.warn(`Error fetching ${symbol} from Finnhub:`, error);
        return null;
      }
    });

    const results = await Promise.allSettled(stockPromises);
    const validStocks = results
      .filter((result): result is PromiseFulfilledResult<{ symbol: string; currentPrice: number; previousClose: number; change: number; changePercent: number; high: number; low: number; open: number; }> => 
        result.status === 'fulfilled' && result.value !== null
      )
      .map(result => result.value)
      .filter(stock => typeof stock.changePercent === 'number' && stock.changePercent > btcChange)
      .sort((a, b) => b.changePercent - a.changePercent)
      .slice(0, 10);

    if (validStocks.length === 0) {
      logger.info('No crypto stocks are outperforming BTC today');
      return '**📈 Crypto Stocks:**\n_No crypto stocks are outperforming BTC today_';
    }

    // --- Human, crypto-native narrative intro ---
    const openers = [
      "Wall Street's crypto darlings are making noise again.",
      "The degen stocks are back in the spotlight—here's who's flexing.",
      "If you thought only memecoins could moon, check out these equities.",
      "TradFi meets degen: these stocks are outpacing even the OG orange coin.",
      "When stocks start outperforming BTC, you know the market's getting spicy."
    ];
    const opener = openers[Math.floor(Math.random() * openers.length)];

    // Weave in key data points
    const top = validStocks[0];
    const topLine = top
      ? `Top performer: **${top.symbol}** up ${top.changePercent >= 0 ? '+' : ''}${top.changePercent.toFixed(2)}% in the last 24h—leaving BTC maxis scratching their heads.`
      : '';

    // Table intro
    const tableIntro = `Here's the leaderboard for crypto-native equities beating BTC today:`;

    // Table
    let table = '| Symbol | Price | 24h Change | vs BTC |\n|--------|-------|------------|--------|\n';
    validStocks.forEach((stock) => {
      const emoji = stock.changePercent >= 0 ? '🟢' : '🔴';
      const price = stock.currentPrice.toFixed(2);
      const changePercent = stock.changePercent >= 0 ? 
        `+${stock.changePercent.toFixed(2)}%` : 
        `${stock.changePercent.toFixed(2)}%`;
      const vsBTC = stock.changePercent - btcChange;
      const vsBTCFormatted = vsBTC >= 0 ? 
        `+${vsBTC.toFixed(2)}%` : 
        `${vsBTC.toFixed(2)}%`;
      table += `| ${emoji} ${stock.symbol} | $${price} | ${changePercent} | ${vsBTCFormatted} |\n`;
    });

    // Witty, opinionated closer
    const closers = [
      "Remember: in this market, conviction is good, but exit liquidity is better.",
      "If you're not outperforming BTC, at least outperform your own FOMO.",
      "Diamond hands or paper hands, these stocks are moving—just don't get rekt.",
      "Stay sharp, stay caffeinated, and don't get left holding the bag.",
      "The only thing more volatile than these stocks is the meme feed on X."
    ];
    const closer = closers[Math.floor(Math.random() * closers.length)];

    // Compose the final output
    const result = `**📈 Crypto Stocks:**\n\n${opener}\n${topLine}\n\n${tableIntro}\n${table}\n\n${closer}`;
    logger.info('Crypto stocks data successfully fetched from Finnhub:', {
      stockCount: validStocks.length,
      symbols: validStocks.map(s => s.symbol)
    });
    return result;
  } catch (error) {
    logger.error('Error fetching crypto stocks data from Finnhub:', error);
    return '**📈 Crypto Stocks:**\n_Unable to fetch stock data_';
  }
}

// Insider sentiment data interface

// Insider sentiment function using Finnhub API
async function getInsiderSentiment(symbol: string, from?: string, to?: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for insider sentiment');
      return `Unable to fetch insider sentiment for ${symbol} - API key not configured`;
    }
    const fromDate = from || new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = to || new Date().toISOString().split('T')[0];
    const cacheKey = `insider_sentiment_${symbol}_${fromDate}_${toDate}`;
    const cachedData = getCachedFinnhubData(cacheKey);
    if (typeof cachedData === 'string') {
      logger.info(`Using cached insider sentiment data for ${symbol}`);
      return cachedData;
    }
    await waitForFinnhubRateLimit();
    logger.info(`Fetching insider sentiment for ${symbol} from ${fromDate} to ${toDate}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub insider sentiment API error for ${symbol}:`, response.status, response.statusText);
      return `Unable to fetch insider sentiment data for ${symbol} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      return `No insider sentiment data available for ${symbol} in the specified date range`;
    }
    const sentimentData = data.data as Array<{ symbol: string; year: number; month: number; mspr: number; change: number; }>;
    sentimentData.sort((a, b) => (a.year !== b.year ? b.year - a.year : b.month - a.month));
    const latest = sentimentData[0];
    let sentiment: 'bullish' | 'bearish' | 'neutral';
    let sentimentEmoji: string;
    if (latest.mspr > 0.5) { sentiment = 'bullish'; sentimentEmoji = '🟢'; }
    else if (latest.mspr < -0.5) { sentiment = 'bearish'; sentimentEmoji = '🔴'; }
    else { sentiment = 'neutral'; sentimentEmoji = '🟡'; }
    // --- Human, crypto-native narrative ---
    let result = '';
    if (sentiment === 'bullish') {
      result += `Insiders are quietly stacking—MSPR is ${latest.mspr.toFixed(2)}. The C-suite is showing conviction, and the smart money is watching. ${sentimentEmoji}\n`;
    } else if (sentiment === 'bearish') {
      result += `Insiders are heading for the exits—MSPR at ${latest.mspr.toFixed(2)}. Sometimes, execs know when to take chips off the table. ${sentimentEmoji}\n`;
    } else {
      result += `No big moves from the C-suite—MSPR is ${latest.mspr.toFixed(2)}. Sometimes, no news is good news. ${sentimentEmoji}\n`;
    }
    // Add a punchy, opinionated closer
    const closers = [
      `If you're front-running the suits, this is your signal.`,
      `Insider conviction is the ultimate edge.`,
      `Don't fade the C-suite—unless you like living dangerously.`,
      `Sometimes, the best alpha is just following the money.`,
      `Remember: execs buy for one reason—up only.`
    ];
    result += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching insider sentiment for ${symbol}:`, error);
    return `Error analyzing insider sentiment for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Insider transactions function using Finnhub API
async function getInsiderTransactions(symbol: string, from?: string, to?: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for insider transactions');
      return `Unable to fetch insider transactions for ${symbol} - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    const fromDate = from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = to || new Date().toISOString().split('T')[0];
    logger.info(`Fetching insider transactions for ${symbol} from ${fromDate} to ${toDate}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub insider transactions API error for ${symbol}:`, response.status, response.statusText);
      return `Unable to fetch insider transactions data for ${symbol} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      return `No insider transactions data available for ${symbol} in the specified date range`;
    }
    const transactions = data.data as Array<{ name: string; share: number; change: number; filingDate: string; transactionDate: string; transactionCode: string; transactionPrice: number; transactionValue: number; transactionType: string; }>; 
    const isValidNumber = (n: unknown) => typeof n === 'number' && !isNaN(n) && isFinite(n);
    transactions.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    const totalBuyValue = transactions.filter(t => t.transactionType === 'P' || t.change > 0).reduce((sum, t) => isValidNumber(t.transactionValue) ? sum + Math.abs(t.transactionValue) : sum, 0);
    const totalSellValue = transactions.filter(t => t.transactionType === 'S' || t.change < 0).reduce((sum, t) => isValidNumber(t.transactionValue) ? sum + Math.abs(t.transactionValue) : sum, 0);
    let netFlow: number | null = null;
    if (isValidNumber(totalBuyValue) && isValidNumber(totalSellValue)) {
      netFlow = totalBuyValue - totalSellValue;
    }
    const totalTransactions = transactions.length;
    const uniqueInsiders = new Set(transactions.map(t => t.name)).size;
    let sentiment: 'bullish' | 'bearish' | 'neutral';
    let sentimentEmoji: string;
    if (typeof netFlow === 'number' && isValidNumber(netFlow) && netFlow > 1000000) { sentiment = 'bullish'; sentimentEmoji = '🟢'; }
    else if (typeof netFlow === 'number' && isValidNumber(netFlow) && netFlow < -1000000) { sentiment = 'bearish'; sentimentEmoji = '🔴'; }
    else { sentiment = 'neutral'; sentimentEmoji = '🟡'; }
    // --- Human, crypto-native narrative ---
    const openers = [
      `Want to know what the smart money is doing? Watch the insider tape at ${symbol}.`,
      `Insider transactions are the market's tell—here's what ${symbol}'s execs are up to.`,
      `Forget the headlines—follow the money. Here's the latest from ${symbol}'s C-suite.`,
      `When insiders move size, the market pays attention. Let's break down ${symbol}.`,
      `The best alpha? Tracking who's buying and selling at ${symbol}.`
    ];
    const opener = openers[Math.floor(Math.random() * openers.length)];
    let result = `${opener}\n\n`;
    if (sentiment === 'bullish') {
      result += `Over the last month, ${uniqueInsiders} insiders have been net buyers, with a net flow of $${(netFlow! / 1_000_000).toFixed(2)}M. The C-suite is betting on upside.\n`;
    } else if (sentiment === 'bearish') {
      result += `Insiders have been net sellers (net flow: $${(netFlow! / 1_000_000).toFixed(2)}M). Sometimes, execs know when to take profits.\n`;
    } else {
      result += `Insider activity is balanced—no big buyers or sellers.\n`;
    }
    // Only show totals if at least one of buy/sell is > 0 and valid
    if ((isValidNumber(totalBuyValue) && totalBuyValue > 0) || (isValidNumber(totalSellValue) && totalSellValue > 0)) {
      result += `\nTotals: $${(totalBuyValue / 1_000_000).toFixed(2)}M bought, $${(totalSellValue / 1_000_000).toFixed(2)}M sold, across ${totalTransactions} transactions.\n`;
    } else {
      result += `\nNo notable insider buying or selling activity this period.\n`;
    }
    const validTransactions = transactions.filter(t => isValidNumber(t.transactionValue) && isValidNumber(t.change));
    if (validTransactions.length > 0) {
      const topMoves = validTransactions.slice(0, 3).map(t => {
        const type = t.transactionType === 'P' ? 'bought' : 'sold';
        const shares = Math.abs(t.change).toLocaleString();
        const value = isValidNumber(t.transactionValue) ? `$${(Math.abs(t.transactionValue) / 1000).toFixed(1)}K` : '';
        const date = new Date(t.transactionDate).toLocaleDateString();
        return `${t.name} ${type} ${shares} shares (${value}) on ${date}`;
      });
      result += `\nNotable moves: ${topMoves.join('; ')}.\n`;
    }
    const closers = [
      `Insiders are the original whales—don't fade their moves. ${sentimentEmoji}`,
      `If the C-suite is buying, maybe you should be too. ${sentimentEmoji}`,
      `Heavy selling? Might be time to tighten stops. ${sentimentEmoji}`,
      `Sometimes, patience pays—especially when insiders are on the sidelines. ${sentimentEmoji}`,
      `Smart money leaves a trail—follow it. ${sentimentEmoji}`
    ];
    result += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching insider transactions for ${symbol}:`, error);
    return `Error analyzing insider transactions for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Company earnings function using Finnhub API
async function getCompanyEarnings(symbol: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for company earnings');
      return `Unable to fetch earnings data for ${symbol} - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    logger.info(`Fetching earnings data for ${symbol}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/stock/earnings?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub earnings API error for ${symbol}:`, response.status, response.statusText);
      return `Unable to fetch earnings data for ${symbol} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      return `No earnings data available for ${symbol}`;
    }
    const earnings = data as Array<{ actual: number; estimate: number; period: string; quarter: number; surprise: number; surprisePercent: number; symbol: string; year: number; }>;
    earnings.sort((a, b) => (a.year !== b.year ? b.year - a.year : b.quarter - a.quarter));
    const latest = earnings[0];
    const surprise = latest.surprisePercent;
    let surpriseEmoji: string;
    if (surprise > 10) { surpriseEmoji = '🚀'; }
    else if (surprise > 5) { surpriseEmoji = '🟢'; }
    else if (surprise < -10) { surpriseEmoji = '🔴'; }
    else if (surprise < -5) { surpriseEmoji = '🟡'; }
    else { surpriseEmoji = '⚪'; }
    // --- Human, crypto-native narrative ---
    const openers = [
      `${symbol} just dropped earnings—let's see if they beat, missed, or just kept the lights on.`,
      `Earnings season is the real meme war. Here's how ${symbol} stacked up.`,
      `Quarterly numbers are in for ${symbol}. Did they moon or get rekt?`,
      `The street was watching—here's how ${symbol} performed this quarter.`,
      `Earnings roulette: ${symbol} just spun the wheel. Let's check the result.`
    ];
    const opener = openers[Math.floor(Math.random() * openers.length)];
    // Main result sentence
    let result = `${opener}\n\n`;
    if (surprise > 10) {
      result += `Absolute monster quarter—EPS $${latest.actual.toFixed(2)} vs. $${latest.estimate.toFixed(2)} expected, beat by ${surprise.toFixed(1)}%. ${surpriseEmoji} Bulls are flexing, bears are coping.\n`;
    } else if (surprise > 5) {
      result += `Solid beat—EPS $${latest.actual.toFixed(2)} vs. $${latest.estimate.toFixed(2)}, up ${surprise.toFixed(1)}%. ${surpriseEmoji} The street is nodding in approval.\n`;
    } else if (surprise < -10) {
      result += `Big miss—EPS $${latest.actual.toFixed(2)} vs. $${latest.estimate.toFixed(2)}, missed by ${surprise.toFixed(1)}%. ${surpriseEmoji} CT is already posting memes and calling for a dead cat bounce.\n`;
    } else if (surprise < -5) {
      result += `Missed—EPS $${latest.actual.toFixed(2)} vs. $${latest.estimate.toFixed(2)}, off by ${surprise.toFixed(1)}%. ${surpriseEmoji} Not a rug, but not a win either.\n`;
    } else {
      result += `In line with expectations—EPS $${latest.actual.toFixed(2)} vs. $${latest.estimate.toFixed(2)}. ${surpriseEmoji} No fireworks, just chop.\n`;
    }
    // Summarize recent trend in a sentence
    const lastFew = earnings.slice(0, 4);
    const beats = lastFew.filter(e => e.surprisePercent > 0).length;
    const misses = lastFew.filter(e => e.surprisePercent < 0).length;
    let trend = '';
    if (beats === 0 && misses > 0) {
      trend = 'Mostly misses lately—momentum is lacking.';
    } else if (beats > 0 && misses === 0) {
      trend = 'Consistent beats—momentum is strong.';
    } else if (beats > misses) {
      trend = 'More beats than misses—trend is up.';
    } else if (misses > beats) {
      trend = 'More misses than beats—trend is down.';
    } else {
      trend = 'Mixed results—narrative is up for grabs.';
    }
    result += `\nLast few quarters: ${trend}\n`;
    // Strong, opinionated closer
    const closers = [
      `If you're trading this, expect fireworks—this isn't a "set it and forget it" stock.`,
      `Momentum traders are watching for follow-through, but don't get rekt chasing the move.`,
      `Earnings are the ultimate reality check—trade accordingly.`,
      `CT is already spinning the narrative—trade the price, not the hype.`,
      `If you like volatility, this one's for you. If not, maybe sit this out.`
    ];
    result += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching company earnings for ${symbol}:`, error);
    return `Error analyzing earnings for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Company news function using Finnhub API
async function getCompanyNews(symbol: string, from?: string, to?: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for company news');
      return `Unable to fetch news data for ${symbol} - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    const fromDate = from || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = to || new Date().toISOString().split('T')[0];
    logger.info(`Fetching news data for ${symbol} from ${fromDate} to ${toDate}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub news API error for ${symbol}:`, response.status, response.statusText);
      return `Unable to fetch news data for ${symbol} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) {
      return `No news data available for ${symbol} in the specified date range`;
    }
    const news = data as Array<{ category: string; datetime: number; headline: string; id: number; image: string; related: string; source: string; summary: string; url: string; }>;
    news.sort((a, b) => b.datetime - a.datetime);
    const topNews = news.slice(0, 5);
    // Synthesize the vibe and narrative
    const headlines = topNews.map(n => n.headline.toLowerCase());
    let vibe = '';
    if (headlines.some(h => h.includes('elon') || h.includes('musk') || h.includes('grok'))) {
      vibe = `It's Musk-mania—everyone's buzzing about the latest moves, and CT is memeing it to the moon.`;
    } else if (headlines.some(h => h.includes('lawsuit') || h.includes('regulation') || h.includes('probe'))) {
      vibe = `Regulatory FUD is in the air, and the bears are out in force.`;
    } else if (headlines.some(h => h.includes('record') || h.includes('beat') || h.includes('surge'))) {
      vibe = `Bullish headlines are driving the narrative—momentum traders are watching closely.`;
    } else if (headlines.some(h => h.includes('miss') || h.includes('drop') || h.includes('cut'))) {
      vibe = `The news is heavy—misses and downgrades are fueling the bears.`;
    } else {
      vibe = `It's a mixed bag—no single narrative is dominating, but volatility is high and the meme feed is moving fast.`;
    }
    // Add a punchy, human summary
    let summary = '';
    if (vibe.includes('Musk-mania')) {
      summary = `The news cycle is pure Musk-mania—memes are flying, and the hype machine is in overdrive. Bulls are loving it, bears are rolling their eyes, and the only thing moving faster than the headlines is the meme feed.`;
    } else if (vibe.includes('Regulatory FUD')) {
      summary = `Regulatory headlines are stirring up FUD, but the real story is how traders are positioning for the next move. If you're in, keep your stops tight—this could get spicy.`;
    } else if (vibe.includes('Bullish headlines')) {
      summary = `Momentum is building—bullish headlines are everywhere, and CT is calling for breakouts. Just remember: when everyone's bullish, it's time to watch for the rug.`;
    } else if (vibe.includes('heavy')) {
      summary = `It's a rough patch—misses and downgrades are fueling the bears, but that just means more volatility for the degens. If you like to trade the chop, this is your moment.`;
    } else {
      summary = `No clear narrative, but the market's restless. Stay nimble, watch the memes, and don't get caught on the wrong side of the next headline.`;
    }
    // Strong, opinionated closer
    const closers = [
      `If you're trading this, keep your finger on the pulse—narratives are shifting by the hour.`,
      `The only thing moving faster than the news is the meme cycle.`,
      `Trade the price, not the headline.`,
      `In this market, conviction is good, but exit liquidity is better.`,
      `Don't get rekt chasing the hype—wait for the real move.`
    ];
    summary += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return summary;
  } catch (error) {
    logger.error(`Error fetching company news for ${symbol}:`, error);
    return `Error analyzing news for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Company profile function using Finnhub API
async function getCompanyProfile(symbol: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for company profile');
      return `Unable to fetch company profile for ${symbol} - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    logger.info(`Fetching company profile for ${symbol}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub company profile API error for ${symbol}:`, response.status, response.statusText);
      return `Unable to fetch company profile for ${symbol} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || Object.keys(data).length === 0) {
      return `No company profile data available for ${symbol}`;
    }
    const profile = data as { country: string; currency: string; exchange: string; ipo: string; marketCapitalization: number; name: string; phone: string; shareOutstanding: number; ticker: string; weburl: string; logo: string; finnhubIndustry: string; cik?: string; isin?: string; lei?: string; };
    // --- Human, crypto-native narrative ---
    const openers = [
      `${profile.name} (${profile.ticker}) isn't just another ticker—it's a narrative in motion.`,
      `If you want to understand the story, start with the company. Here's the lowdown on ${profile.name}.`,
      `Every stock has a backstory—here's what makes ${profile.name} (${profile.ticker}) tick.`,
      `Before you ape in, know the fundamentals. Here's the 411 on ${profile.name}.`,
      `In a world of memecoins, ${profile.name} is playing the long game.`
    ];
    const opener = openers[Math.floor(Math.random() * openers.length)];
    let result = `${opener}\n\n`;
    // Build a narrative paragraph with only meaningful data
    const narrativeParts = [];
    if (profile.finnhubIndustry && profile.finnhubIndustry.toLowerCase() !== 'unknown') {
      narrativeParts.push(`Industry: ${profile.finnhubIndustry}`);
    }
    if (typeof profile.marketCapitalization === 'number' && profile.marketCapitalization > 0) {
      const marketCap = profile.marketCapitalization;
      const marketCapStr = marketCap >= 1_000_000_000
        ? `$${(marketCap / 1_000_000_000).toFixed(2)}B`
        : `$${(marketCap / 1_000_000).toFixed(2)}M`;
      narrativeParts.push(`Market Cap: ${marketCapStr}`);
    }
    if (profile.ipo && profile.ipo !== '0000-00-00') {
      narrativeParts.push(`IPO: ${profile.ipo}`);
    }
    if (profile.exchange && profile.exchange.toLowerCase() !== 'unknown') {
      narrativeParts.push(`Exchange: ${profile.exchange}`);
    }
    if (profile.weburl) {
      narrativeParts.push(`Website: [${profile.weburl.replace(/^https?:\/\//, '')}](${profile.weburl})`);
    }
    // Only show phone if it's not a generic or placeholder value
    if (profile.phone && profile.phone.length > 6 && !/^1?5{2,}/.test(profile.phone)) {
      narrativeParts.push(`Phone: ${profile.phone}`);
    }
    if (narrativeParts.length > 0) {
      result += narrativeParts.join(' | ') + '\n\n';
    }
    const quickTakes = [
      `If you're bullish on the sector, this is one to watch.`,
      `Volatility is always in play—know your risk.`,
      `The story is still being written—stay tuned.`,
      `In a market full of noise, fundamentals still matter.`,
      `Laser eyes or not, do your own research before you ape in.`
    ];
    result += `💡 **Quick Take:**\n${quickTakes[Math.floor(Math.random() * quickTakes.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching company profile for ${symbol}:`, error);
    return `Error analyzing company profile for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// --- IPO Calendar function using Finnhub API ---
async function getIPOCalendar(from?: string, to?: string): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for IPO calendar');
      return `Unable to fetch IPO calendar data - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    const fromDate = from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const toDate = to || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    logger.info(`Fetching IPO calendar from ${fromDate} to ${toDate}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/calendar/ipo?from=${fromDate}&to=${toDate}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub IPO calendar API error:`, response.status, response.statusText);
      return `Unable to fetch IPO calendar data - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || !Array.isArray(data.ipoCalendar) || data.ipoCalendar.length === 0) {
      return `No IPO calendar data available for the specified date range`;
    }
    const ipos = data.ipoCalendar as Array<{
      date: string;
      exchange: string;
      name: string;
      numberOfShares: number;
      price: string;
      status: string;
      symbol: string;
      totalSharesValue: number;
    }>;
    // --- Human, crypto-native narrative ---
    const openers = [
      `IPO season is heating up—new names are hitting the tape, but not all will moon.`,
      `The IPO window is open, but only the bold are stepping through.`,
      `Fresh listings, fresh narratives—here's what's coming to market.`,
      `Not every IPO is a winner, but the hype is real.`,
      `If you're looking for the next big thing, start with the IPO calendar.`
    ];
    const opener = openers[Math.floor(Math.random() * openers.length)];
    let result = `${opener}\n\n`;
    const upcoming = ipos.filter(ipo => ipo.status === 'expected' || ipo.status === 'filed');
    if (upcoming.length > 0) {
      const nextIpo = upcoming[0];
      result += `Next up: ${nextIpo.name} (${nextIpo.symbol}) on ${nextIpo.exchange}, expected at $${nextIpo.price || 'TBD'} per share.\n`;
    } else {
      result += `No major IPOs on deck in the immediate future.\n`;
    }
    const completed = ipos.filter(ipo => ipo.status === 'priced');
    if (completed.length > 0) {
      const lastIpo = completed[0];
      result += `Recent action: ${lastIpo.name} (${lastIpo.symbol}) priced at $${lastIpo.price || 'N/A'} on ${lastIpo.exchange}.\n`;
    }
    const closers = [
      `DYOR before you ape into the next hot listing.`,
      `Remember: not every IPO is a moonshot.`,
      `If you're chasing hype, know when to take profits.`,
      `The best opportunities are sometimes the quietest listings.`,
      `In IPO season, FOMO is real—trade smart.`
    ];
    result += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching IPO calendar:`, error);
    return `Error analyzing IPO calendar: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// --- Market status function using Finnhub API ---
async function getMarketStatus(exchange: string = 'US'): Promise<string> {
  try {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      logger.warn('Finnhub API key not configured for market status');
      return `Unable to fetch market status - API key not configured`;
    }
    await waitForFinnhubRateLimit();
    logger.info(`Fetching market status for ${exchange}`);
    const response = await fetchWithTimeout(
      `https://finnhub.io/api/v1/market/status?exchange=${exchange}&token=${FINNHUB_API_KEY}`,
      {},
      5000
    );
    if (!response.ok) {
      logger.warn(`Finnhub market status API error for ${exchange}:`, response.status, response.statusText);
      return `Unable to fetch market status for ${exchange} - API error ${response.status}`;
    }
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      return `No market status data available for ${exchange}`;
    }
    // --- Human, crypto-native narrative ---
    let result = '';
    if (data.isOpen) {
      result += `The market is open and the tape is moving—traders are hunting for alpha. 🟢\n`;
    } else {
      result += `The market is closed—time to catch up on memes, research, and maybe touch grass. 🔴\n`;
    }
    if (data.session) {
      result += `Current session: ${data.session}.`;
    }
    if (data.nextOpen) {
      result += ` Next open: ${new Date(data.nextOpen).toLocaleString()}.`;
    }
    if (data.nextClose) {
      result += ` Next close: ${new Date(data.nextClose).toLocaleString()}.`;
    }
    const closers = [
      `Remember: the best trades are sometimes made when the market is closed.`,
      `If you're waiting for a clear signal, you'll be waiting with the rest of CT.`,
      `In this market, timing is everything—don't get caught sleeping.`,
      `The only thing more relentless than the market is the meme cycle.`,
      `Stay sharp, stay caffeinated, and be ready for the next open.`
    ];
    result += `\n${closers[Math.floor(Math.random() * closers.length)]}`;
    return result;
  } catch (error) {
    logger.error(`Error fetching market status for ${exchange}:`, error);
    return `Error analyzing market status for ${exchange}: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Enhanced fact verification function to prevent hallucination
async function verifyFact(claim: string, context?: string): Promise<string> {
  try {
    logger.info('Verifying fact:', { claim, context });
    
    // Extract key information from the claim
    const claimLower = claim.toLowerCase();
    
    // Check for price-related claims
    const pricePattern = /(\$[\d,]+\.?\d*)/g;
    const priceMatches = claim.match(pricePattern);
    
    // Check for date-related claims (for future use)
    const datePattern = /(\d{1,2}\/\d{1,2}\/\d{2,4}|\d{4}-\d{2}-\d{2}|yesterday|today|tomorrow|last week|this week)/gi;
    const _dateMatches = claim.match(datePattern);
    
    // Check for cryptocurrency/stock symbols
    const cryptoPattern = /\b(btc|eth|sol|aave|mkr|uni|link|avax|doge|pepe|wif|bonk)\b/gi;
    const stockPattern = /\b(mstr|coin|hood|nvda|tsla|aapl|msft|googl|amzn|meta)\b/gi;
    const cryptoMatches = claim.match(cryptoPattern);
    const stockMatches = claim.match(stockPattern);
    
    const priceVerifications = [];
    
    // Verify prices if mentioned
    if (priceMatches && (cryptoMatches || stockMatches)) {
      const symbols = [...(cryptoMatches || []), ...(stockMatches || [])];
      for (const symbol of symbols.slice(0, 3)) { // Limit to 3 symbols
        try {
          if (cryptoMatches?.includes(symbol.toLowerCase())) {
            // Verify crypto price with timeout
            const response = await Promise.race([
              fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`),
              new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]);
            
            if (response.ok) {
              const data = await response.json();
              const currentPrice = data[symbol.toLowerCase()]?.usd;
              if (currentPrice) {
                const claimedPrice = priceMatches.find(p => p.includes('$'));
                const claimedValue = claimedPrice ? parseFloat(claimedPrice.replace(/[$,]/g, '')) : null;
                
                if (claimedValue) {
                  const difference = Math.abs(currentPrice - claimedValue);
                  const percentageDiff = (difference / currentPrice) * 100;
                  
                  if (percentageDiff < 5) {
                    priceVerifications.push(`✅ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff)`);
                  } else {
                    priceVerifications.push(`⚠️ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff - significant)`);
                  }
                } else {
                  priceVerifications.push(`✅ ${symbol.toUpperCase()} current price: $${currentPrice.toFixed(2)}`);
                }
              }
            }
          } else if (stockMatches?.includes(symbol.toLowerCase())) {
            // Verify stock price with timeout
            const response = await Promise.race([
              fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol.toUpperCase()}`),
              new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]);
            
            if (response.ok) {
              const data = await response.json();
              const quote = data?.quoteResponse?.result?.[0];
              if (quote?.regularMarketPrice) {
                const currentPrice = quote.regularMarketPrice;
                const claimedPrice = priceMatches.find(p => p.includes('$'));
                const claimedValue = claimedPrice ? parseFloat(claimedPrice.replace(/[$,]/g, '')) : null;
                
                if (claimedValue) {
                  const difference = Math.abs(currentPrice - claimedValue);
                  const percentageDiff = (difference / currentPrice) * 100;
                  
                  if (percentageDiff < 5) {
                    priceVerifications.push(`✅ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff)`);
                  } else {
                    priceVerifications.push(`⚠️ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff - significant)`);
                  }
                } else {
                  priceVerifications.push(`✅ ${symbol.toUpperCase()} current price: $${currentPrice.toFixed(2)}`);
                }
              }
            }
          }
        } catch {
          priceVerifications.push(`❌ Unable to verify ${symbol.toUpperCase()} price`);
        }
      }
    }
    
    // Enhanced web search for supporting evidence
    const searchQuery = `${claim} ${context || ''}`.trim();
    let searchResults = '';
    try {
      searchResults = await Promise.race([
        enhancedWebSearch(searchQuery),
        new Promise<string>((resolve) => 
          setTimeout(() => resolve(''), 8000)
        )
      ]);
    } catch {
      searchResults = '';
    }
    
    // Analyze the search results for verification
    const hasSupportingEvidence = searchResults.length > 100 && 
      (searchResults.toLowerCase().includes(claimLower.split(' ').slice(0, 3).join(' ')) ||
       searchResults.toLowerCase().includes(claimLower.split(' ').slice(-3).join(' ')));
    
    let verificationSummary = `**🔍 Fact Verification Results for:** "${claim}"\n\n`;
    
    if (priceVerifications.length > 0) {
      verificationSummary += `**💰 Price Verification:**\n${priceVerifications.join('\n')}\n\n`;
    }
    
    if (hasSupportingEvidence) {
      verificationSummary += `✅ **📰 Supporting Evidence Found:** Web search returned relevant information\n`;
    } else if (searchResults.length > 0) {
      verificationSummary += `⚠️ **📰 Limited Supporting Evidence:** Web search returned some information but not strong confirmation\n`;
    } else {
      verificationSummary += `❌ **📰 No Supporting Evidence:** Web search did not find relevant information\n`;
    }
    
    // Enhanced confidence assessment
    let confidenceLevel = 'LOW';
    let confidenceReason = '';
    
    if (priceVerifications.length > 0 && hasSupportingEvidence) {
      confidenceLevel = 'HIGH';
      confidenceReason = 'Price verification + supporting evidence';
    } else if (priceVerifications.length > 0 || hasSupportingEvidence) {
      confidenceLevel = 'MEDIUM';
      confidenceReason = priceVerifications.length > 0 ? 'Price verification only' : 'Supporting evidence only';
    } else {
      confidenceLevel = 'LOW';
      confidenceReason = 'No verification possible';
    }
    
    verificationSummary += `\n**🎯 Confidence Level:** ${confidenceLevel}\n`;
    verificationSummary += `**📊 Reason:** ${confidenceReason}\n`;
    
    // Enhanced recommendations
    let recommendation = '';
    if (confidenceLevel === 'LOW') {
      recommendation = '❌ **VERIFY INDEPENDENTLY** - This claim cannot be verified with available sources. Please check multiple sources.';
    } else if (confidenceLevel === 'MEDIUM') {
      recommendation = '⚠️ **VERIFY DETAILS** - Claim appears plausible but verify specific details with additional sources.';
    } else {
      recommendation = '✅ **WELL-SUPPORTED** - Claim appears well-supported by available data.';
    }
    
    verificationSummary += `**💡 Recommendation:** ${recommendation}\n\n`;
    verificationSummary += `⏰ **Verified at:** ${new Date().toLocaleString()}`;
    
    return verificationSummary;
    
  } catch (error) {
    logger.error('Error verifying fact:', error);
    return `**❌ Fact Verification Error:** Unable to verify the claim "${claim}" due to technical issues. Please verify this information independently.`;
  }
}

// Main route handler with enhanced security and monitoring
export async function POST(request: Request) {
  const tracker = new PerformanceTracker();
  const clientId = getClientId(request);
  const startTime = Date.now();

  // Rate limiting
  if (!checkRateLimit(clientId)) {
    logger.warn(`Rate limit exceeded for client: ${clientId}`);
    return createErrorResponse('Rate limit exceeded. Please try again later.', 429);
  }

  try {
    tracker.start('total');
    
    // Validate request
    const { message, systemPrompt, temperature, stream, imageUrl, generateImage, imagePrompt, mode } = await validateRequest(request);

    // Handle GODMODE requests
    if (mode === 'godmode') {
      logger.info('GODMODE request received but feature is disabled');
      
      return NextResponse.json({
        content: `🚫 **GODMODE DISABLED** 🚫

GODMODE has been temporarily disabled due to API reliability issues. The feature was causing too many timeout errors and system overloads.

**What happened:**
- Grok4 API was consistently timing out on GODMODE requests
- Multiple retry attempts and fallback mechanisms were implemented
- Despite optimizations, the feature remained unstable

**Current Status:**
- GODMODE is commented out in the codebase
- All other GROK420 features remain fully functional
- The feature can be re-enabled when API stability improves

**Alternative:**
Try using regular GROK420 mode for your queries - it provides the same high-quality responses without the timeout issues.

*GODMODE will return when the API gods smile upon us again.* 🔮`,
        mode: 'godmode_disabled',
        timestamp: new Date().toISOString()
      });
    }

    // --- NEW: Stock symbol extraction and Finnhub prioritization ---
    const matchedStocks = extractPrioritizedStockSymbols(message);
    if (matchedStocks.length > 0) {
      logger.info('Prioritized stock(s) detected in query:', matchedStocks);
      // For now, handle only the first matched stock for simplicity
      const symbol = matchedStocks[0];
      const finnhubErrors: string[] = [];
      let sentiment = '', transactions = '', earnings = '', news = '';
      try {
        // Fetch all Finnhub data in parallel, but catch errors per section
        const results = await Promise.allSettled([
          getInsiderSentiment(symbol),
          getInsiderTransactions(symbol),
          getCompanyEarnings(symbol),
          getCompanyNews(symbol),
          // getCompanyProfile(symbol), // No longer needed
        ]);
        sentiment = results[0].status === 'fulfilled' ? results[0].value : (finnhubErrors.push('Insider Sentiment'), '');
        transactions = results[1].status === 'fulfilled' ? results[1].value : (finnhubErrors.push('Insider Transactions'), '');
        earnings = results[2].status === 'fulfilled' ? results[2].value : (finnhubErrors.push('Earnings'), '');
        news = results[3].status === 'fulfilled' ? results[3].value : (finnhubErrors.push('News'), '');
        // profile = results[4].status === 'fulfilled' ? results[4].value : (finnhubErrors.push('Profile'), ''); // No longer needed
      } catch (finnhubError) {
        logger.error('Finnhub prioritized stock fetch failed, falling back to LLM:', finnhubError);
        // Fallback to LLM/narrative below
      }
      // Format the response
      let response = `**🔎 ${symbol} Stock Intelligence (Finnhub)**\n\n`;
      if (finnhubErrors.length > 0) {
        response += `⚠️ _Some live data could not be loaded: ${finnhubErrors.join(', ')}. Showing available data below._\n\n`;
      }
      // Only include sections with valid data
      const sections = [];
      // Company Profile section removed entirely due to low value and frequent inaccuracies
      // if (hasValuableProfile) {
      //   sections.push({ title: '🏢 **Company Profile**', content: profile });
      // }
      
      if (sentiment && !sentiment.includes('No insider sentiment data available') && !sentiment.includes('Unable to fetch')) {
        sections.push({ title: '📊 **Insider Sentiment**', content: sentiment });
      }
      
      if (transactions && !transactions.includes('No insider transactions data available') && !transactions.includes('Unable to fetch') && !transactions.includes('$NaN')) {
        sections.push({ title: '💸 **Insider Transactions**', content: transactions });
      }
      
      if (earnings && !earnings.includes('No earnings data available') && !earnings.includes('Unable to fetch')) {
        sections.push({ title: '💰 **Earnings**', content: earnings });
      }
      
      if (news && !news.includes('No news data available') && !news.includes('Unable to fetch')) {
        sections.push({ title: '📰 **Recent News**', content: news });
      }
      
      // Format sections with clean spacing
      sections.forEach((section, index) => {
        response += `${section.title}\n${section.content}\n`;
        if (index < sections.length - 1) {
          response += '\n';
        }
      });
      
      // If no valid data, show a simple message
      if (sections.length === 0) {
        response += `_No live data available for ${symbol} at this time. Please try again later._\n`;
      }
      tracker.end('total');
      tracker.logTimings();
      logger.info('Finnhub prioritized stock response completed:', { symbol, duration: Date.now() - startTime });
      return createSuccessResponse(response);
    }

    // Log request details for monitoring
    logger.info('Request details:', {
      clientId,
      messageLength: message.length,
      hasStream: stream,
      temperature,
      timestamp: new Date().toISOString()
    });

    // Handle image generation requests
    if (generateImage && imagePrompt) {
      logger.info('Image generation requested:', imagePrompt);
      try {
        const generatedImageUrl = await generateImageWithXAI({
          prompt: imagePrompt,
          model: 'grok-2-image',
          size: '1024x1024',
          quality: 'standard',
          style: 'vivid'
        });
        
        tracker.end('total');
        tracker.logTimings();
        
        logger.info('Image generation completed:', {
          duration: Date.now() - startTime,
          imageUrl: generatedImageUrl.substring(0, 100) + '...'
        });
        
        return createSuccessResponse(`Generated image: ${generatedImageUrl}`);
      } catch (error) {
        logger.error('Image generation failed:', error);
        return createErrorResponse('Failed to generate image. Please try again.');
      }
    }

    // Handle vision analysis requests
    if (imageUrl) {
      logger.info('Vision analysis requested:', { imageUrl: imageUrl.substring(0, 100) + '...', query: message });
      try {
        const analysis = await analyzeImage(imageUrl, message);
        
        tracker.end('total');
        tracker.logTimings();
        
        logger.info('Vision analysis completed:', {
          duration: Date.now() - startTime,
          analysisLength: analysis.length
        });
        
        return createSuccessResponse(analysis);
      } catch (error) {
        logger.error('Vision analysis failed:', error);
        return createErrorResponse('Failed to analyze image. Please try again.');
      }
    }

    // Handle GM queries - Market data + X sentiment analysis
    if (isGMQuery(message)) {
      logger.info('GM market data + X sentiment analysis requested:', message);
      try {
        // Extract period from message if present
        let period: "24h" | "7d" | "ytd" = "24h";
        const additionalPeriods: ("7d" | "ytd")[] = [];
        
        const messageLower = message.toLowerCase();
        
        // Check for specific period requests
        if (messageLower.includes('7d') || messageLower.includes('7 day') || messageLower.includes('week')) {
          if (messageLower.includes('7d') || messageLower.includes('7 day') || messageLower.includes('week')) {
            period = "7d";
          }
        } else if (messageLower.includes('ytd') || messageLower.includes('year to date') || messageLower.includes('year-to-date') || messageLower.includes('this year')) {
          period = "ytd";
        }
        
        // Check for multiple period requests
        if (messageLower.includes('both') || messageLower.includes('all') || messageLower.includes('multiple')) {
          if (messageLower.includes('7d') || messageLower.includes('week')) {
            additionalPeriods.push("7d");
          }
          if (messageLower.includes('ytd') || messageLower.includes('year')) {
            additionalPeriods.push("ytd");
          }
        }
        
        // Check for specific outperformance keywords
        const outperformanceKeywords = [
          'outperform', 'outperforming', 'beating', 'beats', 'better than', 'stronger than',
          'winners', 'top performers', 'leading', 'ahead of', 'above', 'higher than'
        ];
        
        const hasOutperformanceRequest = outperformanceKeywords.some(keyword => 
          messageLower.includes(keyword)
        );
        
        // If no specific period mentioned but outperformance is requested, default to 24h
        if (hasOutperformanceRequest && period === "24h" && additionalPeriods.length === 0) {
          // Keep default 24h
        }

        // Fetch market data first (fast APIs)
        logger.info('Fetching market data for GM...');
        const fetchStart = Date.now();

        // Fetch essential market data in parallel
        const [btcPrice, btcTables] = await Promise.all([
          getFastBTCPrice(),
          getBTCOutperformersAndAltcoinTables(period)
        ]);
        const cryptoStocks = await _getCryptoStocksData(btcTables.btcChange);
        
        // Only fetch additional data if specifically requested
        // let additionalOutperformers = '';
        // if (hasOutperformersRequest && (has7dRequest || hasYtdRequest)) {
        //   additionalOutperformers = btcTables.btcOutperformersTable;
        // }
        
        logger.info('Market data fetched in', Date.now() - fetchStart, 'ms');
        
        // Generate dynamic GM greeting
        const gmGreetings = [
          "🌅 **GOOD MORNING CRYPTO**",
          "🌞 **RISE AND GRIND, DEGENS**",
          "🚀 **WAKE UP, IT'S MOON TIME**",
          "⚡ **MORNING VOLTAGE**",
          "🔥 **GOOD MORNING, BULLS**",
          "💎 **DIAMOND HANDS MORNING**",
          "🌊 **TIDAL WAVES**",
          "⚔️ **BATTLE STATIONS**",
          "🎯 **PRECISION STRIKE**",
          "🌪️ **WHIRLWIND OF OPPORTUNITY**",
          "🏆 **CHAMPIONS**",
          "🎪 **CIRCUS MAXIMUS**",
          "⚡ **LIGHTNING ROUND**",
          "🌋 **VOLCANIC MORNING**",
          "🎭 **THEATER OF CRYPTO**",
          "🦅 **EAGLE EYE**",
          "🎪 **CARNIVAL**",
          "⚡ **ENERGY SURGE**",
          "🌊 **TSUNAMI**",
          "🎯 **BULLSEYE**"
        ];
        
        const randomGreeting = gmGreetings[Math.floor(Math.random() * gmGreetings.length)];
        let marketSummary = `${randomGreeting}\n\n`;
        
        // Bitcoin section
        marketSummary += `**💰 BITCOIN**\n`;
        marketSummary += `- **Current Price:** $${btcPrice ? btcPrice.toLocaleString() : 'unavailable'}\n`;
        marketSummary += `\n`;
        
        // Market summary section
        marketSummary += `**📊 Market Summary (${btcTables.label})**\n`;
        marketSummary += `Bitcoin: ${btcTables.btcChange >= 0 ? '🟢' : '🔴'} ${btcTables.btcChange >= 0 ? '+' : ''}${btcTables.btcChange.toFixed(2)}%\n\n`;
        
        // BTC Outperformers section (now includes market cap)
        marketSummary += btcTables.btcOutperformersTable + '\n\n';
        
        // Remove the separate altcoins section since it's now merged into the outperformers table
        
        // Crypto stocks section
        marketSummary += `\n`;
        marketSummary += cryptoStocks || '_Unable to fetch stock data_\n\n';
        
        // Enhanced X sentiment analysis prompt with specific asset focus
        const xSentimentPrompt = `Write a single, concise paragraph summarizing today's hottest crypto news, memes, and sentiment as seen on X. Focus on the most important narratives, price action, and viral stories for BTC, ETH, top altcoins, and crypto stocks. Make it sound like a social media recap, not a list. Mention at least one X meme, thread, or influencer per asset if possible. If nothing is trending, say so, but always provide a narrative summary.`;

        // Try Grok4 for X sentiment analysis with timeout
        
        // Start Grok4 call in background with very aggressive timeout
        const grok4Timeout = 8000; // 8 second timeout
        const enhancedSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;
        addToConversationHistory(clientId, { role: 'user', content: message });
        
        // Try Grok4 for X sentiment analysis with timeout
        let xSentimentAnalysis = '';
        try {
          const grok4Response = await Promise.race([
            Grok4Service.chatCompletion({
              messages: [
                { role: 'system', content: enhancedSystemPrompt },
                { role: 'user', content: xSentimentPrompt }
              ],
              temperature: temperature || 0.7,
              tools: ENHANCED_TOOLS,
              tool_choice: 'auto',
              max_tokens: 2000,
            }),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Grok4 X sentiment timeout')), grok4Timeout)
            )
          ]);
          logger.info('Raw Grok4 X sentiment output:', grok4Response);
          
          xSentimentAnalysis = grok4Response.choices?.[0]?.message?.content || '';
          logger.info('Grok4 X sentiment analysis completed successfully');
        } catch (error) {
          logger.warn('Grok4 X sentiment analysis failed:', error);
          // Generate fallback X sentiment summary based on market data
          const btcChange = typeof btcPrice === 'number' ? btcPrice : null;
          let stockSummary = '';

          // Parse BTC outperformers for top movers
          let btcOutperformersList: string[] = [];
          if (btcTables.btcOutperformersTable && !btcTables.btcOutperformersTable.includes('_Unable to fetch')) {
            const outperformerLines = btcTables.btcOutperformersTable.split('\n').filter(l => l.includes('|'));
            btcOutperformersList = outperformerLines.slice(2, 7).map(line => {
              const parts = line.split('|').map(s => s.trim());
              return parts[1] ? `${parts[1]} (${parts[2]})` : null;
            }).filter(Boolean) as string[];
          }

          // Parse altcoins table for top movers
          let altcoinMovers: string[] = [];
          if (btcTables.btcOutperformersTable) { // Use btcOutperformersTable for altcoin movers
            const outperformerLines = btcTables.btcOutperformersTable.split('\n').filter(l => l.includes('|'));
            altcoinMovers = outperformerLines.slice(2, 7).map(line => {
              const parts = line.split('|').map(s => s.trim());
              return parts[1] ? `${parts[1]} (${parts[2]})` : null;
            }).filter(Boolean) as string[];
            if (altcoinMovers.length) {
              stockSummary = `Memecoins and top altcoins like ${altcoinMovers.join(', ')} are making noise, with degens and whales alike watching closely.`;
            }
          }

          // Parse crypto stocks table for top movers
          let stockMovers: string[] = [];
          if (cryptoStocks) {
            const stockLines = cryptoStocks.split('\n').filter(l => l.includes('|'));
            stockMovers = stockLines.slice(2, 7).map(line => {
              const parts = line.split('|').map(s => s.trim());
              return parts[1] ? `${parts[1]} (${parts[2]})` : null;
            }).filter(Boolean) as string[];
            if (stockMovers.length) {
              stockSummary = `Wall Street's crypto darlings—${stockMovers.join(', ')}—are in the spotlight, with traders debating if the rally has legs or is just another head fake.`;
            }
          }

          // Compose a narrative-style, on-brand paragraph with randomized structure
          const openers = [
            `On X, the vibes are anything but neutral.`,
            `Crypto Twitter woke up caffeinated and ready to rumble.`,
            `The timeline is buzzing louder than a mining farm in Sichuan.`,
            `If you blinked, you missed a meme war and a new all-time high for engagement.`
          ];
          const opener = openers[Math.floor(Math.random() * openers.length)];

          const btcSentence = btcChange !== null ? `Bitcoin is trading at $${btcChange.toLocaleString()}, still the main character in today's market drama.` : '';
          // Only mention outperformers in one place
          let outperformerSentence = '';
          let altcoinSentence = '';
          if (btcOutperformersList.length > 0) {
            // 50% chance: weave into main narrative, 50% as punchline
            if (Math.random() < 0.5) {
              altcoinSentence = `Memecoins and top altcoins like ${btcOutperformersList.slice(0, 3).join(', ')} are making noise, with degens and whales alike watching closely.`;
              outperformerSentence = '';
            } else {
              altcoinSentence = '';
              outperformerSentence = `But the real flex? Outperformers like ${btcOutperformersList.slice(0, 3).join(', ')}—they're the talk of the town, leaving BTC maximalists sweating.`;
            }
          }
          const stockSentence = stockSummary;
          const hypeSentences = [
            `Everyone's got an opinion on ETF flows, airdrops, and the next memecoin moonshot.`,
            `Regulatory FUD is trending, but so are diamond hands and laser eyes.`,
            `If you missed the latest airdrop, don't worry—there's always another narrative brewing.`,
            `The only thing moving faster than prices is the meme cycle.`
          ];
          const hypeSentence = hypeSentences[Math.floor(Math.random() * hypeSentences.length)];

          // Unique, witty closing lines
          const closers = [
            `Crypto Twitter's got more energy than a double espresso on options expiry day.`,
            `The only thing more volatile than the charts is the meme feed.`,
            `Stay sharp, stay caffeinated, and don't get rekt.`,
            `If you're not outperforming BTC, at least outperform your own FOMO.`,
            `Remember: in this market, conviction is good, but exit liquidity is better.`
          ];
          const closer = closers[Math.floor(Math.random() * closers.length)];

          // Shuffle the order for variety, but always end with the closer
          const summaryParts = [opener, btcSentence, altcoinSentence, stockSentence, hypeSentence, outperformerSentence]
            .filter(Boolean);
          for (let i = summaryParts.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [summaryParts[i], summaryParts[j]] = [summaryParts[j], summaryParts[i]];
          }
          summaryParts.push(closer);

          xSentimentAnalysis = summaryParts.join(' ');
        }
        
        // Combine market data with X sentiment analysis
        const fullResponse = `${marketSummary}\n\n**🤖 X SENTIMENT ANALYSIS**\n\n${xSentimentAnalysis}`;
        
        // Return combined response
        tracker.end('total');
        tracker.logTimings();
        
        logger.info('GM full response completed:', {
          duration: Date.now() - startTime,
          responseLength: fullResponse.length,
          hasXSentiment: xSentimentAnalysis.length > 0
        });
        
        return new Response(
          new ReadableStream({
            start(controller) {
              controller.enqueue(new TextEncoder().encode(`data: ${fullResponse}\n\n`));
              controller.close();
            }
          }),
          {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          }
        );
      } catch (error) {
        logger.error('GM handler error:', error);
        return createErrorResponse('Good morning! Having trouble fetching market data. Check CoinGecko for live prices.');
      }
    }

    // Handle price predictions
    if (isPricePredictionQuery(message)) {
      logger.info('Price prediction shortcut triggered for query:', message);
      const response = await handlePricePrediction(message, systemPrompt, temperature);
      tracker.end('total');
      tracker.logTimings();
      
      // Log successful response
      logger.info('Price prediction completed:', {
        duration: Date.now() - startTime,
        responseLength: response.length
      });
      
      return createSuccessResponse(response);
    }

    // Validate API key
    if (!process.env.XAI_API_KEY) {
      logger.error('XAI_API_KEY is not configured');
      return createErrorResponse('Grok4 service is not properly configured. Please contact support.', 500);
    }

    // Enhanced system prompt with context awareness
    const enhancedSystemPrompt = systemPrompt || DEFAULT_SYSTEM_PROMPT;

    logger.info('Grok4 SYSTEM PROMPT:', enhancedSystemPrompt);
    logger.info('Grok4 USER MESSAGE:', message);

    // Prepare tools with enhanced capabilities
    const tools: ChatCompletionTool[] = [];
    if (needsWebSearch(message)) {
      tools.push(...ENHANCED_TOOLS);
    }

    // Prepare messages with conversation context and history
    const conversationHistory = getConversationHistory(clientId);
    // const messages: ChatCompletionMessageParam[] = [
    //   { role: 'system', content: enhancedSystemPrompt },
    //   ...conversationHistory,
    //   { role: 'user', content: message }
    // ];
    // Add current message to conversation history
    addToConversationHistory(clientId, { role: 'user', content: message });

    // Build Grok 4 prompt string
    const grok4Prompt = buildGrok4Prompt(conversationHistory, message);

    // Handle streaming
    if (stream) {
      return await handleStreamingResponse(tools, temperature, tracker, clientId, enhancedSystemPrompt, grok4Prompt);
    }

    // Handle non-streaming
    return await handleNonStreamingResponse(tools, temperature, tracker, clientId, enhancedSystemPrompt, grok4Prompt);
    
  } catch (error) {
    tracker.end('total');
    logger.error('Grok4 API call failed:', error);
    tracker.logTimings();
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const duration = Date.now() - startTime;
    
    // Log error details for debugging
    logger.error('Error details:', {
      clientId,
      duration,
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
    
    return createErrorResponse(`Sorry, I'm having trouble connecting to Grok4 right now. Please try again in a moment. (${errorMessage})`);
  }


}

// Streaming response handler with enhanced error handling
async function handleStreamingResponse(
  tools: ChatCompletionTool[],
  temperature: number | undefined,
  tracker: PerformanceTracker,
  clientId: string,
  enhancedSystemPrompt: string,
  grok4Prompt: string
): Promise<Response> {
  try {
    tracker.start('streaming');
        const OpenAI = (await import('openai')).default;
        
        // Add timeout to Grok4 API call
        const grok4Timeout = 15000; // 15 second timeout (increased from 5s)
        const grok4Promise = new OpenAI({
          apiKey: process.env.XAI_API_KEY,
          baseURL: 'https://api.x.ai/v1',
        }).chat.completions.create({
          model: 'grok-4',
          messages: [
            { role: 'system', content: enhancedSystemPrompt },
            { role: 'user', content: grok4Prompt }
          ],
          temperature: temperature || 0.7,
          ...(tools.length > 0 && { tools, tool_choice: 'auto' }),
                  stream: true,
        max_tokens: 2000,
        });
        
        const completionStream = await Promise.race([
          grok4Promise,
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Grok4 API timeout')), grok4Timeout)
          )
        ]);

        const encoder = new TextEncoder();
        const streamResponse = new ReadableStream({
          async start(controller) {
            try {
          let toolCallId = '';
          let toolCallFunction = '';
          let toolCallArguments = '';
          let contentLength = 0;
        
              for await (const chunk of completionStream) {
                const content = chunk.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
              contentLength += content.length;
                }
            
                // Handle tool calls in streaming
                const toolCalls = chunk.choices?.[0]?.delta?.tool_calls;
                if (toolCalls) {
              for (const toolCall of toolCalls) {
                if (toolCall.id) toolCallId = toolCall.id;
                if (toolCall.function?.name) toolCallFunction = toolCall.function.name;
                if (toolCall.function?.arguments) toolCallArguments += toolCall.function.arguments;

                if (toolCallFunction && toolCallArguments) {
                  let toolResult = '';
                  if (toolCallFunction === 'search') {
                    const { query } = JSON.parse(toolCallArguments);
                    toolResult = await enhancedWebSearch(query);
                  } else if (toolCallFunction === 'get_crypto_price') {
                    const { symbol, currency: _currency = 'USD' } = JSON.parse(toolCallArguments);
                    const query = `${symbol} price`;
                    toolResult = await getCryptoPrice(query);
                  } else if (toolCallFunction === 'get_market_data') {
                    const { symbols } = JSON.parse(toolCallArguments);
                    toolResult = await getMarketData(symbols);
                  } else if (toolCallFunction === 'get_x_sentiment') {
                    const { tweetUrl } = JSON.parse(toolCallArguments);
                    toolResult = await getXSentiment(tweetUrl);
                  } else if (toolCallFunction === 'get_stock_price') {
                    const { symbol } = JSON.parse(toolCallArguments);
                    try {
                      const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
                      if (response.ok) {
                        const data = await response.json();
                        const quote = data?.quoteResponse?.result?.[0];
                        if (quote) {
                          const price = quote.regularMarketPrice;
                          const change = quote.regularMarketChangePercent;
                          const marketCap = quote.marketCap;
                          toolResult = `${symbol} Stock Data:
💰 Price: $${price?.toFixed(2) || 'N/A'}
${change >= 0 ? '🟢' : '🔴'} 24h Change: ${change >= 0 ? '+' : ''}${change?.toFixed(2) || 'N/A'}%
📊 Market Cap: $${marketCap ? new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(marketCap) : 'N/A'}
⏰ Updated: ${new Date().toLocaleString()}`;
                        } else {
                          toolResult = `No data found for ${symbol}`;
                        }
                      } else {
                        toolResult = `Failed to fetch data for ${symbol}`;
                      }
                    } catch (error) {
                      toolResult = `Error fetching stock data for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
                    }
                  } else if (toolCallFunction === 'get_insider_sentiment') {
                    const { symbol, from, to } = JSON.parse(toolCallArguments);
                    toolResult = await getInsiderSentiment(symbol, from, to);
                  } else if (toolCallFunction === 'get_insider_transactions') {
                    const { symbol, from, to } = JSON.parse(toolCallArguments);
                    toolResult = await getInsiderTransactions(symbol, from, to);
                  } else if (toolCallFunction === 'get_ipo_calendar') {
                    const { from, to } = JSON.parse(toolCallArguments);
                    toolResult = await getIPOCalendar(from, to);
                  } else if (toolCallFunction === 'get_company_earnings') {
                    const { symbol } = JSON.parse(toolCallArguments);
                    toolResult = await getCompanyEarnings(symbol);
                  } else if (toolCallFunction === 'get_company_news') {
                    const { symbol, from, to } = JSON.parse(toolCallArguments);
                    toolResult = await getCompanyNews(symbol, from, to);
                  } else if (toolCallFunction === 'get_company_profile') {
                    const { symbol } = JSON.parse(toolCallArguments);
                    toolResult = await getCompanyProfile(symbol);
                  } else if (toolCallFunction === 'get_market_status') {
                    const { exchange } = JSON.parse(toolCallArguments);
                    toolResult = await getMarketStatus(exchange);
                  } else if (toolCallFunction === 'verify_fact') {
                    const { claim, context } = JSON.parse(toolCallArguments);
                    toolResult = await verifyFact(claim, context);
                  }
                  // Push tool response message
                  const toolResponseMsg: ChatCompletionMessageParam = {
                    role: 'tool',
                    tool_call_id: toolCallId,
                    content: toolResult,
                  };
                  // Add to conversation and call model again
                  const updatedMessages: ChatCompletionMessageParam[] = [
                    { role: 'system', content: enhancedSystemPrompt },
                    { role: 'user', content: grok4Prompt },
                    toolResponseMsg
                  ];
                  const finalCompletion = await Grok4Service.chatCompletion({
                    messages: updatedMessages,
                    temperature: temperature || 0.7,
                    max_tokens: 2000,
                  });
                  const finalContent = finalCompletion.choices?.[0]?.message?.content;
                  if (finalContent) {
                    controller.enqueue(encoder.encode(finalContent));
                    contentLength += finalContent.length;
                  }
                }
              }
            }
          }
          
          // Log streaming completion
          logger.info('Streaming completed:', {
            contentLength,
            toolCalls: tools.length > 0 ? 'yes' : 'no'
          });
          
            } catch (streamError) {
              logger.error('Streaming error:', streamError);
              controller.enqueue(encoder.encode('Sorry, there was an error with the streaming response.'));
            } finally {
              controller.close();
            }
          }
        });
    
    tracker.end('streaming');
    tracker.end('total');
    tracker.logTimings();
    
        return new Response(streamResponse, {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
          },
        });
      } catch (streamError) {
    tracker.end('streaming');
    tracker.end('total');
        logger.error('Failed to create streaming response:', streamError);
    tracker.logTimings();
    return createErrorResponse('Sorry, I\'m having trouble with the streaming response. Please try again.');
  }
}

// Non-streaming response handler with enhanced monitoring
async function handleNonStreamingResponse(
  tools: ChatCompletionTool[],
  temperature: number | undefined,
  tracker: PerformanceTracker,
  clientId: string,
  enhancedSystemPrompt: string,
  grok4Prompt: string
): Promise<Response> {
  tracker.start('grok4_api');
  let completion;
  let content: string | undefined;
  let toolCallCount = 0;

  try {
    completion = await Promise.race([
      Grok4Service.chatCompletion({
        messages: [
          { role: 'system', content: enhancedSystemPrompt },
          { role: 'user', content: grok4Prompt }
        ],
        temperature: temperature || 0.7,
        ...(tools.length > 0 && { tools, tool_choice: 'auto' }),
        max_tokens: 2000,
      }),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Grok4 API timeout')), 15000)
      )
    ]);
    tracker.end('grok4_api');
  } catch (grokError) {
    tracker.end('grok4_api');
    tracker.end('total');
    logger.error('Grok4 API error:', grokError);
    tracker.logTimings();
    return createErrorResponse(
      'Sorry, Grok4 or live web search is taking too long to respond. This sometimes happens for travel or open-ended queries. Please try again, rephrase your question, or ask for a general tip.',
      504
    );
  }

  // Handle tool calls (search) - only if tools were provided
  if (tools.length > 0) {
    while (true) {
      const toolCall = Grok4Service.extractToolCall(completion);
      if (!toolCall || !toolCall.function?.name) break;
      toolCallCount++;
      if (toolCallCount > 3) {
        logger.warn('Too many tool calls, stopping to prevent infinite loops');
        break;
      }
      try {
        const toolCallId = toolCall.id;
        const toolCallFunction = toolCall.function.name;
        const toolCallArguments = toolCall.function.arguments;
        let toolResult = '';
        if (toolCallFunction === 'search') {
          const { query } = JSON.parse(toolCallArguments);
          toolResult = await enhancedWebSearch(query);
        } else if (toolCallFunction === 'get_crypto_price') {
          const { symbol, currency: _currency = 'USD' } = JSON.parse(toolCallArguments);
          const query = `${symbol} price`;
          toolResult = await getCryptoPrice(query);
        } else if (toolCallFunction === 'get_market_data') {
          const { symbols } = JSON.parse(toolCallArguments);
          toolResult = await getMarketData(symbols);
        } else if (toolCallFunction === 'get_x_sentiment') {
          const { tweetUrl } = JSON.parse(toolCallArguments);
          toolResult = await getXSentiment(tweetUrl);
        } else if (toolCallFunction === 'get_stock_price') {
          const { symbol } = JSON.parse(toolCallArguments);
          try {
            const response = await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol}`);
            if (response.ok) {
              const data = await response.json();
              const quote = data?.quoteResponse?.result?.[0];
              if (quote) {
                const price = quote.regularMarketPrice;
                const change = quote.regularMarketChangePercent;
                const marketCap = quote.marketCap;
                toolResult = `${symbol} Stock Data:
💰 Price: $${price?.toFixed(2) || 'N/A'}
${change >= 0 ? '🟢' : '🔴'} 24h Change: ${change >= 0 ? '+' : ''}${change?.toFixed(2) || 'N/A'}%
📊 Market Cap: $${marketCap ? new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(marketCap) : 'N/A'}
⏰ Updated: ${new Date().toLocaleString()}`;
              } else {
                toolResult = `No data found for ${symbol}`;
              }
            } else {
              toolResult = `Failed to fetch data for ${symbol}`;
            }
          } catch (error) {
            toolResult = `Error fetching stock data for ${symbol}: ${error instanceof Error ? error.message : 'Unknown error'}`;
          }
        } else if (toolCallFunction === 'get_insider_sentiment') {
          const { symbol, from, to } = JSON.parse(toolCallArguments);
          toolResult = await getInsiderSentiment(symbol, from, to);
        } else if (toolCallFunction === 'get_insider_transactions') {
          const { symbol, from, to } = JSON.parse(toolCallArguments);
          toolResult = await getInsiderTransactions(symbol, from, to);
        } else if (toolCallFunction === 'get_ipo_calendar') {
          const { from, to } = JSON.parse(toolCallArguments);
          toolResult = await getIPOCalendar(from, to);
        } else if (toolCallFunction === 'get_company_earnings') {
          const { symbol } = JSON.parse(toolCallArguments);
          toolResult = await getCompanyEarnings(symbol);
        } else if (toolCallFunction === 'get_company_news') {
          const { symbol, from, to } = JSON.parse(toolCallArguments);
          toolResult = await getCompanyNews(symbol, from, to);
        } else if (toolCallFunction === 'get_company_profile') {
          const { symbol } = JSON.parse(toolCallArguments);
          toolResult = await getCompanyProfile(symbol);
        } else if (toolCallFunction === 'get_market_status') {
          const { exchange } = JSON.parse(toolCallArguments);
          toolResult = await getMarketStatus(exchange);
        } else if (toolCallFunction === 'verify_fact') {
          const { claim, context } = JSON.parse(toolCallArguments);
          toolResult = await verifyFact(claim, context);
        } else {
          toolResult = `Unknown tool: ${toolCallFunction}`;
        }
        // Push tool response message
        const toolResponseMsg: ChatCompletionMessageParam = {
          role: 'tool',
          tool_call_id: toolCallId,
          content: toolResult,
        };
        const updatedMessages: ChatCompletionMessageParam[] = [
          { role: 'system', content: enhancedSystemPrompt },
          { role: 'user', content: grok4Prompt },
          toolResponseMsg
        ];
        completion = await Promise.race([
          Grok4Service.chatCompletion({
            messages: updatedMessages,
            temperature: temperature || 0.7,
            max_tokens: 2000,
          }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Grok4 API timeout')), 15000)
          )
        ]);
      } catch (toolError) {
        logger.error('Tool call error:', toolError);
        break;
      }
    }
  }

  // Extract content from final response with improved error handling
  content = (completion.choices?.[0]?.message?.content ?? undefined);

  // Add detailed logging to debug the empty response
  logger.info('Grok4 completion object:', JSON.stringify(completion, null, 2));
  logger.info('Grok4 content field:', content);
  logger.info('Grok4 content type:', typeof content);
  logger.info('Grok4 content length:', content?.length);
  logger.info('Tool calls made:', toolCallCount);

  // Improved empty content handling with specific fallback messages
  if (!content || !content.trim()) {
    logger.error('Grok4 returned empty content. Full response:', JSON.stringify(completion, null, 2));
    // Fallback: Try a direct Grok4 completion with a special prompt
    try {
      const fallbackPrompt = `${grok4Prompt}\n\nIf you can't access live data, give your best witty, helpful answer anyway.`;
      const fallbackCompletion = await Grok4Service.chatCompletion({
        messages: [
          { role: 'system', content: enhancedSystemPrompt },
          { role: 'user', content: fallbackPrompt }
        ],
        temperature: temperature || 0.7,
        max_tokens: 2000,
      });
      content = fallbackCompletion.choices?.[0]?.message?.content || '';
    } catch (fallbackError) {
      logger.error('Grok4 fallback completion error:', fallbackError);
      content = 'I couldn\'t generate a proper response. Please try rephrasing your question.';
    }
    // If still empty, use a generic fallback
    if (!content || !content.trim()) {
      if (grok4Prompt.toLowerCase().includes('price') || grok4Prompt.toLowerCase().includes('btc') || grok4Prompt.toLowerCase().includes('bitcoin')) {
        content = 'I\'m having trouble getting the current Bitcoin price right now. You can check live prices on CoinGecko or CoinMarketCap. As Satoshi would say: "The price is what the market decides!"';
      } else {
        content = 'I couldn\'t generate a proper response. Please try rephrasing your question.';
      }
    }
  }

  tracker.end('total');
  tracker.logTimings();

  // Add assistant response to conversation history
  if (content) {
    addToConversationHistory(clientId, { role: 'assistant', content });
  }

  // Log successful completion
  logger.info('Non-streaming response completed:', {
    contentLength: content?.length || 0,
    toolCalls: toolCallCount,
    hasTools: tools.length > 0
  });

  return createSuccessResponse(content);
} 