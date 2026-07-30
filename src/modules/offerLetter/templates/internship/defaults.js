import { LETTER_TYPES } from '../../letterTypes';
import { DEFAULT_INTERNSHIP_SCOPE } from './constants';

const todayISO = () => new Date().toISOString().slice(0, 10);

/** @returns {import('../../types').InternshipOfferLetterData} */
export const createDefaultInternshipOfferLetterData = () => ({
  letterType: LETTER_TYPES.INTERNSHIP,
  referenceNumber: `INT/${new Date().getFullYear()}/${String(Date.now()).slice(-4)}`,
  offerDate: todayISO(),

  candidateName: '',
  candidateEmail: '',

  position: 'Software Engineering Intern',
  department: 'Software Development',
  startDate: '',
  endDate: '',
  workingDays: 'Monday – Friday',
  workingHours: '9:00 AM – 6:00 PM',
  workingArrangement: 'Hybrid',
  internshipLocation: '',

  supervisorName: '',
  supervisorTitle: 'Co-Founder & Technical Lead',

  isPaidInternship: true,
  allowanceAmount: '',
  allowanceCurrency: 'MYR',
  allowancePeriod: 'month',

  scopeItems: [...DEFAULT_INTERNSHIP_SCOPE],

  signatoryName: '',
  signatoryTitle: 'Co-Founder & Technical Lead',
});

export default createDefaultInternshipOfferLetterData;
