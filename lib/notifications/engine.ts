export type NotificationChannel = 'email' | 'sms' | 'push' | 'in-app';
export type NotificationTemplate =
  | 'booking-confirmed'
  | 'driver-arriving'
  | 'payment-receipt'
  | 'referral-reward'
  | 'safari-request-received';

export interface NotificationRecipient {
  userId?: string;
  email?: string;
  phone?: string;
  pushToken?: string;
}

export interface NotificationRequest {
  channel: NotificationChannel;
  template: NotificationTemplate;
  recipient: NotificationRecipient;
  data: Record<string, string | number>;
  idempotencyKey?: string;
}

export interface NotificationMessage {
  subject: string;
  body: string;
}

export interface NotificationResult {
  accepted: boolean;
  channel: NotificationChannel;
  provider: 'webhook' | 'development-console';
  message: NotificationMessage;
  idempotencyKey?: string;
}

const templates: Record<NotificationTemplate, NotificationMessage> = {
  'booking-confirmed': {
    subject: 'Your TANZALIFT booking is confirmed',
    body: 'Your ride {{bookingId}} is confirmed. Your driver will be ready at {{pickup}}.',
  },
  'driver-arriving': {
    subject: 'Your TANZALIFT driver is arriving',
    body: 'Your driver is {{minutes}} minutes away. Please meet at {{pickup}}.',
  },
  'payment-receipt': {
    subject: 'Your TANZALIFT payment receipt',
    body: 'Payment {{reference}} of {{amount}} {{currency}} was received successfully.',
  },
  'referral-reward': {
    subject: 'You earned a TANZALIFT referral reward',
    body: 'Your referral reward is ready: {{reward}}. Keep sharing TANZALIFT with friends.',
  },
  'safari-request-received': {
    subject: 'Your TANZALIFT Safari request was received',
    body: 'We received your {{packageName}} request for {{travelers}} travelers starting {{startDate}}.',
  },
};

function renderTemplate(template: string, data: NotificationRequest['data']): string {
  return template.replace(/{{(\w+)}}/g, (_, key: string) => String(data[key] ?? ''));
}

function getRecipientAddress(request: NotificationRequest): string | undefined {
  if (request.channel === 'email') return request.recipient.email;
  if (request.channel === 'sms') return request.recipient.phone;
  if (request.channel === 'push') return request.recipient.pushToken;
  return request.recipient.userId;
}

function validateRequest(request: NotificationRequest): void {
  if (!getRecipientAddress(request)) {
    throw new Error(`A recipient is required for the ${request.channel} notification channel.`);
  }
}

export async function sendNotification(request: NotificationRequest): Promise<NotificationResult> {
  validateRequest(request);

  const template = templates[request.template];
  const message = {
    subject: renderTemplate(template.subject, request.data),
    body: renderTemplate(template.body, request.data),
  };
  const webhookUrl = process.env.NOTIFICATIONS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.info('[Notifications] Development delivery', {
      channel: request.channel,
      recipient: getRecipientAddress(request),
      ...message,
    });

    return {
      accepted: true,
      channel: request.channel,
      provider: 'development-console',
      message,
      idempotencyKey: request.idempotencyKey,
    };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      channel: request.channel,
      recipient: request.recipient,
      message,
      idempotencyKey: request.idempotencyKey,
    }),
  });

  if (!response.ok) {
    throw new Error(`Notification provider returned HTTP ${response.status}.`);
  }

  return {
    accepted: true,
    channel: request.channel,
    provider: 'webhook',
    message,
    idempotencyKey: request.idempotencyKey,
  };
}

export function getNotificationTemplate(template: NotificationTemplate): NotificationMessage {
  return templates[template];
}
