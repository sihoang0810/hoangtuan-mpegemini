/**
 * Sanity Studio Schema Definitions for Hoàng Tuấn MPE
 * This file serves as documentation and the structural standard 
 * for setting up the Sanity Studio schemas.
 */

export const locationSchema = {
  name: 'location',
  title: 'Location (Địa điểm)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Location ID (e.g., baoloc)', type: 'string' },
    { name: 'name', title: 'Location Name (Tên)', type: 'string' },
    { name: 'hotline', title: 'Hotline', type: 'string' },
    { name: 'description', title: 'Description (Mô tả)', type: 'text' },
    { name: 'image', title: 'Image (Hình ảnh)', type: 'string' }
  ]
};

export const homepageSchema = {
  name: 'homepage',
  title: 'Homepage Content (Trang chủ)',
  type: 'document',
  fields: [
    { name: 'heroTitle', title: 'Hero Title', type: 'string' },
    { name: 'heroSubtitle', title: 'Hero Subtitle', type: 'text' },
    { name: 'heroOverlayText', title: 'Hero Overlay Text', type: 'string' },
    { name: 'heroVideoUrl', title: 'Hero Video URL', type: 'url' },
    { name: 'ctaText', title: 'CTA Button Text', type: 'string' },
    { name: 'ctaLink', title: 'CTA Button Link', type: 'string' },
    { name: 'servicesHeading', title: 'Services Section Heading (Tiêu đề phụ dịch vụ)', type: 'string' },
    { name: 'servicesSubtitle', title: 'Services Section Subtitle (Tiêu đề chính dịch vụ)', type: 'string' },
    {
      name: 'features',
      title: 'Key Features (Tính năng cốt lõi / Tại sao chọn)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'string' },
            { name: 'icon', title: 'Icon (Lucide name, e.g., Clock, MapPin, DollarSign, ShieldCheck)', type: 'string' }
          ]
        }
      ]
    },
    {
      name: 'stats',
      title: 'Company Stats (Số liệu thống kê)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (e.g., 1000+)', type: 'string' },
            { name: 'label', title: 'Label (e.g., Khách hàng)', type: 'string' }
          ]
        }
      ]
    },
    { name: 'aboutHeading', title: 'About Section Heading', type: 'string' },
    { name: 'aboutContent', title: 'About Section Content', type: 'text' },
    { name: 'aboutImage', title: 'About Section Image URL', type: 'string' },
    { name: 'benefitHeading', title: 'Benefit Section Heading', type: 'string' },
    { name: 'benefits', title: 'Benefits List', type: 'array', of: [{ type: 'string' }] }
  ]
};

export const serviceCategorySchema = {
  name: 'serviceCategory',
  title: 'Service Category (Danh mục dịch vụ)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Category ID (e.g., electrical, plumbing)', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon (Lucide Icon Name)', type: 'string' },
    { name: 'color', title: 'Accent Color (e.g., blue, red, green)', type: 'string' }
  ]
};

export const serviceSchema = {
  name: 'service',
  title: 'Service (Dịch vụ)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Service ID (e.g., e1, p2)', type: 'string' },
    { name: 'slug', title: 'Slug (e.g., sua-dien)', type: 'slug', options: { source: 'title' } },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'shortDescription', title: 'Short Description', type: 'string' },
    { name: 'fullDescription', title: 'Full Description', type: 'text' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' },
    { name: 'category', title: 'Category ID (e.g., electrical)', type: 'string' },
    { name: 'features', title: 'Features list', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'pricing',
      title: 'Pricing items (Bảng giá dịch vụ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'item', title: 'Item name', type: 'string' },
            { name: 'price', title: 'Price (e.g., Từ 150.000đ)', type: 'string' },
            { name: 'unit', title: 'Unit (e.g., cái, lần, mét)', type: 'string' }
          ]
        }
      ]
    },
    { name: 'image', title: 'Image URL', type: 'string' },
    { name: 'benefits', title: 'Benefits (Ưu điểm)', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'faq',
      title: 'Service specific FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    }
  ]
};

