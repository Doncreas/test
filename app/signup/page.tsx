import Link from 'next/link';
import { ArrowLeft, Lock, Mail, Phone, Sparkles, UserRound } from 'lucide-react';

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(255,122,26,0.2),_transparent_30%),linear-gradient(135deg,#fef8ef_0%,#faf6ee_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-full border border-sage/15 bg-white/90 px-4 py-2 text-sm font-semibold text-sage shadow-sm backdrop-blur">
          <ArrowLeft size={16} /> Back to home
        </Link>

        <section className="grid overflow-hidden rounded-[40px] border border-sage/10 bg-white shadow-[0_24px_80px_rgba(10,31,28,0.12)] lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative min-h-[320px] bg-ink p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,122,26,0.25),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,168,197,0.25),_transparent_35%)]" />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-white/90">
                  <Sparkles size={16} /> Create your account
                </div>
                <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">Join TANZALIFT in minutes</h1>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/75">Save your details, book rides faster, and track every trip with a secure account.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 text-sm leading-7 text-white/80 backdrop-blur">
                Premium airport transfers across Tanzania with real-time support and seamless booking.
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-3xl font-black tracking-tight text-ink">Create account</h2>
              <p className="mt-3 text-base leading-7 text-ink/70">Start with your details and enjoy a smoother travel experience.</p>

              <form className="mt-8 space-y-4">
                <label className="block text-sm font-semibold text-ink/80">
                  Full name
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <UserRound size={16} className="text-sage" />
                    <input className="w-full bg-transparent text-sm outline-none" type="text" placeholder="Asha Mengi" />
                  </div>
                </label>

                <label className="block text-sm font-semibold text-ink/80">
                  Email address
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <Mail size={16} className="text-sage" />
                    <input className="w-full bg-transparent text-sm outline-none" type="email" placeholder="you@example.com" />
                  </div>
                </label>

                <label className="block text-sm font-semibold text-ink/80">
                  Phone number
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <Phone size={16} className="text-sage" />
                    <input className="w-full bg-transparent text-sm outline-none" type="tel" placeholder="+255 712 345 678" />
                  </div>
                </label>

                <label className="block text-sm font-semibold text-ink/80">
                  Password
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <Lock size={16} className="text-sage" />
                    <input className="w-full bg-transparent text-sm outline-none" type="password" placeholder="Create a strong password" />
                  </div>
                </label>

                <button className="mt-2 w-full rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)]">
                  Create account
                </button>
              </form>

              <div className="mt-8 border-t border-sage/10 pt-6 text-center text-sm text-ink/70">
                Already have an account? <Link href="/login" className="font-semibold text-sage">Sign in</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
