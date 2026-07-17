import { NextResponse, type NextRequest } from "next/server";
import { leadFormSchema } from "@/lib/lead-schema";
import { generateLeadId } from "@/lib/lead-id";
import { isRateLimited } from "@/lib/rate-limit";
import { normalizeEmail, normalizePhone, sanitizeFreeText } from "@/lib/sanitize";

// TODO(API-002): sostituire questo array in memoria con il database scelto
// (vedi docs/DECISIONS.md DEC-20260717-02). I dati qui NON sopravvivono a un
// riavvio/cold start e non vanno considerati una persistenza reale.
const inMemoryLeads: Array<{ id: string; createdAt: string }> = [];

function getClientIdentifier(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  if (request.headers.get("content-type")?.includes("application/json") !== true) {
    return NextResponse.json(
      { success: false, code: "UNSUPPORTED_MEDIA_TYPE" },
      { status: 415 }
    );
  }

  const clientId = getClientIdentifier(request);
  if (isRateLimited(clientId)) {
    return NextResponse.json(
      {
        success: false,
        code: "RATE_LIMITED",
        message: "Zu viele Anfragen. Bitte versuchen Sie es später erneut.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, code: "INVALID_JSON" },
      { status: 400 }
    );
  }

  // Honeypot: un bot che compila questo campo invisibile riceve una
  // risposta di "successo" fittizia, senza essere elaborato (spec 13).
  if (typeof body === "object" && body !== null && "company" in body) {
    const honeypotValue = (body as { company?: unknown }).company;
    if (typeof honeypotValue === "string" && honeypotValue.length > 0) {
      return NextResponse.json({
        success: true,
        leadId: generateLeadId(),
        redirectUrl: "/de/danke",
      });
    }
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path.join(".");
      if (path && !fieldErrors[path]) {
        fieldErrors[path] = issue.message;
      }
    }
    return NextResponse.json(
      { success: false, code: "VALIDATION_ERROR", fieldErrors },
      { status: 400 }
    );
  }

  try {
    const values = parsed.data;
    const leadId = generateLeadId();
    const createdAt = new Date().toISOString();

    const normalized = {
      ...values,
      email: normalizeEmail(values.email),
      phone: normalizePhone(values.phone),
      notes: values.notes ? sanitizeFreeText(values.notes) : values.notes,
    };

    // TODO(API-002): persistere `normalized` nel database reale invece di
    // questo array in memoria.
    inMemoryLeads.push({ id: leadId, createdAt });

    // Log senza dati personali (spec sezione 26): nessun nome, email,
    // telefono o note complete.
    console.info("[leads] nuova richiesta ricevuta", {
      leadId,
      serviceType: normalized.serviceType,
      postalCode: normalized.postalCode,
      createdAt,
    });

    // TODO(API-005): inviare l'e-mail di conferma all'utente e la notifica
    // interna a `INTERNAL_LEAD_NOTIFICATION_EMAIL` quando un provider
    // e-mail sarà collegato. Per ora nessuna e-mail viene inviata.

    return NextResponse.json({
      success: true,
      leadId,
      redirectUrl: `/de/danke`,
    });
  } catch (error) {
    console.error("[leads] errore imprevisto durante l'invio", error);
    return NextResponse.json(
      {
        success: false,
        code: "SUBMISSION_FAILED",
        message:
          "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
      },
      { status: 500 }
    );
  }
}
