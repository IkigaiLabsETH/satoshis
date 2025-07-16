import { NextRequest, NextResponse } from 'next/server';
import { EnhancedGrok4Service } from '@/services/satoshi/enhancedGrok4Service';
import { getCryptoPriceWithSatoshiContext, getXSentimentWithSatoshiAnalysis, getMarketDataWithSatoshiContext } from '@/services/satoshi/enhancedCryptoPrice';
import { logger } from '@/lib/logger';

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

    let response: string;

    // Handle different modes based on the enhanced Satoshi capabilities
    switch (mode) {
      case 'validator':
        response = await EnhancedGrok4Service.validateCryptoProject(message, options?.focus);
        break;
      
      case 'analyst':
        response = await EnhancedGrok4Service.analyzeStock(message, options?.timeframe);
        break;
      
      case 'educator':
        response = await EnhancedGrok4Service.simplifyConcept(message, options?.audience);
        break;
      
      case 'designer':
        response = await EnhancedGrok4Service.critiqueDesign(message, options?.focus);
        break;
      
      case 'interviewer':
        response = await EnhancedGrok4Service.generateInterviewQuestions(message, options?.themes);
        break;
      
      case 'consultant':
        response = await EnhancedGrok4Service.writeWhitepaper(message, options?.structure);
        break;
      
      case 'researcher':
        response = await EnhancedGrok4Service.conductResearch(message);
        break;
      
      case 'crypto_price':
        response = await getCryptoPriceWithSatoshiContext(message);
        break;
      
      case 'x_sentiment':
        response = await getXSentimentWithSatoshiAnalysis(message);
        break;
      
      case 'market_data':
        response = await getMarketDataWithSatoshiContext();
        break;
      
      case 'multimodal':
      default:
        // Use the multi-modal approach to automatically determine the best persona
        response = await EnhancedGrok4Service.satoshiMultiModal(message);
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