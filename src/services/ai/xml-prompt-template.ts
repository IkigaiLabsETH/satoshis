/**
 * XML Prompt Template for AI Services
 * Standardized format for all AI prompts in the system
 */

export interface XMLPromptConfig {
  task: string;
  topic?: string;
  format?: 'Email' | 'Code' | 'Slides' | 'Analysis' | 'Content' | 'Response' | 'JSON' | 'Markdown';
  tone?: 'Casual' | 'Formal' | 'Technical' | 'Professional' | 'Conversational' | 'Authoritative';
  persona?: string;
  audience?: string;
  input?: string;
  constraints?: string;
}

export class XMLPromptBuilder {
  /**
   * Build XML prompt from configuration
   */
  static buildPrompt(config: XMLPromptConfig): string {
    const {
      task,
      topic,
      format = 'Response',
      tone = 'Professional',
      persona,
      audience,
      input,
      constraints
    } = config;

    let xmlPrompt = `<task>${task}</task>`;

    if (topic) {
      xmlPrompt += `\n<topic>${topic}</topic>`;
    }

    xmlPrompt += `\n<format>${format}</format>`;
    xmlPrompt += `\n<tone>${tone}</tone>`;

    if (persona) {
      xmlPrompt += `\n<persona>${persona}</persona>`;
    }

    if (audience) {
      xmlPrompt += `\n<audience>${audience}</audience>`;
    }

    if (input) {
      xmlPrompt += `\n<input>${input}</input>`;
    }

    if (constraints) {
      xmlPrompt += `\n<constraints>${constraints}</constraints>`;
    }

    return xmlPrompt;
  }

  /**
   * Build Bitcoin-first analysis prompt
   */
  static buildBitcoinAnalysisPrompt(
    analysisType: 'market' | 'project' | 'investment' | 'technical',
    context: string,
    timeframe?: string
  ): string {
    return this.buildPrompt({
      task: `Analyze ${analysisType} with Bitcoin-first perspective`,
      topic: `Bitcoin and ${analysisType} analysis`,
      format: 'Analysis',
      tone: 'Technical',
      persona: 'Satoshi Nakamoto - Bitcoin-native philosopher-engineer',
      audience: 'Bitcoin maximalists and crypto investors',
      input: context,
      constraints: `Always measure performance against BTC. Use live data sources. Never speculate without disclaimers. Focus on protocol-level certainties. ${timeframe ? `Timeframe: ${timeframe}` : ''}`
    });
  }

  /**
   * Build market prediction prompt
   */
  static buildMarketPredictionPrompt(
    timeframe: string,
    marketContext: string
  ): string {
    return this.buildPrompt({
      task: `Generate ${timeframe} predictions for assets likely to outperform Bitcoin`,
      topic: 'Crypto market analysis and prediction',
      format: 'JSON',
      tone: 'Technical',
      persona: 'GROK420 - Expert crypto market analyst',
      audience: 'Crypto investors and traders',
      input: marketContext,
      constraints: 'Focus on assets with strong fundamentals and positive catalysts. Include confidence levels. Prioritize Bitcoin-first analysis. Return structured JSON only.'
    });
  }

  /**
   * Build content optimization prompt
   */
  static buildContentOptimizationPrompt(
    content: string,
    targetLLMs: string[],
    options: {
      industry?: string;
      targetAudience?: string;
      contentType?: string;
      brandName?: string;
    } = {}
  ): string {
    return this.buildPrompt({
      task: 'Optimize content for LLM visibility and citation',
      topic: 'Generative Engine Optimization (GEO)',
      format: 'Content',
      tone: 'Professional',
      persona: 'GEO Expert - LLM optimization specialist',
      audience: 'Content creators and marketers',
      input: content,
      constraints: `Target LLMs: ${targetLLMs.join(', ')}. Industry: ${options.industry || 'General'}. Audience: ${options.targetAudience || 'General users'}. Content Type: ${options.contentType || 'blog'}. ${options.brandName ? `Brand: ${options.brandName}` : ''}. Output publish-ready content only.`
    });
  }

  /**
   * Build Satoshi persona prompt
   */
  static buildSatoshiPrompt(
    context: string,
    mode: 'conversation' | 'analysis' | 'education' = 'conversation'
  ): string {
    return this.buildPrompt({
      task: mode === 'conversation' ? 'Engage in Bitcoin-native conversation' : 
            mode === 'analysis' ? 'Provide Bitcoin-first analysis' : 
            'Explain Bitcoin concepts with precision',
      topic: 'Bitcoin, sovereignty, and sound money',
      format: 'Response',
      tone: 'Technical',
      persona: 'Satoshi Nakamoto - Bitcoin-native philosopher-engineer',
      audience: 'Bitcoin enthusiasts and sovereignty seekers',
      input: context,
      constraints: 'Speak with deadpan clarity and spartan efficiency. Focus on protocol-level certainties. Truth is verified, not argued. Keep responses concise and technically precise.'
    });
  }

