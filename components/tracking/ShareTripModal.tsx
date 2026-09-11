'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Share2, Mail, MessageCircle, Lock } from 'lucide-react';

interface ShareTripModalProps {
  bookingId: string;
  isOpen: boolean;
  onClose: () => void;
  shareLink?: string;
  onGenerateLink?: () => Promise<string>;
}

export function ShareTripModal({
  bookingId,
  isOpen,
  onClose,
  shareLink: initialShareLink,
  onGenerateLink
}: ShareTripModalProps) {
  const [shareLink, setShareLink] = useState(initialShareLink);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateShareLink = async () => {
    if (shareLink) return; // Already generated

    setIsLoading(true);
    try {
      if (onGenerateLink) {
        const link = await onGenerateLink();
        setShareLink(link);
      } else {
        // Default endpoint
        const res = await fetch(`/api/bookings/${bookingId}/share`, {
          method: 'POST'
        });
        if (res.ok) {
          const data = await res.json();
          setShareLink(data.shareUrl);
        }
      }
    } catch (err) {
      console.error('Failed to generate share link:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareVia = (method: 'sms' | 'email' | 'whatsapp') => {
    if (!shareLink) return;

    const message = `Track my ride in real-time: ${shareLink}`;

    switch (method) {
      case 'sms':
        window.location.href = `sms:?body=${encodeURIComponent(message)}`;
        break;
      case 'email':
        window.location.href = `mailto:?subject=My Karibu Ride&body=${encodeURIComponent(message)}`;
        break;
      case 'whatsapp':
        window.location.href = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-sage/10 sticky top-0 bg-white rounded-t-3xl">
              <h2 className="text-2xl font-black text-ink flex items-center gap-3">
                <Share2 size={28} className="text-sunset" />
                Share trip
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-ink/5 rounded-full transition-colors"
              >
                <X size={20} className="text-ink/60" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div className="bg-cream rounded-2xl p-4 border border-sage/10">
                <p className="text-sm text-ink/70">
                  Generate a secure link to let friends and family track your ride in real-time. The link expires after your trip is completed.
                </p>
              </div>

              {/* Generate link section */}
              {!shareLink ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateShareLink}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-sage to-sage/80 text-cream font-bold py-4 rounded-2xl hover:shadow-lg transition-shadow disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-cream border-t-transparent rounded-full animate-spin" />
                      Generating link...
                    </>
                  ) : (
                    <>
                      <Share2 size={20} />
                      Generate share link
                    </>
                  )}
                </motion.button>
              ) : (
                <>
                  {/* Share link display */}
                  <div className="space-y-3">
                    {/* Link box */}
                    <div className="bg-cream rounded-2xl p-4 border-2 border-sage/20 flex items-center gap-3">
                      <Lock size={18} className="text-sage flex-shrink-0" />
                      <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="flex-1 bg-transparent text-sm text-ink/70 outline-none font-mono truncate"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className="flex-shrink-0 p-2 hover:bg-white rounded-lg transition-colors"
                      >
                        {copied ? (
                          <Check size={18} className="text-green-600" />
                        ) : (
                          <Copy size={18} className="text-sage" />
                        )}
                      </motion.button>
                    </div>

                    {/* Copy confirmation */}
                    {copied && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm text-green-600 font-medium flex items-center gap-2"
                      >
                        <Check size={16} />
                        Copied to clipboard!
                      </motion.p>
                    )}
                  </div>

                  {/* Share via options */}
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-ink/60 uppercase tracking-wide">
                      Share via
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => shareVia('whatsapp')}
                        className="bg-green-50 hover:bg-green-100 text-green-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        WhatsApp
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => shareVia('sms')}
                        className="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <MessageCircle size={18} />
                        SMS
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => shareVia('email')}
                        className="col-span-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <Mail size={18} />
                        Email
                      </motion.button>
                    </div>
                  </div>

                  {/* Security note */}
                  <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                    <p className="text-xs text-blue-900">
                      <strong>🔒 Secure:</strong> This link can only be viewed by people you share it with. It expires when your trip ends.
                    </p>
                  </div>
                </>
              )}

              {/* Additional info */}
              <div className="pt-4 border-t border-sage/10 space-y-2 text-xs text-ink/60">
                <p>✓ Real-time location tracking</p>
                <p>✓ ETA and driver info</p>
                <p>✓ Automatically expires after trip</p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
