import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift } from 'lucide-react';
import { getPopups, CMSPopup } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';

export default function PromoPopup() {
  const { showPopup } = useLocation();
  const [popup, setPopup] = useState<CMSPopup | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (showPopup) {
      // Don't show or schedule the promo popup if location chooser is active
      setIsVisible(false);
      return;
    }

    let active = true;
    let timerId: NodeJS.Timeout;

    getPopups().then(data => {
      if (!active) return;
      if (data && data.isActive) {
        setPopup(data);
        // Enforce a minimum delay of 15 seconds for optimal SEO/Core Web Vitals and UX
        const finalDelay = Math.max(data.delaySeconds || 3, 15);
        timerId = setTimeout(() => {
          setIsVisible(true);
        }, finalDelay * 1000);
      }
    });

    return () => {
      active = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [showPopup]);

  if (!popup) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md transition-all border border-slate-100 hover:scale-105 active:scale-95"
            >
              <X size={20} />
            </button>

            {/* Banner Top Graphic */}
            <div className="bg-gradient-to-br from-brand-primary/20 via-brand-accent/15 to-white pt-10 pb-8 px-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
              <div className="mx-auto w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-brand-primary/20 mb-4 animate-bounce">
                <Gift size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-brand-secondary uppercase tracking-tight">
                {popup.title}
              </h3>
              <p className="text-slate-500 text-sm font-semibold max-w-sm mx-auto mt-2 leading-relaxed">
                {popup.subtitle}
              </p>
            </div>

            {popup.image && (
              <div className="px-8 pb-4">
                <img
                  src={popup.image}
                  alt={popup.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-44 object-cover rounded-2xl border border-slate-100 shadow-inner"
                  loading="lazy"
                  decoding="async"
                  width={512}
                  height={176}
                />
              </div>
            )}

            {/* Actions */}
            <div className="p-8 pt-4 text-center bg-slate-50 border-t border-slate-100">
              <a
                href={popup.ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsVisible(false)}
                className="inline-flex w-full items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-brand-primary/15 whitespace-nowrap active:scale-95 scroll-smooth"
              >
                {popup.ctaText || 'Nhận ưu đãi'}
              </a>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.1em] mt-3">
                * Ưu đãi áp dụng có giới hạn trong tuần
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
