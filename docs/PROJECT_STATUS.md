# Project Status

Last updated: 2026-07-18 16:00 Europe/Zurich
Current phase: Fase 2 — landing
Current branch: claude/new-session-lun8ys
Current task: WEB-005 — FAQ, footer, pagine legali
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto.
- WEB-001 — Setup dello stack tecnico.
- WEB-002 — Environment validation e scheletro rotte.
- WEB-003 — Hero e tre elementi di fiducia.
- WEB-004 — Problema/soluzione, processo in tre passaggi, servizi, zona servita,
  disclaimer di intermediazione, tutti su `/de/endreinigung-oberwallis`. Copy nuovo
  aggiunto anche a `CONTENT.md`. Verificato mobile a 320px.
- Backlog completo (WEB-000..WEB-021 + WEB-022) registrato in
  `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack tecnico) e ADR-004 (redirect root) registrate come `accepted`.

## In progress
- WEB-005 — FAQ, footer, pagine legali (non ancora iniziato).

## Next three tasks
1. WEB-005 — FAQ, footer, pagine legali.
2. WEB-022 — Design system: stile, layout e identità visiva (task trasversale,
   aggiunto su richiesta esplicita — l'intero sito è ancora visivamente "grezzo",
   solo utility Tailwind di base, nessuna identità visiva/brand definita).
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
