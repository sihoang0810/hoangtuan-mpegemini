import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, AlertTriangle, 
  Lightbulb, Trophy, HelpCircle, Image as ImageIcon, Phone, ArrowRight 
} from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/projectsData';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import OptimizedImage from '../components/OptimizedImage';
import FinalCTA from '../components/FinalCTA';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { locationSlug } = useLocation();
  const navigate = useNavigate();
  const siteLocationPrefix = '/' + locationSlug;
  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const [sliderPosition, setSliderPosition] = useState(50);

  // Find project by slug
  const project = useMemo(() => {
    return PROJECTS_DATA.find(p => p.slug === slug);
  }, [slug]);

  // If project not found, redirect gracefully to listing
  if (!project) {
    return (
      <div className="pt-20 md:pt-28 pb-16 md:pb-24 text-center">
        <div className="max-w-md mx-auto space-y-4 px-6">
          <h2 className="text-2xl font-black text-brand-secondary">Không tìm thấy dự án thi công</h2>
          <p className="text-slate-500 text-sm">Thông tin chi tiết dự án không song hành hoặc đã bị gỡ bỏ.</p>
          <Link 
            to={`${siteLocationPrefix}/du-an`}
            className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline"
          >
            <ArrowLeft size={16} /> Quay lại danh sách dự án
          </Link>
        </div>
      </div>
    );
  }

  // Related projects mapping
  const relatedProjects = useMemo(() => {
    return PROJECTS_DATA.filter(p => project.relatedProjects.includes(p.slug));
  }, [project]);

  return (
    <div id="project-detail" className="pt-20 bg-slate-50 min-h-screen">
      {/* Dynamic SEO Hook for page-level optimization */}
      <PageSEO pageType="project" data={project} />

      {/* Hero Header Section */}
      <section className="bg-brand-secondary text-white py-10 md:py-12 lg:py-14 relative overflow-hidden">
        {/* Subtle decorative vector backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="space-y-6 max-w-4xl">
            {/* Breadcrumbs / Back button */}
            <Link 
              to={`${siteLocationPrefix}/du-an`}
              className="inline-flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
            >
              <ArrowLeft size={16} /> Danh Sách Dự Án
            </Link>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-brand-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
                {project.category}
              </span>
              <span className="bg-white/10 text-slate-100 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <MapPin size={10} className="text-brand-primary" /> {project.location}
              </span>
            </div>

            {/* Project Title */}
            <h1 className="font-black uppercase tracking-tight leading-none text-white">
              {project.title}
            </h1>

            {/* Quick Metadata fields */}
            <div className="flex flex-wrap items-center gap-6 text-slate-300 text-xs font-bold pt-2">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-brand-primary" />
                <span>Hoàn thành: {project.completionDate}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 xl:gap-16 items-start">
            
            {/* Left Content Column (Descriptions, Challenges, Solutions, Outcomes) */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Introduction Card */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-slate-100">
                <h2 className="font-black text-brand-secondary mb-4 uppercase tracking-tight">Tổng Quan Dự Án</h2>
                <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>

              {/* Challenges & Solutions Bento Blocks */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Challenges Block */}
                <div className="bg-amber-50/50 rounded-3xl p-6 md:p-8 border border-amber-100/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                      <AlertTriangle size={20} />
                    </div>
                    <h3 className="text-lg font-black text-brand-secondary uppercase tracking-tight">Khó Khăn Thực Tế</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.challenges}
                  </p>
                </div>

                {/* Solutions Block */}
                <div className="bg-indigo-50/50 rounded-3xl p-6 md:p-8 border border-indigo-100/60 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                      <Lightbulb size={20} />
                    </div>
                    <h3 className="text-lg font-black text-brand-secondary uppercase tracking-tight">Phương Án Sửa Chữa</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              </div>

              {/* Interactive Before/After Comparison Panel */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-extrabold text-brand-secondary uppercase tracking-tight flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                    Hiện Trạng Trước & Sau Thi Công
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">Kéo thanh trượt hoặc sử dụng bộ lọc bên dưới để so sánh trực quan sự khác biệt.</p>
                </div>
                
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-md select-none group border border-slate-100 bg-slate-100">
                  {/* After Image (Base) - Always fully positioned */}
                  <div className="absolute inset-0 w-full h-full">
                    <OptimizedImage 
                      src={project.beforeAfter.afterImage} 
                      alt="Sau khi thi công" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-emerald-600 border border-emerald-500 text-white text-[9px] sm:text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md z-10 pointer-events-none">
                      HOÀN THÀNH - BÀN GIAO ✅
                    </div>
                  </div>

                  {/* Before Image (Overlay clipped beautifully with clip-path for 1:1 pixel compliance) */}
                  <div 
                    className="absolute inset-0 w-full h-full z-10 pointer-events-none transition-all duration-75" 
                    style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
                  >
                    <OptimizedImage 
                      src={project.beforeAfter.beforeImage} 
                      alt="Trước khi thi công" 
                      className="w-full h-full object-cover grayscale brightness-95"
                    />
                    <div className="absolute bottom-4 left-4 bg-red-600/95 text-white text-[9px] sm:text-[10px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md z-20 pointer-events-none">
                      ⚠️ TRƯỚC THI CÔNG
                    </div>
                  </div>

                  {/* Slider Control Line & Floating Knob */}
                  <div 
                    className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    {/* Glowing handle knob */}
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-primary border-4 border-white shadow-xl flex items-center justify-center text-white pointer-events-auto hover:scale-110 transition-transform">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" className="rotate-90 origin-center scale-90" />
                      </svg>
                    </div>
                  </div>

                  {/* Invisible Range Input spanning the entire visual zone to capture intuitive drag/swipe coordinates */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPosition} 
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30 touch-none"
                    aria-label="Before After Compare Slider Input"
                  />
                </div>

                {/* Tactical visual range controller bar underneath for clear guidance and enhanced accessible interaction */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-3 shadow-inner">
                  <div className="flex justify-between items-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span className="text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-md">
                      ⚠️ TRƯỚC THI CÔNG ({sliderPosition}%)
                    </span>
                    <span className="hidden sm:inline text-slate-400 font-medium normal-case">Kéo nút trượt bên dưới để tự do điều chỉnh</span>
                    <span className="text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-md">
                      SAU KHI THI CÔNG ({100 - sliderPosition}%) ✅
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      type="button"
                      onClick={() => setSliderPosition(100)}
                      className="text-xs font-black text-red-600 hover:bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-200 transition-colors shrink-0"
                    >
                      XEM TRƯỚC 100%
                    </button>
                    
                    <div className="relative flex-grow flex items-center h-8">
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={sliderPosition} 
                        onChange={(e) => setSliderPosition(Number(e.target.value))}
                        className="w-full h-2.5 rounded-full bg-slate-200 accent-brand-primary outline-none cursor-pointer border border-slate-200 focus:ring-2 focus:ring-brand-primary/20 appearance-none"
                        style={{
                          background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${sliderPosition}%, #10b981 ${sliderPosition}%, #10b981 100%)`
                        }}
                        aria-label="Bottom slider controller text"
                      />
                    </div>
                    
                    <button 
                      type="button"
                      onClick={() => setSliderPosition(0)}
                      className="text-xs font-black text-emerald-600 hover:bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-200 transition-colors shrink-0"
                    >
                      XEM SAU 100%
                    </button>
                  </div>
                </div>

                {/* Captions */}
                <div className="grid sm:grid-cols-2 gap-4 text-[11px] sm:text-xs font-bold leading-relaxed">
                  <div className="p-3 bg-red-50/30 rounded-xl border border-red-100/50 text-slate-500">
                    <span className="text-red-600 uppercase pr-1 font-extrabold">⚠️ Trước:</span> {project.beforeAfter.beforeDesc}
                  </div>
                  <div className="p-3 bg-emerald-50/30 rounded-xl border border-emerald-100/50 text-brand-secondary">
                    <span className="text-emerald-600 uppercase pr-1 font-extrabold">✅ Sau:</span> {project.beforeAfter.afterDesc}
                  </div>
                </div>
              </div>

              {/* Conditionally Render Specifications Section */}
              {project.specifications && project.specifications.length > 0 && (
                <div className="bg-white rounded-[2rem] border border-slate-100 p-6 md:p-8 shadow-sm space-y-6">
                  <div>
                    <h3 className="font-extrabold text-brand-secondary uppercase tracking-tight flex items-center gap-2">
                      <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                      Thông Số Kỹ Thuật Chi Tiết Hệ Thống
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">Đảm bảo thiết bị chính hãng chất lượng cao, chế độ bảo hành chuyên sâu hỏa tốc.</p>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 pt-2">
                    {project.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center py-2.5 border-b border-dashed border-slate-100 text-xs text-slate-700">
                        <span className="font-bold text-slate-500">{spec.label}</span>
                        <span className="text-brand-secondary font-black text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditionally Render Pricing Packages Grid */}
              {project.packages && project.packages.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-brand-secondary">
                    <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                    <h3 className="text-xl font-black uppercase tracking-tight">Cấu Hình Lắp Đặt Báo Giá Trọn Gói</h3>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-6">
                    {project.packages.map((pkg, idx) => (
                      <div 
                        key={idx} 
                        className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
                          pkg.isPopular 
                            ? 'bg-brand-secondary text-white border-brand-primary shadow-lg scale-[1.01] sm:-translate-y-0.5' 
                            : 'bg-white text-slate-800 border-slate-100 shadow-sm hover:shadow-md'
                        }`}
                      >
                        {pkg.isPopular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[9px] font-black uppercase py-0.5 px-4 rounded-full tracking-wider shadow z-10">
                            {pkg.badge || "KHUYÊN DÙNG"}
                          </span>
                        )}
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className={`text-xs font-black uppercase tracking-wide ${pkg.isPopular ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                              {pkg.name}
                            </h4>
                            <div className="mt-2 flex items-baseline gap-1">
                              <span className="text-xl sm:text-2xl font-black">{pkg.price}</span>
                              {pkg.price !== "Xem Khảo Sát" && <span className="text-[10px] opacity-75 font-bold">/Bộ</span>}
                            </div>
                          </div>

                          <ul className="space-y-2 pt-2">
                            {pkg.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex gap-2 items-start text-[11px] leading-relaxed">
                                <span className={`shrink-0 text-xs font-bold ${pkg.isPopular ? 'text-brand-primary' : 'text-emerald-500'}`}>✓</span>
                                <span className={`${pkg.isPopular ? 'text-slate-100 font-medium' : 'text-slate-600'}`}>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-6">
                          <a 
                            href="tel:0389011315"
                            className={`block w-full py-2.5 rounded-xl text-center text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                              pkg.isPopular 
                                ? 'bg-brand-primary text-white hover:bg-white hover:text-brand-secondary' 
                                : 'bg-slate-50 text-brand-secondary hover:bg-brand-primary hover:text-white border border-slate-100'
                            }`}
                          >
                            Tư Vấn Miễn Phí
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Conditionally Render Implementation steps */}
              {project.steps && project.steps.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-brand-secondary">
                    <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                    <h3 className="text-xl font-black uppercase tracking-tight">Quy Trình Thi Công Chuẩn Kỹ Thuật</h3>
                  </div>

                  <div className="relative pl-6 sm:pl-8 border-l border-slate-200 space-y-8 ml-3 py-2">
                    {project.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative group">
                        {/* Bullet number node */}
                        <div className="absolute -left-10 sm:-left-12 top-0.5 w-8 h-8 rounded-full bg-white border-2 border-brand-primary text-brand-primary font-black text-xs flex items-center justify-center shadow-sm group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                          {sIdx + 1}
                        </div>
                        
                        <div className="space-y-1">
                          <h4 className="font-extrabold text-brand-secondary text-sm tracking-tight group-hover:text-brand-primary transition-colors">
                            {step.title}
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Outcome Block */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 md:p-10 border border-emerald-100/60 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 shadow-sm">
                    <Trophy size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-brand-secondary uppercase tracking-tight">KẾT QUẢ NGHIỆM THU</h3>
                    <p className="text-emerald-600 text-[10px] font-bold uppercase tracking-wider">Khách hàng phản hồi 5 sao</p>
                  </div>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {project.outcome}
                </p>
              </div>

              {/* Photo Gallery Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-secondary">
                  <ImageIcon size={20} className="text-brand-primary" />
                  <h3 className="text-xl font-bold uppercase tracking-tight">Hình Ảnh Nhật Ký Thi Công</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm group border border-slate-100">
                      <OptimizedImage 
                        src={img} 
                        alt={`Hình nhật ký ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Specific FAQ if available */}
              {project.faq && project.faq.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-brand-secondary">
                    <HelpCircle size={20} className="text-brand-primary" />
                    <h3 className="text-xl font-bold uppercase tracking-tight">Có Thể Bạn Quan Tâm</h3>
                  </div>
                  <div className="space-y-4">
                    {project.faq.map((item, index) => (
                      <div key={index} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-2">
                        <h4 className="font-extrabold text-brand-secondary text-sm flex gap-2">
                          <span className="text-brand-primary font-black">Q:</span>
                          {item.question}
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed pl-5">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (Meta specs & Quick contact list) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Box Services Performed */}
              <div className="bg-brand-secondary text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
                
                <div>
                  <h3 className="font-black uppercase tracking-tight text-brand-primary">Hạng Mục Thi Công</h3>
                  <p className="text-xs text-slate-300">Chi tiết công tác kĩ thuật đã hoàn thành</p>
                </div>

                <div className="space-y-4">
                  {project.services.map((srv, idx) => (
                    <div key={idx} className="flex gap-3 start">
                      <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-100 leading-relaxed font-bold">{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support Card Hotline */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 text-center">
                <Phone size={32} className="text-brand-primary mx-auto" />
                <h4 className="font-extrabold text-brand-secondary uppercase text-sm tracking-tight">Lập Lịch Khảo Sát Miễn Phí</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Quý khách cần tư vấn sửa chữa, dò tìm rò rỉ hay thi công lắp đặt tại khu vực {mappedDisplayName}? Liên hệ kĩ thuật trưởng Hoàng Tuấn MPE ngay.
                </p>
                <div className="pt-2">
                  <a 
                    href="tel:0389011315"
                    className="block w-full py-3 bg-brand-primary text-white font-extrabold rounded-xl text-xs uppercase tracking-wider hover:bg-brand-secondary transition-colors"
                  >
                    Báo giá & Khảo sát ngay
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Related Projects Carousel/Grid block */}
          {relatedProjects.length > 0 && (
            <div className="mt-20 pt-12 border-t border-slate-200 space-y-8">
              <h3 className="font-black text-brand-secondary uppercase tracking-tight text-center">Các Dự Án Liên Quan Khác</h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedProjects.map((item) => (
                  <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <OptimizedImage
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 space-y-3">
                      <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">{item.category}</span>
                      <h4 className="font-extrabold text-base text-brand-secondary line-clamp-1 leading-snug group-hover:text-brand-primary transition-colors">
                        <Link to={`${siteLocationPrefix}/du-an/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.shortDescription}</p>
                      <div className="pt-2 flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.location}</span>
                        <Link 
                          to={`${siteLocationPrefix}/du-an/${item.slug}`}
                          className="flex items-center gap-1.5 text-xs font-black text-brand-primary hover:text-brand-secondary"
                        >
                          Xem hồ sơ <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Final standard CTA */}
      <FinalCTA />
    </div>
  );
}
