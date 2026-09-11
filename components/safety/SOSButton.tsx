'use client';

import { AlertTriangle, Phone, ShieldCheck } from 'lucide-react';

interface SOSButtonProps {
  onTrigger?: () => void;
}

export function SOSButton({ onTrigger }: SOSButtonProps) {
  const emergencyNumbers = [
    { label: 'TZ Police', value: '112' },
    { label: 'Tourist Police', value: '0800 222 330' },
    { label: 'Embassy', value: '+255 22 212 3456' }
  ];

  return (
    <div className="rounded-[28px] border border-red-200 bg-red-50 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-700">Emergency</p>
          <h3 className="mt-2 text-2xl font-black text-red-900">SOS</h3>
        </div>
        <button
          type="button"
          onClick={onTrigger ?? (() => undefined)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-200 transition hover:scale-105"
          aria-label="Emergency SOS"
        >
          <AlertTriangle size={26} />
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {emergencyNumbers.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-2xl bg-white px-3 py-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Phone size={16} className="text-red-600" />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <span className="text-sm font-bold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
        <ShieldCheck size={16} />
        Emergency response team is on standby.
      </div>
    </div>
  );
}
