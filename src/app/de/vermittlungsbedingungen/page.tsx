import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Vermittlungsbedingungen — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function VermittlungsbedingungenPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Vermittlungsbedingungen
        </h1>
        <p className="mt-4 text-zinc-600">
          Diese Seite ist in Vorbereitung. Die vollständigen
          Vermittlungsbedingungen werden ergänzt, sobald sie vorliegen.
        </p>
      </Section>
    </main>
  );
}
