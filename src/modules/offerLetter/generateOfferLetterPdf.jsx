import { pdf } from '@react-pdf/renderer';
import { DEFAULT_COMPANY_BRANDING } from './branding';
import { sanitizeFilename } from './formatters';
import { getLetterTemplate } from './letterRegistry';
import { LETTER_TYPES } from './letterTypes';

/**
 * Load an image URL (Vite asset or remote) as a base64 data URL for @react-pdf/renderer
 * @param {string} src
 * @returns {Promise<string|null>}
 */
export const loadImageAsDataUrl = async (src) => {
  if (!src) return null;
  if (src.startsWith('data:')) return src;

  try {
    const response = await fetch(src);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
};

/**
 * @param {import('./types').InternshipOfferLetterData} data
 * @param {{ branding?: Partial<import('./types').CompanyBranding>, filename?: string, letterType?: string }} [options]
 * @returns {Promise<{ blob: Blob, filename: string }>}
 */
export const generateOfferLetterPdf = async (data, options = {}) => {
  const letterType = options.letterType || data.letterType || LETTER_TYPES.INTERNSHIP;
  const template = getLetterTemplate(letterType);
  const branding = { ...DEFAULT_COMPANY_BRANDING, ...options.branding };
  const logoDataUrl = await loadImageAsDataUrl(branding.logoSrc);
  const DocumentComponent = template.Document;

  const blob = await pdf(
    <DocumentComponent data={data} branding={branding} logoDataUrl={logoDataUrl} />
  ).toBlob();

  const filename =
    options.filename ||
    `${template.filenamePrefix}_${sanitizeFilename(data.candidateName)}_${data.referenceNumber.replace(/\//g, '-')}.pdf`;

  return { blob, filename };
};

/**
 * @param {import('./types').InternshipOfferLetterData} data
 * @param {{ branding?: Partial<import('./types').CompanyBranding>, filename?: string, letterType?: string }} [options]
 */
export const downloadOfferLetterPdf = async (data, options = {}) => {
  const { blob, filename } = await generateOfferLetterPdf(data, options);

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);

  return { blob, filename };
};

export default downloadOfferLetterPdf;
