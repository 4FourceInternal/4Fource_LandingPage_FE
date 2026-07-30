import {
  formatLongDate,
  formatDurationWithDates,
  formatInternshipAllowance,
} from '../../formatters';
import { INTERNSHIP_TERMS } from './constants';

/** @param {import('../../types').InternshipOfferLetterData} data @param {import('../../types').CompanyBranding} branding @param {string|null} logoDataUrl */
export const buildInternshipOfferLetterDocument = (data, branding, logoDataUrl) => {
  const companyLine = branding.registrationNumber
    ? `${branding.legalName} (${branding.registrationNumber})`
    : branding.legalName;

  const scopeItems = (data.scopeItems || []).map((s) => s.trim()).filter(Boolean);
  const supervisorLine = `${data.supervisorName}${data.supervisorTitle ? `, ${data.supervisorTitle}` : ''}`;

  const detailRows = [
    { label: 'Position', value: data.position },
    { label: 'Department', value: data.department },
    { label: 'Duration', value: formatDurationWithDates(data.startDate, data.endDate) },
    { label: 'Working days', value: data.workingDays },
    { label: 'Working hours', value: data.workingHours },
    { label: 'Working arrangement', value: data.workingArrangement },
    { label: 'Registered Company Address', value: data.internshipLocation },
    { label: 'Supervisor', value: supervisorLine },
    { label: 'Allowance', value: formatInternshipAllowance(data) },
  ];

  return {
    meta: {
      title: `Internship Offer - ${data.candidateName}`,
      author: branding.legalName,
      subject: 'Internship Offer Letter',
    },
    companyLine,
    logoDataUrl,
    branding,
    data,
    detailRows,
    scopeItems,
    terms: INTERNSHIP_TERMS,
    offerDateFormatted: formatLongDate(data.offerDate),
    openingText: `We are pleased to offer you an internship placement as ${data.position} at ${branding.legalName}. This placement is offered in support of your university industrial training programme and is designed to provide practical industry exposure in software engineering and related activities.`,
    closingText:
      'We look forward to having you as part of our team and wish you a valuable learning experience throughout your internship.',
  };
};

export default buildInternshipOfferLetterDocument;
