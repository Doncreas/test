'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import {
  Plus,
  X,
  Clock,
  MapPin,
  DollarSign,
  Zap,
  AlertCircle,
  ChevronDown,
  GripVertical,
  Sparkles
} from 'lucide-react';
import { Stop, DwellTimeOption, StopCategory, ItineraryEstimate, SuggestedStop, StopSearchResult } from '@/types/stop';
import { recalculateItinerary, estimateStopImpact, calculateLoyaltyPoints } from '@/lib/stops/recalculate';
import { StopSearch } from './StopSearch';
import { SuggestedStops } from './SuggestedStops';

interface StopManagerProps {
  pickup: { lat: number; lng: number; name: string };
  dropoff: { lat: number; lng: number; name: string };
  onEstimateUpdate: (estimate: ItineraryEstimate) => void;
  maxStops?: number;
  userLoyaltyPoints?: number;
  onLoadSuggestions?: (pickup: any, dropoff: any) => Promise<SuggestedStop[]>;
}

const DWELL_TIME_OPTIONS: Record<DwellTimeOption, { option: DwellTimeOption; minutes: number; label: string }> = {
  quick: { option: 'quick', minutes: 5, label: 'Quick (5 min)' },
  normal: { option: 'normal', minutes: 15, label: 'Normal (15 min)' },
  extended: { option: 'extended', minutes: 45, label: 'Extended (45 min)' }
};

