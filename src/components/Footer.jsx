import React from 'react';
import { Link } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import LogoCompany from '../assets/CompanyLogo.jpeg';
import phoneicon from '../assets/Phone.png';
import emailicon from '../assets/Letter.png';
import addressicon from '../assets/Address.png';

const Footer = () => {
  const { data: global, loading, error } = useCMSData('global');





  // Use CMS data or fallback to local content
  const footer = global?.footer || {
    companyName: '4Fource Technologies',
    copyright: 'COPYRIGHT Ⓒ 2025 4Fource Technologies (002857086-D)‍\nAll rights reserved.',
    quickLinks: [
      { path: '/about', label: 'About Us' },
      { path: '/services', label: 'Our Service' },
      { path: '/info', label: 'Quick Info' },
      { path: '/contact', label: 'Contact Us' }
    ],
    contactInfo: {
      address: 'B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.',
      email: '4fource.dev@gmail.com',
      phone: '+60 19-733 5343'
    }
  };  

  // Extract contact info with fallbacks
  // Handle both Strapi data structure (addressLines array) and fallback (address string)
  const contactInfo = footer?.contactInfo ? {
    address: Array.isArray(footer.contactInfo.addressLines)
      ? footer.contactInfo.addressLines.join(', ').replace(/^"|"$/g, '')
      : (footer.contactInfo.addressLines || 'B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.').replace(/^"|"$/g, ''),
    email: footer.contactInfo.email || 'commercial@qoyyglobal.com',
    phone: footer.contactInfo.phone || '+6016-670 4742'
  } : {
    address: 'B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.',
    email: 'commercial@qoyyglobal.com',
    phone: '+6016-670 4742'
  };  

  // Extract quick links with fallbacks
  const quickLinks = footer?.quickLinks || [
    { path: '/about', label: 'About Us' },
    { path: '/services', label: 'Our Service' },
    { path: '/info', label: 'Quick Info' },
    { path: '/contact', label: 'Contact Us' }
  ];



  if (loading) {
    return (
      <footer className="bg-orange-500 text-white relative z-50">
        <div className="container-custom section-padding">
          <div className="flex items-center justify-center h-32">
            <div className="text-white text-lg">Loading...</div>
          </div>
        </div>
      </footer>
    );
  }

  if (error) {
    return (
      <footer className="bg-orange-500 text-white relative z-50">
        <div className="container-custom section-padding">
          <div className="flex items-center justify-center h-32">
            <div className="text-white text-lg">
              Error loading footer

            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-r from-dark-900 to-dark-950 text-white relative z-50 border-t border-matrix-green/30">
      <div className="container-custom section-padding">
        {/* Top Section - Logo and Status */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            <img
              src={LogoCompany}
              alt={footer.companyName}
              className="h-20 filter drop-shadow-lg"
            />
            <div>
              <span className="cyber-text-gradient text-2xl font-bold font-cyber cyber-text-glow block">Fource Technologies</span>
              <div className="flex items-center space-x-2 mt-1">
                <span className="w-2 h-2 bg-matrix-green rounded-full animate-pulse cyber-glow"></span>
                <span className="text-matrix-green text-sm font-mono">SYSTEM_ACTIVE</span>
              </div>
            </div>
          </div>
          
          {/* Status Panel */}
          <div className="cyber-card p-4">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-matrix-green font-mono text-xs">STATUS</div>
                <div className="text-neon-cyan font-mono text-sm">ONLINE</div>
              </div>
              <div className="text-center">
                <div className="text-matrix-green font-mono text-xs">UPTIME</div>
                <div className="text-neon-cyan font-mono text-sm">99.9%</div>
              </div>
              <div className="text-center">
                <div className="text-matrix-green font-mono text-xs">SECURITY</div>
                <div className="text-neon-cyan font-mono text-sm">MAX</div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section - Contact and Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Contact Information - Left */}
          <div className="space-y-6">
            <h3 className="text-matrix-green font-mono text-lg font-bold">CONTACT_MATRIX</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img
                  src={addressicon}
                  alt="Address Icon"
                  className="w-5 h-5 filter drop-shadow-lg mt-1"
                />
                <span className="text-sm font-mono text-dark-300 leading-relaxed">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src={emailicon}
                  alt="Email Icon"
                  className="w-5 h-5 filter drop-shadow-lg"
                />
                <span className="text-sm font-mono text-matrix-green">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  src={phoneicon}
                  alt="Phone Icon"
                  className="w-5 h-5 filter drop-shadow-lg"
                />
                <span className="text-sm font-mono text-matrix-green">{contactInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Navigation Links - Right */}
          <div className="space-y-6">
            <h3 className="text-matrix-green font-mono text-lg font-bold">NAVIGATION_GRID</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.filter(link => link.path !== '/').map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  className="text-matrix-green font-medium text-sm hover:text-neon-cyan hover:scale-105 transition-all duration-200 font-mono border border-matrix-green/20 px-4 py-2 rounded hover:border-matrix-green/50 text-center"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-matrix-green/20 pt-8">
          <div className="text-center">
            <p className="whitespace-pre-line text-sm text-dark-400 font-mono">
              {footer.copyright}
            </p>
            <div className="mt-4 flex justify-center space-x-8">
              <span className="text-matrix-green font-mono text-xs">ENCRYPTED</span>
              <span className="text-matrix-green font-mono text-xs">SECURE</span>
              <span className="text-matrix-green font-mono text-xs">PROTECTED</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;