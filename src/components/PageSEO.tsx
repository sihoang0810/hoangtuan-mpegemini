import React, { useEffect, useState } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation as useAppLocation } from '../context/LocationContext';
import { Helmet } from 'react-helmet-async';
import { 
  getSeo, 
  getLocalBusiness, 
  CMSSeo, 
  CMSLocalBusiness 
} from '../lib/sanity';
import { LOCALIZED_SEO, LOCALIZED_BUSINESS_SCHEMA } from '../data/localizedSeo';

interface PageSEOProps {
  pageType?: 'home' | 'service' | 'product' | 'article' | 'faq' | 'general' | 'project';
  data?: any; // The service, product, or post document
}

export default function PageSEO({ pageType = 'general', data }: PageSEOProps) {
  const routerLoc = useRouterLocation();
  const { locationSlug } = useAppLocation();
  const [seo, setSeo] = useState<CMSSeo | null>(null);
  const [biz, setBiz] = useState<CMSLocalBusiness | null>(null);

  useEffect(() => {
    // Tell crawler not to serialize/capture HTML yet
    if (typeof window !== 'undefined') {
      (window as any).prerenderReady = false;
    }

    let active = true;
    let seoDone = false;
    let bizDone = false;

    const checkComplete = () => {
      if (active && seoDone && bizDone) {
        if (typeof window !== 'undefined') {
          // Both metadata models are loaded; allow brief 100ms tick for react-helmet to commit tags
          setTimeout(() => {
            (window as any).prerenderReady = true;
          }, 100);
        }
      }
    };

    getSeo(routerLoc.pathname, locationSlug)
      .then(data => {
        if (active) {
          setSeo(data);
          seoDone = true;
          checkComplete();
        }
      })
      .catch((err) => {
        console.warn('SEO fetch failed, using fallback:', err);
        if (active) {
          seoDone = true;
          checkComplete();
        }
      });

    getLocalBusiness(locationSlug)
      .then(data => {
        if (active) {
          setBiz(data);
          bizDone = true;
          checkComplete();
        }
      })
      .catch((err) => {
        console.warn('Biz schema fetch failed, using fallback:', err);
        if (active) {
          bizDone = true;
          checkComplete();
        }
      });

    return () => { 
      active = false; 
    };
  }, [routerLoc.pathname, locationSlug]);

  const fallback_location = (locationSlug as string === 'ho-chi-minh' || locationSlug as string === 'hcm') ? 'ho-chi-minh' : 'bao-loc';
  const locName = fallback_location === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const locRegion = fallback_location === 'ho-chi-minh' ? 'VN-SG' : 'VN-35';
  const locCoords = fallback_location === 'ho-chi-minh' ? '10.7769;106.7009' : '11.5404;107.8069';
  const locPlace = fallback_location === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc, Lâm Đồng';

  // Fallback SEO logic
  let cleanPath = routerLoc.pathname;
  if (cleanPath.startsWith('/bao-loc')) cleanPath = cleanPath.slice(8);
  else if (cleanPath.startsWith('/ho-chi-minh')) cleanPath = cleanPath.slice(12);
  if (!cleanPath) cleanPath = '/';

  const localSeoFallback = LOCALIZED_SEO[fallback_location][cleanPath] || LOCALIZED_SEO[fallback_location]['/'];
  const localBizFallback = LOCALIZED_BUSINESS_SCHEMA[fallback_location];

  let fallbackSeo: CMSSeo = {
    pagePath: routerLoc.pathname,
    metaTitle: localSeoFallback?.metaTitle || `Hoàng Tuấn MPE | Thợ Sửa Điện Nước ${locName} Uy Tín`,
    metaDescription: localSeoFallback?.metaDescription || `Dịch vụ thợ sửa điện nước, tìm rò rỉ nước ngầm, lắp camera an ninh chất lượng cao tại ${locName} của Hoàng Tuấn MPE.`,
    keywords: localSeoFallback?.keywords || []
  };

  // Specialized overrides for specific page types when data prop is provided
  if (pageType === 'service' && data) {
    const srvTitle = data.title || 'Dịch vụ';
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${srvTitle} tại ${locName} uy tín 24/7 | Hoàng Tuấn MPE`,
      metaDescription: `${srvTitle} tại nhà ${locName} uy tín 24/7. Thợ có mặt sau 30 phút, báo giá miễn phí. Hotline: 0389 011 315. Cam kết đúng giá, đúng hẹn tại khu vực ${locPlace}.`.substring(0, 160),
      keywords: [srvTitle, `sửa ${srvTitle} ${locName}`, `thợ ${srvTitle} ${locName}`, 'Hoàng Tuấn MPE']
    };
  } else if (pageType === 'product' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.name || data.title} chính hãng tại ${locName} | Hoàng Tuấn MPE`,
      metaDescription: `Cung cấp và lắp đặt ${data.name || data.title} chính hãng MPE tại ${locName}. Bảo hành dài hạn, giá tốt nhất thị trường. Liên hệ 0389 011 315 ngay.`.substring(0, 160),
      keywords: [data.name || data.title, `thiết bị điện ${locName}`, 'MPE']
    };
  } else if (pageType === 'article' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.title} | Kinh nghiệm thợ ${locName}`,
      metaDescription: (data.excerpt || `Chia sẻ kinh nghiệm sửa chữa điện nước, lắp đặt camera thực tế tại khu vực ${locName} từ đội ngũ Hoàng Tuấn MPE.`).substring(0, 160),
      keywords: [data.title, 'kinh nghiệm sửa điện', locName]
    };
  } else if (pageType === 'project' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.title} tại ${locName} | Công trình Hoàng Tuấn MPE`,
      metaDescription: `${data.shortDescription || data.fullDescription || `Công trình thực tế thi công bởi đội ngũ kĩ sư Hoàng Tuấn MPE tại ${locName}.`}`.substring(0, 160),
      keywords: [data.title, `thi công ${data.category}`, `dự án ${locName}`, 'Hoàng Tuấn MPE'].filter(Boolean)
    };
  }

  const activeSeo = seo || fallbackSeo;
  const activeBiz = biz || localBizFallback;
  const siteOrigin = 'https://hoangtuanmpe.com';
  
  // Strict path normalization for SEO:
  // 1. Lowercase path
  // 2. Collapse contiguous slashes
  // 3. Remove trailing slashes (unless it is '/')
  let cleanNormPath = routerLoc.pathname.toLowerCase().replace(/\/+/g, '/');
  if (cleanNormPath.length > 1 && cleanNormPath.endsWith('/')) {
    cleanNormPath = cleanNormPath.slice(0, -1);
  }
  const currentHref = `${siteOrigin}${cleanNormPath}`;

  // Custom canonical from CMS or normalized currentHref
  let rawCanonical = activeSeo.canonicalUrl || currentHref;
  let canonical = rawCanonical;
  if (rawCanonical) {
    try {
      const u = new URL(rawCanonical);
      let p = u.pathname.toLowerCase().replace(/\/+/g, '/');
      if (p.length > 1 && p.endsWith('/')) {
        p = p.slice(0, -1);
      }
      canonical = `${u.protocol}//${u.hostname}${p}`;
    } catch {
      let p = rawCanonical.toLowerCase().replace(/\/+/g, '/');
      if (p.length > 1 && p.endsWith('/')) {
        p = p.slice(0, -1);
      }
      canonical = p;
    }
  }

  const ogImg = activeSeo.ogImage || 'https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=1200';

  const schemas: any[] = [];

  // 1. LocalBusiness Schema (Highly Optimized)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ElectricalContractor', 'Plumber'],
    '@id': `${siteOrigin}/#local-business-${locationSlug}`,
    name: activeBiz.name,
    legalName: activeBiz.legalName || activeBiz.name,
    logo: activeBiz.logo || `${siteOrigin}/logo.png`,
    url: `${siteOrigin}/${fallback_location}`,
    telephone: activeBiz.telephone || '0389 011 315',
    priceRange: activeBiz.priceRange || '150.000đ - 5.000.000đ',
    hasMap: fallback_location === 'bao-loc' 
      ? 'https://maps.google.com/?q=Hoàng+Tuấn+MPE+Bảo+Lộc'
      : 'https://maps.google.com/?q=Hoàng+Tuấn+MPE+Hồ+Chí+Minh',
    sameAs: [
      'https://www.facebook.com/hoangtuanmpe',
      'https://zalo.me/0389011315'
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: activeBiz.address?.streetAddress,
      addressLocality: activeBiz.address?.addressLocality,
      addressRegion: activeBiz.address?.addressRegion,
      postalCode: activeBiz.address?.postalCode,
      addressCountry: 'VN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: fallback_location === 'bao-loc' ? 11.5404 : 10.7769,
      longitude: fallback_location === 'bao-loc' ? 107.8069 : 106.7009
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: fallback_location === 'bao-loc' ? 11.5404 : 10.7769,
        longitude: fallback_location === 'bao-loc' ? 107.8069 : 106.7009
      },
      geoRadius: fallback_location === 'bao-loc' ? '30000' : '20000' // 30km for Bao Loc, 20km for HCM
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: fallback_location === 'bao-loc' ? '142' : '285',
      bestRating: '5',
      worstRating: '1'
    }
  };
  schemas.push(localBusinessSchema);

  // 2. Breadcrumb Schema
  const pathSegments = routerLoc.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locName,
      item: `${siteOrigin}/${fallback_location}`
    }
  ];

  let cumulativePath = `/${fallback_location}`;
  pathSegments.forEach((segment, idx) => {
    if (idx === 0 && (segment === 'bao-loc' || segment === 'ho-chi-minh')) return;
    cumulativePath += `/${segment}`;
    let label = segment;
    if (segment === 'dich-vu') label = 'Dịch vụ';
    else if (segment === 'san-pham') label = 'Sản phẩm';
    else if (segment === 'blog') label = 'Blog';
    else if (segment === 'bang-gia') label = 'Bảng giá';
    else if (segment === 'lien-he') label = 'Liên hệ';
    else if (data?.title) label = data.title;
    else if (data?.name) label = data.name;

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: label,
      item: `${siteOrigin}${cumulativePath}`
    });
  });

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  });

  // 3. Service/Product/Article/FAQ Schemas
  if (pageType === 'service' && data) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': currentHref,
      name: data.title,
      description: data.shortDescription || data.fullDescription,
      provider: { '@id': `${siteOrigin}/#local-business-${locationSlug}` },
      areaServed: { '@type': 'AdministrativeArea', name: locName },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: data.title,
        itemListElement: data.pricing?.map((p: any) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: p.item },
          price: p.price?.replace(/[^\d]/g, '') || '150000',
          priceCurrency: 'VND'
        })) || []
      }
    });
  } else if (pageType === 'product' && data) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': currentHref,
      name: data.name,
      image: data.image,
      description: data.description,
      brand: { '@type': 'Brand', name: data.brand || 'MPE' },
      sku: data.sku || data.slug,
      offers: {
        '@type': 'Offer',
        url: currentHref,
        price: typeof data.price === 'string' ? (data.price.replace(/[^\d]/g, '') || '0') : String(data.price || 0),
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${siteOrigin}/#local-business-${locationSlug}` }
      }
    });
  } else if (pageType === 'article' && data) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.title,
      image: data.image,
      datePublished: data.date,
      author: { '@type': 'Person', name: data.author?.name || 'Administrator' },
      publisher: { '@id': `${siteOrigin}/#local-business-${locationSlug}` },
      description: data.excerpt
    });
  } else if (pageType === 'faq' && Array.isArray(data)) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer }
      }))
    });
  }

  return (
    <Helmet prioritizeSeoTags>
      <title>{activeSeo.metaTitle}</title>
      <meta name="description" content={activeSeo.metaDescription} />
      {activeSeo.keywords && activeSeo.keywords.length > 0 && (
        <meta name="keywords" content={activeSeo.keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonical} />
      
      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content={locRegion} />
      <meta name="geo.placename" content={locPlace} />
      <meta name="geo.position" content={locCoords} />
      <meta name="ICBM" content={locCoords.replace(';', ', ')} />

      <meta property="og:title" content={activeSeo.metaTitle} />
      <meta property="og:description" content={activeSeo.metaDescription} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content="vi_VN" />
      <meta property="og:site_name" content="Hoàng Tuấn MPE" />
      <meta name="theme-color" content="#0EA5E9" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={activeSeo.metaTitle} />
      <meta name="twitter:description" content={activeSeo.metaDescription} />
      <meta name="twitter:image" content={ogImg} />

      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
}

