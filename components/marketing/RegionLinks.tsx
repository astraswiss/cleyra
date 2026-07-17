import Link from "next/link";
import { locationLandings } from "@/lib/locations";
import { Icon } from "@/components/ui/Icon";

export function RegionLinks() {
  return (
    <section id="regionen" className="py-14">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        Für Visp, Brig, Naters und das Oberwallis
      </h2>
      <p className="mt-4 max-w-2xl text-lg text-ink-600">
        Cleyra bearbeitet zunächst Anfragen aus Visp, Brig-Glis, Naters und
        den umliegenden Gemeinden. Geben Sie im Formular Ihre Postleitzahl
        ein. Wir prüfen anschliessend, ob ein Reinigungspartner Ihre Region
        und den gewünschten Termin abdecken kann.
      </p>
      <ul className="mt-7 flex flex-wrap gap-3">
        {locationLandings.map((location) => (
          <li key={location.slug}>
            <Link
              href={`/de/${location.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-sm font-semibold text-ink-800 shadow-soft transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <Icon name="mapPin" className="h-4 w-4 text-brand-600" />
              Endreinigung {location.cityName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
