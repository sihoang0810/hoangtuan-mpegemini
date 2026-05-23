import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Phone, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { getHomepageContent, getHomepageContentSync, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';

export default function Hero() {
  const { locationSlug } = useLocation();
  const [content, setContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));

  useEffect(() => {
    let active = true;
    setContent(getHomepageContentSync(locationSlug));
    getHomepageContent(locationSlug).then((data) => {
      if (active) setContent(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const heroTitle = content?.heroTitle || 'Sửa Điện Nước';
  const heroSubtitle = content?.heroSubtitle || 'Giải pháp sửa chữa điện nước gia đình nhanh chóng, uy tín và chuyên nghiệp. Chúng tôi xử lý mọi sự cố từ nhỏ đến phức tạp với đội ngũ thợ tay nghề cao.';
  const overlayText = content?.heroOverlayText || 'SẴN SÀNG PHỤC VỤ 24/7';

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-slate-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
              </span>
              {overlayText}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary leading-tight mb-6 tracking-tighter" dangerouslySetInnerHTML={{ __html: heroTitle.includes('\n') ? heroTitle.replace(/\n/g, '<br />') : heroTitle }} />
            
            <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: heroSubtitle }} />

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0389011315" className="btn-primary flex items-center justify-center gap-2 text-lg">
                <Phone size={20} />
                Gọi Ngay
              </a>
              <Link to={`/${locationSlug}/dich-vu`} className="btn-outline flex items-center justify-center gap-2 text-lg">
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

          {/* Right Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square bg-white rounded-[2rem] shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-brand-primary group-hover:scale-110 transition-transform">
                    <CheckCircle2 size={40} />
                  </div>
                  <p className="font-bold text-xl text-brand-secondary tracking-tight">Thợ Sửa Chữa Chuyên Nghiệp</p>
                  <p className="text-slate-500">Chất lượng được khẳng định</p>
                </div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800" 
                alt="Electrician working" 
                className="w-full h-full object-cover mix-blend-overlay opacity-60"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Experience Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 hidden lg:block">
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
