'use client';

import React from "react";

interface ResultsSectionProps {
  form: {
    yearlyDrawUSD: number;
    ltvTarget: number;
    horizon: number;
  };
  totalBTCNeeded: number;
  currentBTCPrice: number;
  repaymentSeries: number[];
}

export function ResultsSection({ form, totalBTCNeeded, currentBTCPrice, repaymentSeries }: ResultsSectionProps) {
  const totalBTCSold = repaymentSeries.reduce((sum, val) => sum + val, 0);
  const totalBTCSoldUSD = totalBTCSold * currentBTCPrice;
  
  return (
    <div className="space-y-8">
      {/* USD Collateral Requirements */}
      <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">🎯 Two Critical Bitcoin Requirements:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mb-6">
          <div className="bg-black/30 p-6 rounded-lg border border-green-500/20 text-center">
            <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">To START Borrowing</div>
            <div className="text-green-400 font-bold text-4xl mb-2">{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)}</div>
            <div className="text-gray-400 text-lg">BTC</div>
            <p className="text-xs text-gray-500 mt-2">Required to initiate a ${form.yearlyDrawUSD.toLocaleString()} loan at {(form.ltvTarget * 100).toFixed(0)}% LTV</p>
          </div>
          <div className="bg-black/30 p-6 rounded-lg border border-green-500/20 text-center">
            <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">To MAINTAIN Loan</div>
            <div className="text-green-400 font-bold text-4xl mb-2">{totalBTCNeeded.toFixed(2)}</div>
            <div className="text-gray-400 text-lg">BTC</div>
            <p className="text-xs text-gray-500 mt-2">Minimum required over {form.horizon} years (peak requirement)</p>
          </div>
        </div>
        <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 text-center">
          <h5 className="text-green-400 font-bold mb-2">💡 Zero Risk Key Insight:</h5>
          <p className="text-gray-300 text-sm">
            You need <span className="text-green-400 font-bold">{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC</span> to START borrowing, but only <span className="text-green-400 font-bold">{totalBTCNeeded.toFixed(2)} BTC</span> to MAINTAIN the loan over time. Bitcoin appreciation reduces your requirements with ZERO liquidation risk!
          </p>
        </div>
      </div>

      {/* Zero Risk Reality Check */}
      <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-red-400 mb-4 text-center">⚠️ Zero Risk Reality Check</h3>
        <div className="text-gray-300 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-red-400 mt-1">•</div>
            <div>
              <strong>To START borrowing ${form.yearlyDrawUSD.toLocaleString()} annually:</strong> You need <span className="text-red-400 font-bold">{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC</span> (${((form.yearlyDrawUSD / form.ltvTarget)).toLocaleString()}) as collateral
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-red-400 mt-1">•</div>
            <div>
              <strong>To MAINTAIN the loan over {form.horizon} years:</strong> You need <span className="text-red-400 font-bold">{totalBTCNeeded.toFixed(2)} BTC</span> (${(totalBTCNeeded * currentBTCPrice).toLocaleString()}) at peak requirement
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-red-400 mt-1">•</div>
            <div>
              <strong>Total Bitcoin sold for repayment (no external income):</strong> <span className="text-red-400 font-bold">{totalBTCSold.toFixed(2)} BTC</span> (${totalBTCSoldUSD.toLocaleString()})
            </div>
          </div>
        </div>
      </div>

      {/* The Zero Risk Strategy */}
      <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-blue-400 mb-4 text-center">🚀 The Zero Risk Strategy</h3>
        <div className="text-gray-300 space-y-4">
          <p>
            With a <span className="text-blue-400 font-bold">{(form.ltvTarget * 100).toFixed(0)}% LTV target</span>, you maintain a <span className="text-blue-400 font-bold">{((1 - form.ltvTarget) * 100).toFixed(0)}% safety margin</span>. This means:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
              <h5 className="text-blue-400 font-semibold mb-2">✅ ZERO Liquidation Risk</h5>
              <p className="text-sm">Even if Bitcoin drops 90%, you&apos;re still safe from liquidation</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg border border-blue-500/20">
              <h5 className="text-blue-400 font-semibold mb-2">💰 Maximum Borrowing Power</h5>
              <p className="text-sm">You can borrow ${form.yearlyDrawUSD.toLocaleString()} annually with ${((form.yearlyDrawUSD / form.ltvTarget)).toLocaleString()} in Bitcoin collateral</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 