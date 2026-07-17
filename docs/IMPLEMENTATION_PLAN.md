# Implementation plan — Cleyra

Piano eseguibile derivato da `CLEYRA_WEBSITE_SPEC.md` sezione 29.

## Fase 0 — Memoria e orientamento

- [x] FOUND-001 Ispezionare repository e stato Git
  - Dipendenze: nessuna
  - File previsti: nessuno
  - Criteri di accettazione: stato Git noto (repo vuoto, branch `claude/new-session-huwuyt`)
  - Test richiesti: nessuno
- [x] FOUND-002 Creare `CLAUDE.md`
  - Dipendenze: FOUND-001
  - File previsti: `CLAUDE.md`
  - Criteri di accettazione: contiene scopo, scope, lingua/mercato, documenti canonici, stack, comandi, convenzioni, regole privacy, procedura inizio/fine sessione
  - Test richiesti: nessuno
- [x] FOUND-003 Creare directory `docs/` e i file di continuità
  - Dipendenze: FOUND-002
  - File previsti: `docs/PROJECT_OVERVIEW.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/PROJECT_STATUS.md`, `docs/DECISIONS.md`, `docs/SESSION_HANDOFF.md`, `docs/CHANGELOG.md`
  - Criteri di accettazione: ogni file contiene le sezioni minime richieste dalla spec sezione 0
  - Test richiesti: nessuno
- [ ] FOUND-004 Aggiornare `README.md` per lo sviluppo locale
  - Dipendenze: FOUND-005 (scaffold)
  - File previsti: `README.md`
  - Criteri di accettazione: uno sviluppatore nuovo può avviare il progetto senza chiedere informazioni aggiuntive
  - Test richiesti: `npm install && npm run dev` funzionante

## Fase 1 — Fondazioni

- [ ] FOUND-005 Scaffold Next.js (App Router, TypeScript strict, Tailwind)
  - Dipendenze: FOUND-003
  - File previsti: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `app/page.tsx`, `app/de/layout.tsx`, `app/de/page.tsx`, `lib/site-config.ts`, `.env.example`, `.gitignore`
  - Criteri di accettazione: `npm run build` e `npm run typecheck` passano; `/` reindirizza a `/de`
  - Test richiesti: build manuale verificata in questa sessione
- [ ] FOUND-006 Struttura rotte completa (placeholder)
  - Dipendenze: FOUND-005
  - File previsti: cartelle sotto `app/de/*` per tutte le rotte della spec sezione 5
  - Criteri di accettazione: tutte le rotte previste rispondono (anche come placeholder), nessun 404 involontario
  - Test richiesti: navigazione manuale
- [ ] LAYOUT-001 Header, footer, componenti UI di base
  - Dipendenze: FOUND-005
  - File previsti: `components/layout/*`, `components/ui/*`
  - Criteri di accettazione: header/footer conformi a spec sezioni 7 e 17, accessibili da tastiera
  - Test richiesti: component test navigazione menu mobile

## Fase 2 — Pagine marketing

- [ ] HOME-001 Homepage completa `/de` (sezioni 8.1–8.9)
  - Dipendenze: LAYOUT-001
  - File previsti: `app/de/page.tsx`, `components/marketing/*`
  - Criteri di accettazione: tutte le sezioni della spec presenti nell'ordine indicato, copy esatto
  - Test richiesti: e2e caricamento homepage
- [ ] LOCAL-001 Template landing locale + dati struttura `LocationLanding`
  - Dipendenze: HOME-001
  - File previsti: `lib/locations.ts`, `components/marketing/*`
  - Criteri di accettazione: nessuna pagina duplicata, ogni landing ha H1/intro/FAQ locale unici
  - Test richiesti: unit test dati location
- [ ] LOCAL-002 Landing Visp — [ ] LOCAL-003 Brig-Glis — [ ] LOCAL-004 Naters
  - Dipendenze: LOCAL-001
  - Criteri di accettazione: contenuto locale unico per ciascuna, meta title/description unici
- [ ] INFO-001 `/de/so-funktionierts`, `/de/faq`, `/de/ueber-cleyra`, `/de/kontakt`
  - Dipendenze: LAYOUT-001
  - Criteri di accettazione: copy conforme a spec sezione 16, nessun dato aziendale inventato
- [ ] LEGAL-001 Placeholder pagine legali (Datenschutz, Impressum, Vermittlungsbedingungen)
  - Dipendenze: LAYOUT-001
  - Criteri di accettazione: marcate `TODO LEGAL REVIEW`; pubblicazione bloccata finché non sostituite

## Fase 3 — Modulo lead

- [ ] FORM-001 Schema dati (`lib/lead-schema.ts`, Zod, `CleaningLead`)
  - Dipendenze: FOUND-005
  - Criteri di accettazione: schema condiviso client/server, copre tutti i campi spec sezione 11
  - Test richiesti: unit test validazione (CAP, date, rooms 1–20, approxSqm 10–2000)
- [ ] FORM-002 Stato multi-step + persistenza sessione
- [ ] FORM-003 `StepLocationService.tsx`
- [ ] FORM-004 `StepProperty.tsx`
- [ ] FORM-005 `StepExtras.tsx` + `PhotoUploader.tsx`
- [ ] FORM-006 `StepContact.tsx` + consensi
- [ ] FORM-007 Gestione errori, loading, prevenzione doppio invio
  - File previsti: `components/lead-form/*`
  - Criteri di accettazione: usabile a 320px, navigabile da tastiera, focus sul primo errore
  - Test richiesti: component test per ciascun passaggio + navigazione avanti/indietro

## Fase 4 — Backend minimo

- [ ] API-001 Endpoint `/api/leads` (validazione, sanitizzazione, risposta)
- [ ] API-002 Collegamento database (decisione provider richiesta — vedi DECISIONS.md)
- [ ] API-003 Storage privato allegati + URL firmati
- [ ] API-004 Antispam (honeypot, rate limit)
- [ ] API-005 E-mail conferma utente + notifica interna (provider da decidere)
- [ ] API-006 Pagina `/de/danke` + idempotenza evento `lead_submitted`
  - Criteri di accettazione: lead salvato prima dell'invio e-mail; nessun dato personale nell'URL; evento emesso una sola volta

## Fase 5 — SEO e analytics

- [ ] SEO-001 Metadata, canonical, sitemap, robots
- [ ] SEO-002 JSON-LD (Organization/LocalBusiness, WebSite, BreadcrumbList, FAQPage dove applicabile)
- [ ] TRACK-001 GTM + dataLayer eventi (sezione 19)
- [ ] TRACK-002 Persistenza attribution (UTM/GCLID/GBRAID/WBRAID)
- [ ] CONSENT-001 Consent Management Platform (sezione 20)

## Fase 6 — Qualità

- [ ] QA-001 Test automatici (unit/component/integration)
- [ ] QA-002 Test e2e (Playwright, scenari sezione 27)
- [ ] QA-003 Audit accessibilità (WCAG 2.2 AA)
- [ ] QA-004 Audit performance (Lighthouse, Core Web Vitals)
- [ ] QA-005 Controlli manuali pre-lancio (sezione 28)
- [ ] QA-006 Controllo legale (sostituzione placeholder legali)

## Next recommended tasks

1. FOUND-004 — Aggiornare `README.md` dopo lo scaffold (in corso in questa sessione)
2. FOUND-006 — Creare struttura rotte placeholder per tutte le pagine
3. LAYOUT-001 — Header e footer
4. FORM-001 — Schema dati lead condiviso
5. API-001 — Endpoint `/api/leads` con validazione server-side
