/**
 * Sanity GROQ Queries for Hoàng Tuấn MPE - Multi-Location Architecture
 */

// 1. Locations
export const locationsQuery = `*[_type == "location"] | order(id asc) {
  _id,
  id,
  name,
  hotline,
  description,
  image
}`;

// 2. Homepage content per location
export const homepageQuery = `*[_type == "homepage" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId || !defined(location))] | order(_createdAt desc)[0] {
  _id,
  heroTitle,
  heroSubtitle,
  heroOverlayText,
  heroVideoUrl,
  ctaText,
  ctaLink,
  features[] {
    title,
    description,
    icon
  },
  stats[] {
    value,
    label
  },
  aboutHeading,
  aboutContent,
  aboutImage,
  benefitHeading,
  benefits[]
}`;

// 3. Service Categories
export const serviceCategoriesQuery = `*[_type == "serviceCategory"] | order(id asc) {
  _id,
  id,
  title,
  description,
  icon,
  color
}`;

// 4. Services per location
export const servicesQuery = `*[_type == "service" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt asc) {
  _id,
  id,
  slug,
  title,
  shortDescription,
  fullDescription,
  icon,
  category,
  features,
  pricing[] {
    item,
    price,
    unit
  },
  image,
  benefits,
  faq[] {
    question,
    answer
  }
}`;

export const serviceBySlugQuery = `*[_type == "service" && (slug == $slug || slug.current == $slug) && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  id,
  slug,
  title,
  shortDescription,
  fullDescription,
  icon,
  category,
  features,
  pricing[] {
    item,
    price,
    unit
  },
  image,
  benefits,
  faq[] {
    question,
    answer
  }
}`;

// 5. Post Categories
export const postCategoriesQuery = `*[_type == "postCategory"] {
  _id,
  id,
  title,
  icon
}`;

// 6. Blog Posts per location
export const postsQuery = `*[_type == "post" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(date desc) {
  _id,
  id,
  slug,
  title,
  excerpt,
  content,
  category,
  date,
  author {
    name,
    role,
    avatar
  },
  image,
  readTime,
  tags,
  faq[] {
    question,
    answer
  }
}`;

export const postBySlugQuery = `*[_type == "post" && (slug == $slug || slug.current == $slug) && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  id,
  slug,
  title,
  excerpt,
  content,
  category,
  date,
  author {
    name,
    role,
    avatar
  },
  image,
  readTime,
  tags,
  faq[] {
    question,
    answer
  }
}`;

// 7. Product Categories
export const productCategoriesQuery = `*[_type == "productCategory"] | order(_createdAt asc) {
  _id,
  id,
  title,
  description,
  icon
}`;

// 8. Products per location
export const productsQuery = `*[_type == "product" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt desc) {
  _id,
  id,
  slug,
  name,
  category,
  description,
  price,
  image,
  features,
  specs
}`;

export const productBySlugQuery = `*[_type == "product" && (slug == $slug || slug.current == $slug) && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  id,
  slug,
  name,
  category,
  description,
  price,
  image,
  features,
  specs
}`;

// 9. Pricing Entries per location
export const pricingQuery = `*[_type == "pricing" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId || !defined(location))] | order(orderNo asc) {
  _id,
  title,
  price,
  unit,
  category,
  features,
  badge,
  orderNo
}`;

// 10. FAQs per location
export const faqsQuery = `*[_type == "faq" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt asc) {
  _id,
  question,
  answer,
  category
}`;

// 11. Testimonials per location
export const testimonialsQuery = `*[_type == "testimonial" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(rating desc, _createdAt desc) {
  _id,
  name,
  role,
  review,
  rating,
  avatar
}`;

// 12. Reviews per location
export const reviewsQuery = `*[_type == "review" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt desc) {
  _id,
  customerName,
  comment,
  score,
  date,
  verifiedPurchase
}`;

// 13. Gallery per location
export const galleryQuery = `*[_type == "gallery" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt desc) {
  _id,
  title,
  image,
  category,
  caption
}`;

// 14. Menu Navigation (Global with fallback)
export const menusQuery = `*[_type == "menu"] | order(orderNo asc) {
  _id,
  title,
  path,
  icon,
  orderNo,
  subItems[] {
    title,
    path
  }
}`;

// 15. Footer Content (Location-specific or fallback global)
export const footerQuery = `*[_type == "footer" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId || !defined(location))] | order(_createdAt desc)[0] {
  _id,
  companyName,
  shortAbout,
  address,
  phone,
  email,
  workingHours,
  socialLinks {
    facebook,
    youtube,
    zalo
  },
  copyrightText
}`;

// 16. Banners per location
export const bannersQuery = `*[_type == "banner" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)] | order(_createdAt desc) {
  _id,
  title,
  text,
  linkText,
  linkUrl,
  isActive
}`;

// 17. Popup Promotions per location
export const popupsQuery = `*[_type == "popup" && isActive == true && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  title,
  subtitle,
  image,
  ctaText,
  ctaLink,
  delaySeconds,
  isActive
}`;

// 18. SEO Meta per path and location
export const seoQuery = `*[_type == "seo" && pagePath == $path && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  pagePath,
  metaTitle,
  metaDescription,
  canonicalUrl,
  ogImage,
  keywords[]
}`;

// 19. Local Business per location
export const localBusinessQuery = `*[_type == "localBusiness" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  name,
  legalName,
  logo,
  telephone,
  address {
    streetAddress,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry
  },
  geo {
    latitude,
    longitude
  },
  priceRange,
  openingHoursSpecification[] {
    dayOfWeek,
    opens,
    closes
  }
}`;

// 20. Site Settings per location or global fallback
export const siteSettingsQuery = `*[_type == "siteSettings" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId || !defined(location))] | order(_createdAt desc)[0] {
  _id,
  siteName,
  tagline,
  logo,
  favicon,
  mainHotline,
  mainZalo,
  headerNotice
}`;

// 21. Contact settings per location
export const contactQuery = `*[_type == "contact" && (location->id == $locationId || location._ref == $locationId || location._ref == "location-" + $locationId)][0] {
  _id,
  pageTitle,
  pageSubtitle,
  contactFields[] {
    icon,
    label,
    val,
    desc
  },
  mapEmbedUrl
}`;
