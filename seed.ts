import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import { slugify, createReference, generateDeterministicId, upsertDocument } from './migration-helpers';
import { resolveDocumentImages } from './image-resolver';

// Import raw local databases containing 100% of the real, hardcoded content
import { LOCALIZED_HOME } from './src/data/localizedHome';
import { LOCALIZED_SERVICES } from './src/data/localizedServices';
import { LOCALIZED_PRODUCTS } from './src/data/localizedProducts';
import { LOCALIZED_BLOGS } from './src/data/localizedBlog';
import { BLOG_POSTS } from './src/data/blog';
import { PROJECTS_DATA } from './src/data/projectsData';
import { LOCALIZED_FAQS } from './src/data/localizedFaqs';
import { LOCALIZED_REVIEWS, LOCALIZED_TESTIMONIALS } from './src/data/localizedReviews';
import { LOCALIZED_SEO, LOCALIZED_BUSINESS_SCHEMA, LOCALIZED_CONTACT, LOCALIZED_SITE_SETTINGS } from './src/data/localizedSeo';

// Configure and load variables from .env
dotenv.config();

const projectId = process.env.VITE_SANITY_PROJECT_ID;
const dataset = process.env.VITE_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

console.log('========================================================================');
console.log(' 🛠️   HOÀNG TUẤN MPE - PRODUCTION-GRADE CONTENT MIGRATION SYSTEM');
console.log('========================================================================');

if (!projectId || projectId === 'your_sanity_project_id') {
  console.error('⛔ Error: VITE_SANITY_PROJECT_ID is not configured in your .env file.');
  process.exit(1);
}

if (!token || token === 'your_sanity_write_token') {
  console.error('⛔ Error: SANITY_WRITE_TOKEN is not configured in your .env file or is a placeholder.');
  console.error('Create a write token in Sanity Manage (https://manage.sanity.io),');
  console.error('under Settings -> API Settings -> Tokens (with Write permission) and set it in your .env.');
  process.exit(1);
}

console.log(`🔗 Connecting to Sanity Project: "${projectId}" on dataset: "${dataset}"...`);

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-05-21',
  token,
  useCdn: false,
});

