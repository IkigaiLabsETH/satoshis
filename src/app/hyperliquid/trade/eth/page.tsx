"use client";

import { useState, useEffect } from "react";
import { useLiveCryptoPrices } from "@/hooks/useLiveCryptoPrices";

export default function EthMinimalStrategyPage() {
  const { ETH, isLoading, error } = useLiveCryptoPrices();

  const [heatmapImage, setHeatmapImage] = useState<string | null>(null);
  const [axisTopPrice, setAxisTopPrice] = useState<number>(4848);
  const [axisBottomPrice, setAxisBottomPrice] = useState<number>(4100);

  // Editable plan levels
  const [entryLower, setEntryLower] = useState<number>(4560);
  const [entryUpper, setEntryUpper] = useState<number>(4580);
  const [breakLevel, setBreakLevel] = useState<number>(4680);
  const [retestLower, setRetestLower] = useState<number>(4660);
  const [retestUpper, setRetestUpper] = useState<number>(4670);
  const [slBufferPct, setSlBufferPct] = useState<number>(0.0075); // 0.75%
  const [movePct, setMovePct] = useState<number>(0.02); // 2%

  // Constants
  const leverage = 7;
  const perTradeNotional = 21000; // $21k cap

  // Derived numbers
  const entryMid = (entryLower + entryUpper) / 2;
  const requiredMoveFor1k = 1000 / (perTradeNotional * leverage); // decimal
  const tp1Price = entryMid * (1 + requiredMoveFor1k);
  const slPrice = entryMid * (1 - slBufferPct);
  const requiredNotionalFor1kAtMove = 1000 / (movePct * leverage);
  const requiredMarginAtMove = requiredNotionalFor1kAtMove / leverage;

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
            <input type="number" step="0.001" className="bg-black/50 border border-yellow-500/30 rounded px-2 py-1 w-28" value={slBufferPct} onChange={(e)=>setSlBufferPct(Number(e.target.value))} />
            <div className="text-xs text-gray-400">0.0075 = 0.75%</div>
          </div>
        </div>
      </div>

      {/* Strategy Suggestion */}
      <div className="p-4 bg-black/50 border border-yellow-500/20 rounded text-sm space-y-2">
        <div className="font-semibold text-yellow-400">Suggested Trade</div>
        <div>- Primary: sweep below {entryLower}-{entryUpper}, reclaim {entryLower} on 5–15m; enter ≈ ${entryMid.toFixed(0)}.</div>
        <div>- Alt momentum: break {breakLevel}, buy HL on retest {retestLower}-{retestUpper}.</div>
        <div>- Size: $21,000 notional (7x). Required move for $1k ≈ {(requiredMoveFor1k*100).toFixed(2)}%.</div>
        <div>- Stop: ~${slPrice.toFixed(0)} (≈ {(slBufferPct*100).toFixed(2)}% below entry).</div>
        <div>- TP1: ~${tp1Price.toFixed(0)} (locks ≈ $1k). TP2: scale at +1.5% to +2.0%.</div>
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
        <div className="mt-2">Required notional for $1k at {(movePct*100).toFixed(1)}%: ${requiredNotionalFor1kAtMove.toFixed(0)} | Margin @7x: ${requiredMarginAtMove.toFixed(0)}</div>
      </div>
    </div>
  );
}


