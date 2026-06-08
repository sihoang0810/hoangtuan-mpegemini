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
    <div id="project-detail" className="pt-20 bg-slate-50 min-h-screen pb-20 md:pb-0">
      {/* Dynamic SEO Hook for page-level optimization */}
      <PageSEO pageType="project" data={project} />

      {/* Hero Header Section */}
      <section className="bg-brand-secondary text-white py-10 md:py-16 lg:py-20 relative overflow-hidden">
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

              {/* Before/After Visual Side-by-Side Panel */}
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="font-bold text-brand-secondary uppercase tracking-tight">Hiện Trạng Trước & Sau Sửa Chữa</h3>
                  <p className="text-slate-400 text-xs mt-1">So sánh trực quan hiện trạng thi công từ hiện trường của kỹ sư Hoàng Tuấn MPE.</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 pt-2">
                  {/* Before card */}
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow">
                      <OptimizedImage 
                        src={project.beforeAfter.beforeImage} 
                        alt="Trước khi thi công" 
                        className="w-full h-full object-cover grayscale brightness-90"
                      />
                      <span className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[9px] font-black uppercase px-3 py-1 rounded">TRƯỚC THI CÔNG</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-bold italic">
                      ⚠️ {project.beforeAfter.beforeDesc}
                    </p>
                  </div>

                  {/* After card */}
                  <div className="space-y-3">
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow">
                      <OptimizedImage 
                        src={project.beforeAfter.afterImage} 
                        alt="Sau khi thi công" 
                        className="w-full h-full object-cover border-2 border-brand-primary/20"
                      />
                      <span className="absolute bottom-3 left-3 bg-emerald-600/95 text-white text-[9px] font-black uppercase px-3 py-1 rounded">HOÀN THÀNH - BÀN GIAO</span>
                    </div>
                    <p className="text-xs text-brand-secondary leading-relaxed font-bold">
                      ✅ {project.beforeAfter.afterDesc}
                    </p>
                  </div>
                </div>
              </div>

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
