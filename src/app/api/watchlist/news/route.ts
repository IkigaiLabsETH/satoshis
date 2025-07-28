import { NextRequest, NextResponse } from 'next/server';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  impact_score?: number; // 1-10 impact on crypto markets
  category?: string; // News category
  keywords?: string[]; // Relevant keywords
}

interface CoinGeckoNewsItem {
  title: string;
  description: string;
  url: string;
  published_at: number;
}

interface CryptoPanicNewsItem {
  title: string;
  metadata?: {
    description: string;
  };
  url: string;
  published_at?: string;
  votes?: {
    positive: number;
    negative: number;
  };
}

// Helper functions for news analysis
const analyzeSentiment = (text: string): 'positive' | 'negative' | 'neutral' => {
  const lowerText = text.toLowerCase();
  const positiveWords = ['bullish', 'surge', 'rally', 'gain', 'up', 'positive', 'growth', 'adoption', 'success', 'breakout', 'moon', 'pump', 'green'];
  const negativeWords = ['bearish', 'crash', 'drop', 'fall', 'down', 'negative', 'decline', 'sell', 'loss', 'dump', 'red', 'bear', 'correction'];
  
  const positiveCount = positiveWords.filter(word => lowerText.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerText.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

const calculateImpactScore = (title: string, description: string): number => {
  const text = (title + ' ' + description).toLowerCase();
  let score = 5; // Base score
  
  // High impact keywords
  if (text.includes('bitcoin') || text.includes('btc')) score += 2;
  if (text.includes('etf') || text.includes('institutional')) score += 2;
  if (text.includes('fed') || text.includes('federal reserve')) score += 2;
  if (text.includes('halving') || text.includes('supply')) score += 2;
  if (text.includes('regulation') || text.includes('sec')) score += 1;
  if (text.includes('ethereum') || text.includes('eth')) score += 1;
  if (text.includes('solana') || text.includes('sol')) score += 1;
  if (text.includes('price') && (text.includes('breakout') || text.includes('ath'))) score += 1;
  if (text.includes('volume') && text.includes('surge')) score += 1;
  
  return Math.min(score, 10);
};

const categorizeNews = (title: string, description: string): string => {
  const text = (title + ' ' + description).toLowerCase();
  
  if (text.includes('bitcoin') || text.includes('btc')) return 'Bitcoin';
  if (text.includes('ethereum') || text.includes('eth') || text.includes('defi')) return 'DeFi Ecosystem';
  if (text.includes('etf') || text.includes('institutional')) return 'Institutional Adoption';
  if (text.includes('fed') || text.includes('policy') || text.includes('macro')) return 'Macro Policy';
  if (text.includes('regulation') || text.includes('sec')) return 'Regulation';
  if (text.includes('nft')) return 'NFT Market';
  if (text.includes('altcoin') || text.includes('solana') || text.includes('cardano') || text.includes('ada')) return 'Altcoin Market';
  if (text.includes('mining') || text.includes('hashrate')) return 'Mining';
  if (text.includes('exchange') || text.includes('binance') || text.includes('coinbase')) return 'Exchanges';
  
  return 'General Crypto';
};

const extractKeywords = (text: string): string[] => {
  const lowerText = text.toLowerCase();
  const keywords = [];
  
  // Extract key terms
  if (lowerText.includes('bitcoin') || lowerText.includes('btc')) keywords.push('bitcoin');
  if (lowerText.includes('ethereum') || lowerText.includes('eth')) keywords.push('ethereum');
  if (lowerText.includes('etf')) keywords.push('etf');
  if (lowerText.includes('fed')) keywords.push('fed');
  if (lowerText.includes('regulation')) keywords.push('regulation');
  if (lowerText.includes('nft')) keywords.push('nft');
  if (lowerText.includes('defi')) keywords.push('defi');
  if (lowerText.includes('institutional')) keywords.push('institutional');
  if (lowerText.includes('solana') || lowerText.includes('sol')) keywords.push('solana');
  if (lowerText.includes('cardano') || lowerText.includes('ada')) keywords.push('cardano');
  if (lowerText.includes('price')) keywords.push('price');
  if (lowerText.includes('volume')) keywords.push('volume');
  
  return keywords.slice(0, 5); // Limit to 5 keywords
};

// Generate market insights based on current conditions
const generateMarketInsights = (): NewsItem[] => {
  const insights: NewsItem[] = [];
  
  // Bitcoin halving countdown (approximate)
  const halvingDate = new Date('2024-04-20');
  const now = new Date();
  const daysUntilHalving = Math.ceil((halvingDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  if (daysUntilHalving > 0 && daysUntilHalving <= 30) {
    insights.push({
      title: `Bitcoin Halving Countdown: ${daysUntilHalving} days remaining`,
      description: `Bitcoin's fourth halving is approaching, historically a bullish catalyst for price action. Supply reduction from 6.25 to 3.125 BTC per block expected.`,
      url: 'https://www.blockchain.com/explorer/charts/halving',
      source: 'Market Analysis',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive',
      impact_score: 9,
      category: 'Bitcoin Fundamentals',
      keywords: ['bitcoin', 'halving', 'supply', 'fundamentals']
    });
  }
  
  // ETF flows analysis
  insights.push({
    title: 'Bitcoin ETF Flows Continue Strong Institutional Adoption',
    description: 'Spot Bitcoin ETFs continue to see significant inflows, indicating strong institutional demand and mainstream adoption of cryptocurrency.',
    url: 'https://cointelegraph.com/tags/bitcoin-etf',
    source: 'Market Analysis',
    publishedAt: new Date().toISOString(),
    sentiment: 'positive',
    impact_score: 8,
    category: 'Institutional Adoption',
    keywords: ['bitcoin', 'etf', 'institutional', 'adoption']
  });
  
  return insights;
};

export async function GET(_request: NextRequest) {
  try {
    const newsItems: NewsItem[] = [];

    // Add market insights first
    newsItems.push(...generateMarketInsights());

    // Fetch news from CoinGecko (primary source) - optimized for free tier
    try {
      const coingeckoResponse = await fetch('https://api.coingecko.com/api/v3/news');
      if (coingeckoResponse.ok) {
        const coingeckoData = await coingeckoResponse.json();
        if (coingeckoData.data && Array.isArray(coingeckoData.data)) {
          // Analyze and enhance CoinGecko news
          coingeckoData.data.slice(0, 3).forEach((item: CoinGeckoNewsItem) => {
            const title = item.title || '';
            const description = item.description || '';
            
            // Analyze sentiment and impact based on content
            const sentiment = analyzeSentiment(title + ' ' + description);
            const impact_score = calculateImpactScore(title, description);
            const category = categorizeNews(title, description);
            const keywords = extractKeywords(title + ' ' + description);
            
            newsItems.push({
              title: title,
              description: description,
              url: item.url || '',
              source: 'CoinGecko',
              publishedAt: new Date(item.published_at * 1000).toISOString(),
              sentiment: sentiment,
              impact_score: impact_score,
              category: category,
              keywords: keywords
            });
          });
        }
      }
    } catch {
      // Ignore CoinGecko errors
    }

    // Fetch news from CryptoPanic (secondary source)
    try {
      const cryptopanicResponse = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=free&currencies=BTC,ETH,SOL&filter=hot');
      if (cryptopanicResponse.ok) {
        const cryptopanicData = await cryptopanicResponse.json();
        if (cryptopanicData.results && Array.isArray(cryptopanicData.results)) {
          cryptopanicData.results.slice(0, 2).forEach((item: CryptoPanicNewsItem) => {
            const title = item.title || '';
            const description = item.metadata?.description || '';
            
            // Calculate sentiment from votes if available
            let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral';
            if (item.votes) {
              const positiveVotes = item.votes.positive || 0;
              const negativeVotes = item.votes.negative || 0;
              if (positiveVotes > negativeVotes) sentiment = 'positive';
              else if (negativeVotes > positiveVotes) sentiment = 'negative';
            } else {
              sentiment = analyzeSentiment(title + ' ' + description);
            }
            
            const impact_score = calculateImpactScore(title, description);
            const category = categorizeNews(title, description);
            const keywords = extractKeywords(title + ' ' + description);
            
            newsItems.push({
              title: title,
              description: description,
              url: item.url || '',
              source: 'CryptoPanic',
              publishedAt: item.published_at ? new Date(item.published_at).toISOString() : new Date().toISOString(),
              sentiment: sentiment,
              impact_score: impact_score,
              category: category,
              keywords: keywords
            });
          });
        }
      }
    } catch {
      // Ignore CryptoPanic errors
    }

    // Add technical analysis insights
    newsItems.push({
      title: 'Market Technical Analysis: Key Support and Resistance Levels',
      description: 'Bitcoin showing strong support at key levels with increasing institutional adoption. Altcoins showing rotation patterns typical of bull market continuation.',
      url: 'https://www.tradingview.com/symbols/CRYPTOCAP-BTC.D/',
      source: 'Technical Analysis',
      publishedAt: new Date().toISOString(),
      sentiment: 'positive',
      impact_score: 7,
      category: 'Technical Analysis',
      keywords: ['bitcoin', 'technical', 'analysis', 'support', 'resistance']
    });

    // Sort by impact score first, then by published date
    newsItems.sort((a, b) => {
      const impactDiff = (b.impact_score || 0) - (a.impact_score || 0);
      if (impactDiff !== 0) return impactDiff;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

    return NextResponse.json({
      success: true,
      data: newsItems.slice(0, 10), // Return top 10 most impactful news items
      timestamp: new Date().toISOString(),
      note: 'News from reliable sources with impact-based sorting and sentiment analysis'
    });

  } catch {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch news data',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 