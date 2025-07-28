import { CryptoData, StockData, NewsData, GlobalMarketData } from '@/types/watchlist';
import { watchlistConfig } from '@/config/watchlist';

interface CoinGeckoCoin {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number | null;
  price_change_percentage_7d: number | null;
  price_change_percentage_30d: number | null;
  high_24h: number | null;
  low_24h: number | null;
  circulating_supply: number | null;
  total_supply: number | null;
  max_supply: number | null;
  ath: number | null;
  ath_change_percentage: number | null;
  atl: number | null;
  atl_change_percentage: number | null;
  image: string | null;
}

interface CoinGeckoNewsItem {
  title: string;
  description: string;
  url: string;
  published_at: string;
  source: string;
}

interface CryptoPanicNewsItem {
  title: string;
  published_at: string;
  url: string;
  source: string;
  votes: {
    positive: number;
    negative: number;
  };
}

interface RawNewsItem {
  title: string;
  description?: string;
  url: string;
  source: string;
  publishedAt: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}

interface EnhancedStockData extends StockData {
  current_price: number;
  change_percent: number;
  high: number;
  low: number;
  volume: number;
  volume_ratio?: number;
  price_range?: number;
  volatility?: number;
  momentum_score?: number;
  sector?: string;
}

export class MarketDataService {
  static async getBitcoinData(): Promise<{ price: number; change24h: number }> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
      const data = await response.json();
      return {
        price: data.bitcoin.usd,
        change24h: data.bitcoin.usd_24h_change
      };
    } catch {
      return { price: 0, change24h: 0 };
    }
  }

  static async getCryptoData(): Promise<CryptoData[]> {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${watchlistConfig.cryptoIds.join(',')}&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data: CoinGeckoCoin[] = await response.json();
      
      return data.map((coin) => ({
        id: coin.id,
        symbol: coin.symbol,
        name: coin.name,
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        total_volume: coin.total_volume,
        price_change_percentage_24h: coin.price_change_percentage_24h || 0,
        image: coin.image || undefined
      }));
    } catch {
      return [];
    }
  }

  static async getStockData(): Promise<EnhancedStockData[]> {
    try {
      const finnhubApiKey = process.env.FINNHUB_API_KEY;
      
      if (!finnhubApiKey) {
        throw new Error('FINNHUB_API_KEY not configured');
      }

      const stockData: EnhancedStockData[] = [];
      let totalVolume = 0;
      let volumeCount = 0;
      
      // First pass: collect basic data and calculate average volume
      for (const symbol of watchlistConfig.stockSymbols) {
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
          );

          if (response.ok) {
            const data = await response.json();
            if (data.c && data.v) {
              totalVolume += data.v;
              volumeCount++;
            }
          }
          
          // Rate limiting for free tier
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch {
          // Error fetching data for symbol
        }
      }
      
      const averageVolume = volumeCount > 0 ? totalVolume / volumeCount : 0;
      
      // Second pass: add enhanced calculations
      for (const symbol of watchlistConfig.stockSymbols) {
        try {
          const response = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${finnhubApiKey}`
          );

          if (response.ok) {
            const data = await response.json();
            
            // Calculate enhanced metrics
            const volumeRatio = averageVolume > 0 ? data.v / averageVolume : 1;
            const priceRange = data.h - data.l;
            const volatility = data.c > 0 ? (priceRange / data.c) * 100 : 0;
            const momentumScore = data.dp * volumeRatio;
            const sector = this.getStockSector(symbol);
            
            stockData.push({
              symbol: symbol,
              c: data.c,
              d: data.d,
              dp: data.dp,
              h: data.h,
              l: data.l,
              o: data.o,
              pc: data.pc,
              v: data.v,
              current_price: data.c,
              change_percent: data.dp,
              high: data.h,
              low: data.l,
              volume: data.v,
              volume_ratio: volumeRatio,
              price_range: priceRange,
              volatility: volatility,
              momentum_score: momentumScore,
              sector: sector
            });
          }
          
          // Rate limiting for free tier
          await new Promise(resolve => setTimeout(resolve, 1000));
          
        } catch {
          // Error fetching data for symbol
        }
      }

      return stockData;
    } catch {
      return [];
    }
  }

  static async getGlobalMarketData(): Promise<GlobalMarketData | null> {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/global');
      
      if (!response.ok) {
        throw new Error('Failed to fetch global market data');
      }
      
      return await response.json();
    } catch {
      return null;
    }
  }

  static async getNewsData(): Promise<NewsData[]> {
    try {
      const newsItems: RawNewsItem[] = [];

      // Fetch CoinGecko news
      try {
        const coinGeckoResponse = await fetch('https://api.coingecko.com/api/v3/news?per_page=3');
        if (coinGeckoResponse.ok) {
          const coinGeckoData = await coinGeckoResponse.json();
          coinGeckoData.data?.forEach((item: CoinGeckoNewsItem) => {
            newsItems.push({
              title: item.title,
              description: item.description,
              url: item.url,
              source: item.source,
              publishedAt: item.published_at
            });
          });
        }
      } catch {
        // Ignore CoinGecko failures
      }

      // Fetch CryptoPanic news
      try {
        const cryptoPanicResponse = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=free&currencies=BTC&filter=hot');
        if (cryptoPanicResponse.ok) {
          const cryptoPanicData = await cryptoPanicResponse.json();
          cryptoPanicData.results?.slice(0, 2).forEach((item: CryptoPanicNewsItem) => {
            const sentiment = (item.votes?.positive || 0) > (item.votes?.negative || 0) ? 'positive' : 
                             (item.votes?.negative || 0) > (item.votes?.positive || 0) ? 'negative' : 'neutral';
            
            newsItems.push({
              title: item.title,
              description: '',
              url: item.url,
              source: item.source,
              publishedAt: item.published_at,
              sentiment
            });
          });
        }
      } catch {
        // Ignore CryptoPanic failures
      }

      // Convert to NewsData format
      return newsItems.map(item => ({
        title: item.title,
        description: item.description || '',
        url: item.url,
        source: item.source,
        publishedAt: item.publishedAt,
        sentiment: item.sentiment || 'neutral',
        impact_score: Math.floor(Math.random() * 5) + 5,
        category: 'Market Sentiment',
        keywords: ['Bitcoin', 'crypto', 'market']
      }));
    } catch {
      return this.getFallbackNewsData();
    }
  }

  private static getStockSector(symbol: string): string {
    const sectorMap: { [key: string]: string } = {
      'COIN': 'Crypto Exchange',
      'MSTR': 'Crypto Treasury',
      'HOOD': 'Crypto Exchange',
      'TSLA': 'Crypto Adjacent',
      'NVDA': 'Crypto Adjacent',
      'AMD': 'Crypto Adjacent',
      'IREN': 'Bitcoin Mining',
      'RIOT': 'Bitcoin Mining',
      'MARA': 'Bitcoin Mining',
      'CLSK': 'Bitcoin Mining',
      'HUT': 'Bitcoin Mining',
      'CORZ': 'Bitcoin Mining',
      'CIFR': 'Bitcoin Mining',
      'WULF': 'Bitcoin Mining',
      'SQ': 'Crypto Infrastructure',
      'GLXY': 'Crypto Infrastructure',
      'STRF': 'Crypto Treasury',
      'STRK': 'Crypto Infrastructure',
      'BMNR': 'Bitcoin Mining ETF',
      'CRCL': 'Crypto Infrastructure',
      'SBET': 'Crypto Gaming',
      'SQNS': 'Crypto Infrastructure',
      'MBAV': 'Crypto Infrastructure'
    };
    
    return sectorMap[symbol] || 'Crypto Related';
  }

  private static getFallbackNewsData(): NewsData[] {
    return [
      {
        title: 'Bitcoin Market Analysis',
        description: 'Current market conditions and institutional adoption trends',
        url: 'https://example.com/bitcoin-analysis',
        source: 'Market Analysis',
        publishedAt: new Date().toISOString(),
        sentiment: 'neutral',
        impact_score: 7,
        category: 'Market Sentiment',
        keywords: ['Bitcoin', 'market', 'analysis']
      }
    ];
  }

  static async getAllMarketData() {
    const [bitcoin, crypto, stocks, global, news] = await Promise.allSettled([
      this.getBitcoinData(),
      this.getCryptoData(),
      this.getStockData(),
      this.getGlobalMarketData(),
      this.getNewsData()
    ]);

    return {
      bitcoin: bitcoin.status === 'fulfilled' ? bitcoin.value : { price: 0, change24h: 0 },
      crypto: crypto.status === 'fulfilled' ? crypto.value : [],
      stocks: stocks.status === 'fulfilled' ? stocks.value : [],
      global: global.status === 'fulfilled' ? global.value : null,
      news: news.status === 'fulfilled' ? news.value : []
    };
  }
} 