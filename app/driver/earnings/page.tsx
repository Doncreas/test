import { WithdrawModal } from '@/components/driver/WithdrawModal';

const dailyBreakdown = [
  { label: 'Moto', value: 'TSh 120,000' },
  { label: 'Digital', value: 'TSh 210,000' },
  { label: 'Tips', value: 'TSh 28,000' },
  { label: 'Costs', value: 'TSh 58,000' },
];

const trips = [
  { id: 'TRIP-801', route: 'Airport → City Centre', amount: 'TSh 64,000', cost: 'TSh 12,500', payout: 'TSh 51,500' },
  { id: 'TRIP-802', route: 'Mbezi → Arusha', amount: 'TSh 84,000', cost: 'TSh 16,200', payout: 'TSh 67,800' },
  { id: 'TRIP-803', route: 'Masaki → Clinic', amount: 'TSh 42,000', cost: 'TSh 9,000', payout: 'TSh 33,000' },
];

export default function DriverEarningsPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Earnings</p>
          <h1 className="mt-2 text-3xl font-black text-ink">Dashboard</h1>
        </div>
        <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Withdraw</button>
      </div>

      <section className="rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">Net payout</p>
            <p className="mt-2 text-4xl font-black text-ink">TSh 190,000</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">+12.4%</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {dailyBreakdown.map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-3">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
              <p className="mt-2 font-black text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-5 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-black text-ink">Recent trips</h2>
          <span className="text-xs font-semibold text-slate-500">Weekly view</span>
        </div>
        <div className="space-y-3">
          {trips.map((trip) => (
            <div key={trip.id} className="rounded-2xl border border-slate-200 p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-ink">{trip.id}</p>
                  <p className="text-xs text-slate-500">{trip.route}</p>
                </div>
                <p className="font-black text-ink">{trip.amount}</p>
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-600">
                <span>Costs: {trip.cost}</span>
                <span>Payout: {trip.payout}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <WithdrawModal />
    </main>
  );
}
