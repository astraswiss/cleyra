import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cleyra — Endreinigung im Wallis einfach anfragen",
  description:
    "Kostenlos und unverbindlich eine Endreinigung im Wallis anfragen.",
};

// TODO(HOME-001): implementare tutte le sezioni della homepage (spec 8.1-8.9).
export default function HomePage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-semibold">
        Endreinigung im Wallis einfach anfragen
      </h1>
      <p className="mt-4 text-lg">
        Beschreiben Sie Ihre Wohnung, den Ort und den gewünschten Termin.
        Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten
        regionalen Reinigungspartner.
      </p>
      <p className="mt-8 text-sm">{siteConfig.intermediaryDisclaimer}</p>

      {/* TODO(HOME-001): sostituire con le sezioni 8.2-8.9 (Problem, So funktioniert's, Leistungen, Regionen, ecc.). */}
      <section id="leistungen" className="mt-16" />
      <section id="regionen" className="mt-16" />
      <section id="anfrage" className="mt-16" />
    </main>
  );
}
