export type AnalyticsValue = string | number | boolean | null;

export interface AnalyticsProperties {
  [key: string]: AnalyticsValue | AnalyticsValue[];
}

export interface AnalyticsEvent {
  event: string;
  distinctId: string;
  properties?: AnalyticsProperties;
}

export interface AnalyticsResult {
  accepted: boolean;
  provider: 'mixpanel' | 'development-console';
}

const MIXPANEL_TRACK_URL = 'https://api.mixpanel.com/track';

function getMixpanelToken(): string | undefined {
  return process.env.MIXPANEL_PROJECT_TOKEN || process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;
}

export async function trackEvent({ event, distinctId, properties = {} }: AnalyticsEvent): Promise<AnalyticsResult> {
  if (!event.trim()) {
    throw new Error('Analytics event name is required.');
  }

  if (!distinctId.trim()) {
    throw new Error('Analytics distinct ID is required.');
  }

  const token = getMixpanelToken();
  const payload = {
    event,
    properties: {
      token,
      distinct_id: distinctId,
      ...properties,
    },
  };

  if (!token) {
    console.info('[Analytics] Development event', payload);
    return { accepted: true, provider: 'development-console' };
  }

  const response = await fetch(MIXPANEL_TRACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Mixpanel returned HTTP ${response.status}.`);
  }

  const result = await response.json().catch(() => null) as { status?: number } | null;
  if (result?.status === 0) {
    throw new Error('Mixpanel rejected the analytics event.');
  }

  return { accepted: true, provider: 'mixpanel' };
}

export function identifyUser(distinctId: string, properties: AnalyticsProperties = {}): AnalyticsEvent {
  return {
    event: '$identify',
    distinctId,
    properties,
  };
}

export function buildPageViewEvent(distinctId: string, path: string): AnalyticsEvent {
  return {
    event: 'Page Viewed',
    distinctId,
    properties: { path },
  };
}