export const postCategorySchema = {
  name: 'postCategory',
  title: 'Post Category (Danh mục bài viết)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Category ID (e.g., electrical)', type: 'string' },
    { name: 'title', title: 'Title (e.g., Điện, Nước)', type: 'string' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' }
  ]
};

export const postSchema = {
  name: 'post',
  title: 'Blog Post (Bài viết)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Post ID', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'excerpt', title: 'Excerpt (Mô tả ngắn)', type: 'string' },
    { name: 'content', title: 'Content (Nội dung HTML/Markdown)', type: 'text' },
    { name: 'category', title: 'Category Title (e.g., Điện, Nước)', type: 'string' },
    { name: 'date', title: 'Date (Ngày, e.g., 2026-05-15)', type: 'string' },
    {
      name: 'author',
      title: 'Author Details',
      type: 'object',
      fields: [
        { name: 'name', title: 'Author Name', type: 'string' },
        { name: 'role', title: 'Author Role', type: 'string' },
        { name: 'avatar', title: 'Avatar Image URL', type: 'string' }
      ]
    },
    { name: 'image', title: 'Featured Image URL', type: 'string' },
    { name: 'readTime', title: 'Read Time (Thời gian đọc)', type: 'string' },
    { name: 'tags', title: 'Tags (Thẻ)', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'faq',
      title: 'Article FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text' }
          ]
        }
      ]
    }
  ]
};

export const productCategorySchema = {
  name: 'productCategory',
  title: 'Product Category (Danh mục sản phẩm)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Category ID (e.g., electrical, plumbing)', type: 'string' },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'icon', title: 'Icon (Lucide name)', type: 'string' }
  ]
};

export const productSchema = {
  name: 'product',
  title: 'Product (Sản phẩm)',
  type: 'document',
  fields: [
    { name: 'id', title: 'Product ID (e.g., p1)', type: 'string' },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } },
    { name: 'name', title: 'Product Name (Tên)', type: 'string' },
    { name: 'category', title: 'Category ID (e.g., electrical)', type: 'string' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'price', title: 'Price (Giá, e.g., 85.000đ)', type: 'string' },
    { name: 'image', title: 'Image URL', type: 'string' },
    { name: 'features', title: 'Key features', type: 'array', of: [{ type: 'string' }] },
    {
      name: 'specs',
      title: 'Specifications (Thông số kỹ thuật)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'key', title: 'Spec Key (e.g., Thương hiệu)', type: 'string' },
            { name: 'value', title: 'Spec Value (e.g., MPE)', type: 'string' }
          ]
        }
      ]
    }
  ]
};

export const pricingSchema = {
  name: 'pricing',
  title: 'Pricing Card (Thẻ báo giá)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Service / Item name', type: 'string' },
    { name: 'price', title: 'Price string', type: 'string' },
    { name: 'unit', title: 'Unit (cái/phòng/lần)', type: 'string' },
    { name: 'category', title: 'Category Group (e.g., electrical)', type: 'string' },
    { name: 'features', title: 'Included item details', type: 'array', of: [{ type: 'string' }] },
    { name: 'badge', title: 'Featured Badge (e.g., Phổ biến nhất)', type: 'string' },
    { name: 'orderNo', title: 'Order code sorting number', type: 'number' }
  ]
};

export const faqSchema = {
  name: 'faq',
  title: 'FAQ (Câu hỏi thường gặp)',
  type: 'document',
  fields: [
    { name: 'question', title: 'Question', type: 'string' },
    { name: 'answer', title: 'Answer', type: 'text' },
    { name: 'category', title: 'Category (Optional)', type: 'string' }
  ]
};

export const testimonialSchema = {
  name: 'testimonial',
  title: 'Testimonial (Đánh giá khách hàng)',
  type: 'document',
  fields: [
    { name: 'name', title: 'Customer Name', type: 'string' },
    { name: 'role', title: 'Location / Role (e.g., Quận 1, TP.HCM)', type: 'string' },
    { name: 'review', title: 'Review Text', type: 'text' },
    { name: 'rating', title: 'Rating Stars (1-5)', type: 'number' },
    { name: 'avatar', title: 'Avatar Image URL', type: 'string' }
  ]
};

