import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Kontakt | Cleyra",
  description: "Kontaktieren Sie Cleyra bei Fragen zu Ihrer Anfrage.",
};

// TODO(INFO-001): aggiungere modulo di contatto separato dal modulo lead
// principale, e orari/indirizzo reali quando forniti dal proprietario.
export default function KontaktPage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">Kontakt</h1>
      {siteConfig.contactEmail ? (
        <p className="mt-4">
          <a href={`mailto:${siteConfig.contactEmail}`}>
            {siteConfig.contactEmail}
          </a>
        </p>
      ) : (
        <p className="mt-4 text-sm text-ink-600">
          {/* TODO(FOUND): contactEmail non ancora configurato (vedi .env.example) */}
        </p>
      )}
      {siteConfig.contactPhone ? (
        <p>
          <a href={`tel:${siteConfig.contactPhone}`}>
            {siteConfig.contactPhone}
          </a>
        </p>
      ) : null}
    </main>
  );
}
