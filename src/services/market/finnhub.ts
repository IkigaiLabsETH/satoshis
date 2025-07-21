// import { env } from '@/env.mjs';

const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

if (!FINNHUB_API_KEY) {
  throw new Error('Missing FINNHUB_API_KEY in environment variables');
}

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
  [key: string]: unknown;
}

export async function getFinnhubQuote(symbol: string): Promise<FinnhubQuote> {
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
}

export async function getFinnhubProfile(symbol: string): Promise<FinnhubProfile> {
  const url = `https://finnhub.io/api/v1/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Finnhub API error');
  return await res.json();
} 