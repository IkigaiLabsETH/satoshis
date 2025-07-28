'use client';

import { useState, useEffect } from 'react';
import { MarketPrediction, MarketState } from '@/types/watchlist';

export default function WatchlistPage() {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [marketState, setMarketState] = useState<MarketState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both APIs in parallel
        const [predictionsRes, marketStateRes] = await Promise.allSettled([
          fetch('/api/watchlist/predictions'),
          fetch('/api/watchlist/market-state')
        ]);

        let hasError = false;
        const errorMessages: string[] = [];

        // Handle predictions response
        if (predictionsRes.status === 'fulfilled' && predictionsRes.value.ok) {
          const predictionsData = await predictionsRes.value.json();
          if (predictionsData.success) {
            setPredictions(predictionsData.data);
          } else {
            hasError = true;
            errorMessages.push(`Predictions: ${predictionsData.error}`);
          }
        } else {
          hasError = true;
          const status = predictionsRes.status === 'fulfilled' ? predictionsRes.value.status : 'timeout';
          errorMessages.push(`Predictions API failed (${status})`);
        }

        // Handle market state response
        if (marketStateRes.status === 'fulfilled' && marketStateRes.value.ok) {
          const marketStateData = await marketStateRes.value.json();
          if (marketStateData.success) {
            setMarketState(marketStateData.data);
          } else {
            hasError = true;
            errorMessages.push(`Market State: ${marketStateData.error}`);
          }
        } else {
          hasError = true;
          const status = marketStateRes.status === 'fulfilled' ? marketStateRes.value.status : 'timeout';
          errorMessages.push(`Market State API failed (${status})`);
        }

        // Only show error if both APIs failed
        if (hasError && predictions.length === 0 && !marketState) {
          setError(errorMessages.join('; '));
        } else if (hasError) {
          // Show partial error message but don't block the UI
          // Partial API failure logged for debugging
        }

      } catch {
        setError('Error loading market data');
      } finally {
        setLoading(false);
        setLastUpdated(new Date());
      }
    };

    // Only fetch if not already loading
    if (!loading) {
      fetchData();
    }
  }, []); // Empty dependency array - only run once on mount

  const handleRefresh = async () => {
    if (loading) return; // Prevent multiple simultaneous requests
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch both APIs in parallel
      const [predictionsRes, marketStateRes] = await Promise.allSettled([
        fetch('/api/watchlist/predictions'),
        fetch('/api/watchlist/market-state')
      ]);

      let hasError = false;
      const errorMessages: string[] = [];

      // Handle predictions response
      if (predictionsRes.status === 'fulfilled' && predictionsRes.value.ok) {
        const predictionsData = await predictionsRes.value.json();
        if (predictionsData.success) {
          setPredictions(predictionsData.data);
        } else {
          hasError = true;
          errorMessages.push(`Predictions: ${predictionsData.error}`);
        }
      } else {
        hasError = true;
        const status = predictionsRes.status === 'fulfilled' ? predictionsRes.value.status : 'timeout';
        errorMessages.push(`Predictions API failed (${status})`);
      }

      // Handle market state response
      if (marketStateRes.status === 'fulfilled' && marketStateRes.value.ok) {
        const marketStateData = await marketStateRes.value.json();
        if (marketStateData.success) {
          setMarketState(marketStateData.data);
        } else {
          hasError = true;
          errorMessages.push(`Market State: ${marketStateData.error}`);
        }
      } else {
        hasError = true;
        const status = marketStateRes.status === 'fulfilled' ? marketStateRes.value.status : 'timeout';
        errorMessages.push(`Market State API failed (${status})`);
      }

      // Only show error if both APIs failed
      if (hasError && predictions.length === 0 && !marketState) {
        setError(errorMessages.join('; '));
      }

    } catch {
      setError('Error refreshing market data');
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const getFearGreedColor = (index: number) => {
    if (index >= 75) return 'text-green-400';
    if (index >= 50) return 'text-yellow-400';
    if (index >= 25) return 'text-orange-400';
    return 'text-red-400';
  };

  const getFearGreedLabel = (index: number) => {
    if (index >= 75) return 'Extreme Greed';
    if (index >= 60) return 'Greed';
    if (index >= 40) return 'Neutral';
    if (index >= 25) return 'Fear';
    return 'Extreme Fear';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  const getPeakRiskColor = (risk: string) => {
    switch (risk) {
      case 'extreme': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                GROK420 AI Market Analysis
              </div>
              <div className="text-white/60 text-lg mb-4">Loading AI-powered predictions...</div>
              <div className="space-y-2 text-sm text-white/50">
                <div>• Fetching market data from CoinGecko</div>
                <div>• Analyzing market sentiment with Grok 4 AI</div>
                <div>• Generating multi-timeframe predictions</div>
              </div>
              <div className="mt-6 flex justify-center">
                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
              GROK420 AI Market Analysis
            </h1>
            <p className="text-white/60 text-lg">AI-powered predictions for assets that can outperform Bitcoin</p>
          </div>
          <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 p-8 rounded-xl backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-red-400 mb-4">⚠️ API Connection Issue</h2>
            <p className="text-red-300 mb-4 text-lg">{error}</p>
            <div className="bg-black/30 p-4 rounded-lg mb-6">
              <h3 className="text-white font-semibold mb-2">Troubleshooting:</h3>
              <ul className="text-white/80 text-sm space-y-1 text-left">
                <li>• Check your internet connection</li>
                <li>• The AI prediction service may be temporarily overloaded</li>
                <li>• Try refreshing the page in a few moments</li>
                <li>• Market data is cached for 5 minutes to reduce load</li>
              </ul>
            </div>
            <button 
              onClick={handleRefresh} 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
            >
              🔄 Retry Now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            GROK420 AI Market Analysis
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-4">
            AI-powered predictions for assets that can outperform Bitcoin
          </p>
          <div className="flex justify-center items-center gap-4 text-sm text-white/60">
            <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
            <button 
              onClick={handleRefresh}
              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-1 rounded-lg transition-all duration-200"
            >
              ↻ Refresh
            </button>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
          </div>
        </div>

        {/* Market State Summary */}
        {marketState && (
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 mb-8 rounded-2xl backdrop-blur-sm shadow-2xl">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
              Current Market State
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Fear & Greed</p>
                <p className={`text-2xl font-bold ${getFearGreedColor(marketState.fearGreedIndex)}`}>
                  {marketState.fearGreedIndex}
                </p>
                <p className="text-xs text-white/50">{getFearGreedLabel(marketState.fearGreedIndex)}</p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Trend</p>
                <p className={`text-2xl font-bold ${marketState.trend === 'up' ? 'text-green-400' : marketState.trend === 'down' ? 'text-red-400' : 'text-yellow-500'}`}>
                  {getTrendIcon(marketState.trend)} {marketState.trend.toUpperCase()}
                </p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Volatility</p>
                <p className="text-2xl font-bold text-yellow-500">{marketState.volatility.toFixed(1)}%</p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Peak Risk</p>
                <p className={`text-2xl font-bold ${getPeakRiskColor(marketState.bullMarketPeakSignals.peakRisk)}`}>
                  {marketState.bullMarketPeakSignals.peakRisk.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Timeframe Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-black/30 border border-yellow-500/20 rounded-xl p-1">
            {['day', 'week', 'month', 'year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  selectedTimeframe === timeframe
                    ? 'bg-yellow-500 text-black'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* AI Predictions */}
        <div className="space-y-6">
          {predictions
            .filter(prediction => prediction.timeframe === selectedTimeframe)
            .map((prediction) => (
            <div key={prediction.timeframe} className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent capitalize">
                  {prediction.timeframe} Predictions
                </h3>
                <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                  prediction.marketSentiment === 'bullish' ? 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30' :
                  prediction.marketSentiment === 'bearish' ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-400 border border-red-500/30' :
                  'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {prediction.marketSentiment.toUpperCase()}
                </span>
              </div>

              {/* Bitcoin Prediction */}
              <div className="mb-6">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">₿</span>
                  Bitcoin (BTC)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Predicted Price</p>
                    <p className="text-xl font-bold text-yellow-500">${prediction.btcPrediction.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Expected Change</p>
                    <p className={`text-xl font-bold ${prediction.btcPrediction.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {prediction.btcPrediction.change >= 0 ? '+' : ''}{prediction.btcPrediction.change.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Confidence</p>
                    <p className="text-xl font-bold text-yellow-500">{prediction.btcPrediction.confidence}%</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">AI Reasoning</p>
                    <p className="text-sm text-white/80 line-clamp-2">{prediction.btcPrediction.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Assets Predicted to Outperform Bitcoin</h4>
                <div className="space-y-3">
                  {prediction.topPerformers.map((performer, index) => (
                    <div key={index} className="bg-gradient-to-r from-black/40 to-gray-900/40 border border-yellow-500/20 p-4 rounded-xl hover:border-yellow-500/40 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-white text-lg">{performer.asset}</span>
                            <span className="text-white/60">({performer.symbol})</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              performer.type === 'crypto' ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30'
                            }`}>
                              {performer.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 leading-relaxed">{performer.reasoning}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-sm mb-1">Outperformance</p>
                          <p className="text-xl font-bold text-green-400">
                            +{performer.predictedOutperformance.toFixed(2)}%
                          </p>
                          <p className="text-sm text-white/60">{performer.confidence}% confidence</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-gradient-to-r from-black/40 to-gray-900/40 border border-yellow-500/20 rounded-xl">
          <p className="text-sm text-white/70 text-center leading-relaxed">
            AI predictions are based on real-time market data and Grok 4 analysis. Past performance does not guarantee future results.
            Always conduct your own research and consider your risk tolerance before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
