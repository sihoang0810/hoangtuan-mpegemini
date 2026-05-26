import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../constants';

export default function WhyChooseUs({ cmsData }: { cmsData?: any }) {
  const heading = cmsData?.heading || "Tại Sao Chọn Chúng Tôi";
  const subheading = cmsData?.subheading || "Dịch Vụ Uy Tín, Chất Lượng Hàng Đầu";

  return (
    <section className="section-container bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">{heading}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-8" dangerouslySetInnerHTML={{ __html: subheading.replace(/\n/g, '<br />') }} />

          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Chúng tôi hiểu rằng sự cố điện nước có thể gây ra nhiều phiền toái. 
            Đó là lý do tại sao chúng tôi xây dựng quy trình làm việc chuyên nghiệp, 
            tận tâm và minh bạch nhất.
          </p>
          
          <div className="space-y-6">
            {WHY_CHOOSE_US.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.05, 0.15), duration: 0.3 }}
                className="flex items-start gap-4"
              >
                <div className="w-12 h-12 shrink-0 bg-white shadow-md rounded-full flex items-center justify-center text-brand-primary">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-secondary">{item.title}</h4>
                  <p className="text-slate-500">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/5] bg-brand-primary/10 rounded-3xl overflow-hidden shadow-2xl relative">
            <img 
              src="/images/og-default.jpg" 
              alt="Repair professional" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
              width={800}
              height={1000}
            />
          </div>
          {/* Overlay Stat */}
          <div className="absolute -top-10 -right-10 bg-brand-accent p-8 rounded-2xl shadow-xl rotate-6 hidden md:block">
            <div className="text-4xl font-bold text-white mb-1">99%</div>
            <div className="text-white/80 font-bold text-sm uppercase tracking-wider">Khách hàng hài lòng</div>
          </div>
        </div>
      </div>
    </section>
  );
}
