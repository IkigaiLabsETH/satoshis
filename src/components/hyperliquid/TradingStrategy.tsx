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

  // Portfolio constraints - Updated to match realistic calculations
  const totalPortfolio = 30000; // Total account equity - enough for 0.5 BTC positions
  const maxPositionSize = totalPortfolio * 0.35; // 35% maximum per position (matches PositionManager)

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
                BTC: ${BTC.price.toLocaleString()} | ETH: ${ETH.price.toLocaleString()}
              </>
            )}
          </div>
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
                  <h5 className="text-yellow-400 font-semibold mb-2">Ethereum (ETH)</h5>
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
                    </ul>
                  )}
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-sm text-yellow-400">
                  <strong>Portfolio Constraint:</strong> Maximum 10% allocation per position 
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
                    <li>• Entry: $119,425</li>
                    <li>• Stop Loss: $89,569 (25% below entry)</li>
                    <li>• Risk: ~$7,481 per position</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">ETH Stop Loss</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: $3,200</li>
                    <li>• Stop Loss: $3,375 (25% below entry)</li>
                    <li>• Risk: ~$2,812 per position</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded">
                <p className="text-sm text-red-400">
                  <strong>Risk Management:</strong> Total risk per trade cycle: ~$78.50 
                  (15% of account equity)
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
                    <li>• Entry: $119,425</li>
                    <li>• Target: $149,281 (25% profit)</li>
                    <li>• Profit: ~$549.44 per position</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-green-400 font-semibold mb-2">ETH Take Profit</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: $3,200</li>
                    <li>• Target: $4,000 (25% profit)</li>
                    <li>• Profit: ~$400.00 per position</li>
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
      </div>
    </div>
  );
}
