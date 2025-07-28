// Caching utilities for API responses

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in milliseconds
  maxSize?: number; // Maximum number of entries
}

class Cache<T> {
  private cache = new Map<string, CacheEntry<T>>();
  private readonly defaultTtl: number;
  private readonly maxSize: number;

  constructor(options: CacheOptions = {}) {
    this.defaultTtl = options.ttl || 5 * 60 * 1000; // 5 minutes default
    this.maxSize = options.maxSize || 100;
  }

  set(key: string, data: T, ttl?: number): void {
    // Remove expired entries
    this.cleanup();

    // Remove oldest entry if cache is full
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) {
        this.cache.delete(oldestKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTtl
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry is expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    this.cleanup();
    return this.cache.size;
  }

  private cleanup(): void {
    const now = Date.now();
    const entries = Array.from(this.cache.entries());
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }

  getStats(): { size: number; maxSize: number; hitRate: number } {
    this.cleanup();
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: 0 // TODO: Implement hit rate tracking
    };
  }
}

// Global cache instances
export const marketDataCache = new Cache<Record<string, unknown>>({ ttl: 2 * 60 * 1000 }); // 2 minutes for market data
export const predictionCache = new Cache<Record<string, unknown>>({ ttl: 5 * 60 * 1000 }); // 5 minutes for predictions
export const newsCache = new Cache<Record<string, unknown>>({ ttl: 10 * 60 * 1000 }); // 10 minutes for news

// Cache decorator for functions
export function cached<T extends (...args: unknown[]) => unknown>(
  cache: Cache<ReturnType<T>>,
  keyGenerator?: (...args: Parameters<T>) => string
) {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: Parameters<T>): Promise<ReturnType<T>> {
      const key = keyGenerator ? keyGenerator(...args) : `${propertyName}_${JSON.stringify(args)}`;
      
      const cachedResult = cache.get(key);
      if (cachedResult !== null) {
        return cachedResult;
      }

      const result = await method.apply(this, args);
      cache.set(key, result);
      return result;
    };
  };
}

// Utility for creating cache keys
export const createCacheKey = (prefix: string, ...parts: unknown[]): string => {
  return `${prefix}_${parts.map(part => 
    typeof part === 'object' ? JSON.stringify(part) : String(part)
  ).join('_')}`;
};

// Cache middleware for API routes
export const withCache = <T>(
  cache: Cache<T>,
  key: string,
  ttl?: number
) => {
  return async (fn: () => Promise<T>): Promise<T> => {
    const cachedResult = cache.get(key);
    if (cachedResult !== null) {
      return cachedResult;
    }

    const result = await fn();
    cache.set(key, result, ttl);
    return result;
  };
};

// Cache invalidation utilities
export const invalidateCacheByPrefix = (cache: Cache<Record<string, unknown>>, _prefix: string): void => {
  // Note: This is a simplified implementation
  // In a real implementation, you'd want to track keys with prefixes
  cache.clear();
};

export const invalidateAllCaches = (): void => {
  marketDataCache.clear();
  predictionCache.clear();
  newsCache.clear();
}; 