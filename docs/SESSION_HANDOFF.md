# Session Handoff

Updated: 2026-07-18 14:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-003 — Header, Hero, elementi di fiducia
Status: in_progress (non ancora iniziato)

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico (Next.js 16, TypeScript strict, Tailwind v4,
  ESLint, Vitest, Playwright). Tutti i controlli verdi.
- WEB-002 — Environment validation (`src/lib/env.ts`) e scheletro di tutte le 9 rotte
  MVP sotto `src/app/de/...`, con layout condiviso (`src/app/de/layout.tsx`) e
  `/de/danke` marcata `noindex`. Root `/` reindirizzata a
  `/de/endreinigung-oberwallis` (ADR-004). Tutti i controlli verdi, incluso
  Playwright.
- ADR-001 (stack) e ADR-004 (redirect root) registrate come `accepted`.

## Remaining

- WEB-003 in poi: contenuti reali della landing, form, backend, notifiche,
  analytics/SEO, test/QA/deploy. Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` e leggi il task `WEB-003` per intero, insieme a
   `docs/CONTENT.md` (sezioni Hero e Tre elementi di fiducia) per i testi esatti.
2. In `src/app/de/endreinigung-oberwallis/page.tsx`, sostituisci il placeholder con:
   header (già presente nel layout `de`, eventualmente da rifinire), sezione Hero
   (H1, sottotitolo, CTA, microcopy — testi esatti da `CONTENT.md`), tre elementi di
   fiducia (Kostenlose Anfrage / Offerte vor Auftrag / Regionale Vermittlung).
3. Non aggiungere ancora il form (quello è WEB-006/WEB-007): la CTA "Kostenlose
   Anfrage starten" può essere per ora un link/ancora placeholder senza funzionalità
   di submit.
4. Rispetta mobile-first e usabilità a 320px; nessun elemento vietato (recensioni,
   contatori, timer, urgenza finta — vedi `CLEYRA_WEBSITE_SPEC.md` sezione 6).
5. Verifica `npm run lint && npm run typecheck && npm test && npm run build`.
6. Aggiorna eventuali componenti condivisi in `docs/ARCHITECTURE.md` se ne crei
   (es. `src/components/`).
7. Segna WEB-003 `done` in `docs/IMPLEMENTATION_PLAN.md` solo se tutti i criteri sono
   verificati, e imposta WEB-004 come unico task `in_progress`.
8. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-003 con criteri di accettazione completi.
- `docs/CONTENT.md` — testi esatti di Hero e trust point.
- `src/app/de/endreinigung-oberwallis/page.tsx` — pagina da completare.
- `src/app/de/layout.tsx` — header/footer condivisi, eventualmente da rifinire insieme
  a WEB-003/WEB-005.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- none

## Do not forget

- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Il redirect della root (ADR-004) è temporaneo (307): da rivalutare come permanente
  in WEB-017 (SEO), non prima.
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte
  (`proposed`).
- ISSUE-001 in `docs/KNOWN_ISSUES.md`: contenuti legali reali non ancora disponibili,
  necessari prima di pubblicare WEB-005.
- Il browser Chromium per Playwright è preinstallato in `/opt/pw-browsers/chromium`
  (già configurato in `playwright.config.ts` via `executablePath`): non eseguire
  `npx playwright install`.
- Un solo task `in_progress` alla volta nel backlog.
- Prima di chiudere la sessione, fermare eventuali processi `next dev` avviati per
  verifica manuale e rimuovere `.next/`, `test-results/`, `playwright-report/` se
  generati (già in `.gitignore`, ma evitare di lasciarli come file sporchi non
  tracciati).

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero, nessun processo va lasciato in
  background tra una sessione e l'altra.
