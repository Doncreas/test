"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, CalendarDays, MapPin, Plane, UserRound, Sparkles } from 'lucide-react';

export default function BookPage() {
  const [airport, setAirport] = useState('Julius Nyerere Intl (DAR)');
  const [flight, setFlight] = useState('EK 725');
  const [pickup, setPickup] = useState('Terminal 2');
  const [dropoff, setDropoff] = useState('Serena Hotel, Masaki');
  const [passengers, setPassengers] = useState(2);
  const [luggage, setLuggage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ airport, flight, pickup, dropoff, passengers })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMessage(`Booking confirmed: ${data.booking.id} — ${data.booking.price}`);
      } else {
        setMessage(data.error || 'Booking failed');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-sage/10 bg-white p-8 shadow-[0_24px_80px_rgba(10,31,28,0.08)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-cream px-3 py-2 text-sm font-semibold text-sage">
              <Sparkles size={16} /> AI-assisted booking
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-5xl">Book your airport ride in under a minute</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">Tell us your flight, group size, and destination. We’ll confirm your driver, meet-and-greet, and fixed price instantly.</p>

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <Plane size={18} />
                  <p className="font-semibold">Arrival details</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Airport
                    <select value={airport} onChange={(e) => setAirport(e.target.value)} className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none">
                      <option>Julius Nyerere Intl (DAR)</option>
                      <option>Kilimanjaro Intl (JRO)</option>
                      <option>Abeid Karume Intl (ZNZ)</option>
                    </select>
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Flight number
                    <input value={flight} onChange={(e) => setFlight(e.target.value)} className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none" placeholder="EK 725" />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <MapPin size={18} />
                  <p className="font-semibold">Destination</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Pickup
                    <input
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      placeholder="Terminal 2"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Drop-off
                    <input
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      placeholder="Serena Hotel, Masaki"
                    />
                  </label>
                </div>
              </div>

              <div className="rounded-[24px] border border-sage/10 bg-cream p-4">
                <div className="flex items-center gap-3 text-sage">
                  <UserRound size={18} />
                  <p className="font-semibold">Travelers</p>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-sm font-medium text-ink/70">
                    Passengers
                    <input
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      type="number"
                    />
                  </label>
                  <label className="block text-sm font-medium text-ink/70">
                    Luggage
                    <input
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none"
                      type="number"
                    />
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <button disabled={loading} className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)]">
                  {loading ? 'Booking…' : 'Confirm my ride'}
                </button>
                {message ? <p className="mt-3 text-sm text-ink/70">{message}</p> : null}
              </div>
            </form>
          </div>

          <div className="rounded-[36px] border border-sage/10 bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:p-10">
            <div className="flex items-center gap-3 text-sage">
              <CalendarDays size={18} />
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Your trip summary</p>
            </div>
            <h2 className="mt-5 text-3xl font-black">Premium meet & greet ready</h2>
            <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Driver</span>
                <span className="font-semibold text-white">Joseph Mwamba</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Vehicle</span>
                <span className="font-semibold text-white">Toyota Land Cruiser V8</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Price</span>
                <span className="font-semibold text-white">35,000 TZS</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>Arrival wait</span>
                <span className="font-semibold text-white">Up to 60 mins</span>
              </div>
            </div>
            <div className="mt-8 rounded-[24px] border border-emerald-400/20 bg-emerald-500/10 p-5 text-sm leading-7 text-emerald-100">
              Your booking is protected with live flight tracking, verified drivers, and free cancellation up to one hour before pickup.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
