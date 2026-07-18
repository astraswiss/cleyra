import type { Metadata } from "next";
import { PostSubmitPhotoUpload } from "@/components/lead-form/PostSubmitPhotoUpload";

export const metadata: Metadata = {
  title: "Anfrage erhalten | Cleyra",
  description: "Ihre Anfrage ist bei Cleyra eingegangen.",
  robots: { index: false, follow: false },
};

// TODO(API-006): l'evento lead_submitted (analytics) non è ancora emesso
// qui (dipende da TRACK-001, non ancora iniziato).
export default function DankePage({
  searchParams,
}: {
  searchParams: { lead?: string };
}) {
  const leadId = searchParams.lead;

  return (
    <main className="mx-auto max-w-content px-4 py-16">
      <h1 className="text-3xl font-semibold">
        Vielen Dank. Ihre Anfrage ist bei Cleyra eingegangen.
      </h1>
      <p className="mt-4 text-lg">
        Wir prüfen nun, ob alle notwendigen Angaben vorhanden sind und
        welcher Reinigungspartner die gewünschte Region und den Termin
        abdecken kann.
      </p>
      {leadId ? (
        <p className="mt-4 text-sm text-slate-600">
          Ihre Referenznummer: <span className="font-medium">{leadId}</span>
        </p>
      ) : null}
      <ol className="mt-6 space-y-2 text-lg">
        <li>1. Cleyra prüft die Anfrage.</li>
        <li>2. Bei Rückfragen kontaktieren wir Sie.</li>
        <li>
          3. Ein ausgewählter Reinigungspartner meldet sich bezüglich der
          Offerte.
        </li>
      </ol>
      <p className="mt-6 text-sm text-slate-600">
        Bitte achten Sie in den nächsten Stunden auf Anrufe und E-Mails.
      </p>

      {leadId ? (
        <div className="mt-10 max-w-xl border-t border-slate-200 pt-8">
          <PostSubmitPhotoUpload leadId={leadId} />
        </div>
      ) : null}
    </main>
  );
}
