# Project Status

Last updated: 2026-07-18 17:00 Europe/Zurich
Current phase: Fase 2 — landing (contenuti completi, con riserva legale)
Current branch: claude/new-session-lun8ys
Current task: nessuno — in attesa di indicazione su WEB-006 (form) vs WEB-022 (design)
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto.
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro rotte.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer.
- WEB-005 — CTA finale, FAQ (su landing e `/de/faq`), disclaimer nel footer
  condiviso. Pagine legali pubblicate come placeholder esplicito "in Vorbereitung"
  con `noindex` (contenuto reale non disponibile — decisione utente 2026-07-18, vedi
  ISSUE-001, status `workaround`, blocca WEB-021).
- Backlog completo (WEB-000..WEB-021 + WEB-022) registrato in
  `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack) e ADR-004 (redirect root) `accepted`.

## In progress
- Nessun task `in_progress`: sessione conclusa in attesa di priorità tra WEB-006
  (form) e WEB-022 (design system).

## Next three tasks
1. WEB-006 — Form step 1 (richiesta) — UI e validazione client — oppure —
   WEB-022 — Design system: stile, layout e identità visiva (priorità da definire
   con l'utente all'inizio della prossima sessione).
2. (di conseguenza) l'altro tra i due sopra.
3. WEB-021 — richiede dati legali reali per sbloccare ISSUE-001 prima del lancio.

## Blockers
- ISSUE-001 (severity medium, status `workaround`): contenuto legale reale
  (Impressum/Datenschutz/Vermittlungsbedingungen) non disponibile. Non blocca lo
  sviluppo corrente ma blocca il lancio in produzione (WEB-021).

## Test status
- lint: verde (`npm run lint`)
- typecheck: verde (`npm run typecheck`)
- tests: verde (`npm test` — 2/2 unit test; `npx playwright test` — 1/1 e2e)
- build: verde (`npm run build` — 9 rotte `/de/*` generate come contenuto statico)

## Deployment
- Nessun ambiente configurato. Vedi `docs/DEPLOYMENT.md`.
