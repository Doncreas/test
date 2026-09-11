const perks = [
  '14-day free trial',
  'Cancel anytime',
  'Annual plan saves 2 months',
  'Family share available',
];

export default function PassCheckoutPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage">Checkout</p>
        <h1 className="mt-3 text-4xl font-black text-ink">Karibu Pass+</h1>

        <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-emerald-800">You would have saved TSh 64,000 this month</p>
          <p className="mt-2 text-3xl font-black text-ink">TSh 24,900 / month</p>
        </div>

        <ul className="mt-6 space-y-3 text-sm text-slate-700">
          {perks.map((perk) => (
            <li key={perk} className="rounded-2xl bg-slate-50 px-3 py-2">• {perk}</li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">Pay monthly</button>
          <button className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-ink">Pay yearly</button>
        </div>
      </div>
    </main>
  );
}
