import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { BlogPost } from '../data/blog';
import { useLocation } from '../context/LocationContext';

interface BlogCardProps {
  key?: string | number;
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: Math.min((index % 3) * 0.05, 0.15), duration: 0.3 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col h-full"
    >
      <Link 
        to={`${siteLocationPrefix}/blog/${post?.slug || '#'}`} 
        onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/blog/${post?.slug || '#'}`)}
        className="relative h-64 overflow-hidden block text-brand-secondary"
      >
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={post?.image || 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800'}
          alt={post?.title || 'Bài viết'}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
            {post?.category || 'Chưa phân loại'}
          </span>
        </div>
        {(post as any)?.isPinned && (
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
              <Star size={10} fill="currentColor" />
              Nổi bật
            </span>
          </div>
        )}
      </Link>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-brand-primary" />
            {post?.date || ''}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-brand-primary" />
            {post?.readTime || ''}
          </div>
        </div>
        
        <Link 
          to={`${siteLocationPrefix}/blog/${post?.slug || '#'}`} 
          onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/blog/${post?.slug || '#'}`)}
          className="block"
        >
          <h3 className="text-xl font-bold text-brand-secondary mb-4 leading-tight group-hover:text-brand-primary transition-colors line-clamp-2 tracking-tight">
            {post?.title || 'Tuyệt tác từ nhà Hoàng Tuấn'}
          </h3>
        </Link>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium" dangerouslySetInnerHTML={{ __html: post?.excerpt || '' }} />

        <div className="mt-auto pt-6 border-t border-slate-50">
          <Link 
            to={`${siteLocationPrefix}/blog/${post?.slug || '#'}`} 
            onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/blog/${post?.slug || '#'}`)}
            className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase text-xs tracking-widest hover:gap-4 transition-all"
          >
            Đọc bài viết
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
