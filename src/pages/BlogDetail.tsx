import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Link as LinkIcon, 
  ArrowLeft,
  ChevronRight,
  MessageCircle,
  Phone,
  Bookmark,
  Hash
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blog';
import FinalCTA from '../components/FinalCTA';
import Breadcrumbs from '../components/Breadcrumbs';
import BlogCard from '../components/BlogCard';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <div className="section-container">
          <h1 className="text-3xl font-bold text-brand-secondary mb-4 uppercase">Bài viết không tồn tại</h1>
          <p className="text-slate-500 mb-8">Nội dung bạn đang tìm kiếm có thể đã bị xóa hoặc thay đổi địa chỉ.</p>
          <Link to="/blog" className="inline-block bg-brand-primary text-white px-8 py-3 rounded-xl font-bold">
            Quay lại Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-20">
      {/* Header & Breadcrumbs */}
      <div className="bg-slate-50 py-4 border-b border-slate-100">
        <div className="section-container">
          <Breadcrumbs 
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title, active: true }
            ]} 
          />
        </div>
      </div>

      <section className="bg-white py-12 md:py-20">
        <div className="section-container grid lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 text-brand-primary font-bold uppercase text-xs tracking-widest mb-6">
                <Hash size={14} />
                {post.category}
              </div>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-secondary mb-8 leading-[1.1] tracking-tighter uppercase">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 py-6 border-y border-slate-100 mb-10 text-sm font-bold text-slate-400 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-brand-primary" />
                  <span className="text-brand-secondary">{post.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-brand-primary" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-brand-primary" />
                  {post.readTime}
                </div>
              </div>

              <div className="aspect-video bg-slate-100 rounded-[3rem] overflow-hidden mb-12 shadow-2xl shadow-slate-200">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Table of Contents - Mobile only */}
              <div className="lg:hidden bg-slate-50 p-8 rounded-3xl mb-12 border border-slate-100">
                <h4 className="text-lg font-bold text-brand-secondary mb-4 uppercase flex items-center gap-2 tracking-tight">
                  <Bookmark size={20} className="text-brand-primary" />
                  Mục lục bài viết
                </h4>
                <ul className="space-y-3">
                  <li className="text-slate-600 font-bold hover:text-brand-primary transition-colors cursor-pointer">1. Giới thiệu chung</li>
                  <li className="text-slate-600 font-bold hover:text-brand-primary transition-colors cursor-pointer">2. Nguyên nhân chính</li>
                  <li className="text-slate-600 font-bold hover:text-brand-primary transition-colors cursor-pointer">3. Cách xử lý an toàn</li>
                  <li className="text-slate-600 font-bold hover:text-brand-primary transition-colors cursor-pointer">4. Lời khuyên chuyên gia</li>
                </ul>
              </div>

              {/* Real Content Rendering */}
              <div className="prose prose-lg max-w-none prose-slate prose-headings:text-brand-secondary prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-brand-secondary prose-a:text-brand-primary prose-img:rounded-[2rem] blog-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                
                {/* FAQ specific to blog */}
                <div className="mt-20 p-10 bg-brand-secondary rounded-[3rem] text-white">
                  <h3 className="text-3xl font-bold mb-8 uppercase text-white tracking-tighter">Câu hỏi thường gặp</h3>
                  <div className="space-y-6">
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="font-bold mb-2 text-brand-primary uppercase tracking-tight">Có nên tự sửa điện không?</h4>
                      <p className="text-white/70">Tuyệt đối không nên nếu bạn không có chuyên môn và thiết bị bảo hộ. Điện là rủi ro cực kỳ nguy hiểm.</p>
                    </div>
                     <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                      <h4 className="font-bold mb-2 text-brand-primary uppercase tracking-tight">Chi phí sửa chữa là bao nhiêu?</h4>
                      <p className="text-white/70">Hoàng Tuấn MPE luôn kiểm tra và báo giá miễn phí trước khi thực hiện. Bạn hoàn toàn có quyền từ chối nếu giá không phù hợp.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags & Sharing */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-10 mt-12 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-500 rounded-xl text-xs font-bold uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Chia sẻ:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                      <Facebook size={18} />
                    </button>
                    <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                      <Twitter size={18} />
                    </button>
                    <button className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:bg-brand-primary hover:text-white transition-all">
                      <LinkIcon size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Table of Contents - Desktop */}
            <div className="hidden lg:block sticky top-24 bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100">
               <h4 className="text-xl font-bold text-brand-secondary mb-6 uppercase flex items-center gap-2 tracking-tight">
                <Bookmark size={24} className="text-brand-primary" />
                Mục lục
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group cursor-pointer text-sm">
                  <span className="text-brand-primary font-bold mt-1">01</span>
                  <span className="text-slate-600 font-bold group-hover:text-brand-primary transition-colors leading-tight">Tại sao sự cố thường xuyên xảy ra?</span>
                </li>
                 <li className="flex items-start gap-3 group cursor-pointer text-sm">
                  <span className="text-brand-primary font-bold mt-1">02</span>
                  <span className="text-slate-600 font-bold group-hover:text-brand-primary transition-colors leading-tight">Dấu hiệu nhận biết sớm nhất</span>
                </li>
                 <li className="flex items-start gap-3 group cursor-pointer text-sm">
                  <span className="text-brand-primary font-bold mt-1">03</span>
                  <span className="text-slate-600 font-bold group-hover:text-brand-primary transition-colors leading-tight">Quy trình xử lý an toàn kỹ thuật</span>
                </li>
                 <li className="flex items-start gap-3 group cursor-pointer text-sm">
                  <span className="text-brand-primary font-bold mt-1">04</span>
                  <span className="text-slate-600 font-bold group-hover:text-brand-primary transition-colors leading-tight">Kết luận và lời khuyên</span>
                </li>
              </ul>

              <div className="mt-10 pt-10 border-t border-slate-200">
                <div className="bg-brand-primary/10 p-6 rounded-3xl">
                  <h5 className="font-bold text-brand-secondary text-sm uppercase mb-2 tracking-tight">Bạn cần tư vấn thêm?</h5>
                  <p className="text-xs text-slate-500 font-medium mb-4 leading-relaxed">Kỹ thuật viên của Hoàng Tuấn MPE sẵn sàng giải đáp thắc mắc 24/7 qua Zalo.</p>
                  <a href="https://zalo.me/0389011315" className="flex items-center justify-center gap-2 bg-white text-brand-primary py-3 rounded-xl font-bold text-xs uppercase tracking-widest shadow-sm hover:scale-105 transition-all">
                    <MessageCircle size={14} />
                    Chat Zalo ngay
                  </a>
                </div>
              </div>
            </div>

            {/* Sticky contact CTA for sidebar bottom or floating */}
            <div className="bg-brand-secondary p-10 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-2xl -mr-16 -mt-16" />
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Cần thợ ngay?</h4>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Có mặt sau 30 phút tại Bảo Lộc. Kiểm tra khảo sát hoàn toàn miễn phí.</p>
                <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white w-full py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-primary/20 tracking-tight">
                  <Phone size={20} />
                  0389.011.315
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-secondary mb-12 uppercase tracking-tighter">
              Bài viết <span className="text-brand-primary">liên quan</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((rp, idx) => (
                <BlogCard key={rp.id} post={rp} index={idx} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCTA />
    </div>
  );
}
