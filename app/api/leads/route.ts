import { NextResponse } from "next/server";

// TODO(API-001): implementare validazione Zod, rate limiting, honeypot,
// salvataggio lead, upload allegati e invio e-mail (spec sezione 12).
// Non pubblico: nessun client deve fare affidamento su questa risposta.
export async function POST() {
  return NextResponse.json(
    {
      success: false,
      code: "NOT_IMPLEMENTED",
      message: "Endpoint non ancora implementato.",
    },
    { status: 501 }
  );
}
