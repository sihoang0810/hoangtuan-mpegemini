import React, { useEffect, useState } from 'react';
import { useLocation as useRouterLocation } from 'react-router-dom';
import { useLocation as useAppLocation } from '../context/LocationContext';
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
  const { locationId, location: appLocation } = useAppLocation();
  const [seo, setSeo] = useState<CMSSeo | null>(null);
  const [biz, setBiz] = useState<CMSLocalBusiness | null>(null);

  // Load SEO and local business data per location
  useEffect(() => {
    let active = true;
    
    // Fetch SEO metadata matched to path and location
    getSeo(routerLoc.pathname, locationId).then(data => {
      if (active) setSeo(data);
    });

    // Fetch local business metadata matched to location
    getLocalBusiness(locationId).then(data => {
      if (active) setBiz(data);
    });

    return () => {
      active = false;
    };
  }, [routerLoc.pathname, locationId]);

  // Apply head updates
  useEffect(() => {
    if (!seo) return;

    // Use current URL for canonical if canonicalUrl is not provided
    const canonical = seo.canonicalUrl || window.location.href;
    const ogImg = seo.ogImage || 'https://hoangtuanmpe.com/images/og-default.jpg';

    // 1. Title
    document.title = seo.metaTitle;

    // Helper functions to manage meta tags
    const setMetaTag = (nameOrProperty: string, value: string, isProperty = false) => {
      const attributeName = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attributeName}="${nameOrProperty}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, nameOrProperty);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    const setLinkCanonical = (href: string) => {
      let element = document.querySelector('link[rel="canonical"]');
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Head Tags
    setMetaTag('description', seo.metaDescription);
    if (seo.keywords && seo.keywords.length > 0) {
      setMetaTag('keywords', seo.keywords.join(', '));
    }
    setLinkCanonical(canonical);

    // 3. OpenGraph Tags
    setMetaTag('og:title', seo.metaTitle, true);
    setMetaTag('og:description', seo.metaDescription, true);
    setMetaTag('og:image', ogImg, true);
    setMetaTag('og:type', pageType === 'article' ? 'article' : 'website', true);
    setMetaTag('og:url', canonical, true);

    // 4. Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', seo.metaTitle);
    setMetaTag('twitter:description', seo.metaDescription);
    setMetaTag('twitter:image', ogImg);

    // 5. JSON-LD Schemas injection
    const injectJsonLd = () => {
      // Remove old script tag
      const existingScript = document.getElementById('json-ld-structured-data');
      if (existingScript) existingScript.remove();

      if (!biz) return;

      const schemas: any[] = [];

      // 5.1 LocalBusiness Schema
      const localBusinessSchema = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `https://hoangtuanmpe.com/#local-business-${locationId}`,
        name: biz.name,
        legalName: biz.legalName || biz.name,
        logo: biz.logo || 'https://hoangtuanmpe.com/logo.png',
        url: window.location.origin + '/' + (locationId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'),
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

      // 5.2 BreadcrumbList Schema
      const pathSegments = routerLoc.pathname.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: appLocation || 'Bảo Lộc',
          item: `${window.location.origin}/${locationId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'}`
        }
      ];

      // Build out sub-breadcrumbs
      let cumulativePath = `/${locationId === 'hcm' ? 'ho-chi-minh' : 'bao-loc'}`;
      pathSegments.forEach((segment, idx) => {
        // Skip location prefix segment
        if (idx === 0 && (segment === 'bao-loc' || segment === 'ho-chi-minh')) return;
        
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

      // 5.3 Service Schema
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
            name: appLocation || 'Bảo Lộc'
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

      // 5.4 Product Schema
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

      // 5.5 Article Schema
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

      // 5.6 FAQPage Schema
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

      // Write consolidated schemas script tag
      const script = document.createElement('script');
      script.id = 'json-ld-structured-data';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemas, null, 2);
      document.head.appendChild(script);

      // Console diagnostic output
      console.log(`%c[SEO] Schema generated for pageType "${pageType}" at active region: "${locationId}"`, 'color: #38bdf8; font-weight: bold;');
    };

    injectJsonLd();

    return () => {
      // Cleanup schemas script tag on unmount
      const existingScript = document.getElementById('json-ld-structured-data');
      if (existingScript) existingScript.remove();
    };
  }, [seo, biz, pageType, data]);

  return null; // Side effect component
}
