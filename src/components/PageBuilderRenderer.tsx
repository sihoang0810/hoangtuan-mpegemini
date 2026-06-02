import React, { useState, useEffect, useRef } from 'react';
import Hero from './Hero';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ProcessTimeline, { FAQSection } from './ExtraSections';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonials';
import Blog from './Blog';
import FinalCTA from './FinalCTA';
import { 
  Phone, Mail, MapPin, Globe, Menu, X, Check, ArrowRight, Sparkles, 
  Send, Calendar, User, FileText, Image as ImageIcon, CheckCircle, Clock, ShieldCheck
} from 'lucide-react';

export interface CMSSection {
  _type: string;
  _key: string;
  isActive?: boolean;
  [key: string]: any;
}

interface PageBuilderRendererProps {
  sections?: CMSSection[];
  locationSlug: string;
  isEditable?: boolean;
  onSelectSection?: (type: string, key: string) => void;
  onMoveSection?: (index: number, direction: 'up' | 'down') => void;
  onToggleSection?: (index: number) => void;
  onAddSection?: (type: string) => void;
  onUpdateDraftField?: (field: string, value: any) => void;
  onUpdateServiceField?: (serviceId: string, field: string, value: string) => void;
  
  // Custom Dynamic Builder States
  headerPromoText?: string;
  headerMenuLinks?: { label: string; href: string; isEnabled: boolean }[];
  footerCopyright?: string;
  siteName?: string;
  siteHotline?: string;
  siteAddress?: string;
  formTitle?: string;
  formButtonText?: string;
  formFields?: { id: string; label: string; placeholder: string; isRequired: boolean; isEnabled: boolean }[];
  onSimulatedFormSubmit?: (data: any) => void;
  selectedSectionKey?: string | null;
}

