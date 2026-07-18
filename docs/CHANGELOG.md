## 2026-07-18 (5)

### Added

- Contenuto completo (10 sezioni, spec 9) per le tre landing locali
  (Visp, Brig-Glis, Naters): `components/marketing/LocationLandingPage.tsx`
  (template condiviso), `NearbyLocations.tsx` (zone vicine + link
  reciproci), `LocalFaq.tsx` (FAQ locale unica per città).
- `lib/faq-content.ts`: FAQ generali estratte e condivise tra homepage e
  landing locali.
- Prop `initialValues` su `LeadForm` per precompilare città/CAP dalle
  landing locali.
- `lib/__tests__/locations.test.ts`: 5 unit test sui dati delle landing
  (unicità slug/meta/H1/FAQ, zone vicine presenti).

### Changed

- `lib/locations.ts`: aggiunto `localFaq` a ogni landing e
  `getOtherLocationLandings()`.
- Le tre pagine `app/de/endreinigung-{visp,brig,naters}/page.tsx` usano
  ora il template condiviso invece del placeholder minimo precedente.

### Verification

- `npm run build`, `npm run lint`, `npx vitest run` (26/26) verdi.
- Verifica e2e manuale Playwright: H1, prefill città/CAP, FAQ locale e
  link incrociati (senza self-link) confermati su Visp; le altre due
  landing rispondono `200`.

## 2026-07-18 (4)

### Removed

- Annullato completamente il sistema di design introdotto in questa
  stessa giornata (palette `brand`/`clay`/`ink`, font Manrope/Inter,
  icone SVG proprietarie, card/pill/ombre), su richiesta esplicita del
  proprietario. Tutti i file di stile ripristinati allo stato precedente
  (commit `da2b64e`); `components/ui/Icon.tsx` rimosso.

### Changed

- Nessuna modifica di logica applicativa — solo styling/markup
  ripristinato ai valori di default Tailwind.

### Added

- Task di backlog `DESIGN-001` in `docs/IMPLEMENTATION_PLAN.md`
  ("Backlog design", marcato `BLOCKED`) per riprendere il lavoro sul
  design a fine progetto, su richiesta del proprietario.
- Decisione DEC-20260718-02 in `docs/DECISIONS.md` che documenta il
  rollback e supersede (senza cancellare) DEC-20260718-01.

### Verification

- `npm run build`, `npm run lint`, `npx vitest run` (21/21) verdi dopo
  il rollback.

## 2026-07-18 (3)

### Fixed

- Transizione tra la sezione CTA finale e il footer: `FinalCta` era una
  card scura arrotondata "fluttuante" con margini chiari sopra e sotto,
  seguita da un footer scuro a spigoli vivi — due forme scure disallineate
  con una sottile striscia chiara in mezzo, percepita come un taglio
  netto invece che una transizione (feedback diretto del proprietario:
  "sieht aus wie geschnitten"). Reso `FinalCta` full-bleed come
  Header/Footer, eliminato il margine prima del footer: ora CTA e footer
  formano un unico pannello scuro continuo con un solo bordo netto verso
  la pagina chiara sopra.

### Verification

- Screenshot Playwright centrato sulla transizione CTA→footer;
  `npm run build`/`lint`/`vitest` verdi.

## 2026-07-18 (2)

### Added

- Sistema di design: palette `brand`/`clay`/`ink` in
  `tailwind.config.ts`, tipografia `Manrope` + `Inter` self-hosted via
  `next/font/google`, `components/ui/Icon.tsx` (set di icone SVG inline).

### Changed

- Tutti i componenti `ui/`, `layout/`, `marketing/` e `lead-form/`
  aggiornati dalla palette Tailwind di default (slate/gray) alla nuova
  palette; card, pill, badge, ombre morbide applicate in modo coerente.
- Header reso "sticky" con sfondo sfumato; footer e sezione CTA finale
  ora in verde alpino scuro per dare un bookending visivo alla pagina.

### Fixed

- N/D

### Removed

- N/D

### Verification

- `npm run build`, `npm run lint`, `npx vitest run` (21/21) verdi
- Verifica visiva con screenshot Playwright (desktop 1440px e mobile
  375px): hero, service list, region pills, form card, CTA finale e
  footer controllati prima di considerare il lavoro concluso

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
