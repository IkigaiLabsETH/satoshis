'use client';

import React from "react";
import { Input } from "@/components/ui/input";
import { Calculator } from "lucide-react";

interface Inputs {
  btcSpot: number;
  yearlyDrawUSD: number;
  interestRate: number;
  btcCAGR1: number;
  btcCAGR2: number;
  ltvTarget: number;
  horizon: number;
}

interface CalculatorFormProps {
  form: Inputs;
  onChange: (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  setForm: React.Dispatch<React.SetStateAction<Inputs>>;
}

export function CalculatorForm({ form, onChange, setForm }: CalculatorFormProps) {
  return (
    <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-800">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-green-400" />
        Zero Risk Calculator Parameters
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Bitcoin Spot Price ($)
          </label>
          <Input
            type="number"
            value={form.btcSpot}
            onChange={onChange('btcSpot')}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Yearly Draw ($)
          </label>
          <Input
            type="number"
            value={form.yearlyDrawUSD}
            onChange={onChange('yearlyDrawUSD')}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Interest Rate (%)
          </label>
          <Input
            type="number"
            step="0.01"
            value={form.interestRate * 100}
            onChange={(e) => setForm({ ...form, interestRate: parseFloat(e.target.value) / 100 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target LTV (Zero Risk)
          </label>
          <Input
            type="number"
            step="0.01"
            value={form.ltvTarget * 100}
            onChange={(e) => setForm({ ...form, ltvTarget: parseFloat(e.target.value) / 100 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <p className="text-xs text-gray-500 mt-1">10% = 90% safety margin</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            BTC CAGR Years 1-8 (%)
          </label>
          <Input
            type="number"
            step="0.01"
            value={form.btcCAGR1 * 100}
            onChange={(e) => setForm({ ...form, btcCAGR1: parseFloat(e.target.value) / 100 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            BTC CAGR Years 9-15 (%)
          </label>
          <Input
            type="number"
            step="0.01"
            value={form.btcCAGR2 * 100}
            onChange={(e) => setForm({ ...form, btcCAGR2: parseFloat(e.target.value) / 100 })}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Horizon (Years)
          </label>
          <Input
            type="number"
            value={form.horizon}
            onChange={onChange('horizon')}
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>
    </div>
  );
} 