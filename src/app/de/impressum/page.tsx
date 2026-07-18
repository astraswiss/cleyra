import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum — Cleyra",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Impressum</h1>
      <p className="mt-2 text-zinc-600">Seite in Aufbau.</p>
    </main>
  );
}
