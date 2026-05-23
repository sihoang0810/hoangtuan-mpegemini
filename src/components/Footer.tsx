import { Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getFooter, CMSFooter } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';

// Custom simple Zalo SVG icon
const ZaloIcon = ({ size = 18 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: size, height: size }}>
    <path d="M22.091 14.394c-.201-.274-.475-.522-.816-.738.312-.497.514-1.077.514-1.656 0-2.761-3.134-5-7-5s-7 2.239-7 5 3.134 5 7 5c.421 0 .83-.028 1.226-.081 1.054.896 2.457 1.481 3.991 1.636.19.019.38.031.571.031.259 0 .506-.022.744-.063.19-.033.37-.087.541-.159l.012-.005c.403-.172.645-.595.645-1.031 0-.317-.11-.607-.291-.834l-.197-.101zm-7.304-4.894c.328 0 .594.266.594.594s-.266.594-.594.594-.594-.266-.594-.594.266-.594.594-.594zm-2.375.594c0 .328-.266.594-.594.594s-.594-.266-.594-.594.266-.594.594-.594.594.266.594.594z" />
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
  const { locationSlug, setShowPopup } = useLocation();
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

  const companyName = footerData?.companyName || 'Hoàng Tuấn MPE';
  const shortAbout = footerData?.shortAbout || 'Hoàng Tuấn MPE tự hào là đơn vị cung cấp dịch vụ sửa chữa điện nước và thiết bị điện MPE uy tín hàng đầu tại Việt Nam. Sự hài lòng của khách hàng là kim chỉ nam cho mọi hoạt động của chúng tôi.';
  const address = footerData?.address || ((locationSlug === 'ho-chi-minh' || locationSlug === 'ho-chi-minh') ? '528/17 Tô Ngọc Vân, Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao sire, Phường 3, Bảo Lộc, Lâm Đồng");
  const phone = footerData?.phone || '0389 011 315';
  const email = footerData?.email || 'hoangtuanmpe@gmail.com';
  const facebookUrl = footerData?.socialLinks?.facebook || 'https://facebook.com';
  const youtubeUrl = footerData?.socialLinks?.youtube || 'https://youtube.com';
  const zaloUrl = footerData?.socialLinks?.zalo || `https://zalo.me/${phone.replace(/[.\s]/g, '')}`;
  const tiktokUrl = 'https://www.tiktok.com/@diennuoccamerabaoloc';
  const copyrightText = footerData?.copyrightText || `© ${currentYear} ${companyName}. All rights reserved.`;

  const quickLinks = [
    { name: 'Trang chủ', href: `${siteLocationPrefix}` },
    { name: 'Dịch vụ', href: `${siteLocationPrefix}/dich-vu` },
    { name: 'Bảng giá', href: `${siteLocationPrefix}/bang-gia` },
    { name: 'Sản phẩm', href: `${siteLocationPrefix}/san-pham` },
    { name: 'Blog', href: `${siteLocationPrefix}/blog` },
    { name: 'Liên hệ', href: `${siteLocationPrefix}/lien-he` },
  ];

  const serviceLinks = [
    { name: 'Sửa điện', href: `${siteLocationPrefix}/dich-vu/sua-dien` },
    { name: 'Sửa chập điện', href: `${siteLocationPrefix}/dich-vu/sua-chap-dien` },
    { name: 'Sửa máy bơm', href: `${siteLocationPrefix}/dich-vu/lap-may-bom` },
    { name: 'Sửa rò rỉ nước', href: `${siteLocationPrefix}/dich-vu/sua-ro-ri-nuoc` },
    { name: 'Siêu âm đường ống', href: `${siteLocationPrefix}/dich-vu/sieu-am-do-ong-am` },
    { name: 'Lắp camera', href: `${siteLocationPrefix}/dich-vu/lap-camera` },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
                <span className="font-bold text-xl uppercase">HT</span>
              </div>
              <span className="font-bold text-xl text-white uppercase tracking-tighter">{companyName}</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              {shortAbout}
            </p>
            <div className="flex gap-4">
              <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                <Youtube size={18} />
              </a>
              <a href={zaloUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                <ZaloIcon size={18} />
              </a>
              <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all" title="TikTok">
                <TikTokIcon size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Liên Kết</h4>
            <ul className="space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-brand-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-primary rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Dịch Vụ</h4>
            <ul className="space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link to={item.href} className="hover:text-brand-primary transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-primary rounded-full" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 uppercase tracking-wider">Liên Hệ</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <MapPin className="text-brand-primary shrink-0 mt-1" size={20} />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-brand-primary shrink-0" size={20} />
                <a href={`tel:${phone.replace(/[.\s]/g, '')}`} className="font-bold text-white hover:text-brand-primary transition-colors">{phone}</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-brand-primary shrink-0" size={20} />
                <a href={`mailto:${email}`} className="hover:text-brand-primary transition-colors">{email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>{copyrightText}</p>
          <div className="flex gap-8">
            <button 
              onClick={() => setShowPopup(true)} 
              className="hover:text-brand-primary transition-colors cursor-pointer text-left focus:outline-none"
            >
              Đổi khu vực ({locationSlug || 'Chưa chọn'})
            </button>
            <Link to="/dieu-khoan" className="hover:text-brand-primary transition-colors">Điều khoản dịch vụ</Link>
            <Link to="/bao-mat" className="hover:text-brand-primary transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
