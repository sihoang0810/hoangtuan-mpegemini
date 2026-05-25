import React, { useState, useEffect } from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { getProducts, getProductsSync, CMSProduct } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { locationSlug } = useLocation();
  const [products, setProducts] = useState<CMSProduct[]>(() => getProductsSync(locationSlug));

  useEffect(() => {
    let active = true;
    setProducts(getProductsSync(locationSlug));
    getProducts(locationSlug).then((data) => {
      if (active) setProducts(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const featuredProducts = products.slice(0, 3);


  return (
    <section id="products" className="section-container bg-slate-50">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-brand-primary font-bold tracking-widest uppercase mb-4">Cửa Hàng Thiết Bị</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-brand-secondary uppercase tracking-tighter">
            Sản Phẩm <span className="text-brand-primary">Nổi Bật</span>
          </h3>
        </div>
        <Link 
          to={`/${locationSlug}/san-pham`} 
          className="group flex items-center gap-2 text-brand-secondary font-bold uppercase text-sm tracking-widest hover:text-brand-primary transition-colors"
        >
          Xem tất cả sản phẩm
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-16 bg-white p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary">
            <ShoppingBag size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">Trang thiết bị hiện đại</h4>
            <p className="text-slate-500 font-medium">Chúng tôi cung cấp vật tư chính hãng với giá tốt nhất thị trường.</p>
          </div>
        </div>
        <Link 
          to={`/${locationSlug}/san-pham`}
          className="bg-brand-primary text-white px-10 py-4 rounded-2xl font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20"
        >
          Ghé thăm cửa hàng
        </Link>
      </div>
    </section>
  );
}
