'use client';

import Link from 'next/link';
import { Award, CalendarDays, MessageCircle, ShieldCheck, Star } from 'lucide-react';

export interface GuideProfileData {
  id: string;
  name: string;
  photo?: string;
  location: string;
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  languages: string[];
  specialties: string[];
  bio: string;
}

interface GuideProfileProps {
  guide: GuideProfileData;
  compact?: boolean;
}

export function GuideProfile({ guide, compact = false }: GuideProfileProps) {
  return (
    <section className={`rounded-3xl border border-sage/10 bg-white shadow-[0_18px_50px_rgba(10,31,28,0.06)] ${compact ? 'p-4' : 'p-5'}`}>
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-sage to-sunset text-2xl font-black text-white">
          {guide.photo ? <img src={guide.photo} alt={guide.name} className="h-full w-full object-cover" /> : guide.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl font-black text-ink">{guide.name}</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              <ShieldCheck size={12} /> Verified
            </span>
          </div>
          <p className="mt-1 text-sm text-ink/55">{guide.location}</p>
          <div className="mt-2 flex items-center gap-2 text-sm font-bold text-ink">
            <Star size={15} className="fill-gold text-gold" /> {guide.rating.toFixed(1)}
            <span className="font-normal text-ink/50">({guide.reviewCount} reviews)</span>
          </div>
        </div>
      </div>

      {!compact && (
        <>
          <p className="mt-5 text-sm leading-7 text-ink/70">{guide.bio}</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-cream p-3">
              <div className="flex items-center gap-2 text-sage">
                <Award size={16} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">Experience</span>
              </div>
              <p className="mt-2 font-black text-ink">{guide.yearsExperience}+ years guiding</p>
            </div>
            <div className="rounded-2xl bg-cream p-3">
              <div className="flex items-center gap-2 text-sage">
                <CalendarDays size={16} />
                <span className="text-xs font-bold uppercase tracking-[0.14em]">Languages</span>
              </div>
              <p className="mt-2 font-black text-ink">{guide.languages.join(' · ')}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {guide.specialties.map((specialty) => (
              <span key={specialty} className="rounded-full bg-sage/10 px-3 py-2 text-xs font-bold text-sage">
                {specialty}
              </span>
            ))}
          </div>
        </>
      )}

      <Link
          href={`mailto:guides@tanzalift.tz?subject=Guide%20request%20for%20${encodeURIComponent(guide.name)}`}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-4 py-3 text-sm font-bold text-white transition hover:bg-sage/90"
      >
          <MessageCircle size={16} /> Contact guide
      </Link>
    </section>
  );
}
