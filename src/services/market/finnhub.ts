// --- Fetch with timeout utility ---
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

if (!FINNHUB_API_KEY) {
  throw new Error('Missing FINNHUB_API_KEY in environment variables');
}

// --- Core Interfaces ---
export interface FinnhubQuote {
  c: number; // Current price
  o: number; // Open price
  h: number; // High price
  l: number; // Low price
  pc: number; // Previous close
  t: number; // Timestamp
}

export interface FinnhubProfile {
  name: string;
  ticker: string;
  exchange: string;
  ipo: string;
  marketCapitalization: number;
  shareOutstanding: number;
  logo: string;
  weburl: string;
  industry: string;
  finnhubIndustry?: string;
  revenueGrowth?: number;
  grossMargin?: number;
  netMargin?: number;
  peRatio?: number;
  freeCashFlow?: number;
  [key: string]: unknown;
}

export interface FinancialStatement {
  symbol: string;
  cik: string;
  data: Array<{
    period: string;
    v: number; // Value
  }>;
  metric: string;
  metricDescription: string;
}

export interface TechnicalIndicator {
  c: number[]; // Close prices
  h: number[]; // High prices
  l: number[]; // Low prices
  o: number[]; // Open prices
  s: string; // Status
  t: number[]; // Timestamps
  v: number[]; // Volume
}

export interface SocialSentiment {
  atTime: string;
  mention: number;
  positiveScore: number;
  negativeScore: number;
  positiveMention: number;
  negativeMention: number;
  score: number;
}

export interface InstitutionalOwnership {
  symbol: string;
  cik: string;
  data: Array<{
    date: string;
    filingDate: string;
    investorName: string;
    shares: number;
    value: number;
  }>;
}

export interface RevenueBreakdown {
  symbol: string;
  cik: string;
  data: Array<{
    period: string;
    v: number;
  }>;
  metric: string;
  metricDescription: string;
}

// --- Enhanced Core Functions ---
export async function getFinnhubQuote(symbol: string): Promise<FinnhubQuote> {
  try {
    const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error('Finnhub API error');
    return await res.json();
  } catch (error) {
    console.error(`Error fetching quote for ${symbol}:`, error);
    // Return fallback data
    return {
      c: 0,
      o: 0,
      h: 0,
      l: 0,
      pc: 0,
      t: Date.now()
    };
  }
}

export async function getFinnhubProfile(symbol: string): Promise<FinnhubProfile> {
  try {
    const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
    const res = await fetchWithTimeout(url);
    if (!res.ok) throw new Error('Finnhub API error');
    return await res.json();
  } catch (error) {
    console.error(`Error fetching profile for ${symbol}:`, error);
    // Return fallback data
    return {
      name: symbol,
      ticker: symbol,
      exchange: 'NASDAQ',
      ipo: 'N/A',
      marketCapitalization: 0,
      shareOutstanding: 0,
      logo: '',
      weburl: '',
      industry: 'Technology',
      revenueGrowth: 0,
      grossMargin: 0,
      netMargin: 0,
      peRatio: 0,
      freeCashFlow: 0
    };
  }
}

// --- Financial Statements (Free Tier) ---
export async function getFinancialStatements(symbol: string, statement: 'bs' | 'ic' | 'cf', freq: 'annual' | 'quarterly' = 'annual'): Promise<FinancialStatement[]> {
  const url = `https://finnhub.io/api/v1/stock/financial-statement?symbol=${encodeURIComponent(symbol)}&statement=${statement}&freq=${freq}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getRevenueBreakdown(symbol: string): Promise<RevenueBreakdown[]> {
  const url = `https://finnhub.io/api/v1/stock/revenue-breakdown?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Technical Analysis (Free Tier) ---
export async function getTechnicalIndicators(symbol: string, resolution: '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M' = 'D', indicator: 'sma' | 'ema' | 'rsi' | 'macd' | 'bbands' | 'stoch' = 'sma', period: number = 14): Promise<TechnicalIndicator> {
  const url = `https://finnhub.io/api/v1/indicator?symbol=${encodeURIComponent(symbol)}&resolution=${resolution}&indicator=${indicator}&period=${period}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getCandlestickData(symbol: string, resolution: '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M' = 'D', from?: number, to?: number): Promise<TechnicalIndicator> {
  let url = `https://finnhub.io/api/v1/stock/candle?symbol=${encodeURIComponent(symbol)}&resolution=${resolution}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Social Sentiment (Free Tier) ---
export async function getSocialSentiment(symbol: string, from?: string, to?: string): Promise<SocialSentiment[]> {
  let url = `https://finnhub.io/api/v1/stock/social-sentiment?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Institutional Data (Free Tier) ---
export async function getInstitutionalOwnership(symbol: string): Promise<InstitutionalOwnership[]> {
  const url = `https://finnhub.io/api/v1/stock/institutional-ownership?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFundOwnership(symbol: string): Promise<any[]> {
  const url = `https://finnhub.io/api/v1/stock/fund-ownership?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Insider Trading (Enhanced) ---
export async function getFinnhubInsiderSentiment(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFinnhubInsiderTransactions(symbol: string, from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/stock/insider-transactions?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Earnings & News (Enhanced) ---
export async function getFinnhubEarnings(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/earnings?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFinnhubCompanyNews(symbol: string, from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/company-news?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Market Data (Enhanced) ---
export async function getFinnhubPeers(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/peers?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFinnhubRecommendation(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/recommendation?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFinnhubPriceTarget(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/price-target?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Market Status & Calendar ---
export async function getMarketStatus(exchange?: string) {
  let url = `https://finnhub.io/api/v1/stock/market-status?token=${FINNHUB_API_KEY}`;
  if (exchange) url += `&exchange=${encodeURIComponent(exchange)}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getIPOCalendar(from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/calendar/ipo?token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getEarningsCalendar(from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/calendar/earnings?token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Economic Data (Free Tier) ---
export async function getEconomicCalendar(from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/calendar/economic?token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getEconomicIndicator(indicator: string) {
  const url = `https://finnhub.io/api/v1/economic?indicator=${encodeURIComponent(indicator)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Forex & Crypto (Free Tier) ---
export async function getForexRates(base: string = 'USD') {
  const url = `https://finnhub.io/api/v1/forex/rates?base=${encodeURIComponent(base)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getCryptoCandles(symbol: string, resolution: '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M' = 'D', from?: number, to?: number) {
  let url = `https://finnhub.io/api/v1/crypto/candle?symbol=${encodeURIComponent(symbol)}&resolution=${resolution}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Company Filings (Free Tier) ---
export async function getCompanyFilings(symbol: string, from?: string, to?: string) {
  let url = `https://finnhub.io/api/v1/stock/filings?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  if (from) url += `&from=${from}`;
  if (to) url += `&to=${to}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Executive Compensation (Free Tier) ---
export async function getExecutiveCompensation(symbol: string) {
  const url = `https://finnhub.io/api/v1/stock/executive-compensation?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetchWithTimeout(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

// --- Backward compatibility aliases ---
export const getInsiderSentiment = getFinnhubInsiderSentiment;
export const getInsiderTransactions = getFinnhubInsiderTransactions;
export const getCompanyEarnings = getFinnhubEarnings;
export const getCompanyNews = getFinnhubCompanyNews;
export const getPriceTarget = getFinnhubPriceTarget;
export const getAnalystRecommendations = getFinnhubRecommendation;
export const getPeers = getFinnhubPeers; 