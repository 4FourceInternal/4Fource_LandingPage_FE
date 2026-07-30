/**
 * @typedef {'internship'|'employment'|'freelance'} LetterType
 */

/**
 * @typedef {Object} CompanyBranding
 * @property {string} legalName
 * @property {string} [registrationNumber]
 * @property {string} address
 * @property {string} email
 * @property {string} phone
 * @property {string} [website]
 * @property {string} logoSrc
 */

/**
 * @typedef {Object} InternshipOfferLetterData
 * @property {LetterType} letterType
 * @property {string} referenceNumber
 * @property {string} offerDate
 * @property {string} candidateName
 * @property {string} candidateEmail
 * @property {string} position
 * @property {string} department
 * @property {string} startDate
 * @property {string} endDate
 * @property {string} workingDays
 * @property {string} workingHours
 * @property {'On-site'|'Hybrid'|'Remote'} workingArrangement
 * @property {string} internshipLocation
 * @property {string} supervisorName
 * @property {string} supervisorTitle
 * @property {boolean} isPaidInternship
 * @property {string} allowanceAmount
 * @property {string} allowanceCurrency
 * @property {'month'|'week'|'day'|'total'} allowancePeriod
 * @property {string[]} scopeItems
 * @property {string} signatoryName
 * @property {string} signatoryTitle
 */

/** @typedef {InternshipOfferLetterData} OfferLetterData */

export {};
