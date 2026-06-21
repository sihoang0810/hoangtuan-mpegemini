import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Droplet, Video, Search, Cpu } from 'lucide-react';
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
    icon: Zap
  },
  {
    id: 'plumbing',
    title: 'Hệ Thống Nước Dân Dụng',
    description: 'Tìm và khắc phục sự cố rò rỉ bồn cầu, vòi sen, dột tường, lắp máy bơm tăng áp giúp dòng nước khỏe tức thì.',
    image: '/bom-ap.jpg',
    icon: Droplet
  },
  {
    id: 'camera',
    title: 'Lắp Đặt Camera An Ninh',
    description: 'Tư vấn lắp đặt hệ thống lắp camera an ninh trọn gói, camera Solar năng lượng mặt trời 4G cho sân vườn nhà rẫy Bảo Lộc.',
    image: '/images/camera-.png',
    icon: Video
  },
  {
    id: 'detection',
    title: 'Dò Tìm Rò Rỉ Nước Siêu Âm',
    description: 'Sử dụng máy siêu âm PQWT công nghệ Đức siêu nhạy định vị chuẩn xác điểm vỡ ống nước ngầm không đập phá nền móng.',
    image: '/images/sieu-am-do-tim-ong-vo.png',
    icon: Search
  },
  {
    id: 'smarthome',
    title: 'Nhà Thông Minh & Thiết Bị Smarthome',
    description: 'Lắp đặt công tắc cửa cuốn thông minh Hunonic, điều khiển từ xa qua điện thoại, thiết bị Smarthome tăng tiện ích sống.',
    image: '/images/cua-cuon-thong-minh.png',
    icon: Cpu
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
              whileHover={!isEditable ? { y: -8 } : undefined}
              onClick={(e) => {
                if (isEditable) return;
                if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') return;
                const targetUrl = `/${locationSlug}/dich-vu#${item.id}`;
                navigate(targetUrl);
              }}
              className={`service-card p-5 sm:p-8 rounded-2xl bg-slate-900 flex flex-col h-full relative overflow-hidden ${!isEditable ? 'cursor-pointer' : ''}`}
            >
              <>
                <div 
                  className="service-overlay-bg"
                  style={{ backgroundImage: `url(${item.image || cardBackgroundImg})` }}
                />
                <div className="service-gradient-overlay" />
              </>

              <div className="service-content flex flex-col h-full text-white">
                <div className="service-icon-wrapper flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center mb-5 text-white">
                  <IconComponent size={28} />
                </div>
                
                <div className="flex-1 min-h-[30px]" />

                <h4 className="service-title text-xl font-bold mb-3 block text-white">
                  {item.title}
                </h4>

                <p className="service-description mb-6 line-clamp-3 block text-slate-300">
                  {item.description}
                </p>
                
                <Link 
                  to={`/${locationSlug}/dich-vu#${item.id}`}
                  className="service-link flex items-center font-bold mt-auto"
                >
                  Xem chi tiết
                  <ArrowRight size={18} />
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

