// Formato "CLY-YYYY-XXXXXX" (spec sezione 12). Non usare come unica fonte
// di verità per l'unicità in produzione multi-istanza: da rivalutare
// insieme al provider database scelto (vedi docs/DECISIONS.md DEC-20260717-02).
export function generateLeadId(now: Date = new Date()): string {
  const year = now.getFullYear();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CLY-${year}-${random}`;
}
