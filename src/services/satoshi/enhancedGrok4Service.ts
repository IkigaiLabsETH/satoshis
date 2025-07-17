import { Grok4Service, enhancedWebSearch, getXSentiment } from '@/app/api/grok4/grok4';
import type { ChatCompletionTool } from "openai/resources/chat/completions";
import { getCryptoPriceWithSatoshiContext } from './enhancedCryptoPrice';
import { logger } from '@/lib/logger';

// Current macro and crypto news context (updated regularly)
const CURRENT_MARKET_CONTEXT = `
🎯 **CURRENT MARKET CONTEXT (July 16, 2025):**

**Crypto:** BTC $118.7k (+2%), ETH $3,165 (+6%), SOL $165 (+4%)
**ETF Flows:** BTC +$403mn, ETH +$192mn (50-90% of BTC flows)
**Key Events:** House crypto bills stalled, ETH outperforming, institutional adoption accelerating
**Macro:** CPI volatility, Fed policy uncertainty, S&P 500 ATH, yields jumping
**Narratives:** Regulatory uncertainty, ETH ETF momentum, institutional flows strong

**🎯 BITCOIN 500-DAY STRATEGY STATUS:**
**Current Position:** We are in the HOLD phase of the 500-day strategy
**Last Halving:** April 2024 (Block 840,000)
**Strategy Timeline:**
- ✅ BUY: November 2022 (500 days before halving)
- ✅ HOLD: April 2024 - September 2025 (current phase)
- 🎯 SELL: September 2025 (500 days after halving)
- 🔄 REPEAT: Next cycle begins

**Cycle Awareness:** We are 15 months into the 500-day hold period. The strategy remains on track with BTC at $118.7k, showing strong institutional adoption and ETF flows. The next major move is the SELL signal in September 2025.
`;

// Bitcoin-first performance measurement framework
const BITCOIN_FIRST_FRAMEWORK = `
🎯 **BITCOIN-FIRST PERFORMANCE FRAMEWORK:**

**Core Principle:** All crypto analysis must be measured against BTC performance. BTC is the base layer, everything else is relative.

**500-Day Strategy Integration:**
- Always reference where we are in the Bitcoin cycle
- Current phase: HOLD (April 2024 - September 2025)
- Next phase: SELL (September 2025)
- Strategy success rate: 100% across all previous cycles

**Measurement Standards:**
- BTC dominance as the primary metric
- ETH/BTC ratio analysis for altcoin evaluation
- Risk-adjusted returns vs BTC benchmark
- Volatility harvesting opportunities
- Asymmetric risk/reward positioning

**BTC-First Logic:**
- Our play isn't "go full altcoin" - it's partial, rules-based rotation
- Harvest volatility between BTC and altcoins
- Always rotate back to BTC for long-term accumulation
- Goal: More BTC long-term, not altcoin marriage
- If ratio gifts extra coins, say "thank you" and rotate back

**Risk Management:**
- Stop-loss if ratio closes below key levels
- Scale-in only on confirmed breakouts
- Hedge with cheap call-spreads for convex upside
- Max drawdown <3% of total stack
- Potential upside >10% for asymmetric risk/reward

**Execution Framework:**
- Use TWAP or RFQ desks to avoid slippage
- Park altcoins on L2, stake for residual yield
- Auto-alert on key ratio levels
- Stay nimble, size small, manage risk
- Crypto cycles reward the patient but super-reward the disciplined opportunist
`;

