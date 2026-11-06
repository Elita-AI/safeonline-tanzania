import { describe, expect, it } from "vitest";
import { services } from "@/lib/content";

const byId = (id: string) => services.find((s) => s.id === id);

describe("Verified support records", () => {
  it("marks the National Child Helpline verified with its short code", () => {
    const s = byId("child-116");
    if (!s) throw new Error("The National Child Helpline record is missing");
    expect(s.verified).toBe(true);
    expect(s.lastVerified).toBe("2026-11-06");
    expect(s.phones).toEqual(["116"]);
  });

  it("adds TCRA 15040 as a verified SMS reporting line, pinned just below the child helpline", () => {
    const s = byId("tcra-15040");
    if (!s) throw new Error("The TCRA 15040 record is missing");
    expect(s.verified).toBe(true);
    expect(s.lastVerified).toBe("2026-11-06");
    expect(s.sms).toContain("15040");
    expect(s.phones).not.toContain("15040");
    expect(s.demo).toBe(false);
    const pinned = services.filter((x) => x.pinned).map((x) => x.id);
    expect(pinned.indexOf("tcra-15040")).toBe(pinned.indexOf("child-116") + 1);
  });

  it("adds the SafeOnline team contact with the number the team supplied, kept out of the pinned block", () => {
    const s = byId("safeonline-team");
    if (!s) throw new Error("The SafeOnline Team Contact record is missing");
    expect(s.pinned).toBeFalsy();
    expect(s.phones).toEqual(["+255768639959"]);
    expect(s.verified).toBe(true);
    expect(s.lastVerified).toBe("2026-11-06");
  });
});
