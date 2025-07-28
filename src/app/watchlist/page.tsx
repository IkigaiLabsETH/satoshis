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
  keyEvents: string[];
  riskFactors: string[];
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
        const [predictionsRes, marketStateRes] = await Promise.all([
          fetch('/api/watchlist/predictions'),
          fetch('/api/watchlist/market-state')
        ]);

        if (predictionsRes.ok && marketStateRes.ok) {
          const [predictionsData, marketStateData] = await Promise.all([
            predictionsRes.json(),
            marketStateRes.json()
          ]);

          if (predictionsData.success) {
            setPredictions(predictionsData.data);
          }
          if (marketStateData.success) {
            setMarketState(marketStateData.data);
          }
        } else {
          setError('Failed to fetch market data');
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
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500 mb-4">GROK420 AI Market Analysis</div>
            <div className="text-white/60">Loading AI-powered predictions...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-400">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500 mb-2">GROK420 AI Market Analysis</h1>
          <p className="text-white/60">AI-powered predictions for assets that can outperform Bitcoin</p>
        </div>

        {/* Market State Summary */}
        {marketState && (
          <div className="bg-black border border-yellow-500/20 p-6 mb-8">
            <h2 className="text-2xl font-bold text-yellow-500 mb-4">Current Market State</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-white/60 text-sm">Fear & Greed</p>
                <p className={`text-2xl font-bold ${marketState.fearGreedIndex > 70 ? 'text-green-400' : marketState.fearGreedIndex < 30 ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.fearGreedIndex}
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm">Trend</p>
                <p className={`text-2xl font-bold ${marketState.trend === 'up' ? 'text-green-400' : marketState.trend === 'down' ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.trend.toUpperCase()}
                </p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm">Volatility</p>
                <p className="text-2xl font-bold text-yellow-500">{marketState.volatility}%</p>
              </div>
              <div className="text-center">
                <p className="text-white/60 text-sm">Peak Risk</p>
                <p className={`text-2xl font-bold ${marketState.bullMarketPeakSignals.peakRisk === 'high' || marketState.bullMarketPeakSignals.peakRisk === 'extreme' ? 'text-red-400' : 'text-yellow-500'}`}>
                  {marketState.bullMarketPeakSignals.peakRisk.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* AI Predictions */}
        <div className="space-y-6">
          {predictions.map((prediction) => (
            <div key={prediction.timeframe} className="bg-black border border-yellow-500/20 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-yellow-500 capitalize">{prediction.timeframe} Predictions</h3>
                <span className={`px-3 py-1 rounded text-sm font-bold ${
                  prediction.marketSentiment === 'bullish' ? 'bg-green-500/20 text-green-400' :
                  prediction.marketSentiment === 'bearish' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {prediction.marketSentiment.toUpperCase()}
                </span>
              </div>

              {/* Bitcoin Prediction */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-white mb-2">Bitcoin (BTC)</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Predicted Price</p>
                    <p className="text-xl font-bold text-yellow-500">${prediction.btcPrediction.price.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Expected Change</p>
                    <p className={`text-xl font-bold ${prediction.btcPrediction.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {prediction.btcPrediction.change >= 0 ? '+' : ''}{prediction.btcPrediction.change.toFixed(2)}%
                    </p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Confidence</p>
                    <p className="text-xl font-bold text-yellow-500">{prediction.btcPrediction.confidence}%</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">AI Reasoning</p>
                    <p className="text-sm text-white/80 line-clamp-2">{prediction.btcPrediction.reasoning}</p>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div>
                <h4 className="text-lg font-bold text-white mb-3">Assets Predicted to Outperform Bitcoin</h4>
                <div className="space-y-3">
                  {prediction.topPerformers.map((performer, index) => (
                    <div key={index} className="bg-black/50 border border-yellow-500/10 p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white">{performer.asset}</span>
                            <span className="text-white/60">({performer.symbol})</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              performer.type === 'crypto' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'
                            }`}>
                              {performer.type.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-white/80 mb-2">{performer.reasoning}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/60 text-sm">Outperformance</p>
                          <p className="text-lg font-bold text-green-400">
                            +{performer.predictedOutperformance.toFixed(2)}%
                          </p>
                          <p className="text-sm text-white/60">{performer.confidence}% confidence</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Events & Risk Factors */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div>
                  <h5 className="text-white font-bold mb-2">Key Events</h5>
                  <ul className="space-y-1">
                    {prediction.keyEvents.map((event, index) => (
                      <li key={index} className="text-sm text-white/80 flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">•</span>
                        <span>{event}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2">Risk Factors</h5>
                  <ul className="space-y-1">
                    {prediction.riskFactors.map((risk, index) => (
                      <li key={index} className="text-sm text-white/80 flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-black/50 border border-yellow-500/10">
          <p className="text-xs text-white/60 text-center">
            AI predictions are based on real-time market data and Grok 4 analysis. Past performance does not guarantee future results. 
            Always conduct your own research and consider your risk tolerance before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
}
