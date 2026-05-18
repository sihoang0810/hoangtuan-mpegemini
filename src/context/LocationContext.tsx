import React, { createContext, useContext, useState, useEffect } from 'react';

type Location = 'Ho Chi Minh' | 'Bao Loc' | null;

interface LocationContextType {
  location: Location;
  setLocation: (loc: Location) => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<Location>(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const savedLocation = localStorage.getItem('user-location') as Location;
    if (savedLocation) {
      setLocationState(savedLocation);
    } else {
      setShowPopup(true);
    }
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
    <LocationContext.Provider value={{ location, setLocation, showPopup, setShowPopup }}>
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
