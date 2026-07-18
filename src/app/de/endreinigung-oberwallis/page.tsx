import type { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { Section } from "@/components/Section";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Card } from "@/components/Card";
import { RequestForm } from "@/components/RequestForm";

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
      <Section>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Endreinigung im Oberwallis einfach anfragen
        </h1>
        <p className="mt-4 text-lg text-zinc-600">
          Beschreiben Sie kurz Ihre Wohnung und den gewünschten Termin. Cleyra prüft
          Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen
          Reinigungspartner.
        </p>
        <PrimaryButton href="#anfrage" className="mt-6">
          Kostenlose Anfrage starten
        </PrimaryButton>
        <p className="mt-3 text-sm text-zinc-500">
          Kostenlos und unverbindlich. Sie entscheiden erst nach Erhalt der Offerte.
        </p>
      </Section>

      <Section aria-label="Warum Cleyra" muted>
        <ul className="grid gap-4 sm:grid-cols-3">
          {trustPoints.map((point) => (
            <Card
              key={point.title}
              title={point.title}
              text={point.text}
              headingLevel="h2"
            />
          ))}
        </ul>
      </Section>

      <Section id="anfrage">
        <RequestForm />
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Die Endreinigung muss stimmen — die Suche kostet Zeit
        </h2>
        <p className="mt-3 text-zinc-600">
          Bei der Wohnungsabgabe zählt eine saubere Endreinigung. Statt selbst einen
          passenden Anbieter zu suchen, senden Sie Ihre Anfrage an Cleyra. Wir
          vermitteln sie an einen regionalen Reinigungspartner für Ihre Zone und Ihren
          Wunschtermin.
        </p>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          So funktioniert&apos;s
        </h2>
        <ol className="mt-4 grid gap-4 sm:grid-cols-3">
          {processSteps.map((step, index) => (
            <li key={step} className="flex items-start gap-3">
              <span className="font-semibold text-brand">{index + 1}.</span>
              <span className="text-zinc-600">{step}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Welche Reinigung Sie anfragen können
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {services.map((service) => (
            <Card key={service.title} title={service.title} text={service.text} />
          ))}
        </ul>
      </Section>

      <Section>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Serviceregion
        </h2>
        <p className="mt-3 text-zinc-600">
          Cleyra vermittelt Anfragen aus dem Oberwallis, unter anderem aus Visp,
          Brig-Glis und Naters.
        </p>
      </Section>

      <Section className="pt-0">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Cleyra ist Vermittler, nicht Ausführender
        </h2>
        <p className="mt-3 text-zinc-600">{disclaimerText}</p>
      </Section>

      <Section muted>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Häufige Fragen
        </h2>
        <dl className="mt-4 space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-1 text-zinc-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section className="text-center">
        <PrimaryButton href="#anfrage">Kostenlose Anfrage starten</PrimaryButton>
      </Section>
    </main>
  );
}