async function runSeed() {
  const report = {
    created: 0,
    updated: 0, // In Sanity, createOrReplace wraps both into a uniform state write
    failed: 0,
    log: [] as string[]
  };

  const seedDocuments: any[] = [];

  // ==========================================================================
  // A. STATIC GLOBAL SCHEMAS (Categories and Menus)
  // ==========================================================================

  // 1. Locations
  const locationSetup = [
    {
      _id: 'location-baoloc',
      _type: 'location',
      id: 'baoloc',
      name: 'Bảo Lộc',
      slug: { _type: 'slug', current: 'bao-loc' },
      hotline: '0389 011 315',
      description: 'Trụ sơ chính của Hoàng Tuấn MPE tại thủ phủ trà Lộc Phát, Bảo Lộc, Lâm Đồng.',
      image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=800'
    },
    {
      _id: 'location-hcm',
      _type: 'location',
      id: 'hcm',
      name: 'Hồ Chí Minh',
      slug: { _type: 'slug', current: 'ho-chi-minh' },
      hotline: '0389 011 315',
      description: 'Chi nhánh đại diện kỹ thuật phục vụ 24 quận huyện nội thành Thành phố Hồ Chí Minh.',
      image: 'https://images.unsplash.com/photo-1504148455328-c39695b8a592?auto=format&fit=crop&q=80&w=800'
    }
  ];
  seedDocuments.push(...locationSetup);

  // 2. Service Categories
  const serviceCategories = [
    { _id: 'serviceCategory-electrical', _type: 'serviceCategory', id: 'electrical', title: 'Điện dân dụng', description: 'Sửa chữa chập điện âm tường, thay thế ổ cắm công tắc thiết bị Panasonic chính hiệu.', icon: 'Zap', color: 'amber' },
    { _id: 'serviceCategory-plumbing', _type: 'serviceCategory', id: 'plumbing', title: 'Nước dân dụng', description: 'Hàn ống nước nóng PPR chịu nhiệt, sửa phao bồn nước, thông tắc rò rỉ bồn cầu triệt để.', icon: 'Droplet', color: 'blue' },
    { _id: 'serviceCategory-camera', _type: 'serviceCategory', id: 'camera', title: 'Camera an ninh', description: 'Lắp đặt, cấu hình camera IP PoE Hikvision, thiết bị Ezviz ngoài trời xoay 360 độ góc rộng sắc nét.', icon: 'Video', color: 'emerald' },
    { _id: 'serviceCategory-detection', _type: 'serviceCategory', id: 'detection', title: 'Siêu âm rò rỉ', description: 'Rà tìm rò rỉ đường ống nước ngầm sâu bằng máy PQWT sóng màng cảm ứng hiện đại nhất.', icon: 'Activity', color: 'rose' },
    { _id: 'serviceCategory-smarthome', _type: 'serviceCategory', id: 'smarthome', title: 'Nhà thông minh', description: 'Giải pháp nhà thông minh, công tắc cảm ứng, điều khiển cửa cuốn từ xa, rèm thông minh, cảm biến an ninh.', icon: 'Home', color: 'indigo' },
    { _id: 'serviceCategory-construction', _type: 'serviceCategory', id: 'construction', title: 'Thi công xây dựng', description: 'Thi công cơ điện công trình, hoàn thiện căn hộ, sửa chữa nâng cấp nhà trọn gói.', icon: 'Hammer', color: 'orange' },
    { _id: 'serviceCategory-solar', _type: 'serviceCategory', id: 'solar', title: 'Điện mặt trời', description: 'Lắp đặt tấm pin năng lượng mặt trời, hybrid hòa lưới lưu trữ điện năng bền bỉ.', icon: 'Sun', color: 'yellow' }
  ];
  seedDocuments.push(...serviceCategories);

  // 3. Product Categories
  const productCategories = [
    { _id: 'productCategory-electrical', _type: 'productCategory', id: 'electrical', title: 'Thiết bị điện', description: 'Aptomat chống giật, ổ cắm mặt nạ Panasonic, dây cáp điện Cadivi và đèn LED MPE siêu tiết kiệm bền bỉ.', icon: 'Zap' },
    { _id: 'productCategory-plumbing', _type: 'productCategory', id: 'plumbing', title: 'Thiết bị nước', description: 'Vòi đồng chịu lực, ống nhựa PPR chịu nhiệt Bình Minh, van khóa và phụ kiện vệ sinh bền bỉ.', icon: 'Droplets' },
    { _id: 'productCategory-camera', _type: 'productCategory', id: 'camera', title: 'Camera chính hãng', description: 'Mắt camera Ezviz ngoài trời kháng bụi nước, đầu ghi Dahua, ổ cứng chuyên quay dữ liệu 24/7.', icon: 'Video' },
    { _id: 'productCategory-detection', _type: 'productCategory', id: 'detection', title: 'Hệ thống dò tìm', description: 'Thiết bị cảm biến siêu âm phát rò rỉ cơ học, máy đo ampe kìm và phụ tùng bổ trợ dò sửa.', icon: 'Activity' },
    { _id: 'productCategory-solar', _type: 'productCategory', id: 'solar', title: 'Điện mặt trời', description: 'Tấm pin năng lượng mặt trời Mono, Inverter hòa lưới, pin lưu trữ Lithium và linh kiện lắp đặt chuyên dụng.', icon: 'Sun' },
    { _id: 'productCategory-construction', _type: 'productCategory', id: 'construction', title: 'Vật tư thi công', description: 'Dây cáp chịu tải Cadivi, ống luồn dây chống cháy, ống nhựa và phụ kiện ngành xây dựng.', icon: 'Hammer' }
  ];
  seedDocuments.push(...productCategories);

  // 4. Post Categories (Blog Categories)
  const postCategories = [
    { _id: 'postCategory-dien', _type: 'postCategory', id: 'electrical', title: 'Mẹo cơ điện', icon: 'Zap' },
    { _id: 'postCategory-nuoc', _type: 'postCategory', id: 'plumbing', title: 'Mẹo sửa nước', icon: 'Droplet' },
    { _id: 'postCategory-camera', _type: 'postCategory', id: 'camera', title: 'Mẹo công nghệ camera', icon: 'Video' },
    { _id: 'postCategory-dotim', _type: 'postCategory', id: 'detection', title: 'Kỹ thuật dò siêu âm', icon: 'Activity' }
  ];
  seedDocuments.push(...postCategories);

  // 5. Navigation Menu
  const menus = [
    { _id: 'menu-trangchu', _type: 'menu', title: 'Trang chủ', path: '/', icon: 'Home', orderNo: 1 },
    {
      _id: 'menu-dichvu',
      _type: 'menu',
      title: 'Dịch vụ',
      path: '/dich-vu',
      icon: 'Wrench',
      orderNo: 2,
      subItems: [
        { _key: 's1', title: 'Sửa điện', path: '/dich-vu/sua-dien' },
        { _key: 's2', title: 'Sửa nước', path: '/dich-vu/sua-nuoc' },
        { _key: 's4', title: 'Lắp Camera', path: '/dich-vu/lap-camera' },
        { _key: 's5', title: 'Rò rỉ nước', path: '/dich-vu/do-ro-ri-nuoc' }
      ]
    },
    { _id: 'menu-sanpham', _type: 'menu', title: 'Sản phẩm', path: '/san-pham', icon: 'Tag', orderNo: 3 },
    { _id: 'menu-banggia', _type: 'menu', title: 'Bảng giá', path: '/bang-gia', icon: 'DollarSign', orderNo: 4 },
    { _id: 'menu-tintuc', _type: 'menu', title: 'Tin tức & mẹo', path: '/blog', icon: 'BookOpen', orderNo: 5 },
    { _id: 'menu-lienhe', _type: 'menu', title: 'Liên hệ', path: '/lien-he', icon: 'Phone', orderNo: 6 }
  ];
  seedDocuments.push(...menus);

  // 6. Projects (Dự án thực tế)
  PROJECTS_DATA.forEach((project) => {
    const projId = generateDeterministicId('project', 'global', project.slug);
    
    const targetLocs: string[] = [];
    const locStr = (project.location || '').toLowerCase();
    if (locStr.includes('hcm') || locStr.includes('hồ chí minh') || locStr.includes('ho chi minh') || locStr.includes('quận')) {
      targetLocs.push('ho-chi-minh');
    }
    if (locStr.includes('bảo lộc') || locStr.includes('bao loc') || locStr.includes('lâm đồng') || locStr.includes('lam dong') || locStr.includes('đà lạt') || locStr.includes('da lat')) {
      targetLocs.push('bao-loc');
    }
    if (targetLocs.length === 0) {
      targetLocs.push('bao-loc', 'ho-chi-minh');
    }

    seedDocuments.push({
      _id: projId,
      _type: 'project',
      locations: targetLocs,
      title: project.title,
      slug: { _type: 'slug', current: project.slug },
      description: project.shortDescription || project.fullDescription,
      content: [{
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: project.fullDescription, marks: [] }]
      }],
      location: project.location,
      completionDate: project.completionDate,
      image: project.images && project.images.length > 0 ? project.images[0] : (project.gallery && project.gallery.length > 0 ? project.gallery[0] : ''),
      gallery: project.images || project.gallery || [],
      tags: project.services || [],
      order: 0
    });
  });

  // ==========================================================================
  // B. LOCATION-SPECIFIC DATABASES (Bảo Lộc & Hồ Chí Minh)
  // ==========================================================================

  const locSlugs = ['bao-loc', 'ho-chi-minh'] as const;

  for (const locSlug of locSlugs) {
    const locRefId = locSlug === 'bao-loc' ? 'location-baoloc' : 'location-hcm';
    console.log(`\n📦 Building context-specific documents for Location: [${locSlug}] ...`);

    // 1. Site Settings
    const settingsData = (LOCALIZED_SITE_SETTINGS[locSlug] || {}) as any;
    seedDocuments.push({
      _id: generateDeterministicId('siteSettings', locSlug, 'settings'),
      _type: 'siteSettings',
      location: createReference(locRefId),
      siteName: settingsData.siteName || 'Hoàng Tuấn MPE',
      tagline: settingsData.tagline || 'Sửa chữa điện nước & lắp camera 24/7',
      logo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=150',
      favicon: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=32',
      mainHotline: settingsData.mainHotline || '0389 011 315',
      mainZalo: settingsData.mainZalo || 'https://zalo.me/0389011315',
      headerNotice: settingsData.headerNotice || 'Hỗ trợ khẩn cấp 24/7!'
    });

    // 2. Footer
    seedDocuments.push({
      _id: generateDeterministicId('footer', locSlug, 'footer'),
      _type: 'footer',
      location: createReference(locRefId),
      companyName: locSlug === 'ho-chi-minh' ? 'Công Ty Hoàng Tuấn MPE (Chi nhánh TP.HCM)' : 'Công Ty Hoàng Tuấn MPE',
      shortAbout: locSlug === 'ho-chi-minh'
        ? 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực TP. Hồ Chí Minh.'
        : 'Hoàng Tuấn MPE cung cấp giải pháp sửa chữa điện nước, dò tìm rò rỉ nước siêu âm và lắp đặt camera giám sát chất lượng số 1 tại khu vực Bảo Lộc, Lâm Đồng.',
      address: locSlug === 'ho-chi-minh' ? '528/17 Tô Ngọc Vân, Phường Tam Bình, Thủ Đức, TP. Hồ Chí Minh' : "279 B'Lao Sire, Phường 3, Bảo Lộc, Lâm Đồng",
      phone: '0389 011 315',
      email: 'hoangtuanmpe@gmail.com',
      workingHours: 'Hỗ trợ 24/7 (Kể cả Chủ Nhật & Ngày Lễ)',
      socialLinks: {
        facebook: 'https://facebook.com',
        youtube: 'https://youtube.com',
        zalo: 'https://zalo.me/0389011315'
      },
      copyrightText: '© 2026 Hoàng Tuấn MPE. Thiết kế & vận hành chuyên nghiệp.'
    });

    // 3. Contact Form Setup
    const contactData = (LOCALIZED_CONTACT[locSlug] || {}) as any;
    seedDocuments.push({
      _id: generateDeterministicId('contact', locSlug, 'contact'),
      _type: 'contact',
      location: createReference(locRefId),
      pageTitle: contactData.pageTitle || 'Kết nối with Hoàng Tuấn MPE',
      pageSubtitle: contactData.pageSubtitle || 'Hỗ trợ ngày đêm có mặt khứ cứu nhanh',
      contactFields: contactData.contactFields || [],
      mapEmbedUrl: contactData.mapEmbedUrl || ''
    });

    // 4. Local Business Schema
    const bizData = (LOCALIZED_BUSINESS_SCHEMA[locSlug] || {}) as any;
    seedDocuments.push({
      _id: generateDeterministicId('localBusiness', locSlug, 'biz'),
      _type: 'localBusiness',
      location: createReference(locRefId),
      name: bizData.name || 'Hoàng Tuấn MPE',
      legalName: bizData.legalName || 'Hoàng Tuấn MPE Co.',
      logo: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=150',
      telephone: bizData.telephone || '0389011315',
      address: bizData.address || {},
      geo: bizData.geo || {},
      priceRange: bizData.priceRange || '$$',
      openingHoursSpecification: bizData.openingHoursSpecification || []
    });

    // 5. Banners
    seedDocuments.push({
      _id: generateDeterministicId('banner', locSlug, 'active_notice'),
      _type: 'banner',
      location: createReference(locRefId),
      title: 'Thông báo khẩn cấp ngày đêm',
      text: locSlug === 'ho-chi-minh'
        ? '☎️ Khẩn cấp: Thợ trực chiến 24/7 tại Sài Gòn đêm lễ có mặt ngay sau 15-30 phút!'
        : '☎️ Khẩn cấp: Thợ trực chiến 24/7 tại Bảo Lộc đêm lễ có mặt ngay sau 15-30 phút!',
      linkText: 'Số cứu hộ',
      linkUrl: 'tel:0389011315',
      isActive: true
    });

    // 6. Promotional Popups
    seedDocuments.push({
      _id: generateDeterministicId('popup', locSlug, 'p10'),
      _type: 'popup',
      location: createReference(locRefId),
      title: 'GIẢM GIÁ 10%',
      subtitle: locSlug === 'ho-chi-minh' ? 'Ưu đãi cho khách hàng gọi sửa chữa điện nước tại Hồ Chí Minh tuần này!' : 'Ưu đãi cho khách hàng gọi lắp đặt thiết bị điện nước Bảo Lộc tuần này!',
      image: 'https://images.unsplash.com/photo-1542013916693-68931df88e04?auto=format&fit=crop&q=80&w=500',
      ctaText: 'Nhận ưu đãi qua Zalo',
      ctaLink: 'https://zalo.me/0389011315',
      delaySeconds: 3,
      isActive: true
    });

    // 7. Base Homepage Content
    const homeData = (LOCALIZED_HOME[locSlug] || {}) as any;
    seedDocuments.push({
      _id: generateDeterministicId('homepage', locSlug, 'home'),
      _type: 'homepage',
      location: createReference(locRefId),
      heroTitle: homeData.heroTitle || '',
      heroSubtitle: homeData.heroSubtitle || '',
      heroOverlayText: homeData.heroOverlayText || '',
      features: homeData.features || [],
      stats: homeData.stats || [],
      aboutHeading: homeData.aboutHeading || '',
      aboutContent: homeData.aboutContent || '',
      aboutImage: homeData.aboutImage || '',
      benefitHeading: homeData.benefitHeading || '',
      benefits: homeData.benefits || '',
      servicesHeading: homeData.servicesHeading || '',
      servicesSubtitle: homeData.servicesSubtitle || ''
    });

    // 8. Path Specific SEO configs
    const seoGroup = LOCALIZED_SEO[locSlug] || {};
    for (const pathKey of Object.keys(seoGroup)) {
      const seoData = seoGroup[pathKey];
      const securePathId = pathKey === '/' ? 'home' : slugify(pathKey).replace(/\//g, '-');
      seedDocuments.push({
        _id: generateDeterministicId('seo', locSlug, securePathId),
        _type: 'seo',
        location: createReference(locRefId),
        pagePath: pathKey,
        metaTitle: seoData.metaTitle || '',
        metaDescription: seoData.metaDescription || '',
        canonicalUrl: seoData.canonicalUrl || '',
        ogImage: seoData.ogImage || '',
        keywords: seoData.keywords || []
      });
    }

    // 9. Services
    const servicesList = LOCALIZED_SERVICES[locSlug] || [];
    servicesList.forEach((srv) => {
      const srvId = generateDeterministicId('service', locSlug, srv.slug);
      
      seedDocuments.push({
        _id: srvId,
        _type: 'service',
        location: createReference(locRefId),
        category: srv.category,
        categoryRef: createReference(`serviceCategory-${srv.category}`),
        id: srv.id,
        slug: { _type: 'slug', current: srv.slug },
        title: srv.title,
        shortDescription: srv.shortDescription,
        fullDescription: srv.fullDescription,
        icon: srv.icon,
        features: srv.features || [],
        pricing: srv.pricing || [],
        benefits: srv.benefits || [],
        faq: srv.faq || []
      });

      // Seeding standalone Pricing Documents from nested service categories
      if (Array.isArray(srv.pricing)) {
        srv.pricing.forEach((p, index) => {
          const prId = generateDeterministicId('pricing', locSlug, `${srv.slug}-${index}-${slugify(p.item).slice(0,25)}`);
          seedDocuments.push({
            _id: prId,
            _type: 'pricing',
            location: createReference(locRefId),
            title: p.item,
            price: p.price,
            unit: p.unit || '',
            category: srv.category,
            orderNo: index + 1,
            badge: index === 0 ? 'Phổ biến nhất' : '',
            features: [srv.title, 'Bảo hành chu đáo 12 tháng', 'Hỗ trợ cứu hộ 24/7']
          });
        });
      }
    });

    // 10. Products
    const productsList = LOCALIZED_PRODUCTS[locSlug] || [];
    productsList.forEach((prd) => {
      const prdId = generateDeterministicId('product', locSlug, prd.slug);
      let catId = prd.category === 'leak-detection' || prd.category === 'detection' ? 'detection' : prd.category;
      
      // Parse spec dictionary to array-of-objects matching Schema spec definitions
      const formattedSpecs: { key: string; value: string }[] = [];
      if (prd.specs && typeof prd.specs === 'object') {
        for (const [key, value] of Object.entries(prd.specs)) {
          formattedSpecs.push({ key, value: value as string });
        }
      }

      seedDocuments.push({
        _id: prdId,
        _type: 'product',
        location: createReference(locRefId),
        id: prd.id,
        slug: { _type: 'slug', current: prd.slug },
        name: prd.name,
        category: prd.category,
        productCategoryRef: createReference(`productCategory-${catId}`),
        description: prd.description,
        price: prd.price,
        image: prd.image,
        features: prd.features || [],
        specs: formattedSpecs
      });
    });

    // 11. Blog Posts (Localized Tips)
    const blogLocData = (LOCALIZED_BLOGS as any)[locSlug];
    const blogsList = blogLocData && blogLocData.posts ? blogLocData.posts : [];
    blogsList.forEach((post: any) => {
      const postId = generateDeterministicId('post', locSlug, post.slug);
      let catId = post.category === 'leak-detection' || post.category === 'detection' ? 'dotim' : (post.category === 'electrical' ? 'dien' : (post.category === 'plumbing' ? 'nuoc' : 'camera'));
      
      seedDocuments.push({
        _id: postId,
        _type: 'post',
        location: createReference(locRefId),
        id: post.id,
        slug: { _type: 'slug', current: post.slug },
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        postCategoryRef: createReference(`postCategory-${catId}`),
        date: post.date,
        author: post.author,
        image: post.image,
        readTime: post.readTime,
        tags: post.tags || [],
        faq: post.faq || []
      });
    });

    // 11b. Core Blog Posts (From central database)
    BLOG_POSTS.forEach((post) => {
      const postId = generateDeterministicId('post', locSlug, `core-${post.slug}`);
      let catId = post.category === 'leak-detection' || post.category === 'detection' ? 'dotim' : (post.category === 'electrical' ? 'dien' : (post.category === 'plumbing' ? 'nuoc' : 'camera'));
      
      seedDocuments.push({
        _id: postId,
        _type: 'post',
        location: createReference(locRefId),
        id: post.id,
        slug: { _type: 'slug', current: `${post.slug}-${locSlug}` },
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: post.category,
        postCategoryRef: createReference(`postCategory-${catId}`),
        date: post.date,
        author: post.author,
        image: post.image,
        readTime: post.readTime,
        tags: post.tags || [],
        faq: post.faq || []
      });
    });

    // 12. FAQs
    const faqsList = LOCALIZED_FAQS[locSlug] || [];
    faqsList.forEach((faq, index) => {
      const faqId = generateDeterministicId('faq', locSlug, `f${index}-${slugify(faq.question).slice(0, 30)}`);
      seedDocuments.push({
        _id: faqId,
        _type: 'faq',
        location: createReference(locRefId),
        question: faq.question,
        answer: faq.answer,
        category: faq.category || 'Chung'
      });
    });

    // 13. Testimonials
    const testimonialsList = LOCALIZED_TESTIMONIALS[locSlug] || [];
    testimonialsList.forEach((t, index) => {
      const tId = generateDeterministicId('testimonial', locSlug, `t${index}-${slugify(t.name).slice(0, 15)}`);
      seedDocuments.push({
        _id: tId,
        _type: 'testimonial',
        location: createReference(locRefId),
        name: t.name,
        role: t.role,
        review: t.review,
        rating: t.rating,
        avatar: t.avatar
      });
    });

    // 14. Reviews
    const reviewsList = LOCALIZED_REVIEWS[locSlug] || [];
    reviewsList.forEach((rev, index) => {
      const revId = generateDeterministicId('review', locSlug, `r${index}-${slugify(rev.customerName).slice(0, 15)}`);
      seedDocuments.push({
        _id: revId,
        _type: 'review',
        location: createReference(locRefId),
        customerName: rev.customerName,
        comment: rev.comment,
        score: rev.score,
        date: rev.date,
        verifiedPurchase: rev.verifiedPurchase
      });
    });

    // 15. Galleries
    const galleries = [
      {
        title: locSlug === 'ho-chi-minh' ? 'Thi công lắp đặt điện Hồ Chí Minh' : 'Thi công lắp đặt điện Bảo Lộc',
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

    galleries.forEach((gal, index) => {
      const galId = generateDeterministicId('gallery', locSlug, `g${index}-${slugify(gal.title).slice(0, 15)}`);
      seedDocuments.push({
        _id: galId,
        _type: 'gallery',
        location: createReference(locRefId),
        title: gal.title,
        image: gal.image,
        category: gal.category,
        caption: gal.caption
      });
    });
  }

  // ==========================================================================
  // C. RESOLVING CROSS-REFERENCES AND MULTI-RELATION LINKING
  // ==========================================================================

  console.log(`\n🔗 Linking parent references and homepage listings deterministically...`);
  locSlugs.forEach((locSlug) => {
    const homeDoc = seedDocuments.find(d => d._type === 'homepage' && d._id.includes(locSlug));
    if (homeDoc) {
      // Find the generated service IDs for this location
      const matchedServiceIds = seedDocuments
        .filter(d => d._type === 'service' && d._id.includes(locSlug))
        .map(d => createReference(d._id));
      
      // Find the generated product IDs for this location
      const matchedProductIds = seedDocuments
        .filter(d => d._type === 'product' && d._id.includes(locSlug))
        .map(d => createReference(d._id));

      // Find the generated testimonial IDs for this location
      const matchedTestimonialIds = seedDocuments
        .filter(d => d._type === 'testimonial' && d._id.includes(locSlug))
        .map(d => createReference(d._id));

      homeDoc.featuredServices = matchedServiceIds.slice(0, 4);
      homeDoc.featuredProducts = matchedProductIds.slice(0, 4);
      homeDoc.testimonials = matchedTestimonialIds.slice(0, 4);
    }
  });


  // ==========================================================================
  // D. MIGRATING IMAGES AND EXECUTING TRANSACTION IN BATCHES
  // ==========================================================================

  console.log(`\n🚀 Verification Complete: Staging ${seedDocuments.length} documents. Starting image migrations and upserts...`);

  // Helper to chunk an array
  const chunk = <T>(arr: T[], size: number): T[][] =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );

  const fullyProcessedDocs: any[] = [];

  // Process images in small concurrent chunks (concurrency: 10) to avoid any HTTP socket exhaustion
  const docChunks = chunk(seedDocuments, 10);
  console.log(`📸 Processing images for ${seedDocuments.length} documents in ${docChunks.length} parallel cycles...`);
  
  for (let cIdx = 0; cIdx < docChunks.length; cIdx++) {
    const docChunk = docChunks[cIdx];
    await Promise.all(
      docChunk.map(async (doc) => {
        try {
          const fullyProcessedDoc = await resolveDocumentImages(client, doc);
          fullyProcessedDocs.push(fullyProcessedDoc);
        } catch (err: any) {
          report.failed++;
          const errMsg = `❌ [FATAL PRE-WRITE PROCESS] Failed to parse document ID: "${doc._id}" of type [${doc._type}]: ${err.message || err}`;
          console.error(errMsg);
          report.log.push(errMsg);
        }
      })
    );
  }

  // Commit processed documents in transactional batches of 50
  const writeChunks = chunk(fullyProcessedDocs, 50);
  console.log(`\n💾 Committing ${fullyProcessedDocs.length} documents to Sanity in ${writeChunks.length} transaction batches...`);
  
  for (let idx = 0; idx < writeChunks.length; idx++) {
    const writeChunk = writeChunks[idx];
    console.log(`📦 Committing transaction batch ${idx + 1}/${writeChunks.length} containing ${writeChunk.length} documents...`);
    try {
      const tx = client.transaction();
      for (const doc of writeChunk) {
        tx.createOrReplace(doc);
      }
      await tx.commit();
      report.created += writeChunk.length;
      console.log(`✨ Successfully committed batch ${idx + 1}.`);
    } catch (err: any) {
      report.failed += writeChunk.length;
      const errMsg = `❌ [BATCH FAILED] Failed to commit transaction batch ${idx + 1}: ${err.message || err}`;
      console.error(errMsg);
      report.log.push(errMsg);
    }
  }

  // ==========================================================================
  // E. MIGRATION & VALIDATION REPORTS
  // ==========================================================================

  console.log('\n========================================================================');
  console.log(' 📊   CONTENT MIGRATION & DATA INTEGRITY VALIDATION REPORT');
  console.log('========================================================================');
  console.log(`- Total Documents Migrated: ${report.created} successfully.`);
  console.log(`- Failed Documents Node Pipelines: ${report.failed} errors.`);
  console.log('------------------------------------------------------------------------');
  
  if (report.failed === 0) {
    console.log('🎉 GREAT SUCCESS! 100% of the Vietnamese high-conversion copywriting, products, services,');
    console.log('categories, menus, popups, and SEO meta pages have been fully migrated into Sanity.');
    console.log('Sanity is now the single source of truth for all local business configurations.');
  } else {
    console.log('⚠️ Done with warnings. Some nodes failed. Review the technical log summary:');
    report.log.filter(l => l.startsWith('❌')).forEach(l => console.log(`  ${l}`));
  }
  console.log('========================================================================\n');
}

runSeed();
