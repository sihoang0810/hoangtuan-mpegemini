import { createClient } from '@sanity/client';
import * as LucideIcons from 'lucide-react';
import React from 'react';

const devLog = (...args: any[]) => {
  // @ts-ignore
  if (import.meta.env.DEV) console.log(...args);
};

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
import { LOCALIZED_HOME as raw_LOCALIZED_HOME } from '../data/localizedHome';
import { LOCALIZED_FAQS as raw_LOCALIZED_FAQS } from '../data/localizedFaqs';
import { LOCALIZED_REVIEWS as raw_LOCALIZED_REVIEWS, LOCALIZED_TESTIMONIALS as raw_LOCALIZED_TESTIMONIALS } from '../data/localizedReviews';
import { LOCALIZED_SEO as raw_LOCALIZED_SEO, LOCALIZED_BUSINESS_SCHEMA as raw_LOCALIZED_BUSINESS_SCHEMA, LOCALIZED_CONTACT as raw_LOCALIZED_CONTACT, LOCALIZED_SITE_SETTINGS as raw_LOCALIZED_SITE_SETTINGS } from '../data/localizedSeo';
import { LOCALIZED_SERVICES as raw_LOCALIZED_SERVICES } from '../data/localizedServices';
import { LOCALIZED_PRODUCTS as raw_LOCALIZED_PRODUCTS } from '../data/localizedProducts';
import { LOCALIZED_BLOGS as raw_LOCALIZED_BLOGS } from '../data/localizedBlog';

// Proxy wrapper for transparently accommodating canonical slugs
const wrapLocalized = <T extends Record<string, any>>(obj: T): T => {
  return new Proxy(obj, {
    get(target, prop) {
      if (typeof prop === 'string') {
        const mappedKey = prop === 'ho-chi-minh' || prop === 'hcm' || prop === 'hochiminh' ? 'ho-chi-minh' : 'bao-loc';
        return target[mappedKey];
      }
      return Reflect.get(target, prop);
    }
  });
};

const LOCALIZED_HOME = wrapLocalized(raw_LOCALIZED_HOME);
const LOCALIZED_FAQS = wrapLocalized(raw_LOCALIZED_FAQS);
const LOCALIZED_REVIEWS = wrapLocalized(raw_LOCALIZED_REVIEWS);
const LOCALIZED_TESTIMONIALS = wrapLocalized(raw_LOCALIZED_TESTIMONIALS);
const LOCALIZED_SEO = wrapLocalized(raw_LOCALIZED_SEO);
const LOCALIZED_BUSINESS_SCHEMA = wrapLocalized(raw_LOCALIZED_BUSINESS_SCHEMA);
const LOCALIZED_CONTACT = wrapLocalized(raw_LOCALIZED_CONTACT);
const LOCALIZED_SITE_SETTINGS = wrapLocalized(raw_LOCALIZED_SITE_SETTINGS);
const LOCALIZED_SERVICES = wrapLocalized(raw_LOCALIZED_SERVICES);
const LOCALIZED_PRODUCTS = wrapLocalized(raw_LOCALIZED_PRODUCTS);
const LOCALIZED_BLOGS = wrapLocalized(raw_LOCALIZED_BLOGS);

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
  servicesHeading?: string;
  servicesSubtitle?: string;
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
  sections?: any[];
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
  isPinned?: boolean;
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
  category: string;
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
  isPinned?: boolean;
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
  category: 'electrical' | 'plumbing' | 'camera' | 'leak-detection' | 'detection';
  description: string;
  price: string;
  image: string;
  features?: string[];
  specs?: { [key: string]: string };
  gallery?: string[];
  isPinned?: boolean;
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
  areaServed?: {
    districts: string[];
  };
  priceRange?: string;
  openingHoursSpecification?: {
    dayOfWeek?: string | string[];
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

// @ts-ignore
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;
// @ts-ignore
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';

// We check if projectId is valid or empty/default setting
const isSanityConfigured = !!(
  projectId &&
  projectId !== '' &&
  projectId !== 'placeholder-id' &&
  projectId.length > 5
);

devLog('%c[SANITY CONFIG STATUS]', 'background: #4f46e5; color: white; font-weight: bold; padding: 4px 8px; border-radius: 4px;', {
  projectId,
  dataset,
  isSanityConfigured,
  message: isSanityConfigured ? 'Sanity is active and initialized.' : 'Sanity is NOT configured correctly. Using offline fallback.'
});

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder-id',
  dataset: dataset,
  // @ts-ignore
  useCdn: import.meta.env.PROD || true, // Enable optimal CDN edge caching in production
  apiVersion: '2026-05-21', // Use current ISO date
});

// Helper validation checker
const isValidArray = (arr: any) => Array.isArray(arr) && arr.length > 0;
const isValidObject = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

/**
 * Helper to append Sanity image transformation parameters for optimization.
 */
