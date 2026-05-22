import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import LogoCompany from '../assets/CompanyLogo.png';

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

  const fallbackNavLinks = [
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Service' },
    { path: '/clients', label: 'Our Client' },
    { path: '/info', label: 'Quick Info' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const mergeNavLinks = (links) => {
    const list = [...(links || [])];
    if (!list.some((l) => l.path === '/clients')) {
      const idx = list.findIndex((l) => l.path === '/services');
      list.splice(idx >= 0 ? idx + 1 : list.length, 0, { path: '/clients', label: 'Our Client' });
    }
    return list;
  };

  const header = hasHeaderData
    ? { ...global.header, navLinks: mergeNavLinks(global.header.navLinks) }
    : {
        brand: { logoText: 'Qoyy Global' },
        navLinks: fallbackNavLinks,
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
      
      <header className=" top-0 z-[10001] h-20 mt-10">
        <div className="container-custom h-full px-4">
          <div className="h-full rounded-2xl glass-effect flex items-center justify-between px-4 md:px-6">
            {/* Logo - Left */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-800/80 flex items-center justify-center">
                <img
                  src={LogoCompany}
                  alt={header?.brand?.logoText || '4F'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-300 tracking-wide uppercase">
                  {header?.brand?.logoText || 'Fource Technologies'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Integrated tech & digital solutions
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <nav className="hidden md:flex items-center  gap-2">
              {header?.navLinks?.filter(link => link.path !== '/').map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-xs font-medium text-slate-200/80 hover:text-white px-4 py-2 rounded-full transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-100 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 border border-white/10"
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden fixed top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl z-[10000] max-h-[calc(100vh-5rem)] overflow-y-auto"
            style={{ pointerEvents: 'auto' }}
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {header?.navLinks?.filter(link => link.path !== '/').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base font-medium text-slate-100 hover:bg-white/5 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;