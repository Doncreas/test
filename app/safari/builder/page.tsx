'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, Users } from 'lucide-react';
import { CalendarHeatmap } from '@/components/safari/CalendarHeatmap';
import { PackageCard } from '@/components/safari/PackageCard';
import { SAFARI_PACKAGES, type SafariPackage, type SafariPriceQuote } from '@/lib/safari/pricing';

function formatTzs(value: number) {
  return `TSh ${value.toLocaleString()}`;
}

export default function SafariBuilderPage() {
  const [selectedPackageId, setSelectedPackageId] = useState(SAFARI_PACKAGES[0].id);
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [travelers, setTravelers] = useState(2);
  const [quote, setQuote] = useState<SafariPriceQuote | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [booking, setBooking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const selectedPackage = useMemo(
    () => SAFARI_PACKAGES.find((safariPackage) => safariPackage.id === selectedPackageId) || SAFARI_PACKAGES[0],
    [selectedPackageId],
  );

  useEffect(() => {
    const controller = new AbortController();

    async function loadQuote() {
      setLoadingQuote(true);
      setMessage(null);
      try {
        const params = new URLSearchParams({
          packageId: selectedPackageId,
          startDate,
          travelers: String(travelers),
        });
        const response = await fetch(`/api/safari/packages?${params.toString()}`, { signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Unable to calculate Safari quote.');
        setQuote(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setQuote(null);
          setMessage(error instanceof Error ? error.message : 'Unable to calculate Safari quote.');
        }
      } finally {
        if (!controller.signal.aborted) setLoadingQuote(false);
      }
    }

    loadQuote();
    return () => controller.abort();
  }, [selectedPackageId, startDate, travelers]);

  async function handleBooking() {
    setBooking(true);
    setMessage(null);
    try {
      const response = await fetch('/api/safari/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageId: selectedPackageId, startDate, travelers }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to create Safari booking.');
      window.location.href = `/safari/booking/${data.booking.id}`;
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to create Safari booking.');
    } finally {
      setBooking(false);
    }
  }

  const handlePackageSelect = (safariPackage: SafariPackage) => {
    setSelectedPackageId(safariPackage.id);
    setTravelers(Math.max(2, safariPackage.groupMinimum));
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link href="/safari" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
            <ArrowLeft size={16} /> Safari packages
          </Link>
          <span className="rounded-full bg-sage/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sage">Build your trip</span>
        </div>

        <header className="mt-8 max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Safari builder</p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-ink sm:text-6xl">Your wild week, your way.</h1>
          <p className="mt-4 text-lg leading-8 text-ink/65">Choose a route, set your dates, and get a transparent seasonal estimate before you request your guide.</p>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <section>
              <div className="flex items-center gap-2 text-sage"><Check size={18} /><h2 className="font-black">1. Choose your route</h2></div>
              <div className="mt-4 grid gap-5 md:grid-cols-2">
                {SAFARI_PACKAGES.map((safariPackage) => (
                  <PackageCard key={safariPackage.id} safariPackage={safariPackage} selected={safariPackage.id === selectedPackageId} onSelect={handlePackageSelect} />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 text-sage"><CalendarDays size={18} /><h2 className="font-black">2. Choose your dates</h2></div>
              <div className="mt-4"><CalendarHeatmap value={startDate} onChange={setStartDate} /></div>
            </section>
          </div>

          <aside className="h-fit rounded-3xl bg-ink p-6 text-white shadow-[0_24px_70px_rgba(10,31,28,0.16)] lg:sticky lg:top-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Your safari estimate</p>
            <h2 className="mt-3 text-3xl font-black">{selectedPackage.name}</h2>
            <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-white/10 p-4">
              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <span className="flex items-center gap-2"><CalendarDays size={16} /> Start date</span>
                <span className="font-bold text-white">{startDate}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <span className="flex items-center gap-2"><Users size={16} /> Travelers</span>
                <input
                  type="number"
                  min={selectedPackage.groupMinimum}
                  max={selectedPackage.maxGroupSize}
                  value={travelers}
                  onChange={(event) => setTravelers(Number(event.target.value))}
                  className="w-20 rounded-xl border border-white/15 bg-white/10 px-2 py-1 text-right font-bold text-white outline-none"
                />
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-white/70">
                <span>Season</span>
                <span className="font-bold capitalize text-gold">{quote?.seasonLabel || 'Calculating...'}</span>
              </div>
              <div className="border-t border-white/10 pt-4">
                <p className="text-sm text-white/60">Estimated total</p>
                <p className="mt-1 text-4xl font-black">{loadingQuote ? '...' : quote ? formatTzs(quote.totalPrice) : 'Unavailable'}</p>
                {quote?.savings ? <p className="mt-1 text-sm font-bold text-emerald-300">You save {formatTzs(quote.savings)} in low season</p> : null}
              </div>
            </div>
            <button
              type="button"
              disabled={booking || !quote}
              onClick={handleBooking}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white transition hover:bg-[#e96d13] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {booking ? 'Requesting...' : 'Request this safari'} <ArrowRight size={16} />
            </button>
            {message ? <p className="mt-4 rounded-2xl bg-red-400/15 p-3 text-sm leading-6 text-red-100">{message}</p> : null}
            <p className="mt-4 text-xs leading-5 text-white/50">Your request is held for consultation. Final availability is confirmed by our safari team.</p>
          </aside>
        </div>
      </div>
    </main>
  );
}
