export interface ScheduledOccurrence {
  id: string;
  userId: string;
  cadence: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  timeOfDay: string;
  nextOccurrence: string;
  active: boolean;
}

export function generateNextOccurrences({
  startDate,
  cadence,
  count = 12
}: {
  startDate: string;
  cadence: 'daily' | 'weekly' | 'biweekly' | 'monthly';
  count?: number;
}): string[] {
  const start = new Date(startDate);
  const occurrences: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const next = new Date(start);

    if (cadence === 'daily') {
      next.setDate(next.getDate() + i + 1);
    } else if (cadence === 'weekly') {
      next.setDate(next.getDate() + 7 * (i + 1));
    } else if (cadence === 'biweekly') {
      next.setDate(next.getDate() + 14 * (i + 1));
    } else {
      next.setMonth(next.getMonth() + (i + 1));
    }

    occurrences.push(next.toISOString());
  }

  return occurrences;
}
