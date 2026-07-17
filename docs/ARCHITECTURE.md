# Architecture — Cleyra

Stato tecnico reale, non desiderato. Aggiornare a ogni cambio di struttura.

## Stack e versioni principali

- Next.js 14.2.35 (App Router), TypeScript strict
- Tailwind CSS
- React Hook Form 7 + `@hookform/resolvers` (zodResolver) + Zod 4 per il
  modulo lead
- Vitest per gli unit test; Playwright installato come devDependency (per
  ora usato solo per verifiche manuali ad-hoc, nessuna suite e2e committata)
- Nessun database ancora collegato (previsto: PostgreSQL gestito, es.
  Supabase) — `/api/leads` usa un array in memoria come stand-in temporaneo
- Nessun provider e-mail ancora collegato
- Nessun CMS (copy in file TS/JSON)
- GTM/GA4/Ads: non ancora integrati

## Flusso (implementato, con parti ancora simulate)

```
Browser
  → Next.js App Router (SSR/SSG pagine marketing + landing locali)
  → LeadForm multi-step (client, stato in sessionStorage) — FUNZIONANTE
  → POST /api/leads (Route Handler) — FUNZIONANTE (validazione/antispam)
      → validazione Zod server-side (leadFormSchema)               ✅
      → rate limit (in memoria, per istanza) + honeypot            ✅
      → salvataggio lead → array in memoria, NON un DB reale        ⚠️ API-002
      → upload foto → non implementato, solo conteggio inviato      ⚠️ API-003
      → invio e-mail conferma/notifica → non implementato           ⚠️ API-005
  → redirect /de/danke — FUNZIONANTE, ma senza dati lead dinamici né evento analytics
```

Verificato end-to-end in questa sessione con un browser reale
(Playwright headless): compilazione dei 4 step, navigazione
avanti/indietro senza perdita dati, validazione con riepilogo errori,
invio riuscito e redirect.

## Struttura directory (stato attuale)

```
/
├── CLAUDE.md
├── CLEYRA_WEBSITE_SPEC.md
├── README.md
├── docs/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # redirect "/" → "/de"
│   ├── api/
│   │   └── leads/route.ts          # validazione+antispam reali, persistenza in memoria (API-001 parziale)
│   └── de/
│       ├── layout.tsx              # Header + Footer + skip link
│       ├── page.tsx                # homepage completa (sezioni 8.1-8.9) + LeadForm in #anfrage
│       ├── endreinigung-visp/page.tsx        # placeholder minimo
│       ├── endreinigung-brig/page.tsx        # placeholder minimo
│       ├── endreinigung-naters/page.tsx      # placeholder minimo
│       ├── umzugsreinigung-oberwallis/page.tsx  # placeholder minimo
│       ├── so-funktionierts/page.tsx         # placeholder minimo
│       ├── faq/page.tsx                      # placeholder minimo
│       ├── ueber-cleyra/page.tsx             # placeholder minimo
│       ├── kontakt/page.tsx                  # placeholder minimo
│       ├── datenschutz/page.tsx              # TODO LEGAL REVIEW
│       ├── impressum/page.tsx                # TODO LEGAL REVIEW
│       ├── vermittlungsbedingungen/page.tsx  # TODO LEGAL REVIEW
│       └── danke/page.tsx                    # noindex, nofollow
├── components/
│   ├── layout/
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx          # client component
│   │   └── Footer.tsx
│   ├── ui/
│   │   ├── Button.tsx              # bottone polimorfo link/button
│   │   ├── Input.tsx, Select.tsx, Checkbox.tsx, RadioGroup.tsx, Textarea.tsx
│   │   ├── ProgressBar.tsx, Alert.tsx, Accordion.tsx
│   ├── marketing/
│   │   ├── Hero.tsx, TrustStrip.tsx, ProcessSteps.tsx, ServiceList.tsx
│   │   ├── RegionLinks.tsx, BenefitsGrid.tsx, PartnerTransparency.tsx
│   │   ├── FaqPreview.tsx, FinalCta.tsx
│   └── lead-form/
│       ├── LeadForm.tsx            # orchestratore client, RHF + zodResolver
│       ├── Step{LocationService,Property,Extras,Contact}.tsx
│       ├── PhotoUploader.tsx       # solo client, nessun upload reale
│       ├── FormNavigation.tsx, FormErrorSummary.tsx
├── lib/
│   ├── site-config.ts
│   ├── locations.ts                # modello LocationLanding + dati Visp/Brig/Naters
│   ├── lead-schema.ts              # Zod: CleaningLead + schema per step
│   ├── attribution.ts              # cattura UTM/click-id al primo touch
│   ├── rate-limit.ts               # rate limiter in memoria (per istanza)
│   ├── sanitize.ts                 # sanitizzazione notes, normalizzazione email/telefono
│   ├── lead-id.ts                  # generazione leadId "CLY-YYYY-XXXXXX"
│   └── __tests__/lead-schema.test.ts  # 21 unit test (Vitest)
├── vitest.config.ts
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── .env.example
```