// ✅ High-Performance IntersectionObserver-based Lazy Load Wrapper
export function LazySection({ children, id, className, expectedHeight, type }: { children: React.ReactNode; id?: string; className?: string; expectedHeight?: number; type?: string }) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Map common heights to section types to reduce CLS
  const defaultHeights: Record<string, string> = {
    'heroSection': 'min-h-[600px]',
    'servicesSection': 'min-h-[800px]',
    'whyChooseUsSection': 'min-h-[500px]',
    'featuredProductsSection': 'min-h-[600px]',
    'testimonialsSection': 'min-h-[400px]',
    'blogSection': 'min-h-[600px]',
    'faqSection': 'min-h-[500px]',
    'finalCtaSection': 'min-h-[300px]'
  };

  const minHeightClass = expectedHeight ? `min-h-[${expectedHeight}px]` : (type ? defaultHeights[type] || 'min-h-[300px]' : 'min-h-[300px]');

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            observer.unobserve(el);
          }
        },
        { rootMargin: '400px 0px' } // Slightly larger margin for better predictive load
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsIntersected(true);
    }
  }, []);

  return (
    <div ref={containerRef} id={id} className={`${className || ''} ${minHeightClass}`}>
      {isIntersected ? children : (
        <div className="section-container bg-slate-50/20 py-24 flex items-center justify-center w-full h-full">
          <div className="animate-pulse space-y-4 w-full max-w-xl text-center">
            <div className="h-4 bg-slate-200/60 rounded-full w-2/3 mx-auto"></div>
            <div className="h-8 bg-slate-200/80 rounded w-1/2 mx-auto"></div>
            <div className="h-32 bg-slate-200/40 rounded-3xl mt-6"></div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * PageBuilderRenderer dynamically renders page sections in the exact order
 * defined in Sanity, behaving like an Elementor/Gutenberg canvas.
 */
export default function PageBuilderRenderer({ 
  sections, 
  locationSlug, 
  isEditable, 
  onSelectSection,
  onMoveSection,
  onToggleSection,
  onAddSection,
  onUpdateDraftField,
  onUpdateServiceField,
  headerPromoText,
  headerMenuLinks,
  footerCopyright,
  siteName,
  siteHotline,
  siteAddress,
  formTitle,
  formButtonText,
  formFields,
  onSimulatedFormSubmit,
  selectedSectionKey
}: PageBuilderRendererProps) {
  
  // Default values for nested configs
  const activeHeader = {
    siteName: siteName || 'Hoàng Tuấn MPE',
    siteHotline: siteHotline || '0389 011 315',
    promoText: headerPromoText || '💥 Ưu đãi: Khảo sát 0đ & Rà quét siêu âm đường ống rò rỉ ngay hôm nay!',
    menuLinks: (headerMenuLinks || [
      { label: 'Trang chủ', href: '/', isEnabled: true },
      { label: 'Dịch vụ', href: '/dich-vu', isEnabled: true },
      { label: 'Bảng giá', href: '/bang-gia', isEnabled: true },
      { label: 'Liên hệ', href: '/lien-he', isEnabled: true }
    ]).map(item => ({
      name: (item as any).name || (item as any).label || '',
      url: (item as any).url || (item as any).href || '',
      isEnabled: item.isEnabled !== false
    }))
  };

  const activeFooter = {
    copyright: footerCopyright || '© 2026 Hoàng Tuấn MPE. Thiết kế bởi Elementor.',
    siteAddress: siteAddress || '123 Cách Mạng Tháng Tám, Quận 3, TP. Hồ Chí Minh',
    siteHotline: siteHotline || '0389 011 315'
  };

  const activeForm = {
    formTitle: formTitle || 'Yêu Cầu Khảo Sát Rò Rỉ Nước Miễn Phí',
    formButtonText: formButtonText || 'NHẬN KHẢO SÁT & BÁO GIÁ NGAY',
    fields: (formFields || [
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
    }))
  };



  // State for simulated form filling
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  // Default sequence of sections to render if Sanity has not configured sections
  const defaultSections: CMSSection[] = [
    { _type: 'heroSection', _key: 'default-hero', isActive: true },
    { _type: 'servicesSection', _key: 'default-services', isActive: true },
    { _type: 'customFormBuilderSection', _key: 'default-builder-form', isActive: true },
    { _type: 'whyChooseUsSection', _key: 'default-whychooseus', isActive: true },
    { _type: 'processTimelineSection', _key: 'default-processtimeline', isActive: true },
    { _type: 'featuredProductsSection', _key: 'default-featuredproducts', isActive: true },
    { _type: 'testimonialsSection', _key: 'default-testimonials', isActive: true },
    { _type: 'blogSection', _key: 'default-blog', isActive: true },
    { _type: 'faqSection', _key: 'default-faq', isActive: true },
  ];

  const activeSections = sections && sections.length > 0 
    ? sections.filter(sec => sec.isActive !== false) 
    : defaultSections;

  const handleFormChange = (fieldId: string, val: string) => {
    setFormInputs(prev => ({ ...prev, [fieldId]: val }));
  };

  const handleSimulatedSubmit = (e: React.FormEvent) => {
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

  const wrapSection = (secType: string, key: string, index: number, content: React.ReactNode) => {
    if (!isEditable) return <React.Fragment key={key}>{content}</React.Fragment>;

    let displayTitle = 'Khối';
    if (secType === 'heroSection') displayTitle = 'Hero Banner chính';
    else if (secType === 'servicesSection') displayTitle = 'Dịch vụ & Đơn giá';
    else if (secType === 'whyChooseUsSection' || secType === 'featuresSection') displayTitle = 'Ưu điểm & Thống kê';
    else if (secType === 'processTimelineSection') displayTitle = 'Quy trình thi công';
    else if (secType === 'featuredProductsSection' || secType === 'productsSection') displayTitle = 'Vật tư & Thiết bị';
    else if (secType === 'testimonialsSection' || secType === 'reviewsSection') displayTitle = 'Ý kiến khách hàng';
    else if (secType === 'blogSection') displayTitle = 'Kinh nghiệm khoa học';
    else if (secType === 'faqSection') displayTitle = 'Giải đáp thắc mắc';
    else if (secType === 'customFormBuilderSection') displayTitle = '📍 Khung Đặt Lịch (Form Builder)';
    else if (secType === 'customReusableBlockSection') displayTitle = '💎 Reusable Block (Khối Lưu Trữ)';
    else if (secType === 'finalCtaSection' || secType === 'ctaSection') displayTitle = 'Kêu gọi hành động (CTA)';

    const isSelected = selectedSectionKey === key;

    return (
      <div 
        key={key}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onSelectSection) {
            onSelectSection(secType, key);
          }
        }}
        className={`relative group/studio-sec cursor-pointer transition-all duration-300 hover:shadow-2xl ${isSelected ? 'ring-2 ring-[#439bf1] z-20' : ''}`}
      >
        {/* Electric Blue Elementor border outlines */}
        <div className="absolute inset-0 border-[2.5px] border-transparent group-hover/studio-sec:border-[#439bf1] group-hover/studio-sec:border-dashed pointer-events-none z-30 transition-all duration-250" />
        <div className="absolute inset-0 bg-[#439bf1]/[0.012] opacity-0 group-hover/studio-sec:opacity-100 transition-opacity pointer-events-none z-10" />

        {/* Floating Elementor-Style Center Handle Button */}
        <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 z-40 flex items-center bg-[#439bf1] hover:bg-[#1352a2] text-white text-[11px] font-bold rounded-t-lg shadow-xl opacity-0 group-hover/studio-sec:opacity-100 transition-all duration-200 pointer-events-auto overflow-hidden divide-x divide-white/20 h-[30px] border border-b-0 border-[#1352a2]/30 selection:bg-transparent">
          {/* Add symbol (+) */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onAddSection) onAddSection(secType);
            }}
            className="w-8 h-full flex items-center justify-center hover:bg-[#348bd6] active:scale-95 transition-all"
            title="Nhân bản khối thêm (Clone Block)"
          >
            <span className="font-extrabold text-base leading-none">+</span>
          </button>
          
          <div 
            className="px-2.5 h-full flex items-center gap-1 hover:bg-[#348bd6] cursor-grab active:cursor-grabbing transition-colors group/grag"
            title={`${displayTitle} - Điều hướng vị trí`}
          >
            <div className="grid grid-cols-2 gap-0.5">
              <span className="w-1 h-1 rounded-full bg-white block" />
              <span className="w-1 h-1 rounded-full bg-white block" />
              <span className="w-1 h-1 rounded-full bg-white block" />
              <span className="w-1 h-1 rounded-full bg-white block" />
              <span className="w-1 h-1 rounded-full bg-white block" />
              <span className="w-1 h-1 rounded-full bg-white block" />
            </div>
            <span className="text-[10px] font-extrabold tracking-wide uppercase px-1 text-white/90 truncate max-w-[130px]">{displayTitle}</span>

            {/* Quick Sorters overlay on hover dot-handler */}
            <div className="absolute bottom-[32px] left-1/2 -translate-x-1/2 bg-slate-950/95 border border-slate-800 text-xs py-1.5 px-3 rounded-xl shadow-2xl flex items-center gap-2.5 opacity-0 group-hover/grag:opacity-100 pointer-events-auto transition-all scale-90 group-hover/grag:scale-100">
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMoveSection) onMoveSection(index, 'up');
                }}
                className="text-slate-300 hover:text-emerald-400 font-bold flex items-center gap-1 py-0.5 px-2 bg-slate-800 rounded-md"
              >
                ▲ Lên
              </button>
              <span className="text-slate-600">|</span>
              <button 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onMoveSection) onMoveSection(index, 'down');
                }}
                className="text-slate-300 hover:text-emerald-400 font-bold flex items-center gap-1 py-0.5 px-2 bg-slate-800 rounded-md"
              >
                ▼ Xuống
              </button>
            </div>
          </div>

          {/* Delete close icon (x) */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onToggleSection) onToggleSection(index);
            }}
            className="w-8 h-full flex items-center justify-center bg-[#ea4335] hover:bg-rose-700 active:scale-95 transition-all text-white font-black"
            title="Xóa phân đoạn này (Delete)"
          >
            <span className="text-xs">✕</span>
          </button>
        </div>

        <div className="absolute top-2 left-2 border border-dashed border-[#439bf1]/30 w-12 h-10 rounded pointer-events-none opacity-0 group-hover/studio-sec:opacity-100 transition-opacity z-25 flex items-center justify-center text-[10px] text-slate-400 select-none bg-slate-50/10">
          col ▥
        </div>

        {content}
      </div>
    );
  };

  return (
    <>
      {/* ───── INTERACTIVE DYNAMIC HEADER BUILDER ───── */}
      {activeHeader.promoText && (
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[11px] sm:text-xs text-center py-2 px-4 shadow-sm relative overflow-hidden flex items-center justify-center gap-2 font-black tracking-wide shrink-0">
          <Sparkles size={12} className="shrink-0 animate-bounce" />
          <span>{activeHeader.promoText}</span>
        </div>
      )}
      
      <header className="sticky top-0 bg-white shadow-md border-b border-slate-100 py-3.5 px-6 shrink-0 flex items-center justify-between z-40">
        <div className="flex items-center gap-2.5 select-none">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
            <span className="font-extrabold text-lg text-white font-mono">HT</span>
          </div>
          <div>
            <span className="text-base font-black tracking-tight text-slate-900 block leading-none">{activeHeader.siteName}</span>
            <span className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase mt-1 block">CHUYÊN GIA DÒ TÌM MPE</span>
          </div>
        </div>

        {/* Dynamic header list */}
        <nav className="hidden lg:flex items-center gap-7">
          {activeHeader.menuLinks.filter(l => l.isEnabled).map((link, i) => (
            <span 
              key={i} 
              className="text-xs font-extrabold text-slate-700 hover:text-orange-500 transition-colors cursor-pointer select-none border-b-2 border-transparent hover:border-orange-500 py-1"
            >
              {link.name}
            </span>
          ))}
        </nav>

        {/* Call Now Action Button */}
        <a 
          href={`tel:${activeHeader.siteHotline.replace(/\s+/g, '')}`}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-md cursor-pointer group active:scale-95 transition-all select-none"
        >
          <Phone size={14} className="group-hover:animate-wiggle" />
          <span>HOTLINE: {activeHeader.siteHotline}</span>
        </a>
      </header>

      {/* ───── PRIMARY CMS CANVAS DISPLAY SECTIONS ───── */}
      {activeSections.map((section, idx) => {
        switch (section._type) {
          case 'heroSection':
            return wrapSection(
              'heroSection',
              section._key,
              idx,
              <div id="section-hero" className="relative scroll-mt-20">
                <Hero 
                  cmsData={section} 
                  isEditable={isEditable}
                  onUpdateDraftField={onUpdateDraftField}
                />
              </div>
            );
          
          case 'servicesSection':
            return wrapSection(
              'servicesSection',
              section._key,
              idx,
              <div id="section-services" className="relative scroll-mt-20">
                <Services 
                  cmsData={section} 
                  isEditable={isEditable}
                  onUpdateDraftField={onUpdateDraftField}
                  onUpdateServiceField={onUpdateServiceField}
                />
              </div>
            );

          // ─ FORM BUILDER CUSTOM CODE BLOCK RENDERING ─
          case 'customFormBuilderSection':
            return wrapSection(
              'customFormBuilderSection',
              section._key,
              idx,
              <section className="section-container bg-slate-50 relative overflow-hidden" id="section-form-builder">
                <div className="absolute inset-0 bg-[radial-gradient(#439bf1_0.05rem,transparent_0.05rem)] [background-size:1.5rem_1.5rem] opacity-[0.03]" />
                <div className="max-w-xl mx-auto relative z-10 w-full">
                  <div className="bg-white rounded-[2rem] border border-slate-200/60 p-8 shadow-2xl">
                    <div className="text-center mb-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] bg-brand-primary/10 text-brand-primary rounded-full font-black tracking-wider uppercase mb-3">
                        <Sparkles size={10} /> ĐĂNG KÝ ONLINE PHẢN HỒI NHANH
                      </span>
                      <h3 className="text-2xl font-black text-brand-secondary leading-snug">{activeForm.formTitle}</h3>
                      <p className="text-xs text-slate-500 mt-1">Thông tin được mã hóa bảo mật hoàn hảo</p>
                    </div>

                    {!formSubmitted ? (
                      <form onSubmit={handleSimulatedSubmit} className="space-y-4">
                        {activeForm.fields.filter(f => f.isEnabled).map((f) => (
                          <div key={f.id} className="space-y-1">
                            <label className="text-xs font-extrabold text-brand-secondary flex items-center justify-between">
                              <span>{f.label} {f.isRequired && <span className="text-red-500">*</span>}</span>
                            </label>

                            {f.type === 'select' ? (
                              <select 
                                required={f.isRequired}
                                value={formInputs[f.id] || ''}
                                onChange={(e) => handleFormChange(f.id, e.target.value)}
                                className="w-full bg-slate-50/80 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold text-slate-800"
                              >
                                <option value="" disabled>{f.placeholder || 'Vui lòng chọn...'}</option>
                                {f.options?.map((opt, oIdx) => (
                                  <option key={oIdx} value={opt}>{opt}</option>
                                ))}
                              </select>
                            ) : f.type === 'textarea' ? (
                              <textarea 
                                rows={3}
                                required={f.isRequired}
                                placeholder={f.placeholder}
                                value={formInputs[f.id] || ''}
                                onChange={(e) => handleFormChange(f.id, e.target.value)}
                                className="w-full bg-slate-50/80 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold resize-none"
                              />
                            ) : (
                              <input 
                                type={f.type}
                                required={f.isRequired}
                                placeholder={f.placeholder}
                                value={formInputs[f.id] || ''}
                                onChange={(e) => handleFormChange(f.id, e.target.value)}
                                className="w-full bg-slate-50/80 border border-slate-200 focus:border-brand-primary focus:bg-white text-xs px-4 py-3 rounded-2xl outline-none transition-all font-semibold"
                              />
                            )}
                          </div>
                        ))}

                        <button 
                          type="submit" 
                          disabled={isFormSubmitting}
                          className="w-full py-4 px-6 bg-brand-primary text-white font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-[#348bd6] active:scale-95 transition-all shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
                        >
                          {isFormSubmitting ? (
                            <>
                              <Clock className="animate-spin text-white" size={16} /> Thợ đang kiểm tra dữ liệu...
                            </>
                          ) : (
                            <>
                              <Send size={15} /> {activeForm.formButtonText}
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
                          Kỹ thuật viên khu vực <strong>{locationSlug === 'ho-chi-minh' ? 'TP. Hồ Chí Minh' : 'Lâm Đồng'}</strong> sẽ gọi lại cho bạn sau tối đa 10 phút. Cam kết khảo sát đúng giờ!
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

          // ─ REUSABLE BLOCKS CUSTOM SECTION RENDERING ─
          case 'customReusableBlockSection':
            const blockType = section.blockKey || 'promo_alert';
            return wrapSection(
              'customReusableBlockSection',
              section._key,
              idx,
              <section className="py-12 bg-slate-900 text-white relative overflow-hidden" id="section-reusable-block">
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                  {blockType === 'promo_alert' ? (
                    <div className="bg-gradient-to-br from-orange-600/90 to-red-700/95 border border-orange-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-5">
                        <span className="text-9xl font-black font-mono">%</span>
                      </div>
                      <span className="inline-block bg-white text-orange-700 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 animate-pulse">
                        🔥 SIÊU GIẢM GIÁ ĐỘC QUYỀN
                      </span>
                      <h4 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">GIẢM NGAY 20% PHÍ THI CÔNG</h4>
                      <p className="text-xs text-orange-150 leading-relaxed max-w-lg mx-auto mt-2">
                        Dành riêng cho khách đặt lịch khảo sát siêu âm rò rỉ nước ngầm hoặc vá chập hệ thống điện qua Website hôm nay. Nhận bảo hành trọn đời!
                      </p>
                    </div>
                  ) : blockType === 'trust_badge' ? (
                    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {[
                        { title: 'Báo Giá Trước Sửa', desc: 'Không thu bất kỳ phụ phí nào, báo giá minh bạch sau khảo sát siêu âm.', icon: FileText, col: 'from-blue-600 to-indigo-700' },
                        { title: 'Vật Tư Chính Hãng', desc: 'Trực tiếp phân phối linh phụ kiện thiết bị điện nước MPE chính hãng 100%.', icon: ShieldCheck, col: 'from-emerald-600 to-teal-700' },
                        { title: 'Bảo Hành 5 Năm', desc: 'Cam kết thi công dứt điểm rò rỉ, bảo hành kỹ thuật bằng biên lai chính thức.', icon: Clock, col: 'from-orange-600 to-red-600' }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center shadow-lg hover:border-orange-500/40 transition-all">
                          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.col} flex items-center justify-center mx-auto mb-4 text-white shadow-md`}>
                            <item.icon size={22} />
                          </div>
                          <h5 className="font-extrabold text-sm mb-1">{item.title}</h5>
                          <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="border-4 border-dashed border-red-500/80 p-8 rounded-[2rem] bg-red-950/20 max-w-xl mx-auto relative group">
                      <div className="flex items-center justify-center gap-3 text-red-400 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                        <span className="font-black text-xs uppercase tracking-widest">SỰ CỐ KHẨN CẤP / ALARM ALERT</span>
                      </div>
                      <h4 className="text-xl font-black text-rose-300">ĐỘI CỨU HỘ KHẨN CẤP ĐANG TRỰC CHIẾN</h4>
                      <p className="text-[11px] text-slate-350 leading-relaxed mt-2.5">
                        Tại khu vực của bạn, chúng tôi luôn có 3 thợ rà rò tìm sẵn sàng xuất phát trong 15 phút. Nhấn gọi hỗ trợ ngay lập tức!
                      </p>
                      <a 
                        href={`tel:${activeHeader.siteHotline}`}
                        className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase.tracking-wider px-5 py-2 rounded-xl shadow-lg mt-4 text-center"
                      >
                        Khẩn cấp: Gọi Đội Cứu Hộ <ArrowRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </section>
            );

          case 'whyChooseUsSection':
          case 'featuresSection':
            return wrapSection(
              'whyChooseUsSection',
              section._key,
              idx,
              <div id="section-whychoice" className="relative scroll-mt-20">
                <WhyChooseUs 
                  cmsData={section} 
                  isEditable={isEditable}
                  onUpdateDraftField={onUpdateDraftField}
                />
              </div>
            );
          
          case 'processTimelineSection':
            return wrapSection(
              'processTimelineSection',
              section._key,
              idx,
              <div id="section-process" className="relative scroll-mt-20">
                <ProcessTimeline {...(section as any)} />
              </div>
            );
          
          case 'featuredProductsSection':
          case 'productsSection':
            return wrapSection(
              'featuredProductsSection',
              section._key,
              idx,
              <div id="section-products" className="relative scroll-mt-20">
                <FeaturedProducts {...(section as any)} />
              </div>
            );
          
          case 'testimonialsSection':
          case 'reviewsSection':
            return wrapSection(
              'testimonialsSection',
              section._key,
              idx,
              <LazySection id="section-testimonials" className="relative scroll-mt-20" type={section._type}>
                <Testimonials {...(section as any)} />
              </LazySection>
            );
          
          case 'blogSection':
            return wrapSection(
              'blogSection',
              section._key,
              idx,
              <LazySection id="section-blog" className="relative scroll-mt-20" type={section._type}>
                <Blog {...(section as any)} />
              </LazySection>
            );
          
          case 'faqSection':
            return wrapSection(
              'faqSection',
              section._key,
              idx,
              <LazySection id="section-faq" className="relative scroll-mt-20" type={section._type}>
                <FAQSection {...(section as any)} />
              </LazySection>
            );
          
          case 'finalCtaSection':
          case 'ctaSection':
            return wrapSection(
              'finalCtaSection',
              section._key,
              idx,
              <div id="section-cta" className="relative scroll-mt-20">
                <FinalCTA {...(section as any)} />
              </div>
            );

          default:
            console.warn(`[PageBuilderRenderer] Unknown section type received: "${section._type}"`);
            return null;
        }
      })}

      {/* ───── INTERACTIVE DYNAMIC FOOTER (Only in Studio Editor) ───── */}
      {isEditable && (
        <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10">
            <div className="space-y-4">
              <span className="text-lg font-black tracking-tight text-white block uppercase">{activeHeader.siteName}</span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                Đơn vị tiên phong cung cấp giải pháp siêu âm rà quét rò rỉ nước ngầm, chập cháy điện âm tường chính xác 100% bằng thiết bị chuyên dụng nhập khẩu.
              </p>
            </div>
            
            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-[#439bf1] uppercase block">Liên Hệ Kỹ Thuật</span>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                  <span>{activeFooter.siteAddress}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone size={15} className="text-orange-500 shrink-0" />
                  <span>Hotline: {activeFooter.siteHotline}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail size={15} className="text-orange-500 shrink-0" />
                  <span>Email: contact@hoangtuanmpe.vn</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-black tracking-widest text-[#439bf1] uppercase block">Dịch Vụ Nổi Bật</span>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>• Rà quét siêu âm rò rỉ nước bể ngầm</li>
                <li>• Kiểm tra chập cháy nổ điện dân dụng</li>
                <li>• Bảng báo giá thi công khắc phục khẩn cấp</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800 text-center text-slate-500 text-[11px] font-semibold flex flex-col sm:flex-row items-center justify-between gap-3 max-w-7xl mx-auto px-6 select-none">
            <span>{activeFooter.copyright}</span>
            <div className="flex gap-4">
              <span className="hover:text-white cursor-pointer select-none">Điều khoản</span>
              <span>•</span>
              <span className="hover:text-white cursor-pointer select-none">Bảo mật</span>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}

