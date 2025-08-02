'use client';

import React from "react";
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

interface InteractiveChartProps {
  series: number[];
  repaymentSeries: number[];
}

export function InteractiveChart({ series, repaymentSeries }: InteractiveChartProps) {
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
        borderColor: '#f87171', // red-400
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        pointRadius: 4,
        pointBackgroundColor: '#f87171',
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
      title: {
        display: true,
        text: 'Bitcoin Requirements & Repayment Over Time',
        color: 'white',
        font: {
          size: 18,
          weight: 'bold',
        }
      },
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: 'white',
          font: {
            size: 12,
          },
          usePointStyle: true,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
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
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Year',
          color: 'white',
          font: {
            size: 14,
            weight: 'bold',
          }
        },
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        }
      },
      y: {
        display: true,
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
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <div className="w-full h-[500px]">
      <Line data={data} options={options} />
    </div>
  );
} 