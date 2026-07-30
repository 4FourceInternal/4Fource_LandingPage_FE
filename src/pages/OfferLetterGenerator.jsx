import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  OfferLetterForm,
  useOfferLetterForm,
  useCompanyBranding,
  downloadOfferLetterPdf,
} from '../modules/offerLetter';

const OfferLetterGenerator = () => {
  const { data, setField, errors, resetForm, validate } = useOfferLetterForm();
  const { branding, loading: brandingLoading, error: brandingError } = useCompanyBranding();
  const [generating, setGenerating] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (branding.address && !data.internshipLocation) {
      setField('internshipLocation', branding.address);
    }
  }, [branding.address, data.internshipLocation, setField]);

  const handleGenerate = async () => {
    setStatus(null);
    if (!validate()) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields before generating.' });
      return;
    }

    setGenerating(true);
    try {
      const { filename } = await downloadOfferLetterPdf(data, { branding });
      setStatus({ type: 'success', message: `Downloaded ${filename}` });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to generate PDF. Please try again.',
      });
    } finally {
      setGenerating(false);
    }
  };

  const companyLabel = branding.legalName || 'your company';

  return (
    <>
      <Helmet>
        <title>Internship Offer Letter Generator | {companyLabel}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
            <div className="container-custom py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                {branding.logoSrc && (
                  <img
                    src={branding.logoSrc}
                    alt={companyLabel}
                    className="h-10 w-auto object-contain"
                  />
                )}
                <div>
                  <p className="text-xs uppercase tracking-wider text-sky-400 font-medium">Internal tool</p>
                  <h1 className="text-lg font-semibold text-slate-100">Internship Offer Letter Generator</h1>
                  {!brandingLoading && (
                    <p className="text-xs text-slate-500 mt-0.5">{companyLabel}</p>
                  )}
                </div>
              </div>
              <Link
                to="/"
                className="text-sm text-slate-400 hover:text-slate-200 transition-colors self-start sm:self-auto"
              >
                ← Back to website
              </Link>
            </div>
          </header>

          <main className="container-custom py-8 md:py-10 pb-16">
            <div className="max-w-4xl mx-auto mb-8 space-y-3">
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Generate a professional internship offer letter for Malaysian university industrial
                training placements. Company details are loaded from your CMS (contact & global
                settings). Fields marked with <span className="text-rose-400">*</span> are required.
              </p>

              {brandingLoading && (
                <p className="text-slate-500 text-sm">Loading company details from CMS…</p>
              )}
              {brandingError && (
                <p className="text-amber-400/90 text-sm">
                  Could not load CMS company details — using defaults. Check that Strapi is running.
                </p>
              )}
              {!brandingLoading && branding.address && (
                <div className="rounded-lg border border-white/10 bg-slate-900/40 px-4 py-3 text-xs text-slate-400">
                  <span className="text-slate-300 font-medium">{branding.legalName}</span>
                  {branding.registrationNumber && (
                    <span> · {branding.registrationNumber}</span>
                  )}
                  <br />
                  {branding.address}
                  <br />
                  {[branding.email, branding.phone].filter(Boolean).join(' · ')}
                </div>
              )}
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              <OfferLetterForm
                data={data}
                branding={branding}
                errors={errors}
                onChange={setField}
              />

              {status && (
                <div
                  className={`rounded-lg border px-4 py-3 text-sm ${
                    status.type === 'success'
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sticky bottom-4 z-10">
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={generating || brandingLoading}
                  className="btn-cyber flex-1 sm:flex-none sm:min-w-[200px] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {generating ? 'Generating PDF…' : 'Download PDF offer letter'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={generating}
                  className="btn-ghost flex-1 sm:flex-none"
                >
                  Reset form
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default OfferLetterGenerator;
