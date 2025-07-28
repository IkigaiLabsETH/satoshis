"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image?: string;
}



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
  totalMarketCap: number;
  totalVolume24h: number;
  fearGreedIndex: number;
  dominance: {
    bitcoin: number;
    ethereum: number;
    others: number;
  };
  volatility: number;
  trend: 'up' | 'down' | 'sideways';
}



export default function MarketDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('day');
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [predictions, setPredictions] = useState<MarketPrediction[]>([]);
  const [marketState, setMarketState] = useState<MarketState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Fetch data from APIs
  const fetchData = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    try {
      // Fetch crypto data
      const cryptoResponse = await fetch('/api/watchlist/crypto?period=daily');
      const cryptoResult = await cryptoResponse.json();
      
      if (cryptoResult.success) {
        setCryptoData(cryptoResult.data);
      } else {
        throw new Error('Failed to fetch crypto data');
      }

      // Fetch market predictions
      const predictionsResponse = await fetch('/api/watchlist/predictions');
      const predictionsResult = await predictionsResponse.json();
      
      if (predictionsResult.success) {
        setPredictions(predictionsResult.data);
      } else {
        throw new Error('Failed to fetch predictions');
      }

      // Fetch market state
      const marketStateResponse = await fetch('/api/watchlist/market-state');
      const marketStateResult = await marketStateResponse.json();
      
      if (marketStateResult.success) {
        setMarketState(marketStateResult.data);
      } else {
        throw new Error('Failed to fetch market state');
      }

      setLastUpdated(new Date());

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Error handling for data fetching
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    if (price >= 1) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) {
      return `$${(marketCap / 1e12).toFixed(2)}T`;
    } else if (marketCap >= 1e9) {
      return `$${(marketCap / 1e9).toFixed(2)}B`;
    } else if (marketCap >= 1e6) {
      return `$${(marketCap / 1e6).toFixed(2)}M`;
    } else {
      return `$${marketCap.toLocaleString()}`;
    }
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return 'text-green-400';
      case 'bearish': return 'text-red-400';
      default: return 'text-yellow-400';
    }
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'bullish': return '📈';
      case 'bearish': return '📉';
      default: return '➡️';
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white font-satoshi flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-xl text-yellow-500">Analyzing market data with Grok 4 AI...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white font-satoshi flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-4">Error: {error}</p>
          <Button 
            onClick={() => window.location.reload()} 
            className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-none hover:bg-yellow-400 transition-all duration-300"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const currentPrediction = predictions.find(p => p.timeframe === selectedTimeframe) || predictions[0];

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">AI-Powered Market Analysis • Grok 4 Predictions • Real-Time Insights</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                North Star
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">Your Daily Market Compass • AI-Powered Predictions</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
            
            {/* Quick Summary */}
            <div className="bg-black/20 p-6 rounded-none border border-yellow-500/30 mt-8">
              <div className="grid md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-yellow-500 font-bold text-lg">📊 Market State</p>
                  <p className="text-white/70 text-sm">Current overview</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-bold text-lg">₿ Bitcoin</p>
                  <p className="text-white/70 text-sm">Price predictions</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-bold text-lg">🚀 Altcoins</p>
                  <p className="text-white/70 text-sm">Outperformance picks</p>
                </div>
                <div>
                  <p className="text-yellow-500 font-bold text-lg">📈 Stocks</p>
                  <p className="text-white/70 text-sm">Crypto-related picks</p>
                </div>
              </div>
            </div>

            {/* Refresh Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                onClick={() => fetchData(true)}
                disabled={refreshing}
                className="bg-yellow-500 text-black font-bold px-6 py-3 rounded-none hover:bg-yellow-400 transition-all duration-300 disabled:opacity-50"
              >
                {refreshing ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                    Refreshing...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh Data
                  </div>
                )}
              </Button>
              {lastUpdated && (
                <p className="text-white/60 text-sm">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          {/* Today's Market Overview */}
          {marketState && (
            <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
                📊 Today&apos;s Market Overview
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">Total Market Cap</p>
                  <p className="text-3xl font-bold text-yellow-500">{formatMarketCap(marketState.totalMarketCap)}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">24h Volume</p>
                  <p className="text-3xl font-bold text-yellow-500">{formatMarketCap(marketState.totalVolume24h)}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">Fear & Greed Index</p>
                  <p className={`text-3xl font-bold ${getFearGreedColor(marketState.fearGreedIndex)}`}>
                    {marketState.fearGreedIndex}
                  </p>
                  <p className={`text-sm ${getFearGreedColor(marketState.fearGreedIndex)}`}>
                    {getFearGreedLabel(marketState.fearGreedIndex)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-sm mb-2">Market Trend</p>
                  <p className={`text-3xl font-bold ${marketState.trend === 'up' ? 'text-green-400' : marketState.trend === 'down' ? 'text-red-400' : 'text-yellow-400'}`}>
                    {marketState.trend === 'up' ? '📈' : marketState.trend === 'down' ? '📉' : '➡️'}
                  </p>
                  <p className="text-sm text-white/60 capitalize">{marketState.trend}</p>
                </div>
              </div>
              
              {/* Market Dominance */}
              <div className="mt-8">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Market Dominance</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black p-4 rounded-none border border-yellow-500/20">
                    <p className="text-white/60 text-sm">Bitcoin</p>
                    <p className="text-2xl font-bold text-yellow-500">{marketState.dominance.bitcoin.toFixed(1)}%</p>
                  </div>
                  <div className="bg-black p-4 rounded-none border border-yellow-500/20">
                    <p className="text-white/60 text-sm">Ethereum</p>
                    <p className="text-2xl font-bold text-yellow-500">{marketState.dominance.ethereum.toFixed(1)}%</p>
                  </div>
                  <div className="bg-black p-4 rounded-none border border-yellow-500/20">
                    <p className="text-white/60 text-sm">Others (XRP, USDT, BNB, SOL, etc.)</p>
                    <p className="text-2xl font-bold text-yellow-500">{marketState.dominance.others.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Performance Summary */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Performance Summary
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-black p-6 rounded-none border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Top Performer (24h)</p>
                {cryptoData.length > 0 && (() => {
                  const topPerformer = cryptoData.reduce((prev, current) => 
                    prev.price_change_percentage_24h > current.price_change_percentage_24h ? prev : current
                  );
                  return (
                    <div>
                      <p className="text-xl font-bold text-green-400">{topPerformer.symbol.toUpperCase()}</p>
                      <p className="text-lg text-green-400">+{topPerformer.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-black p-6 rounded-none border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Worst Performer (24h)</p>
                {cryptoData.length > 0 && (() => {
                  const worstPerformer = cryptoData.reduce((prev, current) => 
                    prev.price_change_percentage_24h < current.price_change_percentage_24h ? prev : current
                  );
                  return (
                    <div>
                      <p className="text-xl font-bold text-red-400">{worstPerformer.symbol.toUpperCase()}</p>
                      <p className="text-lg text-red-400">{worstPerformer.price_change_percentage_24h.toFixed(2)}%</p>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-black p-6 rounded-none border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Average Change (24h)</p>
                {cryptoData.length > 0 && (() => {
                  const avgChange = cryptoData.reduce((sum, crypto) => sum + crypto.price_change_percentage_24h, 0) / cryptoData.length;
                  return (
                    <div>
                      <p className={`text-xl font-bold ${getChangeColor(avgChange)}`}>
                        {avgChange > 0 ? '+' : ''}{avgChange.toFixed(2)}%
                      </p>
                      <p className="text-sm text-white/60">Across {cryptoData.length} assets</p>
                    </div>
                  );
                })()}
              </div>
              <div className="bg-black p-6 rounded-none border border-yellow-500/20">
                <p className="text-white/60 text-sm mb-2">Market Momentum</p>
                {cryptoData.length > 0 && (() => {
                  const positiveCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h > 0).length;
                  const negativeCount = cryptoData.filter(crypto => crypto.price_change_percentage_24h < 0).length;
                  const momentum = positiveCount > negativeCount ? 'Bullish' : negativeCount > positiveCount ? 'Bearish' : 'Neutral';
                  const color = momentum === 'Bullish' ? 'text-green-400' : momentum === 'Bearish' ? 'text-red-400' : 'text-yellow-400';
                  return (
                    <div>
                      <p className={`text-xl font-bold ${color}`}>{momentum}</p>
                      <p className="text-sm text-white/60">{positiveCount} up, {negativeCount} down</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* AI Predictions */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🎯 AI Predictions: Bitcoin, Altcoins & Stocks
            </h3>
            
            {/* Timeframe Selector */}
            <div className="flex justify-center space-x-4 mb-8">
              {['day', 'week', 'month', 'year'].map((timeframe) => (
                <Button
                  key={timeframe}
                  onClick={() => setSelectedTimeframe(timeframe)}
                  className={`px-6 py-3 rounded-none font-bold transition-all duration-300 ${
                    selectedTimeframe === timeframe
                      ? 'bg-yellow-500 text-black shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]'
                      : 'bg-transparent text-white border-2 border-yellow-500 hover:bg-yellow-500 hover:text-black'
                  }`}
                >
                  {timeframe === 'day' ? '📅 Next Day' : 
                   timeframe === 'week' ? '📊 Next Week' : 
                   timeframe === 'month' ? '📈 Next Month' : 
                   '🎯 Next Year'}
                </Button>
              ))}
            </div>

            {currentPrediction && (
              <div className="space-y-8">
                {/* Bitcoin Prediction */}
                <div className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">₿ Bitcoin Prediction</h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-2">Predicted Price</p>
                      <p className="text-3xl font-bold text-yellow-500">
                        {formatPrice(currentPrediction.btcPrediction.price)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-2">Expected Change</p>
                      <p className={`text-3xl font-bold ${getChangeColor(currentPrediction.btcPrediction.change)}`}>
                        {currentPrediction.btcPrediction.change > 0 ? '+' : ''}{currentPrediction.btcPrediction.change.toFixed(2)}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-white/60 text-sm mb-2">Confidence</p>
                      <p className={`text-3xl font-bold ${getConfidenceColor(currentPrediction.btcPrediction.confidence)}`}>
                        {currentPrediction.btcPrediction.confidence}%
                      </p>
                    </div>
                  </div>
                  <p className="text-white/80 mt-4 text-center">{currentPrediction.btcPrediction.reasoning}</p>
                </div>

                {/* Top Performers Prediction */}
                <div>
                  <h4 className="text-xl font-bold text-yellow-500 mb-4">🚀 Assets Predicted to Outperform Bitcoin</h4>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentPrediction.topPerformers.map((performer, index) => (
                      <Card key={index} className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="font-epilogue text-xl text-yellow-400">{performer.asset}</CardTitle>
                            <span className={`text-sm font-bold ${getConfidenceColor(performer.confidence)}`}>
                              {performer.confidence}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-white/60 font-satoshi text-sm">{performer.symbol}</p>
                            <span className={`text-xs px-2 py-1 rounded ${
                              performer.type === 'stock' 
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                                : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            }`}>
                              {performer.type === 'stock' ? 'STOCK' : 'CRYPTO'}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-2xl font-bold mb-2 ${getChangeColor(performer.predictedOutperformance)}`}>
                            {performer.predictedOutperformance > 0 ? '+' : ''}{performer.predictedOutperformance.toFixed(2)}% vs BTC
                          </p>
                          <p className="text-white/80 font-satoshi text-sm">{performer.reasoning}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Market Sentiment & Events */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                    <h4 className="text-xl font-bold text-yellow-500 mb-4">📊 Market Sentiment</h4>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{getSentimentIcon(currentPrediction.marketSentiment)}</span>
                      <span className={`text-2xl font-bold ${getSentimentColor(currentPrediction.marketSentiment)}`}>
                        {currentPrediction.marketSentiment.charAt(0).toUpperCase() + currentPrediction.marketSentiment.slice(1)}
                      </span>
                    </div>
                    <p className="text-white/80">AI analysis indicates {currentPrediction.marketSentiment} market conditions for the next {selectedTimeframe}.</p>
                  </div>

                  <div className="bg-black p-6 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
                    <h4 className="text-xl font-bold text-yellow-500 mb-4">📅 Key Events to Watch</h4>
                    <ul className="space-y-2">
                      {currentPrediction.keyEvents.map((event, index) => (
                        <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Risk Factors */}
                <div className="bg-black p-6 rounded-none border-2 border-red-500 shadow-[5px_5px_0px_0px_rgba(239,68,68,1)]">
                  <h4 className="text-xl font-bold text-red-400 mb-4">⚠️ Risk Factors</h4>
                  <ul className="space-y-2">
                    {currentPrediction.riskFactors.map((risk, index) => (
                      <li key={index} className="text-white/80 text-sm flex items-start gap-2">
                        <span className="text-red-400 mt-1">⚠️</span>
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>



          {/* Live Market Data */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              📈 Live Market Data
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-yellow-500/30">
                    <th className="py-4 px-4 text-yellow-400 font-bold">Asset</th>
                    <th className="py-4 px-4 text-yellow-400 font-bold">Price</th>
                    <th className="py-4 px-4 text-yellow-400 font-bold">24h Change</th>
                    <th className="py-4 px-4 text-yellow-400 font-bold">Market Cap</th>
                    <th className="py-4 px-4 text-yellow-400 font-bold">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoData.map((crypto, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          {crypto.image && (
                            <Image 
                              src={crypto.image} 
                              alt={crypto.id} 
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          )}
                          <div>
                            <p className="font-bold text-white">{crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1)}</p>
                            <p className="text-white/60 text-sm">{crypto.symbol.toUpperCase()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-bold text-white">
                        {formatPrice(crypto.current_price)}
                      </td>
                      <td className={`py-4 px-4 font-bold ${getChangeColor(crypto.price_change_percentage_24h)}`}>
                        {crypto.price_change_percentage_24h > 0 ? '+' : ''}{crypto.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="py-4 px-4 text-white/80">
                        {formatMarketCap(crypto.market_cap)}
                      </td>
                      <td className="py-4 px-4 text-white/80">
                        {formatMarketCap(crypto.total_volume)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>



          {/* Disclaimer */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              Important Notice
            </h3>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                This dashboard features AI-generated market predictions powered by Grok 4 analysis. All predictions are based on historical data, technical analysis, and market sentiment analysis.
              </p>
              <div className="mt-6">
                <h4 className="text-xl font-bold text-yellow-500 mb-4">Risk Disclosure:</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>AI predictions are for informational purposes only</li>
                  <li>Past performance does not guarantee future results</li>
                  <li>Cryptocurrency markets are highly volatile and unpredictable</li>
                  <li>Always conduct your own research before making investment decisions</li>
                  <li>Consider consulting with a financial advisor</li>
                  <li>Never invest more than you can afford to lose</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
