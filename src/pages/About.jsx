import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';

const ACCENT_STYLES = [
  { ring: 'ring-sky-500/50', badge: 'bg-sky-500/10 border-sky-500/30 text-sky-300', dot: 'bg-sky-400', title: 'text-sky-300' },
  { ring: 'ring-indigo-500/50', badge: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300', dot: 'bg-indigo-400', title: 'text-indigo-300' },
  { ring: 'ring-emerald-500/50', badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', dot: 'bg-emerald-400', title: 'text-emerald-300' },
  { ring: 'ring-violet-500/50', badge: 'bg-violet-500/10 border-violet-500/30 text-violet-300', dot: 'bg-violet-400', title: 'text-violet-300' },
  { ring: 'ring-amber-500/50', badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300', dot: 'bg-amber-400', title: 'text-amber-300' },
  { ring: 'ring-rose-500/50', badge: 'bg-rose-500/10 border-rose-500/30 text-rose-300', dot: 'bg-rose-400', title: 'text-rose-300' },
];

const getMemberImage = (member) => {
  const empImg = member?.EmployeeImage;
  const imgData =
    empImg?.formats?.medium ??
    empImg?.formats?.small ??
    empImg?.formats?.thumbnail ??
    empImg ??
    null;
  return imgData ? getImageUrl(imgData) : null;
};

const cleanQuote = (text) =>
  (text || '').replace(/^[""\u201c\u201d]|[""\u201c\u201d]$/g, '').trim();

const AvatarFallback = ({ className = 'w-12 h-12' }) => (
  <svg className={`${className} text-slate-600`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" />
  </svg>
);

const StatCard = ({ value, label }) => (
  <div className="cyber-card p-6 md:p-8 text-center">
    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
      {value}
    </div>
    <div className="text-xs md:text-sm text-slate-400 mt-2 uppercase tracking-wider">{label}</div>
  </div>
);

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { data: about, loading, error } = useCMSData('about');

  const seo = about?.seo || {};
  const heading = about?.heading || 'CREATIVE IMPACT, MEASURABLE RESULTS.';
  const quote =
    about?.quote ||
    '"OUR JOURNEY OF GROWTH IS BUILT ON SHARED SUCCESSES WITH THOSE WE SERVE."';

  const paragraphText = useMemo(() => {
    const fallback =
      '"Fource" is a blend of \'force\' and \'source\' — representing the power behind innovation and the source of intelligent solutions.';
    if (!about?.paragraphs) return fallback;
    if (typeof about.paragraphs === 'string') return about.paragraphs;
    if (Array.isArray(about.paragraphs) && about.paragraphs.length) return about.paragraphs[0];
    return fallback;
  }, [about?.paragraphs]);

  const teamMembers = useMemo(
    () => (Array.isArray(about?.teams) ? about.teams : []),
    [about?.teams]
  );

  const activeMember = teamMembers[activeIndex] ?? null;
  const accent = ACCENT_STYLES[activeIndex % ACCENT_STYLES.length];

  const goTo = (index) => {
    if (index < 0 || index >= teamMembers.length) return;
    setActiveIndex(index);
  };

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
        <title>{seo?.metaTitle || seo?.title || 'About Us'}</title>
        <meta name="description" content={seo?.metaDescription || seo?.description || ''} />
      </Helmet>

      <main className="container-custom min-h-screen relative z-0 pb-16 md:pb-24">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-10 md:mb-14 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-sky-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10 text-center py-14 md:py-20 px-5 md:px-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs md:text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse" />
              About Our Company
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-slate-50 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="mb-5 md:mb-6">
          <div className="cyber-card p-6 md:p-8">
            <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-4xl">{paragraphText}</p>
          </div>
        </section>

        {/* Quote — pull-quote style, works for single-line quotes */}
        <section className="mb-10 md:mb-14">
          <blockquote className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-slate-900/40 px-6 py-8 md:px-12 md:py-10 text-center">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-sky-500/5 via-indigo-500/10 to-sky-500/5" />
            <div className="relative mx-auto max-w-3xl">
              <svg
                className="mx-auto mb-4 h-8 w-8 text-sky-400/40"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-100 leading-snug italic">
                {quote}
              </p>
            </div>
          </blockquote>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 mb-14 md:mb-20">
          <StatCard value="2+" label="Years Experience" />
          <StatCard value="20+" label="Projects Completed" />
          <StatCard value="100%" label="Client Satisfaction" />
        </section>

        {/* Team */}
        {teamMembers.length > 0 && (
          <section>
            <div className="text-center mb-8 md:mb-10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs md:text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2" />
                Meet the Team
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-slate-50">
                The People Behind The Work
              </h2>
              <p className="text-slate-400 mt-3 text-sm md:text-base max-w-xl mx-auto">
                Tap a team member to learn more about who they are and what they bring to the table.
              </p>
            </div>

            {/* Featured member spotlight */}
            <div className="cyber-card overflow-hidden mb-6 md:mb-8">
              <AnimatePresence mode="wait">
                {activeMember && (
                  <motion.div
                    key={activeMember?.id ?? activeIndex}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-2"
                  >
                    {/* Photo */}
                    <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[420px] bg-slate-900">
                      {getMemberImage(activeMember) ? (
                        <img
                          src={getMemberImage(activeMember)}
                          alt={activeMember?.Name || 'Team member'}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                          <AvatarFallback className="w-20 h-20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-slate-950/80" />
                      <div className="absolute bottom-4 left-4 md:hidden">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${accent.badge}`}>
                          {activeMember?.title || 'Team Member'}
                        </span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-6 md:p-10 flex flex-col justify-center">
                      <span className={`hidden md:inline-flex w-fit px-3 py-1 rounded-full text-xs font-medium border mb-4 ${accent.badge}`}>
                        {activeMember?.title || 'Team Member'}
                      </span>
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-50 mb-4">
                        {activeMember?.Name || 'Unnamed'}
                      </h3>
                      <div className={`w-12 h-0.5 rounded-full mb-5 ${accent.dot}`} />

                      {activeMember?.description && (
                        <div className="mb-5">
                          <span className="text-[10px] uppercase tracking-widest text-slate-500 block mb-1">
                            About
                          </span>
                          <p className="text-slate-300 leading-relaxed">{activeMember.description}</p>
                        </div>
                      )}

                      {cleanQuote(activeMember?.features) && (
                        <blockquote className="border-l-2 border-sky-500/40 pl-4 mt-2">
                          <p className="text-slate-400 italic text-sm md:text-base leading-relaxed">
                            "{cleanQuote(activeMember.features)}"
                          </p>
                        </blockquote>
                      )}

                      {/* Navigation */}
                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                        <div className="flex items-center gap-2">
                          {teamMembers.map((_, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => goTo(i)}
                              aria-label={`View team member ${i + 1}`}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                i === activeIndex
                                  ? `w-6 ${ACCENT_STYLES[i % ACCENT_STYLES.length].dot}`
                                  : 'w-2 bg-slate-700 hover:bg-slate-500'
                              }`}
                            />
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => goTo(activeIndex - 1)}
                            disabled={activeIndex === 0}
                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label="Previous team member"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => goTo(activeIndex + 1)}
                            disabled={activeIndex === teamMembers.length - 1}
                            className="p-2 rounded-lg border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                            aria-label="Next team member"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Team grid — all members at a glance */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
              {teamMembers.map((member, idx) => {
                const imgUrl = getMemberImage(member);
                const isActive = idx === activeIndex;
                const style = ACCENT_STYLES[idx % ACCENT_STYLES.length];

                return (
                  <button
                    key={member?.id ?? idx}
                    type="button"
                    onClick={() => goTo(idx)}
                    className={`group text-left rounded-xl overflow-hidden border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                      isActive
                        ? `border-white/20 ring-2 ${style.ring} scale-[1.02] shadow-lg`
                        : 'border-white/10 hover:border-white/20 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="relative aspect-[3/4] bg-slate-900">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={member?.Name || 'Team member'}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <AvatarFallback />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-sm font-semibold text-white truncate">{member?.Name || 'Unnamed'}</p>
                        {member?.title && (
                          <p className={`text-[10px] md:text-xs truncate mt-0.5 ${style.title}`}>
                            {member.title}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default About;
