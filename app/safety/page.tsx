import { AlertTriangle, CarFront, CheckCircle2, Clock3, MapPinned, ShieldCheck, Siren, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SOSButton } from '@/components/safety/SOSButton';
import { ShareTripModal } from '@/components/safety/ShareTripModal';
import { TrustedContacts } from '@/components/safety/TrustedContacts';
import { RideCheckAlert } from '@/components/safety/RideCheckAlert';
import { IncidentReport } from '@/components/safety/IncidentReport';
import { getInsuranceCoverage } from '@/lib/safety/insurance';

export const dynamic = 'force-dynamic';

const coverage = getInsuranceCoverage();

export default function SafetyCenterPage() {
  return (
    <main className="min-h-screen bg-cream px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Safety center</p>
            <h1 className="mt-2 text-4xl font-black text-ink">Your protection, always on</h1>
          </div>
          <Button type="button" variant="secondary" className="gap-2">
            <ShieldCheck size={16} />
            Verified safe ride
          </Button>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3 text-sage">
              <Siren size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Emergency</span>
            </div>
            <p className="text-3xl font-black text-ink">112</p>
            <p className="mt-2 text-sm text-slate-600">Police, tourist police, and emergency contacts.</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3 text-sage">
              <MapPinned size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Route guard</span>
            </div>
            <p className="text-3xl font-black text-ink">500m</p>
            <p className="mt-2 text-sm text-slate-600">Deviation alert threshold for ride check monitoring.</p>
          </div>
          <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3 text-sage">
              <CheckCircle2 size={20} />
              <span className="text-sm font-semibold uppercase tracking-[0.18em]">Insurance</span>
            </div>
            <p className="text-3xl font-black text-ink">TSh {coverage.coverageTZS.toLocaleString()}</p>
            <p className="mt-2 text-sm text-slate-600">Coverage included on every verified ride.</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <SOSButton />
            <ShareTripModal />
            <RideCheckAlert />
            <IncidentReport />
          </div>

          <div className="space-y-8">
            <TrustedContacts />

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-sage">
                <CarFront size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Pre-ride safety</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-600" /> Driver photo and plate displayed on lock screen.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-600" /> Shared with a trusted contact by default unless deactivated.</li>
                <li className="flex items-start gap-2"><CheckCircle2 size={16} className="mt-0.5 text-emerald-600" /> Live ride link expires at drop-off.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-sage">
                <Clock3 size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Driver safety</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 text-amber-600" /> Fatigue detection auto-logout after 8 hours continuous driving.</li>
                <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 text-amber-600" /> Speed warnings above 80 km/h on highways and 50 km/h in Dar es Salaam.</li>
                <li className="flex items-start gap-2"><AlertTriangle size={16} className="mt-0.5 text-amber-600" /> Harsh braking/cornering events flagged and reported.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3 text-sage">
                <Users size={18} />
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Insurance</p>
              </div>
              <div className="mt-5 space-y-3 text-sm text-slate-700">
                <p><span className="font-semibold text-ink">Provider:</span> {coverage.provider}</p>
                <p><span className="font-semibold text-ink">Coverage:</span> TSh {coverage.coverageTZS.toLocaleString()}</p>
                <p><span className="font-semibold text-ink">Claims support:</span> {coverage.claimsSupport}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
