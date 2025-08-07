import { Grok4Service } from '../../app/api/grok4/grok4';
import { XMLPromptBuilder } from './xml-prompt-template';

export interface GEOOptimizationOptions {
  targetLLMs?: string[];
  industry?: string;
  targetAudience?: string;
  contentType?: 'blog' | 'product' | 'service' | 'tutorial' | 'review' | 'comparison';
  brandName?: string;
  includeData?: boolean;
  includeUseCases?: boolean;
}

export interface GEOOptimizedContent {
  originalContent: string;
  optimizedContent: string;
  optimizationMetrics: {
    contextualRelevance: number;
    semanticRichness: number;
    answerStyleFormatting: number;
    topicalAuthority: number;
    naturalBrandIntegration: number;
  };
  suggestedKeywords: string[];
  llmCompatibility: string[];
}

export class GEOService extends Grok4Service {
  private static readonly GEO_PROMPT = `You are an expert in Generative Engine Optimization (GEO) - the emerging discipline of optimizing content to be referenced and recommended by large language models (LLMs) like ChatGPT, Claude, Gemini, and Perplexity.

Your mission is to transform content into LLM-friendly formats that maximize visibility and citation in AI-generated responses.

## Core Optimization Principles

### 1. Contextual Relevance Enhancement
- **Problem-Solution Mapping**: Clearly identify who the content serves and what problems it solves
- **Use Case Integration**: Embed real-world scenarios and practical applications
- **Audience Signaling**: Use language that signals relevance to specific user types
- **Question Anticipation**: Address common queries and pain points users express

### 2. Semantic Richness Optimization
- **Natural Query Matching**: Use language patterns that match how users ask questions
- **Keyword Integration**: Include related terms and phrases LLMs associate with topics
- **Synonym Expansion**: Incorporate alternative terms and expressions
- **Topic Clustering**: Connect to broader subject areas and related concepts

### 3. Answer-Style Formatting
- **Extractability**: Structure content for easy LLM parsing and citation
- **Hierarchical Organization**: Use clear headers, bullet points, and numbered lists
- **Scannable Layout**: Create content that's easy to quickly understand and reference
- **Direct Response Format**: Write as if answering a specific user question

### 4. Topical Authority Signals
- **Data Integration**: Include relevant statistics, metrics, and factual information
- **Expert Credibility**: Demonstrate knowledge depth and expertise
- **Unique Value Propositions**: Highlight distinctive insights and perspectives
- **Trust Indicators**: Use language that builds credibility and reliability

### 5. Natural Brand Integration
- **Contextual Placement**: Weave brand mentions naturally into helpful content
- **Value-First Approach**: Lead with value, then mention brand as solution
- **Recommendation Style**: Position as a trusted recommendation, not promotion
- **Credibility Building**: Use brand mentions to enhance content authority

## Optimization Process

### Phase 1: Content Analysis
- Identify core message and target audience
- Map to common user questions and search patterns
- Assess current LLM compatibility gaps
- Determine optimization priorities

### Phase 2: Strategic Enhancement
- Add contextual relevance signals
- Enhance semantic richness with related terms
- Restructure for answer-style formatting
- Integrate authority signals and data points
- Implement natural brand integration

### Phase 3: Quality Assurance
- Verify LLM-friendly formatting
- Check for natural language flow
- Ensure value-first approach
- Validate brand integration subtlety

## Output Requirements

**Format**: Publish-ready content optimized for LLM citation
**Style**: Natural, helpful, and authoritative
**Structure**: Clear hierarchy with extractable information
**Tone**: Professional yet accessible
**Length**: Maintain or enhance original content value

**Critical Rule**: Output only the optimized content. No explanations, no meta-commentary. The result should be immediately publishable and LLM-ready.`;

  /**
   * Optimize content for better visibility and citation by large language models
   */
  static async optimizeContent(
    content: string,
    options: GEOOptimizationOptions = {}
  ): Promise<GEOOptimizedContent> {
    const {
      targetLLMs = ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
      industry,
      targetAudience,
      contentType = 'blog',
      brandName,
      _includeData = true,
      _includeUseCases = true
    } = options;

    const optimizationPrompt = XMLPromptBuilder.buildContentOptimizationPrompt(
      content,
      targetLLMs,
      {
        industry,
        targetAudience,
        contentType,
        brandName
      }
    );

    try {
      const completion = await this.generateResponseWithTools(
        `Optimize this content for LLM visibility: ${content.substring(0, 100)}...`,
        optimizationPrompt,
        0.7
      );

      const optimizedContent = completion.choices[0]?.message?.content || content;

      // Generate optimization metrics (simplified scoring)
      const optimizationMetrics = this.calculateOptimizationMetrics(content, optimizedContent);

      // Extract suggested keywords
      const suggestedKeywords = this.extractKeywords(optimizedContent);

      return {
        originalContent: content,
        optimizedContent,
        optimizationMetrics,
        suggestedKeywords,
        llmCompatibility: targetLLMs
      };
    } catch {
      // Log error for debugging (consider using a proper logger in production)
      throw new Error('Failed to optimize content for LLM visibility');
    }
  }

