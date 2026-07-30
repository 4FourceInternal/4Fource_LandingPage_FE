import { useState, useEffect } from 'react';
import { DEFAULT_COMPANY_BRANDING } from './branding';
import { fetchCompanyBranding } from './fetchCompanyBranding';

/** @returns {{ branding: import('./types').CompanyBranding, loading: boolean, error: string|null }} */
export const useCompanyBranding = () => {
  const [branding, setBranding] = useState(DEFAULT_COMPANY_BRANDING);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchCompanyBranding()
      .then((data) => {
        if (active) setBranding(data);
      })
      .catch((err) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Could not load company details');
          setBranding(DEFAULT_COMPANY_BRANDING);
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { branding, loading, error };
};

export default useCompanyBranding;
