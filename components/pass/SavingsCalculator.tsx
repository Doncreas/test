'use client';

import { useMemo, useState } from 'react';
import { estimateSavings, PASS_PLANS, PassTier } from '@/lib/pass/billing';

export function SavingsCalculator() {
  const [monthlySpend, setMonthlySpend] = useState(180000);
  const [selectedTier, setSelectedTier] = useState<PassTier>('pass');

  const savings = useMemo(() => estimateSavings(selectedTier, monthlySpend), [monthlySpend, selectedTier]);
  const plan = PASS_PLANS[selectedTier];

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-black text-ink">Savings calculator</h3>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">Live</span>
      </div>

      <label className="block text-sm font-semibold text-slate-700">
        Estimated monthly rides spend
        <input
          type="range"
          min={50000}
          max={500000}
          step={5000}
          value={monthlySpend}
          onChange={(event) => setMonthlySpend(Number(event.target.value))}
          className="mt-3 w-full accent-sage"
        />
      </label>

      <div className="mt-5 rounded-2xl bg-slate-50 p-3">
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Selected plan</p>
        <select
          value={selectedTier}
          onChange={(event) => setSelectedTier(event.target.value as PassTier)}
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-ink"
        >
          <option value="free">Free</option>
          <option value="pass">Karibu Pass</option>
          <option value="passplus">Karibu Pass+</option>
          <option value="black">Karibu Black</option>
        </select>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-emerald-50 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-emerald-700">You save</p>
          <p className="mt-2 text-xl font-black text-ink">TSh {savings.toLocaleString()}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Plan cost</p>
          <p className="mt-2 text-xl font-black text-ink">TSh {plan.priceTzs.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
