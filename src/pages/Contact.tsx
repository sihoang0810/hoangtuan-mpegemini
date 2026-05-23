import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import FinalCTA from '../components/FinalCTA';
import { getContact, getIconComponent, CMSContact } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import { useLocation } from '../context/LocationContext';

export default function Contact() {
  const { locationSlug } = useLocation();
  const [data, setData] = useState<CMSContact | null>(null);

  useEffect(() => {
    let active = true;
    getContact(locationSlug).then(res => {
      if (active) setData(res);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const pageTitle = data?.pageTitle || 'Liên Hệ Với Chúng Tôi';
  const pageSubtitle = data?.pageSubtitle || 'Dù là sự cố nhỏ hay nhu cầu thi công lớn, chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7. Hãy điền thông tin hoặc liên hệ trực tiếp qua hotline.';
  
  const fields = data?.contactFields || [
    { icon: 'Phone', label: 'Hotline Kỹ Thuật (24/7)', val: '0389 011 315', desc: 'Có mặt ngay sau 30 phút' },
    { icon: 'Mail', label: 'Email Hỗ Trợ', val: 'hoangtuanmpe@gmail.com', desc: 'Phản hồi chi tiết cực nhanh' },
    { icon: 'MapPin', label: 'Trụ sở phục vụ', val: (locationSlug === 'ho-chi-minh' || locationSlug === 'ho-chi-minh') ? '528/17 Tô Ngọc Vân, Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao sire, Phường 3, Bảo Lộc, Lâm Đồng", desc: (locationSlug === 'ho-chi-minh' || locationSlug === 'ho-chi-minh') ? 'Chi nhánh Hồ Chí Minh phục vụ 24/7' : 'Trụ sở chính Bảo Lộc phục vụ 24/7' },
    { icon: 'Clock', label: 'Giờ làm việc', val: '24/7/365', desc: 'Làm việc cả ngày lễ & chủ nhật' },
  ];

  return (
    <div className="pt-24 md:pt-32">
      <PageSEO pageType="general" />
      <section className="section-container">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary mb-8 uppercase tracking-tighter" dangerouslySetInnerHTML={{ __html: pageTitle.includes('Chúng Tôi') ? pageTitle.replace('Chúng Tôi', '<span class="text-brand-primary">Chúng Tôi</span>') : pageTitle }} />
            <p className="text-lg text-slate-500 mb-12 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: pageSubtitle }} />

            <div className="space-y-8">
              {fields.map((item, idx) => {
                const IconComponent = getIconComponent(item.icon);
                return (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-14 h-14 shrink-0 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
                      <IconComponent size={28} />
                    </div>
                    <div>
                      <span className="block text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</span>
                      <span className="block text-xl font-bold text-brand-secondary mb-1">{item.val}</span>
                      {item.desc && <span className="block text-slate-500 text-sm font-medium">{item.desc}</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


          <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative">
             <h3 className="text-2xl font-bold text-brand-secondary mb-8">Gửi Yêu Cầu Cho Kỹ Thuật</h3>
             <form className="space-y-6">
               <div className="grid sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Họ và tên *</label>
                   <input type="text" placeholder="Nguyễn Văn A" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Số điện thoại *</label>
                   <input type="tel" placeholder="09xx xxx xxx" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Địa chỉ của bạn</label>
                 <input type="text" placeholder="Số nhà, đường, quận..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Nội dung sự cố</label>
                 <textarea rows={4} placeholder="Mô tả ngắn gọn sự cố bạn đang gặp phải..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary resize-none"></textarea>
               </div>
               <button className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3">
                 <Send size={24} />
                 Gửi Yêu Cầu Ngay
               </button>
             </form>
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
