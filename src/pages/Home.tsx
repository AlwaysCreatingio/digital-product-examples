import React, { useState, useRef, useMemo } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ITEMS_PER_PAGE = 12;

const Home: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const browseButtonRef = useRef<HTMLAnchorElement>(null);

  const handleButtonTouch = () => {
    if (browseButtonRef.current) {
      browseButtonRef.current.classList.add('active');
      setTimeout(() => {
        browseButtonRef.current?.classList.remove('active');
      }, 300);
    }
  };

  // Pin specific products at top, randomize the rest
  const sortedProducts = useMemo(() => {
    const pinned = ['newsletter-playbook-founders', 'position-yourself-better', 'radigan-carter-fortress', 'private-dealflow-access', 'founder-session-tyler-denk'];
    const pinnedProducts = pinned.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const rest = PRODUCTS.filter(p => !pinned.includes(p.id)).sort(() => Math.random() - 0.5);
    return [...pinnedProducts, ...rest] as typeof PRODUCTS;
  }, []);

  const currentProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE, sortedProducts.length));
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative isolate px-6 lg:px-8 pt-10 md:pt-20 pb-0 min-h-[300px] flex items-center justify-center bg-black">
          <div className="max-w-[1280px] mx-auto w-full text-center">

            {/* Text Content - Centered */}
            <div className="z-10 max-w-4xl mx-auto animate-in fade-in duration-1000">
              <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 uppercase leading-none tracking-normal antialiased">
                <span className="inline-block animate-fade-slide-right" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>Very</span>{' '}
                <span className="inline-block animate-fade-slide-right bg-gradient-to-r from-[#ffbcf4] to-brand-accent bg-clip-text text-transparent" style={{ animationDelay: '0ms', animationFillMode: 'both' }}>Good</span><br />
                <span className="inline-block animate-fade-slide-right" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>Products</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl leading-relaxed text-gray-400 font-normal mx-auto max-w-2xl">
                Looking for inspiration? Browse our curated collection of digital product examples ready to inspire your next project.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  ref={browseButtonRef}
                  to="/browse"
                  className="w-full sm:w-auto rounded-[6px] bg-brand-button px-8 py-3.5 text-[16px] font-medium tracking-normal text-white text-center flex items-center justify-center gap-2 btn-stack"
                  onTouchStart={handleButtonTouch}
                >
                  Browse All <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://www.beehiiv.com/features/digital-products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto rounded-[6px] bg-transparent border-2 border-white px-8 py-3.5 text-[16px] font-medium tracking-normal text-white text-center btn-stack"
                >
                  Sell Your Own Products
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div id="grid" className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12 lg:py-20">
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentProducts.map((item) => (
                  <ProductCard key={item.id} item={item} variant="home" />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="mt-16 flex items-center justify-center">
                  <button
                    onClick={handleLoadMore}
                    className="flex items-center gap-1.5 rounded-[6px] bg-transparent border border-white/20 px-5 py-2 text-[14px] font-medium tracking-normal text-white/70 text-center hover:bg-white/5 hover:border-white/40 hover:text-white transition-all"
                  >
                    Load More <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-32 bg-white/5 rounded-[6px] border border-white/10">
              <p className="text-xl text-gray-500 font-medium mb-4">No products yet.</p>
              <p className="text-gray-600">Check back soon for curated digital product examples.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
