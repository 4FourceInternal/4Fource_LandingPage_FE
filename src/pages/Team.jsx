import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Baraja from 'baraja-js';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';

// Team Card Component with improved design
const TeamCard = ({ member, idx }) => {
  const isPlaceholder = typeof member === 'number';
  const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
  const title = isPlaceholder ? 'Role / Title' : (member?.title || '');
  const empImg = member?.EmployeeImage;
  const imgData = isPlaceholder ? null : (empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null);
  const imgUrl = imgData ? getImageUrl(imgData) : null;

  console.log(`[Card ${idx}] name: ${name}, imgUrl: ${imgUrl}`);

  return (
    <div className="w-full h-full flex flex-col bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700/50">
      {/* Image container - FIXED HEIGHT */}
      <div className="w-full h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
        {imgUrl ? (
          <img 
            src={imgUrl} 
            alt={name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`[Card ${idx}] Image failed to load:`, imgUrl);
              e.target.style.display = 'none';
            }}
            onLoad={() => console.log(`[Card ${idx}] ✅ Image loaded successfully`)}
          />
        ) : (
          <svg className="w-12 h-12 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
          </svg>
        )}
      </div>
      
      {/* Text info */}
      <div className="p-4 bg-slate-900/50">
        <div className="text-lg font-semibold text-white">{name}</div>
        {title && <div className="text-sm text-slate-400 mt-1">{title}</div>}
      </div>
    </div>
  );
};

const Team = () => {
  const { data: about } = useCMSData('about');
  const barajaRef = useRef(null);
  const barajaInstance = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);
    const [cardsFlyingOut, setCardsFlyingOut] = useState(false);

  const teamMembers = Array.isArray(about?.teams) ? about.teams : [];
  const displayedMembers = teamMembers.slice(0, 4).length > 0 ? teamMembers.slice(0, 4) : [1, 2, 3, 4];

