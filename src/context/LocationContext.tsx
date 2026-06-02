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
  // Use state to track current slug, initialize lazily if possible but safe for hydration
  const [locationSlugState, setLocationSlugState] = useState<LocationSlug>(LOCATION_BAO_LOC);
  const [showPopupState, setShowPopupState] = useState(true);
  const hasInteractedRef = React.useRef(false);
  const [locations, setLocations] = useState<CMSLocation[]>([]);
  
  const routerLoc = useRouterLocation();
  const navigate = useNavigate();

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

    if (isUrlPrefixOk) {
      if (locationSlugState !== prefix) {
        setLocationSlugState(prefix as LocationSlug);
      }
      
      // Keep localstorage in sync with URL
      if (!savedLocation || savedLocation !== prefix) {
        localStorage.setItem('locationSlug', prefix);
      }
    } else {
      // No prefix in URL
      if (isValidLocation(savedLocation)) {
        // Redirect to saved location prefix
        let redirectPath = `/${savedLocation}`;
        if (routerLoc.pathname !== '/') {
          redirectPath = `/${savedLocation}${routerLoc.pathname}`;
        }
        navigate(`${redirectPath}${routerLoc.search}`, { replace: true });
      } else {
        // No saved location and no prefix in URL. SHOW POPUP
        if (!hasInteractedRef.current) {
          setShowPopupState(true);
        }
      }
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
    localStorage.removeItem('locationSlug');
    hasInteractedRef.current = false;
    
    // Strip prefix from the current path to go to default raw URL first
    const pathParts = routerLoc.pathname.split('/');
    const prefix = pathParts[1];
    if (prefix === LOCATION_BAO_LOC || prefix === LOCATION_HO_CHI_MINH) {
      pathParts.splice(1, 1);
    }
    const targetPath = pathParts.join('/') || '/';
    
    setShowPopupState(true);
    navigate(`${targetPath}${routerLoc.search}`);
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
