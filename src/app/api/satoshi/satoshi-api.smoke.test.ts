import { describe, it, expect } from 'vitest';

const API_URL = 'http://localhost:3000/api/satoshi';

describe('Satoshi API Smoke Test', () => {
  it('should respond to a basic POST', async () => {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input: 'gm', mode: 'multimodal' }),
    });
    expect(res).toBeDefined();
    expect([200, 400]).toContain(res.status); // Accept 200 or 400 for smoke test
    const data = await res.json();
    // Print for manual inspection
    // eslint-disable-next-line no-console
    console.log('Smoke test response:', data);
  });
}); 