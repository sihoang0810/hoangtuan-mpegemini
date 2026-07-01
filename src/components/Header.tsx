import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, PhoneCall, MapPin, ChevronDown, Zap, Droplet, Video, Search, ArrowRight, Cpu, Sun, Hammer } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation as useAppLocation } from '../context/LocationContext';
import { locationData } from '../data/locationData';
import { getSiteSettings, getMenus, CMSSiteSettings, CMSMenu } from '../lib/sanity';
import logoUrl from '../assets/images/hoang_tuan_logo_1779774192464.png';
import '../styles/header.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [showSticky, setShowSticky] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
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

    console.log('Navigation target:', targetHref);

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

  const handleDropdownServiceClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const currentPath = routerLocation.pathname;
    const targetPathAndHash = href.split('#');
    const targetPath = targetPathAndHash[0];
    const targetHash = targetPathAndHash[1];

    if (currentPath === targetPath && targetHash) {
      e.preventDefault();
      setIsOpen(false); // Close mobile menu if open

      const element = document.getElementById(targetHash);
      if (element) {
        const headerElement = document.querySelector('header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight - 10;

        window.scrollTo({
          top: offsetPosition >= 0 ? offsetPosition : 0,
          behavior: 'smooth'
        });

        window.history.pushState(null, '', `#${targetHash}`);
      }
    } else {
      setIsOpen(false);
    }
  };

  const SERVICE_MENU = [
    {
      title: 'Dịch vụ Sửa Điện',
      subtitle: 'Sửa chập điện, sự cố aptomat, lắp đặt thiết bị điện',
      icon: Zap,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      href: `${siteLocationPrefix}/dich-vu#electrical`
    },
    {
      title: 'Dịch vụ Sửa Nước',
      subtitle: 'Xử lý rò rỉ nước, sửa máy bơm, đường ống nước',
      icon: Droplet,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      href: `${siteLocationPrefix}/dich-vu#plumbing`
    },
    {
      title: 'Thi công Điện Nước trọn gói',
      subtitle: 'Thi công cơ điện nước nhà phố, biệt thự, cải tạo nhà cũ',
      icon: Hammer,
      color: 'bg-slate-50 text-slate-600 border-slate-100',
      href: `${siteLocationPrefix}/dich-vu#construction`
    },
    {
      title: 'Đèn Năng lượng mặt trời',
      subtitle: 'Lắp đặt đèn pha, đèn đường LED thông minh tự sạc',
      icon: Sun,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-100',
      href: `${siteLocationPrefix}/dich-vu#solar`
    },
    {
      title: 'Dịch vụ Siêu âm Dò tìm',
      subtitle: 'Siêu âm phát hiện rò rỉ nước, dò tìm đường ống âm',
      icon: Search,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
      href: `${siteLocationPrefix}/dich-vu#detection`
    },
    {
      title: 'Dịch vụ Camera',
      subtitle: 'Lắp đặt, sửa chữa camera quan sát gia đình, cửa hàng',
      icon: Video,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      href: `${siteLocationPrefix}/dich-vu#camera`
    },
    {
      title: 'Dịch vụ Điện Thông Minh',
      subtitle: 'Smarthome, công tắc cửa cuốn, cảm biến an ninh',
      icon: Cpu,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      href: `${siteLocationPrefix}/dich-vu#smarthome`
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

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 20);

          if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY.current) {
              setShowSticky(false); // Hide on scroll deviation downwards
            } else {
              setShowSticky(true);  // Pop back on scrolling upwards
            }
          } else {
            setShowSticky(true);
          }
          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
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
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const siteName = siteSettings?.siteName || 'Hoàng Tuấn MPE';
  const mainHotline = siteSettings?.mainHotline || '0389 011 315';
  const headerNotice = siteSettings?.headerNotice || 'Hỗ trợ khẩn cấp 24/7: Thợ trực chiến có mặt sau 30 phút!';

  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';

  const rawNavLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Dịch vụ', href: '/dich-vu', hasDropdown: true },
    { name: 'Bảng giá', href: '/bang-gia' },
    { name: 'Dự án', href: '/du-an' },
    { name: 'Blog', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  const rawMappedLinks = menus.length > 0 ? menus.map(m => {
    let name = m.title;
    if (m.path === '/san-pham' || m.title === 'Linh kiện MPE' || m.title.toLowerCase().includes('linh kiện')) {
      name = 'Sản phẩm';
    }
    if (m.title === 'Tin tức & mẹo') {
      name = 'Blog';
    }
    return {
      name: name,
      href: m.path,
      hasDropdown: m.path === '/dich-vu'
    };
  }) : [...rawNavLinks];

  // Tránh việc menu CMS của Sanity đè mất mục "Dự án", tự động chèn "Dự án" ngay sau "Bảng giá"
  const duAnExists = rawMappedLinks.some(l => l.href === '/du-an' || l.name === 'Dự án');
  if (!duAnExists) {
    const bangGiaIndex = rawMappedLinks.findIndex(l => l.href === '/bang-gia' || l.name === 'Bảng giá' || l.name === 'Báo giá' || l.name === 'Bảng Giá');
    if (bangGiaIndex !== -1) {
      rawMappedLinks.splice(bangGiaIndex + 1, 0, { name: 'Dự án', href: '/du-an', hasDropdown: false });
    } else {
      rawMappedLinks.splice(3, 0, { name: 'Dự án', href: '/du-an', hasDropdown: false });
    }
  }

  const navLinks = rawMappedLinks.map(l => {
    if (l.name === 'Tin tức & mẹo') {
      return { ...l, name: 'Blog' };
    }
    return l;
  });

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        scrolled || routerLocation.pathname !== '/' ? 'bg-white shadow-md' : 'bg-white'
      } ${
        !showSticky && !isOpen ? '-translate-y-full md:translate-y-0' : 'translate-y-0'
      }`}
    >
      {/* Top Black Announcement Bar */}
      <div className={`hidden md:block bg-slate-950 text-slate-100 text-xs font-semibold relative z-50 border-b border-white/5 shadow-inner transition-all duration-300 ease-in-out overflow-hidden ${
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
            <button 
              onClick={changeLocation}
              className="hover:text-brand-primary transition-colors flex items-center gap-1.5 py-0.5 cursor-pointer text-white font-extrabold"
            >
              <MapPin size={12} className="text-brand-primary" />
              <span>Khu vực: {mappedDisplayName}</span>
              <ChevronDown size={10} className="opacity-70" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link 
            to={siteLocationPrefix} 
            onClick={() => console.log('Navigation target:', siteLocationPrefix)}
            className="flex items-center gap-2 sm:gap-3 shrink-0 group"
          >
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
            <div className="flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => {
                const active = getIsActive(link.href, link.name);
                const targetPath = link.href === '/' ? siteLocationPrefix : `${siteLocationPrefix}${link.href}`;
                return (
                  <div key={link.name} className={link.hasDropdown ? 'group' : ''}>
                    <Link 
                      to={targetPath}
                      onClick={(e) => handleMenuClick(e, link.href)}
                      className={`relative py-8 text-sm font-bold tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-1 ${
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
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[640px] bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-100/60 rounded-3xl p-6 mega-menu-container">
                        <div className="grid grid-cols-2 gap-4">
                          {SERVICE_MENU.map((item) => (
                            <Link
                              key={item.title}
                              to={item.href}
                              onClick={(e) => handleDropdownServiceClick(e, item.href)}
                              className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                            >
                              <div className={`p-3 rounded-xl border shrink-0 ${item.color} group-hover:scale-105 transition-transform`}>
                                <item.icon size={22} />
                              </div>
                              <div className="flex flex-col">
                                <span className="font-extrabold text-sm text-slate-900 group-hover:text-brand-primary transition-colors">
                                  {item.title}
                                </span>
                                <span className="text-xs text-slate-500 mt-1 leading-snug">
                                  {item.subtitle}
                                </span>
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-5 pt-4 border-t border-slate-100/60 flex justify-between items-center text-xs">
                          <span className="text-slate-400 font-medium">Hỗ trợ 24/7 nhanh chóng tại {mappedDisplayName}</span>
                          <Link 
                            to={`${siteLocationPrefix}/dich-vu`}
                            onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/dich-vu`)}
                            className="flex items-center gap-1.5 text-brand-primary font-bold hover:underline"
                          >
                            <span>Tất cả dịch vụ</span>
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          {/* Hotline Call Button - Right */}
          <div className="hidden lg:block shrink-0">
            <a 
              href={`tel:${mainHotline.replace(/[.\s]/g, '')}`}
              className="flex items-center gap-3 bg-brand-primary text-white px-6 py-3 rounded-full font-bold text-lg shadow-xl shadow-brand-primary/30 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer tracking-tight"
            >
              <PhoneCall size={22} className="animate-pulse" />
              <span>Hotline: {mainHotline}</span>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden text-brand-secondary p-3 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
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
            className="absolute top-full left-0 right-0 bg-white shadow-2xl border-t lg:hidden h-[calc(100dvh-80px)] overflow-y-auto pb-safe"
          >
            <div className="flex flex-col p-4 gap-4">
              {navLinks.map((link) => {
                const active = getIsActive(link.href, link.name);
                const targetLinkHref = link.href === '/' ? siteLocationPrefix : `${siteLocationPrefix}${link.href}`;
                return (
                  <div key={link.name}>
                    {link.hasDropdown ? (
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setMobileExpanded(mobileExpanded === link.name ? null : link.name);
                        }}
                        className={`w-full text-lg font-bold py-3 px-4 flex justify-between items-center transition-all duration-300 rounded-xl bg-white shadow-sm shadow-brand-primary/10 ${
                          active 
                            ? 'text-brand-primary bg-brand-primary/5 border-l-4 border-l-brand-primary' 
                            : 'text-brand-secondary hover:text-brand-primary hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                        <ChevronDown 
                          size={20} 
                          className={`transition-transform duration-300 ${mobileExpanded === link.name ? 'rotate-180' : ''}`} 
                        />
                      </button>
                    ) : (
                      <Link 
                        to={targetLinkHref}
                        onClick={(e) => {
                          handleMenuClick(e, link.href);
                          setIsOpen(false);
                        }}
                        className={`text-lg font-bold py-3 px-4 flex justify-between items-center transition-all duration-300 rounded-xl bg-white shadow-sm shadow-brand-primary/10 ${
                          active 
                            ? 'text-brand-primary bg-brand-primary/5 border-l-4 border-l-brand-primary' 
                            : 'text-brand-secondary hover:text-brand-primary hover:bg-slate-50'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                    
                    {link.hasDropdown && (
                      <AnimatePresence>
                        {mobileExpanded === link.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                            className="pl-4 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 overflow-hidden"
                          >
                            <div className="sm:col-span-2">
                              <Link 
                                to={`${siteLocationPrefix}/dich-vu`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center gap-2 bg-brand-primary/10 text-brand-primary py-2.5 rounded-lg font-bold text-sm hover:bg-brand-primary/20 transition-colors"
                              >
                                Xem tất cả dịch vụ
                                <ArrowRight size={16} />
                              </Link>
                            </div>
                            {SERVICE_MENU.map((item) => {
                              return (
                                <div key={item.title}>
                                  <Link 
                                    to={item.href}
                                    className="flex items-center gap-3 py-2.5 px-3 bg-white hover:bg-slate-50 active:bg-slate-100 rounded-xl transition-colors shadow-sm shadow-brand-primary/10 border border-slate-100"
                                    onClick={(e) => handleDropdownServiceClick(e, item.href)}
                                  >
                                    <div className={`p-2 rounded-lg shrink-0 ${item.color}`}>
                                      <item.icon size={18} />
                                    </div>
                                    <span className="font-extrabold text-slate-700 text-sm">{item.title}</span>
                                  </Link>
                                </div>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
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
