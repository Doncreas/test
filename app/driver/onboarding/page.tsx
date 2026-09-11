const steps = [
  'Phone + OTP',
  'ID + selfie liveness',
  'Vehicle registration + insurance',
  'PSPF background check',
  'Training (2 hours)',
  'Activation',
];

export default function DriverOnboardingPage() {
  return (
    <main className="mx-auto max-w-md px-4 py-6">
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-sage">Driver onboarding</p>
        <h1 className="mt-2 text-3xl font-black text-ink">Become a Karibu driver</h1>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center gap-3 rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sage text-sm font-black text-white">
              {index + 1}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Step {index + 1}</p>
              <p className="font-bold text-ink">{step}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">Start KYC</button>
    </main>
  );
}
