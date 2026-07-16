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
  "image": coalesce(image.asset->url, image),
  "slug": slug.current
}`;

// 2. Homepage content per location
export const homepageQuery = `*[_type == "homepage" && location->slug.current == $locationSlug] | order(_createdAt desc)[0] {
  _id,
  heroTitle,
  heroSubtitle,
  heroOverlayText,
  heroVideoUrl,
  ctaText,
  ctaLink,
  servicesHeading,
  servicesSubtitle,
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
  "aboutImage": coalesce(aboutImage.asset->url, aboutImage),
  benefitHeading,
  benefits[],
  sections[] {
    _type,
    _key,
    isActive,
    heading,
    subheading,
    heroTitle,
    heroSubtitle,
    heroOverlayText,
    heroVideoUrl,
    ctaText,
    ctaLink,
    phone
  }
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
export const servicesQuery = `*[_type == "service" && location->slug.current == $locationSlug] | order(_createdAt asc) {
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
  "image": coalesce(image.asset->url, image),
  benefits,
  faq[] {
    question,
    answer
  },
  isPinned,
  order
}`;

export const serviceBySlugQuery = `*[_type == "service" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
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
  "image": coalesce(image.asset->url, image),
  benefits,
  faq[] {
    question,
    answer
  },
  isPinned,
  order
}`;

// 5. Post Categories
export const postCategoriesQuery = `*[_type == "postCategory"] {
  _id,
  id,
  title,
  icon
}`;

// 6. Blog Posts per location
export const postsQuery = `*[_type == "post" && location->slug.current == $locationSlug] | order(date desc) {
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
    "avatar": coalesce(avatar.asset->url, avatar)
  },
  "image": coalesce(mainImage.asset->url, image.asset->url, image),
  readTime,
  tags,
  faq[] {
    question,
    answer
  }
}`;

export const postBySlugQuery = `*[_type == "post" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
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
    "avatar": coalesce(avatar.asset->url, avatar)
  },
  "image": coalesce(mainImage.asset->url, image.asset->url, image),
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
export const productsQuery = `*[_type == "product" && location->slug.current == $locationSlug] | order(_createdAt desc) {
  _id,
  id,
  slug,
  name,
  category,
  description,
  price,
  "image": coalesce(productImage.asset->url, image.asset->url, image),
  features,
  specs,
  content
}`;

export const productBySlugQuery = `*[_type == "product" && (slug == $slug || slug.current == $slug) && location->slug.current == $locationSlug][0] {
  _id,
  id,
  slug,
  name,
  category,
  description,
  price,
  "image": coalesce(productImage.asset->url, image.asset->url, image),
  features,
  specs,
  content
}`;

// Projects per location
export const projectsQuery = `*[_type == "project" && $locationSlug in locations] | order(order asc, _createdAt desc) {
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  description,
  "shortDescription": description,
  "image": coalesce(mainImage.asset->url, image.asset->url, image),
  "category": category->title,
  location,
  completionDate,
  "gallery": coalesce(gallery[].asset->url, gallery),
  order
}`;

export const projectBySlugQuery = `*[_type == "project" && (slug == $slug || slug.current == $slug) && $locationSlug in locations][0] {
  _id,
  "id": _id,
  "slug": slug.current,
  title,
  description,
  "shortDescription": description,
  content,
  "image": coalesce(mainImage.asset->url, image.asset->url, image),
  "category": category->title,
  location,
  completionDate,
  "gallery": coalesce(gallery[].asset->url, gallery),
  order
}`;

// 9. Pricing Entries per location
export const pricingQuery = `*[_type == "pricing" && location->slug.current == $locationSlug] | order(orderNo asc) {
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
export const faqsQuery = `*[_type == "faq" && location->slug.current == $locationSlug] | order(_createdAt asc) {
  _id,
  question,
  answer,
  category
}`;

// 11. Testimonials per location
export const testimonialsQuery = `*[_type == "testimonial" && location->slug.current == $locationSlug] | order(rating desc, _createdAt desc) {
  _id,
  "name": coalesce(customerName, name),
  "role": coalesce(customerRole, role),
  "review": coalesce(content, review),
  rating,
  "avatar": coalesce(avatar.asset->url, avatar)
}`;

// 12. Reviews per location
export const reviewsQuery = `*[_type == "review" && location->slug.current == $locationSlug] | order(_createdAt desc) {
  _id,
  customerName,
  comment,
  score,
  date,
  verifiedPurchase
}`;

// 13. Gallery per location
export const galleryQuery = `*[_type == "gallery" && location->slug.current == $locationSlug] | order(_createdAt desc) {
  _id,
  title,
  "image": coalesce(image.asset->url, image),
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

// 15. Footer Content (Location-specific)
export const footerQuery = `*[_type == "footer" && location->slug.current == $locationSlug] | order(_createdAt desc)[0] {
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
export const bannersQuery = `*[_type == "banner" && location->slug.current == $locationSlug] | order(_createdAt desc) {
  _id,
  title,
  text,
  linkText,
  linkUrl,
  isActive
}`;

// 17. Popup Promotions per location
export const popupsQuery = `*[_type == "popup" && isActive == true && location->slug.current == $locationSlug][0] {
  _id,
  title,
  subtitle,
  "image": coalesce(image.asset->url, image),
  ctaText,
  ctaLink,
  delaySeconds,
  isActive
}`;

// 18. SEO Meta per path and location
export const seoQuery = `*[_type == "seo" && pagePath == $path && location->slug.current == $locationSlug][0] {
  _id,
  pagePath,
  metaTitle,
  metaDescription,
  canonicalUrl,
  "ogImage": coalesce(ogImage.asset->url, ogImage),
  keywords[]
}`;

// 19. Local Business per location
export const localBusinessQuery = `*[_type == "localBusiness" && location->slug.current == $locationSlug][0] {
  _id,
  name,
  legalName,
  "logo": coalesce(logo.asset->url, logo),
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

// 20. Site Settings per location
export const siteSettingsQuery = `*[_type == "siteSettings" && location->slug.current == $locationSlug][0] {
  _id,
  siteName,
  tagline,
  "logo": coalesce(logo.asset->url, logo),
  "favicon": coalesce(favicon.asset->url, favicon),
  mainHotline,
  mainZalo,
  headerNotice
}`;

// 21. Contact settings per location
export const contactQuery = `*[_type == "contact" && location->slug.current == $locationSlug][0] {
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
