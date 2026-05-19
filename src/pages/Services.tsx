import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  Droplet, 
  Video, 
  Search, 
  CheckCircle2, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Wrench,
  ThumbsUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import ProcessTimeline, { FAQSection } from '../components/ExtraSections';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import FeaturedProducts from '../components/FeaturedProducts';
import FinalCTA from '../components/FinalCTA';

const CATEGORIES = [
  {
    id: 'electrical',
    title: 'Dịch Vụ Điện Dân Dụng',
    description: 'Chúng tôi cung cấp giải pháp sửa chữa và lắp đặt hệ thống điện gia đình an toàn, chuyên nghiệp, bảo hành dài hạn.',
    icon: Zap,
    color: 'blue'
  },
  {
    id: 'plumbing',
    title: 'Dịch Vụ Nước Dân Dụng',
    description: 'Xử lý triệt để các sự cố về nước, máy bơm, đường ống âm tường với đội ngũ thợ lành nghề.',
    icon: Droplet,
    color: 'cyan'
  },
  {
    id: 'camera',
    title: 'Dịch Vụ Camera Giám Sát',
    description: 'Lắp đặt hệ thống camera an ninh hiện đại, quan sát từ xa qua điện thoại, bảo mật tuyệt đối cho gia đình và doanh nghiệp.',
    icon: Video,
    color: 'indigo'
  },
  {
    id: 'detection',
    title: 'Dịch Vụ Siêu Âm Dò Tìm Rò Rỉ & Ống Âm',
    description: 'Ứng dụng công nghệ siêu âm tiên tiến nhất để phát hiện vị trí rò rỉ nước và đường ống ngầm không cần đục phá.',
    icon: Search,
    color: 'amber'
  }
];

interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
}

