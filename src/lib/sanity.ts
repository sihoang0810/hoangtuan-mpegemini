import { createClient } from '@sanity/client';
import * as LucideIcons from 'lucide-react';
import React from 'react';



// Import local fallback data sources
import { 
  LOCATIONS as fallbackLocations, 
  WHY_CHOOSE_US as fallbackWhyChooseUs, 
  TESTIMONIALS as fallbackTestimonials,
} from '../constants';
import { SERVICES as fallbackServices, Service as LocalService } from '../data/services';
import { 
  PRODUCTS as fallbackProducts, 
  PRODUCT_CATEGORIES as fallbackProductCategories 
} from '../data/products';
import { 
  BLOG_POSTS as fallbackBlogPosts, 
  BLOG_CATEGORIES as fallbackBlogCategories 
} from '../data/blog';
import { FAQS as fallbackFaqs } from '../data/faqs';

// Import GROQ queries
import {
  locationsQuery,
  homepageQuery,
  serviceCategoriesQuery,
  servicesQuery,
  serviceBySlugQuery,
  postCategoriesQuery,
  postsQuery,
  postBySlugQuery,
  productCategoriesQuery,
  productsQuery,
  productBySlugQuery,
  pricingQuery,
  faqsQuery,
  testimonialsQuery,
  reviewsQuery,
  galleryQuery,
  menusQuery,
  footerQuery,
  bannersQuery,
  popupsQuery,
  seoQuery,
  localBusinessQuery,
  siteSettingsQuery,
  contactQuery
} from './queries';

// ---------------------------------------------------------
// TypeScript Interfaces Matching Sanity Schemas
// ---------------------------------------------------------

export interface CMSLocation {
  id: string;
  name: string;
  hotline: string;
  description: string;
  image?: string;
}

export interface CMSHomepage {
  heroTitle: string;
  heroSubtitle: string;
  heroOverlayText?: string;
  heroVideoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  stats: {
    value: string;
    label: string;
  }[];
  aboutHeading: string;
  aboutContent: string;
  aboutImage?: string;
  benefitHeading?: string;
  benefits?: string[];
}

export interface CMSServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

export interface CMSService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: 'electrical' | 'plumbing' | 'camera' | 'detection';
  features: string[];
  pricing: {
    item: string;
    price: string;
    unit?: string;
  }[];
  image?: string;
  benefits?: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface CMSPostCategory {
  id: string;
  title: string;
  icon?: string;
}

export interface CMSBlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Điện' | 'Nước' | 'Camera' | 'Dò Tìm';
  date: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  image: string;
  readTime: string;
  tags: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface CMSProductCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CMSProduct {
  id: string;
  slug: string;
  name: string;
  category: 'electrical' | 'plumbing' | 'camera' | 'leak-detection';
  description: string;
  price: string;
  image: string;
  features: string[];
  specs: { [key: string]: string };
}

export interface CMSPricing {
  title: string;
  price: string;
  unit?: string;
  category: string;
  features: string[];
  badge?: string;
  orderNo?: number;
}

export interface CMSFaq {
  question: string;
  answer: string;
  category?: string;
}

export interface CMSTestimonial {
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
}

export interface CMSReview {
  customerName: string;
  comment: string;
  score: number;
  date: string;
  verifiedPurchase: boolean;
}

export interface CMSGallery {
  title: string;
  image: string;
  category?: string;
  caption?: string;
}

export interface CMSMenu {
  title: string;
  path: string;
  icon?: string;
  orderNo?: number;
  subItems?: {
    title: string;
    path: string;
  }[];
}

export interface CMSFooter {
  companyName: string;
  shortAbout: string;
  address: string;
  phone: string;
  email: string;
  workingHours: string;
  socialLinks?: {
    facebook?: string;
    youtube?: string;
    zalo?: string;
  };
  copyrightText: string;
}

export interface CMSBanner {
  title: string;
  text: string;
  linkText?: string;
  linkUrl?: string;
  isActive: boolean;
}

