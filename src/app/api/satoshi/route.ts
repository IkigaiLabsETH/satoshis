import { NextRequest, NextResponse } from 'next/server';
import { EnhancedGrok4Service, enhancedSatoshiTools, enhancedSatoshiPromptPatterns } from '@/services/satoshi/enhancedGrok4Service';
import { getCryptoPriceWithSatoshiContext, getXSentimentWithSatoshiAnalysis, getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { logger } from '@/lib/logger';
import { enhancedWebSearch } from '@/app/api/grok4/grok4';

// Fact verification function for Satoshi
async function verifyFact(claim: string, context?: string): Promise<string> {
  try {
    logger.info('Satoshi verifying fact:', { claim, context });
    
    // Extract key information from the claim
    const claimLower = claim.toLowerCase();
    
    // Check for price-related claims
    const pricePattern = /(\$[\d,]+\.?\d*)/g;
    const priceMatches = claim.match(pricePattern);
    
    // Check for cryptocurrency/stock symbols
    const cryptoPattern = /\b(btc|eth|sol|aave|mkr|uni|link|avax|doge|pepe|wif|bonk)\b/gi;
    const stockPattern = /\b(mstr|coin|hood|nvda|tsla|aapl|msft|googl|amzn|meta)\b/gi;
    const cryptoMatches = claim.match(cryptoPattern);
    const stockMatches = claim.match(stockPattern);
    
    const priceVerifications = [];
    
    // Verify prices if mentioned
    if (priceMatches && (cryptoMatches || stockMatches)) {
      const symbols = [...(cryptoMatches || []), ...(stockMatches || [])];
      for (const symbol of symbols.slice(0, 3)) { // Limit to 3 symbols
        try {
          if (cryptoMatches?.includes(symbol.toLowerCase())) {
            // Verify crypto price with timeout
            const response = await Promise.race([
              fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${symbol.toLowerCase()}&vs_currencies=usd`),
              new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]);
            
            if (response.ok) {
              const data = await response.json();
              const currentPrice = data[symbol.toLowerCase()]?.usd;
              if (currentPrice) {
                const claimedPrice = priceMatches.find(p => p.includes('$'));
                const claimedValue = claimedPrice ? parseFloat(claimedPrice.replace(/[$,]/g, '')) : null;
                
                if (claimedValue) {
                  const difference = Math.abs(currentPrice - claimedValue);
                  const percentageDiff = (difference / currentPrice) * 100;
                  
                  if (percentageDiff < 5) {
                    priceVerifications.push(`✅ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff)`);
                  } else {
                    priceVerifications.push(`⚠️ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff - significant)`);
                  }
                } else {
                  priceVerifications.push(`✅ ${symbol.toUpperCase()} current price: $${currentPrice.toFixed(2)}`);
                }
              }
            }
          } else if (stockMatches?.includes(symbol.toLowerCase())) {
            // Verify stock price with timeout
            const response = await Promise.race([
              fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbol.toUpperCase()}`),
              new Promise<never>((_, reject) => 
                setTimeout(() => reject(new Error('Timeout')), 5000)
              )
            ]);
            
            if (response.ok) {
              const data = await response.json();
              const quote = data?.quoteResponse?.result?.[0];
              if (quote?.regularMarketPrice) {
                const currentPrice = quote.regularMarketPrice;
                const claimedPrice = priceMatches.find(p => p.includes('$'));
                const claimedValue = claimedPrice ? parseFloat(claimedPrice.replace(/[$,]/g, '')) : null;
                
                if (claimedValue) {
                  const difference = Math.abs(currentPrice - claimedValue);
                  const percentageDiff = (difference / currentPrice) * 100;
                  
                  if (percentageDiff < 5) {
                    priceVerifications.push(`✅ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff)`);
                  } else {
                    priceVerifications.push(`⚠️ ${symbol.toUpperCase()}: Claimed ~$${claimedValue.toFixed(2)}, Current: $${currentPrice.toFixed(2)} (${percentageDiff.toFixed(1)}% diff - significant)`);
                  }
                } else {
                  priceVerifications.push(`✅ ${symbol.toUpperCase()} current price: $${currentPrice.toFixed(2)}`);
                }
              }
            }
          }
        } catch {
          priceVerifications.push(`❌ Unable to verify ${symbol.toUpperCase()} price`);
        }
      }
    }
    
    // Enhanced web search for supporting evidence
    const searchQuery = `${claim} ${context || ''}`.trim();
    let searchResults = '';
    try {
      searchResults = await Promise.race([
        enhancedWebSearch(searchQuery),
        new Promise<string>((resolve) => 
          setTimeout(() => resolve(''), 8000)
        )
      ]);
    } catch {
      searchResults = '';
    }
    
    // Analyze the search results for verification
    const hasSupportingEvidence = searchResults.length > 100 && 
      (searchResults.toLowerCase().includes(claimLower.split(' ').slice(0, 3).join(' ')) ||
       searchResults.toLowerCase().includes(claimLower.split(' ').slice(-3).join(' ')));
    
    let verificationSummary = `**🔍 Satoshi Fact Verification Results for:** "${claim}"\n\n`;
    
    if (priceVerifications.length > 0) {
      verificationSummary += `**💰 Price Verification:**\n${priceVerifications.join('\n')}\n\n`;
    }
    
    if (hasSupportingEvidence) {
      verificationSummary += `✅ **📰 Supporting Evidence Found:** Web search returned relevant information\n`;
    } else if (searchResults.length > 0) {
      verificationSummary += `⚠️ **📰 Limited Supporting Evidence:** Web search returned some information but not strong confirmation\n`;
    } else {
      verificationSummary += `❌ **📰 No Supporting Evidence:** Web search did not find relevant information\n`;
    }
    
    // Enhanced confidence assessment
    let confidenceLevel = 'LOW';
    let confidenceReason = '';
    
    if (priceVerifications.length > 0 && hasSupportingEvidence) {
      confidenceLevel = 'HIGH';
      confidenceReason = 'Price verification + supporting evidence';
    } else if (priceVerifications.length > 0 || hasSupportingEvidence) {
      confidenceLevel = 'MEDIUM';
      confidenceReason = priceVerifications.length > 0 ? 'Price verification only' : 'Supporting evidence only';
    } else {
      confidenceLevel = 'LOW';
      confidenceReason = 'No verification possible';
    }
    
    verificationSummary += `\n**🎯 Confidence Level:** ${confidenceLevel}\n`;
    verificationSummary += `**📊 Reason:** ${confidenceReason}\n`;
    
    // Enhanced recommendations
    let recommendation = '';
    if (confidenceLevel === 'LOW') {
      recommendation = '❌ **VERIFY INDEPENDENTLY** - This claim cannot be verified with available sources. Please check multiple sources.';
    } else if (confidenceLevel === 'MEDIUM') {
      recommendation = '⚠️ **VERIFY DETAILS** - Claim appears plausible but verify specific details with additional sources.';
    } else {
      recommendation = '✅ **WELL-SUPPORTED** - Claim appears well-supported by available data.';
    }
    
    verificationSummary += `**💡 Recommendation:** ${recommendation}\n\n`;
    verificationSummary += `⏰ **Verified at:** ${new Date().toLocaleString()}`;
    
    return verificationSummary;
    
  } catch (error) {
    logger.error('Satoshi fact verification error:', error);
    return `**❌ Satoshi Fact Verification Error:** Unable to verify the claim "${claim}" due to technical issues. Please verify this information independently.`;
  }
}

