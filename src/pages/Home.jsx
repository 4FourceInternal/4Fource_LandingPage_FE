import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';

import agencyDiscussionImg from '../assets/Perbincangan-Agensi-Kreatif_simple_compose.png';

const VALUE_PROPS = [
  {
    label: 'What we build',
    value: 'Products & platforms',
    note: 'Web apps, tools, and digital products — not one-off campaigns.',
  },
  {
    label: 'How we work',
    value: 'Small team, direct',
    note: 'You work with the people designing and shipping the product.',
  },
  {
    label: 'Engagements',
    value: 'Long-term builds',
    note: 'Focused partnerships from early development through launch.',
  },
];

const Home = () => {
  const { data: home, loading, error } = useCMSData('home');
  const navigate = useNavigate();

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
        {/* Hero Section - Split Layout */}
        <section className="relative min-h-[70vh] md:min-h-[78vh] flex items-center pt-10 md:pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr,2fr] gap-16 lg:gap-10 items-center w-full">
            {/* Left - Text & CTAs */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-tech-400 mr-2" />
                Product studio • Technology partner
              </div>

              <div className="space-y-5">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-50">
                  <span className="block mb-2 text-sm font-medium text-tech-300 uppercase tracking-[0.2em]">
                    {hero.title1}
                  </span>
                  <span className="block">
                    {hero.title2}
                  </span>
                </h1>

                <p className="text-base md:text-lg text-slate-300 max-w-xl leading-relaxed">
                  {seo.metaDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button className="btn-cyber" onClick={() => navigate('/about')}>
                  Meet our team
                </button>
                <button className="btn-ghost" onClick={() => navigate('/clients')}>
                  See our work
                </button>
                <span className="text-xs text-slate-400">
                  No templates • Everything built around your product
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/5 max-w-2xl">
                {VALUE_PROPS.map((item) => (
                  <div key={item.label} className="rounded-xl bg-white/[0.03] border border-white/5 p-4">
                    <div className="text-[11px] uppercase tracking-wider text-slate-500">{item.label}</div>
                    <div className="text-base font-semibold text-slate-50 mt-1">{item.value}</div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Visual Card */}
            <div className="relative">
              <div className="cyber-card aspect-[4/3] md:aspect-[5/4] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/70 via-slate-900/40 to-slate-900/10" />
                <img
                  src={backgroundImage}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                />
                <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6">
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span className="px-2 py-1 rounded-full bg-slate-900/70 border border-white/10">
                      Live workspace
                    </span>
                    <span className="text-slate-400">
                      Fource Technologies
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3 text-xs text-slate-200">
                      <div className="rounded-xl bg-slate-900/70 border border-white/10 p-3">
                        <div className="text-[11px] text-slate-400 mb-1">Delivery</div>
                        <div className="text-base font-semibold">4–6 weeks</div>
                      </div>
                      <div className="rounded-xl bg-slate-900/70 border border-white/10 p-3">
                        <div className="text-[11px] text-slate-400 mb-1">Stack</div>
                        <div className="text-base font-semibold">Web • Cloud</div>
                      </div>
                      <div className="rounded-xl bg-slate-900/70 border border-white/10 p-3">
                        <div className="text-[11px] text-slate-400 mb-1">Support</div>
                        <div className="text-base font-semibold">Ongoing</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;