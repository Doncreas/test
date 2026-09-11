export interface RouteDeviationCheck {
  deviated: boolean;
  distanceMeters: number;
  thresholdMeters: number;
  safe: boolean;
}

export function checkRouteDeviation(
  actualLat: number,
  actualLng: number,
  routeLat: number,
  routeLng: number,
  thresholdMeters = 500
): RouteDeviationCheck {
  const deltaLat = actualLat - routeLat;
  const deltaLng = actualLng - routeLng;
  const distanceMeters = Math.sqrt(deltaLat * deltaLat + deltaLng * deltaLng) * 111_000;

  return {
    deviated: distanceMeters > thresholdMeters,
    distanceMeters: Number(distanceMeters.toFixed(1)),
    thresholdMeters,
    safe: distanceMeters <= thresholdMeters
  };
}
