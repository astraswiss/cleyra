import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "So funktioniert Cleyra | Cleyra",
  description:
    "So funktioniert die Vermittlung einer Endreinigung über Cleyra: Anfrage stellen, Prüfung, Offerte erhalten.",
};

// TODO(INFO-001): implementare il contenuto completo (spec 16.1).
export default function SoFunktioniertsPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-semibold">So funktioniert Cleyra</h1>
      <ol className="mt-6 space-y-4 text-lg">
        <li>1. Anfrage ausfüllen</li>
        <li>2. Anfrage wird geprüft</li>
        <li>3. Offerte erhalten und entscheiden</li>
      </ol>
    </main>
  );
}
