import React from 'react';
import { ArrowRight, FileText, ShieldCheck, Clock } from 'lucide-react';

interface ReusableBlockSectionProps {
  blockKey?: string;
  siteHotline?: string;
}

export function ReusableBlockSection({
  blockKey = 'promo_alert',
  siteHotline = '0389 011 315',
}: ReusableBlockSectionProps) {
  const blockType = blockKey || 'promo_alert';

  return (
    <section className="py-12 bg-slate-900 text-white relative overflow-hidden" id="section-reusable-block">
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        {blockType === 'promo_alert' ? (
          <div className="bg-gradient-to-br from-orange-600/90 to-red-700/95 border border-orange-500/20 rounded-[2rem] p-8 md:p-12 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <span className="text-9xl font-black font-mono">%</span>
            </div>
            <span className="inline-block bg-white text-orange-700 text-[10px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-4 animate-pulse">
              🔥 SIÊU GIẢM GIÁ ĐỘC QUYỀN
            </span>
            <h4 className="text-2xl md:text-3xl font-black tracking-tight leading-snug">GIẢM NGAY 20% PHÍ THI CÔNG</h4>
            <p className="text-xs text-orange-100 leading-relaxed max-w-lg mx-auto mt-2">
              Dành riêng cho khách đặt lịch khảo sát siêu âm rò rỉ nước ngầm hoặc vá chập hệ thống điện qua Website hôm nay. Nhận bảo hành trọn đời!
            </p>
          </div>
        ) : blockType === 'trust_badge' ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { title: 'Báo Giá Trước Sửa', desc: 'Không thu bất kỳ phụ phí nào, báo giá minh bạch sau khảo sát siêu âm.', icon: FileText, col: 'from-blue-600 to-indigo-700' },
              { title: 'Vật Tư Chính Hãng', desc: 'Trực tiếp phân phối linh phụ kiện thiết bị điện nước MPE chính hãng 100%.', icon: ShieldCheck, col: 'from-emerald-600 to-teal-700' },
              { title: 'Bảo Hành 5 Năm', desc: 'Cam kết thi công dứt điểm rò rỉ, bảo hành kỹ thuật bằng biên lai chính thức.', icon: Clock, col: 'from-orange-600 to-red-600' }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700/50 rounded-2xl p-6 text-center shadow-lg hover:border-orange-500/40 transition-all">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.col} flex items-center justify-center mx-auto mb-4 text-white shadow-md`}>
                  <item.icon size={22} />
                </div>
                <h5 className="font-extrabold text-sm mb-1">{item.title}</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border-4 border-dashed border-red-500/80 p-8 rounded-[2rem] bg-red-950/20 max-w-xl mx-auto relative group">
            <div className="flex items-center justify-center gap-3 text-red-400 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-black text-xs uppercase tracking-widest">SỰ CỐ KHẨN CẤP / ALARM ALERT</span>
            </div>
            <h4 className="text-xl font-black text-rose-300">ĐỘI CỨU HỘ KHẨN CẤP ĐANG TRỰC CHIẾN</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed mt-2.5">
              Tại khu vực của bạn, chúng tôi luôn có 3 thợ rà rò tìm sẵn sàng xuất phát trong 15 phút. Nhấn gọi hỗ trợ ngay lập tức!
            </p>
            <a
              href={`tel:${siteHotline}`}
              className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-extrabold text-[10px] uppercase tracking-wider px-5 py-2 rounded-xl shadow-lg mt-4 text-center cursor-pointer"
            >
              Khẩn cấp: Gọi Đội Cứu Hộ <ArrowRight size={12} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
