# Session Handoff

Updated: 2026-07-18 13:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-002 — Environment validation e scheletro rotte
Status: in_progress (non ancora iniziato)

## Completed

- WEB-000 — Memoria di progetto (Fase 0): tutti i file obbligatori creati e
  inizializzati.
- WEB-001 — Setup dello stack tecnico: Next.js 16 (App Router) + TypeScript strict +
  Tailwind CSS v4 + ESLint + Vitest + Playwright inizializzati e verificati. `npm run
  lint`, `npm run typecheck`, `npm test`, `npm run build` e `npx playwright test`
  tutti verdi. `npm run dev` verificato manualmente (HTTP 200 su `/`).
- ADR-001 (stack tecnico) registrata come `accepted` in `docs/DECISIONS.md`.

## Remaining

- WEB-002 in poi: rotte `/de/...`, environment validation, landing, form, backend,
  notifiche, analytics/SEO, test/QA/deploy. Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` e leggi il task `WEB-002` per intero.
2. Crea `src/lib/env.ts` con validazione tipizzata delle variabili d'ambiente (nessuna
   variabile richiesta ancora esiste concretamente: lo scopo di WEB-002 è predisporre
   il meccanismo, non popolarlo con variabili che verranno introdotte solo da
   WEB-010/WEB-013/WEB-016).
3. Crea le rotte App Router per tutte le pagine MVP sotto `src/app/de/...`:
   `endreinigung-oberwallis`, `so-funktionierts`, `faq`, `ueber-cleyra`, `kontakt`,
   `datenschutz`, `impressum`, `vermittlungsbedingungen`, `danke` — con contenuto
   placeholder minimo (non ancora i testi finali di `CONTENT.md`, quello è WEB-003+).
4. Applica un layout condiviso (header/footer placeholder) a tutte le rotte `de/`.
5. Marca `/de/danke` come `noindex` (metadata `robots`).
6. Valuta se spostare/reindirizzare la root `/` verso `/de/endreinigung-oberwallis` o
   lasciarla come landing page separata: la spec (sezione 5) non lo specifica
   esplicitamente, la root attuale è solo un placeholder da WEB-001. Se la scelta non è
   ovvia, non deciderla in silenzio: annotarla in `docs/DECISIONS.md` come ADR o
   chiedere conferma.
7. Verifica `npm run lint && npm run typecheck && npm test && npm run build`.
8. Aggiorna `docs/ARCHITECTURE.md` con la struttura cartelle/rotte reali.
9. Segna WEB-002 `done` in `docs/IMPLEMENTATION_PLAN.md` solo se tutti i criteri di
   accettazione sono verificati, e imposta WEB-003 come unico task `in_progress`.
10. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
    riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-002 con criteri di accettazione completi.
- `docs/ARCHITECTURE.md` — struttura cartelle reale dopo WEB-001, target rotte da
  realizzare.
- `CLEYRA_WEBSITE_SPEC.md` — sezione 5 (rotte MVP).
- `src/app/layout.tsx`, `src/app/page.tsx` — placeholder attuali da evolvere/spostare.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- none

## Do not forget

- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Non scrivere ancora i testi finali della landing/FAQ/legal in WEB-002: sono
  placeholder fino a WEB-003/WEB-005.
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte
  (`proposed`).
- ISSUE-001 in `docs/KNOWN_ISSUES.md`: contenuti legali reali non ancora disponibili,
  necessari prima di pubblicare WEB-005.
- Il browser Chromium per Playwright è preinstallato in
  `/opt/pw-browsers/chromium`: non eseguire `npx playwright install`, usare
  `executablePath` come già configurato in `playwright.config.ts`.
- Un solo task `in_progress` alla volta nel backlog.

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero: eventuali processi `next dev` avviati per
  verifica vanno fermati prima di chiudere la sessione (non lasciare processi in
  background).
