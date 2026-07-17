## 2026-07-17

### Added

- File di continuità del progetto: `CLAUDE.md`, `docs/PROJECT_OVERVIEW.md`,
  `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`,
  `docs/PROJECT_STATUS.md`, `docs/DECISIONS.md`, `docs/SESSION_HANDOFF.md`,
  `docs/CHANGELOG.md`.
- `CLEYRA_WEBSITE_SPEC.md` copiata nel repository come fonte di autorità.
- Scaffold iniziale Next.js 14 (App Router) + TypeScript strict +
  Tailwind CSS: configurazione progetto, rotta `/` → `/de` (redirect),
  homepage placeholder `/de` con hero e dichiarazione di intermediazione,
  `lib/site-config.ts`.
- `README.md` con istruzioni di avvio sviluppatore, `.env.example` con
  variabili documentate.

### Changed

- Nessuna modifica a codice preesistente (repository era vuoto).

### Fixed

- N/D

### Removed

- N/D

### Verification

- `npm run build` — successo (build, typecheck, lint inclusi)
- `npm run lint` — nessun errore/warning
- Verifica manuale `curl` su `/` e `/de` — comportamento atteso
