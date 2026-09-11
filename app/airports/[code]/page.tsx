import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MapPin, Plane, ShieldCheck } from 'lucide-react';
import { AddOnsSelector } from '@/components/airports/AddOnsSelector';
import { CustomsHelper } from '@/components/airports/CustomsHelper';
import { FlightBoard } from '@/components/airports/FlightBoard';
import { AIRPORTS, type AirportCode } from '@/lib/airports/data';

interface AirportPageProps {
  params: {
    code: string;
  };
}

export function generateStaticParams() {
  return Object.keys(AIRPORTS).map((code) => ({ code: code.toLowerCase() }));
}

export default function AirportPage({ params }: AirportPageProps) {
  const code = params.code.toUpperCase();
  const airport = AIRPORTS[code as AirportCode];

  if (!airport) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm"
          >
            <ArrowRight size={16} className="rotate-180" /> Back to home
          </Link>
          <Link
            href={`/book?airport=${airport.code}`}
            className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(255,122,26,0.24)]"
          >
            Book an airport ride <ArrowRight size={16} />
          </Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-[36px] bg-ink px-6 py-10 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:px-10 lg:px-14 lg:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Plane size={14} /> {airport.code} airport guide
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">{airport.name}</h1>
            <p className="mt-4 flex items-center gap-2 text-lg text-white/70">
              <MapPin size={18} className="text-sunset" /> {airport.city} · {airport.terminal}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/75">
              Arrive with a clear plan for pickup, customs, connectivity, and your next Tanzanian journey.
            </p>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Terminal</p>
              <p className="mt-2 font-bold">{airport.terminal}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Pickup parking</p>
              <p className="mt-2 font-bold">{airport.parking}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">Arrival capacity</p>
              <p className="mt-2 font-bold">{airport.arrivalCapacity}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <FlightBoard />
            <div className="rounded-[28px] border border-sage/10 bg-white p-5 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Terminal map</p>
              <h2 className="mt-2 text-xl font-black text-ink">Know where to go next</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {airport.terminalAreas.map((area) => (
                  <div key={area.name} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="font-bold text-ink">{area.name}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <CustomsHelper />
            <AddOnsSelector />
          </div>
        </section>

        <section className="mt-8 grid gap-6 rounded-[28px] border border-sage/10 bg-white p-6 shadow-sm lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Transfer briefing</p>
            <h2 className="mt-2 text-2xl font-black text-ink">{airport.transferNote}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {airport.services.map((service) => (
                <span key={service} className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-2 text-xs font-bold text-sage">
                  <Check size={14} /> {service}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-3xl bg-sage/10 p-4 text-sage">
            <ShieldCheck size={24} />
            <p className="max-w-[14rem] text-sm font-semibold">Verified drivers and live arrival coordination.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
