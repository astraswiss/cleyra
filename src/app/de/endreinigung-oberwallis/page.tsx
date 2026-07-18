import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Endreinigung im Oberwallis — Cleyra",
};

const trustPoints = [
  {
    title: "Kostenlose Anfrage",
    text: "Keine Kosten für die Vermittlungsanfrage.",
  },
  {
    title: "Offerte vor Auftrag",
    text: "Sie entscheiden erst nach Erhalt der Offerte.",
  },
  {
    title: "Regionale Vermittlung",
    text: "Ihre Anfrage wird an einen passenden Partner für Ihre Region weitergeleitet.",
  },
];

export default function EndreinigungOberwallisPage() {
  return (
    <main>
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Endreinigung im Oberwallis einfach anfragen
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Beschreiben Sie kurz Ihre Wohnung und den gewünschten Termin. Cleyra prüft
          Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen
          Reinigungspartner.
        </p>
        <a
          href="#anfrage"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700"
        >
          Kostenlose Anfrage starten
        </a>
        <p className="mt-3 text-sm text-zinc-500">
          Kostenlos und unverbindlich. Sie entscheiden erst nach Erhalt der Offerte.
        </p>
      </section>

      <section aria-label="Warum Cleyra" className="mx-auto max-w-3xl px-6 pb-16">
        <ul className="grid gap-6 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <li key={point.title}>
              <h2 className="font-semibold">{point.title}</h2>
              <p className="mt-1 text-sm text-zinc-600">{point.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