export interface CMSPopup {
  title: string;
  subtitle?: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
  delaySeconds?: number;
  isActive: boolean;
}

export interface CMSSeo {
  pagePath: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  keywords?: string[];
}

export interface CMSLocalBusiness {
  name: string;
  legalName?: string;
  logo?: string;
  telephone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  priceRange?: string;
  openingHoursSpecification?: {
    dayOfWeek?: string;
    opens?: string;
    closes?: string;
  }[];
}

export interface CMSSiteSettings {
  siteName: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  mainHotline: string;
  mainZalo?: string;
  headerNotice?: string;
}

export interface CMSContact {
  pageTitle: string;
  pageSubtitle?: string;
  contactFields: {
    icon: string;
    label: string;
    val: string;
    desc?: string;
  }[];
  mapEmbedUrl?: string;
}

// ---------------------------------------------------------
// Sanity Client Initialization
// ---------------------------------------------------------

const projectId = (import.meta as any).env.VITE_SANITY_PROJECT_ID;
const dataset = (import.meta as any).env.VITE_SANITY_DATASET || 'production';

// We check if projectId is valid or empty/default setting
const isSanityConfigured = projectId && projectId !== 'your_sanity_project_id' && projectId.trim() !== '';

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder-id',
  dataset: dataset,
  useCdn: true,
  apiVersion: '2026-05-21', // Use current ISO date
});

// Helper validation checker
const isValidArray = (arr: any) => Array.isArray(arr) && arr.length > 0;
const isValidObject = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

// Diagnostic logger for connection reports and fallback indicators
function logCmsStatus(docType: string, isFromCms: boolean, count: number, err?: any) {
  if (isFromCms) {
    console.log(`%c[CMS CONNECTED] Loaded "${docType}" successfully from Sanity. Records: ${count}`, 'color: #00dd66; font-weight: bold;');
  } else {
    console.log(`%c[CMS FALLBACK] Using local fallback for "${docType}" (Reason: ${err ? err.message || err : 'Sanity returned no records or is unconfigured'}).`, 'color: #ffaa11; font-weight: bold;');
  }
}

// ---------------------------------------------------------
// Safe Fetch Helpers with Automatic Local Fallbacks
// ---------------------------------------------------------

/**
 * 1. Locations Table
 */
export async function getLocations(): Promise<CMSLocation[]> {
  if (!isSanityConfigured) {
    logCmsStatus('location', false, 0);
    return fallbackLocations;
  }
  try {
    const data = await client.fetch<CMSLocation[]>(locationsQuery);
    const hasData = isValidArray(data);
    logCmsStatus('location', hasData, hasData ? data.length : 0);
    return hasData ? data : fallbackLocations;
  } catch (error) {
    logCmsStatus('location', false, 0, error);
    return fallbackLocations;
  }
}

/**
 * 2. Homepage Content
 */
export async function getHomepageContent(): Promise<CMSHomepage> {
  const localHomepageFallback: CMSHomepage = {
    heroTitle: 'CẦN THỢ ĐIỆN NƯỚC BẢO LỘC?',
    heroSubtitle: 'Đội ngũ kỹ thuật viên Hoàng Tuấn MPE luôn trực chiến hỗ trợ 24/7 khẩn cấp, giải quyết triệt để sự cố sau 30 phút điện thoại.',
    heroOverlayText: 'DỊCH VỤ AN TÂM - GIÁ CẢ MINH BẠCH',
    features: fallbackWhyChooseUs.map(item => ({
      title: item.title,
      description: item.description,
      icon: item.icon?.name || 'Wrench'
    })),
    stats: [
      { value: '1.500+', label: 'Hộ gia đình xử lý' },
      { value: '30 phút', label: 'Cam kết có mặt' },
      { value: '10+', label: 'Năm uy tín ngành' },
      { value: '100%', label: 'Bảo hành chu đáo' }
    ],
    aboutHeading: 'Về Hoàng Tuấn MPE',
    aboutContent: 'Công ty Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện lạnh và cung cấp thiết bị chiếu sáng, rò nước, lắp camera hàng đầu tại Bảo Lộc...',
    aboutImage: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800'
  };

  if (!isSanityConfigured) {
    logCmsStatus('homepage', false, 0);
    return localHomepageFallback;
  }
  try {
    const data = await client.fetch<CMSHomepage>(homepageQuery);
    const hasData = isValidObject(data);
    logCmsStatus('homepage', hasData, hasData ? 1 : 0);
    return hasData ? data : localHomepageFallback;
  } catch (error) {
    logCmsStatus('homepage', false, 0, error);
    return localHomepageFallback;
  }
}

