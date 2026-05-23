import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../data/products';
import { useLocation } from '../context/LocationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <Tag size={10} />
            {product.category === 'electrical' ? 'Điện' : product.category === 'plumbing' ? 'Nước' : product.category === 'camera' ? 'Camera' : 'Dò tìm'}
          </span>
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-secondary mb-3 group-hover:text-brand-primary transition-colors line-clamp-2" id={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-widest mb-1">Giá tham khảo</span>
            <span className="text-brand-primary font-bold">{product.price}</span>
          </div>
          <Link 
            to={`${siteLocationPrefix}/san-pham/${product.slug}`}
            className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm"
            id={`view-details-${product.id}`}
          >
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