export function getSanityImageUrl(url: string | undefined, width?: number, quality: number = 80): string {
  if (!url) return 'https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=1200';
  if (!url.includes('cdn.sanity.io')) return url;
  
  const params = new URLSearchParams();
  if (width) params.append('w', width.toString());
  params.append('q', quality.toString());
  params.append('auto', 'format');
  params.append('fit', 'crop');
  
  return `${url}${url.includes('?') ? '&' : '?'}${params.toString()}`;
}

/**
 * Generates a srcset string for responsive Sanity images.
 */
export function getSanitySrcSet(url: string | undefined): string {
  if (!url || !url.includes('cdn.sanity.io')) return '';
  const widths = [320, 640, 768, 1024, 1280, 1536];
  return widths.map(w => `${getSanityImageUrl(url, w)} ${w}w`).join(', ');
}

// Helper to convert canonical slug to fallback data keys ('ho-chi-minh' or 'bao-loc')
export function getFallbackKey(locId: string): 'bao-loc' | 'ho-chi-minh' {
  if (locId === 'ho-chi-minh' || locId === 'hochiminh' || locId === 'hcm') return 'ho-chi-minh';
  return 'bao-loc';
}

// Single helper requested by user returning strictly 'bao-loc' or 'ho-chi-minh'
export function getCurrentLocationSlug(): 'bao-loc' | 'ho-chi-minh' {
  if (typeof window === 'undefined') return 'bao-loc';
  
  const pathParts = window.location.pathname.split('/');
  const prefix = pathParts[1]; // e.g. 'bao-loc' or 'ho-chi-minh'
  
  let detectedId: 'bao-loc' | 'ho-chi-minh' = 'bao-loc';
  if (prefix === 'ho-chi-minh' || prefix === 'hochiminh' || prefix === 'hcm') {
    detectedId = 'ho-chi-minh';
  } else if (prefix === 'bao-loc' || prefix === 'baoloc' || prefix === 'bao_loc') {
    detectedId = 'bao-loc';
  } else {
    // Try localStorage fallback
    const saved = localStorage.getItem('locationSlug');
    if (saved === 'ho-chi-minh' || saved === 'hochiminh' || saved === 'hcm' || saved === 'Hồ Chí Minh') {
      detectedId = 'ho-chi-minh';
    } else if (saved === 'bao-loc' || saved === 'baoloc' || saved === 'bao_loc' || saved === 'Bảo Lộc') {
      detectedId = 'bao-loc';
    } else {
      detectedId = 'bao-loc';
    }
  }
  
  devLog(`[LOCATION] Current location: ${detectedId}`);
  return detectedId;
}

// Dynamic location detection from URL route params or local storage
export function getCurrentLocationId(): string {
  return getCurrentLocationSlug();
}

// Diagnostic logger for connection reports and fallback indicators
function logCmsStatus(docType: string, isFromCms: boolean, count: number, err?: any) {
  if (isFromCms) {
    devLog(`%c[CMS CONNECTED] Loaded "${docType}" successfully from Sanity. Records: ${count}`, 'color: #00dd66; font-weight: bold;');
  } else {
    devLog(`%c[CMS FALLBACK] Using local fallback for "${docType}" (Reason: ${err ? err.message || err : 'Sanity returned no records or is unconfigured'}).`, 'color: #ffaa11; font-weight: bold;');
  }
}

// Safely extract a string slug from either a string or a Sanity slug object
function ensureStringSlug<T extends { slug?: any }>(item: T): T {
  if (item && item.slug && typeof item.slug === 'object' && 'current' in item.slug) {
    return { ...item, slug: item.slug.current };
  }
  return item;
}

// ---------------------------------------------------------
// Cache-First + Background Revalidation helpers
// ---------------------------------------------------------

/**
 * Interface representing a structured cache entry.
 */
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Cache TTL configuration set to 24 hours in milliseconds.
 */
const CACHE_TTL = 24 * 60 * 60 * 1000;

/**
 * Helper to check if a specific cache key has expired or is missing.
 */
function isCacheExpired(key: string): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return true;
    const item: CacheItem<any> = JSON.parse(raw);
    if (!item || typeof item.timestamp !== 'number') return true;
    return Date.now() - item.timestamp > CACHE_TTL;
  } catch {
    return true;
  }
}

/**
 * Helper to check if fresh fetched data is structurally different from cached data,
 * preventing layout shifting / unnecessary React re-renders.
 */
function isDataDifferent(a: any, b: any): boolean {
  return JSON.stringify(a) !== JSON.stringify(b);
}

/**
 * Retrieves cached services from localStorage.
 */
export function getCachedServices(forcedLocationId?: string): CMSService[] | null {
  if (typeof window === 'undefined') return null;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const raw = localStorage.getItem(`services_cache_${locId}`);
    if (!raw) return null;
    const item: CacheItem<CMSService[]> = JSON.parse(raw);
    return item.data;
  } catch (error) {
    console.warn(`Error reading services cache for ${locId} from localStorage:`, error);
    return null;
  }
}

/**
 * Saves current services to localStorage cache.
 */
export function saveServicesCache(forcedLocationId: string | undefined, data: CMSService[]): void {
  if (typeof window === 'undefined') return;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const item: CacheItem<CMSService[]> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`services_cache_${locId}`, JSON.stringify(item));
  } catch (error) {
    console.warn(`Error saving services cache for ${locId} to localStorage:`, error);
  }
}

