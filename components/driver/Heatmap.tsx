'use client';

const blocks = [
  [1, 1, 2, 1, 2, 3, 3, 2, 1],
  [2, 3, 4, 5, 5, 4, 3, 2, 1],
  [1, 2, 3, 4, 4, 3, 2, 3, 2],
  [2, 3, 4, 5, 6, 5, 4, 3, 2],
  [1, 2, 3, 3, 4, 5, 3, 2, 1],
];

export function Heatmap() {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-black text-ink">Nearby demand</h3>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">+18% next 2h</span>
      </div>

      <div className="grid grid-cols-9 gap-1.5">
        {blocks.flat().map((value, index) => (
          <div
            key={`${value}-${index}`}
            className={`h-7 rounded-md ${
              value === 1 ? 'bg-slate-200' :
              value === 2 ? 'bg-sky-200' :
              value === 3 ? 'bg-sky-300' :
              value === 4 ? 'bg-amber-300' :
              'bg-rose-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
