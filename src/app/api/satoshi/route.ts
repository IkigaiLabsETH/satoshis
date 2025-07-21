import { NextRequest, NextResponse } from 'next/server';
import { SATOSHI_PERSONAS } from '@/services/satoshi/personas';
import { routeToPersona } from '@/services/satoshi/router';
import { postProcessLLMOutput } from '@/services/satoshi/postprocess';
import { Grok4Service } from '../grok4/grok4';
import { BRAND_DNA_PROMPT } from '@/services/satoshi/brand-dna';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, mode } = body;
    if (!input) {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }
    let persona: string;
    if (!mode || mode === 'Multi-Modal' || mode === 'Multi-Modal (Auto-detect)') {
      persona = routeToPersona(input);
    } else {
      persona = mode;
    }
    const personaPrompt = SATOSHI_PERSONAS[persona];
    if (!personaPrompt) {
      return NextResponse.json({ error: `Unknown persona: ${persona}` }, { status: 400 });
    }
    const fullPrompt = `${BRAND_DNA_PROMPT}\n\n${personaPrompt}`;
    const llmResponse = await Grok4Service.generateViralResponse(input, fullPrompt);
    const processed = postProcessLLMOutput(persona, llmResponse);
    return NextResponse.json({ persona, prompt: fullPrompt, processed });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
      enhanced_viral_creator: 'Create viral content with platform-specific psychology and natural writing',
      platform_adaptation: 'Adapt existing content for different platforms',
      multi_platform_strategy: 'Create comprehensive multi-platform content strategy',
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
      'Enhanced viral content with platform-specific psychology',
      'Platform-specific content adaptation',
      'Multi-platform content strategy',
      'Enhanced crypto price data',
      'X sentiment analysis',
      'Market data with context'
    ],
    examples: {
      validator: 'POST /api/satoshi {"message": "Validate this DeFi protocol", "mode": "validator"}',
      analyst: 'POST /api/satoshi {"message": "Analyze MSTR", "mode": "analyst"}',
      educator: 'POST /api/satoshi {"message": "Explain Lightning Network", "mode": "educator"}',
      viral_creator: 'POST /api/satoshi {"message": "Bitcoin ETF flows", "mode": "viral_creator", "options": {"platform": "X", "content_type": "thread"}}',
      enhanced_viral_creator: 'POST /api/satoshi {"message": "Bitcoin ETF flows", "mode": "enhanced_viral_creator", "options": {"platform": "X", "content_type": "thread", "business_context": {"industry": "Crypto", "targetAudience": "Bitcoin investors", "mainGoal": "Education"}}}',
      platform_adaptation: 'POST /api/satoshi {"message": "Your content here", "mode": "platform_adaptation", "options": {"target_platform": "LinkedIn", "content_type": "post"}}',
      multi_platform_strategy: 'POST /api/satoshi {"message": "Bitcoin adoption", "mode": "multi_platform_strategy", "options": {"platforms": ["X", "LinkedIn", "Instagram"], "business_context": {"industry": "Crypto", "mainGoal": "Education"}}}',
      multimodal: 'POST /api/satoshi {"message": "What do you think about this new crypto project?"}'
    },
    platforms: {
      'X': 'Twitter/X platform with thread and tweet optimization',
      'LinkedIn': 'Professional platform with thought leadership focus',
      'Instagram': 'Visual platform with story and post optimization',
      'TikTok': 'Short-form video platform with trend integration',
      'YouTube': 'Long-form video platform with title and description optimization'
    }
  });
} 