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

  if (!seo || !biz) return null;

  const canonical = seo.canonicalUrl || window.location.href;
  const ogImg = seo.ogImage || 'https://hoangtuanmpe.com/images/og-default.jpg';
  const finalSlug = (locationSlug === 'ho-chi-minh' || locationSlug === 'hcm') ? 'ho-chi-minh' : 'bao-loc';

  const schemas: any[] = [];

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `https://hoangtuanmpe.com/#local-business-${locationSlug}`,
    name: biz.name,
    legalName: biz.legalName || biz.name,
    logo: biz.logo || 'https://hoangtuanmpe.com/logo.png',
    url: window.location.origin + '/' + finalSlug,
    telephone: biz.telephone || '0389.011.315',
    priceRange: biz.priceRange || '$$',
    address: biz.address ? {
      '@type': 'PostalAddress',
      streetAddress: biz.address.streetAddress,
      addressLocality: biz.address.addressLocality,
      addressRegion: biz.address.addressRegion,
      postalCode: biz.address.postalCode,
      addressCountry: biz.address.addressCountry || 'VN'
    } : undefined,
    geo: biz.geo ? {
      '@type': 'GeoCoordinates',
      latitude: biz.geo.latitude,
      longitude: biz.geo.longitude
    } : undefined,
    openingHoursSpecification: biz.openingHoursSpecification?.map(spec => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek?.split('-') || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: spec.opens || '00:00',
      closes: spec.closes || '23:59'
    }))
  };
  schemas.push(localBusinessSchema);

  // BreadcrumbList Schema
  const pathSegments = routerLoc.pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc',
      item: `${window.location.origin}/${finalSlug}`
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
      item: window.location.origin + cumulativePath
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
      '@id': window.location.href,
      name: data.title,
      description: data.shortDescription || data.fullDescription,
      provider: {
        '@type': 'LocalBusiness',
        name: biz.name,
        telephone: biz.telephone
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
        price: p.price.replace(/[^\d]/g, '') || '150000',
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
      '@id': window.location.href,
      name: data.name,
      image: data.image,
      description: data.description,
      offers: {
        '@type': 'Offer',
        price: data.price.replace(/[^\d]/g, '') || '500000',
        priceCurrency: 'VND',
        availability: 'https://schema.org/InStock'
      }
    };
    schemas.push(productSchema);
  }

  // Article Schema
  if (pageType === 'article' && data) {
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': window.location.href,
      headline: data.title,
      image: data.image,
      datePublished: data.date,
      author: {
        '@type': 'Person',
        name: data.author?.name || 'Administrator'
      },
      publisher: {
        '@type': 'Organization',
        name: biz.name,
        logo: {
          '@type': 'ImageObject',
          url: biz.logo || 'https://hoangtuanmpe.com/logo.png'
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
      <title>{seo.metaTitle}</title>
      <meta name="description" content={seo.metaDescription} />
      {seo.keywords && seo.keywords.length > 0 && (
        <meta name="keywords" content={seo.keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={seo.metaTitle} />
      <meta property="og:description" content={seo.metaDescription} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.metaTitle} />
      <meta name="twitter:description" content={seo.metaDescription} />
      <meta name="twitter:image" content={ogImg} />

      <script type="application/ld+json">
        {JSON.stringify(schemas, null, 2)}
      </script>
    </Helmet>
  );
}