/**
 * 3. Service Categories
 */
export async function getServiceCategories(): Promise<CMSServiceCategory[]> {
  const fallbackCategories: CMSServiceCategory[] = [
    { id: 'electrical', title: 'Điện dân dụng', description: 'Sửa chữa lắp đặt hệ thống điện gia đình', icon: 'Zap', color: 'blue' },
    { id: 'plumbing', title: 'Nước dân dụng', description: 'Xử lý các sự cố gãy vòi rò rỉ nước', icon: 'Droplet', color: 'cyan' },
    { id: 'camera', title: 'Camera giám sát', description: 'Hệ thống camera an ninh sắc nét', icon: 'Video', color: 'indigo' },
    { id: 'detection', title: 'Siêu âm dò tìm', description: 'Tìm kiếm rò rỉ nước ngầm không đục phá', icon: 'Search', color: 'amber' }
  ];

  if (!isSanityConfigured) return fallbackCategories;
  try {
    const data = await client.fetch<CMSServiceCategory[]>(serviceCategoriesQuery);
    return isValidArray(data) ? data : fallbackCategories;
  } catch (error) {
    console.warn('Sanity service categories fetch failed, using local fallback:', error);
    return fallbackCategories;
  }
}

/**
 * 4. Helper to transform the Lucide icon objects of LocalService into string-friendly format
 */
function mapLocalServiceToCMS(srv: LocalService): CMSService {
  return {
    id: srv.id,
    slug: srv.slug,
    title: srv.title,
    shortDescription: srv.shortDescription,
    fullDescription: srv.fullDescription,
    icon: srv.icon?.name || 'Wrench',
    category: srv.category,
    features: srv.features,
    pricing: srv.pricing,
    image: srv.image,
    benefits: srv.benefits,
    faq: srv.faq
  };
}

/**
 * 5. Services Details
 */
export async function getServices(): Promise<CMSService[]> {
  const cmsFallback = fallbackServices.map(mapLocalServiceToCMS);
  if (!isSanityConfigured) return cmsFallback;
  try {
    const data = await client.fetch<CMSService[]>(servicesQuery);
    return isValidArray(data) ? data : cmsFallback;
  } catch (error) {
    console.warn('Sanity services fetch failed, using local fallback:', error);
    return cmsFallback;
  }
}

export async function getServiceBySlug(slug: string | undefined): Promise<CMSService | null> {
  const cmsFallback = fallbackServices.map(mapLocalServiceToCMS);
  const foundLocal = cmsFallback.find(s => s.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSService>(serviceBySlugQuery, { slug });
    return isValidObject(data) ? data : foundLocal;
  } catch (error) {
    console.warn(`Sanity service fetch for slug ${slug} failed, using local fallback:`, error);
    return foundLocal;
  }
}

/**
 * 6. Post Categories
 */
export async function getPostCategories(): Promise<CMSPostCategory[]> {
  const fallbackCats: CMSPostCategory[] = fallbackBlogCategories.map(c => ({
    id: c.id,
    title: c.title,
    icon: c.icon?.name || 'BookOpen'
  }));
  if (!isSanityConfigured) return fallbackCats;
  try {
    const data = await client.fetch<CMSPostCategory[]>(postCategoriesQuery);
    return isValidArray(data) ? data : fallbackCats;
  } catch (error) {
    console.warn('Sanity post categories fetch failed, using local fallback:', error);
    return fallbackCats;
  }
}

