# Session Handoff

Updated: 2026-07-18 17:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: nessuno impostato `in_progress`.
Status: la sessione precedente si è chiusa con WEB-005 completato (con riserva) e
senza decidere se il prossimo task sia WEB-006 (form) o WEB-022 (design system).
**La prossima sessione deve prima chiarire questo con l'utente**, poi impostare un
solo task `in_progress` prima di scrivere codice, come da regola non negoziabile.

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro di tutte le rotte MVP.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer.
- WEB-005 — CTA finale, FAQ (landing + `/de/faq`), disclaimer nel footer condiviso.
  Pagine legali pubblicate come placeholder esplicito "in Vorbereitung" + `noindex`
  (contenuto reale non disponibile, ISSUE-001 status `workaround`, blocca WEB-021).
- ADR-001 (stack) e ADR-004 (redirect root) `accepted`.
- WEB-022 (design system) registrata nel backlog, ancora `todo`.

## Remaining

- Decidere priorità WEB-006 vs WEB-022, poi proseguire con il resto del backlog
  (form, backend, notifiche, analytics/SEO, test/QA/deploy). Vedi
  `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. All'inizio della sessione, **chiedi esplicitamente all'utente** se procedere con
   WEB-006 (form step 1) o WEB-022 (design system) come prossimo task — non
   scegliere autonomamente, perché la sessione precedente si è chiusa proprio su
   questo punto irrisolto.
2. Imposta il task scelto come unico `in_progress` in `docs/IMPLEMENTATION_PLAN.md`
   prima di iniziare a scrivere codice.
3. Se WEB-006: apri il task in `docs/IMPLEMENTATION_PLAN.md` e `docs/FORM_SPEC.md`
   per i campi del passaggio 1 (postalCode, city, serviceType, dateMode,
   desiredDate/desiredPeriod, rooms, propertyEmpty, notes). Crea la sezione form
   nella landing con `id="anfrage"` (le due CTA attuali puntano già a `#anfrage`).
4. Se WEB-022: apri il task in `docs/IMPLEMENTATION_PLAN.md` per i criteri (palette,
   tipografia, componenti UI ricorrenti, rifinitura header/footer).
5. Verifica sempre `npm run lint && npm run typecheck && npm test && npm run build`
   prima di chiudere.
6. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-006 e WEB-022 con criteri completi.
- `docs/FORM_SPEC.md` — specifica completa del form (se si sceglie WEB-006).
- `docs/CONTENT.md` — tutto il copy attuale della landing, incluse FAQ.
- `docs/KNOWN_ISSUES.md` — ISSUE-001 (dati legali reali mancanti, status
  `workaround`, blocca WEB-021).
- `src/app/de/endreinigung-oberwallis/page.tsx` — pagina landing completa.
- `src/content/faq.ts` — FAQ condivise tra landing e `/de/faq`.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- ISSUE-001 (workaround attivo): non blocca lo sviluppo corrente, blocca solo
  WEB-021 (lancio produzione) finché non si ottengono i dati legali reali.

## Do not forget

- **Non scegliere autonomamente tra WEB-006 e WEB-022**: chiedere all'utente
  all'inizio della sessione.
- Le tre pagine legali sono placeholder onesti, non contenuto finale: non
  rimuovere il `noindex` finché ISSUE-001 non è risolta con dati reali.
- Il disclaimer di intermediazione è testo obbligatorio non negoziabile, ora
  presente sia nella sezione dedicata della landing sia nel footer di ogni pagina:
  non modificarne il testo.
- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
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