/**
 * Retrieves cached products from localStorage.
 */
export function getCachedProducts(forcedLocationId?: string): CMSProduct[] | null {
  if (typeof window === 'undefined') return null;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const raw = localStorage.getItem(`products_cache_${locId}`);
    if (!raw) return null;
    const item: CacheItem<CMSProduct[]> = JSON.parse(raw);
    return item.data;
  } catch (error) {
    console.warn(`Error reading products cache for ${locId} from localStorage:`, error);
    return null;
  }
}

/**
 * Saves current products to localStorage cache.
 */
export function saveProductsCache(forcedLocationId: string | undefined, data: CMSProduct[]): void {
  if (typeof window === 'undefined') return;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const item: CacheItem<CMSProduct[]> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`products_cache_${locId}`, JSON.stringify(item));
  } catch (error) {
    console.warn(`Error saving products cache for ${locId} to localStorage:`, error);
  }
}

/**
 * Retrieves cached homepage content from localStorage.
 */
export function getCachedHomepage(forcedLocationId?: string): CMSHomepage | null {
  if (typeof window === 'undefined') return null;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const raw = localStorage.getItem(`homepage_cache_${locId}`);
    if (!raw) return null;
    const item: CacheItem<CMSHomepage> = JSON.parse(raw);
    return item.data;
  } catch (error) {
    console.warn(`Error reading homepage cache for ${locId} from localStorage:`, error);
    return null;
  }
}

/**
 * Saves current homepage content to localStorage cache.
 */
export function saveHomepageCache(forcedLocationId: string | undefined, data: CMSHomepage): void {
  if (typeof window === 'undefined') return;
  const locId = forcedLocationId || getCurrentLocationId();
  try {
    const item: CacheItem<CMSHomepage> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`homepage_cache_${locId}`, JSON.stringify(item));
  } catch (error) {
    console.warn(`Error saving homepage cache for ${locId} to localStorage:`, error);
  }
}


// Dynamic fallback text localizer to match active location
function localizeText(text: string, locationSlug: string): string {
  const fbk = getFallbackKey(locationSlug);
  if (fbk === 'ho-chi-minh') {
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
export function getHomepageContentSync(forcedLocationId?: string): CMSHomepage {
  const locId = forcedLocationId || getCurrentLocationSlug();
  if (isSanityConfigured) {
    const cached = getCachedHomepage(locId);
    if (cached) {
      return cached;
    }
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`homepage_cache_${locId}`);
    }
  }
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const baseData = (LOCALIZED_HOME[locId] || {
    heroTitle: isHcm ? 'CẦN THỢ ĐIỆN NƯỚC HỒ CHÍ MINH?' : 'CẦN THỢ ĐIỆN NƯỚC BẢO LỘC?',
    heroSubtitle: isHcm 
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
    aboutHeading: isHcm ? 'Về Hoàng Tuấn MPE (TP.HCM)' : 'Về Hoàng Tuấn MPE',
    aboutContent: isHcm
      ? 'Dịch vụ Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện lạnh và cung cấp thiết bị chiếu sáng, rò nước, lắp camera hàng đầu tại Hồ Chí Minh...'
      : 'Dịch vụ Hoàng Tuấn MPE tự hào là một trong những đơn vị sửa chữa cơ điện lạnh và cung cấp thiết bị chiếu sáng, rò nước, lắp camera hàng đầu tại Bảo Lộc...',
    aboutImage: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800'
  }) as CMSHomepage;

  // Live synchronization support: overlay custom edits saved offline via our Elementor Builder
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedData = parsedDb[locId];
        if (editedData) {
          return {
            ...baseData,
            heroTitle: editedData.heroTitle || baseData.heroTitle,
            heroSubtitle: editedData.heroSubtitle || baseData.heroSubtitle,
            heroOverlayText: editedData.heroOverlayText || baseData.heroOverlayText,
            aboutHeading: editedData.whyChooseUsTitle || baseData.aboutHeading,
            aboutContent: editedData.whyChooseUsSubtitle || baseData.aboutContent || baseData.aboutContent,
            stats: Array.isArray(editedData.stats) ? editedData.stats.map((s: any) => ({
              value: s.value,
              label: s.label
            })) : baseData.stats,
            features: Array.isArray(editedData.reasons) ? editedData.reasons.map((r: any) => ({
              title: r.title,
              description: r.desc,
              icon: r.icon || 'CheckCircle'
            })) : baseData.features,
            benefits: [
              editedData.badge1 || (baseData.benefits && baseData.benefits[0]) || 'Khảo sát 0đ',
              editedData.badge2 || (baseData.benefits && baseData.benefits[1]) || 'Măng máy rà siêu âm',
              editedData.badge3 || (baseData.benefits && baseData.benefits[2]) || 'Bảo hành đầy đủ',
              ...((baseData.benefits && baseData.benefits.slice(3)) || [])
            ],
            sections: editedData.sections || baseData.sections
          };
        }
      } catch (e) {
        console.warn('Could not parse live builder edits:', e);
      }
    }
  }

  return baseData;
}

