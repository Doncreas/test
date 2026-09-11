import {
  QuoteRequest,
  QuoteResponse,
  estimateDemandRatio,
  estimateDistanceFactor,
  estimateEventFactor,
  estimateFlightDensity,
  estimateWeather,
  formatMoney,
  getAirportFixedPriceFactor,
  getGroupDiscount,
  getOffPeakDiscount,
  tierDiscountMap,
  tierSurgeCap,
  vehicleBasePrice,
} from './factors';

export function calculatePriceQuote(input: QuoteRequest): QuoteResponse {
  const passengerCount = Math.max(1, input.passengerCount ?? 1);
  const basePrice = vehicleBasePrice[input.vehicleType] ?? vehicleBasePrice.sedan;

  const demandMultiplier = estimateDemandRatio(input.pickup);
  const flightMultiplier = input.pickup.type === 'airport' || input.dropoff.type === 'airport'
    ? estimateFlightDensity(input.time)
    : 1;
  const weatherMultiplier = estimateWeather(input.time);
  const eventMultiplier = estimateEventFactor(input.time);
  const distanceMultiplier = estimateDistanceFactor(input.pickup, input.dropoff);

  const positiveModifiers = [
    { name: 'Real-time demand', impact: demandMultiplier - 1, detail: 'Pickup-zone demand in the next 2 hours.' },
    { name: 'Flight arrival density', impact: flightMultiplier - 1, detail: 'Airport throughput and arrival peaks.' },
    { name: 'Weather risk', impact: weatherMultiplier - 1, detail: 'Heavy rain increases travel time and safety risk.' },
    { name: 'Event uplift', impact: eventMultiplier - 1, detail: 'Large events can temporarily tighten supply.' },
    { name: 'Long-distance surcharge', impact: distanceMultiplier - 1, detail: 'Longer trips add fuel and time cost.' },
  ].filter((item) => item.impact > 0);

  const surgeMultiplier = Math.min(
    positiveModifiers.reduce((acc, item) => acc * (1 + item.impact), 1),
    tierSurgeCap[input.passengerTier ?? 'bronze']
  );

  const airportFixed = getAirportFixedPriceFactor(input.pickup, input.dropoff);
  const offPeakDiscount = getOffPeakDiscount(input.time);
  const groupDiscount = getGroupDiscount(passengerCount);
  const loyaltyDiscount = tierDiscountMap[input.passengerTier ?? 'bronze'];

  const totalDiscountRate = Math.min(0.2, offPeakDiscount + groupDiscount + loyaltyDiscount);
  const preDiscountFinal = basePrice * surgeMultiplier;
  const savings = preDiscountFinal * totalDiscountRate;

  const factors = [
    { name: 'Airport pickup', impact: airportFixed, detail: 'Airport pickups stay fixed-price when confirmed.' },
    { name: 'Off-peak bonus', impact: -Math.min(basePrice * offPeakDiscount, 25000), detail: 'Karibu Hour discount during 3-5pm.' },
    { name: 'Group discount', impact: -Math.min(basePrice * groupDiscount, 20000), detail: 'Bulk pricing for 4+ passengers.' },
    { name: 'Loyalty discount', impact: -Math.min(basePrice * loyaltyDiscount, 20000), detail: 'Tiered loyalty reward applied on top of route adjustments.' },
    ...positiveModifiers.map((modifier) => ({
      name: modifier.name,
      impact: basePrice * modifier.impact,
      detail: modifier.detail,
    })),
  ].filter((factor) => factor.impact !== 0);

  const finalPrice = Math.max(0, Math.round(preDiscountFinal - savings));
  const validUntil = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  return {
    basePrice: formatMoney(basePrice),
    surgeMultiplier: Number(surgeMultiplier.toFixed(2)),
    finalPrice,
    factors,
    savings: Math.round(savings),
    validUntil,
  };
}
