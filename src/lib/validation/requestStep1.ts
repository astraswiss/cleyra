import { z } from "zod";

export const serviceTypeValues = [
  "Endreinigung zur Wohnungsabgabe",
  "Umzugsreinigung",
  "Andere Reinigung",
] as const;

export const dateModeValues = [
  "Ich kenne das genaue Datum",
  "Ich bin flexibel",
] as const;

export const desiredPeriodValues = [
  "Innerhalb der nächsten 7 Tage",
  "Innerhalb der nächsten 14 Tage",
  "Innerhalb der nächsten 30 Tage",
  "Später",
] as const;

export const roomsValues = [
  "1 bis 1.5 Zimmer",
  "2 bis 2.5 Zimmer",
  "3 bis 3.5 Zimmer",
  "4 bis 4.5 Zimmer",
  "5 bis 5.5 Zimmer",
  "6 oder mehr Zimmer",
] as const;

export const propertyEmptyValues = [
  "Ja",
  "Teilweise",
  "Nein",
  "Noch nicht bekannt",
] as const;

const todayIso = () => new Date().toISOString().slice(0, 10);

export const requestStep1Schema = z
  .object({
    postalCode: z.string().regex(/^\d{4}$/),
    city: z.string().trim().min(1),
    serviceType: z.enum(serviceTypeValues),
    dateMode: z.enum(dateModeValues),
    desiredDate: z.string().optional(),
    desiredPeriod: z.enum(desiredPeriodValues).optional(),
    rooms: z.enum(roomsValues),
    propertyEmpty: z.enum(propertyEmptyValues),
    notes: z.string().max(1000).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dateMode === "Ich kenne das genaue Datum") {
      if (!data.desiredDate) {
        ctx.addIssue({ code: "custom", path: ["desiredDate"], message: "required" });
      } else if (data.desiredDate < todayIso()) {
        ctx.addIssue({ code: "custom", path: ["desiredDate"], message: "past" });
      }
    }
    if (data.dateMode === "Ich bin flexibel" && !data.desiredPeriod) {
      ctx.addIssue({ code: "custom", path: ["desiredPeriod"], message: "required" });
    }
  });

export type RequestStep1 = z.infer<typeof requestStep1Schema>;

export type RequestStep1Input = {
  postalCode: string;
  city: string;
  serviceType: string;
  dateMode: string;
  desiredDate: string;
  desiredPeriod: string;
  rooms: string;
  propertyEmpty: string;
  notes: string;
};

const fieldErrorMessages: Record<string, string> = {
  postalCode: "Bitte geben Sie eine 4-stellige Postleitzahl ein.",
  city: "Bitte geben Sie einen Ort ein.",
  serviceType: "Bitte wählen Sie eine Reinigungsart.",
  dateMode: "Bitte wählen Sie eine Option.",
  desiredDate: "Bitte wählen Sie ein Datum.",
  "desiredDate:past": "Das Datum darf nicht in der Vergangenheit liegen.",
  desiredPeriod: "Bitte wählen Sie einen Zeitraum.",
  rooms: "Bitte wählen Sie die Zimmerzahl.",
  propertyEmpty: "Bitte wählen Sie eine Option.",
  notes: "Bitte kürzen Sie Ihre Bemerkung.",
};

export function validateRequestStep1(
  input: RequestStep1Input
): { success: true } | { success: false; errors: Record<string, string> } {
  const result = requestStep1Schema.safeParse({
    ...input,
    desiredDate: input.desiredDate || undefined,
    desiredPeriod: input.desiredPeriod || undefined,
  });
  if (result.success) {
    return { success: true };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0]);
    const key =
      field === "desiredDate" && issue.message === "past"
        ? "desiredDate:past"
        : field;
    if (!errors[field]) {
      errors[field] = fieldErrorMessages[key] ?? "Bitte überprüfen Sie dieses Feld.";
    }
  }
  return { success: false, errors };
}
