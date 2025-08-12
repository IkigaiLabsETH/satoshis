"use client";

import { useState } from 'react';

export default function TradingStrategy() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
        Perpetuals Trading Strategy
      </h3>
      
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
                <span>Wait for BTC to clear $119,425 (yellow liquidation level)</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Wait for ETH to clear $3,200 (yellow liquidation level)</span>
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
                  <ul className="space-y-1 text-sm">
                    <li>• Position Size: 0.018403 BTC</li>
                    <li>• Entry Price: $119,425</li>
                    <li>• Notional Value: ~$2,197</li>
                    <li>• Leverage: 5-10x</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-yellow-400 font-semibold mb-2">Ethereum (ETH)</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Position Size: 0.5 ETH</li>
                    <li>• Entry Price: $3,200</li>
                    <li>• Notional Value: ~$1,600</li>
                    <li>• Leverage: 5-10x</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                <p className="text-sm text-yellow-400">
                  <strong>Note:</strong> Position sizes are calculated to maintain margin above $211.95 
                  with current account equity of $521.95
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
                    <li>• Stop Loss: $116,897 (2.1% below entry)</li>
                    <li>• Risk: ~$46.50 per position</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-red-400 font-semibold mb-2">ETH Stop Loss</h5>
                  <ul className="space-y-1 text-sm">
                    <li>• Entry: $3,200</li>
                    <li>• Stop Loss: $3,136 (2.0% below entry)</li>
                    <li>• Risk: ~$32.00 per position</li>
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
                    <li>• Stop loss: 2-3% below entry</li>
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
