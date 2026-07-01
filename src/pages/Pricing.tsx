import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES } from '../data/services';
import FinalCTA from '../components/FinalCTA';
import { FAQSection } from '../components/ExtraSections';
import { BadgeCheck, Zap, Droplet, Video, Search, Cpu, Hammer, Sun, Phone, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getServices, getServicesSync, CMSService } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import { useLocation } from '../context/LocationContext';

const PRICE_CATEGORIES = [
  { id: 'electrical', title: 'Điện dân dụng', icon: Zap, color: 'bg-blue-500', textColor: 'text-blue-500', activeBgColor: '#ea580c' },
  { id: 'plumbing', title: 'Nước dân dụng', icon: Droplet, color: 'bg-cyan-500', textColor: 'text-cyan-500', activeBgColor: '#0284c7' },
  { id: 'construction', title: 'Thi công trọn gói', icon: Hammer, color: 'bg-slate-500', textColor: 'text-slate-500', activeBgColor: '#64748b' },
  { id: 'solar', title: 'Đèn năng lượng', icon: Sun, color: 'bg-amber-500', textColor: 'text-amber-500', activeBgColor: '#d97706' },
  { id: 'camera', title: 'Camera giám sát', icon: Video, color: 'bg-indigo-500', textColor: 'text-indigo-500', activeBgColor: '#0f172a' },
  { id: 'detection', title: 'Dò tìm rò rỉ', icon: Search, color: 'bg-rose-500', textColor: 'text-rose-500', activeBgColor: '#e11d48' },
  { id: 'smarthome', title: 'Nhà thông minh', icon: Cpu, color: 'bg-emerald-500', textColor: 'text-emerald-500', activeBgColor: '#059669' },
];

