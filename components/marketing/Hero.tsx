import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="py-12 sm:py-16">
      <p className="text-sm font-medium text-slate-600">
        Endreinigung im Oberwallis
      </p>
      <h1 className="mt-2 text-4xl font-semibold sm:text-5xl">
        Endreinigung im Wallis einfach anfragen
      </h1>
      <p className="mt-4 max-w-2xl text-lg sm:text-xl">
        Beschreiben Sie Ihre Wohnung, den Ort und den gewünschten Termin.
        Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten
        regionalen Reinigungspartner.
      </p>
      <p className="mt-2 max-w-2xl text-lg font-medium">
        Kostenlos, unverbindlich und ohne mühsames Telefonieren.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button href="/de#anfrage">Kostenlose Anfrage starten</Button>
        <Button href="/de/so-funktionierts" variant="secondary">
          So funktioniert Cleyra
        </Button>
      </div>

      <p className="mt-3 text-sm text-slate-600">
        Dauert etwa 2 Minuten. Kein Benutzerkonto erforderlich.
      </p>
    </section>
  );
}
