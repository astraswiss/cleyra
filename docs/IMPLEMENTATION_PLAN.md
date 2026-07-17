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
- [x] FOUND-004 Aggiornare `README.md` per lo sviluppo locale
  - Dipendenze: FOUND-005 (scaffold)
  - File previsti: `README.md`
  - Criteri di accettazione: uno sviluppatore nuovo può avviare il progetto senza chiedere informazioni aggiuntive
  - Test richiesti: `npm install && npm run dev` verificato manualmente

## Fase 1 — Fondazioni

- [x] FOUND-005 Scaffold Next.js (App Router, TypeScript strict, Tailwind)
  - Dipendenze: FOUND-003
  - File previsti: `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts`, `postcss.config.js`, `app/layout.tsx`, `app/page.tsx`, `app/de/layout.tsx`, `app/de/page.tsx`, `lib/site-config.ts`, `.env.example`, `.gitignore`
  - Criteri di accettazione: `npm run build` e `npm run typecheck` passano; `/` reindirizza a `/de`
  - Test richiesti: `npm run build`, `npm run lint` verificati verdi
- [x] FOUND-006 Struttura rotte completa (placeholder)
  - Dipendenze: FOUND-005
  - File previsti: cartelle sotto `app/de/*` per tutte le rotte della spec sezione 5, `app/api/leads/route.ts` (stub 501)
  - Criteri di accettazione: tutte le rotte previste rispondono (anche come placeholder), nessun 404 involontario
  - Test richiesti: `curl` manuale su tutte le 14 rotte `/de/*` (200) + `/` (307) + `/de/danke` (`noindex, nofollow` verificato) + `/api/leads` POST (501, non 404/500 silenzioso)
- [x] LAYOUT-001 Header, footer, componenti UI di base
  - Dipendenze: FOUND-005
  - File previsti: `components/layout/Header.tsx`, `MobileMenu.tsx`, `Footer.tsx`, `Container.tsx`, `components/ui/Button.tsx`
  - Criteri di accettazione: header/footer conformi a spec sezioni 7 e 17 (nessun login/dashboard/social nell'header, dichiarazione di intermediazione nel footer), skip link presente, menu mobile chiude con Escape/selezione link e blocca lo scroll
  - Test richiesti: build/lint verdi; verifica manuale HTML (skip link, meta robots); **nessun component/e2e test automatico ancora scritto per la navigazione da tastiera del menu mobile — da fare in Fase 6 (QA-001/QA-002)**

## Fase 2 — Pagine marketing

- [ ] HOME-001 Homepage completa `/de` (sezioni 8.1–8.9)
  - Dipendenze: LAYOUT-001
  - File previsti: `app/de/page.tsx`, `components/marketing/*`
  - Criteri di accettazione: tutte le sezioni della spec presenti nell'ordine indicato, copy esatto
  - Test richiesti: e2e caricamento homepage
- [x] LOCAL-001 (parziale) Dati struttura `LocationLanding`
  - Dipendenze: nessuna
  - File previsti: `lib/locations.ts`
  - Criteri di accettazione: modello dati con H1/intro/meta unici per Visp, Brig-Glis, Naters
  - Test richiesti: nessun unit test ancora scritto (TODO in Fase 6)
  - Nota: manca ancora il template a 10 sezioni (`components/marketing/*`) e la FAQ locale — pagine attuali sono placeholder minimi (hero + intro + nearby places), non la struttura completa spec 9.4
- [ ] LOCAL-002 Landing Visp — [ ] LOCAL-003 Brig-Glis — [ ] LOCAL-004 Naters (contenuto completo)
  - Dipendenze: LOCAL-001, HOME-001
  - Criteri di accettazione: struttura a 10 sezioni, FAQ locale con almeno una domanda locale, link reciproci tra le tre landing
  - Nota: le route esistono già come placeholder (200 OK, meta uniche); resta da fare il contenuto completo
- [ ] INFO-001 `/de/so-funktionierts`, `/de/faq`, `/de/ueber-cleyra`, `/de/kontakt` (contenuto completo)
  - Dipendenze: LAYOUT-001 (fatto)
  - Criteri di accettazione: copy conforme a spec sezione 16, nessun dato aziendale inventato
  - Nota: le route esistono già come placeholder minimi (200 OK, meta uniche); resta da fare il copy completo (FAQ per categorie, sezione "Was bedeutet ausgewählter Partner", ecc.)
- [x] LEGAL-001 Placeholder pagine legali (Datenschutz, Impressum, Vermittlungsbedingungen)
  - Dipendenze: LAYOUT-001
  - File previsti: `app/de/datenschutz/page.tsx`, `app/de/impressum/page.tsx`, `app/de/vermittlungsbedingungen/page.tsx`
  - Criteri di accettazione: marcate `TODO LEGAL REVIEW`; pubblicazione bloccata finché non sostituite
  - Test richiesti: verifica manuale contenuto marcato, 200 OK

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
