import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Über Cleyra | Cleyra",
  description:
    "Cleyra ist ein Vermittlungsservice für Endreinigungen im Wallis. Erfahren Sie, wie die Vermittlung funktioniert.",
};

// TODO(INFO-001): implementare il contenuto completo (spec 16.3), senza
// inventare storia aziendale, persone, uffici o numeri non verificati.
export default function UeberCleyraPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Über Cleyra</h1>
      <p className="mt-4 text-lg">{siteConfig.intermediaryDisclaimer}</p>
    </main>
  );
}
