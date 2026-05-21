import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, AlertCircle } from 'lucide-react';
import { BLOG_POSTS, BLOG_CATEGORIES } from '../data/blog';
import BlogCard from '../components/BlogCard';
import FinalCTA from '../components/FinalCTA';
import Breadcrumbs from '../components/Breadcrumbs';
import { getBlogPosts, CMSBlogPost } from '../lib/sanity';

export default function BlogListing() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbPosts, setDbPosts] = useState<CMSBlogPost[]>([]);

  useEffect(() => {
    let active = true;
    getBlogPosts().then(data => {
      if (active) setDbPosts(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const postSource = dbPosts.length > 0 ? dbPosts : BLOG_POSTS;

  const filteredPosts = useMemo(() => {
    return postSource.filter(post => {
      const matchesCategory = activeCategory === 'all' || post.category === BLOG_CATEGORIES.find(c => c.id === activeCategory)?.title;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, postSource]);


  return (
    <div className="pt-20">
      {/* Header & Breadcrumbs */}
      <div className="bg-slate-50 py-4 border-b border-slate-100">
        <div className="section-container">
          <Breadcrumbs items={[{ label: 'Blog', active: true }]} />
        </div>
      </div>

      <section className="bg-white py-16 md:py-24">
        <div className="section-container">
          <div className="max-w-3xl mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-7xl font-bold text-brand-secondary mb-8 uppercase tracking-tighter">
                Blog & <span className="text-brand-primary">Kiến Thức</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Nơi chia sẻ kiến thức chuyên sâu về điện nước, camera an ninh và các mẹo hay giúp bảo vệ ngôi nhà của bạn từ đội ngũ kỹ sư Hoàng Tuấn MPE.
              </p>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {BLOG_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                    activeCategory === cat.id 
                      ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/30 scale-105' 
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {cat.icon && <cat.icon size={14} />}
                  {cat.title}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-96 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:bg-white transition-all font-bold text-brand-secondary"
              />
            </div>
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredPosts.map((post, idx) => (
                  <BlogCard key={post.id} post={post} index={idx} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
              <AlertCircle size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-brand-secondary mb-2 uppercase tracking-tight">Không tìm thấy kết quả</h3>
              <p className="text-slate-500">Thử tìm kiếm với từ khóa khác hoặc lọc theo danh mục khác.</p>
              <button 
                onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                className="mt-6 text-brand-primary font-bold uppercase text-xs tracking-widest hover:underline"
              >
                Đặt lại bộ lọc
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCTA />
    </div>
  );
}
