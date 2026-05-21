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
import { getServiceBySlug, getServices, getIconComponent, CMSService } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';

const ServiceDetailTemplate = () => {
  const { slug, locationId } = useParams();
  const navigate = useNavigate();
  const { location: appLocation } = useLocation();
  const siteLocationPrefix = appLocation === 'Hồ Chí Minh' ? '/ho-chi-minh' : '/bao-loc';

  const [service, setService] = useState<CMSService | null>(null);
  const [relatedServices, setRelatedServices] = useState<CMSService[]>([]);
  const [loading, setLoading] = useState(true);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Load service and related products dynamically
  useEffect(() => {
    let active = true;
    setLoading(true);
    
    getServiceBySlug(slug, locationId).then(data => {
      if (!active) return;
      setService(data);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug, locationId]);

  useEffect(() => {
    if (!service) return;
    let active = true;
    getServices(locationId).then(list => {
      if (!active) return;
      setRelatedServices(
        list.filter(s => s.category === service.category && s.slug !== service.slug).slice(0, 3)
      );
    });
    return () => {
      active = false;
    };
  }, [service, locationId]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Đang tải chi tiết dịch vụ...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center">
        <AlertCircle size={64} className="mx-auto text-brand-primary mb-6 animate-pulse" />
        <h1 className="text-3xl font-bold text-brand-secondary mb-4 uppercase">Không tìm thấy dịch vụ</h1>
        <p className="text-slate-500 mb-8">Dịch vụ bạn đang tìm kiếm không tồn tại hoặc đã bị thay đổi.</p>
        <Link to={`${siteLocationPrefix}/dich-vu`} className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold">
          Quay lại danh sách dịch vụ
        </Link>
      </div>
    );
  }

  const ServiceIcon = getIconComponent(service.icon);

  return (
    <div className="pt-20">
      <PageSEO pageType="service" data={service} />
      
      {/* Breadcrumbs */}
      <div className="bg-slate-50 py-4">
        <div className="section-container">
          <Breadcrumbs 
            items={[
              { label: 'Dịch vụ', href: `${siteLocationPrefix}/dich-vu` },
              { label: service.title, active: true }
            ]} 
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="section-container grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 text-brand-primary mb-6">
              <ServiceIcon size={32} />
              <span className="font-bold uppercase tracking-widest">
                {service.category === 'electrical' ? 'Điện dân dụng' : service.category === 'plumbing' ? 'Nước dân dụng' : service.category === 'camera' ? 'Camera an ninh' : 'Siêu âm rò rỉ'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-secondary mb-6 uppercase tracking-tighter leading-tight">
              {service.title}
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {service.fullDescription}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <Clock className="text-brand-primary" size={24} />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Hỗ trợ</div>
                  <div className="font-bold text-brand-secondary">30 Phút có mặt</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="text-brand-primary" size={24} />
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase">Bảo trì</div>
                  <div className="font-bold text-brand-secondary">Bảo hành 12th</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all uppercase">
                <Phone size={20} />
                Gọi Ngay 0389.011.315
              </a>
              <a href="https://zalo.me/0389011315" className="flex items-center justify-center gap-3 bg-[#0068ff] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all uppercase">
                <MessageCircle size={20} />
                Chat Zalo
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src={service.image || `https://images.unsplash.com/photo-${service.id.startsWith('e') ? '1621905251189-08b45d6a269e' : service.id.startsWith('p') ? '1585704032938-164741364232' : service.id.startsWith('c') ? '1557597774-9d273605dfa9' : '1504148455328-c39695b8a592'}?auto=format&fit=crop&q=80&w=1200`}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decal */}
            <div className="absolute -bottom-6 -left-6 bg-brand-secondary text-white p-8 rounded-3xl shadow-xl max-w-[200px]">
              <div className="text-4xl font-bold mb-1">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Cam kết hài lòng</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing and Details */}
      <section className="py-20 bg-slate-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Features List */}
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                <h2 className="text-2xl font-bold text-brand-secondary mb-8 uppercase flex items-center gap-3">
                  <CheckCircle2 className="text-brand-primary" />
                  Ưu điểm dịch vụ
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {service.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      </div>
                      <span className="font-bold text-slate-600">{feature}</span>
                    </div>
                  ))}
                  {service.benefits?.map((benefit, idx) => (
                     <div key={`benefit-${idx}`} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full" />
                      </div>
                      <span className="font-bold text-slate-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Table */}
              {service.pricing && service.pricing.length > 0 && (
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                  <h2 className="text-2xl font-bold text-brand-secondary mb-8 uppercase flex items-center gap-3">
                    <Wrench className="text-brand-primary" />
                    Bảng giá tham khảo
                  </h2>
                  <div className="overflow-hidden border border-slate-100 rounded-2xl">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 font-bold text-brand-secondary">Hạng mục</th>
                          <th className="px-6 py-4 font-bold text-brand-secondary">Đơn giá</th>
                          <th className="px-6 py-4 font-bold text-brand-secondary">Đơn vị</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {service.pricing.map((p, idx) => (
                          <tr key={idx} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-bold text-slate-600">{p.item}</td>
                            <td className="px-6 py-4 font-bold text-brand-primary uppercase">{p.price}</td>
                            <td className="px-6 py-4 text-slate-400 text-sm font-bold uppercase">{p.unit || 'mục'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-6 text-xs text-slate-400">
                    * Giá trên mang tính chất tham khảo. Đơn giá thực tế sẽ được kỹ thuật viên báo sau khi khảo sát hiện trạng trực tiếp.
                  </p>
                </div>
              )}

              {/* Process */}
              <ProcessTimeline />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Sticky Contact Card */}
              <div className="sticky top-24 space-y-8">
                <div className="bg-brand-secondary p-8 rounded-[2.5rem] text-white">
                  <h3 className="text-xl font-bold mb-4 uppercase">Cần thợ ngay?</h3>
                  <p className="text-white/70 text-sm mb-6">Đội ngũ kỹ thuật trực 24/7 tại khu vực {appLocation || 'Bảo Lộc'} và lân cận.</p>
                  <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white w-full py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 transition-all">
                    <Phone size={20} />
                    0389.011.315
                  </a>
                  <div className="mt-6 flex items-center justify-center gap-4 text-xs font-bold text-white/50">
                    <div className="flex items-center gap-1"><Clock size={14}/> 30 Phút</div>
                    <div className="flex items-center gap-1"><ShieldCheck size={14}/> Bảo hành</div>
                  </div>
                </div>

                {/* Related Services */}
                {relatedServices.length > 0 && (
                  <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                    <h3 className="text-xl font-bold text-brand-secondary mb-6 uppercase">Dịch vụ liên quan</h3>
                    <div className="space-y-4">
                      {relatedServices.map((rs) => {
                        const RelatedIcon = getIconComponent(rs.icon);
                        return (
                          <Link 
                            key={rs.slug} 
                            to={`${siteLocationPrefix}/dich-vu/${rs.slug}`}
                            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                          >
                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors shrink-0">
                              <RelatedIcon size={20} />
                            </div>
                            <span className="font-bold text-brand-secondary text-sm leading-tight">{rs.title}</span>
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

      {/* FAQ specific to service or general */}
      <FAQSection />

      {/* Final CTA */}
      <FinalCTA />
    </div>
  );
};

export default ServiceDetailTemplate;