export async function getHomepageContent(forcedLocationId?: string): Promise<CMSHomepage> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const currentData = getHomepageContentSync(locId);

  if (!isSanityConfigured) {
    logCmsStatus('homepage', false, 0);
    return currentData;
  }

  const cacheKey = `homepage_cache_${locId}`;
  const expired = isCacheExpired(cacheKey);

  if (!expired) {
    console.log(`%c[CACHE HIT] Homepage cache is fresh for region "${locId}". Revalidating in background to check for Sanity updates...`, 'color: #10b981; font-weight: 500;');
  }

  try {
    const data = await client.fetch<CMSHomepage>(homepageQuery, { locationSlug: locId });
    const hasData = isValidObject(data);
    console.log(`%c[SANITY FETCH HOMEPAGE] Result for "${locId}":`, 'color: #bfdbfe; background: #1e40af; font-weight: bold; padding: 2px 4px;', { hasData, data });
    logCmsStatus('homepage', hasData, hasData ? 1 : 0);

    if (hasData) {
      if (isDataDifferent(data, currentData)) {
        console.log(`%c[BACKGROUND UPDATE] Homepage data has changed on Sanity. Overwriting cache and refreshing UI.`, 'color: #3b82f6; font-weight: bold;');
        saveHomepageCache(locId, data);
        return data;
      } else {
        console.log(`%c[BACKGROUND LOG] Sanity homepage data matches current cache. Re-marking fresh timestamp.`, 'color: #64748b;');
        saveHomepageCache(locId, currentData);
        return currentData;
      }
    }
    return currentData;
  } catch (error) {
    logCmsStatus('homepage', false, 0, error);
    return currentData;
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
 * 5. Services Details filtered by location (Cache-first implementation)
 */
export function getServicesSync(forcedLocationId?: string): CMSService[] {
  const locId = forcedLocationId || getCurrentLocationSlug();
  // 1. Try reading from the localStorage cache first
  if (isSanityConfigured) {
    const cached = getCachedServices(locId);
    if (cached && cached.length > 0) {
      return cached;
    }
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`services_cache_${locId}`);
    }
  }
  // 2. Fall back to local localized schemas if cache is empty
  const baseServices = LOCALIZED_SERVICES[locId] || fallbackServices.map(mapLocalServiceToCMS).map(s => localizeService(s, locId));

  // Live synchronization support for service list edits from Elementor Builder
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedServices = parsedDb[locId]?.services;
        if (editedServices && Array.isArray(editedServices)) {
          return editedServices;
        }
      } catch (e) {
        // ignore
      }
    }
  }

  return baseServices;
}

export function getServiceBySlugSync(slug: string | undefined, forcedLocationId?: string): CMSService | null {
  const locId = forcedLocationId || getCurrentLocationSlug();
  const servicesList = getServicesSync(locId);
  return servicesList.map(ensureStringSlug).find(s => s.slug === slug) || null;
}

export async function getServices(forcedLocationId?: string): Promise<CMSService[]> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const currentData = getServicesSync(locId);
  
  // If Sanity is not configured, gracefully deliver local / cached fallback
  if (!isSanityConfigured) {
    logCmsStatus('service', false, 0);
    return currentData;
  }

  // Check cache expiration status
  const cacheKey = `services_cache_${locId}`;
  const expired = isCacheExpired(cacheKey);

  if (!expired) {
    console.log(`%c[CACHE HIT] Services cache is fresh for region "${locId}". Revalidating in background to check for Sanity updates...`, 'color: #10b981; font-weight: 500;');
  }

  try {
    // Perform background revalidation fetch directly from Sanity
    const data = await client.fetch<CMSService[]>(servicesQuery, { locationSlug: locId });
    const hasData = isValidArray(data);
    console.log(`%c[SANITY FETCH SERVICES] Result for "${locId}":`, 'color: #34d399; background: #064e3b; font-weight: bold; padding: 2px 4px;', { hasData, count: hasData ? data.length : 0, data });
    logCmsStatus('service', hasData, hasData ? data.length : 0);
    
    if (hasData) {
      const normalizedData = data.map(ensureStringSlug);
      // 3. Compare structurally to prevent UI flickering on redundant updates
      if (isDataDifferent(normalizedData, currentData)) {
        console.log(`%c[BACKGROUND UPDATE] Services data has changed on Sanity. Overwriting cache and refreshing UI.`, 'color: #3b82f6; font-weight: bold;');
        saveServicesCache(locId, normalizedData);
        return normalizedData;
      } else {
        console.log(`%c[BACKGROUND LOG] Sanity services data matches current cache. Re-marking fresh timestamp.`, 'color: #64748b;');
        // Refresh timestamp of current content to renew its TTL
        saveServicesCache(locId, currentData);
        return currentData;
      }
    }
    return currentData;
  } catch (error) {
    // Network degradation or timeout: log error and maintain cache/fallback safety
    logCmsStatus('service', false, 0, error);
    return currentData;
  }
}

