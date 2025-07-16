import OpenAI from "openai";
import { env } from "@/env.mjs";
import { logger } from "@/lib/logger";
import type { ChatCompletion, ChatCompletionMessageParam, ChatCompletionTool, ChatCompletionToolChoiceOption } from "openai/resources/chat/completions";
import { TweetAnalyzer } from '@/services/twitter/tweetAnalyzer';

// Initialize OpenAI client for XAI (Grok4)
const client = new OpenAI({
  baseURL: "https://api.x.ai/v1",
  apiKey: env.XAI_API_KEY,
});

export interface Grok4Message {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface Grok4Request {
  messages: ChatCompletionMessageParam[];
  temperature?: number;
  max_tokens?: number;
  tools?: ChatCompletionTool[];
  tool_choice?: ChatCompletionToolChoiceOption;
}

export interface Grok4Response {
  content: string;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// ToolCall type for extracting tool calls
export type ToolCall = {
  id: string;
  type: string;
  function: {
    name: string;
    arguments: string; // JSON string per OpenAI SDK
  };
};

// Add a type for deferred completion response
export interface DeferredCompletion {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<ChatCompletion.Choice>;
}

// CoinGecko API types
interface CoinGeckoPrice {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
    usd_market_cap: number;
    usd_24h_vol: number;
  };
}

export class Grok4Service {
  static async chatCompletion(request: Grok4Request): Promise<ChatCompletion> {
    try {
      // Add timeout to prevent hanging API calls
      const grok4Timeout = 25000; // 25 second timeout
      
      const completion = await Promise.race([
        client.chat.completions.create({
          model: "grok-4", // Fixed: use correct model name
          messages: request.messages,
          temperature: request.temperature || 0.7,
          max_tokens: request.max_tokens || 1000,
          ...(request.tools ? { tools: request.tools } : {}),
          ...(request.tool_choice ? { tool_choice: request.tool_choice } : {}),
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Grok4 API timeout')), grok4Timeout)
        )
      ]);
      
      return completion;
    } catch (error) {
      logger.error("Grok4 API error:", error);
      throw new Error(`Grok4 API error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  static extractToolCall(completion: ChatCompletion): ToolCall | null {
    // Returns the tool call object if present, else null
    const toolCall = completion.choices?.[0]?.message?.tool_calls?.[0];
    return toolCall || null;
  }

  static async generateResponseWithTools(
    userMessage: string,
    systemPrompt?: string,
    temperature: number = 0.7,
    tools?: ChatCompletionTool[],
    tool_choice?: ChatCompletionToolChoiceOption
  ): Promise<ChatCompletion> {
    const messages: ChatCompletionMessageParam[] = [];
    if (systemPrompt) {
      messages.push({
        role: "system",
        content: systemPrompt,
      });
    }
    messages.push({
      role: "user",
      content: userMessage,
    });
    return this.chatCompletion({
      messages,
      temperature,
      tools,
      tool_choice,
    });
  }

  static async pollDeferredCompletion(requestId: string, maxAttempts = 20, intervalMs = 1000): Promise<DeferredCompletion> {
    const url = `https://api.x.ai/v1/chat/deferred-completion/${requestId}`;
    for (let i = 0; i < maxAttempts; i++) {
      const res = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${env.XAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        return await res.json();
      }
      if (res.status !== 202) throw new Error('Unexpected status from deferred completion');
      await new Promise(r => setTimeout(r, intervalMs));
    }
    throw new Error('Deferred completion timed out');
  }
}

// Enhanced crypto price API using CoinGecko
export async function getCryptoPrice(query: string): Promise<string> {
  try {
    // Extract cryptocurrency name from query
    const cryptoMatch = query.toLowerCase().match(/(bitcoin|btc|ethereum|eth|cardano|ada|solana|sol|binance|bnb|ripple|xrp|polkadot|dot|chainlink|link|litecoin|ltc|bitcoin cash|bch|stellar|xlm|vechain|vet|filecoin|fil|tron|trx|avalanche|avax|polygon|matic|cosmos|atom|algorand|algo|monero|xmr|tezos|xtz|neo|dash|zcash|zec|decred|dcr|digibyte|dgb|ravencoin|rvn|groestlcoin|grs|vertcoin|vtc|namecoin|nmc|peercoin|ppc|novacoin|nvc|feathercoin|ftc|ixcoin|ixc|terra|luna|uniswap|uni|aave|sushi|curve|crv|yearn|yfi|compound|comp|maker|mkr|synthetix|snx|balancer|bal|1inch|pancakeswap|cake)/);
    
    if (!cryptoMatch) {
      return 'Please specify a cryptocurrency name (e.g., "bitcoin", "ethereum", "btc", "eth").';
    }

    const cryptoName = cryptoMatch[1];
    
    // Map common names to CoinGecko IDs
    const cryptoIdMap: { [key: string]: string } = {
      'bitcoin': 'bitcoin',
      'btc': 'bitcoin',
      'ethereum': 'ethereum',
      'eth': 'ethereum',
      'solana': 'solana',
      'sol': 'solana',
      'chainlink': 'chainlink',
      'link': 'chainlink',
      'uniswap': 'uniswap',
      'uni': 'uniswap',
      'aave': 'aave',
    };

    const coinId = cryptoIdMap[cryptoName];
    if (!coinId) {
      return `Cryptocurrency "${cryptoName}" not found. Please try a different name.`;
    }

    // Fetch price data from CoinGecko
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true`);
    
    if (!response.ok) {
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const data: CoinGeckoPrice = await response.json();
    const coinData = data[coinId];

    if (!coinData) {
      return `Price data not available for ${cryptoName}.`;
    }

    const price = coinData.usd;
    const change24h = coinData.usd_24h_change;
    const marketCap = coinData.usd_market_cap;
    const volume24h = coinData.usd_24h_vol;

    // Format the response
    const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 8
    }).format(price);

    const formattedChange = change24h ? `${change24h >= 0 ? '+' : ''}${change24h.toFixed(2)}%` : 'N/A';
    const formattedMarketCap = marketCap ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(marketCap) : 'N/A';
    const formattedVolume = volume24h ? new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(volume24h) : 'N/A';

    const changeColor = change24h >= 0 ? '🟢' : '🔴';
    
    return `${cryptoName.toUpperCase()} Price Data:
💰 Price: ${formattedPrice}
${changeColor} 24h Change: ${formattedChange}
📊 Market Cap: ${formattedMarketCap}
📈 24h Volume: ${formattedVolume}
⏰ Updated: ${new Date().toLocaleString()}`;

  } catch (error) {
    logger.error('Crypto price API error:', error);
    return `Failed to fetch crypto price data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Enhanced web search that prioritizes crypto price queries
export async function enhancedWebSearch(query: string): Promise<string> {
  // Check if this is a crypto price query
  const cryptoPricePattern = /(bitcoin|btc|ethereum|eth|cardano|ada|solana|sol|binance|bnb|ripple|xrp|polkadot|dot|chainlink|link|litecoin|ltc|bitcoin cash|bch|stellar|xlm|vechain|vet|filecoin|fil|tron|trx|avalanche|avax|polygon|matic|cosmos|atom|algorand|algo|monero|xmr|tezos|xtz|neo|dash|zcash|zec|decred|dcr|digibyte|dgb|ravencoin|rvn|groestlcoin|grs|vertcoin|vtc|namecoin|nmc|peercoin|ppc|novacoin|nvc|feathercoin|ftc|ixcoin|ixc|terra|luna|uniswap|uni|aave|sushi|curve|crv|yearn|yfi|compound|comp|maker|mkr|synthetix|snx|balancer|bal|1inch|pancakeswap|cake).*(price|value|worth|cost|market|trading)/i;
  if (cryptoPricePattern.test(query)) {
    return await getCryptoPrice(query);
  }

  // Generalized handling for travel/hotel/restaurant/surf queries (any location)
  const travelPattern = /(hotel|restaurant|dining|eat|surf|beach|stay|accommodation|where to eat|where to stay|where to surf)/i;
  if (travelPattern.test(query)) {
    const raw = await duckDuckGoSearch(query);
    return postProcessTravelResult(query, raw);
  }

  // Fallback to DuckDuckGo for non-crypto queries
  return await duckDuckGoSearch(query);
}

// Generalized post-processing for travel/hotel/restaurant/surf results (any location)
function postProcessTravelResult(query: string, raw: string): string {
  // Remove any mention of bitcoin, btc, crypto payment, Travala, crypto angle, or crypto nomad
  let result = raw.replace(/(bitcoin|btc|crypto( currency)?|pay in btc|accepts btc|accepts bitcoin|travala|crypto angle|crypto nomad|blockchain nomad|crypto-friendly|crypto friendly|open to bitcoin payments|open to crypto payments|book via travala|book via a crypto-friendly travel app|book via a crypto friendly travel app)/gi, '');

  // Remove any lines or sections containing 'bitcoin-friendly angle', 'crypto angle', 'bitcoin-friendly', 'crypto-friendly', etc.
  const forbiddenPhrases = [
    'bitcoin-friendly angle',
    'crypto angle',
    'bitcoin-friendly',
    'crypto-friendly',
    'bitcoin friendly',
    'crypto friendly',
    'btc payment',
    'accepts btc',
    'accepts bitcoin',
    'travala',
    'blockchain nomad',
    'crypto nomad',
    'open to bitcoin payments',
    'open to crypto payments',
    'book via travala',
    'book via a crypto-friendly travel app',
    'book via a crypto friendly travel app'
  ];
  result = result
    .split('\n')
    .filter(line => !forbiddenPhrases.some(phrase => line.toLowerCase().includes(phrase)))
    .join('\n');

  // Focus strictly on 5-star hotels
  if (/hotel|stay|accommodation/i.test(query)) {
    // Only extract lines with '5-star' (case-insensitive)
    const fiveStarPattern = /([\b5][- ]star\b.*?)(\.|\n|$)/gi;
    const matches = result.match(fiveStarPattern);
    if (matches && matches.length > 0) {
      result = `Top 5-star hotels:\n${matches.join('\n')}`;
    } else {
      result = 'No 5-star hotels found in the search result.';
    }
  }
  // Focus strictly on Michelin-starred restaurants
  if (/restaurant|dining|eat/i.test(query)) {
    // Only extract lines with 'Michelin-star' (case-insensitive, allow 'Michelin star' or 'Michelin-starred')
    const michelinPattern = /(Michelin[- ]star(?:red)?|Michelin star(?:red)?).*?(\.|\n|$)/gi;
    const matches = result.match(michelinPattern);
    if (matches && matches.length > 0) {
      result = `Michelin-starred restaurants:\n${matches.join('\n')}`;
    } else {
      result = 'No Michelin-starred restaurants found in the search result.';
    }
  }
  // Focus on surf spots
  if (/surf|beach/i.test(query)) {
    // List only well-known surf spots (keep generic for any location)
    // Optionally, could add a location-aware list here
    result = 'Top surf spots (check local guides for details).';
  }
  // Always remove any generic payment or crypto hallucination
  result = result.replace(/(accepts.*payment|pay with.*|crypto.*accepted)/gi, '');
  return result.trim();
}

/**
 * Fetches and summarizes sentiment/key points from a specific X (Twitter) post.
 * @param tweetUrl - The URL of the tweet to analyze
 * @returns A formatted string with key points, title, and tags
 */
export async function getXSentiment(input: string): Promise<string> {
  // Helper to check if input is a valid X/Twitter URL
  function isTweetUrl(str: string): boolean {
    return /^https?:\/\/(x|twitter)\.com\/.+\/status\/[0-9]+/i.test(str.trim());
  }

  if (!input || typeof input !== 'string') {
    return 'Please provide a topic or X (Twitter) post URL.';
  }

  // If input is a tweet URL, use the old logic
  if (isTweetUrl(input)) {
    try {
      const analysis = await TweetAnalyzer.analyzeTweet(input);
      let result = '';
      if (analysis.suggestedTitle) {
        result += `Title: ${analysis.suggestedTitle}\n`;
      }
      if (analysis.keyPoints && analysis.keyPoints.length > 0) {
        result += 'Key Points:\n';
        for (const point of analysis.keyPoints) {
          result += `- ${point}\n`;
        }
      }
      if (analysis.suggestedTags && analysis.suggestedTags.length > 0) {
        result += `Tags: ${analysis.suggestedTags.map(t => `#${t}`).join(' ')}\n`;
      }
      return result.trim() || 'No analysis available.';
    } catch (error) {
      if (error instanceof Error) {
        return `Failed to analyze X post: ${error.message}`;
      }
      return 'Failed to analyze X post.';
    }
  }

  // Otherwise, treat input as a topic: search X/Twitter for top tweets and synthesize alpha
  try {
    // Use DuckDuckGo to search X for the topic (e.g., site:x.com <topic>)
    const query = `site:x.com ${input}`;
    const raw = await duckDuckGoSearch(query);
    // Extract snippets/lines that look like tweet content
    const lines = raw.split('\n').filter(l => l.length > 40 && !l.startsWith('Title:') && !l.startsWith('URL:'));
    // Synthesize a narrative summary
    let summary = '';
    if (lines.length === 0) {
      summary = `No recent X/Twitter alpha found for "${input}". Try a more specific topic or check X directly.`;
    } else {
      // Pick up to 3 of the most relevant lines
      const topLines = lines.slice(0, 3);
      summary = `Here's the latest X/Twitter alpha on "${input}":\n`;
      topLines.forEach(line => {
        summary += `- ${line.trim()}\n`;
      });
      summary += '\n(Summarized from top X/Twitter results. For more, check X directly.)';
    }
    return summary.trim();
  } catch {
    return `Failed to fetch X/Twitter sentiment for topic: ${input}`;
  }
}

// Simple DuckDuckGo web search utility (kept for non-crypto queries)
export async function duckDuckGoSearch(query: string): Promise<string> {
  try {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&no_html=1`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('DuckDuckGo API error');
    const data = await res.json();
    // Prefer Abstract, then RelatedTopics, then fallback
    let title = data.Heading || '';
    let snippet = data.AbstractText || '';
    let link = data.AbstractURL || '';
    if (!snippet && Array.isArray(data.RelatedTopics) && data.RelatedTopics.length > 0) {
      const topic = data.RelatedTopics[0];
      if (typeof topic.Text === 'string') snippet = topic.Text;
      if (topic.FirstURL) link = topic.FirstURL;
      if (topic.Name) title = topic.Name;
      if (topic.Topics && topic.Topics[0]) {
        if (topic.Topics[0].Text) snippet = topic.Topics[0].Text;
        if (topic.Topics[0].FirstURL) link = topic.Topics[0].FirstURL;
        if (topic.Topics[0].Name) title = topic.Topics[0].Name;
      }
    }
    // Fallbacks
    if (!snippet && data.Answer) snippet = data.Answer;
    if (!title && query) title = query;
    // Format result
    let result = '';
    if (title) result += `Title: ${title}\n`;
    if (snippet) result += `Snippet: ${snippet}\n`;
    if (link) result += `URL: ${link}`;
    if (!result) result = 'No relevant web search results found.';
    return result.trim();
  } catch {
    return 'Web search failed.';
  }
}
