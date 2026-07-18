import type { Metadata } from "next";
import { faqItems } from "@/content/faq";

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

const processSteps = [
  "Anfrage ausfüllen",
  "Anfrage wird geprüft",
  "Offerte erhalten und entscheiden",
];

const services = [
  {
    title: "Endreinigung zur Wohnungsabgabe",
    text: "Für die Rückgabe Ihrer Mietwohnung.",
  },
  {
    title: "Umzugsreinigung",
    text: "Für den Umzug in eine neue Wohnung.",
  },
  {
    title: "Andere Reinigung",
    text: "Für weitere Reinigungsanliegen im Oberwallis.",
  },
];

const disclaimerText =
  "Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Vertrag über die Reinigung entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.";

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

      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-2xl font-semibold">
          Die Endreinigung muss stimmen — die Suche kostet Zeit
        </h2>
        <p className="mt-3 text-zinc-600">
          Bei der Wohnungsabgabe zählt eine saubere Endreinigung. Statt selbst einen
          passenden Anbieter zu suchen, senden Sie Ihre Anfrage an Cleyra. Wir
          vermitteln sie an einen regionalen Reinigungspartner für Ihre Zone und Ihren
          Wunschtermin.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">So funktioniert&apos;s</h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="font-semibold text-zinc-400">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">
          Welche Reinigung Sie anfragen können
        </h2>
        <ul className="mt-4 grid gap-6 sm:grid-cols-3">
          {services.map((service) => (
            <li key={service.title}>
              <h3 className="font-semibold">{service.title}</h3>
              <p className="mt-1 text-sm text-zinc-600">{service.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Serviceregion</h2>
        <p className="mt-3 text-zinc-600">
          Cleyra vermittelt Anfragen aus dem Oberwallis, unter anderem aus Visp,
          Brig-Glis und Naters.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">
          Cleyra ist Vermittler, nicht Ausführender
        </h2>
        <p className="mt-3 text-zinc-600">{disclaimerText}</p>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <h2 className="text-2xl font-semibold">Häufige Fragen</h2>
        <dl className="mt-4 space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-1 text-zinc-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-16 text-center">
        <a
          href="#anfrage"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 font-medium text-white hover:bg-zinc-700"
        >
          Kostenlose Anfrage starten
        </a>
      </section>
    </main>
  );
}
