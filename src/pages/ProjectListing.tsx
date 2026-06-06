import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, ArrowRight, Grid, Filter, Hammer } from 'lucide-react';
import { PROJECTS_DATA, Project } from '../data/projectsData';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import { Link } from 'react-router-dom';
import OptimizedImage from '../components/OptimizedImage';
import FinalCTA from '../components/FinalCTA';

export default function ProjectListing() {
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;
  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sưu tập danh mục độc nhất từ tập dữ liệu dự án
  const categories = useMemo(() => {
    const list = new Set(PROJECTS_DATA.map(p => p.category));
    return ['all', ...Array.from(list)];
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div id="project-listing" className="pt-20 bg-slate-50 min-h-screen pb-20 md:pb-0">
      <PageSEO pageType="general" />

      {/* Hero Banner Section */}
      <section className="bg-white border-b border-slate-100 py-12 md:py-16 lg:py-24 md:py-24 relative overflow-hidden">
        {/* Decorative Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-50 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-black text-xs uppercase tracking-widest px-4 py-2 rounded-full">
                <Hammer size={12} />
                <span>Hồ Sơ Năng Lực Thực Tế</span>
              </div>
              <h1 className="font-black text-brand-secondary uppercase tracking-tight leading-[1.1]">
                Dự Án <span className="text-brand-primary">Thi Công</span> Thực Tế
              </h1>
              <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl pt-2">
                Hoàng Tuấn MPE tự hào mang đến các giải pháp thi công điện nước, dò tìm rò rỉ âm sàn, và lắp đặt camera an ninh thông minh đỉnh cao tại {mappedDisplayName} và khu vực lân cận.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Controls Bar */}
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between mb-12">
            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105' 
                      : 'bg-white text-slate-500 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat === 'all' ? 'TẤT CẢ DỰ ÁN' : cat.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Elegant Search Input */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors duration-300" size={18} />
              <input 
                type="text"
                placeholder="Tìm dự án, địa điểm..."
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
                className="grid gap-6 md:gap-12 lg:gap-16"
              >
                {filteredProjects.map((project, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white rounded-[2.5rem] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100/80 p-6 md:p-8"
                    >
                      <div className={`flex flex-col md:flex-row ${isEven ? '' : 'md:flex-row-reverse'} gap-8 md:gap-12 items-center`}>
                        {/* Thumbnail Image Container */}
                        <div className="w-full md:w-1/2 flex-shrink-0">
                          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg group">
                            <OptimizedImage
                              src={project.images[0] || project.gallery[0]}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-brand-primary text-white text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest">
                                {project.category}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Text summaries content */}
                        <div className="w-full md:w-1/2 space-y-5">
                          <div className="flex flex-wrap gap-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl">
                              <MapPin size={13} className="text-brand-primary" />
                              <span>{project.location}</span>
                            </div>
                            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1.5 rounded-xl">
                              <Calendar size={13} className="text-brand-primary" />
                              <span>{project.completionDate}</span>
                            </div>
                          </div>

                          <h3 className="font-black text-brand-secondary leading-tight tracking-tight hover:text-brand-primary transition-colors">
                            <Link to={`${siteLocationPrefix}/du-an/${project.slug}`}>
                              {project.title}
                            </Link>
                          </h3>

                          <p className="text-slate-500 leading-relaxed text-sm">
                            {project.shortDescription}
                          </p>

                          <div className="pt-2">
                            <Link
                              to={`${siteLocationPrefix}/du-an/${project.slug}`}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-secondary text-white rounded-xl text-xs font-black uppercase tracking-wider hover:bg-brand-primary transition-all shadow-md shadow-brand-secondary/15 group"
                            >
                              <span>Chi tiết hồ sơ thi công</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
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
                className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
              >
                <p className="text-slate-400 font-bold mb-4">Không tìm thấy dự án thi công nào khớp với từ khóa của bạn.</p>
                <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="bg-brand-primary text-white font-bold text-xs uppercase px-6 py-3 rounded-full"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Final CTA widget */}
      <FinalCTA />
    </div>
  );
}
