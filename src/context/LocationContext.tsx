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

  // Map representation - use "baoloc" as requested by the user
  const NAME_TO_ROUTE: Record<string, string> = {
    'Bảo Lộc': 'baoloc',
    'Hồ Chí Minh': 'ho-chi-minh',
  };

  const locationId = location === 'Hồ Chí Minh' ? 'hcm' : 'baoloc';

  // Load locations from CMS initially
  useEffect(() => {
    let active = true;
    getLocations().then(data => {
      if (!active) return;
      setLocations(data);
    });

    const isConfirmed = sessionStorage.getItem('user-location-confirmed') || localStorage.getItem('user-location');
    const isLater = sessionStorage.getItem('user-location-later');
    
    // Check if current URL already has prefix
    const parts = window.location.pathname.split('/');
    const prefix = parts[1];
    const validPrefixes = ['bao-loc', 'baoloc', 'ho-chi-minh'];
    const hasPrefix = validPrefixes.includes(prefix);

    // Show popup only if not confirmed, not skipped via 'Để sau' in this session, AND no location prefix exists in current URL
    if (!isConfirmed && !isLater && !hasPrefix) {
      setShowPopup(true);
    }
    
    return () => {
      active = false;
    };
  }, []);

  // Synchronize route suffix with Location state
  useEffect(() => {
    const parts = routerLoc.pathname.split('/');
    const prefix = parts[1]; // e.g. "bao-loc" or "baoloc" or "ho-chi-minh"

    const validPrefixes = ['bao-loc', 'baoloc', 'ho-chi-minh'];
    const hasPrefix = validPrefixes.includes(prefix);
    const savedLocation = localStorage.getItem('user-location');
    const isLater = sessionStorage.getItem('user-location-later');

    if (hasPrefix) {
      const mappedName = prefix === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
      if (location !== mappedName) {
        setLocationState(mappedName);
        console.log(`%c[LOCATION] Current routing location detected from URL: "${prefix}"`, 'color: #38bdf8; font-weight: bold;');
      }
      // If we directly access a prefixed URL, mark as confirmed and save selection to localStorage
      sessionStorage.setItem('user-location-confirmed', 'true');
      if (!savedLocation || savedLocation !== mappedName) {
        localStorage.setItem('user-location', mappedName);
      }
    } else {
      // URL has no location prefix (e.g. "/" or "/dich-vu")
      if (savedLocation) {
        // Redirect to saved location prefix!
        const targetPrefix = savedLocation === 'Hồ Chí Minh' ? 'ho-chi-minh' : 'baoloc';
        let redirectPath = `/${targetPrefix}`;
        if (routerLoc.pathname !== '/') {
          redirectPath = `/${targetPrefix}${routerLoc.pathname}`;
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
    setLocationState(locName);
    localStorage.setItem('user-location', locName);
    sessionStorage.setItem('user-location-confirmed', 'true');
    setShowPopup(false);

    // Redirect current route to match selected location prefix
    const routePrefix = NAME_TO_ROUTE[locName] || 'baoloc';
    const pathParts = routerLoc.pathname.split('/');
    const currentPrefix = pathParts[1];

    if (currentPrefix === 'bao-loc' || currentPrefix === 'baoloc' || currentPrefix === 'ho-chi-minh') {
      pathParts[1] = routePrefix;
      navigate(`${pathParts.join('/')}${routerLoc.search}`);
    } else {
      const remainingPath = routerLoc.pathname === '/' ? '' : routerLoc.pathname;
      navigate(`/${routePrefix}${remainingPath}${routerLoc.search}`);
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
    if (prefix === 'bao-loc' || prefix === 'baoloc' || prefix === 'ho-chi-minh') {
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
