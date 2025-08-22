"use client";

import React, { useState } from "react";
import { calculateDeltaNeutral, rebalancePosition, WETH, DAI } from "@/lib/blockchain";
import { ConnectButton, useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "@/lib/thirdwebClient";
import { toast } from "sonner";

export default function YieldFarm() {
  const [amount, setAmount] = useState<string>("1");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // APY estimator inputs (percent values)
  const [fundingApr, setFundingApr] = useState<string>("");
  const [lpFeesApr, setLpFeesApr] = useState<string>("");
  const [incentivesApr, setIncentivesApr] = useState<string>("");
  const [borrowApr, setBorrowApr] = useState<string>("");
  const [otherCostsApr, setOtherCostsApr] = useState<string>("");
  // Advanced controls
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [slippageBps, setSlippageBps] = useState<number>(30); // 0.30%
  const [deadlineMin, setDeadlineMin] = useState<number>(5);

  const account = useActiveAccount();
  const { data: balanceData } = useWalletBalance({ client, chain: { id: 1, rpc: "https://rpc.ankr.com/eth" }, address: account?.address });
  const ethBalance = balanceData?.displayValue ? Number(balanceData.displayValue) : undefined;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Allow only digits and a single decimal point
    const raw = e.target.value.replace(/,/g, ".");
    const cleaned = raw
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");
    setAmount(cleaned);
    if (error) setError(null);
  };

  const setQuickAmount = (v: string) => {
    setAmount(v);
    if (error) setError(null);
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await calculateDeltaNeutral(WETH, DAI, amount);
      setResult(data);
    } catch (_err) {
      const errMsg = _err instanceof Error ? _err.message : String(_err);
      setError(`Error calculating position: ${errMsg}`);
    }
    setLoading(false);
  };

  const handleRebalance = async () => {
    setLoading(true);
    setError(null);
    try {
      const price = await rebalancePosition(WETH, DAI, 5);
      toast.success(`Rebalanced at price: ${price}`);
    } catch (_err) {
      setError("Error rebalancing position");
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto w-full p-4 sm:p-6">
      <div className="mt-1 flex gap-2 sm:gap-3">
        {!account ? (
          <ConnectButton client={client} connectButton={{ label: "Connect Wallet" }} />
        ) : (
          <div className="text-sm text-white/80 rounded border border-yellow-500 px-3 py-2">
            Connected: <span className="text-yellow-400 font-mono">{account.address.slice(0, 6)}…{account.address.slice(-4)}</span>
          </div>
        )}
      </div>
      <div className="mt-4 sm:mt-6 space-y-3">
        <label className="block text-sm">
          Amount ({WETH.symbol}):
          <input
            type="text"
            inputMode="decimal"
            placeholder="e.g. 1.0"
            value={amount}
            onChange={handleAmountChange}
            disabled={loading}
            className="mt-1 w-full rounded border px-3 py-3 text-base"
          />
          <div className="mt-2 flex gap-2 overflow-x-auto whitespace-nowrap" style={{ scrollbarWidth: 'none' }}>
            {( ["0.1","0.5","1","3"] as string[] ).map((v) => (
              <button key={v} type="button" onClick={() => setQuickAmount(v)} className="rounded border border-yellow-500 px-3 py-1.5 text-xs text-yellow-400 hover:bg-yellow-500 hover:text-black">
                {v}
              </button>
            ))}
            {ethBalance !== undefined && (
              <button type="button" onClick={() => setQuickAmount(String(Math.max(ethBalance - 0.01, 0).toFixed(4)))} className="rounded border border-yellow-500 px-3 py-1.5 text-xs text-yellow-400 hover:bg-yellow-500 hover:text-black">
                Max
              </button>
            )}
          </div>
          {ethBalance !== undefined && amount && Number(amount) > ethBalance && (
            <div className="mt-1 text-xs text-red-400">Insufficient balance. Wallet: {ethBalance.toFixed(4)} ETH</div>
          )}
        </label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button onClick={handleCalculate} disabled={loading || !amount || Number.isNaN(Number(amount)) || (ethBalance !== undefined && Number(amount) > ethBalance)} className="rounded border px-3 py-2 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto">
            Calculate Position
          </button>
          <button onClick={handleRebalance} disabled={loading} className="rounded border px-3 py-2 hover:bg-gray-50 disabled:opacity-50 w-full sm:w-auto">
            Rebalance
          </button>
          <button type="button" onClick={() => setShowAdvanced((v) => !v)} className="rounded border px-3 py-2 hover:bg-gray-50 w-full sm:w-auto">
            {showAdvanced ? "Hide Advanced" : "Advanced"}
          </button>
        </div>
      </div>
      {showAdvanced && (
        <div className="mt-3 sm:mt-4 rounded border p-3 sm:p-4">
          <h4 className="font-medium">Advanced Controls</h4>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <label className="text-sm">
              Slippage (%)
              <select className="mt-1 w-full rounded border px-3 py-2" value={slippageBps} onChange={(e) => setSlippageBps(Number(e.target.value))}>
                <option value={10}>0.10%</option>
                <option value={30}>0.30%</option>
                <option value={50}>0.50%</option>
              </select>
            </label>
            <label className="text-sm">
              Deadline (minutes)
              <select className="mt-1 w-full rounded border px-3 py-2" value={deadlineMin} onChange={(e) => setDeadlineMin(Number(e.target.value))}>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </label>
          </div>
          <p className="mt-2 text-xs text-white/60">These settings will be applied to execution in a future release.</p>
        </div>
      )}
      {loading && (
        <div className="mt-4 sm:mt-6 rounded border p-4 animate-pulse">
          <div className="h-4 w-40 bg-white/10 rounded" />
          <div className="mt-2 h-3 w-72 bg-white/10 rounded" />
          <div className="mt-1 h-3 w-64 bg-white/10 rounded" />
          <div className="mt-1 h-3 w-52 bg-white/10 rounded" />
        </div>
      )}
      {!loading && result && (
        <div className="mt-4 sm:mt-6 rounded border p-4">
          <h3 className="font-medium">Result</h3>
          <p className="mt-2 text-sm">Price: 1 {WETH.symbol} = {new Intl.NumberFormat().format(Number(result.price))} {DAI.symbol}</p>
          <p className="text-sm">Amount In: {new Intl.NumberFormat().format(Number(result.amountIn))} {WETH.symbol}</p>
          <p className="text-sm">Amount Out: {new Intl.NumberFormat().format(Number(result.amountOut))} {DAI.symbol}</p>
        </div>
      )}

      {/* APY Estimator */}
      <div className="mt-4 sm:mt-8 rounded border p-4">
        <h3 className="font-medium">Delta‑Neutral APY Estimator</h3>
        <p className="mt-1 text-xs text-white/70">
          Enter annualized components (percent). Net APY = Funding + LP fees + Incentives − Borrow − Other costs.
        </p>
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="text-sm">
            Funding APR (%)
            <input type="range" min="-50" max="200" step="0.5" value={Number(fundingApr || 0)} onChange={(e) => setFundingApr(e.target.value)} className="w-full" />
            <div className="text-xs mt-1">{Number(fundingApr || 0).toFixed(2)}%</div>
          </label>
          <label className="text-sm">
            LP Fees APR (%)
            <input type="range" min="0" max="200" step="0.5" value={Number(lpFeesApr || 0)} onChange={(e) => setLpFeesApr(e.target.value)} className="w-full" />
            <div className="text-xs mt-1">{Number(lpFeesApr || 0).toFixed(2)}%</div>
          </label>
          <label className="text-sm">
            Incentives APR (%)
            <input type="range" min="0" max="200" step="0.5" value={Number(incentivesApr || 0)} onChange={(e) => setIncentivesApr(e.target.value)} className="w-full" />
            <div className="text-xs mt-1">{Number(incentivesApr || 0).toFixed(2)}%</div>
          </label>
          <label className="text-sm">
            Borrow APR (%)
            <input type="range" min="0" max="200" step="0.5" value={Number(borrowApr || 0)} onChange={(e) => setBorrowApr(e.target.value)} className="w-full" />
            <div className="text-xs mt-1">{Number(borrowApr || 0).toFixed(2)}%</div>
          </label>
          <label className="text-sm sm:col-span-2">
            Other costs (gas, slippage, funding drifts) APR (%)
            <input type="range" min="0" max="50" step="0.5" value={Number(otherCostsApr || 0)} onChange={(e) => setOtherCostsApr(e.target.value)} className="w-full" />
            <div className="text-xs mt-1">{Number(otherCostsApr || 0).toFixed(2)}%</div>
          </label>
        </div>
        <div className="mt-3 text-sm">
          {(() => {
            const f = parseFloat(fundingApr) || 0;
            const l = parseFloat(lpFeesApr) || 0;
            const i = parseFloat(incentivesApr) || 0;
            const b = parseFloat(borrowApr) || 0;
            const o = parseFloat(otherCostsApr) || 0;
            const net = f + l + i - b - o;
            return <span>Net APY (est.): <span className="font-semibold text-yellow-400">{net.toFixed(2)}%</span></span>;
          })()}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => { setFundingApr("5"); setLpFeesApr("20"); setIncentivesApr("0"); setBorrowApr("2"); setOtherCostsApr("1"); }} className="rounded border border-yellow-500 px-2 py-1 text-xs text-yellow-400 hover:bg-yellow-500 hover:text-black">Conservative</button>
          <button type="button" onClick={() => { setFundingApr("10"); setLpFeesApr("30"); setIncentivesApr("5"); setBorrowApr("5"); setOtherCostsApr("2"); }} className="rounded border border-yellow-500 px-2 py-1 text-xs text-yellow-400 hover:bg-yellow-500 hover:text-black">Balanced</button>
          <button type="button" onClick={() => { setFundingApr("20"); setLpFeesApr("40"); setIncentivesApr("15"); setBorrowApr("8"); setOtherCostsApr("3"); }} className="rounded border border-yellow-500 px-2 py-1 text-xs text-yellow-400 hover:bg-yellow-500 hover:text-black">Aggressive</button>
        </div>
        <p className="mt-2 text-xs text-white/60">
          This is a simplified estimator. True delta‑neutral returns depend on hedge ratio accuracy, funding basis, borrow markets,
          fees, and rebalance cadence.
        </p>
      </div>
      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
      {loading && <p className="mt-4 text-sm">Loading...</p>}
    </div>
  );
}


