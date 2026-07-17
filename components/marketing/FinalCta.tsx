import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-brand-900 px-6 py-14 text-white sm:px-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-700/40 blur-3xl"
      />
      <div className="relative">
        <h2 className="font-display text-3xl font-bold tracking-tight">
          Endreinigung jetzt unverbindlich anfragen
        </h2>
        <p className="mt-4 max-w-xl text-lg text-brand-100">
          Senden Sie uns die wichtigsten Angaben zu Ihrer Wohnung und zum
          gewünschten Termin.
        </p>
        <div className="mt-7">
          <Button href="/de#anfrage" variant="secondary">
            Kostenlose Anfrage starten
          </Button>
        </div>
        <p className="mt-4 text-sm text-brand-200">
          Dauert etwa 2 Minuten. Sie entscheiden erst nach Erhalt der Offerte.
        </p>
      </div>
    </section>
  );
}
