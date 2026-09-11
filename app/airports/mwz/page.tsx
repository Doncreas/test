import AirportPage from '@/app/airports/[code]/page';

export default function MwzAirportPage() {
  return <AirportPage params={{ code: 'mwz' }} />;
}
