import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts, CMSBlogPost } from '../lib/sanity';
import BlogCard from './BlogCard';

const Blog = () => {
  const [posts, setPosts] = useState<CMSBlogPost[]>([]);

  useEffect(() => {
    let active = true;
    getBlogPosts().then((data) => {
      if (active) setPosts(data);
    });
    return () => {
      active = false;
    };
  }, []);

  // Take latest 3 posts
  const recentPosts = posts.slice(0, 3);


  return (
    <section id="blog" className="py-24 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-500 text-xs font-bold rounded-full mb-6 uppercase tracking-widest"
            >
              Kiến thức chuyên môn
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-brand-secondary uppercase leading-[0.9] tracking-tighter"
            >
              Blog & <span className="text-brand-primary">Kinh Nghiệm</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              to="/blog" 
              className="group flex items-center gap-3 text-brand-secondary font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition-colors"
            >
              Xem tất cả bài viết
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                <ArrowRight size={20} />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
