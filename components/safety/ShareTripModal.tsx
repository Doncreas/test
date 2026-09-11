'use client';

import { useMemo, useState } from 'react';
import { Copy, MessageCircle, Send, Share2, UserPlus } from 'lucide-react';

interface ShareTripModalProps {
  tripLink?: string;
}

export function ShareTripModal({ tripLink = 'https://karibu.tz/track/public/demo-abc123' }: ShareTripModalProps) {
  const [contacts, setContacts] = useState<string[]>(['Asha', 'Musa', 'Grace']);
  const [message, setMessage] = useState('I am sharing my live ride status. Track me here:');

  const shareText = useMemo(
    () => `${message} ${tripLink}`,
    [message, tripLink]
  );

  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Sharing</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Share trip</h3>
        </div>
        <button type="button" className="rounded-full bg-sage/10 p-3 text-sage">
          <Share2 size={18} />
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block text-sm font-medium text-slate-700">
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            rows={3}
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 outline-none focus:border-sage"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {contacts.map((contact) => (
            <span key={contact} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-sm font-medium text-slate-700">
              {contact}
            </span>
          ))}
          <button type="button" className="inline-flex items-center gap-2 rounded-full border border-dashed border-sage/50 bg-sage/5 px-3 py-1 text-sm font-medium text-sage">
            <UserPlus size={14} />
            Add contact
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Tracking link</p>
          <p className="mt-2 break-all text-sm font-medium text-slate-700">{tripLink}</p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3">
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white">
            <Send size={15} />
            WhatsApp
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            <MessageCircle size={15} />
            SMS
          </button>
          <button type="button" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
            <Copy size={15} />
            Copy link
          </button>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Live link expires automatically at drop-off.
        </div>
      </div>
    </div>
  );
}
