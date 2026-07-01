import React from 'react';
import { ArrowRight, Tag, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../data/products';
import { useLocation } from '../context/LocationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;
  const navigate = useNavigate();

  const handleCardClick = () => {
    const targetUrl = `${siteLocationPrefix}/san-pham/${product.slug}`;
    console.log('Navigation target:', targetUrl);
    navigate(targetUrl);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      onClick={handleCardClick}
      className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
          width={400}
          height={300}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <Tag size={10} />
            {product.category === 'electrical' ? 'Điện' : product.category === 'plumbing' ? 'Nước' : product.category === 'camera' ? 'Camera' : product.category === 'solar' ? 'Đèn NLMT' : product.category === 'construction' ? 'Thi công' : 'Dò tìm'}
          </span>
        </div>
        {(product as any).isPinned && (
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
              <Star size={10} fill="currentColor" />
              Nổi bật
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-secondary mb-2 group-hover:text-brand-primary transition-colors line-clamp-2" id={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-grow" dangerouslySetInnerHTML={{ __html: product.description || '' }} />
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-bold tracking-widest mb-0.5">Giá tham khảo</span>
            <span className="text-brand-primary font-bold">{product.price}</span>
          </div>
          <Link 
            to={`${siteLocationPrefix}/san-pham/${product.slug}`}
            onClick={() => console.log('Navigation target:', `${siteLocationPrefix}/san-pham/${product.slug}`)}
            className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm shrink-0"
            id={`view-details-${product.id}`}
          >
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
