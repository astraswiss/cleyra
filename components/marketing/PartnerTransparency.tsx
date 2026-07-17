import { siteConfig } from "@/lib/site-config";
import { Icon } from "@/components/ui/Icon";

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
    <section className="py-14">
      <p className="rounded-2xl border-l-4 border-brand-600 bg-brand-50 p-5 text-sm leading-relaxed text-brand-900">
        {siteConfig.intermediaryDisclaimer}
      </p>

      <h2 className="mt-10 font-display text-3xl font-bold tracking-tight text-ink-900">
        Was bedeutet „ausgewählter Partner“?
      </h2>
      <p className="mt-4 text-lg text-ink-600">
        Bei der Auswahl unserer Reinigungspartner achten wir unter anderem
        auf:
      </p>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {criteria.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            <span className="text-ink-700">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
