'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
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

// Wealth trajectory data with 21% CAGR and dynamic selling strategy
const wealthTrajectory = [
  { year: 2025, portfolio: 2.43, bitcoin: 21, reserve: 3.3, total: 24.3, price: 100, income: 84, level: 'Restaurant', market: 'Bull', sellRate: 6.9 },
  { year: 2026, portfolio: 2.94, bitcoin: 21, reserve: 3.0, total: 24.0, price: 123, income: 100, level: 'Restaurant', market: 'Bull', sellRate: 6.9 },
  { year: 2027, portfolio: 3.56, bitcoin: 21, reserve: 2.7, total: 23.7, price: 150, income: 128, level: 'Restaurant', market: 'Bull', sellRate: 6.9 },
  { year: 2028, portfolio: 4.31, bitcoin: 21, reserve: 2.4, total: 23.4, price: 182, income: 168, level: 'Travel', market: 'Bear', sellRate: 4.2 },
  { year: 2029, portfolio: 5.21, bitcoin: 21, reserve: 2.1, total: 23.1, price: 220, income: 220, level: 'Travel', market: 'Bull', sellRate: 6.9 },
  { year: 2030, portfolio: 6.30, bitcoin: 21, reserve: 1.8, total: 22.8, price: 266, income: 276, level: 'Travel', market: 'Bull', sellRate: 6.9 },
  { year: 2031, portfolio: 7.62, bitcoin: 21, reserve: 1.5, total: 22.5, price: 322, income: 336, level: 'Luxury', market: 'Bull', sellRate: 6.9 },
  { year: 2032, portfolio: 9.22, bitcoin: 21, reserve: 1.2, total: 22.2, price: 390, income: 420, level: 'Luxury', market: 'Bear', sellRate: 4.2 },
  { year: 2033, portfolio: 11.15, bitcoin: 21, reserve: 0.9, total: 21.9, price: 472, income: 524, level: 'Luxury', market: 'Bull', sellRate: 6.9 },
  { year: 2034, portfolio: 13.49, bitcoin: 21, reserve: 0.6, total: 21.6, price: 571, income: 540, level: 'Real Estate', market: 'Bull', sellRate: 6.9 },
  { year: 2035, portfolio: 16.32, bitcoin: 21, reserve: 0.3, total: 21.3, price: 691, income: 653, level: 'Real Estate', market: 'Bull', sellRate: 6.9 },
];

