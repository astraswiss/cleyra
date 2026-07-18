import type { Metadata } from "next";
import { locationLandings } from "@/lib/locations";
import { LocationLandingPage } from "@/components/marketing/LocationLandingPage";

const location = locationLandings.find(
  (item) => item.slug === "endreinigung-visp"
)!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function VispLandingPage() {
  return <LocationLandingPage location={location} />;
}
