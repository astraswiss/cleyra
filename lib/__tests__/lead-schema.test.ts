import { describe, expect, it } from "vitest";
import {
  stepLocationServiceSchema,
  stepApartmentSchema,
  stepContactSchema,
  leadFormSchema,
} from "@/lib/lead-schema";

function futureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}

describe("stepLocationServiceSchema", () => {
  it("accepts a valid Swiss postal code with an exact date option", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "end_cleaning",
      dateOption: "exact",
      desiredDate: futureDate(7),
    });
    expect(result.success).toBe(true);
  });

  it("accepts a flexible date option without desiredDate", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "end_cleaning",
      dateOption: "flexible",
    });
    expect(result.success).toBe(true);
  });

  it.each(["393", "39300", "abcd", ""])(
    "rejects invalid postal code %s",
    (postalCode) => {
      const result = stepLocationServiceSchema.safeParse({
        postalCode,
        city: "Visp",
        serviceType: "end_cleaning",
        dateOption: "flexible",
      });
      expect(result.success).toBe(false);
    }
  );

  it("rejects a city shorter than 2 characters", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "V",
      serviceType: "end_cleaning",
      dateOption: "flexible",
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid serviceType", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "office_cleaning",
      dateOption: "flexible",
    });
    expect(result.success).toBe(false);
  });
});

describe("leadFormSchema cross-field date validation", () => {
  const base = {
    postalCode: "3930",
    city: "Visp",
    serviceType: "end_cleaning" as const,
    rooms: 3,
    approxSqmRange: "50_80" as const,
    emptyState: "empty" as const,
    additionalAreas: { windows: false, balcony: false, cellar: false },
    fullName: "Anna Muster",
    phone: "+41791234567",
    email: "anna@example.ch",
    preferredContact: "email" as const,
    privacyConsent: true,
  };

  it("requires desiredDate when dateOption is exact", () => {
    const result = leadFormSchema.safeParse({
      ...base,
      dateOption: "exact",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a past desiredDate when dateOption is exact", () => {
    const result = leadFormSchema.safeParse({
      ...base,
      dateOption: "exact",
      desiredDate: futureDate(-1),
    });
    expect(result.success).toBe(false);
  });

  it("accepts a future desiredDate when dateOption is exact", () => {
    const result = leadFormSchema.safeParse({
      ...base,
      dateOption: "exact",
      desiredDate: futureDate(7),
    });
    expect(result.success).toBe(true);
  });

  it("does not require desiredDate when dateOption is flexible", () => {
    const result = leadFormSchema.safeParse({
      ...base,
      dateOption: "flexible",
    });
    expect(result.success).toBe(true);
  });
});

describe("stepApartmentSchema", () => {
  const additionalAreas = { windows: false, balcony: false, cellar: false };

  it.each([1, 20])("accepts boundary room count %d", (rooms) => {
    const result = stepApartmentSchema.safeParse({
      rooms,
      approxSqmRange: "50_80",
      emptyState: "empty",
      additionalAreas,
    });
    expect(result.success).toBe(true);
  });

  it.each([0, 21])("rejects out-of-range room count %d", (rooms) => {
    const result = stepApartmentSchema.safeParse({
      rooms,
      approxSqmRange: "50_80",
      emptyState: "empty",
      additionalAreas,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid approxSqmRange", () => {
    const result = stepApartmentSchema.safeParse({
      rooms: 3,
      approxSqmRange: "huge",
      emptyState: "empty",
      additionalAreas,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid emptyState", () => {
    const result = stepApartmentSchema.safeParse({
      rooms: 3,
      approxSqmRange: "50_80",
      emptyState: "spotless",
      additionalAreas,
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional notes up to 1500 characters", () => {
    const result = stepApartmentSchema.safeParse({
      rooms: 3,
      approxSqmRange: "50_80",
      emptyState: "empty",
      additionalAreas,
      notes: "a".repeat(1500),
    });
    expect(result.success).toBe(true);
  });
});

describe("stepContactSchema", () => {
  const base = {
    fullName: "Anna Muster",
    phone: "+41791234567",
    email: "anna@example.ch",
    preferredContact: "email" as const,
  };

  it("accepts a valid contact step with privacy consent", () => {
    const result = stepContactSchema.safeParse({
      ...base,
      privacyConsent: true,
    });
    expect(result.success).toBe(true);
  });

  it("accepts whatsapp as a preferred contact channel", () => {
    const result = stepContactSchema.safeParse({
      ...base,
      preferredContact: "whatsapp",
      privacyConsent: true,
    });
    expect(result.success).toBe(true);
  });

  it("rejects when privacyConsent is false", () => {
    const result = stepContactSchema.safeParse({
      ...base,
      privacyConsent: false,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const result = stepContactSchema.safeParse({
      ...base,
      email: "not-an-email",
      privacyConsent: true,
    });
    expect(result.success).toBe(false);
  });
});
