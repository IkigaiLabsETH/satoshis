import { NextResponse } from 'next/server';
import { EnhancedSEOWriter, SEOContentRequest } from '@/services/ai/enhanced-seo-writer';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const body: SEOContentRequest = await request.json();
    
    // Validate required fields
    if (!body.keyword) {
      return NextResponse.json(
        { error: 'Keyword is required' },
        { status: 400 }
      );
    }

    // Set defaults for optional fields
    const seoRequest: SEOContentRequest = {
      keyword: body.keyword,
      targetAudience: body.targetAudience || 'crypto enthusiasts and investors',
      contentType: body.contentType || 'blog-post',
      length: body.length || 'medium',
      includeSchema: body.includeSchema ?? true,
      includeFAQs: body.includeFAQs ?? true,
      includeLLMTips: body.includeLLMTips ?? true,
      viralOptimization: body.viralOptimization ?? true
    };

    logger.info('Generating enhanced SEO content:', {
      keyword: seoRequest.keyword,
      contentType: seoRequest.contentType,
      viralOptimization: seoRequest.viralOptimization
    });

    // Generate the enhanced SEO content
    const result = await EnhancedSEOWriter.generateSEOContent(seoRequest);

    logger.info('Enhanced SEO content generated successfully:', {
      keyword: seoRequest.keyword,
      seoScore: result.seoScore,
      viralElements: result.viralElements.length
    });

    return NextResponse.json({
      success: true,
      data: result,
      message: `Generated ${seoRequest.contentType} for "${seoRequest.keyword}" with SEO score: ${result.seoScore}/100`
    });

  } catch (error) {
    logger.error('Error in enhanced SEO API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate enhanced SEO content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Enhanced SEO Writer API',
    description: 'Generate viral, SEO-optimized content with schema markup, FAQs, and LLM visibility tips',
    usage: {
      method: 'POST',
      body: {
        keyword: 'string (required)',
        targetAudience: 'string (optional)',
        contentType: "'blog-post' | 'article' | 'guide' | 'news' (optional)",
        length: "'short' | 'medium' | 'long' (optional)",
        includeSchema: 'boolean (optional)',
        includeFAQs: 'boolean (optional)',
        includeLLMTips: 'boolean (optional)',
        viralOptimization: 'boolean (optional)'
      }
    },
    example: {
      keyword: 'bitcoin',
      targetAudience: 'crypto investors',
      contentType: 'blog-post',
      includeSchema: true,
      includeFAQs: true,
      includeLLMTips: true,
      viralOptimization: true
    }
  });
} 