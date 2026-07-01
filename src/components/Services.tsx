import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Droplet, Video, Search, Cpu, CheckCircle2, Hammer, Sun } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getHomepageContent, getHomepageContentSync, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import InlineEdit from './InlineEdit';
import cardBackgroundImg from '../assets/images/anh-dich-vu-dien.jpeg';
import '../styles/service-card.css';

const CATEGORY_ITEMS = [
  {
    id: 'electrical',
    title: 'Hệ Thống Điện Dân Dụng',
    description: 'Xử lý chập điện nhảy aptomat, thi công điện âm tường gia đình, văn phòng an toàn, thẩm mỹ cao.',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
    icon: Zap,
    features: ['Kiểm tra an toàn', 'Khắc phục triệt để 100%', 'Bảo hành 12 tháng'],
    price: 'Từ 50.000đ',
    unit: 'thiết bị'
  },
  {
    id: 'plumbing',
    title: 'Hệ Thống Nước Dân Dụng',
    description: 'Tìm và khắc phục sự cố rò rỉ bồn cầu, vòi sen, dột tường, lắp máy bơm tăng áp giúp dòng nước khỏe tức thì.',
    image: '/bom-ap.jpg',
    icon: Droplet,
    features: ['Thợ tận tâm, lành nghề', 'Phụ kiện cao cấp', 'Khảo sát báo giá trước'],
    price: 'Từ 100.000đ',
    unit: 'thiết bị'
  },
  {
    id: 'construction',
    title: 'Thi Công Điện Nước Trọn Gói',
    description: 'Tư vấn, thiết kế, thi công lắp đặt trọn gói hệ thống điện nước cho nhà phố, biệt thự, căn hộ chung cư và cải tạo công trình cũ.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800',
    icon: Hammer,
    features: ['Thi công đúng bản vẽ', 'Cam kết tiến độ bàn giao', 'Bảo hành hệ thống 2 năm'],
    price: 'Từ 120.000đ',
    unit: 'm2'
  },
  {
    id: 'solar',
    title: 'Đèn Năng Lượng Mặt Trời',
    description: 'Giải pháp chiếu sáng xanh thông minh, tiết kiệm 100% điện năng cho sân vườn, cổng ngõ, đường đi, trang trại và rẫy vườn.',
    image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=800',
    icon: Sun,
    features: ['Không tốn 1 đồng tiền điện', 'Chống nước IP67 bền bỉ', 'Tự động bật tắt cảm ứng'],
    price: 'Từ 650.000đ',
    unit: 'bộ'
  },
  {
    id: 'camera',
    title: 'Lắp Đặt Camera An Ninh',
    description: 'Tư vấn lắp đặt hệ thống lắp camera an ninh trọn gói, camera Solar năng lượng mặt trời 4G cho sân vườn nhà rẫy Bảo Lộc.',
    image: '/images/camera-.png',
    icon: Video,
    features: ['Giám sát từ xa 24/7', 'Hình ảnh sắc nét Full HD', 'Bảo hành chính hãng'],
    price: 'Từ 450.000đ',
    unit: 'bộ'
  },
  {
    id: 'detection',
    title: 'Dò Tìm Rò Rỉ Nước Siêu Âm',
    description: 'Sử dụng máy siêu âm PQWT công nghệ Đức siêu nhạy định vị chuẩn xác điểm vỡ ống nước ngầm không đập phá nền móng.',
    image: '/images/sieu-am-do-tim-ong-vo.png',
    icon: Search,
    features: ['Siêu âm chính xác 99%', 'Không đục phá lung tung', 'Máy móc nhập khẩu hiện đại'],
    price: 'Từ 500.000đ',
    unit: 'điểm'
  },
  {
    id: 'smarthome',
    title: 'Nhà Thông Minh & Thiết Bị Smarthome',
    description: 'Lắp đặt công tắc cửa cuốn thông minh Hunonic, điều khiển từ xa qua điện thoại, thiết bị Smarthome tăng tiện ích sống.',
    image: '/images/cua-cuon-thong-minh.png',
    icon: Cpu,
    features: ['Điều khiển từ xa dễ dàng', 'Hàng Hunonic chính hãng', 'Thi công thẩm mỹ cao'],
    price: 'Từ 350.000đ',
    unit: 'thiết bị'
  }
];

