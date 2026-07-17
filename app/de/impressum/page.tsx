import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Cleyra",
  description: "Impressum von Cleyra.",
};

// TODO LEGAL REVIEW: sostituire con testo approvato prima della pubblicazione.
// La pubblicazione in produzione è bloccata finché questo placeholder non è
// sostituito (vedi docs/DECISIONS.md DEC-20260717-03).
export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Impressum</h1>
      <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm">
        TODO LEGAL REVIEW: sostituire con testo approvato prima della
        pubblicazione.
      </p>
    </main>
  );
}
