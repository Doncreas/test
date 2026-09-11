import { Heatmap } from '@/components/driver/Heatmap';
import { TripOffer } from '@/components/driver/TripOffer';
import { EarningsCounter } from '@/components/driver/EarningsCounter';

export const dynamic = 'force-dynamic';

const quickStats = [
  { label: 'Trips today', value: '31' },
  { label: 'Acceptance', value: '94%' },
  { label: 'Rating', value: '4.9/5' },
];

export default function DriverHomePage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-6 text-ink">
      <div className="mx-auto max-w-md">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Karibu driver</p>
            <h1 className="mt-2 text-3xl font-black">Habari, Asha</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Online
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Mapato ya leo</p>
              <EarningsCounter value={190000} />
            </div>
            <button className="h-14 w-14 rounded-full bg-slate-900 text-lg font-bold text-white shadow-lg">ON</button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-slate-50 p-3 text-center">
                <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">{stat.label}</p>
                <p className="mt-1 text-lg font-black text-ink">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <Heatmap />
        </div>

        <div className="mt-5">
          <TripOffer />
        </div>

        <div className="mt-5 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-black text-ink">Bonasi za leo</h3>
            <span className="text-xs font-semibold text-sage">3 active</span>
          </div>
          <div className="space-y-2 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-2xl bg-amber-50 px-3 py-2">
              <span>Long trip bonus</span>
              <strong>TSh 12,000</strong>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-emerald-50 px-3 py-2">
              <span>Airport surge</span>
              <strong>TSh 20,000</strong>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-sky-50 px-3 py-2">
              <span>Top-rated streak</span>
              <strong>+5%</strong>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
