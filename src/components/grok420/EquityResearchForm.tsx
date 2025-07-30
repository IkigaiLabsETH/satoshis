'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Loader2, FileText, Target, Calendar, BarChart3 } from 'lucide-react';

export interface EquityResearchData {
  fundamentalAnalysis: {
    revenueGrowth: string;
    margins: string;
    freeCashFlow: string;
    valuation: string;
    insiderActivity: string;
    financialHealth: string;
    institutionalOwnership: string;
    socialSentiment: string;
  };
  technicalAnalysis: {
    trend: string;
    momentum: string;
    supportResistance: string;
    volumeAnalysis: string;
  };
  thesisValidation: {
    supportingArguments: string[];
    counterArguments: string[];
    verdict: 'Bullish' | 'Bearish' | 'Neutral';
    justification: string;
  };
  sectorMacroView: {
    sectorOverview: string;
    macroTrends: string;
    competitivePosition: string;
    regulatoryEnvironment: string;
  };
  catalystWatch: {
    shortTerm: string[];
    longTerm: string[];
    earningsCatalysts: string[];
    regulatoryCatalysts: string[];
  };
  investmentSummary: {
    thesis: string[];
    recommendation: 'Buy' | 'Hold' | 'Sell';
    confidence: 'High' | 'Medium' | 'Low';
    timeframe: string;
    riskFactors: string[];
  };
}

interface EquityResearchFormProps {
  onSubmit: (data: EquityResearchData) => void;
}

export default function EquityResearchForm({ onSubmit }: EquityResearchFormProps) {
  const [ticker, setTicker] = useState('');
  const [investmentThesis, setInvestmentThesis] = useState('');
  const [goal, setGoal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticker.trim()) {
      setError('Ticker symbol is required');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/equity-research', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticker: ticker.toUpperCase(),
          investmentThesis: investmentThesis.trim() || undefined,
          goal: goal.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to perform equity research analysis');
      }

      onSubmit(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const _getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Bullish':
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'Bearish':
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      case 'Neutral':
        return <Minus className="h-5 w-5 text-yellow-400" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm shadow-2xl"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
          Elite Equity Research Analysis
        </h2>
        <p className="text-white/70 text-sm">
          Professional-grade analysis using the elite equity research framework
        </p>
        <div className="mt-2 text-xs text-yellow-400/60">
          <p>📊 Fundamental Analysis • 🎯 Thesis Validation • 🌍 Sector & Macro View</p>
          <p>⚡ Catalyst Watch • 💼 Investment Summary</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ticker" className="block text-sm font-medium text-yellow-400 mb-2">
            Stock Ticker / Company Name *
          </label>
          <input
            type="text"
            id="ticker"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="e.g., AAPL, TSLA, MSTR"
            className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white placeholder-yellow-400/50 focus:border-yellow-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="thesis" className="block text-sm font-medium text-yellow-400 mb-2">
            Investment Thesis (Optional)
          </label>
          <textarea
            id="thesis"
            value={investmentThesis}
            onChange={(e) => setInvestmentThesis(e.target.value)}
            placeholder="e.g., High-growth technology company with strong market positioning, Value play with strong fundamentals, Momentum trade based on technical indicators..."
            rows={3}
            className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white placeholder-yellow-400/50 focus:border-yellow-500 focus:outline-none resize-none"
          />
        </div>

        <div>
          <label htmlFor="goal" className="block text-sm font-medium text-yellow-400 mb-2">
            Analysis Goal (Optional)
          </label>
          <input
            type="text"
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g., Provide comprehensive investment analysis with clear buy/hold/sell recommendation"
            className="w-full bg-black/60 border border-yellow-500/30 rounded-lg px-4 py-3 text-white placeholder-yellow-400/50 focus:border-yellow-500 focus:outline-none"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg"
          >
            <p className="text-red-400 text-sm">{error}</p>
          </motion.div>
        )}

        <button
          type="submit"
          disabled={isLoading || !ticker.trim()}
          className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-500/50 text-black font-bold px-6 py-3 rounded-lg transition-colors disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating Elite Analysis...
            </>
          ) : (
            <>
              <FileText className="h-5 w-5" />
              Generate Elite Equity Research Report
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}

