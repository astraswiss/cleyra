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
│   ├── page.tsx            # redirect "/" → "/de"
│   └── de/
│       ├── layout.tsx
│       └── page.tsx        # homepage placeholder
├── lib/
│   └── site-config.ts
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
| `/` | redirect a `/de` — implementato |
| `/de` | placeholder — homepage completa non ancora implementata (Fase 2) |
| `/de/endreinigung-visp` | non implementata |
| `/de/endreinigung-brig` | non implementata |
| `/de/endreinigung-naters` | non implementata |
| `/de/umzugsreinigung-oberwallis` | non implementata |
| `/de/so-funktionierts` | non implementata |
| `/de/faq` | non implementata |
| `/de/ueber-cleyra` | non implementata |
| `/de/kontakt` | non implementata |
| `/de/datenschutz` | non implementata |
| `/de/impressum` | non implementata |
| `/de/vermittlungsbedingungen` | non implementata |
| `/de/danke` | non implementata |
| `/api/leads` | non implementata |

## Componenti principali

Nessuno oltre al layout root e al placeholder homepage. Struttura
`components/{layout,ui,marketing,lead-form,seo}` prevista dalla spec
(sezione 23) ma non ancora creata.

## Contenuti configurabili

`lib/site-config.ts` — nome sito, locale, contatti (da env), zone servite,
versione privacy. Da espandere in Fase 2/3 con copy CTA e limiti allegati.

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