export default function Services({ 
  cmsData,
  isEditable = false,
  onUpdateDraftField
}: { 
  cmsData?: any;
  isEditable?: boolean;
  onUpdateDraftField?: (field: string, value: any) => void;
  onUpdateServiceField?: (serviceId: string, field: string, value: string) => void;
}) {
  const { locationSlug } = useLocation();
  const navigate = useNavigate();
  const [homepageContent, setHomepageContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));

  useEffect(() => {
    let active = true;
    setHomepageContent(getHomepageContentSync(locationSlug));

    getHomepageContent(locationSlug).then((homeData) => {
      if (active) {
        setHomepageContent(homeData);
      }
    }).catch(() => {});

    return () => {
      active = false;
    };
  }, [locationSlug]);

  const servicesHeading = cmsData?.servicesHeading !== undefined ? cmsData.servicesHeading : (cmsData?.heading || homepageContent.servicesHeading || "Dịch Vụ Của Chúng Tôi");
  const servicesSubtitle = cmsData?.servicesSubtitle !== undefined ? cmsData.servicesSubtitle : (cmsData?.subheading || homepageContent.servicesSubtitle || "Giải Pháp Toàn Diện Cho Gia Đình");

  return (
    <section id="services" className="section-container bg-white">
      <div className="text-center mb-10 md:mb-16">
        <div className="inline-block">
          <InlineEdit 
            value={servicesHeading}
            isEditable={isEditable}
            onSave={(val) => onUpdateDraftField?.('servicesHeading', val)}
            className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs block"
            element="p"
          />
        </div>
        <div className="max-w-3xl mx-auto">
          <InlineEdit 
            value={servicesSubtitle}
            isEditable={isEditable}
            onSave={(val) => onUpdateDraftField?.('servicesSubtitle', val)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary uppercase tracking-tight block"
            element="h2"
            multiline={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {CATEGORY_ITEMS.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min((index % 3) * 0.05, 0.15), duration: 0.3 }}
              whileHover={!isEditable ? { y: -8, boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' } : undefined}
              onClick={(e) => {
                if (isEditable) return;
                if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') return;
                const targetUrl = `/${locationSlug}/dich-vu#${item.id}`;
                navigate(targetUrl);
              }}
              className={`bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col h-full relative overflow-hidden group hover:border-brand-primary/30 transition-[border-color] duration-300 text-left ${!isEditable ? 'cursor-pointer' : ''}`}
            >
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img 
                  src={item.image || cardBackgroundImg}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Elegant floating badge with category icon */}
                <div className="absolute top-4 left-4 bg-brand-primary text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20">
                  <IconComponent size={20} />
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <h4 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors tracking-tight line-clamp-2 h-14 flex items-center">
                  {item.title}
                </h4>

                <p className="text-slate-500 text-sm mb-6 line-clamp-3 h-[60px] overflow-hidden">
                  {item.description}
                </p>

                <div className="space-y-3 mb-6">
                  {item.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-bold text-brand-secondary">
                      <CheckCircle2 size={14} className="text-brand-primary" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl mb-6">
                  <span className="text-xs text-slate-500 block mb-1">Giá tham khảo</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-brand-secondary">{item.price}</span>
                    <span className="text-xs text-slate-500">/{item.unit || 'thiết bị'}</span>
                  </div>
                </div>
                
                <Link 
                  to={`/${locationSlug}/dich-vu#${item.id}`}
                  className="flex items-center justify-between font-bold text-brand-primary group/btn mt-auto pt-4 border-t border-slate-50"
                >
                  <span>XEM CHI TIẾT</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link 
          to={`/${locationSlug}/dich-vu`}
          className="inline-flex items-center gap-2 bg-brand-secondary text-white px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-decoration-none"
        >
          Xem tất cả dịch vụ
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

