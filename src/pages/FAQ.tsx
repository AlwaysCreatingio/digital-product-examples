import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQSection from '../components/FAQSection';

const FAQ: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-brand-ink text-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