export async function getServiceBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSService | null> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const foundLocal = getServiceBySlugSync(slug, locId);
  
  if (!isSanityConfigured || !slug) return foundLocal;

  // Utilize the full list cache state to skip background hit if cache is fresh
  const cacheKey = `services_cache_${locId}`;
  const expired = isCacheExpired(cacheKey);

  if (!expired) {
    console.log(`%c[CACHE HIT] Services cache is fresh for region "${locId}". Revalidating service slug "${slug}" in background...`, 'color: #10b981; font-weight: 500;');
  }

  try {
    const data = await client.fetch<CMSService>(serviceBySlugQuery, { slug, locationSlug: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`service-slug-${slug}`, hasData, hasData ? 1 : 0);
    
    if (hasData) {
      const normalized = ensureStringSlug(data);
      if (isDataDifferent(normalized, foundLocal)) {
        return normalized;
      }
      return foundLocal;
    }
    return foundLocal;
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
export function getBlogPostsSync(forcedLocationId?: string): CMSBlogPost[] {
  const locId = forcedLocationId || getCurrentLocationSlug();
  const locData = (LOCALIZED_BLOGS as any)[locId];
  const basePosts = locData && locData.posts ? locData.posts : fallbackBlogPosts.map(p => ({
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

  // Live synchronization support for blog post edits from Elementor Builder
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedPosts = parsedDb[locId]?.posts;
        if (editedPosts && Array.isArray(editedPosts)) {
          return editedPosts;
        }
      } catch (e) {
        // ignore
      }
    }
  }

  return basePosts;
}

export async function getBlogPosts(forcedLocationId?: string): Promise<CMSBlogPost[]> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const currentData = getBlogPostsSync(locId);

  if (!isSanityConfigured) {
    logCmsStatus('post', false, 0);
    return currentData;
  }
  try {
    const data = await client.fetch<CMSBlogPost[]>(postsQuery, { locationSlug: locId });
    const hasData = isValidArray(data);
    logCmsStatus('post', hasData, hasData ? data.length : 0);
    return hasData ? data.map(ensureStringSlug) : currentData;
  } catch (error) {
    logCmsStatus('post', false, 0, error);
    return currentData;
  }
}

export async function getBlogPostBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSBlogPost | null> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const postsList = getBlogPostsSync(locId);

  const foundLocal = postsList.map(ensureStringSlug).find(p => p.slug === slug) || null;
  if (!isSanityConfigured || !slug) return foundLocal;
  try {
    const data = await client.fetch<CMSBlogPost>(postBySlugQuery, { slug, locationSlug: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`post-slug-${slug}`, hasData, hasData ? 1 : 0);
    return hasData ? ensureStringSlug(data) : foundLocal;
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
  const withSpecs = { ...p };
  if (Array.isArray(p.specs)) {
    const mappedSpecs: { [key: string]: string } = {};
    p.specs.forEach((item: any) => {
      if (item && typeof item === 'object' && item.key) {
        mappedSpecs[item.key] = item.value || '';
      }
    });
    withSpecs.specs = mappedSpecs;
  }
  return ensureStringSlug(withSpecs);
}

export function getProductsSync(forcedLocationId?: string): CMSProduct[] {
  const locId = forcedLocationId || getCurrentLocationSlug();
  // 1. Try reading from products localStorage cache first
  if (isSanityConfigured) {
    const cached = getCachedProducts(locId);
    if (cached && cached.length > 0) {
      return cached;
    }
  } else {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(`products_cache_${locId}`);
    }
  }
  // 2. Fall back to local localized schemas if cache is empty
  const baseProducts = LOCALIZED_PRODUCTS[locId] || fallbackProducts.map(p => ({
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

  // Live synchronization support for product list edits from Elementor Builder
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedProducts = parsedDb[locId]?.products;
        if (editedProducts && Array.isArray(editedProducts)) {
          return editedProducts;
        }
      } catch (e) {
        // ignore
      }
    }
  }

  return baseProducts;
}

export function getProductBySlugSync(slug: string | undefined, forcedLocationId?: string): CMSProduct | null {
  const list = getProductsSync(forcedLocationId);
  return list.map(ensureStringSlug).find(p => p.slug === slug) || null;
}

export async function getProducts(forcedLocationId?: string): Promise<CMSProduct[]> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const currentData = getProductsSync(locId);

  // If Sanity is not configured, deliver fallback/cached products
  if (!isSanityConfigured) {
    logCmsStatus('product', false, 0);
    return currentData;
  }

  // Check cache expiration status
  const cacheKey = `products_cache_${locId}`;
  const expired = isCacheExpired(cacheKey);

  if (!expired) {
    console.log(`%c[CACHE HIT] Products cache is fresh for region "${locId}". Revalidating in background to check for Sanity updates...`, 'color: #10b981; font-weight: 500;');
  }

  try {
    // Perform background revalidation fetch directly from Sanity
    const data = await client.fetch<CMSProduct[]>(productsQuery, { locationSlug: locId });
    const hasData = isValidArray(data);
    console.log(`%c[SANITY FETCH PRODUCTS] Result for "${locId}":`, 'color: #f43f5e; background: #4c0519; font-weight: bold; padding: 2px 4px;', { hasData, count: hasData ? data.length : 0, data });
    logCmsStatus('product', hasData, hasData ? data.length : 0);

    if (hasData) {
      const normalized = data.map(normalizeProductSpecs);
      // 3. Compare structurally to prevent UI flickering on redundant updates
      if (isDataDifferent(normalized, currentData)) {
        console.log(`%c[BACKGROUND UPDATE] Products data has changed on Sanity. Overwriting cache and refreshing UI.`, 'color: #3b82f6; font-weight: bold;');
        saveProductsCache(locId, normalized);
        return normalized;
      } else {
        console.log(`%c[BACKGROUND LOG] Sanity products data matches current cache. Re-marking fresh timestamp.`, 'color: #64748b;');
        // Refresh timestamp of current content to renew its TTL
        saveProductsCache(locId, currentData);
        return currentData;
      }
    }
    return currentData;
  } catch (error) {
    // Network degradation or timeout: log error and maintain cache/fallback safety
    logCmsStatus('product', false, 0, error);
    return currentData;
  }
}

