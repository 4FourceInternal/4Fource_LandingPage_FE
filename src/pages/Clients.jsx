import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import useCMSData from '../hooks/useCMSData';
import { getImageUrl } from '../utils/imageUtils';
import { clients as localClients } from '../cms/content';
import quickInfoBgImg from '../assets/quickInfo-bg.png';

const TAB_COLORS = {
  open: {
    active: 'bg-gradient-to-r from-sky-500 to-indigo-500 border-sky-300 text-white',
    idle: 'bg-slate-800/60 border-white/10 text-slate-300 hover:border-sky-400/50',
    badge: 'from-sky-500 to-indigo-500 border-sky-300',
  },
  private: {
    active: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 border-violet-300 text-white',
    idle: 'bg-slate-800/60 border-white/10 text-slate-300 hover:border-violet-400/50',
    badge: 'from-violet-500 to-fuchsia-500 border-violet-300',
  },
};

const normalizeClient = (client, index) => ({
  id: client?.id ?? `client-${index}`,
  name:
    client?.clientName ||
    client?.name ||
    client?.Name ||
    'Client',
  logo: getImageUrl(client?.logo) || getImageUrl(client?.Logo) || client?.logoUrl || null,
  description:
    client?.description ||
    client?.note ||
    '',
});

const normalizeSection = (section, fallback) => ({
  title:
    section?.sectionTitle ||
    section?.title ||
    fallback.title,
  description:
    section?.sectionDescription ||
    section?.description ||
    fallback.description,
  clients: (section?.clients?.length ? section.clients : fallback.clients).map(normalizeClient),
});

const ClientLogoCard = ({ client, accent }) => {
  const initial = (client.name || 'C').charAt(0).toUpperCase();

  return (
    <div className="group relative bg-slate-800/60 backdrop-blur-sm border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center hover:border-sky-400/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div
        className={`w-24 h-24 md:w-28 md:h-28 rounded-2xl mb-4 flex items-center justify-center overflow-hidden bg-gradient-to-br ${accent} border shadow-lg p-3`}
      >
        {client.logo ? (
          <img
            src={client.logo}
            alt={client.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-3xl md:text-4xl font-bold text-white/90">{initial}</span>
        )}
      </div>
      <h3 className="font-semibold text-slate-100 text-sm md:text-base leading-tight">
        {client.name}
      </h3>
      {client.description && (
        <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
          {client.description}
        </p>
      )}
    </div>
  );
};

const Clients = () => {
  const { data: cmsData, loading } = useCMSData('clients');
  const [activeTab, setActiveTab] = useState('open');

  const page = useMemo(() => {
    const source = cmsData || localClients;
    return {
      seo: source?.seo || localClients.seo,
      heading: source?.heading || localClients.heading,
      lead: source?.lead || localClients.lead,
      backgroundImage:
        getImageUrl(source?.backgroundImage) || quickInfoBgImg,
      openProjects: normalizeSection(source?.openProjects, localClients.openProjects),
      privateProjects: normalizeSection(source?.privateProjects, localClients.privateProjects),
    };
  }, [cmsData]);

  const activeSection =
    activeTab === 'open' ? page.openProjects : page.privateProjects;
  const tabStyle = TAB_COLORS[activeTab];

  if (loading && !cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  const seo = page.seo;

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Our Client - Fource Technologies'}</title>
        <meta
          name="description"
          content={
            seo?.metaDescription ||
            seo?.description ||
            'Trusted partners across open and private sector projects.'
          }
        />
      </Helmet>

      <main className="container-custom min-h-screen flex flex-col relative z-0 pb-12">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${page.backgroundImage})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-900/88 to-slate-950/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-500/10 via-transparent to-violet-500/10 pointer-events-none" />

          <div className="relative z-10 text-center py-16 md:py-20 px-6 md:px-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse" />
              Our Client
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                {page.heading}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              {page.lead}
            </p>
          </div>
        </section>

        {/* Tabs: Open / Private */}
        <section className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setActiveTab('open')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold text-sm md:text-base border transition-all duration-200 ${
                activeTab === 'open' ? TAB_COLORS.open.active : TAB_COLORS.open.idle
              }`}
            >
              Open Projects
              <span className="ml-2 opacity-80">({page.openProjects.clients.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('private')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold text-sm md:text-base border transition-all duration-200 ${
                activeTab === 'private' ? TAB_COLORS.private.active : TAB_COLORS.private.idle
              }`}
            >
              Private Projects
              <span className="ml-2 opacity-80">({page.privateProjects.clients.length})</span>
            </button>
          </div>
        </section>

        {/* Active section */}
        <section className="relative bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 p-6 md:p-10">
          <div className="flex items-start gap-4 mb-8">
            <div
              className={`w-12 h-12 flex-shrink-0 bg-gradient-to-r ${tabStyle.badge} rounded-xl flex items-center justify-center border shadow-lg`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {activeTab === 'open' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                )}
              </svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-100">{activeSection.title}</h2>
              <p className="text-slate-400 mt-1 text-sm md:text-base">{activeSection.description}</p>
            </div>
          </div>

          {activeSection.clients.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {activeSection.clients.map((client, index) => (
                <ClientLogoCard
                  key={client.id}
                  client={client}
                  accent={
                    activeTab === 'open'
                      ? 'from-slate-700 to-slate-800 border-white/10'
                      : 'from-slate-700 to-slate-900 border-white/10'
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-slate-400 py-12">No clients listed yet.</p>
          )}
        </section>

      </main>
    </>
  );
};

export default Clients;
