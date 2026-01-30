import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 mt-12">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <img
            src="https://beehiiv-images-production.s3.amazonaws.com/uploads/asset/file/b28f7bac-de4b-4114-9b96-6820df23000b/test.png?t=1769800263"
            alt="Logo"
            className="h-16"
          />
        </div>
        <div className="flex gap-8 mb-8 text-sm font-bold text-gray-500">
          <Link to="/browse" className="hover:text-white transition-colors">Browse</Link>
          <Link to="/guide" className="hover:text-white transition-colors">Guide</Link>
          <Link to="/faq" className="hover:text-white transition-colors">FAQ</Link>
        </div>
        <div className="text-center text-gray-600 text-sm font-medium">
          &copy; {new Date().getFullYear()} Digital Product Examples. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
