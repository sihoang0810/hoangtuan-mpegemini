import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getServices, getServicesSync, getHomepageContent, getHomepageContentSync, getIconComponent, CMSService, CMSHomepage } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';

export default function Services({ cmsData }: { cmsData?: any }) {
  const { locationSlug } = useLocation();
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

  const displayedServices = showAll ? services : services.slice(0, 6);
  const servicesHeading = cmsData?.heading || homepageContent.servicesHeading || "Dịch Vụ Của Chúng Tôi";
  const servicesSubtitle = cmsData?.subheading || homepageContent.servicesSubtitle || "Giải Pháp Toàn Diện Cho Gia Đình";

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
        <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">
          {servicesHeading}
        </p>
        <h2 className="text-3xl md:text-5xl font-bold text-brand-secondary uppercase tracking-tighter">
          {servicesSubtitle}
        </h2>
      </div>


      {services.length === 0 ? (
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
                className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <IconComponent size={28} />
                </div>
                <h4 className="text-xl font-bold text-brand-secondary mb-3">{service.title}</h4>
                <p className="text-slate-600 mb-6 line-clamp-3" dangerouslySetInnerHTML={{ __html: service.shortDescription || '' }} />
                <Link 
                  to={`/${locationSlug}/dich-vu/${service.slug}`}
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

      {!showAll && services.length > 6 && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 bg-brand-secondary text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-brand-primary hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Xem tất cả dịch vụ
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}

