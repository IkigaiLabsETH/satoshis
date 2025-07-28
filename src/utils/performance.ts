// Performance monitoring utilities

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private enabled: boolean = process.env.NODE_ENV === 'development';

  startTimer(name: string, metadata?: Record<string, unknown>): void {
    if (!this.enabled) return;
    
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata
    });
  }

  endTimer(name: string): number | null {
    if (!this.enabled) return null;
    
    const metric = this.metrics.get(name);
    if (!metric) {
      // eslint-disable-next-line no-console
      console.warn(`Performance metric "${name}" not found`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    this.logMetric(metric);
    return metric.duration;
  }

  private logMetric(metric: PerformanceMetric): void {
    if (metric.duration && metric.duration > 1000) {
      // eslint-disable-next-line no-console
      console.warn(`[PERFORMANCE] Slow operation: ${metric.name} took ${metric.duration.toFixed(2)}ms`, metric.metadata);
    } else {
      // eslint-disable-next-line no-console
      console.log(`[PERFORMANCE] ${metric.name}: ${metric.duration?.toFixed(2)}ms`, metric.metadata);
    }
  }

  async measureAsync<T>(name: string, fn: () => Promise<T>, metadata?: Record<string, unknown>): Promise<T> {
    this.startTimer(name, metadata);
    try {
      const result = await fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  measureSync<T>(name: string, fn: () => T, metadata?: Record<string, unknown>): T {
    this.startTimer(name, metadata);
    try {
      const result = fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  getMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  clearMetrics(): void {
    this.metrics.clear();
  }
}

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Decorator for measuring function performance
export function measurePerformance(name?: string) {
  return function (target: Record<string, unknown>, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const metricName = name || `${target.constructor?.name || 'Unknown'}.${propertyName}`;

    descriptor.value = async function (...args: unknown[]) {
      return performanceMonitor.measureAsync(metricName, () => method.apply(this, args));
    };
  };
}

// Utility for measuring API response times
export const measureApiResponse = async <T>(
  name: string,
  apiCall: () => Promise<T>,
  metadata?: Record<string, unknown>
): Promise<T> => {
  return performanceMonitor.measureAsync(name, apiCall, metadata);
};

// Memory usage monitoring
export const getMemoryUsage = (): NodeJS.MemoryUsage | null => {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    return process.memoryUsage();
  }
  return null;
};

// Log memory usage
export const logMemoryUsage = (context?: string): void => {
  const memoryUsage = getMemoryUsage();
  if (memoryUsage) {
    // eslint-disable-next-line no-console
    console.log(`[MEMORY] ${context || 'Current usage'}:`, {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`
    });
  }
}; 