type ReportInput = {
  category: string;
  description: string;
  region: string;
  contact: string;
  anonymous: boolean;
  consent: boolean;
};

export function buildReportPayload(input: ReportInput) {
  if (!input.consent) throw new Error("Consent is required");
  return {
    category: input.category,
    description: input.description.trim(),
    region: input.anonymous ? null : input.region.trim() || null,
    contact: input.anonymous ? null : input.contact.trim() || null,
    consent_given: true,
  };
}