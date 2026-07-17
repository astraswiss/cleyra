## 2026-07-17 (2)

### Added

- Struttura rotte completa: tutte le 14 pagine `/de/*` previste dalla
  spec sezione 5 come placeholder, più stub `app/api/leads/route.ts`
  (501, non implementato).
- Componenti layout: `Header`, `MobileMenu` (client, accessibile),
  `Footer`, `Container`; componente `ui/Button` polimorfo.
- `lib/locations.ts` con modello `LocationLanding` e dati per Visp,
  Brig-Glis, Naters.
- Skip link "Zum Hauptinhalt springen" nel layout `/de`.

### Changed

- `app/de/layout.tsx` ora monta Header e Footer per tutte le pagine
  tedesche.
- `app/de/page.tsx` con ancore placeholder `#leistungen`, `#regionen`,
  `#anfrage`.
- `docs/IMPLEMENTATION_PLAN.md`, `docs/PROJECT_STATUS.md`,
  `docs/ARCHITECTURE.md` aggiornati allo stato reale.

### Fixed

- N/D

### Removed

- N/D

### Verification

- `npm run build` e `npm run lint` verdi con 18 route
- Verifica manuale `curl` su tutte le rotte (200/307/501 come atteso)
- Verifica manuale meta robots `noindex, nofollow` su `/de/danke` e title
  univoco su `/de/faq`

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
