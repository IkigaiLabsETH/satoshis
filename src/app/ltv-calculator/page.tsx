'use client';

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { TrendingUp, Calculator, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import useSWR from 'swr';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface Inputs {
  btcSpot: number;
  yearlyDrawUSD: number;
  interestRate: number;
  btcCAGR1: number;
  btcCAGR2: number;
  ltvTarget: number;
  horizon: number;
}

const defaultInputs: Inputs = {
  btcSpot: 104000,
  yearlyDrawUSD: 100_000,
  interestRate: 0.05,
  btcCAGR1: 0.30,
  btcCAGR2: 0.21,
  ltvTarget: 0.10, // Zero liquidation risk: 10% LTV (90% safety margin)
  horizon: 15,
};

function btcNeededSchedule(i: Inputs): number[] {
  let loanBalance = 0; // assume zero initial balance
  let btcPrice = i.btcSpot;
  const out: number[] = [];

  for (let yr = 1; yr <= i.horizon; yr++) {
    loanBalance = loanBalance * (1 + i.interestRate) + i.yearlyDrawUSD;
    const growth = yr <= 8 ? i.btcCAGR1 : i.btcCAGR2;
    btcPrice *= 1 + growth;
    out.push(loanBalance / ((1 - i.ltvTarget) * btcPrice));
  }
  return out;
}

function btcSoldForRepayment(i: Inputs): number[] {
  let loanBalance = 0;
  let btcPrice = i.btcSpot;
  const out: number[] = [];

  for (let yr = 1; yr <= i.horizon; yr++) {
    // Calculate loan balance for this year
    loanBalance = loanBalance * (1 + i.interestRate) + i.yearlyDrawUSD;
    
    // Calculate BTC price for this year
    const growth = yr <= 8 ? i.btcCAGR1 : i.btcCAGR2;
    btcPrice *= 1 + growth;
    
    // Calculate how much BTC needs to be sold to repay the yearly draw + interest
    const yearlyPayment = i.yearlyDrawUSD + (loanBalance - i.yearlyDrawUSD) * i.interestRate;
    const btcToSell = yearlyPayment / btcPrice;
    
    out.push(btcToSell);
  }
  return out;
}



// Interactive Chart Component
function InteractiveBTCChart({ series, repaymentSeries }: { series: number[], repaymentSeries: number[] }) {
  const labels = series.map((_, idx) => `Year ${idx + 1}`);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'BTC Required for Collateral',
        data: series,
        borderColor: '#fbbf24', // yellow-400
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#fbbf24',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.3,
        borderWidth: 3,
        fill: true,
      },
      {
        label: 'BTC Sold for Repayment',
        data: repaymentSeries,
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        tension: 0.3,
        borderWidth: 3,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        }
      },
      title: {
        display: true,
        text: 'Bitcoin Requirements & Repayment Over Time',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fbbf24',
        bodyColor: 'white',
        borderColor: '#fbbf24',
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'BTC Required for Collateral') {
              return `Collateral Required: ${context.parsed.y.toFixed(2)} BTC`;
            } else {
              return `BTC Sold for Repayment: ${context.parsed.y.toFixed(2)} BTC`;
            }
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Bitcoin (BTC)',
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return `${Number(value).toFixed(1)} BTC`;
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      x: {
        title: {
          display: true,
          text: 'Years',
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        ticks: {
          color: 'white',
          maxRotation: 0,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return <Line options={options} data={data} />;
}

// Vibes Integration Component


const Page = () => {
  const [form, setForm] = useState<Inputs>(defaultInputs);
  const [realTimePrice, setRealTimePrice] = useState<number | null>(null);
  const series = useMemo(() => btcNeededSchedule(form), [form]);
  const repaymentSeries = useMemo(() => btcSoldForRepayment(form), [form]);

  // Fetch real-time Bitcoin price from CoinGecko
  const { data: priceData } = useSWR(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
    (url) => fetch(url).then(res => res.json()),
    { refreshInterval: 30000 } // Update every 30 seconds
  );

  // Use real-time price if available, otherwise use form input
  const currentBTCPrice = realTimePrice || form.btcSpot;

  const onChange = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [key]: parseFloat(e.target.value) });
  };

  // Update real-time price when data changes
  React.useEffect(() => {
    if (priceData?.bitcoin?.usd) {
      setRealTimePrice(priceData.bitcoin.usd);
    }
  }, [priceData]);

  const totalBTCNeeded = series[series.length - 1];
  const totalUSDValue = totalBTCNeeded * currentBTCPrice;

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light">
              Zero Liquidation Risk • Ultra-Conservative • Never Sell Strategy
            </p>
            <h1 className="text-center">
              <span className="text-5xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]">
                Bitcoin Zero Risk Calculator
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic">
                Calculate Bitcoin requirements for zero liquidation risk borrowing
              </p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

                     {/* Main Calculator Card */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-8 text-center flex items-center justify-center gap-3">
               <Calculator size={28} />
               Zero Risk Calculator Parameters
             </h3>
             
             <div className="max-w-4xl mx-auto space-y-8">
               {/* Input Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                     BTC Spot Price
                     {realTimePrice && (
                       <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded">
                         LIVE
                       </span>
                     )}
                   </label>
                   <Input
                     type="number"
                     step="any"
                     value={currentBTCPrice}
                     onChange={onChange("btcSpot")}
                     placeholder="104000"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                   {realTimePrice && (
                     <div className="text-xs text-green-400">
                       Real-time price: ${realTimePrice.toLocaleString()}
                     </div>
                   )}
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">Annual Draw (USD)</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.yearlyDrawUSD}
                     onChange={onChange("yearlyDrawUSD")}
                     placeholder="100000"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">Interest Rate</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.interestRate}
                     onChange={onChange("interestRate")}
                     placeholder="0.05"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">Target LTV (Zero Risk)</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.ltvTarget}
                     onChange={onChange("ltvTarget")}
                     placeholder="0.10"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                   <div className="text-xs text-green-400">
                     10% LTV = 90% safety margin (zero liquidation risk)
                   </div>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">BTC CAGR (Years 1-8)</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.btcCAGR1}
                     onChange={onChange("btcCAGR1")}
                     placeholder="0.30"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-300">BTC CAGR (Years 9+)</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.btcCAGR2}
                     onChange={onChange("btcCAGR2")}
                     placeholder="0.21"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
                 </div>
                 
                 <div className="space-y-2 lg:col-span-3">
                   <label className="text-sm font-medium text-gray-300">Time Horizon (Years)</label>
                   <Input
                     type="number"
                     value={form.horizon}
                     onChange={onChange("horizon")}
                     placeholder="15"
                     className="bg-gray-800 border-gray-600 text-white max-w-md"
                   />
                 </div>
               </div>

               {/* Results and Vibes Section */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



               </div>
             </div>
           </div>

           {/* Bitcoin Safety Requirements Frame */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center flex items-center justify-center gap-3">
               <TrendingUp size={28} />
               Your Zero Risk Bitcoin Requirements
             </h3>
             <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
               Based on your calculator parameters, here are your projected Bitcoin requirements to maintain zero liquidation risk over time.
             </p>
             
             <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 max-w-3xl mx-auto mb-8">
               <h4 className="text-yellow-400 font-semibold mb-3 text-center">📈 Zero Liquidation Risk: Understanding Your Bitcoin Requirements for ${form.yearlyDrawUSD.toLocaleString()} Annual Borrowing</h4>
               <div className="text-gray-300 text-sm space-y-4">
                 <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                   <h5 className="text-green-400 font-semibold mb-2">🛡️ Zero Risk Requirement:</h5>
                   <p><strong>You need AT LEAST {((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC (${(((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice) * currentBTCPrice).toLocaleString()}) to start!</strong> This is the <span className="text-green-400 font-semibold">minimum Bitcoin collateral required</span> to borrow ${form.yearlyDrawUSD.toLocaleString()} annually at {(form.ltvTarget * 100).toFixed(0)}% LTV with <span className="text-green-400 font-bold">ZERO liquidation risk</span>.</p>
                 </div>
                 
                 <div className="space-y-2">
                   <p><strong>📊 The Zero Risk Reality Check:</strong></p>
                   <ul className="list-disc list-inside space-y-1 ml-4">
                     <li><strong>Year 1:</strong> You need ~{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC (${(((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice) * currentBTCPrice).toLocaleString()}) to borrow ${form.yearlyDrawUSD.toLocaleString()} at {(form.ltvTarget * 100).toFixed(0)}% LTV with 90% safety margin</li>
                     <li><strong>Year 4:</strong> You need ~{totalBTCNeeded.toFixed(2)} BTC (${totalUSDValue.toLocaleString()}) - the minimum requirement with zero liquidation risk</li>
                     <li><strong>Year 15:</strong> You need ~0.05 BTC (much less due to BTC appreciation, still zero risk)</li>
                   </ul>
                 </div>
                 
                 <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/20">
                   <h5 className="text-green-400 font-semibold mb-2">🛡️ The Zero Risk Strategy:</h5>
                   <p><strong>Start with {((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC (${(((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice) * currentBTCPrice).toLocaleString()}) minimum!</strong> This ensures you can borrow ${form.yearlyDrawUSD.toLocaleString()} annually with <span className="text-green-400 font-bold">ZERO liquidation risk</span> throughout the {form.horizon}-year period.</p>
                 </div>
                 
                 <div className="bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                   <h5 className="text-blue-400 font-semibold mb-2">🔍 The Zero Risk Formula Breakdown:</h5>
                   <p className="font-mono text-xs">Required BTC = Loan Balance ÷ ((1 - {form.ltvTarget}) × BTC Price)</p>
                   <p className="text-xs mt-1">Where {form.ltvTarget} = {(form.ltvTarget * 100).toFixed(0)}% LTV target (90% safety margin), and BTC Price grows at {form.btcCAGR1 * 100}% → {form.btcCAGR2 * 100}% annually</p>
                   <p className="text-xs mt-2 text-green-400"><strong>Year 1 Example:</strong> $100K ÷ (0.90 × $104K) = {((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC needed with zero liquidation risk</p>
                 </div>
               </div>
             </div>
             
             <div className="max-w-4xl mx-auto space-y-8">
               {/* USD Collateral Requirements - Like Grok 4 Explained */}
               <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20 max-w-4xl mx-auto">
                 <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">💰 Zero Risk USD Collateral Requirements</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg mb-6">
                     <div className="bg-black/30 p-6 rounded-lg border border-green-500/20 text-center">
                       <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">To START Borrowing</div>
                       <div className="text-green-400 font-bold text-4xl mb-2">{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)}</div>
                       <div className="text-gray-400 text-lg">BTC</div>
                       <div className="text-green-400 font-bold text-xl mt-2">${(((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice) * currentBTCPrice).toLocaleString()}</div>
                       <div className="text-gray-400 text-sm">USD Collateral Value</div>
                       <p className="text-xs text-gray-500 mt-2">Required to initiate a ${form.yearlyDrawUSD.toLocaleString()} loan at {(form.ltvTarget * 100).toFixed(0)}% LTV</p>
                     </div>
                     <div className="bg-black/30 p-6 rounded-lg border border-green-500/20 text-center">
                       <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">To MAINTAIN Loan</div>
                       <div className="text-green-400 font-bold text-4xl mb-2">{totalBTCNeeded.toFixed(2)}</div>
                       <div className="text-gray-400 text-lg">BTC</div>
                       <div className="text-gray-400 text-sm">USD Collateral Value</div>
                       <div className="text-green-400 font-bold text-xl mt-2">${totalUSDValue.toLocaleString()}</div>
                       <p className="text-xs text-gray-500 mt-2">Minimum required over {form.horizon} years (peak requirement)</p>
                     </div>
                   </div>
                                    <div className="bg-green-500/20 p-4 rounded-lg border border-green-500/30 text-center">
                     <h5 className="text-green-400 font-bold mb-2">💡 Zero Risk Key Insight:</h5>
                     <p className="text-gray-300 text-sm">
                       You need <span className="text-green-400 font-bold">{((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice).toFixed(2)} BTC</span> (${(((form.yearlyDrawUSD / form.ltvTarget) / currentBTCPrice) * currentBTCPrice).toLocaleString()}) to START borrowing, but only <span className="text-green-400 font-bold">{totalBTCNeeded.toFixed(2)} BTC</span> (${totalUSDValue.toLocaleString()}) to MAINTAIN the loan over time. With 90% safety margin, you have zero liquidation risk!
                     </p>
                   </div>
               </div>
               
               {/* Results Cards */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 p-8 rounded-lg border-2 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] text-center">
                   <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">Total Bitcoin Needed</div>
                   <div className="text-yellow-400 font-bold text-5xl mb-2">{totalBTCNeeded.toFixed(2)}</div>
                   <div className="text-gray-400 text-lg">BTC</div>
                 </div>
                 
                 <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 p-8 rounded-lg border-2 border-yellow-500/30 shadow-[0_0_30px_rgba(234,179,8,0.1)] text-center">
                   <div className="text-gray-300 text-sm mb-2 uppercase tracking-wider font-medium">Current USD Value</div>
                   <div className="text-yellow-400 font-bold text-5xl mb-2">${totalUSDValue.toLocaleString()}</div>
                   <div className="text-gray-400 text-lg">USD</div>
                 </div>
               </div>
               
               {/* Safety Margin Analysis */}
               <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20 max-w-4xl mx-auto">
                 <div className="text-center mb-6">
                   <div className="text-green-400 font-semibold text-xl mb-3">Zero Risk Margin Analysis</div>
                   <div className="text-gray-300 text-lg">
                     Based on your parameters, you&apos;ll need <span className="text-green-400 font-bold text-2xl">{totalBTCNeeded.toFixed(2)} BTC</span> 
                     to maintain <span className="text-green-400 font-bold">ZERO liquidation risk</span> with <span className="text-green-400 font-bold">{(form.ltvTarget * 100).toFixed(0)}% LTV ratio</span> over <span className="text-yellow-400 font-bold">{form.horizon} years</span>.
                   </div>
                 </div>
                 
                 {/* Real-Life Example */}
                 <div className="bg-black/30 p-6 rounded-lg border border-yellow-500/20">
                   <h4 className="text-green-400 font-bold text-lg mb-4 text-center">📊 Real-Life Example: Sarah&apos;s Zero Liquidation Risk Strategy</h4>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                       <h5 className="text-green-400 font-semibold mb-3">Sarah&apos;s Zero Risk Approach:</h5>
                       <ul className="space-y-2 text-gray-300">
                         <li>• Wants to borrow ${form.yearlyDrawUSD.toLocaleString()} annually</li>
                         <li>• Only willing to use 10% of her total Bitcoin stack for loans</li>
                         <li>• Target LTV: {(form.ltvTarget * 100).toFixed(0)}% (zero liquidation risk)</li>
                         <li>• Planning for {form.horizon} years</li>
                         <li>• Keeps 90% of her Bitcoin untouched</li>
                       </ul>
                     </div>
                     
                     <div>
                       <h5 className="text-yellow-400 font-semibold mb-3">The Conservative Strategy:</h5>
                       <ul className="space-y-2 text-gray-300">
                         <li>• Maximum 10% of Bitcoin used as collateral</li>
                         <li>• 90% remains for long-term holding</li>
                         <li>• Extreme safety margin against liquidation</li>
                         <li>• Bitcoin appreciation benefits the 90% stack</li>
                         <li>• Minimal risk to overall Bitcoin position</li>
                       </ul>
                     </div>
                   </div>
                   
                   <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                     <h5 className="text-green-400 font-bold mb-3 text-center">🎯 Sarah&apos;s Zero Risk 10% Strategy Breakdown</h5>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                       <div>
                         <div className="text-yellow-400 font-bold text-lg">{totalBTCNeeded.toFixed(2)} BTC</div>
                         <div className="text-gray-400 text-sm">Required for Loan (10% of total)</div>
                       </div>
                       <div>
                         <div className="text-green-400 font-bold text-lg">{(totalBTCNeeded * 9).toFixed(2)} BTC</div>
                         <div className="text-gray-400 text-sm">Remaining Stack (90%)</div>
                       </div>
                       <div>
                         <div className="text-blue-400 font-bold text-lg">{(totalBTCNeeded * 10).toFixed(2)} BTC</div>
                         <div className="text-gray-400 text-sm">Total Bitcoin Stack</div>
                       </div>
                     </div>
                   </div>
                   
                                        <div className="mt-4 text-gray-300 text-sm">
                       <p className="mb-3">
                         <strong>Why the zero risk 10% strategy is brilliant:</strong> Sarah only risks {(totalBTCNeeded * 10).toFixed(2)} BTC × 10% = {totalBTCNeeded.toFixed(2)} BTC for her loan, 
                         while keeping {(totalBTCNeeded * 9).toFixed(2)} BTC completely safe from liquidation. This is the ultimate zero liquidation risk approach.
                       </p>
                       
                       <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/20 mt-4">
                         <h6 className="text-green-400 font-semibold mb-3">📊 The Zero Risk Timeline Advantage:</h6>
                         <div className="space-y-2 text-xs">
                           <p><strong>Years 1-4:</strong> Only 10% of Sarah&apos;s stack is at risk while 90% appreciates freely</p>
                           <p><strong>Years 5-8:</strong> Her 90% stack grows at 30% CAGR, building massive wealth</p>
                           <p><strong>Years 9+:</strong> The 90% stack continues growing while loan requirements decrease</p>
                           <p className="text-yellow-400/80 italic">This is the &quot;never sell&quot; strategy perfected - maximum Bitcoin exposure with minimal liquidation risk!</p>
                         </div>
                       </div>
                       
                       <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20 mt-4">
                         <h6 className="text-green-400 font-semibold mb-3">💰 Total Portfolio Value:</h6>
                         <div className="text-center">
                           <div className="text-green-400 font-bold text-xl">${((totalBTCNeeded * 10) * currentBTCPrice).toLocaleString()}</div>
                           <div className="text-gray-400 text-sm">Total Bitcoin Stack Value</div>
                           <div className="text-xs text-green-300 mt-2">
                             <strong>Loan Risk:</strong> ${(totalBTCNeeded * currentBTCPrice).toLocaleString()} (10%) | 
                             <strong>Safe Stack:</strong> ${((totalBTCNeeded * 9) * currentBTCPrice).toLocaleString()} (90%)
                           </div>
                         </div>
                       </div>
                       
                       <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 mt-4">
                         <h6 className="text-purple-400 font-semibold mb-3">🚀 Your 90% Stack After 15 Years (After Repayment):</h6>
                         <div className="text-center space-y-2">
                           <div className="text-purple-400 font-bold text-xl">{((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)).toFixed(2)} BTC</div>
                           <div className="text-gray-400 text-sm">Final Bitcoin Amount (90% stack minus repayment sales)</div>
                           <div className="text-purple-400 font-bold text-lg">${(((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}</div>
                           <div className="text-gray-400 text-sm">Final USD Value (with price appreciation)</div>
                           <div className="text-xs text-purple-300 mt-2">
                             <strong>Starting Value:</strong> ${((totalBTCNeeded * 9) * currentBTCPrice).toLocaleString()} | 
                             <strong>Final Value:</strong> ${(((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}
                           </div>
                         </div>
                       </div>
                       
                                                <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20 mt-4">
                           <h6 className="text-red-400 font-semibold mb-3">💰 Bitcoin Sold for Repayment (No External Income):</h6>
                           <div className="text-gray-300 text-sm space-y-2">
                             <p><strong>Total BTC Sold Over 15 Years:</strong> {repaymentSeries.reduce((sum, val) => sum + val, 0).toFixed(2)} BTC</p>
                             <p><strong>Total USD Value Sold:</strong> ${(repaymentSeries.reduce((sum, val) => sum + val, 0) * currentBTCPrice).toLocaleString()}</p>
                             <p><strong>Impact on 90% Stack:</strong> Starting with {(totalBTCNeeded * 9).toFixed(2)} BTC, you&apos;ll end with {((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)).toFixed(2)} BTC after 15 years</p>
                             <p><strong>Percentage of 90% Stack Sold:</strong> {((repaymentSeries.reduce((sum, val) => sum + val, 0) / (totalBTCNeeded * 9)) * 100).toFixed(1)}%</p>
                           </div>
                         </div>
                         
                         <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20 mt-4">
                           <h6 className="text-blue-400 font-semibold mb-3">💡 Alternative Repayment Strategies:</h6>
                           <div className="text-gray-300 text-sm space-y-2">
                             <p><strong>Option 1 - Use 90% Stack Appreciation:</strong> Your 90% stack grows from ${((totalBTCNeeded * 9) * currentBTCPrice).toLocaleString()} to ${((totalBTCNeeded * 9) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()} over 15 years. You could sell a small portion of this appreciation to repay loans.</p>
                             <p><strong>Option 2 - External Income:</strong> Use job income, business profits, or other investments to cover loan payments without touching Bitcoin.</p>
                             <p><strong>Option 3 - Compound Strategy:</strong> Let the 90% stack continue growing while using only the 10% for loans. The appreciation on 90% can eventually cover all loan costs.</p>
                           </div>
                         </div>
                         
                         <div className="bg-orange-500/10 p-4 rounded-lg border border-orange-500/20 mt-4">
                           <h6 className="text-orange-400 font-semibold mb-3">⚖️ Strategy Comparison: Loans vs. Direct Selling</h6>
                           <div className="text-gray-300 text-sm space-y-3">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                               <div className="bg-red-500/10 p-3 rounded border border-red-500/20">
                                 <h6 className="text-red-400 font-semibold">❌ Direct Selling Strategy:</h6>
                                 <div className="mt-2 space-y-1">
                                   <p><strong>Total BTC Sold:</strong> {(form.yearlyDrawUSD * form.horizon / currentBTCPrice).toFixed(2)} BTC</p>
                                   <p><strong>Final BTC Stack:</strong> {((totalBTCNeeded * 10) - (form.yearlyDrawUSD * form.horizon / currentBTCPrice)).toFixed(2)} BTC</p>
                                   <p><strong>Final Value:</strong> ${(((totalBTCNeeded * 10) - (form.yearlyDrawUSD * form.horizon / currentBTCPrice)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}</p>
                                   <p className="text-red-300 text-xs"><strong>Problem:</strong> You lose Bitcoin forever, no way to recover it</p>
                                 </div>
                               </div>
                               <div className="bg-green-500/10 p-3 rounded border border-green-500/20">
                                 <h6 className="text-green-400 font-semibold">✅ Zero Risk Loan Strategy:</h6>
                                 <div className="mt-2 space-y-1">
                                   <p><strong>Total BTC Sold:</strong> {repaymentSeries.reduce((sum, val) => sum + val, 0).toFixed(2)} BTC</p>
                                   <p><strong>Final BTC Stack:</strong> {((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)).toFixed(2)} BTC</p>
                                   <p><strong>Final Value:</strong> ${(((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}</p>
                                   <p className="text-green-300 text-xs"><strong>Advantage:</strong> You keep your Bitcoin collateral, only sell for repayment</p>
                                 </div>
                               </div>
                             </div>
                                                            <div className="bg-yellow-500/10 p-3 rounded border border-yellow-500/20">
                                 <h6 className="text-yellow-400 font-semibold">🎯 Key Advantages of Loan Strategy:</h6>
                                 <div className="mt-2 space-y-1 text-xs">
                                   <p><strong>1. Tax Efficiency:</strong> Loans are not taxable events, selling Bitcoin triggers capital gains</p>
                                   <p><strong>2. Bitcoin Preservation:</strong> You keep your Bitcoin collateral (only 10% at risk), vs. losing Bitcoin forever</p>
                                   <p><strong>3. Compounding Power:</strong> Your 90% stack continues appreciating while you borrow</p>
                                   <p><strong>4. Optional Repayment:</strong> You can use external income to repay loans, keeping all Bitcoin</p>
                                   <p><strong>5. Liquidation Protection:</strong> With 10% LTV, you have massive safety margins</p>
                                 </div>
                               </div>
                             <div className="bg-blue-500/10 p-3 rounded border border-blue-500/20 mt-3">
                               <h6 className="text-blue-400 font-semibold">💰 Value Comparison After 15 Years:</h6>
                               <div className="text-center mt-2">
                                 <div className="text-red-400 font-bold text-lg">${(((totalBTCNeeded * 10) - (form.yearlyDrawUSD * form.horizon / currentBTCPrice)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}</div>
                                 <div className="text-gray-400 text-xs">Direct Selling Strategy Final Value</div>
                                 <div className="text-green-400 font-bold text-lg">${(((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)).toLocaleString()}</div>
                                 <div className="text-gray-400 text-xs">Loan Strategy Final Value</div>
                                 <div className="text-yellow-400 font-bold text-lg mt-2">${(((((totalBTCNeeded * 9) - repaymentSeries.reduce((sum, val) => sum + val, 0)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)) - (((totalBTCNeeded * 10) - (form.yearlyDrawUSD * form.horizon / currentBTCPrice)) * currentBTCPrice * Math.pow(1.30, 8) * Math.pow(1.21, 7)))).toLocaleString()}</div>
                                 <div className="text-gray-400 text-xs">Additional Value from Loan Strategy</div>
                               </div>
                             </div>
                           </div>
                         </div>
                         
                         <p className="mt-4">
                           <strong>Bottom line:</strong> With this zero risk 10% strategy, Sarah can borrow ${form.yearlyDrawUSD.toLocaleString()} annually while keeping 90% of her Bitcoin completely safe from liquidation. 
                           The 90% stack continues appreciating and building wealth, making this the ultimate zero liquidation risk Bitcoin-backed loan strategy.
                         </p>
                     </div>
                 </div>
               </div>
             </div>
           </div>

           {/* Interactive Chart Frame */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center flex items-center justify-center gap-3">
               <BarChart3 size={28} />
               Interactive Zero Risk Bitcoin Chart
             </h3>
             <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
               Watch how your Bitcoin requirements change over time as you adjust the parameters above. 
               <span className="text-yellow-400 font-semibold"> Yellow line</span> shows Bitcoin needed for collateral (zero liquidation risk).
               <span className="text-red-400 font-semibold"> Red line</span> shows Bitcoin sold from your 90% stack to repay loans (no external income).
             </p>
             <div className="w-full h-[500px] max-w-4xl mx-auto">
               <InteractiveBTCChart series={series} repaymentSeries={repaymentSeries} />
             </div>
           </div>

                      {/* Explanation Section */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl font-bold text-yellow-500 mb-6">
               🛡️ How the Bitcoin Zero Risk Calculator Works
             </h3>
             <div className="space-y-6 text-gray-300">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="bg-yellow-500/10 p-6 rounded-lg">
                   <h4 className="text-xl font-bold text-yellow-400 mb-4">The Problem</h4>
                   <p className="text-sm leading-relaxed">
                     When using Bitcoin as collateral for loans, you need to maintain a safe Loan-to-Value (LTV) ratio. 
                     As you draw funds and interest accumulates, your Bitcoin holdings must grow to maintain safety margins.
                   </p>
                 </div>

                 <div className="bg-yellow-500/10 p-6 rounded-lg">
                   <h4 className="text-xl font-bold text-yellow-400 mb-4">The Solution</h4>
                   <p className="text-sm leading-relaxed">
                     This calculator projects how much Bitcoin you&apos;ll need over time to maintain your target LTV ratio, 
                     accounting for loan growth, Bitcoin price appreciation, and your annual drawdowns.
                   </p>
                 </div>
               </div>

               <div className="border-l-4 border-yellow-500 pl-6">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">Key Parameters Explained</h4>
                 <div className="space-y-3 text-sm">
                   <div>
                     <span className="font-semibold text-yellow-400">BTC Spot Price:</span> Current Bitcoin price for calculations
                   </div>
                   <div>
                     <span className="font-semibold text-yellow-400">Annual Draw:</span> How much USD you withdraw yearly from the loan
                   </div>
                   <div>
                     <span className="font-semibold text-yellow-400">Interest Rate:</span> Annual interest rate on your loan
                   </div>
                   <div>
                     <span className="font-semibold text-yellow-400">Target LTV:</span> Maximum loan-to-value ratio you want to maintain
                   </div>
                   <div>
                     <span className="font-semibold text-yellow-400">BTC CAGR:</span> Expected annual Bitcoin price growth rate
                   </div>
                   <div>
                     <span className="font-semibold text-yellow-400">Time Horizon:</span> Number of years to project forward
                   </div>
                 </div>
               </div>

               <div className="bg-yellow-500/10 p-6 rounded-lg">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">Safety Strategy</h4>
                 <p className="text-sm leading-relaxed mb-4">
                   The calculator shows you exactly how much Bitcoin you need to hold to maintain your safety margin. 
                   This helps you plan your Bitcoin accumulation strategy and avoid liquidation risks.
                 </p>
                 <ul className="list-disc list-inside space-y-2 text-sm">
                   <li>Start with more Bitcoin than the minimum required</li>
                   <li>Monitor your LTV ratio regularly</li>
                   <li>Consider Bitcoin price volatility in your planning</li>
                   <li>Have a plan for market downturns</li>
                 </ul>
               </div>

               <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                 <h4 className="text-xl font-bold text-green-400 mb-4">🎯 The 10% Strategy: Ultimate Conservative Approach</h4>
                 <p className="text-sm leading-relaxed mb-4">
                   For maximum safety, consider using only 10% of your total Bitcoin stack for loans. This approach:
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <h5 className="font-semibold text-green-400 mb-2">Benefits:</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>90% of your Bitcoin remains completely safe</li>
                       <li>Minimal liquidation risk</li>
                       <li>Maximum upside from Bitcoin appreciation</li>
                       <li>Peace of mind during market volatility</li>
                     </ul>
                   </div>
                   <div>
                     <h5 className="font-semibold text-green-400 mb-2">Calculation:</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>Required BTC for loan = 10% × Total Bitcoin Stack</li>
                       <li>Total Bitcoin Stack = Required BTC ÷ 10%</li>
                       <li>Safe Stack = Total Stack × 90%</li>
                       <li>Loan Risk = Total Stack × 10%</li>
                     </ul>
                   </div>
                 </div>
                 <p className="text-sm mt-4 text-green-400/80">
                   This strategy is perfect for Bitcoin maximalists who want to access liquidity while keeping the vast majority of their Bitcoin untouched.
                 </p>
               </div>
             </div>
           </div>

           {/* The Infinite Flywheel Section */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl font-bold text-yellow-500 mb-6">
               🚀 The Infinite Flywheel: How MicroStrategy Could Become a Multi-Trillion Dollar Company
             </h3>
             <div className="space-y-8 text-gray-300">
               
               {/* iPhone Moment */}
               <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">📱 The &quot;iPhone Moment&quot; for MicroStrategy</h4>
                                    <p className="text-lg leading-relaxed">
                     In recent press releases, <span className="text-yellow-400 font-semibold">@saylor</span> describes how STRC (Structured Bitcoin-Backed Securities) 
                     represents an &quot;iPhone moment&quot; for MicroStrategy. This isn&apos;t hyperbole—it&apos;s a fundamental breakthrough in corporate finance.
                   </p>
                                    <p className="text-sm mt-4 text-yellow-400/80">
                     &quot;All previous forms of leverage (Bonds, Converts, Long dated Prefs) have scaling problems. The markets have limited size and the risk in bear markets is too great.&quot;
                   </p>
               </div>

               {/* The STRC Breakthrough */}
               <div className="border-l-4 border-yellow-500 pl-6">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">⚡ The STRC Breakthrough</h4>
                 <div className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-yellow-500/5 p-4 rounded">
                       <h5 className="font-semibold text-yellow-400 mb-2">Old Problems</h5>
                       <ul className="text-sm space-y-1">
                         <li>• Limited market size for traditional debt</li>
                         <li>• High liquidation risk in bear markets</li>
                         <li>• Scaling constraints</li>
                         <li>• Regulatory limitations</li>
                       </ul>
                     </div>
                     <div className="bg-green-500/5 p-4 rounded">
                       <h5 className="font-semibold text-green-400 mb-2">STRC Solution</h5>
                       <ul className="text-sm space-y-1">
                         <li>• Infinite scaling potential</li>
                         <li>• Zero liquidation risk in bear markets</li>
                         <li>• Bitcoin as perfect collateral</li>
                         <li>• Regulatory arbitrage advantage</li>
                       </ul>
                     </div>
                   </div>
                 </div>
               </div>

               {/* The Multi-Trillion Dollar Math */}
               <div className="bg-gradient-to-r from-yellow-500/20 to-green-500/20 p-6 rounded-lg border border-yellow-500/30">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">💰 The Multi-Trillion Dollar Math</h4>
                 <div className="space-y-4">
                   <div className="bg-black/30 p-4 rounded-lg">
                     <h5 className="font-semibold text-yellow-400 mb-3">Key Assumptions:</h5>
                     <ul className="text-sm space-y-2">
                       <li>• <strong>BTC Growth:</strong> 40% CAGR over the next decade</li>
                       <li>• <strong>Safety Ratio:</strong> Minimum 3:1 BTC to Prefs ratio maintained</li>
                       <li>• <strong>Scaling:</strong> Maximum Prefs issued while maintaining safety</li>
                                                <li>• <strong>Power Law:</strong> Bitcoin&apos;s natural growth trajectory</li>
                     </ul>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                     <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                       <div className="text-yellow-400 font-bold text-lg">40% CAGR</div>
                       <div className="text-gray-400 text-sm">Annual Bitcoin Growth</div>
                     </div>
                     <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                       <div className="text-green-400 font-bold text-lg">3:1 Ratio</div>
                       <div className="text-gray-400 text-sm">BTC to Prefs Safety</div>
                     </div>
                     <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
                       <div className="text-blue-400 font-bold text-lg">∞ Scale</div>
                       <div className="text-gray-400 text-sm">Infinite Potential</div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* The Flywheel Effect */}
               <div>
                 <h4 className="text-xl font-bold text-yellow-400 mb-6">🔄 The Infinite Flywheel Effect</h4>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   
                   {/* Step 1 */}
                   <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                     <h5 className="text-lg font-bold text-yellow-400 mb-3">Step 1: Bitcoin Appreciation</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">BTC Price:</span> Grows at 40% CAGR</div>
                       <div><span className="font-semibold">Collateral Value:</span> Increases exponentially</div>
                       <div><span className="font-semibold">Safety Margin:</span> Grows automatically</div>
                       <div><span className="font-semibold">Result:</span> More borrowing capacity</div>
                     </div>
                   </div>

                   {/* Step 2 */}
                   <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                     <h5 className="text-lg font-bold text-green-400 mb-3">Step 2: Increased Borrowing</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">New Capacity:</span> Issue more Prefs</div>
                       <div><span className="font-semibold">Buy More BTC:</span> Deploy capital</div>
                       <div><span className="font-semibold">Maintain Ratio:</span> Keep 3:1 safety</div>
                       <div><span className="font-semibold">Result:</span> Larger Bitcoin position</div>
                     </div>
                   </div>

                   {/* Step 3 */}
                   <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                     <h5 className="text-lg font-bold text-blue-400 mb-3">Step 3: Market Dominance</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Largest Holder:</span> Corporate Bitcoin whale</div>
                       <div><span className="font-semibold">Network Effect:</span> Bitcoin adoption grows</div>
                       <div><span className="font-semibold">Price Impact:</span> Self-reinforcing cycle</div>
                       <div><span className="font-semibold">Result:</span> Even more appreciation</div>
                     </div>
                   </div>

                   {/* Step 4 */}
                   <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                     <h5 className="text-lg font-bold text-purple-400 mb-3">Step 4: Infinite Loop</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Repeat:</span> Back to Step 1</div>
                       <div><span className="font-semibold">Scale:</span> Hundreds of billions</div>
                       <div><span className="font-semibold">Valuation:</span> Multi-trillion potential</div>
                       <div><span className="font-semibold">Result:</span> @RealJimChanos proven wrong</div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* The 10-Year Projection */}
               <div className="bg-gradient-to-br from-yellow-500/20 to-green-500/20 p-6 rounded-lg border-2 border-yellow-500/30">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">📈 10-Year Projection: The Numbers</h4>
                 <div className="space-y-4">
                   <div className="bg-black/30 p-4 rounded-lg">
                     <p className="text-sm leading-relaxed mb-4">
                       Using AI modeling with 40% annual Bitcoin growth, it&apos;s clear that in 10 years MicroStrategy could become 
                       one of the most valuable companies in the world.
                     </p>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                       <div>
                         <h6 className="font-semibold text-yellow-400 mb-2">Conservative Scenario:</h6>
                         <ul className="space-y-1 text-gray-300">
                           <li>• $500B+ market cap</li>
                           <li>• 1M+ Bitcoin holdings</li>
                           <li>• Zero liquidation risk</li>
                           <li>• Dominant market position</li>
                         </ul>
                       </div>
                       <div>
                         <h6 className="font-semibold text-green-400 mb-2">Bullish Scenario:</h6>
                         <ul className="space-y-1 text-gray-300">
                           <li>• $1T+ market cap</li>
                           <li>• 2M+ Bitcoin holdings</li>
                           <li>• Global Bitcoin treasury</li>
                           <li>• @RealJimChanos proven wrong</li>
                         </ul>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>

               {/* The Chanos Factor */}
               <div className="bg-red-500/10 p-6 rounded-lg border-2 border-red-500/30">
                 <h4 className="text-xl font-bold text-red-400 mb-4">💀 The @RealJimChanos Factor</h4>
                 <div className="space-y-4">
                   <div className="bg-red-500/20 p-4 rounded-lg">
                     <h5 className="font-bold text-red-300 mb-2">Why This Strategy Kills Shorts</h5>
                     <p className="text-sm leading-relaxed">
                       <strong>The brutal reality for shorts:</strong> STRC eliminates the primary short thesis. No more liquidation risk, 
                       infinite scaling potential, and a self-reinforcing flywheel that grows stronger with every Bitcoin appreciation cycle.
                     </p>
                   </div>
                   
                   <div className="bg-yellow-500/20 p-4 rounded-lg">
                     <h5 className="font-bold text-yellow-300 mb-2">The Short Trap</h5>
                     <p className="text-sm leading-relaxed">
                       <span className="text-yellow-400 font-semibold">Shorts bet on liquidation → STRC prevents liquidation → Bitcoin appreciates → 
                       More borrowing capacity → Larger Bitcoin position → Even more appreciation → Shorts get destroyed.</span>
                     </p>
                   </div>
                   
                   <div className="text-xs text-red-300/80 italic">
                     This is why @saylor calls it an &quot;iPhone moment&quot; - it&apos;s a fundamental breakthrough that changes everything.
                   </div>
                 </div>
               </div>

               {/* Massively Bullish Conclusion */}
               <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                 <h4 className="text-xl font-bold text-green-400 mb-4">🚀 Massively Bullish for Both MSTR and BTC</h4>
                 <p className="text-lg leading-relaxed mb-4">
                   This infinite flywheel strategy creates a win-win scenario that benefits both MicroStrategy shareholders and the entire Bitcoin ecosystem.
                 </p>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <h5 className="font-semibold text-green-400 mb-2">For MSTR Shareholders:</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>Exponential growth potential</li>
                       <li>Zero liquidation risk</li>
                       <li>Dominant market position</li>
                       <li>Infinite scaling capability</li>
                     </ul>
                   </div>
                   <div>
                     <h5 className="font-semibold text-green-400 mb-2">For Bitcoin:</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>Massive institutional adoption</li>
                       <li>Price discovery mechanism</li>
                       <li>Network effect acceleration</li>
                       <li>Legitimacy and credibility</li>
                     </ul>
                   </div>
                 </div>
                 <p className="text-sm mt-4 text-green-400/80">
                   Welcome to the future of corporate finance. The infinite flywheel is just getting started.
                 </p>
               </div>
             </div>
           </div>

           {/* Bitcoin-Backed Loans Guide */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl font-bold text-yellow-500 mb-6">
               🏦 The Complete Guide to Bitcoin-Backed Loans
             </h3>
             <div className="space-y-8 text-gray-300">
               
               {/* Never Sell Philosophy */}
               <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                 <h4 className="text-xl font-bold text-green-400 mb-4">💎 The Golden Rule: Never Sell Your Bitcoin</h4>
                 <p className="text-lg leading-relaxed">
                   Bitcoin-backed loans with zero liquidation risk allow you to unlock the value of your Bitcoin without selling it. 
                   This is the key advantage—you maintain ownership while accessing liquidity for real estate, 
                   business investments, or other opportunities. No capital gains taxes, no lost upside potential, and <span className="text-green-400 font-bold">zero risk of liquidation</span>.
                 </p>
               </div>

               {/* How It Works */}
               <div className="border-l-4 border-yellow-500 pl-6">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">🔄 How Bitcoin-Backed Loans Work</h4>
                 <div className="space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="bg-yellow-500/5 p-4 rounded">
                       <h5 className="font-semibold text-yellow-400 mb-2">Step 1: Post Collateral</h5>
                       <p className="text-sm">Use platforms like Unchained, Coinbase, or Strike to post your Bitcoin as collateral</p>
                     </div>
                     <div className="bg-yellow-500/5 p-4 rounded">
                       <h5 className="font-semibold text-yellow-400 mb-2">Step 2: Borrow Cash</h5>
                       <p className="text-sm">Borrow typically 35-85% of your Bitcoin&apos;s value (depending on platform)</p>
                     </div>
                     <div className="bg-yellow-500/5 p-4 rounded">
                       <h5 className="font-semibold text-yellow-400 mb-2">Step 3: Use Funds</h5>
                       <p className="text-sm">Deploy capital for real estate, business, or other investments</p>
                     </div>
                     <div className="bg-yellow-500/5 p-4 rounded">
                       <h5 className="font-semibold text-yellow-400 mb-2">Step 4: Pay Back</h5>
                       <p className="text-sm">Repay the loan and keep your Bitcoin—no capital gains taxes</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Platform Comparison */}
               <div>
                 <h4 className="text-xl font-bold text-yellow-400 mb-6">📊 Platform Comparison & Zero Risk Analysis</h4>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                   
                   {/* Xapo */}
                   <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
                     <h5 className="text-lg font-bold text-red-400 mb-3">⚠️ Xapo (Higher Risk)</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Interest Rate:</span> 10.66%</div>
                       <div><span className="font-semibold">LTV Options:</span> 20% or 40%</div>
                       <div><span className="font-semibold">Risk:</span> Bitcoin liquidation at 80% LTV</div>
                       <div><span className="font-semibold">Catch:</span> Your Bitcoin gets sold if LTV hits 80%</div>
                     </div>
                     <p className="text-xs mt-3 text-red-300">
                       Not ideal—no one wants to lose their Bitcoin to liquidation
                     </p>
                   </div>

                   {/* Coinbase + Morpho */}
                   <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                     <h5 className="text-lg font-bold text-green-400 mb-3">✅ Coinbase + Morpho (Better Deal)</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Interest Rate:</span> 4-6% (variable)</div>
                       <div><span className="font-semibold">Max LTV:</span> 85%</div>
                       <div><span className="font-semibold">Initial LTV:</span> 50%</div>
                       <div><span className="font-semibold">Flexibility:</span> No monthly payments required</div>
                     </div>
                     <p className="text-xs mt-3 text-green-300">
                       Much more attractive terms with lower rates and flexible repayment
                     </p>
                   </div>

                   {/* Strike */}
                   <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                     <h5 className="text-lg font-bold text-blue-400 mb-3">🚀 Strike (Advanced Features)</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Features:</span> Full app management</div>
                       <div><span className="font-semibold">LTV Tracking:</span> Real-time monitoring</div>
                       <div><span className="font-semibold">Early Access:</span> Unlock collateral after 60 days</div>
                       <div><span className="font-semibold">Conditions:</span> LTV ≤ 40% for early access</div>
                     </div>
                     <p className="text-xs mt-3 text-blue-300">
                       Advanced features with collateral access before maturity
                     </p>
                   </div>

                   {/* Peoples Reserve */}
                   <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                     <h5 className="text-lg font-bold text-green-400 mb-3">🛡️ Peoples Reserve (Zero Liquidation Risk)</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Rate Model:</span> Performance-based</div>
                       <div><span className="font-semibold">Risk Adjustment:</span> Rates adjust with BTC price</div>
                       <div><span className="font-semibold">Advantage:</span> No Bitcoin liquidation</div>
                       <div><span className="font-semibold">Protection:</span> Bitcoin never &quot;sacrificed&quot;</div>
                     </div>
                     <p className="text-xs mt-3 text-green-300">
                       <strong>Zero liquidation risk approach</strong> that protects your Bitcoin completely
                     </p>
                   </div>
                 </div>
               </div>

               {/* The Liquidation Trap */}
               <div className="bg-red-500/10 p-6 rounded-lg border-2 border-red-500/30">
                 <h4 className="text-xl font-bold text-red-400 mb-4">💀 What They Don&apos;t Tell You About Bitcoin-Backed Loans</h4>
                 <div className="space-y-4">
                   <div className="bg-red-500/20 p-4 rounded-lg">
                     <h5 className="font-bold text-red-300 mb-2">Lenders WANT You to Get Liquidated</h5>
                     <p className="text-sm leading-relaxed">
                       <strong>The brutal reality:</strong> You borrow $30K with $60K in BTC collateral (50% LTV). 
                       Price dips, LTV hits 100%, you get liquidated. They keep your BTC, wait for the rebound, 
                       double their money.
                     </p>
                   </div>
                   
                   <div className="bg-yellow-500/20 p-4 rounded-lg">
                     <h5 className="font-bold text-yellow-300 mb-2">The Survival Strategy</h5>
                     <p className="text-sm leading-relaxed">
                       <span className="text-yellow-400 font-semibold">Keep spare BTC ready — liquidation is brutal.</span>
                       <br /><br />
                       • Start with LTV ratios well below liquidation thresholds<br />
                       • Maintain a separate Bitcoin reserve for emergency collateral<br />
                       • Monitor your positions daily during volatile periods<br />
                       • Have a plan to add collateral quickly if needed
                     </p>
                   </div>
                   
                   <div className="text-xs text-red-300/80 italic">
                     This is why the calculator above is crucial - it shows you exactly how much Bitcoin you need 
                     to maintain safe margins and avoid the liquidation trap.
                   </div>
                 </div>
               </div>

               {/* Risk Management */}
               <div className="bg-yellow-500/10 p-6 rounded-lg">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">🛡️ Risk Management Strategies</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <h5 className="font-semibold text-yellow-400 mb-2">LTV Management</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>Start with conservative LTV ratios (20-40%)</li>
                       <li>Monitor your LTV in real-time</li>
                       <li>Have a plan for margin calls</li>
                       <li>Keep extra Bitcoin ready for collateral</li>
                     </ul>
                   </div>
                   <div>
                     <h5 className="font-semibold text-yellow-400 mb-2">Platform Selection</h5>
                     <ul className="list-disc list-inside space-y-1 text-sm">
                       <li>Choose platforms with lower liquidation risks</li>
                       <li>Compare interest rates and terms</li>
                       <li>Consider flexible repayment options</li>
                       <li>Look for early collateral access features</li>
                     </ul>
                   </div>
                 </div>
               </div>

               {/* Market Evolution */}
               <div className="border-l-4 border-yellow-500 pl-6">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">📈 Market Evolution & Future Outlook</h4>
                 <p className="text-sm leading-relaxed mb-4">
                   The Bitcoin-backed loan market is still in its early stages. As adoption grows, we&apos;ll see:
                 </p>
                 <ul className="list-disc list-inside space-y-2 text-sm">
                   <li>More competitive interest rates as competition increases</li>
                   <li>Better LTV adjustment mechanisms</li>
                   <li>More flexible repayment terms</li>
                   <li>Integration with traditional financial services</li>
                   <li>Regulatory clarity improving market stability</li>
                 </ul>
                 <p className="text-sm mt-4 text-yellow-400/80">
                   The key is to stay informed and choose platforms that align with your risk tolerance 
                   and long-term Bitcoin holding strategy.
                 </p>
               </div>
             </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page; 