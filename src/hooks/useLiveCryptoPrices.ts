import { useState, useEffect } from 'react';

interface CryptoPrice {
  price: number;
  change24h: number;
  lastUpdated: string;
}

interface PriceData {
  BTC: CryptoPrice;
  ETH: CryptoPrice;
}

export function useLiveCryptoPrices() {
  const [prices, setPrices] = useState<PriceData>({
    BTC: { price: 0, change24h: 0, lastUpdated: '' },
    ETH: { price: 0, change24h: 0, lastUpdated: '' }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchPrices = async () => {
    try {
      setError(null);
      
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      // Fetch BTC and ETH prices from our server-side API route
      const response = await fetch(
        '/api/coingecko?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          },
          signal: controller.signal
        }
      );

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Validate the response data
      if (!data.bitcoin?.usd || !data.ethereum?.usd) {
        throw new Error('Invalid data received from CoinGecko API');
      }
      
      const now = new Date().toLocaleTimeString();

      setPrices({
        BTC: {
          price: data.bitcoin.usd,
          change24h: data.bitcoin.usd_24h_change || 0,
          lastUpdated: now
        },
        ETH: {
          price: data.ethereum.usd,
          change24h: data.ethereum.usd_24h_change || 0,
          lastUpdated: now
        }
      });
    } catch (err) {
      console.error('Error fetching crypto prices:', err);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timeout - please check your connection');
        } else if (err.message.includes('Failed to fetch')) {
          setError('Server connection error - please try again');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to fetch prices');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, [retryCount]); // Re-run when retry count changes

  // Add retry function
  const retry = () => {
    setRetryCount(prev => prev + 1);
    setError(null);
    setIsLoading(true);
  };

  return {
    ...prices,
    isLoading,
    error,
    refetch: fetchPrices,
    retry
  };
}
