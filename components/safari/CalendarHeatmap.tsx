'use client';

import { useMemo } from 'react';
import { getSeasonWindow, SAFARI_SEASONS, type SafariSeason } from '@/lib/safari/seasonality';

interface CalendarHeatmapProps {
  value?: string;
  onChange?: (date: string) => void;
  months?: number;
}

function toDateInputValue(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function monthLabel(month: number): string {
  return new Date(Date.UTC(2026, month - 1, 1)).toLocaleDateString('en-US', { month: 'long' });
}

export function CalendarHeatmap({ value, onChange, months = 12 }: CalendarHeatmapProps) {
  const today = useMemo(() => {
    const date = new Date();
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }, []);
  const startDate = value || toDateInputValue(today);
  const previewMonths = Array.from({ length: Math.min(Math.max(months, 3), 12) }, (_, index) => {
    const month = ((today.getUTCMonth() + index) % 12) + 1;
    return {
      month,
      season: getSeasonWindow(new Date(Date.UTC(today.getUTCFullYear(), month - 1, 15))),
    };
  });

  return (
    <section className="rounded-3xl border border-sage/10 bg-white p-5 shadow-[0_18px_50px_rgba(10,31,28,0.06)]">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Safari calendar</p>
          <h2 className="mt-2 text-xl font-black text-ink">Choose your travel window</h2>
          <p className="mt-1 text-sm leading-6 text-ink/60">Seasonality affects wildlife, crowds, and your estimated package price.</p>
        </div>
        <label className="text-sm font-semibold text-ink/70">
          Start date
          <input
            type="date"
            min={toDateInputValue(today)}
            value={startDate}
            onChange={(event) => onChange?.(event.target.value)}
            className="mt-2 block rounded-2xl border border-sage/15 bg-cream px-3 py-2 text-sm text-ink outline-none focus:border-sunset"
          />
        </label>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {previewMonths.map(({ month, season }) => (
          <div
            key={month}
            className={`rounded-2xl border p-3 ${
              season.season === 'low'
                ? 'border-emerald-200 bg-emerald-50'
                : season.season === 'high'
                  ? 'border-orange-200 bg-orange-50'
                  : 'border-gold/30 bg-[#fff8e9]'
            }`}
          >
            <p className="text-sm font-black text-ink">{monthLabel(month)}</p>
            <p className="mt-1 text-xs font-bold capitalize text-sage">{season.label}</p>
            <p className="mt-3 text-xs leading-5 text-ink/60">{season.summary}</p>
            <p className="mt-3 text-xs font-black text-sunset">{season.priceMultiplier}x price</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(SAFARI_SEASONS) as SafariSeason[]).map((seasonKey) => (
          <span key={seasonKey} className="rounded-full bg-cream px-3 py-2 text-xs font-bold capitalize text-sage">
            {SAFARI_SEASONS[seasonKey].label}
          </span>
        ))}
      </div>
    </section>
  );
}
