import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';
import quickInfoBgImg from '../assets/quickInfo-bg.png';

const FAQ_COLORS = [
  { from: 'from-sky-500', to: 'to-indigo-500', border: 'border-sky-300' },
  { from: 'from-indigo-500', to: 'to-violet-500', border: 'border-indigo-300' },
  { from: 'from-emerald-500', to: 'to-teal-500', border: 'border-emerald-300' },
  { from: 'from-amber-500', to: 'to-orange-500', border: 'border-amber-300' },
];

const Info = () => {
  const { data: info, loading, error } = useCMSData('info');
  const [openFaq, setOpenFaq] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Error loading content</div>
      </div>
    );
  }

  const seo = info?.seo || {
    description:
      'Answers for every question. Explore our services, process, and support for your marketing and creative needs.',
  };
  const heading = info?.heading || 'ANSWERS FOR EVERY QUESTION';
  const lead =
    info?.lead ||
    'Explore our services, process, and support for your marketing and creative needs.';

  const backgroundImage = getImageUrl(info?.backgroundImage) || quickInfoBgImg;

  let faqs = info?.faqs || [];
  if (faqs && faqs.length > 0) {
    faqs = faqs.map((faq) => ({
      question: faq.question || 'Question',
      answer: faq.answer || 'Answer',
    }));
  } else {
    faqs = [
      {
        question: 'Which services are available?',
        answer:
          'We offer comprehensive media monitoring and public relations services including real-time brand monitoring, sentiment analysis, crisis management, press release distribution, media relations, strategic communication, digital PR, and government relations.',
      },
      {
        question: 'Who do you usually work with?',
        answer:
          'Our client base includes government agencies, corporate brands, and organizations across various sectors. We have extensive experience working with both public and private sector clients.',
      },
      {
        question: 'How fast is project delivery?',
        answer:
          'Media monitoring can be implemented within 24–48 hours, while comprehensive PR campaigns typically take 2–4 weeks. Crisis management responses are immediate with 24/7 support.',
      },
      {
        question: 'How can I get a proposal?',
        answer:
          'Contact us via WhatsApp or email. We will schedule a consultation, then provide a detailed proposal including strategy, timeline, deliverables, and investment.',
      },
    ];
  }

  const process = info?.process || {
    title: 'Our Process',
    steps: [
      { num: '1', label: 'Discovery & Analysis', note: 'Understanding your needs and market position' },
      { num: '2', label: 'Strategy Development', note: 'Creating tailored solutions and approaches' },
      { num: '3', label: 'Implementation', note: 'Executing campaigns and monitoring results' },
      { num: '4', label: 'Optimization', note: 'Continuous improvement and performance tracking' },
    ],
  };

  const whyUs = info?.whyUs || {
    title: 'Why Choose Us',
    points: [
      { label: 'Proven Track Record', note: 'Success with government and corporate clients' },
      { label: '24/7 Support', note: 'Round-the-clock crisis management' },
      { label: 'Transparent Reporting', note: 'Clear metrics and ROI measurement' },
      { label: 'Custom Solutions', note: 'Tailored strategies for your specific needs' },
    ],
  };

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Quick Info - Fource Technologies'}</title>
        <meta
          name="description"
          content={
            seo?.metaDescription ||
            seo?.description ||
            'Answers for every question. Explore our services, process, and support.'
          }
        />
      </Helmet>

      <main className="container-custom min-h-screen flex flex-col relative z-0 pb-12">
        {/* Hero — background image + dark overlay (same vibe as Services cards) */}
        <section className="relative rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-900/88 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

          <div className="relative z-10 text-center py-16 md:py-20 px-6 md:px-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse" />
              Quick Info
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {lead}
            </p>
          </div>
        </section>

        {/* FAQ — accordion in Services-style glass cards */}
        <section className="w-full mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center border border-sky-300 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const { from, to, border } = FAQ_COLORS[index % FAQ_COLORS.length];
              return (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border border-white/10 transition-all duration-300 hover:border-sky-400/40"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    className="w-full flex items-start gap-4 p-6 md:p-8 text-left"
                  >
                    <div
                      className={`w-10 h-10 flex-shrink-0 bg-gradient-to-r ${from} ${to} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg border ${border}`}
                    >
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg md:text-xl font-bold text-slate-100 pr-8">
                        {faq.question}
                      </h3>
                    </div>
                    <svg
                      className={`w-6 h-6 flex-shrink-0 text-sky-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="px-6 md:px-8 pb-6 md:pb-8 pt-0 md:pl-[4.5rem] text-slate-300 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Process + Why Us — two-column glass panels */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center border border-sky-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
                {process.title}
              </h3>
            </div>
            <div className="space-y-5">
              {process.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-sky-400/50 transition-colors duration-200"
                >
                  <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-bold text-sm border border-sky-300">
                    {step.num?.replace('.', '') || index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{step.label}</div>
                    <div className="text-sm text-slate-400 mt-1">{step.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center border border-emerald-300 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                {whyUs.title}
              </h3>
            </div>
            <div className="space-y-5">
              {whyUs.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:border-emerald-400/50 transition-colors duration-200"
                >
                  <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center border border-emerald-300">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{point.label}</div>
                    <div className="text-sm text-slate-400 mt-1">{point.note}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Info;
