import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Impressum — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Impressum
        </h1>
        <p className="mt-4 text-zinc-600">
          Diese Seite ist in Vorbereitung. Die rechtlich verbindlichen Angaben
          (Firma, Adresse, Kontakt, verantwortliche Person) werden ergänzt, sobald
          sie vorliegen.
        </p>
      </Section>
    </main>
  );
}
