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
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [locations, setLocations] = useState<CMSLocation[]>([]);
  
  const routerLoc = useRouterLocation();
  const navigate = useNavigate();

  // Map representation
  const NAME_TO_ROUTE: Record<string, string> = {
    'Bảo Lộc': 'bao-loc',
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

    // Show popup immediately when entering the website if they haven't confirmed it in this session
    const isConfirmed = sessionStorage.getItem('user-location-confirmed');
    if (!isConfirmed) {
      setShowPopup(true);
    }
    return () => {
      active = false;
    };
  }, []);

  // Synchronize route suffix with Location state
  useEffect(() => {
    const parts = routerLoc.pathname.split('/');
    const prefix = parts[1]; // e.g. "bao-loc" or "ho-chi-minh"

    const validPrefixes = ['bao-loc', 'ho-chi-minh'];
    if (validPrefixes.includes(prefix)) {
      const mappedName = prefix === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
      if (location !== mappedName) {
        setLocationState(mappedName);
        console.log(`%c[LOCATION] Current routing location detected from URL: "${prefix}"`, 'color: #38bdf8; font-weight: bold;');
      }
    } else {
      // URL has no location prefix (e.g. "/" or "/dich-vu") => Redirect dynamically
      const savedLocation = localStorage.getItem('user-location');
      const targetPrefix = savedLocation === 'Hồ Chí Minh' ? 'ho-chi-minh' : 'bao-loc';
      
      let redirectPath = `/${targetPrefix}`;
      if (routerLoc.pathname !== '/') {
        redirectPath = `/${targetPrefix}${routerLoc.pathname}`;
      }
      navigate(`${redirectPath}${routerLoc.search}`, { replace: true });
    }
  }, [routerLoc.pathname, location, navigate]);

  const setLocation = (locName: Location) => {
    if (!locName) return;
    setLocationState(locName);
    localStorage.setItem('user-location', locName);
    sessionStorage.setItem('user-location-confirmed', 'true');
    setShowPopup(false);

    // Redirect current route to match selected location prefix
    const routePrefix = NAME_TO_ROUTE[locName] || 'bao-loc';
    const pathParts = routerLoc.pathname.split('/');
    const currentPrefix = pathParts[1];

    if (currentPrefix === 'bao-loc' || currentPrefix === 'ho-chi-minh') {
      pathParts[1] = routePrefix;
      navigate(`${pathParts.join('/')}${routerLoc.search}`);
    } else {
      navigate(`/${routePrefix}${routerLoc.pathname}${routerLoc.search}`);
    }
  };

  return (
    <LocationContext.Provider value={{ 
      location, 
      locationId, 
      setLocation, 
      showPopup, 
      setShowPopup, 
      locations 
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
