'use client';

import { useEffect, useState } from 'react';

const offers = [
  { id: 'TRIP-341', pickup: 'Julius Nyerere Airport', dropoff: 'Mbezi Beach', fare: 85000, bonus: 'TSh 12,000 bonus' },
  { id: 'TRIP-342', pickup: 'Mikocheni', dropoff: 'City Centre', fare: 47000, bonus: 'TSh 4,000 bonus' },
  { id: 'TRIP-343', pickup: 'Arusha Bus Stand', dropoff: 'Sakina Hotel', fare: 115000, bonus: 'TSh 18,000 bonus' },
];

export function TripOffer() {
  const [secondsLeft, setSecondsLeft] = useState(15);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timeout = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timeout);
  }, [secondsLeft]);

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-sage">Trip offer</p>
          <h3 className="mt-2 text-xl font-black text-ink">Offer expires in {secondsLeft}s</h3>
        </div>
        <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-bold text-amber-700">{secondsLeft}s</div>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div key={offer.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-xs text-slate-500">{offer.id}</p>
                <p className="mt-1 font-bold text-ink">{offer.pickup}</p>
                <p className="text-xs text-slate-600">→ {offer.dropoff}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-ink">TSh {offer.fare.toLocaleString()}</p>
                <p className="text-xs text-emerald-700">{offer.bonus}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex gap-3">
        <button className="flex-1 rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">Accept</button>
        <button className="flex-1 rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-ink">Skip</button>
      </div>
    </div>
  );
}
