'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Loader } from 'lucide-react';

interface SOSButtonProps {
  bookingId: string;
  driverId: string;
  driverLocation: { lat: number; lng: number; accuracy?: number };
  onActivate?: () => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function SOSButton({
  bookingId,
  driverId,
  driverLocation,
  onActivate,
  onSuccess,
  onError
}: SOSButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [sosStatus, setSOSStatus] = useState<'idle' | 'pending' | 'sent' | 'acknowledged'>('idle');

  // Countdown timer for SOS
  useEffect(() => {
    if (countdown === null) return;

    if (countdown === 0) {
      handleSOSActivation();
      setCountdown(null);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSOSPress = () => {
    if (isActive) {
      // Cancel SOS
      setIsActive(false);
      setCountdown(null);
      setSOSStatus('idle');
      return;
    }

    // Start countdown to trigger SOS
    setIsActive(true);
    setCountdown(3);
    setSOSStatus('pending');
    onActivate?.();
  };

  const handleSOSActivation = async () => {
    setIsLoading(true);
    setSOSStatus('sent');

    try {
      const response = await fetch('/api/bookings/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          driverId,
          location: driverLocation,
          reason: 'user-initiated'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SOS');
      }

      const data = await response.json();

      // Attempt to call police
      if (data.policeContactNumber) {
        window.location.href = `tel:${data.policeContactNumber}`;
      }

      setSOSStatus('acknowledged');
      onSuccess?.();

      // Reset after 5 seconds
      setTimeout(() => {
        setIsActive(false);
        setSOSStatus('idle');
      }, 5000);
    } catch (err) {
      console.error('SOS activation failed:', err);
      setSOSStatus('idle');
      onError?.(err instanceof Error ? err.message : 'SOS activation failed');
      setIsActive(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      {/* Backdrop when active */}
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => handleSOSPress()}
          style={{ zIndex: -1 }}
        />
      )}

      {/* Main SOS button */}
      <motion.button
        onClick={handleSOSPress}
        disabled={isLoading}
        className={`relative w-14 h-14 rounded-full font-bold flex items-center justify-center shadow-lg transition-all ${
          isActive || isLoading
            ? 'bg-red-600 text-white'
            : 'bg-white text-red-600 hover:bg-red-50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isLoading ? (
          <Loader size={20} className="animate-spin" />
        ) : (
          <AlertTriangle size={20} className="fill-current" />
        )}

        {/* Pulsing ring when active */}
        {isActive && !isLoading && (
          <>
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-600"
              animate={{
                scale: [1, 1.2],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1,
                repeat: Infinity
              }}
            />
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-600"
              animate={{
                scale: [1, 1.4],
                opacity: [1, 0]
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                delay: 0.3
              }}
            />
          </>
        )}
      </motion.button>

      {/* Countdown display */}
      {isActive && countdown !== null && countdown > 0 && !isLoading && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-red-600 text-white font-black text-2xl w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        >
          {countdown}
        </motion.div>
      )}

      {/* Status indicator */}
      {sosStatus === 'sent' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap shadow-lg"
        >
          Sending SOS...
        </motion.div>
      )}

      {sosStatus === 'acknowledged' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap shadow-lg"
        >
          ✓ Help on the way
        </motion.div>
      )}

      {/* Help text when active */}
      {isActive && !isLoading && countdown !== null && countdown > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-red-600/95 backdrop-blur-md text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap shadow-lg"
        >
          {countdown > 1 ? 'Release to cancel' : 'Activating...'}
        </motion.div>
      )}

      {/* Location being sent indicator */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-white shadow-lg rounded-full px-3 py-2 text-xs font-medium text-ink whitespace-nowrap"
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <MapPin size={12} className="text-red-600" />
          </motion.div>
          Sending location...
        </motion.div>
      )}
    </motion.div>
  );
}
