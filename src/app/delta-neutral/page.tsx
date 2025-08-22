import YieldFarm from "@/components/YieldFarm";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Delta-Neutral Yield Farming",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-black font-satoshi">
      <div className="container mx-auto px-2 sm:px-4 py-12 sm:py-24">
        <div className="space-y-4 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-2xl sm:text-4xl font-bold text-yellow-500">
              Delta-Neutral Yield Farming
            </h1>
          </div>

          {/* What / Why / How */}
          <Card className="bg-[#18191c] border-[2px] sm:border-[3px] border-yellow-500 w-full max-w-[90rem] mx-auto shadow-[0_0_0_2px_rgba(247,181,0,0.7),0_4px_16px_0_rgba(247,181,0,0.18)] sm:shadow-[0_0_0_4px_rgba(247,181,0,0.7),0_8px_32px_0_rgba(247,181,0,0.18)]">
            <CardContent className="p-4 sm:p-10 md:p-14">
              <h2 className="text-xl sm:text-3xl font-epilogue font-bold text-yellow-500 mb-4">What • Why • How</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90 font-satoshi">
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-epilogue text-yellow-400 font-bold mb-1">What</h3>
                  <p className="text-sm">A read‑only planner for designing a <span className="text-yellow-400 font-semibold">delta‑neutral</span> strategy. We quote WETH→DAI, let you size positions, and estimate net APY. No trades are executed yet.</p>
                  <ul className="list-disc pl-5 text-xs mt-2 space-y-1 text-white/80">
                    <li>Yield farming (4–10%): fees + incentives, but exposed to price/IL</li>
                    <li>Delta‑neutral: long + offsetting short → neutralize price moves; keep carry (fees/funding/incentives)</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-epilogue text-yellow-400 font-bold mb-1">Why</h3>
                  <p className="text-sm">Passive pools often yield 4–10%. With engineered hedging, <span className="text-yellow-400 font-semibold">funding + LP fees + incentives</span> can outweigh <span className="text-yellow-400 font-semibold">borrows + gas</span> → potentially much higher, more stable returns.</p>
                  <ul className="list-disc pl-5 text-xs mt-2 space-y-1 text-white/80">
                    <li>Focus on high‑volume pools (fee income)</li>
                    <li>Use L2s to minimize gas on rebalances</li>
                    <li>Leverage cautiously; watch borrow APRs</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-epilogue text-yellow-400 font-bold mb-1">How</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    <li>Connect wallet (optional) for balances</li>
                    <li>Enter WETH amount and Calculate</li>
                    <li>Tune APY inputs (funding/fees/incentives vs. borrow/costs)</li>
                    <li>Use Rebalance as a placeholder for threshold logic</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-epilogue text-yellow-400 font-bold mb-2">When can 80%+ happen?</h3>
                  <ul className="list-disc pl-5 text-xs space-y-1 text-white/80">
                    <li>Incentivized pools (temporary boosts)</li>
                    <li>High volume → strong LP fees</li>
                    <li>Favorable funding basis</li>
                    <li>Efficient rebalancing on L2</li>
                    <li>Prudent leverage (risk‑managed)</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-4 rounded-lg">
                  <h3 className="font-epilogue text-yellow-400 font-bold mb-2">Key risks to manage</h3>
                  <ul className="list-disc pl-5 text-xs space-y-1 text-white/80">
                    <li>Borrow APR spikes and funding flips</li>
                    <li>Impermanent loss and slippage</li>
                    <li>Gas costs on frequent rebalances</li>
                    <li>Liquidation and smart‑contract risk</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#18191c] border-[2px] sm:border-[3px] border-yellow-500 w-full max-w-[90rem] mx-auto shadow-[0_0_0_2px_rgba(247,181,0,0.7),0_4px_16px_0_rgba(247,181,0,0.18)] sm:shadow-[0_0_0_4px_rgba(247,181,0,0.7),0_8px_32px_0_rgba(247,181,0,0.18)]">
            <CardContent className="p-4 sm:p-10 md:p-14">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-epilogue font-bold text-yellow-500">Delta‑Neutral Yield Farming</h2>
                <p className="text-white/70 text-sm mt-1">Quote WETH→DAI, set amount with quick chips, adjust advanced settings, and estimate net APY.</p>
              </div>
              <YieldFarm />
            </CardContent>
          </Card>

          {/* Logic explainer */}
          <Card className="bg-[#18191c] border-[2px] sm:border-[3px] border-yellow-500 w-full max-w-[90rem] mx-auto shadow-[0_0_0_2px_rgba(247,181,0,0.7),0_4px_16px_0_rgba(247,181,0,0.18)] sm:shadow-[0_0_0_4px_rgba(247,181,0,0.7),0_8px_32px_0_rgba(247,181,0,0.18)]">
            <CardContent className="p-4 sm:p-10 md:p-14">
              <h2 className="text-xl sm:text-3xl font-epilogue font-bold text-yellow-500 mb-4">How this works (production plan)</h2>
              <div className="space-y-4 text-white/90 font-satoshi">
                <p>Read‑only quote today, ship safe production in phases below. No keys are exposed.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <span className="font-semibold text-yellow-400">Wallet (Thirdweb):</span> connection is optional for quotes;
                    required for execution. Client is created via <code>NEXT_PUBLIC_THIRDWEB_CLIENT_ID</code>.
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-400">Pricing:</span> Uniswap V2 reserves → route (WETH→DAI) → simulated trade.
                    We show mid price and quoted output (no slippage yet). V3 quotes with tick ranges are a planned upgrade.
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-400">Rebalancing engine:</span> target delta = 0 using borrowed short
                    against spot/LP exposure. Production integrates lending (Aave/Compound), sets thresholds, and executes
                    swaps atomically with revert on failure.
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-400">APY estimator:</span> a quick calculator where you
                    sum positive carry (funding, LP fees, incentives) and subtract costs (borrows, gas/slippage). The
                    goal is to illustrate how, with an engineered hedge and frequent rebalancing, net yields can far
                    exceed passive pool APRs when market structure is favorable.
                  </li>
                  <li>
                    <span className="font-semibold text-yellow-400">RPC & rate‑limits:</span> prefer injected wallet; fallback to Infura
                    (<code>NEXT_PUBLIC_INFURA_PROJECT_ID</code>), then public RPC. In production add request caching and backoff.
                  </li>
                </ul>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="font-epilogue text-yellow-400 font-bold mb-2">Phase 1 (current)</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Read‑only quotes (Uniswap V2)</li>
                      <li>Thirdweb wallet connect</li>
                      <li>RPC fallback chain</li>
                      <li>Basic APY estimator</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg">
                    <h3 className="font-epilogue text-yellow-400 font-bold mb-2">Phase 2 (safe execution)</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Slippage, deadline, fee controls</li>
                      <li>Aave/Compound borrow integration</li>
                      <li>Hedge ratio and threshold rebalancer</li>
                      <li>Server routes for quotes & caching</li>
                    </ul>
                  </div>
                  <div className="bg-black/30 p-4 rounded-lg md:col-span-2">
                    <h3 className="font-epilogue text-yellow-400 font-bold mb-2">Phase 3 (prod hardening)</h3>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Unit/integration tests; dry‑run mode</li>
                      <li>Retry/backoff, circuit breakers</li>
                      <li>Monitoring, alerting, audit review</li>
                      <li>Key management and permissions</li>
                    </ul>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-2">
                  Disclaimer: Not financial advice. Smart contract interactions carry risk. Use on testnets first.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


