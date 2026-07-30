import { LETTER_TYPES } from './letterTypes';
import InternshipOfferLetterDocument from './templates/internship/InternshipOfferLetterDocument';
import { createDefaultInternshipOfferLetterData } from './templates/internship/defaults';
import { validateInternshipOfferLetter } from './templates/internship/validate';

/**
 * Registry of letter templates — add employment / freelance entries here later.
 * @type {Record<string, {
 *   label: string,
 *   Document: React.ComponentType<any>,
 *   validate: (data: object) => { isValid: boolean, errors: Record<string, string> },
 *   createDefaultData: () => object,
 *   filenamePrefix: string,
 * }>}
 */
export const LETTER_REGISTRY = {
  [LETTER_TYPES.INTERNSHIP]: {
    label: 'Internship Offer Letter',
    Document: InternshipOfferLetterDocument,
    validate: validateInternshipOfferLetter,
    createDefaultData: createDefaultInternshipOfferLetterData,
    filenamePrefix: 'Internship_Offer',
  },
};

/** @param {string} letterType */
export const getLetterTemplate = (letterType) => {
  const template = LETTER_REGISTRY[letterType];
  if (!template) {
    throw new Error(`Unknown letter type: ${letterType}. Available: ${Object.keys(LETTER_REGISTRY).join(', ')}`);
  }
  return template;
};

export default LETTER_REGISTRY;
