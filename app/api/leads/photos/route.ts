import { NextResponse } from "next/server";

// Riceve la richiesta di invio foto facoltativa dalla pagina di conferma
// (spec: "le fotografie non ostacolano l'invio principale del modulo").
// TODO(API-003): quando lo storage privato sarà collegato, accettare qui
// i file reali (multipart/form-data), generare URL firmati e collegare
// photoKeys al lead esistente. Per ora, come per il resto di /api/leads,
// non viene persistito nulla: solo validazione leggera e log senza PII.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  const leadId =
    typeof body === "object" && body !== null && "leadId" in body
      ? (body as { leadId?: unknown }).leadId
      : undefined;
  const photoCount =
    typeof body === "object" && body !== null && "photoCount" in body
      ? (body as { photoCount?: unknown }).photoCount
      : undefined;

  if (typeof leadId !== "string" || !leadId) {
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", fieldErrors: { leadId: "Fehlende Referenznummer." } },
      { status: 400 }
    );
  }

  console.info("[leads] Foto-Nachreichung erhalten", {
    leadId,
    photoCount: typeof photoCount === "number" ? photoCount : 0,
  });

  return NextResponse.json({ success: true });
}
