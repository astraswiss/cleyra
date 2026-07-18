import { z } from "zod";

// Modello dati e validazioni per il modulo lead a tre passaggi.
// Struttura rivista (2026-07-18) per raccogliere solo ciò che serve a
// rispondere a: zona servita, servizio giusto, tempistica, dimensione
// approssimativa, modo di contatto — vedi docs/DECISIONS.md
// DEC-20260718-04. Deviazione consapevole da CLEYRA_WEBSITE_SPEC.md
// sezioni 10.2-10.5 (che descrivevano 4 passaggi).

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

export const dateOptionSchema = z.enum(["exact", "flexible"]);

export const approxSqmRangeSchema = z.enum([
  "under_50",
  "50_80",
  "81_110",
  "over_110",
  "unknown",
]);

export const emptyStateSchema = z.enum(["empty", "partial", "furnished"]);

export const preferredContactSchema = z.enum(["phone", "email", "whatsapp"]);

// Passaggio 1 — Wo und wann
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
  dateOption: dateOptionSchema,
  // Obbligatorio solo se dateOption === "exact" (vedi superRefine sotto
  // in leadFormSchema); qui resta opzionale per permettere il merge tra
  // gli schema dei singoli passaggi.
  desiredDate: z.string().optional(),
});

// Passaggio 2 — Wohnung (immobile + dettagli, uniti in un solo step)
export const additionalAreasSchema = z.object({
  windows: z.boolean(),
  balcony: z.boolean(),
  cellar: z.boolean(),
});

export const stepApartmentSchema = z.object({
  rooms: z
    .number()
    .int()
    .min(1, "Anzahl Zimmer muss mindestens 1 sein.")
    .max(20, "Anzahl Zimmer darf höchstens 20 sein."),
  approxSqmRange: approxSqmRangeSchema,
  emptyState: emptyStateSchema,
  additionalAreas: additionalAreasSchema,
  notes: z.string().trim().max(1500).optional(),
  // TODO(API-003): le fotografie non vengono più raccolte in questo
  // passaggio ma proposte facoltativamente nella pagina di conferma
  // (/de/danke), per non ostacolare l'invio principale.
});

// Passaggio 3 — Kontakt
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
});

const leadFormObjectSchema = stepLocationServiceSchema
  .merge(stepApartmentSchema)
  .merge(stepContactSchema);

export const leadFormSchema = leadFormObjectSchema.superRefine((data, ctx) => {
  if (data.dateOption === "exact") {
    if (!data.desiredDate) {
      ctx.addIssue({
        code: "custom",
        path: ["desiredDate"],
        message: "Bitte geben Sie ein Datum an.",
      });
    } else if (!isNotBeforeToday(data.desiredDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["desiredDate"],
        message: "Das Datum darf nicht in der Vergangenheit liegen.",
      });
    }
  }
});

export type LeadFormValues = z.infer<typeof leadFormObjectSchema>;

export type LeadStatus = "new" | "submitted" | "failed";

// Modello di persistenza completo (spec sezione 11, adattato alla
// struttura a 3 passaggi). I campi tecnici nascosti (leadId, createdAt,
// attribution, ecc.) sono generati/validati server-side, mai fidati dal
// client (spec 10.6).
export const cleaningLeadSchema = leadFormObjectSchema.extend({
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
