import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from '../context/LocationContext';
import { LOCATIONS } from '../constants';
import BookingModal from './BookingModal';
import { useAnalytics } from '../hooks/useAnalytics';

const ZaloIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} fillRule="evenodd" clipRule="evenodd">
    <path d="M12.003 2C6.443 2 2 6.443 2 12.003c0 2.115.65 4.075 1.765 5.7L2 22l4.475-1.472a9.92 9.92 0 0 0 5.528 1.475c5.56 0 10.003-4.443 10.003-10.003C22.006 6.443 17.563 2 12.003 2ZM15 14H10.5L15 8.75V7.5H9V9H13.5L9 14.25V15.5H15V14Z" />
  </svg>
);

export default function FloatingContact() {
  const { locationSlug, locations } = useLocation();
  const activeLocations = locations.length > 0 ? locations : LOCATIONS;
  const { trackEvent } = useAnalytics();
  
  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const currentLocationInfo = activeLocations.find(l => l.name === mappedDisplayName) || activeLocations[0];
  const phoneNo = currentLocationInfo?.hotline ? currentLocationInfo.hotline.replace(/[.\s]/g, '') : '0389011315';
  const zaloUrl = `https://zalo.me/${phoneNo}`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // If the top of the footer enters the screen height, hide CTA
        if (footerRect.top < window.innerHeight) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        // Fallback scroll-to-bottom calculation
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        if (totalHeight - scrollPosition < 120) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial layout on screen load
    handleScroll();

    // Setup an interval to recheck occasionally in case of dynamic DOM load or viewport height updates
    const intervalId = setInterval(handleScroll, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} locationSlug={locationSlug} />
      
      {/* Desktop Floating Buttons */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed bottom-8 right-8 z-[60] hidden md:flex flex-col gap-4"
          >
            {/* Booking Button */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg text-brand-secondary font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100"
              >
                Đặt Lịch Khảo Sát
              </motion.div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                aria-label="Đặt Lịch Khảo Sát"
                className="relative w-14 h-14 bg-brand-primary text-white rounded-full shadow-xl flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
              >
                <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-25 group-hover:opacity-40"></span>
                <Calendar size={24} className="relative z-10" />
              </motion.button>
            </div>

            {/* Zalo Button */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg text-brand-secondary font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100"
              >
                Chat Zalo
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={zaloUrl}
                onClick={() => trackEvent('contact_click', { type: 'zalo', location: mappedDisplayName, context: 'floating_desktop' })}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat Zalo"
                className="w-14 h-14 bg-white text-[#0068ff] rounded-full shadow-xl flex items-center justify-center hover:bg-[#0068ff] hover:text-white transition-all border border-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0068ff] focus-visible:ring-offset-2"
              >
                <ZaloIcon />
              </motion.a>
            </div>

            {/* Phone Button */}
            <div className="relative group">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1 rounded-lg shadow-lg text-brand-secondary font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-slate-100"
              >
                Gọi Ngay
              </motion.div>
              <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                href={`tel:${phoneNo}`}
                onClick={() => trackEvent('contact_click', { type: 'phone', location: mappedDisplayName, context: 'floating_desktop' })}
                aria-label={`Gọi điện thoại hotline: ${phoneNo}`}
                className="relative w-14 h-14 bg-brand-accent text-white rounded-full shadow-xl flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
              >
                <Phone size={24} fill="currentColor" className="relative z-10" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Bar */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 20, stiffness: 180 }}
            className="fixed bottom-0 left-0 right-0 z-[60] md:hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-slate-100 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] pb-safe"
          >
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex flex-col items-center justify-center gap-1 bg-brand-primary text-white py-2 px-2 rounded-xl font-bold active:scale-95 transition-transform"
              >
                <Calendar size={18} />
                <span className="text-[10px] uppercase">Đặt Lịch</span>
              </button>
              <a 
                href={zaloUrl}
                onClick={() => trackEvent('contact_click', { type: 'zalo', location: mappedDisplayName, context: 'floating_mobile' })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center gap-1 bg-[#0068ff] text-white py-2 px-2 rounded-xl font-bold active:scale-95 transition-transform"
              >
                <ZaloIcon className="w-[18px] h-[18px]" />
                <span className="text-[10px] uppercase">Zalo</span>
              </a>
              <a 
                href={`tel:${phoneNo}`}
                onClick={() => trackEvent('contact_click', { type: 'phone', location: mappedDisplayName, context: 'floating_mobile' })}
                className="flex flex-col items-center justify-center gap-1 bg-brand-accent text-white py-2 px-2 rounded-xl font-bold active:scale-95 transition-transform shadow-lg shadow-brand-accent/20"
              >
                <Phone size={18} fill="currentColor" />
                <span className="text-[10px] uppercase">Gọi Ngay</span>
              </a>
            </div>
            <div className="text-center mt-2 hidden">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Hỗ trợ khẩn cấp 24/7 • Hoàng Tuấn MPE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
