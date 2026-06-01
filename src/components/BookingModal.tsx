import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle, Clock } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locationSlug: string;
}

export default function BookingModal({ isOpen, onClose, locationSlug }: BookingModalProps) {
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (id: string, val: string) => {
    setFormInputs(prev => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormInputs({});
    }, 1200);
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
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-20"
        >
          <X size={18} />
        </button>

        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] bg-brand-primary/10 text-brand-primary rounded-full font-black tracking-wider uppercase mb-3">
              <Sparkles size={10} /> ĐẶT LỊCH NHANH CHÓNG
            </span>
            <h3 className="text-2xl font-black text-brand-secondary leading-snug">Yêu Cầu Khảo Sát Tận Nơi</h3>
            <p className="text-xs text-slate-500 mt-1">15 - 30 phút thợ có mặt xử lý</p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  <span>Địa chỉ nhà riêng <span className="text-red-500">*</span></span>
                </label>
                <input 
                  type="text"
                  required
                  placeholder="Khu vực thi công..."
                  value={formInputs['address'] || ''}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold"
                />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-brand-primary text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-[#348bd6] active:scale-95 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="animate-spin text-white" size={16} /> Thợ đang kiểm tra dữ liệu...
                  </>
                ) : (
                  <>
                    <Send size={15} /> GỬI YÊU CẦU NGAY
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xl">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Yêu Cầu Đã Gửi Thành Công!</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Kỹ thuật viên khu vực <strong>{locationSlug === 'ho-chi-minh' ? 'TP. Hồ Chí Minh' : 'Lâm Đồng'}</strong> sẽ gọi lại báo giá cho bạn sau tối đa 10 phút.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-[10px] font-black tracking-wider uppercase bg-slate-100 hover:bg-slate-200 px-4 py-2 text-slate-600 rounded-xl transition-all"
              >
                Gửi yêu cầu mới
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