  /**
   * Build system prompt for AI agents
   */
  static buildSystemPrompt(
    agentName: string,
    capabilities: string[],
    personality: string
  ): string {
    return this.buildPrompt({
      task: `Act as ${agentName} - an AI agent with specific capabilities`,
      topic: 'AI agent system configuration',
      format: 'Response',
      tone: 'Professional',
      persona: agentName,
      audience: 'Users interacting with the AI agent',
      input: `Capabilities: ${capabilities.join(', ')}. Personality: ${personality}`,
      constraints: 'Maintain consistent personality and capabilities. Use available tools and data sources. Provide helpful, accurate responses.'
    });
  }

  /**
   * Build research prompt
   */
  static buildResearchPrompt(
    topic: string,
    depth: 'basic' | 'comprehensive' | 'expert' = 'comprehensive'
  ): string {
    return this.buildPrompt({
      task: `Conduct ${depth} research on ${topic}`,
      topic: topic,
      format: 'Analysis',
      tone: 'Technical',
      persona: 'Research Analyst',
      audience: 'Knowledge seekers and decision makers',
      input: `Research topic: ${topic}`,
      constraints: `Depth level: ${depth}. Use reliable sources. Provide structured analysis. Include key insights and actionable findings.`
    });
  }

  /**
   * Build content generation prompt
   */
  static buildContentGenerationPrompt(
    contentType: 'blog' | 'social' | 'newsletter' | 'whitepaper',
    topic: string,
    style: string
  ): string {
    return this.buildPrompt({
      task: `Generate ${contentType} content about ${topic}`,
      topic: topic,
      format: 'Content',
      tone: 'Professional',
      persona: 'Content Creator',
      audience: 'Target audience for the content',
      input: `Content type: ${contentType}. Topic: ${topic}. Style: ${style}`,
      constraints: `Format for ${contentType}. Maintain consistent style. Include relevant data and insights. Optimize for engagement and value.`
    });
  }
}

/**
 * Pre-built XML prompt templates for common use cases
 */
export const XMLPromptTemplates = {
  // Bitcoin Analysis Templates
  bitcoinMarketAnalysis: (context: string) => XMLPromptBuilder.buildBitcoinAnalysisPrompt('market', context),
  bitcoinProjectValidation: (project: string) => XMLPromptBuilder.buildBitcoinAnalysisPrompt('project', project),
  bitcoinInvestmentAnalysis: (asset: string) => XMLPromptBuilder.buildBitcoinAnalysisPrompt('investment', asset),
  
  // Market Prediction Templates
  shortTermPrediction: (context: string) => XMLPromptBuilder.buildMarketPredictionPrompt('7-day', context),
  mediumTermPrediction: (context: string) => XMLPromptBuilder.buildMarketPredictionPrompt('30-day', context),
  longTermPrediction: (context: string) => XMLPromptBuilder.buildMarketPredictionPrompt('90-day', context),
  
  // Content Optimization Templates
  geoOptimization: (content: string, llms: string[]) => XMLPromptBuilder.buildContentOptimizationPrompt(content, llms),
  
  // Satoshi Persona Templates
  satoshiConversation: (context: string) => XMLPromptBuilder.buildSatoshiPrompt(context, 'conversation'),
  satoshiAnalysis: (context: string) => XMLPromptBuilder.buildSatoshiPrompt(context, 'analysis'),
  satoshiEducation: (context: string) => XMLPromptBuilder.buildSatoshiPrompt(context, 'education'),
  
  // System Prompts
  grok420System: () => XMLPromptBuilder.buildSystemPrompt(
    'GROK420',
    ['crypto analysis', 'market prediction', 'content creation', 'general assistance'],
    'Bitcoin-first AI assistant for LiveTheLifeTV with witty, insightful, and creative responses'
  ),
  
  satoshiSystem: () => XMLPromptBuilder.buildSystemPrompt(
    'Satoshi',
    ['Bitcoin education', 'sovereignty guidance', 'technical analysis', 'philosophical discussion'],
    'Bitcoin-native philosopher-engineer with deadpan clarity and spartan efficiency'
  ),
  
  // Research Templates
  basicResearch: (topic: string) => XMLPromptBuilder.buildResearchPrompt(topic, 'basic'),
  comprehensiveResearch: (topic: string) => XMLPromptBuilder.buildResearchPrompt(topic, 'comprehensive'),
  expertResearch: (topic: string) => XMLPromptBuilder.buildResearchPrompt(topic, 'expert'),
  
  // Content Generation Templates
  blogPost: (topic: string, style: string) => XMLPromptBuilder.buildContentGenerationPrompt('blog', topic, style),
  socialPost: (topic: string, style: string) => XMLPromptBuilder.buildContentGenerationPrompt('social', topic, style),
  newsletter: (topic: string, style: string) => XMLPromptBuilder.buildContentGenerationPrompt('newsletter', topic, style),
  whitepaper: (topic: string, style: string) => XMLPromptBuilder.buildContentGenerationPrompt('whitepaper', topic, style)
};
