import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import ProcessTimeline, { FAQSection } from '../components/ExtraSections';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FinalCTA from '../components/FinalCTA';
import { FormBuilderSection } from '../components/builder/FormBuilderSection';
import { ReusableBlockSection } from '../components/builder/ReusableBlockSection';

export const sectionRegistry: Record<string, React.ComponentType<any>> = {
  heroSection: Hero,
  servicesSection: Services,
  whyChooseUsSection: WhyChooseUs,
  featuresSection: WhyChooseUs,
  processTimelineSection: ProcessTimeline,
  faqSection: FAQSection,
  featuredProductsSection: FeaturedProducts,
  productsSection: FeaturedProducts,
  testimonialsSection: Testimonials,
  reviewsSection: Testimonials,
  blogSection: Blog,
  finalCtaSection: FinalCTA,
  ctaSection: FinalCTA,
  customFormBuilderSection: FormBuilderSection,
  customReusableBlockSection: ReusableBlockSection,
};
