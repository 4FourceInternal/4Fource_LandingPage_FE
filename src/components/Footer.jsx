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
    // Convert addressLines array to string, or use fallback
    address: Array.isArray(footer.contactInfo.addressLines) 
      ? footer.contactInfo.addressLines.join(', ')
      : footer.contactInfo.addressLines || 'B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.',
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
    <footer className="bg-gradient-to-r from-tech-800 to-tech-900 text-white relative z-50">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center text-center">
          {/* Contact Information */}
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-tech-100">
                <img
                  src={addressicon}
                  alt="Address Icon"
                  className="w-5 h-5"
                />
                <span className="text-sm">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3 text-tech-100">
                <img
                  src={emailicon}
                  alt="Email Icon"
                  className="w-5 h-5"
                />
                <span className="text-sm">{contactInfo.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-tech-100">
                <img
                  src={phoneicon}
                  alt="Phone Icon"
                  className="w-5 h-5"
                />
                <span className="text-sm">{contactInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Logo and Copyright */}
          <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <div className="flex items-center space-x-3">
              <img
                src={LogoCompany}
                alt={footer.companyName}
                className="h-16"
              />
              <span className="tech-text-gradient text-xl font-bold">Tech Solutions</span>
            </div>
            <p className="whitespace-pre-line text-sm text-center text-tech-200">
              {footer.copyright}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center gap-3 justify-center h-full">
            {quickLinks.filter(link => link.path !== '/').map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className="text-tech-200 font-medium text-sm hover:text-white hover:scale-105 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;