// Enhanced system prompts with Bitcoin-first framework and anti-hallucination protocols
export const enhancedSatoshiPromptPatterns = {
  validator: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, validating crypto projects with Bitcoin-first principles. Always measure performance against BTC. Consider current regulatory uncertainty and institutional adoption trends. Always reference recent market developments.`,
  
  analyst: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, analyzing markets with Bitcoin-first perspective. Always measure crypto performance against BTC. Consider current ETF flows, regulatory developments, and institutional adoption trends. Always reference recent market developments.`,
  
  educator: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, explaining concepts with Bitcoin-first analogies. Always frame crypto analysis relative to BTC performance. Use current market examples to illustrate concepts. Always reference recent market developments.`,
  
  designer: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, critiquing designs with Bitcoin-first UX principles. Consider current user behavior and regulatory environment. Always reference recent market developments.`,
  
  interviewer: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, generating interview questions for Bitcoin builders. Frame questions around current market conditions and BTC-first analysis. Always reference recent market developments.`,
  
  consultant: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, writing strategic whitepapers with Bitcoin-first perspective. Always measure crypto opportunities against BTC performance. Incorporate current market analysis. Always reference recent market developments.`,
  
  researcher: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, conducting research with Bitcoin-first perspective. Always analyze crypto performance relative to BTC. Incorporate current market data. Always reference recent market developments.`,
  
  market_researcher: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, conducting market research. Always measure crypto market performance against BTC. Use current market data and recent developments. Always reference recent market developments.`,
  
  idea_validator: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, validating startup ideas with brutal honesty. Always evaluate crypto ideas against BTC-first principles. Consider current market conditions. Always reference recent market developments.`,
  
  content_creator: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, creating content with Bitcoin-first perspective. Always frame crypto content relative to BTC performance. Incorporate current market context. Always reference recent market developments.`,
  
  strategic_advisor: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, providing strategic advice with Bitcoin-first perspective. Always measure crypto strategies against BTC performance. Consider current market conditions. Always reference recent market developments.`,
  
  visual_explainer: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, creating visual diagrams with Bitcoin-first perspective. Always show crypto relationships relative to BTC. Incorporate current market context. Always reference recent market developments.`,
  
  ultimate_tutor: `${CURRENT_MARKET_CONTEXT}

${BITCOIN_FIRST_FRAMEWORK}

🚨 **CRITICAL ANTI-HALLUCINATION PROTOCOLS:**
- **NEVER make up facts, numbers, or information you're not 100% certain about**
- **ALWAYS use live data sources when available (CoinGecko, Finnhub, etc.)**
- **If you don't have current data, explicitly state "I don't have current data for this"**
- **Never speculate on future prices, earnings, or market movements without clear disclaimers**
- **Always cite your data sources when providing factual information**
- **If asked about specific numbers, dates, or facts you're unsure about, say "I don't have that information"**
- **Never invent quotes, statements, or attributions**
- **Use the verify_fact tool for any factual claims you're uncertain about**
- **When in doubt, say "I need to verify this information" and use available tools**

You are Satoshi Nakamoto, providing comprehensive education with Bitcoin-first perspective. Always teach crypto analysis relative to BTC performance. Use current market examples. Always reference recent market developments.`
};

