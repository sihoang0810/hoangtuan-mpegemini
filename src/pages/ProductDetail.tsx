import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  Home, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Settings,
  ArrowLeft,
  ShoppingBag,
  Tag,
  Wrench,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { getProductBySlug, getProductBySlugSync, getProducts, getProductsSync, CMSProduct } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string; locationSlug: string }>();
  const navigate = useNavigate();
  const { locationSlug } = useLocation();
  const siteLocationPrefix = '/' + locationSlug;

  const [product, setProduct] = useState<CMSProduct | null>(() => getProductBySlugSync(slug, locationSlug));
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [related, setRelated] = useState<CMSProduct[]>(() => {
    const prd = getProductBySlugSync(slug, locationSlug);
    if (!prd) return [];
    const list = getProductsSync(locationSlug);
    return list.filter(p => p.category === prd.category && p.slug !== slug).slice(0, 3);
  });
  const [loading, setLoading] = useState(() => !getProductBySlugSync(slug, locationSlug));

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(null);
    if (!slug) return;

    let active = true;

    getProductBySlug(slug, locationSlug).then(data => {
      if (!active) return;
      setProduct(data);
      setLoading(false);
      
      // Load related products
      if (data) {
        getProducts(locationSlug).then(allProducts => {
          if (!active) return;
          const cat = data.category || 'electrical';
          const rel = allProducts.filter(p => p.category === cat && p.slug !== slug).slice(0, 3);
          setRelated(rel);
        });
      }
    });

    return () => {
      active = false;
    };
  }, [slug, locationSlug]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 text-center min-h-[80vh] flex flex-col justify-center items-center">
        <PageSEO pageType="general" />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">Đang tải chi tiết sản phẩm...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[80vh] flex flex-col justify-center items-center">
        <PageSEO pageType="general" />
        <AlertCircle size={64} className="mx-auto text-brand-primary mb-6 animate-pulse" />
        <h1 className="text-3xl font-bold text-brand-secondary mb-4 uppercase">Sản phẩm không tồn tại</h1>
        <p className="text-slate-500 mb-8">Sản phẩm bạn đang tìm kiếm có thể đã tạm hết hàng hoặc thay đổi địa chỉ.</p>
        <Link to={`${siteLocationPrefix}/san-pham`} className="inline-block bg-brand-primary text-white px-8 py-3 rounded-xl font-bold">
          Quay lại Cửa hàng
        </Link>
      </div>
    );
  }

  const relatedProducts = related.length > 0 ? related : PRODUCTS
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 3);

  const displayImage = selectedImage || product.image;
  const galleryImages = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <div className="pt-24 md:pt-32">
      <PageSEO pageType="product" data={product} />
      
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <Link to={siteLocationPrefix} className="text-slate-500 hover:text-brand-primary transition-colors flex items-center gap-1">
            <Home size={14} />
            Trang chủ
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <Link to={`${siteLocationPrefix}/san-pham`} className="text-slate-500 hover:text-brand-primary transition-colors">
            Sản phẩm
          </Link>
          <ChevronRight size={12} className="text-slate-300" />
          <span className="text-brand-primary truncate">{product.name}</span>
        </div>
      </div>
 
      <section className="section-container">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-brand-primary transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-2 transition-transform" />
          QUAY LẠI
        </button>
 
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Gallery Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="aspect-square bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-2xl relative overflow-hidden group">
              <img 
                src={displayImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-brand-primary text-white px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2">
                  <ShoppingBag size={14} />
                  Hàng chính hãng
                </span>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedImage(img)}
                  className={`aspect-square rounded-2xl border-2 overflow-hidden cursor-pointer transition-all ${displayImage === img ? 'border-brand-primary shadow-lg shadow-brand-primary/10' : 'border-transparent hover:border-slate-200'}`}
                >
                  <img src={img} alt={`Hình thu nhỏ ${product.name || 'sản phẩm'} ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="flex items-center gap-3 text-brand-primary font-bold uppercase text-xs tracking-widest mb-4">
                <Tag size={16} />
                {product.category === 'electrical' ? 'Điện dân dụng' : product.category === 'plumbing' ? 'Nước dân dụng' : product.category === 'camera' ? 'Camera an ninh' : 'Thiết bị dò tìm'}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-brand-secondary mb-6 uppercase tracking-tighter leading-tight">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 py-6 border-y border-slate-100 mb-8">
                <div>
                  <span className="text-xs text-slate-500 block font-bold uppercase tracking-widest mb-1">Giá bán</span>
                  <span className="text-3xl md:text-4xl font-bold text-brand-primary">{product.price}</span>
                </div>
                <div className="ml-auto flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl text-brand-secondary font-bold text-sm">
                  <ShieldCheck size={18} className="text-brand-primary" />
                  Bảo hành 12/24 tháng
                </div>
              </div>
              <div 
                className="text-xl text-slate-600 leading-relaxed font-medium prose prose-slate max-w-none prose-p:text-slate-600"
                dangerouslySetInnerHTML={{ __html: product.description || '' }}
              />
            </motion.div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/30 hover:scale-105 transition-all uppercase">
                <Phone size={24} />
                Đặt Mua: 0389 011 315
              </a>
              <a href="https://zalo.me/0389011315" className="flex items-center justify-center gap-3 bg-[#0068ff] text-white px-8 py-5 rounded-2xl font-bold text-lg hover:opacity-90 transition-all uppercase">
                <MessageCircle size={24} />
                Tư vấn Zalo
              </a>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <Truck className="text-brand-primary" size={24} />
                <span>Giao hàng tận nơi</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                <Settings className="text-brand-primary" size={24} />
                <span>Cài đặt/Lắp đặt miễn phí</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs / Content */}
      <section className="py-24 bg-slate-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-12">
              {/* Features Section */}
              {product.features && product.features.length > 0 && (
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                  <h2 className="text-2xl font-bold text-brand-secondary mb-8 uppercase flex items-center gap-3">
                    <CheckCircle2 className="text-brand-primary" />
                    Đặc điểm nổi bật
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="w-6 h-6 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary shrink-0 mt-0.5">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-slate-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Specifications */}
              {product.specs && Object.keys(product.specs).length > 0 && (
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50">
                  <h2 className="text-2xl font-bold text-brand-secondary mb-8 uppercase flex items-center gap-3">
                    <Settings className="text-brand-primary" />
                    Thông số kỹ thuật
                  </h2>
                  <div className="space-y-4">
                    {Object.entries(product.specs).map(([key, value], idx) => (
                      <div key={idx} className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50 px-4 rounded-lg transition-colors">
                        <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">{key}</span>
                        <span className="text-brand-secondary font-bold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Installation Support */}
              <div className="bg-brand-primary/10 p-10 rounded-[2.5rem] border border-brand-primary/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-brand-primary">
                    <Wrench size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">Hỗ Trợ Lắp Đặt Tận Nhà</h3>
                    <p className="text-slate-500 font-medium">Chúng tôi không chỉ bán sản phẩm, chúng tôi mang đến giải pháp hoàn thiện.</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Khi mua thiết bị tại Hoàng Tuấn MPE, khách hàng tại khu vực {locationSlug || 'Bảo Lộc'} và lân cận sẽ được đội ngũ kỹ thuật viên tay nghề cao của chúng tôi hỗ trợ lắp đặt đúng tiêu chuẩn kỹ thuật, đảm bảo an toàn tuyệt đối và hiệu quả sử dụng cao nhất.
                </p>
                <div className="flex gap-4">
                  <a href="tel:0389011315" className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-all">Đặt thợ lắp ngay</a>
                </div>
              </div>
            </div>

            {/* Sidebar Contact */}
            <div className="space-y-8">
              <div className="bg-brand-secondary p-10 rounded-[2.5rem] text-white">
                <h3 className="text-xl font-bold mb-6 uppercase tracking-tighter italic">Cần báo giá sỉ?</h3>
                <p className="text-white/60 text-sm mb-10 leading-relaxed">Nếu bạn là đại lý hoặc cần mua số lượng lớn cho công trình, hãy liên hệ để có giá tốt nhất thị trường.</p>
                <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white w-full py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-all shadow-xl shadow-brand-primary/20">
                  <Phone size={20} />
                  0389 011 315
                </a>
              </div>
              
              <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-lg font-bold text-brand-secondary mb-8 uppercase tracking-widest border-b border-slate-100 pb-4">Sản phẩm tương tự</h3>
                <div className="space-y-8">
                  {relatedProducts.map(rp => (
                    <Link key={rp.id} to={`${siteLocationPrefix}/san-pham/${rp.slug}`} className="flex gap-4 group">
                      <div className="w-20 h-20 bg-slate-100 rounded-xl overflow-hidden shrink-0">
                        <img src={rp.image} alt={rp.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-bold text-brand-secondary group-hover:text-brand-primary transition-colors line-clamp-1">{rp.name}</h4>
                        <span className="text-brand-primary font-bold text-xs mt-1">{rp.price}</span>
                      </div>
                    </Link>
                  ))}
                  {relatedProducts.length === 0 && (
                    <p className="text-xs text-slate-500 text-center font-medium">Chưa có sản phẩm tương tự.</p>
                  )}
                </div>
                <Link to={`${siteLocationPrefix}/san-pham`} className="block text-center text-brand-primary font-bold uppercase text-[10px] tracking-widest mt-10 hover:underline">
                  Xem tất cả cửa hàng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products at bottom */}
      {relatedProducts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="section-container">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-secondary mb-12 uppercase tracking-tighter">
              Có thể bạn <span className="text-brand-primary">quan tâm</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
