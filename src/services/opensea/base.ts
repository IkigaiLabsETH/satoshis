import { z } from 'zod';
import { logger } from '@/lib/logger';

interface OpenSeaErrorResponse {
  success: boolean;
  message?: string;
  code?: string;
}

interface RequestOptions<T> {
  method: string;
  url: string;
  params?: Record<string, unknown>;
  body?: unknown;
  validateResponse?: (data: unknown) => T;
}

export class OpenSeaAPIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public responseBody?: OpenSeaErrorResponse
  ) {
    super(message);
    this.name = 'OpenSeaAPIError';
  }
}

export class BaseOpenSeaAPI {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private requestQueue: Promise<unknown> = Promise.resolve();
  private lastRequestTime: number = 0;
  private readonly minRequestInterval: number = 200; // Minimum time between requests in ms

  constructor(apiKey: string, baseUrl = 'https://api.opensea.io') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  protected validateParams<T>(params: T, schema: z.ZodType<T>): T {
    try {
      return schema.parse(params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new OpenSeaAPIError(
          `Invalid parameters: ${error.issues.map(e => e.message).join(', ')}`
        );
      }
      throw error;
    }
  }

  private cleanParams(params: Record<string, unknown>): Record<string, string> {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = String(value);
      }
      return acc;
    }, {} as Record<string, string>);
  }

  private async waitForRateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.minRequestInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, this.minRequestInterval - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }

  private async executeRequest<T>({
    method,
    url,
    params,
    body,
    validateResponse,
    retryCount = 0
  }: RequestOptions<T> & { retryCount?: number }): Promise<T> {
    const queryParams = params ? new URLSearchParams(this.cleanParams(params)).toString() : '';
    const fullUrl = `${this.baseUrl}${url}${queryParams ? `?${queryParams}` : ''}`;

    try {
      await this.waitForRateLimit();

      logger.info('Making OpenSea API request:', {
        method,
        url: fullUrl,
        params,
        retryCount
      });

      const response = await fetch(fullUrl, {
        method,
        headers: {
          'X-API-KEY': this.apiKey,
          'Accept': 'application/json',
          ...(body ? { 'Content-Type': 'application/json' } : {})
        },
        ...(body ? { body: JSON.stringify(body) } : {})
      });

      const responseBody = await response.json() as OpenSeaErrorResponse;

      // Handle rate limiting
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
        logger.warn('Rate limited by OpenSea API, waiting before retry', {
          retryAfter,
          retryCount
        });
        
        if (retryCount < 3) {
          await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
          return this.executeRequest({
            method,
            url,
            params,
            body,
            validateResponse,
            retryCount: retryCount + 1
          });
        }
      }

      if (!response.ok) {
        const isListingsEndpoint = fullUrl.includes('/listings');
        const is404 = response.status === 404;
        
        // Don't log 404s for listings as errors - they're expected when NFTs aren't listed
        if (!(is404 && isListingsEndpoint)) {
          logger.error('OpenSea API request failed:', {
            status: response.status,
            url: fullUrl,
            response: responseBody,
            retryCount
          });
        }

        // Handle specific error cases
        if (response.status === 404) {
          throw new OpenSeaAPIError(
            'Resource not found',
            response.status,
            'NOT_FOUND',
            responseBody
          );
        }

        if (response.status === 403) {
          throw new OpenSeaAPIError(
            'API key invalid or expired',
            response.status,
            'AUTH_ERROR',
            responseBody
          );
        }

        throw new OpenSeaAPIError(
          responseBody.message || 'OpenSea API request failed',
          response.status,
          responseBody.code,
          responseBody
        );
      }

      try {
        return validateResponse ? validateResponse(responseBody) : responseBody as T;
      } catch (error) {
        logger.error('Failed to validate OpenSea API response:', {
          error,
          responseBody,
          retryCount
        });
        throw error;
      }

    } catch (error) {
      if (error instanceof OpenSeaAPIError) {
        throw error;
      }

      // Handle network errors with retry
      if (retryCount < 3 && (
        error instanceof TypeError || // Network error
        error instanceof SyntaxError // JSON parse error
      )) {
        logger.warn('Network error, retrying request', {
          error: error instanceof Error ? error.message : String(error),
          retryCount
        });
        
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, retryCount) * 1000)
        );
        
        return this.executeRequest({
          method,
          url,
          params,
          body,
          validateResponse,
          retryCount: retryCount + 1
        });
      }

      logger.error('OpenSea API request failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        url: fullUrl,
        retryCount
      });
      
      throw new OpenSeaAPIError(
        `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  protected async request<T>(options: RequestOptions<T>): Promise<T> {
    // Queue requests to prevent overwhelming the API
    this.requestQueue = this.requestQueue.then(() => 
      this.executeRequest(options)
    ).catch(error => {
      logger.error('Request queue error:', error);
      throw error;
    });
    
    return this.requestQueue as Promise<T>;
  }

  protected async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
    return this.request<T>({
      method: 'GET',
      url,
      params
    });
  }
} 