/**
 * Sanity GROQ Queries for local repair service applet
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

// 2. Homepage content
export const homepageQuery = `*[_type == "homepage"][0] {
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

// 4. Services
export const servicesQuery = `*[_type == "service"] | order(_createdAt asc) {
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

export const serviceBySlugQuery = `*[_type == "service" && slug == $slug][0] {
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

// 6. Blog Posts
export const postsQuery = `*[_type == "post"] | order(date desc) {
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

export const postBySlugQuery = `*[_type == "post" && slug == $slug][0] {
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

// 8. Products
export const productsQuery = `*[_type == "product"] | order(_createdAt desc) {
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

export const productBySlugQuery = `*[_type == "product" && slug == $slug][0] {
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

// 9. Pricing Entries
export const pricingQuery = `*[_type == "pricing"] | order(orderNo asc) {
  _id,
  title,
  price,
  unit,
  category,
  features,
  badge,
  orderNo
}`;

// 10. FAQs
export const faqsQuery = `*[_type == "faq"] | order(_createdAt asc) {
  _id,
  question,
  answer,
  category
}`;

// 11. Testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(rating desc, _createdAt desc) {
  _id,
  name,
  role,
  review,
  rating,
  avatar
}`;

// 12. Reviews
export const reviewsQuery = `*[_type == "review"] | order(_createdAt desc) {
  _id,
  customerName,
  comment,
  score,
  date,
  verifiedPurchase
}`;

// 13. Gallery
export const galleryQuery = `*[_type == "gallery"] | order(_createdAt desc) {
  _id,
  title,
  image,
  category,
  caption
}`;

// 14. Menu Navigation
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

// 15. Footer Content
export const footerQuery = `*[_type == "footer"][0] {
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

// 16. Banners (Top bar alerts, etc)
export const bannersQuery = `*[_type == "banner"] | order(_createdAt desc) {
  _id,
  title,
  text,
  linkText,
  linkUrl,
  isActive
}`;

// 17. Popup Promotions
export const popupsQuery = `*[_type == "popup" && isActive == true][0] {
  _id,
  title,
  subtitle,
  image,
  ctaText,
  ctaLink,
  delaySeconds,
  isActive
}`;

// 18. SEO Meta
export const seoQuery = `*[_type == "seo" && pagePath == $path][0] {
  _id,
  pagePath,
  metaTitle,
  metaDescription,
  canonicalUrl,
  ogImage,
  keywords[]
}`;

// 19. Local Business Structured Data
export const localBusinessQuery = `*[_type == "localBusiness"][0] {
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

// 20. Site Settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  _id,
  siteName,
  tagline,
  logo,
  favicon,
  mainHotline,
  mainZalo,
  headerNotice
}`;

// 21. Contact Inquiries / Details
export const contactQuery = `*[_type == "contact"][0] {
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