/**
 * 7. Blog Posts
 */
export async function getBlogPosts(): Promise<CMSBlogPost[]> {
  const localBlogPostsMapped: CMSBlogPost[] = fallbackBlogPosts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    date: p.date,
    author: p.author,
    image: p.image,
    readTime: p.readTime,
    tags: p.tags,
    faq: p.faq
  }));

  if (!isSanityConfigured) return localBlogPostsMapped;
  try {
    const data = await client.fetch<CMSBlogPost[]>(postsQuery);
    return isValidArray(data) ? data : localBlogPostsMapped;
  } catch (error) {
    console.warn('Sanity blog post details fetch failed, using local fallback:', error);
    return localBlogPostsMapped;
  }
}

export async function getBlogPostBySlug(slug: string | undefined): Promise<CMSBlogPost | null> {
  const localBlogPostsMapped: CMSBlogPost[] = fallbackBlogPosts.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    content: p.content,
    category: p.category,
    date: p.date,
    author: p.author,
    image: p.image,
    readTime: p.readTime,
    tags: p.tags,
    faq: p.faq
  }));

  const foundLocal = localBlogPostsMapped.find(p => p.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSBlogPost>(postBySlugQuery, { slug });
    return isValidObject(data) ? data : foundLocal;
  } catch (error) {
    console.warn(`Sanity blog post fetch for slug ${slug} failed, using local fallback:`, error);
    return foundLocal;
  }
}

/**
 * 8. Product Categories
 */
export async function getProductCategories(): Promise<CMSProductCategory[]> {
  const localCategoriesMapped: CMSProductCategory[] = fallbackProductCategories.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    icon: c.icon?.name || 'Tag'
  }));

  if (!isSanityConfigured) return localCategoriesMapped;
  try {
    const data = await client.fetch<CMSProductCategory[]>(productCategoriesQuery);
    return isValidArray(data) ? data : localCategoriesMapped;
  } catch (error) {
    console.warn('Sanity product categories fetch failed, using local fallback:', error);
    return localCategoriesMapped;
  }
}

/**
 * 9. Products Details
 */
function normalizeProductSpecs(p: any): CMSProduct {
  if (!p) return p;
  if (Array.isArray(p.specs)) {
    const mappedSpecs: { [key: string]: string } = {};
    p.specs.forEach((item: any) => {
      if (item && typeof item === 'object' && item.key) {
        mappedSpecs[item.key] = item.value || '';
      }
    });
    return { ...p, specs: mappedSpecs };
  }
  return p;
}

export async function getProducts(): Promise<CMSProduct[]> {
  const localProductsMapped: CMSProduct[] = fallbackProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.price,
    image: p.image,
    features: p.features,
    specs: p.specs
  }));

  if (!isSanityConfigured) return localProductsMapped;
  try {
    const data = await client.fetch<CMSProduct[]>(productsQuery);
    return isValidArray(data) ? data.map(normalizeProductSpecs) : localProductsMapped;
  } catch (error) {
    console.warn('Sanity products fetch failed, using local fallback:', error);
    return localProductsMapped;
  }
}

export async function getProductBySlug(slug: string | undefined): Promise<CMSProduct | null> {
  const localProductsMapped: CMSProduct[] = fallbackProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.price,
    image: p.image,
    features: p.features,
    specs: p.specs
  }));

  const foundLocal = localProductsMapped.find(p => p.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSProduct>(productBySlugQuery, { slug });
    return isValidObject(data) ? normalizeProductSpecs(data) : foundLocal;
  } catch (error) {
    console.warn(`Sanity product fetch for slug ${slug} failed, using local fallback:`, error);
    return foundLocal;
  }
}

/**
 * 10. Pricing Entries
 */
