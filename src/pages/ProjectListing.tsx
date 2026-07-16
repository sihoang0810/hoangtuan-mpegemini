import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, ArrowRight, Hammer, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import FinalCTA from '../components/FinalCTA';
import { getProjects, getProjectsSync, CMSProject, client } from '../lib/sanity';

export default function ProjectListing() {
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;
  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [projectsData, setProjectsData] = useState<CMSProject[]>(() => getProjectsSync(locationSlug));

  useEffect(() => {
    let active = true;

    getProjects(locationSlug).then((data) => {
      if (active && data) {
        setProjectsData(data);
      }
    });

    const subscription = client
      .listen(`*[_type == "project"]`)
      .subscribe((update) => {
        if (active) {
          getProjects(locationSlug).then((data) => {
            if (active && data) setProjectsData(data);
          });
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [locationSlug]);

  // State to track active preview image index for each project card
  const [projectImageIndexes, setProjectImageIndexes] = useState<Record<string, number>>({});

  // Collect unique categories from projects data
  const categories = useMemo(() => {
    const list = new Set(projectsData.map(p => p.category || ''));
    return ['all', ...Array.from(list).filter(Boolean)];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    return projectsData.filter(project => {
      const categoryMatch = activeCategory === 'all' || project.category === activeCategory;
      const searchMatch = 
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchQuery, projectsData]);

  // Handle switching preview images for a specific project
  const handleSetImageIndex = (projectId: string, index: number) => {
    setProjectImageIndexes(prev => ({
      ...prev,
      [projectId]: index
    }));
  };

  const handleNextImage = (project: CMSProject, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const imgs = project.images || project.gallery || [];
    if (!imgs.length) return;
    const currentIdx = projectImageIndexes[project.id] || 0;
    const nextIdx = (currentIdx + 1) % imgs.length;
    handleSetImageIndex(project.id, nextIdx);
  };

  const handlePrevImage = (project: CMSProject, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const imgs = project.images || project.gallery || [];
    if (!imgs.length) return;
    const currentIdx = projectImageIndexes[project.id] || 0;
    const prevIdx = (currentIdx - 1 + imgs.length) % imgs.length;
    handleSetImageIndex(project.id, prevIdx);
  };

  return (
    <div id="project-listing" className="pt-20 bg-slate-50 min-h-screen">
      <PageSEO pageType="general" />

      {/* Hero Banner Section with Rich SEO Keywords */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-100 py-12 md:py-16 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                <Hammer size={12} className="animate-bounce" />
                <span>Hoàng Tuấn MPE - Album Dự Án Đã Hoàn Thành</span>
              </div>
              
              <h1 className="font-black text-brand-secondary uppercase tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl">
                Dự Án <span className="text-brand-primary">Thi Công Thực Tế</span> Tiêu Biểu
              </h1>
              
              <p className="text-sm sm:text-base md:text-lg text-slate-500 font-medium leading-relaxed max-w-3xl pt-2">
                Tổng hợp các công trình sửa chữa điện nước tại Bảo Lộc & Hồ Chí Minh, dò tìm rò rỉ nước ngầm âm sàn bằng máy siêu âm, lắp đặt camera giám sát vườn rẫy sầu riêng 4G năng lượng mặt trời và nâng cấp hệ thống cửa cuốn thông minh kết nối điện thoại chính hãng chất lượng cao.
              </p>

              {/* Quick SEO Badges list */}
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-md">#Sửa_Điện_Nước_Bảo_Lộc</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-md">#Siêu_Âm_Rò_Rỉ_Nước</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-md">#Lắp_Camera_Giám_Sát_Lâm_Đồng</span>
                <span className="bg-white border border-slate-200 px-3 py-1 rounded-md">#Cửa_Cuốn_Thông_Minh_MPE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Controls & Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2.5 w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-brand-secondary border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'TẤT CẢ HẠNG MỤC' : cat}
                </button>
              ))}
            </div>

            {/* Elegant Search Input */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors duration-300" size={18} />
              <input 
                type="text"
                placeholder="Tìm dự án, địa điểm, từ khóa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all font-bold text-brand-secondary shadow-sm"
              />
            </div>
          </div>

          {/* Projects Listing Grid & Lists */}
          <AnimatePresence mode="popLayout">
            {filteredProjects.length > 0 ? (
              <motion.div 
                layout
                className="grid gap-10 md:gap-14 lg:gap-16"
              >
                {filteredProjects.map((project, index) => {
                  const isEven = index % 2 === 0;
                  const imgs = project.images || project.gallery || (project.image ? [project.image] : []);
                  const activeImgIdx = projectImageIndexes[project.id] || 0;
                  const activeImg = imgs[activeImgIdx] || imgs[0] || '';

                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 border border-slate-100 p-6 md:p-8 lg:p-10"
                    >
                      <div className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 xl:gap-14 items-center`}>
                        
                        {/* Interactive Thumbnail Image Container */}
                        <div className="w-full lg:w-1/2 flex-shrink-0 space-y-4">
                          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-md group bg-slate-100 border border-slate-100">
                            {/* Slide transition overlay container */}
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeImgIdx}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-full h-full"
                              >
                                {activeImg ? (
                                  <OptimizedImage
                                    src={activeImg}
                                    alt={`${project.title} - Ảnh ${activeImgIdx + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-slate-200">
                                    <span className="text-slate-400">Không có ảnh</span>
                                  </div>
                                )}
                              </motion.div>
                            </AnimatePresence>

                            {/* Hover Overlay info */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 pointer-events-none">
                              <span className="flex items-center gap-1.5 text-white text-xs font-black bg-brand-primary px-3 py-1.5 rounded-lg shadow-md">
                                <Eye size={14} /> Xem album ảnh thực tế
                              </span>
                            </div>

                            {/* Category Badge */}
                            {project.category && (
                              <div className="absolute top-4 left-4 z-10">
                                <span className="bg-brand-primary text-white text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest shadow-md">
                                  {project.category}
                                </span>
                              </div>
                            )}

                            {/* Quick Navigation Arrows for multi-images */}
                            {imgs.length > 1 && (
                              <>
                                <button
                                  onClick={(e) => handlePrevImage(project, e)}
                                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-all hover:scale-105 z-10"
                                  aria-label="Previous Project Image"
                                >
                                  <ChevronLeft size={18} />
                                </button>
                                <button
                                  onClick={(e) => handleNextImage(project, e)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow transition-all hover:scale-105 z-10"
                                  aria-label="Next Project Image"
                                >
                                  <ChevronRight size={18} />
                                </button>
                              </>
                            )}
                          </div>

                          {/* Image Switcher Thumbnails Indicator */}
                          {imgs.length > 1 && (
                            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                              {imgs.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => handleSetImageIndex(project.id, idx)}
                                  className={`relative w-14 sm:w-16 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${
                                    activeImgIdx === idx 
                                      ? 'border-brand-primary scale-110 shadow-sm' 
                                      : 'border-slate-200 opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <img 
                                    src={img} 
                                    alt="thumbnail" 
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Text summaries content */}
                        <div className="w-full lg:w-1/2 space-y-5">
                          <div className="flex flex-wrap gap-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            {project.location && (
                              <div className="flex items-center gap-1 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-150">
                                <MapPin size={13} className="text-brand-primary" />
                                <span>{project.location}</span>
                              </div>
                            )}
                            {project.completionDate && (
                              <div className="flex items-center gap-1 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-150">
                                <Calendar size={13} className="text-brand-primary" />
                                <span>Bàn giao: {project.completionDate}</span>
                              </div>
                            )}
                          </div>

                          <h3 className="text-xl sm:text-2xl font-black text-brand-secondary leading-snug tracking-tight hover:text-brand-primary transition-colors">
                            <Link to={`${siteLocationPrefix}/du-an/${project.slug}`}>
                              {project.title}
                            </Link>
                          </h3>

                          <p className="text-slate-500 leading-relaxed text-sm whitespace-pre-line">
                            {project.shortDescription || project.description}
                          </p>

                          {/* Brief Key services list */}
                          {project.services && project.services.length > 0 && (
                            <div className="pt-2 space-y-1.5">
                              <span className="text-[11px] font-black text-brand-primary uppercase tracking-wider block">Các hạng mục chính thực hiện:</span>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
                                {project.services.slice(0, 4).map((s, sIdx) => (
                                  <div key={sIdx} className="flex items-start gap-1.5">
                                    <span className="text-brand-primary shrink-0">✓</span>
                                    <span className="line-clamp-1">{s}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="pt-4 flex flex-wrap gap-4 items-center">
                            <Link
                              to={`${siteLocationPrefix}/du-an/${project.slug}`}
                              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-secondary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/10 transition-all shadow-md group"
                            >
                              <span>Chi tiết hồ sơ thi công & Báo giá</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
                            </Link>
                            
                            <a 
                              href="tel:0389011315"
                              className="text-xs font-black uppercase tracking-wider text-brand-primary hover:text-brand-secondary transition-colors py-2 px-3 hover:bg-slate-100 rounded-lg"
                            >
                              📞 Liên hệ Khảo sát
                            </a>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm"
              >
                <p className="text-slate-400 font-extrabold mb-4">Không tìm thấy dự án thi công nào khớp với từ khóa tìm kiếm của bạn.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="bg-brand-primary text-white font-black text-xs uppercase px-6 py-3.5 rounded-full hover:bg-brand-secondary transition-all"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* SEO Content Section at the Bottom */}
      <section className="bg-white border-t border-slate-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-brand-secondary uppercase tracking-tight">
              Dịch vụ Sửa Chữa Cơ Điện Nước Uy Tín Tại Bảo Lộc & TP.HCM
            </h2>
            <div className="text-slate-500 text-sm leading-relaxed space-y-4">
              <p>
                Hoàng Tuấn MPE tự hào là đối tác kỹ thuật tin cậy chuyên nhận thi công, cải tạo và sửa chữa hệ thống điện nước, điện nhẹ dân dụng và công nghiệp. Chúng tôi có đội ngũ thợ lành nghề, được trang bị máy móc chuyên dụng tối tân, phục vụ khẩn cấp tại các địa bàn thành phố Bảo Lộc, Lâm Đồng và các quận huyện của Thành phố Hồ Chí Minh.
              </p>
              <p>
                Thế mạnh hàng đầu của Hoàng Tuấn MPE bao gồm dịch vụ <strong className="text-brand-secondary">dò tìm rò rỉ nước ngầm</strong> bằng máy siêu âm nhập khẩu hiện đại, cam kết xác định chính xác 100% vị trí bể rò rỉ âm nền âm tường, chống thất thoát nước hiệu quả cho nhà phố, chung cư và nhà xưởng mà không phá hỏng kết cấu sàn gạch.
              </p>
              <p>
                Ngoài ra, chúng tôi chuyên cung cấp và <strong className="text-brand-secondary">lắp đặt camera Bảo Lộc</strong> uy tín, chuyên nghiệp. Các dòng camera giám sát vườn sầu riêng sử dụng năng lượng mặt trời và sim 4G độc lập giúp bà con nông dân bảo vệ tài sản, chống trộm từ xa hiệu quả 24/7. Hạng mục nâng cấp <strong className="text-brand-secondary">cửa cuốn thông minh</strong> điều khiển qua điện thoại mang lại cuộc sống an toàn, tiện nghi tối ưu cho mỗi ngôi nhà.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA widget */}
      <FinalCTA />
    </div>
  );
}
