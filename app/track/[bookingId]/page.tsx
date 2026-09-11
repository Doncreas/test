'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TrackingMap } from '@/components/tracking/TrackingMap';
import { DriverSheet } from '@/components/tracking/DriverSheet';
import { SOSButton } from '@/components/tracking/SOSButton';
import { ShareTripModal } from '@/components/tracking/ShareTripModal';
import { TrackingWebSocket, LocationPoller } from '@/lib/websocket/client';
import { TrackingData, LocationUpdate } from '@/types/tracking';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface PageProps {
  params: {
    bookingId: string;
  };
}

export default function TrackingPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;

  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isDriverSheetExpanded, setIsDriverSheetExpanded] = useState(false);

  const wsRef = useRef<TrackingWebSocket | null>(null);
  const pollerRef = useRef<LocationPoller | null>(null);

  // Fetch initial tracking data
  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const res = await fetch(`/api/bookings/${bookingId}/tracking`);

        if (!res.ok) {
          throw new Error(`Failed to fetch tracking data: ${res.status}`);
        }

        const data: TrackingData = await res.json();
        setTrackingData(data);
        setError(null);
      } catch (err) {
        console.error('Tracking data fetch error:', err);
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to load tracking data'
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (bookingId) {
      fetchTrackingData();
    }
  }, [bookingId]);

  // Initialize WebSocket connection
  useEffect(() => {
    if (!trackingData) return;

    const initializeWebSocket = async () => {
      try {
        wsRef.current = new TrackingWebSocket(bookingId);

        // Connect with timeout
        const connectionPromise = wsRef.current.connect();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error('Connection timeout')),
            5000
          )
        );

        await Promise.race([connectionPromise, timeoutPromise]);

        setIsConnected(true);

        // Set up event listeners
        wsRef.current.on('location-update', handleLocationUpdate);
        wsRef.current.on('driver-arrived', handleDriverArrived);
        wsRef.current.on('trip-completed', handleTripCompleted);
        wsRef.current.on('error', handleWebSocketError);
        wsRef.current.on('disconnected', handleWebSocketDisconnected);
        wsRef.current.on('fallback-to-polling', handleFallbackToPolling);
      } catch (err) {
        console.error('WebSocket connection failed:', err);
        // Fall back to polling
        handleFallbackToPolling();
      }
    };

    initializeWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.destroy();
        wsRef.current = null;
      }
      if (pollerRef.current) {
        pollerRef.current.destroy();
        pollerRef.current = null;
      }
    };
  }, [trackingData, bookingId]);

  useEffect(() => {
    if (trackingData?.booking.status === 'completed') {
      router.push(`/bookings/${bookingId}/rate`);
    }
  }, [trackingData?.booking.status, bookingId, router]);

  const handleLocationUpdate = (update: LocationUpdate) => {
    setTrackingData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        location: update.location
      };
    });
  };

  const handleDriverArrived = (driver: any) => {
    setTrackingData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        booking: {
          ...prev.booking,
          status: 'arrived' as const
        }
      };
    });
  };

  const handleTripCompleted = (data: any) => {
    setTrackingData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        booking: {
          ...prev.booking,
          status: 'completed' as const,
          completedAt: new Date().toISOString()
        }
      };
    });
  };

  const handleWebSocketError = (error: any) => {
    console.error('WebSocket error:', error);
    setError('Connection error - attempting to reconnect...');
  };

  const handleWebSocketDisconnected = () => {
    setIsConnected(false);
  };

  const handleFallbackToPolling = () => {
    console.log('Falling back to polling...');
    setError('WebSocket unavailable - using polling');

    if (!pollerRef.current) {
      pollerRef.current = new LocationPoller(bookingId);
      pollerRef.current.on('location-update', handleLocationUpdate);
      pollerRef.current.on('driver-arrived', handleDriverArrived);
      pollerRef.current.on('trip-completed', handleTripCompleted);
      pollerRef.current.on('error', handleWebSocketError);
      pollerRef.current.start(15000); // Poll every 15 seconds
    }
  };

  const handleCall = () => {
    if (trackingData?.driver.phone) {
      window.location.href = `tel:${trackingData.driver.phone}`;
    }
  };

  const handleMessage = () => {
    if (trackingData?.driver.phone) {
      window.location.href = `sms:${trackingData.driver.phone}`;
    }
  };

  const handleShareTrip = () => {
    setShowShareModal(true);
  };

  const handleSOS = async () => {
    if (!trackingData) return;

    try {
      // Send SOS alert to backend
      const response = await fetch('/api/bookings/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: trackingData.booking.id,
          driverId: trackingData.driver.id,
          location: trackingData.location,
          reason: 'user-initiated'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SOS');
      }

      // Attempt to call police
      window.location.href = 'tel:112';
    } catch (err) {
      console.error('SOS failed:', err);
      setError('Failed to send SOS - please call 112 directly');
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-ink flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cream border-t-sunset rounded-full animate-spin mx-auto mb-4" />
          <p className="text-cream font-medium">Loading your ride...</p>
        </div>
      </div>
    );
  }

  if (error && !trackingData) {
    return (
      <div className="w-full h-screen bg-ink flex flex-col items-center justify-center p-6">
        <AlertCircle size={48} className="text-sunset mb-4" />
        <h1 className="text-2xl font-black text-cream mb-2">Error</h1>
        <p className="text-cream/80 text-center mb-6">{error}</p>
        <Link
          href="/book"
          className="px-6 py-3 bg-sage text-cream font-bold rounded-2xl hover:bg-sage/90 transition-colors"
        >
          Back to booking
        </Link>
      </div>
    );
  }

  if (!trackingData) {
    return null;
  }

  const isTripCompleted = trackingData.booking.status === 'completed';

  return (
    <div className="relative w-full h-screen bg-ink overflow-hidden">
      {/* Map */}
      <TrackingMap
        trackingData={trackingData}
        onLocationUpdate={handleLocationUpdate}
        onError={(err) => setError(err)}
      />

      {/* Back button */}
      <Link
        href="/book"
        className="absolute top-4 left-4 z-30 p-3 bg-white/10 backdrop-blur-md text-cream rounded-full hover:bg-white/20 transition-colors"
        title="Back to booking"
      >
        <ArrowLeft size={20} />
      </Link>

      {/* Connection status indicator */}
      {!isConnected && !error && (
        <div className="absolute top-20 left-4 bg-sunset/90 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-full animate-pulse">
          Connecting...
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div className="absolute top-20 left-4 right-4 sm:left-auto sm:right-auto sm:w-80 bg-yellow-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-full">
          {error}
        </div>
      )}

      {/* SOS Button */}
      {!isTripCompleted && (
        <SOSButton
          bookingId={trackingData.booking.id}
          driverId={trackingData.driver.id}
          driverLocation={trackingData.location}
          onSuccess={handleSOS}
        />
      )}

      {/* Driver Sheet */}
      <DriverSheet
        driver={trackingData.driver}
        eta={trackingData.eta}
        onCall={handleCall}
        onMessage={handleMessage}
        onShare={handleShareTrip}
        onSOS={handleSOS}
        isExpanded={isDriverSheetExpanded}
        onExpandChange={setIsDriverSheetExpanded}
      />

      {/* Share Trip Modal */}
      <ShareTripModal
        bookingId={trackingData.booking.id}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />

      {/* Trip completed overlay */}
      {isTripCompleted && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4">
            <div className="text-5xl mb-4">✓</div>
            <h2 className="text-2xl font-black text-ink mb-2">Trip completed!</h2>
            <p className="text-ink/70 mb-6">Thank you for using Karibu Tanzania</p>
            <Link
              href="/book"
              className="px-6 py-3 bg-sage text-cream font-bold rounded-2xl hover:bg-sage/90 transition-colors inline-block"
            >
              Book another ride
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
