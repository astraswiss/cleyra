import Link from "next/link";
import { locationLandings } from "@/lib/locations";

export function RegionLinks() {
  return (
    <section id="regionen" className="py-12">
      <h2 className="text-3xl font-semibold">
        Für Visp, Brig, Naters und das Oberwallis
      </h2>
      <p className="mt-4 max-w-2xl text-lg">
        Cleyra bearbeitet zunächst Anfragen aus Visp, Brig-Glis, Naters und
        den umliegenden Gemeinden. Geben Sie im Formular Ihre Postleitzahl
        ein. Wir prüfen anschliessend, ob ein Reinigungspartner Ihre Region
        und den gewünschten Termin abdecken kann.
      </p>
      <ul className="mt-6 flex flex-wrap gap-4">
        {locationLandings.map((location) => (
          <li key={location.slug}>
            <Link
              href={`/de/${location.slug}`}
              className="inline-block rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              Endreinigung {location.cityName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
