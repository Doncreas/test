import Link from 'next/link';

export const dynamic = 'force-dynamic';

const stats = [
  { label: 'Active companies', value: '1,240+' },
  { label: 'Monthly rides', value: '18.4k' },
  { label: 'Avg. approval time', value: '4 min' },
  { label: 'Saved on admin work', value: '31%' },
];

export default function CorporatePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm lg:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex rounded-full bg-sage/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-sage">
                Karibu for business
              </span>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-ink md:text-6xl">
                Move your whole team with a single trusted travel account.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-slate-600">
                Built for Tanzanian companies, NGOs, clinics, and field teams that need secure rides, policy enforcement, and hassle-free expense control.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/corporate/dashboard" className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">View dashboard</Link>
                <Link href="/corporate/admin/employees" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-ink">Manage employees</Link>
              </div>
            </div>

            <div className="w-full max-w-md rounded-[28px] border border-slate-200 bg-slate-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Finance controls</p>
              <div className="mt-5 space-y-4">
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Department budget used</span>
                    <span>68%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[68%] rounded-full bg-sage" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                    <span>Ride approval threshold</span>
                    <span>50k TZS</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200">
                    <div className="h-2 w-[85%] rounded-full bg-sunset" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-4 text-3xl font-black text-ink">{item.value}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
