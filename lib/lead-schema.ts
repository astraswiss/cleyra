import { z } from "zod";

// Modello dati e validazioni per il modulo lead a quattro passaggi.
// Vedi CLEYRA_WEBSITE_SPEC.md sezioni 10 e 11.

const swissPostalCodeRegex = /^\d{4}$/;

function isNotBeforeToday(value: string): boolean {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() >= today.getTime();
}

export const serviceTypeSchema = z.enum([
  "end_cleaning",
  "moving_cleaning",
  "other",
]);

export const dateFlexibilitySchema = z.enum([
  "fixed",
  "plus_minus_1_day",
  "plus_minus_3_days",
]);

export const propertyTypeSchema = z.enum(["apartment", "house"]);

export const furnishedStateSchema = z.enum([
  "empty",
  "furnished",
  "partially_furnished",
]);

export const preferredContactSchema = z.enum(["phone", "email"]);

// Passaggio 1 — luogo e servizio (spec 10.2)
export const stepLocationServiceSchema = z.object({
  postalCode: z
    .string()
    .trim()
    .regex(swissPostalCodeRegex, "Bitte geben Sie eine gültige 4-stellige Postleitzahl ein."),
  city: z
    .string()
    .trim()
    .min(2, "Bitte geben Sie den Ort ein (mindestens 2 Zeichen)."),
  serviceType: serviceTypeSchema,
  desiredDate: z
    .string()
    .refine(isNotBeforeToday, "Das Datum darf nicht in der Vergangenheit liegen."),
  dateFlexibility: dateFlexibilitySchema.optional(),
});

// Passaggio 2 — immobile (spec 10.3)
export const stepPropertySchema = z.object({
  propertyType: propertyTypeSchema,
  rooms: z
    .number()
    .int()
    .min(1, "Anzahl Zimmer muss mindestens 1 sein.")
    .max(20, "Anzahl Zimmer darf höchstens 20 sein."),
  approxSqm: z
    .number()
    .min(10, "Fläche muss mindestens 10 m² sein.")
    .max(2000, "Fläche darf höchstens 2000 m² sein."),
  furnishedState: furnishedStateSchema,
  floor: z.string().trim().optional(),
  elevator: z.boolean().optional(),
});

// Passaggio 3 — dettagli (spec 10.4)
export const extrasSchema = z.object({
  windows: z.boolean(),
  balconyTerrace: z.boolean(),
  cellar: z.boolean(),
  oven: z.boolean(),
  fridge: z.boolean(),
  blindsShutters: z.boolean(),
  garage: z.boolean(),
  otherAreas: z.boolean(),
});

export const stepExtrasSchema = z.object({
  extras: extrasSchema,
  notes: z.string().trim().max(1500).optional(),
  // TODO(FORM-005): validare gli allegati (max 5 file, max 8MB, MIME) qui
  // e lato server; photoKeys sono generati dopo l'upload, non dal client.
});

// Passaggio 4 — contatti e consenso (spec 10.5)
export const stepContactSchema = z.object({
  fullName: z.string().trim().min(2, "Bitte geben Sie Ihren Namen ein."),
  phone: z
    .string()
    .trim()
    .min(6, "Bitte geben Sie eine gültige Telefonnummer ein."),
  email: z.string().trim().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  preferredContact: preferredContactSchema,
  // z.boolean() (non z.literal(true)) affinché il tipo TS resti `boolean`,
  // permettendo un defaultValue `false` nel modulo prima della conferma.
  privacyConsent: z
    .boolean()
    .refine((value) => value === true, {
      message:
        "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben.",
    }),
  // Nessun .default() qui: il default (false) è impostato nei defaultValues
  // del modulo (LeadForm.tsx), altrimenti zodResolver produce un mismatch
  // tra tipo di input e di output dello schema (marketingConsent opzionale
  // in input vs richiesto in output).
  marketingConsent: z.boolean(),
});

export const leadFormSchema = stepLocationServiceSchema
  .merge(stepPropertySchema)
  .merge(stepExtrasSchema)
  .merge(stepContactSchema);

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export type LeadStatus = "new" | "submitted" | "failed";

// Modello di persistenza completo (spec sezione 11). I campi tecnici
// nascosti (leadId, createdAt, attribution, ecc.) sono generati/validati
// server-side, mai fidati dal client (spec 10.6).
export const cleaningLeadSchema = leadFormSchema.extend({
  id: z.string(),
  createdAt: z.string(),
  status: z.enum(["new", "submitted", "failed"]),

  language: z.literal("de"),
  landingPage: z.string(),
  referrer: z.string().optional(),

  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  gclid: z.string().optional(),
  gbraid: z.string().optional(),
  wbraid: z.string().optional(),

  photoKeys: z.array(z.string()),

  privacyPolicyVersion: z.string(),
  privacyConsentTimestamp: z.string(),
});

export type CleaningLead = z.infer<typeof cleaningLeadSchema>;
