import { NextRequest, NextResponse } from 'next/server';
import { decideBtcTargetAllocation } from '@/services/advisor/btc/decide';
import type { DecisionInput } from '@/services/advisor/btc/types';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Basic rate limiting per-IP
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rl = await rateLimit(ip);
    if (!rl.success) {
      return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 });
    }

    const body = (await req.json()) as Partial<DecisionInput> & { mock?: boolean };

    // Minimal validation and mock fallback so endpoint is immediately testable
    const input: DecisionInput = {
      currentPct: body.currentPct ?? 10,
      basePct: body.basePct ?? 12,
      user: body.user ?? { profile: 'balanced', minPct: 5, maxPct: 25 },
      scores: body.scores ?? { macro: 0, onchain: 0, structure: 0, stable: 0, sentiment: 0, penalties: 0 },
      ctx: body.ctx ?? { regime: 'neutral', atr30Pct: 4, lastChangeHrs: 72, priceVs200D: 0.05, realYieldSlopeSig: -0.2 },
    };

    const decision = decideBtcTargetAllocation(input);
    return NextResponse.json({ success: true, data: decision });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message ?? 'Unknown error' }, { status: 400 });
  }
}

// Optional: expose current advisor config for transparency/debug
export async function GET() {
  const { BTC_ADVISOR_CONFIG } = await import('@/services/advisor/btc/config');
  return NextResponse.json({ success: true, data: BTC_ADVISOR_CONFIG });
}


