import { describe, it, expect } from 'vitest';

const API_URL = 'http://localhost:3000/api/satoshi';
const EXAMPLES = [
  'What is the current price of Bitcoin and Ethereum?',
  'Give me analyst recommendations for Coinbase and compare COIN to BTC.',
  'Show me the latest news for NVDA.',
  'Simulate a portfolio with 50% BTC, 25% NVDA, 25% ETH.',
  'What are the top gainers in the crypto market today?',
  'Summarize the latest macroeconomic news.',
  'What is the price target for MSTR?',
  'Compare ETH, BTC, and COIN performance YTD.'
];

describe('Satoshi API Integration', () => {
  for (const input of EXAMPLES) {
    it(`should answer: ${input}`, async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      let res;
      try {
        res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input }),
          signal: controller.signal
        });
      } finally {
        clearTimeout(timeout);
      }
      expect(res).toBeDefined();
      expect(res.status).toBe(200);
      const data = await res.json();
      // Print for manual inspection
      // eslint-disable-next-line no-console
      console.log(`\n[${input}]\nProcessed:`, data.processed);
      // Check for at least one data source or warning
      const processed = typeof data.processed === 'string' ? data.processed : JSON.stringify(data.processed);
      expect(
        /CoinGecko|Finnhub|Web Search|BTC Price Benchmark|Warning:|price|news|recommendation|target|portfolio|performance|macro/i.test(processed)
      ).toBe(true);
    }, 20000);
  }
}); 