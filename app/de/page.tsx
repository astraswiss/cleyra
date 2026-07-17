import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { ServiceList } from "@/components/marketing/ServiceList";
import { RegionLinks } from "@/components/marketing/RegionLinks";
import { BenefitsGrid } from "@/components/marketing/BenefitsGrid";
import { PartnerTransparency } from "@/components/marketing/PartnerTransparency";
import { FaqPreview } from "@/components/marketing/FaqPreview";
import { FinalCta } from "@/components/marketing/FinalCta";
import { LeadForm } from "@/components/lead-form/LeadForm";

export const metadata: Metadata = {
  title: "Cleyra — Endreinigung im Wallis einfach anfragen",
  description:
    "Kostenlos und unverbindlich eine Endreinigung im Wallis anfragen.",
};

export default function HomePage() {
  return (
    <main className="mx-auto max-w-content px-4">
      <Hero />
      <TrustStrip />

      <section className="py-12">
        <h2 className="text-3xl font-semibold">
          Ein Umzug ist schon aufwendig genug
        </h2>
        <p className="mt-4 max-w-2xl text-lg">
          Kurz vor der Wohnungsabgabe bleibt oft wenig Zeit, mehrere
          Reinigungsfirmen anzurufen, Leistungen zu vergleichen und freie
          Termine zu suchen. Cleyra vereinfacht diesen Prozess. Sie senden
          uns einmal die wichtigsten Angaben. Wir prüfen, ob die Anfrage
          vollständig ist, und leiten sie an einen passenden regionalen
          Reinigungspartner weiter.
        </p>
      </section>

      <ProcessSteps />
      <ServiceList />
      <RegionLinks />
      <BenefitsGrid />
      <PartnerTransparency />
      <FaqPreview />

      <section id="anfrage" className="scroll-mt-20 py-12">
        <h2 className="text-3xl font-semibold">Kostenlose Anfrage</h2>
        <div className="mt-6 max-w-2xl">
          <LeadForm />
        </div>
      </section>

      <div className="pb-16">
        <FinalCta />
      </div>
    </main>
  );
}
