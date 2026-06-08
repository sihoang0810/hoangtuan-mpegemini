import { motion, AnimatePresence } from 'motion/react';
import { Phone, CheckCircle, MessageSquare, Wrench, ShieldCheck, UserCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/faqs';
import { useState, useEffect } from 'react';
import { getFaqs, CMSFaq } from '../lib/sanity';


const STEPS = [
  { id: 1, title: 'Tiếp nhận yêu cầu', desc: 'Ghi nhận thông tin qua hotline hoặc website.', icon: MessageSquare },
  { id: 2, title: 'Điều phối kỹ thuật', desc: 'Thợ gần nhất sẽ được cử đến hỗ trợ bạn.', icon: UserCheck },
  { id: 3, title: 'Kiểm tra & Báo giá', desc: 'Thợ kiểm tra thực tế và báo phí minh bạch.', icon: ShieldCheck },
  { id: 4, title: 'Thi công & Bàn giao', desc: 'Thợ tiến hành sửa chữa và bàn giao nghiệm thu.', icon: Wrench },
];

export default function ProcessTimeline() {
  return (
    <section className="section-container bg-white">
      <div className="text-center mb-10 md:mb-16">
        <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">Quy Trình Làm Việc</p>
        <h2 className="font-bold text-brand-secondary">
          Sửa Chữa Chuyên Nghiệp Trong 4 Bước
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
        {/* Connection Line */}
        <div className="hidden md:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-slate-200 z-0" />
        
        {STEPS.map((step, idx) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative z-10 flex flex-col items-center text-center px-4"
          >
            <div className="w-16 h-16 bg-white border-4 border-slate-50 rounded-full shadow-lg flex items-center justify-center text-brand-primary mb-6 group hover:bg-brand-primary hover:text-white transition-all">
              <step.icon size={28} />
            </div>
            <div className="bg-brand-primary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center mb-4">
              {step.id}
            </div>
            <h4 className="text-lg font-bold text-brand-secondary mb-2">{step.title}</h4>
            <p className="text-slate-500 text-sm">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

import { useLocation } from '../context/LocationContext';

export function FAQSection() {
  const { locationSlug } = useLocation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<CMSFaq[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let active = true;
    getFaqs(locationSlug).then(data => {
      if (active) setFaqs(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const items = faqs.length > 0 ? faqs : FAQS;
  const displayedItems = showAll ? items : items.slice(0, 8);

  return (
    <section className="section-container bg-white">
      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
        <div>
          <p className="text-brand-primary font-bold tracking-widest uppercase mb-4 text-xs">Hỏi Đáp Thường Gặp</p>
          <h2 className="font-bold text-brand-secondary mb-8">
            Giải Đáp Thắc Mắc <br />Cho Khách Hàng
          </h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            Chúng tôi tập hợp những câu hỏi phổ biến nhất để giúp bạn hiểu rõ hơn về quy trình và cam kết dịch vụ của chúng tôi.
          </p>
          <div className="bg-brand-primary/5 p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl border border-brand-primary/10">
            <h4 className="text-xl font-bold text-brand-secondary mb-4 flex items-center gap-3">
              <Phone className="text-brand-primary" />
              Vẫn còn thắc mắc?
            </h4>
            <p className="text-slate-600 mb-6 font-medium">Hỗ trợ 24/7 qua hotline kỹ thuật:</p>
            <a href="tel:0389011315" className="text-2xl font-bold text-brand-primary block hover:underline">0389 011 315</a>
          </div>
        </div>

        <div className="space-y-4">
          {displayedItems.map((faq, idx) => (
            <div 
              key={idx}
              className={`rounded-2xl border transition-all ${
                openIdx === idx ? 'border-brand-primary bg-slate-50 shadow-sm' : 'border-slate-100 bg-white'
               }`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                aria-controls={`faq-answer-${idx}`}
                className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span className={`font-bold transition-colors ${openIdx === idx ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                  {faq.question}
                </span>
                <div className="shrink-0 w-10 h-10 md:w-8 md:h-8 rounded-full bg-slate-100 flex items-center justify-center transition-all">
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 text-slate-500 ${openIdx === idx ? 'rotate-180 text-brand-primary' : ''}`} 
                  />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {openIdx === idx && (
                  <motion.div
                    id={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-brand-primary/10 mt-0">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}

          {items.length > 8 && (
            <div className="pt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary/5 text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-300 font-bold text-sm rounded-2xl w-full sm:w-auto justify-center"
              >
                {showAll ? (
                  <>
                    Thu gọn <ChevronUp size={16} />
                  </>
                ) : (
                  <>
                    Xem thêm ({items.length - 8} câu hỏi khác) <ChevronDown size={16} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
