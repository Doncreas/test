'use client';

export function WithdrawModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-end bg-slate-900/50 p-4 md:items-center">
      <div className="w-full rounded-[28px] bg-white p-5 shadow-xl md:mx-auto md:max-w-md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-black text-ink">Withdraw earnings</h3>
          <button className="text-sm font-semibold text-slate-500">Close</button>
        </div>

        <div className="space-y-3">
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
            <span className="font-semibold text-ink">M-Pesa instant</span>
            <span className="text-xs text-emerald-700">Instant</span>
          </button>
          <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left">
            <span className="font-semibold text-ink">Bank transfer</span>
            <span className="text-xs text-slate-500">T+1</span>
          </button>
        </div>

        <button className="mt-5 w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">Withdraw TSh 190,000</button>
      </div>
    </div>
  );
}
