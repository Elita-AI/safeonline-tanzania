import { describe, expect, it } from "vitest";
import { cyberthreats } from "@/lib/content";

describe("Common cyberthreats list", () => {
  it("puts mobile money fraud first, in English and Kiswahili", () => {
    expect(cyberthreats[0].name.en).toContain("Mobile money fraud");
    expect(cyberthreats[0].name.en).toContain("Tuma kwa namba hii");
    expect(cyberthreats[0].name.sw).toContain("Ulaghai wa Fedha za Simu");
    expect(cyberthreats[0].what.en.length).toBeGreaterThan(0);
    expect(cyberthreats[0].what.sw.length).toBeGreaterThan(0);
  });

  it("does not list spyware anywhere in the threat names or explanations", () => {
    const all = cyberthreats
      .map((c) => `${c.name.en} ${c.name.sw} ${c.what.en} ${c.what.sw}`)
      .join(" | ")
      .toLowerCase();
    expect(all).not.toContain("spyware");
    expect(all).not.toContain("upelelezi");
  });
});
