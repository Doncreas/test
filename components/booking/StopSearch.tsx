'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, Clock, X, Loader } from 'lucide-react';
import { searchPlaces, calculateDistance } from '@/lib/places/search';
import { StopSearchResult, StopCategory } from '@/types/stop';

interface StopSearchProps {
  center?: { lat: number; lng: number };
  onSelect: (result: StopSearchResult) => void;
  onClose: () => void;
  category?: StopCategory;
  placeholder?: string;
}

export function StopSearch({ center, onSelect, onClose, category, placeholder }: StopSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<StopSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const searchResults = await searchPlaces(query, center, category, 10);
        
        // Sort by distance if center provided
        if (center) {
          searchResults.sort(
            (a, b) =>
              calculateDistance(center.lat, center.lng, a.lat, a.lng) -
              calculateDistance(center.lat, center.lng, b.lat, b.lng)
          );
        }

        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setIsLoading(false);
      }
    }, 500); // Debounce for 500ms
  }, [query, center, category]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col"
    >
      {/* Search bar */}
      <div className="flex-shrink-0 bg-white border-b border-sage/10 p-4 sm:p-6">
        <div className="relative flex items-center gap-3">
          <Search size={20} className="text-sage/60 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || 'Search for a stop...'}
            className="flex-1 bg-transparent outline-none text-ink text-lg font-medium"
          />
          {query && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setQuery('')}
              className="p-2 hover:bg-cream rounded-full text-sage/60 hover:text-sage transition-colors"
            >
              <X size={20} />
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 py-2 bg-cream rounded-xl font-semibold text-sage hover:bg-cream/80 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 sm:p-6 space-y-3 max-w-2xl mx-auto w-full">
          {isLoading && query.trim() && (
            <div className="flex items-center justify-center py-8">
              <Loader size={24} className="text-sage animate-spin" />
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          {query.trim() && results.length === 0 && !isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <MapPin size={40} className="text-sage/30 mx-auto mb-3" />
              <p className="text-ink/70 font-medium">No places found</p>
              <p className="text-sm text-ink/50">Try a different search term</p>
            </motion.div>
          )}

          {!query.trim() && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Search size={40} className="text-sage/30 mx-auto mb-3" />
              <p className="text-ink/70 font-medium">Search for stops</p>
              <p className="text-sm text-ink/50">Popular categories: bureau de change, supermarket, pharmacy, ATM</p>
            </motion.div>
          )}

          {/* Results list */}
          <AnimatePresence>
            {results.map((result, index) => (
              <SearchResultItem
                key={result.id}
                result={result}
                index={index}
                onSelect={() => {
                  onSelect(result);
                  onClose();
                }}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

interface SearchResultItemProps {
  result: StopSearchResult;
  index: number;
  onSelect: () => void;
}

function SearchResultItem({ result, index, onSelect }: SearchResultItemProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: index * 0.05 }}
      onClick={onSelect}
      whileHover={{ scale: 1.01, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="w-full text-left bg-white rounded-2xl p-4 border-2 border-sage/10 hover:border-sage/30 hover:shadow-md transition-all"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage/20 to-sage/10 flex items-center justify-center flex-shrink-0 text-lg">
          {getCategoryEmoji(result.category || 'custom')}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-ink truncate">{result.name}</h3>
          <p className="text-sm text-ink/60 line-clamp-1">{result.address}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2 flex-wrap text-xs text-ink/60">
            {result.rating && (
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-gold text-gold" />
                <span>{result.rating.toFixed(1)}</span>
              </div>
            )}

            {result.isOpen !== undefined && (
              <span className={result.isOpen ? 'text-green-600' : 'text-red-600'}>
                {result.isOpen ? 'Open' : 'Closed'}
              </span>
            )}

            {result.distance && (
              <div className="flex items-center gap-1">
                <MapPin size={12} />
                <span>{(result.distance / 1000).toFixed(1)} km</span>
              </div>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 text-sage/40">
          →
        </div>
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
