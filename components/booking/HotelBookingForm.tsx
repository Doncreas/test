'use client';

import { useState } from 'react';

export function HotelBookingForm() {
  const [hotelName, setHotelName] = useState('The Ridge Hotel');
  const [guestName, setGuestName] = useState('Joseph');
  const [phone, setPhone] = useState('+255 712 345 678');

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Hotel pre-booking</p>
      <div className="mt-4 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Hotel name
          <input
            value={hotelName}
            onChange={(event) => setHotelName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Guest name
          <input
            value={guestName}
            onChange={(event) => setGuestName(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Guest mobile
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          />
        </label>
        <button type="button" className="w-full rounded-2xl bg-sage px-4 py-3 text-sm font-semibold text-white">
          Send confirmation link
        </button>
      </div>
    </div>
  );
}
