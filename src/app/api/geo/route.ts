import { NextRequest, NextResponse } from 'next/server';
import { GEOService } from '../../../services/ai/geo-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, options, action = 'optimize' } = body;

    if (!content) {
      return NextResponse.json(
        { error: 'Content is required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'optimize':
        result = await GEOService.optimizeContent(content, options);
        break;
      
      case 'generate':
        if (!body.topic) {
          return NextResponse.json(
            { error: 'Topic is required for content generation' },
            { status: 400 }
          );
        }
        result = await GEOService.generateLLMOptimizedContent(body.topic, options);
        break;
      
      case 'batch':
        if (!Array.isArray(body.contentItems)) {
          return NextResponse.json(
            { error: 'contentItems array is required for batch optimization' },
            { status: 400 }
          );
        }
        result = await GEOService.batchOptimize(body.contentItems);
        break;
      
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "optimize", "generate", or "batch"' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Failed to process GEO request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(_request: NextRequest) {
  // Return API documentation
  return NextResponse.json({
    name: 'GEO (Generative Engine Optimization) API',
    description: 'Optimize content for better visibility and citation by large language models',
    version: '1.0.0',
    endpoints: {
      POST: {
        description: 'Optimize content for LLM visibility',
        body: {
          content: 'string (required) - Content to optimize',
          action: 'string (optional) - "optimize", "generate", or "batch"',
          options: 'object (optional) - Optimization options',
          topic: 'string (required for generate action) - Topic for content generation',
          contentItems: 'array (required for batch action) - Array of content items'
        },
        options: {
          targetLLMs: 'array - Target LLMs (default: ["ChatGPT", "Claude", "Gemini", "Perplexity"])',
          industry: 'string - Industry context',
          targetAudience: 'string - Target audience',
          contentType: 'string - Content type (blog, product, service, tutorial, review, comparison)',
          brandName: 'string - Brand to integrate naturally',
          includeData: 'boolean - Include data points (default: true)',
          includeUseCases: 'boolean - Include use cases (default: true)',
          wordCount: 'number - Target word count for generation (default: 800)',
          includeFAQ: 'boolean - Include FAQ section for generation (default: true)'
        }
      }
    },
    examples: {
      optimize: {
        method: 'POST',
        body: {
          content: 'Your content here...',
          action: 'optimize',
          options: {
            targetLLMs: ['ChatGPT', 'Claude'],
            industry: 'Technology',
            contentType: 'blog'
          }
        }
      },
      generate: {
        method: 'POST',
        body: {
          action: 'generate',
          topic: 'Bitcoin mining',
          options: {
            wordCount: 1000,
            includeFAQ: true,
            targetAudience: 'Crypto beginners'
          }
        }
      }
    }
  });
} 