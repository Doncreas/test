'use client';

interface SurgeIndicatorProps {
  multiplier?: number;
  locked?: boolean;
}

export function SurgeIndicator({ multiplier = 1, locked = false }: SurgeIndicatorProps) {
  const meter = Math.min(Math.max(((multiplier - 0.7) / 1.3) * 100, 8), 100);

  const level = multiplier >= 1.35 ? 'High demand' : multiplier >= 1.15 ? 'Busy' : multiplier >= 0.95 ? 'Balanced' : 'Off-peak';
  const meterColor = multiplier >= 1.35 ? 'bg-rose-500' : multiplier >= 1.15 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">Demand meter</p>
          <h3 className="mt-1 text-lg font-black text-ink">{level}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {locked ? 'Price locked' : `${multiplier.toFixed(2)}x`}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${meterColor}`} style={{ width: `${meter}%` }} />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Low</span>
        <span>Stable</span>
        <span>High</span>
      </div>
    </div>
  );
}
