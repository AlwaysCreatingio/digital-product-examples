import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Detail from './pages/Detail';
import Author from './pages/Author';
import Guide from './pages/Guide';
import FAQ from './pages/FAQ';
import ScrollToTop from './components/ScrollToTop';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/products/:id" element={<Detail />} />
        <Route path="/author/:name" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