export default function Pricing() {
  const { locationSlug } = useLocation();
  const [services, setServices] = useState<CMSService[]>(() => getServicesSync(locationSlug));
  const [activeSection, setActiveSection] = useState('electrical');
  const [showFloating, setShowFloating] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let active = true;
    getServices(locationSlug).then(data => {
      if (active) setServices(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  useEffect(() => {
    const handleScrollBoundary = () => {
      const currentScrollY = window.scrollY;

      // Determine header visibility based on scroll direction
      let visible = true;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          visible = false;
        } else {
          visible = true;
        }
      }
      lastScrollY.current = currentScrollY;

      // Double-check with DOM element class to override if already applied
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const isHidden = headerElement.classList.contains('-translate-y-full');
        setIsHeaderVisible(!isHidden);
      } else {
        setIsHeaderVisible(visible);
      }

      const electricalEl = document.getElementById('electrical');
      if (electricalEl) {
        const rect = electricalEl.getBoundingClientRect();
        setShowFloating(rect.top <= window.innerHeight * 0.6);
      } else {
        setShowFloating(false);
      }

      // Compute active section based on proximity to sticky header trigger point
      const ids = PRICE_CATEGORIES.map(cat => cat.id);
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const triggerPoint = headerHeight + 120;

      let matchedSection = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            matchedSection = id;
            break;
          }
        }
      }

      // Check boundaries
      if (window.scrollY < 120) {
        matchedSection = 'electrical';
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        matchedSection = ids[ids.length - 1];
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScrollBoundary, { passive: true });
    // Run initial check
    handleScrollBoundary();

    return () => {
      window.removeEventListener('scroll', handleScrollBoundary);
    };
  }, []);

  const handleFloatingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    
    const element = document.getElementById(id);
    if (element) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 10;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const priceItems = services.length > 0 ? services : SERVICES;

  return (
    <div id="pricing" className="pt-20 md:pt-28 relative">
      <PageSEO pageType="general" />

      {/* 1. Mobile Horizontal Floating Header Sub-Nav */}
      <div 
        className={`md:hidden fixed left-0 right-0 z-40 flex flex-row items-center justify-center gap-3 bg-white/95 backdrop-blur-md py-2 px-4 border-b border-slate-100 shadow-sm transition-all duration-300 overflow-x-auto scrollbar-none ${
          showFloating ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ 
          top: isHeaderVisible ? '80px' : '0px'
        }}
      >
        <div className="flex flex-row items-center gap-3 mx-auto">
          {PRICE_CATEGORIES.map((item, i) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                whileTap={{ scale: 0.95 }}
                href={`#${item.id}`}
                onClick={(e) => handleFloatingClick(e, item.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border shrink-0 ${
                  isActive 
                    ? 'text-white border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                style={{ backgroundColor: isActive ? item.activeBgColor : 'white' }}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* 2. Tablet & Desktop Vertical Floating Dock */}
      <div 
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-50 flex-col gap-4 transition-all duration-300 ${
          showFloating ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        style={{ left: 'max(16px, calc(50% - 640px - 64px))' }}
      >
        {PRICE_CATEGORIES.map((item, i) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <div key={i} className="relative group">
              {/* Premium Hover Tooltip Label */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white px-3.5 py-1.5 rounded-lg shadow-lg text-brand-secondary font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 z-50">
                {item.title}
              </div>

              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href={`#${item.id}`}
                onClick={(e) => handleFloatingClick(e, item.id)}
                className={`relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:text-brand-secondary hover:bg-slate-50'
                }`}
                style={{ backgroundColor: isActive ? item.activeBgColor : 'white' }}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-25" />
                )}
                <Icon size={20} className="relative z-10" />
              </motion.a>
            </div>
          );
        })}
      </div>

      <section className="section-container bg-white">
        <div className="text-center mb-10 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
          >
            Bảng giá {new Date().getFullYear()}
          </motion.div>
          <h1 className="font-bold text-brand-secondary mb-8 uppercase tracking-tight">
            Bảng Giá <span className="text-brand-primary">Dịch Vụ</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Chúng tôi cam kết báo giá minh bạch, tuyệt đối không phát sinh chi phí sau khi đã thỏa thuận. Kiểm tra và báo giá MIỄN PHÍ trước khi thực hiện.
          </p>
        </div>

        {/* Regular Category Shortcuts Row (Replacing static tabs to allow navigation scroll shortcuts) */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16 overflow-x-auto pb-4 no-scrollbar">
          {PRICE_CATEGORIES.map((cat) => {
            const isActive = activeSection === cat.id;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                onClick={(e) => handleFloatingClick(e, cat.id)}
                className={`flex items-center justify-center gap-3 px-5 py-3.5 rounded-2xl font-bold whitespace-nowrap transition-all border focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer select-none ${
                  isActive 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-xl shadow-brand-primary/20 scale-105' 
                    : 'bg-white text-slate-600 border-slate-100 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <div className={`${isActive ? 'text-white' : cat.textColor} transition-colors`}>
                  <cat.icon size={20} />
                </div>
                <span className="uppercase text-xs tracking-wider">{cat.title}</span>
              </a>
            );
          })}
        </div>

        {/* Content Area - Stacked vertically */}
        <div className="space-y-12 sm:space-y-16">
          {PRICE_CATEGORIES.map((cat) => {
            const items = priceItems.filter(s => s.category === cat.id);
            return (
              <section 
                key={cat.id} 
                id={cat.id} 
                className="scroll-mt-32 bg-slate-50 rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 md:p-12 border border-slate-100/50 shadow-sm relative overflow-hidden text-left"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 sm:mb-10 pb-6 border-b border-slate-200/40">
                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 shrink-0 ${cat.color} rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                      <cat.icon className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div>
                      <h2 className="font-bold text-lg sm:text-xl text-brand-secondary uppercase">{cat.title}</h2>
                      <p className="text-slate-500 font-bold text-[10px] sm:text-xs uppercase tracking-widest mt-0.5">Hỗ trợ 24/7 • Bảo hành 12 tháng</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 sm:gap-4 shrink-0 justify-start w-full md:w-auto">
                    <a href="tel:0389011315" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-brand-primary text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:scale-105 transition-all text-center whitespace-nowrap shadow-md shadow-brand-primary/20">
                      <Phone size={14} className="sm:w-4 sm:h-4" />
                      Gọi báo giá
                    </a>
                    <a href="https://zalo.me/0389011315" className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#0068ff] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:opacity-90 transition-all text-center whitespace-nowrap shadow-md">
                      <MessageCircle size={14} className="sm:w-4 sm:h-4" />
                      Zalo
                    </a>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                  {items.map(service => (
                    <div key={service.id} className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-3xl border border-slate-100 group hover:border-brand-primary/30 transition-all shadow-sm shadow-slate-100">
                      <h3 className="text-base sm:text-lg font-bold text-brand-secondary mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-50 flex justify-between items-center">
                        {service.title}
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full transition-transform group-hover:scale-150" />
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {service.pricing.map((p, idx) => (
                          <div key={idx} className="flex justify-between items-start sm:items-center gap-3 group/row">
                            <span className="text-slate-600 font-semibold text-xs sm:text-sm group-hover/row:text-brand-primary transition-colors flex-1 min-w-0 pr-1">
                              {p.item}
                            </span>
                            <div className="hidden sm:block flex-grow border-b border-dotted border-slate-200 group-hover/row:border-brand-primary/30 transition-colors" />
                            <span className="text-brand-primary font-bold text-xs sm:text-sm whitespace-nowrap bg-brand-primary/5 px-2 sm:px-3 py-1 rounded-md sm:rounded-lg border border-brand-primary/10 shrink-0 self-start sm:self-center">
                              {p.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {items.length === 0 && (
                    <div className="col-span-1 lg:col-span-2 text-center py-12 text-slate-500 font-medium bg-white rounded-3xl border border-slate-100">
                      Chưa có dữ liệu bảng giá cho hạng mục này. Vui lòng liên hệ để được báo giá trực tiếp.
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-3xl md:rounded-[4rem] text-center relative overflow-hidden shadow-2xl shadow-brand-primary/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white text-brand-primary text-sm font-bold rounded-full mb-10 uppercase tracking-widest shadow-xl">
              <BadgeCheck size={20} />
              Cam kết giá tốt nhất
            </div>
            <h3 className="font-bold mb-8 uppercase leading-snug text-balance">
              Kiểm Tra & Báo Giá <br />
              <span className="text-brand-secondary underline decoration-white/30 underline-offset-8">Miễn Phí Tận Nơi</span>
            </h3>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-10 font-medium">
              Chúng tôi không thu phí nếu không sửa được. Mọi báo giá đều được kỹ thuật viên cung cấp bằng văn bản hoặc tin nhắn xác nhận trước khi làm.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <a href="tel:0389011315" className="w-full sm:w-auto bg-brand-secondary text-white text-lg sm:text-2xl px-6 py-4 sm:px-12 sm:py-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase text-center">
                Gọi Ngay: 0389 011 315
              </a>
              <a href="https://zalo.me/0389011315" className="w-full sm:w-auto bg-white text-brand-primary text-lg sm:text-2xl px-6 py-4 sm:px-12 sm:py-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase text-center">
                Hotline Zalo
              </a>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <FinalCTA />
    </div>
  );
}
