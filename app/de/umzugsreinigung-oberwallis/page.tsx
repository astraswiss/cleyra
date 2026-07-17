import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Umzugsreinigung Oberwallis unverbindlich anfragen | Cleyra",
  description:
    "Umzugsreinigung im Oberwallis gesucht? Wohnung und Termin angeben und eine unverbindliche Offerte über einen regionalen Reinigungspartner anfragen.",
};

// TODO(LOCAL-005): implementare il contenuto completo del servizio secondario.
export default function UmzugsreinigungPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        Umzugsreinigung im Oberwallis einfach anfragen
      </h1>
      <p className="mt-4 text-lg">
        Senden Sie uns die wichtigsten Angaben zu Ihrem Umzug. Cleyra prüft
        Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen
        Reinigungspartner.
      </p>
    </main>
  );
}
