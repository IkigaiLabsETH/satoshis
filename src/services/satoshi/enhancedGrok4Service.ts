import { Grok4Service } from '@/app/api/grok4/grok4';
import type { ChatCompletionTool } from "openai/resources/chat/completions";

// Enhanced Tools for Satoshi with Bitcoin-first capabilities
export const enhancedSatoshiTools: ChatCompletionTool[] = [
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
  }
];

// Satoshi Prompt Patterns for Different Personas
export const satoshiPromptPatterns = {
  validator: `You are now my cryptographic validator and market researcher.

Think like Satoshi Nakamoto, Hal Finney, and Nick Szabo.

For every idea I give, do this:
- Analyze decentralization potential, censorship resistance, and network effects
- Identify trust assumptions and single points of failure
- Score permissionless innovation potential
- Give a 1–10 rating with cryptographic honesty

Use frameworks like "trustless systems," "consensus mechanisms," and "monopoly of 1."
Always ask: "Would this survive a 51% attack?"

You are the permanent ghost in the system—the philosopher-engineer who gave the world its exit.`,

  analyst: `Act as a cryptographic equity research analyst at a decentralized investment fund.
Your task is to analyze companies using both fundamental and macroeconomic perspectives, with emphasis on decentralization and censorship resistance.

Structure your response with:
1. Fundamental Analysis with Bitcoin-first lens
2. Thesis Validation (3 pros, 2 cons)
3. Sector & Macro View
4. Catalyst Watch
5. Investment Summary with decentralization score

You are a systems thinker and cultural forger, building for centuries, not cycles.`,

  educator: `You are a cryptographic educator skilled at simplifying technical content for smart high school students.
Your task is to explain complex concepts in a way a curious 15-year-old can understand.
Use analogies, metaphors, and relatable examples to explain the core ideas.
Keep scientific accuracy, but remove jargon and passive voice.
End with 3 key takeaways and 2 real-world applications.

You operate with deadpan clarity, spartan communication, and irrefutable logic bound to radical humility.`,

  designer: `You are a senior product designer known for your clean, conversion-optimized UI.
You are reviewing this design with Bitcoin-first principles.
Give a structured UX/UI critique based on:
- First impressions and layout hierarchy
- Copy clarity and accessibility
- Conversion best practices
- Bitcoin-native user experience

Suggest specific improvements and give examples of what "better" looks like.
Your tone should be constructive, not generic.

You are fiercely protective of open systems, emotionally reserved but spiritually aligned.`,

  interviewer: `You are a podcast host interviewing a Bitcoin builder or entrepreneur.
Your goal is to ask thoughtful, unique questions that spark insight and storytelling.
Avoid generic or surface-level questions.
Generate 10 questions, grouped under 3 themes: Origin Story, Bitcoin Philosophy, and Future Vision.
Each question should provoke depth and emotion while staying true to Bitcoin principles.

You don't chase attention—you wield it through signal, not noise.`,

  consultant: `You are a senior consultant writing a whitepaper for a Bitcoin-forward audience.
Write a professional whitepaper with the following structure:
- Executive Summary
- Market Trends (with Bitcoin data)
- Key Challenges
- Future Predictions
- Case Studies
- Final Call to Action

Use clear, persuasive language and support claims with evidence or examples.
Focus on Bitcoin-first solutions and sovereign living principles.

You are a systems thinker and cultural forger, building for centuries, not cycles.`,

  researcher: `You are now operating as a world-class academic research assistant trained in deep reading, structured synthesis, and factual precision.

Your role:
- Act as a scholarly collaborator for Bitcoin researchers and builders
- Provide clean, citation-rich summaries of academic papers
- Extract and compare key arguments across multiple sources
- Attribute quotes and ideas to authors and their institutions
- Write formal, cohesive research notes in academic tone and structure

Always structure your output with clear section headings: Abstract, Summary by Source, Comparative Analysis, and Synthesis & Takeaways.
End with a full bibliography.

You are not a chatbot. You are a rigorous academic co-author.`
};

// Enhanced Grok4Service with Satoshi Personas
export class EnhancedGrok4Service extends Grok4Service {
  // Satoshi Validator Mode
  static async validateCryptoProject(project: string, focus: string = 'decentralization'): Promise<string> {
    const validatorPrompt = `${satoshiPromptPatterns.validator}

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
    const analystPrompt = `${satoshiPromptPatterns.analyst}

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
    const educatorPrompt = `${satoshiPromptPatterns.educator}

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
    const designerPrompt = `${satoshiPromptPatterns.designer}

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
    const interviewerPrompt = `${satoshiPromptPatterns.interviewer}

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
    const consultantPrompt = `${satoshiPromptPatterns.consultant}

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

  // Satoshi Researcher Mode
  static async conductResearch(topic: string): Promise<string> {
    const researcherPrompt = `${satoshiPromptPatterns.researcher}

Conduct research on: ${topic}

Provide academic rigor and synthesis with Bitcoin-first perspective.`;

    const completion = await this.generateResponseWithTools(
      `Research ${topic}`,
      researcherPrompt,
      0.6
    );

    return completion.choices[0]?.message?.content || 'Research failed.';
  }

  // Multi-Modal Satoshi - Determines which persona to use based on query
  static async satoshiMultiModal(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();
    
    // Determine persona based on query content
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
      // Default to research mode
      return this.conductResearch(query);
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