'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Phone, MessageCircle, Share2, Flame, Package, Users, Clock, X } from 'lucide-react';
import { DriverInfo, ETAInfo, VehicleInfo } from '@/types/tracking';

interface DriverSheetProps {
  driver: DriverInfo;
  eta: ETAInfo;
  onCall?: () => void;
  onMessage?: () => void;
  onShare?: () => void;
  onSOS?: () => void;
  isExpanded?: boolean;
  onExpandChange?: (expanded: boolean) => void;
}

export function DriverSheet({
  driver,
  eta,
  onCall,
  onMessage,
  onShare,
  onSOS,
  isExpanded = false,
  onExpandChange
}: DriverSheetProps) {
  const [showDetails, setShowDetails] = useState(isExpanded);

  const handleToggle = () => {
    const newState = !showDetails;
    setShowDetails(newState);
    onExpandChange?.(newState);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 300 }}
        animate={{ y: 0 }}
        exit={{ y: 300 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-40"
      >
        {/* Backdrop */}
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => handleToggle()}
            style={{ height: '100vh' }}
          />
        )}

        {/* Sheet container */}
        <motion.div
          layout
          className="relative bg-gradient-to-b from-white via-cream to-white rounded-t-[32px] shadow-2xl overflow-hidden"
          style={{
            marginTop: showDetails ? 0 : 'auto'
          }}
        >
          {/* Drag handle */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 bg-sage/20 rounded-full" />
          </div>

          {/* Collapsed view */}
          {!showDetails && (
            <div
              className="px-6 pb-6 cursor-pointer"
              onClick={handleToggle}
            >
              <div className="flex items-center justify-between gap-4">
                {/* Driver info compact */}
                <div className="flex items-center gap-4 flex-1">
                  {/* Driver photo */}
                  <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-sage/10">
                    {driver.photo ? (
                      <img
                        src={driver.photo}
                        alt={driver.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-sage to-sunset flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {driver.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-ink truncate">{driver.name}</h3>
                      <div className="flex items-center gap-1 text-xs bg-gold/15 px-2 py-1 rounded-full flex-shrink-0">
                        <Star size={12} className="fill-gold text-gold" />
                        <span className="font-semibold text-ink">{driver.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <p className="text-sm text-ink/60 mb-2">{driver.vehicle.model}</p>
                    <p className="text-xs font-mono font-bold text-sage">
                      {driver.vehicle.plate}
                    </p>
                  </div>
                </div>

                {/* ETA */}
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="flex items-center gap-1 text-sage font-bold">
                    <Clock size={16} />
                    <span className="text-lg">{eta.minutes}</span>
                  </div>
                  <p className="text-xs text-ink/60">{eta.distance}</p>
                </div>
              </div>
            </div>
          )}

          {/* Expanded view */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-6 pb-8 max-h-[70vh] overflow-y-auto"
            >
              {/* Close button */}
              <button
                onClick={handleToggle}
                className="absolute top-4 right-4 p-2 hover:bg-ink/5 rounded-full transition-colors"
              >
                <X size={20} className="text-ink/60" />
              </button>

              {/* Driver details header */}
              <div className="flex items-start gap-4 mb-6 mt-2">
                {/* Large photo */}
                <div className="w-20 h-20 rounded-3xl overflow-hidden flex-shrink-0 border-3 border-sage/20">
                  {driver.photo ? (
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sage to-sunset flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">
                        {driver.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Name and rating */}
                <div className="flex-1">
                  <h2 className="text-2xl font-black text-ink mb-2">{driver.name}</h2>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gold/15 px-3 py-2 rounded-full">
                      <Star size={16} className="fill-gold text-gold" />
                      <span className="font-bold text-ink">{driver.rating.toFixed(1)}</span>
                      <span className="text-xs text-ink/60">
                        ({driver.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ETA section */}
              <div className="bg-gradient-to-r from-sage/10 to-sunset/10 rounded-2xl p-4 mb-6 border border-sage/10">
                <p className="text-xs font-semibold text-ink/60 mb-2 uppercase tracking-wide">
                  Estimated arrival
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-sage">{eta.minutes}</span>
                  <span className="text-lg text-ink/60">min</span>
                </div>
                <p className="text-sm text-ink/70 mt-2">{eta.confidence}</p>
                <p className="text-xs text-ink/60 mt-1">{eta.distance} away</p>
              </div>

              {/* Vehicle details */}
              <div className="space-y-3 mb-6">
                <div className="bg-white rounded-xl p-3 border border-sage/10">
                  <p className="text-xs font-semibold text-ink/60 mb-1">Vehicle</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-ink">{driver.vehicle.model}</p>
                      <p className="text-sm text-ink/60 capitalize">
                        {driver.vehicle.color} {driver.vehicle.type}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-sage/10 px-3 py-2 rounded-lg">
                      <span className="text-xs font-mono font-bold text-sage">
                        {driver.vehicle.plate}
                      </span>
                    </div>
                  </div>
                </div>

                {driver.yearsExperience && (
                  <div className="bg-white rounded-xl p-3 border border-sage/10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-ink/70">
                      <Flame size={16} className="text-sunset" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <span className="font-bold text-ink">{driver.yearsExperience}+ years</span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCall}
                  className="flex items-center justify-center gap-2 bg-sage text-cream font-bold py-3 rounded-xl hover:bg-sage/90 transition-colors"
                >
                  <Phone size={18} />
                  <span>Call</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onMessage}
                  className="flex items-center justify-center gap-2 bg-sunset text-white font-bold py-3 rounded-xl hover:bg-sunset/90 transition-colors"
                >
                  <MessageCircle size={18} />
                  <span>Message</span>
                </motion.button>
              </div>

              {/* Secondary actions */}
              <div className="space-y-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onShare}
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-sage/20 text-sage font-bold py-3 rounded-xl hover:bg-sage/5 transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share trip</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onSOS}
                  className="w-full flex items-center justify-center gap-2 bg-red-50 border-2 border-red-200 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100/50 transition-colors"
                >
                  <AlertIcon size={18} />
                  <span>Emergency SOS</span>
                </motion.button>
              </div>

              {/* Driver info footer */}
              <div className="mt-6 pt-6 border-t border-sage/10 text-xs text-ink/60 space-y-1">
                <p>📞 {driver.phone}</p>
                <p>🚗 License verified • Background checked</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function AlertIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
