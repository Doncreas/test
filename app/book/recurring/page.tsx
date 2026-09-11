import { Repeat, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RecurrenceBuilder } from '@/components/booking/RecurrenceBuilder';

export default function RecurringBookingPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(26,39,36,0.08)] sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Recurring rides</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Set your regular trip</h1>
          </div>
          <div className="rounded-full bg-sage/10 px-4 py-2 text-sm font-semibold text-sage">12-week preview</div>
        </div>

        <div className="space-y-6">
          <RecurrenceBuilder />

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sage">
              <Repeat size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Subscription options</p>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Daily commuter</p>
                <p className="mt-2 text-2xl font-black text-ink">20 rides</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Weekly airport</p>
                <p className="mt-2 text-2xl font-black text-ink">4 rides</p>
              </div>
              <div className="rounded-2xl bg-white p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Corporate</p>
                <p className="mt-2 text-2xl font-black text-ink">Unlimited</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sage">
              <Sparkles size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">Bulk discount</p>
            </div>
            <p className="mt-3 text-sm text-slate-700">Monthly frequency can unlock 10–25% savings on long-term commitments.</p>
          </div>

          <Button type="button" className="w-full justify-center">Subscribe recurring ride</Button>
        </div>
      </div>
    </main>
  );
}
