import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';

// Import background images
import companyWebsiteImg from '../assets/Gambar_Company_Website.jpg';
import workerStateImg from '../assets/Keadaan-Pekerja-Fancy_simple_compose.png';
import agencyDiscussionImg from '../assets/Perbincangan-Agensi-Kreatif_simple_compose.png';
import quickInfoBgImg from '../assets/quickInfo-bg.png';
import contactUsImg from '../assets/contactUs.png';

const Services = () => {
  // All hooks must be called in the same order every render
  const { data: services, loading, error } = useCMSData('services');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ensure currentSlide is within bounds of available slides
  useEffect(() => {
    if (services?.cards && services.cards.length > 0 && currentSlide >= services.cards.length) {
      setCurrentSlide(0);
    }
  }, [services?.cards, currentSlide]);

  // Service content slides - dynamically generated from CMS data
  const serviceSlides = useMemo(() => {
    const cards = services?.cards || [];
    
    if (cards && cards.length > 0) {
      // Use CMS data - exactly as many slides as cards
      return cards.map((card, index) => {
        let features = [];
      
        // If features is already an array
        if (Array.isArray(card.features)) {
          features = card.features;
        } 
        // If it's a string (like in your API)
        else if (typeof card.features === 'string') {
          try {
            // Remove quotes/brackets and split by comma
            features = card.features
              .replace(/[\[\]"]+/g, '')       // remove brackets/quotes
              .split(',')
              .map(f => f.trim().replace(/^'|'$/g, '')) // trim spaces & stray quotes
              .filter(f => f.length > 0);
          } catch (err) {
            console.error('Error parsing features:', err);
          }
        }
        return {
          title: card.title || `Service ${index + 1}`,
          description: card.description || 'Service description will appear here.',
          features: features.length > 0 ? features : ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
          backgroundImage: card.backgroundImage || null
        };
      });
    }
    
    // Fallback slides only if no CMS data
    return [
      {
        title: 'Media Monitoring',
        description: 'Real-time tracking of brand mentions, sentiment analysis, and competitive intelligence across all media channels.',
        features: ['24/7 brand monitoring', 'Sentiment analysis', 'Crisis detection', 'Competitive insights'],
        backgroundImage: companyWebsiteImg
      },
      {
        title: 'Public Relations',
        description: 'Strategic PR campaigns that build brand reputation, manage crises, and create positive media coverage.',
        features: ['Press release distribution', 'Media relations', 'Crisis management', 'Event PR'],
        backgroundImage: workerStateImg
      },
      {
        title: 'Strategic Communication',
        description: 'Comprehensive communication strategies that align with your business objectives and target audience.',
        features: ['Message development', 'Stakeholder engagement', 'Content strategy', 'Brand positioning'],
        backgroundImage: agencyDiscussionImg
      },
      {
        title: 'Digital PR',
        description: 'Online reputation management and digital media strategies for the modern digital landscape.',
        features: ['Online reputation management', 'Social media PR', 'Influencer partnerships', 'Digital crisis management'],
        backgroundImage: quickInfoBgImg
      },
      {
        title: 'Reporting & Analytics',
        description: 'Comprehensive reporting and analytics to measure the impact and ROI of your PR campaigns.',
        features: ['Monthly reports', 'ROI measurement', 'Performance tracking', 'Strategic insights'],
        backgroundImage: contactUsImg
      }
    ];
  }, [services?.cards]);


  const nextSlide = () => {
    if (isTransitioning || !serviceSlides || serviceSlides.length === 0) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      const next = (prev + 1) % serviceSlides.length;
      return Math.max(0, Math.min(next, serviceSlides.length - 1));
    });

    setTimeout(() => {
      setIsTransitioning(false);
    }, 700);
  };

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
  const seo = services?.seo || { title: 'Our Service - Qoyy Global', description: 'Solutions that drive brands forward. Media monitoring and public relations services that keep your brand informed, relevant, and strategically visible.' };
  const heading = services?.heading || 'SOLUTIONS THAT DRIVE BRANDS FORWARD';

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Our Services - Tech Solutions'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Innovation that drives businesses forward. Technology solutions that keep your business informed, relevant, and strategically competitive.'} />
      </Helmet>

      <main className="container-custom min-h-screen flex flex-col relative z-0">
        {/* Header Section */}
        <div className="text-center py-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
            Our Services
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="tech-text-gradient">
              {heading}
            </span>
          </h1>
        </div>
           
        {/* Services Section - New Timeline Style */}
        <div className="w-full mb-8">
          {serviceSlides && serviceSlides.length > 0 && serviceSlides[currentSlide] ? (
            <div className="relative">
              {/* Main Service Card with Timeline Design */}
              <div className="relative bg-gradient-to-br from-white via-tech-50 to-tech-100 rounded-2xl shadow-2xl overflow-hidden border border-tech-200">
                {/* Service Number Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="w-12 h-12 bg-gradient-to-r from-tech-500 to-tech-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {currentSlide + 1}
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => {
                    if (!isTransitioning && serviceSlides.length > 1) {
                      setIsTransitioning(true);
                      setCurrentSlide((prev) => prev === 0 ? serviceSlides.length - 1 : prev - 1);
                      setTimeout(() => setIsTransitioning(false), 700);
                    }
                  }}
                  disabled={isTransitioning || serviceSlides.length <= 1}
                  className={`absolute left-4 top-1/2 z-20 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-tech-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isTransitioning || serviceSlides.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:scale-105'
                  }`}
                  aria-label="Previous service"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
                
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning || serviceSlides.length <= 1}
                  className={`absolute right-4 top-1/2 z-20 transform -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white text-tech-700 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 ${
                    isTransitioning || serviceSlides.length <= 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'opacity-100 hover:scale-105'
                  }`}
                  aria-label="Next service"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                  </svg>
                </button>

                {/* Service Content */}
                <div className={`p-8 pt-16 transition-all duration-700 ease-in-out transform ${
                  isTransitioning ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
                }`}>
                  {/* Service Title with Icon */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-tech-500 to-tech-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-accent-800 transition-all duration-500 ease-in-out">
                      {serviceSlides[currentSlide]?.title || 'Service Title'}
                    </h3>
                  </div>
                  
                  {/* Service Description */}
                  <p className="text-lg text-accent-600 mb-8 leading-relaxed text-center max-w-4xl mx-auto transition-all duration-600 ease-in-out">
                    {serviceSlides[currentSlide]?.description || 'Service description will appear here.'}
                  </p>
                  
                  {/* Features Grid with Enhanced Styling */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {serviceSlides[currentSlide] && Array.isArray(serviceSlides[currentSlide].features) ? 
                      serviceSlides[currentSlide].features.map((feature, index) => (
                        <div
                          key={index}
                          className={`bg-white/60 backdrop-blur-sm border border-tech-200 rounded-xl p-4 flex items-center transition-all duration-700 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-tech-500 to-tech-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <span className="text-accent-700 font-medium">{feature}</span>
                        </div>
                      ))
                      : 
                      ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'].map((feature, index) => (
                        <div
                          key={index}
                          className={`bg-white/60 backdrop-blur-sm border border-tech-200 rounded-xl p-4 flex items-center transition-all duration-700 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                            isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                          }`}
                          style={{ transitionDelay: `${index * 100}ms` }}
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-tech-500 to-tech-600 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <span className="text-accent-700 font-medium">{feature}</span>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-white via-tech-50 to-tech-100 rounded-2xl shadow-2xl p-8 min-h-96 overflow-hidden border border-tech-200">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-tech-500 to-tech-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-accent-800 mb-4">
                  Loading Services...
                </h3>
                <p className="text-lg text-accent-600">
                  Please wait while we load the service information.
                </p>
              </div>
            </div>
          )}
         
          {/* Enhanced Slide Indicators */}
          {serviceSlides && serviceSlides.length > 0 && (
            <div className="flex justify-center space-x-3 mt-8">
              {serviceSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning && index !== currentSlide) {
                      setIsTransitioning(true);
                      setCurrentSlide(index);
                      setTimeout(() => setIsTransitioning(false), 700);
                    }
                  }}
                  disabled={isTransitioning}
                  className={`w-4 h-4 rounded-full transition-all duration-300 transform ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-tech-500 to-tech-600 scale-125 shadow-lg'
                      : 'bg-tech-300 hover:bg-tech-400 hover:scale-110'
                  } ${isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Services;