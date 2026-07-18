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
    <section className="py-12">
      <h2 className="text-3xl font-semibold">So funktioniert Cleyra</h2>
      <ol className="mt-8 grid gap-8 sm:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title}>
            <span className="text-sm font-semibold text-slate-500">
              {index + 1}.
            </span>
            <p className="mt-1 text-lg font-medium">{step.title}</p>
            <p className="mt-2 text-base text-slate-700">{step.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-sm text-slate-600">
        Die Anfrage bei Cleyra ist kostenlos und unverbindlich.
      </p>
    </section>
  );
}
