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
  pageType?: 'home' | 'service' | 'product' | 'article' | 'faq' | 'general';
  data?: any; // The service, product, or post document
}

export default function PageSEO({ pageType = 'general', data }: PageSEOProps) {
  const routerLoc = useRouterLocation();
  const { locationSlug } = useAppLocation();
  const [seo, setSeo] = useState<CMSSeo | null>(null);
  const [biz, setBiz] = useState<CMSLocalBusiness | null>(null);

  // Load SEO and local business data per location
  useEffect(() => {
    let active = true;
    
    // Fetch SEO metadata matched to path and location
    getSeo(routerLoc.pathname, locationSlug).then(data => {
      if (active) setSeo(data);
    });

    // Fetch local business metadata matched to location
    getLocalBusiness(locationSlug).then(data => {
      if (active) setBiz(data);
    });

    return () => {
      active = false;
    };
  }, [routerLoc.pathname, locationSlug]);

  // ✅ Synchronous Fallback Calculations (Guarantees SEO Tags Never Block / Return Null)
  const fallback_location = (locationSlug as string === 'ho-chi-minh' || locationSlug as string === 'hcm') ? 'ho-chi-minh' : 'bao-loc';

  // Clean path to match static local SEO
  let cleanPath = routerLoc.pathname;
  if (cleanPath.startsWith('/bao-loc')) cleanPath = cleanPath.slice(8);
  else if (cleanPath.startsWith('/ho-chi-minh')) cleanPath = cleanPath.slice(12);
  else if (cleanPath.startsWith('/hcm')) cleanPath = cleanPath.slice(4);
  if (!cleanPath) cleanPath = '/';

  const localSeoFallback = LOCALIZED_SEO[fallback_location][cleanPath] || LOCALIZED_SEO[fallback_location]['/'];
  const localBizFallback = LOCALIZED_BUSINESS_SCHEMA[fallback_location];

  let fallbackSeo: CMSSeo = {
    pagePath: routerLoc.pathname,
    metaTitle: localSeoFallback?.metaTitle || 'Hoàng Tuấn MPE | Thợ Sửa Điện Nước Uy Tín Giá Rẻ',
    metaDescription: localSeoFallback?.metaDescription || 'Dịch vụ sửa chữa điện nước, tìm rò rỉ nước ngầm, lắp camera an ninh chất lượng cao của Hoàng Tuấn MPE.',
    keywords: localSeoFallback?.keywords || []
  };

  const locName = fallback_location === 'ho-chi-minh' ? 'TP.HCM' : 'Bảo Lộc';

  if (pageType === 'service' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.title || 'Dịch vụ'} | Hoàng Tuấn MPE ${locName}`,
      metaDescription: data.shortDescription || `Thợ sửa cơ điện, thiết bị nước, ${data.title} uy tín chất lượng hàng đầu tại khu vực ${locName}.`,
      keywords: [data.title, 'sua dien lock', `sua dien ${fallback_location}`, `sua nuoc ${fallback_location}`]
    };
  } else if (pageType === 'product' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.name || data.title || 'Sản phẩm'} chính hãng | Hoàng Tuấn MPE ${locName}`,
      metaDescription: (data.description || data.shortDescription || `Sản phẩm ${data.name || data.title} chính hãng, lắp đặt tận nơi giá tốt tại ${locName}.`).substring(0, 160),
      keywords: [data.name || data.title, `thiet bi dien ${fallback_location}`, `thiet bi nuoc ${fallback_location}`]
    };
  } else if (pageType === 'article' && data) {
    fallbackSeo = {
      pagePath: routerLoc.pathname,
      metaTitle: `${data.title || 'Tin tức'} | Cẩm nang Hoàng Tuấn MPE ${locName}`,
      metaDescription: (data.excerpt || data.shortDescription || `Chia sẻ kinh nghiệm sửa điện nước dân dụng thực tế, an toàn của Hoàng Tuấn MPE tại ${locName}.`).substring(0, 160),
      keywords: data.tags || [data.title, 'meo vat gia dinh', locName]
    };
  }

  // Choose loaded state vs fallback state
  const activeSeo = seo || fallbackSeo;
  const activeBiz = biz || localBizFallback;

  // ✅ SSR-safe helpers
  const isBrowser = typeof window !== 'undefined';
  const siteOrigin = isBrowser ? window.location.origin : 'https://hoangtuanmpe.com';
  const currentHref = isBrowser ? window.location.origin + window.location.pathname : `https://hoangtuanmpe.com${routerLoc.pathname}`;

  const canonical = activeSeo.canonicalUrl || currentHref;
  const ogImg = activeSeo.ogImage || 'https://hoangtuanmpe.com/images/og-default.jpg';
  const finalSlug = (locationSlug === 'ho-chi-minh' || (locationSlug as string) === 'hcm') ? 'ho-chi-minh' : 'bao-loc';

  const schemas: any[] = [];

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://hoangtuanmpe.com/#local-business-${locationSlug}`,
    name: activeBiz.name,
    legalName: activeBiz.legalName || activeBiz.name,
    logo: activeBiz.logo || 'https://hoangtuanmpe.com/logo.png',
    url: siteOrigin + '/' + finalSlug,
    telephone: activeBiz.telephone || '0389.011.315',
    priceRange: activeBiz.priceRange || '$$',
    address: activeBiz.address ? {
      '@type': 'PostalAddress',
      streetAddress: activeBiz.address.streetAddress,
      addressLocality: activeBiz.address.addressLocality,
      addressRegion: activeBiz.address.addressRegion,
      postalCode: activeBiz.address.postalCode,
      addressCountry: activeBiz.address.addressCountry || 'VN'
    } : undefined,
    geo: activeBiz.geo ? {
      '@type': 'GeoCoordinates',
      latitude: activeBiz.geo.latitude,
      longitude: activeBiz.geo.longitude
    } : undefined,
    openingHoursSpecification: activeBiz.openingHoursSpecification?.map(spec => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: Array.isArray(spec.dayOfWeek)
        ? spec.dayOfWeek
        : (spec.dayOfWeek === 'Monday-Sunday'
            ? ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
            : (spec.dayOfWeek?.split(',').map(d => d.trim()) || ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'])),
      opens: spec.opens || '00:00',
      closes: spec.closes || '23:59'
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  };
  schemas.push(localBusinessSchema);

  // BreadcrumbList Schema
  const pathSegments = routerLoc.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc',
      item: `${siteOrigin}/${finalSlug}`
    }
  ];

  let cumulativePath = `/${finalSlug}`;
  pathSegments.forEach((segment, idx) => {
    if (idx === 0 && (segment === 'bao-loc' || segment === 'baoloc' || segment === 'ho-chi-minh' || segment === 'hcm')) return;
    
    cumulativePath += `/${segment}`;
    
    let label = segment;
    if (segment === 'dich-vu') label = 'Dịch vụ';
    else if (segment === 'san-pham') label = 'Sản phẩm';
    else if (segment === 'blog') label = 'Blog';
    else if (segment === 'bang-gia') label = 'Bảng giá';
    else if (segment === 'lien-he') label = 'Liên hệ';
    else if (data && data.title) label = data.title;
    else if (data && data.name) label = data.name;

    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: label,
      item: siteOrigin + cumulativePath
    });
  });

  const breadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  };
  schemas.push(breadcrumbListSchema);

  // Service Schema
  if (pageType === 'service' && data) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': currentHref,
      name: data.title,
      description: data.shortDescription || data.fullDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: activeBiz.name,
        telephone: activeBiz.telephone
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc'
      },
      offers: data.pricing?.map((p: any) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: p.item
        },
        price: p.price?.replace(/[^\d]/g, '') || '150000',
        priceCurrency: 'VND'
      }))
    };
    schemas.push(serviceSchema);
  }

  // Product Schema
  if (pageType === 'product' && data) {
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': currentHref,
      name: data.name,
      image: data.image,
      description: data.description,
      brand: {
        '@type': 'Brand',
        name: data.brand || 'MPE Chính Hãng'
      },
      sku: data.sku || data.slug,
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: activeBiz.name
      },
      offers: {
        '@type': 'Offer',
        url: currentHref,
        price: typeof data.price === 'string' ? (data.price.replace(/[^\d]/g, '') || '0') : String(data.price || 0),
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: activeBiz.name }
      }
    };
    schemas.push(productSchema);
  }

  // Article Schema
  if (pageType === 'article' && data) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': currentHref,
      headline: data.title,
      image: data.image,
      datePublished: data.date,
      author: {
        '@type': 'Person',
        name: data.author?.name || 'Administrator'
      },
      publisher: {
        '@type': 'Organization',
        name: activeBiz.name,
        logo: {
          '@type': 'ImageObject',
          url: activeBiz.logo || 'https://hoangtuanmpe.com/logo.png'
        }
      },
      description: data.excerpt
    };
    schemas.push(articleSchema);
  }

  // FAQPage Schema
  if (pageType === 'faq' && Array.isArray(data)) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.map((item: any) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    };
    schemas.push(faqSchema);
  }

  return (
    <Helmet prioritizeSeoTags>
      <title>{activeSeo.metaTitle}</title>
      <meta name="description" content={activeSeo.metaDescription} />
      {activeSeo.keywords && activeSeo.keywords.length > 0 && (
        <meta name="keywords" content={activeSeo.keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonical} />

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
        {JSON.stringify(schemas, null, 2)}
      </script>
    </Helmet>
  );
}