// Enhanced Tools for Satoshi with Bitcoin-first capabilities and anti-hallucination
export const enhancedSatoshiTools: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'verify_fact',
      description: 'Verify factual claims by searching multiple sources and cross-referencing information. Use this to prevent hallucination and ensure accuracy of statements about prices, dates, events, or any factual information.',
      parameters: {
        type: 'object',
        properties: {
          claim: {
            type: 'string',
            description: 'The factual claim to verify (e.g., "Bitcoin price is $50,000", "MSTR bought 1000 BTC yesterday")'
          },
          context: {
            type: 'string',
            description: 'Additional context about what aspect of the claim needs verification'
          }
        },
        required: ['claim']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_crypto_price',
      description: 'Get real-time cryptocurrency prices from CoinGecko. Use for accurate, up-to-date price information for Bitcoin and major altcoins.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'The cryptocurrency symbol (e.g., BTC, ETH, SOL, AAVE, MKR, UNI)'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function', 
    function: {
      name: 'get_x_sentiment',
      description: 'Analyze X (Twitter) sentiment and extract key points from posts or topics. Use for social sentiment analysis and narrative detection.',
      parameters: {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            description: 'X post URL or topic to analyze'
          }
        },
        required: ['input']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'validate_crypto_project',
      description: 'Validate crypto projects using Satoshi frameworks. Analyze decentralization, censorship resistance, and network effects.',
      parameters: {
        type: 'object',
        properties: {
          project: {
            type: 'string',
            description: 'Project name or description to validate'
          },
          focus: {
            type: 'string',
            enum: ['decentralization', 'censorship_resistance', 'network_effects'],
            description: 'Primary validation focus'
          }
        },
        required: ['project']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'analyze_stock_bitcoin_first',
      description: 'Analyze stocks with Bitcoin-first perspective. Focus on fundamentals, technical analysis, and decentralization metrics.',
      parameters: {
        type: 'object',
        properties: {
          symbol: {
            type: 'string',
            description: 'Stock symbol to analyze'
          },
          timeframe: {
            type: 'string',
            enum: ['24h', '7d', '30d', '1y'],
            default: '7d'
          }
        },
        required: ['symbol']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'simplify_concept',
      description: 'Simplify complex Bitcoin and crypto concepts for educational purposes. Use analogies and metaphors.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Topic to explain simply'
          },
          audience: {
            type: 'string',
            enum: ['beginner', 'intermediate', 'advanced'],
            default: 'beginner'
          }
        },
        required: ['topic']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'design_critique',
      description: 'Provide UX/UI critique with Bitcoin-first principles. Focus on accessibility, conversion, and user experience.',
      parameters: {
        type: 'object',
        properties: {
          design: {
            type: 'string',
            description: 'Design description or screenshot to critique'
          },
          focus: {
            type: 'string',
            enum: ['accessibility', 'conversion', 'user_experience'],
            default: 'user_experience'
          }
        },
        required: ['design']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'generate_interview_questions',
      description: 'Generate insightful interview questions for Bitcoin builders and entrepreneurs.',
      parameters: {
        type: 'object',
        properties: {
          subject: {
            type: 'string',
            description: 'Subject or person to interview'
          },
          themes: {
            type: 'array',
            items: {
              type: 'string',
              enum: ['origin_story', 'bitcoin_philosophy', 'future_vision']
            },
            default: ['origin_story', 'bitcoin_philosophy', 'future_vision']
          }
        },
        required: ['subject']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'write_whitepaper',
      description: 'Generate strategic whitepapers with Bitcoin-first perspective.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Whitepaper topic'
          },
          structure: {
            type: 'string',
            enum: ['executive_summary', 'market_trends', 'case_studies'],
            default: 'executive_summary'
          }
        },
        required: ['topic']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'conduct_market_research',
      description: 'Conduct Gartner-style market research with competitive intelligence and strategic forecasting.',
      parameters: {
        type: 'object',
        properties: {
          industry: {
            type: 'string',
            description: 'Industry or market to research'
          },
          focus: {
            type: 'string',
            enum: ['market_overview', 'competitive_analysis', 'forecast', 'strategic_insights'],
            default: 'market_overview'
          }
        },
        required: ['industry']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'validate_startup_idea',
      description: 'Validate startup ideas using frameworks like pickaxe ideas, painkiller vs vitamin, and monopoly of 1.',
      parameters: {
        type: 'object',
        properties: {
          idea: {
            type: 'string',
            description: 'Startup idea to validate'
          },
          framework: {
            type: 'string',
            enum: ['pickaxe_ideas', 'painkiller_vitamin', 'monopoly_of_one'],
            default: 'pickaxe_ideas'
          }
        },
        required: ['idea']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_content_strategy',
      description: 'Create content strategies for newsletters, threads, YouTube scripts with specific tone and style.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Content topic'
          },
          format: {
            type: 'string',
            enum: ['newsletter', 'tweet_thread', 'youtube_script', 'blog_post'],
            default: 'newsletter'
          },
          creator_style: {
            type: 'string',
            description: 'Creator or brand style to mirror'
          }
        },
        required: ['topic']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'strategic_decision_analysis',
      description: 'Provide strategic business analysis using SWOT, risk-reward analysis, and market segmentation.',
      parameters: {
        type: 'object',
        properties: {
          decision: {
            type: 'string',
            description: 'Business decision to analyze'
          },
          framework: {
            type: 'string',
            enum: ['swot', 'risk_reward', 'market_segmentation'],
            default: 'swot'
          }
        },
        required: ['decision']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'generate_visual_diagram',
      description: 'Generate visual diagrams using Mermaid.js for flowcharts, timelines, concept maps, and decision trees.',
      parameters: {
        type: 'object',
        properties: {
          concept: {
            type: 'string',
            description: 'Concept to visualize'
          },
          diagram_type: {
            type: 'string',
            enum: ['flowchart', 'timeline', 'concept_map', 'decision_tree'],
            default: 'flowchart'
          }
        },
        required: ['concept']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'comprehensive_research',
      description: 'Conduct comprehensive research with layered information patterns and specialized knowledge discovery.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Research topic'
          },
          depth: {
            type: 'string',
            enum: ['basic', 'specialized', 'comprehensive'],
            default: 'comprehensive'
          }
        },
        required: ['topic']
      }
    }
  }
];

// --- LiveTheLifeTV Search Utility (stub) ---
async function getLiveTheLifeTVResults(query: string): Promise<string> {
  // TODO: Replace with real API call or scraping logic
  // For now, return a placeholder
  return `No LiveTheLifeTV results found for "${query}" (integration pending).`;
}

