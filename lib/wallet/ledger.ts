export type LedgerEntry = {
  userId: string;
  type: 'topup' | 'transfer' | 'payment' | 'refund' | 'vault_deposit' | 'vault_withdraw';
  amountTzs: number;
  balanceAfter: number;
  reference: string;
  createdAt: string;
};

export function applyLedgerEntry(existingBalance: number, entry: LedgerEntry) {
  const delta = entry.type === 'topup' || entry.type === 'transfer' || entry.type === 'refund'
    ? entry.amountTzs
    : -entry.amountTzs;

  return Math.max(0, existingBalance + delta);
}

export function createLedgerEntry(
  userId: string,
  type: LedgerEntry['type'],
  amountTzs: number,
  balanceAfter: number,
  reference: string
): LedgerEntry {
  return {
    userId,
    type,
    amountTzs,
    balanceAfter,
    reference,
    createdAt: new Date().toISOString()
  };
}

export function buildSplitSummary(amountTzs: number, participants: number) {
  const equal = Math.floor(amountTzs / participants);
  const remainder = amountTzs % participants;

  return {
    equalShare: equal,
    remainder,
    perParticipant: Array.from({ length: participants }, (_, index) => ({
      participant: index + 1,
      amount: index === 0 ? equal + remainder : equal
    }))
  };
}
