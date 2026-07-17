# Decisions — Cleyra

Formato ADR leggero. Registrare solo decisioni durature, non correzioni minori.

## DEC-20260717-01 — Scelta stack iniziale

- Status: accepted
- Date: 2026-07-17
- Context: Nessun repository preesistente; la spec raccomanda uno stack
  specifico per un progetto nuovo (sezione 4).
- Decision: Next.js (App Router) + TypeScript strict + Tailwind CSS,
  React Hook Form + Zod per il modulo (da introdurre in Fase 3), nessun CMS.
- Alternatives considered: Remix, Astro — scartati perché la spec
  raccomanda esplicitamente Next.js e il proprietario non ha richiesto
  alternative.
- Consequences: le pagine marketing possono usare rendering statico/SSR;
  il modulo richiede componenti client.
- Related files/tasks: FOUND-005, `docs/ARCHITECTURE.md`

## DEC-20260717-02 — Provider database, e-mail e storage non ancora scelti

- Status: proposed
- Date: 2026-07-17
- Context: La spec raccomanda PostgreSQL gestito (es. Supabase) e un
  provider e-mail transazionale configurabile, ma non impone un fornitore
  specifico. Serve una decisione del proprietario prima della Fase 4.
- Decision: rimandata. Placeholder in `.env.example` senza valori.
- Alternatives considered: n/d
- Consequences: Fase 4 (backend minimo) è bloccata finché non arriva la
  decisione; vedi `PROJECT_STATUS.md` per i dati richiesti al proprietario.
- Related files/tasks: API-002, API-005

## DEC-20260717-03 — Placeholder legali non pubblicabili

- Status: accepted
- Date: 2026-07-17
- Context: La spec vieta di inventare testi legali definitivi (Datenschutz,
  Impressum, Vermittlungsbedingungen).
- Decision: le pagine legali conterranno layout e testo marcato
  `TODO LEGAL REVIEW` finché non arriva un testo approvato dal proprietario
  o da un consulente legale. La pubblicazione in produzione resta bloccata
  fino alla sostituzione.
- Alternatives considered: nessuna — vincolo esplicito della spec.
- Consequences: Definition of Done non raggiungibile senza approvazione
  legale esterna.
- Related files/tasks: LEGAL-001, QA-006
