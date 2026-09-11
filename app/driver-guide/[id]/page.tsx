import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Compass, ShieldCheck } from 'lucide-react';
import { GuideProfile, type GuideProfileData } from '@/components/safari/GuideProfile';

interface DriverGuidePageProps {
  params: {
    id: string;
  };
}

const guides: Record<string, GuideProfileData> = {
  'guide-juma-hassan': {
    id: 'guide-juma-hassan',
    name: 'Juma Hassan',
    location: 'Arusha, Tanzania',
    rating: 4.9,
    reviewCount: 186,
    yearsExperience: 12,
    languages: ['English', 'Swahili', 'French'],
    specialties: ['Big cats', 'Birding', 'Family safaris'],
    bio: 'Juma is a patient naturalist and former park ranger who plans around animal behavior, changing light, and the rhythm of each group.',
  },
};

export default function DriverGuidePage({ params }: DriverGuidePageProps) {
  const guide = guides[params.id] || guides['guide-juma-hassan'];

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/safari" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
            <ArrowLeft size={16} /> Safari collection
          </Link>
          <Link href="/safari/builder" className="inline-flex items-center gap-2 rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white shadow-[0_18px_40px_rgba(255,122,26,0.24)]">
            Build a safari <ArrowRight size={16} />
          </Link>
        </div>

        <section className="mt-8 rounded-[36px] bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:p-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Compass size={14} /> Meet your guide
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">A guide who reads the landscape.</h1>
            <p className="mt-5 text-lg leading-8 text-white/70">Every safari is better with local knowledge, patient observation, and someone who knows when to slow down.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck size={16} className="text-gold" /> Verified guide</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><CalendarDays size={16} className="text-sunset" /> Available for consultation</span>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
          <GuideProfile guide={guide} />
          <aside className="h-fit rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Guide approach</p>
            <h2 className="mt-2 text-2xl font-black text-ink">Curious, calm, local.</h2>
            <div className="mt-5 space-y-3">
              {['Wildlife-first route planning', 'Clear daily briefings', 'Flexible pace for your group'].map((item) => (
                <div key={item} className="rounded-2xl bg-cream p-4 text-sm font-bold text-ink">{item}</div>
              ))}
            </div>
            <Link href="/safari/builder" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-bold text-white hover:bg-sage/90">
              Choose a safari <ArrowRight size={16} />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
