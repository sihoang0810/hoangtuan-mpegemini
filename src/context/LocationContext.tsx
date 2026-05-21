import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLocations, CMSLocation } from '../lib/sanity';

export type Location = string | null;

interface LocationContextType {
  location: Location;
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

  useEffect(() => {
    let active = true;
    getLocations().then(data => {
      if (!active) return;
      setLocations(data);

      const savedLocation = localStorage.getItem('user-location');
      if (savedLocation && data.some(d => d.name === savedLocation)) {
        setLocationState(savedLocation);
      } else if (data.length > 0) {
        // Find if 'Bảo Lộc' exists as standard fallback, or pick first
        const defaultLoc = data.find(d => d.name === 'Bảo Lộc' || d.id === 'baoloc') || data[0];
        setLocationState(defaultLoc.name);
        setShowPopup(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const setLocation = (loc: Location) => {
    setLocationState(loc);
    if (loc) {
      localStorage.setItem('user-location', loc);
    } else {
      localStorage.removeItem('user-location');
    }
    setShowPopup(false);
  };

  return (
    <LocationContext.Provider value={{ location, setLocation, showPopup, setShowPopup, locations }}>
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
