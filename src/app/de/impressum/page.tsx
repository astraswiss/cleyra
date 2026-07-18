import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Impressum</h1>
      <p className="mt-4 text-zinc-600">
        Diese Seite ist in Vorbereitung. Die rechtlich verbindlichen Angaben
        (Firma, Adresse, Kontakt, verantwortliche Person) werden ergänzt, sobald sie
        vorliegen.
      </p>
    </main>
  );
}
