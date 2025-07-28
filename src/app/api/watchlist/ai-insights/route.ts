import { NextRequest, NextResponse } from 'next/server';

interface CryptoData {
  id: string;
  symbol: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  image?: string;
}

interface StockData {
  symbol: string;
  current_price: number;
  change_percent: number;
  high: number;
  low: number;
  volume: number;
}

interface AIInsight {
  asset: string;
  symbol: string;
  confidence: number;
  reasoning: string;
  price_target?: number;
  timeframe: string;
}

// Simulated Grok 4 AI analysis function
const generateAIInsights = (period: string, cryptoData: CryptoData[], stockData: StockData[]): AIInsight[] => {
  const btc = cryptoData.find(c => c.id === 'bitcoin');
  const btcPriceChange = btc?.price_change_percentage_24h || 0;
  const outperformers = cryptoData.filter(c => c.price_change_percentage_24h > btcPriceChange);

  const insights: AIInsight[] = [];

  // Generate insights based on period
  if (period === 'daily') {
    // Daily insights focus on short-term momentum
    outperformers.slice(0, 3).forEach(crypto => {
      insights.push({
        asset: crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1),
        symbol: crypto.symbol.toUpperCase(),
        confidence: Math.floor(Math.random() * 30) + 70, // 70-100%
        reasoning: `Strong 24h momentum with ${crypto.price_change_percentage_24h.toFixed(2)}% gain vs Bitcoin's ${btcPriceChange.toFixed(2)}%. Technical indicators show bullish continuation pattern.`,
        price_target: crypto.current_price * (1 + (crypto.price_change_percentage_24h / 100) * 1.5),
        timeframe: '24-48 hours'
      });
    });

    // Add stock insights
    stockData.slice(0, 2).forEach(stock => {
      if (stock.change_percent > btcPriceChange) {
        insights.push({
          asset: stock.symbol,
          symbol: stock.symbol,
          confidence: Math.floor(Math.random() * 20) + 75, // 75-95%
          reasoning: `Crypto-related stock showing strong correlation with Bitcoin ETF inflows. Volume spike indicates institutional interest.`,
          price_target: stock.current_price * (1 + (stock.change_percent / 100) * 1.2),
          timeframe: '1-2 weeks'
        });
      }
    });
  } else if (period === 'weekly') {
    // Weekly insights focus on fundamental trends
    const topPerformers = cryptoData
      .filter(c => c.market_cap > 10000000000) // >$10B market cap
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 3);

    topPerformers.forEach(crypto => {
      insights.push({
        asset: crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1),
        symbol: crypto.symbol.toUpperCase(),
        confidence: Math.floor(Math.random() * 25) + 65, // 65-90%
        reasoning: `Strong fundamentals with growing DeFi/NFT ecosystem. Market cap growth indicates sustainable momentum beyond short-term speculation.`,
        price_target: crypto.current_price * (1 + (crypto.price_change_percentage_24h / 100) * 2),
        timeframe: '1-2 weeks'
      });
    });
  } else if (period === 'monthly') {
    // Monthly insights focus on long-term potential
    const largeCaps = cryptoData
      .filter(c => c.market_cap > 50000000000) // >$50B market cap
      .slice(0, 3);

    largeCaps.forEach(crypto => {
      insights.push({
        asset: crypto.id.charAt(0).toUpperCase() + crypto.id.slice(1),
        symbol: crypto.symbol.toUpperCase(),
        confidence: Math.floor(Math.random() * 20) + 60, // 60-80%
        reasoning: `Institutional adoption accelerating with ETF developments and regulatory clarity. Long-term growth potential based on network effects and developer activity.`,
        price_target: crypto.current_price * (1 + (crypto.price_change_percentage_24h / 100) * 3),
        timeframe: '1-3 months'
      });
    });
  }

  return insights;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'daily';

    // Fetch crypto and stock data to generate insights
    const cryptoResponse = await fetch(`${request.nextUrl.origin}/api/watchlist/crypto?period=${period}`);
    const stockResponse = await fetch(`${request.nextUrl.origin}/api/watchlist/stocks?period=${period}`);

    const cryptoData = await cryptoResponse.json();
    const stockData = await stockResponse.json();

    if (!cryptoData.success || !stockData.success) {
      throw new Error('Failed to fetch market data for AI analysis');
    }

    // Generate AI insights
    const insights = generateAIInsights(period, cryptoData.data, stockData.data);

    return NextResponse.json({
      success: true,
      data: insights,
      period: period,
      timestamp: new Date().toISOString(),
      note: 'AI insights generated using simulated Grok 4 analysis'
    });

  } catch {
    // Error handling for AI insights generation
    
    // Return mock insights if analysis fails
    const mockInsights: AIInsight[] = [
      {
        asset: 'Ethereum',
        symbol: 'ETH',
        confidence: 85,
        reasoning: 'Strong DeFi ecosystem growth and upcoming protocol upgrades driving institutional interest.',
        price_target: 4200,
        timeframe: '1-2 weeks'
      },
      {
        asset: 'Solana',
        symbol: 'SOL',
        confidence: 78,
        reasoning: 'High throughput and low fees attracting developers. NFT marketplace growth showing strong momentum.',
        price_target: 220,
        timeframe: '1-2 weeks'
      },
      {
        asset: 'COIN',
        symbol: 'COIN',
        confidence: 82,
        reasoning: 'Bitcoin ETF inflows driving exchange volume. Regulatory clarity improving market sentiment.',
        price_target: 280,
        timeframe: '1-2 weeks'
      }
    ];

    return NextResponse.json({
      success: true,
      data: mockInsights,
      period: 'daily',
      timestamp: new Date().toISOString(),
      note: 'Using mock AI insights due to analysis error'
    });
  }
} 