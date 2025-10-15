import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import { getImageUrl } from '../utils/imageUtils';

// Import background image and layer overlay
import quickInfoBgImg from '../assets/quickInfo-bg.png';
import layerImg from '../assets/Layer.png';

const Info = () => {
  const { data: info, loading, error } = useCMSData('info');








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
  const seo = info?.seo || { description: 'Answers for every question. Explore our services, process, and support for your marketing and creative needs.' };
  const heading = info?.heading || 'ANSWERS FOR EVERY QUESTION';
  const lead = info?.lead || 'Explore our services, process, and support for your marketing and creative needs.';

  // Get the background image from Strapi or fallback to local image
  const backgroundImage = getImageUrl(info?.backgroundImage) || quickInfoBgImg;
  
  // Handle CMS data structure for FAQs
  let faqs = info?.faqs || [];
  if (faqs && faqs.length > 0) {
    // Ensure FAQs have the expected structure
    faqs = faqs.map(faq => ({
      question: faq.question || 'Question',
      answer: faq.answer || 'Answer'
    }));
  } else {
    // Fallback FAQs
    faqs = [
      {
        question: 'Which services are available?',
        answer: 'We offer comprehensive media monitoring and public relations services including real-time brand monitoring, sentiment analysis, crisis management, press release distribution, media relations, strategic communication, digital PR, and government relations. Our services are tailored to meet the specific needs of government agencies and corporate brands across various industries.'
      },
      {
        question: 'Who do you usually work with?',
        answer: 'Our client base includes government agencies, corporate brands, and organizations across various sectors. We have extensive experience working with both public and private sector clients, understanding the unique challenges and opportunities that each sector presents. Our team is equipped to handle projects of all sizes, from small businesses to large multinational corporations.'
      },
      {
        question: 'How fast is project delivery?',
        answer: 'Project timelines vary depending on complexity and scope. Media monitoring services can be implemented within 24-48 hours, while comprehensive PR campaigns typically take 2-4 weeks to develop and launch. Crisis management responses are immediate, with 24/7 support available. We provide detailed timelines during our initial consultation and maintain regular communication throughout the project lifecycle.'
      },
      {
        question: 'How can I get a proposal?',
        answer: 'Getting a proposal is simple. You can contact us via WhatsApp for quick responses or email for detailed discussions. We\'ll schedule a consultation to understand your specific needs, challenges, and objectives. Based on this discussion, we\'ll provide a comprehensive proposal including strategy, timeline, deliverables, and investment. Our proposals are detailed and transparent, with no hidden costs.'
      }
    ];
  }

  // Handle CMS data structure for process
  const process = info?.process || {
    title: 'Our Process',
    steps: [
      { num: '1.', label: 'Discovery & Analysis', note: 'Understanding your needs and market position' },
      { num: '2.', label: 'Strategy Development', note: 'Creating tailored solutions and approaches' },
      { num: '3.', label: 'Implementation', note: 'Executing campaigns and monitoring results' },
      { num: '4.', label: 'Optimization', note: 'Continuous improvement and performance tracking' }
    ]
  };

  // Handle CMS data structure for whyUs
  const whyUs = info?.whyUs || {
    title: 'Why Choose Us',
    points: [
      { label: 'Proven Track Record', note: 'Success with government and corporate clients' },
      { label: '24/7 Support', note: 'Round-the-clock crisis management' },
      { label: 'Transparent Reporting', note: 'Clear metrics and ROI measurement' },
      { label: 'Custom Solutions', note: 'Tailored strategies for your specific needs' }
    ]
  };



  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Quick Info - Fource Technologies'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || 'Answers for every question. Explore our services, process, and support for your technology needs.'} />
      </Helmet>

      <main className="min-h-screen relative z-0">
        <div className="container-custom section-padding">
          <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="text-center py-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
                Quick Info
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
                <span className="tech-text-gradient">
                  {heading}
                </span>
              </h1>
              <p className="text-lg md:text-xl text-accent-600 max-w-4xl mx-auto">
                {lead}
              </p>
            </div>

            {/* FAQ Section */}
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="tech-card p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-accent-800 mb-4">
                    {faq.question}
                  </h3>
                  <p className="text-accent-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Process and Why Us Sections */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="tech-card p-8">
                <h4 className="text-xl font-semibold text-tech-600 mb-6">
                  {process.title}
                </h4>
                <div className="space-y-4">
                  {process.steps.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-tech-600 mr-3 mt-1 font-bold text-lg">{step.num}</span>
                      <div>
                        <div className="font-semibold text-accent-800">{step.label}</div>
                        <div className="text-sm text-accent-600">{step.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
             
              <div className="tech-card p-8">
                <h4 className="text-xl font-semibold text-tech-600 mb-6">
                  {whyUs.title}
                </h4>
                <div className="space-y-4">
                  {whyUs.points.map((point, index) => (
                    <div key={index} className="flex items-start">
                      <span className="text-tech-600 mr-3 mt-1">✓</span>
                      <div>
                        <div className="font-semibold text-accent-800">{point.label}</div>
                        <div className="text-sm text-accent-600">{point.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Info;