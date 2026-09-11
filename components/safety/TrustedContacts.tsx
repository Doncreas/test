'use client';

import { Phone, ShieldAlert } from 'lucide-react';

const contacts = [
  { name: 'Asha', phone: '+255 712 555 012', relationship: 'Family', priority: 1 },
  { name: 'Musa', phone: '+255 655 111 099', relationship: 'Friend', priority: 2 },
  { name: 'Grace', phone: '+255 788 222 045', relationship: 'Emergency', priority: 3 }
];

export function TrustedContacts() {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sage">Trusted contacts</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Your safety circle</h3>
        </div>
        <div className="rounded-full bg-sage/10 p-3 text-sage">
          <ShieldAlert size={18} />
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {contacts.map((contact) => (
          <div key={contact.phone} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3">
            <div>
              <p className="font-semibold text-slate-900">{contact.name}</p>
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500">{contact.relationship}</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Phone size={14} className="text-sage" />
              <span>{contact.phone}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
