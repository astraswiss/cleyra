import { siteConfig } from "@/lib/site-config";

const criteria = [
  "vollständige Unternehmens- und Kontaktdaten",
  "klare Zuständigkeiten",
  "definierte Einsatzregionen",
  "nachvollziehbare Offerten",
  "zuverlässige Kommunikation",
  "Rückmeldungen zu vermittelten Aufträgen",
];

export function PartnerTransparency() {
  return (
    <section className="py-12">
      <p className="rounded-md border border-slate-300 bg-slate-50 p-4 text-sm">
        {siteConfig.intermediaryDisclaimer}
      </p>

      <h2 className="mt-8 text-3xl font-semibold">
        Was bedeutet „ausgewählter Partner“?
      </h2>
      <p className="mt-4 text-lg">
        Bei der Auswahl unserer Reinigungspartner achten wir unter anderem
        auf:
      </p>
      <ul className="mt-4 space-y-2">
        {criteria.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span aria-hidden="true">•</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
