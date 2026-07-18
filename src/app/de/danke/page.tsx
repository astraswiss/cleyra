import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danke — Cleyra",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DankePage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Danke</h1>
      <p className="mt-2 text-zinc-600">Seite in Aufbau.</p>
    </main>
  );
}
