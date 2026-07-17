const CONTROL_CHARS_REGEX = new RegExp("[\\u0000-\\u001F\\u007F]", "g");

// Sanitizzazione minima per testo libero salvato lato server (spec 13).
// Rimuove tag HTML e caratteri di controllo; non è un sostituto di una
// libreria dedicata se in futuro si renderizza questo testo come HTML.
export function sanitizeFreeText(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(CONTROL_CHARS_REGEX, "")
    .trim();
}

export function normalizeEmail(value: string): string {
  return value.trim().toLowerCase();
}

export function normalizePhone(value: string): string {
  return value.replace(/[^\d+]/g, "");
}
