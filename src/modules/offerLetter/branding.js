import companyLogo from '../../assets/FourceTech.png';

/** Minimal fallback — overridden at runtime by CMS (contact + global APIs) */
export const DEFAULT_COMPANY_BRANDING = {
  legalName: 'Company Name',
  registrationNumber: '',
  address: '',
  email: '',
  phone: '',
  logoSrc: companyLogo,
  primaryColor: '#3b7ad0',
  accentColor: '#6366f1',
};

export default DEFAULT_COMPANY_BRANDING;
