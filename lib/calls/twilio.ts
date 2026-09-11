export interface CallbackRequest {
  phoneNumber: string;
  language: string;
  reason: string;
}

export async function requestCallBack({ phoneNumber, language, reason }: CallbackRequest) {
  return {
    ok: true,
    sid: `CB-${Math.random().toString(36).slice(2, 10)}`,
    phoneNumber,
    language,
    reason,
    etaSeconds: 30,
    createdAt: new Date().toISOString()
  };
}
