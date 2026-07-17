import { Accordion } from "@/components/ui/Accordion";

const faqItems = [
  {
    question: "Ist die Anfrage kostenlos?",
    answer:
      "Ja. Das Ausfüllen und Übermitteln der Anfrage über Cleyra ist kostenlos und unverbindlich.",
  },
  {
    question: "Muss ich die erhaltene Offerte annehmen?",
    answer:
      "Nein. Sie entscheiden selbst, ob Sie die Offerte des Reinigungspartners akzeptieren.",
  },
  {
    question: "Wer führt die Reinigung aus?",
    answer:
      "Die Reinigung wird von dem Unternehmen ausgeführt, an das Cleyra Ihre Anfrage vermittelt und dessen Offerte Sie akzeptieren.",
  },
  {
    question: "Gibt es eine Abnahmegarantie?",
    answer:
      "Eine Abnahmegarantie gilt nur dann, wenn sie vom ausführenden Reinigungspartner ausdrücklich in der Offerte bestätigt wird.",
  },
  {
    question: "Wann werde ich kontaktiert?",
    answer:
      "Vollständige Anfragen werden während der Geschäftszeiten möglichst rasch geprüft. Die genaue Reaktionszeit hängt von Region, Termin und Verfügbarkeit des Partners ab.",
  },
  {
    question: "Welche Daten werden weitergegeben?",
    answer:
      "Cleyra übermittelt die für die Bearbeitung und Erstellung einer Offerte erforderlichen Angaben an den ausgewählten Reinigungspartner. Weitere Informationen finden Sie in unserer Datenschutzerklärung.",
  },
];

export function FaqPreview() {
  return (
    <section className="py-14">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        Häufige Fragen
      </h2>
      <div className="mt-7">
        <Accordion items={faqItems} />
      </div>
    </section>
  );
}
