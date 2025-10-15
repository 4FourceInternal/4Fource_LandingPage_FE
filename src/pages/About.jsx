import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import { getImageUrl } from '../utils/imageUtils';

// Import background image and layer overlay
import companyWebsiteImg from '../assets/Gambar_Company_Website.jpg';
import layerImg from '../assets/Layer.png';

const About = () => {
  const { data: about, loading, error } = useCMSData('about');








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
  const seo = about?.seo || { description: 'Creative impact, measurable results. Learn about Qoyy Global\'s journey of growth built on shared successes.' };
  const heading = about?.heading || 'CREATIVE IMPACT, MEASURABLE RESULTS.';
  
  // Handle both CMS data structure and fallback
  let paragraphText;
  if (about?.paragraphs && typeof about.paragraphs === 'string') {
    // CMS data structure - paragraphs is a string
    paragraphText = about.paragraphs;
  } else if (about?.paragraphs && Array.isArray(about.paragraphs) && about.paragraphs.length > 0) {
    // CMS data structure - paragraphs is an array, use the first paragraph
    paragraphText = about.paragraphs[0];
  } else if (about?.paragraphs && typeof about.paragraphs === 'object') {
    // Complex CMS data structure (if it exists)
    try {
      const p = about.paragraphs;
      if (p.establishment_year && p.location && p.agency_type && p.solutions && p.team_size && p.client_portfolio) {
        paragraphText = `Established in ${p.establishment_year} and based in ${p.location}, we are an ${p.agency_type.toLowerCase()} delivering end-to-end solutions across ${p.solutions.join(', ').toLowerCase()}. With a growing team of ${p.team_size} passionate professionals, we proudly serve over ${p.client_portfolio.retained_government_clients} retained government clients and ${p.client_portfolio.corporate_brands} corporate brands.`;
      } else {
        // Fallback if complex structure is incomplete
        paragraphText = about.paragraphs[0] || 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
      }
    } catch (error) {
      console.warn('Error processing complex paragraph structure:', error);
      paragraphText = about.paragraphs[0] || 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
    }
  } else {
    // Fallback structure
    paragraphText = 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
  }
  
  const quote = about?.quote || '"OUR JOURNEY OF GROWTH IS BUILT ON SHARED SUCCESSES WITH THOSE WE SERVE."';

  // Get the background image from Strapi or fallback to local image
  const backgroundImage = getImageUrl(about?.teamImage) || companyWebsiteImg;

  // Teams from CMS (About). Limit display to 4 for now.
  const teamMembers = Array.isArray(about?.teams) ? about.teams : [];
  const displayedMembers = teamMembers.slice(0, 4);

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'About Us - Fource Technologies'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Innovation impact, measurable results. Learn about Tech Solutions\' journey of growth built on shared successes.'} />
      </Helmet>

      <main className="container-custom relative z-0 min-h-screen flex flex-col">
        {/* Header Section */}
        <div className="text-center py-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
            About Our Company
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="tech-text-gradient">
              {heading}
            </span>
          </h2>
        </div>

        {/* Content Section */}
        <div className="flex-grow flex flex-col justify-center items-center px-4 py-16">
          {/* Description paragraph */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="tech-card p-8">
              <p className="text-accent-700 text-lg md:text-xl text-center leading-relaxed font-normal">
                {paragraphText}
              </p>
            </div>
          </div>

          {/* Quote section */}
          <div className="max-w-5xl mx-auto">
            <div className="tech-card p-8 text-center">
              <div className="w-16 h-16 bg-tech-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-tech-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <p className="text-accent-800 text-xl md:text-2xl font-bold leading-relaxed">
                {quote}
              </p>
            </div>
          </div>
          
          {/* Tech stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
            <div className="tech-card p-6 text-center">
              <div className="text-3xl font-bold text-tech-600 mb-2">2+</div>
              <div className="text-accent-600 font-medium">Years Experience</div>
            </div>
            <div className="tech-card p-6 text-center">
              <div className="text-3xl font-bold text-tech-600 mb-2">1</div>
              <div className="text-accent-600 font-medium">Projects Completed</div>
            </div>
            <div className="tech-card p-6 text-center">
              <div className="text-3xl font-bold text-tech-600 mb-2">100%</div>
              <div className="text-accent-600 font-medium">Client Satisfaction</div>
            </div>
          </div>

        {/* Meet our Team */}
        <section className="w-full max-w-6xl mt-20 px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
              Meet our Team
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              <span className="tech-text-gradient">The People Behind The Work</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayedMembers.length > 0 ? displayedMembers : [1,2,3,4]).map((member, idx) => {
              const isPlaceholder = typeof member === 'number';
              const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
              const title = isPlaceholder ? 'Role / Title' : (member?.title || '');
              const imgData = isPlaceholder ? null : (member?.EmployeeImage?.formats?.small || member?.EmployeeImage?.formats?.thumbnail || member?.EmployeeImage || null);
              const imgUrl = imgData ? getImageUrl(imgData) : null;

              return (
                <div key={isPlaceholder ? `ph-${member}` : (member?.id || idx)} className="tech-card p-4 flex flex-col items-center">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-tech-100 flex items-center justify-center mb-4 overflow-hidden">
                    {imgUrl ? (
                      <img src={imgUrl} alt={name} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-12 h-12 text-tech-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                      </svg>
                    )}
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-accent-900">{name}</div>
                    {title && <div className="text-sm text-accent-600 mt-1">{title}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        </div>
      </main>
    </>
  );
};

export default About;