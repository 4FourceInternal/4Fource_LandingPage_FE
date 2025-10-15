import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import LogoCompany from '../assets/CompanyLogo.jpeg';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { data: global, loading, error } = useCMSData('global');





  const isActive = (path) => location.pathname === path;

  // Use CMS data or fallback to local content
  // Check if header component exists and has data, otherwise use fallback
  const hasHeaderData = global?.header && 
    global.header.brand && 
    global.header.navLinks && 
    Array.isArray(global.header.navLinks) && 
    global.header.navLinks.length > 0;

  const header = hasHeaderData ? global.header : {
    brand: {
      logoText: 'Qoyy Global'
    },
    navLinks: [
      { path: '/about', label: 'About Us' },
      { path: '/services', label: 'Our Service' },
      { path: '/info', label: 'Quick Info' },
      { path: '/contact', label: 'Contact Us' }
    ]
  };



  if (loading) {
    return (
      <header className="bg-transparent top-0 z-50 h-32">
        <div className="container-custom h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">Loading...</div>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header className="bg-transparent top-0 z-50 h-32">
        <div className="container-custom h-full">
          <div className="flex items-center justify-center h-full">
            <div className="text-white text-lg">
              Error loading header

            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      {/* Mobile Navigation Backdrop - Outside header for full coverage */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-25 z-[9999] md:hidden"
          onClick={() => setIsMenuOpen(false)}
          style={{ 
            pointerEvents: 'auto',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh'
          }}
        />
      )}
      
      <header className="bg-white/80 backdrop-blur-md top-0 z-[10001] h-20 border-b border-tech-200 shadow-sm relative">
      <div className="container-custom h-full relative">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-tech-800 flex items-center hover:scale-105 transition-transform duration-300">
            <img
              src={LogoCompany}
              alt={header?.brand?.logoText || '4F'}
              className="h-12 mr-3"
            />
            <span className="tech-text-gradient font-bold text-xl">Fource Technologies</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {header?.navLinks?.filter(link => link.path !== '/').map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="btn-secondary text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-tech-700 hover:text-tech-800 hover:bg-tech-100 rounded-lg transition-colors duration-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed top-20 left-0 right-0 bg-white border-t border-tech-200 shadow-lg z-[10000] max-h-[calc(100vh-5rem)] overflow-y-auto" style={{ pointerEvents: 'auto' }}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {header?.navLinks?.filter(link => link.path !== '/').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-tech-700 hover:bg-tech-50 hover:text-tech-800 transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
    </>
  );
};

export default Header;