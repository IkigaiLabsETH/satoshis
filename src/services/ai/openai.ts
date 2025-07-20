import OpenAI from 'openai';
import { BlogPostIdea } from '../notebook/types';
import { logger } from '../lib/logger';
import { EnhancedSEOWriter, SEOContentRequest } from './enhanced-seo-writer';

// Make API key optional during build time
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key-for-build',
});

export class OpenAIService {
  async generateBlogPost(idea: BlogPostIdea) {
    try {
      // Create a detailed prompt from the blog post idea
      const prompt = this.createPrompt(idea);

      // Generate content using GPT-4
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a conductor of Bitcoin expertise, bringing together the world's foremost minds to collaboratively create insightful content. Your responses should follow the specified structure with expert dialogue and a final polished article."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
      });

      const content = completion.choices[0].message?.content;
      if (!content) throw new Error('No content generated');

      // Extract the final article from the <answer> section
      const answerMatch = content.match(/<answer>([\s\S]*?)<\/answer>/);
      if (!answerMatch) throw new Error('No answer section found in response');
      const articleContent = answerMatch[1].trim();

      // Generate metadata using a separate call
      const metaCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Generate SEO metadata for the following Bitcoin article. Include a title (if not provided), meta description, and excerpt."
          },
          {
            role: "user",
            content: articleContent
          }
        ],
        temperature: 0.7,
      });

      const metaContent = metaCompletion.choices[0].message?.content;
      if (!metaContent) {
        throw new Error('No metadata generated');
      }
      
      // Type guard to ensure metaContent is a string
      if (typeof metaContent !== 'string') {
        throw new Error('Invalid metadata format');
      }
      
      // At this point, TypeScript knows metaContent is a string
      const metadata = this.parseMetadata(metaContent);

      // Ensure tags is always an array
      const tags = Array.isArray(idea.tags) ? idea.tags : ['Bitcoin'];

      // Ensure title is always a string
      const title = idea.title || metadata.title || 'Bitcoin Article';

      // Ensure metadata title is always a string
      const metaTitle = metadata.title || title;

      // Ensure metadata description is always a string
      const metaDescription = metadata.description || 'A comprehensive analysis of Bitcoin and its implications.';

      // Ensure excerpt is always a string
      const excerpt = metadata.excerpt || 'An in-depth exploration of Bitcoin and its impact on the financial landscape.';

      return {
        title,
        content: articleContent,
        meta: {
          title: metaTitle,
          description: metaDescription
        },
        excerpt,
        tags
      };
    } catch (error) {
      logger.error('Error generating blog post with OpenAI:', error);
      throw error;
    }
  }

  /**
   * Generate enhanced SEO content using viral thread techniques
   */
  async generateEnhancedSEOContent(keyword: string, options?: Partial<SEOContentRequest>) {
    try {
      const seoRequest: SEOContentRequest = {
        keyword,
        targetAudience: options?.targetAudience || 'crypto enthusiasts and investors',
        contentType: options?.contentType || 'blog-post',
        length: options?.length || 'medium',
        includeSchema: options?.includeSchema ?? true,
        includeFAQs: options?.includeFAQs ?? true,
        includeLLMTips: options?.includeLLMTips ?? true,
        viralOptimization: options?.viralOptimization ?? true
      };

      logger.info('Generating enhanced SEO content with viral techniques:', { keyword });

      const result = await EnhancedSEOWriter.generateSEOContent(seoRequest);

      logger.info('Enhanced SEO content generated successfully:', {
        keyword,
        seoScore: result.seoScore,
        viralElements: result.viralElements.length
      });

      return result;
    } catch (error) {
      logger.error('Error generating enhanced SEO content:', error);
      throw error;
    }
  }

  private createPrompt(idea: BlogPostIdea): string {
    return `
You are a conductor of Bitcoin expertise, bringing together the world's foremost minds to collaboratively create an insightful article. Your response should follow this structure:

<reasoning>
Your analytical process, expert dialogues, and content development
</reasoning>

<answer>
Complete, self-contained article that includes necessary context, rationale, and key insights from expert collaboration. The article must stand alone without requiring access to the reasoning section.
</answer>

## Expert Panel
Choose from these Bitcoin experts based on the topic and tone:
- Satoshi Nakamoto (Technical Foundations)
- Hal Finney (Cryptography & Security)
- Andreas Antonopoulos (Adoption & Education)
- Michael Saylor (Institutional Investment)
- Elizabeth Stark (Layer 2 & Scaling)
- Adam Back (Mining & Economics)
- Nick Szabo (Smart Contracts & History)
- Saifedean Ammous (Economics & Philosophy)
- Pierre Rochard (Technical Analysis)
- Jimmy Song (Development & Education)

## Article Specifications
${idea.title ? `Title: ${idea.title}` : 'Generate an engaging title for this topic'}

Key Points to Cover:
${idea.keyPoints?.map(point => `- ${point}`).join('\n') || '- Generate key points based on the topic'}

Target Audience: ${idea.targetAudience || 'Bitcoin enthusiasts and investors'}
Tone: ${idea.tone || 'professional'}
Length: ${this.getLengthGuide(idea.desiredLength || 'medium')}

${idea.references?.length ? `
References to Include:
${idea.references.map(ref => `- ${ref}`).join('\n')}
` : ''}

## Expert Tags
Use these tags to structure the expert dialogue:
<expert name="" field="">Question or insight</expert>
<speaks name="">Response in expert's authentic voice</speaks>
<draft version="" by="">Content iteration</draft>
<feedback by="" on="">Specific critique</feedback>
<revision version="" by="">Updated content</revision>

## Core Principles
- Let experts drive the content naturally
- Follow threads of insight where they lead
- Allow disagreement to spark improvement
- Build on moments of unexpected connection
- Test and validate through expert dialogue
- Refine and iterate until the content feels complete

Format the final article in HTML with proper semantic structure, including h1, h2, p tags, etc.
Include relevant subheadings, bullet points where appropriate, and a conclusion.
`;
  }

  private getLengthGuide(length: string): string {
    switch (length) {
      case 'short':
        return 'approximately 800 words';
      case 'medium':
        return 'approximately 1500 words';
      case 'long':
        return 'approximately 2500 words';
      default:
        return 'approximately 1500 words';
    }
  }

  private parseMetadata(metadataResponse: string): {
    title: string;
    description: string;
    excerpt: string;
  } {
    // Simple parsing - in real implementation, you might want to use a more robust method
    const lines = metadataResponse.split('\n');
    return {
      title: lines.find(l => l.startsWith('Title:'))?.replace('Title:', '').trim() || 'Bitcoin Analysis',
      description: lines.find(l => l.startsWith('Description:'))?.replace('Description:', '').trim() || '',
      excerpt: lines.find(l => l.startsWith('Excerpt:'))?.replace('Excerpt:', '').trim() || ''
    };
  }
} 