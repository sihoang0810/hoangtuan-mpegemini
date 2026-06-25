import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHomepageContent, getHomepageContentSync, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import InlineEdit from './InlineEdit';

import OptimizedImage from './OptimizedImage';
import realHeroRepairImg from '../assets/images/hero.png';

export default function Hero({ 
  cmsData,
  isEditable = false,
  onUpdateDraftField
}: { 
  cmsData?: any;
  isEditable?: boolean;
  onUpdateDraftField?: (field: string, value: any) => void;
}) {
  const { locationSlug } = useLocation();
  const [content, setContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImage = cmsData?.heroImage || (content as any)?.heroImage || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200";

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
      title: "Sửa Chữa Điện Nhanh",
      subtitle: "Xử lý chập điện, mất điện an toàn triệt để"
    },
    {
      image: "/bom-ap.jpg",
      title: "Sửa Nước & Bơm Tăng Áp",
      subtitle: "Giải quyết triệt để nước yếu, rò rỉ 24/7"
    },
    {
      image: "/images/sieu-am-do-tim-ong-vo.png",
      title: "Dò Rò Rỉ Nước Bằng Siêu Âm",
      subtitle: "Công nghệ dò tìm đường ống bục vỡ không đục phá"
    },
    {
      image: "/images/camera-.png",
      title: "Lắp Đặt Camera An Ninh",
      subtitle: "Camera chính hãng, sắc nét, giám sát từ xa tiện lợi"
    },
    {
      image: "/images/cua-cuon-thong-minh.png",
      title: "Cửa Cuốn & Thiết Bị Thông Minh",
      subtitle: "Điều khiển, đóng mở cửa cuốn qua điện thoại thông minh"
    }
  ];

  useEffect(() => {
    let active = true;
    setContent(getHomepageContentSync(locationSlug));
    if (!cmsData) {
      getHomepageContent(locationSlug).then((data) => {
        if (active && data) setContent(data);
      });
    }
    return () => {
      active = false;
    };
  }, [locationSlug, cmsData]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const heroTitle = cmsData?.heroTitle !== undefined ? cmsData.heroTitle : (content?.heroTitle || 'Sửa Điện Nước');
  const heroSubtitle = cmsData?.heroSubtitle !== undefined ? cmsData.heroSubtitle : (content?.heroSubtitle || 'Giải pháp sửa chữa điện nước gia đình nhanh chóng, uy tín và chuyên nghiệp. Chúng tôi xử lý mọi sự cố từ nhỏ đến phức tạp với đội ngũ thợ tay nghề cao.');
  const overlayText = cmsData?.heroOverlayText !== undefined ? cmsData.heroOverlayText : (content?.heroOverlayText || 'SẴN SÀNG PHỤC VỤ 24/7');


  return (
    <section 
      className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 bg-slate-950 text-white min-h-[85vh] flex items-center z-10 !bg-cover !bg-center !bg-no-repeat"
      style={{ 
        textShadow: '0 2px 8px rgba(0,0,0,0.35)',
        backgroundImage: `url('/images/imou-ngoai-troi2.jpg')`
      }}
    >
      {/* Background Gradients - elegantly dimmed for text readability */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {/* Left-to-right gradient to ensure text readability on the left, while showing the skyline/office on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/10 opacity-70" />
        
        {/* Bottom vertical masking gradient to seamlessly fade into adjacent page sections */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-4 md:pt-8 z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-gradient-to-r from-brand-primary/30 to-sky-500/10 text-white border border-brand-primary/60 rounded-full text-xs font-bold mb-5 md:mb-6 select-none shadow-[0_0_15px_rgba(2,132,199,0.25)] hover:shadow-[0_0_25px_rgba(2,132,199,0.4)] transition-all duration-300">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-400"></span>
              </span>
              <InlineEdit 
                value={overlayText}
                isEditable={isEditable}
                onSave={(val) => onUpdateDraftField?.('heroOverlayText', val)}
                className="font-black text-[10px] sm:text-xs tracking-wider uppercase text-sky-200"
                element="span"
              />
            </div>
            
            <InlineEdit 
              value={heroTitle}
              isEditable={isEditable}
              onSave={(val) => onUpdateDraftField?.('heroTitle', val)}
              className="font-extrabold text-white leading-[1.2] text-balance mb-5 md:mb-6 tracking-tight block text-3xl sm:text-4xl md:text-5xl lg:text-fluid-h1 drop-shadow-sm"
              element="h1"
              multiline={true}
            />
            
            <InlineEdit 
              value={heroSubtitle}
              isEditable={isEditable}
              onSave={(val) => onUpdateDraftField?.('heroSubtitle', val)}
              className="text-base sm:text-lg text-white mb-8 md:mb-10 max-w-lg leading-relaxed block text-balance md:text-left drop-shadow-sm"
              element="p"
              multiline={true}
            />

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="tel:0389011315" className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2.5 py-3.5 px-6 font-bold text-base shadow-lg shadow-brand-primary/10 hover:scale-[1.01] active:scale-[0.99] transition-all">
                <Phone size={18} className="shrink-0" />
                Gọi Ngay
              </a>
              <Link 
                to={`/${locationSlug}/dich-vu`} 
                onClick={() => console.log('Navigation target:', `/${locationSlug}/dich-vu`)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 py-3 px-6 font-semibold text-base text-brand-primary hover:text-brand-primary/80 bg-white hover:bg-slate-100 rounded-xl transition-all"
                style={{ textShadow: 'none' }}
              >
                Xem Dịch Vụ
                <ArrowRight size={18} className="shrink-0" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 lg:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { icon: Clock, text: "Có mặt sau 30 phút", color: "text-blue-600", bgColor: "#eff6ff" },
                { icon: ShieldCheck, text: "Thợ nhiều kinh nghiệm", color: "text-green-600", bgColor: "#f0fdf4" },
                { icon: CheckCircle2, text: "Báo giá trước khi sửa", color: "text-orange-600", bgColor: "#fff7ed" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center transition-all duration-250 hover:scale-[1.01]" style={{ gap: '14px', padding: '0px' }}>
                  <div 
                    className={`w-10 h-10 ${badge.color} rounded-xl flex items-center justify-center shrink-0 shadow-[0_3px_8px_rgba(0,0,0,0.12)]`}
                    style={{ backgroundColor: badge.bgColor }}
                  >
                    <badge.icon size={18} className="text-current" />
                  </div>
                  <span className="font-semibold text-left leading-snug text-white" style={{ fontSize: '0.875rem', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Placeholder (Now a Slider with Glasmorphism border) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden relative group border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                   key={currentSlide}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   transition={{ duration: 0.5 }}
                   className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10 transition-colors duration-500 bg-slate-950/40">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={36} />
                      </div>
                      <p className="font-bold text-xl text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] px-4 text-center">
                        {slides[currentSlide].title}
                      </p>
                      <p className="text-white font-semibold drop-shadow-[0_1px_8px_rgba(0,0,0,0.85)] px-4 text-center text-sm mt-1">
                        {slides[currentSlide].subtitle}
                      </p>
                    </div>
                  </div>
                  <OptimizedImage 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title} 
                    priority={true}
                    width={800}
                    height={800}
                    className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              <div className="absolute inset-x-0 bottom-6 flex justify-center gap-2 z-30">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentSlide === idx ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity z-30"
              >
                <ChevronRight size={24} />
              </button>
            </div>
            
            {/* Experience Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block z-20" style={{ textShadow: 'none' }}>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-brand-primary">10+</div>
                <div className="text-sm font-semibold text-slate-700">
                  Năm kinh nghiệm <br /> trong ngành
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
