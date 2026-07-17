import type { Metadata } from "next";
import { locationLandings } from "@/lib/locations";

const location = locationLandings.find(
  (item) => item.slug === "endreinigung-visp"
)!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

// TODO(LOCAL-002): implementare la struttura completa a 10 sezioni (spec 9.4).
export default function VispLandingPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">{location.h1}</h1>
      <p className="mt-4 text-lg">{location.intro}</p>
      <p className="mt-4 text-sm text-ink-600">
        Auch für: {location.nearbyPlaces.join(", ")}
      </p>
    </main>
  );
}
