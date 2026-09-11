'use client';

import Link from 'next/link';
import { ArrowRight, CalendarDays, Check, Users } from 'lucide-react';
import type { SafariPackage } from '@/lib/safari/pricing';

interface PackageCardProps {
  safariPackage: SafariPackage;
  selected?: boolean;
  onSelect?: (safariPackage: SafariPackage) => void;
}

export function PackageCard({ safariPackage, selected = false, onSelect }: PackageCardProps) {
  const content = (
    <article
      className={`group overflow-hidden rounded-3xl border bg-white shadow-[0_18px_50px_rgba(10,31,28,0.08)] transition-all ${
        selected
          ? 'border-sunset ring-2 ring-sunset/20'
          : 'border-sage/10 hover:-translate-y-1 hover:border-sage/30'
      }`}
    >
      <div className="relative h-44 overflow-hidden bg-gradient-to-br from-sage via-[#1f6650] to-ink">
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.22)_45%,transparent_46%),linear-gradient(45deg,transparent_0%,rgba(255,255,255,0.1)_50%,transparent_51%)]" />
        <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold">TANZANIA SAFARI</p>
            <h2 className="mt-1 text-2xl font-black">{safariPackage.name}</h2>
          </div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">{safariPackage.durationDays} days</span>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm leading-6 text-ink/65">{safariPackage.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-sage">
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-2">
            <CalendarDays size={14} /> {safariPackage.durationDays} days
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-2">
            <Users size={14} /> {safariPackage.groupMinimum}-{safariPackage.maxGroupSize} guests
          </span>
        </div>

        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/45">Route</p>
        <p className="mt-2 text-sm font-semibold text-ink">{safariPackage.destinations.join(' · ')}</p>

        <ul className="mt-4 space-y-2">
          {safariPackage.highlights.slice(0, 3).map((highlight) => (
            <li key={highlight} className="flex items-start gap-2 text-sm text-ink/70">
              <Check size={16} className="mt-0.5 flex-shrink-0 text-sunset" />
              {highlight}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between border-t border-sage/10 pt-4">
          <div>
            <p className="text-xs text-ink/50">From</p>
            <p className="text-xl font-black text-sage">TSh {safariPackage.basePricePerPerson.toLocaleString()}</p>
            <p className="text-xs text-ink/50">per person</p>
          </div>
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(safariPackage)}
              className="inline-flex items-center gap-2 rounded-full bg-sunset px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#e96d13]"
            >
              {selected ? 'Selected' : 'Choose'} <ArrowRight size={16} />
            </button>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-sage px-4 py-2.5 text-sm font-bold text-white">
              View trip <ArrowRight size={16} />
            </span>
          )}
        </div>
      </div>
    </article>
  );

  return onSelect ? content : <Link href={`/safari/${safariPackage.id}`}>{content}</Link>;
}
