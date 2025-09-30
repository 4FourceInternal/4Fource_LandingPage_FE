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
  const seo = home?.seo || { title: 'Qoyy Global - Marketing Made Simple', description: 'Marketing made simple, all under one roof. Qoyy Global provides innovative solutions for your business.' };
  const hero = home?.hero || { title1: 'MARKETING', title2: 'ALL UNDER ONE ROOF' };

  // Get the background image from Strapi or fallback to local image
  const backgroundImage = getImageUrl(home?.hero?.backgroundImage) || agencyDiscussionImg;

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Tech Solutions - Innovation Made Simple'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Innovation made simple, all under one roof. Tech Solutions provides cutting-edge technology solutions for your business.'} />
      </Helmet>

      <main className="container-custom relative z-0">
        {/* Hero Section */}
        <div className="relative min-h-screen flex items-center">
          <div className="relative z-10 text-center w-full">
            {/* Tech badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-tech-500 rounded-full mr-2 animate-pulse"></span>
              Innovation in Technology
            </div>
            
            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
              <span className="tech-text-gradient">
                {hero.title1 || 'TECHNOLOGY'}
              </span>
            </h1>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-slide-up" style={{animationDelay: '0.2s'}}>
              <span className="text-accent-800">
                MADE SIMPLE
              </span>
            </h2>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-accent-600 mb-12 animate-slide-up" style={{animationDelay: '0.4s'}}>
              {hero.title2 || 'ALL UNDER ONE ROOF'}
            </h3>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{animationDelay: '0.6s'}}>
              <button className="btn-tech">
                Get Started
              </button>
              <button className="btn-secondary">
                Learn More
              </button>
            </div>
            
            {/* Tech features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-slide-up" style={{animationDelay: '0.8s'}}>
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Fast Solutions</h4>
                <p className="text-sm text-accent-600">Lightning-fast technology solutions</p>
              </div>
              
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Reliable</h4>
                <p className="text-sm text-accent-600">Enterprise-grade reliability</p>
              </div>
              
              <div className="tech-card p-6 text-center">
                <div className="w-12 h-12 bg-tech-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-tech-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-accent-800 mb-2">Scalable</h4>
                <p className="text-sm text-accent-600">Grows with your business</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;