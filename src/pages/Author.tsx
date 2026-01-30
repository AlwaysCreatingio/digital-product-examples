import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { ChevronRight } from 'lucide-react';

const Author: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decodedName = decodeURIComponent(name || '');

  const authorProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.author === decodedName);
  }, [decodedName]);

  if (authorProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-4">Author not found</h1>
          <Link to="/browse" className="text-brand-accent font-bold">Browse Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-black border-b border-white/10">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-16">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
              <Link to="/browse" className="hover:text-white transition-colors">All Products</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{decodedName}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white uppercase tracking-normal mb-3">{decodedName}</h1>
            <p className="text-lg text-gray-400 font-normal leading-relaxed">
              {authorProducts.length} {authorProducts.length === 1 ? 'product' : 'products'} by this creator
            </p>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authorProducts.map(item => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Author;
