const steps = [
  {
    title: "Anfrage ausfüllen",
    text: "Teilen Sie uns mit, wo und wann gereinigt werden soll, wie gross die Wohnung ist und welche zusätzlichen Bereiche berücksichtigt werden sollen.",
  },
  {
    title: "Anfrage wird geprüft",
    text: "Cleyra kontrolliert die Angaben und vermittelt die Anfrage an einen ausgewählten Reinigungspartner für Ihre Region.",
  },
  {
    title: "Offerte erhalten und entscheiden",
    text: "Der Reinigungspartner kontaktiert Sie und erstellt eine Offerte. Erst nach Ihrer Zustimmung entsteht ein Auftrag zwischen Ihnen und dem ausführenden Unternehmen.",
  },
];

export function ProcessSteps() {
  return (
    <section className="py-14">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        So funktioniert Cleyra
      </h2>
      <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {steps.map((step, index) => (
          <li key={step.title} className="relative pl-14 sm:pl-0">
            <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-brand-700 font-display text-lg font-bold text-white sm:static sm:mb-4">
              {index + 1}
            </span>
            <p className="text-lg font-semibold text-ink-900">{step.title}</p>
            <p className="mt-2 text-base leading-relaxed text-ink-600">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-9 text-sm text-ink-500">
        Die Anfrage bei Cleyra ist kostenlos und unverbindlich.
      </p>
    </section>
  );
}
