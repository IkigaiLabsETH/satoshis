"use client";

import { useState, useEffect } from 'react';
import { useLiveCryptoPrices } from '@/hooks/useLiveCryptoPrices';

interface ChartData {
  time: string;
  btcPrice: number;
  ethPrice: number;
}

export default function TradingChart() {
  const { BTC, ETH, isLoading, error } = useLiveCryptoPrices();
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [timeframe, setTimeframe] = useState<'1H' | '4H' | '1D'>('4H');
  const [isClient, setIsClient] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  // Generate mock chart data based on live prices
  useEffect(() => {
    if (!isClient || !BTC.price || !ETH.price) return;
    
    const generateData = () => {
      const data: ChartData[] = [];
      let btcPrice = BTC.price;
      let ethPrice = ETH.price;
      
      for (let i = 0; i < 24; i++) {
        // Use a consistent time format that won't cause hydration issues
        const time = `${String(Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`;
        
        // Add some volatility
        btcPrice += (Math.random() - 0.5) * 200;
        ethPrice += (Math.random() - 0.5) * 40;
        
        data.push({
          time,
          btcPrice: Math.max(btcPrice, BTC.price * 0.95),
          ethPrice: Math.max(ethPrice, ETH.price * 0.95)
        });
      }
      
      setChartData(data);
    };

    generateData();
    
    // Update data every 5 minutes
    const interval = setInterval(generateData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [isClient, BTC.price, ETH.price]);

  const refreshChart = () => {
    setIsRefreshing(true);
    const generateData = () => {
      const data: ChartData[] = [];
      let btcPrice = BTC.price || 119000;
      let ethPrice = ETH.price || 3200;
      
      for (let i = 0; i < 24; i++) {
        const time = `${String(Math.floor(i / 6)).padStart(2, '0')}:${String((i % 6) * 10).padStart(2, '0')}`;
        
        btcPrice += (Math.random() - 0.5) * 200;
        ethPrice += (Math.random() - 0.5) * 40;
        
        data.push({
          time,
          btcPrice: Math.max(btcPrice, (BTC.price || 119000) * 0.95),
          ethPrice: Math.max(ethPrice, (ETH.price || 3200) * 0.95)
        });
      }
      
      setChartData(data);
      setIsRefreshing(false);
    };

    generateData();
  };

  const btcPrice = BTC.price || 0;
  const ethPrice = ETH.price || 0;

  return (
    <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            Trading Charts
          </h2>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {isClient ? `Last updated: ${currentTime}` : 'Loading...'}
          </div>
          <button
            onClick={refreshChart}
            disabled={isRefreshing || isLoading}
            className="px-4 py-2 bg-green-700 hover:bg-green-600 disabled:bg-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-2"
          >
            {isRefreshing || isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Refresh</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-none">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-red-400">Error fetching live prices: {error}</span>
          </div>
        </div>
      )}

      {/* Live Price Status */}
      <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-none">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-green-400">
              {isLoading ? 'Loading live prices from CoinGecko...' : 'Live prices from CoinGecko API'}
            </span>
          </div>
          <div className="text-sm text-gray-400">
            Auto-refresh every 30s
          </div>
        </div>
      </div>

      {/* CoinGlass Integration */}
      <div className="mb-8 p-6 bg-black/50 rounded-none border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">📊 Professional Charting Tools</h3>
            <p className="text-gray-300 mb-4">
              Access advanced charting with liquidation levels, real-time data, and professional trading tools
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>• Live liquidation heatmaps</span>
              <span>• Real-time price charts</span>
              <span>• Professional indicators</span>
            </div>
          </div>
          <a
            href="https://www.coinglass.com/pro/futures/LiquidationHeatMap"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 rounded-lg transition-all duration-200 text-white font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Open CoinGlass</span>
          </a>
        </div>
      </div>

      {/* Chart Container */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* BTC Chart */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Bitcoin (BTC) Price Action</h3>
          <div className="h-64 bg-gray-800/30 rounded-none border border-gray-600 p-4 mb-4">
            {/* Mock Chart - Replace with real charting library */}
            <div className="h-full flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="bg-orange-500 rounded-sm"
                  style={{
                    height: `${((data.btcPrice - (BTC.price || 115000) * 0.95) / ((BTC.price || 115000) * 0.05)) * 100}%`,
                    minHeight: '4px',
                    width: '8px'
                  }}
                  title={`${data.time}: $${data.btcPrice.toLocaleString()}`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Liquidation Zones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-none">
              <span className="text-red-400 font-medium">Red Liquidation Zone</span>
              <span className="text-white">
                ${Math.floor((BTC.price || 115000) * 0.985).toLocaleString()} - ${Math.floor((BTC.price || 115000) * 0.995).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
              <span className="text-yellow-400 font-medium">Yellow Liquidation Zone</span>
              <span className="text-white">
                ${Math.floor((BTC.price || 115000) * 0.995).toLocaleString()} - ${Math.floor((BTC.price || 115000) * 1.005).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-none">
              <span className="text-green-400 font-medium">Entry Zone</span>
              <span className="text-white">
                ${Math.floor((BTC.price || 115000) * 1.005).toLocaleString()}+
              </span>
            </div>
          </div>
        </div>

        {/* ETH Chart */}
        <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Ethereum (ETH) Price Action</h3>
          <div className="h-64 bg-gray-800/30 rounded-none border border-gray-600 p-4 mb-4">
            {/* Mock Chart - Replace with real charting library */}
            <div className="h-full flex items-end justify-between space-x-1">
              {chartData.map((data, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-sm"
                  style={{
                    height: `${((data.ethPrice - (ETH.price || 3000) * 0.95) / ((ETH.price || 3000) * 0.05)) * 100}%`,
                    minHeight: '4px',
                    width: '8px'
                  }}
                  title={`${data.time}: $${data.ethPrice.toLocaleString()}`}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Liquidation Zones */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-none">
              <span className="text-red-400 font-medium">Red Liquidation Zone</span>
              <span className="text-white">
                ${Math.floor((ETH.price || 3000) * 0.985).toLocaleString()} - ${Math.floor((ETH.price || 3000) * 0.995).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
              <span className="text-yellow-400 font-medium">Yellow Liquidation Zone</span>
              <span className="text-white">
                ${Math.floor((ETH.price || 3000) * 0.995).toLocaleString()} - ${Math.floor((ETH.price || 3000) * 1.005).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-none">
              <span className="text-green-400 font-medium">Entry Zone</span>
              <span className="text-white">
                ${Math.floor((ETH.price || 3000) * 1.005).toLocaleString()}+
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Signals */}
      <div className="bg-black/50 rounded-none p-6 border border-yellow-500/20 mb-6">
        <h3 className="text-xl font-semibold text-white mb-4">Trading Signals</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-none">
            <div className="text-2xl font-bold text-yellow-400 mb-1">BTC</div>
            <div className="text-sm text-gray-400 mb-2">Entry Signal</div>
            <div className={`text-lg font-semibold ${btcPrice >= 119425 ? 'text-green-400' : 'text-red-400'}`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                btcPrice >= 119425 ? 'READY' : 'WAITING'
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Target: $119,425
            </div>
          </div>
          
          <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-none">
            <div className="text-2xl font-bold text-blue-400 mb-1">ETH</div>
            <div className="text-sm text-gray-400 mb-2">Entry Signal</div>
            <div className={`text-lg font-semibold ${ethPrice >= 3200 ? 'text-green-400' : 'text-red-400'}`}>
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                ethPrice >= 3200 ? 'READY' : 'WAITING'
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Target: $3,200
            </div>
          </div>
          
          <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-none">
            <div className="text-2xl font-bold text-green-400 mb-1">Status</div>
            <div className="text-sm text-gray-400 mb-2">Market Condition</div>
            <div className="text-lg font-semibold text-green-400">
              {isLoading ? (
                <span className="animate-pulse">--</span>
              ) : (
                'MONITORING'
              )}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Liquidation levels
            </div>
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-400">Timeframe:</span>
          <div className="flex space-x-2">
            {(['1H', '4H', '1D'] as const).map((tf) => (
              <button
                key={tf}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                  timeframe === tf
                    ? 'bg-yellow-500 text-black'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setTimeframe(tf)}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-sm text-gray-400">
          <span>Data: Live from CoinGecko | </span>
          <a 
            href="https://www.coinglass.com/pro/futures/LiquidationHeatMap" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline"
          >
            View Live Data
          </a>
        </div>
      </div>
    </div>
  );
}
