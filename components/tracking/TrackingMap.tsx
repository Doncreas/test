'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from 'react-leaflet';
import { divIcon, type Map as LeafletMap } from 'leaflet';
import { MapPin, AlertCircle, Navigation } from 'lucide-react';
import { TrackingData } from '@/types/tracking';
import {
  createDriverMarkerHtml,
  createPickupMarkerHtml,
  createDropoffMarkerHtml,
} from '@/lib/maps/leaflet';

interface TrackingMapProps {
  trackingData: TrackingData;
  onLocationUpdate?: (update: import('@/types/tracking').LocationUpdate) => void;
  onError?: (error: string) => void;
}

interface MapControllerProps {
  driverPosition: [number, number];
  pickupPosition: [number, number];
  isFollowing: boolean;
  onReady: (map: LeafletMap) => void;
}

function MapController({
  driverPosition,
  pickupPosition,
  isFollowing,
  onReady,
}: MapControllerProps) {
  const map = useMap();
  const hasFittedBounds = useRef(false);

  useEffect(() => {
    onReady(map);

    if (!hasFittedBounds.current) {
      map.fitBounds([driverPosition, pickupPosition], {
        padding: [80, 80],
        maxZoom: 15,
        animate: true,
      });
      hasFittedBounds.current = true;
    }
  }, [driverPosition, map, onReady, pickupPosition]);

  useEffect(() => {
    if (isFollowing) {
      map.flyTo(driverPosition, 16, { duration: 1 });
    }
  }, [driverPosition, isFollowing, map]);

  return null;
}

export function TrackingMap({ trackingData }: TrackingMapProps) {
  const mapRef = useRef<LeafletMap | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [speedWarning, setSpeedWarning] = useState(false);

  const { booking, location, route } = trackingData;
  const driverPosition: [number, number] = [location.lat, location.lng];
  const pickupPosition: [number, number] = [booking.pickup.lat, booking.pickup.lng];
  const dropoffPosition: [number, number] = [booking.dropoff.lat, booking.dropoff.lng];
  const routePositions = route?.length
    ? route.map((point) => [point.lat, point.lng] as [number, number])
    : [driverPosition, pickupPosition];

  const driverIcon = useMemo(
    () =>
      divIcon({
        className: 'tracking-marker-icon',
        html: createDriverMarkerHtml(location.heading, '#0F4C3A'),
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
    [location.heading]
  );
  const pickupIcon = useMemo(
    () =>
      divIcon({
        className: 'tracking-marker-icon',
        html: createPickupMarkerHtml(),
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      }),
    []
  );
  const dropoffIcon = useMemo(
    () =>
      divIcon({
        className: 'tracking-marker-icon',
        html: createDropoffMarkerHtml(),
        iconSize: [36, 42],
        iconAnchor: [18, 40],
      }),
    []
  );

  useEffect(() => {
    if (location.speed > 80) {
      setSpeedWarning(true);
      const timeout = window.setTimeout(() => setSpeedWarning(false), 3000);
      return () => window.clearTimeout(timeout);
    }
  }, [location.speed]);

  const toggleFollowing = () => {
    const nextFollowing = !isFollowing;
    setIsFollowing(nextFollowing);
    if (nextFollowing) {
      mapRef.current?.flyTo(driverPosition, 16, { duration: 1 });
    }
  };

  return (
    <div className="relative z-0 isolate h-full min-h-0 w-full overflow-hidden bg-ink">
      <MapContainer
        center={driverPosition}
        zoom={14}
        className="tracking-map h-full min-h-0 w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          className="tracking-osm-tiles"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={routePositions}
          pathOptions={{
            color: '#FF7A1A',
            weight: 4,
            opacity: 0.85,
            lineCap: 'round',
            lineJoin: 'round',
          }}
        />
        <Polyline
          positions={[driverPosition, pickupPosition]}
          pathOptions={{
            color: '#FF7A1A',
            weight: 2,
            opacity: 0.65,
            dashArray: '8 10',
            lineCap: 'round',
          }}
        />
        <Marker position={driverPosition} icon={driverIcon} />
        <Marker position={pickupPosition} icon={pickupIcon} />
        <Marker position={dropoffPosition} icon={dropoffIcon} />
        <MapController
          driverPosition={driverPosition}
          pickupPosition={pickupPosition}
          isFollowing={isFollowing}
          onReady={(map) => {
            mapRef.current = map;
            setIsMapLoaded(true);
          }}
        />
      </MapContainer>

      {speedWarning && (
        <div className="animation-in fade-in slide-in-from-top absolute left-4 right-4 top-4 flex items-start gap-3 rounded-2xl bg-red-500/90 px-4 py-3 text-white backdrop-blur-md sm:left-auto sm:right-auto sm:w-80">
          <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold">Speed Warning</p>
            <p className="text-xs text-white/80">Driver exceeds 80 km/h</p>
          </div>
        </div>
      )}

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-ink/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-3 border-cream border-t-sunset" />
            <p className="text-sm text-cream">Loading map...</p>
          </div>
        </div>
      )}

      {isMapLoaded && (
        <button
          onClick={toggleFollowing}
          className={`absolute bottom-4 right-4 rounded-full p-3 transition-all ${
            isFollowing
              ? 'bg-sage text-cream shadow-lg'
              : 'bg-white/10 text-cream backdrop-blur-md hover:bg-white/20'
          }`}
          title={isFollowing ? 'Stop following' : 'Follow driver'}
        >
          <Navigation size={20} className={!isFollowing ? 'opacity-60' : ''} />
        </button>
      )}

      {isMapLoaded && (
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-cream backdrop-blur-md">
          <MapPin size={16} />
          {location.accuracy ? `±${location.accuracy}m accuracy` : 'Live tracking'}
        </div>
      )}
    </div>
  );
}
