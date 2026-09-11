import { NextRequest, NextResponse } from 'next/server';
import { AIRPORTS, type AirportCode, type AirportFlight } from '@/lib/airports/data';

const AVIATIONSTACK_URL = 'http://api.aviationstack.com/v1/flights';

interface AviationstackFlight {
  flight?: {
    iata?: string | null;
    number?: string | null;
  };
  airline?: {
    iata?: string | null;
    name?: string | null;
  };
  departure?: {
    airport?: string | null;
    iata?: string | null;
    scheduled?: string | null;
    estimated?: string | null;
    actual?: string | null;
    terminal?: string | null;
    gate?: string | null;
    delay?: number | null;
  };
  arrival?: {
    airport?: string | null;
    iata?: string | null;
    scheduled?: string | null;
    estimated?: string | null;
    actual?: string | null;
    terminal?: string | null;
    gate?: string | null;
    delay?: number | null;
  };
  flight_status?: string | null;
}

function isAirportCode(value: string): value is AirportCode {
  return value in AIRPORTS;
}

function formatTime(value?: string | null): string {
  if (!value) return '--:--';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '--:--';

  return date.toLocaleTimeString('en-TZ', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Africa/Dar_es_Salaam',
  });
}

function formatStatus(status?: string | null, delay?: number | null): string {
  if (delay && delay > 0) return 'Delayed';
  if (status === 'landed') return 'Landed';
  if (status === 'active') return 'En route';
  if (status === 'cancelled') return 'Cancelled';
  if (status === 'incident') return 'Incident';
  return 'On time';
}

function normalizeFlight(
  flight: AviationstackFlight,
  airportCode: AirportCode,
): AirportFlight | null {
  const flightNumber = flight.flight?.iata || flight.flight?.number;
  if (!flightNumber) return null;

  const isArrival = flight.arrival?.iata === airportCode;
  const movement = isArrival ? flight.arrival : flight.departure;
  const delay = movement?.delay ?? 0;
  const scheduled = movement?.estimated || movement?.scheduled || movement?.actual;

  return {
    flight: flightNumber,
    from: isArrival
      ? flight.departure?.airport || flight.departure?.iata || 'Unknown origin'
      : airportCode,
    to: airportCode,
    direction: isArrival ? 'arrival' : 'departure',
    status: formatStatus(flight.flight_status, delay),
    eta: formatTime(scheduled),
    gate: movement?.gate || 'TBC',
    terminal: movement?.terminal || AIRPORTS[airportCode].terminal,
    delay,
  };
}

export async function GET(request: NextRequest) {
  const requestedCode = request.nextUrl.searchParams.get('code')?.toUpperCase() || 'DAR';
  const direction = request.nextUrl.searchParams.get('direction');

  if (!isAirportCode(requestedCode)) {
    return NextResponse.json(
      { error: 'Unsupported airport code. Use DAR, JRO, ZNZ, or MWZ.' },
      { status: 400 },
    );
  }

  if (direction && direction !== 'arrival' && direction !== 'departure') {
    return NextResponse.json(
      { error: 'Direction must be arrival or departure.' },
      { status: 400 },
    );
  }

  const accessKey = process.env.AVIATIONSTACK_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { error: 'Aviationstack is not configured. Set AVIATIONSTACK_ACCESS_KEY.' },
      { status: 503 },
    );
  }

  const params = new URLSearchParams({
    access_key: accessKey,
    limit: '20',
  });

  if (direction === 'departure') {
    params.set('dep_iata', requestedCode);
  } else {
    params.set('arr_iata', requestedCode);
  }

  try {
    const response = await fetch(`${AVIATIONSTACK_URL}?${params.toString()}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Aviationstack request failed with status ${response.status}.` },
        { status: 502 },
      );
    }

    const payload = await response.json();
    if (payload.error) {
      return NextResponse.json(
        { error: payload.error.info || 'Aviationstack returned an error.' },
        { status: 502 },
      );
    }

    const flights = (payload.data || [])
      .map((flight: AviationstackFlight) => normalizeFlight(flight, requestedCode))
      .filter((flight: AirportFlight | null): flight is AirportFlight => Boolean(flight))
      .filter((flight: AirportFlight) => !direction || flight.direction === direction);

    return NextResponse.json({
      airport: AIRPORTS[requestedCode],
      code: requestedCode,
      flights,
      source: 'aviationstack',
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('[Airport flights API] Aviationstack request failed:', error);
    return NextResponse.json(
      { error: 'Unable to load live airport flights right now.' },
      { status: 502 },
    );
  }
}
