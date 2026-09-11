import { PauseModal } from '@/components/pass/PauseModal';

const activity = [
  { label: 'Rides this month', value: '24 rides' },
  { label: 'Saved amount', value: 'TSh 48,000' },
  { label: 'Perks available', value: '3 active' },
  { label: 'Plan status', value: 'Active' },
];

export default function PassManagePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Membership</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Karibu Pass+</h1>
        </div>
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Manage</button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {activity.map((item) => (
          <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-xl font-black text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink">Gift membership</button>
        <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink">Pause plan</button>
        <button className="rounded-full bg-rose-100 px-4 py-2 text-sm font-semibold text-rose-700">Cancel anytime</button>
      </div>

      <PauseModal />
    </main>
  );
}
