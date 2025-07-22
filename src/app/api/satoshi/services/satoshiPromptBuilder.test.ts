// Unit tests for satoshiPromptBuilder service module
// This file is intended to be run with Vitest or Jest
import { describe, it, expect } from 'vitest';

import { estimateTokens, trimContextBlock, buildPromptContext } from './satoshiPromptBuilder';

describe('satoshiPromptBuilder service', () => {
  it('estimateTokens returns a reasonable token count', () => {
    expect(estimateTokens('hello world')).toBeGreaterThan(0);
    expect(typeof estimateTokens('test string')).toBe('number');
  });

  it('trimContextBlock trims to max lines', () => {
    const block = 'line1\nline2\nline3\nline4';
    expect(trimContextBlock(block, 2)).toBe('line1\nline2\nline3');
    expect(trimContextBlock(block, 0)).toBe('line1');
  });

  it('buildPromptContext returns expected structure', () => {
    const result = buildPromptContext({
      btcQuote: 'BTC: $10000',
      marketData: 'ETH: $2000',
      insiderSentimentData: '',
      earningsData: '',
      ipoData: '',
      companyNewsData: '',
      analystData: '',
      priceTargetData: '',
      webSearch: 'web result',
      xSentiment: 'bullish',
      satoshiMarket: '',
      personaPrompt: 'You are Satoshi.',
      brandDnaPrompt: 'Brand DNA here.'
    });
    expect(result).toHaveProperty('prompt');
    expect(result).toHaveProperty('llmMaxTokens');
    expect(result).toHaveProperty('tokenEstimate');
    expect(result).toHaveProperty('trimLevel');
    expect(typeof result.prompt).toBe('string');
    expect(typeof result.llmMaxTokens).toBe('number');
  });
}); 