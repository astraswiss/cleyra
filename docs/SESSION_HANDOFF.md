# Session Handoff

Updated: 2026-07-18 15:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-004 — Processo, servizi, zona servita, trasparenza
Status: in_progress (non ancora iniziato)

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro di tutte le rotte MVP.
- WEB-003 — Hero e tre elementi di fiducia su `/de/endreinigung-oberwallis`, testi
  esatti da `CONTENT.md`, verificato mobile a 320px. Tutti i controlli verdi.
- ADR-001 (stack) e ADR-004 (redirect root) registrate come `accepted`.

## Remaining

- WEB-004 in poi: resto della landing, form, backend, notifiche, analytics/SEO,
  test/QA/deploy. Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` e leggi il task `WEB-004` per intero.
2. In `src/app/de/endreinigung-oberwallis/page.tsx`, aggiungi dopo la sezione trust
   point: sezione processo in tre passaggi (`Anfrage ausfüllen` → `Anfrage wird
   geprüft` → `Offerte erhalten und entscheiden`, testi esatti da `CONTENT.md`),
   sezione servizi (coerente con `serviceType` del form: Endreinigung zur
   Wohnungsabgabe, Umzugsreinigung, Andere Reinigung — senza promesse di prezzo),
   sezione zona servita (menziona Visp, Brig-Glis, Naters, senza creare pagine
   dedicate per città), sezione di trasparenza con il disclaimer di intermediazione
   obbligatorio (testo esatto in `CONTENT.md`, sezione "Disclaimer di
   intermediazione").
3. Il disclaimer di intermediazione è una regola non negoziabile (vedi `CLAUDE.md`):
   non modificarne il testo.
4. Non scrivere ancora FAQ o pagine legali reali (WEB-005).
5. Verifica `npm run lint && npm run typecheck && npm test && npm run build`.
6. Segna WEB-004 `done` in `docs/IMPLEMENTATION_PLAN.md` solo se tutti i criteri sono
   verificati, e imposta WEB-005 come unico task `in_progress`.
7. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-004 con criteri di accettazione completi.
- `docs/CONTENT.md` — testi esatti di processo e disclaimer di intermediazione.
- `src/app/de/endreinigung-oberwallis/page.tsx` — pagina da estendere (Hero e trust
  point già presenti da WEB-003).

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- none

## Do not forget

- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Il redirect della root (ADR-004) è temporaneo (307): da rivalutare come permanente
  in WEB-017, non prima.
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte
  (`proposed`).
- ISSUE-001 in `docs/KNOWN_ISSUES.md`: contenuti legali reali non ancora disponibili,
  necessari prima di pubblicare WEB-005.
- Il disclaimer di intermediazione è testo obbligatorio non negoziabile: usare
  esattamente il testo in `docs/CONTENT.md`, non parafrasare.
- Il browser Chromium per Playwright è preinstallato in `/opt/pw-browsers/chromium`
  (già configurato in `playwright.config.ts`): non eseguire `npx playwright install`.
- Un solo task `in_progress` alla volta nel backlog.
- Prima di chiudere la sessione, fermare eventuali processi `next dev`/`next start`
  avviati per verifica manuale e rimuovere `.next/`, `test-results/`,
  `playwright-report/` e qualsiasi script temporaneo creato per screenshot/debug.

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero, nessun processo va lasciato in
  background tra una sessione e l'altra.
