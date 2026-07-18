import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "So funktioniert's — Cleyra",
};

export default function SoFunktioniertsPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          So funktioniert&apos;s
        </h1>
        <p className="mt-4 text-zinc-600">Seite in Aufbau.</p>
      </Section>
    </main>
  );
}
