import React from 'react';
import { Document, Page, View, Text, Image, StyleSheet } from '@react-pdf/renderer';
import { buildInternshipOfferLetterDocument } from './buildDocumentModel';

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: 'Helvetica',
    fontSize: 9.5,
    lineHeight: 1.45,
    color: '#1e293b',
  },
  header: {
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  logo: {
    width: 168,
    height: 42,
    objectFit: 'contain',
    objectPosition: 'left',
  },
  contactBlock: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#f1f5f9',
  },
  regLine: {
    fontSize: 7.5,
    color: '#94a3b8',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  contactLine: {
    fontSize: 8,
    color: '#64748b',
    lineHeight: 1.55,
    marginBottom: 2,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaText: {
    fontSize: 8,
    color: '#64748b',
  },
  title: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: 0.8,
  },
  salutation: {
    marginBottom: 8,
    fontSize: 9.5,
    fontFamily: 'Helvetica-Bold',
    color: '#0f172a',
  },
  body: {
    marginBottom: 8,
    textAlign: 'justify',
    fontSize: 9,
    color: '#334155',
  },
  sectionTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
    marginTop: 10,
    marginBottom: 6,
  },
  table: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    minHeight: 22,
  },
  tableRowLast: {
    flexDirection: 'row',
    minHeight: 22,
  },
  tableLabel: {
    width: '32%',
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: '#f8fafc',
    fontFamily: 'Helvetica-Bold',
    fontSize: 8,
    color: '#475569',
  },
  tableValue: {
    width: '68%',
    paddingVertical: 5,
    paddingHorizontal: 7,
    fontSize: 8.5,
    color: '#1e293b',
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    paddingRight: 8,
  },
  bullet: {
    width: 10,
    fontSize: 8.5,
    color: '#475569',
  },
  bulletText: {
    flex: 1,
    fontSize: 8.5,
    color: '#334155',
    textAlign: 'justify',
  },
  pageFooter: {
    position: 'absolute',
    bottom: 24,
    left: 48,
    right: 48,
    borderTopWidth: 0.5,
    borderTopColor: '#e2e8f0',
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pageFooterText: {
    fontSize: 7,
    color: '#94a3b8',
  },
  twoCol: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 20,
  },
  col: {
    flex: 1,
  },
  blockTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 8.5,
    color: '#0f172a',
    marginBottom: 6,
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#94a3b8',
    marginTop: 28,
    marginBottom: 4,
    height: 1,
  },
  signName: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9.5,
    color: '#0f172a',
  },
  signMeta: {
    fontSize: 8,
    color: '#64748b',
    marginTop: 2,
  },
  acceptNote: {
    fontSize: 8,
    color: '#334155',
    marginBottom: 4,
    textAlign: 'justify',
  },
  acceptLabel: {
    fontSize: 7.5,
    color: '#64748b',
    marginTop: 8,
  },
});

const splitAddressLines = (address) => {
  if (!address) return [];
  return address
    .split(/,\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
};

const LetterHeader = ({ model }) => {
  const { branding } = model;
  const addressLines = splitAddressLines(branding.address);
  const contactLine = [branding.email, branding.phone].filter(Boolean).join('  ·  ');

  return (
    <>
      <View style={styles.header}>
        {model.logoDataUrl ? (
          <Image src={model.logoDataUrl} style={styles.logo} />
        ) : null}

        {(branding.registrationNumber || branding.address || contactLine) ? (
          <View style={styles.contactBlock}>
            {branding.registrationNumber ? (
              <Text style={styles.regLine}>Reg. No: {branding.registrationNumber}</Text>
            ) : null}
            {addressLines.length > 0
              ? addressLines.map((line, i) => (
                  <Text key={i} style={styles.contactLine}>
                    {line}{i < addressLines.length - 1 ? ',' : ''}
                  </Text>
                ))
              : null}
            {contactLine ? (
              <Text style={styles.contactLine}>{contactLine}</Text>
            ) : null}
          </View>
        ) : null}
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.metaText}>Ref: {model.data.referenceNumber}</Text>
        <Text style={styles.metaText}>Date: {model.offerDateFormatted}</Text>
      </View>
      <Text style={styles.title}>INTERNSHIP OFFER LETTER</Text>
    </>
  );
};

const DetailRow = ({ label, value, last = false }) => (
  <View style={last ? styles.tableRowLast : styles.tableRow} wrap={false}>
    <Text style={styles.tableLabel}>{label}</Text>
    <Text style={styles.tableValue}>{value || '—'}</Text>
  </View>
);

const Bullet = ({ children }) => (
  <View style={styles.bulletRow}>
    <Text style={styles.bullet}>•</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const PageFooter = ({ companyLine, pageNum }) => (
  <View style={styles.pageFooter} fixed>
    <Text style={styles.pageFooterText}>{companyLine}</Text>
    <Text style={styles.pageFooterText}>Page {pageNum}</Text>
  </View>
);

/**
 * @param {{ data: import('../../types').InternshipOfferLetterData, branding: import('../../types').CompanyBranding, logoDataUrl?: string }} props
 */
const InternshipOfferLetterDocument = ({ data, branding, logoDataUrl }) => {
  const model = buildInternshipOfferLetterDocument(data, branding, logoDataUrl);

  return (
    <Document title={model.meta.title} author={model.meta.author} subject={model.meta.subject}>
      {/* Page 1 — letter body */}
      <Page size="A4" style={styles.page}>
        <LetterHeader model={model} />

        <Text style={styles.salutation}>Dear {data.candidateName},</Text>
        <Text style={styles.body}>{model.openingText}</Text>

        <Text style={styles.sectionTitle}>Internship Details</Text>
        <View style={styles.table}>
          {model.detailRows.map((row, i) => (
            <DetailRow
              key={row.label}
              label={row.label}
              value={row.value}
              last={i === model.detailRows.length - 1}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Internship Scope</Text>
        <View>
          {model.scopeItems.map((item, i) => (
            <Bullet key={i}>{item}</Bullet>
          ))}
        </View>

        <PageFooter companyLine={model.companyLine} pageNum={1} />
      </Page>

      {/* Page 2 — terms, closing & signatures */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Terms</Text>
        <View style={{ marginBottom: 12 }}>
          {model.terms.map((term, i) => (
            <Bullet key={i}>{term}</Bullet>
          ))}
        </View>

        <Text style={styles.body}>{model.closingText}</Text>

        <View style={styles.twoCol}>
          <View style={styles.col}>
            <Text style={styles.blockTitle}>Authorised Signatory</Text>
            <View style={styles.signLine} />
            <Text style={styles.signName}>{data.signatoryName}</Text>
            <Text style={styles.signMeta}>{data.signatoryTitle}</Text>
            <Text style={styles.signMeta}>{model.branding.legalName}</Text>
          </View>

          <View style={styles.col}>
            <Text style={styles.blockTitle}>Candidate Acceptance</Text>
            <Text style={styles.acceptNote}>
              I, {data.candidateName}, accept the internship placement described in this letter.
            </Text>
            <Text style={styles.acceptLabel}>Signature:</Text>
            <View style={styles.signLine} />
            <Text style={styles.acceptLabel}>Date:</Text>
            
          </View>
        </View>

        <PageFooter companyLine={model.companyLine} pageNum={2} />
      </Page>
    </Document>
  );
};

export default InternshipOfferLetterDocument;
