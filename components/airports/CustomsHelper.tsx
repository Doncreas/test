'use client';

const rules = [
  { title: 'Currency declaration', body: 'Declare amounts above USD 10,000 or equivalent at customs.' },
  { title: 'Visa-on-arrival', body: 'Cost varies by nationality. Many visitors pay on arrival in cash or card.' },
  { title: 'Required docs', body: 'Passport, return ticket, proof of accommodation, yellow fever certificate if required.' },
  { title: 'Duty-free essentials', body: 'Liquids, tobacco, and personal allowances are available at landside duty free.' },
];

export function CustomsHelper() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Customs helper</p>
        <h3 className="mt-2 text-xl font-black text-ink">Airport essentials</h3>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <div key={rule.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <p className="font-bold text-ink">{rule.title}</p>
            <p className="mt-1 text-sm text-slate-600">{rule.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
