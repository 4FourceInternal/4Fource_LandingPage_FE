import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import useCMSData from '../hooks/useCMSData';
import { getBestImageUrl } from '../utils/imageUtils';

import companyWebsiteImg from '../assets/Gambar_Company_Website.jpg';
import workerStateImg from '../assets/Keadaan-Pekerja-Fancy_simple_compose.png';
import agencyDiscussionImg from '../assets/Perbincangan-Agensi-Kreatif_simple_compose.png';
import quickInfoBgImg from '../assets/quickInfo-bg.png';
import contactUsImg from '../assets/contactUs.png';

const FALLBACK_SLIDES = [
  {
    title: 'Media Monitoring',
    description:
      'Real-time tracking of brand mentions, sentiment analysis, and competitive intelligence across all media channels.',
    features: ['24/7 brand monitoring', 'Sentiment analysis', 'Crisis detection', 'Competitive insights'],
    backgroundImage: companyWebsiteImg,
  },
  {
    title: 'Public Relations',
    description:
      'Strategic PR campaigns that build brand reputation, manage crises, and create positive media coverage.',
    features: ['Press release distribution', 'Media relations', 'Crisis management', 'Event PR'],
    backgroundImage: workerStateImg,
  },
  {
    title: 'Strategic Communication',
    description:
      'Comprehensive communication strategies that align with your business objectives and target audience.',
    features: ['Message development', 'Stakeholder engagement', 'Content strategy', 'Brand positioning'],
    backgroundImage: agencyDiscussionImg,
  },
  {
    title: 'Digital PR',
    description:
      'Online reputation management and digital media strategies for the modern digital landscape.',
    features: [
      'Online reputation management',
      'Social media PR',
      'Influencer partnerships',
      'Digital crisis management',
    ],
    backgroundImage: quickInfoBgImg,
  },
  {
    title: 'Reporting & Analytics',
    description:
      'Comprehensive reporting and analytics to measure the impact and ROI of your PR campaigns.',
    features: ['Monthly reports', 'ROI measurement', 'Performance tracking', 'Strategic insights'],
    backgroundImage: contactUsImg,
  },
  {
    title: 'Government Relations',
    description:
      'Specialized PR services for government agencies and public sector organizations.',
    features: ['Public affairs', 'Policy communication', 'Stakeholder engagement', 'Crisis communication'],
    backgroundImage: agencyDiscussionImg,
  },
];

