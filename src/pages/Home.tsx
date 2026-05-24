import React from 'react';
import PageSEO from '../components/PageSEO';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FinalCTA from '../components/FinalCTA';
import ProcessTimeline, { FAQSection } from '../components/ExtraSections';
import { useLocation } from '../context/LocationContext';

export default function Home() {
  const { locationSlug } = useLocation();
  const titleText = locationSlug === 'ho-chi-minh'
    ? 'Hoàng Tuấn MPE - Dịch Vụ Sửa Điện Nước Camera Uy Tín Tại Hồ Chí Minh'
    : 'Hoàng Tuấn MPE - Dịch Vụ Sửa Điện Nước Camera Uy Tín Tại Bảo Lộc, Lâm Đồng';

  return (
    <div className="min-h-[80vh] flex flex-col justify-between">
      {/* Hidden SEO h1 to guarantee perfect crawler indexing */}
      <h1 className="sr-only font-bold text-slate-900 border-none outline-none">{titleText}</h1>
      <PageSEO pageType="home" />
      <div className="flex-1">
        <Hero />
        <Services />
        <WhyChooseUs />
        <ProcessTimeline />
        <FeaturedProducts />
        <Testimonials />
        <Blog />
        <FAQSection />
      </div>
      <FinalCTA />
    </div>
  );
}
