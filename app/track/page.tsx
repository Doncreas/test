import Link from 'next/link';
import { ArrowLeft, Plane, Radar, Clock3, CheckCircle2, Sparkles } from 'lucide-react';

export default function TrackPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fef8ef_0%,#faf6ee_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/80 px-4 py-2 text-sm font-semibold text-sage shadow-sm">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[36px] border border-sage/10 bg-white p-8 shadow-[0_24px_80px_rgba(10,31,28,0.08)] sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sage/10 bg-cream px-3 py-2 text-sm font-semibold text-sage">
              <Radar size={16} /> Live flight monitoring
            </div>
            <h1 className="mt-6 text-4xl font-black tracking-tight text-ink sm:text-5xl">Track your arrival in real time</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink/70">Enter your flight number and we’ll monitor delays, gate changes, and arrival timing so your driver is ready when you land.</p>

            <div className="mt-8 rounded-[28px] border border-sage/10 bg-cream p-5">
              <label className="block text-sm font-medium text-ink/70">
                Flight number
                <input className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none" placeholder="EK 725" />
              </label>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-ink/70">
                  Airline
                  <input className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none" placeholder="Emirates" />
                </label>
                <label className="block text-sm font-medium text-ink/70">
                  Route
                  <input className="mt-2 w-full rounded-2xl border border-sage/10 bg-white px-4 py-3 text-sm outline-none" placeholder="Dubai → DAR" />
                </label>
              </div>
              <button className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sage to-ocean px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,76,58,0.18)]">
                Track flight
              </button>
            </div>
          </div>

          <div className="rounded-[36px] border border-sage/10 bg-ink p-8 text-white shadow-[0_24px_80px_rgba(10,31,28,0.16)] sm:p-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">Arrival status</p>
                <h2 className="mt-2 text-3xl font-black">EK 725 · On time</h2>
              </div>
              <div className="rounded-full bg-emerald-500/15 p-3 text-emerald-300">
                <CheckCircle2 size={20} />
              </div>
            </div>

            <div className="mt-8 space-y-4 rounded-[24px] border border-white/10 bg-white/10 p-5">
              <div className="flex items-center justify-between text-sm text-white/80">
                <span className="flex items-center gap-2"><Plane size={16} /> Scheduled</span>
                <span className="font-semibold text-white">21:40</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span className="flex items-center gap-2"><Clock3 size={16} /> Estimated</span>
                <span className="font-semibold text-white">21:38</span>
              </div>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span className="flex items-center gap-2"><Sparkles size={16} /> Driver alert</span>
                <span className="font-semibold text-white">Ready at Gate 2</span>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-gradient-to-br from-sage/30 to-sunset/20 p-5">
              <p className="text-sm leading-7 text-white/80">Your pickup will be adjusted automatically if the aircraft lands early or late. We’ll notify your driver and keep your meet-and-greet ready.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
