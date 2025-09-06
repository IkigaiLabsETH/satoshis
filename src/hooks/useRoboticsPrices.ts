import { useState, useEffect } from 'react';

interface RoboticsPrice {
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  lastUpdated: string;
}

interface RoboticsPrices {
  peaq: RoboticsPrice;
  auki: RoboticsPrice;
  codec: RoboticsPrice;
  brew: RoboticsPrice;
  show: RoboticsPrice;
  robot: RoboticsPrice;
}

export function useRoboticsPrices() {
  const [prices, setPrices] = useState<RoboticsPrices>({
    peaq: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' },
    auki: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' },
    codec: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' },
    brew: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' },
    show: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' },
    robot: { price: 0, change24h: 0, marketCap: 0, volume24h: 0, lastUpdated: '' }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrices = async () => {
    try {
      setError(null);
      
      // CoinGecko IDs for robotics projects
      const ids = 'peaq,auki-labs,codec-flow,homebrew-robotics-club,vitanova,robotstack';
      
      const response = await fetch(
        `/api/coingecko?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const now = new Date().toLocaleTimeString();

      // Map CoinGecko data to our structure
      setPrices({
        peaq: {
          price: data.peaq?.usd || 0,
          change24h: data.peaq?.usd_24h_change || 0,
          marketCap: 74200000, // Static for now - would need market cap API
          volume24h: 2850000, // Static for now - would need volume API
          lastUpdated: now
        },
        auki: {
          price: data['auki-labs']?.usd || 0,
          change24h: data['auki-labs']?.usd_24h_change || 0,
          marketCap: 55500000,
          volume24h: 886147,
          lastUpdated: now
        },
        codec: {
          price: data['codec-flow']?.usd || 0,
          change24h: data['codec-flow']?.usd_24h_change || 0,
          marketCap: 20800000,
          volume24h: 1470000,
          lastUpdated: now
        },
        brew: {
          price: data['homebrew-robotics-club']?.usd || 0,
          change24h: data['homebrew-robotics-club']?.usd_24h_change || 0,
          marketCap: 3880000,
          volume24h: 435736,
          lastUpdated: now
        },
        show: {
          price: data.vitanova?.usd || 0,
          change24h: data.vitanova?.usd_24h_change || 0,
          marketCap: 3250000,
          volume24h: 476916,
          lastUpdated: now
        },
        robot: {
          price: data.robotstack?.usd || 0,
          change24h: data.robotstack?.usd_24h_change || 0,
          marketCap: 6700000,
          volume24h: 294722,
          lastUpdated: now
        }
      });
    } catch (err) {
      console.error('Error fetching robotics prices:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch robotics prices');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    
    // Update every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return { prices, isLoading, error, refetch: fetchPrices };
}