export function EquityResearchReport({ data }: { data: EquityResearchData }) {
  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'Bullish':
        return <TrendingUp className="h-5 w-5 text-green-400" />;
      case 'Bearish':
        return <TrendingDown className="h-5 w-5 text-red-400" />;
      default:
        return <Minus className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Buy':
        return 'text-green-400';
      case 'Sell':
        return 'text-red-400';
      default:
        return 'text-yellow-400';
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'text-green-400';
      case 'Medium':
        return 'text-yellow-400';
      default:
        return 'text-red-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-500/30 scrollbar-track-transparent"
    >
      {/* Fundamental Analysis */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-yellow-500" />
          Fundamental Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Revenue Growth</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.revenueGrowth}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Margins</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.margins}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Free Cash Flow</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.freeCashFlow}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Valuation</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.valuation}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Insider Activity</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.insiderActivity}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Financial Health</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.financialHealth}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Institutional Ownership</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.institutionalOwnership}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Social Sentiment</p>
            <p className="text-white font-semibold">{data.fundamentalAnalysis.socialSentiment}</p>
          </div>
        </div>
      </div>

      {/* Technical Analysis */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-yellow-500" />
          Technical Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Trend</p>
            <p className="text-white font-semibold">{data.technicalAnalysis.trend}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Momentum (RSI)</p>
            <p className="text-white font-semibold">{data.technicalAnalysis.momentum}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Support/Resistance</p>
            <p className="text-white font-semibold">{data.technicalAnalysis.supportResistance}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Volume Analysis</p>
            <p className="text-white font-semibold">{data.technicalAnalysis.volumeAnalysis}</p>
          </div>
        </div>
      </div>

      {/* Thesis Validation */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-yellow-500" />
          Thesis Validation
        </h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-green-400 mb-2">Supporting Arguments</h4>
          <ul className="space-y-2">
            {data.thesisValidation.supportingArguments.map((arg, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                <span className="text-white/90">{arg}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <h4 className="text-lg font-semibold text-red-400 mb-2">Counter Arguments</h4>
          <ul className="space-y-2">
            {data.thesisValidation.counterArguments.map((arg, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                <span className="text-white/90">{arg}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
          <div className="flex items-center gap-2 mb-2">
            {getVerdictIcon(data.thesisValidation.verdict)}
            <h4 className="text-lg font-bold text-white">Verdict: {data.thesisValidation.verdict}</h4>
          </div>
          <p className="text-white/80">{data.thesisValidation.justification}</p>
        </div>
      </div>

      {/* Sector & Macro View */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Sector & Macro View</h3>
        <div className="space-y-4">
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Sector Overview</h4>
            <p className="text-white/90">{data.sectorMacroView.sectorOverview}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Macro Trends</h4>
            <p className="text-white/90">{data.sectorMacroView.macroTrends}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Competitive Position</h4>
            <p className="text-white/90">{data.sectorMacroView.competitivePosition}</p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-yellow-400 mb-2">Regulatory Environment</h4>
            <p className="text-white/90">{data.sectorMacroView.regulatoryEnvironment}</p>
          </div>
        </div>
      </div>

      {/* Catalyst Watch */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-yellow-500" />
          Catalyst Watch
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-green-400 mb-2">Short-term Catalysts</h4>
            <ul className="space-y-2">
              {data.catalystWatch.shortTerm.map((catalyst, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span className="text-white/90 text-sm">{catalyst}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-blue-400 mb-2">Long-term Catalysts</h4>
            <ul className="space-y-2">
              {data.catalystWatch.longTerm.map((catalyst, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span className="text-white/90 text-sm">{catalyst}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-purple-400 mb-2">Earnings Catalysts</h4>
            <ul className="space-y-2">
              {data.catalystWatch.earningsCatalysts.map((catalyst, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-purple-400 mt-1">•</span>
                  <span className="text-white/90 text-sm">{catalyst}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <h4 className="text-lg font-semibold text-orange-400 mb-2">Regulatory Catalysts</h4>
            <ul className="space-y-2">
              {data.catalystWatch.regulatoryCatalysts.map((catalyst, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-orange-400 mt-1">•</span>
                  <span className="text-white/90 text-sm">{catalyst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Investment Summary */}
      <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-yellow-500/30 p-6 rounded-2xl backdrop-blur-sm">
        <h3 className="text-xl font-bold text-white mb-4">Investment Summary</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-yellow-400 mb-2">Investment Thesis</h4>
          <ul className="space-y-2">
            {data.investmentSummary.thesis.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-400 mt-1">•</span>
                <span className="text-white/90">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Recommendation</p>
            <p className={`text-xl font-bold ${getRecommendationColor(data.investmentSummary.recommendation)}`}>
              {data.investmentSummary.recommendation}
            </p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Confidence</p>
            <p className={`text-xl font-bold ${getConfidenceColor(data.investmentSummary.confidence)}`}>
              {data.investmentSummary.confidence}
            </p>
          </div>
          <div className="bg-black/30 p-4 rounded-xl border border-yellow-500/20">
            <p className="text-white/60 text-sm mb-1">Timeframe</p>
            <p className="text-xl font-bold text-white">{data.investmentSummary.timeframe}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-lg font-semibold text-red-400 mb-2">Risk Factors</h4>
          <ul className="space-y-2">
            {data.investmentSummary.riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-red-400 mt-1">⚠</span>
                <span className="text-white/90 text-sm">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
} 