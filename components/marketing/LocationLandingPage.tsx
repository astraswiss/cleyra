import { Button } from "@/components/ui/Button";
import { TrustStrip } from "@/components/marketing/TrustStrip";
import { ProcessSteps } from "@/components/marketing/ProcessSteps";
import { ServiceList } from "@/components/marketing/ServiceList";
import { PartnerTransparency } from "@/components/marketing/PartnerTransparency";
import { NearbyLocations } from "@/components/marketing/NearbyLocations";
import { LocalFaq } from "@/components/marketing/LocalFaq";
import { FinalCta } from "@/components/marketing/FinalCta";
import { LeadForm } from "@/components/lead-form/LeadForm";
import type { LocationLanding } from "@/lib/locations";

// Template riutilizzabile per le landing locali (spec sezione 9): ogni
// pagina passa i propri dati strutturati da `lib/locations.ts`, così H1,
// intro, zone vicine, FAQ locale e meta restano unici per città mentre la
// struttura a 10 sezioni (spec 9 "Struttura di ogni landing") è condivisa.
export function LocationLandingPage({ location }: { location: LocationLanding }) {
  return (
    <main className="mx-auto max-w-content px-4">
      <section className="py-12 sm:py-16">
        <h1 className="text-4xl font-semibold sm:text-5xl">{location.h1}</h1>
        <p className="mt-4 max-w-2xl text-lg sm:text-xl">{location.intro}</p>
        <div className="mt-8">
          <Button href="#anfrage">Kostenlose Anfrage starten</Button>
        </div>
      </section>

      <TrustStrip />

      <section id="anfrage" className="scroll-mt-20 py-12">
        <h2 className="text-3xl font-semibold">
          Kostenlose Anfrage für {location.cityName}
        </h2>
        <div className="mt-6 max-w-2xl">
          <LeadForm
            initialValues={{
              city: location.cityName,
              postalCode: location.postalCodes[0],
            }}
          />
        </div>
      </section>

      <ProcessSteps />
      <ServiceList />
      <NearbyLocations location={location} />
      <PartnerTransparency />
      <LocalFaq location={location} />

      <div className="pb-16">
        <FinalCta />
      </div>
    </main>
  );
}
