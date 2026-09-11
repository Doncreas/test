import Link from 'next/link';
import { ArrowLeft, CalendarDays, CheckCircle2, MapPin, Users } from 'lucide-react';
import { GuideProfile, type GuideProfileData } from '@/components/safari/GuideProfile';

interface SafariBookingPageProps {
  params: {
    id: string;
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
  bio: 'Your guide profile will be confirmed by the safari team after availability is checked.',
};

export default function SafariBookingPage({ params }: SafariBookingPageProps) {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/safari" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to Safari
        </Link>

        <section className="mt-8 rounded-[36px] bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-400/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-emerald-200">
                <CheckCircle2 size={15} /> Request received
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">Your safari is in motion.</h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">Our safari team will confirm park availability, camp space, and your guide before final payment.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.16em] text-white/50">Booking reference</p>
              <p className="mt-1 font-mono font-bold text-gold">{params.id}</p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Safari request</p>
              <h2 className="mt-2 text-2xl font-black text-ink">We are preparing your itinerary</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-cream p-4">
                  <CalendarDays size={18} className="text-sunset" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Start date</p>
                  <p className="mt-1 font-black text-ink">Pending confirmation</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <Users size={18} className="text-sunset" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Travelers</p>
                  <p className="mt-1 font-black text-ink">Your group</p>
                </div>
                <div className="rounded-2xl bg-cream p-4">
                  <MapPin size={18} className="text-sunset" />
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-ink/50">Route</p>
                  <p className="mt-1 font-black text-ink">Northern circuit</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">What happens next</p>
              <div className="mt-5 space-y-4">
                {[
                  'A safari specialist checks park and camp availability.',
                  'Your guide and final route are matched to your group.',
                  'You receive a confirmed itinerary and secure payment link.',
                ].map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-sage text-xs font-black text-white">{index + 1}</span>
                    <p className="pt-1 text-sm leading-6 text-ink/70">{step}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <section className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Estimated total</p>
              <p className="mt-3 text-4xl font-black text-ink">Pending quote</p>
              <p className="mt-2 text-sm leading-6 text-ink/60">The final amount will reflect confirmed availability and the seasonal quote shown in the builder.</p>
              <Link href="/safari/builder" className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-sunset px-5 py-3 text-sm font-bold text-white hover:bg-[#e96d13]">Review another date</Link>
            </section>
            <GuideProfile guide={guide} compact />
          </div>
        </div>
      </div>
    </main>
  );
}
