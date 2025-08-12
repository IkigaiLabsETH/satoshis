// CoinGlass API service for liquidation level data
// Note: This is a template - you'll need to add your actual API key and endpoints

interface LiquidationLevel {
  price: number;
  type: 'red' | 'yellow' | 'green';
  description: string;
  percentage: number;
  volume: number;
}

interface CoinGlassResponse {
  success: boolean;
  data: {
    liquidationLevels: LiquidationLevel[];
    totalLiquidation: number;
    timestamp: number;
  };
}

class CoinGlassService {
  private apiKey: string;
  private baseUrl: string = 'https://open-api.coinglass.com/api/pro/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'CG-API-KEY': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('CoinGlass API request failed:', error);
      throw error;
    }
  }

  /**
   * Fetch liquidation levels for a specific asset
   * @param symbol - Asset symbol (e.g., 'BTC', 'ETH')
   * @param exchange - Exchange name (e.g., 'hyperliquid')
   * @param interval - Time interval (e.g., '4h', '1d')
   */
  async getLiquidationLevels(
    symbol: string,
    exchange: string = 'hyperliquid',
    interval: string = '4h'
  ): Promise<LiquidationLevel[]> {
    try {
      const response = await this.makeRequest('/futures/liquidation-levels', {
        symbol: symbol.toUpperCase(),
        exchange,
        interval,
      });

      if (response.success && response.data?.liquidationLevels) {
        return this.processLiquidationLevels(response.data.liquidationLevels);
      }

      return this.getMockLiquidationLevels(symbol);
    } catch (error) {
      console.warn('Using mock liquidation levels due to API error:', error);
      return this.getMockLiquidationLevels(symbol);
    }
  }

  /**
   * Fetch funding rates for perpetual contracts
   * @param symbol - Asset symbol
   * @param exchange - Exchange name
   */
  async getFundingRates(symbol: string, exchange: string = 'hyperliquid'): Promise<number> {
    try {
      const response = await this.makeRequest('/futures/funding-rates', {
        symbol: symbol.toUpperCase(),
        exchange,
      });

      if (response.success && response.data?.fundingRate) {
        return response.data.fundingRate;
      }

      return 0.0125; // Default mock value
    } catch (error) {
      console.warn('Using mock funding rate due to API error:', error);
      return 0.0125; // Default mock value
    }
  }

  /**
   * Fetch open interest data
   * @param symbol - Asset symbol
   * @param exchange - Exchange name
   */
  async getOpenInterest(symbol: string, exchange: string = 'hyperliquid'): Promise<number> {
    try {
      const response = await this.makeRequest('/futures/open-interest', {
        symbol: symbol.toUpperCase(),
        exchange,
      });

      if (response.success && response.data?.openInterest) {
        return response.data.openInterest;
      }

      return 1250000; // Default mock value
    } catch (error) {
      console.warn('Using mock open interest due to API error:', error);
      return 1250000; // Default mock value
    }
  }

  /**
   * Process raw liquidation level data from API
   */
  private processLiquidationLevels(rawData: any[]): LiquidationLevel[] {
    return rawData.map((item, index) => ({
      price: parseFloat(item.price) || 0,
      type: this.determineZoneType(item.percentage, index),
      description: this.getZoneDescription(item.percentage, index),
      percentage: parseFloat(item.percentage) || 0,
      volume: parseFloat(item.volume) || 0,
    }));
  }

  /**
   * Determine zone type based on percentage and position
   */
  private determineZoneType(percentage: number, index: number): 'red' | 'yellow' | 'green' {
    if (percentage > 15) return 'red';
    if (percentage > 8) return 'yellow';
    return 'green';
  }

  /**
   * Get zone description based on percentage and position
   */
  private getZoneDescription(percentage: number, index: number): string {
    if (percentage > 15) return 'Major Liquidation Zone';
    if (percentage > 8) return 'Breakout Level';
    return 'Support Level';
  }

  /**
   * Fallback mock data when API is unavailable
   */
  private getMockLiquidationLevels(symbol: string): LiquidationLevel[] {
    if (symbol.toUpperCase() === 'BTC') {
      return [
        { price: 118065, type: 'red', description: 'Major Liquidation Zone', percentage: 15.2, volume: 2500000 },
        { price: 119425, type: 'yellow', description: 'Breakout Level', percentage: 8.7, volume: 1800000 },
        { price: 121000, type: 'green', description: 'Support Level', percentage: 5.3, volume: 1200000 },
      ];
    } else if (symbol.toUpperCase() === 'ETH') {
      return [
        { price: 3150, type: 'red', description: 'Major Liquidation Zone', percentage: 12.8, volume: 1800000 },
        { price: 3200, type: 'yellow', description: 'Breakout Level', percentage: 7.4, volume: 1200000 },
        { price: 3250, type: 'green', description: 'Support Level', percentage: 4.1, volume: 800000 },
      ];
    }

    return [];
  }

  /**
   * Get market overview for multiple assets
   */
  async getMarketOverview(symbols: string[] = ['BTC', 'ETH']): Promise<Record<string, any>> {
    const overview: Record<string, any> = {};

    for (const symbol of symbols) {
      try {
        const [liquidationLevels, fundingRate, openInterest] = await Promise.all([
          this.getLiquidationLevels(symbol),
          this.getFundingRates(symbol),
          this.getOpenInterest(symbol),
        ]);

        overview[symbol] = {
          liquidationLevels,
          fundingRate,
          openInterest,
          timestamp: Date.now(),
        };
      } catch (error) {
        console.error(`Failed to fetch data for ${symbol}:`, error);
      }
    }

    return overview;
  }
}

// Export singleton instance
let coinGlassService: CoinGlassService | null = null;

export const getCoinGlassService = (): CoinGlassService => {
  if (!coinGlassService) {
    const apiKey = process.env.NEXT_PUBLIC_COINGLASS_API_KEY || '';
    coinGlassService = new CoinGlassService(apiKey);
  }
  return coinGlassService;
};

export default CoinGlassService;
