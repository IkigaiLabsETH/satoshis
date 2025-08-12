/**
 * CoinGlass API Service
 * 
 * This service provides integration with CoinGlass for liquidation data
 * and market analytics. Currently using direct links due to API cost.
 * 
 * For production use, obtain API keys from: https://www.coinglass.com/api
 */

interface LiquidationLevel {
  price: number;
  type: 'red' | 'yellow' | 'green';
  description: string;
  percentage: number;
}

interface LiquidationData {
  asset: string;
  levels: LiquidationLevel[];
  timestamp: number;
}

export class CoinGlassService {
  private baseUrl = 'https://api.coinglass.com/api/v2';
  private apiKey: string | null = null;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || null;
  }

  /**
   * Make a request to the CoinGlass API
   */
  private async makeRequest(endpoint: string, params: Record<string, string> = {}): Promise<Response> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['CG-API-KEY'] = this.apiKey;
    }

    return fetch(url.toString(), {
      method: 'GET',
      headers,
    });
  }

  /**
   * Get liquidation levels for a specific asset
   */
  async getLiquidationLevels(asset: string): Promise<LiquidationData | null> {
    try {
      if (!this.apiKey) {
        // Return mock data when no API key is available
        return this.getMockLiquidationData(asset);
      }

      const response = await this.makeRequest('/futures/liquidation', {
        symbol: asset,
        interval: '1h',
      });

      if (!response.ok) {
        throw new Error(`CoinGlass API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseLiquidationResponse(data, asset);
    } catch {
      // Return mock data on error
      return this.getMockLiquidationData(asset);
    }
  }

  /**
   * Get liquidation heatmap data
   */
  async getLiquidationHeatmap(): Promise<LiquidationData[]> {
    try {
      if (!this.apiKey) {
        // Return mock data when no API key is available
        return [
          this.getMockLiquidationData('BTC'),
          this.getMockLiquidationData('ETH'),
        ].filter(Boolean) as LiquidationData[];
      }

      const response = await this.makeRequest('/futures/liquidation/heatmap');
      
      if (!response.ok) {
        throw new Error(`CoinGlass API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseHeatmapResponse(data);
    } catch {
      // Return mock data on error
      return [
        this.getMockLiquidationData('BTC'),
        this.getMockLiquidationData('ETH'),
      ].filter(Boolean) as LiquidationData[];
    }
  }

  /**
   * Get funding rates for futures
   */
  async getFundingRates(): Promise<Record<string, number>> {
    try {
      if (!this.apiKey) {
        // Return mock funding rates
        return {
          BTC: 0.0001,
          ETH: -0.0002,
          BNB: 0.0003,
        };
      }

      const response = await this.makeRequest('/futures/funding-rate');
      
      if (!response.ok) {
        throw new Error(`CoinGlass API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseFundingRatesResponse(data);
    } catch {
      // Return mock data on error
      return {
        BTC: 0.0001,
        ETH: -0.0002,
        BNB: 0.0003,
      };
    }
  }

  /**
   * Parse liquidation response from API
   */
  private parseLiquidationResponse(data: unknown, asset: string): LiquidationData | null {
    try {
      // Type guard for response structure
      if (typeof data === 'object' && data !== null && 'data' in data) {
        const responseData = data as { data: unknown };
        if (Array.isArray(responseData.data)) {
          const levels: LiquidationLevel[] = responseData.data.map((item: unknown) => ({
            price: Number((item as { price?: unknown }).price) || 0,
            type: 'red' as const,
            description: 'Liquidation Level',
            percentage: 10,
          }));

          return {
            asset,
            levels,
            timestamp: Date.now(),
          };
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Parse heatmap response from API
   */
  private parseHeatmapResponse(data: unknown): LiquidationData[] {
    try {
      if (typeof data === 'object' && data !== null && 'data' in data) {
        const responseData = data as { data: unknown };
        if (Array.isArray(responseData.data)) {
          return responseData.data.map((item: unknown) => {
            const assetItem = item as { symbol?: unknown; levels?: unknown };
            return {
              asset: String(assetItem.symbol || 'UNKNOWN'),
              levels: Array.isArray(assetItem.levels) ? assetItem.levels.map((level: unknown) => ({
                price: Number((level as { price?: unknown }).price) || 0,
                type: 'red' as const,
                description: 'Liquidation Level',
                percentage: 10,
              })) : [],
              timestamp: Date.now(),
            };
          });
        }
      }
      return [];
    } catch {
      return [];
    }
  }

  /**
   * Parse funding rates response from API
   */
  private parseFundingRatesResponse(data: unknown): Record<string, number> {
    try {
      if (typeof data === 'object' && data !== null && 'data' in data) {
        const responseData = data as { data: unknown };
        if (Array.isArray(responseData.data)) {
          const rates: Record<string, number> = {};
          responseData.data.forEach((item: unknown) => {
            const rateItem = item as { symbol?: unknown; fundingRate?: unknown };
            if (rateItem.symbol && rateItem.fundingRate) {
              rates[String(rateItem.symbol)] = Number(rateItem.fundingRate);
            }
          });
          return rates;
        }
      }
      return {};
    } catch {
      return {};
    }
  }

  /**
   * Generate mock liquidation data for development
   */
  private getMockLiquidationData(asset: string): LiquidationData {
    const basePrice = asset === 'BTC' ? 119000 : 3200;
    const volatility = asset === 'BTC' ? 2000 : 200;

    return {
      asset,
      levels: [
        {
          price: basePrice - volatility,
          type: 'red',
          description: 'Major Liquidation Zone',
          percentage: 15,
        },
        {
          price: basePrice,
          type: 'yellow',
          description: 'Breakout Level',
          percentage: 10,
        },
        {
          price: basePrice + volatility,
          type: 'green',
          description: 'Support Level',
          percentage: 12,
        },
      ],
      timestamp: Date.now(),
    };
  }

  /**
   * Get direct link to CoinGlass liquidation heatmap
   */
  getLiquidationHeatmapUrl(): string {
    return 'https://www.coinglass.com/pro/futures/LiquidationHeatMap';
  }

  /**
   * Get direct link to CoinGlass funding rates
   */
  getFundingRatesUrl(): string {
    return 'https://www.coinglass.com/pro/futures/FundingRate';
  }
}
