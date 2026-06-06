import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices, getServicesSync, getHomepageContent, getHomepageContentSync, getIconComponent, CMSService, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import InlineEdit from './InlineEdit';

export default function Services({ 
  cmsData,
  isEditable = false,
  onUpdateDraftField,
  onUpdateServiceField
}: { 
  cmsData?: any;
  isEditable?: boolean;
  onUpdateDraftField?: (field: string, value: any) => void;
  onUpdateServiceField?: (serviceId: string, field: string, value: string) => void;
}) {
  const { locationSlug } = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState<CMSService[]>(() => getServicesSync(locationSlug));
  const [homepageContent, setHomepageContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setServices(getServicesSync(locationSlug));
    setHomepageContent(getHomepageContentSync(locationSlug));

    Promise.all([
      getServices(locationSlug),
      getHomepageContent(locationSlug)
    ]).then(([serviceData, homeData]) => {
      if (active) {
        setServices(serviceData);
        setHomepageContent(homeData);
        setLoading(false);
      }
    }).catch(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [locationSlug]);

  const activeServices = cmsData?.services || services;
  const sortedServices = [...activeServices].sort((a, b) => {
    // Ưu tiên 1: Số thứ tự (order) được thiết lập thủ công trong CMS (số càng nhỏ càng lên đầu)
    const aOrder = typeof a.order === 'number' ? a.order : 9999;
    const bOrder = typeof b.order === 'number' ? b.order : 9999;
    
    if (aOrder !== bOrder) return aOrder - bOrder;
    
    // Ưu tiên 2: Dịch vụ được ghim (isPinned)
    const aPinned = a.isPinned ? 1 : 0;
    const bPinned = b.isPinned ? 1 : 0;
    
    return bPinned - aPinned; // Ghim = 1 sẽ đứng trước Không ghim = 0
  });
  const displayedServices = showAll ? sortedServices : sortedServices.slice(0, 6);
  const servicesHeading = cmsData?.servicesHeading !== undefined ? cmsData.servicesHeading : (cmsData?.heading || homepageContent.servicesHeading || "Dịch Vụ Của Chúng Tôi");
  const servicesSubtitle = cmsData?.servicesSubtitle !== undefined ? cmsData.servicesSubtitle : (cmsData?.subheading || homepageContent.servicesSubtitle || "Giải Pháp Toàn Diện Cho Gia Đình");

  const ServiceSkeleton = () => (
    <div className="animate-pulse p-8 rounded-2xl bg-white border border-slate-100 shadow-xl flex flex-col h-full">
      <div className="w-14 h-14 bg-slate-200 rounded-xl mb-6" />
      <div className="h-6 bg-slate-200 rounded w-2/3 mb-4" />
      <div className="space-y-3 mb-8">
        <div className="h-4 bg-slate-200 rounded w-full" />
        <div className="h-4 bg-slate-200 rounded w-11/12" />
        <div className="h-4 bg-slate-200 rounded w-4/5" />
      </div>
      <div className="h-5 bg-slate-200 rounded w-1/4 mt-auto" />
    </div>
  );

  return (
    <section id="services" className="section-container bg-white">
      <div className="text-center mb-16">
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
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-secondary uppercase tracking-tighter block"
            element="h2"
            multiline={true}
          />
        </div>
      </div>


      {activeServices.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, idx) => (
            <ServiceSkeleton key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, index) => {
            const IconComponent = getIconComponent(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min((index % 3) * 0.05, 0.15), duration: 0.3 }}
                onClick={(e) => {
                  if (isEditable) return;
                  // If they clicked an inline edit field or link, let it handle itself
                  if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') return;
                  const targetUrl = `/${locationSlug}/dich-vu/${service.slug}`;
                  console.log('Navigation target:', targetUrl);
                  navigate(targetUrl);
                }}
                className={`group p-5 sm:p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all hover:-translate-y-2 flex flex-col h-full ${!isEditable ? 'cursor-pointer' : ''}`}
              >
                <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <IconComponent size={28} />
                </div>
                
                <InlineEdit 
                  value={service.title}
                  isEditable={isEditable}
                  onSave={(val) => onUpdateServiceField?.(service.id, 'title', val)}
                  className="text-xl font-bold text-brand-secondary mb-3 block"
                  element="h4"
                />

                <InlineEdit 
                  value={service.shortDescription || ''}
                  isEditable={isEditable}
                  onSave={(val) => onUpdateServiceField?.(service.id, 'shortDescription', val)}
                  className="text-slate-600 mb-6 line-clamp-3 block"
                  element="p"
                  multiline={true}
                />
                
                <Link 
                  to={`/${locationSlug}/dich-vu/${service.slug}`}
                  onClick={() => console.log('Navigation target:', `/${locationSlug}/dich-vu/${service.slug}`)}
                  className="flex items-center gap-2 font-bold text-brand-primary group-hover:gap-3 transition-all mt-auto"
                >
                  Xem chi tiết
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}

      {!showAll && activeServices.length > 6 && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 bg-brand-secondary text-white px-6 py-4 md:px-8 md:py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Xem tất cả dịch vụ
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

