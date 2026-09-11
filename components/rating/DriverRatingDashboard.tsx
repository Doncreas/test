'use client';

interface DriverRatingDashboardProps {
  averageRating?: number;
  trend?: number[];
  strengths?: Record<string, number>;
}

export function DriverRatingDashboard({
  averageRating = 4.8,
  trend = [4.7, 4.8, 4.9, 4.8, 4.9, 4.6, 4.8],
  strengths = {
    cleanliness: 92,
    punctuality: 94,
    english: 88,
    luggage: 81,
    ac: 90
  }
}: DriverRatingDashboardProps) {
  const labels = Object.keys(strengths);
  const maxValue = 100;
  const centerX = 120;
  const centerY = 120;
  const radius = 80;

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Driver analytics</p>
          <h3 className="mt-2 text-2xl font-black text-ink">{averageRating.toFixed(1)} avg rating</h3>
        </div>
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
          {averageRating >= 4.5 ? 'Healthy' : 'Watchlist'}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl bg-slate-50 p-4">
          <svg viewBox="0 0 240 240" className="h-56 w-full">
            {[20, 40, 60, 80, 100].map((tick) => {
              const r = (radius * tick) / 100;
              const points = Array.from({ length: labels.length }, (_, index) => {
                const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                return `${x},${y}`;
              }).join(' ');

              return <polygon key={tick} points={points} fill="none" stroke="#dbe3e3" strokeWidth="1" />;
            })}

            {labels.map((label, index) => {
              const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
              const x = centerX + Math.cos(angle) * radius;
              const y = centerY + Math.sin(angle) * radius;
              return (
                <g key={label}>
                  <line x1={centerX} y1={centerY} x2={x} y2={y} stroke="#dbe3e3" />
                  <text x={centerX + Math.cos(angle) * (radius + 18)} y={centerY + Math.sin(angle) * (radius + 18)} textAnchor="middle" fontSize="9" fill="#334155">
                    {label}
                  </text>
                </g>
              );
            })}

            <polygon
              points={Array.from({ length: labels.length }, (_, index) => {
                const value = strengths[labels[index]] ?? 0;
                const angle = ((Math.PI * 2) / labels.length) * index - Math.PI / 2;
                const radiusValue = (value / maxValue) * radius;
                const x = centerX + Math.cos(angle) * radiusValue;
                const y = centerY + Math.sin(angle) * radiusValue;
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(93, 132, 109, 0.26)"
              stroke="#456a52"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-slate-500">Last 30 rides</p>
            <div className="mt-3 flex items-end gap-2">
              {trend.map((value, index) => (
                <div key={`${value}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-sage to-sunset"
                    style={{ height: `${(value / 5) * 100}px` }}
                    title={`${value.toFixed(1)} rating`}
                  />
                  <span className="text-[10px] text-slate-500">{index + 1}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            {averageRating < 4.5 ? 'Auto-flag triggered: rating trend is below 4.5.' : 'Trend is healthy and stable.'}
          </div>
        </div>
      </div>
    </div>
  );
}
