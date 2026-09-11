import Link from 'next/link';
import { ArrowLeft, ArrowRight, Building2, Check, Handshake, ShieldCheck } from 'lucide-react';
import { EmbedWidget } from '@/components/share/EmbedWidget';
import { ReferralCard } from '@/components/share/ReferralCard';

export default function HotelPartnerPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#faf6ee_0%,#fffaf2_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to TANZALIFT
        </Link>

        <section className="mt-8 grid gap-8 overflow-hidden rounded-[36px] bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] text-gold">
              <Handshake size={14} /> Hotel partner program
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight sm:text-6xl">A smoother arrival for every guest.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">Give your guests a trusted Tanzania airport transfer before they even leave the lobby. Your team gets a simple booking flow, live trip support, and clear referral rewards.</p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white/80">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><ShieldCheck size={16} className="text-gold" /> Verified drivers</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"><Building2 size={16} className="text-sunset" /> Hotel-ready embed</span>
            </div>
          </div>
          <EmbedWidget source="hotel-partner" title="Book a guest transfer" defaultDropoff="Hotel guest destination" />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          {[
            { title: 'One trusted flow', detail: 'Front desk teams can request airport pickups without switching tools.' },
            { title: 'Live support', detail: 'Guests and staff get arrival updates and a clear driver handoff.' },
            { title: 'Earn together', detail: 'Referral rewards turn every successful guest booking into partner value.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm">
              <Check size={20} className="text-sunset" />
              <h2 className="mt-4 text-xl font-black text-ink">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-ink/65">{item.detail}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ReferralCard displayName="Hotel Partner" userId="hotel-partner" referralCount={0} />
          <div className="rounded-3xl border border-sage/10 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sage">Partner onboarding</p>
            <h2 className="mt-3 text-3xl font-black text-ink">Start with your guest experience team.</h2>
            <p className="mt-4 text-sm leading-7 text-ink/65">Share your hotel name, arrival volume, and preferred pickup process. Our partnerships team will configure your embed and train your front desk.</p>
            <a href="mailto:partners@tanzalift.tz" className="mt-6 inline-flex items-center gap-2 rounded-full bg-sage px-5 py-3 text-sm font-bold text-white hover:bg-sage/90">Talk to partnerships <ArrowRight size={16} /></a>
          </div>
        </section>
      </div>
    </main>
  );
}
