import { NextRequest, NextResponse } from 'next/server';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export async function GET(_request: NextRequest) {
  try {
    const newsItems: NewsItem[] = [];

    // Fetch news from CoinGecko
    try {
      const coingeckoResponse = await fetch('https://api.coingecko.com/api/v3/news');
      if (coingeckoResponse.ok) {
        const coingeckoData = await coingeckoResponse.json();
        if (coingeckoData.data && Array.isArray(coingeckoData.data)) {
          coingeckoData.data.slice(0, 5).forEach((item: any) => {
            newsItems.push({
              title: item.title || '',
              description: item.description || '',
              url: item.url || '',
              source: 'CoinGecko',
              publishedAt: new Date(item.published_at * 1000).toISOString(),
              sentiment: 'neutral'
            });
          });
        }
      }
    } catch {
      // Ignore CoinGecko errors
    }

    // Fetch news from CryptoPanic (if API key available)
    const CRYPTOPANIC_API_KEY = process.env.CRYPTOPANIC_API_KEY;
    if (CRYPTOPANIC_API_KEY) {
      try {
        const cryptoPanicResponse = await fetch(`https://cryptopanic.com/api/v1/posts/?auth_token=${CRYPTOPANIC_API_KEY}&currencies=BTC,ETH&filter=hot`);
        if (cryptoPanicResponse.ok) {
          const cryptoPanicData = await cryptoPanicResponse.json();
          if (cryptoPanicData.results && Array.isArray(cryptoPanicData.results)) {
            cryptoPanicData.results.slice(0, 3).forEach((item: any) => {
              newsItems.push({
                title: item.title || '',
                description: item.metadata?.description || '',
                url: item.url || '',
                source: 'CryptoPanic',
                publishedAt: item.published_at || new Date().toISOString(),
                sentiment: item.votes?.positive > item.votes?.negative ? 'positive' : 
                          item.votes?.negative > item.votes?.positive ? 'negative' : 'neutral'
              });
            });
          }
        }
      } catch {
        // Ignore CryptoPanic errors
      }
    }

    // Fetch Bitcoin-specific news from web search (simulated)
    try {
      const webSearchResponse = await fetch('https://api.duckduckgo.com/?q=bitcoin+crypto+news+latest&format=json&no_redirect=1&no_html=1');
      if (webSearchResponse.ok) {
        const webSearchData = await webSearchResponse.json();
        if (webSearchData.AbstractText) {
          newsItems.push({
            title: webSearchData.Heading || 'Bitcoin News',
            description: webSearchData.AbstractText,
            url: webSearchData.AbstractURL || '',
            source: 'Web Search',
            publishedAt: new Date().toISOString(),
            sentiment: 'neutral'
          });
        }
      }
    } catch {
      // Ignore web search errors
    }

    // Sort by published date (newest first)
    newsItems.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    return NextResponse.json({
      success: true,
      data: newsItems.slice(0, 10), // Return top 10 news items
      timestamp: new Date().toISOString()
    });

  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch news data',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 