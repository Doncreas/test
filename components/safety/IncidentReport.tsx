'use client';

import { useState } from 'react';
import { Camera, ShieldCheck } from 'lucide-react';

export function IncidentReport() {
  const [kind, setKind] = useState('unsafe-driver-behavior');
  const [description, setDescription] = useState('');

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Incident report</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Report an issue</h3>
        </div>
        <div className="rounded-full bg-red-100 p-3 text-red-600">
          <Camera size={18} />
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Type
          <select
            value={kind}
            onChange={(event) => setKind(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          >
            <option value="unsafe-driver-behavior">Unsafe driver behavior</option>
            <option value="route-deviation">Route deviation</option>
            <option value="vehicle-issue">Vehicle issue</option>
            <option value="harassment">Harassment</option>
          </select>
        </label>

        <label className="block text-sm font-medium text-slate-700">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            placeholder="Describe what happened. Include location or photos if available."
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          />
        </label>

        <label className="block rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-3 py-4 text-sm text-slate-600">
          Add photo or video evidence
          <input type="file" accept="image/*,video/*" multiple className="mt-3 block w-full text-sm" />
        </label>

        <button type="button" className="w-full rounded-2xl bg-sage px-4 py-3 text-sm font-semibold text-white">
          Submit incident
        </button>

        <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          <ShieldCheck size={16} />
          Response team available 24/7.
        </div>
      </div>
    </div>
  );
}
