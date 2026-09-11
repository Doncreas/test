'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { TrackingMap } from '@/components/tracking/TrackingMap';
import { DriverSheet } from '@/components/tracking/DriverSheet';
import { LocationPoller } from '@/lib/websocket/client';
import { TrackingData, LocationUpdate } from '@/types/tracking';
import { AlertCircle, Lock } from 'lucide-react';
import Link from 'next/link';

/**
 * Public tracking page
 * Allows anyone with a share link to view live trip tracking
 * Read-only access - no driver contact or SOS functionality
 */
export default function PublicTrackingPage() {
  const params = useParams();
  const token = params?.token as string;

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpired, setIsExpired] = useState(false);

  const pollerRef = React.useRef<LocationPoller | null>(null);

  useEffect(() => {
    const validateAndFetch = async () => {
      try {
        // Validate share token
        const validateRes = await fetch(`/api/bookings/share/${token}`);

        if (!validateRes.ok) {
          if (validateRes.status === 404) {
            setIsExpired(true);
          }
          throw new Error('Invalid or expired share link');
        }

        const { bookingId } = await validateRes.json();

        // Fetch tracking data
        const trackingRes = await fetch(`/api/bookings/${bookingId}/tracking`);

        if (!trackingRes.ok) {
          throw new Error('Failed to load tracking data');
        }

        const data: TrackingData = await trackingRes.json();
        setTrackingData(data);

        // Start polling
        pollerRef.current = new LocationPoller(bookingId);
        pollerRef.current.on('location-update', (update: LocationUpdate) => {
          setTrackingData((prev) =>
            prev ? { ...prev, location: update.location } : prev
          );
        });
        pollerRef.current.start(15000);
      } catch (err) {
        console.error('Validation/fetch error:', err);
        setError(
          err instanceof Error ? err.message : 'Failed to load tracking'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      validateAndFetch();
    }

    return () => {
      if (pollerRef.current) {
        pollerRef.current.destroy();
      }
    };
  }, [token]);

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cream border-t-sunset rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream font-medium">Loading shared trip...</p>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="w-full h-screen bg-ink flex flex-col items-center justify-center p-6">
        <AlertCircle size={48} className="text-sunset mb-4" />
        <h1 className="text-2xl font-black text-cream mb-2">Link Expired</h1>
        <p className="text-cream/80 text-center mb-6">
          This trip tracking link has expired. Trips can be shared for up to 24 hours after completion.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-sage text-cream font-bold rounded-2xl hover:bg-sage/90 transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  if (error || !trackingData) {
    return (
      <div className="w-full h-screen bg-ink flex flex-col items-center justify-center p-6">
        <AlertCircle size={48} className="text-sunset mb-4" />
        <h1 className="text-2xl font-black text-cream mb-2">Error</h1>
        <p className="text-cream/80 text-center mb-6">
          {error || 'Failed to load shared trip tracking'}
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-sage text-cream font-bold rounded-2xl hover:bg-sage/90 transition-colors"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-ink overflow-hidden">
      {/* Map - read-only */}
      <TrackingMap
        trackingData={trackingData}
        onError={(err) => setError(err)}
      />

      {/* Public viewing badge */}
      <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-cream rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium">
        <Lock size={16} />
        Public tracking
      </div>

      {/* Driver info - read-only */}
      <DriverSheet
        driver={trackingData.driver}
        eta={trackingData.eta}
        onCall={() => {}}
        onMessage={() => {}}
        onShare={() => {}}
        onSOS={() => {}}
      />

      {/* Public viewing info */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-auto sm:w-80 bg-blue-500/90 backdrop-blur-md text-white rounded-2xl px-4 py-3">
        <p className="text-xs font-medium">
          🔒 You're viewing a live trip shared by the passenger. Contact info is hidden.
        </p>
      </div>
    </div>
  );
}
