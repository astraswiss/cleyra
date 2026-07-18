import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Datenschutzerklärung</h1>
      <p className="mt-4 text-zinc-600">
        Diese Seite ist in Vorbereitung. Die rechtlich verbindliche
        Datenschutzerklärung wird ergänzt, sobald die dafür nötigen Angaben vorliegen.
      </p>
    </main>
  );
}
