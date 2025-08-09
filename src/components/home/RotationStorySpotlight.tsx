"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import useSWR from "swr";

/**
 * ETH/BTC Rotation Playbook spotlight for homepage
 * - Interactive ratio slider with targets and stop-loss
 * - Visual markers at 0.032 (SL), 0.045 / 0.05 / 0.06 (take profits)
 * - Brand styling (DNA yellow), offset shadow, full-width friendly
 */
type Scenario = "conservative" | "base" | "aggressive";

export default function RotationStorySpotlight() {
  const [ratio, setRatio] = useState<number>(0.035);
  const [scenario, setScenario] = useState<Scenario>("base");
  const [allocationPct, setAllocationPct] = useState<number>(25);
  const [coreBtc, setCoreBtc] = useState<number>(21);
  const [tradeBtc, setTradeBtc] = useState<number>(2);
  const [showStory, setShowStory] = useState<boolean>(false);

  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((r) => r.json());
  // Live prices (ETH in BTC & USD, BTC in USD)
  const { data: liveRatio } = useSWR<{ bitcoin?: { usd?: number }; ethereum?: { btc?: number; usd?: number } }>(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,btc",
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 60_000 }
  );
  // Sparkline (ETH priced in BTC)
  const { data: marketChart } = useSWR<{ prices: [number, number][] }>(
    "https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=btc&days=30&interval=daily",
    fetcher,
    { revalidateOnFocus: false, refreshInterval: 5 * 60_000 }
  );
  const sparkValues = useMemo(() => {
    const vals = marketChart?.prices?.map(([, v]) => v) ?? [];
    // Guard against degenerate values
    return vals.length > 3 ? vals : [0.022, 0.024, 0.023, 0.026, 0.028, 0.03, 0.031, 0.033, 0.034, 0.035];
  }, [marketChart]);
  const sparkDailyChange = useMemo(() => {
    if (!sparkValues || sparkValues.length < 2) return null;
    const a = sparkValues[sparkValues.length - 2];
    const b = sparkValues[sparkValues.length - 1];
    if (!a || !b) return null;
    return ((b / a - 1) * 100);
  }, [sparkValues]);
  const [prefilled, setPrefilled] = useState(false);
  const [lastUpdatedMs, setLastUpdatedMs] = useState<number | null>(null);
  const [lastSparkUpdatedMs, setLastSparkUpdatedMs] = useState<number | null>(null);
  useEffect(() => {
    const r = liveRatio?.ethereum?.btc;
    if (!prefilled && typeof r === "number" && r > 0) {
      setRatio(parseFloat(r.toFixed(4)));
      setPrefilled(true);
    }
    if (typeof r === "number" && r > 0) {
      setLastUpdatedMs(Date.now());
    }
  }, [liveRatio, prefilled]);
  useEffect(() => {
    if (marketChart?.prices && marketChart.prices.length > 0) {
      setLastSparkUpdatedMs(Date.now());
    }
  }, [marketChart]);

  const isLive = lastUpdatedMs ? Date.now() - lastUpdatedMs < 90_000 : false;
  const fmtTime = (ms: number | null) =>
    ms ? new Date(ms).toLocaleTimeString(undefined, { hour12: false }) : "";

  // Scenario-driven auto-suggestion (recompute Trade when core or scenario changes)
  const roundStep = (v: number, step = 0.01) => Math.round(v / step) * step;
  useEffect(() => {
    const impliedTotal = coreBtc / 0.69;
    const capacity = Math.max(0, impliedTotal - coreBtc);
    const suggestedAlloc = scenario === "conservative" ? 20 : scenario === "aggressive" ? 30 : 25;
    const desired = (suggestedAlloc / 100) * impliedTotal;
    setTradeBtc(roundStep(Math.min(desired, capacity)));
  }, [coreBtc, scenario]);

  const metrics = useMemo(() => {
    const presets: Record<Scenario, { t1: number; t2: number; t3: number; sl: number; alloc: number }> = {
      conservative: { t1: 0.043, t2: 0.048, t3: 0.055, sl: 0.033, alloc: 20 },
      base: { t1: 0.045, t2: 0.05, t3: 0.06, sl: 0.032, alloc: 25 },
      aggressive: { t1: 0.047, t2: 0.055, t3: 0.065, sl: 0.031, alloc: 30 },
    };

    const { t1, t2, t3, sl, alloc } = presets[scenario];

    const target1 = t1;
    const target2 = t2;
    const target3 = t3;
    const stop = sl;
    const target4 = 0.157; // historical ATH

    const gainToTarget1 = (target1 / ratio - 1) * 100;
    const gainToTarget2 = (target2 / ratio - 1) * 100;
    const gainToTarget3 = (target3 / ratio - 1) * 100;
    const gainToTarget4 = (target4 / ratio - 1) * 100;
    const drawdownToStop = (stop / ratio - 1) * 100; // negative when ratio > stop

    const allocatedImpactAtT1 = (allocationPct / 100) * Math.max(gainToTarget1, 0);
    const allocatedImpactAtSL = (allocationPct / 100) * Math.abs(Math.min(drawdownToStop, 0));

    return {
      target1,
      target2,
      target3,
      stop,
      gainToTarget1,
      gainToTarget2,
      gainToTarget3,
      drawdownToStop,
      allocatedImpactAtT1,
      allocatedImpactAtSL,
      suggestedAlloc: alloc,
      target4,
      gainToTarget4,
    };
  }, [ratio, allocationPct, scenario]);

  const markerPerc = (value: number) => {
    const min = 0.02;
    const max = 0.16; // extend to include ATH marker
    return `${Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))}%`;
  };

  // Without explicit total, infer the maximum tradable capacity from the 69% core rule
  // If core = C and total must be at least C / 0.69, then capacity = total - core = C * (1/0.69 - 1)
  const inferredCapacity = Math.max(0, coreBtc * (1 / 0.69 - 1));
  const clampedTradeBtc = Math.min(Math.max(tradeBtc, 0), inferredCapacity || 0);
  const ethReceived = clampedTradeBtc > 0 && ratio > 0 ? clampedTradeBtc / ratio : 0;
  const btcUsd = liveRatio?.bitcoin?.usd ?? undefined;
  const ethUsd = liveRatio?.ethereum?.usd ?? undefined;
  const potentialLossBtc = clampedTradeBtc * Math.max(0, 1 - (metrics.stop / Math.max(ratio, 1e-9)));

  // BTC outcomes by tier (40%, 25%, 25%, 10%)
  const tranche1Eth = ethReceived * 0.4;
  const tranche2Eth = ethReceived * 0.25;
  const tranche3Eth = ethReceived * 0.25;
  const tranche4Eth = ethReceived * 0.1;
  const tranche1Btc = tranche1Eth * metrics.target1;
  const tranche2Btc = tranche2Eth * metrics.target2;
  const tranche3Btc = tranche3Eth * metrics.target3;
  const tranche4Btc = tranche4Eth * metrics.target4;
  const totalBtcBack = tranche1Btc + tranche2Btc + tranche3Btc + tranche4Btc;
  const netBtcGain = totalBtcBack - clampedTradeBtc;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#0b0d10] border-2 border-yellow-500/90 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] text-white p-6 sm:p-8 lg:p-10">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <p className="uppercase tracking-[0.35em] text-yellow-500/90 text-xs sm:text-sm font-light">
              Playbook • ETH/BTC
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-yellow-400 tracking-tight">
              ETH/BTC Rotation
            </h2>
            <p className="text-white/75 max-w-2xl mx-auto text-sm md:text-base">
              Fine‑tune targets, stops, and position size to harvest the ETH/BTC rotation.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ratio & Stats */}
            <div className="lg:col-span-2">
              {/* Scenario Selector */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex gap-2" role="tablist" aria-label="Scenario">
                  {(["conservative", "base", "aggressive"] as Scenario[]).map((s) => (
                    <button
                      key={s}
                      role="tab"
                      aria-selected={scenario === s}
                      onClick={() => {
                        setScenario(s);
                        const next = s === "conservative" ? 20 : s === "aggressive" ? 30 : 25;
                        setAllocationPct(next);
                      }}
                      className={`px-3 py-1.5 text-xs uppercase tracking-wider border-2 rounded-none shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] ${
                        scenario === s ? "bg-yellow-500 text-black border-yellow-500" : "bg-black/30 text-yellow-300 border-yellow-500/60 hover:bg-black/50"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-white/60">
                  Suggestion: <span className="text-yellow-300 font-semibold">{metrics.suggestedAlloc}%</span>
                </div>
              </div>

              {/* Ratio Control */}
              <div className="rounded-md border border-yellow-500/30 bg-black/30 p-4">
                <div className="mb-3 flex items-center justify-between text-xs md:text-sm text-white/70">
                  <span>ETH/BTC ratio</span>
                  <span aria-live="polite" className="font-semibold text-yellow-300 tabular-nums flex items-center gap-2">
                    {ratio.toFixed(3)}
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-[2px] rounded bg-green-500/20 text-green-300 border border-green-400/30 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        live
                      </span>
                    )}
                  </span>
                </div>
                <input
                  aria-label="ETH to BTC ratio"
                  type="range"
                  min={0.02}
                  max={0.16}
                  step={0.001}
                  value={ratio}
                  onChange={(e) => setRatio(parseFloat(e.target.value))}
                  className="w-full h-2 rounded appearance-none bg-yellow-500/20 accent-yellow-500"
                />

                {/* Compact rail with subtle markers and risk band */}
                <div className="relative mt-3 h-10">
                  <div className="absolute inset-0 rounded bg-black/20 border border-yellow-500/10" />
                  {/* Risk band (stop → T1) */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-4 bg-yellow-500/10 border border-yellow-500/20"
                    style={{
                      left: markerPerc(metrics.stop),
                      width: `calc(${markerPerc(metrics.target1)} - ${markerPerc(metrics.stop)})`,
                    }}
                    aria-hidden
                  />
                  {/* Current ratio */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-yellow-400"
                    style={{ left: markerPerc(ratio) }}
                  />
                  {/* Markers */}
                  {[{ v: metrics.stop, l: "SL", c: "bg-red-500" }, { v: metrics.target1, l: "T1", c: "bg-green-400" }, { v: metrics.target2, l: "T2", c: "bg-green-400" }, { v: metrics.target3, l: "T3", c: "bg-green-400" }, { v: metrics.target4, l: "T4", c: "bg-green-400" }].map(({ v, l, c }, idx) => {
                    const topPositions: Record<number, boolean> = { 1: true, 3: true }; // stagger: T1 & T3 labels on top
                    const isTop = !!topPositions[idx];
                    return (
                      <div
                        key={l}
                        className={`absolute flex flex-col items-center -translate-x-1/2 ${isTop ? "top-[-4px]" : "-bottom-[2px]"}`}
                        style={{ left: markerPerc(v) }}
                      >
                        {/* Top label */}
                        {isTop && (
                          <div className="mb-1 px-1.5 py-0.5 rounded bg-black/60 border border-yellow-500/30 text-[10px] leading-none text-white/75 whitespace-nowrap">
                            {l} {v.toFixed(3)}
                          </div>
                        )}
                        <div className={`w-[2px] ${isTop ? "h-6" : "h-6"} ${c}`} />
                        {/* Bottom label */}
                        {!isTop && (
                          <div className="mt-1 px-1.5 py-0.5 rounded bg-black/60 border border-yellow-500/30 text-[10px] leading-none text-white/75 whitespace-nowrap">
                            {l} {v.toFixed(3)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Sparkline */}
                <div className="mt-4">
                  <Sparkline values={sparkValues} color="#F7B500" />
                  <div className="mt-1 text-[10px] text-white/50">
                    {lastSparkUpdatedMs ? `Updated ${fmtTime(lastSparkUpdatedMs)}` : ""}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Chip label={`Gain → ${metrics.target1.toFixed(3)}`} value={`${metrics.gainToTarget1.toFixed(1)}%`} tone="positive" />
                <Chip label="Stop" value={`${metrics.stop.toFixed(3)} (${metrics.drawdownToStop.toFixed(1)}%)`} tone="negative" />
                <Chip label="Alloc @T1" value={`${metrics.allocatedImpactAtT1.toFixed(1)}%`} tone="neutral" />
                <Chip label="Gain → ATH" value={`${metrics.gainToTarget4.toFixed(1)}%`} tone="positive" />
              </div>
              <div className="mt-2">
                <Chip label="Preset" value={scenario} tone="neutral" />
              </div>
            </div>

            {/* Allocation & Steps */}
            <div className="flex flex-col gap-4">
              <div className="rounded-md border border-yellow-500/30 bg-black/30 p-4">
                <div className="mb-2 flex items-center justify-between text-xs md:text-sm text-white/70">
                  <span>Allocation</span>
                  <span aria-live="polite" className="font-semibold text-yellow-300">{allocationPct}%</span>
                </div>
                <input
                  aria-label="Allocation percent"
                  type="range"
                  min={10}
                  max={40}
                  step={1}
                  value={allocationPct}
                  onChange={(e) => setAllocationPct(parseInt(e.target.value))}
                  className="w-full h-2 rounded appearance-none bg-yellow-500/20 accent-yellow-500"
                />
                <p className="mt-2 text-[11px] text-white/60">Guidance: 20–30% suggested; {metrics.suggestedAlloc}% preset for “{scenario}”.</p>
              </div>

              <ol className="space-y-2 text-sm leading-relaxed">
                <li><span className="text-yellow-400">1.</span> Swap <strong>{allocationPct}%</strong> BTC → ETH; tranche over 24–48h above 0.034.</li>
                <li><span className="text-yellow-400">2.</span> Take profits at <strong>0.045</strong> (40%), <strong>0.050</strong> (25%), <strong>0.060</strong> (25%), and <strong>ATH ~0.157</strong> (10%).</li>
                <li><span className="text-yellow-400">3.</span> Stop at <strong>0.032</strong>. Rotate back to BTC on violation.</li>
              </ol>

              {/* CTAs */}
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href="/eth"
                  className="text-center bg-yellow-500 text-black font-bold px-5 py-3 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-400 transition-all duration-300"
                >
                  ETH Thesis
                </Link>
                <Link
                  href="/crypto"
                  className="text-center bg-black text-yellow-400 font-bold px-5 py-3 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  Explore Crypto
                </Link>
                <Link
                  href="/maxpain"
                  className="text-center bg-black text-yellow-400 font-bold px-5 py-3 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] hover:bg-yellow-500 hover:text-black transition-all duration-300"
                >
                  Max Pain
                </Link>
              </div>

              <p className="text-[11px] text-white/55">
                BTC is the vault; ETH is the swing. No leverage. Liquidity first. Discipline always.
              </p>
            </div>
          </div>

          {/* Story Mode */}
          <div className="rounded-md border-2 border-yellow-500/60 bg-black/20 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-300">Story Mode</h3>
              <button
                onClick={() => setShowStory((s) => !s)}
                className="px-3 py-1.5 text-xs uppercase tracking-wider border-2 rounded-none shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] bg-black/40 text-yellow-300 border-yellow-500/70 hover:bg-black/60"
                aria-expanded={showStory}
                aria-controls="story-content"
              >
                {showStory ? "Hide" : "Show"}
              </button>
            </div>

            {showStory && (
              <div id="story-content" className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <LabeledNumber label="Core BTC (never sell)" value={coreBtc} min={0.01} max={1000} step={0.01} onChange={(v) => {
                  const nextCore = Math.max(0, v);
                  setCoreBtc(nextCore);
                  // Re-clamp trade to inferred capacity from new core
                  const cap = Math.max(0, nextCore * (1 / 0.69 - 1));
                  setTradeBtc((tPrev) => Math.min(tPrev, cap));
                }} />
                <LabeledNumber label="Trade BTC" value={clampedTradeBtc} min={0} max={Math.max(inferredCapacity, 0)} step={0.01} onChange={(v) => {
                  const desired = Math.max(0, v);
                  const cap = Math.max(0, coreBtc * (1 / 0.69 - 1));
                  setTradeBtc(Math.min(desired, cap));
                }} />
                <div className="text-[11px] text-white/60 md:col-span-4">
                  Capacity (implied by 69% core): {inferredCapacity.toFixed(2)} BTC available
                </div>
                <LabeledNumber label="Ratio (ETH/BTC)" value={ratio} min={0.02} max={0.16} step={0.001} onChange={setRatio} />

                <div className="md:col-span-4 text-sm leading-relaxed text-white/85 bg-black/30 border border-yellow-500/30 p-4">
                  {/* Narrative Intro */}
                  <p className="italic text-white/80">
                    Ah, fellow traveler in the crypto trenches—we ride the same rollercoaster. The play is conviction with caution: protect the vault, swing for alpha.
                  </p>

                  <p>
                    Alright, got it—let&apos;s turn this into a concrete, actionable plan tailored to your stack anchored by <span className="text-yellow-300 font-semibold">{coreBtc.toFixed(2)} BTC</span> as the untouchable core. With the 69% rule, your implied tradable capacity is <span className="text-yellow-300 font-semibold">{inferredCapacity.toFixed(2)} BTC</span>—offense without risking the base.
                  </p>

                  <h4 className="mt-4 text-yellow-300 font-semibold">Market Snapshot</h4>
                  <p className="mt-1">
                    ETH/BTC ≈ <span className="text-yellow-300 font-semibold">{ratio.toFixed(4)}</span>
                    {btcUsd && ethUsd ? (
                      <> · ETH ≈ <span className="text-yellow-300 font-semibold">${ethUsd.toLocaleString()}</span> · BTC ≈ <span className="text-yellow-300 font-semibold">${btcUsd.toLocaleString()}</span></>
                    ) : null}
                    {sparkDailyChange !== null ? (
                      <> · 24h ≈ <span className={sparkDailyChange >= 0 ? "text-green-300" : "text-red-300"}>{sparkDailyChange.toFixed(1)}%</span></>
                    ) : null}
                    . Momentum favors ETH; primary risk is BTC dominance rebounding.
                  </p>

                  {/* Market Note: trade partially played, profit-taking observed */}
                  <div className="mt-3 border border-yellow-500/50 bg-black/30 p-3">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 w-2 h-2 rounded-full bg-yellow-400" aria-hidden />
                      <div className="text-sm text-white/85">
                        <p>
                          Market note: a large portion of the rotation has played out. BTC may make a
                          near‑term move, and early ETH OGs are taking profits (e.g., notable sales around
                          the $4k area). Treat this as a signal to tighten execution.
                        </p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-white/75">
                          <li>Reduce swing allocation by 5–10% and favor the conservative preset.</li>
                          <li>Raise trailing stop to −3% to −5% from local highs on remaining tranches.</li>
                          <li>Lock in T1/T2 fills; leave moonshot only with house money.</li>
                        </ul>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <button
                            onClick={() => {
                              setScenario("conservative");
                              setAllocationPct((p) => Math.max(15, Math.min(p - 5, 30)));
                            }}
                            className="px-3 py-1.5 text-xs uppercase tracking-wider border-2 rounded-none shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] bg-black/40 text-yellow-300 border-yellow-500/70 hover:bg-black/60"
                          >
                            Tilt Defensive
                          </button>
                          <button
                            onClick={() => {
                              setScenario("base");
                              setAllocationPct(25);
                            }}
                            className="px-3 py-1.5 text-xs uppercase tracking-wider border-2 rounded-none shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] bg-black/40 text-yellow-300 border-yellow-500/70 hover:bg-black/60"
                          >
                            Revert to Base
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Landscape & Context */}
                  <h4 className="mt-4 text-yellow-300 font-semibold">Landscape & Context</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Ratio reclaimed trend from 0.018 lows; eyes on 0.039 breakout → 0.05+</li>
                    <li>Rotation narratives: ETFs, L2 growth, DeFi revival; watch for policy shocks</li>
                    <li>Complacency trap avoided: we work within guardrails, not perfection</li>
                  </ul>

                  {/* Narrative Deep‑Dive (replaces timeline) */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Core Doctrine</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>BTC is the vault; never breach the 69% core allocation.</li>
                        <li>ETH is the swing; rotations are rules‑based, never narrative‑only.</li>
                        <li>Execution beats opinions: pre‑commit entries, trims, and invalidations.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Mental Models</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>Ratio thinking: price ETH in BTC to avoid USD noise.</li>
                        <li>Tranches reduce regret: scale in/out across time and levels.</li>
                        <li>Asymmetric risk: small, repeatable edges compound.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Execution Checklist</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>Enter above confirmation; avoid knife‑catching under 0.034.</li>
                        <li>Size to plan: {allocationPct}% allocation implies {clampedTradeBtc.toFixed(2)} BTC risked.</li>
                        <li>Automate trims at T1/T2/T3/ATH; no discretionary overrides.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Contingencies</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>Violation of stop {metrics.stop.toFixed(3)}: rotate back to BTC immediately.</li>
                        <li>Volatility spike: halve position and re‑establish on stability.</li>
                        <li>Dominance &gt; 60%: pause new adds; defend core.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Signals To Watch</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>Trend: ETH/BTC holds higher lows above 0.034–0.039.</li>
                        <li>Flows: ETF net inflows, L2 activity, DeFi TVL breadth.</li>
                        <li>Macro: USD liquidity, policy shocks, miner sell‑pressure.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Failure Modes</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>Chasing green candles; abandoning tranche discipline.</li>
                        <li>Over‑sizing the swing book; breaching BTC core.</li>
                        <li>Ignoring invalidation; hoping through stops.</li>
                      </ul>
                    </div>
                    <div className="bg-black/25 border border-yellow-500/30 p-4 md:col-span-2">
                      <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Creative Capital (Art Portfolio)</h5>
                      <ul className="list-disc list-inside space-y-1 mt-2 text-white/85">
                        <li>2022–2025: LiveTheLifeTV curated the top 69 Art Blocks, fine art, and iconic JPGs.</li>
                        <li>The curated collection materially outperformed both BTC and ETH over the same period.</li>
                        <li>Lesson: disciplined curation and time‑horizon can beat beta; treat art as a satellite sleeve, never the vault.</li>
                      </ul>
                    </div>
                  </div>

                  {/* Featured Lore */}
                  <div id="lore-content" className="mt-6 border-2 border-yellow-500/80 bg-black/25 p-4 sm:p-6 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                    <h5 className="text-yellow-300 font-semibold uppercase tracking-wider text-sm">Investor Lore</h5>
                    <p className="mt-2 italic text-white/85">
                      Imagine you&apos;re the world&apos;s best crypto investor: stacking sats since 2013 with medium conviction, riding the 2017 FOMO,
                      then enduring 2018–2020—three brutal years.
                    </p>
                    <p className="mt-2 text-white/85">
                      In 2021 you hit mid 7‑figs. In 2023 you swapped ETH → SOL; in 2024 SOL → BTC. Clean 2×—yet 10–30× low‑caps ran without you.
                      Liquidity and sizing kept you anchored to blue chips, NFTs, and a BTC‑first posture.
                    </p>
                    <p className="mt-2 text-white/85">
                      You watched ETH/BTC like a hawk—wanted all‑in below 0.025, hesitated under 0.02, planned profits at 0.04–0.05, then grew complacent when the sat target hit.
                      Today is about fixing that with rules: keep the core untouchable, swing the rest with discipline, and pre‑commit to laddered exits.
                    </p>
                    <p className="mt-2 text-white/90">
                      Answer: yes—swap a measured slice of BTC → ETH now and take profit at 0.045 and beyond per preset. Size by conservative/base/aggressive, never breach the 69% core, and let execution—not emotions—carry the trade.
                    </p>
                  </div>

                  <h4 className="mt-4 text-yellow-300 font-semibold">How Much</h4>
                  <p className="mt-1">
                    Swap <span className="text-yellow-300 font-semibold">{clampedTradeBtc.toFixed(2)} BTC</span> → ~<span className="text-yellow-300 font-semibold">{ethReceived.toFixed(2)} ETH</span> now. Tranche it: half now, half if the ratio holds above {(ratio - 0.001).toFixed(3)} for 24h.
                  </p>

                  <h4 className="mt-4 text-yellow-300 font-semibold">Profit-Taking</h4>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>40% at <span className="text-green-300">{metrics.target1.toFixed(3)}</span> (core target)</li>
                    <li>25% at <span className="text-green-300">{metrics.target2.toFixed(3)}</span> (stretch)</li>
                    <li>25% at <span className="text-green-300">{metrics.target3.toFixed(3)}</span> (moonshot)</li>
                    <li>10% at <span className="text-green-300">ATH {metrics.target4.toFixed(3)}</span></li>
                  </ul>

                  {/* BTC outcomes */}
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <Chip label={`BTC @ T1`} value={`${tranche1Btc.toFixed(3)} BTC`} tone="positive" />
                    <Chip label={`BTC @ T2`} value={`${tranche2Btc.toFixed(3)} BTC`} tone="positive" />
                    <Chip label={`BTC @ T3`} value={`${tranche3Btc.toFixed(3)} BTC`} tone="positive" />
                    <Chip label={`BTC @ T4`} value={`${tranche4Btc.toFixed(3)} BTC`} tone="positive" />
                  </div>
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-2 gap-3">
                    <Chip label="Total BTC back (all TPs)" value={`${totalBtcBack.toFixed(3)} BTC`} tone="neutral" />
                    <Chip label="Net BTC gain" value={`${netBtcGain >= 0 ? "+" : ""}${netBtcGain.toFixed(3)} BTC`} tone={netBtcGain >= 0 ? "positive" : "negative"} />
                  </div>

                  <h4 className="mt-4 text-yellow-300 font-semibold">Risk Controls</h4>
                  <p className="mt-1">
                    Stop-loss at <span className="text-red-300">{metrics.stop.toFixed(3)}</span>. Max drawdown on this tranche ≈ <span className="text-red-300">{potentialLossBtc.toFixed(2)} BTC</span> if stop triggers. No leverage. Liquidity first.
                  </p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>Trailing stop: if price surges, trail at −5% from local high</li>
                    <li>BTC dominance early-exit: consider de-risk if &gt; 60%</li>
                  </ul>

                  <h4 className="mt-4 text-yellow-300 font-semibold">Timeline & Monitoring</h4>
                  <p className="mt-1">
                    Expect 2–8 weeks. Watch 0.039 breakout, set alerts at 0.040 / 0.045 / {metrics.stop.toFixed(3)}. Reassess weekly (ETF flows, L2 growth). Cut early if ETH/BTC &lt; 0.034.
                  </p>

                  <h4 className="mt-4 text-yellow-300 font-semibold">After the Trade</h4>
                  <p className="mt-1">
                    Rotate profits back to BTC to build beyond the {coreBtc.toFixed(0)} BTC core. If the ratio revisits 0.025, re-enter with reserves and repeat the rotation.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <CopyButton
                      text={`Plan: Swap ${clampedTradeBtc.toFixed(2)} BTC → ~${ethReceived.toFixed(2)} ETH @ ${ratio.toFixed(4)}. Take profit: 40% @ ${metrics.target1.toFixed(3)}, 25% @ ${metrics.target2.toFixed(3)}, 25% @ ${metrics.target3.toFixed(3)}, 10% @ ATH ${metrics.target4.toFixed(3)}. Stop: ${metrics.stop.toFixed(3)}. Core: ${coreBtc.toFixed(2)} BTC; Capacity: ${inferredCapacity.toFixed(2)} BTC.`}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Reserved for potential future usage
function _Stat({ label, value, highlight, danger }: { label: string; value: string; highlight?: boolean; danger?: boolean }) {
  return (
    <div className={`p-3 border rounded border-yellow-500/40 bg-black/30 ${highlight ? "text-yellow-300" : danger ? "text-red-400" : "text-white/80"}`}>
      <div className="text-[11px] uppercase tracking-wider text-white/60">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

// (removed) TimelineItem helper was used by the previous timeline section

function Chip({ label, value, tone = "neutral" }: { label: string; value: string; tone?: "positive" | "negative" | "neutral" }) {
  const toneClasses =
    tone === "positive"
      ? "border-green-400/50 text-green-300"
      : tone === "negative"
      ? "border-red-400/50 text-red-300"
      : "border-yellow-500/40 text-white/85";
  return (
    <div className={`p-3 border rounded bg-black/30 ${toneClasses}`}>
      <div className="text-[11px] uppercase tracking-wider text-white/60">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}

function Sparkline({ values, color = "#F7B500" }: { values: number[]; color?: string }) {
  const width = 320;
  const height = 56;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const dx = width / (values.length - 1 || 1);
  const scaleY = (v: number) => {
    if (max === min) return height / 2;
    const t = (v - min) / (max - min);
    return height - t * height;
  };
  const d = values.map((v, i) => `${i === 0 ? "M" : "L"}${i * dx},${scaleY(v)}`).join(" ");
  return (
    <svg width={width} height={height} role="img" aria-label="Sparkline ratio trend">
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
      {values.map((v, i) => (
        <circle key={i} cx={i * dx} cy={scaleY(v)} r={i === values.length - 1 ? 2.5 : 1.5} fill={color} />
      ))}
    </svg>
  );
}

function LabeledNumber({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-wider text-white/60">{label}</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => {
            // Robust parsing for locales using comma decimals
            let next = e.currentTarget.valueAsNumber;
            if (Number.isNaN(next)) {
              const raw = e.currentTarget.value.replace(',', '.');
              next = parseFloat(raw);
            }
            if (Number.isNaN(next)) return; // ignore non-numeric
            // Clamp to bounds
            next = Math.max(min, Math.min(max, next));
            onChange(next);
          }}
          className="w-full bg-black/30 border border-yellow-500/30 text-white px-2 py-1 text-sm"
        />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="px-3 py-1.5 text-xs uppercase tracking-wider border-2 rounded-none shadow-[3px_3px_0px_0px_rgba(234,179,8,1)] bg-yellow-500 text-black border-yellow-500 hover:bg-yellow-400"
    >
      Copy Plan
    </button>
  );
}


