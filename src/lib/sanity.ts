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

// Import newly generated localized multi-location databases for SEO and high-conversion content
import { LOCALIZED_HOME } from '../data/localizedHome';
import { LOCALIZED_FAQS } from '../data/localizedFaqs';
import { LOCALIZED_REVIEWS, LOCALIZED_TESTIMONIALS } from '../data/localizedReviews';
import { LOCALIZED_SEO, LOCALIZED_BUSINESS_SCHEMA, LOCALIZED_CONTACT, LOCALIZED_SITE_SETTINGS } from '../data/localizedSeo';
import { LOCALIZED_SERVICES } from '../data/localizedServices';
import { LOCALIZED_PRODUCTS } from '../data/localizedProducts';
import { LOCALIZED_BLOGS } from '../data/localizedBlog';

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
  useCdn: false, // Set to false to bypass CDN edge caching and load live edits instantly
  apiVersion: '2026-05-21', // Use current ISO date
});

// Helper validation checker
const isValidArray = (arr: any) => Array.isArray(arr) && arr.length > 0;
const isValidObject = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

// Dynamic location detection from URL route params or local storage
export function getCurrentLocationId(): string {
  if (typeof window === 'undefined') return 'baoloc';
  
  const pathParts = window.location.pathname.split('/');
  const prefix = pathParts[1]; // e.g. 'bao-loc' or 'ho-chi-minh'
  
  let detectedId = 'baoloc';
  if (prefix === 'ho-chi-minh') {
    detectedId = 'hcm';
  } else if (prefix === 'bao-loc') {
    detectedId = 'baoloc';
  } else {
    // Try localStorage fallback
    const saved = localStorage.getItem('user-location');
    detectedId = saved === 'Hồ Chí Minh' ? 'hcm' : 'baoloc';
  }
  
  // Log URL location detection
  console.log(`%c[LOCATION] Active region detected dynamically: "${detectedId === 'hcm' ? 'Hồ Chí Minh (hcm)' : 'Bảo Lộc (baoloc)'}"`, 'color: #38bdf8; font-weight: bold;');
  return detectedId;
}

// Diagnostic logger for connection reports and fallback indicators
function logCmsStatus(docType: string, isFromCms: boolean, count: number, err?: any) {
  if (isFromCms) {
    console.log(`%c[CMS CONNECTED] Loaded "${docType}" successfully from Sanity. Records: ${count}`, 'color: #00dd66; font-weight: bold;');
  } else {
    console.log(`%c[CMS FALLBACK] Using local fallback for "${docType}" (Reason: ${err ? err.message || err : 'Sanity returned no records or is unconfigured'}).`, 'color: #ffaa11; font-weight: bold;');
  }
}

// Dynamic fallback text localizer to match active location
function localizeText(text: string, locationId: string): string {
  if (locationId === 'hcm') {
    return text
      .replace(/Bảo Lộc, Lâm Đồng/g, 'Hồ Chí Minh')
      .replace(/Bảo Lộc /g, 'Hồ Chí Minh ')
      .replace(/Bảo Lộc/g, 'Hồ Chí Minh')
      .replace(/Lâm Đồng/g, 'TP. Hồ Chí Minh')
      .replace(/Hẻm 74 Trần Phú, Lộc Phát/g, '74 Trần Phú, Quận 1')
      .replace(/tại Bảo Lộc/g, 'tại TP.HCM');
  }
  return text;
}

function localizeService(srv: CMSService, locId: string): CMSService {
  return {
    ...srv,
    title: localizeText(srv.title, locId),
    shortDescription: localizeText(srv.shortDescription, locId),
    fullDescription: localizeText(srv.fullDescription, locId),
  };
}

function localizeProduct(prd: CMSProduct, locId: string): CMSProduct {
  return {
    ...prd,
    name: localizeText(prd.name, locId),
    description: localizeText(prd.description, locId),
  };
}

