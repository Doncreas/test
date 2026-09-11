export interface ReminderConfig {
  beforeHours: number;
  label: string;
}

export const reminderWindows: ReminderConfig[] = [
  { beforeHours: 24, label: '24h reminder' },
  { beforeHours: 2, label: '2h reminder' },
  { beforeHours: 0.5, label: '30m reminder' },
  { beforeHours: 0.1667, label: '10m reminder' }
];

export function buildReminderSchedule(rideTimeIso: string) {
  const rideTime = new Date(rideTimeIso);

  return reminderWindows.map((reminder) => ({
    ...reminder,
    sendAt: new Date(rideTime.getTime() - reminder.beforeHours * 60 * 60 * 1000).toISOString()
  }));
}
