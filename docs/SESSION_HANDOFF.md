# Session Handoff

Updated: 2026-07-18 16:00 Europe/Zurich

## Current objective

Costruire il sito Cleyra MVP (landing tedesca + form di richiesta in due passaggi per
`Endreinigung im Oberwallis`) seguendo `CLEYRA_WEBSITE_SPEC.md`, senza uscire dallo
scope definito (niente login, dashboard, pagamenti, marketplace, francese, preventivo
automatico).

## Current task

Task ID: WEB-005 — FAQ, footer, pagine legali
Status: in_progress (non ancora iniziato)

## Completed

- WEB-000 — Memoria di progetto (Fase 0).
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro di tutte le rotte MVP.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer di
  intermediazione su `/de/endreinigung-oberwallis`. Tutti i controlli verdi.
- ADR-001 (stack) e ADR-004 (redirect root) registrate come `accepted`.
- **Nuovo task registrato su richiesta esplicita dell'utente: WEB-022 — Design
  system (stile, layout, identità visiva)**, todo, dipende da WEB-005. Il sito è
  ancora visivamente "grezzo" (solo Tailwind neutro di default): questo va
  affrontato come task dedicato dopo che i contenuti della landing sono stabili, e
  comunque prima della QA finale (WEB-020). Non dimenticarlo nella pianificazione.

## Remaining

- WEB-005 in poi: footer/legal reali, poi WEB-022 (design), form, backend,
  notifiche, analytics/SEO, test/QA/deploy. Vedi `docs/IMPLEMENTATION_PLAN.md`.

## Exact next action

1. Apri `docs/IMPLEMENTATION_PLAN.md` e leggi il task `WEB-005` per intero (Goal e
   Acceptance criteria aggiornati: include ora anche la CTA finale).
2. Aggiungi la CTA finale su `/de/endreinigung-oberwallis` (stesso testo della CTA
   hero, `Kostenlose Anfrage starten`, testo già in `docs/CONTENT.md`).
3. Implementa la sezione FAQ (nessun testo letterale in `CONTENT.md` per le domande:
   da scrivere in questa sessione rispettando i vincoli — nessun dato inventato —
   e da aggiungere a `CONTENT.md` come fatto in WEB-004).
4. Aggiungi il disclaimer di intermediazione al footer condiviso
   (`src/app/de/layout.tsx`), oltre ai link legali già presenti.
5. Scrivi contenuto reale per `/de/datenschutz`, `/de/impressum`,
   `/de/vermittlungsbedingungen`. **Attenzione a ISSUE-001** in
   `docs/KNOWN_ISSUES.md`: i dati reali dell'organizzazione (ragione sociale,
   indirizzo, contatti) non erano disponibili all'inizio del progetto — verificare
   se nel frattempo sono stati forniti; altrimenti non inventarli e mantenere
   l'issue aperta, eventualmente pubblicando un contenuto minimo corretto ma
   incompleto e segnalandolo chiaramente.
6. Verifica `npm run lint && npm run typecheck && npm test && npm run build`.
7. Segna WEB-005 `done` solo se tutti i criteri sono verificati, e imposta WEB-022
   come prossimo task `in_progress` (design system) — salvo diversa indicazione
   dell'utente sulla priorità rispetto a WEB-006 (form).
8. Aggiorna `docs/PROJECT_STATUS.md`, aggiungi una voce a `docs/SESSION_LOG.md` e
   riscrivi questo file (`SESSION_HANDOFF.md`).

## Relevant files

- `docs/IMPLEMENTATION_PLAN.md` — task WEB-005 e WEB-022 con criteri completi.
- `docs/CONTENT.md` — testi esistenti (Hero, trust, processo, servizi, zona,
  trasparenza, CTA finale); FAQ e legal ancora da scrivere.
- `docs/KNOWN_ISSUES.md` — ISSUE-001 (dati legali reali mancanti).
- `src/app/de/layout.tsx` — footer condiviso da estendere col disclaimer.
- `src/app/de/{datenschutz,impressum,vermittlungsbedingungen,faq}/page.tsx` —
  pagine da completare.

## Commands to run first

- `git status`
- `git log --oneline -5`

## Blockers

- none (ma vedi ISSUE-001 per i contenuti legali)

## Do not forget

- **WEB-022 (design system) è stato registrato ma non ancora pianificato in
  dettaglio**: non lasciarlo cadere nel backlog. Rivalutare con l'utente quando
  eseguirlo rispetto a WEB-006 (form).
- Non cambiare lo stack deciso in ADR-001 senza registrare una nuova decisione.
- Il redirect della root (ADR-004) è temporaneo (307): da rivalutare in WEB-017.
- ADR-002 (provider e-mail) e ADR-003 (strumento analytics) sono ancora aperte.
- ISSUE-001: contenuti legali reali non ancora disponibili, necessari per WEB-005.
- Il disclaimer di intermediazione è testo obbligatorio non negoziabile: usare
  esattamente il testo in `docs/CONTENT.md`.
- Il browser Chromium per Playwright è preinstallato in `/opt/pw-browsers/chromium`:
  non eseguire `npx playwright install`.
- Un solo task `in_progress` alla volta nel backlog.
- Prima di chiudere la sessione, fermare eventuali processi `next dev`/`next start`
  e rimuovere `.next/`, `test-results/`, `playwright-report/` e script temporanei di
  screenshot/debug.

## Working assumptions

- Contatto di riferimento del progetto: fatbardh_berisha@icloud.com.
- Ambiente di esecuzione: container effimero, nessun processo va lasciato in
  background tra una sessione e l'altra.
