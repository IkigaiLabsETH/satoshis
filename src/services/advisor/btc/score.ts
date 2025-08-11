import type { ScorePack } from './types';

// Placeholder scoring: expect upstream services to compute real scores.
// Keep deterministic and side-effect free for testing.
export function pickTopSignals(scores: ScorePack, weights: Record<string, number>) {
  const entries = (['macro','onchain','structure','stable','sentiment'] as const)
    .map((k) => ({ key: k, score: scores[k], weight: weights[k] ?? 0, contribution: (weights[k] ?? 0) * scores[k] }))
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution));
  return entries.slice(0, 3);
}


