import { describe, expect, it } from "vitest";
import {
  stepLocationServiceSchema,
  stepPropertySchema,
  stepContactSchema,
} from "@/lib/lead-schema";

function futureDate(daysFromNow: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().slice(0, 10);
}

describe("stepLocationServiceSchema", () => {
  it("accepts a valid Swiss postal code and future date", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "end_cleaning",
      desiredDate: futureDate(7),
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
        desiredDate: futureDate(7),
      });
      expect(result.success).toBe(false);
    }
  );

  it("rejects a date in the past", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "end_cleaning",
      desiredDate: futureDate(-1),
    });
    expect(result.success).toBe(false);
  });

  it("accepts today's date", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "end_cleaning",
      desiredDate: futureDate(0),
    });
    expect(result.success).toBe(true);
  });

  it("rejects a city shorter than 2 characters", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "V",
      serviceType: "end_cleaning",
      desiredDate: futureDate(7),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid serviceType", () => {
    const result = stepLocationServiceSchema.safeParse({
      postalCode: "3930",
      city: "Visp",
      serviceType: "office_cleaning",
      desiredDate: futureDate(7),
    });
    expect(result.success).toBe(false);
  });
});

describe("stepPropertySchema", () => {
  it.each([1, 20])("accepts boundary room count %d", (rooms) => {
    const result = stepPropertySchema.safeParse({
      propertyType: "apartment",
      rooms,
      approxSqm: 60,
      furnishedState: "empty",
    });
    expect(result.success).toBe(true);
  });

  it.each([0, 21])("rejects out-of-range room count %d", (rooms) => {
    const result = stepPropertySchema.safeParse({
      propertyType: "apartment",
      rooms,
      approxSqm: 60,
      furnishedState: "empty",
    });
    expect(result.success).toBe(false);
  });

  it.each([10, 2000])("accepts boundary approxSqm %d", (approxSqm) => {
    const result = stepPropertySchema.safeParse({
      propertyType: "apartment",
      rooms: 3,
      approxSqm,
      furnishedState: "empty",
    });
    expect(result.success).toBe(true);
  });

  it.each([9, 2001])("rejects out-of-range approxSqm %d", (approxSqm) => {
    const result = stepPropertySchema.safeParse({
      propertyType: "apartment",
      rooms: 3,
      approxSqm,
      furnishedState: "empty",
    });
    expect(result.success).toBe(false);
  });
});

describe("stepContactSchema", () => {
  const base = {
    fullName: "Anna Muster",
    phone: "+41791234567",
    email: "anna@example.ch",
    preferredContact: "email" as const,
    marketingConsent: false,
  };

  it("accepts a valid contact step with privacy consent", () => {
    const result = stepContactSchema.safeParse({
      ...base,
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

  it("requires marketingConsent to be provided explicitly (default lives in form defaultValues, not the schema)", () => {
    const { marketingConsent, ...rest } = base;
    const result = stepContactSchema.safeParse({
      ...rest,
      privacyConsent: true,
    });
    expect(result.success).toBe(false);
  });
});
