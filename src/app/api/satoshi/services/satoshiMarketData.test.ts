// Unit tests for satoshiMarketData service module
// This file is intended to be run with Vitest or Jest
import { describe, it, expect } from 'vitest';

import {
  getSatoshiMarketData,
  getSatoshiFinnhubQuote,
  getSatoshiInsiderSentiment,
  getSatoshiCompanyEarnings,
  getSatoshiIPOCalendar,
  getSatoshiCompanyNews,
  getSatoshiAnalystRecommendations,
  getSatoshiPriceTarget,
  getSatoshiWebSearch,
  getSatoshiXSentiment
} from './satoshiMarketData';

describe('satoshiMarketData service', () => {
  it('getSatoshiMarketData returns expected structure', async () => {
    const result = await getSatoshiMarketData(['BTC', 'ETH']);
    expect(result).toHaveProperty('marketData');
    expect(result).toHaveProperty('btcQuote');
    expect(result).toHaveProperty('warning');
    expect(typeof result.marketData).toBe('string');
    expect(typeof result.btcQuote).toBe('string');
    expect(typeof result.warning).toBe('string');
  });

  it('getSatoshiFinnhubQuote returns quote object', async () => {
    const result = await getSatoshiFinnhubQuote('BTC');
    expect(result).toHaveProperty('c');
  });

  it('getSatoshiInsiderSentiment returns data array', async () => {
    const result = await getSatoshiInsiderSentiment('BTC');
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('getSatoshiCompanyEarnings returns earnings array', async () => {
    const result = await getSatoshiCompanyEarnings('BTC');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('epsActual');
  });

  it('getSatoshiIPOCalendar returns ipoCalendar array', async () => {
    const result = await getSatoshiIPOCalendar();
    expect(result).toHaveProperty('ipoCalendar');
    expect(Array.isArray(result.ipoCalendar)).toBe(true);
  });

  it('getSatoshiCompanyNews returns news array', async () => {
    const result = await getSatoshiCompanyNews('BTC');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('headline');
  });

  it('getSatoshiAnalystRecommendations returns recommendations array', async () => {
    const result = await getSatoshiAnalystRecommendations('BTC');
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty('buy');
  });

  it('getSatoshiPriceTarget returns price target object', async () => {
    const result = await getSatoshiPriceTarget('BTC');
    expect(result).toHaveProperty('targetHighPrice');
  });

  it('getSatoshiWebSearch returns a string', async () => {
    const result = await getSatoshiWebSearch('bitcoin');
    expect(typeof result).toBe('string');
  });

  it('getSatoshiXSentiment returns a string', async () => {
    const result = await getSatoshiXSentiment('bitcoin');
    expect(typeof result).toBe('string');
  });
}); 