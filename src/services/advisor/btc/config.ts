import type { DecisionConfig, UserProfile } from './types';

export const BTC_ADVISOR_CONFIG: DecisionConfig = {
  risk: {
    user_min_pct: 5,
    user_max_pct: 25,
    daily_max_move_pct: 2.5,
    weekly_turnover_cap_pct: 8,
    vol_ceiling_atr30_pct: 6,
    cooldown_hours_pos: 48,
    cooldown_hours_neg: 24,
  },
  mapping: {
    step_size_pct: {
      conservative: 0.5,
      balanced: 1.0,
      aggressive: 2.0,
    } satisfies Record<UserProfile, number>,
  },
  weights: {
    risk_on:   { macro: 0.2, onchain: 0.35, structure: 0.25, stable: 0.15, sentiment: 0.05 },
    neutral:   { macro: 0.3, onchain: 0.3,  structure: 0.2,  stable: 0.15, sentiment: 0.05 },
    risk_off:  { macro: 0.4, onchain: 0.1,  structure: 0.2,  stable: 0.25, sentiment: 0.05 },
  },
};