export async function getPricing(): Promise<CMSPricing[]> {
  // Derive fallback pricing entries from our existing service data:
  const derivedPricing: CMSPricing[] = [];
  fallbackServices.forEach(s => {
    s.pricing.forEach(p => {
      derivedPricing.push({
        title: p.item,
        price: p.price,
        unit: p.unit,
        category: s.category,
        features: s.features,
        orderNo: s.id === 'e1' ? 1 : 2
      });
    });
  });

  if (!isSanityConfigured) return derivedPricing;
  try {
    const data = await client.fetch<CMSPricing[]>(pricingQuery);
    return isValidArray(data) ? data : derivedPricing;
  } catch (error) {
    console.warn('Sanity pricing fetch failed, using local fallback:', error);
    return derivedPricing;
  }
}

/**
 * 11. FAQs General List
 */
export async function getFaqs(): Promise<CMSFaq[]> {
  const localFaqsMapped: CMSFaq[] = fallbackFaqs.map(f => ({
    question: f.question,
    answer: f.answer,
    category: 'Chung'
  }));

  if (!isSanityConfigured) return localFaqsMapped;
  try {
    const data = await client.fetch<CMSFaq[]>(faqsQuery);
    return isValidArray(data) ? data : localFaqsMapped;
  } catch (error) {
    console.warn('Sanity FAQs fetch failed, using local fallback:', error);
    return localFaqsMapped;
  }
}

/**
 * 12. Testimonials
 */
export async function getTestimonials(): Promise<CMSTestimonial[]> {
  const localTestimonialsMapped: CMSTestimonial[] = fallbackTestimonials.map(t => ({
    name: t.name,
    role: t.role,
    review: t.review,
    rating: t.rating,
    avatar: t.avatar
  }));

  if (!isSanityConfigured) return localTestimonialsMapped;
  try {
    const data = await client.fetch<CMSTestimonial[]>(testimonialsQuery);
    return isValidArray(data) ? data : localTestimonialsMapped;
  } catch (error) {
    console.warn('Sanity testimonials fetch failed, using local fallback:', error);
    return localTestimonialsMapped;
  }
}

/**
 * 13. Customer reviews list
 */
export async function getReviews(): Promise<CMSReview[]> {
  const fallbackReviews: CMSReview[] = [
    { customerName: 'Chị Lan', comment: 'Rất chuyên nghiệp và nhiệt tình', score: 5, date: '2026-05-18', verifiedPurchase: true },
    { customerName: 'Anh Hà', comment: 'Thợ nhanh có mặt đúng 20 phút', score: 5, date: '2026-05-15', verifiedPurchase: true }
  ];

  if (!isSanityConfigured) return fallbackReviews;
  try {
    const data = await client.fetch<CMSReview[]>(reviewsQuery);
    return isValidArray(data) ? data : fallbackReviews;
  } catch (error) {
    console.warn('Sanity reviews fetch failed, using local fallback:', error);
    return fallbackReviews;
  }
}

/**
 * 14. Galleries
 */
