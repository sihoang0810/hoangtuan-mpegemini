import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyChooseUs from '../components/WhyChooseUs';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Blog from '../components/Blog';
import FinalCTA from '../components/FinalCTA';
import ProcessTimeline, { FAQSection } from '../components/ExtraSections';

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChooseUs />
      <ProcessTimeline />
      <FeaturedProducts />
      <Testimonials />
      <Blog />
      <FAQSection />
      <FinalCTA />
    </>
  );
}
