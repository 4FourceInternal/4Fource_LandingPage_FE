import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import { getImageUrl } from '../utils/imageUtils';

// Import background image and layer overlay
import agencyDiscussionImg from '../assets/Perbincangan-Agensi-Kreatif_simple_compose.png';
import layerImg from '../assets/Layer.png';

const Home = () => {
  const { data: home, loading, error } = useCMSData('home');








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
  const seo = home?.seo || { description: 'Marketing made simple, all under one roof. Qoyy Global provides innovative solutions for your business.' };
  const hero = home?.hero || { title1: 'MARKETING', title2: 'ALL UNDER ONE ROOF' };

  // Get the background image from Strapi or fallback to local image
  const backgroundImage = getImageUrl(home?.hero?.backgroundImage) || agencyDiscussionImg;

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Fource Technologies'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Innovation made simple, all under one roof. Tech Solutions provides cutting-edge technology solutions for your business.'} />
      </Helmet>

      <main className="container-custom relative z-0">
        {/* Hero Section - Asymmetric Layout */}
        <div className="relative min-h-screen flex items-start pt-20">
          {/* Left Side - Main Content */}
          <div className="w-full lg:w-2/3 relative z-10">
            {/* Cyber badge - Top Left */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-matrix-green/10 border border-matrix-green/30 text-matrix-green text-sm font-medium mb-8 animate-fade-in font-mono">
              <span className="w-2 h-2 bg-matrix-green rounded-full mr-2 animate-pulse cyber-glow"></span>
              <span className="matrix-text">SYSTEM_ONLINE</span>
            </div>
            
            {/* Main Headlines - Staggered */}
            <div className="space-y-4 mb-12">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold animate-slide-up font-cyber text-left">
                <span className="cyber-text-gradient cyber-text-glow">
                  {seo.metaDescription}
                </span>
              </h1>
              
              <p className="text-3xl md:text-5xl lg:text-6xl font-bold animate-slide-up font-cyber text-left" style={{animationDelay: '0.3s'}}>
                <span className="text-matrix-green cyber-text-glow">
                  {hero.title1}
                </span>
              </p>

              <p className="text-lg md:text-xl lg:text-2xl font-light text-dark-300 animate-slide-up font-mono text-left max-w-2xl" style={{animationDelay: '0.6s'}}>
                {hero.title2}
              </p>
            </div>
            
            {/* CTA Buttons - Horizontal Stack */}
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{animationDelay: '0.6s'}}>
              <button className="btn-cyber">
                INITIALIZE
              </button>
              <button className="btn-ghost">
                SCAN_SYSTEM
              </button>
            </div>
          </div>

          {/* Right Side - Floating Cards */}
          <div className="hidden lg:block w-1/3 relative">
            <div className="absolute top-20 right-0 space-y-6">
              {/* Floating Feature Cards */}
              <div className="cyber-card p-6 w-80 animate-float" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center border border-matrix-green/30">
                    <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matrix-green mb-1 font-mono text-sm">SPEED_OPTIMIZED</h4>
                    <p className="text-xs text-dark-400 font-mono">Lightning-fast cyber solutions</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-6 w-80 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center border border-matrix-green/30">
                    <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matrix-green mb-1 font-mono text-sm">SECURE_CORE</h4>
                    <p className="text-xs text-dark-400 font-mono">Military-grade encryption</p>
                  </div>
                </div>
              </div>
              
              <div className="cyber-card p-6 w-80 animate-float" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center border border-matrix-green/30">
                    <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-matrix-green mb-1 font-mono text-sm">SCALABLE_ARCH</h4>
                    <p className="text-xs text-dark-400 font-mono">Infinite expansion capability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Mobile Cards */}
        <div className="lg:hidden mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up" style={{animationDelay: '0.8s'}}>
            <div className="cyber-card p-6 text-center">
              <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-matrix-green/30">
                <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-semibold text-matrix-green mb-2 font-mono">SPEED_OPTIMIZED</h4>
              <p className="text-sm text-dark-400 font-mono">Lightning-fast cyber solutions</p>
            </div>
            
            <div className="cyber-card p-6 text-center">
              <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-matrix-green/30">
                <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-matrix-green mb-2 font-mono">SECURE_CORE</h4>
              <p className="text-sm text-dark-400 font-mono">Military-grade encryption</p>
            </div>
            
            <div className="cyber-card p-6 text-center">
              <div className="w-12 h-12 bg-matrix-green/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-matrix-green/30">
                <svg className="w-6 h-6 text-matrix-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h4 className="font-semibold text-matrix-green mb-2 font-mono">SCALABLE_ARCH</h4>
              <p className="text-sm text-dark-400 font-mono">Infinite expansion capability</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;