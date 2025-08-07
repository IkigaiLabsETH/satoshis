import { Grok4Service, getMarketData } from '../grok4/grok4';
import { NextRequest, NextResponse } from 'next/server';

export const maxDuration = 45; // 45 seconds timeout for complex questions

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      message,
      systemPrompt = 'You are a Bitcoin-first AI assistant.',
      temperature = 0.8,
    } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Handle fast-path intents without calling Grok when possible
    const text = String(message).trim();
    const lower = text.toLowerCase();

    // Detect a "gm" vibe check or quick market snapshot intent
    const isGm = /^(gm|gm gm|gm\s*!|gm\s+gm\s*!?)$/.test(lower);
    const isPriceQuery = /(btc|bitcoin|eth|ethereum|sol|solana).*\b(price|quote|now|current)/i.test(text);
    const wantsOutperformers = /(outperform|relative).*btc|vs\s*btc|beat\s*btc/i.test(lower);

    if (isGm || isPriceQuery || wantsOutperformers) {
      // Build a curated market snapshot using CoinGecko with fallback logic
      const header = isGm
        ? `gm • ${new Date().toLocaleString()}`
        : `Market Snapshot • ${new Date().toLocaleString()}`;

      // Core market set; BTC-centric by default
      const symbols = ['BTC', 'ETH', 'SOL'];
      const snapshot = await getMarketData(symbols);

      // Enrich snapshot with ETHBTC ratio and SPY/QQQ and MAG7 daily change
      const getEthBtcRatio = async (): Promise<string> => {
        try {
          const res = await fetch(
            'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc&include_24hr_change=true',
            { headers: { Accept: 'application/json' } }
          );
          if (!res.ok) return '';
          const data = await res.json();
          const ratio = data?.ethereum?.btc as number | undefined;
          const change = data?.ethereum?.btc_24h_change as number | undefined;
          if (!ratio) return '';
          const r = ratio.toFixed(5);
          const ch = change ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : 'N/A';
          return `ETHBTC: ${r} (${ch} 24h)`;
        } catch {
          return '';
        }
      };

      const getYahooSnapshot = async (): Promise<string> => {
        try {
          const tickers = ['SPY','QQQ','AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSLA'];
          const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${tickers.join(',')}`;
          const res = await fetch(url);
          if (!res.ok) return '';
          const data = (await res.json()) as { quoteResponse?: { result?: Array<{ symbol: string; regularMarketChangePercent?: number }> } };
          const results = data?.quoteResponse?.result ?? [];
          if (!results.length) return '';
          const by: Record<string, { regularMarketChangePercent?: number }> = Object.fromEntries(
            results.map((q) => [q.symbol, q])
          );
          const spy = by['SPY']?.regularMarketChangePercent;
          const qqq = by['QQQ']?.regularMarketChangePercent;
          const mag7Syms = ['AAPL','MSFT','NVDA','GOOGL','AMZN','META','TSLA'];
          const mag7 = mag7Syms
            .map((s) => by[s]?.regularMarketChangePercent)
            .filter((v): v is number => typeof v === 'number');
          const mag7Avg = mag7.length ? mag7.reduce((a,b)=>a+b,0)/mag7.length : undefined;
          const fmt = (n?: number) => typeof n === 'number' ? `${n>=0?'+':''}${n.toFixed(2)}%` : 'N/A';
          const lines: string[] = [];
          lines.push(`SPY: ${fmt(spy)}  •  QQQ: ${fmt(qqq)}`);
          if (mag7Avg !== undefined) lines.push(`MAG7 (avg): ${fmt(mag7Avg)}`);
          return lines.join('\n');
        } catch {
          return '';
        }
      };

      // Compute weekly outperformers vs BTC (top 5)
      const getWeeklyOutperformers = async (limit = 5): Promise<string> => {
        try {
          const url =
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&price_change_percentage=7d_in_currency&sparkline=false';
          const res = await fetch(url, { headers: { Accept: 'application/json' } });
          if (!res.ok) throw new Error(`CoinGecko error ${res.status}`);
          const data = (await res.json()) as Array<{
            id: string;
            name: string;
            symbol: string;
            price_change_percentage_7d_in_currency?: number;
            market_cap_rank?: number;
          }>;
          const btc = data.find((c) => c.id === 'bitcoin');
          if (!btc || typeof btc.price_change_percentage_7d_in_currency !== 'number') return '';
          const btc7d = btc.price_change_percentage_7d_in_currency;
          const ranked = data
            .filter(
              (c) =>
                c.id !== 'bitcoin' &&
                typeof c.price_change_percentage_7d_in_currency === 'number' &&
                c.market_cap_rank && c.market_cap_rank <= 200
            )
            .map((c) => ({
              name: c.name,
              symbol: (c.symbol || '').toUpperCase(),
              rel: (c.price_change_percentage_7d_in_currency || 0) - btc7d,
            }))
            .sort((a, b) => b.rel - a.rel)
            .slice(0, limit);
          if (!ranked.length) return '';
          return ranked
            .map((r) => `• ${r.symbol.padEnd(5, ' ')} ${r.rel >= 0 ? '+' : ''}${r.rel.toFixed(2)}% vs BTC (7d)`)
            .join('\n');
        } catch {
          return '';
        }
      };

      const [outperformers, ethbtc, equities] = await Promise.all([
        getWeeklyOutperformers(5),
        getEthBtcRatio(),
        getYahooSnapshot(),
      ]);

      const lines = [header, '', snapshot];
      if (outperformers) {
        lines.push('', 'Top outperformers vs BTC (7d):', outperformers);
        lines.push('', 'Hedge Hint: If alts run vs BTC, consider ETHBTC call-spread hedges to manage basis risk.');
      }
      if (ethbtc) {
        lines.push('', ethbtc);
      }
      if (equities) {
        lines.push('', 'Equities snapshot:', equities);
      }
      lines.push('', 'Note: Educational info only. Not financial advice.');

      return NextResponse.json({ content: lines.join('\n'), success: true });
    }

    // Use Grok4 for complex questions with longer timeout
    const completion = await Grok4Service.chatCompletion({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: temperature,
      max_tokens: 1500, // Allow longer, more meaningful responses for complex questions
    });

    const content = completion.choices[0]?.message?.content || 'I understand. How else can I help?';

    return NextResponse.json({
      content: content,
      success: true
    });

  } catch {
    // Grok4 error occurred - use smart fallback
    
    // Get the message from the request body for fallback logic
    let userMessage = '';
    try {
      const body = await request.json();
      userMessage = body.message || '';
    } catch {
      userMessage = '';
    }
    
    // Smart fallback based on the user's question
    const lowerMessage = userMessage.toLowerCase();
    let smartResponse = '';
    
    if (lowerMessage.includes('what is bitcoin') || lowerMessage.includes('what is btc')) {
      smartResponse = "Bitcoin is the world's first decentralized digital currency, created in 2009 by Satoshi Nakamoto. It operates on blockchain technology, allowing peer-to-peer transactions without intermediaries like banks. Bitcoin is often called 'digital gold' due to its limited supply (21 million coins) and store-of-value properties. It's the foundation of the entire cryptocurrency ecosystem and represents financial sovereignty and censorship resistance.";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('chart')) {
      smartResponse = "I'd love to give you real-time Bitcoin price data, but my market data connection is currently limited. Bitcoin's price is influenced by factors like institutional adoption, regulatory news, macroeconomic conditions, and market sentiment. For live prices, I recommend checking CoinGecko, CoinMarketCap, or your preferred exchange. What specific aspect of Bitcoin's market behavior interests you?";
    } else if (lowerMessage.includes('buy') || lowerMessage.includes('invest') || lowerMessage.includes('purchase')) {
      smartResponse = "Bitcoin investment strategies vary based on your goals and risk tolerance. Many follow 'DCA' (Dollar Cost Averaging) - buying small amounts regularly regardless of price. Others prefer lump-sum investments or timing market cycles. Remember: only invest what you can afford to lose, and consider Bitcoin as a long-term store of value rather than a get-rich-quick scheme. What's your investment timeline and risk profile?";
    } else if (lowerMessage.includes('blockchain') || lowerMessage.includes('technology') || lowerMessage.includes('how does it work')) {
      smartResponse = "Bitcoin's blockchain is a distributed ledger that records all transactions in blocks linked together cryptographically. Each block contains multiple transactions, and once added, it's nearly impossible to alter. Miners validate transactions and secure the network through proof-of-work consensus. This creates a trustless system where no single entity controls the network. The technology enables censorship-resistant, borderless, and permissionless financial transactions.";
    } else if (lowerMessage.includes('satoshi') || lowerMessage.includes('creator') || lowerMessage.includes('founder')) {
      smartResponse = "Satoshi Nakamoto is the pseudonymous creator of Bitcoin, who published the Bitcoin whitepaper in 2008 and launched the network in 2009. Their true identity remains unknown, though many theories exist. Satoshi's vision was to create 'a peer-to-peer electronic cash system' that would eliminate the need for trusted third parties in financial transactions. They disappeared from the community in 2010, leaving Bitcoin to develop organically.";
    } else {
      // Generic but helpful response
      smartResponse = "I'm experiencing a temporary connection issue with my AI model, but I'm still here to help! As your Bitcoin-first assistant, I can discuss crypto markets, blockchain technology, and investment strategies. What specific aspect of Bitcoin or crypto would you like to explore?";
    }
    
    return NextResponse.json({
      content: smartResponse,
      success: true,
      fallback: true
    });
  }
} 