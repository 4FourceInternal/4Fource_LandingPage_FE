const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** @param {string} isoDate YYYY-MM-DD */
export const formatLongDate = (isoDate) => {
  if (!isoDate) return '—';
  const [y, m, d] = isoDate.split('-').map(Number);
  if (!y || !m || !d) return isoDate;
  return `${d} ${MONTHS[m - 1]} ${y}`;
};

/** @param {string} startISO @param {string} endISO */
export const formatDuration = (startISO, endISO) => {
  if (!startISO || !endISO) return '—';
  const start = new Date(startISO);
  const end = new Date(endISO);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return '—';

  const diffMs = end.getTime() - start.getTime();
  const days = Math.max(0, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
  const weeks = Math.round(days / 7);
  const months = Math.round(days / 30);

  if (days <= 14) return `${days} day${days === 1 ? '' : 's'}`;
  if (days < 60) return `${weeks} week${weeks === 1 ? '' : 's'}`;
  return `${months} month${months === 1 ? '' : 's'}`;
};

/** @param {string} startISO @param {string} endISO */
export const formatDurationWithDates = (startISO, endISO) => {
  const duration = formatDuration(startISO, endISO);
  if (duration === '—') return '—';
  return `${duration} (${formatLongDate(startISO)} – ${formatLongDate(endISO)})`;
};

/** @param {string|number} amount @param {string} currency */
export const formatCurrency = (amount, currency = 'MYR') => {
  const value = Number(String(amount).replace(/,/g, ''));
  if (!amount || Number.isNaN(value)) return null;

  try {
    return new Intl.NumberFormat('en-MY', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString('en-MY')}`;
  }
};

/** @param {import('./types').InternshipOfferLetterData} data */
export const formatInternshipAllowance = (data) => {
  if (!data.isPaidInternship) {
    return 'Unpaid internship';
  }

  const amount = formatCurrency(data.allowanceAmount, data.allowanceCurrency);
  if (!amount) return 'Unpaid internship';

  const periodLabels = {
    month: 'Monthly internship allowance',
    week: 'Weekly internship allowance',
    day: 'Daily internship allowance',
    total: 'Total internship allowance',
  };

  const label = periodLabels[data.allowancePeriod] || 'Monthly internship allowance';
  return `${label}: ${amount}`;
};

/** @param {import('./types').InternshipOfferLetterData} data */
export const formatWorkingArrangement = (data) => {
  const parts = [
    data.workingArrangement,
    data.workingDays,
    data.workingHours,
    data.internshipLocation,
  ].filter(Boolean);
  return parts.join(' · ') || '—';
};

/** @deprecated Use formatInternshipAllowance — kept for form preview compatibility */
export const formatAllowance = formatInternshipAllowance;

/** @param {string} name */
export const sanitizeFilename = (name) =>
  (name || 'candidate')
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 60) || 'candidate';
