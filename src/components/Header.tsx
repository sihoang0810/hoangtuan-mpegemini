import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall, MapPin, ChevronDown, Zap, Droplet, Video, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation as useAppLocation } from '../context/LocationContext';
import { locationData } from '../data/locationData';
import { getSiteSettings, getMenus, CMSSiteSettings, CMSMenu } from '../lib/sanity';
import logoUrl from '../assets/images/hoang_tuan_logo_1779774192464.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const routerLocation = useRouterLocation();
  const { locationSlug, changeLocation } = useAppLocation();
  const siteLocationPrefix = '/' + locationSlug;

  // Active state checking logic for any menu link
  const getIsActive = (href: string, name: string) => {
    const currentPath = routerLocation.pathname;
    
    // Normalize href
    const normHref = href.startsWith('/') ? href : `/${href}`;
    const targetPath = normHref === '/' ? siteLocationPrefix : `${siteLocationPrefix}${normHref}`;
    
    // Home router matched exactly or is root
    if (normHref === '/') {
      return currentPath === siteLocationPrefix || currentPath === '/';
    }
    
    // Support potential Intro/About Giới thiệu
    if (name.toLowerCase().includes('giới thiệu') || normHref.includes('gioi-thieu')) {
      return currentPath.includes('gioi-thieu');
    }

    // Exact matches or subdirectory active page
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  // Click handler to smooth scroll when clicking a link on the same active page
  const handleMenuClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const normHref = href.startsWith('/') ? href : `/${href}`;
    const targetHref = normHref === '/' ? siteLocationPrefix : `${siteLocationPrefix}${normHref}`;
    const isSamePage = routerLocation.pathname === targetHref;

    if (isSamePage) {
      e.preventDefault();
      setIsOpen(false); // Clean up mobile overlay

      // Derive potential target id coordinates or fallback to standard top
      let targetId = '';
      if (normHref === '/dich-vu') targetId = 'services';
      else if (normHref === '/bang-gia') targetId = 'pricing';
      else if (normHref === '/san-pham') targetId = 'products';
      else if (normHref === '/blog') targetId = 'blog';
      else if (normHref === '/lien-he') targetId = 'contact';

      const element = targetId ? document.getElementById(targetId) : null;
      if (element) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        
        // 24px buffer room so sticky header does not block content/titles
        const offsetPosition = elementPosition - headerHeight - 24;
        
        window.scrollTo({
          top: offsetPosition >= 0 ? offsetPosition : 0,
          behavior: 'smooth'
        });
      } else {
        // Fallback scrolling to the top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    }
  };

  const SERVICE_MENU = [
    {
      title: 'ĐIỆN', icon: Zap, color: 'text-blue-500',
      links: [
        { name: 'Sửa điện', href: `${siteLocationPrefix}/dich-vu/sua-dien` },
        { name: 'Sửa chập điện', href: `${siteLocationPrefix}/dich-vu/sua-chap-dien` },
        { name: 'Sửa aptomat', href: `${siteLocationPrefix}/dich-vu/sua-aptomat` },
        { name: 'Lắp đặt điện', href: `${siteLocationPrefix}/dich-vu/lap-dat-dien` },
      ]
    },
    {
      title: 'NƯỚC', icon: Droplet, color: 'text-cyan-500',
      links: [
        { name: 'Sửa nước', href: `${siteLocationPrefix}/dich-vu/sua-nuoc` },
        { name: 'Lắp máy bơm', href: `${siteLocationPrefix}/dich-vu/lap-may-bom` },
        { name: 'Sửa rò rỉ nước', href: `${siteLocationPrefix}/dich-vu/sua-ro-ri-nuoc` },
        { name: 'Siêu âm đường ống', href: `${siteLocationPrefix}/dich-vu/sieu-am-do-ong-am` },
      ]
    },
    {
      title: 'CAMERA', icon: Video, color: 'text-indigo-500',
      links: [
        { name: 'Lắp camera', href: `${siteLocationPrefix}/dich-vu/lap-camera` },
        { name: 'Sửa camera', href: `${siteLocationPrefix}/dich-vu/sua-camera` },
        { name: 'Camera gia đình', href: `${siteLocationPrefix}/dich-vu/camera-gia-dinh` },
        { name: 'Camera cửa hàng', href: `${siteLocationPrefix}/dich-vu/camera-cua-hang` },
      ]
    },
    {
      title: 'DÒ TÌM', icon: Search, color: 'text-amber-500',
      links: [
        { name: 'Dò rò rỉ nước', href: `${siteLocationPrefix}/dich-vu/do-ro-ri-nuoc` },
        { name: 'Siêu âm dò ống âm', href: `${siteLocationPrefix}/dich-vu/sieu-am-do-ong-am` },
        { name: 'Dò đường nước âm', href: `${siteLocationPrefix}/dich-vu/do-duong-nuoc-am` },
        { name: 'Dò điện âm tường', href: `${siteLocationPrefix}/dich-vu/do-duong-dien-am-tuong` },
      ]
    }
  ];

  const [siteSettings, setSiteSettings] = useState<CMSSiteSettings | null>(null);
  const [menus, setMenus] = useState<CMSMenu[]>([]);

  useEffect(() => {
    let active = true;
    getSiteSettings().then(data => {
      if (active) setSiteSettings(data);
    });
    getMenus().then(data => {
      if (active) setMenus(data);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          setShowSticky(false); // Hide on scroll deviation downwards
        } else {
          setShowSticky(true);  // Pop back on scrolling upwards
        }
      } else {
        setShowSticky(true);
      }
      setLastScrollY(currentScrollY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      active = false;
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lastScrollY, isOpen]);

  const siteName = siteSettings?.siteName || 'Hoàng Tuấn MPE';
  const mainHotline = siteSettings?.mainHotline || '0389 011 315';
  const headerNotice = siteSettings?.headerNotice || 'Hỗ trợ khẩn cấp 24/7: Thợ trực chiến có mặt sau 30 phút!';

  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';

  const rawNavLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu', hasDropdown: true },
    { name: 'Sản phẩm', href: '/san-pham' },
    { name: 'Bảng giá', href: '/bang-gia' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  const navLinks = menus.length > 0 ? menus.map(m => {
    let name = m.title;
    // Overlap mapping for "Linh kiện MPE" or any containing "linh kiện" to correctly reflect "Sản phẩm"
    if (m.path === '/san-pham' || m.title === 'Linh kiện MPE' || m.title.toLowerCase().includes('linh kiện')) {
      name = 'Sản phẩm';
    }
    return {
      name: name,
      href: m.path,
      hasDropdown: m.path === '/dich-vu'
    };
  }) : rawNavLinks;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || routerLocation.pathname !== '/' ? 'bg-white shadow-md' : 'bg-white'
      } ${
        !showSticky ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
      }`}
    >
      {/* Top Black Announcement Bar */}
      <div className={`bg-slate-950 text-slate-100 text-xs font-semibold relative z-50 border-b border-white/5 shadow-inner transition-all duration-300 ease-in-out overflow-hidden ${
        scrolled 
          ? 'max-h-0 py-0 opacity-0 border-b-transparent pointer-events-none' 
          : 'max-h-20 py-2.5 opacity-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-200 tracking-tight text-[11px] sm:text-[12px] whitespace-nowrap overflow-hidden text-ellipsis max-w-[250px] sm:max-w-none">
              Địa chỉ: {locationSlug && (locationSlug === 'ho-chi-minh' || locationSlug === 'bao-loc') ? locationData[locationSlug as 'ho-chi-minh' | 'bao-loc'].address : (locationSlug === 'ho-chi-minh' ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng")}
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-300 text-[11px] sm:text-[12px]">
            <a href={`tel:${mainHotline.replace(/[.\s]/g, '')}`} className="hover:text-brand-primary transition-colors flex items-center gap-1.5 py-0.5">
              <PhoneCall size={12} className="text-brand-primary" />
              <span className="font-extrabold text-white">Hotline 24/7: {mainHotline}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link to={siteLocationPrefix} className="flex items-center gap-2 sm:gap-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-md shadow-brand-primary/10 shrink-0 overflow-hidden border border-slate-100 group-hover:scale-105 transition-transform">
              <img src={logoUrl} alt="Hoàng Tuấn Logo" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base md:text-xl text-brand-secondary uppercase leading-none whitespace-nowrap tracking-tight group-hover:text-brand-primary transition-colors">
                HOÀNG TUẤN
              </span>
              <span className="font-bold text-sm sm:text-base md:text-xl text-brand-secondary uppercase leading-none whitespace-nowrap mt-0.5 tracking-tight">
                MPE
              </span>
              <span className="text-brand-primary text-[8px] sm:text-[10px] font-bold tracking-[0.15em] sm:tracking-[0.2em] uppercase mt-0.5 sm:mt-1 whitespace-nowrap">
                TẬN NƠI 24/7
              </span>
            </div>
          </Link>

          {/* Navigation - Centered */}
          <nav className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const active = getIsActive(link.href, link.name);
                const targetPath = link.href === '/' ? siteLocationPrefix : `${siteLocationPrefix}${link.href}`;
                return (
                  <div key={link.name} className={link.hasDropdown ? 'group' : ''}>
                    <Link 
                      to={targetPath}
                      onClick={(e) => handleMenuClick(e, link.href)}
                      className={`relative py-8 text-base font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-1 ${
                        active 
                          ? 'text-brand-primary font-extrabold scale-102' 
                          : 'text-brand-secondary hover:text-brand-primary hover:scale-102 font-bold'
                      }`}
                    >
                      {link.name}
                      {link.hasDropdown && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${
                        active ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-100'
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
                                      <span className="text-[10px] text-slate-500 capitalize">tại {mappedDisplayName}</span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center">
                          <Link 
                            to={`${siteLocationPrefix}/dich-vu`}
                            className="flex items-center gap-2 bg-brand-primary text-white px-8 py-3 rounded-full font-bold text-sm uppercase hover:scale-105 active:scale-95 transition-all shadow-lg shadow-brand-primary/20 tracking-widest"
                          >
                            Xem tất cả dịch vụ
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Location Selector Button - Right */}
          <div className="hidden lg:block shrink-0">
            <button 
              onClick={changeLocation}
              className="flex items-center gap-3 bg-brand-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer tracking-tight"
            >
              <MapPin size={22} />
              <span>{mappedDisplayName}</span>
              <ChevronDown size={18} className="opacity-70" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-brand-secondary p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t lg:hidden h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => {
                const active = getIsActive(link.href, link.name);
                const targetLinkHref = link.href === '/' ? siteLocationPrefix : `${siteLocationPrefix}${link.href}`;
                return (
                  <div key={link.name}>
                    <Link 
                      to={targetLinkHref}
                      onClick={(e) => {
                        handleMenuClick(e, link.href);
                        if (!link.hasDropdown) setIsOpen(false);
                      }}
                      className={`text-lg font-bold py-3 px-4 flex justify-between items-center transition-all duration-300 rounded-xl ${
                        active 
                          ? 'text-brand-primary bg-brand-primary/5 border-l-4 border-brand-primary shadow-sm' 
                          : 'text-brand-secondary hover:text-brand-primary hover:bg-slate-50'
                      }`}
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="pl-4 grid grid-cols-2 gap-4 mt-2 overflow-hidden"
                      >
                        {SERVICE_MENU.map((item) => (
                          <div key={item.title}>
                            <span className="text-[10px] font-bold text-slate-500 block mb-1 tracking-widest uppercase">{item.title}</span>
                            <ul className="space-y-1">
                              {item.links.map((sublink) => (
                                <li key={sublink.name}>
                                  <Link 
                                    to={sublink.href}
                                    className="text-sm font-bold text-slate-600 hover:text-brand-primary block py-1"
                                    onClick={() => setIsOpen(false)}
                                  >
                                    {sublink.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
              <a 
                href={`tel:${mainHotline.replace(/[.\s]/g, '')}`} 
                className="flex items-center justify-center gap-2 bg-brand-primary text-white py-4 rounded-xl font-bold mt-2"
              >
                <PhoneCall size={20} />
                <span>Gọi Cứu Hộ: {mainHotline}</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
