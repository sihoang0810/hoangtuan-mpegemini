import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Clock, 
  ShieldCheck, 
  Wrench
} from 'lucide-react';
import ProcessTimeline, { FAQSection } from '../components/ExtraSections';
import FinalCTA from '../components/FinalCTA';
import Breadcrumbs from '../components/Breadcrumbs';
import { getServiceBySlug, getServiceBySlugSync, getServices, getServicesSync, getIconComponent, CMSService } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';
import { LOCATIONS } from '../constants';
import OptimizedImage from '../components/OptimizedImage';
import MediaGallery from '../components/MediaGallery';

const ServiceDetailTemplate = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;

  const [service, setService] = useState<CMSService | null>(() => getServiceBySlugSync(slug, locationSlug));
  const [relatedServices, setRelatedServices] = useState<CMSService[]>(() => {
    const srv = getServiceBySlugSync(slug, locationSlug);
    if (!srv) return [];
    const list = getServicesSync(locationSlug);
    return list.filter(item => item.category === srv.category && item.slug !== srv.slug).slice(0, 3);
  });
  const [loading, setLoading] = useState(() => !getServiceBySlugSync(slug, locationSlug));

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Load service and related products dynamically
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    getServiceBySlug(slug, locationSlug).then(data => {
      if (!active) return;
      setService(data);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug, locationSlug]);

  useEffect(() => {
    if (!service) return;
    let active = true;
    getServices(locationSlug).then(list => {
      if (!active) return;
      setRelatedServices(
        list.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
      );
    });
    return () => {
      active = false;
    };
  }, [service, locationSlug]);

  if (loading) {
    return (
      <div className="pt-40 pb-16 md:pb-20 text-center min-h-[80vh] flex flex-col justify-center items-center">
        <PageSEO pageType="general" />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Đang tải chi tiết dịch vụ...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-20 md:pt-28 pb-16 md:pb-20 text-center min-h-[80vh] flex flex-col justify-center items-center">
        <PageSEO pageType="general" />
        <AlertCircle size={64} className="mx-auto text-brand-primary mb-6 animate-pulse" />
        <h1 className="font-bold text-brand-secondary mb-4 uppercase">Không tìm thấy dịch vụ</h1>
        <p className="text-slate-500 mb-8">Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị thay đổi.</p>
        <Link to={`${siteLocationPrefix}/dich-vu`} className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold">
          Quay lại danh sách dịch vụ
        </Link>
      </div>
    );
  }

  const locationConfig = LOCATIONS.find(l => l.id === locationSlug) || LOCATIONS[0];
  const locName = locationConfig.name;

  const ServiceIcon = getIconComponent(service.icon);

  return (
    <div className="pt-20">
      <PageSEO pageType="service" data={service} />
      
      {/* Hero Section */}
      <section className="relative py-10 md:py-12 lg:py-14 bg-white overflow-hidden">
        <div className="section-container !py-0 grid lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-3 text-brand-primary mb-4 md:mb-6">
              <ServiceIcon size={28} className="md:w-8 md:h-8" />
              <span className="font-bold uppercase tracking-widest text-sm md:text-base">
                {service.category === 'electrical' ? 'Điện dân dụng' : service.category === 'plumbing' ? 'Nước dân dụng' : service.category === 'camera' ? 'Camera an ninh' : service.category === 'smarthome' ? 'Nhà thông minh' : 'Siêu âm rò rỉ'}
              </span>
            </div>
            <h1 className="font-bold text-brand-secondary mb-4 md:mb-6 uppercase tracking-tight leading-snug text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-balance">
              Dịch vụ {service.title} Tại {locName}
            </h1>
            <div 
              className="text-base sm:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed prose prose-slate max-w-none prose-p:text-slate-600 break-words w-full overflow-hidden prose-headings:font-bold prose-headings:text-brand-secondary prose-h1:text-2xl prose-h1:mt-6 prose-h1:mb-4 prose-h2:text-xl"
              dangerouslySetInnerHTML={{ __html: service.fullDescription || service.shortDescription || '' }}
            />
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8 md:mb-10 w-full">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 text-left sm:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Clock className="text-brand-primary shrink-0" size={24} />
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Hỗ trợ</div>
                  <div className="font-bold text-brand-secondary text-sm sm:text-base">30 Phút</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 p-3 text-left sm:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="text-brand-primary shrink-0" size={24} />
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Bảo trì</div>
                  <div className="font-bold text-brand-secondary text-sm sm:text-base">Đến 12T</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
              <a href="tel:0389011315" className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-brand-primary text-white px-3.5 sm:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-[15px] shadow-lg shadow-brand-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase whitespace-nowrap">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Gọi Ngay 0389011315
              </a>
              <a href={`https://zalo.me/0389011315?text=${encodeURIComponent(`Chào Hoàng Tuấn MPE, tôi cần tư vấn dịch vụ ${service.title} tại ${locName}`)}`} target="_blank" rel="noreferrer" className="flex-1 sm:flex-none flex items-center justify-center gap-2 sm:gap-3 bg-[#0068ff] text-white px-3.5 sm:px-6 py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm md:text-[15px] hover:opacity-90 transition-all uppercase whitespace-nowrap">
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                Chat Zalo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-1 lg:order-2 mb-6 lg:mb-0 w-full"
          >
            <div className="rounded-3xl overflow-hidden w-full max-w-full">
              <MediaGallery 
                items={service.gallery?.length ? service.gallery : (service.image ? [{ type: 'image', url: service.image }] : [])} 
                altPrefix={`${service.title} tại ${locName} - Hoàng Tuấn MPE`}
              />
            </div>
            {/* Decal */}
            <div className="absolute -bottom-6 -left-6 bg-brand-secondary text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-[200px] hidden md:block z-10">
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/50">Cam kết hài lòng</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing and Details */}
      <section className="py-10 md:py-12 lg:py-14 bg-slate-50 overflow-hidden">
        <div className="section-container !py-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-8 md:space-y-12">
              {/* Features List */}
              <div className="bg-white p-5 sm:p-8 md:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <h2 className="text-xl sm:text-2xl font-bold text-brand-secondary mb-6 sm:mb-8 uppercase flex items-center gap-3">
                  <CheckCircle2 className="text-brand-primary shrink-0" />
                  Ưu điểm sửa chữa
                </h2>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {service.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      </div>
                      <span className="font-bold text-slate-600 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                  {service.benefits?.map((benefit, idx) => (
                     <div key={`benefit-${idx}`} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      </div>
                      <span className="font-bold text-slate-600 text-sm sm:text-base">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Table */}
              {service.pricing && service.pricing.length > 0 && (
                <div className="bg-white p-6 sm:p-10 md:p-12 rounded-3xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100/80">
                  <div className="mb-8 md:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 pb-6">
                    <div>
                      <h2 className="text-xl sm:text-xl font-bold text-brand-secondary uppercase flex items-center gap-3">
                        <Wrench className="text-brand-primary shrink-0 w-5 h-5" />
                        Bảng giá dịch vụ tham khảo
                      </h2>
                      <p className="text-slate-400 text-xs sm:text-sm mt-1">Khảo sát & Báo giá minh bạch trước khi làm</p>
                    </div>
                    <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold uppercase tracking-wider">
                      Không phí ẩn
                    </span>
                  </div>

                  {/* Bố cục danh sách tối giản, cực thoáng đãng */}
                  <div className="space-y-6 sm:space-y-8">
                    {service.pricing.map((p, idx) => {
                      const isTotal = p.isTotal;
                      return (
                        <div key={idx}>
                          <div className={`py-2 ${
                            isTotal 
                              ? 'bg-brand-primary/10 p-4 rounded-2xl border border-brand-primary/20 mt-4' 
                              : ''
                          }`}>
                            <h3 className={`font-semibold leading-snug ${
                              isTotal 
                                ? 'text-brand-secondary text-base sm:text-lg font-extrabold' 
                                : 'text-slate-800 text-base sm:text-lg'
                            }`}>
                              {p.item}
                            </h3>
                            <div className="mt-1 flex items-baseline gap-1">
                              <span className={`font-extrabold text-brand-primary ${
                                isTotal ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
                              }`}>
                                {p.price}
                              </span>
                              {p.unit && (
                                <span className={`font-bold capitalize ${
                                  isTotal ? 'text-xs text-brand-primary/80' : 'text-xs text-slate-400'
                                }`}>
                                  / {p.unit}
                                </span>
                              )}
                            </div>
                          </div>
                          {idx < service.pricing.length - 1 && !isTotal && !service.pricing[idx + 1]?.isTotal && (
                            <div className="mt-6 border-b border-dashed border-slate-200/80" />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 sm:mt-10 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/60 flex items-start gap-3">
                    <span className="text-amber-500 shrink-0 mt-0.5 text-sm sm:text-base">⚠️</span>
                    <p className="text-xs text-amber-800 font-bold leading-relaxed">
                      Lưu ý quan trọng: Bảng giá trên mang tính chất khảo sát chung cho khu xực {locName}. Kỹ thuật viên sẽ tiến hành khảo sát thực tế, tư vấn phương án phù hợp và báo giá chi tiết trước khi bắt đầu sửa chữa.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6 sm:space-y-8">
              {/* Sticky Contact Card */}
              <div className="sticky top-24 space-y-6 sm:space-y-8">
                <div className="bg-brand-secondary p-5 sm:p-8 rounded-3xl md:rounded-[2.5rem] text-white overflow-hidden shadow-2xl border border-brand-secondary">
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-4 uppercase text-center sm:text-left">Cần thợ {locName} ngay?</h3>
                  <p className="text-white/70 text-xs sm:text-sm mb-6 text-center sm:text-left">Đội ngũ kỹ thuật trực 24/7 tại {locName} và lân cận.</p>
                  <a href="tel:0389011315" className="flex items-center justify-center gap-2 sm:gap-3 bg-brand-primary text-white w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap">
                    <Phone className="w-5 h-5 shrink-0" />
                    0389011315
                  </a>
                  <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-bold text-white/50">
                    <div className="flex items-center gap-1"><Clock size={12} className="sm:w-[14px] sm:h-[14px]"/> 30 Phút</div>
                    <div className="hidden sm:block">•</div>
                    <div className="flex items-center gap-1"><ShieldCheck size={12} className="sm:w-[14px] sm:h-[14px]"/> Bảo hành dài hạn</div>
                  </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-white p-5 sm:p-8 rounded-3xl md:rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
                    <h3 className="text-base sm:text-xl font-bold text-brand-secondary mb-4 sm:mb-6 uppercase">Dịch vụ liên quan</h3>
                    <div className="space-y-3 sm:space-y-4">
                      {relatedServices.map((rs) => {
                        const RelatedIcon = getIconComponent(rs.icon);
                        return (
                          <Link 
                            key={rs.slug} 
                            to={`${siteLocationPrefix}/dich-vu/${rs.slug}`}
                            className="flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                            title={`${rs.title} tại ${locName}`}
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-100 rounded-lg sm:rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                              <RelatedIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <span className="font-bold text-brand-secondary text-xs sm:text-sm leading-tight flex-1 line-clamp-2">{rs.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessTimeline />

      {/* FAQ specific to service or general */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default ServiceDetailTemplate;
