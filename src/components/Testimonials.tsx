import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { getTestimonials, CMSTestimonial } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import { motion } from 'motion/react';

export default function Testimonials() {
  const { locationId } = useLocation();
  const [testimonials, setTestimonials] = useState<CMSTestimonial[]>([]);

  useEffect(() => {
    let active = true;
    getTestimonials(locationId).then((data) => {
      if (active) setTestimonials(data);
    });
    return () => {
      active = false;
    };
  }, [locationId]);

  return (
    <section className="section-container bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-brand-primary font-bold tracking-widest uppercase mb-4">Ý Kiến Khách Hàng</h2>
        <h3 className="text-3xl md:text-4xl font-bold text-brand-secondary">
          Khách Hàng Nói Gì Về Chúng Tôi
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min((index % 3) * 0.05, 0.15), duration: 0.3 }}
            className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl relative"
          >
            {/* Quote Icon Background */}
            <div className="absolute top-6 right-8 text-slate-100">
              <svg width="45" height="36" viewBox="0 0 45 36" fill="currentColor">
                <path d="M12.6 36L18.9 23.4V0H0V23.4H9L12.6 36ZM38.7 36L45 23.4V0H26.1V23.4H35.1L38.7 36Z" />
              </svg>
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#F97316" className="text-brand-accent" />
              ))}
            </div>

            <p className="text-slate-600 mb-8 leading-relaxed font-medium">
              "{testimonial.review}"
            </p>

            <div className="flex items-center gap-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full bg-brand-primary/10"
              />
              <div>
                <h4 className="font-bold text-brand-secondary">{testimonial.name}</h4>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
