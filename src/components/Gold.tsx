'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Price {
  symbol: string;
  tradingViewSymbol: string;
  exchange: string;
  color?: string;
}

const DEFAULT_TICKERS: Price[] = [
  { symbol: 'GOLD', tradingViewSymbol: 'TVC:XAUBTC', exchange: 'TVC', color: 'text-yellow-500' },
  { symbol: 'PAX GOLD', tradingViewSymbol: 'BINANCE:PAXGUSDT', exchange: 'BINANCE', color: 'text-yellow-500' },
  { symbol: 'XAUT', tradingViewSymbol: 'BITFINEX:XAUTUSD', exchange: 'BITFINEX', color: 'text-yellow-500' },
];

export default function PriceTicker() {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('GOLD');

  const handleSymbolClick = (symbol: string) => {
    if (symbol === selectedSymbol) {
      return;
    }
    setSelectedSymbol(symbol);
  };

  return (
    <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)] mt-24 sm:mt-0">
      <CardContent className="p-0">
        {/* Chart Header */}
        <div className="flex items-center justify-between border-b border-yellow-500/20 px-4">
          <div className="flex items-center space-x-8 overflow-x-auto py-2">
            {DEFAULT_TICKERS.map((item) => (
              <button
                key={item.symbol}
                onClick={() => handleSymbolClick(item.symbol)}
                className={`relative py-2 whitespace-nowrap ${
                  selectedSymbol === item.symbol
                    ? item.color || 'text-yellow-500'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.symbol}/BTC
                {selectedSymbol === item.symbol && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                    initial={false}
                    transition={{ type: "spring" as const, stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-white/60 hover:text-white">
              <Camera className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chart Area */}
        <div className="w-full h-[400px] bg-black">
          <iframe
            key={selectedSymbol}
            src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_${selectedSymbol}&symbol=${DEFAULT_TICKERS.find(t => t.symbol === selectedSymbol)?.tradingViewSymbol}&interval=4H&hidesidetoolbar=0&symboledit=1&saveimage=0&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%22header_widget%22%5D&locale=en&utm_source=www.tradingview.com&utm_medium=widget_new&utm_campaign=chart&utm_term=${DEFAULT_TICKERS.find(t => t.symbol === selectedSymbol)?.tradingViewSymbol}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            id={`tradingview_${selectedSymbol}`}
          />
        </div>

        {/* Chart Controls */}
        <div className="flex items-center space-x-2 p-2 border-t border-yellow-500/20">
          <button className="px-3 py-1 text-xs text-white/60 hover:text-white">1m</button>
          <button className="px-3 py-1 text-xs text-white/60 hover:text-white">30m</button>
          <button className="px-3 py-1 text-xs text-white/60 hover:text-white">1h</button>
          <button className="px-3 py-1 text-xs text-white bg-yellow-500/10 rounded">D</button>
          <div className="h-4 w-px bg-yellow-500/20 mx-2" />
          <button className="p-1 text-white/60 hover:text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18" />
            </svg>
          </button>
          <button className="p-1 text-white/60 hover:text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18M9 9l3-3 3 3M9 15l3 3 3-3" />
            </svg>
          </button>
          <button className="p-1 text-white/60 hover:text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 3v18h18M7 14l4-4 4 4 4-4" />
            </svg>
          </button>
          <div className="h-4 w-px bg-yellow-500/20 mx-2" />
          <button className="p-1 text-white/60 hover:text-white">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3v18M3 12h18" />
            </svg>
          </button>
          <div className="flex-1" />
          <button className="px-3 py-1 text-xs text-white/60 hover:text-white">Indicators</button>
        </div>
      </CardContent>
    </Card>
  );
} 