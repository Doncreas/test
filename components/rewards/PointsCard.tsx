'use client';

import { Gift, Sparkles } from 'lucide-react';

interface PointsCardProps {
  balance: number;
  tier: string;
  streak: number;
}

export function PointsCard({ balance, tier, streak }: PointsCardProps) {
  return (
    <div className="rounded-[32px] bg-gradient-to-br from-sage via-[#4e6d5d] to-sunset p-6 text-white shadow-[0_30px_70px_rgba(59,91,78,0.25)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">TATC Points</p>
          <h2 className="mt-2 text-4xl font-black">{balance.toLocaleString()}</h2>
        </div>
        <div className="rounded-full bg-white/10 p-3 backdrop-blur-sm">
          <Gift size={24} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-white/70">Current tier</p>
          <p className="mt-2 text-xl font-bold">{tier}</p>
        </div>
        <div className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-semibold">
          {streak} ride streak
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-white/90">
        <Sparkles size={16} />
        Birthday month: 5x points active.
      </div>
    </div>
  );
}
