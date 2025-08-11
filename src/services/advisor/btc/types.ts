export type Regime = 'risk_on' | 'neutral' | 'risk_off';

export type UserProfile = 'conservative' | 'balanced' | 'aggressive';

export interface ScorePack {
  macro: number; // -2..+2
  onchain: number; // -2..+2
  structure: number; // -2..+2
  stable: number; // -2..+2
  sentiment: number; // -2..+2
  penalties: number; // >= 0
}

export interface UserConstraints {
  profile: UserProfile;
  minPct: number; // e.g., 5
  maxPct: number; // e.g., 25
}

export interface Context {
  regime: Regime;
  atr30Pct: number; // 30d ATR as %
  lastChangeHrs: number; // hours since last BTC allocation change
  priceVs200D: number; // ratio, < 0 means below 200D
  realYieldSlopeSig: number; // sigma of slope, positive means rising
}

export interface DecisionConfig {
  risk: {
    user_min_pct: number;
    user_max_pct: number;
    daily_max_move_pct: number;
    weekly_turnover_cap_pct: number;
    vol_ceiling_atr30_pct: number;
    cooldown_hours_pos: number;
    cooldown_hours_neg: number;
  };
  mapping: {
    step_size_pct: Record<UserProfile, number>;
  };
  weights: Record<Regime, {
    macro: number;
    onchain: number;
    structure: number;
    stable: number;
    sentiment: number;
  }>;
}

export interface DecisionInput {
  currentPct: number;
  basePct: number; // baseline target given risk profile
  user: UserConstraints;
  scores: ScorePack;
  ctx: Context;
}

export interface DecisionOutput {
  targetPct: number;
  deltaPct: number;
  rationaleTopSignals: Array<{ key: keyof Omit<ScorePack, 'penalties'>; score: number; weight: number; contribution: number }>; 
  details?: {
    netScore: number;
    stepPct: number;
    dailyCapPct: number;
    contributions: Array<{ key: keyof Omit<ScorePack, 'penalties'>; score: number; weight: number; contribution: number }>;
    brakesApplied: {
      volCap: boolean;
      cooldownPos: boolean;
      cooldownNeg: boolean;
      bearBrake: boolean;
    };
  }
  summary?: {
    stance: 'Bullish' | 'Neutral' | 'Bearish';
    headline: string;
    bullets: string[];
  }
}


