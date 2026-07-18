import { describe, expect, it } from "vitest";
import { validateRequestStep1 } from "@/lib/validation/requestStep1";

const baseValid = {
  postalCode: "3930",
  city: "Visp",
  serviceType: "Endreinigung zur Wohnungsabgabe",
  dateMode: "Ich bin flexibel",
  desiredDate: "",
  desiredPeriod: "Innerhalb der nächsten 7 Tage",
  rooms: "2 bis 2.5 Zimmer",
  propertyEmpty: "Ja",
  notes: "",
};

describe("validateRequestStep1", () => {
  it("accepts a valid flexible-date submission", () => {
    const result = validateRequestStep1(baseValid);
    expect(result.success).toBe(true);
  });

  it("accepts a valid exact-date submission with a future date", () => {
    const future = new Date();
    future.setDate(future.getDate() + 10);
    const result = validateRequestStep1({
      ...baseValid,
      dateMode: "Ich kenne das genaue Datum",
      desiredDate: future.toISOString().slice(0, 10),
      desiredPeriod: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a postal code that is not 4 digits", () => {
    const result = validateRequestStep1({ ...baseValid, postalCode: "abc" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.postalCode).toBeDefined();
    }
  });

  it("rejects a missing city", () => {
    const result = validateRequestStep1({ ...baseValid, city: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.city).toBeDefined();
    }
  });

  it("rejects a past date when dateMode is exact", () => {
    const result = validateRequestStep1({
      ...baseValid,
      dateMode: "Ich kenne das genaue Datum",
      desiredDate: "2020-01-01",
      desiredPeriod: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.desiredDate).toMatch(/Vergangenheit/);
    }
  });

  it("rejects a missing desiredDate when dateMode is exact", () => {
    const result = validateRequestStep1({
      ...baseValid,
      dateMode: "Ich kenne das genaue Datum",
      desiredDate: "",
      desiredPeriod: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.desiredDate).toBeDefined();
    }
  });

  it("rejects a missing desiredPeriod when dateMode is flexible", () => {
    const result = validateRequestStep1({
      ...baseValid,
      dateMode: "Ich bin flexibel",
      desiredPeriod: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.desiredPeriod).toBeDefined();
    }
  });

  it("rejects an invalid serviceType", () => {
    const result = validateRequestStep1({ ...baseValid, serviceType: "Sonstiges" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.serviceType).toBeDefined();
    }
  });
});
