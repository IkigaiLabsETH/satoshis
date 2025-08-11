import { BTC_ADVISOR_CONFIG } from './config';
import type { DecisionInput, DecisionOutput } from './types';
import { pickTopSignals } from './score';

function roundToHalfPercent(value: number) {
  return Math.round(value * 2) / 2;
}

export function decideBtcTargetAllocation(input: DecisionInput, cfg = BTC_ADVISOR_CONFIG): DecisionOutput {
  const { /* currentPct, */ basePct, user, scores, ctx } = input;

  const w = cfg.weights[ctx.regime];
  let net = w.macro * scores.macro
          + w.onchain * scores.onchain
          + w.structure * scores.structure
          + w.stable * scores.stable
          + w.sentiment * scores.sentiment
          - scores.penalties;

  const contributions = (['macro','onchain','structure','stable','sentiment'] as const)
    .map((k) => ({ key: k, score: scores[k], weight: w[k], contribution: w[k] * scores[k] }));

  let step = cfg.mapping.step_size_pct[user.profile];
  const volCap = ctx.atr30Pct > cfg.risk.vol_ceiling_atr30_pct;
  if (volCap) step *= 0.5;

  const cooldownPos = net > 0 && input.ctx.lastChangeHrs < cfg.risk.cooldown_hours_pos;
  const cooldownNeg = net < 0 && input.ctx.lastChangeHrs < cfg.risk.cooldown_hours_neg;
  if (cooldownPos) net = Math.max(0, net - 1);
  if (cooldownNeg) net = Math.min(0, net + 1);

  const bearBrake = ctx.priceVs200D < 0 && ctx.realYieldSlopeSig > 0.5;
  if (bearBrake) net = Math.min(0, net);

  const rawDelta = step * net;
  const dailyCap = cfg.risk.daily_max_move_pct;
  const delta = Math.max(-dailyCap, Math.min(dailyCap, rawDelta));

  const unclipped = basePct + delta;
  const target = Math.max(user.minPct, Math.min(user.maxPct, unclipped));

  const rationaleTopSignals = pickTopSignals(scores, w);

  // Build user-facing summary (stance + bullets) for fully allocated users
  const stance: 'Bullish' | 'Neutral' | 'Bearish' = net > 0.25 ? 'Bullish' : net < -0.25 ? 'Bearish' : 'Neutral';
  const headline = stance === 'Bullish' ? 'Bias: Bullish — conditions favor strength' : stance === 'Bearish' ? 'Bias: Bearish — caution warranted' : 'Bias: Neutral — mixed signals';
  const bullets = rationaleTopSignals.map((t) => {
    const label = t.key === 'macro' ? 'Macro/liquidity' : t.key === 'onchain' ? 'On-chain health' : t.key === 'structure' ? 'Market structure' : t.key === 'stable' ? 'Stablecoin/liquidity' : 'Narrative/sentiment';
    const tenor = t.score > 0 ? 'supportive' : t.score < 0 ? 'headwind' : 'neutral';
    return `${label}: ${tenor} (score ${t.score > 0 ? '+' : ''}${t.score}, weight ${t.weight.toFixed(2)})`;
  });

  return {
    targetPct: roundToHalfPercent(target),
    deltaPct: roundToHalfPercent(delta),
    rationaleTopSignals,
    details: {
      netScore: net,
      stepPct: step,
      dailyCapPct: dailyCap,
      contributions,
      brakesApplied: { volCap, cooldownPos, cooldownNeg, bearBrake },
    },
    summary: { stance, headline, bullets },
  };
}


