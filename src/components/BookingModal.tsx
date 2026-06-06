import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle, Clock, Phone } from 'lucide-react';
import { LOCATIONS } from '../constants';
import { useAnalytics } from '../hooks/useAnalytics';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationSlug: string;
}

export default function BookingModal({ isOpen, onClose, locationSlug }: BookingModalProps) {
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { trackEvent } = useAnalytics();

  // Track event: Modal Open
  useEffect(() => {
    if (isOpen) {
      trackEvent('booking_modal_open', { locationSlug });
    }
  }, [isOpen, locationSlug]);

  if (!isOpen) return null;

  // Find location config
  const locationConfig = LOCATIONS.find(l => l.id === locationSlug) || LOCATIONS[0];
  const hotlineRaw = locationConfig.hotline.replace(/\./g, '');

  const handleChange = (id: string, val: string) => {
    setFormInputs(prev => ({ ...prev, [id]: val }));
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate số điện thoại Việt Nam
    const phone = formInputs['phone'] || '';
    const phoneRegex = /^(0|\+84)(3[2-9]|5[6-9]|7[0|6-9]|8[0-9]|9[0-9])[0-9]{7}$/;
    
    if (!formInputs['name']?.trim()) {
      setError('Vui lòng nhập họ tên.');
      return;
    }
    
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      setError('Số điện thoại không hợp lệ. Ví dụ: 0389011315');
      return;
    }

    if (!formInputs['service']) {
      setError('Vui lòng chọn hạng mục cần sửa chữa.');
      return;
    }

    setIsSubmitting(true);

    // Track conversion event for form submit and contact click
    trackEvent('booking_form_submit', {
      location: locationConfig.name,
      service: formInputs['service'] || '',
      locationSlug
    });

    trackEvent('contact_click', {
      type: 'zalo',
      location: locationConfig.name,
      context: 'booking_modal_submit'
    });

    // Construct Zalo message
    const message = `Xin chào Hoàng Tuấn MPE!\nTôi cần đặt lịch khảo sát:\n- Khách hàng: ${formInputs['name']}\n- SĐT: ${phone}\n- Dịch vụ: ${formInputs['service']}\n- Địa chỉ: ${formInputs['address'] || 'Chưa cung cấp'}\n- Khu vực: ${locationConfig.name}`;
    const zaloUrl = `https://zalo.me/${hotlineRaw}?text=${encodeURIComponent(message)}`;

    // Fake a small delay for UX before opening Zalo
    setTimeout(() => {
      window.open(zaloUrl, '_blank');
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormInputs({});
    }, 800);
  };

  const services = ['Sửa điện', 'Sửa chập điện', 'Sửa nước', 'Sửa rò rỉ nước', 'Siêu âm đường ống', 'Dò tìm rò rỉ nước', 'Lắp / Sửa Camera', 'Khác'];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="bg-white rounded-2xl md:rounded-[2rem] w-full max-w-md relative z-10 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] bg-brand-primary/10 text-brand-primary rounded-full font-black tracking-wider uppercase mb-3">
              <Sparkles size={10} /> ĐẶT LỊCH KỸ THUẬT
            </span>
            <h3 className="font-black text-brand-secondary leading-snug">Yêu Cầu Khảo Sát Tận Nơi</h3>
            <p className="text-xs text-slate-500 mt-1">Hỗ trợ 24/7 khu vực {locationConfig.name}</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold rounded-xl animate-shake">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-brand-secondary flex items-center justify-between">
                  <span>Họ và tên khách <span className="text-red-500">*</span></span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Họ tên của bạn..."
                  value={formInputs['name'] || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-brand-secondary flex items-center justify-between">
                  <span>Số điện thoại <span className="text-red-500">*</span></span>
                </label>
                <input 
                  type="tel"
                  required
                  placeholder="09xx xxx xxx..."
                  value={formInputs['phone'] || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-brand-secondary flex items-center justify-between">
                  <span>Cần sửa chữa gì? <span className="text-red-500">*</span></span>
                </label>
                <select 
                  required
                  value={formInputs['service'] || ''}
                  onChange={(e) => handleChange('service', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold text-slate-800"
                >
                  <option value="" disabled>Chọn hạng mục...</option>
                  {services.map((opt, idx) => (
                    <option key={idx} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-brand-secondary flex items-center justify-between">
                  <span>Địa chỉ nhà riêng</span>
                </label>
                <input 
                  type="text"
                  placeholder="Khu vực thi công..."
                  value={formInputs['address'] || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold"
                />
              </div>

              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-brand-primary text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-[#348bd6] active:scale-95 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="animate-spin" size={16} /> Đang khởi tạo Zalo...
                    </>
                  ) : (
                    <>
                      <Send size={15} /> GỬI YÊU CẦU QUA ZALO
                    </>
                  )}
                </button>
                <p className="text-[10px] text-center text-slate-400 mt-4 font-medium">
                  Hoặc gọi trực tiếp: <a href={`tel:${hotlineRaw}`} onClick={() => trackEvent('contact_click', { type: 'phone', location: locationConfig.name, context: 'booking_modal_direct' })} className="text-brand-primary font-black underline decoration-2 underline-offset-4">{locationConfig.hotline}</a>
                </p>
              </div>
            </form>
          ) : (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xl shadow-emerald-600/10">
                <CheckCircle size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-900">Zalo Đã Được Mở!</h4>
                <p className="text-[12px] text-slate-500 leading-relaxed max-w-xs mx-auto font-medium">
                  Vui lòng nhấn <strong>"Gửi"</strong> trong Zalo để gửi thông tin cho kỹ thuật viên tại <strong>{locationConfig.name}</strong>.
                </p>
              </div>
              
              <div className="space-y-3">
                <a 
                  href={`tel:${hotlineRaw}`}
                  onClick={() => trackEvent('contact_click', { type: 'phone', location: locationConfig.name, context: 'booking_modal_success' })}
                  className="w-full py-4 px-6 bg-slate-900 text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-slate-800 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <Phone size={15} /> GỌI ĐIỆN XÁC NHẬN NGAY
                </a>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="text-[10px] font-black tracking-wider uppercase text-slate-400 hover:text-slate-600 transition-all"
                >
                  Quay lại form đặt lịch
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
