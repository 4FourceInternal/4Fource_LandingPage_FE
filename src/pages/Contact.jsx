import React from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';
import contactUsImg from '../assets/contactUs.png';

const OFFER_COLORS = [
  { from: 'from-sky-500', to: 'to-indigo-500', border: 'border-sky-300' },
  { from: 'from-indigo-500', to: 'to-violet-500', border: 'border-indigo-300' },
  { from: 'from-emerald-500', to: 'to-teal-500', border: 'border-emerald-300' },
  { from: 'from-amber-500', to: 'to-orange-500', border: 'border-amber-300' },
];

const Contact = () => {
  const { data: contact, loading, error } = useCMSData('contact');

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

  const seo = contact?.seo || {
    description:
      "Reach out for projects or possibilities. Let's build something great together with Qoyy Global.",
  };
  const heading = contact?.heading || 'Reach Out For Projects Or Possibilities.';
  const subheading = contact?.subheading || "LET'S Build Something Great Together";
  const lead =
    contact?.lead ||
    "Whether you're looking for a trusted partner for your next campaign or exploring new career opportunities, we'd love to hear from you.";

  const backgroundImage = getImageUrl(contact?.seo?.shareImage) || contactUsImg;

  let buttons = contact?.buttons;
  const hasValidButtons =
    buttons &&
    typeof buttons === 'object' &&
    buttons.whatsapp &&
    typeof buttons.whatsapp === 'object' &&
    buttons.whatsapp.label &&
    buttons.whatsapp.href &&
    buttons.email &&
    typeof buttons.email === 'object' &&
    buttons.email.label &&
    buttons.email.href;

  if (!hasValidButtons) {
    buttons = {
      whatsapp: {
        label: 'Contact Us via WhatsApp',
        href: 'https://wa.me/60197335343',
      },
      email: {
        label: 'Contact Us via Email',
        href: 'mailto:4fource.dev@gmail.com',
      },
    };
  } else {
    buttons = {
      whatsapp: {
        label: buttons.whatsapp?.label || 'Contact Us via WhatsApp',
        href: buttons.whatsapp?.href,
      },
      email: {
        label: buttons.email?.label || 'Contact Us via Email',
        href: buttons.email?.href,
      },
    };
  }

  let info = contact?.info;
  if (!info || typeof info !== 'object') {
    info = {
      addressLines: [
        'B3-3A-13A Solaris Dutamas, No. 1 Jalan Dutamas 1, 50480 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur.',
      ],
      phone: '+6016-670 4742',
      email: 'commercial@qoyyglobal.com',
      hours: ['Mon-Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM'],
    };
  } else {
    info = {
      addressLines: Array.isArray(info.addressLines)
        ? info.addressLines
        : [String(info.addressLines).replace(/^"|"$/g, '')],
      phone: info?.phone || '+6016-670 4742',
      email: info?.email || 'commercial@qoyyglobal.com',
      hours: Array.isArray(info.hours)
        ? info.hours
        : [String(info.hours).replace(/^"|"$/g, '')],
    };
  }

  let offers = contact?.offers;
  if (!Array.isArray(offers) || offers.length === 0) {
    offers = [
      { label: 'Partnerships', note: 'Collaborative opportunities for mutual growth' },
      { label: 'Career Opportunities', note: 'Join our dynamic team of professionals' },
      { label: 'Collaborations', note: 'Creative partnerships and joint ventures' },
      { label: 'Team Building', note: 'Become part of our growing family' },
    ];
  } else {
    offers = offers.map((offer) => ({
      label: offer?.label || 'Service',
      note: offer?.note || 'Service description',
    }));
  }

  let bottomCta = contact?.bottomCta;
  if (!bottomCta || typeof bottomCta !== 'object') {
    bottomCta = {
      title: 'Ready to Start Your Journey?',
      lead: "Don't wait to begin building something great. Contact us today and let's discuss how we can help you achieve your goals.",
      buttons: [
        { label: 'Start a Conversation', href: 'https://wa.me/60197335343', primary: true },
        { label: 'Send us an Email', href: 'mailto:4fource.dev@gmail.com', primary: false },
      ],
    };
  } else {
    bottomCta = {
      title: bottomCta.title || 'Ready to Start Your Journey?',
      lead:
        bottomCta.lead ||
        "Don't wait to begin building something great. Contact us today.",
      buttons: Array.isArray(bottomCta.buttons)
        ? bottomCta.buttons.map((btn) => ({
            label: btn?.label || 'Button',
            href: btn?.href || '#',
            primary: btn?.primary || false,
          }))
        : [
            { label: 'Start a Conversation', href: 'https://wa.me/60197335343', primary: true },
            { label: 'Send us an Email', href: 'mailto:4fource.dev@gmail.com', primary: false },
          ],
    };
  }

  const contactCards = [
    {
      title: 'Address',
      content: info.addressLines.join(', '),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      ),
      gradient: 'from-sky-500 to-indigo-500',
      border: 'border-sky-300',
    },
    {
      title: 'Phone',
      content: info.phone,
      href: `tel:${info.phone.replace(/\s/g, '')}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
      gradient: 'from-indigo-500 to-violet-500',
      border: 'border-indigo-300',
    },
    {
      title: 'Email',
      content: info.email,
      href: `mailto:${info.email}`,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      gradient: 'from-emerald-500 to-teal-500',
      border: 'border-emerald-300',
    },
    {
      title: 'Business Hours',
      content: info.hours.join(' · '),
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
      gradient: 'from-amber-500 to-orange-500',
      border: 'border-amber-300',
    },
  ];

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Contact Us - Fource Technologies'}</title>
        <meta
          name="description"
          content={
            seo?.metaDescription ||
            seo?.description ||
            'Reach out for projects or possibilities. Let\'s build something great together.'
          }
        />
      </Helmet>

      <main className="container-custom min-h-screen flex flex-col relative z-0 pb-12">
        {/* Hero */}
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
              Contact Us
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {heading}
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-4 tracking-wide">
              {subheading}
            </h2>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {lead}
            </p>
          </div>
        </section>

        {/* CTA buttons */}
        {buttons && (buttons.whatsapp || buttons.email) && (
          <section className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 mb-12">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-10 h-10 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center border border-sky-300 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
                Get In Touch
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch max-w-2xl mx-auto">
              {buttons.whatsapp?.href && (
                <a
                  href={buttons.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg border border-emerald-300 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl"
                >
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  <span className="text-sm md:text-base">{buttons.whatsapp.label}</span>
                </a>
              )}
              {buttons.email?.href && (
                <a
                  href={buttons.email.href}
                  className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-100 font-semibold border border-white/10 hover:border-sky-400/50 transition-all duration-200 hover:scale-[1.02]"
                >
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                  <span className="text-sm md:text-base">{buttons.email.label}</span>
                </a>
              )}
            </div>
          </section>
        )}

        {/* Contact details */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactCards.map((card) => {
            const inner = (
              <>
                <div
                  className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${card.gradient} rounded-xl flex items-center justify-center border ${card.border} shadow-lg`}
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {card.icon}
                  </svg>
                </div>
                <h4 className="font-semibold text-slate-100 mb-2">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{card.content}</p>
              </>
            );

            return (
              <div
                key={card.title}
                className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/10 p-6 text-center hover:border-sky-400/40 transition-colors duration-200"
              >
                {card.href ? (
                  <a href={card.href} className="block hover:text-sky-300 transition-colors">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </div>
            );
          })}
        </section>

        {/* What we offer */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-xl flex items-center justify-center border border-indigo-300 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
              How We Can Help
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offers.map((offer, index) => {
              const { from, to, border } = OFFER_COLORS[index % OFFER_COLORS.length];
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:border-sky-400/50 transition-colors duration-200"
                >
                  <div
                    className={`w-10 h-10 flex-shrink-0 bg-gradient-to-r ${from} ${to} rounded-lg flex items-center justify-center text-white font-bold text-sm border ${border}`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{offer.label}</div>
                    <div className="text-sm text-slate-400 mt-1">{offer.note}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/10 p-8 md:p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-400 to-indigo-300 bg-clip-text text-transparent">
                {bottomCta.title}
              </span>
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">{bottomCta.lead}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {bottomCta.buttons?.map((btn, index) =>
                btn.primary ? (
                  <a
                    key={index}
                    href={btn.href}
                    target={btn.href?.startsWith('http') ? '_blank' : undefined}
                    rel={btn.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-semibold shadow-lg border border-sky-300 transition-all duration-200 hover:scale-[1.02]"
                  >
                    {btn.label}
                  </a>
                ) : (
                  <a
                    key={index}
                    href={btn.href}
                    className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-slate-800/80 text-slate-100 font-semibold border border-white/10 hover:border-sky-400/50 transition-all duration-200 hover:scale-[1.02]"
                  >
                    {btn.label}
                  </a>
                )
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
