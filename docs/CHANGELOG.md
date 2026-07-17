## 2026-07-18

### Added

- Homepage completa `/de` con tutte le sezioni 8.1–8.9 (`components/marketing/*`).
- Modulo lead multi-step funzionante (`components/lead-form/*`): schema
  Zod condiviso (`lib/lead-schema.ts`), 4 step con React Hook Form,
  persistenza sessione, riepilogo errori accessibile, honeypot,
  prevenzione doppio invio.
- Nuove primitive UI: `Input`, `Select`, `Checkbox`, `RadioGroup`,
  `Textarea`, `ProgressBar`, `Alert`, `Accordion`.
- Endpoint `/api/leads` reale: validazione, rate limiting, honeypot
  server-side, normalizzazione/sanitizzazione, log senza PII
  (`lib/{rate-limit,sanitize,lead-id}.ts`).
- `lib/attribution.ts` per la cattura UTM/click-id di prima sessione.
- Vitest con 21 unit test per lo schema lead; Playwright come
  devDependency per verifiche e2e manuali.

### Changed

- `app/de/page.tsx` da placeholder a homepage completa.
- `app/api/leads/route.ts` da stub 501 a endpoint funzionante (con
  persistenza ancora solo in memoria, non un database reale).
- `docs/IMPLEMENTATION_PLAN.md`, `docs/PROJECT_STATUS.md`,
  `docs/ARCHITECTURE.md` aggiornati allo stato reale.

### Fixed

- N/D

### Removed

- N/D

### Verification

- `npm run build`, `npm run lint`, `npx vitest run` (21/21) verdi
- Verifica manuale `curl` su `/api/leads`: successo, validazione, rate
  limit (429 alla 6ª richiesta), honeypot
- Verifica e2e manuale con Playwright headless: flusso completo del
  modulo dalla homepage al redirect `/de/danke`, inclusa la
  preservazione dei dati nella navigazione indietro e la visualizzazione
  del riepilogo errori quando manca il consenso privacy

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
