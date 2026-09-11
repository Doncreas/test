'use client';

import { sampleFlights } from '@/lib/airports/data';

export function FlightBoard() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Live flight board</p>
          <h3 className="mt-2 text-xl font-black text-ink">Arrivals & departures</h3>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Live</span>
      </div>

      <div className="space-y-3">
        {sampleFlights.map((flight) => (
          <div key={flight.flight} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div>
              <p className="font-black text-ink">{flight.flight}</p>
              <p className="text-xs text-slate-500">{flight.from} → {flight.to}</p>
            </div>
            <div className="text-right">
              <p className="font-semibold text-ink">{flight.status}</p>
              <p className="text-xs text-slate-500">ETA {flight.eta}</p>
            </div>
            {flight.delay > 0 && (
              <span className="rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-700">+{flight.delay}m</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
