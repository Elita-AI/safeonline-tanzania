import { describe, expect, it } from "vitest";
import { cyberthreats } from "@/lib/content";

describe("Common cyberthreats list", () => {
  it("puts mobile money fraud first, in English and Kiswahili", () => {
    const first = cyberthreats[0];
    if (!first) throw new Error("The cyberthreats list is empty");
    expect(first.name.en).toContain("Mobile money fraud");
    expect(first.name.sw).toContain("Ulaghai wa Fedha za Simu");
    expect(first.tagline?.en).toContain("Tuma kwa namba hii");
    expect(first.tagline?.sw).toContain("Tuma kwa namba hii");
    expect(first.what.en.length).toBeGreaterThan(0);
    expect(first.what.sw.length).toBeGreaterThan(0);
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

import { lawForCategory } from "@/lib/content";
describe("Cybercrimes Act per category", () => {
  it("shows Section 23 for bullying and Section 15 for impersonation", () => {
    expect(lawForCategory("bullying")[0]?.penalty.en).toContain("Section 23");
    expect(lawForCategory("impersonation")[0]?.penalty.en).toContain("Section 15");
    expect(lawForCategory("unclear")).toEqual([]);
  });
});
