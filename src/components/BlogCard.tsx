import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
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
      <Link to={`${siteLocationPrefix}/blog/${post.slug}`} className="relative h-64 overflow-hidden block">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
            {post.category}
          </span>
        </div>
      </Link>
      
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-brand-primary" />
            {post.date}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-brand-primary" />
            {post.readTime}
          </div>
        </div>
        
        <Link to={`${siteLocationPrefix}/blog/${post.slug}`} className="block">
          <h3 className="text-xl font-bold text-brand-secondary mb-4 leading-tight group-hover:text-brand-primary transition-colors line-clamp-2 tracking-tight">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
          {post.excerpt}
        </p>

        <div className="mt-auto pt-6 border-t border-slate-50">
          <Link 
            to={`${siteLocationPrefix}/blog/${post.slug}`} 
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
