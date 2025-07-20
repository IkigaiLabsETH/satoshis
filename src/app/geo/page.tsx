'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Target, Users, FileText, TrendingUp } from 'lucide-react';

interface GEOOptimizationOptions {
  targetLLMs?: string[];
  industry?: string;
  targetAudience?: string;
  contentType?: 'blog' | 'product' | 'service' | 'tutorial' | 'review' | 'comparison';
  brandName?: string;
  includeData?: boolean;
  includeUseCases?: boolean;
}

interface GEOOptimizedContent {
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

export default function GEOPage() {
  const [content, setContent] = useState('');
  const [optimizedContent, setOptimizedContent] = useState<GEOOptimizedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState<'optimize' | 'generate'>('optimize');
  const [topic, setTopic] = useState('');
  const [options, setOptions] = useState<GEOOptimizationOptions>({
    targetLLMs: ['ChatGPT', 'Claude', 'Gemini', 'Perplexity'],
    industry: '',
    targetAudience: '',
    contentType: 'blog',
    brandName: '',
    includeData: true,
    includeUseCases: true
  });

  const handleOptimize = async () => {
    if (!content.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/geo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          action,
          topic: action === 'generate' ? topic : undefined,
          options
        }),
      });

      const result = await response.json();
      if (result.success) {
        setOptimizedContent(result.data);
      } else {
        // Handle error silently or show user-friendly message
      }
    } catch {
      // Handle error silently or show user-friendly message
    } finally {
      setIsLoading(false);
    }
  };

  const getMetricColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-yellow-400" />
            GEO - Generative Engine Optimization
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Optimize your content to be referenced and recommended by large language models like ChatGPT, Claude, Gemini, and Perplexity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Target className="text-blue-400" />
                Content Input
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter your content or topic to optimize for LLM visibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="action" className="text-white">Action Type</Label>
                <Select value={action} onValueChange={(value: 'optimize' | 'generate') => setAction(value)}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="optimize">Optimize Existing Content</SelectItem>
                    <SelectItem value="generate">Generate New Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {action === 'generate' && (
                <div>
                  <Label htmlFor="topic" className="text-white">Topic</Label>
                  <Input
                    id="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Bitcoin mining, AI prompt engineering..."
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              )}

                             {action === 'optimize' && (
                 <div>
                   <Label htmlFor="content" className="text-white">Content to Optimize</Label>
                   <textarea
                     id="content"
                     value={content}
                     onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                     placeholder="Paste your content here..."
                     className="min-h-[200px] w-full bg-white/10 border border-white/20 text-white placeholder-gray-400 rounded-md p-3 resize-none"
                   />
                 </div>
               )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="industry" className="text-white">Industry</Label>
                  <Input
                    id="industry"
                    value={options.industry}
                    onChange={(e) => setOptions({ ...options, industry: e.target.value })}
                    placeholder="e.g., Technology"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="audience" className="text-white">Target Audience</Label>
                  <Input
                    id="audience"
                    value={options.targetAudience}
                    onChange={(e) => setOptions({ ...options, targetAudience: e.target.value })}
                    placeholder="e.g., Developers"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contentType" className="text-white">Content Type</Label>
                                     <Select 
                     value={options.contentType} 
                     onValueChange={(value: 'blog' | 'product' | 'service' | 'tutorial' | 'review' | 'comparison') => setOptions({ ...options, contentType: value })}
                   >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog Post</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                      <SelectItem value="tutorial">Tutorial</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                      <SelectItem value="comparison">Comparison</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="brandName" className="text-white">Brand Name (Optional)</Label>
                  <Input
                    id="brandName"
                    value={options.brandName}
                    onChange={(e) => setOptions({ ...options, brandName: e.target.value })}
                    placeholder="e.g., OpenAI"
                    className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Button 
                onClick={handleOptimize} 
                disabled={isLoading || (!content.trim() && action === 'optimize') || (!topic.trim() && action === 'generate')}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {action === 'optimize' ? 'Optimize Content' : 'Generate Content'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="text-green-400" />
                Optimization Results
              </CardTitle>
              <CardDescription className="text-gray-300">
                Your content optimized for LLM visibility and citation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {optimizedContent ? (
                <>
                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(optimizedContent.optimizationMetrics.contextualRelevance * 100)}%
                      </div>
                      <div className="text-sm text-gray-300">Contextual Relevance</div>
                      <div className={`w-full h-2 mt-2 rounded-full ${getMetricColor(optimizedContent.optimizationMetrics.contextualRelevance)}`}></div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(optimizedContent.optimizationMetrics.semanticRichness * 100)}%
                      </div>
                      <div className="text-sm text-gray-300">Semantic Richness</div>
                      <div className={`w-full h-2 mt-2 rounded-full ${getMetricColor(optimizedContent.optimizationMetrics.semanticRichness)}`}></div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(optimizedContent.optimizationMetrics.answerStyleFormatting * 100)}%
                      </div>
                      <div className="text-sm text-gray-300">Answer Formatting</div>
                      <div className={`w-full h-2 mt-2 rounded-full ${getMetricColor(optimizedContent.optimizationMetrics.answerStyleFormatting)}`}></div>
                    </div>
                    <div className="text-center p-3 bg-white/5 rounded-lg">
                      <div className="text-2xl font-bold text-white">
                        {Math.round(optimizedContent.optimizationMetrics.topicalAuthority * 100)}%
                      </div>
                      <div className="text-sm text-gray-300">Topical Authority</div>
                      <div className={`w-full h-2 mt-2 rounded-full ${getMetricColor(optimizedContent.optimizationMetrics.topicalAuthority)}`}></div>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div>
                    <Label className="text-white flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      Suggested Keywords
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {optimizedContent.suggestedKeywords.map((keyword, index) => (
                        <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* LLM Compatibility */}
                  <div>
                    <Label className="text-white flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4" />
                      LLM Compatibility
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {optimizedContent.llmCompatibility.map((llm, index) => (
                        <Badge key={index} variant="outline" className="border-green-500/30 text-green-300">
                          {llm}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Optimized Content */}
                  <div>
                    <Label className="text-white mb-2">Optimized Content</Label>
                    <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">
                        {optimizedContent.optimizedContent}
                      </pre>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-400">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your optimized content will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 