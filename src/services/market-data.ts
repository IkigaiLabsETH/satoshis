import { CryptoData, StockData, NewsData, GlobalMarketData } from '@/types/watchlist';
import { watchlistConfig, API_ENDPOINTS } from '@/config/watchlist';

export class MarketDataService {
  /**
   * Fetch Bitcoin price and 24h change from CoinGecko
   */
  static async getBitcoinData(): Promise<{ price: number; change24h: number }> {
    try {
      const response = await fetch(
        `${API_ENDPOINTS.COINGECKO_SIMPLE_PRICE}?ids=bitcoin&vs_currencies=usd&include_24hr_change=true`
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        price: data.bitcoin?.usd || 120000,
        change24h: data.bitcoin?.usd_24h_change || 0
      };
    } catch {
      return { price: 120000, change24h: 0 };
    }
  }

  /**
   * Fetch cryptocurrency data from CoinGecko
   */
  static async getCryptoData(): Promise<CryptoData[]> {
    try {
      const ids = watchlistConfig.cryptoIds.join(',');
      const response = await fetch(
        `${API_ENDPOINTS.COINGECKO_MARKETS}?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=50&page=1&sparkline=false`
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko markets API error: ${response.status}`);
      }
      
      return await response.json();
    } catch {
      return [];
    }
  }

  /**
   * Fetch stock data from Finnhub
   */
  static async getStockData(): Promise<StockData[]> {
    const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;
    if (!FINNHUB_API_KEY) {
      return [];
    }

    try {
      const stockPromises = watchlistConfig.stockSymbols.map(async (symbol) => {
        try {
          const response = await fetch(
            `${API_ENDPOINTS.FINNHUB_BASE}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
          );
          
          if (!response.ok) {
            throw new Error(`Finnhub API error for ${symbol}: ${response.status}`);
          }
          
          const data = await response.json();
          return { symbol, ...data };
        } catch {
          return null;
        }
      });
      
      const results = await Promise.allSettled(stockPromises);
      return results
        .filter((result): result is PromiseFulfilledResult<StockData> => 
          result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value);
    } catch {
      return [];
    }
  }

  /**
   * Fetch global market data from CoinGecko
   */
  static async getGlobalMarketData(): Promise<GlobalMarketData | null> {
    try {
      const response = await fetch(API_ENDPOINTS.COINGECKO_GLOBAL);
      
      if (!response.ok) {
        throw new Error(`CoinGecko global API error: ${response.status}`);
      }
      
      return await response.json();
    } catch {
      return null;
    }
  }

  /**
   * Fetch news data from internal API
   */
  static async getNewsData(): Promise<NewsData[]> {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/watchlist/news`);
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.status}`);
      }
      
      const result = await response.json();
      return result.success && result.data ? result.data.slice(0, 5) : [];
    } catch {
      return this.getFallbackNewsData();
    }
  }

  /**
   * Get fallback news data when API fails
   */
  private static getFallbackNewsData(): NewsData[] {
    return [
      {
        title: 'Bitcoin ETF Flows Continue Strong Institutional Adoption',
        description: 'Spot Bitcoin ETFs continue to see significant inflows, indicating strong institutional demand',
        url: 'https://cointelegraph.com/tags/bitcoin-etf',
        source: 'Market Analysis',
        publishedAt: new Date().toISOString(),
        sentiment: 'positive',
        impact_score: 8,
        category: 'Institutional Adoption'
      }
    ];
  }

  /**
   * Fetch all market data in parallel
   */
  static async getAllMarketData() {
    const [bitcoinData, cryptoData, stockData, globalData, newsData] = await Promise.allSettled([
      this.getBitcoinData(),
      this.getCryptoData(),
      this.getStockData(),
      this.getGlobalMarketData(),
      this.getNewsData()
    ]);

    return {
      bitcoin: bitcoinData.status === 'fulfilled' ? bitcoinData.value : { price: 120000, change24h: 0 },
      crypto: cryptoData.status === 'fulfilled' ? cryptoData.value : [],
      stocks: stockData.status === 'fulfilled' ? stockData.value : [],
      global: globalData.status === 'fulfilled' ? globalData.value : null,
      news: newsData.status === 'fulfilled' ? newsData.value : []
    };
  }
} 