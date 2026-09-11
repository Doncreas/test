'use client';

const addons = [
  { label: 'Meet & Greet', price: 'TSh 18,000', detail: 'Driver with sign + cold water + WiFi hotspot' },
  { label: 'Porter service', price: 'TSh 2,000', detail: 'Extra luggage handling' },
  { label: 'Wheelchair support', price: 'TSh 5,000', detail: 'Assistance coordination' },
  { label: 'Child car seat', price: 'TSh 4,000', detail: 'Available on request' },
  { label: 'Tourist SIM', price: 'TSh 12,000', detail: 'Vodacom / Airtel / Halotel ready' },
  { label: 'VAT refund assist', price: 'TSh 3,000', detail: 'Customs refund location support' },
];

export function AddOnsSelector() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Airport add-ons</p>
        <h3 className="mt-2 text-xl font-black text-ink">Customize your pickup</h3>
      </div>

      <div className="space-y-3">
        {addons.map((addon) => (
          <label key={addon.label} className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div>
              <p className="font-bold text-ink">{addon.label}</p>
              <p className="text-xs text-slate-500">{addon.detail}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink">{addon.price}</span>
              <input type="checkbox" className="h-4 w-4 accent-sage" defaultChecked={addon.label === 'Meet & Greet'} />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
