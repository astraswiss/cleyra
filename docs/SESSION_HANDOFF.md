# Session Handoff

Updated: 2026-07-18 18:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-006 — Form step 1 (richiesta) — UI e validazione client
Status: da impostare `in_progress` all'inizio della prossima sessione (non ancora
iniziato).

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro di tutte le rotte MVP.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer.
- WEB-005 — CTA finale, FAQ, footer con disclaimer. Pagine legali placeholder
  esplicito + noindex (ISSUE-001, status `workaround`, blocca WEB-021).
- WEB-022 — Design system completo: palette (`brand` `#0f766e`), tipografia,
  componenti `Section`/`PrimaryButton`/`Card`, header/footer rifiniti. La landing
  MVP è ora sia funzionalmente che visivamente completa (fino al punto in cui manca
  ancora il form vero e proprio).
- ADR-001 (stack) e ADR-004 (redirect root) `accepted`.

## Remaining

- WEB-006 in poi: form (client + server), backend, notifiche, analytics/SEO,
  test/QA/deploy. Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Imposta WEB-006 come unico task `in_progress` in `docs/IMPLEMENTATION_PLAN.md`
   prima di iniziare a scrivere codice.
2. Apri `docs/FORM_SPEC.md` per i campi esatti del passaggio 1: `postalCode`,
   `city`, `serviceType`, `dateMode`, `desiredDate`/`desiredPeriod` (condizionali),
   `rooms`, `propertyEmpty`, `notes`.
3. Crea la sezione form sulla landing (`src/app/de/endreinigung-oberwallis/page.tsx`)
   con `id="anfrage"`: le due CTA esistenti (`PrimaryButton` in Hero e in fondo
   pagina) puntano già a `#anfrage`, quindi devono ancorarsi a un elemento reale.
4. Il form dovrà essere un componente client (gestione stato/step): valuta se
   crearlo in `src/components/` (es. `RequestForm.tsx`) seguendo lo stile del
   design system appena definito (usa `PrimaryButton`, token `brand`/`error` per
   gli stati, `Section` per il contenitore).
5. Implementa solo il passaggio 1 con validazione client (CAP 4 cifre, data non
   passata, campi obbligatori) e logica condizionale `dateMode`. Non implementare
   ancora l'invio al server (quello è WEB-009).
6. Verifica `npm run lint && npm run typecheck && npm test && npm run build`.
7. Segna WEB-006 `done` solo se tutti i criteri sono verificati, e imposta WEB-007
   come prossimo `in_progress`.
8. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-006 con criteri completi.
- `docs/FORM_SPEC.md` — specifica completa del form.
- `docs/CONTENT.md` — testi/etichette dei campi del form.
- `docs/ARCHITECTURE.md` — sezione "Design system" per palette/tipografia/componenti
  da riusare nel form.
- `src/app/de/endreinigung-oberwallis/page.tsx` — dove va agganciata la sezione form
  (`id="anfrage"`).
- `src/components/Section.tsx`, `PrimaryButton.tsx`, `Card.tsx` — componenti del
  design system da riutilizzare.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- ISSUE-001 (workaround attivo): non blocca WEB-006, blocca solo WEB-021.

## Do not forget

- Le tre pagine legali restano placeholder onesti (`noindex`): non toccarle in
  WEB-006/WEB-007 a meno che l'utente non fornisca i dati reali.
- Il disclaimer di intermediazione è testo obbligatorio non negoziabile, presente
  sia nella sezione dedicata della landing sia nel footer: non modificarne il testo.
- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Usa i componenti del design system (`Section`, `PrimaryButton`, `Card`, token
  colore `brand`/`success`/`error`) invece di introdurre nuovi stili ad-hoc, per
  restare coerenti con quanto definito in WEB-022.
- Il redirect della root (ADR-004) è temporaneo (307): da rivalutare in WEB-017.
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte.
- Il browser Chromium per Playwright è preinstallato in `/opt/pw-browsers/chromium`:
  non eseguire `npx playwright install`.
- Un solo task `in_progress` alla volta nel backlog.
- Prima di chiudere la sessione, fermare eventuali processi `next dev`/`next start`
  e rimuovere `.next/`, `test-results/`, `playwright-report/` e script temporanei.

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero, nessun processo va lasciato in
  background tra una sessione e l'altra.
