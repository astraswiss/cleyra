export const siteConfig = {
  name: "Cleyra",
  locale: "de-CH",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  serviceAreas: ["Visp", "Brig-Glis", "Naters"],
  privacyPolicyVersion: "2026-01",
  intermediaryDisclaimer:
    "Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Reinigungsvertrag entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.",
} as const;
