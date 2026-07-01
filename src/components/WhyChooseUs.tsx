import { motion } from 'motion/react';
import { WHY_CHOOSE_US } from '../constants';
import InlineEdit from './InlineEdit';

export default function WhyChooseUs({ 
  cmsData,
  isEditable = false,
  onUpdateDraftField
}: { 
  cmsData?: any;
  isEditable?: boolean;
  onUpdateDraftField?: (field: string, value: any) => void;
}) {
  const heading = cmsData?.whyChooseUsTitle !== undefined ? cmsData.whyChooseUsTitle : (cmsData?.heading || "Tại Sao Chọn Chúng Tôi");
  const subheading = cmsData?.whyChooseUsSubtitle !== undefined ? cmsData.whyChooseUsSubtitle : (cmsData?.subheading || "Dịch Vụ Uy Tín, Chất Lượng Hàng Đầu");

  return (
    <section className="py-10 md:py-12 lg:py-14 bg-slate-50 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
        <div>
          <InlineEdit 
            value={heading}
            isEditable={isEditable}
            onSave={(val) => onUpdateDraftField?.('whyChooseUsTitle', val)}
            className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs block"
            element="p"
          />
          
          <InlineEdit 
            value={subheading}
            isEditable={isEditable}
            onSave={(val) => onUpdateDraftField?.('whyChooseUsSubtitle', val)}
            className="font-bold text-brand-secondary mb-8 block"
            element="h2"
            multiline={true}
          />

          <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-10 leading-relaxed">
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
              src="/images/imou-ngoai-troi.jpg" 
              alt="Thợ sửa chữa chuyên nghiệp đang thi công" 
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
    </div>
  </section>
  );
}
