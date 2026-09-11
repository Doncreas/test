import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Clock3, MapPin, Users } from 'lucide-react';
import { CalendarHeatmap } from '@/components/safari/CalendarHeatmap';
import { GuideProfile, type GuideProfileData } from '@/components/safari/GuideProfile';
import { getSafariPackage, SAFARI_PACKAGES } from '@/lib/safari/pricing';

interface SafariPackagePageProps {
  params: {
    packageId: string;
  };
}

const guide: GuideProfileData = {
  id: 'guide-juma-hassan',
  name: 'Juma Hassan',
  location: 'Arusha, Tanzania',
  rating: 4.9,
  reviewCount: 186,
  yearsExperience: 12,
  languages: ['English', 'Swahili', 'French'],
  specialties: ['Big cats', 'Birding', 'Family safaris'],
  bio: 'Juma is a patient naturalist and former park ranger who loves turning a game drive into a story your whole group can remember. He plans around animal behavior, not a rigid clock.',
};

export function generateStaticParams() {
  return SAFARI_PACKAGES.map((safariPackage) => ({ packageId: safariPackage.id }));
}

export default function SafariPackagePage({ params }: SafariPackagePageProps) {
  const safariPackage = getSafariPackage(params.packageId);

  if (!safariPackage) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/safari" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
            <ArrowLeft size={16} /> All Safari packages
          </Link>
          <Link href={`/safari/builder?packageId=${safariPackage.id}`} className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(255,122,26,0.24)]">
            Build this safari <ArrowRight size={16} />
          </Link>
        </div>

        <section className="mt-8 overflow-hidden rounded-[36px] bg-ink text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)]">
          <div className="relative min-h-[320px] bg-gradient-to-br from-sage via-[#1f6650] to-ink px-6 py-12 sm:px-10 lg:px-16 lg:py-16">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.2)_45%,transparent_46%),linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.12)_50%,transparent_51%)]" />
            <div className="relative max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">TANZANIA SAFARI COLLECTION</p>
              <h1 className="mt-5 text-5xl font-black tracking-tight sm:text-7xl">{safariPackage.name}</h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-white/75">{safariPackage.tagline}</p>
              <div className="mt-7 flex flex-wrap gap-2 text-sm font-bold">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Clock3 size={16} /> {safariPackage.durationDays} days</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Users size={16} /> {safariPackage.groupMinimum}-{safariPackage.maxGroupSize} guests</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><MapPin size={16} /> {safariPackage.destinations[0]} to {safariPackage.destinations.at(-1)}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">The route</p>
              <h2 className="mt-2 text-2xl font-black text-ink">A considered journey through the north</h2>
              <div className="mt-6 space-y-3">
                {safariPackage.destinations.map((destination, index) => (
                  <div key={destination} className="flex items-center gap-3 rounded-2xl bg-cream p-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sage text-sm font-black text-white">{index + 1}</span>
                    <span className="font-bold text-ink">{destination}</span>
                    {index < safariPackage.destinations.length - 1 && <span className="ml-auto text-xs font-semibold text-ink/45">Next stop</span>}
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Included highlights</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {safariPackage.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-2 rounded-2xl border border-sage/10 bg-cream p-4 text-sm font-semibold text-ink/75">
                    <Check size={17} className="mt-0.5 flex-shrink-0 text-sunset" /> {highlight}
                  </div>
                ))}
              </div>
            </section>

            <CalendarHeatmap />
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-sage/10 bg-ink p-6 text-white shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Starting from</p>
              <p className="mt-3 text-4xl font-black">TSh {safariPackage.basePricePerPerson.toLocaleString()}</p>
              <p className="mt-1 text-sm text-white/60">per person before seasonal adjustment</p>
              <Link href={`/safari/builder?packageId=${safariPackage.id}`} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-[#e96d13]">
                Check dates and price <ArrowRight size={16} />
              </Link>
            </section>
            <GuideProfile guide={guide} />
          </div>
        </div>
      </div>
    </main>
  );
}
