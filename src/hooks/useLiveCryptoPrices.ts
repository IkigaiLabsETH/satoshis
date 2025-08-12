import { useState, useEffect } from 'react';

interface CryptoPrice {
  price: number;
  change24h: number;
  lastUpdated: string;
}

interface LiveCryptoPrices {
  BTC: CryptoPrice;
  ETH: CryptoPrice;
  isLoading: boolean;
  error: string | null;
}

export function useLiveCryptoPrices() {
  const [prices, setPrices] = useState<LiveCryptoPrices>({
    BTC: { price: 0, change24h: 0, lastUpdated: '' },
    ETH: { price: 0, change24h: 0, lastUpdated: '' }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setError(null);
      
      // Fetch BTC and ETH prices from CoinGecko
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true'
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status}`);
      }

      const data = await response.json();
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
      setError(err instanceof Error ? err.message : 'Failed to fetch prices');
      console.error('Error fetching crypto prices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Refresh prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...prices,
    isLoading,
    error,
    refetch: fetchPrices
  };
}
