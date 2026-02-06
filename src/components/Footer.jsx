import React from 'react';
import { Link } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import LogoCompany from '../assets/CompanyLogo.png';
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
    <footer className="relative z-40 border-t border-white/10 bg-slate-950/90 backdrop-blur-2xl">
      <div className="container-custom section-padding">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1.5fr,1.5fr] gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={LogoCompany}
                  alt={footer.companyName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100 uppercase tracking-[0.18em]">
                  {footer.companyName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Building modern experiences for brands and teams.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="px-3 py-1 rounded-full border border-white/10">
                Strategy & consulting
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10">
                Product & web
              </span>
              <span className="px-3 py-1 rounded-full border border-white/10">
                Ongoing support
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 tracking-[0.18em] uppercase">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <img
                  src={addressicon}
                  alt="Address Icon"
                  className="w-4 h-4 mt-1 opacity-80"
                />
                <span className="leading-relaxed">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={emailicon}
                  alt="Email Icon"
                  className="w-4 h-4 opacity-80"
                />
                <span>{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={phoneicon}
                  alt="Phone Icon"
                  className="w-4 h-4 opacity-80"
                />
                <span>{contactInfo.phone}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-300 tracking-[0.18em] uppercase">
              Pages
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {quickLinks.filter(link => link.path !== '/').map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-slate-300 hover:text-white transition-colors duration-150"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="whitespace-pre-line text-xs text-slate-500">
            {footer.copyright}
          </p>
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>Designed for product teams</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>Made in Malaysia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;