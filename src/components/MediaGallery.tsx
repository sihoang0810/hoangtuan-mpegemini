import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { Play } from 'lucide-react';

export interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export default function MediaGallery({ items, altPrefix }: { items: MediaItem[], altPrefix: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items || items.length === 0) {
    return <div className="aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100"></div>;
  }

  // Sort videos first
  const sortedItems = [...items].sort((a, b) => {
    if (a.type === 'video' && b.type === 'image') return -1;
    if (a.type === 'image' && b.type === 'video') return 1;
    return 0;
  });

  const activeItem = sortedItems[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main View */}
      <div className="aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-100 relative group">
        {activeItem.type === 'video' ? (
          <video 
            src={activeItem.url} 
            poster={activeItem.thumbnail}
            controls
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <OptimizedImage 
            src={activeItem.url}
            alt={`${altPrefix} - Ảnh ${activeIndex + 1}`}
            width={800}
            height={600}
            priority={true}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Thumbnails row */}
      {sortedItems.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {sortedItems.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer snap-start focus:outline-none ${activeIndex === index ? 'border-brand-primary scale-105 shadow-md shadow-brand-primary/20' : 'border-transparent opacity-60 hover:opacity-100'}`}
              aria-label={`Xem ${item.type === 'video' ? 'video' : 'ảnh'} ${index + 1}`}
            >
              {item.type === 'video' ? (
                <>
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                    {item.thumbnail ? (
                      <OptimizedImage 
                        src={item.thumbnail} 
                        alt={`Thumbnail video ${index + 1}`} 
                        width={80} 
                        height={80} 
                        className="w-full h-full object-cover opacity-60" 
                      />
                    ) : null}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="text-white w-6 h-6 fill-white" />
                    </div>
                  </div>
                </>
              ) : (
                <OptimizedImage 
                  src={item.url} 
                  alt={`Thumbnail ${index + 1}`} 
                  width={80} 
                  height={80} 
                  className="w-full h-full object-cover" 
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
