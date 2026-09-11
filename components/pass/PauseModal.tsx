'use client';

export function PauseModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/50 p-4 md:items-center">
      <div className="w-full rounded-[28px] bg-white p-5 shadow-xl md:mx-auto md:max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-ink">Pause subscription</h3>
          <button className="text-sm font-semibold text-slate-500">Close</button>
        </div>

        <div className="space-y-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-3">
            Up to 3 months pause per year. Your benefits resume automatically.
          </div>
          <div className="rounded-2xl border border-slate-200 p-3">
            <label className="flex items-center justify-between">
              <span>Pause for 1 month</span>
              <input type="radio" name="pause" defaultChecked />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 p-3">
            <label className="flex items-center justify-between">
              <span>Pause for 2 months</span>
              <input type="radio" name="pause" />
            </label>
          </div>
          <div className="rounded-2xl border border-slate-200 p-3">
            <label className="flex items-center justify-between">
              <span>Pause for 3 months</span>
              <input type="radio" name="pause" />
            </label>
          </div>
        </div>

        <button className="mt-5 w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">
          Confirm pause
        </button>
      </div>
    </div>
  );
}
