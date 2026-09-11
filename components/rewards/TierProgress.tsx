'use client';

import { ArrowRight } from 'lucide-react';

const tiers = [
  { name: 'Bronze', min: 0, max: 2499 },
  { name: 'Silver', min: 2500, max: 9999 },
  { name: 'Gold', min: 10000, max: 24999 },
  { name: 'Platinum', min: 25000, max: 49999 },
  { name: 'Diamond', min: 50000, max: Infinity }
];

interface TierProgressProps {
  points: number;
}

export function TierProgress({ points }: TierProgressProps) {
  const currentTier = tiers.findLast((tier) => points >= tier.min) ?? tiers[0];
  const currentTierIndex = tiers.findIndex((tier) => tier.name === currentTier.name);
  const nextTier = tiers[currentTierIndex + 1];
  const progressValue = nextTier ? ((points - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Tier status</p>
          <h3 className="mt-2 text-2xl font-black text-ink">{currentTier.name}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {points.toLocaleString()} pts
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-sage via-[#7caf8b] to-sunset"
          style={{ width: `${Math.min(progressValue, 100)}%` }}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
        <span>{currentTier.name}</span>
        {nextTier ? (
          <span className="inline-flex items-center gap-1 font-semibold text-sage">
            {nextTier.name} <ArrowRight size={14} />
          </span>
        ) : (
          <span className="font-semibold text-sage">Top tier unlocked</span>
        )}
      </div>
    </div>
  );
}
