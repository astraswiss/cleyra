# Session Handoff

Updated: 2026-07-18 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-001 — Setup dello stack tecnico
Status: in_progress (non ancora iniziato: il repository non contiene ancora codice
applicativo, solo la memoria di progetto creata in WEB-000)

## Completed

- WEB-000 — Memoria di progetto (Fase 0): tutti i file obbligatori creati e
  inizializzati (`CLAUDE.md`, `README.md`, `CLEYRA_WEBSITE_SPEC.md`, tutti i file in
  `docs/`).
- Backlog completo (WEB-000..WEB-021) registrato in `docs/IMPLEMENTATION_PLAN.md`,
  coerente con le 7 fasi di implementazione della spec.
- ADR-001 (stack tecnico) registrata come `accepted` in `docs/DECISIONS.md`.

## Remaining

- Tutto il resto del prodotto: fondazioni tecniche (WEB-001, WEB-002), landing
  (WEB-003..WEB-005), form (WEB-006..WEB-008), backend (WEB-009..WEB-012), notifiche
  (WEB-013..WEB-015), analytics/SEO (WEB-016, WEB-017), test/QA/deploy
  (WEB-018..WEB-021). Vedi `docs/IMPLEMENTATION_PLAN.md` per i dettagli di ciascun task.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` e leggi il task `WEB-001` per intero.
2. Inizializza un progetto Next.js con App Router e TypeScript strict nella root del
   repository (il repository non contiene ancora codice, solo la documentazione).
3. Configura Tailwind CSS, ESLint, Vitest (con un test di esempio verde) e Playwright
   (con uno smoke test di esempio).
4. Aggiungi gli script `lint`, `typecheck`, `test`, `build` a `package.json`.
5. Verifica che `npm run dev` avvii il progetto senza errori e che
   `npm run lint && npm run typecheck && npm test && npm run build` passino tutti.
6. Aggiorna `docs/ARCHITECTURE.md` con la struttura cartelle reale (non solo il target
   descritto) se diverge da quanto già scritto.
7. Segna WEB-001 `done` in `docs/IMPLEMENTATION_PLAN.md` solo se tutti i criteri di
   accettazione sono verificati, e imposta WEB-002 come unico task `in_progress`.
8. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `CLEYRA_WEBSITE_SPEC.md` — specifica master (sezione 4 per lo stack, sezione 16 per
  la sequenza di implementazione).
- `docs/IMPLEMENTATION_PLAN.md` — task WEB-001 con criteri di accettazione completi.
- `docs/ARCHITECTURE.md` — struttura cartelle target da confermare/correggere.
- `docs/DECISIONS.md` — ADR-001 (stack accettato).

## Commands to run first

- `git status`
- `git log --oneline -5` (probabilmente vuoto o con solo il commit di questa sessione)

## Blockers

- none

## Do not forget

- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Non implementare ancora landing, form o backend in WEB-001: solo fondazioni di
  progetto (WEB-002 in poi si occupa delle rotte).
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte
  (`proposed`): non bloccano WEB-001/WEB-002, ma vanno chiuse rispettivamente prima di
  WEB-013 e WEB-016.
- ISSUE-001 in `docs/KNOWN_ISSUES.md`: i contenuti legali reali
  (Impressum/Datenschutz/Vermittlungsbedingungen) non sono ancora disponibili e sono
  necessari prima di pubblicare WEB-005.
- Un solo task `in_progress` alla volta nel backlog.

## Working assumptions

- Il repository era completamente vuoto (nessun commit) all'inizio di questa sessione:
  non esiste uno stack preesistente da rispettare, quindi si applica il default della
  spec (sezione 4), come registrato in ADR-001.
- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
