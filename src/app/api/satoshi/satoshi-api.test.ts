import { describe, it, expect } from 'vitest';

const API_URL = 'http://localhost:3000/api/satoshi';

const TEST_CASES = [
  {
    input: 'Validate this DeFi protocol',
    mode: 'validator',
    description: 'Validator persona: DeFi protocol validation',
  },
  {
    input: 'Analyze MSTR fundamentals',
    mode: 'analyst',
    description: 'Analyst persona: Stock analysis',
  },
  {
    input: 'Explain Lightning Network simply',
    mode: 'educator',
    description: 'Educator persona: Technical explanation',
  },
  {
    input: 'Write a Bitcoin thread for X',
    mode: 'viral_creator',
    description: 'Viral Creator persona: Bitcoin thread',
  },
  {
    input: 'Create viral thread on Bitcoin ETF flows',
    mode: 'enhanced_viral_creator',
    description: 'Enhanced Viral Creator persona: Platform-specific viral content',
    options: { platform: 'X', content_type: 'thread' },
  },
  {
    input: "Bitcoin is the future of money. Here's why: 1) Limited supply 2) Decentralized 3) Censorship resistant 4) Global accessibility",
    mode: 'platform_adaptation',
    description: 'Platform Adaptation persona: Adapt content for LinkedIn',
    options: { target_platform: 'LinkedIn', content_type: 'post' },
  },
  {
    input: 'Bitcoin adoption in emerging markets',
    mode: 'multi_platform_strategy',
    description: 'Multi-Platform Strategy persona: Content strategy',
    options: { platforms: ['X', 'LinkedIn', 'Instagram'] },
  },
  {
    input: 'What do you think about this new crypto project?',
    mode: 'multimodal',
    description: 'Multi-Modal (auto-detect) persona',
  },
];

describe('Satoshi API Integration (Modernized)', () => {
  for (const test of TEST_CASES) {
    it(
      test.description,
      async () => {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 20000);
        let res;
        try {
          res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              input: test.input,
              mode: test.mode,
              ...(test.options ? { options: test.options } : {}),
            }),
            signal: controller.signal,
          });
        } finally {
          clearTimeout(timeout);
        }
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        const data = await res.json();
        // Print persona and processed output for manual inspection
        // eslint-disable-next-line no-console
        console.log(`\n[${test.description}]\nPersona: ${data.persona}\nProcessed:`, data.processed);
        // Assert on-brand, Bitcoin-first, narrative-driven output
        const processed = typeof data.processed === 'string' ? data.processed : JSON.stringify(data.processed);
        expect(processed).toMatch(/bitcoin|btc|satoshi|crypto|narrative|framework|cycle|etf|institutional|adoption|risk|rotation|volatility|network|decentralization|macro|regulatory|performance|thread|hook|cta|platform|strategy/i);
        // Check for anti-hallucination or live data usage
        expect(processed).not.toMatch(/As an AI language model|I cannot|I am unable|I do not have access|hallucinate/i);
        // Check for warnings or partial data (should be rare, but allowed)
        if (/warning|partial data|timeout/i.test(processed)) {
          // Acceptable, but print for review
          // eslint-disable-next-line no-console
          console.warn('Warning or partial data detected:', processed);
        }
      },
      25000
    );
  }
}); 