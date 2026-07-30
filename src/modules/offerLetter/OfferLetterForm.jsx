import React from 'react';
import {
  formatInternshipAllowance,
  formatLongDate,
  formatDurationWithDates,
} from './formatters';
import {
  SUPERVISOR_TITLE_SUGGESTIONS,
  SIGNATORY_TITLE_SUGGESTIONS,
} from './templates/internship/constants';

const Field = ({ label, error, required, children, className = '', hint }) => (
  <div className={className}>
    <label className="block text-sm font-medium text-slate-300 mb-1.5">
      {label}
      {required && <span className="text-rose-400 ml-0.5">*</span>}
    </label>
    {children}
    {hint && !error && <p className="text-slate-500 text-xs mt-1">{hint}</p>}
    {error && <p className="text-rose-400 text-xs mt-1">{error}</p>}
  </div>
);

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50 ${
    hasError ? 'border-rose-500/60' : 'border-white/10'
  }`;

const Section = ({ title, description, children }) => (
  <section className="cyber-card p-5 md:p-6">
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
    </div>
    {children}
  </section>
);

const scopeToText = (items) => (Array.isArray(items) ? items.join('\n') : '');
const textToScope = (text) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

/**
 * @param {{
 *   data: import('./types').InternshipOfferLetterData,
 *   branding: import('./types').CompanyBranding,
 *   errors: Record<string, string>,
 *   onChange: (field: string, value: string | number | boolean | string[]) => void,
 * }} props
 */
const OfferLetterForm = ({ data, branding, errors, onChange }) => (
  <div className="space-y-5">
    <Section
      title="Letter information"
      description="Reference and issue date for this internship offer."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Reference number" error={errors.referenceNumber}>
          <input
            type="text"
            value={data.referenceNumber}
            onChange={(e) => onChange('referenceNumber', e.target.value)}
            className={inputClass(errors.referenceNumber)}
          />
        </Field>
        <Field label="Date issued" error={errors.offerDate} required>
          <input
            type="date"
            value={data.offerDate}
            onChange={(e) => onChange('offerDate', e.target.value)}
            className={inputClass(errors.offerDate)}
          />
        </Field>
      </div>
    </Section>

    <Section
      title="Candidate information"
      description="University student receiving this internship placement letter."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" error={errors.candidateName} required>
          <input
            type="text"
            value={data.candidateName}
            onChange={(e) => onChange('candidateName', e.target.value)}
            placeholder="e.g. Ahmad bin Abdullah"
            className={inputClass(errors.candidateName)}
          />
        </Field>
        <Field label="Email" error={errors.candidateEmail} hint="Optional">
          <input
            type="email"
            value={data.candidateEmail}
            onChange={(e) => onChange('candidateEmail', e.target.value)}
            placeholder="student@university.edu.my"
            className={inputClass(errors.candidateEmail)}
          />
        </Field>
      </div>
    </Section>

    <Section
      title="Internship details"
      description="Placement information for your university industrial training programme."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Internship position" error={errors.position} required>
          <input
            type="text"
            value={data.position}
            onChange={(e) => onChange('position', e.target.value)}
            placeholder="e.g. Software Engineering Intern"
            className={inputClass(errors.position)}
          />
        </Field>
        <Field label="Department / team" error={errors.department} required>
          <input
            type="text"
            value={data.department}
            onChange={(e) => onChange('department', e.target.value)}
            placeholder="e.g. Software Development"
            className={inputClass(errors.department)}
          />
        </Field>
        <Field label="Start date" error={errors.startDate} required>
          <input
            type="date"
            value={data.startDate}
            onChange={(e) => onChange('startDate', e.target.value)}
            className={inputClass(errors.startDate)}
          />
        </Field>
        <Field label="End date" error={errors.endDate} required>
          <input
            type="date"
            value={data.endDate}
            onChange={(e) => onChange('endDate', e.target.value)}
            className={inputClass(errors.endDate)}
          />
        </Field>
        <Field label="Working days" error={errors.workingDays} required>
          <input
            type="text"
            value={data.workingDays}
            onChange={(e) => onChange('workingDays', e.target.value)}
            placeholder="Monday – Friday"
            className={inputClass(errors.workingDays)}
          />
        </Field>
        <Field label="Working hours" error={errors.workingHours} required>
          <input
            type="text"
            value={data.workingHours}
            onChange={(e) => onChange('workingHours', e.target.value)}
            placeholder="9:00 AM – 6:00 PM"
            className={inputClass(errors.workingHours)}
          />
        </Field>
        <Field label="Working arrangement" error={errors.workingArrangement} required>
          <select
            value={data.workingArrangement}
            onChange={(e) => onChange('workingArrangement', e.target.value)}
            className={inputClass(errors.workingArrangement)}
          >
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </Field>
        <Field label="Internship location" error={errors.internshipLocation} required>
          <input
            type="text"
            value={data.internshipLocation}
            onChange={(e) => onChange('internshipLocation', e.target.value)}
            placeholder="Office address or city"
            className={inputClass(errors.internshipLocation)}
          />
        </Field>
      </div>
    </Section>

    <Section title="Supervisor" description="Academic/industrial supervisor from your startup team.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Supervisor name" error={errors.supervisorName} required>
          <input
            type="text"
            value={data.supervisorName}
            onChange={(e) => onChange('supervisorName', e.target.value)}
            className={inputClass(errors.supervisorName)}
          />
        </Field>
        <Field label="Supervisor position / title" error={errors.supervisorTitle} required>
          <input
            type="text"
            list="supervisor-titles"
            value={data.supervisorTitle}
            onChange={(e) => onChange('supervisorTitle', e.target.value)}
            placeholder="e.g. Co-Founder & Technical Lead"
            className={inputClass(errors.supervisorTitle)}
          />
          <datalist id="supervisor-titles">
            {SUPERVISOR_TITLE_SUGGESTIONS.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
        </Field>
      </div>
    </Section>

    <Section title="Allowance" description="Select paid or unpaid internship placement.">
      <div className="flex flex-wrap gap-3 mb-4">
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paidStatus"
            checked={data.isPaidInternship}
            onChange={() => onChange('isPaidInternship', true)}
            className="text-sky-500 focus:ring-sky-500"
          />
          <span className="text-sm text-slate-300">Paid internship</span>
        </label>
        <label className="inline-flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="paidStatus"
            checked={!data.isPaidInternship}
            onChange={() => onChange('isPaidInternship', false)}
            className="text-sky-500 focus:ring-sky-500"
          />
          <span className="text-sm text-slate-300">Unpaid internship</span>
        </label>
      </div>

      {data.isPaidInternship && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Allowance amount" error={errors.allowanceAmount} required>
            <input
              type="number"
              min="0"
              step="1"
              value={data.allowanceAmount}
              onChange={(e) => onChange('allowanceAmount', e.target.value)}
              placeholder="e.g. 800"
              className={inputClass(errors.allowanceAmount)}
            />
          </Field>
          <Field label="Currency" error={errors.allowanceCurrency}>
            <select
              value={data.allowanceCurrency}
              onChange={(e) => onChange('allowanceCurrency', e.target.value)}
              className={inputClass(errors.allowanceCurrency)}
            >
              <option value="MYR">MYR</option>
              <option value="USD">USD</option>
              <option value="SGD">SGD</option>
            </select>
          </Field>
          <Field label="Payment period" error={errors.allowancePeriod}>
            <select
              value={data.allowancePeriod}
              onChange={(e) => onChange('allowancePeriod', e.target.value)}
              className={inputClass(errors.allowancePeriod)}
            >
              <option value="month">Monthly</option>
              <option value="week">Weekly</option>
              <option value="day">Daily</option>
              <option value="total">Lump sum (total)</option>
            </select>
          </Field>
        </div>
      )}
    </Section>

    <Section
      title="Internship scope"
      description="One responsibility per line. These appear as bullet points in the letter."
    >
      <Field label="Scope items" error={errors.scopeItems} required>
        <textarea
          rows={6}
          value={scopeToText(data.scopeItems)}
          onChange={(e) => onChange('scopeItems', textToScope(e.target.value))}
          className={inputClass(errors.scopeItems)}
        />
      </Field>
    </Section>

    <Section title="Authorised signatory" description="Founder or team lead issuing this letter.">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Signatory name" error={errors.signatoryName} required>
          <input
            type="text"
            value={data.signatoryName}
            onChange={(e) => onChange('signatoryName', e.target.value)}
            className={inputClass(errors.signatoryName)}
          />
        </Field>
        <Field label="Signatory position / title" error={errors.signatoryTitle} required>
          <input
            type="text"
            list="signatory-titles"
            value={data.signatoryTitle}
            onChange={(e) => onChange('signatoryTitle', e.target.value)}
            className={inputClass(errors.signatoryTitle)}
          />
          <datalist id="signatory-titles">
            {SIGNATORY_TITLE_SUGGESTIONS.map((title) => (
              <option key={title} value={title} />
            ))}
          </datalist>
        </Field>
      </div>
    </Section>

    <section className="rounded-xl border border-sky-500/20 bg-sky-500/5 p-5 md:p-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-3">
        Letter preview
      </h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
        <div>
          <dt className="text-slate-500">Candidate</dt>
          <dd className="text-slate-200">{data.candidateName || '—'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Position</dt>
          <dd className="text-slate-200">{data.position || '—'}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Duration</dt>
          <dd className="text-slate-200">
            {data.startDate && data.endDate
              ? formatDurationWithDates(data.startDate, data.endDate)
              : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Arrangement</dt>
          <dd className="text-slate-200">
            {[data.workingArrangement, data.workingDays, data.internshipLocation]
              .filter(Boolean)
              .join(' · ') || '—'}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Allowance</dt>
          <dd className="text-slate-200">{formatInternshipAllowance(data)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Supervisor</dt>
          <dd className="text-slate-200">
            {data.supervisorName
              ? `${data.supervisorName}${data.supervisorTitle ? ` · ${data.supervisorTitle}` : ''}`
              : '—'}
          </dd>
        </div>
        <div>
          <dt className="text-slate-500">Issued</dt>
          <dd className="text-slate-200">{formatLongDate(data.offerDate)}</dd>
        </div>
        <div>
          <dt className="text-slate-500">Company</dt>
          <dd className="text-slate-200">{branding?.legalName || '—'}</dd>
        </div>
      </dl>
    </section>
  </div>
);

export default OfferLetterForm;
