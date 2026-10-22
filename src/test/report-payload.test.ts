import { describe, expect, it } from "vitest";
import { buildReportPayload } from "@/lib/report-payload";

const input = { category: "Other", description: " Sample scenario ", region: "Sample region", contact: "demo@example.invalid", anonymous: true, consent: true };

describe("Anonymous reporting", () => {
  it("omits region and contact even when hidden fields contain values", () => {
    expect(buildReportPayload(input)).toEqual({ category: "Other", description: "Sample scenario", region: null, contact: null, consent_given: true });
  });
  it("retains optional follow-up details only outside anonymous mode", () => {
    expect(buildReportPayload({ ...input, anonymous: false }).contact).toBe("demo@example.invalid");
  });
  it("requires consent for anonymous reports", () => {
    expect(() => buildReportPayload({ ...input, consent: false })).toThrow("Consent is required");
  });
});