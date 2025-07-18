// Viral Thread Generator - Combines Feynman Technique with Viral X Patterns
// Based on research of successful educational thread creators

export interface ViralThreadPattern {
  name: string;
  description: string;
  structure: string[];
  hookTemplate: string;
  engagementTriggers: string[];
}

export interface ThreadTopic {
  id: number;
  title: string;
  hookPreview: string;
  pattern: string;
  targetAudience: string;
  viralElements: string[];
}

export class ViralThreadGenerator {
  private static patterns: Record<string, ViralThreadPattern> = {
    contrarianReveal: {
      name: "Contrarian Reveal",
      description: "Challenge common beliefs with surprising insights",
      structure: [
        "Hook (4-5 lines + thread emoji)",
        "Common belief everyone has",
        "\"Here's what's actually happening...\"",
        "First surprising insight",
        "Supporting evidence/example",
        "Second surprising insight",
        "Why this matters (implications)",
        "Practical application",
        "Summary + engagement CTA"
      ],
      hookTemplate: "[Attention-grabbing statement]\n[Curiosity gap or surprising claim]\n[Promise of value or insight]\n[Optional: Stakes or urgency]\n🧵",
      engagementTriggers: ["debate", "bookmark", "share", "follow-up question"]
    },
    
    stepByStepBreakdown: {
      name: "Step-by-Step Breakdown",
      description: "Complex process simplified into actionable steps",
      structure: [
        "Hook promising simple solution",
        "Why this problem exists",
        "\"Here's the 5-step process...\"",
        "Step 1 with example",
        "Step 2 with example",
        "Step 3 with example",
        "Steps 4-5 rapid fire",
        "Common mistakes to avoid",
        "Results you'll see + CTA"
      ],
      hookTemplate: "Want to [achieve goal]?\nI've tested this [X]-step method\nHere's exactly how to do it\nNo fluff, just results\n🧵",
      engagementTriggers: ["try this", "bookmark", "results", "questions"]
    },
    
    psychologyDeepDive: {
      name: "Psychology Deep Dive",
      description: "Explore the mental models behind behavior",
      structure: [
        "Hook about psychological insight",
        "The mental model at play",
        "Why this happens (psychology)",
        "Real-world examples",
        "How to leverage this",
        "Common pitfalls",
        "Advanced applications",
        "Actionable takeaways",
        "Engagement question + CTA"
      ],
      hookTemplate: "Your brain is [doing something surprising]\nHere's the psychology behind it\nAnd how to use it to your advantage\n🧵",
      engagementTriggers: ["mind blown", "relate", "apply", "discuss"]
    }
  };

  private static topics: ThreadTopic[] = [
    {
      id: 1,
      title: "Crypto Market Analysis",
      hookPreview: "Bitcoin just hit $X - here's what 99% of people miss",
      pattern: "contrarianReveal",
      targetAudience: "crypto enthusiasts",
      viralElements: ["contrarian", "insider knowledge", "market timing"]
    },
    {
      id: 2,
      title: "AI Tool Mastery",
      hookPreview: "I tested 50+ AI tools - these 3 changed everything",
      pattern: "stepByStepBreakdown",
      targetAudience: "tech professionals",
      viralElements: ["productivity", "efficiency", "quick wins"]
    },
    {
      id: 3,
      title: "Lifestyle Optimization",
      hookPreview: "The 1% rule that transformed my daily routine",
      pattern: "psychologyDeepDive",
      targetAudience: "lifestyle seekers",
      viralElements: ["self-improvement", "habits", "transformation"]
    }
  ];

  // Apply Feynman Technique to simplify complex concepts
  static applyFeynmanTechnique(content: string): string {
    return content
      .replace(/complex jargon/g, "simple terms")
      .replace(/technical language/g, "everyday words")
      .replace(/abstract concepts/g, "concrete examples");
  }

  // Generate viral hook based on pattern
  static generateHook(pattern: string, topic: string, keyInsight: string): string {
    const patternData = this.patterns[pattern];
    if (!patternData) return "🧵";

    const hook = patternData.hookTemplate
      .replace("[Attention-grabbing statement]", keyInsight)
      .replace("[Curiosity gap or surprising claim]", `Most people think ${topic} is simple, but...`)
      .replace("[Promise of value or insight]", "Here's what you need to know")
      .replace("[Optional: Stakes or urgency]", "This could change everything");

    return hook;
  }

  // Generate complete viral thread
  static generateViralThread(
    topic: ThreadTopic,
    keyInsights: string[],
    examples: string[]
  ): string[] {
    const pattern = this.patterns[topic.pattern];
    if (!pattern) return [];

    const thread: string[] = [];
    
    // Generate hook
    const hook = this.generateHook(topic.pattern, topic.title, keyInsights[0]);
    thread.push(hook);

    // Generate thread content based on pattern structure
    pattern.structure.slice(1).forEach((step, index) => {
      let content = step;
      
      // Replace placeholders with actual content
      if (step.includes("insight") && keyInsights[index]) {
        content = keyInsights[index];
      }
      
      if (step.includes("example") && examples[index]) {
        content = examples[index];
      }

      // Apply Feynman Technique
      content = this.applyFeynmanTechnique(content);
      
      thread.push(content);
    });

    return thread;
  }

  // Get available topics for content strategy
  static getAvailableTopics(): ThreadTopic[] {
    return this.topics;
  }

  // Get pattern details
  static getPattern(patternName: string): ViralThreadPattern | null {
    return this.patterns[patternName] || null;
  }

  // Analyze content for viral potential
  static analyzeViralPotential(content: string): {
    score: number;
    suggestions: string[];
    pattern: string;
  } {
    let score = 0;
    const suggestions: string[] = [];
    let pattern = "unknown";

    // Check for viral elements
    if (content.includes("99%") || content.includes("most people")) {
      score += 20;
      pattern = "contrarianReveal";
      suggestions.push("Add more contrarian insights");
    }

    if (content.includes("step") || content.includes("process")) {
      score += 15;
      pattern = "stepByStepBreakdown";
      suggestions.push("Break down into numbered steps");
    }

    if (content.includes("psychology") || content.includes("brain")) {
      score += 15;
      pattern = "psychologyDeepDive";
      suggestions.push("Add more psychological insights");
    }

    // Check for engagement triggers
    if (content.includes("?")) score += 10;
    if (content.includes("🧵")) score += 5;
    if (content.length < 280) score += 10;

    return { score, suggestions, pattern };
  }
} 