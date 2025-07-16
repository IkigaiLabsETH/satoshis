import { NextRequest, NextResponse } from 'next/server';
import { EnhancedGrok4Service } from '@/services/satoshi/enhancedGrok4Service';
import { getCryptoPriceWithSatoshiContext, getXSentimentWithSatoshiAnalysis, getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { logger } from '@/lib/logger';

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
      const quickResponse = `🎯 **Satoshi here!** 

Current market context: BTC $118.7k (+2%), ETH $3,165 (+6%), SOL $165 (+4%)
ETF flows strong: BTC +$403mn, ETH +$192mn

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
        response = await Promise.race([
          EnhancedGrok4Service.satoshiMultiModal(message),
          new Promise<never>((_, reject) => 
            setTimeout(() => reject(new Error('Satoshi multimodal timeout')), satoshiTimeout)
          )
        ]);
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
      'Enhanced crypto price data',
      'X sentiment analysis',
      'Market data with context'
    ],
    examples: {
      validator: 'POST /api/satoshi {"message": "Validate this DeFi protocol", "mode": "validator"}',
      analyst: 'POST /api/satoshi {"message": "Analyze MSTR", "mode": "analyst"}',
      educator: 'POST /api/satoshi {"message": "Explain Lightning Network", "mode": "educator"}',
      multimodal: 'POST /api/satoshi {"message": "What do you think about this new crypto project?"}'
    }
  });
} 