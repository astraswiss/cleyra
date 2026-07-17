const benefits = [
  {
    title: "Nur eine Anfrage",
    text: "Sie müssen nicht mehrere Unternehmen einzeln kontaktieren.",
  },
  {
    title: "Regionale Vermittlung",
    text: "Ihre Anfrage wird an einen Reinigungspartner weitergeleitet, der die entsprechende Region bedient.",
  },
  {
    title: "Transparente Entscheidung",
    text: "Sie erhalten eine Offerte und entscheiden danach, ob Sie den Auftrag erteilen möchten.",
  },
  {
    title: "Direkter Kontakt",
    text: "Nach der Vermittlung können Sie Details, Termin und Leistungsumfang direkt mit dem ausführenden Partner klären.",
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-12">
      <ul className="grid gap-8 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li key={benefit.title}>
            <p className="text-lg font-medium">{benefit.title}</p>
            <p className="mt-2 text-base text-slate-700">{benefit.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
