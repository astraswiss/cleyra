# Project Status

Last updated: 2026-07-18 14:00 Europe/Zurich
Current phase: Fase 2 — landing
Current branch: claude/new-session-lun8ys
Current task: WEB-003 — Header, Hero, elementi di fiducia
Overall state: in progress

## Completed
- WEB-000 — Memoria di progetto.
- WEB-001 — Setup dello stack tecnico (Next.js 16, TypeScript strict, Tailwind v4,
  ESLint, Vitest, Playwright).
- WEB-002 — Environment validation (`src/lib/env.ts`, Zod) e scheletro di tutte le
  rotte MVP (`/de/...`) con layout condiviso e `/de/danke` `noindex`. Root `/`
  reindirizzata a `/de/endreinigung-oberwallis` (ADR-004).
- Backlog completo (WEB-000..WEB-021) registrato in `IMPLEMENTATION_PLAN.md`.
- ADR-001 (stack tecnico) e ADR-004 (redirect root) registrate come `accepted`.

## In progress
- WEB-003 — Header, Hero, elementi di fiducia della landing (non ancora iniziato).

## Next three tasks
1. WEB-003 — Header, Hero, elementi di fiducia.
2. WEB-004 — Processo, servizi, zona servita, trasparenza.
3. WEB-005 — FAQ, footer, pagine legali.

## Blockers
- none

## Test status
- lint: verde (`npm run lint`)
- typecheck: verde (`npm run typecheck`)
- tests: verde (`npm test` — 2/2 unit test; `npx playwright test` — 1/1 e2e)
- build: verde (`npm run build` — 9 rotte `/de/*` generate come contenuto statico)

## Deployment
- Nessun ambiente configurato. Vedi `docs/DEPLOYMENT.md`.
