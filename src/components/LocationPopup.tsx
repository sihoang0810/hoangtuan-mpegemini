import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, ArrowRight, X } from 'lucide-react';
import { useLocation } from '../context/LocationContext';
import { LOCATIONS as STATIC_LOCATIONS } from '../constants';

export default function LocationPopup() {
  const { showPopup, setLocation, locations, setShowPopup } = useLocation();

  const activeLocations = locations.length > 0 ? locations : STATIC_LOCATIONS;

  return (
    <AnimatePresence>
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sessionStorage.setItem('user-location-later', 'true');
              if (!localStorage.getItem('locationSlug')) {
                setLocation('bao-loc');
              } else {
                setShowPopup(false);
              }
            }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => {
                sessionStorage.setItem('user-location-later', 'true');
                if (!localStorage.getItem('locationSlug')) {
                  setLocation('bao-loc');
                } else {
                  setShowPopup(false);
                }
              }}
              className="absolute top-6 right-6 z-[110] w-12 h-12 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full flex items-center justify-center shadow-md transition-all border border-slate-200 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label="Đóng bảng chọn khu vực"
              type="button"
            >
              <X size={20} />
            </button>
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold text-brand-secondary mb-4">Chọn Khu Vực Của Bạn</h2>
              <p className="text-slate-500 mb-10">Chúng tôi sẽ hiển thị thông tin phù hợp với khu vực của bạn</p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {activeLocations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id as any)}
                    className="group relative flex flex-col items-center p-8 rounded-3xl border-2 border-slate-100 hover:border-brand-primary hover:bg-brand-primary/5 transition-all text-center animate-in fade-in zoom-in-95 duration-355 cursor-pointer"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <MapPin size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-brand-secondary mb-2">{loc.name}</h3>
                    <div className="flex items-center gap-2 text-brand-primary font-bold text-sm mb-4">
                      <Phone size={14} />
                      {loc.hotline}
                    </div>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {loc.description}
                    </p>
                    <div className="mt-auto flex items-center gap-2 font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Bắt đầu ngay <ArrowRight size={16} />
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    sessionStorage.setItem('user-location-later', 'true');
                    if (!localStorage.getItem('locationSlug')) {
                      setLocation('bao-loc');
                    } else {
                      setShowPopup(false);
                    }
                  }}
                  className="px-8 py-3 rounded-full border border-slate-200 hover:border-brand-primary hover:text-brand-primary text-slate-500 font-bold text-sm transition-all focus:outline-none cursor-pointer duration-200"
                >
                  Để sau / Xem mặc định
                </button>
              </div>
            </div>

            {/* Side Note */}
            <div className="bg-slate-50 p-6 text-center border-t border-slate-100">
              <p className="text-slate-500 text-xs font-medium">
                * Bạn có thể thay đổi khu vực bất cứ lúc nào tại phần đầu trang web.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
