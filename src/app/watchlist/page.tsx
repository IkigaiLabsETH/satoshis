'use client';

import { useState, useEffect } from 'react';
interface MarketPrediction {
  timeframe: string;
  btcPrediction: {
    price: number;
    change: number;
    confidence: number;
    reasoning: string;
  };
  topPerformers: {
    asset: string;
    symbol: string;
    predictedOutperformance: number;
    confidence: number;
    reasoning: string;
    type: 'crypto' | 'stock';
  }[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
}

interface MarketState {
  fearGreedIndex: number;
  trend: 'up' | 'down' | 'sideways';
  volatility: number;
  bullMarketPeakSignals: {
    peakRisk: 'low' | 'medium' | 'high' | 'extreme';
  };
}

export default function WatchlistPage() {
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [marketState, setMarketState] = useState<MarketState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const predictionsRes = await fetch('/api/watchlist/predictions');
        const marketStateRes = await fetch('/api/watchlist/market-state');

        if (predictionsRes.ok && marketStateRes.ok) {
          const [predictionsData, marketStateData] = await Promise.all([
            predictionsRes.json(),
            marketStateRes.json()
          ]);

          if (predictionsData.success) {
            setPredictions(predictionsData.data);
          } else {
            setError(`Predictions failed: ${predictionsData.error}`);
          }
          
          if (marketStateData.success) {
            setMarketState(marketStateData.data);
          } else {
            setError(`Market state failed: ${marketStateData.error}`);
          }
        } else {
          const errorMsg = `API Error: Predictions ${predictionsRes.status}, Market State ${marketStateRes.status}`;
          setError(errorMsg);
        }
      } catch {
        setError('Error loading market data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                GROK420 AI Market Analysis
              </div>
              <div className="text-white/60 text-lg">Loading AI-powered predictions...</div>
              <div className="mt-4 flex justify-center">
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
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Data</h2>
            <p className="text-red-300 mb-6 text-lg">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-bold hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25"
            >
              Retry
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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            GROK420 AI Market Analysis
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto">
            AI-powered predictions for assets that can outperform Bitcoin
          </p>
          <div className="mt-6 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"></div>
          </div>
        </div>

        {/* Market State Summary */}
        {marketState && (
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-8 mb-10 rounded-2xl backdrop-blur-sm shadow-2xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
              Current Market State
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Fear & Greed</p>
                <p className={`text-3xl font-bold ${marketState.fearGreedIndex > 70 ? 'text-green-400' : marketState.fearGreedIndex < 30 ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.fearGreedIndex}
                </p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Trend</p>
                <p className={`text-3xl font-bold ${marketState.trend === 'up' ? 'text-green-400' : marketState.trend === 'down' ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.trend.toUpperCase()}
                </p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Volatility</p>
                <p className="text-3xl font-bold text-yellow-500">{marketState.volatility}%</p>
              </div>
              <div className="text-center bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Peak Risk</p>
                <p className={`text-3xl font-bold ${marketState.bullMarketPeakSignals.peakRisk === 'high' || marketState.bullMarketPeakSignals.peakRisk === 'extreme' ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.bullMarketPeakSignals.peakRisk.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Predictions */}
        <div className="space-y-8">
          {predictions.map((prediction) => (
            <div key={prediction.timeframe} className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-8 rounded-2xl backdrop-blur-sm shadow-2xl hover:shadow-yellow-500/10 transition-all duration-300">
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
              <div className="mb-8">
                <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="text-yellow-500">₿</span>
                  Bitcoin (BTC)
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Predicted Price</p>
                    <p className="text-2xl font-bold text-yellow-500">${prediction.btcPrediction.price.toLocaleString()}</p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Expected Change</p>
                    <p className={`text-2xl font-bold ${prediction.btcPrediction.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {prediction.btcPrediction.change >= 0 ? '+' : ''}{prediction.btcPrediction.change.toFixed(2)}%
                    </p>
                  </div>
                  <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
                    <p className="text-white/60 text-sm mb-1">Confidence</p>
                    <p className="text-2xl font-bold text-yellow-500">{prediction.btcPrediction.confidence}%</p>
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
                <div className="space-y-4">
                  {prediction.topPerformers.map((performer, index) => (
                    <div key={index} className="bg-gradient-to-r from-black/40 to-gray-900/40 border border-yellow-500/20 p-6 rounded-xl hover:border-yellow-500/40 transition-all duration-200">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-bold text-white text-lg">{performer.asset}</span>
                            <span className="text-white/60">({performer.symbol})</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              performer.type === 'crypto' ? 'bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 border border-blue-500/30' : 'bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 border border-green-500/30'
                            }`}>
                              {performer.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 mb-3 leading-relaxed">{performer.reasoning}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-sm mb-1">Outperformance</p>
                          <p className="text-2xl font-bold text-green-400">
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
        <div className="mt-12 p-6 bg-gradient-to-r from-black/40 to-gray-900/40 border border-yellow-500/20 rounded-2xl">
          <p className="text-sm text-white/70 text-center leading-relaxed">
            AI predictions are based on real-time market data and Grok 4 analysis. Past performance does not guarantee future results.
            Always conduct your own research and consider your risk tolerance before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
