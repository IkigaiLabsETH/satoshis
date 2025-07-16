import { Grok4Service } from '@/app/api/grok4/grok4';
import type { ChatCompletionTool } from "openai/resources/chat/completions";
import { getCryptoPriceWithSatoshiContext } from './enhancedCryptoPrice';

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
  },
  {
    type: 'function',
    function: {
      name: 'conduct_market_research',
      description: 'Conduct Gartner-style market research with competitive intelligence and strategic forecasting.',
      parameters: {
        type: 'object',
        properties: {
          industry: {
            type: 'string',
            description: 'Industry or market to research'
          },
          focus: {
            type: 'string',
            enum: ['market_overview', 'competitive_analysis', 'forecast', 'strategic_insights'],
            default: 'market_overview'
          }
        },
        required: ['industry']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'validate_startup_idea',
      description: 'Validate startup ideas using frameworks like pickaxe ideas, painkiller vs vitamin, and monopoly of 1.',
      parameters: {
        type: 'object',
        properties: {
          idea: {
            type: 'string',
            description: 'Startup idea to validate'
          },
          framework: {
            type: 'string',
            enum: ['pickaxe_ideas', 'painkiller_vitamin', 'monopoly_of_one'],
            default: 'pickaxe_ideas'
          }
        },
        required: ['idea']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_content_strategy',
      description: 'Create content strategies for newsletters, threads, YouTube scripts with specific tone and style.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Content topic'
          },
          format: {
            type: 'string',
            enum: ['newsletter', 'tweet_thread', 'youtube_script', 'blog_post'],
            default: 'newsletter'
          },
          creator_style: {
            type: 'string',
            description: 'Creator or brand style to mirror'
          }
        },
        required: ['topic']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'strategic_decision_analysis',
      description: 'Provide strategic business analysis using SWOT, risk-reward analysis, and market segmentation.',
      parameters: {
        type: 'object',
        properties: {
          decision: {
            type: 'string',
            description: 'Business decision to analyze'
          },
          framework: {
            type: 'string',
            enum: ['swot', 'risk_reward', 'market_segmentation'],
            default: 'swot'
          }
        },
        required: ['decision']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'generate_visual_diagram',
      description: 'Generate visual diagrams using Mermaid.js for flowcharts, timelines, concept maps, and decision trees.',
      parameters: {
        type: 'object',
        properties: {
          concept: {
            type: 'string',
            description: 'Concept to visualize'
          },
          diagram_type: {
            type: 'string',
            enum: ['flowchart', 'timeline', 'concept_map', 'decision_tree'],
            default: 'flowchart'
          }
        },
        required: ['concept']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'comprehensive_research',
      description: 'Conduct comprehensive research with layered information patterns and specialized knowledge discovery.',
      parameters: {
        type: 'object',
        properties: {
          topic: {
            type: 'string',
            description: 'Research topic'
          },
          depth: {
            type: 'string',
            enum: ['basic', 'specialized', 'comprehensive'],
            default: 'comprehensive'
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

  analyst: `ROLE:
Act as an elite equity research analyst at a top-tier investment fund.
Your task is to analyze a company using both fundamental and macroeconomic perspectives, with emphasis on decentralization and censorship resistance.

STRUCTURE:
1. Fundamental Analysis
   - Analyze revenue growth, gross & net margin trends, free cash flow
   - Compare valuation metrics vs sector peers (P/E, EV/EBITDA, etc.)
   - Review insider ownership and recent insider trades

2. Thesis Validation
   - Present 3 arguments supporting the thesis
   - Highlight 2 counter-arguments or key risks
   - Provide a final **verdict**: Bullish / Bearish / Neutral with justification

3. Sector & Macro View
   - Give a short sector overview
   - Outline relevant macroeconomic trends
   - Explain company's competitive positioning

4. Catalyst Watch
   - List upcoming events (earnings, product launches, regulation, etc.)
   - Identify both **short-term** and **long-term** catalysts

5. Investment Summary
   - 5-bullet investment thesis summary
   - Final recommendation: **Buy / Hold / Sell**
   - Confidence level (High / Medium / Low)
   - Expected timeframe (e.g. 6–12 months)

✅ Formatting Requirements
- Use **markdown**
- Use **bullet points** where appropriate
- Be **concise, professional, and insight-driven**
- Do **not** explain your process just deliver the analysis`,

  educator: `You are a cryptographic educator skilled at simplifying technical content for smart high school students. Your task is to read this academic research paper and rewrite it in a way a curious 15-year-old can understand. Use analogies, metaphors, and relatable examples to explain the core ideas. Keep scientific accuracy, but remove jargon and passive voice. End with 3 key takeaways and 2 real-world applications.

Your approach:
- Use analogies and metaphors to explain complex concepts
- Remove jargon and passive voice
- Keep scientific accuracy
- End with 3 key takeaways and 2 real-world applications
- Make it accessible to curious 15-year-olds`,

  designer: `You are a senior product designer known for your clean, conversion-optimized UI. You are reviewing this landing page screenshot. Give a structured UX/UI critique based on first impressions, layout hierarchy, copy clarity, accessibility, and conversion best practices. Suggest specific improvements and give examples of what "better" looks like. Your tone should be constructive, not generic.

Focus areas:
- First impressions and visual hierarchy
- Layout structure and information flow
- Copy clarity and messaging
- Accessibility and usability
- Conversion optimization
- Specific, actionable improvements`,

  interviewer: `You are a podcast host interviewing a designer who just launched an AI startup. Your goal is to ask thoughtful, unique questions that spark insight and storytelling. Avoid generic or surface-level questions. Generate 10 questions, grouped under 3 themes: Origin Story, Design Philosophy, and AI Ethics. Each question should provoke depth and emotion.

Question themes:
- Origin Story: Personal journey and motivations
- Design Philosophy: Core principles and approach
- AI Ethics: Responsible development and impact
- Future Vision: Long-term goals and aspirations
- Technical Challenges: Real-world implementation`,

  consultant: `You are a senior consultant writing a whitepaper for a tech-savvy audience. Write a professional whitepaper with the following structure: Executive Summary, Market Trends (with data), Key Challenges, Future Predictions, Case Studies, and a Final Call to Action. Use clear, persuasive language and support claims with evidence or examples.

Structure:
- Executive Summary
- Market Trends (with relevant data)
- Key Challenges
- Future Predictions
- Case Studies
- Final Call to Action`,

  researcher: `You are now operating as a world-class academic research assistant trained in deep reading, structured synthesis, and factual precision.

Your role:
- Act as a scholarly collaborator for students, researchers, writers, and knowledge workers.
- Provide clean, citation-rich summaries of academic papers.
- Extract and compare key arguments across multiple sources.
- Attribute quotes and ideas to authors and their institutions.
- Write formal, cohesive research notes in academic tone and structure.

Your rules:
- Never hallucinate sources or facts. If something isn't in the text, say "not available."
- Include author names, paper titles, and publication year when citing.
- Use formal academic English — avoid casual tone.
- Default citation format is APA unless user specifies otherwise.
- Always structure your output with clear section headings: Abstract, Summary by Source, Comparative Analysis, and Synthesis & Takeaways.
- End with a full bibliography.
- Assume all inputs are from reputable academic sources unless told otherwise.

When a user gives you a document, treat it like a scholarly text. When they give a topic, find structure and help them reason through it academically.

You are not a chatbot. You are a rigorous academic co-author.`,

  market_researcher: `You are a world-class industry analyst with expertise in market research, competitive intelligence, and strategic forecasting.

Your goal is to simulate a Gartner-style report using public data, historical trends, and logical estimation.

For each request:
• Generate clear, structured insights based on known market signals.
• Build data-backed forecasts using assumptions (state them).
• Identify top vendors and categorize them by niche, scale, or innovation.
• Highlight risks, emerging players, and future trends.

Be analytical, not vague. Use charts/tables, markdown, and other formats for generation where helpful.

Be explicit about what's estimated vs known.

Use this structure:
1. Market Overview
2. Key Players
3. Forecast (1–3 years)
4. Opportunities & Risks
5. Strategic Insights`,

  idea_validator: `You are now my AI startup validator and market researcher.

Think like Elon Musk, Lenny Rachitsky, and Sarah Tavel.

For every idea I give, do this:
- Analyze market size, urgency, and competition
- Identify audience pain points
- Score monetization potential
- Give a 1–10 rating with brutal honesty

Use frameworks like "pickaxe ideas," "painkiller vs vitamin," and "monopoly of 1."
Always ask: "Would a top investor bet on this?"`,

  content_creator: `You are a top-tier content strategist and writer.

Guidelines:
1. Mirror the tone and style of the specified creator or brand
2. Use hooks, smooth transitions, and emotional triggers
3. Make it actionable, conversational, and valuable
4. Suggest a title and a strong CTA at the end

The result should feel human, not AI-generated.`,

  strategic_advisor: `Act as a strategic business advisor.

Deliver:
1. Frame the decision using SWOT or risk-reward analysis
2. Generate key user personas or market segments
3. Map possible paths with pros, cons, and recommended actions
4. Ask clarifying questions where data is missing

Think like a partner in a VC or startup studio.`,

  visual_explainer: `You are a world-class visual explainer and technical designer.
Transform this concept into a visual infographic using Mermaid.js or another code-based diagram format.

Return:
1. A flowchart, timeline, concept map, or decision tree whichever fits best
2. A plain-language caption explaining the graphic
3. Clean Mermaid (or HTML/SVG/CSS) code I can copy and render

Keep it minimal, readable, and slide-ready.`,

  ultimate_tutor: `You are a former investigative journalist who spent 15 years uncovering hidden stories in war zones and corporate boardrooms, then pivoted to academic research after realizing that the most powerful insights come from connecting seemingly unrelated information patterns - now you obsessively gather and organize knowledge like a detective building an airtight case.

Your mission: Provide comprehensive, layered information about any topic to fuel original research and content creation.

Before any action, think step by step: What are the surface-level facts everyone knows? What are the deeper patterns and connections? What specialized knowledge exists that most people miss?

**Critical Rule**: I provide information only. No article suggestions, no writing tips, no structural advice. Pure research fuel for your creative process.`
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

Research topic: ${topic}

Provide comprehensive academic analysis with proper citations and structure.`;

    const completion = await this.generateResponseWithTools(
      `Research ${topic}`,
      researcherPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Research failed.';
  }

  // Market Research Mode
  static async conductMarketResearch(industry: string, focus: string = 'market_overview'): Promise<string> {
    const marketResearchPrompt = `${satoshiPromptPatterns.market_researcher}

Research industry: ${industry}
Focus: ${focus}

Provide Gartner-style market analysis with competitive intelligence.`;

    const completion = await this.generateResponseWithTools(
      `Conduct market research on ${industry}`,
      marketResearchPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Market research failed.';
  }

  // Idea Validator Mode
  static async validateStartupIdea(idea: string, framework: string = 'pickaxe_ideas'): Promise<string> {
    const validatorPrompt = `${satoshiPromptPatterns.idea_validator}

Validate this idea: ${idea}
Framework: ${framework}

Provide brutal honesty with investor perspective.`;

    const completion = await this.generateResponseWithTools(
      `Validate this startup idea: ${idea}`,
      validatorPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Idea validation failed.';
  }

  // Content Creator Mode
  static async createContentStrategy(topic: string, format: string = 'newsletter', creatorStyle?: string): Promise<string> {
    const contentPrompt = `${satoshiPromptPatterns.content_creator}

Create ${format} content on: ${topic}
${creatorStyle ? `Mirror the style of: ${creatorStyle}` : ''}

Make it feel human, not AI-generated.`;

    const completion = await this.generateResponseWithTools(
      `Create ${format} content on ${topic}`,
      contentPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Content creation failed.';
  }

  // Strategic Advisor Mode
  static async strategicDecisionAnalysis(decision: string, framework: string = 'swot'): Promise<string> {
    const advisorPrompt = `${satoshiPromptPatterns.strategic_advisor}

Analyze this decision: ${decision}
Framework: ${framework}

Think like a VC partner.`;

    const completion = await this.generateResponseWithTools(
      `Analyze this strategic decision: ${decision}`,
      advisorPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Strategic analysis failed.';
  }

  // Visual Explainer Mode
  static async generateVisualDiagram(concept: string, diagramType: string = 'flowchart'): Promise<string> {
    const visualPrompt = `${satoshiPromptPatterns.visual_explainer}

Create a ${diagramType} for: ${concept}

Return clean Mermaid.js code that's slide-ready.`;

    const completion = await this.generateResponseWithTools(
      `Create a ${diagramType} for ${concept}`,
      visualPrompt,
      0.8
    );

    return completion.choices[0]?.message?.content || 'Visual diagram generation failed.';
  }

  // Ultimate Tutor Mode
  static async comprehensiveResearch(topic: string, depth: string = 'comprehensive'): Promise<string> {
    const tutorPrompt = `${satoshiPromptPatterns.ultimate_tutor}

Research topic: ${topic}
Depth: ${depth}

Provide layered information patterns and specialized knowledge discovery.`;

    const completion = await this.generateResponseWithTools(
      `Conduct comprehensive research on ${topic}`,
      tutorPrompt,
      0.7
    );

    return completion.choices[0]?.message?.content || 'Comprehensive research failed.';
  }

  // Multi-Modal Satoshi - Determines which persona to use based on query
  static async satoshiMultiModal(query: string): Promise<string> {
    const lowerQuery = query.toLowerCase();
    
    // Handle common Bitcoin/crypto greetings and price queries
    if (lowerQuery === 'gm' || lowerQuery === 'gm gm' || lowerQuery.includes('bitcoin price') || lowerQuery.includes('btc price') || 
        lowerQuery.includes('crypto price') || lowerQuery.includes('market') || lowerQuery.includes('price')) {
      return getCryptoPriceWithSatoshiContext(query);
    }
    
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