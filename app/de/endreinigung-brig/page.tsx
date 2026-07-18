import type { Metadata } from "next";
import { locationLandings } from "@/lib/locations";
import { LocationLandingPage } from "@/components/marketing/LocationLandingPage";

const location = locationLandings.find(
  (item) => item.slug === "endreinigung-brig"
)!;

export const metadata: Metadata = {
  title: location.metaTitle,
  description: location.metaDescription,
};

export default function BrigLandingPage() {
  return <LocationLandingPage location={location} />;
}
