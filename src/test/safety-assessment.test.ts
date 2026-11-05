import { describe, expect, it } from "vitest";
import { assessText, detectCategory, services, verifiedEmergencyServices } from "@/lib/content";

describe("Text-only demonstration safety assessment", () => {
  it("recognises mixed-language blackmail and assigns High risk", () => {
    const result = assessText("Tuma pesa or nitapost your nudes usipolipa");
    expect(result.category).toBe("blackmail");
    expect(result.risk).toBe("High");
    expect(result.warnings.length).toBeGreaterThan(0);
  });
  it("recognises informal Kiswahili account impersonation", () => {
    expect(detectCategory("Mtu ametengeneza akaunti feki kwa jina langu")).toBe("impersonation");
  });
  it("recognises code requests as scam or hacking", () => {
    expect(assessText("Tuma code yako ya OTP").category).toBe("hacking");
  });
  it("does not classify ordinary money or photos as blackmail", () => {
    expect(assessText("Here are my holiday photos; lunch cost money").category).toBeNull();
  });
  it("does not infer safety or identity from a bare link or username", () => {
    const result = assessText("https://example.test @sample-user");
    expect(result.category).toBeNull();
    expect(result.risk).toBe("Lower");
  });
  it("prioritises immediate danger over another matched category", () => {
    const result = assessText("A fake account says I am outside your house and will kill you");
    expect(result.immediateDanger).toBe(true);
    expect(result.category).toBe("threats");
    expect(result.risk).toBe("High");
  });
});

describe("Verified-only emergency referrals", () => {
  it("refers to the verified police officer board and nothing else", () => {
    const verified = verifiedEmergencyServices();
    expect(verified.map((service) => service.id)).toEqual(["police-officers"]);
    expect(verified[0].contacts?.map((c) => c.phone)).toEqual([
      "0699 998899", "0688 369606", "0735 009983", "0755 855743", "0739 009976",
      "0658 376478", "0658 444592", "0659 888610", "0659 885117",
    ]);
  });
  it("removes the 112 emergency line everywhere", () => {
    expect(services.some((service) => service.id === "police-112")).toBe(false);
    expect(services.some((service) => service.phones.includes("112"))).toBe(false);
  });
  it("excludes demo, undated and unverified records even with contact details", () => {
    const base = services.find((service) => service.id === "police-officers");
    if (!base) throw new Error("Emergency fixture missing");
    expect(verifiedEmergencyServices([
      { ...base, verified: true, demo: true, lastVerified: "2026-10-22" },
      { ...base, verified: true, lastVerified: null },
      { ...base, verified: false, lastVerified: "2026-10-22" },
    ])).toEqual([]);
  });
  it("includes a verified dated non-demo emergency record", () => {
    const base = services.find((service) => service.id === "police-officers");
    if (!base) throw new Error("Emergency fixture missing");
    const verified = { ...base, verified: true, lastVerified: "2026-10-22" };
    expect(verifiedEmergencyServices([verified])).toEqual([verified]);
  });
});
describe("body shaming (Kiswahili slang)", () => {
  it("flags appearance mocking in informal Kiswahili as harassment", () => {
    const r = assessText("kadogo kana shape flan afu kembamba yan kana sura kama ya wale, na Ubonge wake");
    expect(r.category).toBe("bullying");
    expect(r.risk).toBe("Medium");
  });
});

describe("found words", () => {
  it("lists the body-shaming words that were matched", () => {
    const r = assessText("afu kembamba na Ubonge wake");
    expect(r.found).toEqual(["kembamba", "ubonge"]);
  });
});
