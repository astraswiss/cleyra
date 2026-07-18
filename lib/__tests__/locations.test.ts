import { describe, expect, it } from "vitest";
import { getOtherLocationLandings, locationLandings } from "@/lib/locations";

describe("locationLandings", () => {
  it("has a unique slug for every landing", () => {
    const slugs = locationLandings.map((location) => location.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a unique meta title and description for every landing", () => {
    const titles = locationLandings.map((location) => location.metaTitle);
    const descriptions = locationLandings.map(
      (location) => location.metaDescription
    );
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
  });

  it("has a unique H1 and local FAQ question for every landing", () => {
    const h1s = locationLandings.map((location) => location.h1);
    const faqQuestions = locationLandings.map(
      (location) => location.localFaq.question
    );
    expect(new Set(h1s).size).toBe(h1s.length);
    expect(new Set(faqQuestions).size).toBe(faqQuestions.length);
  });

  it("lists at least one nearby place per landing", () => {
    for (const location of locationLandings) {
      expect(location.nearbyPlaces.length).toBeGreaterThan(0);
    }
  });
});

describe("getOtherLocationLandings", () => {
  it("excludes the given slug and returns the rest", () => {
    const others = getOtherLocationLandings("endreinigung-visp");
    expect(others.some((location) => location.slug === "endreinigung-visp")).toBe(
      false
    );
    expect(others.length).toBe(locationLandings.length - 1);
  });
});