## Mappa delle rotte

| Rotta | Stato |
|---|---|
| `/` | redirect a `/de` — implementato e verificato (307) |
| `/de` | **completo**: tutte le sezioni 8.1–8.9, modulo lead funzionante in `#anfrage` |
| `/de/endreinigung-visp` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-002) |
| `/de/endreinigung-brig` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-003) |
| `/de/endreinigung-naters` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-004) |
| `/de/umzugsreinigung-oberwallis` | placeholder minimo (LOCAL-005) |
| `/de/so-funktionierts` | placeholder minimo (INFO-001) |
| `/de/faq` | placeholder minimo, nessuna domanda ancora (INFO-001) — nota: la homepage ha già una FAQ breve completa (`FaqPreview`) |
| `/de/ueber-cleyra` | placeholder minimo (INFO-001) |
| `/de/kontakt` | placeholder minimo, nessun modulo contatto separato (INFO-001) |
| `/de/datenschutz` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/impressum` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/vermittlungsbedingungen` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/danke` | raggiunta correttamente dopo l'invio; nessun dato dinamico del lead né evento analytics ancora (API-006/TRACK-001) |
| `/api/leads` | **validazione/antispam reali**; persistenza solo in memoria di processo, nessuna e-mail (API-001 parziale) |

Tutte le rotte sono state verificate manualmente con `curl`; il modulo
lead è stato verificato end-to-end con un browser reale (Playwright
headless).

## Componenti principali

- `components/layout/Header.tsx` — logo, nav desktop, CTA, monta `MobileMenu`
- `components/layout/MobileMenu.tsx` — client component: toggle, chiusura
  su Escape e su selezione link, blocco scroll body mentre aperto
- `components/layout/Footer.tsx` — link principali, link legali, contatti
  da `siteConfig`, dichiarazione di intermediazione, copyright dinamico
- `components/layout/Container.tsx` — wrapper larghezza massima 1180px
- `components/ui/*` — Button, Input, Select, Checkbox, RadioGroup,
  Textarea, ProgressBar, Alert, Accordion: primitive di form/UI accessibili
  (label associate, `aria-describedby`/`aria-invalid`, errori con `role="alert"`)
- `components/marketing/*` — una sezione della homepage per componente,
  copy fedele alla spec sezioni 8.1–8.9
- `components/lead-form/LeadForm.tsx` — orchestratore client: React Hook
  Form + `zodResolver(leadFormSchema)`, stato step (1-4), persistenza in
  `sessionStorage`, validazione per step con `trigger()`, honeypot via
  `ref` (non registrato in RHF, per evitare falsi invalidamenti), invio a
  `/api/leads`, gestione errori server (400 → `setError` per campo, altro
  → messaggio generico), redirect a `/de/danke` al successo
- `components/lead-form/Step*.tsx` — un componente per passaggio, usano
  `useFormContext` per accedere allo stato condiviso
- `components/lead-form/PhotoUploader.tsx` — selezione/rimozione file
  con validazione client (conteggio, dimensione, MIME); **nessun upload
  reale** (TODO API-003)

`components/seo/*` (JsonLd, Breadcrumbs) previsto dalla spec ma non
ancora creato (Fase 5).

## Contenuti configurabili

- `lib/site-config.ts` — nome sito, locale, contatti (da env), zone
  servite, versione privacy, testo dichiarazione di intermediazione.
- `lib/locations.ts` — modello `LocationLanding` e dati per Visp,
  Brig-Glis, Naters (CAP, comuni vicini, meta title/description, H1,
  intro). Usato sia da `RegionLinks` in homepage sia dalle tre landing
  locali. Da espandere con FAQ locale quando si completa il contenuto
  (LOCAL-002/003/004).

## Modello dati lead

Implementato in `lib/lead-schema.ts` con Zod:

- `stepLocationServiceSchema`, `stepPropertySchema`, `stepExtrasSchema`,
  `stepContactSchema` — uno schema per passaggio del modulo, combinati in
  `leadFormSchema` (usato sia dal client con `zodResolver` sia dal server
  in `/api/leads`).
- `cleaningLeadSchema`/`CleaningLead` — modello di persistenza completo
  (spec sezione 11) con i campi tecnici nascosti (id, createdAt, status,
  attribution, photoKeys, ecc.). **Non ancora scritto in nessun
  database** — vedi "Upload e storage" e API-002.
- Nota tipo: `privacyConsent` usa `z.boolean().refine(v => v === true)`
  invece di `z.literal(true)` per restare compatibile con un
  `defaultValues` booleano di React Hook Form (altrimenti Zod 4 genera un
  mismatch di tipo tra input e output dello schema nel resolver).
- 21 unit test in `lib/__tests__/lead-schema.test.ts` (Vitest): CAP
  svizzero, date passate/future, limiti rooms/approxSqm, email,
  privacyConsent.

## Upload e storage

Non ancora implementato lato server. Lato client, `PhotoUploader.tsx`
valida conteggio (max 5), dimensione (max 8MB) e tipo MIME (JPEG, PNG,
WebP, HEIC) prima di accettare i file, ma questi restano solo in stato
React: alla sottomissione del modulo viene inviato solo `photoCount`, i
file stessi non lasciano il browser. Target: storage privato con URL
firmati temporanei (spec sezione 10.3, 13) — bloccato su una decisione
di provider (DEC-20260717-02).

## Analytics e consent management

Non ancora implementato. `lib/attribution.ts` cattura UTM/GCLID/GBRAID/
WBRAID/referrer al primo touch della sessione (persistiti in
`sessionStorage`, non sovrascritti) e li allega al payload di
`/api/leads`, ma nessun dato viene ancora inviato a GTM/GA4/Ads né
persistito lato server. Target: GTM + GA4 + Ads conversion tramite
dataLayer, nessun dato personale inviato (spec sezione 19), CMP con
categorie necessari/analytics/marketing (spec sezione 20).

## Servizi esterni

Nessuno ancora collegato. Previsti: database gestito, provider e-mail
transazionale, storage oggetti, Google Tag Manager.

## Variabili d'ambiente

Vedi `.env.example` per l'elenco completo (nessun valore reale nel
repository). Nessuna nuova variabile introdotta in questa sessione:
l'endpoint `/api/leads` funziona oggi senza credenziali esterne perché
non è ancora collegato a un database o provider reale.

## Scelte di sicurezza

Implementate in `app/api/leads/route.ts`:

- validazione server-side con lo stesso schema Zod del client
  (`leadFormSchema`), nessun campo fidato ciecamente dal client;
- honeypot lato client (campo invisibile, non registrato in RHF, letto
  via `ref`) **e** lato server (controllo indipendente sul campo
  `company` nel payload — difesa in profondità);
- rate limiting in memoria: 5 richieste/60s per indirizzo IP
  (`x-forwarded-for`/`x-real-ip`), risposta `429` con messaggio in
  tedesco;
- normalizzazione email (trim + lowercase) e telefono (solo cifre e `+`);
- sanitizzazione `notes` (rimozione tag HTML e caratteri di controllo);
- nessun dato personale nei log (`console.info` logga solo leadId,
  serviceType, postalCode, timestamp);
- risposte di errore senza stack trace né dettagli infrastrutturali.

Non ancora implementato: CSP, header di sicurezza dedicati, upload
allegati sicuro (nessun file viene ancora accettato dal server).

## Punti tecnici ancora provvisori

- Provider database, e-mail e storage non ancora scelti/collegati
  (richiede decisione del proprietario — vedi `PROJECT_STATUS.md`).
- `inMemoryLeads` in `app/api/leads/route.ts` e il rate limiter in
  `lib/rate-limit.ts` sono implementazioni a singola istanza, non
  condivise tra processi/istanze — da sostituire prima di un deploy
  multi-istanza o serverless.
- Nessun component test o suite e2e committata (solo unit test dello
  schema e verifica manuale ad-hoc con Playwright in questa sessione).
- Nessun favicon configurato.

## File map

| File | Descrizione |
|---|---|
| `CLAUDE.md` | Istruzioni operative lette a inizio sessione |
| `CLEYRA_WEBSITE_SPEC.md` | Specifica di prodotto, fonte di autorità principale |
| `app/layout.tsx` | Layout root HTML, lingua `de-CH` |
| `app/page.tsx` | Redirect `/` → `/de` |
| `app/de/layout.tsx` | Layout sezione tedesca (Header/Footer/skip link) |
| `app/de/page.tsx` | Homepage completa con modulo lead incorporato |
| `app/api/leads/route.ts` | Endpoint lead: validazione, antispam, persistenza in memoria |
| `lib/site-config.ts` | Contenuti/config centralizzati (spec sezione 24) |
| `lib/lead-schema.ts` | Schema Zod condiviso client/server per il modulo lead |
| `lib/attribution.ts` | Cattura e persistenza UTM/click-id di prima sessione |
| `components/lead-form/LeadForm.tsx` | Orchestratore del modulo a 4 step |
| `.env.example` | Variabili d'ambiente documentate, senza valori reali |
