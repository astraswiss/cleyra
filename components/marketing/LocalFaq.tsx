import { Accordion } from "@/components/ui/Accordion";
import { generalFaqItems } from "@/lib/faq-content";
import type { LocationLanding } from "@/lib/locations";

export function LocalFaq({ location }: { location: LocationLanding }) {
  const items = [location.localFaq, ...generalFaqItems];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-semibold">Häufige Fragen</h2>
      <div className="mt-6">
        <Accordion items={items} />
      </div>
    </section>
  );
}