export function StopManager({
  pickup,
  dropoff,
  onEstimateUpdate,
  maxStops = 4,
  userLoyaltyPoints,
  onLoadSuggestions
}: StopManagerProps) {
  const [stops, setStops] = useState<Stop[]>([]);
  const [estimate, setEstimate] = useState<ItineraryEstimate | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [suggestedStops, setSuggestedStops] = useState<SuggestedStop[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [expandedStopId, setExpandedStopId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Load AI suggestions on mount
  useEffect(() => {
    loadSuggestions();
  }, []);

  // Recalculate estimate when stops change
  useEffect(() => {
    recalculateEstimate();
  }, [stops, userLoyaltyPoints]);

  const loadSuggestions = async () => {
    if (!onLoadSuggestions) return;

    setIsLoadingSuggestions(true);
    try {
      const suggestions = await onLoadSuggestions(pickup, dropoff);
      setSuggestedStops(suggestions);
    } catch (err) {
      console.error('Failed to load suggestions:', err);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const recalculateEstimate = async () => {
    try {
      const newEstimate = await recalculateItinerary(
        pickup,
        stops,
        dropoff,
        userLoyaltyPoints
      );
      setEstimate(newEstimate);
      onEstimateUpdate(newEstimate);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation failed');
    }
  };

  const canAddMore = stops.length < maxStops;

  const handleAddStop = (searchResult: StopSearchResult) => {
    if (!canAddMore) {
      setError(`Maximum ${maxStops} stops allowed`);
      return;
    }

    const newStop: Stop = {
      id: `stop-${Date.now()}`,
      sequence: stops.length + 1,
      address: searchResult.address,
      name: searchResult.name,
      lat: searchResult.lat,
      lng: searchResult.lng,
      category: searchResult.category || 'custom',
      duration: { ...DWELL_TIME_OPTIONS.normal },
      status: 'pending'
    };

    setStops([...stops, newStop]);
    setIsSearchOpen(false);
  };

  const handleSuggestedStop = (suggested: SuggestedStop) => {
    const searchResult: StopSearchResult = {
      id: suggested.id,
      name: suggested.name,
      address: suggested.address,
      lat: suggested.lat,
      lng: suggested.lng,
      category: suggested.category,
      rating: suggested.rating,
      reviewCount: suggested.reviewCount,
      photoUrl: suggested.photoUrl,
      source: 'caribu-database'
    };

    handleAddStop(searchResult);
  };

  const handleRemoveStop = (id: string) => {
    setStops(stops.filter((s) => s.id !== id).map((s, i) => ({ ...s, sequence: i + 1 })));
    if (expandedStopId === id) {
      setExpandedStopId(null);
    }
  };

  const handleUpdateDwellTime = (id: string, option: DwellTimeOption) => {
    setStops(
      stops.map((s) =>
        s.id === id
          ? { ...s, duration: DWELL_TIME_OPTIONS[option] }
          : s
      )
    );
  };

  const handleReorderStops = (newStops: Stop[]) => {
    const reordered = newStops.map((s, i) => ({ ...s, sequence: i + 1 }));
    setStops(reordered);
  };

  const loyaltyPointsEarned =
    estimate && stops.length > 0
      ? calculateLoyaltyPoints(estimate.itinerary.totalDistance, stops.length, estimate.fare.total)
      : 0;

  return (
    <div className="space-y-6">
      {/* Summary section */}
      {estimate && stops.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sage/10 to-sunset/10 rounded-2xl p-4 border border-sage/20 space-y-3"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Multi-stop ride
              </p>
              <h3 className="text-lg font-black text-ink mt-1">
                {stops.length} {stops.length === 1 ? 'stop' : 'stops'}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                Total time
              </p>
              <p className="text-lg font-black text-sage mt-1">
                {estimate.eta.totalMinutes} min
              </p>
            </div>
          </div>

          {/* Progress bars */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-ink/60">Travel</span>
              <span className="font-semibold text-ink">{estimate.itinerary.travelDuration} min</span>
            </div>
            <div className="w-full bg-white/40 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(estimate.itinerary.travelDuration / estimate.eta.totalMinutes) * 100}%`
                }}
                className="h-full bg-gradient-to-r from-sage to-sunset"
              />
            </div>

            {estimate.itinerary.dwellDuration > 0 && (
              <>
                <div className="flex items-center justify-between text-xs mt-3">
                  <span className="text-ink/60">Dwell time</span>
                  <span className="font-semibold text-ink">{estimate.itinerary.dwellDuration} min</span>
                </div>
                <div className="w-full bg-white/40 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(estimate.itinerary.dwellDuration / estimate.eta.totalMinutes) * 100}%`
                    }}
                    className="h-full bg-gold"
                  />
                </div>
              </>
            )}
          </div>

          {/* Pricing and loyalty */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/20">
            <div>
              <p className="text-xs text-ink/60">Total fare</p>
              <p className="font-bold text-lg text-ink">
                {(estimate.fare.total / 1000).toFixed(0)}K TZS
              </p>
            </div>
            {loyaltyPointsEarned > 0 && (
              <div className="text-right">
                <p className="text-xs text-ink/60">Earn</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <Sparkles size={14} className="text-gold" />
                  <p className="font-bold text-lg text-gold">{loyaltyPointsEarned}</p>
                  <span className="text-xs font-semibold text-gold/60">pts</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3"
        >
          <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">{error}</p>
        </motion.div>
      )}

      {/* Stops list */}
      {stops.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold text-ink text-sm uppercase tracking-wide px-1">Your stops</h3>

          <Reorder.Group
            axis="y"
            values={stops}
            onReorder={handleReorderStops}
            className="space-y-2"
          >
            <AnimatePresence>
              {stops.map((stop, index) => (
                <Reorder.Item key={stop.id} value={stop} as="div">
                  <StopCard
                    stop={stop}
                    index={index}
                    isExpanded={expandedStopId === stop.id}
                    onToggleExpand={() =>
                      setExpandedStopId(expandedStopId === stop.id ? null : stop.id)
                    }
                    onRemove={() => handleRemoveStop(stop.id)}
                    onUpdateDwellTime={(option) => handleUpdateDwellTime(stop.id, option)}
                    estimate={estimate}
                  />
                </Reorder.Item>
              ))}
            </AnimatePresence>
          </Reorder.Group>
        </div>
      )}

      {/* Suggested stops section */}
      {!isSearchOpen && stops.length < maxStops && suggestedStops.length > 0 && (
        <div className="bg-cream rounded-2xl p-4 border border-sage/10">
          <SuggestedStops
            suggestions={suggestedStops}
            isLoading={isLoadingSuggestions}
            onSelectStop={handleSuggestedStop}
            maxStops={maxStops}
            currentStopCount={stops.length}
          />
        </div>
      )}

      {/* Add stop button */}
      {canAddMore && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsSearchOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-4 border-2 border-dashed border-sage/30 rounded-2xl text-sage font-bold hover:border-sage/50 hover:bg-cream/50 transition-all"
        >
          <Plus size={20} />
          Add another stop
        </motion.button>
      )}

      {/* Search modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <StopSearch
            center={pickup}
            onSelect={handleAddStop}
            onClose={() => setIsSearchOpen(false)}
            placeholder="Search for bureau de change, supermarket, pharmacy, ATM..."
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface StopCardProps {
  stop: Stop;
  index: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onRemove: () => void;
  onUpdateDwellTime: (option: DwellTimeOption) => void;
  estimate?: ItineraryEstimate | null;
}

function StopCard({
  stop,
  index,
  isExpanded,
  onToggleExpand,
  onRemove,
  onUpdateDwellTime,
  estimate
}: StopCardProps) {
  const stopFare = estimate?.fare.perStopBreakdown?.[index]?.estimatedFare;
  const costTillHere = stopFare ? (stopFare / 1000).toFixed(0) : null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-2xl border-2 border-sage/10 overflow-hidden"
    >
      {/* Main row */}
      <button
        onClick={onToggleExpand}
        className="w-full p-4 flex items-start gap-3 hover:bg-cream/30 transition-colors"
      >
        {/* Drag handle */}
        <div className="flex-shrink-0 text-sage/40 cursor-grab active:cursor-grabbing pt-1">
          <GripVertical size={16} />
        </div>

        {/* Sequence number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-sage to-sunset flex items-center justify-center text-white font-bold text-sm">
          {stop.sequence}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-left">
          <h4 className="font-bold text-ink truncate">{stop.name || 'Stop'}</h4>
          <p className="text-xs text-ink/60 line-clamp-1">{stop.address}</p>
        </div>

        {/* Time badge */}
        <div className="flex-shrink-0 flex items-center gap-1 bg-gold/20 px-3 py-1 rounded-full">
          <Clock size={14} className="text-gold" />
          <span className="text-xs font-bold text-gold">{stop.duration.minutes}m</span>
        </div>

        {/* Expand indicator */}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          className="flex-shrink-0 text-sage/40"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-sage/10 bg-cream/30 overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {/* Dwell time selector */}
              <div>
                <label className="text-xs font-bold text-ink/60 uppercase tracking-wide mb-2 block">
                  How long will you stay?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(Object.entries(DWELL_TIME_OPTIONS) as [DwellTimeOption, any][]).map(
                    ([option, config]) => (
                      <motion.button
                        key={option}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onUpdateDwellTime(option)}
                        className={`py-2 px-3 rounded-xl font-bold text-xs transition-all ${
                          stop.duration.option === option
                            ? 'bg-sage text-cream'
                            : 'bg-white border-2 border-sage/20 text-ink hover:border-sage/40'
                        }`}
                      >
                        {config.label}
                      </motion.button>
                    )
                  )}
                </div>
              </div>

              {/* Cost info */}
              {costTillHere && (
                <div className="bg-white rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-ink/70">
                    <DollarSign size={16} />
                    <span className="text-sm font-medium">Cost until here</span>
                  </div>
                  <span className="font-bold text-lg text-sage">{costTillHere}K TZS</span>
                </div>
              )}

              {/* Time impact */}
              <div className="bg-white rounded-xl p-3 flex items-center justify-between text-ink/70">
                <div className="flex items-center gap-2">
                  <Zap size={16} />
                  <span className="text-sm font-medium">Time added</span>
                </div>
                <span className="font-bold">+{stop.duration.minutes + 3} min</span>
              </div>

              {/* Remove button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onRemove}
                className="w-full py-3 px-4 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <X size={16} />
                Remove stop
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