export const reviewSchema = {
  name: 'review',
  title: 'Review System Node (Phản hồi thực tế)',
  type: 'document',
  fields: [
    { name: 'customerName', title: 'Customer', type: 'string' },
    { name: 'comment', title: 'Comment', type: 'text' },
    { name: 'score', title: 'Score (1-5)', type: 'number' },
    { name: 'date', title: 'Date (e.g. 2026-05-20)', type: 'string' },
    { name: 'verifiedPurchase', title: 'Verified Purchase (Mất điện / đã sửa)', type: 'boolean' }
  ]
};

export const gallerySchema = {
  name: 'gallery',
  title: 'Gallery Item (Thư viện ảnh)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Visual title', type: 'string' },
    { name: 'image', title: 'Image URL', type: 'string' },
    { name: 'category', title: 'Category (e.g., electrical, plumbing)', type: 'string' },
    { name: 'caption', title: 'Caption', type: 'string' }
  ]
};

export const menuSchema = {
  name: 'menu',
  title: 'Navigation Menu (Thanh menu)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Menu Title', type: 'string' },
    { name: 'path', title: 'Navigation path', type: 'string' },
    { name: 'icon', title: 'Icon (Lucide string)', type: 'string' },
    { name: 'orderNo', title: 'Menu display sorting order', type: 'number' },
    {
      name: 'subItems',
      title: 'Sub-Items (Menu phụ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'path', title: 'Path', type: 'string' }
          ]
        }
      ]
    }
  ]
};

export const footerSchema = {
  name: 'footer',
  title: 'Footer config (Thông tin chân trang)',
  type: 'document',
  fields: [
    { name: 'companyName', title: 'Company Name', type: 'string' },
    { name: 'shortAbout', title: 'Short intro text', type: 'text' },
    { name: 'address', title: 'Physical office address', type: 'string' },
    { name: 'phone', title: 'Office phone', type: 'string' },
    { name: 'email', title: 'Inquiry email ID', type: 'string' },
    { name: 'workingHours', title: 'Working timetable', type: 'string' },
    {
      name: 'socialLinks',
      title: 'Social Media Connections',
      type: 'object',
      fields: [
        { name: 'facebook', title: 'Facebook URL', type: 'string' },
        { name: 'youtube', title: 'Youtube URL', type: 'string' },
        { name: 'zalo', title: 'Zalo link', type: 'string' }
      ]
    },
    { name: 'copyrightText', title: 'Copyright notification string', type: 'string' }
  ]
};

export const bannerSchema = {
  name: 'banner',
  title: 'Alert Banner (Thông báo chạy đầu trang)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Admin title identifier', type: 'string' },
    { name: 'text', title: 'Alert Message text', type: 'string' },
    { name: 'linkText', title: 'Action Link text', type: 'string' },
    { name: 'linkUrl', title: 'Action target link', type: 'string' },
    { name: 'isActive', title: 'Currently active', type: 'boolean' }
  ]
};

export const popupSchema = {
  name: 'popup',
  title: 'Ad Popup Modal (Hộp thoại quảng cáo)',
  type: 'document',
  fields: [
    { name: 'title', title: 'Ad Title text', type: 'string' },
    { name: 'subtitle', title: 'Alert Subtitle', type: 'string' },
    { name: 'image', title: 'Promo image asset URL', type: 'string' },
    { name: 'ctaText', title: 'Sign-up/Call CTA', type: 'string' },
    { name: 'ctaLink', title: 'Action destination link', type: 'string' },
    { name: 'delaySeconds', title: 'Intro overlay trigger timer', type: 'number' },
    { name: 'isActive', title: 'Active status', type: 'boolean' }
  ]
};

