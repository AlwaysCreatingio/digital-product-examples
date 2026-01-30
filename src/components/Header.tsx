import React, { useState, useMemo } from 'react';
import {
  Menu, ChevronDown, X, ArrowRight,
  LayoutGrid, Tag, Search
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import SearchModal from './SearchModal';
import { PRODUCTS } from '../data';

interface HeaderProps {
  onTagSelect?: (tag: string) => void;
  showBorder?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onTagSelect, showBorder = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(() => {
    return sessionStorage.getItem('bannerClosed') !== 'true';
  });

  const closeBanner = () => {
    sessionStorage.setItem('bannerClosed', 'true');
    setIsBannerVisible(false);
  };
  const navigate = useNavigate();

  const allTags = useMemo(() => {
    return Array.from(new Set(PRODUCTS.flatMap(p => p.tags || []))).sort();
  }, []);

  const handleTagClick = (tag: string) => {
    setIsTagOpen(false);
    setIsMenuOpen(false);

    if (onTagSelect) {
      onTagSelect(tag);
    }

    if (tag === 'All') {
      navigate('/browse');
    } else {
      navigate(`/browse?tag=${tag}`);
    }
  };

  return (
    <>
      {/* Top Banner */}
      {isBannerVisible && (
        <div className="bg-gradient-to-r from-[#ec4899] to-[#f472b6] text-white py-3 px-4 relative sticky top-0 z-50">
          <div className="text-center pr-8">
            <a
              href="https://www.beehiiv.com/features/digital-products"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-base font-medium hover:underline inline-flex items-center gap-1 sm:gap-2"
            >
              <span className="hidden sm:inline">Sell your own digital products with 0% platform fees</span>
              <span className="sm:hidden">Sell digital products with 0% fees</span>
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
            </a>
          </div>
          <button
            onClick={closeBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <header className="bg-black">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">

            {/* Logo */}
            <div className="flex items-center gap-2 md:gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <img
                  src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/b28f7bac-de4b-4114-9b96-6820df23000b/test.png?t=1769800263"
                  alt="Logo"
                  className="h-14"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2">
              <Link to="/browse" className="text-base font-normal text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                Browse All
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setIsTagOpen(true)}
                onMouseLeave={() => setIsTagOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 text-base font-normal text-white px-4 py-2 rounded-lg transition-colors outline-none ${isTagOpen ? 'bg-white/10' : 'hover:bg-white/10'}`}
                >
                  Tags
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 mt-0.5 ${isTagOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ease-out origin-top ${isTagOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-1 invisible pointer-events-none'}`}
                  style={{ zIndex: 100 }}
                >
                  <div className="w-[300px] bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl p-4">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleTagClick('All')}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 group text-left transition-colors"
                      >
                        <div className="p-2 bg-white rounded-lg text-[#000000] group-hover:bg-white/90 transition-colors shrink-0">
                          <LayoutGrid className="w-4 h-4" />
                        </div>
                        <span className="text-base font-bold text-white group-hover:text-brand-accent transition-colors">All Products</span>
                      </button>
                      {allTags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => handleTagClick(tag)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 group text-left transition-colors"
                        >
                          <div className="p-2 bg-white rounded-lg text-[#000000] group-hover:bg-white/90 transition-colors shrink-0">
                            <Tag className="w-4 h-4" />
                          </div>
                          <span className="text-base font-bold text-white group-hover:text-brand-accent transition-colors">{tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/faq" className="text-base font-normal text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
                FAQ
              </Link>

              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </nav>

            {/* CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://www.beehiiv.com/features/digital-products"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-brand-button border-2 border-transparent text-white text-base font-medium tracking-normal rounded-[6px] hover:bg-[#1e2580] hover:border-brand-button transition-all flex items-center gap-2"
              >
                Sell Your Own Products <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white rounded-[6px]"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient Border */}
        {showBorder && <div className="h-[2px] w-full bg-gradient-to-r from-black via-white to-black"></div>}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black absolute w-full h-screen top-[98px] left-0 overflow-y-auto pb-20 z-50">
            <div className="px-6 pt-2 pb-6 space-y-4">
              <Link to="/browse" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-normal text-white">Browse All</Link>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-normal text-white">FAQ</Link>
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-500 uppercase tracking-widest">Tags</p>
                <button
                  onClick={() => handleTagClick('All')}
                  className="flex items-center gap-3 w-full text-left py-2 text-base font-normal text-gray-300 pl-2 rounded-[6px] hover:bg-white/5"
                >
                  <LayoutGrid className="w-4 h-4 opacity-70" />
                  All Products
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className="flex items-center gap-3 w-full text-left py-2 text-base font-normal text-gray-300 pl-2 rounded-[6px] hover:bg-white/5"
                  >
                    <Tag className="w-4 h-4 opacity-70" />
                    {tag}
                  </button>
                ))}
              </div>
              <div className="pt-6 border-t border-white/10 space-y-3">
                <a
                  href="https://www.beehiiv.com/features/digital-products"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 bg-brand-button border-2 border-transparent text-white font-medium rounded-[6px] flex items-center justify-center gap-2 hover:bg-[#1e2580] hover:border-brand-button transition-all"
                >
                  Sell Your Own Products <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;
