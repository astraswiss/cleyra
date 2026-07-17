Last updated: 2026-07-17 23:15 Europe/Zurich
Current phase: Fase 0 completata, Fase 1 avviata (scaffold)
Overall status: in_progress
Current branch: claude/new-session-huwuyt
Last verified commit: (nessuno ancora — vedi "prima del prossimo commit")

## Cosa è già funzionante

- File di continuità creati: `CLAUDE.md`, `docs/PROJECT_OVERVIEW.md`,
  `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/DECISIONS.md`,
  questo file, `docs/SESSION_HANDOFF.md`, `docs/CHANGELOG.md`.
- Scaffold Next.js 14 (App Router) + TypeScript strict + Tailwind CSS.
- Rotta `/` → redirect a `/de` (verificato, HTTP 307).
- `/de` mostra una homepage placeholder con H1, testo hero e la
  dichiarazione di intermediazione da `lib/site-config.ts`.
- `npm run build` (include typecheck e lint) passa senza errori.
- `npm run lint` passa senza warning.

## Cosa è parzialmente funzionante

- Homepage: solo hero placeholder, non tutte le sezioni 8.1–8.9 della
  spec (task HOME-001).

## Cosa non è ancora iniziato

- Tutte le rotte oltre `/` e `/de` (landing locali, so-funktionierts, FAQ,
  ueber-cleyra, kontakt, pagine legali, danke, `/api/leads`).
- Header/footer e componenti UI condivisi.
- Modulo lead multi-step.
- Backend (database, storage, e-mail, antispam).
- SEO tecnico (sitemap, robots, JSON-LD) oltre ai metadata di base.
- Analytics/GTM/consent management.
- Test automatici ed e2e.

## Attività attualmente in corso

Nessuna: sessione Fase 0 conclusa in questo checkpoint, in attesa di
indicazioni per proseguire con Fase 1 (FOUND-006, LAYOUT-001) o Fase 3
(FORM-001).

## Blocchi e decisioni richieste

- Provider database, e-mail transazionale e storage foto non ancora
  scelti (vedi `docs/DECISIONS.md` DEC-20260717-02) — bloccante per
  Fase 4.
- Testi legali definitivi (Datenschutz, Impressum, Vermittlungsbedingungen)
  non ancora forniti dal proprietario — bloccante per il rilascio in
  produzione (vedi DEC-20260717-03).
- Contatti reali (e-mail, telefono, orari, indirizzo) non ancora forniti
  — necessari per `/de/kontakt` e footer.
- Fotografie autentiche non ancora fornite — per ora si useranno
  placeholder dichiarati quando si arriverà alla Fase 2.

## Test attualmente verdi

- `npm run build` (Next.js build, incl. typecheck + lint durante la build)
- `npm run lint`
- Smoke test manuale: `curl` su `/` (307 → `/de`) e `/de` (200, H1 presente)

## Test falliti o non eseguiti

- Nessun test automatico (unit/component/integration/e2e) ancora scritto.

## Debito tecnico noto

- Vulnerabilità npm audit residue (alta severità) in dipendenze dev di
  `eslint-config-next` (catena `glob`/`minimatch`) — non runtime, da
  monitorare a ogni aggiornamento di Next.js.
- `next-env.d.ts` generato automaticamente da Next.js al primo `dev`/`build`
  e correttamente escluso da Git.

## Placeholder ancora presenti

- Homepage: solo hero, sezioni successive mancanti (marcato TODO
  HOME-001 nel codice).
- Pagine legali: non ancora create (previste come placeholder marcati
  `TODO LEGAL REVIEW` in LEGAL-001).

## Dati o credenziali ancora necessari dal proprietario

- Scelta provider database (es. Supabase) e relativa `DATABASE_URL`.
- Scelta provider e-mail transazionale e relativa API key.
- Scelta provider storage per allegati foto.
- Contatti reali (e-mail, telefono, orari, indirizzo se pubblicabile).
- Testi legali approvati (Datenschutz, Impressum, Vermittlungsbedingungen).
- ID Google Tag Manager quando si arriva alla Fase 5.

## Prossime attività consigliate (max 5)

1. FOUND-006 — Creare struttura rotte placeholder per tutte le pagine
2. LAYOUT-001 — Header e footer accessibili
3. FORM-001 — Schema dati lead condiviso (`lib/lead-schema.ts`, Zod)
4. API-001 — Endpoint `/api/leads` con validazione server-side
5. HOME-001 — Completare le sezioni homepage 8.1–8.9
