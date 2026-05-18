import { Phone, Clock, MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { LOCATIONS } from '../constants';

export default function TopBar() {
  const { location, setShowPopup } = useLocation();
  
  const currentLocationInfo = LOCATIONS.find(l => l.name === location) || LOCATIONS[0];

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
            <span className="whitespace-nowrap">HOTLINE KỸ THUẬT: 0987 654 321</span>
          </div>
          
          {/* Right: Location Selection */}
          <button 
            onClick={() => setShowPopup(true)}
            className="flex items-center gap-2 hover:text-brand-primary transition-colors cursor-pointer"
          >
            <MapPin size={14} className="text-brand-primary" />
            <span className="whitespace-nowrap">Khu vực: {location || 'Bảo Lộc'}</span>
            <ChevronDown size={14} className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
}
