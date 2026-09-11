'use client';

import { useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, MapPin, Users } from 'lucide-react';

interface EmbedWidgetProps {
  source?: string;
  title?: string;
  defaultPickup?: string;
  defaultDropoff?: string;
}

export function EmbedWidget({
  source = 'partner-embed',
  title = 'Book your Tanzania transfer',
  defaultPickup = 'Julius Nyerere International Airport',
  defaultDropoff = '',
}: EmbedWidgetProps) {
  const [pickup, setPickup] = useState(defaultPickup);
  const [dropoff, setDropoff] = useState(defaultDropoff);
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(2);
  const [vehicleType, setVehicleType] = useState('sedan');
  const [status, setStatus] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/embed/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pickup, dropoff, date, passengers, vehicleType, source }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to submit booking.');
      setStatus(`Request received. Reference: ${data.booking.id}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unable to submit booking.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-3xl border border-sage/10 bg-white p-5 shadow-[0_18px_50px_rgba(10,31,28,0.08)] sm:p-6">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">TANZALIFT transfers</p>
        <h2 className="mt-2 text-2xl font-black text-ink">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-ink/60">A trusted local driver, fixed details, and live trip support.</p>
      </div>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold text-ink/70">
          <span className="flex items-center gap-2"><MapPin size={16} className="text-sage" /> Pickup</span>
          <input required value={pickup} onChange={(event) => setPickup(event.target.value)} className="mt-2 w-full rounded-2xl border border-sage/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-sunset" />
        </label>
        <label className="block text-sm font-semibold text-ink/70">
          Drop-off
          <input required value={dropoff} onChange={(event) => setDropoff(event.target.value)} className="mt-2 w-full rounded-2xl border border-sage/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-sunset" placeholder="Hotel or destination" />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-ink/70">
            <span className="flex items-center gap-2"><CalendarDays size={16} className="text-sage" /> Travel date</span>
            <input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="mt-2 w-full rounded-2xl border border-sage/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-sunset" />
          </label>
          <label className="block text-sm font-semibold text-ink/70">
            <span className="flex items-center gap-2"><Users size={16} className="text-sage" /> Passengers</span>
            <input required min={1} max={12} type="number" value={passengers} onChange={(event) => setPassengers(Number(event.target.value))} className="mt-2 w-full rounded-2xl border border-sage/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-sunset" />
          </label>
        </div>
        <label className="block text-sm font-semibold text-ink/70">
          Vehicle
          <select value={vehicleType} onChange={(event) => setVehicleType(event.target.value)} className="mt-2 w-full rounded-2xl border border-sage/15 bg-cream px-4 py-3 text-sm text-ink outline-none focus:border-sunset">
            <option value="sedan">Sedan / Comfort</option>
            <option value="suv">SUV / Family</option>
            <option value="land-cruiser">Land Cruiser / Safari</option>
            <option value="van">Van / Hiace-Sprinter</option>
          </select>
        </label>
        <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e96d13] disabled:cursor-not-allowed disabled:opacity-50">
          {submitting ? 'Sending request...' : 'Request a transfer'} <ArrowRight size={16} />
        </button>
      </form>

      {status ? (
        <div className={`mt-4 flex items-start gap-2 rounded-2xl p-3 text-sm leading-6 ${status.startsWith('Request received') ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-700'}`}>
          {status.startsWith('Request received') ? <CheckCircle2 size={18} className="mt-1 flex-shrink-0" /> : null}
          <p>{status}</p>
        </div>
      ) : null}
    </section>
  );
}
