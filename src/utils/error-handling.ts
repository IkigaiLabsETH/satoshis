// Centralized error handling utilities

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class ApiError extends AppError {
  constructor(message: string, statusCode: number = 500) {
    super(message, 'API_ERROR', statusCode);
  }
}

export class TimeoutError extends AppError {
  constructor(message: string = 'Request timeout') {
    super(message, 'TIMEOUT_ERROR', 408);
  }
}

// Error handling utilities
export const handleApiError = (error: unknown): { message: string; statusCode: number } => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode
    };
  }
  
  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    statusCode: 500
  };
};

// Safe JSON parsing with error handling
export const safeJsonParse = <T>(jsonString: string, fallback: T): T => {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return fallback;
  }
};

// Retry utility with exponential backoff
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        throw lastError;
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

// Timeout wrapper
export const withTimeout = <T>(
  promise: Promise<T>,
  timeoutMs: number,
  errorMessage: string = 'Operation timed out'
): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new TimeoutError(errorMessage)), timeoutMs)
    )
  ]);
};

// Logging utilities
export const logError = (error: unknown, context?: string): void => {
  const errorMessage = error instanceof Error ? error.message : String(error);
  const stack = error instanceof Error ? error.stack : undefined;
  
  // eslint-disable-next-line no-console
  console.error(`[${context || 'ERROR'}] ${errorMessage}`, {
    stack,
    timestamp: new Date().toISOString()
  });
};

export const logWarning = (message: string, context?: string): void => {
  // eslint-disable-next-line no-console
  console.warn(`[${context || 'WARNING'}] ${message}`, {
    timestamp: new Date().toISOString()
  });
};

export const logInfo = (message: string, context?: string): void => {
  // eslint-disable-next-line no-console
  console.log(`[${context || 'INFO'}] ${message}`, {
    timestamp: new Date().toISOString()
  });
}; 