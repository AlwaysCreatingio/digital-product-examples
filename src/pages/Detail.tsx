import React, { useMemo, useState, useRef, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';
import { ExternalLink, ChevronRight } from 'lucide-react';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const previewRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(0.5);

  const backLink = location.state?.backLink || '/browse';
  const backLabel = location.state?.backLabel || 'All Products';

  const product = PRODUCTS.find(c => c.id === id);

  useEffect(() => {
    const updateScale = () => {
      if (previewRef.current) {
        const containerWidth = previewRef.current.offsetWidth;
        setScaleFactor(containerWidth / 1200);
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(updateScale, 50);
    window.addEventListener('resize', updateScale);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScale);
    };
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    let related = PRODUCTS.filter(c => c.category === product.category && c.id !== product.id);
    if (related.length < 4) {
      const others = PRODUCTS.filter(c => c.category !== product.category && c.id !== product.id).sort(() => 0.5 - Math.random());
      related = [...related, ...others];
    }
    return related.slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white text-center">
        <div>
          <h1 className="text-3xl font-display font-bold mb-4">Product not found</h1>
          <Link to="/" className="text-brand-accent font-bold">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-black border-b border-white/20">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">
                  <Link to={backLink} className="hover:text-white transition-colors shrink-0">{backLabel}</Link>
                  <ChevronRight className="w-4 h-4 shrink-0" />
                  <span className="text-white truncate max-w-[200px] md:max-w-none">{product.title}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-normal mb-4">{product.title}</h1>
                <p className="text-lg text-gray-400 font-normal leading-relaxed mb-6">{product.description}</p>
                <div className="flex flex-wrap gap-4">
                  {product.url && (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-[6px] bg-brand-button px-8 py-3.5 text-[16px] font-medium tracking-normal text-white flex items-center gap-2 btn-stack"
                    >
                      View Product
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <a
                    href="https://www.beehiiv.com/features/digital-products"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[6px] bg-transparent border-2 border-white px-8 py-3.5 text-[16px] font-medium tracking-normal text-white flex items-center gap-2 btn-stack"
                  >
                    Sell Your Own Products
                  </a>
                </div>
              </div>
              {product.url && (
                <div ref={previewRef} className="relative w-full bg-black border border-[#15194F] rounded-[6px] overflow-hidden" style={{ aspectRatio: '830 / 600' }}>
                  <iframe
                    src={product.url}
                    title={product.title}
                    loading="lazy"
                    className="absolute top-0 left-0 border-none pointer-events-none origin-top-left"
                    style={{
                      width: '1200px',
                      height: '900px',
                      transform: `scale(${scaleFactor})`,
                    }}
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
          {/* Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-[6px] p-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Author</h3>
                <Link to={`/author/${encodeURIComponent(product.author)}`} className="text-lg text-white font-medium hover:text-brand-accent transition-colors">
                  {product.author}
                </Link>
              </div>
              <Link
                to={`/author/${encodeURIComponent(product.author)}`}
                className="shrink-0 px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-[6px] hover:bg-white/10 hover:border-white/40 transition-all"
              >
                View All
              </Link>
            </div>
            {product.tags && product.tags.length > 0 && (
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[6px] p-6 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map(tag => (
                      <Link key={tag} to={`/browse?tag=${tag}`} className="px-2 py-1 bg-white/10 rounded text-sm text-white hover:bg-white/20 transition-colors">{tag}</Link>
                    ))}
                  </div>
                </div>
                <Link
                  to="/browse"
                  className="shrink-0 px-4 py-2 text-sm font-medium text-white border border-white/20 rounded-[6px] hover:bg-white/10 hover:border-white/40 transition-all"
                >
                  Browse All
                </Link>
              </div>
            )}
          </div>

          {/* Product Preview */}
          <div className="relative w-full border border-white/10 rounded-[6px] overflow-hidden shadow-2xl bg-black mb-12" style={{ height: '100vh', minHeight: '600px' }}>
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : product.url ? (
              <iframe
                src={product.url}
                title={product.title}
                loading="lazy"
                className="w-full h-full border-none"
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-8xl font-display font-bold text-white/10">{product.title[0]}</span>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-16 pt-0">
            <div className="h-[1px] w-full bg-white/10 mb-12"></div>
            <h2 className="text-3xl font-bold font-display text-white mb-8 uppercase">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Detail;