function WealthTrajectoryChart() {
  const data = {
    labels: wealthTrajectory.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Core Portfolio Value ($M)',
        data: wealthTrajectory.map(d => d.portfolio),
        borderColor: '#fbbf24', // amber-400
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        pointRadius: 6,
        tension: 0.4,
        borderWidth: 3,
        fill: true,
      },
      {
        label: 'Total Portfolio Value ($M)',
        data: wealthTrajectory.map(d => d.total),
        borderColor: '#8b5cf6', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        pointRadius: 4,
        tension: 0.4,
        borderWidth: 2,
        fill: false,
      },
      {
        label: 'Annual Income ($K)',
        data: wealthTrajectory.map(d => d.income),
        borderColor: '#10b981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        pointRadius: 4,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y1',
      },
      {
        label: 'Bitcoin Price ($K)',
        data: wealthTrajectory.map(d => d.price),
        borderColor: '#f59e0b', // amber-500
        backgroundColor: 'transparent',
        pointRadius: 3,
        tension: 0.4,
        borderWidth: 2,
        yAxisID: 'y2',
      },
      {
        label: 'Sell Rate (%)',
        data: wealthTrajectory.map(d => d.sellRate),
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        pointRadius: 4,
        tension: 0.3,
        borderWidth: 2,
        yAxisID: 'y3',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Bitcoin Wealth Trajectory: $2.43M → $21M (2025-2035)',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (label.includes('Portfolio')) {
              return `${label}: $${value}M`;
            } else if (label.includes('Income')) {
              return `${label}: $${value}K`;
            } else if (label.includes('Price')) {
              return `${label}: $${value}K`;
            } else if (label.includes('Sell Rate')) {
              return `${label}: ${value}%`;
            }
            return `${label}: ${value}`;
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Portfolio Value ($M)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return `$${value}M`;
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Annual Income ($K)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return `$${value}K`;
          },
        },
        grid: {
          drawOnChartArea: false,
        }
      },
      y2: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Bitcoin Price ($K)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return `$${value}K`;
          },
        },
        grid: {
          drawOnChartArea: false,
        }
      },
      y3: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Sell Rate (%)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value) {
            return `${value}%`;
          },
        },
        grid: {
          drawOnChartArea: false,
        }
      },
      x: {
        ticks: {
          color: 'white',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
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

function BitcoinAccumulationChart() {
  const data = {
    labels: wealthTrajectory.map(d => d.year.toString()),
    datasets: [
      {
        label: 'Core Bitcoin Holdings (21 BTC)',
        data: wealthTrajectory.map(d => d.bitcoin),
        borderColor: '#f59e0b', // amber-500
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
        pointRadius: 6,
        tension: 0.3,
        borderWidth: 3,
        fill: true,
      },
      {
        label: 'Reserve Bitcoin (3.3 → 0.3 BTC)',
        data: wealthTrajectory.map(d => d.reserve),
        borderColor: '#ef4444', // red-500
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        pointRadius: 4,
        tension: 0.3,
        borderWidth: 2,
        fill: true,
      },
      {
        label: 'Total Bitcoin Holdings',
        data: wealthTrajectory.map(d => d.total),
        borderColor: '#8b5cf6', // violet-500
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        pointRadius: 3,
        tension: 0.3,
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Bitcoin Accumulation Strategy',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Bitcoin Holdings',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value: string | number) {
            if (typeof value === 'number') {
              return `${value} BTC`;
            }
            return value;
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      x: {
        ticks: {
          color: 'white',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      }
    },
  };

  return <Line options={options} data={data} />;
}

function BitcoinIncomeChart() {
  // Calculate Bitcoin needed for different monthly income levels
  const monthlyIncomes = [5, 10, 20, 50, 100, 200, 500, 1000]; // in thousands
  const bitcoinNeeded = monthlyIncomes.map(monthlyIncome => {
    const annualIncome = monthlyIncome * 12; // Convert to annual
    // Using 6.9% selling rate and assuming $100K Bitcoin price
    // Formula: Annual Income ÷ (Bitcoin Price × Selling Rate)
    const btcNeeded = annualIncome / (100 * 0.069);
    return Math.ceil(btcNeeded * 100) / 100; // Round to 2 decimal places
  });

  const data = {
    labels: monthlyIncomes.map(income => `$${income}K/month`),
    datasets: [
      {
        label: 'Bitcoin Required (BTC)',
        data: bitcoinNeeded,
        borderColor: '#10b981', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        pointRadius: 6,
        tension: 0.3,
        borderWidth: 3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'white',
          padding: 20,
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Bitcoin Required for Monthly Income Levels',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold' as const
        }
      },
      tooltip: {
        callbacks: {
          label: function(context: { dataset: { label?: string }; parsed: { y: number }; dataIndex: number }) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            const monthlyIncome = monthlyIncomes[context.dataIndex];
            return [
              `${label}: ${value} BTC`,
              `Monthly Income: $${monthlyIncome}K`,
              `Annual Income: $${monthlyIncome * 12}K`,
              `Bitcoin Price: $100K`,
              `Selling Rate: 6.9% (bull market)`
            ];
          }
        }
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Bitcoin Required (BTC)',
          color: 'white',
        },
        ticks: {
          color: 'white',
          callback: function(value: string | number) {
            if (typeof value === 'number') {
              return `${value} BTC`;
            }
            return value;
          },
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      x: {
        ticks: {
          color: 'white',
          maxRotation: 45,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      }
    },
  };

  return <Line options={options} data={data} />;
}

function BitcoinPriceChart() {
	// Calculate Bitcoin price needed for different monthly income levels with 21 BTC core
	const monthlyIncomes = [50, 100, 200, 500, 1000]; // in thousands
	
	// Using 4.2% selling rate (bear market) and 21 BTC core position
	// Formula: Annual Income (in $) ÷ (21 BTC × 0.042)
	const bitcoinPrices = monthlyIncomes.map((monthlyIncome) => {
		// Convert monthly income from $K to $ then to annual
		const annualIncomeDollars = monthlyIncome * 1000 * 12;
		const priceNeeded = annualIncomeDollars / (21 * 0.042);
		// Round to nearest $1K for cleaner labels
		const roundedPrice = Math.round(priceNeeded / 1000) * 1000;
		return roundedPrice;
	});

	const maxPrice = Math.max(...bitcoinPrices);

	const data = {
		labels: monthlyIncomes.map((income) => `$${income}K/month`),
		datasets: [
			{
				label: 'Bitcoin Price Required ($)',
				data: bitcoinPrices,
				borderColor: '#f59e0b', // amber-500
				backgroundColor: 'rgba(245, 158, 11, 0.15)',
				pointRadius: 8,
				pointHoverRadius: 12,
				pointBackgroundColor: '#f59e0b',
				pointBorderColor: '#ffffff',
				pointBorderWidth: 2,
				tension: 0.4,
				borderWidth: 4,
				fill: true,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: 'bottom' as const,
				labels: {
					color: 'white',
					padding: 20,
					font: {
						size: 14,
					},
				},
			},
			title: {
				display: true,
				text: 'Bitcoin Price Needed for Monthly Income (21 BTC Core) - Bear Market Scenario',
				color: 'white',
				font: {
					size: 18,
					weight: 'bold' as const,
				},
			},
			tooltip: {
				backgroundColor: 'rgba(0, 0, 0, 0.9)',
				titleColor: '#f59e0b',
				bodyColor: 'white',
				borderColor: '#f59e0b',
				borderWidth: 2,
				callbacks: {
					label: function (context: { dataset: { label?: string }; parsed: { y: number }; dataIndex: number }) {
						const label = context.dataset.label || '';
						const value = context.parsed.y;
						const monthlyIncome = monthlyIncomes[context.dataIndex];
						return [
							`${label}: $${(value / 1_000_000).toFixed(2)}M`,
							`Monthly Income: $${monthlyIncome}K`,
							`Annual Income: $${monthlyIncome * 12}K`,
							`Core Position: 21 BTC`,
							`Selling Rate: 4.2% (bear market)`,
						];
					},
				},
			},
		},
		scales: {
			y: {
				title: {
					display: true,
					text: 'Bitcoin Price Required ($)',
					color: 'white',
					font: {
						size: 14,
						weight: 'bold' as const,
					},
				},
				beginAtZero: true,
				min: 0,
				max: Math.ceil((maxPrice * 1.1) / 1_000_000) * 1_000_000,
				ticks: {
					color: 'white',
					stepSize: 2_000_000,
					font: {
						size: 12,
					},
					callback: function (value: string | number) {
						if (typeof value === 'number') {
							if (value >= 1_000_000) {
								return `$${(value / 1_000_000).toFixed(1)}M`;
							} else if (value >= 1_000) {
								return `$${(value / 1_000).toFixed(0)}K`;
							}
							return `$${value.toLocaleString()}`;
						}
						return value;
					},
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.15)',
					lineWidth: 1,
				},
			},
			x: {
				ticks: {
					color: 'white',
					maxRotation: 45,
					autoSkip: true,
					maxTicksLimit: 5,
				},
				grid: {
					color: 'rgba(255, 255, 255, 0.1)',
				},
			},
		},
	};

	return <Line options={options} data={data} />;
}

export default function WealthTrajectoryPage() {
  const [open, setOpen] = useState<number | null>(null);
  
  const wealthLevels = [
  {
    level: 'Restaurant Level',
    portfolio: '$2.43M - $4.31M',
    income: '$84K - $168K/year',
    lifestyle: 'World-class dining, front-row concerts, luxury tech',
    description: 'Your 21 Bitcoin core at $100K each generates $84K annually via the 4% rule. This unlocks premium experiences while preserving your core position. The 3.3 BTC reserve covers bear market living expenses.'
  },
  {
    level: 'Travel Level',
    portfolio: '$4.31M - $6.30M',
    income: '$168K - $276K/year',
    lifestyle: 'Private villas, first-class travel, yacht charters',
    description: 'Bitcoin reaching $266K by 2030 with 21% CAGR puts you in the top 1% globally. You can jet-set worldwide while maintaining your Bitcoin position. Reserve depletes to 1.8 BTC for continued bear market protection.'
  },
  {
    level: 'Luxury Level',
    portfolio: '$6.30M - $13.49M',
    income: '$276K - $540K/year',
    lifestyle: 'Penthouses, private jets, exclusive memberships',
    description: 'As Bitcoin scales toward global reserve asset status with 21% CAGR, your wealth multiplies. You can acquire luxury assets while staying true to Bitcoin. Your core 21 BTC remains untouched.'
  },
  {
    level: 'Real Estate Level',
    portfolio: '$13.49M - $16.32M+',
    income: '$540K - $653K+/year',
    lifestyle: 'Mansions, generational wealth, philanthropic impact',
    description: 'At $16.32M, you can buy a $5M mansion and still have $11.32M for travel and investments. This is legacy-building wealth with your core 21 BTC intact for the next 21 years.'
  }
];

  const strategies = [
  {
    phase: 'Short Term (2-3 Years)',
    target: '$4.31M',
    bitcoinPrice: '$182K',
    strategy: 'HODL your 21 Bitcoin through the 2024-2025 halving cycle. Use the 3.3 BTC reserve for living expenses with 6.9% selling rate in bull markets. Portfolio grows at 21% CAGR to $4.31M by 2028. Never sell your core position.'
  },
  {
    phase: 'Five Years (2029-2030)',
    target: '$6.30M',
    bitcoinPrice: '$266K',
    strategy: 'Continue holding through the 2028-2029 halving cycle. Bitcoin reaches $266K with 21% CAGR. Your 21 BTC core = $6.30M, generating $276K annually. Reserve depletes to 1.8 BTC for bear market protection. Core 21 BTC remains untouched.'
  },
  {
    phase: 'Decade Vision (2035)',
    target: '$16.32M',
    bitcoinPrice: '$691K',
    strategy: 'Bitcoin scaling as global reserve asset reaches $691K with 21% CAGR. Your 21 BTC core = $16.32M, yielding $653K annually. Reserve depletes to 0.3 BTC, preserving core position for final decade. Your 21 BTC legacy is intact.'
  }
];

  const faqs = [
    {
      q: "Why stay 100% in Bitcoin?",
      a: "Bitcoin maximalism aligns with LiveTheLife.tv's bold lifestyle and IkigaiLabs.xyz's innovative ethos. Historical data shows Bitcoin's 3-5x cycle gains consistently outperform traditional assets. The 4% withdrawal rule provides income while maintaining exposure to Bitcoin's upside potential."
    },
    {
      q: "What about Bitcoin's volatility?",
      a: "Volatility is the price of admission for Bitcoin's asymmetric returns. The 4% rule is conservative for Bitcoin's growth potential. During 50%+ drawdowns (Bitcoin's norm), you continue accumulating. Your time horizon (10+ years) smooths out short-term volatility."
    },
    {
      q: "How realistic are these projections?",
      a: "Projections are based on historical Bitcoin cycles (3-5x gains post-halving) and institutional adoption trends. Conservative estimates assume Bitcoin reaches $875K by 2035 vs. Ark Invest's $1M+ projections. The key is staying disciplined through market cycles."
    },
    {
      q: "What if Bitcoin doesn't perform as expected?",
      a: "Even if Bitcoin only reaches $200K by 2030 (vs. $300K projection), your portfolio would be $4.2M vs. $6.9M target. The 4% rule still generates $168K annually. Bitcoin's worst-case scenario still outperforms most traditional investments over this timeframe."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-satoshi">
      {/* Premium header accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="space-y-16">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <p className="uppercase tracking-[0.4em] text-yellow-500/90 text-sm mb-4 font-light font-satoshi">Bitcoin Portfolio • Wealth Building • Freedom Strategy</p>
            <h1 className="text-center">
              <span className="text-6xl md:text-8xl font-bold text-yellow-500 tracking-tight [text-shadow:_0_1px_20px_rgba(234,179,8,0.3)] font-satoshi">
                Wealth Trajectory
              </span>
            </h1>
            <div className="flex items-center justify-center mt-6">
              <div className="h-px w-24 bg-yellow-500/30"></div>
              <p className="mx-6 text-lg text-white/70 font-light italic font-satoshi">From $2.1M to $21M: Your Bitcoin Journey to Freedom</p>
              <div className="h-px w-24 bg-yellow-500/30"></div>
            </div>
          </div>

          {/* Main Chart Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
              Your Bitcoin Wealth Trajectory: 2025-2035
            </h3>
            <div className="w-full h-[70vh]">
              <WealthTrajectoryChart />
            </div>
            <div className="mt-8 pt-6 border-t border-yellow-500/20 text-gray-300">
                                     <h4 className="text-xl font-bold text-yellow-400 mb-4">THE BITCOIN PATH TO $21M: NEVER SELLING YOUR CORE 21 BTC</h4>
        <div className="space-y-4 text-lg leading-relaxed">
          <p>You&apos;re starting with <span className="text-yellow-400 font-bold">24.3 Bitcoin worth $2.43M</span> at $100K per coin in August 2025. This includes your <span className="text-red-400 font-bold">core 21 BTC</span> for long-term wealth and a <span className="text-blue-400 font-bold">3.3 BTC reserve</span> for living expenses during bear markets.</p>
          <p>Your strategy uses <span className="text-green-400 font-bold">21% CAGR growth</span> with dynamic selling: <span className="text-blue-400 font-bold">6.9% max in bull markets</span> and <span className="text-red-400 font-bold">4.2% max in bear markets</span>. The core 21 BTC is <span className="text-yellow-400 font-bold">never sold</span>, while the reserve provides living expenses during downturns.</p>
          <p className="font-semibold text-yellow-400/90">Key milestones:</p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><span className="text-green-400">2028:</span> $4.31M core portfolio, $168K annual income</li>
            <li><span className="text-blue-400">2030:</span> $6.30M core portfolio, $276K annual income</li>
            <li><span className="text-yellow-400">2035:</span> $16.32M core portfolio, $653K annual income</li>
          </ul>
          <p className="text-sm text-gray-400 mt-4">💡 <span className="text-yellow-400">Core Strategy:</span> Never sell your 21 BTC core position. Use the 3.3 BTC reserve for bear market living expenses with dynamic selling rates. This ensures you preserve your core wealth while surviving -50% price drops.</p>
        </div>
            </div>
          </div>

          {/* Bitcoin Accumulation Chart */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
              Bitcoin Accumulation Strategy
            </h3>
            <div className="w-full h-[50vh]">
              <BitcoinAccumulationChart />
            </div>
                         <div className="mt-8 pt-6 border-t border-yellow-500/20 text-gray-300">
                       <p className="text-lg leading-relaxed">
          Your Bitcoin strategy maintains <span className="text-yellow-400 font-semibold">21 BTC core position</span> (never sold) and a <span className="text-red-400 font-semibold">3.3 BTC reserve</span> that gradually depletes to 0.3 BTC over 10 years. The reserve covers living expenses during bear markets using dynamic selling rates: <span className="text-blue-400 font-semibold">6.9% in bull markets</span> and <span className="text-red-400 font-semibold">4.2% in bear markets</span>. This ensures you never touch your core 21 BTC while surviving -50% price drops. Your core 21 BTC remains untouched for the next 21 years.
        </p>
             </div>
          </div>

                  {/* Core Philosophy Section */}
        <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
            The 21 Bitcoin Philosophy: Freedom Through Conviction
          </h3>
          <div className="space-y-6 text-lg leading-relaxed text-gray-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-4">🎯 LiveTheLife.tv Vision</h4>
                <p>Your 21 Bitcoin aren&apos;t just digital assets—they&apos;re your passport to a life of extraordinary experiences. From Michelin-star dining to private island getaways, each milestone unlocks new levels of freedom. This isn&apos;t about accumulating more; it&apos;s about living the life you&apos;ve always dreamed of while preserving your core wealth.</p>
                <p className="mt-4 text-yellow-400/80">Your journey: Restaurant Level → Travel Level → Luxury Level → Real Estate Level</p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-yellow-400 mb-4">🚀 IkigaiLabs.xyz Innovation</h4>
                <p>Your strategy embodies the future of wealth: decentralized, purpose-driven, and resilient. By never selling your core 21 BTC, you&apos;re betting on Bitcoin&apos;s potential as the global reserve asset. The 3.3 BTC reserve is your innovation fund—ensuring you can weather any storm while your core position compounds for the next 21 years.</p>
                <p className="mt-4 text-yellow-400/80">Innovation through conviction: HODL through cycles, thrive in bear markets</p>
              </div>
            </div>
            <div className="pt-6 border-t border-yellow-500/20">
              <h4 className="text-xl font-bold text-yellow-400 mb-4">💎 The Core Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <div className="text-3xl font-bold text-yellow-400">21</div>
                  <div className="text-sm text-gray-400">Core BTC</div>
                  <div className="text-xs text-yellow-400/80 mt-2">Never Sold</div>
                </div>
                <div className="text-center p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-3xl font-bold text-blue-400">3.3</div>
                  <div className="text-sm text-gray-400">Reserve BTC</div>
                  <div className="text-xs text-blue-400/80 mt-2">Bear Market Fund</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <div className="text-3xl font-bold text-green-400">21%</div>
                  <div className="text-sm text-gray-400">CAGR Growth</div>
                  <div className="text-xs text-green-400/80 mt-2">Compound Power</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bitcoin Income Chart */}
        <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
            Bitcoin Required for Monthly Income Levels
          </h3>
          <div className="w-full h-[50vh]">
            <BitcoinIncomeChart />
          </div>
          <div className="mt-8 pt-6 border-t border-yellow-500/20 text-gray-300">
            <h4 className="text-xl font-bold text-yellow-400 mb-4">INCOME TARGETS & BITCOIN REQUIREMENTS</h4>
            <div className="space-y-4 text-lg leading-relaxed">
              <p>Using the <span className="text-green-400 font-bold">6.9% selling rate in bull markets</span>, here&apos;s how much Bitcoin you need to sustain different monthly income levels:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <p><span className="text-yellow-400 font-semibold">$5K/month:</span> <span className="text-green-400">8.70 BTC</span> ($60K annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$10K/month:</span> <span className="text-green-400">17.39 BTC</span> ($120K annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$20K/month:</span> <span className="text-green-400">34.78 BTC</span> ($240K annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$50K/month:</span> <span className="text-green-400">86.96 BTC</span> ($600K annual)</p>
                </div>
                <div className="space-y-2">
                  <p><span className="text-yellow-400 font-semibold">$100K/month:</span> <span className="text-green-400">173.91 BTC</span> ($1.2M annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$200K/month:</span> <span className="text-green-400">347.83 BTC</span> ($2.4M annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$500K/month:</span> <span className="text-green-400">869.57 BTC</span> ($6M annual)</p>
                  <p><span className="text-yellow-400 font-semibold">$1M/month:</span> <span className="text-green-400">1739.13 BTC</span> ($12M annual)</p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mt-4">💡 <span className="text-yellow-400">Formula:</span> (Monthly Income × 12) ÷ (Bitcoin Price × 0.069) = Bitcoin Required. At $100K Bitcoin price with 6.9% selling rate. In bear markets (4.2% rate), you&apos;d need 1.64x more Bitcoin for the same income.</p>
            </div>
          </div>
        </div>

        {/* Bitcoin Price Chart */}
        <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
            Bitcoin Price Needed for Monthly Income (21 BTC Core) - Bear Market Scenario
          </h2>
          <div className="w-full h-[50vh]">
            <BitcoinPriceChart />
          </div>
                      <div className="mt-8 pt-6 border-t border-yellow-500/20 text-gray-300">
              <h4 className="text-xl font-bold text-yellow-400 mb-4">PRICE TARGETS FOR LIFESTYLE INCOME (BEAR MARKET)</h4>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>With your <span className="text-yellow-400 font-bold">21 BTC core position</span>, here&apos;s what Bitcoin price needs to be to sustain different monthly income levels using the <span className="text-red-400 font-bold">4.2% selling rate</span> (bear market scenario):</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <p><span className="text-yellow-400 font-semibold">$50K/month:</span> <span className="text-green-400">$680K</span> Bitcoin price</p>
                    <p><span className="text-yellow-400 font-semibold">$100K/month:</span> <span className="text-green-400">$1.36M</span> Bitcoin price</p>
                    <p><span className="text-yellow-400 font-semibold">$200K/month:</span> <span className="text-green-400">$2.72M</span> Bitcoin price</p>
                  </div>
                  <div className="space-y-2">
                    <p><span className="text-yellow-400 font-semibold">$500K/month:</span> <span className="text-green-400">$6.80M</span> Bitcoin price</p>
                    <p><span className="text-yellow-400 font-semibold">$1M/month:</span> <span className="text-green-400">$13.60M</span> Bitcoin price</p>
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">💡 <span className="text-yellow-400">Formula:</span> (Monthly Income × 12) ÷ (21 BTC × 0.042) = Bitcoin Price Required. This shows the price targets you need to hit to achieve your desired lifestyle income without selling your core position during bear markets.</p>
              </div>
            </div>
        </div>

          {/* Financial Freedom Thresholds Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6 text-center">
              💎 The Financial Freedom Ladder: Non-Linear Wealth Building
            </h3>
            
            <div className="space-y-8">
              {/* Introduction */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Welcome Avatar! The $10M Retirement Myth</h4>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>The trolls are out again saying $10,000,000 is not enough to retire. <span className="text-yellow-400 font-semibold">It is most certainly enough to retire.</span> We&apos;re guessing this is just a way to make people give up and not try at all. Realistically you need less than that.</p>
                  
                  <p>The tricky part is how non-linear everything is. Most want some guaranteed path that goes up in a perfect straight line where X = Y on some smooth slope. <span className="text-red-400 font-semibold">Doesn&apos;t work like that.</span></p>
                  
                  <p className="text-yellow-400 font-semibold">You cross thresholds. Some step ups change your life forever. Others? Just buy nicer seats when you fly.</p>
                  
                  <div className="bg-black/30 p-4 rounded border border-yellow-500/30 mt-4">
                    <p className="text-lg font-bold text-yellow-400 mb-2">In Short:</p>
                    <p><span className="text-green-400 font-semibold">$1.5-2.0M gets you comfort</span>; <span className="text-blue-400 font-semibold">$5-6M gets you freedom.</span></p>
                    <p className="text-sm text-gray-400 mt-2">The standard &ldquo;$3-4M and a paid off house&rdquo; implies roughly this range ($5-6M net worth).</p>
                  </div>
                </div>
              </div>

              {/* Tier 1: Survival */}
              <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
                <h4 className="text-xl font-bold text-red-400 mb-4">Tier 1 — SURVIVAL: $0 → $150,000</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="text-red-300 font-semibold">This is the majority. It&apos;s brutal.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-3">The Reality:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• You&apos;re reacting. Can&apos;t plan ahead</li>
                        <li>• Brain is hostage to money problems</li>
                        <li>• Every small expense feels dramatic</li>
                        <li>• Plan around problems instead of goals</li>
                        <li>• Everything feels risky - one mistake = disaster</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-green-400 font-semibold mb-3">The Strategy:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• Build 3-6 months cash buffer ASAP</li>
                        <li>• Avoid all debt on depreciating assets</li>
                        <li>• Drastically cut expenses</li>
                        <li>• Focus only on stabilizing the boat</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-3 rounded border border-red-500/30">
                    <p className="text-xs text-gray-400"><span className="text-red-400 font-semibold">Explains Ramsey and Others:</span> Mainstream financial advice fits here. If someone has gone mainstream like Dave Ramsey, their message resonates with the majority - who are scraping by.</p>
                  </div>
                </div>
              </div>

              {/* Tier 2: Stability */}
              <div className="bg-orange-500/10 p-6 rounded-lg border border-orange-500/20">
                <h4 className="text-xl font-bold text-orange-400 mb-4">Tier 2 — STABILITY: $150K → $1.5M</h4>
                <div className="space-y-4 text-gray-300">
                  <p>This is where the youngest audience sits. While it seems like your life would change dramatically from $150K to $1M, <span className="text-orange-400 font-semibold">it doesn&apos;t change nearly as much as you think.</span></p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-3">The Good News:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• Don&apos;t need to check prices when buying dinner</li>
                        <li>• Vacations are standard, not a splurge</li>
                        <li>• Brain shifts from &ldquo;survive&rdquo; to &ldquo;get to next rung&rdquo;</li>
                        <li>• Visibly no longer in survival mode</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-semibold mb-3">The Problem:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• This zone feels safe. It isn&apos;t.</li>
                        <li>• Over-rely on W-2 income</li>
                        <li>• Follow same strategies from survival zone</li>
                        <li>• <em>The plan that got you here won&apos;t get you there</em></li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded border border-orange-500/30">
                    <h6 className="text-orange-400 font-semibold mb-2">Adjusted Playbook:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Double emergency fund:</span> 12 months expenses for risk-taking</li>
                      <li>• <span className="text-blue-400">Long-term building:</span> $200K W-2 + $100K wifi money &gt; $350K W-2</li>
                      <li>• <span className="text-green-400">Cost focus dies:</span> Question big items only (car, vacation, house)</li>
                    </ul>
                    <p className="text-xs text-gray-400 mt-3"><span className="text-orange-400">Quick math:</span> $75K/yr living on $1.5M at 4% withdrawal = $60K/yr. Intense burning desire to reach Comfort Zone.</p>
                  </div>
                </div>
              </div>

              {/* Tier 3: Comfort */}
              <div className="bg-blue-500/10 p-6 rounded-lg border border-blue-500/20">
                <h4 className="text-xl font-bold text-blue-400 mb-4">Tier 3 — COMFORT: $2M → $6M</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="text-blue-300 font-semibold">This is the first real taste of freedom. The stress-drop is dramatic.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-3">What Changes:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• Emergencies annoying but not life-altering</li>
                        <li>• Housing isn&apos;t really relevant anymore</li>
                        <li>• No longer worried about getting richer long-term</li>
                        <li>• Can buy practically anything you want</li>
                        <li>• Performance actually goes up - money stress gone</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-green-400 font-semibold mb-3">New Focus:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• Begin to diversify (wealth built, now protect)</li>
                        <li>• Trusts, inheritance, tax planning</li>
                        <li>• Lifestyle design - &ldquo;what do I want my life to look like&rdquo;</li>
                        <li>• Time becomes infinitely more valuable than money</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded border border-blue-500/30">
                    <p className="text-blue-400 font-semibold mb-2">Math Time:</p>
                    <p className="text-sm">At $5M, 4% rule = $200,000/year sustainable withdrawals. <span className="text-yellow-400">Over $15,000 a month.</span> Without mortgage or McMansion, tough to burn this on standard living.</p>
                    <p className="text-xs text-gray-400 mt-2"><span className="text-blue-400 font-semibold">$2M life is comfortable. $6M you own your time.</span></p>
                  </div>
                </div>
              </div>

              {/* Tier 4: Freedom */}
              <div className="bg-green-500/10 p-6 rounded-lg border border-green-500/20">
                <h4 className="text-xl font-bold text-green-400 mb-4">Tier 4 — FREEDOM: $6M → $20M</h4>
                <div className="space-y-4 text-gray-300">
                  <p>You stop running life through a spreadsheet. <span className="text-green-400 font-semibold">Money is a given since you&apos;re working on things you enjoy.</span></p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-yellow-400 font-semibold mb-3">How Your Views Change:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <span className="text-blue-400">Work is optional:</span> Only do what you enjoy</li>
                        <li>• <span className="text-purple-400">Extreme mobility:</span> Go wherever, access highest quality</li>
                        <li>• <span className="text-yellow-400">Investment system:</span> You have a world view and cash flows</li>
                        <li>• Guard time like Fort Knox</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-red-400 font-semibold mb-3">New Risks:</h5>
                      <ul className="space-y-2 text-sm">
                        <li>• <span className="text-red-400">Complacency:</span> Do nothing = brain becomes Blockbuster</li>
                        <li>• <span className="text-red-400">Personal life:</span> Drugs/alcohol to offset bad relationships</li>
                        <li>• <span className="text-red-400">Ego gambles:</span> Using money as crutch for &ldquo;sure things&rdquo;</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded border border-green-500/30">
                    <h6 className="text-green-400 font-semibold mb-2">Retain the Castle Strategy:</h6>
                    <ul className="space-y-1 text-sm">
                      <li>• <span className="text-yellow-400">Percentage risks:</span> Limit downside to ~1 year income max</li>
                      <li>• <span className="text-blue-400">Guard health & relationships:</span> New currency - time and health</li>
                      <li>• <span className="text-purple-400">Tech research:</span> Stay ahead or get left behind</li>
                    </ul>
                    <p className="text-xs text-gray-400 mt-3"><span className="text-green-400 font-semibold">$10M is Enough to Retire:</span> 4% = $400K/year. Full optionality. Anyone saying otherwise is a troll.</p>
                  </div>
                </div>
              </div>

              {/* Tier 5: Abundance */}
              <div className="bg-purple-500/10 p-6 rounded-lg border border-purple-500/20">
                <h4 className="text-xl font-bold text-purple-400 mb-4">Tier 5 — ABUNDANCE: $25M+</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="text-purple-300 font-semibold">Peak of the triangle. Most common paths:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/30 p-4 rounded border border-purple-500/30">
                      <h6 className="text-yellow-400 font-semibold mb-2">Builders</h6>
                      <p className="text-sm">Keep scaling, starting companies, making new worlds</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded border border-purple-500/30">
                      <h6 className="text-blue-400 font-semibold mb-2">Investors</h6>
                      <p className="text-sm">Focus on start-ups, venture capital, etc.</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded border border-purple-500/30">
                      <h6 className="text-green-400 font-semibold mb-2">Passion People</h6>
                      <p className="text-sm">Slow down for hobbies (typically post-50, otherwise get bored)</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded border border-purple-500/30">
                    <h6 className="text-purple-400 font-semibold mb-2">The Reality:</h6>
                    <ul className="space-y-1 text-sm">
                        <li>• <span className="text-yellow-400">Disaster only:</span> Even 50% drop in 2008-style crash doesn&apos;t matter</li>
                      <li>• <span className="text-blue-400">$1M+ passive:</span> Earning without doing anything</li>
                      <li>• <span className="text-green-400">Real risk:</span> Primarily health</li>
                      <li>• <span className="text-purple-400">Legacy focus:</span> What do you want to change in the world?</li>
                    </ul>
                    <p className="text-xs text-gray-400 mt-3">Past $25M you can live anywhere without a care in the world.</p>
                  </div>
                </div>
              </div>

              {/* Your Bitcoin Path */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">🎯 When Are YOU Going to be Set for Life?</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="text-yellow-300 font-semibold">Our Guess: somewhere between Tier 3 and Tier 4.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-black/30 p-4 rounded border border-blue-500/30">
                      <h6 className="text-blue-400 font-semibold mb-2">~$2M: Comfortable</h6>
                      <p className="text-sm">Good life, but fragile to catastrophic events if mismanaged. Your Bitcoin journey gets you here by 2026.</p>
                    </div>
                    <div className="bg-black/30 p-4 rounded border border-green-500/30">
                      <h6 className="text-green-400 font-semibold mb-2">~$6M: Freedom</h6>
                      <p className="text-sm">You can stop working and live high-quality life indefinitely. Your 21 BTC strategy reaches this by 2030.</p>
                    </div>
                  </div>
                  
                  <div className="bg-black/30 p-4 rounded border border-yellow-500/30 mt-4">
                    <p className="text-yellow-400 font-semibold mb-2">Remember the Golden Rule:</p>
                    <p className="text-sm">Lady Luck doesn&apos;t like beggars. She prefers people who get to $6M+ and say <em>&ldquo;ah whatever, I&apos;ll try this random idea because why not&rdquo;</em>. She does not like the smell of desperation and greed.</p>
                    <p className="text-xs text-gray-400 mt-2 font-bold">Flow state only!</p>
                  </div>
                  
                  <div className="text-center mt-6">
                    <p className="text-lg font-bold text-yellow-400">Your 21 Bitcoin → $16.32M path puts you solidly in Tier 4 FREEDOM</p>
                    <p className="text-sm text-gray-400 mt-2">From comfortable ($2M by 2026) to complete freedom ($16M+ by 2035)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wealth Levels Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🎯 Your Wealth Levels & Lifestyle
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wealthLevels.map((level, index) => (
                <div key={index} className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">{level.level}</h4>
                  <p className="text-lg font-semibold text-white mb-2">{level.portfolio}</p>
                  <p className="text-green-400 font-medium mb-3">{level.income}</p>
                  <p className="text-yellow-300 font-medium mb-3">{level.lifestyle}</p>
                  <p className="text-sm text-gray-300">{level.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Strategy Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🚀 Your Bitcoin Strategy by Phase
            </h3>
            <div className="space-y-6">
              {strategies.map((strategy, index) => (
                <div key={index} className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">{strategy.phase}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-white">{strategy.target}</p>
                      <p className="text-sm text-gray-400">Target Portfolio</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-400">{strategy.bitcoinPrice}</p>
                      <p className="text-sm text-gray-400">Bitcoin Price</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold text-green-400">Strategy</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{strategy.strategy}</p>
                </div>
              ))}
            </div>
          </div>

          {/* LiveTheLife.tv & IkigaiLabs Alignment */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              🌟 Aligned with Your Vision
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-400">LiveTheLife.tv Lifestyle</h4>
                <div className="space-y-3 text-gray-300">
                  <p>• <span className="text-yellow-400">Restaurant Level:</span> World-class dining experiences</p>
                  <p>• <span className="text-yellow-400">Travel Level:</span> Private villas, first-class adventures</p>
                  <p>• <span className="text-yellow-400">Luxury Level:</span> Penthouses, exclusive memberships</p>
                  <p>• <span className="text-yellow-400">Real Estate Level:</span> Mansions, generational wealth</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-yellow-400">IkigaiLabs.xyz Innovation</h4>
                <div className="space-y-3 text-gray-300">
                  <p>• <span className="text-blue-400">Bitcoin Maximalism:</span> Decentralized financial freedom</p>
                  <p>• <span className="text-blue-400">Purpose-Driven Wealth:</span> Impact through innovation</p>
                  <p>• <span className="text-blue-400">Tech-First Strategy:</span> Leveraging blockchain adoption</p>
                  <p>• <span className="text-blue-400">Community Building:</span> Mentoring and philanthropy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Plan Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              📋 Action Plan: Managing 21 BTC Through 2025-2026 Cycle Peak
            </h3>
            <div className="space-y-6">
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <p className="text-gray-300 leading-relaxed mb-4">
                  Based on BowTiedBull&apos;s qualitative strategy for Q4 2025/Q1 2026, this action plan tailors their approach to your 21 BTC position. The cycle isn&apos;t over, with potential upside driven by Fed rate cuts, but the rally could start as early as late September if dovish or delay to later Q4 otherwise.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p className="text-yellow-400 font-semibold mb-2">Key Themes:</p>
                    <ul className="space-y-1">
                      <li>• Write down objectives today to remove emotion</li>
                      <li>• Use 85% rule to take profits early</li>
                      <li>• Focus on majors like BTC for final run-up</li>
                      <li>• Play &quot;singles&quot; (steady gains over scams)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-yellow-400 font-semibold mb-2">End-of-Cycle Signals:</p>
                    <ul className="space-y-1">
                      <li>• Hype IPOs at 200x earnings</li>
                      <li>• Parents messaging about buys</li>
                      <li>• Ego inflation & congratulations</li>
                      <li>• Meaningless hype everywhere</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 italic">
                  This is not financial advice—it&apos;s a synthesized strategy. Adjust for your risk tolerance, taxes, and full portfolio.
                </p>
              </div>

              {/* Step 1 */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Step 1: Define and Document Your Cycle Objective (Do This Today)</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="font-semibold text-yellow-300">Why?</p>
                  <p>Without a written goal, you&apos;ll FOMO into the bear market. 99% gloss over this; don&apos;t be them. Your 21 BTC gives leverage—time is your asset as a larger holder.</p>
                  
                  <div className="bg-black/20 p-4 rounded border border-yellow-500/30">
                    <p className="font-semibold text-yellow-400 mb-3">Action Items:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <span className="text-yellow-300">Calculate current value:</span> 21 BTC × $90K = ~$1.89M</li>
                      <li>• <span className="text-yellow-300">Set realistic goal:</span> Aim for $3M+ total net worth from crypto</li>
                      <li>• <span className="text-yellow-300">Apply 85% Rule:</span> Lower target to $2.55M (85% of $3M)</li>
                      <li>• <span className="text-yellow-300">For your size:</span> Plan to sell ~half (10-11 BTC) near peak to derisk</li>
                      <li>• <span className="text-yellow-300">Document it:</span> &quot;Goal: $3M peak / $2.55M secured. Sell 10.5 BTC at $180K+ or $200K+&quot;</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Step 2: Position for the Run-Up (Heavy Majors Focus)</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="font-semibold text-yellow-300">Why?</p>
                  <p>Doc advises &quot;heavy position in majors for the last run up&quot; + buy confirmed narratives for 1-2 months. With BTC as your core, stay 80-90% allocated here.</p>
                  
                  <div className="bg-black/20 p-4 rounded border border-yellow-500/30">
                    <p className="font-semibold text-yellow-400 mb-3">Action Items:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <span className="text-yellow-300">Hold Core BTC:</span> Keep all 21 BTC in cold storage</li>
                      <li>• <span className="text-yellow-300">Monitor Macro Triggers:</span> Fed this week, unemployment data, QT rate</li>
                      <li>• <span className="text-yellow-300">Add Lightly:</span> Allocate 1-2 BTC equivalent to ETH or confirmed narratives</li>
                      <li>• <span className="text-yellow-300">Risk Management:</span> Set stop-loss at -15% from current (~$76.5K/BTC)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Step 3: Identify and Execute Peak Selling (Sell Some Near Top)</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="font-semibold text-yellow-300">Why?</p>
                  <p>End-of-cycle = heaviest returns, but mania signs signal over. Don&apos;t go to zero. As larger player, sell half early to avoid -60-80% majors drop.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-black/20 p-4 rounded border border-yellow-500/30">
                      <p className="font-semibold text-yellow-400 mb-3">Selling Signals:</p>
                      <ul className="space-y-2 text-sm">
                        <li>• <span className="text-yellow-300">Early Warnings:</span> Short-duration bonds collapsing; job openings dead</li>
                        <li>• <span className="text-yellow-300">Peak Confirmation:</span> 25-50% manic pop; parents messaging buys</li>
                        <li>• <span className="text-yellow-300">Hard Exit:</span> BTC hits $200K+; unemployment &gt;8% risk</li>
                      </ul>
                    </div>
                    <div className="bg-black/20 p-4 rounded border border-yellow-500/30">
                      <p className="font-semibold text-yellow-400 mb-3">Target Price Tiers:</p>
                      <ul className="space-y-2 text-sm">
                        <li>• <span className="text-yellow-300">Tier 1 ($150K-$180K):</span> Sell 5 BTC (~$750K-$900K)</li>
                        <li>• <span className="text-yellow-300">Tier 2 ($180K-$220K):</span> Sell additional 5-6 BTC</li>
                        <li>• <span className="text-yellow-300">Post-Sell:</span> Hold remaining 10-11 BTC through drop</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-yellow-500/10 p-6 rounded-lg border border-yellow-500/20">
                <h4 className="text-xl font-bold text-yellow-400 mb-4">Step 4: Post-Peak Management and Re-Entry</h4>
                <div className="space-y-4 text-gray-300">
                  <p className="font-semibold text-yellow-300">Why?</p>
                  <p>Peak to bottom = -60-80%; BTC $70K worse-case. But cycles repeat—rebuy low. Use time as asset; build non-crypto income.</p>
                  
                  <div className="bg-black/20 p-4 rounded border border-yellow-500/30">
                    <p className="font-semibold text-yellow-400 mb-3">Action Items:</p>
                    <ul className="space-y-2 text-sm">
                      <li>• <span className="text-yellow-300">Bear Prep:</span> 50% cash/stable for RE; 30% WiFi biz; 20% dry powder</li>
                      <li>• <span className="text-yellow-300">Re-Entry Signals:</span> Unemployment stabilizes; QT ends; inventory builds</li>
                      <li>• <span className="text-yellow-300">Target Rebuy:</span> BTC $70K-$80K (post-80% drop from $200K peak)</li>
                      <li>• <span className="text-yellow-300">Longer-Term:</span> Pivot to hot markets: lifestyle/mobility, self-defense, DTC luxury</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Risks and Reminders */}
              <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20">
                <h4 className="text-xl font-bold text-red-400 mb-4">⚠️ Risks and Reminders</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div>
                    <p className="text-red-400 font-semibold mb-2">Downside:</p>
                    <ul className="space-y-1">
                      <li>• Delayed rally (neutral Powell) = sideways Q4</li>
                      <li>• Broader RE crash if unemployment spikes</li>
                      <li>• Low BTC liquidity in mania</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold mb-2">Upside:</p>
                    <ul className="space-y-1">
                      <li>• Dovish Fed = immediate pop</li>
                      <li>• Your 21 BTC could 2x+ to $4M+ peak</li>
                      <li>• Escape &quot;corporate handcuffs&quot;</li>
                    </ul>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-4 italic">
                  Review plan monthly; update post-Sept 22 Treasury post. This plan positions you to capture 85%+ of upside while derisking.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-[#1c1f26] p-8 rounded-none border-2 border-yellow-500 shadow-[5px_5px_0px_rgba(234,179,8,1)]">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-500 mb-6">
              ❓ Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-yellow-500/20 rounded-lg">
                  <button
                    className="flex w-full items-center justify-between p-4 text-left hover:bg-yellow-500/5 transition-colors"
                    onClick={() => setOpen(open === index ? null : index)}
                  >
                    <span className="font-medium text-white">{faq.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 text-yellow-500 transition-transform',
                        open === index && 'rotate-180'
                      )}
                    />
                  </button>
                  {open === index && (
                    <div className="px-4 pb-4 text-gray-300">
                      <p className="leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 p-8 rounded-none border-2 border-yellow-500 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">
              Ready to Turn 21 Bitcoin Into $21M?
            </h3>
            <p className="text-lg text-gray-300 mb-6">
              From $2.43M to $16.32M: Your path to freedom starts with conviction, patience, and purpose.
            </p>
            <div className="space-y-4 text-gray-300">
              <p>• <span className="text-yellow-400 font-semibold">Never sell your core 21 BTC</span> - preserve your legacy</p>
              <p>• <span className="text-yellow-400 font-semibold">Use 3.3 BTC reserve</span> for bear market living expenses</p>
              <p>• <span className="text-yellow-400 font-semibold">Ride 21% CAGR</span> to $16.32M over 10 years</p>
              <p>• <span className="text-yellow-400 font-semibold">Live the life</span> you deserve while building generational wealth</p>
            </div>
            <p className="text-sm text-gray-400 mt-6">
              <span className="text-yellow-400">LiveTheLife.tv</span> lifestyle meets <span className="text-yellow-400">IkigaiLabs.xyz</span> innovation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 