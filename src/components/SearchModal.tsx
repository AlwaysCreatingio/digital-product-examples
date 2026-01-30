import React, { useState, useEffect, useRef, useMemo } from 'react';
import { X, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PRODUCTS } from '../data';
import ProductCard from './ProductCard';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/browse?search=${encodeURIComponent(query)}`);
      onClose();
      setQuery('');
    }
  };

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lowerQuery = query.toLowerCase();
    return PRODUCTS.filter(c =>
      c.title.toLowerCase().includes(lowerQuery) ||
      c.description.toLowerCase().includes(lowerQuery) ||
      c.category.toLowerCase().includes(lowerQuery) ||
      c.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-12 px-4 pb-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#060419]/90 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-[#0B0921] border border-white/10 rounded-xl shadow-2xl p-0 animate-in fade-in slide-in-from-top-4 duration-200 overflow-hidden flex flex-col max-h-[85vh]">

        {/* Search Header */}
        <form onSubmit={handleSearch} className="relative flex items-center shrink-0 border-b border-white/5 p-4 md:p-6 bg-[#0B0921] z-20">
          <Search className="w-6 h-6 text-gray-500 absolute left-8" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-transparent border-none text-2xl text-white placeholder-gray-600 focus:ring-0 pl-12 pr-12 font-sans font-medium outline-none"
          />
          <div className="absolute right-6 flex items-center gap-3">
            <div className="hidden md:flex items-center justify-center px-2 py-1 bg-white/10 rounded text-xs font-mono text-gray-400 border border-white/5">ESC</div>
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </form>

        {/* Results Area */}
        <div className="overflow-y-auto p-6 md:p-8 bg-[#060419] flex-1">
          {query.trim() ? (
            <div className="min-h-[200px]">
              {results.length > 0 ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((item) => (
                      <ProductCard key={item.id} item={item} variant="search" />
                    ))}
                  </div>
                  <div className="text-center pt-4">
                    <button
                      onClick={handleSearch}
                      className="text-brand-accent font-bold hover:text-white transition-colors text-lg"
                    >
                      View all results
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 text-gray-500">
                  <Search className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg">No products found for "{query}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-600 opacity-50">
              <Search className="w-16 h-16 mb-6 opacity-20" />
              <p className="text-xl font-medium">Type to search the library...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