useEffect(() => {
  const initTimer = setTimeout(() => {
    if (!barajaRef.current) {
      console.log('❌ No baraja ref');
      return;
    }

    // Clean up old instance
    if (barajaInstance.current) {
      console.log('🧹 Destroying old instance');
      try {
        if (barajaInstance.current.close) {
          barajaInstance.current.close();
        }
      } catch (e) {}
      barajaInstance.current = null;
    }

    console.log('🎬 Creating NEW Baraja instance');
    try {
      barajaInstance.current = new Baraja(barajaRef.current, {
        easing: 'ease-in-out',
        speed: 400
      });
      console.log('✅ Baraja initialized');

      // Phase 1: Fan spread right (irregular)
      setTimeout(() => {
        console.log('🎴 Phase 1: Fan spread right (irregular)');
        barajaInstance.current.fan({
          direction: 'right',
          speed: 500,
          easing: 'ease-out',
          range: 100,
          center: true,
          scatter: true  // Makes it irregular
        });
      }, 300);

      // Phase 2: Close the fan
      setTimeout(() => {
        console.log('🔒 Phase 2: Closing fan');
        barajaInstance.current.close();
      }, 2000); // 300 + 500 (fan speed) + some delay

      // Phase 3: Next() loop - full cycle
        setTimeout(() => {
            console.log('🔄 Phase 3: Starting next() cycle');
            const totalCards = displayedMembers.length;
            
            // Loop through all cards to bring first card back to top
            for (let i = 0; i < totalCards; i++) {
                setTimeout(() => {
                if (barajaInstance.current?.next) {
                    console.log(`➡️ next() ${i + 1}/${totalCards}`);
                    barajaInstance.current.next();
                }
                
                // After last next() call, trigger fly-out
                if (i === totalCards - 1) {
                    setTimeout(() => {
                    console.log('✈️ Phase 4: Flying cards to grid');
                    setAnimationComplete(true);
                    setCardsFlyingOut(true);
                    }, 1500); // Wait for last next() to finish
                }
                }, i * 1500);
            }
        }, 2800);

    } catch (error) {
      console.error('❌ Baraja error:', error);
    }
  }, 100);

  return () => {
    clearTimeout(initTimer);
    console.log('🧹 Cleanup');
    if (barajaInstance.current) {
      barajaInstance.current = null;
    }
  };
}, [displayedMembers.length]);

  return (
    <>
      <Helmet>
        <title>Our Team - Fource Technologies</title>
        <meta name="description" content="Meet the talented team behind Fource Technologies" />
      </Helmet>

      <main className="relative min-h-screen overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-tech-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container-custom relative z-10 px-6 py-12">
          <div className="text-center mb-8">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tech-500/10 border border-tech-500/20 text-tech-400 text-sm font-medium mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tech-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tech-500"></span>
              </div>
              Meet our Team
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="bg-gradient-to-r from-white via-tech-200 to-white bg-clip-text text-transparent">
                THE PEOPLE
              </span>
              <br />
              <span className="bg-gradient-to-r from-tech-400 via-cyan-400 to-tech-500 bg-clip-text text-transparent">
                BEHIND THE WORK
              </span>
            </motion.h1>

            <motion.p 
              className="text-slate-400 text-base max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Our talented team of professionals dedicated to delivering excellence
            </motion.p>
          </div>

          {/* Baraja container */}
        <div 
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-opacity duration-500"
            style={{ 
                width: '320px', 
                height: '520px',
                pointerEvents: 'none',
                opacity: animationComplete ? 0 : 1
            }}
        >
            <ul 
                key={`baraja-${displayedMembers.length}-${Date.now()}`}
                ref={barajaRef} 
                className="baraja" 
                style={{ width: '320px', height: '520px', margin: '0 auto', padding: 0, position: 'relative', visibility: 'visible' }}
            >
                {displayedMembers.map((member, idx) => {
                    const isPlaceholder = typeof member === 'number';
                    const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
                    const title = isPlaceholder ? 'Role / Title' : (member?.title || '');
                    const empImg = member?.EmployeeImage;
                    const imgData = isPlaceholder ? null : (empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null);
                    const imgUrl = imgData ? getImageUrl(imgData) : null;

                    return (
                        <li key={isPlaceholder ? `baraja-ph-${member}` : `baraja-${member?.id || idx}`}>
                        <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                            {/* Image container */}
                            <div className="w-full h-80 bg-slate-900 flex items-center justify-center overflow-hidden relative">
                            {(() => {
                                const isPlaceholder = typeof member === 'number';
                                const empImg = member?.EmployeeImage;
                                const imgData = isPlaceholder ? null : (empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null);
                                const imgUrl = imgData ? getImageUrl(imgData) : null;
                                const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
                                
                                return imgUrl ? (
                                <img 
                                    src={imgUrl} 
                                    alt={name} 
                                    className="w-full h-full object-cover"
                                />
                                ) : (
                                <svg className="w-12 h-12 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                                </svg>
                                );
                            })()}
                            {/* Gradient overlay at bottom for smooth transition */}
                            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                            </div>
                            
                            {/* Text info - SOLID background */}
                            <div className="p-5 bg-slate-900 flex-grow flex flex-col justify-center">
                            <div className="text-xl font-bold text-white mb-1 tracking-tight">
                                {typeof member === 'number' ? `Teammate ${member}` : (member?.Name || 'Unnamed')}
                            </div>
                            {typeof member !== 'number' && member?.title && (
                                <div className="text-sm text-tech-400 font-medium uppercase tracking-wide">
                                {member.title}
                                </div>
                            )}
                            </div>
                        </div>
                        </li>
                    );
                })}
            </ul>
        </div>

          {/* Fixed Grid - Cards fly here after animation */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayedMembers.map((member, idx) => {
                const isPlaceholder = typeof member === 'number';
                const empImg = member?.EmployeeImage;
                const imgData = isPlaceholder ? null : (empImg?.formats?.small ?? empImg?.formats?.thumbnail ?? empImg ?? null);
                const imgUrl = imgData ? getImageUrl(imgData) : null;
                const name = isPlaceholder ? `Teammate ${member}` : (member?.Name || 'Unnamed');
                const title = isPlaceholder ? 'Role / Title' : (member?.title || '');

                return (
                  <motion.div
                    key={`grid-${isPlaceholder ? member : member?.id || idx}`}
                    initial={{ opacity: 0 }}
                    animate={cardsFlyingOut ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                    className="w-full"
                  >
                    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
                      <div className="w-full h-80 bg-slate-900 flex items-center justify-center overflow-hidden relative">
                        {imgUrl ? (
                          <img 
                            src={imgUrl} 
                            alt={name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg className="w-12 h-12 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"/>
                          </svg>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
                      </div>
                      
                      <div className="p-5 bg-slate-900 flex-grow flex flex-col justify-center">
                        <div className="text-xl font-bold text-white mb-1 tracking-tight">
                          {name}
                        </div>
                        {title && (
                          <div className="text-sm text-tech-400 font-medium uppercase tracking-wide">
                            {title}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-tech-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-tech-500 animate-pulse"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-tech-500/50"></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Team;