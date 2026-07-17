# Architecture — Cleyra

Stato tecnico reale, non desiderato. Aggiornare a ogni cambio di struttura.

## Stack e versioni principali

- Next.js 14 (App Router), TypeScript strict
- Tailwind CSS
- Nessun database ancora collegato (previsto: PostgreSQL gestito, es. Supabase)
- Nessun provider e-mail ancora collegato
- Nessun CMS (copy in file TS/JSON)
- GTM/GA4/Ads: non ancora integrati

## Flusso (stato target, non ancora implementato oltre lo scaffold)

```
Browser
  → Next.js App Router (SSR/SSG pagine marketing + landing locali)
  → Form multi-step (client, stato in sessionStorage)
  → POST /api/leads (Route Handler)
      → validazione Zod server-side
      → rate limit + honeypot
      → salvataggio lead (DB — non ancora collegato)
      → upload foto (storage privato — non ancora collegato)
      → invio e-mail conferma utente + notifica interna (provider — non ancora collegato)
  → redirect /de/danke
```

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
│   │   └── leads/route.ts          # stub 501, non implementato (API-001)
│   └── de/
│       ├── layout.tsx              # Header + Footer + skip link
│       ├── page.tsx                # homepage placeholder
│       ├── endreinigung-visp/page.tsx
│       ├── endreinigung-brig/page.tsx
│       ├── endreinigung-naters/page.tsx
│       ├── umzugsreinigung-oberwallis/page.tsx
│       ├── so-funktionierts/page.tsx
│       ├── faq/page.tsx
│       ├── ueber-cleyra/page.tsx
│       ├── kontakt/page.tsx
│       ├── datenschutz/page.tsx           # TODO LEGAL REVIEW
│       ├── impressum/page.tsx             # TODO LEGAL REVIEW
│       ├── vermittlungsbedingungen/page.tsx  # TODO LEGAL REVIEW
│       └── danke/page.tsx          # noindex, nofollow
├── components/
│   ├── layout/
│   │   ├── Container.tsx
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx          # client component
│   │   └── Footer.tsx
│   └── ui/
│       └── Button.tsx
├── lib/
│   ├── site-config.ts
│   └── locations.ts                # modello LocationLanding + dati Visp/Brig/Naters
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
| `/de` | placeholder (hero + disclaimer) — sezioni 8.2-8.9 mancanti (HOME-001) |
| `/de/endreinigung-visp` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-002) |
| `/de/endreinigung-brig` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-003) |
| `/de/endreinigung-naters` | placeholder minimo — struttura 10 sezioni mancante (LOCAL-004) |
| `/de/umzugsreinigung-oberwallis` | placeholder minimo (LOCAL-005) |
| `/de/so-funktionierts` | placeholder minimo (INFO-001) |
| `/de/faq` | placeholder minimo, nessuna domanda ancora (INFO-001) |
| `/de/ueber-cleyra` | placeholder minimo (INFO-001) |
| `/de/kontakt` | placeholder minimo, nessun modulo contatto separato (INFO-001) |
| `/de/datenschutz` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/impressum` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/vermittlungsbedingungen` | placeholder `TODO LEGAL REVIEW` — non pubblicabile |
| `/de/danke` | placeholder, `noindex, nofollow` verificato; contenuto dinamico da leadId non ancora collegato (API-006) |
| `/api/leads` | stub, risponde `501 NOT_IMPLEMENTED` a POST (API-001) |

Tutte le rotte sono state verificate manualmente con `curl` in questa
sessione: nessun 404 involontario.

## Componenti principali

- `components/layout/Header.tsx` — logo, nav desktop, CTA, monta `MobileMenu`
- `components/layout/MobileMenu.tsx` — client component: toggle, chiusura
  su Escape e su selezione link, blocco scroll body mentre aperto
- `components/layout/Footer.tsx` — link principali, link legali, contatti
  da `siteConfig`, dichiarazione di intermediazione, copyright dinamico
- `components/layout/Container.tsx` — wrapper larghezza massima 1180px
- `components/ui/Button.tsx` — bottone polimorfo (link o button), varianti
  primary/secondary, stato loading/disabled

Struttura `components/marketing/*`, `components/lead-form/*`,
`components/seo/*` prevista dalla spec (sezione 23) ma non ancora creata
(Fase 2/3).

## Contenuti configurabili

- `lib/site-config.ts` — nome sito, locale, contatti (da env), zone
  servite, versione privacy, testo dichiarazione di intermediazione.
- `lib/locations.ts` — modello `LocationLanding` e dati per Visp,
  Brig-Glis, Naters (CAP, comuni vicini, meta title/description, H1,
  intro). Da espandere con FAQ locale in Fase 2.

## Modello dati lead

Non ancora implementato. Tipo target `CleaningLead` definito in
`CLEYRA_WEBSITE_SPEC.md` sezione 11; da creare in `lib/lead-schema.ts`
(Zod) quando si inizia la Fase 3.

## Upload e storage

Non ancora implementato. Target: storage privato con URL firmati
temporanei (spec sezione 10.3, 13).

## Analytics e consent management

Non ancora implementato. Target: GTM + GA4 + Ads conversion tramite
dataLayer, nessun dato personale inviato (spec sezione 19), CMP con
categorie necessari/analytics/marketing (spec sezione 20).

## Servizi esterni

Nessuno ancora collegato. Previsti: database gestito, provider e-mail
transazionale, storage oggetti, Google Tag Manager.

## Variabili d'ambiente

Vedi `.env.example` per l'elenco completo (nessun valore reale nel
repository).

## Scelte di sicurezza

Nessuna implementazione ancora oltre lo scaffold Next.js di default.
Requisiti target in spec sezione 13 (honeypot, rate limit, CSP, storage
privato per allegati, ecc.) da implementare in Fase 4.

## Punti tecnici ancora provvisori

- Provider database, e-mail e storage non ancora scelti/collegati
  (richiede decisione del proprietario — vedi `PROJECT_STATUS.md`).
- Nessun test automatico ancora presente.

## File map

| File | Descrizione |
|---|---|
| `CLAUDE.md` | Istruzioni operative lette a inizio sessione |
| `CLEYRA_WEBSITE_SPEC.md` | Specifica di prodotto, fonte di autorità principale |
| `app/layout.tsx` | Layout root HTML, lingua `de-CH` |
| `app/page.tsx` | Redirect `/` → `/de` |
| `app/de/layout.tsx` | Layout sezione tedesca |
| `app/de/page.tsx` | Homepage placeholder |
| `lib/site-config.ts` | Contenuti/config centralizzati (spec sezione 24) |
| `.env.example` | Variabili d'ambiente documentate, senza valori reali |
