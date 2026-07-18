"use client";

import { useState } from "react";
import { PhotoUploader } from "@/components/lead-form/PhotoUploader";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

// Foto facoltative proposte solo dopo l'invio riuscito del modulo, per
// non ostacolare la richiesta principale (vedi docs/DECISIONS.md
// DEC-20260718-04). TODO(API-003): nessun file lascia ancora il
// browser realmente — solo il conteggio viene inviato, come nel resto
// del sito finché lo storage privato non è collegato.
export function PostSubmitPhotoUpload({ leadId }: { leadId: string }) {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSend() {
    setStatus("sending");
    try {
      const response = await fetch("/api/leads/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leadId, photoCount: files.length }),
      });
      if (!response.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Alert>
        Vielen Dank. Ihre Fotos wurden dem ausführenden Reinigungspartner zur
        Verfügung gestellt.
      </Alert>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base">
        Möchten Sie uns Fotos senden, damit der Partner den Aufwand besser
        einschätzen kann?
      </p>
      <PhotoUploader files={files} onChange={setFiles} />
      {status === "error" ? (
        <Alert variant="error">
          Die Fotos konnten nicht gesendet werden. Bitte versuchen Sie es
          erneut oder senden Sie sie später per E-Mail.
        </Alert>
      ) : null}
      <div>
        <Button
          type="button"
          variant="secondary"
          onClick={handleSend}
          disabled={files.length === 0 || status === "sending"}
          isLoading={status === "sending"}
        >
          Fotos senden
        </Button>
      </div>
    </div>
  );
}
