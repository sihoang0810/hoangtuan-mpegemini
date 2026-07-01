import React, { useState, useEffect, useRef } from 'react';
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
  ThumbsUp,
  Cpu,
  ChevronDown,
  Sun,
  Hammer
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SERVICES, Service } from '../data/services';
import { getServices, getServicesSync, CMSService } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';


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
    id: 'construction',
    title: 'Thi Công Điện Nước Trọn Gói',
    description: 'Tư vấn, thiết kế, thi công lắp đặt trọn gói hệ thống điện nước cho nhà phố, biệt thự, căn hộ chung cư và cải tạo công trình cũ.',
    icon: Hammer,
    color: 'slate'
  },
  {
    id: 'solar',
    title: 'Đèn Năng Lượng Mặt Trời',
    description: 'Giải pháp chiếu sáng xanh thông minh, tiết kiệm 100% điện năng cho sân vườn, cổng ngõ, đường đi, trang trại và rẫy vườn.',
    icon: Sun,
    color: 'amber'
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
    color: 'rose'
  },
  {
    id: 'smarthome',
    title: 'Dịch Vụ Nhà Thông Minh',
    description: 'Tư vấn, thiết kế và lắp đặt hệ thống thiết bị thông minh: công tắc cửa cuốn, ổ cắm cảm ứng, đèn kịch bản, nâng cao tiện ích toàn diện.',
    icon: Cpu,
    color: 'emerald'
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
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;
  const navigate = useNavigate();

  return (
    <section id={category.id} className="py-5 border-b border-slate-100 last:border-0 scroll-mt-24">
      <div className="section-container !py-5 md:!py-8 lg:!py-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 text-brand-primary mb-4 justify-start">
              <category.icon size={32} />
              <span className="font-bold tracking-widest uppercase">{category.title}</span>
            </div>
            <h2 className="font-bold text-brand-secondary mb-6 uppercase tracking-tight">
              {category.title}
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              {category.description}
            </p>
          </div>
          <div className="flex gap-4 shrink-0 justify-start">
            <a href="tel:0389011315" className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 active:scale-95">
              <Phone size={18} />
              Gọi Ngay
            </a>
            <a href="https://zalo.me/0389011315" className="flex items-center gap-2 bg-[#0068ff] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-all active:scale-95">
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
              whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
              onClick={(e) => {
                if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') return;
                navigate(`${siteLocationPrefix}/dich-vu/${service.slug}`);
              }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col overflow-hidden group hover:border-brand-primary/30 transition-[border-color] duration-300 text-left cursor-pointer"
            >
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img 
                  src={service.image || "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
                  width={400}
                  height={200}
                />
                <div className="absolute top-4 left-4 bg-brand-primary text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                  <category.icon size={20} />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors tracking-tight line-clamp-2 h-14 flex items-center">
                  {service.title}
                </h3>
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 h-[60px] overflow-hidden" dangerouslySetInnerHTML={{ __html: service.shortDescription || '' }} />
                <div className="space-y-3 mb-6">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-brand-secondary">
                      <CheckCircle2 size={14} className="text-brand-primary" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <span className="text-xs text-slate-500 block mb-1">Giá tham khảo</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-brand-secondary">{service.pricing[0].price}</span>
                    <span className="text-xs text-slate-500">/{service.pricing[0].unit || 'lầu'}</span>
                  </div>
                </div>
                <Link 
                  to={`${siteLocationPrefix}/dich-vu/${service.slug}`}
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
        <div className="bg-slate-50 rounded-3xl md:rounded-[2.5rem] p-5 sm:p-8 md:p-12 border border-slate-100 overflow-hidden text-left">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-secondary uppercase">Bảng giá tham khảo {category.id === 'electrical' ? 'Điện' : category.id === 'plumbing' ? 'Nước' : category.id === 'camera' ? 'Camera' : category.id === 'smarthome' ? 'Nhà thông minh' : 'Siêu âm'}</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[500px]">
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
          <div className="mt-8 text-xs text-slate-500">
            * Lưu ý: Giá trên chỉ mang tính chất tham khảo. Quý khách vui lòng liên hệ để được thợ kiểm tra và báo giá thực tế chính xác nhất.
          </div>
        </div>
      </div>
    </section>
  );
};

const FLOATING_NAV = [
  { href: '#electrical', title: 'Điện dân dụng', icon: Zap, activeBg: 'text-white shadow-lg', activeBgColor: '#ea580c' },
  { href: '#plumbing', title: 'Nước dân dụng', icon: Droplet, activeBg: 'text-white shadow-lg', activeBgColor: '#0284c7' },
  { href: '#construction', title: 'Thi công trọn gói', icon: Hammer, activeBg: 'text-white shadow-lg', activeBgColor: '#64748b' },
  { href: '#solar', title: 'Đèn năng lượng', icon: Sun, activeBg: 'text-white shadow-lg', activeBgColor: '#d97706' },
  { href: '#camera', title: 'Camera giám sát', icon: Video, activeBg: 'text-white shadow-lg', activeBgColor: '#0f172a' },
  { href: '#detection', title: 'Dò tìm rò rỉ', icon: Search, activeBg: 'text-white shadow-lg', activeBgColor: '#e11d48' },
  { href: '#smarthome', title: 'Nhà thông minh', icon: Cpu, activeBg: 'text-white shadow-lg', activeBgColor: '#059669' }
];

export default function ServicesPage() {
  const { locationSlug } = useLocation();
  const [services, setServices] = useState<CMSService[]>(() => getServicesSync(locationSlug));
  const [activeSection, setActiveSection] = useState('electrical');
  const [showFloating, setShowFloating] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let active = true;
    getServices(locationSlug).then(data => {
      if (active) setServices(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerElement = document.querySelector('header');
          const headerHeight = headerElement ? headerElement.offsetHeight : 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerHeight - 10;
          window.scrollTo({
            top: offsetPosition >= 0 ? offsetPosition : 0,
            behavior: 'smooth'
          });
          setActiveSection(id);
        }
      }, 150);
    }
  }, [services]);

  useEffect(() => {
    const handleScrollBoundary = () => {
      const currentScrollY = window.scrollY;

      // Determine header visibility based on scroll direction
      let visible = true;
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current) {
          visible = false;
        } else {
          visible = true;
        }
      }
      lastScrollY.current = currentScrollY;

      // Double-check with DOM element class to override if already applied
      const headerElement = document.querySelector('header');
      if (headerElement) {
        const isHidden = headerElement.classList.contains('-translate-y-full');
        setIsHeaderVisible(!isHidden);
      } else {
        setIsHeaderVisible(visible);
      }

      const electricalEl = document.getElementById('electrical');
      if (electricalEl) {
        const rect = electricalEl.getBoundingClientRect();
        setShowFloating(rect.top <= window.innerHeight * 0.6);
      } else {
        setShowFloating(false);
      }

      // Compute active section based on proximity to sticky header trigger point
      const ids = ['electrical', 'plumbing', 'construction', 'solar', 'camera', 'detection', 'smarthome'];
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const triggerPoint = headerHeight + 120;

      let matchedSection = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
            matchedSection = id;
            break;
          }
        }
      }

      // Check boundaries
      if (window.scrollY < 120) {
        matchedSection = 'electrical';
      } else if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        matchedSection = 'smarthome';
      }

      if (matchedSection) {
        setActiveSection(matchedSection);
      }
    };

    window.addEventListener('scroll', handleScrollBoundary, { passive: true });
    // Run initial check
    handleScrollBoundary();

    return () => {
      window.removeEventListener('scroll', handleScrollBoundary);
    };
  }, []);

  const handleFloatingClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    
    const element = document.getElementById(id);
    if (element) {
      const headerElement = document.querySelector('header');
      const headerHeight = headerElement ? headerElement.offsetHeight : 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 10;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
    }
  };

  const items: any[] = services.length > 0 ? services : SERVICES;


  return (
    <div className="pt-20">
      <PageSEO pageType="general" />

      {/* 1. Mobile Horizontal Floating Header Sub-Nav */}
      <div 
        className={`md:hidden fixed left-0 right-0 z-40 flex flex-row items-center justify-center gap-3 bg-white/95 backdrop-blur-md py-2 px-4 border-b border-slate-100 shadow-sm transition-all duration-300 overflow-x-auto scrollbar-none ${
          showFloating ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
        style={{ 
          top: isHeaderVisible ? '80px' : '0px'
        }}
      >
        <div className="flex flex-row items-center gap-3 mx-auto">
          {FLOATING_NAV.map((item, i) => {
            const id = item.href.slice(1);
            const isActive = activeSection === id;
            const Icon = item.icon;
            return (
              <motion.a
                key={i}
                whileTap={{ scale: 0.95 }}
                href={item.href}
                onClick={(e) => handleFloatingClick(e, id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border shrink-0 ${
                  isActive 
                    ? 'text-white border-transparent'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
                style={{ backgroundColor: isActive ? item.activeBgColor : 'white' }}
              >
                <Icon size={18} />
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* 2. Tablet & Desktop Vertical Floating Dock */}
      <div 
        className={`hidden md:flex fixed top-1/2 -translate-y-1/2 z-50 flex-col gap-4 transition-all duration-300 ${
          showFloating ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}
        style={{ left: 'max(16px, calc(50% - 640px - 64px))' }}
      >
        {FLOATING_NAV.map((item, i) => {
          const id = item.href.slice(1);
          const isActive = activeSection === id;
          const Icon = item.icon;
          return (
            <div key={i} className="relative group">
              {/* Premium Hover Tooltip Label */}
              <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white px-3.5 py-1.5 rounded-lg shadow-lg text-brand-secondary font-bold text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0 z-50">
                {item.title}
              </div>

              <motion.a
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                href={item.href}
                onClick={(e) => handleFloatingClick(e, id)}
                className={`relative w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
                  isActive 
                    ? 'text-white shadow-lg'
                    : 'bg-white text-slate-600 hover:text-brand-secondary hover:bg-slate-50'
                }`}
                style={{ backgroundColor: isActive ? item.activeBgColor : 'white' }}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-25" />
                )}
                <Icon size={20} className="relative z-10" />
              </motion.a>
            </div>
          );
        })}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-secondary">
        {/* Background Patterns */}
        <div className="hidden md:block absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary rounded-full blur-[100px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-accent rounded-full blur-[80px] -ml-40 -mb-40" />
        </div>
        
        <div className="section-container !py-10 md:!py-16 lg:!py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 text-brand-primary text-sm font-bold uppercase tracking-[0.2em] mb-8 border border-white/10"
            >
              <ShieldCheck size={16} />
              Dịch vụ uy tín số 1 {locationSlug || 'Bảo Lộc'}
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-bold text-white leading-snug text-balance uppercase mb-8 tracking-tight"
            >
              Trung Tâm Dịch Vụ <br />
              <span className="text-brand-primary">Điện Nước & Camera</span> 
            </motion.h1>

            <p className="text-base sm:text-lg text-white/70 mb-8 max-w-2xl mx-auto font-medium leading-relaxed">
              Hoàng Tuấn MPE cung cấp giải pháp toàn diện cho hệ thống điện nước, an ninh camera và dò tìm rò rỉ nước chuyên nghiệp nhất. Hỗ trợ 24/7, có mặt trong 30 phút.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8"
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
              className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto"
            >
              <a href="tel:0389011315" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary text-white px-6 py-4 rounded-xl font-bold text-sm sm:text-base shadow-2xl shadow-brand-primary/40 hover:scale-105 active:scale-95 transition-all uppercase whitespace-nowrap">
                <Phone size={20} className="shrink-0" />
                Gọi Ngay 0389011315
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Service Categories */}
      <div className="bg-white">
        {CATEGORIES.map((cat) => (
          <CategorySection 
            key={cat.id} 
            category={cat} 
            services={items.filter(s => s.category === cat.id || (cat.id === 'detection' && s.category === 'leakage'))} 
          />
        ))}
      </div>


      {/* Equipment Showcase (Special for Detection Category) */}
      <section className="py-5 bg-slate-950 text-white relative overflow-hidden">
        <div className="hidden md:block absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-brand-primary rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-brand-accent rounded-full blur-[80px]" />
        </div>
        
        <div className="section-container !py-5 md:!py-8 lg:!py-10 relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">Trang Thiết Bị</p>
            <h2 className="font-bold uppercase text-white">Thiết Bị Dò Tìm Hiện Đại Nhất</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <img 
                    src={item.img || "https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=800"} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={200}
                  />
                </div>
                <h4 className="text-xl font-bold mb-3 text-white">{item.title}</h4>
                <p className="text-slate-300 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="bg-brand-secondary py-10 md:py-16">
        <div className="section-container !py-0">
          <div className="bg-brand-primary rounded-3xl md:rounded-[2.5rem] p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-brand-primary/40">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-black/10 rounded-full blur-2xl -ml-24 -mb-24" />
            
            <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-6 sm:mb-8 leading-snug text-balance">
              Hỗ Trợ Khẩn Cấp <span className="text-brand-secondary">24/7</span> <br />
              Giải Quyết Mọi Sự Cố Ngay Lập Tức
            </h2>
            <p className="text-sm sm:text-base text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto font-medium">
              Đừng để sự cố kéo dài gây hư hại tài sản. Gọi ngay cho đội ngũ kỹ thuật của Hoàng Tuấn MPE để được hỗ trợ trong 30 phút.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a href="tel:0389011315" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-secondary text-white px-6 py-4 rounded-xl font-bold text-sm sm:text-base hover:scale-105 active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                <Phone className="sm:w-5 sm:h-5 w-4 h-4 shrink-0" />
                0389 011 315
              </a>
              <a href="https://zalo.me/0389011315" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-brand-primary px-6 py-4 rounded-xl font-bold text-sm sm:text-base hover:scale-105 active:scale-[0.98] transition-all shadow-xl whitespace-nowrap">
                <MessageCircle className="sm:w-5 sm:h-5 w-4 h-4 shrink-0" />
                Chat Zalo
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
