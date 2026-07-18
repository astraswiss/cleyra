# Project Status

Last updated: 2026-07-18 15:00 Europe/Zurich
Current phase: Fase 2 — landing
Current branch: claude/new-session-lun8ys
Current task: WEB-004 — Processo, servizi, zona servita, trasparenza
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto.
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro rotte (tutte le 9 rotte `/de/...`,
  redirect root, `/de/danke` noindex).
- WEB-003 — Hero e tre elementi di fiducia su `/de/endreinigung-oberwallis` con i
  testi esatti da `CONTENT.md`. Header/footer condivisi già presenti da WEB-002.
  Verificato mobile a 320px.
- Backlog completo (WEB-000..WEB-021) registrato in `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack tecnico) e ADR-004 (redirect root) registrate come `accepted`.

## In progress
- WEB-004 — Processo, servizi, zona servita, trasparenza (non ancora iniziato).

## Next three tasks
1. WEB-004 — Processo, servizi, zona servita, trasparenza.
2. WEB-005 — FAQ, footer, pagine legali.
3. WEB-006 — Form step 1 (richiesta) — UI e validazione client.

## Blockers
- none

## Test status
- lint: verde (`npm run lint`)
- typecheck: verde (`npm run typecheck`)
- tests: verde (`npm test` — 2/2 unit test; `npx playwright test` — 1/1 e2e)
- build: verde (`npm run build` — 9 rotte `/de/*` generate come contenuto statico)

## Deployment
- Nessun ambiente configurato. Vedi `docs/DEPLOYMENT.md`.
