import type { Metadata } from "next";
import { faqItems } from "@/content/faq";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Häufige Fragen — Cleyra",
};

export default function FaqPage() {
  return (
    <main>
      <Section>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Häufige Fragen
        </h1>
        <dl className="mt-6 space-y-6">
          {faqItems.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold">{item.question}</dt>
              <dd className="mt-1 text-zinc-600">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </main>
  );
}