export async function getGalleries(): Promise<CMSGallery[]> {
  const fallbackGalleries: CMSGallery[] = [
    { title: 'Thi công lắp đặt điện Bảo Lộc', image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800', category: 'electrical', caption: 'Lắp CB chống rò rỉ' },
    { title: 'Sửa đường ống rò nước ngầm', image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', category: 'plumbing', caption: 'Dùng thiết bị cảm ứng' }
  ];

  if (!isSanityConfigured) return fallbackGalleries;
  try {
    const data = await client.fetch<CMSGallery[]>(galleryQuery);
    return isValidArray(data) ? data : fallbackGalleries;
  } catch (error) {
    console.warn('Sanity gallery fetch failed, fallback to local static assets:', error);
    return fallbackGalleries;
  }
}

/**
 * 15. Header Menus
 */
export async function getMenus(): Promise<CMSMenu[]> {
  const fallbackMenus: CMSMenu[] = [
    { title: 'Trang chủ', path: '/', orderNo: 1 },
    { title: 'Dịch vụ', path: '/dich-vu', orderNo: 2 },
    { title: 'Sản phẩm', path: '/san-pham', orderNo: 3 },
    { title: 'Báo giá', path: '/bao-gia', orderNo: 4 },
    { title: 'Tin tức & mẹo', path: '/tin-tuc', orderNo: 5 },
    { title: 'Liên hệ', path: '/lien-he', orderNo: 6 }
  ];

  if (!isSanityConfigured) return fallbackMenus;
  try {
    const data = await client.fetch<CMSMenu[]>(menusQuery);
    return isValidArray(data) ? data : fallbackMenus;
  } catch (error) {
    console.warn('Sanity menu fetch failed, using local fallback:', error);
    return fallbackMenus;
  }
}

/**
 * 16. Footer contents
 */
export async function getFooter(): Promise<CMSFooter> {
  const fallbackFooterContent: CMSFooter = {
    companyName: 'Công Ty Hoàng Tuấn MPE',
    shortAbout: 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực Bảo Lộc, Lâm Đồng.',
    address: 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng',
    phone: '0389.011.315',
    email: 'contact@hoangtuanmpe.com',
    workingHours: 'Hỗ trợ 24/7 (Kể cả Chủ Nhật & Ngày Lễ)',
    socialLinks: {
      facebook: 'https://facebook.com',
      youtube: 'https://youtube.com',
      zalo: 'https://zalo.me/0389011315'
    },
    copyrightText: '© 2026 Hoàng Tuấn MPE. Thiết kế & vận hành chuyên nghiệp.'
  };

  if (!isSanityConfigured) return fallbackFooterContent;
  try {
    const data = await client.fetch<CMSFooter>(footerQuery);
    return isValidObject(data) ? data : fallbackFooterContent;
  } catch (error) {
    console.warn('Sanity footer fetch failed, using local fallback:', error);
    return fallbackFooterContent;
  }
}

/**
 * 17. Alert banners
 */
export async function getBanners(): Promise<CMSBanner[]> {
  const defaultBanner: CMSBanner[] = [
    { title: 'Notice 24/7', text: '☎️ Khẩn cấp: Thợ trực chiến 24/7 đêm lễ có mặt ngay sau 15-30 phút!', linkText: 'Gọi thợ ngay', linkUrl: 'tel:0389011315', isActive: true }
  ];

  if (!isSanityConfigured) return defaultBanner;
  try {
    const data = await client.fetch<CMSBanner[]>(bannersQuery);
    return isValidArray(data) ? data : defaultBanner;
  } catch (error) {
    console.warn('Sanity banners fetch failed, fallback to default notice:', error);
    return defaultBanner;
  }
}

/**
 * 18. Promotion popup
 */
export async function getPopups(): Promise<CMSPopup | null> {
  const defaultPopup: CMSPopup = {
    title: 'GIẢM GIÁ 10%',
    subtitle: 'Ưu đãi cho khách hàng gọi lắp đặt thiết bị điện nước tuần này!',
    ctaText: 'Nhận ưu đãi qua Zalo',
    ctaLink: 'https://zalo.me/0389011315',
    delaySeconds: 3,
    isActive: true
  };

  if (!isSanityConfigured) return defaultPopup;
  try {
    const data = await client.fetch<CMSPopup>(popupsQuery);
    return isValidObject(data) ? data : defaultPopup;
  } catch (error) {
    console.warn('Sanity popup fetch failed, fallback to static promo overlay:', error);
    return defaultPopup;
  }
}

/**
 * 19. SEO settings per path
 */
export async function getSeo(path: string): Promise<CMSSeo> {
  const defaultSeo: CMSSeo = {
    pagePath: path,
    metaTitle: 'Hoàng Tuấn MPE | Thợ Điện Nước & Camera Lắp đặt Bảo Lộc Lâm Đồng',
    metaDescription: 'Dịch vụ sửa chữa điện nước khẩn cấp 24/7 tận nhà, siêu âm rò rỉ nước không đục phá và lắp đặt camera an ninh chính hãng chuyên nghiệp tại Bảo Lộc.',
    keywords: ['thợ điện bảo lộc', 'sửa điện nước lâm đồng', 'dò tìm rò rỉ nước', 'lắp camera']
  };

  if (!isSanityConfigured) return defaultSeo;
  try {
    const data = await client.fetch<CMSSeo>(seoQuery, { path });
    return isValidObject(data) ? data : defaultSeo;
  } catch (error) {
    return defaultSeo;
  }
}

/**
 * 20. Local business schema structured data
 */
export async function getLocalBusiness(): Promise<CMSLocalBusiness> {
  const fallbackBiz: CMSLocalBusiness = {
    name: 'Hoàng Tuấn MPE',
    legalName: 'Công ty TNHH Hoàng Tuấn MPE Cơ Điện',
    telephone: '0389.011.315',
    address: {
      streetAddress: '74 Trần Phú',
      addressLocality: 'Bảo Lộc',
      addressRegion: 'Lâm Đồng',
      postalCode: '67000',
      addressCountry: 'VN'
    },
    geo: {
      latitude: 11.545,
      longitude: 107.808
    },
    priceRange: '$$',
    openingHoursSpecification: [
      { dayOfWeek: 'Monday-Sunday', opens: '00:00', closes: '23:59' }
    ]
  };

  if (!isSanityConfigured) return fallbackBiz;
  try {
    const data = await client.fetch<CMSLocalBusiness>(localBusinessQuery);
    return isValidObject(data) ? data : fallbackBiz;
  } catch (error) {
    return fallbackBiz;
  }
}

/**
 * 21. Site level settings controls
 */
export async function getSiteSettings(): Promise<CMSSiteSettings> {
  const defaultSettings: CMSSiteSettings = {
    siteName: 'Hoàng Tuấn MPE',
    tagline: 'Điện nước & Camera chính hãng, siêu âm dò tìm rò rỉ nước 24/7',
    mainHotline: '0389.011.315',
    mainZalo: 'https://zalo.me/0389011315',
    headerNotice: 'Hỗ trợ khẩn cấp 24/7: Thợ lành nghề có mặt sau 30 phút!'
  };

  if (!isSanityConfigured) return defaultSettings;
  try {
    const data = await client.fetch<CMSSiteSettings>(siteSettingsQuery);
    return isValidObject(data) ? data : defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}

/**
 * 22. Contact specifications
 */
export async function getContact(): Promise<CMSContact> {
  const defaultContact: CMSContact = {
    pageTitle: 'Kết nối với Hoàng Tuấn MPE',
    pageSubtitle: 'Đội ngũ trực điện nước luôn sẵn sàng phục vụ quý khách tại Bảo Lộc và khu vực lân cận Lâm Đồng. Đừng ngần ngại liên lạc qua hotline 24/7 hoặc tin nhắn Zalo.',
    contactFields: [
      { icon: 'Phone', label: 'Điện thoại 24/7', val: '0389.011.315', desc: 'Có mặt ngay sau 30 phút' },
      { icon: 'MessageSquare', label: 'Zalo Chat', val: '0389011315', desc: 'Nhận báo giá và khảo sát ảnh' },
      { icon: 'MapPin', label: 'Địa chỉ', val: 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng' },
      { icon: 'Clock', label: 'Giờ làm việc', val: 'Mở cửa 24H ngày đêm, cả lễ và Tết' }
    ],
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.478201504787!2d107.79586119999999!3d11.5435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e2a77af8b06d%3A0xe7bd193c6f66bd32!2zTOG7mWMgUGjDoXQsIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716301234567!5m2!1sen!2s'
  };

  if (!isSanityConfigured) return defaultContact;
  try {
    const data = await client.fetch<CMSContact>(contactQuery);
    return isValidObject(data) ? data : defaultContact;
  } catch (error) {
    return defaultContact;
  }
}

// ---------------------------------------------------------
// Lucide Icon Helper Resolver
// ---------------------------------------------------------
export function getIconComponent(iconName: string): React.ComponentType<any> {
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Wrench;
}

