import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';

const Browse: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialTag = searchParams.get('tag') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortOption, setSortOption] = useState<'featured' | 'newest' | 'oldest' | 'alphabetical' | 'z-a'>('featured');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTag ? [initialTag] : []);

  useEffect(() => {
    const tagParam = searchParams.get('tag');
    if (tagParam) {
      setSelectedTags(prev => prev.includes(tagParam) ? prev : [tagParam]);
    }
  }, [searchParams]);

  const handleTagSelect = (tag: string) => {
    if (tag === 'All') {
      setSelectedTags([]);
      setSearchParams({});
    } else {
      setSelectedTags([tag]);
      setSearchParams({ tag });
    }
  };

  const allTags = useMemo(() => {
    return Array.from(new Set(PRODUCTS.flatMap(c => c.tags || []))).sort();
  }, []);

  // Featured order - same as home page
  const pinnedIds = ['newsletter-playbook-founders', 'position-yourself-better', 'radigan-carter-fortress', 'private-dealflow-access', 'founder-session-tyler-denk'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
      );
    }

    if (selectedTags.length > 0) {
      result = result.filter(c =>
        c.tags && selectedTags.every(tag => c.tags?.includes(tag))
      );
    }

    if (sortOption === 'featured') {
      // Sort by pinned order first, then the rest
      result.sort((a, b) => {
        const aIndex = pinnedIds.indexOf(a.id);
        const bIndex = pinnedIds.indexOf(b.id);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
    } else {
      result.sort((a, b) => {
        switch (sortOption) {
          case 'newest':
            return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
          case 'oldest':
            return new Date(a.date || '').getTime() - new Date(b.date || '').getTime();
          case 'alphabetical':
            return a.title.localeCompare(b.title);
          case 'z-a':
            return b.title.localeCompare(a.title);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [searchQuery, selectedTags, sortOption]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const getCount = (tag: string) => PRODUCTS.filter(c => c.tags && c.tags.includes(tag)).length;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header onTagSelect={handleTagSelect} />

      <main className="flex-1 max-w-[1280px] mx-auto w-full px-6 lg:px-8 py-4 lg:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 lg:gap-8">

          {/* Left Column: Breadcrumbs + Filters */}
          <div className="flex flex-col gap-8">
            {/* Breadcrumb */}
            <div className="flex items-center pt-0 gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 text-gray-500" />
              <span className="text-white">All Products</span>
            </div>

            {/* Left Sidebar - Filters (Hidden on Mobile) */}
            <div className="hidden lg:block space-y-6">
              <div>
                <h3 className="text-lg font-bold font-sans tracking-normal mb-4 text-white">Filters</h3>
                <div className="space-y-3">
                  {allTags.map(tag => (
                    <label key={tag} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => toggleTag(tag)}
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-brand-accent focus:ring-brand-accent focus:ring-offset-0 checked:bg-brand-button checked:border-brand-button transition-all cursor-pointer"
                      />
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-400 font-medium group-hover:text-white transition-colors">{tag}</span>
                        <span className="text-gray-600 text-sm">({getCount(tag)})</span>
                      </div>
                    </label>
                  ))}
                  {allTags.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No tags available.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Search + Grid */}
          <div>

            {/* Header: Search + Sort */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 w-full">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-[6px] py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative group w-full md:w-[200px] shrink-0">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="appearance-none w-full bg-transparent border border-white/20 rounded-[6px] py-3 pl-4 pr-10 text-white font-medium cursor-pointer focus:outline-none focus:border-brand-accent hover:border-white transition-all"
                >
                  <option value="featured" className="bg-[#0a0a0a] text-white">Sort by: Featured</option>
                  <option value="newest" className="bg-[#0a0a0a] text-white">Sort by: Newest</option>
                  <option value="oldest" className="bg-[#0a0a0a] text-white">Sort by: Oldest</option>
                  <option value="alphabetical" className="bg-[#0a0a0a] text-white">Sort by: A-Z</option>
                  <option value="z-a" className="bg-[#0a0a0a] text-white">Sort by: Z-A</option>
                </select>
                <ChevronDown className="w-4 h-4 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none group-hover:text-brand-accent transition-colors" />
              </div>
            </div>

            {/* Active Filters Display */}
            {(selectedTags.length > 0 || searchQuery) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                {selectedTags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-[6px] bg-white/10 text-white text-sm font-bold flex items-center gap-2 border border-white/10">
                    {tag}
                    <button onClick={() => toggleTag(tag)} className="hover:text-brand-accent"><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {(selectedTags.length > 0 || searchQuery) && (
                  <button
                    onClick={() => { setSelectedTags([]); setSearchQuery(''); }}
                    className="text-sm text-gray-500 underline hover:text-white ml-2"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-32 bg-white/5 rounded-[6px] border border-white/10">
                <p className="text-xl text-gray-500 font-medium">No products found.</p>
                <button
                  onClick={() => { setSelectedTags([]); setSearchQuery(''); }}
                  className="mt-4 text-brand-accent font-bold hover:underline"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Browse;