export const seoSchema = {
  name: 'seo',
  title: 'SEO Metrics (Tối ưu từ khoá / Metadata)',
  type: 'document',
  fields: [
    { name: 'pagePath', title: 'Target page relative slug (e.g. /, /san-pham)', type: 'string' },
    { name: 'metaTitle', title: 'Browser Meta Title', type: 'string' },
    { name: 'metaDescription', title: 'Meta description', type: 'text' },
    { name: 'canonicalUrl', title: 'Conforming URL standard', type: 'string' },
    { name: 'ogImage', title: 'Open Graph Image thumbnail URL', type: 'string' },
    { name: 'keywords', title: 'Index target terms', type: 'array', of: [{ type: 'string' }] }
  ]
};

export const localBusinessSchema = {
  name: 'localBusiness',
  title: 'Local Business JSON-LD configurations',
  type: 'document',
  fields: [
    { name: 'name', title: 'Business name', type: 'string' },
    { name: 'legalName', title: 'Corporate Name registration', type: 'string' },
    { name: 'logo', title: 'Company logo URL', type: 'string' },
    { name: 'telephone', title: 'Customer hotline', type: 'string' },
    {
      name: 'address',
      title: 'Physical Location',
      type: 'object',
      fields: [
        { name: 'streetAddress', title: 'Street info', type: 'string' },
        { name: 'addressLocality', title: 'Locality/City', type: 'string' },
        { name: 'addressRegion', title: 'Province', type: 'string' },
        { name: 'postalCode', title: 'ZIP', type: 'string' },
        { name: 'addressCountry', title: 'Country code (e.g., VN)', type: 'string' }
      ]
    },
    {
      name: 'geo',
      title: 'Geographical Coordinates',
      type: 'object',
      fields: [
        { name: 'latitude', title: 'Latitude numeric value', type: 'number' },
        { name: 'longitude', title: 'Longitude', type: 'number' }
      ]
    },
    { name: 'priceRange', title: 'Cost range indicator (e.g. $$-$$$)', type: 'string' },
    {
      name: 'openingHoursSpecification',
      title: 'Timetable schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'dayOfWeek', title: 'Days', type: 'string' },
            { name: 'opens', title: 'Time starts', type: 'string' },
            { name: 'closes', title: 'Closing', type: 'string' }
          ]
        }
      ]
    }
  ]
};

export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Global Controls (Cấu hình hệ thống)',
  type: 'document',
  fields: [
    { name: 'siteName', title: 'Main title', type: 'string' },
    { name: 'tagline', title: 'Slogan descriptor', type: 'string' },
    { name: 'logo', title: 'Brand logo image URL', type: 'string' },
    { name: 'favicon', title: 'Header tab favicon', type: 'string' },
    { name: 'mainHotline', title: 'Contact Phone Number', type: 'string' },
    { name: 'mainZalo', title: 'Zalo Link', type: 'string' },
    { name: 'headerNotice', title: 'Global header highlight text', type: 'string' }
  ]
};

export const contactSchema = {
  name: 'contact',
  title: 'Contact form setup (Khung liên hệ)',
  type: 'document',
  fields: [
    { name: 'pageTitle', title: 'Contact header label', type: 'string' },
    { name: 'pageSubtitle', title: 'Contact description text', type: 'text' },
    {
      name: 'contactFields',
      title: 'Contact channels',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Lucide icon name', type: 'string' },
            { name: 'label', title: 'Channel Name', type: 'string' },
            { name: 'val', title: 'Display line', type: 'string' },
            { name: 'desc', title: 'Small prompt explanation', type: 'string' }
          ]
        }
      ]
    },
    { name: 'mapEmbedUrl', title: 'Google Map embedding iframe URL', type: 'text' }
  ]
};

export const allSchemas = [
  locationSchema,
  homepageSchema,
  serviceCategorySchema,
  serviceSchema,
  postCategorySchema,
  postSchema,
  productCategorySchema,
  productSchema,
  pricingSchema,
  faqSchema,
  testimonialSchema,
  reviewSchema,
  gallerySchema,
  menuSchema,
  footerSchema,
  bannerSchema,
  popupSchema,
  seoSchema,
  localBusinessSchema,
  siteSettingsSchema,
  contactSchema
];