export async function getProductBySlug(slug: string | undefined, forcedLocationId?: string): Promise<CMSProduct | null> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const foundLocal = getProductBySlugSync(slug, locId);

  if (!isSanityConfigured || !slug) return foundLocal;

  // Utilize the full list cache state to skip background hit if cache is fresh
  const cacheKey = `products_cache_${locId}`;
  const expired = isCacheExpired(cacheKey);

  if (!expired) {
    console.log(`%c[CACHE HIT] Products cache is fresh for region "${locId}". Revalidating product slug "${slug}" in background...`, 'color: #10b981; font-weight: 500;');
  }

  try {
    const data = await client.fetch<CMSProduct>(productBySlugQuery, { slug, locationSlug: locId });
    const hasData = isValidObject(data);
    logCmsStatus(`product-slug-${slug}`, hasData, hasData ? 1 : 0);

    if (hasData) {
      const normalized = normalizeProductSpecs(data);
      if (isDataDifferent(normalized, foundLocal)) {
        return normalized;
      }
      return foundLocal;
    }
    return foundLocal;
  } catch (error) {
    logCmsStatus(`product-slug-${slug}`, false, 0, error);
    return foundLocal;
  }
}

/**
 * 10. Pricing Entries filtered by location
 */
export async function getPricing(forcedLocationId?: string): Promise<CMSPricing[]> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
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
    const data = await client.fetch<CMSPricing[]>(pricingQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  let localFaqsMapped: CMSFaq[] = LOCALIZED_FAQS[locId] || fallbackFaqs.map(f => ({
    question: localizeText(f.question, locId),
    answer: localizeText(f.answer, locId),
    category: 'Chung'
  }));

  // Synchronize dynamic offline visual edits for FAQS
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedData = parsedDb[locId];
        if (editedData && Array.isArray(editedData.faqs)) {
          localFaqsMapped = editedData.faqs.map((f: any) => ({
            question: f.question,
            answer: f.answer,
            category: 'Chung'
          }));
        }
      } catch (e) {
        // ignore
      }
    }
  }

  if (!isSanityConfigured) {
    logCmsStatus('faq', false, 0);
    return localFaqsMapped;
  }
  try {
    const data = await client.fetch<CMSFaq[]>(faqsQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
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
    const data = await client.fetch<CMSTestimonial[]>(testimonialsQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const fallbackReviews: CMSReview[] = LOCALIZED_REVIEWS[locId] || [
    { customerName: 'Chị Lan', comment: localizeText('Rất chuyên nghiệp và nhiệt tình tại Bảo Lộc', locId), score: 5, date: '2026-05-18', verifiedPurchase: true },
    { customerName: 'Anh Hà', comment: getFallbackKey(locId) === 'ho-chi-minh' ? 'Thợ nhanh có mặt đúng 20 phút ở Sài Gòn' : 'Thợ nhanh có mặt đúng 20 phút ở Bảo Lộc', score: 5, date: '2026-05-15', verifiedPurchase: true }
  ];

  if (!isSanityConfigured) {
    logCmsStatus('review', false, 0);
    return fallbackReviews;
  }
  try {
    const data = await client.fetch<CMSReview[]>(reviewsQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const fallbackGalleries: CMSGallery[] = [
    { 
      title: getFallbackKey(locId) === 'ho-chi-minh' ? 'Thi công lắp đặt điện Hồ Chí Minh' : 'Thi công lắp đặt điện Bảo Lộc', 
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
    const data = await client.fetch<CMSGallery[]>(galleryQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  
  const fallbackFooterContent: CMSFooter = {
    companyName: isHcm ? 'Công Ty Hoàng Tuấn MPE (Chi nhánh TP.HCM)' : 'Công Ty Hoàng Tuấn MPE',
    shortAbout: isHcm
      ? 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực TP. Hồ Chí Minh.'
      : 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực Bảo Lộc, Lâm Đồng.',
    address: isHcm ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng",
    phone: '0389 011 315',
    email: 'hoangtuanmpe@gmail.com',
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
    const data = await client.fetch<CMSFooter>(footerQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const defaultBanner: CMSBanner[] = [
    { 
      title: 'Notice 24/7', 
      text: isHcm 
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
    const data = await client.fetch<CMSBanner[]>(bannersQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const defaultPopup: CMSPopup = {
    title: 'GIẢM GIÁ 10%',
    subtitle: isHcm ? 'Ưu đãi cho khách hàng gọi sửa chữa điện nước tại Hồ Chí Minh tuần này!' : 'Ưu đãi cho khách hàng gọi lắp đặt thiết bị điện nước Bảo Lộc tuần này!',
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
    const data = await client.fetch<CMSPopup>(popupsQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  devLog(`[LOCATION] Current location: ${locId}`);
  devLog(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const locName = isHcm ? 'Hồ Chí Minh (TP.HCM)' : 'Bảo Lộc Lâm Đồng';
  
  let defaultSeo: CMSSeo = {
    pagePath: path,
    metaTitle: `Hoàng Tuấn MPE | Thợ Điện Nước & Camera Lắp đặt tại ${locName}`,
    metaDescription: `Dịch vụ sửa chữa điện nước khẩn cấp 24/7 tận nhà, siêu âm rò rỉ nước không đục phá và lắp đặt camera an ninh chính hãng chuyên nghiệp tại ${locName}.`,
    keywords: isHcm 
      ? ['thợ điện hồ chí minh', 'sửa điện nước sài gòn', 'dò tìm rò rỉ nước tphcm', 'lắp camera hcm'] 
      : ['thợ điện bảo lộc', 'sửa điện nước lâm đồng', 'dò tìm rò rỉ nước', 'lắp camera bảo lộc']
  };

  // ✅ THÊM: Strip location prefix khỏi path trước khi lookup
  const LOCATION_PREFIXES = ['/bao-loc', '/ho-chi-minh', '/hcm', '/baoloc'];
  let cleanPath = path;
  for (const prefix of LOCATION_PREFIXES) {
    if (cleanPath.startsWith(prefix)) {
      cleanPath = cleanPath.slice(prefix.length) || '/';
      break;
    }
  }

  if (LOCALIZED_SEO[locId]) {
    if (LOCALIZED_SEO[locId][cleanPath]) {
      defaultSeo = {
        ...LOCALIZED_SEO[locId][cleanPath],
        pagePath: path
      };
    } else {
      const parts = cleanPath.split('/');
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
              canonicalUrl: `https://hoangtuanmpe.com/${getFallbackKey(locId) === 'ho-chi-minh' ? 'ho-chi-minh' : 'bao-loc'}/dich-vu/${slug}`,
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
              canonicalUrl: `https://hoangtuanmpe.com/${getFallbackKey(locId) === 'ho-chi-minh' ? 'ho-chi-minh' : 'bao-loc'}/san-pham/${slug}`,
              ogImage: prd.image,
              keywords: prd.features
            };
          }
        } else if (type === 'blog') {
          const locData = (LOCALIZED_BLOGS as any)[locId];
          const postsList: CMSBlogPost[] = locData && locData.posts ? locData.posts : [];
          const blg = postsList.find(b => b.slug === slug);
          if (blg) {
            defaultSeo = {
              pagePath: path,
              metaTitle: blg.title,
              metaDescription: blg.excerpt,
              canonicalUrl: `https://hoangtuanmpe.com/${getFallbackKey(locId) === 'ho-chi-minh' ? 'ho-chi-minh' : 'bao-loc'}/blog/${slug}`,
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
    devLog(`%c[SEO] Custom SEO metadata resolved for path "${path}" at "${locId}": ${seo.metaTitle}`, 'color: #f43f5e; font-weight: bold;');
    return seo;
  };

  if (!isSanityConfigured) {
    logCmsStatus('seo', false, 0);
    return logAndAddMeta(defaultSeo);
  }
  try {
    const data = await client.fetch<CMSSeo>(seoQuery, { path, locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  
  const fallbackBiz: CMSLocalBusiness = LOCALIZED_BUSINESS_SCHEMA[locId] || {
    name: isHcm ? 'Hoàng Tuấn MPE - Chi Nhánh Hồ Chí Minh' : 'Hoàng Tuấn MPE - Trụ Sở Bảo Lộc',
    legalName: isHcm ? 'Hoàng Tuấn MPE Cơ Điện (TP.HCM)' : 'Hoàng Tuấn MPE Cơ Điện',
    telephone: '0389011315',
    address: isHcm ? {
      streetAddress: '528/17 Tô Ngọc Vân',
      addressLocality: 'Tam Bình, Thủ Đức',
      addressRegion: 'TP. Hồ Chí Minh',
      postalCode: '70000',
      addressCountry: 'VN'
    } : {
      streetAddress: "279 B'Lao Sire",
      addressLocality: 'Phường 3, Bảo Lộc',
      addressRegion: 'Lâm Đồng',
      postalCode: '67000',
      addressCountry: 'VN'
    },
    geo: isHcm ? {
      latitude: 10.776,
      longitude: 106.701
    } : {
      latitude: 11.545,
      longitude: 107.808
    },
    priceRange: '$$',
    openingHoursSpecification: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '00:00', closes: '23:59' }
    ]
  };

  if (!isSanityConfigured) {
    logCmsStatus('localBusiness', false, 0);
    return fallbackBiz;
  }
  try {
    const data = await client.fetch<CMSLocalBusiness>(localBusinessQuery, { locationSlug: locId });
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
  const locId = forcedLocationId || getCurrentLocationSlug();
  console.log(`[LOCATION] Current location: ${locId}`);
  console.log(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const locName = isHcm ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const defaultSettings: CMSSiteSettings = LOCALIZED_SITE_SETTINGS[locId] || {
    siteName: 'Hoàng Tuấn MPE',
    tagline: `Điện nước & Camera chính hãng, siêu âm dò tìm rò rỉ nước 24/7 tại ${locName}`,
    mainHotline: '0389 011 315',
    mainZalo: 'https://zalo.me/0389011315',
    headerNotice: `Hỗ trợ khẩn cấp 24/7: Thợ lành nghề có mặt sau 30 phút tại ${locName}!`
  };

  if (!isSanityConfigured) return defaultSettings;
  try {
    const data = await client.fetch<CMSSiteSettings>(siteSettingsQuery, { locationSlug: locId });
    return isValidObject(data) ? data : defaultSettings;
  } catch (error) {
    return defaultSettings;
  }
}

/**
 * 22. Contact specifications
 */
export async function getContact(forcedLocationId?: string): Promise<CMSContact> {
  const locId = forcedLocationId || getCurrentLocationSlug();
  devLog(`[LOCATION] Current location: ${locId}`);
  devLog(`[CMS QUERY] locationSlug: ${locId}`);
  const isHcm = getFallbackKey(locId) === 'ho-chi-minh';
  const locName = isHcm ? 'Hồ Chí Minh' : 'Bảo Lộc';
  
  const defaultContact: CMSContact = LOCALIZED_CONTACT[locId] || {
    pageTitle: `${isHcm ? 'Hồ Chí Minh' : 'Bảo Lộc'} - Kết nối with Hoàng Tuấn MPE`,
    pageSubtitle: `Đội ngũ trực điện nước luôn sẵn sàng phục vụ quý khách tại ${locName} và khu vực lân cận. Đừng ngần ngại liên lạc qua hotline 24/7 hoặc tin nhắn Zalo.`,
    contactFields: [
      { icon: 'Phone', label: 'Điện thoại 24/7', val: '0389 011 315', desc: 'Có mặt ngay sau 30 phút' },
      { icon: 'MessageSquare', label: 'Zalo Chat', val: '0389011315', desc: 'Nhận báo giá và khảo sát ảnh tư vấn miễn phí' },
      { icon: 'MapPin', label: 'Địa chỉ phục vụ', val: isHcm ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng" },
      { icon: 'Clock', label: 'Giờ làm việc', val: 'Mở cửa 24H ngày đêm, kể cả lễ và Tết nguyên đán' }
    ],
    mapEmbedUrl: isHcm 
      ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.518!2d106.69841!3d10.77636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527f0de0e3e8d%3A0x1c6f5e5e8e8e8e8e!2zNTI4LzE3IFTDkyBOZ+G7jWMgVsOibiwgVGFtIELDrG5oLCBUaOG7pyDEkOG7qWMsIFRQLiBIQ00!5e0!3m2!1svi!2svn!4v1716301234567!5m2!1svi!2svn'
      : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15582.478!2d107.79586!3d11.5435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3173e2a77af8b06d%3A0xe7bd193c6f66bd32!2zQuG6o28gTOG7mWMsIEzDom0gxJDhu5NuZywgVmlldG5hbQ!5e0!3m2!1svi!2svn!4v1716301234568!5m2!1svi!2svn'
  };

  // Live synchronization support from Elementor Builder for Contact Page
  if (typeof window !== 'undefined') {
    const savedHtmlEdits = localStorage.getItem('SANITY_MOCK_ELEMENTOR_DB');
    if (savedHtmlEdits) {
      try {
        const parsedDb = JSON.parse(savedHtmlEdits);
        const editedContact = parsedDb[locId]?.contact;
        if (editedContact) {
          defaultContact.pageTitle = editedContact.pageTitle || defaultContact.pageTitle;
          defaultContact.pageSubtitle = editedContact.pageSubtitle || defaultContact.pageSubtitle;
          if (Array.isArray(editedContact.contactFields)) {
            defaultContact.contactFields = editedContact.contactFields;
          }
        }
      } catch (e) {
        // ignore
      }
    }
  }

  if (!isSanityConfigured) {
    logCmsStatus('contact', false, 0);
    return defaultContact;
  }
  try {
    const data = await client.fetch<CMSContact>(contactQuery, { locationSlug: locId });
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
