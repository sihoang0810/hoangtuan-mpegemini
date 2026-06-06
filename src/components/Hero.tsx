import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHomepageContent, getHomepageContentSync, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import InlineEdit from './InlineEdit';

import OptimizedImage from './OptimizedImage';

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
      image: heroImage,
      title: "Thợ Sửa Chữa Chuyên Nghiệp",
      subtitle: "Chất lượng được khẳng định"
    },
    {
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1200",
      title: "Sửa Chữa Điện Nhanh Chóng",
      subtitle: "An toàn và tin cậy tuyệt đối"
    },
    {
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1200",
      title: "Dịch Vụ Nước 24/7",
      subtitle: "Xử lý triệt để mọi sự cố rò rỉ"
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
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ paddingTop: '24px' }}>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-6 select-none">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              <InlineEdit 
                value={overlayText}
                isEditable={isEditable}
                onSave={(val) => onUpdateDraftField?.('heroOverlayText', val)}
                className="font-bold text-sm tracking-wide uppercase"
                element="span"
              />
            </div>
            
            <InlineEdit 
              value={heroTitle}
              isEditable={isEditable}
              onSave={(val) => onUpdateDraftField?.('heroTitle', val)}
              className="font-bold text-brand-secondary leading-tight mb-6 tracking-tighter block"
              element="h1"
              multiline={true}
            />
            
            <InlineEdit 
              value={heroSubtitle}
              isEditable={isEditable}
              onSave={(val) => onUpdateDraftField?.('heroSubtitle', val)}
              className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed block"
              element="p"
              multiline={true}
            />

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0389011315" className="btn-primary flex items-center justify-center gap-2 text-lg">
                <Phone size={20} />
                Gọi Ngay
              </a>
              <Link 
                to={`/${locationSlug}/dich-vu`} 
                onClick={() => console.log('Navigation target:', `/${locationSlug}/dich-vu`)}
                className="btn-outline flex items-center justify-center gap-2 text-lg"
              >
                Xem Dịch Vụ
                <ArrowRight size={20} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: Clock, text: "Có mặt sau 30 phút", color: "text-blue-600", bg: "bg-blue-50" },
                { icon: ShieldCheck, text: "Thợ nhiều kinh nghiệm", color: "text-green-600", bg: "bg-green-50" },
                { icon: CheckCircle2, text: "Báo giá trước khi sửa", color: "text-orange-600", bg: "bg-orange-50" },
              ].map((badge, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${badge.bg} ${badge.color} rounded-lg flex items-center justify-center shadow-sm`}>
                    <badge.icon size={20} />
                  </div>
                  <span className="font-semibold text-sm text-slate-700">{badge.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Image Placeholder (Now a Slider) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 flex items-center justify-center z-10 transition-colors duration-500">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={40} />
                      </div>
                      <p className="font-bold text-xl text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,1)] px-4 text-center">
                        {slides[currentSlide].title}
                      </p>
                      <p className="text-white font-semibold drop-shadow-[0_2px_12px_rgba(0,0,0,1)] px-4 text-center">
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
                    className="w-full h-full object-cover opacity-50"
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
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block z-20">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold text-brand-primary">10+</div>
                <div className="text-sm font-semibold text-slate-600">
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
