import { getCryptoPrice } from '@/app/api/grok4/grok4';
import { logger } from '@/lib/logger';

// Enhanced Crypto Price Function with Satoshi Context
export async function getCryptoPriceWithSatoshiContext(query: string): Promise<string> {
  try {
    const priceData = await getCryptoPrice(query);
    
    // Add Satoshi-style commentary based on the cryptocurrency
    const satoshiCommentary = generateSatoshiCommentary(query);
    
    return priceData + satoshiCommentary;
  } catch (error) {
    logger.error('Enhanced crypto price error:', error);
    return `Failed to fetch enhanced crypto price data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Generate Satoshi-style commentary based on the cryptocurrency
function generateSatoshiCommentary(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('bitcoin') || lowerQuery.includes('btc')) {
    return `
    
🔍 **Satoshi's Take:**
Bitcoin is not just digital gold—it's the first truly scarce digital asset. Every sat represents energy converted to value through proof-of-work. The network effect grows stronger with each halving cycle.

💡 **Key Insight:** Bitcoin's value proposition is mathematical certainty, not speculation. The protocol is the ultimate truth machine.

🎯 **Satoshi's Rule:** "The root problem with conventional currency is all the trust that's required to make it work."`;
  } else if (lowerQuery.includes('ethereum') || lowerQuery.includes('eth')) {
    return `
    
🔍 **Satoshi's Take:**
Ethereum is an experiment in programmable money. While it expands Bitcoin's vision, it also introduces complexity and centralization risks. Smart contracts are powerful, but they're not Bitcoin.

💡 **Key Insight:** Evaluate this against Bitcoin's fundamentals and network effects. Remember: Bitcoin is the base layer.

🎯 **Satoshi's Question:** "Would this survive a 51% attack?"`;
  } else if (lowerQuery.includes('solana') || lowerQuery.includes('sol')) {
    return `
    
🔍 **Satoshi's Take:**
Solana represents the speed vs. decentralization trade-off. High throughput comes at the cost of network decentralization. Bitcoin prioritizes security over speed.

💡 **Key Insight:** This altcoin exists in Bitcoin's shadow. Remember: Bitcoin is the base layer, everything else is an experiment in permissionless innovation.

🎯 **Satoshi's Framework:** "Trustless systems" vs. trusted validators.`;
  } else if (lowerQuery.includes('aave') || lowerQuery.includes('uni') || lowerQuery.includes('mkr')) {
    return `
    
🔍 **Satoshi's Take:**
DeFi protocols are experiments in permissionless finance. They build on Bitcoin's foundation but introduce new attack vectors. The innovation is real, but so are the risks.

💡 **Key Insight:** These are applications, not money. Bitcoin remains the sovereign base layer.

🎯 **Satoshi's Principle:** "What is needed is an electronic payment system based on cryptographic proof instead of trust."`;
  } else {
    // Generic altcoin commentary
    return `
    
🔍 **Satoshi's Take:**
This altcoin exists in Bitcoin's shadow. Remember: Bitcoin is the base layer, everything else is an experiment in permissionless innovation.

💡 **Key Insight:** Evaluate this against Bitcoin's fundamentals and network effects. The signal-to-noise ratio improves with time.

🎯 **Satoshi's Rule:** "If you don't believe it or don't get it, I don't have time to try to convince you, sorry."`;
  }
}

// Enhanced X Sentiment with Satoshi Analysis
export async function getXSentimentWithSatoshiAnalysis(input: string): Promise<string> {
  try {
    // Import the existing getXSentiment function
    const { getXSentiment } = await import('@/app/api/grok4/grok4');
    const sentimentData = await getXSentiment(input);
    
    // Add Satoshi-style narrative analysis
    const satoshiAnalysis = generateSatoshiSentimentAnalysis(input);
    
    return sentimentData + satoshiAnalysis;
  } catch (error) {
    logger.error('Enhanced X sentiment error:', error);
    return `Failed to fetch enhanced X sentiment: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

// Generate Satoshi-style sentiment analysis
function generateSatoshiSentimentAnalysis(input: string): string {
  const lowerInput = input.toLowerCase();
  
  if (lowerInput.includes('bitcoin') || lowerInput.includes('btc')) {
    return `
    
🎯 **Satoshi's Narrative Analysis:**
Bitcoin narratives emerge from network effects and mathematical certainty, not marketing. The signal-to-noise ratio improves with time.

🔍 **Key Question:** Does this sentiment reflect fundamentals or FOMO?
💡 **Satoshi's Rule:** "If you don't believe it or don't get it, I don't have time to try to convince you, sorry."

🎯 **Satoshi's Framework:** Bitcoin is the permanent ghost in the system—the philosopher-engineer who gave the world its exit.`;
  } else if (lowerInput.includes('ethereum') || lowerInput.includes('eth')) {
    return `
    
🎯 **Satoshi's Narrative Analysis:**
Ethereum sentiment often reflects speculation cycles. Bitcoin remains the anchor of digital scarcity.

🔍 **Key Question:** Does this sentiment reflect fundamentals or FOMO?
💡 **Satoshi's Perspective:** Smart contracts are powerful, but they're not Bitcoin.

🎯 **Satoshi's Framework:** Evaluate against Bitcoin's fundamentals and network effects.`;
  } else {
    return `
    
🎯 **Satoshi's Narrative Analysis:**
Altcoin sentiment often reflects speculation cycles. Bitcoin remains the anchor of digital scarcity.

🔍 **Key Question:** Does this sentiment reflect fundamentals or FOMO?
💡 **Satoshi's Rule:** "If you don't believe it or don't get it, I don't have time to try to convince you, sorry."

🎯 **Satoshi's Framework:** Bitcoin is the base layer, everything else is an experiment.`;
  }
}

// Enhanced market data with Satoshi perspective
export async function getMarketDataWithSatoshiContext(): Promise<string> {
  try {
    // This would integrate with your existing market data services
    const marketData = `
📊 **Current Market Data:**
- Bitcoin dominance: 52.3%
- Total crypto market cap: $2.1T
- Fear & Greed Index: 65 (Greed)
- Bitcoin network hash rate: 650 EH/s`;

    const satoshiContext = `
    
🔍 **Satoshi's Market Analysis:**
Bitcoin's network effects grow stronger with each halving cycle. The hash rate represents real energy converted to security.

💡 **Key Insight:** Bitcoin's value proposition is mathematical certainty, not speculation. The protocol is the ultimate truth machine.

🎯 **Satoshi's Framework:** "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."

⚡ **Satoshi's Rule:** Bitcoin rewards patience. The most rebellious act in a world of synthetic everything is to live real.`;

    return marketData + satoshiContext;
  } catch (error) {
    logger.error('Enhanced market data error:', error);
    return `Failed to fetch enhanced market data: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
} 