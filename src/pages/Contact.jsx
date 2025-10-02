import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import { getImageUrl } from '../utils/imageUtils';

// Import background image and layer overlay
import contactUsImg from '../assets/contactUs.png';
import layerImg from '../assets/Layer.png';

const Contact = () => {
  const { data: contact, loading, error } = useCMSData('contact');








  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">
          Error loading content
          
        </div>
      </div>
    );
  }

  // Use CMS data or fallback to local content
  const seo = contact?.seo || { title: 'Contact Us - Qoyy Global', description: 'Reach out for projects or possibilities. Let\'s build something great together with Qoyy Global.' };
  const heading = contact?.heading || 'Reach Out For Projects Or Possibilities.';
  const subheading = contact?.subheading || 'LET\'S Build Something Great Together';
  const lead = contact?.lead || 'Whether you\'re looking for a trusted partner for your next campaign or exploring new career opportunities, we\'d love to hear from you. Drop us a message for collaborations, marketing solutions, or to join our growing team.';

  // Get the background image from Strapi or fallback to local image
  const backgroundImage = getImageUrl(contact?.seo?.shareImage) || contactUsImg;
  
  // Handle CMS data structure for buttons - Fully Dynamic from CMS
  let buttons = contact?.buttons;
  
  // Check if buttons data is properly populated (has actual button data, not just ID)
  const hasValidButtons = buttons && 
    typeof buttons === 'object' && 
    buttons.whatsapp && 
    typeof buttons.whatsapp === 'object' && 
    buttons.whatsapp.label && 
    buttons.whatsapp.href &&
    buttons.email && 
    typeof buttons.email === 'object' && 
    buttons.email.label && 
    buttons.email.href;
  
  // If no valid CMS buttons data, create fallback buttons
  if (!hasValidButtons) {

    buttons = {
      whatsapp: { 
        label: '📱 CONTACT US VIA WHATSAPP',
        href: 'https://wa.me/60197335343' 
      },
      email: { 
        label: '✉️ CONTACT US VIA EMAIL',
        href: 'mailto:4fource.dev@gmail.com' 
      }
    };    
  } else {

    // Use CMS data directly - fully dynamic
    buttons = {
      whatsapp: {
        // Use CMS label if available, otherwise fallback
        label: buttons.whatsapp?.label || '📱 CONTACT US VIA WHATSAPP',
        // Use CMS href if available, otherwise fallback
        href: buttons.whatsapp?.href
      },
      email: {
        // Use CMS label if available, otherwise fallback
        label: buttons.email?.label,
        href: buttons.email?.href
      }
    };
  }

  // Handle CMS data structure for info
  let info = contact?.info;
  if (!info || typeof info !== 'object') {
    // Fallback info if CMS data is missing or malformed
    info = {
      addressLines: ['B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.'],
      phone: '+6016-670 4742',
      email: 'commercial@qoyyglobal.com',
      hours: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM']
    };
  } else {
    // Ensure info has the expected structure with fallbacks
    info = {
      addressLines: Array.isArray(info.addressLines) 
                    ? info.addressLines 
                    : [info.addressLines.replace(/^"|"$/g, '')],
      phone: info?.phone || '+6016-670 4742',
      email: info?.email || 'commercial@qoyyglobal.com',
      hours: Array.isArray(info.hours) 
              ? info.hours 
              : [info.hours.replace(/^"|"$/g, '')]
    };
  }

  // Handle CMS data structure for offers
  let offers = contact?.offers;
  if (!Array.isArray(offers) || offers.length === 0) {
    // Fallback offers if CMS data is missing or malformed
    offers = [
      { label: 'Partnerships', note: 'Collaborative opportunities for mutual growth' },
      { label: 'Career Opportunities', note: 'Join our dynamic team of professionals' },
      { label: 'Collaborations', note: 'Creative partnerships and joint ventures' },
      { label: 'Team Building', note: 'Become part of our growing family' }
    ];
  } else {
    // Ensure offers have the expected structure with fallbacks
    offers = offers.map(offer => ({
      label: offer?.label || 'Service',
      note: offer?.note || 'Service description'
    }));
  }

  // Handle CMS data structure for bottom CTA
  let bottomCta = contact?.bottomCta;
  if (!bottomCta || typeof bottomCta !== 'object') {
    // Fallback bottomCta if CMS data is missing or malformed
    bottomCta = {
      title: 'Ready to Start Your Journey?',
      lead: 'Don\'t wait to begin building something great. Contact us today and let\'s discuss how we can help you achieve your goals and create lasting impact.',
      buttons: [
        { label: 'Start a Conversation', href: 'https://wa.me/15551234567', primary: true },
        { label: 'Send us an Email', href: 'mailto:info@qoyy.com', primary: false }
      ]
    };
  } else {
    // Ensure bottomCta has the expected structure with fallbacks
    bottomCta = {
      title: bottomCta.title || 'Ready to Start Your Journey?',
      lead: bottomCta.lead || 'Don\'t wait to begin building something great. Contact us today and let\'s discuss how we can help you achieve your goals and create lasting impact.',
      buttons: Array.isArray(bottomCta.buttons) ? bottomCta.buttons.map(btn => ({
        label: btn?.label || 'Button',
        href: btn?.href || '#',
        primary: btn?.primary || false
      })) : [
        { label: 'Start a Conversation', href: 'https://wa.me/15551234567', primary: true },
        { label: 'Send us an Email', href: 'mailto:info@qoyy.com', primary: false }
      ]
    };
  }


  


  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Contact Us - Tech Solutions'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Reach out for projects or possibilities. Let\'s build something great together with Tech Solutions.'} />
      </Helmet>

      <main className="min-h-screen relative z-0">
        <div className="container-custom section-padding">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center py-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
                Contact Us
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="tech-text-gradient">
                  {heading}
                </span>
              </h1>
            </div>

            {/* Sub Heading */}
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-accent-800 mb-8">
                {subheading}
              </h2>
              <p className="text-lg md:text-xl text-accent-600 leading-relaxed max-w-4xl mx-auto">
                {lead}
              </p>
            </div>

            {/* Contact Buttons */}
            {buttons && (buttons.whatsapp || buttons.email) && (
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16 max-w-4xl mx-auto">
                {/* WhatsApp Button */}
                <div className="w-full md:w-auto">
                  <a
                    href={buttons.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-tech text-lg whitespace-nowrap flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    {buttons.whatsapp.label}
                  </a>
                </div>

                {/* Email Button */}
                <div className="w-full md:w-auto">
                  <a
                    href={buttons.email.href}
                    className="btn-secondary text-lg whitespace-nowrap flex items-center justify-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    {buttons.email.label}
                  </a>
                </div>
              </div>
            )}
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Address</h4>
                <p className="text-sm text-accent-600">{info.addressLines.join(', ')}</p>
              </div>
              
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Phone</h4>
                <p className="text-sm text-accent-600">{info.phone}</p>
              </div>
              
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Email</h4>
                <p className="text-sm text-accent-600">{info.email}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;