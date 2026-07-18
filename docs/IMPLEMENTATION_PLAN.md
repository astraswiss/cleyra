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

- [x] HOME-001 Homepage completa `/de` (sezioni 8.1–8.9)
  - Dipendenze: LAYOUT-001
  - File previsti: `app/de/page.tsx`, `components/marketing/{Hero,TrustStrip,ProcessSteps,ServiceList,RegionLinks,BenefitsGrid,PartnerTransparency,FaqPreview,FinalCta}.tsx`, `components/ui/Accordion.tsx`
  - Criteri di accettazione: tutte le sezioni 8.1–8.9 presenti nell'ordine indicato con il copy della spec; CTA collegate a `/de#anfrage` dove il modulo è effettivamente incorporato
  - Test richiesti: `npm run build`/`npm run lint` verdi; verifica e2e manuale (Playwright headless) che la pagina carica e il modulo `#anfrage` è raggiungibile e funzionante (vedi FORM-007)
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

- [x] FORM-001 Schema dati (`lib/lead-schema.ts`, Zod, `CleaningLead`)
  - Dipendenze: FOUND-005
  - Criteri di accettazione: schema condiviso client/server, copre tutti i campi spec sezione 11
  - Test richiesti: `npx vitest run` — 21 unit test verdi (CAP 4 cifre, data non passata, rooms 1–20, approxSqm 10–2000, email, privacyConsent)
- [x] FORM-002 Stato multi-step + persistenza sessione
  - File previsti: `components/lead-form/LeadForm.tsx`
  - Criteri di accettazione: stato salvato in `sessionStorage` (`cleyra-lead-form-v1`), ripristinato al mount, navigazione avanti/indietro senza perdita dati
  - Test richiesti: verificato con Playwright headless (rooms=3 preservato dopo Zurück → Weiter)
- [x] FORM-003 `StepLocationService.tsx`
- [x] FORM-004 `StepProperty.tsx`
- [x] FORM-005 (parziale) `StepExtras.tsx` + `PhotoUploader.tsx`
  - Criteri di accettazione: UI e validazione client (max 5 file, max 8MB, MIME JPEG/PNG/WebP/HEIC) implementate
  - Nota: **nessun upload reale** — i file restano solo lato client finché lo storage privato (API-003) non è collegato; alla sottomissione viene inviato solo `photoCount`, non i file
- [x] FORM-006 `StepContact.tsx` + consensi
  - Nota: `privacyConsent` implementato con `z.boolean().refine()` anziché `z.literal(true)` per compatibilità di tipo con `defaultValues` di React Hook Form (altrimenti mismatch di tipo tra input/output dello schema con zodResolver di Zod 4)
- [x] FORM-007 Gestione errori, loading, prevenzione doppio invio
  - File previsti: `components/lead-form/{LeadForm,FormNavigation,FormErrorSummary}.tsx`
  - Criteri di accettazione: usabile a 320px (classi Tailwind responsive), focus sul primo campo con errore alla validazione di uno step, riepilogo errori con `aria-live`, honeypot invisibile (client + verifica server), lock client-side contro doppio invio (`submissionLockRef`)
  - Test richiesti: verificato con Playwright headless — submit senza `privacyConsent` mostra il riepilogo errori senza navigare; submit valido reindirizza a `/de/danke`

## Fase 4 — Backend minimo

- [x] API-001 (parziale) Endpoint `/api/leads` (validazione, sanitizzazione, risposta)
  - File previsti: `app/api/leads/route.ts`, `lib/{rate-limit,sanitize,lead-id}.ts`
  - Criteri di accettazione: valida con `leadFormSchema`, normalizza email/telefono, sanitizza `notes` (rimozione tag HTML/caratteri di controllo), rate limit 5 richieste/60s per IP, honeypot (risposta di successo fittizia se compilato), log senza PII
  - Test richiesti: verificato manualmente via `curl` — lead valido → `200 {success:true, leadId, redirectUrl}`; payload invalido → `400 VALIDATION_ERROR` con `fieldErrors`; 6 richieste in 60s dallo stesso IP → `429 RATE_LIMITED`; honeypot compilato → `200` fittizio senza elaborazione
  - **Nota bloccante**: nessuna persistenza reale. I lead sono tenuti in un array in memoria (`inMemoryLeads`) che si azzera a ogni riavvio del processo — vedi API-002. Non considerare questo endpoint pronto per la produzione.
- [ ] API-002 Collegamento database (decisione provider richiesta — vedi DECISIONS.md)
- [ ] API-003 Storage privato allegati + URL firmati
- [x] API-004 (parziale) Antispam (honeypot, rate limit)
  - Nota: rate limiter in memoria per singola istanza — da sostituire con uno store condiviso prima del deploy multi-istanza/serverless (vedi TODO in `lib/rate-limit.ts`)
- [ ] API-005 E-mail conferma utente + notifica interna (provider da decidere)
- [ ] API-006 Pagina `/de/danke` + idempotenza evento `lead_submitted`
  - Criteri di accettazione: lead salvato prima dell'invio e-mail; nessun dato personale nell'URL; evento emesso una sola volta
  - Nota: la pagina esiste ed è raggiunta correttamente dopo l'invio, ma non mostra ancora dati dinamici del lead né emette eventi analytics (dipende da TRACK-001)

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

## Backlog design (rimandato dal proprietario)

- [ ] DESIGN-001 BLOCKED — Rivedere il sistema di design (palette,
  tipografia, icone) per dare carattere visivo al sito
  - Dipendenze: nessuna tecnica; **bloccato su richiesta esplicita del
    proprietario di rimandarlo a fine progetto** ("ce ne occupiamo alla
    fine")
  - Contesto: è stato tentato un primo sistema di design (palette verde
    alpino/terracotta, font Manrope+Inter, set di icone SVG) in
    DEC-20260718-01, poi completamente annullato su richiesta del
    proprietario in DEC-20260718-02 perché non voleva occuparsene ora.
    Il sito è tornato intenzionalmente ai colori/font di default
    Tailwind.
  - File previsti quando si riprenderà: `tailwind.config.ts`,
    `app/layout.tsx`, `app/globals.css`, tutti i componenti
    `components/{ui,layout,marketing,lead-form}/*`
  - Criteri di accettazione: da ridefinire con il proprietario quando si
    riprende il lavoro; la versione precedente (rollback in
    DEC-20260718-02) può servire da punto di partenza ma va riproposta,
    non semplicemente ripristinata senza conferma
  - Non iniziare questo task senza che il proprietario lo richieda
    esplicitamente

## Next recommended tasks

1. LOCAL-002/003/004 — Contenuto completo a 10 sezioni per le landing Visp/Brig/Naters (oggi solo hero minimo)
2. API-002 — Scegliere e collegare un database reale, sostituendo l'array in memoria in `app/api/leads/route.ts`
3. INFO-001 — Copy completo per `so-funktionierts`, `faq`, `ueber-cleyra`, `kontakt`
4. API-003/FORM-005 — Storage privato per allegati e upload reale (oggi i file restano solo lato client)
5. QA-001/QA-002 — Formalizzare test automatici: component test per gli step del modulo e una suite e2e Playwright (oggi la verifica e2e è stata solo manuale/ad-hoc, nessun file di test committato)
