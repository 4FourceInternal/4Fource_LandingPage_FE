import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import useCMSData from '../hooks/useCMSData';
import { getBestImageUrl } from '../utils/imageUtils';
import { clients as localClients } from '../cms/content';

const STATUS_CONFIG = {
  in_development: {
    label: 'In Development',
    badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    dot: 'bg-amber-400',
    accent: 'from-amber-500/20 to-orange-500/10 border-amber-500/20',
  },
  active: {
    label: 'Active',
    badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    dot: 'bg-emerald-400',
    accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/20',
  },
  past: {
    label: 'Past Partnership',
    badge: 'bg-slate-500/10 border-slate-500/30 text-slate-400',
    dot: 'bg-slate-500',
    accent: 'from-slate-700/40 to-slate-800/40 border-white/10',
  },
};

const inferStatus = (client, sectionKey) => {
  if (client.projectStatus && STATUS_CONFIG[client.projectStatus]) {
    return client.projectStatus;
  }
  const text = `${client.description || ''}`.toLowerCase();
  if (/no longer|past|previous|former|completed|inactive|discontinued/.test(text)) {
    return 'past';
  }
  if (/in development|under development|building|ongoing|in progress/.test(text)) {
    return 'in_development';
  }
  if (/active|live|in production|launched/.test(text)) {
    return 'active';
  }
  return sectionKey === 'privateProjects' ? 'past' : 'in_development';
};

const normalizeClient = (client, index, sectionKey) => {
  const normalized = {
    id: client?.id ?? `${sectionKey}-${index}`,
    name: client?.clientName || client?.name || client?.Name || 'Partner',
    logo: getBestImageUrl(client?.logo ?? client?.Logo) || client?.logoUrl || null,
    description: client?.description || client?.note || '',
    projectStatus: client?.projectStatus || null,
    sectionKey,
  };
  return {
    ...normalized,
    status: inferStatus(normalized, sectionKey),
  };
};

/** Supports flat `Clients` (current CMS) and legacy open/private project sections */
const getPartnershipsFromSource = (source) => {
  const flatClients = source?.Clients ?? source?.clients;
  if (Array.isArray(flatClients)) {
    return flatClients.map((client, index) => normalizeClient(client, index, 'clients'));
  }

  const openClients = (source?.openProjects?.clients || []).map((client, index) =>
    normalizeClient(client, index, 'openProjects')
  );
  const privateClients = (source?.privateProjects?.clients || []).map((client, index) =>
    normalizeClient(client, index, 'privateProjects')
  );

  return [...openClients, ...privateClients];
};

const PartnershipCard = ({ client }) => {
  const status = STATUS_CONFIG[client.status] || STATUS_CONFIG.in_development;
  const initial = (client.name || 'P').charAt(0).toUpperCase();
  const isPast = client.status === 'past';

  return (
    <article
      className={`cyber-card overflow-hidden border ${status.accent.split(' ').pop()} ${
        isPast ? 'opacity-90' : ''
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] md:grid-cols-[160px_1fr]">
        <div
          className={`relative flex items-center justify-center p-6 sm:p-8 bg-gradient-to-br ${status.accent}`}
        >
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-slate-900/60 border border-white/10 flex items-center justify-center overflow-hidden shadow-lg p-3">
            {client.logo ? (
              <img
                src={client.logo}
                alt={client.name}
                className={`w-full h-full object-contain ${isPast ? 'grayscale opacity-70' : ''}`}
              />
            ) : (
              <span className="text-3xl font-bold text-white/80">{initial}</span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span
            className={`inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border mb-3 ${status.badge}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-slate-50">{client.name}</h3>
          {client.description ? (
            <p className="text-slate-400 text-sm md:text-base mt-2 leading-relaxed max-w-xl">
              {client.description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const Clients = () => {
  const { data: cmsData, loading } = useCMSData('clients');

  const page = useMemo(() => {
    const source = cmsData ?? localClients;

    return {
      seo: source?.seo || localClients.seo,
      heading: source?.heading || localClients.heading,
      lead: source?.lead || localClients.lead,
      partnerships: getPartnershipsFromSource(source),
    };
  }, [cmsData]);

  if (loading && !cmsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-400">
          <div className="w-10 h-10 border-2 border-slate-700 border-t-sky-400 rounded-full animate-spin" />
          <span className="text-sm">Loading…</span>
        </div>
      </div>
    );
  }

  const seo = page.seo;
  const activeCount = page.partnerships.filter((p) => p.status !== 'past').length;

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || seo?.title || 'Our Clients - Fource Technologies'}</title>
        <meta
          name="description"
          content={
            seo?.metaDescription ||
            seo?.description ||
            'Partners we build software and digital products with.'
          }
        />
      </Helmet>

      <main className="container-custom min-h-screen relative z-0 pb-16 md:pb-24">
        {/* Hero */}
        <section className="relative rounded-2xl overflow-hidden mb-10 md:mb-12 border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

          <div className="relative z-10 text-center py-14 md:py-18 px-5 md:px-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs md:text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-sky-400 rounded-full mr-2 animate-pulse" />
              Our Clients
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mx-auto">
              <span className="bg-gradient-to-r from-slate-50 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
                {page.heading}
              </span>
            </h1>
            <p className="mt-5 text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              {page.lead}
            </p>
          </div>
        </section>

        {/* Partnerships */}
        <section className="mb-10 md:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 md:mb-8">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-50">Partnerships</h2>
              <p className="text-slate-400 text-sm mt-1">
                {page.partnerships.length} partner{page.partnerships.length === 1 ? '' : 's'}
                {activeCount > 0 && (
                  <span> · {activeCount} active build{activeCount === 1 ? '' : 's'}</span>
                )}
              </p>
            </div>
          </div>

          {page.partnerships.length > 0 ? (
            <div className="space-y-4 md:space-y-5 max-w-3xl mx-auto">
              {page.partnerships.map((client) => (
                <PartnershipCard key={client.id} client={client} />
              ))}
            </div>
          ) : (
            <div className="cyber-card p-10 text-center">
              <p className="text-slate-400">No partnerships listed yet.</p>
            </div>
          )}
        </section>

        {/* How we partner */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 md:mb-14">
          {[
            {
              title: 'Product-focused',
              text: 'We work closely with partners to design, build, and ship software — not one-off campaigns.',
            },
            {
              title: 'Long-term builds',
              text: 'Engagements span development cycles, from early prototype through launch and iteration.',
            },
            {
              title: 'Select partnerships',
              text: 'We take on a small number of clients so each project gets real attention from our team.',
            },
          ].map((item) => (
            <div key={item.title} className="cyber-card p-5 md:p-6">
              <h3 className="font-semibold text-slate-100 text-sm md:text-base">{item.title}</h3>
              <p className="text-slate-400 text-sm mt-2 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="cyber-card p-8 md:p-10 text-center border-sky-500/20">
          <h2 className="text-xl md:text-2xl font-bold text-slate-50">Interested in partnering with us?</h2>
          <p className="text-slate-400 mt-2 text-sm md:text-base max-w-lg mx-auto">
            We&apos;re open to new product collaborations. Tell us what you&apos;re building and we&apos;ll see if
            we&apos;re a good fit.
          </p>
          <Link to="/contact" className="btn-cyber inline-block mt-6">
            Get in touch
          </Link>
        </section>
      </main>
    </>
  );
};

export default Clients;
