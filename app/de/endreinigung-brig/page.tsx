import type { Metadata } from "next";
import { locationLandings } from "@/lib/locations";

const location = locationLandings.find(
  (item) => item.slug === "endreinigung-brig"
)!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

// TODO(LOCAL-003): implementare la struttura completa a 10 sezioni (spec 9.4).
export default function BrigLandingPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-semibold">{location.h1}</h1>
      <p className="mt-4 text-lg">{location.intro}</p>
      <p className="mt-4 text-sm text-slate-600">
        Auch für: {location.nearbyPlaces.join(", ")}
      </p>
    </main>
  );
}
