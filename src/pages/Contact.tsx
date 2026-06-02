import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import FinalCTA from '../components/FinalCTA';
import { getContact, getIconComponent, CMSContact } from '../lib/sanity';
import PageSEO from '../components/PageSEO';
import { useLocation } from '../context/LocationContext';

export default function Contact() {
  const { locationSlug } = useLocation();
  const [data, setData] = useState<CMSContact | null>(null);

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate số điện thoại Việt Nam
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/;
    if (!formData.name.trim()) { setError('Vui lòng nhập họ tên.'); return; }
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) { 
      setError('Số điện thoại Việt Nam không hợp lệ. VD: 0389011315'); return; 
    }
    
    setSubmitting(true);
    
    // Mở Zalo với nội dung pre-filled (ưu tiên Zalo cho web VN)
    const zaloMsg = encodeURIComponent(`Xin chào Hoàng Tuấn MPE!\nTôi là ${formData.name}, SĐT: ${formData.phone}\nĐịa chỉ: ${formData.address}\nNội dung: ${formData.message}`);
    window.open(`https://zalo.me/0389011315?text=${zaloMsg}`, '_blank');
    
    setSubmitted(true);
    setSubmitting(false);
  };

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
    { icon: 'MapPin', label: 'Trụ sở phục vụ', val: (locationSlug === 'ho-chi-minh') ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng", desc: (locationSlug === 'ho-chi-minh') ? 'Chi nhánh Hồ Chí Minh phục vụ 24/7' : 'Trụ sở chính Bảo Lộc phục vụ 24/7' },
    { icon: 'Clock', label: 'Giờ làm việc', val: '24/7/365', desc: 'Làm việc cả ngày lễ & chủ nhật' },
  ];

  return (
    <div id="contact" className="pt-24 md:pt-32">
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
                      <span className="block text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{item.label}</span>
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
             {submitted ? (
               <div className="text-center py-12 animate-fade-in">
                 <CheckCircle2 size={64} className="mx-auto text-green-500 mb-4" />
                 <h3 className="text-2xl font-bold text-brand-secondary mb-2">Gửi thành công!</h3>
                 <p className="text-slate-500">Chúng tôi sẽ liên hệ lại trong vòng 30 phút. Hoặc gọi ngay: <a href="tel:0389011315" className="text-brand-primary font-bold">0389 011 315</a></p>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                 {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}
                 <div className="grid sm:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Họ và tên *</label>
                     <input type="text" required value={formData.name} onChange={e => setFormData(p => ({...p, name: e.target.value}))} placeholder="Nguyễn Văn A" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-700">Số điện thoại *</label>
                     <input type="tel" required value={formData.phone} onChange={e => setFormData(p => ({...p, phone: e.target.value}))} placeholder="0389 011 315" className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Địa chỉ của bạn</label>
                   <input type="text" value={formData.address} onChange={e => setFormData(p => ({...p, address: e.target.value}))} placeholder="Số nhà, đường, quận..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-slate-700">Nội dung sự cố</label>
                   <textarea rows={4} value={formData.message} onChange={e => setFormData(p => ({...p, message: e.target.value}))} placeholder="Mô tả ngắn gọn sự cố bạn đang gặp phải..." className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:border-brand-primary resize-none" />
                 </div>
                 <button type="submit" disabled={submitting} className="btn-primary w-full py-5 text-xl flex items-center justify-center gap-3 disabled:opacity-60">
                   <Send size={24} />
                   {submitting ? 'Đang gửi...' : 'Gửi Yêu Cầu Qua Zalo'}
                 </button>
                 <p className="text-xs text-center text-slate-500">Hoặc gọi trực tiếp: <a href="tel:0389011315" className="text-brand-primary font-bold">0389 011 315</a> (24/7)</p>
               </form>
             )}
          </div>
        </div>
      </section>
      <FinalCTA />
    </div>
  );
}
