# Project Status

Last updated: 2026-07-18 19:00 Europe/Zurich
Current phase: Fase 3 — form
Current branch: claude/new-session-lun8ys
Current task: WEB-007 — Form step 2 (contatti)
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto.
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro rotte.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo, servizi, zona servita, disclaimer.
- WEB-005 — CTA finale, FAQ, footer con disclaimer. Pagine legali placeholder
  esplicito + noindex (ISSUE-001, status `workaround`, blocca WEB-021).
- WEB-022 — Design system: palette, tipografia, componenti `Section`/
  `PrimaryButton`/`Card`, header/footer rifiniti.
- WEB-006 — Form step 1 (richiesta): tutti i campi, validazione client (Zod),
  logica condizionale `dateMode`, campi tecnici nascosti (UTM/GCLID/referrer/
  timestamp), accessibilità di base. 8 test unitari nuovi. Passaggio 2 ancora un
  segnaposto.
- Backlog completo (WEB-000..WEB-021 + WEB-022) registrato in
  `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack) e ADR-004 (redirect root) `accepted`.

## In progress
- WEB-007 — Form step 2 (contatti) — UI, consenso e validazione client (non
  ancora iniziato).

## Next three tasks
1. WEB-007 — Form step 2 (contatti) — UI, consenso e validazione client.
2. WEB-008 — Stati del form, errori e accessibilità completa.
3. WEB-009 — Validazione server e endpoint di invio.

## Blockers
- ISSUE-001 (severity medium, status `workaround`): contenuto legale reale non
  disponibile. Non blocca lo sviluppo corrente, blocca WEB-021 (lancio produzione).

## Test status
- lint: verde (`npm run lint`)
- typecheck: verde (`npm run typecheck`)
- tests: verde (`npm test` — 10/10 unit test; `npx playwright test` — 1/1 e2e)
- build: verde (`npm run build` — 9 rotte `/de/*` generate come contenuto statico)

## Deployment
- Nessun ambiente configurato. Vedi `docs/DEPLOYMENT.md`.
