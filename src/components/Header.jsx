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
      
      <header className="bg-dark-900/90 backdrop-blur-md top-0 z-[10001] h-24 border-b border-matrix-green/30 shadow-sm relative cyber-scan-line">
      <div className="container-custom h-full relative">
        <div className="flex items-center justify-between h-full">
          {/* Logo - Left Side */}
          <Link to="/" className="text-2xl font-bold text-matrix-green flex items-center hover:scale-105 transition-transform duration-300 group">
            <div className="relative">
              <img
                src={LogoCompany}
                alt={header?.brand?.logoText || '4F'}
                className="h-14 mr-4 filter drop-shadow-lg"
              />
              <div className="absolute inset-0 bg-matrix-green/20 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="cyber-text-gradient font-bold text-lg font-cyber cyber-text-glow">Fource</span>
              <span className="cyber-text-gradient font-bold text-sm font-cyber cyber-text-glow">Technologies</span>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <nav className="hidden md:flex space-x-1">
            {header?.navLinks?.filter(link => link.path !== '/').map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className="btn-ghost text-sm font-medium font-mono px-4 py-2"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-matrix-green hover:text-neon-cyan hover:bg-matrix-green/10 rounded-lg transition-colors duration-200 border border-matrix-green/30"
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
          <div className="md:hidden fixed top-20 left-0 right-0 bg-dark-900/95 backdrop-blur-md border-t border-matrix-green/30 shadow-lg z-[10000] max-h-[calc(100vh-5rem)] overflow-y-auto" style={{ pointerEvents: 'auto' }}>
            <div className="px-4 pt-4 pb-6 space-y-2">
              {header?.navLinks?.filter(link => link.path !== '/').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-matrix-green hover:bg-matrix-green/10 hover:text-neon-cyan transition-colors duration-200 cursor-pointer font-mono border border-matrix-green/20 hover:border-matrix-green/50"
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