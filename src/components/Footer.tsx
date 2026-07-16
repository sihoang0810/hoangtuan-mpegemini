import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFooter, CMSFooter } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import logoUrl from '../assets/images/hoang_tuan_logo_1779774192464.png';

// Custom simple Zalo SVG icon
const ZaloIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }} fillRule="evenodd" clipRule="evenodd">
    <path d="M12.003 2C6.443 2 2 6.443 2 12.003c0 2.115.65 4.075 1.765 5.7L2 22l4.475-1.472a9.92 9.92 0 0 0 5.528 1.475c5.56 0 10.003-4.443 10.003-10.003C22.006 6.443 17.563 2 12.003 2ZM15 14H10.5L15 8.75V7.5H9V9H13.5L9 14.25V15.5H15V14Z" />
  </svg>
);

// Custom simple TikTok SVG icon
const TikTokIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.74-3.94-1.74-.22-.2-.41-.43-.58-.67-.02 2.44-.01 4.88-.01 7.32-.03 1.25-.33 2.54-.95 3.63-.82 1.43-2.28 2.45-3.92 2.78-1.73.35-3.64.13-5.2-.68-1.57-.81-2.73-2.38-3.08-4.14-.4-1.93-.05-4.03 1.05-5.69 1.13-1.73 3.12-2.82 5.19-2.83.05 1.45.02 2.91.03 4.36-.67.03-1.37.11-1.99.39-.77.34-1.4 1.01-1.63 1.83-.34 1.14-.1 2.44.62 3.39.73.98 1.95 1.53 3.17 1.47 1.43-.03 2.78-.99 3.23-2.35.24-.65.29-1.36.27-2.05L12.53.02z" />
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { locationSlug, changeLocation } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;
  const [footerData, setFooterData] = useState<CMSFooter | null>(null);

  useEffect(() => {
    let active = true;
    getFooter(locationSlug).then(data => {
      if (active) setFooterData(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  // Always use "Hoàng Tuấn MPE" instead of "Công ty..." since it is a personal/family service
  const companyName = 'Hoàng Tuấn MPE';
  
  const rawShortAbout = footerData?.shortAbout || 'Hoàng Tuấn MPE tự hào là đơn vị cung cấp dịch vụ sửa chữa điện nước và thiết bị điện MPE uy tín hàng đầu tại Việt Nam. Sự hài lòng của khách hàng là kim chỉ nam cho mọi hoạt động của chúng tôi.';
  // Sanitize shortAbout to keep it aligned with "not a company"
  const shortAbout = rawShortAbout
    .replace(/Công ty TNHH/gi, 'Dịch vụ')
    .replace(/Công ty/gi, 'Dịch vụ');

  const address = footerData?.address || (locationSlug === 'ho-chi-minh'
    ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh'
    : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng");
  const phone = footerData?.phone || '0389 011 315';
  const email = footerData?.email || 'hoangtuanmpe@gmail.com';
  const facebookUrl = footerData?.socialLinks?.facebook || 'https://facebook.com';
  const youtubeUrl = footerData?.socialLinks?.youtube || 'https://youtube.com';
  const zaloUrl = footerData?.socialLinks?.zalo || `https://zalo.me/${phone.replace(/[.\s]/g, '')}`;
  const tiktokUrl = 'https://www.tiktok.com/@diennuoccamerabaoloc';
  
  const rawCopyrightText = footerData?.copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;
  const copyrightText = rawCopyrightText
    .replace(/Công ty TNHH/gi, 'Hoàng Tuấn MPE')
    .replace(/Công ty/gi, 'Hoàng Tuấn MPE');

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 md:pt-20 pb-[calc(6rem+env(safe-area-inset-bottom))] md:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 mb-16">
          {/* Company Info - Takes up more space */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 group cursor-pointer inline-flex w-auto">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-white shadow-md shadow-brand-primary/10 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300 pointer-events-none">
                <img src={logoUrl} alt="Hoàng Tuấn Logo - Sửa chữa điện nước" className="w-full h-full object-cover mix-blend-multiply" />
              </div>
              <span className="font-bold text-2xl text-white uppercase tracking-tight group-hover:text-brand-primary transition-colors">{companyName}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              {shortAbout}
            </p>
            <div className="pt-2">
              <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Kết nối với chúng tôi</h4>
              <div className="flex gap-4">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all shadow-sm">
                  <Facebook size={18} />
                </a>
                <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all shadow-sm">
                  <Youtube size={18} />
                </a>
                <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all shadow-sm">
                  <ZaloIcon size={18} />
                </a>
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all shadow-sm" title="TikTok">
                  <TikTokIcon size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* SEO Content & Business Hours */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
                Khu Vực Phục Vụ
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Chuyên cung cấp dịch vụ <strong>sửa chữa điện nước</strong>, <strong>lắp đặt camera</strong>, và <strong>xử lý sự cố điện nước khẩn cấp</strong> tại TP. Hồ Chí Minh và Bảo Lộc (Lâm Đồng). Đội ngũ thợ lành nghề, có mặt nhanh chóng, xử lý triệt để, bảo hành dài hạn.
              </p>
            </div>
            
            <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
              <h5 className="text-white font-semibold text-sm mb-3">Thời Gian Làm Việc</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                  <span>Thứ 2 - Thứ 7:</span>
                  <span className="text-white font-medium">07:30 - 18:00</span>
                </li>
                <li className="flex justify-between items-center border-b border-slate-700/50 pb-2">
                  <span>Chủ Nhật:</span>
                  <span className="text-white font-medium">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between items-center pt-1 text-brand-primary font-medium">
                  <span>Hỗ trợ khẩn cấp:</span>
                  <span>24/7</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3 space-y-6">
            <h4 className="text-white font-bold text-lg mb-6 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 bg-brand-primary rounded-full"></span>
              Thông Tin Liên Hệ
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all text-brand-primary mt-1">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Trụ sở chính</span>
                  <span className="text-slate-400 text-sm leading-snug">{address}</span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all text-brand-primary mt-1">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Hotline tư vấn</span>
                  <a href={`tel:${phone.replace(/[.\s]/g, '')}`} className="font-bold text-white text-lg hover:text-brand-primary transition-colors">{phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:border-brand-primary group-hover:text-white transition-all text-brand-primary mt-1">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Email hỗ trợ</span>
                  <a href={`mailto:${email}`} className="text-slate-400 hover:text-brand-primary transition-colors text-sm break-all">{email}</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-8 text-sm text-slate-500">
          <p>{copyrightText}</p>
          <div className="flex gap-4 sm:gap-8 items-center flex-wrap justify-center">
            <span className="text-slate-600 hidden lg:inline-block">Khu vực:</span>
            <Link 
              to="/ho-chi-minh" 
              onClick={() => console.log('Navigation target:', '/ho-chi-minh')}
              className="hover:text-brand-primary transition-colors font-medium"
            >TP. Hồ Chí Minh</Link>
            <Link 
              to="/bao-loc" 
              onClick={() => console.log('Navigation target:', '/bao-loc')}
              className="hover:text-brand-primary transition-colors font-medium"
            >Bảo Lộc</Link>
            <span className="w-1 h-1 bg-slate-700 rounded-full hidden md:block"></span>
            <Link 
              to={`${siteLocationPrefix}/dieu-khoan`} 
              onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/dieu-khoan`)}
              className="hover:text-brand-primary transition-colors"
            >Điều khoản</Link>
            <Link 
              to={`${siteLocationPrefix}/bao-mat`} 
              onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/bao-mat`)}
              className="hover:text-brand-primary transition-colors"
            >Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