interface CategorySectionProps {
  category: CategoryData;
  services: Service[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, services }) => {
  return (
    <section id={category.id} className="py-20 border-b border-slate-100 last:border-0">
      <div className="section-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-brand-primary mb-4">
              <category.icon size={32} />
              <span className="font-bold tracking-widest uppercase">{category.title}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-secondary mb-6 uppercase tracking-tighter">
              {category.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {category.description}
            </p>
          </div>
          <div className="flex gap-4">
            <a href="tel:0389011315" className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
              <Phone size={18} />
              Gọi Ngay
            </a>
            <a href="https://zalo.me/0389011315" className="flex items-center gap-2 bg-[#0068ff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all">
              <MessageCircle size={18} />
              Zalo
            </a>
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col overflow-hidden group hover:border-brand-primary/30 transition-all"
            >
              <div className="h-48 bg-slate-100 relative group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-${service.id === 'e1' ? '1558211583-d26f610c1eb1' : service.id === 'p1' ? '1585704032938-164741364232' : service.id === 'c1' ? '1557597774-9d273605dfa9' : '1504148455328-c39695b8a592'}?auto=format&fit=crop&q=80&w=800`}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-brand-primary uppercase">
                  {category.title}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-brand-secondary mb-4 group-hover:text-brand-primary transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 flex-1">
                  {service.shortDescription}
                </p>
                <div className="space-y-3 mb-6">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-brand-secondary">
                      <CheckCircle2 size={14} className="text-brand-primary" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <span className="text-xs text-slate-400 block mb-1">Giá tham khảo</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-brand-secondary">{service.pricing[0].price}</span>
                    <span className="text-xs text-slate-400">/{service.pricing[0].unit || 'lầu'}</span>
                  </div>
                </div>
                <Link 
                  to={`/dich-vu/${service.slug}`}
                  className="flex items-center justify-between font-bold text-brand-primary hover:gap-1 transition-all group/btn"
                >
                  XEM CHI TIẾT
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pricing Table */}
        <div className="bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 overflow-hidden">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-2xl font-bold text-brand-secondary uppercase">Bảng giá tham khảo {category.id === 'electrical' ? 'Điện' : category.id === 'plumbing' ? 'Nước' : category.id === 'camera' ? 'Camera' : 'Siêu âm'}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 font-bold text-brand-secondary">Tên dịch vụ</th>
                  <th className="py-4 font-bold text-brand-secondary">Đơn giá</th>
                  <th className="py-4 font-bold text-brand-secondary">Bảo hành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((s) => (
                  <React.Fragment key={s.id}>
                    {s.pricing.map((p, pIdx) => (
                      <tr key={`${s.id}-${pIdx}`} className="group hover:bg-white transition-colors">
                        <td className="py-4 text-slate-600 font-medium">{p.item}</td>
                        <td className="py-4 text-brand-primary font-bold uppercase">{p.price}</td>
                        <td className="py-4 text-slate-500 text-sm">3 - 12 tháng</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-xs text-slate-400">
            * Lưu ý: Giá trên chỉ mang tính chất tham khảo. Quý khách vui lòng liên hệ để được thợ kiểm tra và báo giá thực tế chính xác nhất.
          </div>
        </div>
      </div>
    </section>
  );
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-brand-secondary">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent rounded-full blur-[100px] -ml-40 -mb-40" />
        </div>
        
        <div className="section-container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-brand-primary text-sm font-bold uppercase tracking-[0.2em] mb-8 border border-white/10"
            >
              <ShieldCheck size={16} />
              Dịch vụ uy tín số 1 Bảo Lộc
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-bold text-white leading-tight uppercase mb-8 tracking-tighter"
            >
              Trung Tâm Dịch Vụ <br />
              <span className="text-brand-primary">Điện Nước & Camera</span> 
            </motion.h1>

            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Hoàng Tuấn MPE cung cấp giải pháp toàn diện cho hệ thống điện nước, an ninh camera và dò tìm rò rỉ nước chuyên nghiệp nhất. Hỗ trợ 24/7, có mặt trong 30 phút.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
            >
              {[
                { icon: Clock, text: 'Hỗ trợ 24/7' },
                { icon: Wrench, text: 'Thợ tay nghề cao' },
                { icon: ThumbsUp, text: 'Báo giá trước' },
                { icon: ShieldCheck, text: 'Bảo hành uy tín' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-2xl border border-white/5">
                  <item.icon size={24} className="text-brand-primary" />
                  <span className="text-white/80 font-bold text-xs uppercase">{item.text}</span>
                </div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="tel:0389011315" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-primary text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-brand-primary/40 hover:scale-105 active:scale-95 transition-all uppercase">
                <Phone size={24} />
                Gọi Ngay 0389.011.315
              </a>
              <div className="flex gap-4">
                 {['#electrical', '#plumbing', '#camera', '#detection'].map((href, i) => (
                   <a key={i} href={href} className="w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all border border-white/10">
                     {i === 0 ? <Zap size={20}/> : i === 1 ? <Droplet size={20}/> : i === 2 ? <Video size={20}/> : <Search size={20}/>}
                   </a>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Hub Menu */}
      <div className="sticky top-20 bg-white/80 backdrop-blur-xl z-40 border-b border-slate-100 hidden md:block">
        <div className="section-container py-4">
          <div className="flex justify-center gap-8">
            {CATEGORIES.map((cat) => (
              <a 
                key={cat.id} 
                href={`#${cat.id}`}
                className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-slate-400 hover:text-brand-primary transition-colors"
              >
                <cat.icon size={16} />
                {cat.title.replace('Dịch Vụ ', '')}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Service Categories */}
      <div className="bg-white">
        {CATEGORIES.map((cat) => (
          <CategorySection 
            key={cat.id} 
            category={cat} 
            services={SERVICES.filter(s => s.category === cat.id)} 
          />
        ))}
      </div>

      {/* Equipment Showcase (Special for Detection Category) */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-brand-accent rounded-full blur-[80px]" />
        </div>
        
        <div className="section-container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-brand-primary font-bold tracking-widest uppercase mb-4">Trang Thiết Bị</h2>
            <h3 className="text-3xl md:text-5xl font-bold uppercase">Thiết Bị Dò Tìm Hiện Đại Nhất</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Máy Siêu Âm Rò Rỉ', 
                desc: 'Phát hiện vị trí bục vỡ ống nước ngầm độ sâu tới 3m.', 
                img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800' 
              },
              { 
                title: 'Máy Dò Ống Âm', 
                desc: 'Xác định chính xác hướng đi của đường ống nước trong tường và dưới nền.', 
                img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800' 
              },
              { 
                title: 'Máy Kiểm Tra Áp Áp Lực', 
                desc: 'Thiết bị nén khí kiểm tra độ kín của toàn bộ hệ thống nước.', 
                img: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800' 
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 rounded-3xl p-8 border border-white/10 group hover:border-brand-primary/30 transition-all text-center"
              >
                <div className="w-full h-40 bg-slate-800 rounded-2xl mb-8 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reusable Sections */}
      <WhyChooseUs />
      <ProcessTimeline />
      <FeaturedProducts />
      <Testimonials />
      <FAQSection />
      
      {/* Final CTA */}
      <div className="bg-brand-secondary py-20">
        <div className="section-container">
          <div className="bg-brand-primary rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-primary/40">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-24 -mb-24" />
            
            <h2 className="text-3xl md:text-6xl font-bold uppercase mb-8 leading-tight">
              Hỗ Trợ Khẩn Cấp <span className="text-brand-secondary">24/7</span> <br />
              Giải Quyết Mọi Sự Cố Ngay Lập Tức
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">
              Đừng để sự cố kéo dài gây hư hại tài sản. Gọi ngay cho đội ngũ kỹ thuật của Hoàng Tuấn MPE để được hỗ trợ trong 30 phút.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="tel:0389011315" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-brand-secondary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl">
                <Phone size={24} />
                0389.011.315
              </a>
              <a href="https://zalo.me/0389011315" className="w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-brand-primary px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-all shadow-xl">
                <MessageCircle size={24} />
                Chat Zalo tư vấn
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
