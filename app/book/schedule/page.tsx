'use client';

import { useState } from 'react';
import { CalendarClock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DateTimePicker } from '@/components/booking/DateTimePicker';
import { HotelBookingForm } from '@/components/booking/HotelBookingForm';

export default function ScheduleBookingPage() {
  const [pickupTime, setPickupTime] = useState('2026-08-20T08:30');

  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Scheduled rides</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Book for later</h1>
          </div>
          <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
            Up to 90 days ahead
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-[32px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <DateTimePicker value={pickupTime} onChange={setPickupTime} label="Pickup date and time" />

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sage">
                <CalendarClock size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Reminder schedule</p>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
                <div className="rounded-2xl bg-white px-3 py-2">24h before</div>
                <div className="rounded-2xl bg-white px-3 py-2">2h before</div>
                <div className="rounded-2xl bg-white px-3 py-2">30m before</div>
                <div className="rounded-2xl bg-white px-3 py-2">10m before</div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sage">
                <ShieldCheck size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Auto-confirmation</p>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                The trip is auto-confirmed once a driver accepts, and flight-delay rescheduling is enabled for delays greater than 2 hours.
              </p>
            </div>

            <Button type="button" className="w-full justify-center">Schedule ride</Button>
          </div>

          <HotelBookingForm />
        </div>
      </div>
    </main>
  );
}