// Configure API route timeout for Satoshi API calls
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, mode, options } = body;

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    logger.info('Satoshi API request:', { message, mode, options });

    // Quick fallback for simple greetings to prevent timeouts
    const lowerMessage = message.toLowerCase();
    if (lowerMessage === 'gm' || lowerMessage === 'gm gm' || lowerMessage === 'hello' || lowerMessage === 'hi') {
      const cycleStatus = `
🎯 **BITCOIN CYCLE STATUS:**
**Current Phase:** HOLD
**Days Since Halving:** 452
**Days Until Next Halving:** 1008
**500-Day Strategy:** In HOLD phase - 68 days until SELL signal
**Cycle Progress:** 90% through current cycle`;

      const quickResponse = `🎯 **Satoshi here!** 

Current market context: BTC $118.7k (+2%), ETH $3,165 (+6%), SOL $165 (+4%)
ETF flows strong: BTC +$403mn, ETH +$192mn

${cycleStatus}

What would you like to know about Bitcoin, crypto markets, or blockchain technology? I can analyze projects, explain concepts, research markets, or provide strategic insights.

Remember: Everything is measured against BTC performance. That's the Bitcoin-first way.`;

      return NextResponse.json({
        content: quickResponse,
        mode: 'multimodal',
        timestamp: new Date().toISOString()
      });
    }

    let response: string;

    // Add timeout wrapper for all Satoshi operations
    const satoshiTimeout = 30000; // 30 second timeout

    // Handle different modes based on the enhanced Satoshi capabilities
    switch (mode) {
      case 'validator':
        response = await Promise.race([
          EnhancedGrok4Service.validateCryptoProject(message, options?.focus),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi validator timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'analyst':
        response = await Promise.race([
          EnhancedGrok4Service.analyzeStock(message, options?.timeframe),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi analyst timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'educator':
        response = await Promise.race([
          EnhancedGrok4Service.simplifyConcept(message, options?.audience),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi educator timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'designer':
        response = await Promise.race([
          EnhancedGrok4Service.critiqueDesign(message, options?.focus),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi designer timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'interviewer':
        response = await Promise.race([
          EnhancedGrok4Service.generateInterviewQuestions(message, options?.themes),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi interviewer timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'consultant':
        response = await Promise.race([
          EnhancedGrok4Service.writeWhitepaper(message, options?.structure),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi consultant timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'researcher':
        response = await Promise.race([
          EnhancedGrok4Service.conductResearch(message),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi researcher timeout')), 15000) // Reduced timeout for research
          )
        ]);
        break;
      
      case 'market_researcher':
        response = await Promise.race([
          EnhancedGrok4Service.conductMarketResearch(message, options?.focus),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi market researcher timeout')), 15000) // Reduced timeout for research
          )
        ]);
        break;
      
      case 'idea_validator':
        response = await Promise.race([
          EnhancedGrok4Service.validateStartupIdea(message, options?.framework),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi idea validator timeout')), 20000) // Moderate timeout
          )
        ]);
        break;
      
      case 'content_creator':
        response = await Promise.race([
          EnhancedGrok4Service.createContentStrategy(message, options?.format, options?.creator_style),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi content creator timeout')), 20000) // Moderate timeout
          )
        ]);
        break;
      
      case 'viral_creator':
        response = await Promise.race([
          EnhancedGrok4Service.createViralContent(message, options?.platform || 'X', options?.content_type || 'thread'),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi viral creator timeout')), 25000) // Longer timeout for creative content
          )
        ]);
        break;
      
      case 'strategic_advisor':
        response = await Promise.race([
          EnhancedGrok4Service.strategicDecisionAnalysis(message, options?.framework),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi strategic advisor timeout')), 20000) // Moderate timeout
          )
        ]);
        break;
      
      case 'visual_explainer':
        response = await Promise.race([
          EnhancedGrok4Service.generateVisualDiagram(message, options?.diagram_type),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi visual explainer timeout')), 20000) // Moderate timeout
          )
        ]);
        break;
      
      case 'ultimate_tutor':
        response = await Promise.race([
          EnhancedGrok4Service.comprehensiveResearch(message, options?.depth),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi ultimate tutor timeout')), 15000) // Reduced timeout for research
          )
        ]);
        break;
      
      case 'crypto_price':
        response = await Promise.race([
          getCryptoPriceWithSatoshiContext(message),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi crypto price timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'x_sentiment':
        response = await Promise.race([
          getXSentimentWithSatoshiAnalysis(message),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi X sentiment timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'market_data':
        response = await Promise.race([
          getMarketDataWithSatoshiContext(),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi market data timeout')), satoshiTimeout)
          )
        ]);
        break;
      
      case 'multimodal':
      default:
        // Use the multi-modal approach to automatically determine the best persona
        // First, try to get a response with tools for fact verification
        try {
          const completion = await Promise.race([
            EnhancedGrok4Service.generateResponseWithTools(
              message,
              enhancedSatoshiPromptPatterns.validator, // Use validator prompt as default
              0.7,
              enhancedSatoshiTools,
              'auto'
            ),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Satoshi multimodal timeout')), satoshiTimeout)
            )
          ]);

          // Handle tool calls if any
          const toolCall = EnhancedGrok4Service.extractToolCall(completion);
          if (toolCall && toolCall.function?.name === 'verify_fact') {
            const { claim, context } = JSON.parse(toolCall.function.arguments);
            const toolResult = await verifyFact(claim, context);
            
            // Get final response with tool result
            const finalCompletion = await EnhancedGrok4Service.generateResponseWithTools(
              `${message}\n\nFact verification result: ${toolResult}`,
              enhancedSatoshiPromptPatterns.validator,
              0.7
            );
            
            response = finalCompletion.choices?.[0]?.message?.content || 'Satoshi response failed.';
          } else {
            response = completion.choices?.[0]?.message?.content || 'Satoshi response failed.';
          }
        } catch {
          // Fallback to regular multimodal without tools
          response = await Promise.race([
            EnhancedGrok4Service.satoshiMultiModal(message),
            new Promise<never>((_, reject) => 
              setTimeout(() => reject(new Error('Satoshi multimodal timeout')), satoshiTimeout)
            )
          ]);
        }
        break;
    }

    logger.info('Satoshi API response generated successfully');

    return NextResponse.json({
      content: response,
      mode: mode || 'multimodal',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Satoshi API error:', error);
    
    // Handle timeout errors specifically
    if (error instanceof Error && error.message.includes('timeout')) {
      return NextResponse.json(
        { 
          error: 'Satoshi is taking too long to respond. Please try again or rephrase your question.',
          details: error.message
        },
        { status: 504 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to process request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for getting available modes and capabilities
export async function GET() {
  return NextResponse.json({
    modes: {
      validator: 'Validate crypto projects using Satoshi frameworks',
      analyst: 'Analyze stocks with Bitcoin-first perspective',
      educator: 'Simplify complex concepts with analogies',
      designer: 'Provide UX/UI critique with Bitcoin principles',
      interviewer: 'Generate insightful interview questions',
      consultant: 'Write strategic whitepapers',
      researcher: 'Conduct academic research',
      content_creator: 'Create general content with Satoshi voice',
      viral_creator: 'Create viral content with enhanced writing style for X/Twitter',
      crypto_price: 'Get crypto prices with Satoshi commentary',
      x_sentiment: 'Analyze X sentiment with Satoshi perspective',
      market_data: 'Get market data with Satoshi context',
      multimodal: 'Automatically determine best persona (default)'
    },
    capabilities: [
      'Multi-modal personality switching',
      'Bitcoin-first analysis',
      'Cryptographic validation',
      'Educational simplification',
      'Design critique',
      'Interview question generation',
      'Whitepaper writing',
      'Academic research',
      'Content creation with Satoshi voice',
      'Viral content creation with enhanced writing style',
      'Enhanced crypto price data',
      'X sentiment analysis',
      'Market data with context'
    ],
    examples: {
      validator: 'POST /api/satoshi {"message": "Validate this DeFi protocol", "mode": "validator"}',
      analyst: 'POST /api/satoshi {"message": "Analyze MSTR", "mode": "analyst"}',
      educator: 'POST /api/satoshi {"message": "Explain Lightning Network", "mode": "educator"}',
      viral_creator: 'POST /api/satoshi {"message": "Bitcoin ETF flows", "mode": "viral_creator", "options": {"platform": "X", "content_type": "thread"}}',
      multimodal: 'POST /api/satoshi {"message": "What do you think about this new crypto project?"}'
    }
  });
} 