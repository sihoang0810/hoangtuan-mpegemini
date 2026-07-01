import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, MapPin, Calendar, CheckCircle2, AlertTriangle, 
  Lightbulb, Trophy, HelpCircle, Image as ImageIcon, Phone, ArrowRight,
  X, ZoomIn, ChevronLeft, ChevronRight, Clock, Gauge, ShieldCheck
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
  
  // Lightbox State for rich image preview
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  // Handle Lightbox navigation
  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + project.gallery.length) % project.gallery.length);
    }
  };

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % project.gallery.length);
    }
  };

  // Generate dynamic, meaningful caption based on project type and index
  const getPhotoCaption = (proj: Project, idx: number) => {
    const defaultCaptions: Record<string, string[]> = {
      "sua-dien-biet-thu-dalat": [
        "Hộp tủ điện cũ nhảy aptomat liên tục và dây nhợ quá tải",
        "Kỹ thuật viên bóc tách đi lại sơ đồ đường dây dẫn âm tường",
        "Đấu nối rơ le át RCBO chống rò rỉ dòng siêu nhạy",
        "Hoàn tất lắp đặt hệ Smarthome MPE và đèn LED cảm biến cao cấp"
      ],
      "do-tim-ro-ri-nhatrang": [
        "Thiết bị máy dò siêu âm rò rỉ nước ngầm công nghệ cao tại hiện trường",
        "Kỹ thuật viên đeo tai nghe ghi sóng siêu âm âm sàn",
        "Đục cục bộ chính xác vị trí ống nước nóng PPR bị nứt vỡ",
        "Hàn vá nhiệt ống PPR mới và hoàn trả nền gạch thẩm mỹ"
      ],
      "lap-dat-camera-xuong-may": [
        "Khảo sát và bố trí tuyến cáp mạng CAT6 bọc giáp chống nhiễu",
        "Lắp ráp hộp kỹ thuật và mắt camera IP Hikvision 4K ngoài trời",
        "Đấu nối dây tín hiệu tập trung tại tủ rack kỹ thuật trung tâm",
        "Màn hình giám sát trực quan 32 mắt camera AI sắc nét trong phòng điều hành"
      ],
      "bao-tri-dien-nuoc-khach-san": [
        "Tầm soát phát nhiệt các thiết bị đóng cắt bằng camera hồng ngoại",
        "Xiết tiếp điểm các đầu nối atomat và dọn dẹp khoang dây tổng",
        "Kiểm tra trục bi và van một chiều hệ máy bơm áp lực",
        "Vệ sinh hệ lọc và bảo dưỡng hệ thống phao cơ ngắt tự động bể mái"
      ],
      "lap-dat-camera-vuon-ray": [
        "Kiểm tra sóng sim 4G của nhà mạng lớn ngoài rẫy sầu riêng Bảo Lộc",
        "Thi công chôn móng đổ bê tông trụ thép gia cố chống bão",
        "Gá lắp tấm pin sạc năng lượng mặt trời Poly hướng đón nắng tối đa",
        "Cài đặt vẽ ranh giới ảo báo động còi hú hồng ngoại AI Cruiser ngoài trời"
      ],
      "lap-dat-cua-cuon-thong-minh": [
        "Bảo dưỡng bánh răng, tra dầu mỡ ray trượt lò xo trợ lực cửa cuốn",
        "Tích hợp hộp nhận tín hiệu cửa cuốn thông minh mã hóa AES-128",
        "Lắp đặt camera IP giám sát hành trình đóng mở và đèn hồng ngoại đêm",
        "Thử nghiệm tính năng cảm biến tự dừng đảo chiều an toàn khi gặp vật cản"
      ]
    };

    const projectCaptions = defaultCaptions[proj.slug];
    if (projectCaptions && projectCaptions[idx]) {
      return projectCaptions[idx];
    }
    return `Nhật ký công trình giai đoạn ${idx + 1} - Hoàng Tuấn MPE`;
  };

  return (
    <div id="project-detail" className="pt-24 bg-white min-h-screen text-slate-800">
      {/* Dynamic SEO Hook for page-level optimization */}
      <PageSEO pageType="project" data={project} />

      {/* Blog Article Layout Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pb-20">
        
        {/* Editorial Breadcrumbs & Quick Back */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <Link 
            to={`${siteLocationPrefix}/du-an`}
            className="inline-flex items-center gap-2 text-brand-primary font-black text-xs uppercase tracking-widest hover:text-brand-secondary transition-colors"
          >
            <ArrowLeft size={16} /> Quay lại danh sách hồ sơ
          </Link>
          <span className="bg-brand-primary/10 text-brand-primary text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            Chuyên mục: {project.category}
          </span>
        </div>

        {/* Blog Article Header */}
        <header className="space-y-6 mb-8">
          <h1 className="font-black text-2xl sm:text-3xl md:text-4xl text-slate-900 leading-tight tracking-tight uppercase">
            {project.title}
          </h1>

          {/* Author & Reading Metadata */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 py-4 border-y border-slate-100 text-xs text-slate-500 font-bold">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-xs uppercase shadow-sm">
                HT
              </div>
              <div>
                <span className="block font-black text-slate-800">Ban biên tập Hoàng Tuấn MPE</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Kỹ sư Nguyễn Hoàng Tuấn duyệt</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:border-l sm:border-slate-200 sm:pl-6 h-6">
              <Calendar size={14} className="text-brand-primary" />
              <span>Nghiệm thu: {project.completionDate}</span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-6 h-6">
              <Clock size={14} className="text-brand-primary" />
              <span>Thời gian đọc: 6 phút</span>
            </div>

            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-6 h-6">
              <MapPin size={14} className="text-brand-primary" />
              <span>Khu vực: {project.location}</span>
            </div>
          </div>
        </header>

        {/* Featured Large Image at the top of the blog post */}
        <div className="rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-10 shadow-md border border-slate-100 bg-slate-50 relative group">
          <OptimizedImage 
            src={project.images[0]} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-brand-secondary text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-slate-100">
            Hình ảnh hiện trường bàn giao thực tế
          </span>
        </div>

        {/* Blog Body Content */}
        <div className="space-y-12">
          
          {/* Paragraph Introduction with Dropcap */}
          <section className="space-y-4">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-bold whitespace-pre-line first-letter:text-5xl first-letter:font-black first-letter:text-brand-primary first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              {project.fullDescription}
            </p>
          </section>

          {/* Quick Specifications Info Box (Embedded Blog Card) */}
          <section className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-200/60 pb-4">
              <h3 className="font-black text-brand-secondary text-sm sm:text-base uppercase tracking-wider">
                🔎 Thông tin kỹ thuật & Kế hoạch thi công
              </h3>
              <p className="text-xs text-slate-400 mt-1">Hồ sơ đo đạc phân tích và dự trù nhân sự chuyên môn</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Thời gian thi công</span>
                    <span className="text-sm font-bold text-slate-800">{project.duration}</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                    <Gauge size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Mức độ khó khăn</span>
                    <span className="text-sm font-bold text-slate-800">{project.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Khu vực thi công</span>
                    <span className="text-sm font-bold text-slate-800">{project.location}</span>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-xl shrink-0">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest block">Cam kết vật tư</span>
                    <span className="text-sm font-bold text-slate-800">MPE chính hãng & Thiết bị đạt chuẩn CO/CQ</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Benefits section */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
              Lợi ích lâu dài mang lại cho gia chủ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
              Công trình sau khi được sửa chữa, cải tạo toàn diện bởi đội thợ kỹ thuật cao của Hoàng Tuấn MPE sẽ mang lại cho gia chủ những giá trị sử dụng lâu bền:
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {project.benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-brand-primary/20 transition-all">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck size={14} />
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-bold">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Challenges & Solutions */}
          <section className="space-y-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
              Nhật ký công trình: Khó khăn & Giải pháp xử lý
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
              Mỗi dự án thi công thực tế tại Lâm Đồng hoặc Hồ Chí Minh đều có những bài toán đặc thù phức tạp về kết cấu nhà, địa hình hay tiếng ồn:
            </p>

            <div className="space-y-4">
              {/* Challenge Box */}
              <div className="p-6 bg-amber-50/40 border border-amber-100/60 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-amber-700 font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                  <AlertTriangle size={16} /> Hiện trạng thực tế tại hiện trường
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold italic border-l-2 border-amber-300 pl-4 py-1">
                  {project.challenges}
                </blockquote>
              </div>

              {/* Solution Box */}
              <div className="p-6 bg-indigo-50/40 border border-indigo-100/60 rounded-3xl space-y-3">
                <div className="flex items-center gap-2 text-brand-primary font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                  <Lightbulb size={16} /> Phương án kỹ thuật & Giải pháp khắc phục
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-semibold pl-4 border-l-2 border-brand-primary py-1">
                  {project.solutions}
                </p>
              </div>
            </div>
          </section>

          {/* Before/After Tool embedded right in the article */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
              Hình ảnh so sánh trực quan Trước & Sau thi công
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
              Hình ảnh ghi nhận thực tế sự khác biệt về mặt thẩm mỹ và chất lượng kỹ thuật:
            </p>

            <div className="bg-slate-50 rounded-[1.5rem] border border-slate-100 p-3 sm:p-5 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Before Image */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm group border border-slate-150 bg-slate-100">
                  <OptimizedImage 
                    src={project.beforeAfter.beforeImage} 
                    alt="Trước khi thi công" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm z-10 pointer-events-none tracking-wider">
                    ⚠️ TRƯỚC SỬA
                  </div>
                </div>

                {/* After Image */}
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full rounded-xl overflow-hidden shadow-sm group border border-slate-150 bg-slate-100">
                  <OptimizedImage 
                    src={project.beforeAfter.afterImage} 
                    alt="Sau khi thi công" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 right-3 bg-emerald-600/90 text-white text-[9px] sm:text-[10px] font-black uppercase px-2.5 py-1 rounded shadow-sm z-10 pointer-events-none tracking-wider">
                    HOÀN THÀNH ✅
                  </div>
                </div>
              </div>

              {/* Minimal caption instructions & context details */}
              <div className="pt-4 border-t border-slate-200/60">
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex gap-2 items-start p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-extrabold text-slate-500 text-[10px] uppercase tracking-wider block">Trước khi thi công</span>
                      <p className="text-slate-600 leading-relaxed font-semibold mt-0.5">{project.beforeAfter.beforeDesc}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start p-2.5 bg-white rounded-xl border border-slate-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <div>
                      <span className="font-extrabold text-emerald-600 text-[10px] uppercase tracking-wider block">Sau khi bàn giao</span>
                      <p className="text-slate-700 leading-relaxed font-semibold mt-0.5">{project.beforeAfter.afterDesc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Specifications details if available */}
          {project.specifications && project.specifications.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Vật tư kỹ thuật chính hãng tin dùng
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
                Cam kết tuyển chọn vật tư chất lượng, chính hãng từ các thương hiệu hàng đầu đạt tiêu chuẩn đo lường kỹ thuật cao:
              </p>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {project.specifications.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center py-2.5 border-b border-dashed border-slate-200 text-xs text-slate-700">
                      <span className="font-bold text-slate-500">{spec.label}</span>
                      <span className="text-brand-secondary font-black text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Quy trình thi công */}
          {project.steps && project.steps.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Quy trình triển khai thi công chuẩn kỹ thuật
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
                Bảo đảm tuyệt đối an toàn vận hành nhờ quy trình làm việc chuẩn hóa bài bản, rõ ràng từng giai đoạn:
              </p>

              <div className="relative pl-6 sm:pl-8 border-l border-slate-200 space-y-8 ml-3 py-2">
                {project.steps.map((step, sIdx) => (
                  <div key={sIdx} className="relative group">
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
            </section>
          )}

          {/* Packages configuration details if available */}
          {project.packages && project.packages.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Báo giá các cấu hình lắp đặt trọn gói
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
                Cung cấp bảng giá thiết bị và nhân công lắp đặt rõ ràng, minh bạch, cam kết không phát sinh chi phí phụ:
              </p>

              <div className="grid sm:grid-cols-3 gap-6">
                {project.packages.map((pkg, idx) => (
                  <div 
                    key={idx} 
                    className={`rounded-3xl p-6 border flex flex-col justify-between transition-all duration-300 relative ${
                      pkg.isPopular 
                        ? 'bg-brand-secondary text-white border-brand-primary shadow-lg scale-[1.01] sm:-translate-y-0.5' 
                        : 'bg-white text-slate-800 border-slate-150 shadow-sm hover:shadow-md'
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
                            : 'bg-slate-50 text-brand-secondary hover:bg-brand-primary hover:text-white border border-slate-200'
                        }`}
                      >
                        Đăng ký tư vấn
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Outcomes review */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
              Kết quả nghiệm thu thực tế
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
              Công trình sau khi hoàn thành bàn giao đã nhận được những phản hồi cực kỳ tích cực từ phía chủ đầu tư:
            </p>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-3xl p-6 md:p-8 border border-emerald-100/65 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-700 font-extrabold text-xs sm:text-sm uppercase tracking-wide">
                <Trophy size={18} /> Kết quả bàn giao ghi nhận tại hiện trường
              </div>
              <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-bold whitespace-pre-line">
                {project.outcome}
              </p>
              <div className="pt-2 text-emerald-600 text-xs font-black tracking-wider uppercase flex items-center gap-1.5">
                <span>★ ★ ★ ★ ★</span>
                <span>Khách hàng đánh giá xuất sắc 5 sao</span>
              </div>
            </div>
          </section>

          {/* Photo Gallery Grid */}
          <section className="space-y-6 pt-4">
            <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
              Thư viện ảnh tư liệu nhật ký thi công trực tiếp
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
              Nhật ký hình ảnh chi tiết các công đoạn bóc dỡ, khảo sát và đấu nối lắp ráp thiết bị của đội thợ:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => handleOpenLightbox(idx)}
                  className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-slate-150 transition-all cursor-zoom-in group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <OptimizedImage 
                      src={img} 
                      alt={`Hình nhật ký ${idx + 1}`} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-3 bg-white/95 rounded-full text-brand-secondary shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn size={18} />
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-slate-900/65 text-white text-[9px] font-bold px-2 py-1 rounded">
                      Ảnh {idx + 1}/{project.gallery.length}
                    </div>
                  </div>
                  
                  <div className="p-3.5 bg-slate-50 border-t border-slate-150 flex-grow">
                    <p className="text-xs font-bold text-slate-700 leading-relaxed text-center">
                      {getPhotoCaption(project, idx)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Services list Box in blog format */}
          <section className="bg-brand-secondary text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-8 -translate-y-8" />
            <div>
              <h3 className="font-black uppercase tracking-wider text-brand-primary text-[10px]">Hạng mục kỹ thuật chi tiết</h3>
              <h4 className="font-black text-white text-base sm:text-lg uppercase tracking-tight mt-1">Các hạng mục cơ điện đã thực hiện</h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {project.services.map((srv, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-100 leading-relaxed font-bold">{srv}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Accordion FAQ section at end of post */}
          {project.faq && project.faq.length > 0 && (
            <section className="space-y-6 pt-4">
              <h2 className="text-lg sm:text-xl font-black text-brand-secondary uppercase tracking-tight flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-brand-primary rounded-full inline-block" />
                Câu hỏi thường gặp liên quan đến công trình
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-bold">
                Tư vấn nhanh các thắc mắc về kỹ thuật thi công, chi phí lắp đặt và chính sách bảo hành:
              </p>

              <div className="space-y-4">
                {project.faq.map((item, index) => (
                  <div key={index} className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-2">
                    <h4 className="font-black text-brand-secondary text-xs sm:text-sm flex gap-2">
                      <span className="text-brand-primary font-black">Q:</span>
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed pl-5 whitespace-pre-line font-semibold">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Author footer bio card */}
          <section className="border-t border-slate-100 pt-10">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center border border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-brand-primary text-white flex items-center justify-center font-black text-2xl uppercase border border-brand-primary/20 shrink-0 shadow-sm">
                HT
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <span className="text-[10px] text-brand-primary font-black uppercase tracking-widest block">Kỹ sư biên tập chính</span>
                <h4 className="text-sm sm:text-base font-black text-brand-secondary">Kỹ sư Nguyễn Hoàng Tuấn (CEO Hoàng Tuấn MPE)</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  Hơn 10 năm kinh nghiệm trong lĩnh vực cơ điện dân dụng, công nghiệp, nhà thông minh Smarthome, siêu âm dò tìm rò rỉ nước bồn bể âm sàn tại Lâm Đồng, TP.HCM và các tỉnh lân cận. Cam kết tư vấn nhiệt tình, thi công chuyên nghiệp chuẩn hóa MPE.
                </p>
              </div>
            </div>
          </section>

          {/* Call to action inside blog */}
          <section className="text-center bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-6 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />
            <Phone size={36} className="text-brand-primary mx-auto" />
            <h3 className="font-black uppercase tracking-tight text-lg sm:text-xl text-white">Bạn cần giải pháp khắc phục sự cố tương tự?</h3>
            <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed font-bold">
              Đặt lịch khảo sát miễn phí ngay hôm nay. Đội thợ chuyên môn cao của Hoàng Tuấn MPE luôn sẵn sàng túc trực 24/7 phục vụ nhanh chóng và uy tín tại khu vực {mappedDisplayName}.
            </p>
            <div className="pt-2">
              <a 
                href="tel:0389011315"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-primary text-white font-black rounded-xl text-xs sm:text-sm uppercase tracking-wider hover:bg-brand-secondary transition-all shadow-md"
              >
                Đăng ký khảo sát hỏa tốc 24/7 (0389.011.315) <ArrowRight size={16} />
              </a>
            </div>
          </section>

        </div>

        {/* Related Projects Carousel/Grid block inside container */}
        {relatedProjects.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-200 space-y-8">
            <h3 className="font-black text-brand-secondary uppercase tracking-tight text-center text-lg sm:text-xl">Các hồ sơ thi công liên quan khác</h3>
            <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedProjects.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden group">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
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
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-semibold">{item.shortDescription}</p>
                    <div className="pt-2 flex justify-between items-center border-t border-slate-50 pt-3">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.location}</span>
                      <Link 
                        to={`${siteLocationPrefix}/du-an/${item.slug}`}
                        className="flex items-center gap-1.5 text-xs font-black text-brand-primary hover:text-brand-secondary"
                      >
                        Đọc bài viết <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </article>

      {/* Full screen Lightbox overlay modal */}

      {/* Full screen Lightbox overlay modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col justify-between p-4 md:p-6 select-none"
          >
            {/* Header section with closing handle */}
            <div className="flex items-center justify-between text-white w-full max-w-5xl mx-auto z-10 pt-2">
              <div className="text-xs md:text-sm font-bold text-slate-300">
                Nhật ký: <span className="text-white font-black">{project.title}</span>
              </div>
              <button 
                onClick={handleCloseLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X size={20} />
              </button>
            </div>

            {/* Main view container */}
            <div className="relative flex-grow flex items-center justify-center max-w-5xl w-full mx-auto">
              {/* Prev button */}
              <button
                onClick={handlePrevLightbox}
                className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Previous Lightbox Image"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="max-h-[70vh] md:max-h-[75vh] w-full flex items-center justify-center">
                <img 
                  src={project.gallery[lightboxIndex]} 
                  alt="Construction Diary enlarged view" 
                  className="max-h-[70vh] md:max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/5"
                  onClick={(e) => e.stopPropagation()}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Next button */}
              <button
                onClick={handleNextLightbox}
                className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Next Lightbox Image"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Bottom Caption bar */}
            <div className="w-full max-w-4xl mx-auto text-center space-y-2 pb-4 z-10">
              <p className="text-sm md:text-base font-black text-white px-6">
                {getPhotoCaption(project, lightboxIndex)}
              </p>
              <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                Ảnh {lightboxIndex + 1} trên {project.gallery.length} • Click vùng trống để thoát xem ảnh
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Final standard CTA */}
      <FinalCTA />
    </div>
  );
}
