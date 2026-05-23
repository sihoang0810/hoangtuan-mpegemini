export const LOCATION_BAO_LOC = 'bao-loc';
export const LOCATION_HO_CHI_MINH = 'ho-chi-minh';

export type LocationSlug = typeof LOCATION_BAO_LOC | typeof LOCATION_HO_CHI_MINH;

export function normalizeLocation(locName: string | null | undefined): LocationSlug {
  if (!locName) return LOCATION_BAO_LOC;
  
  const lowerLoc = locName.toString().toLowerCase().trim();
  
  if (
    lowerLoc === 'ho-chi-minh' || 
    lowerLoc === 'hcm' || 
    lowerLoc === 'hochiminh' || 
    lowerLoc === 'hồ chí minh' ||
    lowerLoc === 'tp.hcm'
  ) {
    return LOCATION_HO_CHI_MINH;
  }
  
  return LOCATION_BAO_LOC;
}

export function isValidLocation(locName: string | null | undefined): boolean {
  if (!locName) return false;
  const lowerLoc = locName.toString().toLowerCase().trim();
  return (
    lowerLoc === LOCATION_BAO_LOC || 
    lowerLoc === LOCATION_HO_CHI_MINH ||
    lowerLoc === 'hcm' ||
    lowerLoc === 'hochiminh' ||
    lowerLoc === 'hồ chí minh' ||
    lowerLoc === 'baoloc' ||
    lowerLoc === 'bảo lộc' ||
    lowerLoc === 'bao loc'
  );
}

export function getLocationSlug(): LocationSlug {
  if (typeof window === 'undefined') return LOCATION_BAO_LOC;
  
  // 1. Check URL
  const parts = window.location.pathname.split('/');
  const prefix = parts[1]?.toLowerCase();
  
  if (prefix === LOCATION_HO_CHI_MINH || prefix === 'hcm' || prefix === 'hochiminh') {
    return LOCATION_HO_CHI_MINH;
  }
  if (prefix === LOCATION_BAO_LOC || prefix === 'baoloc') {
    return LOCATION_BAO_LOC;
  }

  // 2. Check localStorage
  const saved = localStorage.getItem('locationSlug');
  if (saved) {
    return normalizeLocation(saved);
  }
  
  return LOCATION_BAO_LOC; // Default
}
