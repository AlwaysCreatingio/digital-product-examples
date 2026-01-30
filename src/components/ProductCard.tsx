import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ProductItem } from '../types';

interface Props {
  item: ProductItem;
  variant?: 'default' | 'home' | 'search';
}

// Generate screenshot URL using WordPress mshots (free)
const getScreenshotUrl = (url: string) => {
  const encodedUrl = encodeURIComponent(url);
  return `https://s.wordpress.com/mshots/v1/${encodedUrl}?w=1200&h=900`;
};

const ProductCard: React.FC<Props> = ({ item, variant = 'default' }) => {
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = () => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile && !showOverlay) {
      setShowOverlay(true);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');

  let backLabel = 'Back';
  let backLink = '/';

  if (location.pathname === '/') {
    backLabel = 'Home';
    backLink = '/';
  } else if (location.pathname.includes('browse')) {
    if (categoryParam && categoryParam !== 'All') {
      backLabel = categoryParam;
      backLink = `/browse?category=${categoryParam}`;
    } else {
      backLabel = 'All';
      backLink = '/browse';
    }
  }

  return (
    <Link
      to={`/products/${item.id}`}
      state={{ backLabel, backLink }}
      className="block w-full rounded-[6px] group transition-opacity duration-500"
      onTouchStart={handleTouchStart}
    >
      {/* Card Container */}
      <div ref={containerRef} className={`relative w-full bg-black border rounded-[6px] overflow-hidden transition-colors ${showOverlay ? 'border-brand-button' : 'border-[#15194F] group-hover:border-brand-button'}`} style={{ aspectRatio: '830 / 600' }}>

        {/* Thumbnail or Screenshot */}
        <div className="absolute inset-0 overflow-hidden bg-[#0a0a0a]">
          {/* Shimmer loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#1a1a2e] to-[#0a0a0a] animate-pulse" />
          )}
          <img
            src={item.thumbnail || (item.url ? getScreenshotUrl(item.url) : '')}
            alt={item.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Description Overlay */}
        <div className={`absolute inset-0 bg-[#0a0a0a] flex flex-col items-center justify-center p-6 transition-opacity duration-300 z-20 text-center ${showOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <h3 className={`font-bold text-white font-display mb-2 uppercase tracking-wide leading-tight line-clamp-2 ${variant === 'home' ? 'text-xl' : 'text-2xl'}`}>
            {item.title}
          </h3>
          <p className={`text-gray-300 font-medium leading-relaxed line-clamp-3 ${variant === 'home' ? 'text-sm' : 'text-base'}`}>
            {item.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
