import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/session';
import {
  sendNotification,
  type NotificationChannel,
  type NotificationRecipient,
  type NotificationTemplate,
} from '@/lib/notifications/engine';

const channels: NotificationChannel[] = ['email', 'sms', 'push', 'in-app'];
const templates: NotificationTemplate[] = [
  'booking-confirmed',
  'driver-arriving',
  'payment-receipt',
  'referral-reward',
  'safari-request-received',
];

interface SendNotificationBody {
  channel?: NotificationChannel;
  template?: NotificationTemplate;
  recipient?: NotificationRecipient;
  data?: Record<string, string | number>;
  idempotencyKey?: string;
}

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    const body = (await request.json()) as SendNotificationBody;
    if (!body.channel || !channels.includes(body.channel)) {
      return NextResponse.json({ error: 'A valid notification channel is required.' }, { status: 400 });
    }

    if (!body.template || !templates.includes(body.template)) {
      return NextResponse.json({ error: 'A valid notification template is required.' }, { status: 400 });
    }

    if (!body.recipient || typeof body.recipient !== 'object') {
      return NextResponse.json({ error: 'A notification recipient is required.' }, { status: 400 });
    }

    const result = await sendNotification({
      channel: body.channel,
      template: body.template,
      recipient: body.recipient,
      data: body.data || {},
      idempotencyKey: body.idempotencyKey,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error('[Notifications API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unable to send notification.' },
      { status: 400 },
    );
  }
}
