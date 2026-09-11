'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, MapPin, Sparkles, AlertCircle, TrendingUp, ChevronRight } from 'lucide-react';
import { SuggestedStop } from '@/types/stop';

interface SuggestedStopsProps {
  suggestions: SuggestedStop[];
  isLoading: boolean;
  error?: string;
  onSelectStop: (stop: SuggestedStop) => void;
  maxStops?: number;
  currentStopCount?: number;
}

export function SuggestedStops({
  suggestions,
  isLoading,
  error,
  onSelectStop,
  maxStops = 4,
  currentStopCount = 0
}: SuggestedStopsProps) {
  const canAddMore = currentStopCount < maxStops;
  const sortedSuggestions = [...suggestions].sort((a, b) => b.priority - a.priority);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-cream rounded-2xl p-4 animate-pulse h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
      >
        <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-red-900">Could not load suggestions</p>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </motion.div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="bg-cream rounded-2xl p-6 text-center">
        <Sparkles size={32} className="text-sunset mx-auto mb-3 opacity-60" />
        <p className="font-semibold text-ink/70">No suggestions available</p>
        <p className="text-sm text-ink/50 mt-1">Try searching for specific places</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <Sparkles size={18} className="text-sunset" />
        <h3 className="font-bold text-ink">AI-Suggested Stops</h3>
        <span className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full font-semibold">
          {suggestions.length}
        </span>
      </div>

      {/* Suggestion cards */}
      <AnimatePresence>
        {sortedSuggestions.map((stop, index) => (
          <SuggestedStopCard
            key={stop.id}
            stop={stop}
            index={index}
            isEnabled={canAddMore}
            onSelect={() => onSelectStop(stop)}
          />
        ))}
      </AnimatePresence>

      {/* Can't add more message */}
      {!canAddMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 text-xs text-yellow-800 flex items-start gap-2"
        >
          <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
          <span>Maximum {maxStops} stops reached</span>
        </motion.div>
      )}
    </div>
  );
}

interface SuggestedStopCardProps {
  stop: SuggestedStop;
  index: number;
  isEnabled: boolean;
  onSelect: () => void;
}

function SuggestedStopCard({ stop, index, isEnabled, onSelect }: SuggestedStopCardProps) {
  const priorityColor = {
    5: 'from-gold to-sunset',
    4: 'from-sunset to-sunset',
    3: 'from-sage to-ocean',
    2: 'from-sage/50 to-sage/30',
    1: 'from-sage/30 to-sage/10'
  }[stop.priority as 1 | 2 | 3 | 4 | 5] || 'from-sage/20 to-sage/10';

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      whileHover={isEnabled ? { scale: 1.01, y: -2 } : {}}
      onClick={isEnabled ? onSelect : undefined}
      disabled={!isEnabled}
      className={`w-full text-left rounded-2xl p-4 transition-all ${
        isEnabled
          ? 'bg-white border-2 border-sage/10 hover:border-sage/30 shadow-sm hover:shadow-md cursor-pointer'
          : 'bg-cream/50 border-2 border-sage/5 opacity-60 cursor-not-allowed'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Photo or icon */}
        <div
          className={`w-16 h-16 rounded-xl flex-shrink-0 overflow-hidden bg-gradient-to-br ${priorityColor}`}
        >
          {stop.photoUrl ? (
            <img
              src={stop.photoUrl}
              alt={stop.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl opacity-70">
              {getCategoryEmoji(stop.category)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h4 className="font-bold text-ink truncate">{stop.name}</h4>
              <p className="text-xs text-ink/60 line-clamp-1">{stop.address}</p>
            </div>

            {/* Priority badge */}
            {stop.priority >= 4 && (
              <div className="flex-shrink-0 bg-gold/20 px-2 py-1 rounded-lg">
                <TrendingUp size={12} className="text-gold" />
              </div>
            )}
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-3 flex-wrap text-xs text-ink/70">
            {/* Rating */}
            {stop.rating && (
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-gold text-gold" />
                <span className="font-semibold">
                  {stop.rating.toFixed(1)}
                </span>
                {stop.reviewCount && (
                  <span className="text-ink/50">({stop.reviewCount})</span>
                )}
              </div>
            )}

            {/* Time */}
            {stop.estimatedTime && (
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{stop.estimatedTime} min</span>
              </div>
            )}

            {/* Distance */}
            {stop.distance?.fromPickup && (
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{stop.distance.fromPickup.toFixed(1)} km</span>
              </div>
            )}

            {/* Status */}
            {stop.operating && !stop.operating.isOpen && (
              <span className="text-red-600 font-semibold">Closed</span>
            )}

            {stop.operating?.isOpen && (
              <span className="text-green-600 font-semibold">Open</span>
            )}
          </div>

          {/* Reasoning */}
          <p className="text-xs text-sage font-medium mt-2">{stop.reasoning}</p>

          {/* Amenities */}
          {stop.amenities && stop.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {stop.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs bg-sage/10 text-sage px-2 py-1 rounded-full"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Arrow */}
        {isEnabled && (
          <div className="flex-shrink-0 text-sage opacity-40 group-hover:opacity-100">
            <ChevronRight size={20} />
          </div>
        )}
      </div>
    </motion.button>
  );
}

function getCategoryEmoji(category: string): string {
  const emojis: Record<string, string> = {
    'bureau-de-change': '💱',
    'supermarket': '🛒',
    'pharmacy': '💊',
    'atm': '🏧',
    'sim-vendor': '📱',
    'gas-station': '⛽',
    'restaurant': '🍽️',
    'hotel': '🏨',
    'shopping': '🛍️',
    'custom': '📍'
  };

  return emojis[category] || '📍';
}
