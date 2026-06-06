import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Droplet, Video, Search, ChevronUp, Menu, Cpu } from 'lucide-react';

const NAV_ITEMS = [
  {
    id: 'electrical',
    label: 'Điện dân dụng',
    icon: Zap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-100',
    accentColor: 'blue'
  },
  {
    id: 'plumbing',
    label: 'Nước dân dụng',
    icon: Droplet,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-100',
    accentColor: 'cyan'
  },
  {
    id: 'camera',
    label: 'Camera giám sát',
    icon: Video,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-100',
    accentColor: 'indigo'
  },
  {
    id: 'detection',
    label: 'Dò tìm rò rỉ nước',
    icon: Search,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    accentColor: 'amber'
  },
  {
    id: 'smarthome',
    label: 'Nhà thông minh',
    icon: Cpu,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-100',
    accentColor: 'emerald'
  }
];

export default function ServiceNav() {
  const [activeCategory, setActiveCategory] = useState<string>('electrical');
  const [showFab, setShowFab] = useState<boolean>(false);
  const [isFabOpen, setIsFabOpen] = useState<boolean>(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBtnRef = useRef<HTMLButtonElement | null>(null);

  // 1. Detect scroll position to show/hide the compact floating button menu on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        setShowFab(true);
      } else {
        setShowFab(false);
        setIsFabOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Track active sections via IntersectionObserver
  useEffect(() => {
    const ids = NAV_ITEMS.map(item => item.id);
    const elements = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];

    const observerOptions = {
      root: null,
      rootMargin: '-10% 0px -70% 0px', // Scans topmost portion of visual viewport
      threshold: [0, 0.1, 0.3, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.05) {
          setActiveCategory(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach((el) => observer.observe(el));

    // Fast scroll/top-boundary fallbacks to make sure active highlights are always 100% correct
    const handleScrollBoundary = () => {
      if (window.scrollY < 150) {
        setActiveCategory('electrical');
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150) {
        setActiveCategory('smarthome');
      }
    };

    window.addEventListener('scroll', handleScrollBoundary, { passive: true });

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScrollBoundary);
    };
  }, []);

  // 3. Keep active mobile buttons aligned inside scroll view
  useEffect(() => {
    if (activeBtnRef.current && containerRef.current) {
      const activeBtn = activeBtnRef.current;
      const scrollContainer = containerRef.current.querySelector('.mobile-scroll-container');
      if (scrollContainer) {
        const containerWidth = scrollContainer.clientWidth;
        const btnLeft = activeBtn.offsetLeft;
        const btnWidth = activeBtn.clientWidth;
        
        scrollContainer.scrollTo({
          left: btnLeft - containerWidth / 2 + btnWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  const handleNavClick = (id: string) => {
    setActiveCategory(id);
    setIsFabOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const navBarHeight = 60; // Estimated height of compact nav bar
      
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - navBarHeight + 4;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth'
      });
    }
  };

  const activeItem = NAV_ITEMS.find(item => item.id === activeCategory) || NAV_ITEMS[0];

  return (
    <>
      {/* Category Navigation Bar */}
      <div 
        ref={containerRef}
        // Sub nav is sticky with constant top-20 offset and high-tier solid styling to prevent bleed-through
        className="sticky top-20 z-40 w-full bg-white border-b border-slate-200/90 shadow-md py-0"
      >
        <div className="section-container !p-6 md:!p-6">
          <div className="relative">
            {/* Horizontal sliding row for mobile, space-around flex arrangement for items */}
            <div 
              className="mobile-scroll-container overflow-x-auto scrollbar-none flex whitespace-nowrap w-full justify-around px-1 py-1"
              style={{ justifyContent: 'space-around' }}
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeCategory === item.id;
                
                return (
                  <button
                    key={item.id}
                    ref={isActive ? activeBtnRef : null}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative flex items-center gap-2.5 px-4.5 py-3 rounded-2xl font-bold text-sm tracking-tight transition-all duration-300 select-none cursor-pointer border ${
                      isActive 
                        ? 'bg-brand-secondary text-white border-brand-secondary shadow-md shadow-brand-secondary/15 scale-[1.01]' 
                        : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-100/70 hover:text-brand-secondary hover:border-slate-200'
                    }`}
                    style={{ touchAction: 'manipulation' }}
                  >
                    {/* Icon Accent Box */}
                    <div className={`p-1.5 rounded-lg transition-colors shrink-0 ${
                      isActive ? 'bg-white/10 text-brand-primary' : `${item.bgColor} ${item.color}`
                    }`}>
                      <item.icon size={15} strokeWidth={2.5} />
                    </div>
                    
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Horizontal scroll hint fades on mobile views */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white via-white/20 to-transparent md:hidden opacity-40" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white via-white/20 to-transparent md:hidden opacity-80" />
          </div>
        </div>
      </div>

      {/* Mobile-Only Interactive Floating Action Compact Quick-Switch Menu */}
      <AnimatePresence>
        {showFab && (
          <div className="md:hidden fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 select-none">
            
            {/* Quick Switch Button Options List */}
            <AnimatePresence>
              {isFabOpen && (
                <>
                  {/* Background overlay that safely exits FAB when tapped */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFabOpen(false)}
                    className="fixed inset-0 bg-slate-950/20 backdrop-blur-[1px] z-49"
                  />
                  
                  {/* Expanded vertical list items */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 15 }}
                    className="relative z-50 flex flex-col gap-2.5 bg-white p-3.5 rounded-3xl shadow-2xl border border-slate-100 min-w-[200px]"
                  >
                    <div className="text-[10px] font-bold text-slate-400 tracking-wider uppercase px-2 mb-1">
                      Chuyển nhanh dịch vụ
                    </div>
                    
                    {NAV_ITEMS.map((item) => {
                      const isActive = activeCategory === item.id;
                      
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-left text-sm font-bold transition-all ${
                            isActive
                              ? 'bg-brand-secondary text-white'
                              : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${
                            isActive ? 'bg-white/15 text-white' : `${item.bgColor} ${item.color}`
                          }`}>
                            <item.icon size={14} strokeWidth={2.5} />
                          </div>
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Core Floating Action Trigger Button */}
            <motion.button
              layout
              onClick={() => setIsFabOpen(!isFabOpen)}
              whileTap={{ scale: 0.92 }}
              className={`relative z-50 p-4 rounded-full shadow-2xl flex items-center justify-center border transition-all ${
                isFabOpen 
                  ? 'bg-slate-900 border-slate-800 text-white' 
                  : `${activeItem.bgColor} ${activeItem.borderColor} ${activeItem.color} border-2 hover:scale-105`
              }`}
              style={{ width: '56px', height: '56px', touchAction: 'manipulation' }}
            >
              <AnimatePresence mode="wait">
                {isFabOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronUp size={24} strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="icon"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <activeItem.icon size={22} strokeWidth={2.5} />
                    {/* Miniature ping to denote actionability */}
                    <span className="absolute top-1 right-1 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}
