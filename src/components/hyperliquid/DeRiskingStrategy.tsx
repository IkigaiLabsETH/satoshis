"use client";

export default function DeRiskingStrategy() {
  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
        De-Risking Strategy Analysis
      </h3>

      {/* Strategy Overview */}
      <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-xl">
        <h4 className="text-xl font-bold text-yellow-400 mb-4">🎯 Strategy Overview</h4>
        <p className="text-lg text-white leading-relaxed mb-4">
          Your strategy is a classic way to de-risk while maintaining directional exposure—essentially cashing out most of your holdings into stables for safety, then using a small portion as collateral for a leveraged long to keep the upside potential.
        </p>
        <p className="text-gray-300 leading-relaxed">
          It's particularly relevant if you believe we're at or near the end of the current Bitcoin halving cycle (which many analysts still see as intact for 2025, with potential peaks around October-November before any major downturn). Based on current market conditions (BTC around $115,000-$116,000), selling 2 BTC would net you roughly $230,000 in USDC, and you'd only need about $5,750-$5,800 in margin for a 40x long to replicate that 2 BTC exposure.
        </p>
      </div>

      {/* Pros and Cons Analysis */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Pros */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold text-green-400 mb-4">✅ Pros</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Locks in gains from the cycle's run-up</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Minimizes downside if BTC crashes (e.g., into a bear market)</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Gives you dry powder to buy dips or pivot</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Effectively turns a full spot position into a leveraged bet with limited loss—similar to buying call options but via perps</span>
            </li>
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
          <h4 className="text-xl font-bold text-red-400 mb-4">⚠️ Cons</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>40x is extremely aggressive; BTC's volatility (often 2-5% daily swings) means liquidation can happen on a minor pullback</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Roughly 2.5% adverse move wipes you out, assuming standard liq thresholds on Hyperliquid</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Repeated liquidations could rack up fees and emotional wear</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>If the market chops sideways, you might bleed slowly without upside</span>
            </li>
            <li className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>Opportunity cost—if BTC moons without liquidating you, great, but you've capped your "safe" capital's yield</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Improvements Section */}
      <div className="mb-8 p-6 bg-blue-500/10 border border-blue-500/30 rounded-xl">
        <h4 className="text-xl font-bold text-blue-400 mb-4">🔧 Suggested Improvements</h4>
        <div className="space-y-4 text-gray-300">
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-white">Lower the leverage to 20x or even 10x.</span> This increases your margin to ~$11,500 (for 20x) but pushes liquidation farther out (to a ~5% drop), giving more breathing room against whipsaws. It aligns better with cycle-end caution, where volatility spikes.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-white">Scale in/out:</span> Instead of one big 40x position, split into 2-3 smaller ones with staggered entries (e.g., one at current levels, one on a dip to $114K support). This averages your cost and reduces the impact of a single bad trade.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-white">Diversify the exposure:</span> Use part of the margin for ETH or other alts if you want cycle correlation without full BTC concentration. Or, if Hyperliquid supports it, consider options for asymmetric upside (calls) instead of perps—less liq risk, defined max loss.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-white">Monitor funding rates:</span> On perps, high positive rates can eat into profits over time. If rates spike, consider rotating to spot or another platform.
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
            <div>
              <span className="font-semibold text-white">Have an exit plan for the whole setup:</span> Set a total loss cap (e.g., after 3-4 liquidations, stop and reassess) to avoid chasing.
            </div>
          </div>
        </div>
      </div>

      {/* Stop Loss and Take Profit Strategy */}
      <div className="mb-8 p-6 bg-purple-500/10 border border-purple-500/30 rounded-xl">
        <h4 className="text-xl font-bold text-purple-400 mb-4">🎯 Stop Loss & Take Profit Strategy</h4>
        <p className="text-gray-300 mb-4">
          Yes, absolutely recommend both, especially on high leverage where you can't afford to "hodl" through drawdowns. Tight stops (e.g., 1-2% below entry) often fail in BTC due to noise/wick hunting, as you've experienced—volatility triggers them too easily, leading to premature exits. Go wider for efficiency.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="text-lg font-semibold text-red-400 mb-3">Stop Loss Strategy</h5>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Place it below key support to filter out noise but protect against real breakdowns</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>At current levels (~$115,500), set SL at $110,000 (about 4-5% below, a psychological and technical floor from recent action)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>If it breaks there, it could signal cycle weakness heading to $100K or lower—better to cut and rebuy cheaper</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Use a stop-market order to auto-close the position before full liquidation hits</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold text-green-400 mb-3">Take Profit Strategy</h5>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ladder them to capture gains progressively</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Partial TP at $120,000 (first resistance breakout target, ~4% up)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Another at $130,000 (mid-cycle extension per some forecasts)</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Trail the rest (e.g., move SL up as price rises) aiming for $135,000-$160,000 if momentum builds</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>This locks profits without missing a bigger run, especially if ETF inflows or macro tailwinds (like Fed cuts) push it higher</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Recommendation */}
      <div className="p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 rounded-xl">
        <h4 className="text-xl font-bold text-yellow-400 mb-4">💡 Final Recommendation</h4>
        <p className="text-white leading-relaxed">
          Overall, this tweaks your approach for more sustainability without losing the core de-risking benefit. Remember, markets can stay irrational longer than expected—track cycle indicators like on-chain metrics or halving parallels closely.
        </p>
      </div>
    </div>
  );
}
