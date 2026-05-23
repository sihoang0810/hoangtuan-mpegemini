import { Phone, Clock, MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { LOCATIONS as STATIC_LOCATIONS } from '../constants';

export default function TopBar() {
  const { locationSlug, setShowPopup, locations } = useLocation();
  
  const activeLocations = locations.length > 0 ? locations : STATIC_LOCATIONS;
  
  const mappedDisplayName = locationSlug === 'ho-chi-minh' ? 'Hồ Chí Minh' : 'Bảo Lộc';
  const currentLocationInfo = activeLocations.find(l => l.name === mappedDisplayName) || activeLocations[0];
  const displayHotline = currentLocationInfo?.hotline || '0389.011.315';

  return (
    <div className="bg-brand-secondary text-white py-2 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
          {/* Left: Support */}
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-brand-primary" />
            <span className="whitespace-nowrap">HỖ TRỢ NHANH 24/7</span>
          </div>

          {/* Center: Tech Hotline */}
          <div className="hidden lg:flex items-center gap-2">
            <Phone size={14} className="text-brand-primary" />
            <span className="whitespace-nowrap">HOTLINE KỸ THUẬT: {displayHotline}</span>
          </div>
          
          {/* Right: Location Selection */}
          <button 
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 hover:text-brand-primary transition-colors cursor-pointer"
          >
            <MapPin size={14} className="text-brand-primary" />
            <span className="whitespace-nowrap">Khu vực: {mappedDisplayName}</span>
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
}
