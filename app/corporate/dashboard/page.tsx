import { ApprovalFlow } from '@/components/corporate/ApprovalFlow';
import { SpendChart } from '@/components/corporate/SpendChart';

const departments = [
  { name: 'Operations', spent: 'TSh 420,000', budget: 'TSh 700,000', ratio: '60%' },
  { name: 'Clinical', spent: 'TSh 610,000', budget: 'TSh 900,000', ratio: '68%' },
  { name: 'Sales', spent: 'TSh 250,000', budget: 'TSh 400,000', ratio: '62%' },
  { name: 'HR', spent: 'TSh 120,000', budget: 'TSh 300,000', ratio: '40%' },
];

const riders = [
  { name: 'Amina N.', rides: 18, spend: 'TSh 372,000' },
  { name: 'Daniel M.', rides: 15, spend: 'TSh 314,000' },
  { name: 'Khadija L.', rides: 12, spend: 'TSh 286,000' },
];

export default function CorporateDashboardPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">Corporate dashboard</p>
          <h1 className="mt-2 text-4xl font-black text-ink">Travel spend overview</h1>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-ink">Export CSV</button>
          <button className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white">Download PDF</button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.8fr_1fr]">
        <SpendChart />
        <ApprovalFlow />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-ink">Department breakdown</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Monthly total</span>
          </div>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-semibold text-ink">{dept.name}</span>
                  <span className="text-slate-600">{dept.spent} / {dept.budget}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-sage" style={{ width: dept.ratio }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-black text-ink">Top riders</h2>
          <div className="space-y-4">
            {riders.map((rider, index) => (
              <div key={rider.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 font-bold text-ink">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-ink">{rider.name}</p>
                    <p className="text-xs text-slate-500">{rider.rides} rides this month</p>
                  </div>
                </div>
                <span className="font-bold text-ink">{rider.spend}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
