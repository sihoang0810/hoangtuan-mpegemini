import React, { useState, useEffect, useRef } from 'react';
import { getSanityImageUrl, getSanitySrcSet } from '../lib/sanity';

interface OptimizedImageProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
}

/**
 * Optimized Image component for Core Web Vitals.
 * - Handles priority hints for LCP.
 * - Automatic Sanity URL transformations.
 * - Layout shift prevention with width/height hints.
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const fallbackSrc = 'https://images.unsplash.com/photo-1542013936-6533e14cb263?auto=format&fit=crop&q=80&w=1200';
  const finalSrc = error ? fallbackSrc : getSanityImageUrl(src, width);
  const srcset = !error ? getSanitySrcSet(src) : undefined;

  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div 
      className={`relative overflow-hidden bg-slate-100 ${className}`}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined 
      }}
    >
      <img
        ref={imgRef}
        src={finalSrc}
        srcSet={srcset}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={alt}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading={priority ? 'eager' : 'lazy'}
        // @ts-ignore - fetchPriority is the standard React property name for fetchpriority
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={`w-full h-full transition-opacity duration-700 ease-in-out ${
          objectFit === 'cover' ? 'object-cover' : objectFit === 'contain' ? 'object-contain' : 'object-fill'
        } ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
