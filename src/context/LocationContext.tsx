import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { getLocations, CMSLocation } from '../lib/sanity';

export type Location = string | null;

interface LocationContextType {
  location: Location;
  locationId: string;
  setLocation: (loc: Location) => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  locations: CMSLocation[];
  changeLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [locations, setLocations] = useState<CMSLocation[]>([]);
  
  const routerLoc = useRouterLocation();
  const navigate = useNavigate();

  // Map representation - use strictly canonical slugs
  const NAME_TO_ROUTE: Record<string, string> = {
    'Bảo Lộc': 'bao-loc',
    'Hồ Chí Minh': 'ho-chi-minh',
  };

  const locationId = location === 'Hồ Chí Minh' ? 'ho-chi-minh' : 'bao-loc';

  // Load locations from CMS initially
  useEffect(() => {
    let active = true;
    getLocations().then(data => {
      if (!active) return;
      setLocations(data);
    });

    const isConfirmed = sessionStorage.getItem('user-location-confirmed') || localStorage.getItem('user-location');
    const isLater = sessionStorage.getItem('user-location-later');
    
    // Intercept legacy URL prefixes and normalize to canonical
    const parts = window.location.pathname.split('/');
    const prefix = parts[1];
    
    if (prefix === 'baoloc' || prefix === 'bao_loc') {
      parts[1] = 'bao-loc';
      navigate(parts.join('/') + window.location.search, { replace: true });
      return;
    }
    if (prefix === 'hochiminh' || prefix === 'hcm') {
      parts[1] = 'ho-chi-minh';
      navigate(parts.join('/') + window.location.search, { replace: true });
      return;
    }

    const validPrefixes = ['bao-loc', 'ho-chi-minh'];
    const hasPrefix = validPrefixes.includes(prefix);

    // Show popup only if not confirmed, not skipped via 'Để sau' in this session, AND no location prefix exists in current URL
    if (!isConfirmed && !isLater && !hasPrefix) {
      setShowPopup(true);
    }
    
    return () => {
      active = false;
    };
  }, [navigate]);

  // Synchronize route suffix with Location state
  useEffect(() => {
    const parts = routerLoc.pathname.split('/');
    const prefix = parts[1]; // e.g. "bao-loc" or "ho-chi-minh"

    const validPrefixes = ['bao-loc', 'ho-chi-minh'];
    const hasPrefix = validPrefixes.includes(prefix);
    
    // Support legacy pre-saved values in localstorage and auto-normalize them
    let savedLocation = localStorage.getItem('user-location');
    if (savedLocation === 'baoloc' || savedLocation === 'bao_loc' || savedLocation === 'Bảo Lộc') {
      savedLocation = 'bao-loc';
      localStorage.setItem('user-location', 'bao-loc');
    } else if (savedLocation === 'hcm' || savedLocation === 'hochiminh' || savedLocation === 'Hồ Chí Minh') {
      savedLocation = 'ho-chi-minh';
      localStorage.setItem('user-location', 'ho-chi-minh');
    }

    const isLater = sessionStorage.getItem('user-location-later');

    if (hasPrefix) {
      const mappedName = prefix === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
      if (location !== mappedName) {
        setLocationState(mappedName);
        console.log(`%c[LOCATION] Current routing location detected from URL: "${prefix}"`, 'color: #38bdf8; font-weight: bold;');
      }
      // If we directly access a prefixed URL, mark as confirmed and save selection to localStorage
      sessionStorage.setItem('user-location-confirmed', 'true');
      if (!savedLocation || savedLocation !== prefix) {
        localStorage.setItem('user-location', prefix);
      }
    } else {
      // URL has no location prefix (e.g. "/" or "/dich-vu")
      if (savedLocation && validPrefixes.includes(savedLocation)) {
        // Redirect to saved location prefix
        let redirectPath = `/${savedLocation}`;
        if (routerLoc.pathname !== '/') {
          redirectPath = `/${savedLocation}${routerLoc.pathname}`;
        }
        navigate(`${redirectPath}${routerLoc.search}`, { replace: true });
      } else {
        // No saved location and no prefix in URL.
        // If they chose "Để sau", do not redirect and do not show popup.
        // Otherwise, show popup.
        if (!isLater && !sessionStorage.getItem('user-location-confirmed')) {
          setShowPopup(true);
        }
      }
    }
  }, [routerLoc.pathname, location, navigate]);

  const setLocation = (locName: Location) => {
    if (!locName) return;
    
    const canonicalName = (locName === 'ho-chi-minh' || locName === 'Hồ Chí Minh' || locName === 'hcm' || locName === 'hochiminh' || locName === 'Hồ Chí Minh') ? 'Hồ Chí Minh' : 'Bảo Lộc';
    const canonicalSlug = canonicalName === 'Hồ Chí Minh' ? 'ho-chi-minh' : 'bao-loc';
    
    setLocationState(canonicalName);
    localStorage.setItem('user-location', canonicalSlug);
    sessionStorage.setItem('user-location-confirmed', 'true');
    setShowPopup(false);

    // Redirect current route to match selected location prefix
    const pathParts = routerLoc.pathname.split('/');
    const currentPrefix = pathParts[1];

    if (currentPrefix === 'bao-loc' || currentPrefix === 'ho-chi-minh' || currentPrefix === 'baoloc' || currentPrefix === 'hcm') {
      pathParts[1] = canonicalSlug;
      navigate(`${pathParts.join('/')}${routerLoc.search}`);
    } else {
      const remainingPath = routerLoc.pathname === '/' ? '' : routerLoc.pathname;
      navigate(`/${canonicalSlug}${remainingPath}${routerLoc.search}`);
    }
  };

  const changeLocation = () => {
    localStorage.removeItem('user-location');
    sessionStorage.removeItem('user-location-confirmed');
    sessionStorage.removeItem('user-location-later');
    setLocationState(null);
    
    // Strip prefix from the current path to go to default raw URL first
    const pathParts = routerLoc.pathname.split('/');
    const prefix = pathParts[1];
    if (prefix === 'bao-loc' || prefix === 'ho-chi-minh' || prefix === 'baoloc' || prefix === 'hcm') {
      pathParts.splice(1, 1);
    }
    const targetPath = pathParts.join('/') || '/';
    
    setShowPopup(true);
    navigate(`${targetPath}${routerLoc.search}`);
  };

  return (
    <LocationContext.Provider value={{ 
      location, 
      locationId, 
      setLocation, 
      showPopup, 
      setShowPopup, 
      locations,
      changeLocation
    }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
