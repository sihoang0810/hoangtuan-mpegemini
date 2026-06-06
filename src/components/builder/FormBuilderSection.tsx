import React, { useState } from 'react';
import { Sparkles, Send, Clock, CheckCircle } from 'lucide-react';

interface FormField {
  id: string;
  label: string;
  placeholder: string;
  isRequired: boolean;
  isEnabled: boolean;
}

interface FormBuilderSectionProps {
  formTitle?: string;
  formButtonText?: string;
  formFields?: FormField[];
  locationSlug?: string;
  onSimulatedFormSubmit?: (data: any) => void;
}

export function FormBuilderSection({
  formTitle = 'Yêu Cầu Khảo Sát Rò Rỉ Nước Miễn Phí',
  formButtonText = 'NHẬN KHẢO SÁT & BÁO GIÁ NGAY',
  formFields,
  locationSlug = 'ho-chi-minh',
  onSimulatedFormSubmit,
}: FormBuilderSectionProps) {
  const fields = (formFields || [
    { id: 'name', label: 'Họ và tên khách', placeholder: 'Họ tên của bạn...', isRequired: true, isEnabled: true },
    { id: 'phone', label: 'Số điện thoại', placeholder: '09xx xxx xxx...', isRequired: true, isEnabled: true },
    { id: 'service', label: 'Cần sửa chữa gì?', placeholder: 'Chọn hạng mục...', isRequired: true, isEnabled: true },
    { id: 'address', label: 'Địa chỉ nhà riêng', placeholder: 'Khu vực thi công...', isRequired: true, isEnabled: true },
    { id: 'notes', label: 'Ghi chú thêm', placeholder: 'Chi tiết hiện tượng rỏ rỉ của bạn...', isRequired: false, isEnabled: true }
  ]).map(f => ({
    id: f.id,
    type: f.id === 'service' ? 'select' : f.id === 'notes' ? 'textarea' : f.id === 'phone' ? 'tel' : 'text',
    label: f.label,
    placeholder: f.placeholder,
    isRequired: f.isRequired !== false,
    isEnabled: f.isEnabled !== false,
    options: f.id === 'service' ? ['Sửa điện', 'Sửa chập điện', 'Sửa nước', 'Sửa rò rỉ nước', 'Siêu âm đường ống', 'Dò tìm rò rỉ nước', 'Lắp / Sửa Camera', 'Khác'] : undefined
  }));

  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleFormChange = (fieldId: string, val: string) => {
    setFormInputs(prev => ({ ...prev, [fieldId]: val }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setTimeout(() => {
      setIsFormSubmitting(false);
      setFormSubmitted(true);
      if (onSimulatedFormSubmit) {
        onSimulatedFormSubmit(formInputs);
      }
      setFormInputs({});
    }, 1200);
  };

  return (
    <section className="section-container bg-transparent relative overflow-hidden" id="section-form-builder">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="max-w-xl mx-auto relative z-10 w-full">
        <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 shadow-2xl font-sans">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] bg-sky-500/10 text-sky-600 rounded-full font-black tracking-wider uppercase mb-3 font-sans">
              <Sparkles size={10} /> ĐĂNG KÝ ONLINE PHẢN HỒI NHANH
            </span>
            <h3 className="text-2xl font-black text-slate-800 leading-snug font-sans">{formTitle}</h3>
            <p className="text-xs text-slate-500 mt-1 font-sans">Thông tin được bảo mật cực kỳ an toàn</p>
          </div>

          {!formSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans">
              {fields.filter(f => f.isEnabled).map((f) => (
                <div key={f.id} className="space-y-1 font-sans">
                  <label className="text-xs font-extrabold text-slate-700 flex items-center justify-between font-sans">
                    <span>{f.label} {f.isRequired && <span className="text-red-500">*</span>}</span>
                  </label>

                  {f.type === 'select' ? (
                    <select
                      required={f.isRequired}
                      value={formInputs[f.id] || ''}
                      onChange={(e) => handleFormChange(f.id, e.target.value)}
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-sky-500 focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold text-slate-800 font-sans"
                    >
                      <option value="" disabled className="font-sans">{f.placeholder || 'Vui lòng chọn...'}</option>
                      {f.options?.map((opt, oIdx) => (
                        <option key={oIdx} value={opt} className="font-sans">{opt}</option>
                      ))}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      required={f.isRequired}
                      placeholder={f.placeholder}
                      value={formInputs[f.id] || ''}
                      onChange={(e) => handleFormChange(f.id, e.target.value)}
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-sky-500 focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold resize-none font-sans"
                    />
                  ) : (
                    <input
                      type={f.type}
                      required={f.isRequired}
                      placeholder={f.placeholder}
                      value={formInputs[f.id] || ''}
                      onChange={(e) => handleFormChange(f.id, e.target.value)}
                      className="w-full bg-slate-50/80 border border-slate-200 focus:border-sky-500 focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold font-sans"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isFormSubmitting}
                className="w-full py-4 px-6 bg-sky-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-sky-600 active:scale-95 transition-all shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 font-sans"
              >
                {isFormSubmitting ? (
                  <>
                    <Clock className="animate-spin text-white" size={16} /> Đang kiểm tra dữ liệu...
                  </>
                ) : (
                  <>
                    <Send size={15} /> {formButtonText}
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="py-8 px-4 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-xl">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900">Yêu Cầu Đã Gửi Thành Công!</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
                Kỹ thuật viên khu vực <strong>{locationSlug === 'ho-chi-minh' ? 'TP. Hồ Chí Minh' : 'Bảo Lộc, Lâm Đồng'}</strong> sẽ gọi lại cho bạn sau một vài phút.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="text-[10px] font-black tracking-wider uppercase bg-slate-100 hover:bg-slate-200 px-4 py-2 text-slate-600 rounded-xl transition-all"
              >
                Gửi yêu cầu mới
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
