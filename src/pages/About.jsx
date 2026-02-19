import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import * as cmsService from '../services/cmsService';
import { getImageUrl } from '../utils/imageUtils';

// Import background image and layer overlay
import companyWebsiteImg from '../assets/Gambar_Company_Website.jpg';
import layerImg from '../assets/Layer.png';

const TeamCard = ({ member, idx, isCurrentlyRevealing, hasFullyRevealed, teamVisible }) => {
  const gridRef = useRef(null);
  const cardRef = useRef(null);
  const [gridPosition, setGridPosition] = useState(null);
  const [transitionComplete, setTransitionComplete] = useState(false);

  const isPlaceholder = typeof member === 'number';
  const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
  const title = isPlaceholder ? 'Role / Title' : (member?.title || '');
  const empImg = member?.EmployeeImage;
  const imgData = isPlaceholder ? null : (empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null);
  const imgUrl = imgData ? getImageUrl(imgData) : null;

  // Get the grid cell position when card needs to move there
  useEffect(() => {
    if (hasFullyRevealed && gridRef.current && !gridPosition) {
      const rect = gridRef.current.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
      
      setGridPosition({ 
        x: rect.left + scrollLeft, 
        y: rect.top + scrollTop, 
        width: rect.width, 
        height: rect.height 
      });
    }
  }, [hasFullyRevealed, gridPosition]);

  // After animation completes, switch to absolute positioning
  useEffect(() => {
    if (hasFullyRevealed && gridPosition) {
      const timer = setTimeout(() => {
        setTransitionComplete(true);
      }, 800); // Wait for animation to complete
      return () => clearTimeout(timer);
    }
  }, [hasFullyRevealed, gridPosition]);

  return (
    <React.Fragment>
      {/* Grid placeholder - contains the final positioned card */}
      <div ref={gridRef} className="relative w-full min-h-[400px]">
        {/* Final card position - absolute within grid cell */}
        {transitionComplete && (
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Card Back */}
              <div 
                className="absolute inset-0 w-full backface-hidden"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)'
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-tech-500 via-tech-600 to-tech-700 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <svg className="w-20 h-20 text-white opacity-30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                  </svg>
                </div>
              </div>
              
              {/* Card Front */}
              <div 
                className="absolute inset-0 w-full backface-hidden tech-card p-4 flex flex-col items-center"
                style={{ 
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden'
                }}
              >
                <div className="w-full h-80 bg-tech-100 flex items-center justify-center mb-4 rounded-xl overflow-hidden">
                  {imgUrl ? (
                    <img 
                      src={imgUrl} 
                      alt={name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-12 h-12 text-tech-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                    </svg>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-accent-900">{name}</div>
                  {title && <div className="text-sm text-accent-600 mt-1">{title}</div>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Animating card - fixed position during animation */}
      {teamVisible && !transitionComplete && (
        <motion.div
          ref={cardRef}
          className="pointer-events-none"
          style={{
            position: 'fixed',
            width: '280px',
            height: '400px',
            perspective: '1200px',
            transformStyle: 'preserve-3d',
            zIndex: isCurrentlyRevealing ? 999 : (hasFullyRevealed ? 1 : 100 - idx)
          }}
          initial={{
            top: '50%',
            left: '50%',
            x: '-50%',
            y: '-50%',
            scale: 0.9,
            opacity: 1
          }}
          animate={
            hasFullyRevealed && gridPosition
              ? {
                  // Move to grid position (using viewport coordinates)
                  top: gridPosition.y - (window.pageYOffset || document.documentElement.scrollTop),
                  left: gridPosition.x - (window.pageXOffset || document.documentElement.scrollLeft),
                  x: 0,
                  y: 0,
                  scale: 1,
                  opacity: 1
                }
              : isCurrentlyRevealing
              ? {
                  // Stay at center while revealing
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 1.05,
                  opacity: 1
                }
              : {
                  // Stacked at center
                  top: '50%',
                  left: '50%',
                  x: '-50%',
                  y: '-50%',
                  scale: 0.9,
                  opacity: 1
                }
          }
          transition={{
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.6
          }}
        >
          {/* Card Inner - handles the flip */}
          <motion.div
            className="relative w-full h-full"
            style={{
              transformStyle: 'preserve-3d'
            }}
            initial={{ rotateY: 180 }}
            animate={{
              rotateY: hasFullyRevealed || isCurrentlyRevealing ? 0 : 180
            }}
            transition={{
              duration: 0.6,
              ease: [0.34, 1.56, 0.64, 1],
              delay: isCurrentlyRevealing ? 0.2 : 0
            }}
          >
            {/* Card Back - shows during flip */}
            <div 
              className="absolute inset-0 w-full backface-hidden"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="w-full h-full bg-gradient-to-br from-tech-500 via-tech-600 to-tech-700 rounded-2xl flex items-center justify-center relative overflow-hidden shadow-2xl">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine"></div>
                <svg className="w-20 h-20 text-white opacity-30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                </svg>
              </div>
            </div>
            
            {/* Card Front - shows after flip */}
            <motion.div 
              className="absolute inset-0 w-full backface-hidden tech-card p-4 flex flex-col items-center"
              style={{ 
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              animate={hasFullyRevealed ? {
                boxShadow: [
                  '0 0 0px rgba(59, 130, 246, 0)',
                  '0 0 30px rgba(59, 130, 246, 0.6)',
                  '0 0 20px rgba(59, 130, 246, 0.3)',
                  '0 4px 20px rgba(0, 0, 0, 0.1)'
                ]
              } : {}}
              transition={{
                duration: 1.2,
                times: [0, 0.3, 0.7, 1]
              }}
            >
              <motion.div 
                className="w-full h-80 bg-tech-100 flex items-center justify-center mb-4 rounded-xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={(hasFullyRevealed || isCurrentlyRevealing) ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {imgUrl ? (
                  <img 
                    src={imgUrl} 
                    alt={name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-12 h-12 text-tech-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                  </svg>
                )}
              </motion.div>
              <motion.div 
                className="text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={(hasFullyRevealed || isCurrentlyRevealing) ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div className="text-lg font-semibold text-accent-900">{name}</div>
                {title && <div className="text-sm text-accent-600 mt-1">{title}</div>}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Particle effects on reveal */}
          {isCurrentlyRevealing && (
            <>
              {[...Array(12)].map((_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                const distance = 120;
                return (
                  <motion.div
                    key={`particle-${i}`}
                    className="absolute top-1/2 left-1/2 w-3 h-3 bg-tech-400 rounded-full"
                    initial={{ scale: 0, opacity: 0, x: -6, y: -6 }}
                    animate={{ 
                      scale: [0, 1.2, 0],
                      opacity: [0, 1, 0],
                      x: [-6, Math.cos(angle) * distance],
                      y: [-6, Math.sin(angle) * distance]
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  />
                );
              })}
            </>
          )}
        </motion.div>
      )}
    </React.Fragment>
  );
};

const About = () => {
  const { data: about, loading, error } = useCMSData('about');
  const teamSectionRef = useRef(null);
  const [teamVisible, setTeamVisible] = useState(false);
  const [revealedCards, setRevealedCards] = useState([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('down');

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Debug: Log the entire CMS data structure
  useEffect(() => {
    console.log('[About Debug] =========================');
    console.log('[About Debug] CMS Data:', about);
    console.log('[About Debug] Loading:', loading);
    console.log('[About Debug] Error:', error);
    if (about) {
      console.log('[About Debug] Teams array:', about.teams);
      console.log('[About Debug] Teams length:', about.teams?.length);
      if (about.teams && about.teams.length > 0) {
        console.log('[About Debug] First team member:', about.teams[0]);
        console.log('[About Debug] First team EmployeeImage:', about.teams[0]?.EmployeeImage);
      }
    }
    console.log('[About Debug] =========================');
  }, [about, loading, error]);

  // Track scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Card pack reveal sequence
  useEffect(() => {
    if (!teamVisible) {
      setRevealedCards([]);
      return;
    }

    // Reveal cards one by one with delay
    const teamCount = displayedMembers?.length || 4;
    const delays = [];
    
    for (let i = 0; i < teamCount; i++) {
      const timeout = setTimeout(() => {
        setRevealedCards(prev => [...prev, i]);
      }, i * 1200); // 1.2s between each card reveal
      delays.push(timeout);
    }

    return () => delays.forEach(t => clearTimeout(t));
  }, [teamVisible]);

  // Run after content is loaded so ref is in the DOM
  useEffect(() => {
    if (loading) {
      console.log('[About reveal] Skipping observer setup: still loading');
      return;
    }
    const el = teamSectionRef.current;
    if (!el) {
      console.warn('[About reveal] No teamSectionRef.current – observer not attached');
      return;
    }
    console.log('[About reveal] Setting up IntersectionObserver on team section');
    
    let timeoutId = null;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('[About reveal] ===== Observer callback =====');
        console.log('[About reveal] isIntersecting:', entry.isIntersecting);
        console.log('[About reveal] boundingClientRect.top:', entry.boundingClientRect.top);
        console.log('[About reveal] scrollDirection:', scrollDirection);
        console.log('[About reveal] hasTriggered:', hasTriggered);
        console.log('[About reveal] teamVisible:', teamVisible);
        
        const isAtTop = entry.isIntersecting && entry.boundingClientRect.top <= 100;
        
        if (isAtTop && scrollDirection === 'down') {
          // Scrolling DOWN and section is at top
          if (!teamVisible) {
            // Trigger animation (first time OR re-trigger after scrolling up)
            console.log('[About reveal] ✅ Triggering animation - scrolling DOWN, section at top');
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
              setTeamVisible(true);
              setHasTriggered(true);
              console.log('[About reveal] ✅ teamVisible set to TRUE');
            }, 100);
          } else {
            console.log('[About reveal] ⏭️ Already visible, scrolling DOWN past - no action');
          }
        } else if (!entry.isIntersecting && scrollDirection === 'up' && teamVisible) {
          // Scrolled UP past the section - reset animation so it can retrigger
          console.log('[About reveal] ⬆️ Scrolled UP past section - resetting for re-trigger');
          if (timeoutId) clearTimeout(timeoutId);
          setTeamVisible(false);
          // Keep hasTriggered = true so we know it happened before
        } else if (!entry.isIntersecting && scrollDirection === 'down') {
          // Scrolled DOWN past the section - don't reset anything
          console.log('[About reveal] ⬇️ Scrolled DOWN past section - keeping state');
        }
      },
      { 
        threshold: [0, 0.1, 0.2, 0.5, 1],
        rootMargin: '-50px 0px 0px 0px'
      }
    );
    
    observer.observe(el);
    console.log('[About reveal] Observer attached to element');
    
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      console.log('[About reveal] Observer cleaned up');
    };
  }, [loading, scrollDirection, teamVisible, hasTriggered]);

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
    paragraphText = about.paragraphs;
  } else if (about?.paragraphs && Array.isArray(about.paragraphs) && about.paragraphs.length > 0) {
    paragraphText = about.paragraphs[0];
  } else if (about?.paragraphs && typeof about.paragraphs === 'object') {
    try {
      const p = about.paragraphs;
      if (p.establishment_year && p.location && p.agency_type && p.solutions && p.team_size && p.client_portfolio) {
        paragraphText = `Established in ${p.establishment_year} and based in ${p.location}, we are an ${p.agency_type.toLowerCase()} delivering end-to-end solutions across ${p.solutions.join(', ').toLowerCase()}. With a growing team of ${p.team_size} passionate professionals, we proudly serve over ${p.client_portfolio.retained_government_clients} retained government clients and ${p.client_portfolio.corporate_brands} corporate brands.`;
      } else {
        paragraphText = about.paragraphs[0] || 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
      }
    } catch (error) {
      console.warn('Error processing complex paragraph structure:', error);
      paragraphText = about.paragraphs[0] || 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
    }
  } else {
    paragraphText = 'Established in 2018 and based in Kuala Lumpur, we are an integrated marketing agency delivering end-to-end solutions across digital, creative, media, events, and print. With a growing team of 15 passionate professionals, we proudly serve over 20 retained government clients and 10 corporate brands.';
  }
  
  const quote = about?.quote || '"OUR JOURNEY OF GROWTH IS BUILT ON SHARED SUCCESSES WITH THOSE WE SERVE."';
  const backgroundImage = getImageUrl(about?.teamImage) || companyWebsiteImg;

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

          {/* Meet our Team - Card Pack Opening Animation */}
          <section ref={teamSectionRef} className="w-full max-w-6xl mt-20 px-4">
            <div className="text-center mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-tech-100 text-tech-700 text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-tech-500 rounded-full mr-2"></span>
                Meet our Team
              </div>
              <h3 className="text-3xl md:text-4xl font-bold">
                <span className="tech-text-gradient">The People Behind The Work</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative min-h-[450px]">
              {(displayedMembers.length > 0 ? displayedMembers : [1,2,3,4]).map((member, idx) => {
                const isCurrentlyRevealing = revealedCards.length === idx;
                const hasFullyRevealed = revealedCards.includes(idx);
                const isPlaceholder = typeof member === 'number';
                
                return (
                  <TeamCard
                    key={isPlaceholder ? `ph-${member}` : (member?.id || idx)}
                    member={member}
                    idx={idx}
                    isCurrentlyRevealing={isCurrentlyRevealing}
                    hasFullyRevealed={hasFullyRevealed}
                    teamVisible={teamVisible}
                  />
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