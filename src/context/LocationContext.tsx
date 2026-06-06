import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { getLocations, CMSLocation } from '../lib/sanity';
import { 
  LOCATION_BAO_LOC, 
  LOCATION_HO_CHI_MINH, 
  LocationSlug, 
  normalizeLocation, 
  isValidLocation 
} from '../lib/location';

interface LocationContextType {
  locationSlug: LocationSlug;
  setLocation: (loc: LocationSlug | string) => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  locations: CMSLocation[];
  changeLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const routerLoc = useRouterLocation();
  const navigate = useNavigate();

  // Synchronous URL parsing on first render to match SSR and Client HTML
  const getInitialPrefix = () => {
    const parts = routerLoc.pathname.split('/');
    const prefix = parts[1];
    if (prefix === LOCATION_BAO_LOC || prefix === LOCATION_HO_CHI_MINH) {
      return prefix as LocationSlug;
    }
    return LOCATION_BAO_LOC;
  };

  // Use state to track current slug, initialize lazily if possible but safe for hydration
  const [locationSlugState, setLocationSlugState] = useState<LocationSlug>(getInitialPrefix);
  const [showPopupState, setShowPopupState] = useState(false);
  const hasInteractedRef = React.useRef(false);
  const [locations, setLocations] = useState<CMSLocation[]>([]);

  const showPopup = showPopupState;

  const setShowPopup = (show: boolean) => {
    setShowPopupState(show);
    if (!show) {
      hasInteractedRef.current = true;
    }
  };

  // Load locations from CMS initially
  useEffect(() => {
    let active = true;
    getLocations().then(data => {
      if (!active) return;
      setLocations(data);
    });
    
    // Clear out any old session/local storages immediately
    sessionStorage.removeItem('user-location-confirmed');
    sessionStorage.removeItem('user-location-later');
    
    const legacySaved = localStorage.getItem('user-location');
    if (legacySaved) {
      const normalized = normalizeLocation(legacySaved);
      localStorage.setItem('locationSlug', normalized);
      localStorage.removeItem('user-location');
    }

    return () => {
      active = false;
    };
  }, []);

  // Synchronize route suffix with Location state
  useEffect(() => {
    const parts = routerLoc.pathname.split('/');
    const prefix = parts[1]; // e.g. "bao-loc" or "ho-chi-minh"

    const isUrlPrefixOk = prefix === LOCATION_BAO_LOC || prefix === LOCATION_HO_CHI_MINH;

    const hasLegacyPrefix = prefix === 'hcm' || prefix === 'hochiminh' || prefix === 'baoloc' || prefix === 'bao_loc';

    if (hasLegacyPrefix) {
      // Normalize URL immediately and exit this effect trigger
      parts[1] = normalizeLocation(prefix);
      navigate(parts.join('/') + window.location.search, { replace: true });
      return;
    }

    let savedLocation = localStorage.getItem('locationSlug') as LocationSlug | null;
    let dismissedLater = sessionStorage.getItem('user-location-later') === 'true';

    if (isUrlPrefixOk) {
      if (locationSlugState !== prefix) {
        setLocationSlugState(prefix as LocationSlug);
      }
      
      // Keep localstorage in sync with URL
      if (!savedLocation || savedLocation !== prefix) {
        localStorage.setItem('locationSlug', prefix);
      }

      // If they don't have a saved location explicitly, and haven't chosen to dismiss yet,
      // let's show the popup to guide them (only run on client)
      if (!savedLocation && !dismissedLater && !hasInteractedRef.current) {
        setShowPopupState(true);
      } else {
        setShowPopupState(false);
      }
    } else {
      // No prefix in URL (e.g. '/' or '/dich-vu')
      // Determine target location: use saved or default to 'bao-loc'
      const targetSlug = isValidLocation(savedLocation) ? (savedLocation as LocationSlug) : LOCATION_BAO_LOC;
      
      let redirectPath = `/${targetSlug}`;
      if (routerLoc.pathname !== '/') {
        redirectPath = `/${targetSlug}${routerLoc.pathname}`;
      }
      
      // Perform redirect immediately
      navigate(`${redirectPath}${routerLoc.search}`, { replace: true });
    }
  }, [routerLoc.pathname, locationSlugState, navigate]);

  const setLocation = (locName: LocationSlug | string) => {
    if (!locName) return;
    
    const slug = normalizeLocation(locName);
    
    setLocationSlugState(slug);
    localStorage.setItem('locationSlug', slug);
    setShowPopup(false);

    // Redirect current route to match selected location prefix
    const pathParts = routerLoc.pathname.split('/');
    const currentPrefix = pathParts[1];

    if (currentPrefix === LOCATION_BAO_LOC || currentPrefix === LOCATION_HO_CHI_MINH) {
      pathParts[1] = slug;
      navigate(`${pathParts.join('/')}${routerLoc.search}`);
    } else {
      const remainingPath = routerLoc.pathname === '/' ? '' : routerLoc.pathname;
      navigate(`/${slug}${remainingPath}${routerLoc.search}`);
    }
  };

  const changeLocation = () => {
    setShowPopup(true);
  };

  return (
    <LocationContext.Provider value={{ 
      locationSlug: locationSlugState, 
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
