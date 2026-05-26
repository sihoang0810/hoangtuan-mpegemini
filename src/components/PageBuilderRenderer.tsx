import React, { useState, useEffect, useRef } from 'react';
import Hero from './Hero';
import Services from './Services';
import WhyChooseUs from './WhyChooseUs';
import ProcessTimeline, { FAQSection } from './ExtraSections';
import FeaturedProducts from './FeaturedProducts';
import Testimonials from './Testimonials';
import Blog from './Blog';
import FinalCTA from './FinalCTA';

export interface CMSSection {
  _type: string;
  _key: string;
  isActive?: boolean;
  [key: string]: any;
}

interface PageBuilderRendererProps {
  sections?: CMSSection[];
  locationSlug: string;
}

// ✅ High-Performance IntersectionObserver-based Lazy Load Wrapper
// Defers rendering of content below-the-fold to guarantee fast TTI, FCP, LCP, and CLS.
export function LazySection({ children, id, className }: { children: React.ReactNode; id?: string; className?: string }) {
  const [isIntersected, setIsIntersected] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            observer.unobserve(el);
          }
        },
        { rootMargin: '300px 0px' } // Preload when candidate enters slightly before viewport
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setIsIntersected(true);
    }
  }, []);

  return (
    <div ref={containerRef} id={id} className={`${className || ''} min-h-[150px]`}>
      {isIntersected ? children : (
        <div className="section-container bg-slate-50/20 py-24 flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-xl text-center">
            <div className="h-4 bg-slate-200/60 rounded-full w-2/3 mx-auto"></div>
            <div className="h-8 bg-slate-200/80 rounded w-1/2 mx-auto"></div>
            <div className="h-32 bg-slate-200/40 rounded-3xl mt-6"></div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * PageBuilderRenderer dynamically renders page sections in the exact order
 * defined in Sanity, behaving like an Elementor/Gutenberg canvas.
 */
export default function PageBuilderRenderer({ sections, locationSlug }: PageBuilderRendererProps) {
  // Define default sequence of sections to render if Sanity has not configured sections
  const defaultSections: CMSSection[] = [
    { _type: 'heroSection', _key: 'default-hero', isActive: true },
    { _type: 'servicesSection', _key: 'default-services', isActive: true },
    { _type: 'whyChooseUsSection', _key: 'default-whychooseus', isActive: true },
    { _type: 'processTimelineSection', _key: 'default-processtimeline', isActive: true },
    { _type: 'featuredProductsSection', _key: 'default-featuredproducts', isActive: true },
    { _type: 'testimonialsSection', _key: 'default-testimonials', isActive: true },
    { _type: 'blogSection', _key: 'default-blog', isActive: true },
    { _type: 'faqSection', _key: 'default-faq', isActive: true },
  ];

  const activeSections = sections && sections.length > 0 
    ? sections.filter(sec => sec.isActive !== false) 
    : defaultSections;

  return (
    <>
      {activeSections.map((section) => {
        switch (section._type) {
          case 'heroSection':
            return (
              <div id="section-hero" key={section._key} className="relative scroll-mt-20">
                <Hero cmsData={section} />
              </div>
            );
          
          case 'servicesSection':
            return (
              <div id="section-services" key={section._key} className="relative scroll-mt-20">
                <Services cmsData={section} />
              </div>
            );
          
          case 'whyChooseUsSection':
          case 'featuresSection':
            return (
              <div id="section-whychoice" key={section._key} className="relative scroll-mt-20">
                <WhyChooseUs cmsData={section} />
              </div>
            );
          
          case 'processTimelineSection':
            return (
              <div id="section-process" key={section._key} className="relative scroll-mt-20">
                <ProcessTimeline {...(section as any)} />
              </div>
            );
          
          case 'featuredProductsSection':
          case 'productsSection':
            return (
              <div id="section-products" key={section._key} className="relative scroll-mt-20">
                <FeaturedProducts {...(section as any)} />
              </div>
            );
          
          case 'testimonialsSection':
          case 'reviewsSection':
            return (
              <LazySection id="section-testimonials" key={section._key} className="relative scroll-mt-20">
                <Testimonials {...(section as any)} />
              </LazySection>
            );
          
          case 'blogSection':
            return (
              <LazySection id="section-blog" key={section._key} className="relative scroll-mt-20">
                <Blog {...(section as any)} />
              </LazySection>
            );
          
          case 'faqSection':
            return (
              <LazySection id="section-faq" key={section._key} className="relative scroll-mt-20">
                <FAQSection {...(section as any)} />
              </LazySection>
            );
          
          case 'finalCtaSection':
          case 'ctaSection':
            return (
              <div id="section-cta" key={section._key} className="relative scroll-mt-20">
                <FinalCTA {...(section as any)} />
              </div>
            );

          default:
            console.warn(`[PageBuilderRenderer] Unknown section type received from Sanity: "${section._type}"`);
            return null;
        }
      })}
    </>
  );
}
