import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Filter, Search, Phone, MessageCircle } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS, PRODUCT_CATEGORIES } from '../data/products';
import ProductCard from '../components/ProductCard';
import { getProducts, getProductsSync, CMSProduct } from '../lib/sanity';
import { useLocation } from '../context/LocationContext';
import PageSEO from '../components/PageSEO';

export default function ProductListing() {
  
  const { locationSlug } = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dbProducts, setDbProducts] = useState<CMSProduct[]>(() => getProductsSync(locationSlug));
  const [visibleAllCount, setVisibleAllCount] = useState(4);
  const [visibleCategoryCount, setVisibleCategoryCount] = useState(12);

  const titleText = locationSlug === 'ho-chi-minh'
    ? 'Hồ Chí Minh - Cửa Hàng Thiết Bị Điện Nước Camera MPE Chính Hãng Hoàng Tuấn'
    : 'Bảo Lộc - Cửa Hàng Thiết Bị Điện Nước Camera MPE Chính Hãng Hoàng Tuấn';

  useEffect(() => {
    let active = true;
    getProducts(locationSlug).then(data => {
      if (active) setDbProducts(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  useEffect(() => {
    setVisibleAllCount(4);
    setVisibleCategoryCount(12);
    
    // Smooth scroll to the product list section when category or search changes (not on first load)
    if (window.scrollY > 100) {
      const element = document.getElementById('product-list-section');
      if (element) {
        const offset = 80; // height of sticky header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory, searchQuery]);

  const productSource = dbProducts.length > 0 ? dbProducts : PRODUCTS;

  const filteredProducts = productSource.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCategoryCount);

  const hasMoreInAll = activeCategory === 'all' && PRODUCT_CATEGORIES.some(cat => {
    const categoryProducts = filteredProducts.filter(p => p.category === cat.id);
    return categoryProducts.length > visibleAllCount;
  });


  return (
    <div className="pt-24 md:pt-32 min-h-[80vh]">
      <h1 className="sr-only font-bold text-slate-900 border-none outline-none">{titleText}</h1>
      <PageSEO pageType="general" />
      {/* Hero Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-full bg-brand-primary/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/20 text-brand-primary rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-brand-primary/30"
            >
              <ShoppingBag size={14} />
              Cửa hàng thiết bị chính hãng
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-bold text-white mb-8 uppercase tracking-tighter leading-tight"
            >
              Sản Phẩm <span className="text-brand-primary text-outline">Chất Lượng</span> <br />
              Dịch Vụ Tận Tâm
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-400 font-medium leading-relaxed mb-10"
            >
              Cung cấp đầy đủ các thiết bị điện, nước, camera và máy dò rò rỉ rước hiện đại nhất. 
              Cam kết chính hãng, bảo hành dài hạn.
            </motion.p>

            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-primary transition-all pr-12"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Listing */}
      <section id="product-list-section" className="section-container bg-slate-50">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-8">
              <div>
                <div className="flex items-center gap-2 text-brand-secondary font-bold uppercase tracking-widest text-sm mb-6">
                  <Filter size={18} />
                  Danh mục sản phẩm
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                      activeCategory === 'all' 
                      ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' 
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    Tất cả sản phẩm
                    <ChevronRight size={16} />
                  </button>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold transition-all ${
                        activeCategory === cat.id 
                        ? 'bg-brand-primary text-white shadow-xl shadow-brand-primary/20' 
                        : 'bg-white text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <cat.icon size={18} />
                        {cat.title}
                      </div>
                      <ChevronRight size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Support Card */}
              <div className="bg-brand-secondary p-8 rounded-[2.5rem] text-white">
                <h4 className="text-xl font-bold mb-4 uppercase tracking-tight">Cần Tư Vấn?</h4>
                <p className="text-white/60 text-sm mb-8 leading-relaxed">Đội ngũ kỹ thuật viên sẵn sàng tư vấn thiết bị phù hợp nhất với nhu cầu của bạn.</p>
                <div className="space-y-4">
                  <a href="tel:0389011315" className="flex items-center justify-center gap-3 bg-brand-primary text-white w-full py-4 rounded-xl font-bold hover:scale-105 transition-all">
                    <Phone size={18} />
                    0389.011.315
                  </a>
                  <a href="https://zalo.me/0389011315" className="flex items-center justify-center gap-3 bg-white text-brand-primary w-full py-4 rounded-xl font-bold hover:scale-105 transition-all">
                    <MessageCircle size={18} />
                    Chat Zalo
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:w-3/4 min-h-[600px] md:min-h-[800px]">
            <AnimatePresence mode="wait">
              {filteredProducts.length > 0 ? (
                <div className="space-y-12">
                  {activeCategory === 'all' ? (
                    <div className="space-y-16">
                      {PRODUCT_CATEGORIES.map((cat) => {
                        const categoryProducts = filteredProducts.filter(p => p.category === cat.id);
                        if (categoryProducts.length === 0) return null;
                        
                        const chunk = categoryProducts.slice(0, visibleAllCount);
                        
                        return (
                          <motion.div 
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                          >
                            <div className="flex items-center gap-3 border-b border-slate-200/60 pb-4">
                              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                                <cat.icon size={20} />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">{cat.title}</h3>
                                <p className="text-xs text-slate-400 mt-0.5">{cat.description}</p>
                              </div>
                              <span className="text-xs font-bold text-brand-primary bg-brand-primary/10 px-3 py-1 rounded-full ml-auto">
                                {categoryProducts.length} sản phẩm
                              </span>
                            </div>
                            
                            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                              {chunk.map((product) => (
                                <ProductCard key={product.id} product={product} />
                              ))}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <motion.div 
                      key={activeCategory + searchQuery}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
                    >
                      {displayedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </motion.div>
                  )}

                  {activeCategory === 'all' && hasMoreInAll && (
                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={() => setVisibleAllCount((prev) => prev + 4)}
                        className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 uppercase tracking-wider text-sm cursor-pointer"
                      >
                        Xem thêm sản phẩm
                      </button>
                    </div>
                  )}

                  {activeCategory !== 'all' && filteredProducts.length > visibleCategoryCount && (
                    <div className="flex justify-center pt-4">
                      <button
                        type="button"
                        onClick={() => setVisibleCategoryCount((prev) => prev + 12)}
                        className="px-8 py-4 bg-brand-primary text-white font-bold rounded-2xl hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 hover:scale-105 active:scale-95 uppercase tracking-wider text-sm cursor-pointer"
                      >
                        Xem thêm sản phẩm
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200"
                >
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-xl font-bold text-brand-secondary mb-2 uppercase">Không tìm thấy sản phẩm</h3>
                  <p className="text-slate-500">Mời bạn tìm kiếm với từ khóa khác hoặc lọc theo danh mục khác.</p>
                  <button 
                    onClick={() => {setActiveCategory('all'); setSearchQuery('');}}
                    className="mt-6 text-brand-primary font-bold uppercase text-sm tracking-widest hover:underline"
                  >
                    Đặt lại bộ lọc
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-primary/5 rounded-[3rem] p-12 md:p-20 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-brand-secondary mb-8 uppercase tracking-tighter">
              Tại Sao Nên Mua Thiết Bị <br />
              Tại <span className="text-brand-primary">Hoàng Tuấn MPE?</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-12 text-left">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-brand-primary font-bold">01</div>
                <h4 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">Chính Hãng 100%</h4>
                <p className="text-slate-500 text-sm">Chúng tôi chỉ cung cấp thiết bị từ các thương hiệu hàng đầu, có đầy đủ giấy tờ CO/CQ.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-brand-primary font-bold">02</div>
                <h4 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">Hỗ Trợ Lắp Đặt</h4>
                <p className="text-slate-500 text-sm">Miễn phí công lắp đặt cơ bản cho một số sản phẩm và hỗ trợ kỹ thuật trọn đời.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-brand-primary font-bold">03</div>
                <h4 className="text-xl font-bold text-brand-secondary uppercase tracking-tight">Bảo Hành Dài Hạn</h4>
                <p className="text-slate-500 text-sm">Cam kết bảo hành chính hãng từ 12-24 tháng, đổi mới ngay nếu có lỗi từ nhà sản xuất.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
