/** @param {import('../../types').InternshipOfferLetterData} data */
export const validateInternshipOfferLetter = (data) => {
  /** @type {Record<string, string>} */
  const errors = {};

  if (!data.candidateName?.trim()) errors.candidateName = 'Candidate full name is required';

  if (data.candidateEmail?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.candidateEmail.trim())) {
    errors.candidateEmail = 'Enter a valid email address';
  }

  if (!data.position?.trim()) errors.position = 'Internship position is required';
  if (!data.department?.trim()) errors.department = 'Department/team is required';
  if (!data.startDate) errors.startDate = 'Start date is required';
  if (!data.endDate) errors.endDate = 'End date is required';
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    errors.endDate = 'End date must be on or after start date';
  }

  if (!data.workingDays?.trim()) errors.workingDays = 'Working days are required';
  if (!data.workingHours?.trim()) errors.workingHours = 'Working hours are required';
  if (!data.internshipLocation?.trim()) errors.internshipLocation = 'Internship location is required';

  if (!data.supervisorName?.trim()) errors.supervisorName = 'Supervisor name is required';
  if (!data.supervisorTitle?.trim()) errors.supervisorTitle = 'Supervisor title is required';

  if (data.isPaidInternship) {
    const amount = Number(String(data.allowanceAmount).replace(/,/g, ''));
    if (!data.allowanceAmount || Number.isNaN(amount) || amount <= 0) {
      errors.allowanceAmount = 'Enter a valid allowance amount for paid internships';
    }
  }

  if (!data.signatoryName?.trim()) errors.signatoryName = 'Signatory name is required';
  if (!data.signatoryTitle?.trim()) errors.signatoryTitle = 'Signatory title is required';

  const scopeItems = (data.scopeItems || []).filter((item) => item.trim());
  if (scopeItems.length === 0) {
    errors.scopeItems = 'Add at least one internship scope item';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateInternshipOfferLetter;
