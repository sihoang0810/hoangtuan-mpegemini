import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SERVICES } from '../data/services';
import FinalCTA from '../components/FinalCTA';
import { FAQSection } from '../components/ExtraSections';
import { BadgeCheck, Zap, Droplet, Video, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { getServices, getServicesSync, CMSService } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import { useLocation } from '../context/LocationContext';

const PRICE_CATEGORIES = [
  { id: 'electrical', title: 'Điện dân dụng', icon: Zap, color: 'bg-blue-500' },
  { id: 'plumbing', title: 'Nước dân dụng', icon: Droplet, color: 'bg-cyan-500' },
  { id: 'camera', title: 'Camera an ninh', icon: Video, color: 'bg-indigo-500' },
  { id: 'detection', title: 'Siêu âm dò tìm', icon: Search, color: 'bg-amber-500' },
];

export default function Pricing() {
  const { locationSlug } = useLocation();
  const [services, setServices] = useState<CMSService[]>(() => getServicesSync(locationSlug));

  useEffect(() => {
    let active = true;
    getServices(locationSlug).then(data => {
      if (active) setServices(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const priceItems = services.length > 0 ? services : SERVICES;

  return (
    <div id="pricing" className="pt-24 md:pt-32">
      <PageSEO pageType="general" />
      <section className="section-container bg-white">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
          >
            Bảng giá {new Date().getFullYear()}
          </motion.div>
          <h1 className="text-4xl md:text-7xl font-bold text-brand-secondary mb-8 uppercase tracking-tighter">
            Bảng Giá <span className="text-brand-primary">Dịch Vụ</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            Chúng tôi cam kết báo giá minh bạch, tuyệt đối không phát sinh chi phí sau khi đã thỏa thuận. Kiểm tra và báo giá MIỄN PHÍ trước khi thực hiện.
          </p>
        </div>

        <div className="space-y-16">
          {PRICE_CATEGORIES.map((cat, i) => (
            <motion.div 
              key={cat.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[3rem] p-4 md:p-1 border border-slate-100 shadow-2xl shadow-slate-200/50"
            >
              <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 ${cat.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200`}>
                      <cat.icon size={32} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-brand-secondary uppercase">{cat.title}</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Hỗ trợ 24/7 • Bảo hành 12 tháng</p>
                    </div>
                  </div>
                  <a href="tel:0389011315" className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all text-center">
                    Nhận báo giá
                  </a>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {priceItems.filter(s => s.category === cat.id).map(service => (
                    <div key={service.id} className="bg-white p-8 rounded-3xl border border-slate-100 group hover:border-brand-primary/30 transition-all">
                      <h3 className="text-xl font-bold text-brand-secondary mb-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                        {service.title}
                        <div className="w-1.5 h-1.5 bg-brand-primary rounded-full" />
                      </h3>
                      <div className="space-y-4">
                        {service.pricing.map((p, idx) => (
                          <div key={idx} className="flex justify-between items-center gap-4 group/row">
                            <span className="text-slate-600 font-bold text-sm group-hover/row:text-brand-primary transition-colors">{p.item}</span>
                            <div className="flex-grow border-b border-dotted border-slate-200" />
                            <span className="text-brand-primary font-bold text-sm whitespace-nowrap bg-brand-primary/5 px-3 py-1 rounded-lg">{p.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-brand-primary text-white p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden shadow-2xl shadow-brand-primary/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50 -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 bg-white text-brand-primary text-sm font-bold rounded-full mb-10 uppercase tracking-widest shadow-xl">
              <BadgeCheck size={20} />
              Cam kết giá tốt nhất
            </div>
            <h3 className="text-4xl md:text-6xl font-bold mb-8 uppercase leading-tight">
              Kiểm Tra & Báo Giá <br />
              <span className="text-brand-secondary underline decoration-white/30 underline-offset-8">Miễn Phí Tận Nơi</span>
            </h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium">
              Chúng tôi không thu phí nếu không sửa được. Mọi báo giá đều được kỹ thuật viên cung cấp bằng văn bản hoặc tin nhắn xác nhận trước khi làm.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="tel:0389011315" className="w-full sm:w-auto bg-brand-secondary text-white text-2xl px-12 py-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase">
                Gọi Ngay: 0389.011.315
              </a>
              <a href="https://zalo.me/0389011315" className="w-full sm:w-auto bg-white text-brand-primary text-2xl px-12 py-6 rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-2xl uppercase">
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