function localizeBlogPost(post: CMSBlogPost, locId: string): CMSBlogPost {
  return {
    ...post,
    title: localizeText(post.title, locId),
    excerpt: localizeText(post.excerpt, locId),
    content: localizeText(post.content, locId),
  };
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
export async function getHomepageContent(forcedLocationId?: string): Promise<CMSHomepage> {
  const locId = forcedLocationId || getCurrentLocationId();
  
  const localHomepageFallback: CMSHomepage = LOCALIZED_HOME[locId] || {
    heroTitle: locId === 'hcm' ? 'CẦN THỢ ĐIỆN NƯỚC HỒ CHÍ MINH?' : 'CẦN THỢ ĐIỆN NƯỚC BẢO LỘC?',
    heroSubtitle: locId === 'hcm' 
      ? 'Đội ngũ kỹ thuật viên Hoàng Tuấn MPE luôn trực chiến hỗ trợ 24/7 khẩn cấp, giải quyết triệt để sự cố sau 30 phút điện thoại tại Sài Gòn.'
      : 'Đội ngũ kỹ thuật viên Hoàng Tuấn MPE luôn trực chiến hỗ trợ 24/7 khẩn cấp, giải quyết triệt để sự cố sau 30 phút điện thoại tại Lâm Đồng.',
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
    aboutHeading: locId === 'hcm' ? 'Về Hoàng Tuấn MPE (TP.HCM)' : 'Về Hoàng Tuấn MPE',
    aboutContent: locId === 'hcm'
      ? 'Công ty Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện lạnh và cung cấp thiết bị chiếu sáng, rò nước, lắp camera hàng đầu tại Hồ Chí Minh...'
      : 'Công ty Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện lạnh và cung cấp thiết bị chiếu sáng, rò nước, lắp camera hàng đầu tại Bảo Lộc...',
    aboutImage: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800'
  };

  if (!isSanityConfigured) {
    logCmsStatus('homepage', false, 0);
    return localHomepageFallback;
  }
  try {
    const data = await client.fetch<CMSHomepage>(homepageQuery, { locationId: locId });
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
 * 5. Services Details filtered by location
 */
export async function getServices(forcedLocationId?: string): Promise<CMSService[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const cmsFallback = LOCALIZED_SERVICES[locId] || fallbackServices.map(mapLocalServiceToCMS).map(s => localizeService(s, locId));
  
  if (!isSanityConfigured) {
    logCmsStatus('service', false, 0);
    return cmsFallback;
  }
  try {
    const data = await client.fetch<CMSService[]>(servicesQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('service', hasData, hasData ? data.length : 0);
    return hasData ? data : cmsFallback;
  } catch (error) {
    logCmsStatus('service', false, 0, error);
    return cmsFallback;
  }
}

export async function getServiceBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSService | null> {
  const locId = forcedLocationId || getCurrentLocationId();
  const cmsFallback = LOCALIZED_SERVICES[locId] || fallbackServices.map(mapLocalServiceToCMS).map(s => localizeService(s, locId));
  const foundLocal = cmsFallback.find(s => s.slug === slug) || null;
  
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSService>(serviceBySlugQuery, { slug, locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`service-slug-${slug}`, hasData, hasData ? 1 : 0);
    return hasData ? data : foundLocal;
  } catch (error) {
    logCmsStatus(`service-slug-${slug}`, false, 0, error);
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
 * 7. Blog Posts filtered by location
 */
export async function getBlogPosts(forcedLocationId?: string): Promise<CMSBlogPost[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localBlogPostsMapped: CMSBlogPost[] = LOCALIZED_BLOGS[locId] || fallbackBlogPosts.map(p => ({
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
  })).map(b => localizeBlogPost(b, locId));

  if (!isSanityConfigured) {
    logCmsStatus('post', false, 0);
    return localBlogPostsMapped;
  }
  try {
    const data = await client.fetch<CMSBlogPost[]>(postsQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('post', hasData, hasData ? data.length : 0);
    return hasData ? data : localBlogPostsMapped;
  } catch (error) {
    logCmsStatus('post', false, 0, error);
    return localBlogPostsMapped;
  }
}

export async function getBlogPostBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSBlogPost | null> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localBlogPostsMapped: CMSBlogPost[] = LOCALIZED_BLOGS[locId] || fallbackBlogPosts.map(p => ({
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
  })).map(b => localizeBlogPost(b, locId));

  const foundLocal = localBlogPostsMapped.find(p => p.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSBlogPost>(postBySlugQuery, { slug, locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`post-slug-${slug}`, hasData, hasData ? 1 : 0);
    return hasData ? data : foundLocal;
  } catch (error) {
    logCmsStatus(`post-slug-${slug}`, false, 0, error);
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
 * 9. Products Details filtered by location
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

export async function getProducts(forcedLocationId?: string): Promise<CMSProduct[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localProductsMapped: CMSProduct[] = LOCALIZED_PRODUCTS[locId] || fallbackProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.price,
    image: p.image,
    features: p.features,
    specs: p.specs
  })).map(p => localizeProduct(p, locId));

  if (!isSanityConfigured) {
    logCmsStatus('product', false, 0);
    return localProductsMapped;
  }
  try {
    const data = await client.fetch<CMSProduct[]>(productsQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('product', hasData, hasData ? data.length : 0);
    return hasData ? data.map(normalizeProductSpecs) : localProductsMapped;
  } catch (error) {
    logCmsStatus('product', false, 0, error);
    return localProductsMapped;
  }
}

export async function getProductBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSProduct | null> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localProductsMapped: CMSProduct[] = LOCALIZED_PRODUCTS[locId] || fallbackProducts.map(p => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    description: p.description,
    price: p.price,
    image: p.image,
    features: p.features,
    specs: p.specs
  })).map(p => localizeProduct(p, locId));

  const foundLocal = localProductsMapped.find(p => p.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSProduct>(productBySlugQuery, { slug, locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`product-slug-${slug}`, hasData, hasData ? 1 : 0);
    return hasData ? normalizeProductSpecs(data) : foundLocal;
  } catch (error) {
    logCmsStatus(`product-slug-${slug}`, false, 0, error);
    return foundLocal;
  }
}

/**
 * 10. Pricing Entries filtered by location
 */
export async function getPricing(forcedLocationId?: string): Promise<CMSPricing[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const derivedPricing: CMSPricing[] = [];
  const servicesToUse = LOCALIZED_SERVICES[locId] || fallbackServices.map(mapLocalServiceToCMS);
  servicesToUse.forEach(s => {
    s.pricing.forEach(p => {
      derivedPricing.push({
        title: p.item,
        price: p.price,
        unit: p.unit,
        category: s.category,
        features: s.features,
        orderNo: s.id.startsWith('e') ? 1 : 2
      });
    });
  });

  if (!isSanityConfigured) {
    logCmsStatus('pricing', false, 0);
    return derivedPricing;
  }
  try {
    const data = await client.fetch<CMSPricing[]>(pricingQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('pricing', hasData, hasData ? data.length : 0);
    return hasData ? data : derivedPricing;
  } catch (error) {
    logCmsStatus('pricing', false, 0, error);
    return derivedPricing;
  }
}

/**
 * 11. FAQs General List filtered by location
 */
export async function getFaqs(forcedLocationId?: string): Promise<CMSFaq[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localFaqsMapped: CMSFaq[] = LOCALIZED_FAQS[locId] || fallbackFaqs.map(f => ({
    question: localizeText(f.question, locId),
    answer: localizeText(f.answer, locId),
    category: 'Chung'
  }));

  if (!isSanityConfigured) {
    logCmsStatus('faq', false, 0);
    return localFaqsMapped;
  }
  try {
    const data = await client.fetch<CMSFaq[]>(faqsQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('faq', hasData, hasData ? data.length : 0);
    return hasData ? data : localFaqsMapped;
  } catch (error) {
    logCmsStatus('faq', false, 0, error);
    return localFaqsMapped;
  }
}

/**
 * 12. Testimonials filtered by location
 */
export async function getTestimonials(forcedLocationId?: string): Promise<CMSTestimonial[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const localTestimonialsMapped: CMSTestimonial[] = LOCALIZED_TESTIMONIALS[locId] || fallbackTestimonials.map(t => ({
    name: t.name,
    role: t.role,
    review: localizeText(t.review, locId),
    rating: t.rating,
    avatar: t.avatar
  }));

  if (!isSanityConfigured) {
    logCmsStatus('testimonial', false, 0);
    return localTestimonialsMapped;
  }
  try {
    const data = await client.fetch<CMSTestimonial[]>(testimonialsQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('testimonial', hasData, hasData ? data.length : 0);
    return hasData ? data : localTestimonialsMapped;
  } catch (error) {
    logCmsStatus('testimonial', false, 0, error);
    return localTestimonialsMapped;
  }
}

/**
 * 13. Customer reviews list filtered by location
 */
export async function getReviews(forcedLocationId?: string): Promise<CMSReview[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const fallbackReviews: CMSReview[] = LOCALIZED_REVIEWS[locId] || [
    { customerName: 'Chị Lan', comment: localizeText('Rất chuyên nghiệp và nhiệt tình tại Bảo Lộc', locId), score: 5, date: '2026-05-18', verifiedPurchase: true },
    { customerName: 'Anh Hà', comment: locId === 'hcm' ? 'Thợ nhanh có mặt đúng 20 phút ở Sài Gòn' : 'Thợ nhanh có mặt đúng 20 phút ở Bảo Lộc', score: 5, date: '2026-05-15', verifiedPurchase: true }
  ];

  if (!isSanityConfigured) {
    logCmsStatus('review', false, 0);
    return fallbackReviews;
  }
  try {
    const data = await client.fetch<CMSReview[]>(reviewsQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('review', hasData, hasData ? data.length : 0);
    return hasData ? data : fallbackReviews;
  } catch (error) {
    logCmsStatus('review', false, 0, error);
    return fallbackReviews;
  }
}

/**
 * 14. Galleries filtered by location
 */
export async function getGalleries(forcedLocationId?: string): Promise<CMSGallery[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const fallbackGalleries: CMSGallery[] = [
    { 
      title: locId === 'hcm' ? 'Thi công lắp đặt điện Hồ Chí Minh' : 'Thi công lắp đặt điện Bảo Lộc', 
      image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80&w=800', 
      category: 'electrical', 
      caption: 'Lắp CB chống rò rỉ' 
    },
    { 
      title: 'Sửa đường ống rò nước ngầm', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', 
      category: 'plumbing', 
      caption: 'Dùng thiết bị cảm ứng siêu âm' 
    }
  ];

  if (!isSanityConfigured) {
    logCmsStatus('gallery', false, 0);
    return fallbackGalleries;
  }
  try {
    const data = await client.fetch<CMSGallery[]>(galleryQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('gallery', hasData, hasData ? data.length : 0);
    return hasData ? data : fallbackGalleries;
  } catch (error) {
    logCmsStatus('gallery', false, 0, error);
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
    { title: 'Báo giá', path: '/bang-gia', orderNo: 4 },
    { title: 'Tin tức & mẹo', path: '/blog', orderNo: 5 },
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
 * 16. Footer contents filtered by location
 */
export async function getFooter(forcedLocationId?: string): Promise<CMSFooter> {
  const locId = forcedLocationId || getCurrentLocationId();
  
  const fallbackFooterContent: CMSFooter = {
    companyName: locId === 'hcm' ? 'Công Ty Hoàng Tuấn MPE (Chi nhánh TP.HCM)' : 'Công Ty Hoàng Tuấn MPE',
    shortAbout: locId === 'hcm'
      ? 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực TP. Hồ Chí Minh.'
      : 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực Bảo Lộc, Lâm Đồng.',
    address: locId === 'hcm' ? '74 Trần Phú, Quận 1, TP. Hồ Chí Minh' : 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng',
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

  if (!isSanityConfigured) {
    logCmsStatus('footer', false, 0);
    return fallbackFooterContent;
  }
  try {
    const data = await client.fetch<CMSFooter>(footerQuery, { locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus('footer', hasData, hasData ? 1 : 0);
    return hasData ? data : fallbackFooterContent;
  } catch (error) {
    logCmsStatus('footer', false, 0, error);
    return fallbackFooterContent;
  }
}

/**
 * 17. Alert banners filtered by location
 */
export async function getBanners(forcedLocationId?: string): Promise<CMSBanner[]> {
  const locId = forcedLocationId || getCurrentLocationId();
  const defaultBanner: CMSBanner[] = [
    { 
      title: 'Notice 24/7', 
      text: locId === 'hcm' 
        ? '☎️ Khẩn cấp: Thợ trực chiến 24/7 tại Sài Gòn đêm lễ có mặt ngay sau 15-30 phút!' 
        : '☎️ Khẩn cấp: Thợ trực chiến 24/7 tại Bảo Lộc đêm lễ có mặt ngay sau 15-30 phút!', 
      linkText: 'Gọi thợ ngay', 
      linkUrl: 'tel:0389011315', 
      isActive: true 
    }
  ];

  if (!isSanityConfigured) {
    logCmsStatus('banner', false, 0);
    return defaultBanner;
  }
  try {
    const data = await client.fetch<CMSBanner[]>(bannersQuery, { locationId: locId });
    const hasData = isValidArray(data);
    logCmsStatus('banner', hasData, hasData ? data.length : 0);
    return hasData ? data : defaultBanner;
  } catch (error) {
    logCmsStatus('banner', false, 0, error);
    return defaultBanner;
  }
}

/**
 * 18. Promotion popup filtered by location
 */
export async function getPopups(forcedLocationId?: string): Promise<CMSPopup | null> {
  const locId = forcedLocationId || getCurrentLocationId();
  const defaultPopup: CMSPopup = {
    title: 'GIẢM GIÁ 10%',
    subtitle: locId === 'hcm' ? 'Ưu đãi cho khách hàng gọi sửa chữa điện nước tại Hồ Chí Minh tuần này!' : 'Ưu đãi cho khách hàng gọi lắp đặt thiết bị điện nước Bảo Lộc tuần này!',
    ctaText: 'Nhận ưu đãi qua Zalo',
    ctaLink: 'https://zalo.me/0389011315',
    delaySeconds: 3,
    isActive: true
  };

  if (!isSanityConfigured) {
    logCmsStatus('popup', false, 0);
    return defaultPopup;
  }
  try {
    const data = await client.fetch<CMSPopup>(popupsQuery, { locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus('popup', hasData, hasData ? 1 : 0);
    return hasData ? data : defaultPopup;
  } catch (error) {
    logCmsStatus('popup', false, 0, error);
    return defaultPopup;
  }
}

/**
 * 19. SEO settings per path and location
 */
export async function getSeo(path: string, forcedLocationId?: string): Promise<CMSSeo> {
  const locId = forcedLocationId || getCurrentLocationId();
  const locName = locId === 'hcm' ? 'Hồ Chí Minh (TP.HCM)' : 'Bảo Lộc Lâm Đồng';
  
  let defaultSeo: CMSSeo = {
    pagePath: path,
    metaTitle: `Hoàng Tuấn MPE | Thợ Điện Nước & Camera Lắp đặt tại ${locName}`,
    metaDescription: `Dịch vụ sửa chữa điện nước khẩn cấp 24/7 tận nhà, siêu âm rò rỉ nước không đục phá và lắp đặt camera an ninh chính hãng chuyên nghiệp tại ${locName}.`,
    keywords: locId === 'hcm' 
      ? ['thợ điện hồ chí minh', 'sửa điện nước sài gòn', 'dò tìm rò rỉ nước tphcm', 'lắp camera hcm'] 
      : ['thợ điện bảo lộc', 'sửa điện nước lâm đồng', 'dò tìm rò rỉ nước', 'lắp camera bảo lộc']
  };

  if (LOCALIZED_SEO[locId]) {
    if (LOCALIZED_SEO[locId][path]) {
      defaultSeo = LOCALIZED_SEO[locId][path];
    } else {
      const parts = path.split('/');
      if (parts.length === 3) {
        const type = parts[1];
        const slug = parts[2];
        if (type === 'dich-vu') {
          const srv = (LOCALIZED_SERVICES[locId] || []).find(s => s.slug === slug);
          if (srv) {
            defaultSeo = {
              pagePath: path,
              metaTitle: srv.title,
              metaDescription: srv.shortDescription,
              canonicalUrl: `https://hoangtuanmpe.com/${locId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'}/dich-vu/${slug}`,
              ogImage: srv.image,
              keywords: srv.features
            };
          }
        } else if (type === 'san-pham') {
          const prd = (LOCALIZED_PRODUCTS[locId] || []).find(p => p.slug === slug);
          if (prd) {
            defaultSeo = {
              pagePath: path,
              metaTitle: `${prd.name} Chính Hãng Giá Tốt tại ${locName}`,
              metaDescription: prd.description.slice(0, 150),
              canonicalUrl: `https://hoangtuanmpe.com/${locId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'}/san-pham/${slug}`,
              ogImage: prd.image,
              keywords: prd.features
            };
          }
        } else if (type === 'blog') {
          const blg = (LOCALIZED_BLOGS[locId] || []).find(b => b.slug === slug);
          if (blg) {
            defaultSeo = {
              pagePath: path,
              metaTitle: blg.title,
              metaDescription: blg.excerpt,
              canonicalUrl: `https://hoangtuanmpe.com/${locId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'}/blog/${slug}`,
              ogImage: blg.image,
              keywords: blg.tags
            };
          }
        }
      }
      
      if (!defaultSeo.canonicalUrl && LOCALIZED_SEO[locId]['/']) {
        defaultSeo = {
          ...LOCALIZED_SEO[locId]['/'],
          pagePath: path
        };
      }
    }
  }

  const logAndAddMeta = (seo: CMSSeo) => {
    console.log(`%c[SEO] Custom SEO metadata resolved for path "${path}" at "${locId}": ${seo.metaTitle}`, 'color: #f43f5e; font-weight: bold;');
    return seo;
  };

  if (!isSanityConfigured) {
    logCmsStatus('seo', false, 0);
    return logAndAddMeta(defaultSeo);
  }
  try {
    const data = await client.fetch<CMSSeo>(seoQuery, { path, locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus('seo', hasData, hasData ? 1 : 0);
    return logAndAddMeta(hasData ? data : defaultSeo);
  } catch (error) {
    logCmsStatus('seo', false, 0, error);
    return logAndAddMeta(defaultSeo);
  }
}

/**
 * 20. Local business schema structured data
 */
export async function getLocalBusiness(forcedLocationId?: string): Promise<CMSLocalBusiness> {
  const locId = forcedLocationId || getCurrentLocationId();
  
  const fallbackBiz: CMSLocalBusiness = LOCALIZED_BUSINESS_SCHEMA[locId] || {
    name: locId === 'hcm' ? 'Hoàng Tuấn MPE - Chi Nhánh Hồ Chí Minh' : 'Hoàng Tuấn MPE - Trụ Sở Bảo Lộc',
    legalName: locId === 'hcm' ? 'Công ty TNHH Hoàng Tuấn MPE Cơ Điện (TP.HCM)' : 'Công ty TNHH Hoàng Tuấn MPE Cơ Điện',
    telephone: '0389.011.315',
    address: locId === 'hcm' ? {
      streetAddress: '74 Trần Phú',
      addressLocality: 'Quận 1',
      addressRegion: 'TP. Hồ Chí Minh',
      postalCode: '70000',
      addressCountry: 'VN'
    } : {
      streetAddress: '74 Trần Phú',
      addressLocality: 'Bảo Lộc',
      addressRegion: 'Lâm Đồng',
      postalCode: '67000',
      addressCountry: 'VN'
    },
    geo: locId === 'hcm' ? {
      latitude: 10.776,
      longitude: 106.701
    } : {
      latitude: 11.545,
      longitude: 107.808
    },
    priceRange: '$$',
    openingHoursSpecification: [
      { dayOfWeek: 'Monday-Sunday', opens: '00:00', closes: '23:59' }
    ]
  };

  if (!isSanityConfigured) {
    logCmsStatus('localBusiness', false, 0);
    return fallbackBiz;
  }
  try {
    const data = await client.fetch<CMSLocalBusiness>(localBusinessQuery, { locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus('localBusiness', hasData, hasData ? 1 : 0);
    return hasData ? data : fallbackBiz;
  } catch (error) {
    logCmsStatus('localBusiness', false, 0, error);
    return fallbackBiz;
  }
}

/**
 * 21. Site level settings controls
 */
export async function getSiteSettings(forcedLocationId?: string): Promise<CMSSiteSettings> {
  const locId = forcedLocationId || getCurrentLocationId();
  const locName = locId === 'hcm' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const defaultSettings: CMSSiteSettings = LOCALIZED_SITE_SETTINGS[locId] || {
    siteName: 'Hoàng Tuấn MPE',
    tagline: `Điện nước & Camera chính hãng, siêu âm dò tìm rò rỉ nước 24/7 tại ${locName}`,
    mainHotline: '0389.011.315',
    mainZalo: 'https://zalo.me/0389011315',
    headerNotice: `Hỗ trợ khẩn cấp 24/7: Thợ lành nghề có mặt sau 30 phút tại ${locName}!`
  };

  if (!isSanityConfigured) return defaultSettings;
  try {
    const data = await client.fetch<CMSSiteSettings>(siteSettingsQuery, { locationId: locId });
    return isValidObject(data) ? data : defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}

/**
 * 22. Contact specifications
 */
export async function getContact(forcedLocationId?: string): Promise<CMSContact> {
  const locId = forcedLocationId || getCurrentLocationId();
  const locName = locId === 'hcm' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  
  const defaultContact: CMSContact = LOCALIZED_CONTACT[locId] || {
    pageTitle: `${locId === 'hcm' ? 'Hồ Chí Minh' : 'Bảo Lộc'} - Kết nối với Hoàng Tuấn MPE`,
    pageSubtitle: `Đội ngũ trực điện nước luôn sẵn sàng phục vụ quý khách tại ${locName} và khu vực lân cận. Đừng ngần ngại liên lạc qua hotline 24/7 hoặc tin nhắn Zalo.`,
    contactFields: [
      { icon: 'Phone', label: 'Điện thoại 24/7', val: '0389.011.315', desc: 'Có mặt ngay sau 30 phút ròng rã' },
      { icon: 'MessageSquare', label: 'Zalo Chat', val: '0389011315', desc: 'Nhận báo giá và khảo sát ảnh tư vấn miễn phí' },
      { icon: 'MapPin', label: 'Địa chỉ phục vụ', val: locId === 'hcm' ? '74 Trần Phú, Quận 1, TP. Hồ Chí Minh' : 'Hẻm 74 Trần Phú, Lộc Phát, Bảo Lộc, Lâm Đồng' },
      { icon: 'Clock', label: 'Giờ làm việc', val: 'Mở cửa 24H ngày đêm, kể cả lễ và Tết nguyên đán' }
    ],
    mapEmbedUrl: locId === 'hcm' 
      ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.51786591041rem!2d106.699!3d10.776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4w!2zUXXhuq1uIDEsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s'
      : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.478201504787!2d107.79586119999999!3d11.5435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e2a77af8b06d%3A0xe7bd193c6f66bd32!2zTOG7mWMgUGjDoXQsIELhuqNvIEzhu5ljLCBMw6JtIMSQ4buTbmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1716301234567!5m2!1sen!2s'
  };

  if (!isSanityConfigured) {
    logCmsStatus('contact', false, 0);
    return defaultContact;
  }
  try {
    const data = await client.fetch<CMSContact>(contactQuery, { locationId: locId });
    const hasData = isValidObject(data);
    logCmsStatus('contact', hasData, hasData ? 1 : 0);
    return hasData ? data : defaultContact;
  } catch (error) {
    logCmsStatus('contact', false, 0, error);
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
