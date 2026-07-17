import { Icon, type IconName } from "@/components/ui/Icon";

const benefits: { title: string; text: string; icon: IconName }[] = [
  {
    title: "Nur eine Anfrage",
    text: "Sie müssen nicht mehrere Unternehmen einzeln kontaktieren.",
    icon: "spark",
  },
  {
    title: "Regionale Vermittlung",
    text: "Ihre Anfrage wird an einen Reinigungspartner weitergeleitet, der die entsprechende Region bedient.",
    icon: "mapPin",
  },
  {
    title: "Transparente Entscheidung",
    text: "Sie erhalten eine Offerte und entscheiden danach, ob Sie den Auftrag erteilen möchten.",
    icon: "document",
  },
  {
    title: "Direkter Kontakt",
    text: "Nach der Vermittlung können Sie Details, Termin und Leistungsumfang direkt mit dem ausführenden Partner klären.",
    icon: "phone",
  },
];

export function BenefitsGrid() {
  return (
    <section className="py-14">
      <ul className="grid gap-5 sm:grid-cols-2">
        {benefits.map((benefit) => (
          <li
            key={benefit.title}
            className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay-100 text-clay-600">
              <Icon name={benefit.icon} className="h-5 w-5" />
            </span>
            <p className="mt-4 text-lg font-semibold text-ink-900">
              {benefit.title}
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink-600">
              {benefit.text}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
