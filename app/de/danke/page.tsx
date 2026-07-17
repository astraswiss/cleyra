import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anfrage erhalten | Cleyra",
  description: "Ihre Anfrage ist bei Cleyra eingegangen.",
  robots: { index: false, follow: false },
};

// TODO(API-006): mostrare i dati reali della richiesta (leadId, città, data,
// servizio) letti da un riferimento non sensibile in query string, ed
// emettere l'evento lead_submitted una sola volta (non ad ogni refresh).
export default function DankePage() {
  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        Vielen Dank. Ihre Anfrage ist bei Cleyra eingegangen.
      </h1>
      <p className="mt-4 text-lg">
        Wir prüfen nun, ob alle notwendigen Angaben vorhanden sind und
        welcher Reinigungspartner die gewünschte Region und den Termin
        abdecken kann.
      </p>
      <ol className="mt-6 space-y-2 text-lg">
        <li>1. Cleyra prüft die Anfrage.</li>
        <li>2. Bei Rückfragen kontaktieren wir Sie.</li>
        <li>
          3. Ein ausgewählter Reinigungspartner meldet sich bezüglich der
          Offerte.
        </li>
      </ol>
      <p className="mt-6 text-sm text-ink-600">
        Bitte achten Sie in den nächsten Stunden auf Anrufe und E-Mails.
      </p>
    </main>
  );
}