const parseFeatures = (raw) => {
  if (!raw) return [];

  if (Array.isArray(raw)) {
    if (raw.length === 1 && typeof raw[0] === 'string') {
      return raw[0]
        .split(',')
        .map((f) => f.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    }
    return raw.filter(Boolean);
  }

  if (typeof raw === 'string') {
    return raw
      .split(',')
      .map((f) => f.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return [];
};

const getSlideImage = (card, fallbackImage) => {
  const media = card?.EmployeeImage ?? card?.backgroundImage ?? card?.image ?? null;
  return getBestImageUrl(media) || fallbackImage;
};

const buildSlides = (cards) => {
  const withMeta = (slides) =>
    slides.map((slide) => ({
      ...slide,
      fallbackImage: slide.fallbackImage ?? slide.backgroundImage,
    }));

  if (!cards?.length) return withMeta(FALLBACK_SLIDES);

  return withMeta(
    cards.map((card, index) => {
      const features = parseFeatures(card.features);
      const fallback = FALLBACK_SLIDES[index % FALLBACK_SLIDES.length];

      return {
        title: card.title || `Service ${index + 1}`,
        description: card.description || 'Service description will appear here.',
        features: features.length > 0 ? features : fallback.features,
        backgroundImage: getSlideImage(card, fallback.backgroundImage),
        fallbackImage: fallback.backgroundImage,
      };
    })
  );
};

const ServiceImage = ({ src, fallback, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  if (!imgSrc && !fallback) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 ${className}`}>
        <svg className="w-12 h-12 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={imgSrc || fallback}
      alt={alt}
      className={className}
      onError={() => {
        if (fallback && imgSrc !== fallback) setImgSrc(fallback);
      }}
    />
  );
};

const FeatureItem = ({ feature, index }) => (
  <motion.li
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05, duration: 0.25 }}
    className="flex items-start gap-3 bg-slate-800/50 border border-white/10 rounded-xl p-3 md:p-4"
  >
    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center mt-0.5">
      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </span>
    <span className="text-sm md:text-base text-slate-200 leading-snug">{feature}</span>
  </motion.li>
);

const Services = () => {
  const { data: services, loading, error } = useCMSData('services');
  const [currentSlide, setCurrentSlide] = useState(0);

  const serviceSlides = useMemo(
    () => buildSlides(services?.cards),
    [services?.cards]
  );

  const total = serviceSlides.length;
  const active = serviceSlides[currentSlide] ?? serviceSlides[0];

  useEffect(() => {
    if (currentSlide >= total && total > 0) setCurrentSlide(0);
  }, [currentSlide, total]);

  const goTo = useCallback(
    (index) => {
      if (total <= 1) return;
      const next = ((index % total) + total) % total;
      setCurrentSlide(next);
    },
    [total]
  );

  const seo = services?.seo || {
    description:
      'Solutions that drive brands forward. Media monitoring and public relations services that keep your brand informed, relevant, and strategically visible.',
  };
  const heading = services?.heading || 'SOLUTIONS THAT DRIVE BRANDS FORWARD';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <div className="w-10 h-10 border-2 border-slate-700 border-t-sky-400 rounded-full animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-400">Error loading content</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Our Services - Fource Technologies'}</title>
        <meta
          name="description"
          content={
            seo?.metaDescription ||
            seo?.description ||
            'Innovation that drives businesses forward. Technology solutions that keep your business informed, relevant, and strategically competitive.'
          }
        />
      </Helmet>

      <main className="container-custom min-h-screen relative z-0 pb-16 md:pb-24">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-8 md:mb-10 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

          <div className="relative z-10 text-center py-12 md:py-16 px-5 md:px-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs md:text-sm font-medium mb-5">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse" />
              Our Services
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-slate-50 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>
            {seo?.metaDescription && (
              <p className="mt-4 text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                {seo.metaDescription}
              </p>
            )}
          </div>
        </section>

        {/* Service tabs — scrollable on mobile */}
        {total > 1 && (
          <div className="mb-5 md:mb-6 -mx-1 px-1 overflow-x-auto">
            <div className="flex gap-2 min-w-max md:min-w-0 md:flex-wrap md:justify-center pb-1">
              {serviceSlides.map((slide, index) => (
                <button
                  key={slide.title + index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-medium border whitespace-nowrap transition-all duration-200 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-sky-500 to-indigo-500 border-sky-300 text-white shadow-lg'
                      : 'bg-slate-800/60 border-white/10 text-slate-300 hover:border-sky-400/40 hover:text-white'
                  }`}
                >
                  <span className="opacity-70 mr-1.5">{String(index + 1).padStart(2, '0')}</span>
                  {slide.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active service card */}
        {active && (
          <section className="cyber-card overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[380px] bg-slate-900">
                  <ServiceImage
                    src={active.backgroundImage}
                    fallback={active.fallbackImage}
                    alt={active.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-slate-950/20 lg:to-slate-950/90" />
                  <div className="absolute top-4 left-4 lg:hidden">
                    <span className="inline-flex w-9 h-9 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-bold border border-sky-300">
                      {currentSlide + 1}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 md:p-8 lg:p-10 flex flex-col">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="hidden lg:inline-flex flex-shrink-0 w-10 h-10 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white text-sm font-bold border border-sky-300">
                      {currentSlide + 1}
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-50 leading-tight">
                        {active.title}
                      </h2>
                      <p className="text-slate-400 text-xs md:text-sm mt-1">
                        Service {currentSlide + 1} of {total}
                      </p>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                    {active.description}
                  </p>

                  <div className="flex-1">
                    <h3 className="text-xs uppercase tracking-widest text-slate-500 mb-3">
                      What's included
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                      {active.features.map((feature, index) => (
                        <FeatureItem key={feature + index} feature={feature} index={index} />
                      ))}
                    </ul>
                  </div>

                  {/* Navigation — below content, never overlapping */}
                  {total > 1 && (
                    <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        {serviceSlides.map((_, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => setCurrentSlide(index)}
                            aria-label={`Go to service ${index + 1}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide
                                ? 'w-6 bg-gradient-to-r from-sky-400 to-indigo-400'
                                : 'w-2 bg-slate-600 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => goTo(currentSlide - 1)}
                          className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
                          aria-label="Previous service"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => goTo(currentSlide + 1)}
                          className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 transition-colors"
                          aria-label="Next service"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </section>
        )}

        {/* Quick overview grid — all services at a glance on larger screens */}
        {total > 1 && (
          <section className="mt-10 md:mt-14">
            <h2 className="text-center text-lg md:text-xl font-semibold text-slate-200 mb-5 md:mb-6">
              All capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {serviceSlides.map((slide, index) => (
                <button
                  key={slide.title + index}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`text-left rounded-xl overflow-hidden border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    index === currentSlide
                      ? 'border-sky-400/50 ring-1 ring-sky-400/30 shadow-lg'
                      : 'border-white/10 hover:border-white/20 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="relative h-32 sm:h-36 bg-slate-900">
                    <ServiceImage
                      src={slide.backgroundImage}
                      fallback={slide.fallbackImage}
                      alt=""
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                    <span className="absolute top-3 left-3 w-7 h-7 rounded-full bg-sky-500/90 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-900/80">
                    <h3 className="font-semibold text-slate-100 text-sm md:text-base">{slide.title}</h3>
                    <p className="text-slate-400 text-xs md:text-sm mt-1 line-clamp-2">{slide.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Services;
