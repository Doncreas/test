import { SavingsCalculator } from '@/components/pass/SavingsCalculator';
import { TierCard } from '@/components/pass/TierCard';

export default function PassPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 text-ink">
      <div className="mb-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage">Karibu Pass</p>
        <h1 className="mt-3 text-4xl font-black md:text-5xl">Choose your ride benefits</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-4">
        <TierCard tier="free" />
        <TierCard tier="pass" selected />
        <TierCard tier="passplus" />
        <TierCard tier="black" isBlack />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <SavingsCalculator />
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-xl font-black text-ink">Why riders upgrade</h3>
          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl bg-emerald-50 p-3">• 10% to 20% ride savings every month</div>
            <div className="rounded-2xl bg-amber-50 p-3">• Free wait time and priority dispatch</div>
            <div className="rounded-2xl bg-sky-50 p-3">• Family plan for up to 4 members</div>
            <div className="rounded-2xl bg-slate-100 p-3">• Pause or gift anytime</div>
          </div>
        </div>
      </div>
    </main>
  );
}
