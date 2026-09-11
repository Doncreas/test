import Link from 'next/link';
import { ArrowLeft, ArrowRight, Camera, Check, Gift, Megaphone, ShieldCheck } from 'lucide-react';
import { EmbedWidget } from '@/components/share/EmbedWidget';
import { ReferralCard } from '@/components/share/ReferralCard';

export default function InfluencerPartnerPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to TANZALIFT
        </Link>

        <section className="mt-8 grid gap-8 rounded-[36px] bg-gradient-to-br from-sunset via-[#d95f18] to-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] lg:grid-cols-[1fr_0.9fr] lg:p-14">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Megaphone size={14} /> Creator partner program
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">Turn travel stories into easier arrivals.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/75">Give your audience a trusted way to move through Tanzania, while your referral link tracks the value you create.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/85">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Gift size={16} className="text-gold" /> Earn rewards</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck size={16} className="text-gold" /> Trusted service</span>
            </div>
          </div>
          <EmbedWidget source="influencer-partner" title="Share a Tanzania transfer" defaultDropoff="Your audience's destination" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <ReferralCard displayName="Creator Partner" userId="creator-partner" referralCount={4} />
          <div className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 text-sage"><Camera size={20} /><p className="text-[10px] font-bold uppercase tracking-[0.22em]">Campaign kit</p></div>
            <h2 className="mt-3 text-3xl font-black text-ink">Make the link feel like part of your trip.</h2>
            <div className="mt-5 space-y-3">
              {['Personal referral link and QR code', 'Trackable airport transfer bookings', 'Creator-friendly copy and travel tips'].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-2xl bg-cream p-4 text-sm font-bold text-ink"><Check size={17} className="mt-0.5 flex-shrink-0 text-sunset" /> {item}</div>
              ))}
            </div>
            <a href="mailto:partners@tanzalift.tz" className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-bold text-white hover:bg-sage/90">Request campaign support <ArrowRight size={16} /></a>
          </div>
        </section>
      </div>
    </main>
  );
}