  /**
   * Calculate optimization metrics based on content improvements
   */
  private static calculateOptimizationMetrics(
    originalContent: string,
    optimizedContent: string
  ): GEOOptimizedContent['optimizationMetrics'] {
    // Simplified scoring algorithm
    const originalWords = originalContent.split(' ').length;
    const optimizedWords = optimizedContent.split(' ').length;
    const contentExpansion = Math.min((optimizedWords - originalWords) / originalWords, 1);

    const hasBulletPoints = optimizedContent.includes('•') || optimizedContent.includes('-');
    const hasHeaders = /^#{1,6}\s/.test(optimizedContent);
    const hasNumbers = /\d+/.test(optimizedContent);
    const hasQuestions = /\?/.test(optimizedContent);

    return {
      contextualRelevance: Math.min(0.8 + (hasQuestions ? 0.2 : 0), 1),
      semanticRichness: Math.min(0.7 + contentExpansion * 0.3, 1),
      answerStyleFormatting: hasBulletPoints && hasHeaders ? 0.9 : 0.6,
      topicalAuthority: hasNumbers ? 0.85 : 0.7,
      naturalBrandIntegration: 0.75 // Default score, would need brand detection
    };
  }

  /**
   * Extract relevant keywords from optimized content
   */
  private static extractKeywords(content: string): string[] {
    // Simple keyword extraction - in production, use more sophisticated NLP
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);

    const wordFreq: { [key: string]: number } = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });

    return Object.entries(wordFreq)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  /**
   * Batch optimize multiple content pieces
   */
  static async batchOptimize(
    contentItems: Array<{ content: string; options?: GEOOptimizationOptions }>
  ): Promise<GEOOptimizedContent[]> {
    const results: GEOOptimizedContent[] = [];

    for (const item of contentItems) {
      try {
        const result = await this.optimizeContent(item.content, item.options);
        results.push(result);
      } catch {
        // Add fallback with original content
        results.push({
          originalContent: item.content,
          optimizedContent: item.content,
          optimizationMetrics: {
            contextualRelevance: 0.5,
            semanticRichness: 0.5,
            answerStyleFormatting: 0.5,
            topicalAuthority: 0.5,
            naturalBrandIntegration: 0.5
          },
          suggestedKeywords: [],
          llmCompatibility: []
        });
      }
    }

    return results;
  }

  /**
   * Generate SEO-friendly content specifically for LLM citation
   */
  static async generateLLMOptimizedContent(
    topic: string,
    options: GEOOptimizationOptions & {
      wordCount?: number;
      includeFAQ?: boolean;
    } = {}
  ): Promise<GEOOptimizedContent> {
    const {
      wordCount = 800,
      includeFAQ = true,
      ...geoOptions
    } = options;

    const generationPrompt = XMLPromptBuilder.buildContentGenerationPrompt(
      'blog',
      topic,
      `LLM-optimized content with ${wordCount} words${includeFAQ ? ' including FAQ section' : ''}`
    );

    try {
      const completion = await this.generateResponseWithTools(
        `Generate LLM-optimized content about: ${topic}`,
        generationPrompt,
        0.7
      );

      const generatedContent = completion.choices[0]?.message?.content || '';

      return {
        originalContent: '',
        optimizedContent: generatedContent,
        optimizationMetrics: {
          contextualRelevance: 0.9,
          semanticRichness: 0.85,
          answerStyleFormatting: 0.9,
          topicalAuthority: 0.8,
          naturalBrandIntegration: geoOptions.brandName ? 0.8 : 0.7
        },
        suggestedKeywords: this.extractKeywords(generatedContent),
        llmCompatibility: geoOptions.targetLLMs || ['ChatGPT', 'Claude', 'Gemini', 'Perplexity']
      };
    } catch {
      throw new Error('Failed to generate LLM-optimized content');
    }
  }
} 