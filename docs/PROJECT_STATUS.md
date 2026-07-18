# Project Status

Last updated: 2026-07-18 13:00 Europe/Zurich
Current phase: Fase 1 — fondazioni
Current branch: claude/new-session-lun8ys
Current task: WEB-002 — Environment validation e scheletro rotte
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto: `CLAUDE.md`, `README.md`, `CLEYRA_WEBSITE_SPEC.md` e
  tutti i file di `docs/` creati e inizializzati.
- WEB-001 — Setup dello stack tecnico: Next.js 16 (App Router) + TypeScript strict +
  Tailwind CSS v4 + ESLint + Vitest (con test di esempio) + Playwright (con smoke test
  di esempio) inizializzati e verificati (lint, typecheck, test, build tutti verdi).
- Backlog completo (WEB-000..WEB-021) registrato in `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack tecnico) registrata come `accepted`.

## In progress
- WEB-002 — Environment validation e scheletro rotte (non ancora iniziato).

## Next three tasks
1. WEB-002 — Environment validation e scheletro rotte.
2. WEB-003 — Header, Hero, elementi di fiducia della landing.
3. WEB-004 — Processo, servizi, zona servita, trasparenza.

## Blockers
- none

## Test status
- lint: verde (`npm run lint`)
- typecheck: verde (`npm run typecheck`)
- tests: verde (`npm test` — 1/1 unit test; `npx playwright test` — 1/1 e2e smoke test)
- build: verde (`npm run build`)

## Deployment
- Nessun ambiente configurato. Vedi `docs/DEPLOYMENT.md`.
