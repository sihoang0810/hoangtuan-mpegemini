import { Phone, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function FinalCTA() {
  return (
    <section className="section-container">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-brand-secondary rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden text-center md:text-left shadow-2xl"
      >
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Gặp Sự Cố Điện Nước? <br />
              Đừng Lo, Gọi <span className="text-brand-primary">Chúng Tôi!</span>
            </h2>
            <div className="space-y-4 mb-10">
              {[
                "Phục vụ 24/7 kể cả ngày lễ và chủ nhật",
                "Có mặt cực nhanh sau 15 - 30 phút gọi",
                "Kiểm tra tận nơi hoàn toàn miễn phí"
              ].map((text, idx) => (
                <div key={idx} className="flex items-center gap-3 justify-center md:justify-start">
                  <CheckCircle size={20} className="text-brand-primary shrink-0" />
                  <span className="text-white/80 font-medium">{text}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <a href="tel:0123456789" className="btn-primary flex items-center justify-center gap-3 text-xl py-5 px-10">
                <Phone size={24} />
                0123 456 789
              </a>
              <div className="flex flex-col justify-center">
                <span className="text-white/60 text-sm font-bold uppercase tracking-widest mb-1">Hotline Kỹ Thuật</span>
                <span className="text-white font-bold text-lg">Hỗ trợ khẩn cấp 24/7</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-3xl">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
                <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="block text-white/50 text-xs font-bold uppercase">Thời gian phản hồi</span>
                  <span className="text-white font-bold text-xl">Dưới 30 phút</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <span className="block text-white/50 text-xs font-bold uppercase">Cam kết dịch vụ</span>
                  <span className="text-white font-bold text-xl">Bảo hành 12 tháng</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
