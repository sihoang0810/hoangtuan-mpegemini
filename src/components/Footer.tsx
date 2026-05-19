import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu' },
    { name: 'Bảng giá', href: '/bang-gia' },
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  const serviceLinks = [
    { name: 'Sửa điện', href: '/dich-vu/sua-dien' },
    { name: 'Sửa chập điện', href: '/dich-vu/sua-chap-dien' },
    { name: 'Sửa máy bơm', href: '/dich-vu/lap-may-bom' },
    { name: 'Sửa rò rỉ nước', href: '/dich-vu/sua-ro-ri-nuoc' },
    { name: 'Siêu âm đường ống', href: '/dich-vu/sieu-am-do-ong-am' },
    { name: 'Lắp camera', href: '/dich-vu/lap-camera' },
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
              <span className="font-bold text-xl text-white uppercase tracking-tighter">Hoàng Tuấn MPE</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              Hoàng Tuấn MPE tự hào là đơn vị cung cấp dịch vụ sửa chữa điện nước và thiết bị điện MPE uy tín hàng đầu tại Việt Nam. 
              Sự hài lòng của khách hàng là kim chỉ nam cho mọi hoạt động của chúng tôi.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all">
                  <Icon size={18} />
                </a>
              ))}
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
                <span>Số 123, Đường Láng, <br />Quận Đống Đa, Hà Nội</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-brand-primary shrink-0" size={20} />
                <a href="tel:0389011315" className="font-bold text-white hover:text-brand-primary transition-colors">0389 011 315</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-brand-primary shrink-0" size={20} />
                <a href="mailto:contact@suadiennuoc.vn" className="hover:text-brand-primary transition-colors">contact@suadiennuoc.vn</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} Hoàng Tuấn MPE. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/dieu-khoan" className="hover:text-brand-primary transition-colors">Điều khoản dịch vụ</Link>
            <Link to="/bao-mat" className="hover:text-brand-primary transition-colors">Chính sách bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
