import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, MapPin, ChevronDown, Zap, Droplet, Video, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation as useAppLocation } from '../context/LocationContext';

const SERVICE_MENU = [
  {
    title: 'ĐIỆN',
    icon: Zap,
    color: 'text-blue-500',
    links: [
      { name: 'Sửa điện', href: '/dich-vu/sua-dien' },
      { name: 'Sửa chập điện', href: '/dich-vu/sua-chap-dien' },
      { name: 'Sửa aptomat', href: '/dich-vu/sua-aptomat' },
      { name: 'Lắp đặt điện', href: '/dich-vu/lap-dat-dien' },
    ]
  },
  {
    title: 'NƯỚC',
    icon: Droplet,
    color: 'text-cyan-500',
    links: [
      { name: 'Sửa nước', href: '/dich-vu/sua-nuoc' },
      { name: 'Lắp máy bơm', href: '/dich-vu/lap-may-bom' },
      { name: 'Sửa rò rỉ nước', href: '/dich-vu/sua-ro-ri-nuoc' },
      { name: 'Sửa ống nước âm', href: '/dich-vu/sua-ong-nuoc-am' },
    ]
  },
  {
    title: 'CAMERA',
    icon: Video,
    color: 'text-indigo-500',
    links: [
      { name: 'Lắp camera', href: '/dich-vu/lap-camera' },
      { name: 'Sửa camera', href: '/dich-vu/sua-camera' },
      { name: 'Camera gia đình', href: '/dich-vu/camera-gia-dinh' },
      { name: 'Camera cửa hàng', href: '/dich-vu/camera-cua-hang' },
    ]
  },
  {
    title: 'DÒ TÌM',
    icon: Search,
    color: 'text-amber-500',
    links: [
      { name: 'Dò rò rỉ nước', href: '/dich-vu/do-ro-ri-nuoc' },
      { name: 'Siêu âm dò ống âm', href: '/dich-vu/sieu-am-do-ong-am' },
      { name: 'Dò đường nước âm', href: '/dich-vu/do-duong-nuoc-am' },
      { name: 'Dò điện âm tường', href: '/dich-vu/do-duong-dien-am-tuong' },
    ]
  }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const routerLocation = useRouterLocation();
  const { location: appLocation, setShowPopup } = useAppLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu', hasDropdown: true },
    { name: 'Bảng giá', href: '/bang-gia' },
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || routerLocation.pathname !== '/' ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <span className="text-white font-bold text-2xl uppercase">HT</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-brand-secondary uppercase leading-none whitespace-nowrap tracking-tight">
                HOÀNG TUẤN
              </span>
              <span className="font-bold text-xl text-brand-secondary uppercase leading-none whitespace-nowrap mt-0.5 tracking-tight">
                MPE
              </span>
              <span className="text-brand-primary text-[10px] font-bold tracking-[0.2em] uppercase mt-1 whitespace-nowrap">
                TẬN NƠI 24/7
              </span>
            </div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className={link.hasDropdown ? 'group' : ''}>
                  <Link 
                    to={link.href}
                    className={`relative py-8 text-base font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                      routerLocation.pathname.startsWith(link.href) && link.href !== '/' ? 'text-brand-primary' : 'text-brand-secondary hover:text-brand-primary'
                    } ${routerLocation.pathname === '/' && link.href === '/' ? 'text-brand-primary' : ''}`}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />}
                    <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${
                      (routerLocation.pathname.startsWith(link.href) && link.href !== '/') || (routerLocation.pathname === '/' && link.href === '/') ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                  </Link>

                  {/* Mega Menu Dropdown */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-full max-w-5xl bg-white shadow-2xl border-t border-slate-100 rounded-b-[2rem] p-8 hidden group-hover:block animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="grid grid-cols-4 gap-8">
                        {SERVICE_MENU.map((item) => (
                          <div key={item.title}>
                            <div className={`flex items-center gap-2 font-bold mb-4 ${item.color}`}>
                              <item.icon size={20} />
                              <span className="tracking-widest uppercase text-xs">{item.title}</span>
                            </div>
                            <ul className="space-y-3">
                              {item.links.map((sublink) => (
                                <li key={sublink.name}>
                                  <Link 
                                    to={sublink.href}
                                    className="text-slate-600 hover:text-brand-primary flex flex-col transition-colors"
                                  >
                                    <span className="font-bold text-sm">{sublink.name}</span>
                                    <span className="text-[10px] text-slate-400 capitalize">tại {appLocation || 'Bảo Lộc'}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center">
                        <Link 
                          to="/dich-vu"
                          className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-full font-bold text-sm uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 tracking-widest"
                        >
                          Xem tất cả dịch vụ
                          <ArrowRight size={18} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Location Selector Button - Right */}
          <div className="hidden lg:block shrink-0">
            <button 
              onClick={() => setShowPopup(true)}
              className="flex items-center gap-3 bg-brand-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer tracking-tight"
            >
              <MapPin size={22} />
              <span>{appLocation || 'Bảo Lộc'}</span>
              <ChevronDown size={18} className="opacity-70" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-brand-secondary p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t lg:hidden h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link 
                    to={link.href}
                    className={`text-lg font-bold py-2 flex justify-between items-center ${
                      routerLocation.pathname.startsWith(link.href) && link.href !== '/' ? 'text-brand-primary' : 'text-brand-secondary'
                    }`}
                    onClick={() => !link.hasDropdown && setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 grid grid-cols-2 gap-4 mt-2">
                       {SERVICE_MENU.map((item) => (
                         <div key={item.title}>
                           <span className="text-[10px] font-bold text-slate-400 block mb-2 tracking-widest uppercase">{item.title}</span>
                           <ul className="space-y-1">
                             {item.links.map((sublink) => (
                               <li key={sublink.name}>
                                 <Link 
                                   to={sublink.href}
                                   className="text-sm font-bold text-slate-600 block py-1"
                                   onClick={() => setIsOpen(false)}
                                 >
                                   {sublink.name}
                                 </Link>
                               </li>
                             ))}
                           </ul>
                         </div>
                       ))}
                    </div>
                  )}
                </div>
              ))}
              <a 
                href="tel:0389011315" 
                className="flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-xl font-bold mt-2"
              >
                <PhoneCall size={20} />
                <span>Gọi Cứu Hộ: 0389 011 315</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
