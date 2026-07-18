import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Häufige Fragen | Cleyra",
  description:
    "Antworten auf häufige Fragen zur Anfrage, zur Offerte und zum Ablauf bei Cleyra.",
};

// TODO(INFO-001): implementare tutte le categorie e le domande (spec 16.2).
export default function FaqPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-semibold">Häufige Fragen</h1>
    </main>
  );
}
