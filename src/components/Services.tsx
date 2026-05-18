import { motion } from 'motion/react';
import { SERVICES } from '../data/services';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <section id="services" className="section-container bg-white">
      <div className="text-center mb-16">
        <h2 className="text-brand-primary font-bold tracking-widest uppercase mb-4">Dịch Vụ Của Chúng Tôi</h2>
        <h3 className="text-3xl md:text-5xl font-bold text-brand-secondary uppercase tracking-tighter">
          Giải Pháp Toàn Diện Cho Gia Đình
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-100 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all hover:-translate-y-2 flex flex-col h-full"
          >
            <div className="w-14 h-14 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
              <service.icon size={28} />
            </div>
            <h4 className="text-xl font-bold text-brand-secondary mb-3">{service.title}</h4>
            <p className="text-slate-600 mb-6 line-clamp-3">
              {service.shortDescription}
            </p>
            <Link 
              to={`/dich-vu/${service.slug}`}
              className="flex items-center gap-2 font-bold text-brand-primary group-hover:gap-3 transition-all mt-auto"
            >
              Xem chi tiết
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