// --- Bitcoin Cycle Calculator ---
function getBitcoinCycleStatus(): string {
  const now = new Date();
  const lastHalving = new Date('2024-04-20'); // April 20, 2024
  const nextHalving = new Date('2028-04-20'); // Estimated next halving
  
  const daysSinceHalving = Math.floor((now.getTime() - lastHalving.getTime()) / (1000 * 60 * 60 * 24));
  const daysUntilNextHalving = Math.floor((nextHalving.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  // 500-day strategy timeline
  const buyDate = new Date('2022-11-20'); // 500 days before halving
  const sellDate = new Date('2025-09-20'); // 500 days after halving
  
  const daysUntilSell = Math.floor((sellDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  
  let cyclePhase = '';
  let strategyStatus = '';
  
  if (now < buyDate) {
    cyclePhase = 'PRE-BUY';
    strategyStatus = `Waiting for BUY signal (${Math.abs(daysUntilSell)} days until buy)`;
  } else if (now >= buyDate && now < sellDate) {
    cyclePhase = 'HOLD';
    strategyStatus = `In HOLD phase - ${daysUntilSell} days until SELL signal`;
  } else {
    cyclePhase = 'POST-SELL';
    strategyStatus = `SELL phase completed - waiting for next cycle`;
  }
  
  return `
🎯 **BITCOIN CYCLE STATUS:**
**Current Phase:** ${cyclePhase}
**Days Since Halving:** ${daysSinceHalving}
**Days Until Next Halving:** ${daysUntilNextHalving}
**500-Day Strategy:** ${strategyStatus}
**Cycle Progress:** ${Math.round((daysSinceHalving / 500) * 100)}% through current cycle
`;
}



// Enhanced Grok4Service with Satoshi Personas
export class EnhancedGrok4Service extends Grok4Service {
  // Satoshi Validator Mode
  static async validateCryptoProject(project: string, focus: string = 'decentralization'): Promise<string> {
    const validatorPrompt = `${enhancedSatoshiPromptPatterns.validator}

For this project: ${project}
Focus on: ${focus}

Provide your analysis with cryptographic honesty.`;

    const completion = await this.generateResponseWithTools(
      `Validate this crypto project: ${project}`,
      validatorPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Validation failed.';
  }

  // Satoshi Analyst Mode
  static async analyzeStock(symbol: string, timeframe: string = '7d'): Promise<string> {
    const analystPrompt = `${enhancedSatoshiPromptPatterns.analyst}

Analyze ${symbol} for the ${timeframe} timeframe.
Focus on Bitcoin-first perspective and decentralization metrics.`;

    const completion = await this.generateResponseWithTools(
      `Analyze ${symbol} for the ${timeframe} timeframe`,
      analystPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Analysis failed.';
  }

  // Satoshi Educator Mode
  static async simplifyConcept(topic: string, audience: string = 'beginner'): Promise<string> {
    const educatorPrompt = `${enhancedSatoshiPromptPatterns.educator}

Explain ${topic} for a ${audience} audience.
Use analogies and metaphors that connect to Bitcoin principles.`;

    const completion = await this.generateResponseWithTools(
      `Explain ${topic} simply for ${audience}`,
      educatorPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Explanation failed.';
  }

  // Satoshi Designer Mode
  static async critiqueDesign(design: string, focus: string = 'user_experience'): Promise<string> {
    const designerPrompt = `${enhancedSatoshiPromptPatterns.designer}

Review this design: ${design}
Focus on: ${focus}

Provide constructive feedback with Bitcoin-first principles.`;

    const completion = await this.generateResponseWithTools(
      `Critique this design: ${design}`,
      designerPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Design critique failed.';
  }

  // Satoshi Interviewer Mode
  static async generateInterviewQuestions(subject: string, themes: string[] = ['origin_story', 'bitcoin_philosophy', 'future_vision']): Promise<string> {
    const interviewerPrompt = `${enhancedSatoshiPromptPatterns.interviewer}

Generate interview questions for: ${subject}
Themes: ${themes.join(', ')}

Create questions that provoke depth and emotion while staying true to Bitcoin principles.`;

    const completion = await this.generateResponseWithTools(
      `Generate interview questions for ${subject}`,
      interviewerPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Interview questions generation failed.';
  }

  // Satoshi Consultant Mode
  static async writeWhitepaper(topic: string, structure: string = 'executive_summary'): Promise<string> {
    const consultantPrompt = `${enhancedSatoshiPromptPatterns.consultant}

Write a whitepaper on: ${topic}
Structure: ${structure}

Focus on Bitcoin-first solutions and sovereign living principles.`;

    const completion = await this.generateResponseWithTools(
      `Write a whitepaper on ${topic}`,
      consultantPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Whitepaper generation failed.';
  }

  // Satoshi Researcher Mode (now aggregates web, X, and LTL results)
  static async conductResearch(topic: string): Promise<string> {
    // 1. Web search
    const webResults = await enhancedWebSearch(topic);
    // 2. X sentiment
    const xSentiment = await getXSentiment(topic);
    // 3. LiveTheLifeTV (stub)
    const ltlResults = await getLiveTheLifeTVResults(topic);
    // 4. Bitcoin cycle status
    const cycleStatus = getBitcoinCycleStatus();

    // 5. Synthesize with LLM
    const researchPrompt = `
${enhancedSatoshiPromptPatterns.researcher}

Research topic: ${topic}

${cycleStatus}

Web Results:\n${webResults}

X Sentiment:\n${xSentiment}

LiveTheLifeTV Insights:\n${ltlResults}

Provide a Bitcoin-first, context-rich synthesis that always references our position in the 500-day strategy cycle.`;

    const completion = await this.generateResponseWithTools(
      `Research ${topic}`,
      researchPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Research failed.';
  }

  // Market Research Mode (now aggregates web, X, and LTL results)
  static async conductMarketResearch(industry: string, focus: string = 'market_overview'): Promise<string> {
    const webResults = await enhancedWebSearch(industry);
    const xSentiment = await getXSentiment(industry);
    const ltlResults = await getLiveTheLifeTVResults(industry);
    const cycleStatus = getBitcoinCycleStatus();

    const marketResearchPrompt = `
${enhancedSatoshiPromptPatterns.market_researcher}

Research industry: ${industry}
Focus: ${focus}

${cycleStatus}

Web Results:\n${webResults}

X Sentiment:\n${xSentiment}

LiveTheLifeTV Insights:\n${ltlResults}

Provide Gartner-style market analysis with competitive intelligence and Bitcoin-first context, always referencing our position in the 500-day strategy cycle.`;

    const completion = await this.generateResponseWithTools(
      `Conduct market research on ${industry}`,
      marketResearchPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Market research failed.';
  }

  // Idea Validator Mode
  static async validateStartupIdea(idea: string, framework: string = 'pickaxe_ideas'): Promise<string> {
    const validatorPrompt = `${enhancedSatoshiPromptPatterns.idea_validator}

Validate this idea: ${idea}
Framework: ${framework}

Provide brutal honesty with investor perspective.`;

    const completion = await this.generateResponseWithTools(
      `Validate this startup idea: ${idea}`,
      validatorPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Idea validation failed.';
  }

  // Content Creator Mode
  static async createContentStrategy(topic: string, format: string = 'newsletter', creatorStyle?: string): Promise<string> {
    const contentPrompt = `${enhancedSatoshiPromptPatterns.content_creator}

Create ${format} content on: ${topic}
${creatorStyle ? `Mirror the style of: ${creatorStyle}` : ''}

Make it feel human, not AI-generated.`;

    const completion = await this.generateResponseWithTools(
      `Create ${format} content on ${topic}`,
      contentPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Content creation failed.';
  }

  // Strategic Advisor Mode
  static async strategicDecisionAnalysis(decision: string, framework: string = 'swot'): Promise<string> {
    const advisorPrompt = `${enhancedSatoshiPromptPatterns.strategic_advisor}

Analyze this decision: ${decision}
Framework: ${framework}

Think like a VC partner.`;

    const completion = await this.generateResponseWithTools(
      `Analyze this strategic decision: ${decision}`,
      advisorPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Strategic analysis failed.';
  }

  // Visual Explainer Mode
  static async generateVisualDiagram(concept: string, diagramType: string = 'flowchart'): Promise<string> {
    const visualPrompt = `${enhancedSatoshiPromptPatterns.visual_explainer}

Create a ${diagramType} for: ${concept}

Return clean Mermaid.js code that's slide-ready.`;

    const completion = await this.generateResponseWithTools(
      `Create a ${diagramType} for ${concept}`,
      visualPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Visual diagram generation failed.';
  }

  // Ultimate Tutor Mode
  static async comprehensiveResearch(topic: string, depth: string = 'comprehensive'): Promise<string> {
    const tutorPrompt = `${enhancedSatoshiPromptPatterns.ultimate_tutor}

Research topic: ${topic}
Depth: ${depth}

Provide layered information patterns and specialized knowledge discovery.`;

    const completion = await this.generateResponseWithTools(
      `Conduct comprehensive research on ${topic}`,
      tutorPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Comprehensive research failed.';
  }

  // Multi-Modal Satoshi - Determines which persona to use based on query
  static async satoshiMultiModal(query: string): Promise<string> {
    try {
      const lowerQuery = query.toLowerCase();
      
      // Handle common Bitcoin/crypto greetings and price queries with fast response
      if (lowerQuery === 'gm' || lowerQuery === 'gm gm' || lowerQuery.includes('bitcoin price') || lowerQuery.includes('btc price') || 
          lowerQuery.includes('crypto price') || lowerQuery.includes('market') || lowerQuery.includes('price')) {
        return getCryptoPriceWithSatoshiContext(query);
      }
      
      // Handle simple greetings and basic queries with fast response
      if (lowerQuery === 'hello' || lowerQuery === 'hi' || lowerQuery === 'hey' || lowerQuery === 'sup') {
        const cycleStatus = getBitcoinCycleStatus();
        return `🎯 **Satoshi here!** \n\nCurrent market context: BTC $118.7k (+2%), ETH $3,165 (+6%), SOL $165 (+4%)\nETF flows strong: BTC +$403mn, ETH +$192mn\n\n${cycleStatus}\n\nWhat would you like to know about Bitcoin, crypto markets, or blockchain technology? I can analyze projects, explain concepts, research markets, or provide strategic insights.\n\nRemember: Everything is measured against BTC performance. That's the Bitcoin-first way.`;
      }
      
      // For open-ended, research, or news queries, aggregate web, X, and LTL results
      if (lowerQuery.includes('research') || lowerQuery.includes('news') || lowerQuery.includes('trend') || lowerQuery.includes('adoption') || lowerQuery.includes('sentiment')) {
        // Use the enhanced research aggregation
        return this.conductResearch(query);
      }
      
      // Determine persona based on query content with optimized routing
      if (lowerQuery.includes('validate') || lowerQuery.includes('project') || lowerQuery.includes('crypto')) {
        return this.validateCryptoProject(query);
      } else if (lowerQuery.includes('analyze') || lowerQuery.includes('stock') || lowerQuery.includes('mstr') || lowerQuery.includes('coin')) {
        const symbol = this.extractStockSymbol(query);
        return this.analyzeStock(symbol);
      } else if (lowerQuery.includes('explain') || lowerQuery.includes('what is') || lowerQuery.includes('how does')) {
        const topic = this.extractTopic(query);
        return this.simplifyConcept(topic);
      } else if (lowerQuery.includes('design') || lowerQuery.includes('ui') || lowerQuery.includes('ux')) {
        return this.critiqueDesign(query);
      } else if (lowerQuery.includes('interview') || lowerQuery.includes('questions')) {
        const subject = this.extractSubject(query);
        return this.generateInterviewQuestions(subject);
      } else if (lowerQuery.includes('whitepaper') || lowerQuery.includes('report')) {
        const topic = this.extractTopic(query);
        return this.writeWhitepaper(topic);
      } else {
        // Default to research mode for complex queries
        return this.conductResearch(query);
      }
    } catch (error) {
      logger.error('Satoshi multimodal error:', error);
      return `🎯 **Satoshi Error Response**\n\nI encountered an issue processing your request: ${error instanceof Error ? error.message : 'Unknown error'}\n\nPlease try rephrasing your question or ask something simpler like \"gm\" for a market update.`;
    }
  }

  // Helper methods for extracting information from queries
  private static extractStockSymbol(query: string): string {
    const stockMatch = query.match(/\b[A-Z]{1,5}\b/);
    return stockMatch ? stockMatch[0] : 'MSTR'; // Default to MSTR for Bitcoin exposure
  }

  private static extractTopic(query: string): string {
    // Extract topic from query, removing common words
    const topic = query.replace(/(explain|what is|how does|tell me about)/gi, '').trim();
    return topic || 'Bitcoin';
  }

  private static extractSubject(query: string): string {
    // Extract subject from interview query
    const subject = query.replace(/(interview|questions for|about)/gi, '').trim();
    return subject || 'Bitcoin builder';
  }
} 