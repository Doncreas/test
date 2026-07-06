"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setMessage('Signed in — welcome back!');
      } else {
        setMessage(data.error || 'Sign in failed');
      }
    } catch (err) {
      setMessage('Network error');
    } finally {
      setLoading(false);
    }
  }

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
                  <Sparkles size={16} /> Welcome back
                </div>
                <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">Sign in to your TANZALIFT account</h1>
                <p className="mt-4 max-w-md text-lg leading-8 text-white/75">Manage your bookings, track arrivals, and enjoy a faster airport ride experience.</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 text-sm leading-7 text-white/80 backdrop-blur">
                Trusted by travelers arriving in Dar es Salaam, Zanzibar, Arusha, and beyond.
              </div>
            </div>
          </div>

          <div className="p-8 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">
              <h2 className="text-3xl font-black tracking-tight text-ink">Log in</h2>
              <p className="mt-3 text-base leading-7 text-ink/70">Enter your credentials to continue your journey.</p>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-sm font-semibold text-ink/80">
                  Email address
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <Mail size={16} className="text-sage" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent text-sm outline-none" type="email" placeholder="you@example.com" />
                  </div>
                </label>

                <label className="block text-sm font-semibold text-ink/80">
                  Password
                  <div className="mt-2 flex items-center gap-3 rounded-2xl border border-sage/10 bg-cream px-4 py-3">
                    <Lock size={16} className="text-sage" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent text-sm outline-none" type="password" placeholder="••••••••" />
                    <EyeOff size={16} className="cursor-pointer text-ink/50" />
                  </div>
                </label>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-ink/70">
                    <input type="checkbox" className="rounded border-sage/20 text-sage" />
                    Remember me
                  </label>
                  <a href="#" className="font-semibold text-sage">Forgot password?</a>
                </div>

                <button disabled={loading} className="mt-2 w-full rounded-full bg-gradient-to-r from-sunset to-[#ff9447] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(255,122,26,0.3)]">
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
                {message ? <p className="mt-2 text-center text-sm text-ink/70">{message}</p> : null}
              </form>

              <div className="mt-8 border-t border-sage/10 pt-6 text-center text-sm text-ink/70">
                Don’t have an account? <Link href="/signup" className="font-semibold text-sage">Create one</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
