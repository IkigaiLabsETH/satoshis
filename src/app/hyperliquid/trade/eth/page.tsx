"use client";

import { useState, useEffect } from "react";
import { useLiveCryptoPrices } from "@/hooks/useLiveCryptoPrices";

export default function EthMinimalStrategyPage() {
  const { ETH, isLoading, error } = useLiveCryptoPrices();

  const [heatmapImage, setHeatmapImage] = useState<string | null>(null);
  const [axisTopPrice, setAxisTopPrice] = useState<number>(4848);
  const [axisBottomPrice, setAxisBottomPrice] = useState<number>(4100);
  const [extractedBands, setExtractedBands] = useState<number[] | null>(null);

  // Editable plan levels
  const [entryLower, setEntryLower] = useState<number>(4560);
  const [entryUpper, setEntryUpper] = useState<number>(4580);
  const [breakLevel, setBreakLevel] = useState<number>(4680);
  const [retestLower, setRetestLower] = useState<number>(4660);
  const [retestUpper, setRetestUpper] = useState<number>(4670);
  const [slBufferPct, setSlBufferPct] = useState<number>(0.048); // 4.8% default to risk ~$1k on $21k
  const [movePct, setMovePct] = useState<number>(0.02); // 2%
  const [direction, setDirection] = useState<'long' | 'short'>('long');
  const [suggestedDir, setSuggestedDir] = useState<'long' | 'short'>('long');

  // Constants
  const leverage = 7;
  const [notional] = useState<number>(21000); // $21k cap
  const [riskTargetUSD] = useState<number>(1000);
  const [autoRisk, setAutoRisk] = useState<boolean>(true); // auto set SL to hit $1k risk on current notional

  // Derived numbers
  const entryMid = (entryLower + entryUpper) / 2;
  const retestMid = (retestLower + retestUpper) / 2;
  const currentPrice = ETH.price || entryMid;
  const requiredMoveFor1k = 1000 / notional; // decimal
  // Decide mode and anchor: pullback → entry band; momentum → retest band
  const mode: 'pullback' | 'momentum' = currentPrice >= breakLevel ? 'momentum' : 'pullback';
  const entryAnchor = mode === 'momentum' ? retestMid : entryMid;
  const tp1Price = direction === 'long' ? entryAnchor * (1 + requiredMoveFor1k) : entryAnchor * (1 - requiredMoveFor1k);
  const slPrice = direction === 'long' ? entryAnchor * (1 - slBufferPct) : entryAnchor * (1 + slBufferPct);
  const requiredNotionalFor1kAtMove = 1000 / (movePct);
  const requiredMarginAtMove = requiredNotionalFor1kAtMove / leverage;
  // Simulation metrics
  const potentialProfitAtMove = notional * movePct; // +move
  const potentialLossAtMove = notional * movePct; // -move (no SL)
  const plannedMaxLossAtSL = notional * slBufferPct; // with SL

  // Auto-fit SL to target risk when enabled
  useEffect(() => {
    if (autoRisk && notional > 0) {
      setSlBufferPct(riskTargetUSD / notional);
    }
  }, [autoRisk, riskTargetUSD, notional]);

  // Simple auto-extract from heatmap (brightness peaks along rows)
  const autoExtractFromHeatmap = async () => {
    if (!heatmapImage) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = heatmapImage;
    });
    const canvas = document.createElement("canvas");
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);
    const x0 = Math.floor(w * 0.2);
    const x1 = Math.floor(w * 0.8);
    const scores = new Float32Array(h);
    for (let y = 0; y < h; y++) {
      const data = ctx.getImageData(x0, y, x1 - x0, 1).data;
      let s = 0;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        s += Math.max(r, g, b);
      }
      scores[y] = s / (x1 - x0);
    }
    // Smooth & pick peaks
    const smooth = new Float32Array(h);
    const win = 5;
    for (let y = 0; y < h; y++) {
      let S = 0, C = 0;
      for (let k = -win; k <= win; k++) {
        const yy = y + k;
        if (yy >= 0 && yy < h) { S += scores[yy]; C++; }
      }
      smooth[y] = S / C;
    }
    let mean = 0; for (let y = 0; y < h; y++) mean += smooth[y];
    mean /= h;
    let vari = 0; for (let y = 0; y < h; y++) { const d = smooth[y] - mean; vari += d * d; }
    const std = Math.sqrt(vari / h);
    const th = mean + std;
    const peaks: number[] = [];
    for (let y = 1; y < h - 1; y++) {
      if (smooth[y] > th && smooth[y] > smooth[y - 1] && smooth[y] > smooth[y + 1]) peaks.push(y);
    }
    peaks.sort((a, b) => smooth[b] - smooth[a]);
    const picked: number[] = [];
    const minGap = Math.floor(h * 0.03);
    for (const y of peaks) {
      if (!picked.some(p => Math.abs(p - y) < minGap)) picked.push(y);
      if (picked.length >= 10) break;
    }
    const toPrice = (rowY: number) => axisTopPrice - (rowY / h) * (axisTopPrice - axisBottomPrice);
    const bands = picked.map(toPrice).sort((a, b) => a - b);
    setExtractedBands(bands);
    const current = ETH.price || entryMid;
    const below = [...bands].filter(p => p < current).pop();
    const above = bands.find(p => p > current);
    if (below) {
      setEntryLower(Math.floor(below - 20));
      setEntryUpper(Math.floor(below));
    }
    if (above) {
      setBreakLevel(Math.floor(above));
      setRetestLower(Math.floor(above - 20));
      setRetestUpper(Math.floor(above - 10));
    }
  };

  // Auto-suggest direction from bands vs current price
  useEffect(() => {
    const current = ETH.price || entryMid;
    let dir: 'long' | 'short' = 'long';
    if (extractedBands && extractedBands.length) {
      const below = extractedBands.filter(p => p < current).pop();
      const above = extractedBands.find(p => p > current);
      if (below && above) dir = (current - below) <= (above - current) ? 'long' : 'short';
      else if (!below && above) dir = 'short';
      else dir = 'long';
    } else {
      // fallback: if current above entry band and below break, prefer long
      if (current < entryLower) dir = 'long';
      else if (current > breakLevel) dir = 'long';
      else dir = 'long';
    }
    setSuggestedDir(dir);
  }, [ETH.price, extractedBands, entryLower, breakLevel, entryMid]);

  // Sync direction to suggestion by default (user can override by clicking)
  useEffect(() => {
    setDirection(suggestedDir);
  }, [suggestedDir]);

  // Strategy summary (auto-generated from current inputs)
  const strategySummary = `Liquidation Map Playbook\n\nGoal: protect capital and grow token balances. Trade the liquidation map with discipline; wait for flushes and execute with defined risk.\n\nCore Rules\n- Never sit in a losing trade. If red by ~2–3%, exit and re-enter lower/higher after the flush.\n- Always set a stop loss. Template: risk = size × SL%. For $${riskTargetUSD} risk on $${notional.toLocaleString()}, SL ≈ ${( (riskTargetUSD/notional)*100 ).toFixed(2)}%.\n- TP fast: aim to extract 10–35% on flush bounces; don’t round trip.\n- Protect capital. Consistency and patience beat boredom trades.\n\nHow the Heat Map Is Used\n- Red/yellow = high-leverage (50–100×+) zones that are frequently flushed.\n- Blue (25–50×) is the signal: “enter in the blues” after the flush and reclaim on 5–15m.\n- On bullish days, exchanges often flush down before markup; on bearish days, they squeeze up before markdown.\n\nEntries\n- Pullback: wait for sweep into blue band (${entryLower}-${entryUpper}) and reclaim → enter near ~$${entryMid.toFixed(0)}.\n- Momentum: break ${breakLevel}, then ${direction==='long'?'buy HL':'sell LH'} on retest ${retestLower}-${retestUpper} → enter ~$${retestMid.toFixed(0)}.\n\nStops & Targets\n- Stop beyond invalidation or set risk-first: SL% = risk / size (e.g., $${riskTargetUSD}/$${notional} ≈ ${( (riskTargetUSD/notional)*100 ).toFixed(2)}%).\n- TP1 at move needed for $${riskTargetUSD} (~${(requiredMoveFor1k*100).toFixed(2)}% from entry, $${tp1Price.toFixed(0)} guide); scale more at +1.5–2.0%.\n\nMacro/Micro\n- Macro: liquidity cycle likely shifting from QT to QE → bull run setup.\n- Micro: CEX microstructure is a casino; liquidation bands mark where leverage is harvested. Wait for events.\n`;

  return (
    <div className="bg-[#0f1116] min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-4">ETH 7x Strategy (Minimal)</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded">{error}</div>
      )}

      <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded">
        <div className="flex items-center justify-between text-sm">
          <div>Live ETH: {isLoading ? "--" : `$${ETH.price.toLocaleString()}`}</div>
          <div>Per-trade cap: $21,000 • Leverage: 7x</div>
        </div>
      </div>

      <div className="mb-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-purple-300 text-sm mb-2">Upload 1D ETH Heatmap</label>
            <a
              href="https://coinank.com/liqHeatMapChart/ethusdt/1d"
              target="_blank"
              rel="noreferrer"
              className="inline-block mb-2 px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white text-xs"
            >
              Open CoinAnk 1D ETH Heatmap
            </a>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-300"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setHeatmapImage(URL.createObjectURL(f));
              }}
            />
            <div className="flex space-x-2 mt-2 text-sm">
              <input type="number" className="bg-black/50 border border-purple-500/30 rounded px-2 py-1 w-28" value={axisTopPrice} onChange={(e)=>setAxisTopPrice(Number(e.target.value))} />
              <input type="number" className="bg-black/50 border border-purple-500/30 rounded px-2 py-1 w-28" value={axisBottomPrice} onChange={(e)=>setAxisBottomPrice(Number(e.target.value))} />
              <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-white" onClick={autoExtractFromHeatmap}>Auto-extract</button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            {heatmapImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heatmapImage} alt="ETH heatmap" className="max-h-48 rounded border border-purple-500/30" />
            ) : (
              <div className="text-gray-500 text-sm">No image uploaded</div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded text-sm">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <div className="text-yellow-300 mb-1">Primary Entry Band</div>
            <div className="flex space-x-2">
              <input type="number" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={entryLower} onChange={(e)=>setEntryLower(Number(e.target.value))} />
              <input type="number" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={entryUpper} onChange={(e)=>setEntryUpper(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <div className="text-yellow-300 mb-1">Break & Retest</div>
            <div className="flex space-x-2">
              <input type="number" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={breakLevel} onChange={(e)=>setBreakLevel(Number(e.target.value))} />
              <input type="number" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={retestLower} onChange={(e)=>setRetestLower(Number(e.target.value))} />
              <input type="number" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={retestUpper} onChange={(e)=>setRetestUpper(Number(e.target.value))} />
            </div>
          </div>
          <div>
            <div className="text-yellow-300 mb-1">SL Buffer %</div>
            <div className="flex items-center space-x-2">
              <input type="number" step="0.001" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={slBufferPct} onChange={(e)=>{ setAutoRisk(false); setSlBufferPct(Number(e.target.value)); }} />
              <label className="flex items-center space-x-2 text-xs text-gray-300">
                <input type="checkbox" checked={autoRisk} onChange={(e)=>setAutoRisk(e.target.checked)} />
                <span>Target ${riskTargetUSD} risk</span>
              </label>
            </div>
            <div className="text-xs text-gray-400">SL% = risk / notional. When auto is on, SL% = {riskTargetUSD} / {notional}.</div>
          </div>
        </div>
      </div>

      {/* Strategy Suggestion */}
      <div className="p-4 bg-black/50 border border-yellow-500/20 rounded text-sm space-y-2">
        <div className="font-semibold text-yellow-400">Suggested Trade</div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-gray-300">Direction:</span>
          <span className={`px-2 py-1 rounded text-xs ${suggestedDir==='long'?'bg-green-600/30 text-green-300 border border-green-600/50':'bg-red-600/30 text-red-300 border border-red-600/50'}`}>Suggested: {suggestedDir.toUpperCase()}</span>
          <span className={`px-2 py-1 rounded text-xs ${mode==='momentum'?'bg-blue-600/30 text-blue-300 border border-blue-600/50':'bg-yellow-600/30 text-yellow-300 border border-yellow-600/50'}`}>{mode==='momentum'?'Mode: Momentum (break & retest)':'Mode: Pullback (entry band)'}</span>
          <button className={`px-3 py-1 rounded text-sm ${direction==='long'?'bg-green-600':'bg-gray-700'}`} onClick={()=>setDirection('long')}>Long</button>
          <button className={`px-3 py-1 rounded text-sm ${direction==='short'?'bg-red-600':'bg-gray-700'}`} onClick={()=>setDirection('short')}>Short</button>
        </div>
        <div>- Primary (pullback): sweep {direction==='long'? 'below':'above'} {entryLower}-{entryUpper}, {direction==='long'? 'reclaim':'reject at'} {entryLower} on 5–15m; enter ≈ ${entryMid.toFixed(0)}.</div>
        <div>- Alt (momentum): break {breakLevel}, {direction==='long'? 'buy HL':'sell LH'} on retest {retestLower}-{retestUpper}; enter ≈ ${retestMid.toFixed(0)}.</div>
        <div className="grid md:grid-cols-3 gap-3 mt-2">
          <ActionTile label="Leverage" value="7x" />
          <ActionTile label="Size (USD)" value={`$${notional.toLocaleString()}`} copyValue={String(notional)} />
          <ActionTile label="Entry (guide)" value={`~$${entryAnchor.toFixed(0)}`} copyValue={entryAnchor.toFixed(0)} />
          <ActionTile label="SL Price" value={`$${slPrice.toFixed(0)}`} copyValue={slPrice.toFixed(0)} tone="danger" />
          <ActionTile label="TP1 Price" value={`$${tp1Price.toFixed(0)}`} copyValue={tp1Price.toFixed(0)} tone="success" />
          <ActionTile label="TP1 Move" value={`${(requiredMoveFor1k*100).toFixed(2)}%`} />
        </div>
        <div className="text-xs text-gray-400">Copy values into Hyperliquid order panel (Isolated • 7x • One-Way). {mode==='pullback'? 'Price is above entry; place limit in entry band and wait for pullback.':'Price is above break; wait for retest and buy HL.'}</div>
      </div>

      {/* Capital requirement helper */}
      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded text-sm">
        <div className="flex items-center space-x-2">
          <span>Assumed daily move:</span>
          <select className="bg-black/50 border border-green-500/30 rounded px-2 py-1" value={movePct} onChange={(e)=>setMovePct(parseFloat(e.target.value))}>
            <option value={0.01}>1%</option>
            <option value={0.015}>1.5%</option>
            <option value={0.02}>2%</option>
            <option value={0.03}>3%</option>
          </select>
        </div>
        <div className="mt-2">To earn $1,000 with {(movePct*100).toFixed(1)}% move: Notional = ${requiredNotionalFor1kAtMove.toFixed(0)} • Margin @7x = ${requiredMarginAtMove.toFixed(0)}.</div>
        <div className="text-gray-300 mt-1">With your size (${notional.toLocaleString()}), expected PnL at {(movePct*100).toFixed(1)}% = ${ (notional*movePct).toFixed(0)} • Minimum move needed for $1,000 = {( (1000/(notional))*100 ).toFixed(2)}%.</div>
      </div>

      {/* Simulation: 7x Long on $21k Notional */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded text-sm">
        <div className="font-semibold text-blue-300 mb-2">Simulation (7x Long on $21,000 notional)</div>
        <div className="grid md:grid-cols-3 gap-3">
          <ActionTile label="Profit @ +Move" value={`$${potentialProfitAtMove.toFixed(0)}`} />
          <ActionTile label="Loss @ -Move (no SL)" value={`$${potentialLossAtMove.toFixed(0)}`} tone="danger" />
          <ActionTile label="Planned Max Loss (SL)" value={`$${plannedMaxLossAtSL.toFixed(0)} (~${(slBufferPct*100).toFixed(2)}%)`} tone="danger" />
        </div>
        <div className="text-xs text-gray-400 mt-2">Move = {(movePct*100).toFixed(2)}%. SL% = {(slBufferPct*100).toFixed(2)}%. Notional = ${notional.toLocaleString()} • Leverage = 7x. Risk ≈ ${plannedMaxLossAtSL.toFixed(0)}.</div>
      </div>

      {/* Liquidation Map Playbook */}
      <div className="mt-6 p-4 bg-black/50 border border-yellow-500/20 rounded text-sm space-y-3">
        <div className="text-yellow-400 font-semibold">Liquidation Map Playbook</div>
        <p className="text-gray-300">
          Goal: protect capital and grow token balances. Trade the liquidation heat map with discipline; wait
          for flushes and execute with defined risk.
        </p>
        <pre className="whitespace-pre-wrap text-xs text-gray-400 bg-black/30 border border-yellow-500/10 rounded p-3">{strategySummary}</pre>
        <div className="space-y-2">
          <div className="text-white font-semibold">Core Rules</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Never sit in a losing trade. If red by ~2–3%, exit and re-enter lower/higher after the flush.</li>
            <li>Always set a stop loss. Template: risk = size × SL%. For $1k risk on $21k, SL ≈ 4.8%.</li>
            <li>TP fast: aim to extract 10–35% (relative to your leveraged position move) on flush bounces; don’t round trip.</li>
            <li>Protect capital. Consistency and patience beat boredom trades.</li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="text-white font-semibold">How the Heat Map Is Used</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Red/yellow = high-leverage (50–100×+) zones that are frequently flushed.</li>
            <li>Blue (25–50×) is the signal: “enter in the blues” after the flush and reclaim on 5–15m.</li>
            <li>On bullish days, exchanges often flush down before markup; on bearish days, they squeeze up before markdown.</li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="text-white font-semibold">Entries</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Pullback: wait for sweep into blue band {`(${entryLower}-${entryUpper})`} and reclaim → enter near ~${entryMid.toFixed(0)}.</li>
            <li>Momentum: break {breakLevel}, then {direction==='long'? 'buy HL':'sell LH'} on retest {retestLower}-{retestUpper} → enter ~${retestMid.toFixed(0)}.</li>
          </ul>
        </div>
        <div className="space-y-2">
          <div className="text-white font-semibold">Stops & Targets</div>
          <ul className="list-disc pl-5 space-y-1 text-gray-300">
            <li>Stop just beyond invalidation or set risk-first: SL% = risk / size (e.g., $1k/$21k ≈ 4.8%).</li>
            <li>TP1 at move needed for $1k (~{(requiredMoveFor1k*100).toFixed(2)}% from entry, ${tp1Price.toFixed(0)} guide); scale more at +1.5–2.0%.</li>
          </ul>
        </div>
        <div className="space-y-1 text-gray-400 text-xs">
          <div>Macro: liquidity cycle likely shifting from QT to QE → bull run setup; learn to trade the flushes.</div>
          <div>Micro: CEX microstructure is a casino; liquidation bands mark where leverage is harvested. Wait for events.</div>
          <div>Reminder: self-custody spot stack for the long term; avoid high leverage; don’t get liquidated.</div>
        </div>
      </div>

      {/* Why 7x (and not 40x) */}
      <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded text-sm space-y-3">
        <div className="text-red-300 font-semibold">Why 7x — and never 40x again</div>
        <ul className="list-disc pl-5 space-y-1 text-gray-300">
          <li>Same exposure, different survival: $140k notional can be reached with 7x on $21k or 40x on ~$3.5k. The PnL formula is the same (PnL = notional × move%), but the path-to-ruin is not.</li>
          <li>Realistic stop width: With a $1k risk target on $140k notional, SL% = 1000/140000 ≈ <span className="text-white font-semibold">0.71%</span> at 40x — inside normal noise. At 7x, SL ≈ <span className="text-white font-semibold">4.8%</span>, which fits structural levels and allows re‑entries.</li>
          <li>Liquidation is a worse stop: “No stop” at 40x turns into forced liquidation with worse fills/fees and total loss of margin control.</li>
          <li>Rule of thumb: keep liquidation ≥ 3× farther than your SL; if not, reduce leverage/size. Trade the heat‑map event with structure, not at liq distance.</li>
          <li>Capital efficiency without ruin: If you need more efficiency, use 7–10x and adjust notional, but keep $ risk = notional × SL% (e.g., $1k/day).</li>
        </ul>
        <div className="text-xs text-gray-400">Summary: 7x lets us use 4–8% structural stops, respect the heat‑map signal, and survive. 40x/no‑stop eventually blows up.</div>
      </div>
    </div>
  );
}

function ActionTile({ label, value, copyValue, tone }: { label: string; value: string; copyValue?: string; tone?: 'success'|'danger' }) {
  const copy = async () => {
    if (!copyValue) return;
    try { await navigator.clipboard.writeText(copyValue); } catch { /* noop */ }
  };
  return (
    <div className={`p-3 rounded border text-sm ${tone==='success'? 'border-green-500/30 bg-green-500/10': tone==='danger'? 'border-red-500/30 bg-red-500/10': 'border-yellow-500/20 bg-yellow-500/5'}`}>
      <div className="text-gray-300 mb-1">{label}</div>
      <div className="flex items-center justify-between">
        <div className="font-semibold text-white">{value}</div>
        {copyValue && (
          <button onClick={copy} className="ml-2 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-xs">Copy</button>
        )}
      </div>
    </div>
  );
}


