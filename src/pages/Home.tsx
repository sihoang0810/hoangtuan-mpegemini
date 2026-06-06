import React, { useState, useEffect } from 'react';
import PageSEO from '../components/PageSEO';
import PageBuilderRenderer from '../components/PageBuilderRenderer';
import { useLocation } from '../context/LocationContext';
import { getHomepageContent, getHomepageContentSync, CMSHomepage, client } from '../lib/sanity';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  const { locationSlug } = useLocation();
  const [content, setContent] = useState<CMSHomepage>(() => getHomepageContentSync(locationSlug));

  useEffect(() => {
    let active = true;
    
    // Set sync content first
    setContent(getHomepageContentSync(locationSlug));
    
    // Fetch async content from Sanity with caching
    getHomepageContent(locationSlug).then((data) => {
      if (active && data) {
        setContent(data);
      }
    });

    // Real-time subscription to auto-update live website immediately when Sanity draft or published is changed
    const docId = `homepage-${locationSlug}`;
    const subscription = client
      .listen(`*[_id == $docId || _id == $draftId]`, {
        docId,
        draftId: `drafts.${docId}`
      })
      .subscribe((update) => {
        if (active && update.result) {
          const doc = update.result;
          setContent(prev => ({
            ...prev,
            ...doc,
            sections: doc.sections || prev.sections
          }));
        }
      });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [locationSlug]);

  const sections = content?.sections;

  return (
    <div className="w-full min-h-screen pb-20 md:pb-0 flex flex-col justify-between">
      <PageSEO pageType="home" />
      <div className="flex-1 w-full">
        <PageBuilderRenderer 
          sections={sections} 
          locationSlug={locationSlug} 
        />
      </div>
      {(!sections || sections.length === 0) && <FinalCTA />}
    </div>
  );
}


