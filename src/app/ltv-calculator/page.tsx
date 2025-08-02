'use client';

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrendingUp, Shield, Calculator, BarChart3 } from "lucide-react";
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
  ltvTarget: 0.25,
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



// Interactive Chart Component
function InteractiveBTCChart({ series }: { series: number[] }) {
  const labels = series.map((_, idx) => `Year ${idx + 1}`);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'BTC Required',
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
        text: 'Bitcoin Required Over Time',
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
            return `BTC Required: ${context.parsed.y.toFixed(2)} BTC`;
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
            return `${value.toFixed(1)} BTC`;
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
              Risk Management • LTV Calculator • Safety Analysis
            </p>
            <h1 className="text-center">
              <span className="text-5xl md:text-7xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)]">
                Bitcoin LTV Safety Calculator
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic">
                Calculate your Bitcoin safety requirements for sustainable wealth
              </p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

                     {/* Main Calculator Card */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-8 text-center flex items-center justify-center gap-3">
               <Calculator size={28} />
               Calculator Parameters
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
                   <label className="text-sm font-medium text-gray-300">Target LTV</label>
                   <Input
                     type="number"
                     step="any"
                     value={form.ltvTarget}
                     onChange={onChange("ltvTarget")}
                     placeholder="0.25"
                     className="bg-gray-800 border-gray-600 text-white"
                   />
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
               Your Bitcoin Safety Requirements
             </h3>
             <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
               Based on your calculator parameters, here are your projected Bitcoin requirements to maintain safe LTV ratios over time.
             </p>
             
             <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20 max-w-3xl mx-auto mb-8">
               <h4 className="text-yellow-400 font-semibold mb-3 text-center">📈 Why the Chart Pattern?</h4>
               <div className="text-gray-300 text-sm space-y-2">
                 <p><strong>Early Years (1-4):</strong> Loan balance grows faster than BTC price → Need more Bitcoin</p>
                 <p><strong>Middle Years (5-8):</strong> BTC price growth (30% CAGR) starts catching up</p>
                 <p><strong>Later Years (9+):</strong> BTC price growth (21% CAGR) overtakes loan growth → Need less Bitcoin</p>
                 <p className="text-yellow-400/80 italic">The formula: Required BTC = Loan Balance ÷ (Safety Margin × BTC Price)</p>
               </div>
             </div>
             
             <div className="max-w-4xl mx-auto space-y-8">
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
               <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20 max-w-4xl mx-auto">
                 <div className="text-center mb-6">
                   <div className="text-yellow-400 font-semibold text-xl mb-3">Safety Margin Analysis</div>
                   <div className="text-gray-300 text-lg">
                     Based on your parameters, you'll need <span className="text-yellow-400 font-bold text-2xl">{totalBTCNeeded.toFixed(2)} BTC</span> 
                     to maintain a safe <span className="text-yellow-400 font-bold">{(form.ltvTarget * 100).toFixed(0)}% LTV ratio</span> over <span className="text-yellow-400 font-bold">{form.horizon} years</span>.
                   </div>
                 </div>
                 
                 {/* Real-Life Example */}
                 <div className="bg-black/30 p-6 rounded-lg border border-yellow-500/20">
                   <h4 className="text-yellow-400 font-bold text-lg mb-4 text-center">📊 Real-Life Example: Sarah's Conservative Bitcoin Strategy</h4>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                     <div>
                       <h5 className="text-yellow-400 font-semibold mb-3">Sarah's Conservative Approach:</h5>
                       <ul className="space-y-2 text-gray-300">
                         <li>• Wants to borrow ${form.yearlyDrawUSD.toLocaleString()} annually</li>
                         <li>• Only willing to use 10% of her total Bitcoin stack for loans</li>
                         <li>• Target LTV: {(form.ltvTarget * 100).toFixed(0)}% (conservative)</li>
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
                     <h5 className="text-yellow-400 font-bold mb-3 text-center">🎯 Sarah's 10% Strategy Breakdown</h5>
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
                         <strong>Why the 10% strategy is brilliant:</strong> Sarah only risks {(totalBTCNeeded * 10).toFixed(2)} BTC × 10% = {totalBTCNeeded.toFixed(2)} BTC for her loan, 
                         while keeping {(totalBTCNeeded * 9).toFixed(2)} BTC completely safe from liquidation. This is the ultimate conservative approach.
                       </p>
                       
                       <div className="bg-black/20 p-4 rounded-lg border border-yellow-500/20 mt-4">
                         <h6 className="text-yellow-400 font-semibold mb-3">📊 The Conservative Timeline Advantage:</h6>
                         <div className="space-y-2 text-xs">
                           <p><strong>Years 1-4:</strong> Only 10% of Sarah's stack is at risk while 90% appreciates freely</p>
                           <p><strong>Years 5-8:</strong> Her 90% stack grows at 30% CAGR, building massive wealth</p>
                           <p><strong>Years 9+:</strong> The 90% stack continues growing while loan requirements decrease</p>
                           <p className="text-yellow-400/80 italic">This is the "never sell" strategy perfected - maximum Bitcoin exposure with minimal liquidation risk!</p>
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
                       
                       <p className="mt-4">
                         <strong>Bottom line:</strong> With this 10% strategy, Sarah can borrow ${form.yearlyDrawUSD.toLocaleString()} annually while keeping 90% of her Bitcoin completely safe from liquidation. 
                         The 90% stack continues appreciating and building wealth, making this the ultimate conservative Bitcoin-backed loan strategy.
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
               Interactive Bitcoin Safety Chart
             </h3>
             <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">
               Watch how your Bitcoin requirements change over time as you adjust the parameters above. 
               The chart updates in real-time to show your projected Bitcoin needs for maintaining safe LTV ratios.
             </p>
             <div className="w-full h-[500px] max-w-4xl mx-auto">
               <InteractiveBTCChart series={series} />
             </div>
           </div>

                      {/* Explanation Section */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl font-bold text-yellow-500 mb-6">
               🛡️ How the Bitcoin LTV Safety Calculator Works
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
                     This calculator projects how much Bitcoin you'll need over time to maintain your target LTV ratio, 
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

           {/* Bitcoin-Backed Loans Guide */}
           <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
             <h3 className="text-2xl font-bold text-yellow-500 mb-6">
               🏦 The Complete Guide to Bitcoin-Backed Loans
             </h3>
             <div className="space-y-8 text-gray-300">
               
               {/* Never Sell Philosophy */}
               <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                 <h4 className="text-xl font-bold text-yellow-400 mb-4">💎 The Golden Rule: Never Sell Your Bitcoin</h4>
                 <p className="text-lg leading-relaxed">
                   Bitcoin-backed loans allow you to unlock the value of your Bitcoin without selling it. 
                   This is the key advantage—you maintain ownership while accessing liquidity for real estate, 
                   business investments, or other opportunities. No capital gains taxes, no lost upside potential.
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
                       <p className="text-sm">Borrow typically 35-85% of your Bitcoin's value (depending on platform)</p>
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
                 <h4 className="text-xl font-bold text-yellow-400 mb-6">📊 Platform Comparison & Risk Analysis</h4>
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
                   <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                     <h5 className="text-lg font-bold text-purple-400 mb-3">🔄 Peoples Reserve (Dynamic Rates)</h5>
                     <div className="space-y-2 text-sm">
                       <div><span className="font-semibold">Rate Model:</span> Performance-based</div>
                       <div><span className="font-semibold">Risk Adjustment:</span> Rates adjust with BTC price</div>
                       <div><span className="font-semibold">Advantage:</span> No Bitcoin liquidation</div>
                       <div><span className="font-semibold">Protection:</span> Bitcoin never "sacrificed"</div>
                     </div>
                     <p className="text-xs mt-3 text-purple-300">
                       Innovative approach that protects your Bitcoin from liquidation
                     </p>
                   </div>
                 </div>
               </div>

               {/* The Liquidation Trap */}
               <div className="bg-red-500/10 p-6 rounded-lg border-2 border-red-500/30">
                 <h4 className="text-xl font-bold text-red-400 mb-4">💀 What They Don't Tell You About Bitcoin-Backed Loans</h4>
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
                   The Bitcoin-backed loan market is still in its early stages. As adoption grows, we'll see:
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