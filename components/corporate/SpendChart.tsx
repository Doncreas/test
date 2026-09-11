'use client';

interface SpendChartProps {
  data?: number[];
}

export function SpendChart({ data = [24, 42, 31, 58, 73, 66, 88] }: SpendChartProps) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Spend tracker</p>
          <h3 className="mt-2 text-2xl font-black text-ink">TSh 1.8M</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">+12.4%</span>
      </div>

      <div className="flex h-40 items-end gap-2">
        {data.map((value, index) => (
          <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-2xl bg-gradient-to-t from-sage to-sunset"
              style={{ height: `${Math.max(value, 8)}%` }}
            />
            <span className="text-[10px] text-slate-500">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
