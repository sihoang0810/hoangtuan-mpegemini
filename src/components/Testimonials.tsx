import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { getTestimonials, CMSTestimonial } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import { motion, AnimatePresence } from 'motion/react';

const getAvatarInitial = (name: string) => {
  if (!name) return 'K';
  const parts = name.trim().split(' ');
  const lastWord = parts[parts.length - 1];
  return lastWord ? lastWord.charAt(0).toUpperCase() : 'K';
};

const TestimonialAvatar = ({ src, name }: { src?: string; name: string }) => {
  const [imgError, setImgError] = useState(!src);
  const initials = getAvatarInitial(name);

  if (imgError || !src) {
    return (
      <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-lg select-none uppercase shrink-0 shadow-sm shadow-brand-primary/10">
        {initials}
      </div>
    );
  }

  return (
    <img 
      src={src} 
      alt={name} 
      onError={() => setImgError(true)}
      className="w-12 h-12 rounded-full bg-brand-primary/10 object-cover shrink-0"
      loading="lazy"
      decoding="async"
      width={48}
      height={48}
    />
  );
};

export default function Testimonials({ cmsData }: { cmsData?: any }) {
  const { locationSlug } = useLocation();
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    getTestimonials(locationSlug).then((data) => {
      if (active) {
        setTestimonials(data);
        setActiveIndex(0);
        setLoading(false);
      }
    }).catch(() => {
      if (active) setLoading(false);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  useEffect(() => {
    if (loading || testimonials.length <= 1 || isHovered) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [loading, testimonials.length, isHovered]);

  const heading = cmsData?.heading || "Ý Kiến Khách Hàng";
  const subheading = cmsData?.subheading || "Khách Hàng Nói Gì Về Chúng Tôi";

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const TestimonialSkeleton = () => (
    <div className="animate-pulse p-8 rounded-3xl bg-white border border-slate-100 shadow-xl relative min-h-[220px] flex flex-col justify-between">
      <div>
        <div className="flex gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-5 h-5 bg-slate-200 rounded-full" />
          ))}
        </div>
        <div className="space-y-3 mb-8">
          <div className="h-4 bg-slate-200 rounded w-full" />
          <div className="h-4 bg-slate-200 rounded w-11/12" />
          <div className="h-4 bg-slate-200 rounded w-4/5" />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-auto">
        <div className="w-12 h-12 bg-slate-200 rounded-full shrink-0" />
        <div className="space-y-2 w-1/2 flex-1">
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );

  return (
    <section 
      id="testimonials" 
      className="section-container bg-slate-50 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="text-center mb-12">
        <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">{heading}</p>
        <h2 className="text-3xl md:text-5xl font-black text-brand-secondary tracking-tight">
          {subheading}
        </h2>
      </div>

      {loading || testimonials.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <TestimonialSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="relative max-w-7xl mx-auto px-4 select-none">
          
          <div 
            className="relative flex items-center justify-center min-h-[420px] py-6 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop Carousel Layout with fluid horizontal sliding track */}
            <div className="hidden md:flex items-center justify-center w-full h-[410px] relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {testimonials.map((testimonial, idx) => {
                  const len = testimonials.length;
                  let diff = idx - activeIndex;
                  
                  // Circular normalization
                  if (diff < -len / 2) diff += len;
                  if (diff > len / 2) diff -= len;

                  const isCenter = diff === 0;
                  const isVisible = Math.abs(diff) <= 1.5;

                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={`desktop-slide-${testimonial.name}-${idx}`}
                      style={{
                        zIndex: isCenter ? 30 : 10,
                        position: 'absolute',
                      }}
                      initial={{
                        x: diff > 0 ? 500 : -500,
                        scale: 0.8,
                        opacity: 0,
                      }}
                      animate={{
                        x: diff * 390, // Responsive spacing relative to active item
                        scale: isCenter ? 1.05 : 0.88,
                        opacity: isCenter ? 1 : 0.45,
                        filter: isCenter ? 'drop-shadow(0 25px 50px rgba(14, 165, 233, 0.16))' : 'blur(0.5px)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                        mass: 0.8,
                      }}
                      onClick={() => {
                        if (!isCenter) setActiveIndex(idx);
                      }}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && !isCenter) {
                          e.preventDefault();
                          setActiveIndex(idx);
                        }
                      }}
                      tabIndex={isCenter ? -1 : 0}
                      role="button"
                      aria-label={`Xem đánh giá của ${testimonial.name}`}
                      className={`w-[360px] p-8 md:p-10 rounded-[2.5rem] flex flex-col justify-between h-[360px] cursor-pointer select-none transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-brand-primary ${
                        isCenter
                          ? 'bg-white border-2 border-brand-primary ring-8 ring-brand-primary/5'
                          : 'bg-white/75 border border-slate-100 hover:bg-white hover:opacity-100'
                      }`}
                    >
                      {/* Quote icon background */}
                      <div className={`absolute top-6 right-8 pointer-events-none transition-colors duration-300 ${
                        isCenter ? 'text-brand-primary/10' : 'text-slate-100/80'
                      }`}>
                        <svg width="60" height="48" viewBox="0 0 45 36" fill="currentColor">
                          <path d="M12.6 36L18.9 23.4V0H0V23.4H9L12.6 36ZM38.7 36L45 23.4V0H26.1V23.4H35.1L38.7 36Z" />
                        </svg>
                      </div>

                      <div>
                        <div className="flex gap-1 mb-5">
                          {[...Array(Math.max(0, Math.min(5, Math.floor(Number(testimonial.rating) || 5))))].map((_, i) => (
                            <Star 
                              key={i} 
                              size={18} 
                              fill="#F97316" 
                              className={`text-brand-accent ${isCenter ? 'animate-pulse' : ''}`} 
                            />
                          ))}
                        </div>

                        <p className={`mb-6 leading-relaxed font-semibold italic relative z-10 text-sm xl:text-base transition-colors duration-300 ${
                          isCenter ? 'text-slate-700' : 'text-slate-500'
                        }`}>
                          "{testimonial.review}"
                        </p>
                      </div>

                      <div className="flex items-center gap-4 relative z-10 mt-auto pt-4 border-t border-slate-50">
                        <TestimonialAvatar src={testimonial.avatar} name={testimonial.name} />
                        <div>
                          <h4 className="font-extrabold text-brand-secondary leading-tight text-sm xl:text-base">{testimonial.name}</h4>
                          <p className="text-[10px] xl:text-xs text-slate-500 font-bold mt-1 tracking-wider uppercase">{testimonial.role}</p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden w-full max-w-sm mx-auto relative z-10 px-2 min-h-[340px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                  className="bg-white border-2 border-brand-primary/80 p-8 rounded-3xl shadow-xl relative flex flex-col justify-between h-full min-h-[300px] ring-4 ring-brand-primary/5"
                >
                  <div className="absolute top-6 right-8 text-brand-primary/10 pointer-events-none">
                    <svg width="45" height="36" viewBox="0 0 45 36" fill="currentColor">
                      <path d="M12.6 36L18.9 23.4V0H0V23.4H9L12.6 36ZM38.7 36L45 23.4V0H26.1V23.4H35.1L38.7 36Z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex gap-1 mb-5">
                      {[...Array(Math.max(0, Math.min(5, Math.floor(Number(testimonials[activeIndex].rating) || 5))))].map((_, i) => (
                        <Star key={i} size={18} fill="#F97316" className="text-brand-accent animate-pulse" />
                      ))}
                    </div>

                    <p className="text-slate-700 text-sm mb-6 leading-relaxed font-semibold italic relative z-10">
                      "{testimonials[activeIndex].review}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 mt-auto pt-4 border-t border-slate-50">
                    <TestimonialAvatar src={testimonials[activeIndex].avatar} name={testimonials[activeIndex].name} />
                    <div>
                      <h4 className="font-extrabold text-brand-secondary leading-tight">{testimonials[activeIndex].name}</h4>
                      <p className="text-xs text-slate-500 font-bold mt-0.5 uppercase tracking-wider">{testimonials[activeIndex].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Elegant Floating Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between items-center px-2 md:px-4 hidden sm:flex pointer-events-none z-30">
            <button 
              onClick={handlePrev}
              aria-label="Đánh giá trước đó"
              className="w-12 h-12 rounded-full bg-white hover:bg-brand-primary text-slate-700 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer border border-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={handleNext}
              aria-label="Đánh giá tiếp theo"
              className="w-12 h-12 rounded-full bg-white hover:bg-brand-primary text-slate-700 hover:text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all pointer-events-auto cursor-pointer border border-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Navigation Indicators */}
          <div className="flex justify-center items-center gap-2.5 mt-8 relative z-20">
            {testimonials.map((_, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Chuyển đến đánh giá số ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
                    isActive 
                      ? 'w-8 bg-brand-primary shadow-sm shadow-brand-primary/40' 
                      : 'w-2.5 bg-slate-200 hover:bg-slate-300'
                  }`}
                />
              );
            })}
          </div>

        </div>
      )}
    </section>
  );
}
