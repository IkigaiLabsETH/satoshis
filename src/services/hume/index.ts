import { Hume } from 'hume';
import { fetchAccessToken } from '@humeai/voice';
import { logger } from '@/lib/logger';

export interface HumeConfig {
  configId: string;
  hostname: string;
  debug?: boolean;
}

export interface HumeCredentials {
  apiKey: string;
  secretKey: string;
}

export interface HumeErrorResponse {
  error: string;
  details?: string;
}

// Define a minimal HumeClient interface to replace 'any'
export interface HumeClient {
  empathicVoice: {
    chat: {
      connect: () => Promise<HumeSocket>;
    };
  };
}

// Define a minimal socket interface to replace 'any'
export interface HumeSocket {
  tillSocketOpen: () => Promise<unknown>;
  close: () => Promise<void>;
  on: (event: string, callback: (data: unknown) => void) => void;
  sendUserInput: (message: string) => void;
}

// Standard error handler to format errors consistently
export const handleHumeError = (error: unknown): HumeErrorResponse => {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  const errorStack = error instanceof Error ? error.stack : undefined;
  
  logger.error('Hume service error:', {
    message: errorMessage,
    stack: errorStack,
    timestamp: new Date().toISOString()
  });

  return {
    error: errorMessage,
    details: process.env.NODE_ENV === 'development' ? errorStack : undefined
  };
};

// Validate Hume credentials to ensure they exist
export const validateCredentials = (): HumeCredentials => {
  const apiKey = process.env.HUME_API_KEY;
  const secretKey = process.env.HUME_CLIENT_SECRET;
  const missingVars = [];

  if (!apiKey) missingVars.push('HUME_API_KEY');
  if (!secretKey) missingVars.push('HUME_CLIENT_SECRET');

  if (missingVars.length > 0) {
    throw new Error(`Missing Hume AI credentials: ${missingVars.join(', ')}`);
  }

  return { 
    apiKey: apiKey as string, 
    secretKey: secretKey as string 
  };
};

// Generate and validate an access token
export const getAccessToken = async (): Promise<string> => {
  try {
    const { apiKey, secretKey } = validateCredentials();
    
    logger.info('Fetching access token from Hume AI...', {
      apiKeyLength: apiKey.length,
      secretKeyLength: secretKey.length,
      apiKeyPrefix: apiKey.substring(0, 8) + '...'
    });
    
    const accessToken = await fetchAccessToken({
      apiKey,
      secretKey,
    });

    logger.info('Raw access token received:', {
      tokenType: typeof accessToken,
      tokenLength: accessToken?.length || 0,
      tokenValue: accessToken,
      isString: typeof accessToken === 'string',
      isUndefined: accessToken === undefined,
      isNull: accessToken === null,
      isUndefinedString: accessToken === 'undefined'
    });

    if (!accessToken || accessToken === 'undefined' || typeof accessToken !== 'string' || accessToken.length === 0) {
      throw new Error(`Invalid access token received from Hume AI: ${JSON.stringify(accessToken)}`);
    }

    logger.info('Access token validation passed');
    return accessToken;
  } catch (error) {
    logger.error('Failed to get Hume access token:', error);
    throw error;
  }
};

// Safely create Hume client instance
export const createHumeClient = ({ apiKey, secretKey }: HumeCredentials): HumeClient => {
  try {
    // We need to cast Hume as any because its constructor needs to be called with new
    const HumeConstructor = Hume as unknown as { new(args: { apiKey: string; secretKey: string }): HumeClient };
    return new HumeConstructor({
      apiKey,
      secretKey
    });
  } catch (error) {
    logger.error('Failed to create Hume client:', error);
    throw error;
  }
};

// Default Hume configuration for voice services
export const defaultVoiceConfig: HumeConfig = {
  configId: 'ccb6fd91-52cd-4f8c-bcc5-763f647407b5',
  hostname: 'api.hume.ai',
  debug: false
};

// Export utility functions for browser context
export const humeUtils = {
  isValidAccessToken: (token: string | null | undefined): boolean => {
    return !!token && token !== 'undefined' && typeof token === 'string';
  }
};

// Export a configured Hume service
const HumeService = {
  getAccessToken,
  createHumeClient,
  handleHumeError,
  validateCredentials,
  defaultVoiceConfig,
  utils: humeUtils
};

export default HumeService; 