export type AirportCode = 'DAR' | 'JRO' | 'ZNZ' | 'MWZ';

export type FlightDirection = 'arrival' | 'departure';

export interface TerminalArea {
  name: string;
  detail: string;
}

export interface AirportInfo {
  code: AirportCode;
  name: string;
  city: string;
  terminal: string;
  parking: string;
  currency: string;
  arrivalCapacity: string;
  services: string[];
  terminalAreas: TerminalArea[];
  customs: {
    visaOnArrival: boolean;
    dutyFreeLocation: string;
    vatRefundLocation: string;
  };
  simProviders: Array<'Vodacom' | 'Airtel' | 'Halotel'>;
  transferNote: string;
}

export const AIRPORTS: Record<AirportCode, AirportInfo> = {
  DAR: {
    code: 'DAR',
    name: 'Julius Nyerere International Airport',
    city: 'Dar es Salaam',
    terminal: 'Terminal 3',
    parking: 'P1 Arrivals / P2 Departures',
    currency: 'TSh',
    arrivalCapacity: '34 flights/day',
    services: ['Duty Free', 'SIM kiosk', 'Meet & Greet', 'Visa desk'],
    terminalAreas: [
      { name: 'Arrival Hall', detail: 'Meet your driver after baggage claim.' },
      { name: 'Immigration', detail: 'Visa and passport processing.' },
      { name: 'Baggage Hall', detail: 'Baggage reclaim and porter meeting point.' },
      { name: 'Duty Free', detail: 'Landside retail near the exit.' },
    ],
    customs: {
      visaOnArrival: true,
      dutyFreeLocation: 'Landside, beside the arrivals exit.',
      vatRefundLocation: 'Customs desk in the international arrivals hall.',
    },
    simProviders: ['Vodacom', 'Airtel', 'Halotel'],
    transferNote: 'City, coast and safari transfers available from P1 Arrivals.',
  },
  JRO: {
    code: 'JRO',
    name: 'Kilimanjaro International Airport',
    city: 'Arusha',
    terminal: 'Terminal 1',
    parking: 'P7 Pickup',
    currency: 'TSh',
    arrivalCapacity: '22 flights/day',
    services: ['Tourist desk', 'SIM kiosk', 'Lounge', 'Taxi rank'],
    terminalAreas: [
      { name: 'Main Hall', detail: 'International arrivals and passenger services.' },
      { name: 'Immigration', detail: 'Passport control and visa processing.' },
      { name: 'Tourist Desk', detail: 'Safari and destination support.' },
      { name: 'Pickup Bay', detail: 'Meet-and-greet and pre-booked transfers.' },
    ],
    customs: {
      visaOnArrival: true,
      dutyFreeLocation: 'International arrivals hall after immigration.',
      vatRefundLocation: 'Ask the customs desk before leaving the terminal.',
    },
    simProviders: ['Vodacom', 'Airtel', 'Halotel'],
    transferNote: 'JRO to Arusha transfers receive 15% off when booked internally.',
  },
  ZNZ: {
    code: 'ZNZ',
    name: 'Zanzibar Airport',
    city: 'Zanzibar',
    terminal: 'Terminal A',
    parking: 'P3 Visitor Pickup',
    currency: 'TSh',
    arrivalCapacity: '18 flights/day',
    services: ['Duty Free', 'SIM kiosk', 'Airport transfer', 'Tourist refund'],
    terminalAreas: [
      { name: 'Airside', detail: 'International arrival gates and transfer signs.' },
      { name: 'Immigration', detail: 'Passport control and visa processing.' },
      { name: 'Customs', detail: 'Baggage inspection and declarations.' },
      { name: 'Taxi Stand', detail: 'Pre-booked pickup meeting area.' },
    ],
    customs: {
      visaOnArrival: true,
      dutyFreeLocation: 'Arrivals concourse after customs.',
      vatRefundLocation: 'Tourist refund desk near the customs exit.',
    },
    simProviders: ['Vodacom', 'Airtel', 'Halotel'],
    transferNote: 'Island transfers can be arranged with a driver holding your name sign.',
  },
  MWZ: {
    code: 'MWZ',
    name: 'Songwe Airport',
    city: 'Mbeya',
    terminal: 'Main Terminal',
    parking: 'Ground Floor Pickup',
    currency: 'TSh',
    arrivalCapacity: '8 flights/day',
    services: ['Local transfer', 'Support desk', 'WiFi', 'SIM kiosk'],
    terminalAreas: [
      { name: 'Baggage Claim', detail: 'Collect luggage before meeting your driver.' },
      { name: 'Immigration', detail: 'Passport control for international connections.' },
      { name: 'Local Transfer', detail: 'Ground transport and regional connections.' },
      { name: 'Pickup Lane', detail: 'Driver meeting point outside arrivals.' },
    ],
    customs: {
      visaOnArrival: true,
      dutyFreeLocation: 'Small retail area beside the arrivals hall.',
      vatRefundLocation: 'Confirm the refund desk with airport customs on arrival.',
    },
    simProviders: ['Vodacom', 'Airtel', 'Halotel'],
    transferNote: 'Regional transfers and accessible pickup can be arranged in advance.',
  },
};

export const TERMINAL_MAP: Record<AirportCode, TerminalArea[]> = Object.fromEntries(
  Object.entries(AIRPORTS).map(([code, airport]) => [code, airport.terminalAreas]),
) as Record<AirportCode, TerminalArea[]>;

export interface AirportFlight {
  flight: string;
  from: string;
  to: AirportCode;
  direction?: FlightDirection;
  status: string;
  eta: string;
  gate: string;
  terminal: string;
  delay: number;
}

export const sampleFlights: AirportFlight[] = [
  { flight: 'KQ 508', from: 'Nairobi', to: 'DAR', direction: 'arrival', status: 'On time', eta: '18:20', gate: 'A2', terminal: 'Terminal 3', delay: 0 },
  { flight: 'ET 882', from: 'Addis Ababa', to: 'JRO', direction: 'arrival', status: 'Delayed', eta: '19:05', gate: 'B3', terminal: 'Terminal 1', delay: 35 },
  { flight: 'RW 489', from: 'Kigali', to: 'ZNZ', direction: 'arrival', status: 'On time', eta: '17:40', gate: 'C1', terminal: 'Terminal A', delay: 0 },
  { flight: 'PW 120', from: 'DAR', to: 'MWZ', direction: 'departure', status: 'Boarding', eta: '16:15', gate: 'T2', terminal: 'Main Terminal', delay: 10 },
];
