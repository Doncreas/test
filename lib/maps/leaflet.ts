export const createDriverMarkerHtml = (
  heading: number,
  vehicleColor = '#0F4C3A'
): string => `
  <div class="tracking-driver-marker" style="transform: rotate(${heading}deg)">
    <svg width="48" height="48" viewBox="0 0 48 48" aria-label="Driver location">
      <circle cx="24" cy="24" r="21" fill="${vehicleColor}" opacity="0.2" class="tracking-driver-glow" />
      <path d="M24 5 38 18v15c0 4-3 7-7 7H17c-4 0-7-3-7-7V18L24 5Z" fill="${vehicleColor}" stroke="#FFF" stroke-width="1" />
      <path d="M19 15h10l3 8H16l3-8Z" fill="rgba(255,255,255,0.3)" />
      <circle cx="18" cy="8" r="2" fill="#FFE66D" />
      <circle cx="30" cy="8" r="2" fill="#FFE66D" />
    </svg>
  </div>
`;

export const createPickupMarkerHtml = (): string => `
  <div class="tracking-pickup-marker" aria-label="Pickup location">
    <span class="tracking-pickup-pulse"></span>
    <span class="tracking-pickup-dot"></span>
  </div>
`;

export const createDropoffMarkerHtml = (): string => `
  <div class="tracking-dropoff-marker" aria-label="Dropoff location">
    <svg width="36" height="42" viewBox="0 0 36 42">
      <path d="M18 2C27 2 34 9 34 18c0 9-16 22-16 22S2 27 2 18C2 9 9 2 18 2Z" fill="#0F4C3A" stroke="#FFF" stroke-width="1.5" />
      <circle cx="18" cy="17" r="5" fill="#FFF" />
    </svg>
  </div>
`;

export function calculateBearing(
  [lon1, lat1]: [number, number],
  [lon2, lat2]: [number, number]
): number {
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const firstLat = (lat1 * Math.PI) / 180;
  const secondLat = (lat2 * Math.PI) / 180;
  const y = Math.sin(dLon) * Math.cos(secondLat);
  const x =
    Math.cos(firstLat) * Math.sin(secondLat) -
    Math.sin(firstLat) * Math.cos(secondLat) * Math.cos(dLon);

  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}
