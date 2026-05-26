import React, { useState, useEffect } from 'react';
import PageSEO from '../components/PageSEO';
import PageBuilderRenderer from '../components/PageBuilderRenderer';
import { useLocation } from '../context/LocationContext';
import { getHomepageContent, getHomepageContentSync, CMSHomepage } from '../lib/sanity';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  const { locationSlug } = useLocation();
  const [content, setContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));

  useEffect(() => {
    let active = true;
    setContent(getHomepageContentSync(locationSlug));
    getHomepageContent(locationSlug).then((data) => {
      if (active && data) setContent(data);
    });
    return () => {
      active = false;
    };
  }, [locationSlug]);

  const titleText = locationSlug === 'ho-chi-minh'
    ? 'Hoàng Tuấn MPE - Dịch Vụ Sửa Điện Nước Camera Uy Tín Tại Hồ Chí Minh'
    : 'Hoàng Tuấn MPE - Dịch Vụ Sửa Điện Nước Camera Uy Tín Tại Bảo Lộc, Lâm Đồng';

  // Extract page builder sections with fallback to empty array
  // If sections structure does not exist yet in Sanity document, PageBuilderRenderer falls back to the default order
  // @ts-ignore
  const sections = content?.sections;

  return (
    <div className="min-h-[80vh] flex flex-col justify-between">
      <PageSEO pageType="home" />
      <div className="flex-1">
        <PageBuilderRenderer sections={sections} locationSlug={locationSlug} />
      </div>
      {(!sections || sections.length === 0) && <FinalCTA />}
    </div>
  );
}

