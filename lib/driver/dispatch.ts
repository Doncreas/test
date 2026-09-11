export interface DriverDispatchRequest {
  driverId: string;
  riderId?: string;
  pickup: string;
  dropoff: string;
  fareTzs: number;
  waitMinutes?: number;
}

export function queueDispatch(request: DriverDispatchRequest) {
  return {
    queued: true,
    priority: request.fareTzs > 100000 ? 'high' : 'normal',
    etaMinutes: 2,
    dispatchId: `dispatch_${Date.now()}`,
    ...request,
  };
}

export function getHealthWarning(hoursDriven: number) {
  if (hoursDriven >= 10) return 'Auto-logout triggered. Please take a break.';
  if (hoursDriven >= 8) return 'Break recommended in 30 minutes.';
  return 'You are within safe operating hours.';
}
