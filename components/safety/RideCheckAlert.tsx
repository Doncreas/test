'use client';

import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface RideCheckAlertProps {
  deviated?: boolean;
}

export function RideCheckAlert({ deviated = true }: RideCheckAlertProps) {
  if (!deviated) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-emerald-800 shadow-sm">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={20} />
          <div>
            <p className="font-semibold">Ride check is stable</p>
            <p className="text-sm">Your trip remains on the expected route.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-amber-900 shadow-sm">
      <div className="flex items-start gap-3">
        <AlertCircle size={20} className="mt-0.5" />
        <div>
          <p className="font-semibold">Ride deviation detected</p>
          <p className="mt-1 text-sm">Your trip moved more than 500m off the planned route. Are you OK?</p>
          <button type="button" className="mt-3 rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white">
            Confirm I’m safe
          </button>
        </div>
      </div>
    </div>
  );
}
