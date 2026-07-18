import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DatenschutzPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Datenschutzerklärung
        </h1>
        <p className="mt-4 text-zinc-600">
          Diese Seite ist in Vorbereitung. Die rechtlich verbindliche
          Datenschutzerklärung wird ergänzt, sobald die dafür nötigen Angaben
          vorliegen.
        </p>
      </Section>
    </main>
  );
}
