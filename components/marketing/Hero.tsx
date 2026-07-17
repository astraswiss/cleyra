import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-100 blur-3xl sm:h-96 sm:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 top-40 h-56 w-56 rounded-full bg-clay-100 blur-3xl"
      />

      <div className="relative">
        <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-800">
          Endreinigung im Oberwallis
        </span>

        <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink-900 sm:text-5xl">
          Endreinigung im Wallis einfach anfragen
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
          Beschreiben Sie Ihre Wohnung, den Ort und den gewünschten Termin.
          Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten
          regionalen Reinigungspartner.
        </p>
        <p className="mt-2 max-w-xl text-lg font-semibold text-brand-700">
          Kostenlos, unverbindlich und ohne mühsames Telefonieren.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Button href="/de#anfrage">Kostenlose Anfrage starten</Button>
          <Button href="/de/so-funktionierts" variant="secondary">
            So funktioniert Cleyra
          </Button>
        </div>

        <p className="mt-4 text-sm text-ink-500">
          Dauert etwa 2 Minuten. Kein Benutzerkonto erforderlich.
        </p>
      </div>
    </section>
  );
}
