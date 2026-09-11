export type MpesaPayload = {
  phone: string;
  amount: number;
  reference: string;
  description?: string;
};

export async function sendMpesaStkPush(payload: MpesaPayload) {
  const { phone, amount, reference, description } = payload;

  if (!phone || amount <= 0) {
    throw new Error('Invalid M-Pesa payload');
  }

  return {
    ok: true,
    provider: 'mpesa',
    status: 'queued',
    transactionId: `MPESA_${Date.now()}`,
    phone,
    amount,
    reference,
    description: description || 'Karibu Wallet top-up',
    message: 'STK Push initiated. Please complete payment on your phone.'
  };
}
