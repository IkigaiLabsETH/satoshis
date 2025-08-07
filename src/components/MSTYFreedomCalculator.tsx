'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Settings, Target, PieChart, DollarSign, Calculator } from 'lucide-react';
import { DEFAULT_VALUES, INPUT_CONFIG } from '@/config/calculator';
import { calculateFreedomMetrics, formatCurrency, formatNumber } from '@/utils/calculator';

interface InputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    value: string;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.5
    }
  }
};

const progressVariants: Variants = {
  hidden: { width: 0 },
  visible: (custom: number) => ({
    width: `${custom}%`,
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
      delay: 0.5
    }
  })
};

export function MSTYFreedomCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(DEFAULT_VALUES.MONTHLY_INCOME);
  const [mstPrice, setMstPrice] = useState<number>(DEFAULT_VALUES.MST_PRICE);
  const [monthlyDividend, setMonthlyDividend] = useState<number>(DEFAULT_VALUES.MONTHLY_DIVIDEND);
  const [btcPrice] = useState<number>(DEFAULT_VALUES.BTC_PRICE);
  const [usdEurRate, setUsdEurRate] = useState<number>(DEFAULT_VALUES.USD_EUR_RATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: InputEvent) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value)) {
        setter(value);
      }
    };

  const {
    sharesNeeded,
    totalInvestment,
    btcRequired,
    currentTier,
    progress,
    taxCalculations,
    portfolioAllocation
  } = calculateFreedomMetrics(monthlyIncome, mstPrice, monthlyDividend, btcPrice, usdEurRate);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black font-satoshi">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          <motion.div variants={cardVariants}>
            <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <CardContent className="p-6">
                <motion.div variants={contentVariants} className="flex items-start gap-4 mb-6">
                  <Settings className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-yellow-500">Parameters</h2>
                </motion.div>
                <motion.div variants={contentVariants} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {INPUT_CONFIG.MONTHLY_INCOME.label}
                    </label>
                    <Input
                      type="number"
                      value={monthlyIncome}
                      onChange={handleInputChange(setMonthlyIncome)}
                      className="bg-[#2a2d35] border border-yellow-500/20 text-white focus:border-yellow-500 focus:ring-yellow-500"
                      min={INPUT_CONFIG.MONTHLY_INCOME.min}
                      step={INPUT_CONFIG.MONTHLY_INCOME.step}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {INPUT_CONFIG.MST_PRICE.label}
                    </label>
                    <Input
                      type="number"
                      value={mstPrice}
                      onChange={handleInputChange(setMstPrice)}
                      className="bg-[#2a2d35] border border-yellow-500/20 text-white focus:border-yellow-500 focus:ring-yellow-500"
                      min={INPUT_CONFIG.MST_PRICE.min}
                      step={INPUT_CONFIG.MST_PRICE.step}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {INPUT_CONFIG.MONTHLY_DIVIDEND.label}
                    </label>
                    <Input
                      type="number"
                      value={monthlyDividend}
                      onChange={handleInputChange(setMonthlyDividend)}
                      className="bg-[#2a2d35] border border-yellow-500/20 text-white focus:border-yellow-500 focus:ring-yellow-500"
                      min={INPUT_CONFIG.MONTHLY_DIVIDEND.min}
                      step={INPUT_CONFIG.MONTHLY_DIVIDEND.step}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      {INPUT_CONFIG.USD_EUR_RATE.label}
                    </label>
                    <Input
                      type="number"
                      value={usdEurRate}
                      onChange={handleInputChange(setUsdEurRate)}
                      className="bg-[#2a2d35] border border-yellow-500/20 text-white focus:border-yellow-500 focus:ring-yellow-500"
                      min={INPUT_CONFIG.USD_EUR_RATE.min}
                      step={INPUT_CONFIG.USD_EUR_RATE.step}
                    />
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <CardContent className="p-6">
                <motion.div variants={contentVariants} className="flex items-start gap-4 mb-6">
                  <Target className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-yellow-500">Metrics</h2>
                </motion.div>
                <motion.div variants={contentVariants} className="space-y-4">
                  <div>
                    <div className="text-white/60 mb-2">Shares Needed</div>
                    <div className="text-3xl font-bold text-white">{formatNumber(sharesNeeded)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">Total Investment</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(totalInvestment)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">BTC Required</div>
                    <div className="text-3xl font-bold text-white">{formatNumber(btcRequired, 2)} BTC</div>
                  </div>
                  <div className="pt-8">
                    <div className="h-2 w-full bg-yellow-500/20 rounded-full">
                      <motion.div 
                        variants={progressVariants}
                        custom={progress}
                        className={`h-2 rounded-full ${currentTier.color}`}
                      />
                    </div>
                    <p className="text-sm text-white/60 mt-2">{currentTier.description}</p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <CardContent className="p-6">
                <motion.div variants={contentVariants} className="flex items-start gap-4 mb-6">
                  <DollarSign className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-yellow-500">Tax</h2>
                </motion.div>
                <motion.div variants={contentVariants} className="space-y-4">
                  <div>
                    <div className="text-white/60 mb-2">Gross Yearly Income</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(taxCalculations.grossYearlyIncome)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">US Withholding Tax (15%)</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(taxCalculations.usWithholdingTax)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">European Tax (15%)</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(taxCalculations.europeanTax)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">Net Income in EUR</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(taxCalculations.netInEur, 'EUR')}</div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="bg-[#1c1f26] border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
              <CardContent className="p-6">
                <motion.div variants={contentVariants} className="flex items-start gap-4 mb-6">
                  <PieChart className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-yellow-500">Allocation</h2>
                </motion.div>
                <motion.div variants={contentVariants} className="space-y-4">
                  <div>
                    <div className="text-white/60 mb-2">Recommended Portfolio</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(portfolioAllocation.totalPortfolio)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">MSTY (Income)</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(portfolioAllocation.mstyInvestment)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">BTC (Savings)</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(portfolioAllocation.btcInvestment)}</div>
                  </div>
                  <div>
                    <div className="text-white/60 mb-2">MSTR (Growth)</div>
                    <div className="text-3xl font-bold text-white">{formatCurrency(portfolioAllocation.mstrInvestment)}</div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-8 flex justify-center"
        >
          <Button 
            className="bg-[#1c1f26] w-[400px] h-[80px] border-2 border-yellow-500 text-white hover:bg-yellow-500 hover:text-black font-bold text-xl rounded-xl transition-all duration-300"
            onClick={() => window.open('https://yieldmaxetfs.com/msty', '_blank')}
          >
            <div className="flex items-center justify-center w-full space-x-3">
              <Calculator className="w-6 h-6" />
              <span>YieldMaxETFS</span>
            </div>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5,
            duration: 0.8,
            ease: "easeOut"
          }}
          className="text-center max-w-3xl mx-auto mt-16 mb-12 px-4"
        >
          <div className="relative">
            <div className="absolute -left-4 -top-4 text-4xl text-yellow-500 opacity-50">&ldquo;</div>
            <div className="absolute -right-4 -bottom-4 text-4xl text-yellow-500 opacity-50">&rdquo;</div>
            <p className="text-xl md:text-2xl text-white/80 font-epilogue italic">
              Live Life off MSTY distributions and let MSTR &amp; BTC stack over time, tax-deferred (not in EUR). 
              You&apos;re cashflow-rich, compounding hard money, and never touching the principal.
            </p>
            <div className="mt-4 text-yellow-500/60">
              — YieldMax™ MSTR Option Income Strategy ETF
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 