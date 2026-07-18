# Session Handoff

Updated: 2026-07-18 19:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-007 — Form step 2 (contatti) — UI, consenso e validazione client
Status: in_progress (non ancora iniziato)

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro di tutte le rotte MVP.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer.
- WEB-005 — CTA finale, FAQ, footer con disclaimer. Pagine legali placeholder
  esplicito + noindex (ISSUE-001, status `workaround`, blocca WEB-021).
- WEB-022 — Design system: palette (`brand` `#0f766e`), tipografia, componenti
  `Section`/`PrimaryButton`/`Card`, header/footer rifiniti.
- WEB-006 — Form step 1 completo: tutti i campi, validazione client Zod
  (`src/lib/validation/requestStep1.ts`), logica condizionale `dateMode`, campi
  tecnici nascosti catturati, accessibilità di base, 8 test unitari. Il passaggio 2
  è per ora solo un segnaposto in `src/components/RequestForm.tsx`.
- ADR-001 (stack) e ADR-004 (redirect root) `accepted`.

## Remaining

- WEB-007 in poi: passaggio 2 reale del form, stati/errori/accessibilità completa
  (WEB-008), backend (WEB-009..WEB-012), notifiche, analytics/SEO, test/QA/deploy.
  Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` (task WEB-007) e `docs/FORM_SPEC.md` (sezione
   "Passaggio 2 — contatti") per i campi esatti: `fullName`, `phone`, `email`,
   `preferredContact` (facoltativo), `privacyConsent` (checkbox obbligatoria, testo
   esatto in `docs/CONTENT.md`).
2. In `src/components/RequestForm.tsx`, sostituisci il segnaposto dello step 2
   (attualmente un `<div>` con solo un link "Zurück zu Schritt 1") con i campi
   reali, seguendo lo stesso pattern del passaggio 1 (stesso stile di label/errori,
   componenti del design system).
3. Valuta se estendere lo schema Zod in un nuovo file
   `src/lib/validation/requestStep2.ts` (pattern analogo a `requestStep1.ts`) per
   telefono/email/consenso, riusabile poi da WEB-009 per la validazione server.
4. Il pulsante finale deve avere il testo esatto `Kostenlose Anfrage senden` (non
   ancora un invio reale al server: quello è WEB-009).
5. Verifica `npm run lint && npm run typecheck && npm test && npm run build`, oltre
   a `npx playwright test`.
6. Segna WEB-007 `done` solo se tutti i criteri sono verificati, e imposta WEB-008
   come prossimo `in_progress`.
7. Aggiorna `docs/PROJECT_STATUS.md`, `docs/FORM_SPEC.md` (se emergono nuovi
   messaggi di errore, come fatto in WEB-006), aggiungi una voce a
   `docs/SESSION_LOG.md` e riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-007 con criteri completi.
- `docs/FORM_SPEC.md` — specifica passaggio 2 + pattern di documentazione errori
  già usato per il passaggio 1.
- `docs/CONTENT.md` — testo esatto della checkbox di consenso privacy.
- `src/components/RequestForm.tsx` — componente da estendere (segnaposto step 2 da
  sostituire).
- `src/lib/validation/requestStep1.ts` — pattern di riferimento per lo schema Zod
  del passaggio 2.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- ISSUE-001 (workaround attivo): non blocca WEB-007, blocca solo WEB-021.

## Do not forget

- La checkbox di consenso privacy non deve essere preselezionata.
- Non implementare ancora l'invio al server (WEB-009): solo UI, stato locale e
  validazione client.
- Usa i componenti/token del design system (`PrimaryButton`, colore `brand`/`error`)
  invece di stili ad-hoc.
- Il pattern di validazione con Zod + normalizzazione errori in tedesco fisso
  (vedi `requestStep1.ts`) va replicato per coerenza, non reinventato.
- Le tre pagine legali restano placeholder onesti (`noindex`).
- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Il browser Chromium per Playwright è preinstallato in `/opt/pw-browsers/chromium`:
  non eseguire `npx playwright install`.
- Un solo task `in_progress` alla volta nel backlog.
- Prima di chiudere la sessione, fermare eventuali processi `next dev`/`next start`
  e rimuovere `.next/`, `test-results/`, `playwright-report/` e script temporanei.

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero, nessun processo va lasciato in
  background tra una sessione e l'altra.
