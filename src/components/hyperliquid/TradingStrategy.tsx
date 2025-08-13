"use client";

import { useState, useEffect } from 'react';
import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';

export default function TradingStrategy() {
  const { BTC, ETH, isLoading, error } = useLiveCryptoPrices();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  // Portfolio constraints - aligned with ~0.5 BTC (~$60k)
  const totalPortfolio = 60000; // Total account equity
  const maxPositionSize = totalPortfolio * 0.35; // 35% maximum per position (matches PositionManager)
  const MAX_TRADES = 3;
  const PER_TRADE_CAP = 21000; // explicit per-trade notional cap

  // Calculate optimal position sizes based on live prices and 35% limit
  const calculateOptimalPositionSize = (asset: 'BTC' | 'ETH') => {
    const currentPrice = asset === 'BTC' ? BTC.price : ETH.price;
    if (!currentPrice || currentPrice <= 0) return { size: 0, notional: 0, leverage: 0 };
    
    // Calculate maximum position size in USD (35% of portfolio)
    const maxPositionUSD = maxPositionSize;
    
    // Calculate position size in asset units
    const positionSize = maxPositionUSD / currentPrice;
    
    // Calculate notional value
    const notionalValue = positionSize * currentPrice;
    
    // Use realistic 7x leverage (matches PositionManager)
    const leverage = 7;
    
    return {
      size: positionSize,
      notional: notionalValue,
      leverage: leverage
    };
  };

  const btcPosition = calculateOptimalPositionSize('BTC');
  const ethPosition = calculateOptimalPositionSize('ETH');

  // Dynamic TP calculations based on live prices and current position sizes
  const calculateTakeProfit = (asset: 'BTC' | 'ETH') => {
    const price = asset === 'BTC' ? BTC.price : ETH.price;
    const size = asset === 'BTC' ? btcPosition.size : ethPosition.size;
    if (!price || price <= 0) {
      return { entry: 0, target: 0, profitPerPosition: 0 };
    }
    const entry = price;
    const target = entry * 1.25;
    const profitPerPosition = (target - entry) * size;
    return { entry, target, profitPerPosition };
  };

  const btcTP = calculateTakeProfit('BTC');
  const ethTP = calculateTakeProfit('ETH');

  // Assumptions (user adjustable)
  const leverageAssumption = 7;
  const [movePct, setMovePct] = useState(0.02); // 2% baseline
  const [riskCap, setRiskCap] = useState(1000); // max daily loss

  // Goal context for a clear summary (derived)
  const requiredNotionalFor1k = 1000 / (movePct * leverageAssumption);
  const requiredMarginFor1k = requiredNotionalFor1k / leverageAssumption;

  // Daily risk cap logic: cap max daily loss to $1,000 with 25% SL
  const targetPnL = 1000;
  const dailyRiskCap = riskCap;
  const stopLossPct = 0.25; // 25% baseline SL
  const riskLimitedNotionalSingle = dailyRiskCap / stopLossPct; // notional allowed to keep loss ≤ risk cap
  const targetNotionalSingle = targetPnL / (movePct * leverageAssumption);
  const recommendedNotionalSingle = Math.min(targetNotionalSingle, riskLimitedNotionalSingle, PER_TRADE_CAP);
  const expectedPnLSingle = recommendedNotionalSingle * movePct * leverageAssumption;
  const marginRequiredSingle = recommendedNotionalSingle / leverageAssumption;
  const shortfallSingle = Math.max(0, targetPnL - expectedPnLSingle);

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
        Perpetuals Trading Strategy
      </h3>

      {/* Core Strategy Highlight */}
      <div className="mb-8 p-6 bg-gradient-to-r from-yellow-500/10 to-red-500/10 border border-yellow-500/30 rounded-xl">
        <div className="text-center">
          <h4 className="text-xl font-bold text-yellow-400 mb-3">🎯 Strategy Summary</h4>
          <p className="text-lg text-white leading-relaxed">
            <span className="text-yellow-400 font-semibold">Follow liquidation levels long when the red and yellow lines are cleared.</span> 
            <br />
            <span className="text-red-400 font-semibold">Set stop losses (don&apos;t be me)</span> and 
            <span className="text-green-400 font-semibold"> take profit at 25%.</span>
            <br />
            <span className="text-blue-400 font-semibold">Rinse-repeat and put the 25% profit into spot on the dip.</span>
          </p>
          
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm leading-relaxed">
              <span className="font-semibold">Personal Philosophy:</span> I&apos;m of the same camp as Marty and the only long rn. The market is too hot and I&apos;m also trading SOL and SUI. I know they are destined for higher ATH (when, idk). So when the high leveraged longs get liquidated as they come down (follow Marty&apos;s liquidation chart), and the reds, yellow and sometimes blue lines get cleared- that&apos;s when Binance seems to allow the price to pump again.
            </p>
          </div>
          
          <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-blue-300 text-sm leading-relaxed">
              <span className="font-semibold">Advanced Strategy Guidance:</span> Keep a spreadsheet of your trades and review monthly to the high timeframe chart. Make revisions to position size and leverage, practice taking 80% profit at 25%+ and leave the 20% in for further upside in a bull market. The more bullish the more you leave, always take 50% profit at 25%. Build your bags with almost zero risk. Just takes time and hard work - patience and discipline, the ninja skills in trading.
            </p>
          </div>
        </div>
      </div>

      {/* Live Price Status */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-none">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-400">Error fetching live prices: {error}</span>
          </div>
        </div>
      )}

      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">
              {isLoading ? 'Loading live prices from CoinGecko...' : 'Live prices from CoinGecko API'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            {isClient && !isLoading && (
              <>
                BTC: ${BTC.price.toLocaleString()} | ETH: ${ETH.price.toLocaleString()} • Max trades: {MAX_TRADES} • Per-trade cap: ${PER_TRADE_CAP.toLocaleString()}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Controls: Volatility and Daily Risk Cap */}
      <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
        <div className="grid md:grid-cols-2 gap-4 items-end">
          <div>
            <label className="block text-yellow-400 text-sm mb-1">Assumed Daily Move</label>
            <div className="flex items-center space-x-2">
              <select
                className="bg-black/50 border border-yellow-500/30 text-white rounded px-3 py-2"
                value={movePct}
                onChange={(e) => setMovePct(parseFloat(e.target.value))}
              >
                <option value={0.01}>1%</option>
                <option value={0.015}>1.5%</option>
                <option value={0.02}>2%</option>
                <option value={0.03}>3%</option>
              </select>
              <span className="text-gray-400 text-sm">Leverage: {leverageAssumption}x</span>
            </div>
          </div>
          <div>
            <label className="block text-yellow-400 text-sm mb-1">Daily Risk Cap (max loss)</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                className="bg-black/50 border border-yellow-500/30 text-white rounded px-3 py-2 w-36"
                value={riskCap}
                min={100}
                step={100}
                onChange={(e) => setRiskCap(Math.max(0, Number(e.target.value)))}
              />
              <span className="text-gray-400 text-sm">USD</span>
            </div>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-300">
          <span className="mr-4">Recommended Notional: ${recommendedNotionalSingle.toFixed(0)}</span>
          <span className="mr-4">Margin @ {leverageAssumption}x: ${marginRequiredSingle.toFixed(0)}</span>
          <span>Expected PnL: ${expectedPnLSingle.toFixed(0)} {shortfallSingle > 0 ? `(shortfall $${shortfallSingle.toFixed(0)})` : ''}</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Entry Strategy */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('entry')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Entry Strategy</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'entry' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'entry' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>
                  Wait for BTC to clear ${isLoading ? '--' : BTC.price ? Math.floor(BTC.price * 0.995).toLocaleString() : '119,425'} 
                  (yellow liquidation level)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>
                  Wait for ETH to clear ${isLoading ? '--' : ETH.price ? Math.floor(ETH.price * 0.995).toLocaleString() : '3,200'} 
                  (yellow liquidation level)
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Confirm breakout above red liquidation zones</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Enter long positions with conservative leverage (5-10x)</span>
              </div>
            </div>
          )}
        </div>

        {/* Position Sizing */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('sizing')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Position Sizing</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'sizing' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'sizing' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Bitcoin (BTC)</h5>
                  {isLoading ? (
                    <div className="animate-pulse space-y-1">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      <li>• Position Size: {btcPosition.size.toFixed(6)} BTC</li>
                      <li>• Entry Price: ${BTC.price ? BTC.price.toLocaleString() : '--'}</li>
                      <li>• Notional Value: ~${btcPosition.notional.toFixed(0)}</li>
                      <li>• Leverage: {btcPosition.leverage.toFixed(1)}x</li>
                      <li>• Portfolio Allocation: {((btcPosition.notional / totalPortfolio) * 100).toFixed(1)}%</li>
                    </ul>
                  )}
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Ethereum (ETH) — Core Perp</h5>
                  {isLoading ? (
                    <div className="animate-pulse space-y-1">
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-700 rounded"></div>
                    </div>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      <li>• Position Size: {ethPosition.size.toFixed(4)} ETH</li>
                      <li>• Entry Price: ${ETH.price ? ETH.price.toLocaleString() : '--'}</li>
                      <li>• Notional Value: ~${ethPosition.notional.toFixed(0)}</li>
                      <li>• Leverage: {ethPosition.leverage.toFixed(1)}x</li>
                      <li>• Portfolio Allocation: {((ethPosition.notional / totalPortfolio) * 100).toFixed(1)}%</li>
                      <li>• Per-trade Notional Cap: ${PER_TRADE_CAP.toLocaleString()}</li>
                    </ul>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-sm text-yellow-400">
                  <strong>Portfolio Constraint:</strong> Maximum 35% allocation per position 
                  (${maxPositionSize.toFixed(0)}) to maintain proper risk management
                </p>
                <p className="text-sm text-gray-300 mt-2">
                  <strong>Total Portfolio:</strong> ${totalPortfolio.toFixed(2)} | 
                  <strong>Available Margin:</strong> ${(totalPortfolio - btcPosition.notional - ethPosition.notional).toFixed(2)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stop Loss */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('stopLoss')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Stop Loss Strategy</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'stopLoss' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'stopLoss' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">BTC Stop Loss</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: {isLoading ? '--' : `$${BTC.price.toLocaleString()}`}</li>
                    <li>• Stop Loss: {isLoading ? '--' : `$${Math.floor((BTC.price || 0) * 0.75).toLocaleString()}`} (25% below entry)</li>
                    <li>• Risk: {isLoading ? '--' : `~$${(((BTC.price || 0) - (BTC.price || 0) * 0.75) * btcPosition.size).toFixed(2)} per position`}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">ETH Stop Loss</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: {isLoading ? '--' : `$${ETH.price.toLocaleString()}`}</li>
                    <li>• Stop Loss: {isLoading ? '--' : `$${Math.floor((ETH.price || 0) * 0.75).toLocaleString()}`} (25% below entry)</li>
                    <li>• Risk: {isLoading ? '--' : `~$${(((ETH.price || 0) - (ETH.price || 0) * 0.75) * ethPosition.size).toFixed(2)} per position`}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-sm text-red-400">
                  <strong>Risk Management:</strong> 25% stop loss baseline on each position; size conservatively so combined risk remains under 2% of equity per trade.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Take Profit */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('takeProfit')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Take Profit Strategy</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'takeProfit' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'takeProfit' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">BTC Take Profit</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: {isLoading ? '--' : `$${btcTP.entry.toLocaleString()}`}</li>
                    <li>• Target: {isLoading ? '--' : `$${btcTP.target.toLocaleString()}`} (25% profit)</li>
                    <li>• Profit: {isLoading ? '--' : `~$${btcTP.profitPerPosition.toFixed(2)} per position`}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">ETH Take Profit</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: {isLoading ? '--' : `$${ethTP.entry.toLocaleString()}`}</li>
                    <li>• Target: {isLoading ? '--' : `$${ethTP.target.toLocaleString()}`} (25% profit)</li>
                    <li>• Profit: {isLoading ? '--' : `~$${ethTP.profitPerPosition.toFixed(2)} per position`}</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded">
                <p className="text-sm text-green-400">
                  <strong>Profit Allocation:</strong> 25% to spot trading during dips, 
                  75% reinvested in next cycle
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rinse and Repeat */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('rinseRepeat')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Rinse & Repeat Strategy</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'rinseRepeat' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'rinseRepeat' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white">Step 1:</span> Hit take profit target (25% gain)
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white">Step 2:</span> Close 25% of position for spot allocation
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white">Step 3:</span> Wait for 5-10% dip from TP level
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white">Step 4:</span> Buy spot BTC/ETH during dip
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-white">Step 5:</span> Re-enter long positions after dip
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Risk Management */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('riskManagement')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Risk Management</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'riskManagement' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'riskManagement' && (
            <div className="mt-4 space-y-3 text-gray-300">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Position Limits</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Max leverage: 10x</li>
                    <li>• Max risk per trade: 15% of equity</li>
                    <li>• Max concurrent positions: 2 (BTC + ETH)</li>
                    <li>• Margin buffer: Always maintain 20%+ above required</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Exit Rules</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Position sizing: 2% max risk per trade, scale in on dips</li>
                    <li>• Stop loss: 25% below entry</li>
                    <li>• Take profit: 25% above entry</li>
                    <li>• Emergency exit: If margin ratio drops below 30%</li>
                    <li>• Time-based exit: Close if no TP hit within 48 hours</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-sm text-yellow-400">
                  <strong>Key Principle:</strong> Never risk more than you can afford to lose. 
                  This strategy prioritizes capital preservation over aggressive gains.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Strategy Summary (Plain-English) */}
        <div className="bg-black/50 p-6 rounded-none border border-yellow-500/20">
          <button
            onClick={() => toggleSection('summary')}
            className="w-full text-left flex items-center justify-between"
          >
            <h4 className="text-xl font-bold text-yellow-500">Simple Strategy Summary</h4>
            <span className="text-yellow-500 text-2xl">
              {expandedSection === 'summary' ? '−' : '+'}
            </span>
          </button>
          {expandedSection === 'summary' && (
            <div className="mt-4 space-y-3 text-gray-300 text-sm leading-6">
              <p>
                - Core: We 7x long ETH perps as a hedge/edge since our non-trading portfolio is mostly BTC. This gives extra ETH exposure with ~7× less capital than spot. We target ~$1,000/day potential using a {(movePct*100).toFixed(0)}% move baseline.
              </p>
              <p>
                - Sizing Rules: Max {MAX_TRADES} concurrent trades, ${PER_TRADE_CAP.toLocaleString()} notional cap per trade, 35% of equity absolute cap, 7x leverage.
                To target $1k/day on one asset you’d need ≈ ${requiredNotionalFor1k.toFixed(0)} notional (margin ≈ ${requiredMarginFor1k.toFixed(0)} at 7x) at this volatility.
              </p>
              <p>
                - We also cap daily risk to $1,000. With a 25% stop loss, the max notional per active trade under the risk cap is
                ${riskLimitedNotionalSingle.toFixed(0)} (margin ≈ ${marginRequiredSingle.toFixed(0)} at {leverageAssumption}x). If this
                size yields less than $1k expected PnL at {(movePct*100).toFixed(0)}% move, we accept the shortfall (≈ ${shortfallSingle.toFixed(0)})
                rather than increasing risk.
              </p>
              <p>
                - Entries: Use CoinGlass liquidation heatmap. Wait for red/yellow clusters above to clear, then enter 7x long ETH. Exits: −25% stop loss, +25% take profit; recycle part of profits to spot on dips to compound exposure.
              </p>
              <p>
                - Risk discipline: keep total risk per trade small (target under ~2% of equity). If volatility is lower than expected,
                we lower profit expectations or position size; if volatility is higher, we scale out faster.
              </p>
              <p className="text-yellow-400">
                This is not financial advice. It’s a rules-based approach focused on consistent execution, not prediction.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
