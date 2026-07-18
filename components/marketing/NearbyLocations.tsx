import Link from "next/link";
import { getOtherLocationLandings, type LocationLanding } from "@/lib/locations";

export function NearbyLocations({ location }: { location: LocationLanding }) {
  const others = getOtherLocationLandings(location.slug);

  return (
    <section className="py-12">
      <h2 className="text-3xl font-semibold">In der Nähe von {location.cityName}</h2>
      <p className="mt-4 max-w-2xl text-lg">
        Cleyra prüft auch Anfragen aus{" "}
        {location.nearbyPlaces.join(", ")} und weiteren Gemeinden rund um{" "}
        {location.cityName}, sofern ein Reinigungspartner die Region und den
        gewünschten Termin abdecken kann.
      </p>

      {others.length > 0 ? (
        <>
          <p className="mt-6 text-sm font-medium text-slate-700">
            Weitere Regionen im Oberwallis:
          </p>
          <ul className="mt-2 flex flex-wrap gap-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/de/${other.slug}`}
                  className="inline-block rounded-md border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
                >
                  Endreinigung {other.cityName}
                </Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}
