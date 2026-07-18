import { Button } from "@/components/ui/Button";

export function FinalCta() {
  return (
    <section className="rounded-lg bg-slate-900 px-6 py-12 text-white sm:px-10">
      <h2 className="text-3xl font-semibold">
        Endreinigung jetzt unverbindlich anfragen
      </h2>
      <p className="mt-4 text-lg">
        Senden Sie uns die wichtigsten Angaben zu Ihrer Wohnung und zum
        gewünschten Termin.
      </p>
      <div className="mt-6">
        <Button href="/de#anfrage" variant="secondary">
          Kostenlose Anfrage starten
        </Button>
      </div>
      <p className="mt-3 text-sm text-slate-300">
        Dauert etwa 2 Minuten. Sie entscheiden erst nach Erhalt der Offerte.
      </p>
    </section>
  );
}
