import type { Metadata } from "next";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Über Cleyra — Cleyra",
};

export default function UeberCleyraPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Über Cleyra
        </h1>
        <p className="mt-4 text-zinc-600">Seite in Aufbau.</p>
      </Section>
    </main>
  );
}
