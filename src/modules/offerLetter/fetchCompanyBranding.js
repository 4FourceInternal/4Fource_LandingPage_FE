import { getContactContent, getGlobalContent } from '../../services/cmsService';
import companyLogo from '../../assets/FourceTech.png';
import { DEFAULT_COMPANY_BRANDING } from './branding';

/** @param {unknown} addressLines */
const formatAddress = (addressLines) => {
  if (Array.isArray(addressLines)) {
    return addressLines
      .map((line) => String(line).replace(/^["']|["']$/g, '').trim())
      .filter(Boolean)
      .join(', ');
  }
  if (typeof addressLines === 'string') {
    return addressLines.replace(/^["']|["']$/g, '').trim();
  }
  return '';
};

/** Extract registration number from footer copyright, e.g. "(002857086-D)" */
const extractRegistrationNumber = (copyright) => {
  if (!copyright || typeof copyright !== 'string') return '';
  const match = copyright.match(/\(([A-Z0-9-]+)\)/i);
  return match?.[1] || '';
};

/** @param {string} href */
const emailFromHref = (href) => {
  if (!href || typeof href !== 'string') return '';
  return href.replace(/^mailto:/i, '').trim();
};

/**
 * Build company branding from CMS contact + global endpoints.
 * Contact API: address, phone, email (info + buttons)
 * Global API: company name, copyright/reg no. (footer), brand name (header)
 * @returns {Promise<import('./types').CompanyBranding>}
 */
export const fetchCompanyBranding = async () => {
  const [contact, global] = await Promise.all([
    getContactContent().catch(() => null),
    getGlobalContent().catch(() => null),
  ]);

  const contactInfo = contact?.info || global?.footer?.contactInfo || {};
  const footer = global?.footer || {};
  const headerBrand = global?.header?.brand || {};

  const legalName =
    footer.companyName ||
    headerBrand.logoText ||
    DEFAULT_COMPANY_BRANDING.legalName;

  const registrationNumber =
    extractRegistrationNumber(footer.copyright) ||
    DEFAULT_COMPANY_BRANDING.registrationNumber;

  const address =
    formatAddress(contactInfo.addressLines) || DEFAULT_COMPANY_BRANDING.address;

  const email =
    contactInfo.email ||
    emailFromHref(contact?.buttons?.email?.href) ||
    DEFAULT_COMPANY_BRANDING.email;

  const phone =
    contactInfo.phone ||
    DEFAULT_COMPANY_BRANDING.phone;

  return {
    legalName,
    registrationNumber,
    address,
    email,
    phone,
    logoSrc: companyLogo,
    primaryColor: DEFAULT_COMPANY_BRANDING.primaryColor,
    accentColor: DEFAULT_COMPANY_BRANDING.accentColor,
  };
};

export default fetchCompanyBranding;
