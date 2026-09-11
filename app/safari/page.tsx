import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { CalendarHeatmap } from '@/components/safari/CalendarHeatmap';
import { PackageCard } from '@/components/safari/PackageCard';
import { SAFARI_PACKAGES } from '@/lib/safari/pricing';

export default function SafariPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(255,122,26,0.24)]">
            Book airport transfer <ArrowRight size={16} />
          </Link>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[36px] bg-ink px-6 py-12 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:px-10 lg:px-16 lg:py-16">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border-[40px] border-gold/15" />
          <div className="absolute -bottom-32 right-40 h-80 w-80 rounded-full border-[50px] border-sunset/10" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Compass size={14} /> Tanzania safari collection
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-7xl">Wild places, well planned.</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Choose a carefully paced safari package, watch the seasons, and travel with a trusted local guide who knows where the light and wildlife meet.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck size={16} className="text-gold" /> Verified guides</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Sparkles size={16} className="text-sunset" /> Seasonal pricing</span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <CalendarHeatmap />
        </section>

        <section className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Find your route</p>
              <h2 className="mt-2 text-3xl font-black text-ink">Safari packages for every kind of traveler</h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-ink/60">All packages include a private consultation, park fees, and a professional English-speaking guide.</p>
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {SAFARI_PACKAGES.map((safariPackage) => (
              <PackageCard key={safariPackage.id} safariPackage={safariPackage} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-sage/10 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Ready when you are</p>
              <h2 className="mt-2 text-2xl font-black text-ink">Build a safari around your dates.</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/65">Select a package to see the detailed route, seasonal quote, guide profile, and booking options.</p>
            </div>
            <Link href="/safari/builder" className="inline-flex items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-bold text-white hover:bg-sage/90">
              Open safari builder <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
