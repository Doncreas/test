'use client';

import { useState } from 'react';

interface Factor {
  name: string;
  impact: number;
  detail?: string;
}

interface PriceExplainerProps {
  basePrice: number;
  finalPrice: number;
  savings: number;
  factors: Factor[];
  validUntil?: string;
}

export function PriceExplainer({
  basePrice,
  finalPrice,
  savings,
  factors,
  validUntil,
}: PriceExplainerProps) {
  const [open, setOpen] = useState(false);
  const boltComparable = Math.round(basePrice * 1.28 + 4200);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Your fare</p>
          <h3 className="mt-2 text-3xl font-black text-ink">TSh {finalPrice.toLocaleString()}</h3>
        </div>
        <button className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Lock for 5 min</button>
      </div>

      <div className="mt-4 rounded-2xl bg-emerald-50 p-3 text-sm text-emerald-800">
        <div className="flex items-center justify-between">
          <span>You save</span>
          <strong>TSh {savings.toLocaleString()}</strong>
        </div>
      </div>

      <div className="mt-4 text-sm text-slate-600">
        <p>
          Comparison: Bolt would charge about <strong>TSh {boltComparable.toLocaleString()}</strong> + unknown surge + booking fee.
        </p>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-5 w-full rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-ink"
      >
        Why is the price higher?
      </button>

      {open && (
        <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4">
          {factors.map((factor) => (
            <div key={factor.name} className="flex items-start justify-between gap-3 text-sm">
              <div>
                <p className="font-semibold text-ink">{factor.name}</p>
                {factor.detail && <p className="text-xs text-slate-500">{factor.detail}</p>}
              </div>
              <span className={factor.impact >= 0 ? 'text-amber-700' : 'text-emerald-700'}>
                {factor.impact >= 0 ? '+' : '-'}TSh {Math.abs(factor.impact).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

      {validUntil && (
        <p className="mt-4 text-xs text-slate-500">Locked until {new Date(validUntil).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
      )}
    </div>
  );
}
