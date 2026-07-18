# Architecture

Questo documento descrive lo stack e la struttura tecnica del progetto. Ogni modifica
strutturale deve aggiornare questo file nella stessa sessione in cui avviene.

Stato: fondazioni tecniche (WEB-001), scheletro rotte (WEB-002), landing completa nei
contenuti (WEB-003..WEB-005, con riserva su ISSUE-001 per le pagine legali) e design
system (WEB-022) completati. Form, backend, notifiche e analytics non esistono
ancora: previsti da WEB-006 in poi.

## Stack

Deciso in `DECISIONS.md` (ADR-001), stack di default per repository vuoto (spec sezione 4):

- Next.js 16 con App Router (Turbopack per dev/build)
- TypeScript in modalità `strict`
- Tailwind CSS v4
- Zod per la validazione (client e server) — dipendenza installata in WEB-001, non
  ancora utilizzata
- Server action o route handler server-side per il form (nessuna API pubblica non
  necessaria) — da introdurre in WEB-009
- Database PostgreSQL compatibile — da introdurre in WEB-010
- Prisma come layer di accesso tipizzato — da introdurre in WEB-010
- Adapter e-mail server-side (provider da decidere in WEB-013)
- Vitest per unit/integration test
- Playwright per test end-to-end (browser Chromium preinstallato dell'ambiente, vedi
  `playwright.config.ts` per `executablePath`)
- ESLint

Principi guida: mobile-first, validazione server autorevole, poco JavaScript client,
niente segreti nel browser, niente global state non necessario, niente microservizi,
niente overengineering, niente librerie pesanti senza motivo.

## Struttura cartelle (stato reale dopo WEB-002)

```text
/
├── CLAUDE.md
├── README.md
├── CLEYRA_WEBSITE_SPEC.md
├── docs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          (root layout: html lang="de", metadata di default)
│   │   ├── globals.css
│   │   ├── favicon.ico
│   │   └── de/
│   │       ├── layout.tsx      (header/footer placeholder condiviso)
│   │       ├── endreinigung-oberwallis/page.tsx
│   │       ├── so-funktionierts/page.tsx
│   │       ├── faq/page.tsx
│   │       ├── ueber-cleyra/page.tsx
│   │       ├── kontakt/page.tsx
│   │       ├── datenschutz/page.tsx           (placeholder "in Vorbereitung", noindex — ISSUE-001)
│   │       ├── impressum/page.tsx             (placeholder "in Vorbereitung", noindex — ISSUE-001)
│   │       ├── vermittlungsbedingungen/page.tsx (placeholder "in Vorbereitung", noindex — ISSUE-001)
│   │       └── danke/page.tsx  (metadata.robots noindex,nofollow)
│   ├── lib/
│   │   └── env.ts              (validazione env con Zod, schema vuoto per ora)
│   ├── content/
│   │   └── faq.ts              (domande/risposte condivise tra landing e /de/faq)
│   └── components/
│       ├── Section.tsx         (wrapper di sezione: max-w-3xl, padding, variante muted)
│       ├── PrimaryButton.tsx   (bottone primario riutilizzabile, colore brand)
│       └── Card.tsx            (card per trust point/servizi, <li> con heading configurabile)
├── tests/
│   ├── unit/
│   │   ├── sanity.test.ts
│   │   └── env.test.ts
│   ├── integration/            (vuota, popolata da WEB-009/WEB-010)
│   └── e2e/
│       └── smoke.spec.ts       (verifica redirect `/` → `/de/endreinigung-oberwallis`)
├── public/                     (vuota: nessun asset ancora necessario)
├── package.json
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.mjs
├── next.config.ts              (redirects: `/` → `/de/endreinigung-oberwallis`, ADR-004)
└── postcss.config.mjs
```

Non esiste più `src/app/page.tsx`: la root `/` è gestita da un redirect (307) verso
`/de/endreinigung-oberwallis`, vedi ADR-004 in `DECISIONS.md`.

Struttura ancora da realizzare: `src/lib/validation/`, `src/lib/email/`,
`src/lib/db/`, `prisma/schema.prisma`. Contenuto legale reale di `/de/datenschutz`,
`/de/impressum`, `/de/vermittlungsbedingungen` bloccato su ISSUE-001 (dati
organizzazione non disponibili).

## Rotte

Vedi `CLEYRA_WEBSITE_SPEC.md` sezione 5. Punto di ingresso per Google Ads:
`/de/endreinigung-oberwallis`. `/de/danke` è `noindex`.

## Design system (WEB-022)

Definito il 2026-07-18, resta su Tailwind CSS puro (nessuna libreria di componenti
aggiunta), token colore/tipografia dichiarati in `src/app/globals.css` via `@theme`.

### Palette colori

| Token | Valore | Uso |
|---|---|---|
| `brand` | `#0f766e` (teal-700) | CTA primaria, logo, link attivi, accenti (numeri processo) |
| `brand-hover` | `#115e59` (teal-800) | Hover/focus della CTA primaria |
| `success` | `#16a34a` (green-600) | Riservato per stati di successo del form (WEB-008) |
| `error` | `#dc2626` (red-600) | Riservato per stati di errore del form (WEB-008) |
| neutri | scala `zinc` di Tailwind | Testo, bordi, sfondi (nessun token custom: si usa la scala standard) |

Generano automaticamente le utility Tailwind corrispondenti (`bg-brand`,
`text-brand`, `hover:bg-brand-hover`, `focus-visible:outline-brand`, ecc.) tramite il
meccanismo dei theme token di Tailwind v4.

Il supporto automatico al dark mode (`prefers-color-scheme: dark`) presente nello
scaffold iniziale di `create-next-app` è stato rimosso in questa sessione: i colori
attuali (es. `bg-zinc-900`, `text-zinc-600`) non erano stati pensati per un tema
scuro e avrebbero prodotto contrasti incoerenti. Il sito MVP è quindi solo a tema
chiaro; il dark mode può essere reintrodotto come task dedicato se necessario in
futuro.

### Scala tipografica

- H1 (solo Hero della landing): `text-4xl sm:text-5xl font-semibold tracking-tight`.
- H1 di pagina (tutte le altre pagine) / H2 di sezione sulla landing:
  `text-2xl sm:text-3xl font-semibold tracking-tight`.
- H3 (titoli di card, es. servizi): `font-semibold` (dimensione base ereditata).
- Corpo testo: `text-zinc-600` su sfondo bianco/muted, dimensione base o `text-lg`
  nel sottotitolo Hero.
- Microcopy: `text-sm text-zinc-500`.
- Font: Geist (via `next/font`, variabile `--font-geist-sans`), applicato al `body`
  tramite il token `--font-sans` nel tema — corretto in questa sessione un bug dello
  scaffold che forzava `Arial, Helvetica` ignorando la variabile del font caricato.

### Componenti UI ricorrenti

- `src/components/Section.tsx` — wrapper standard di sezione (`max-w-3xl`,
  padding verticale/orizzontale coerente), con prop `muted` per alternare sfondo
  `bg-zinc-50` e dare ritmo visivo tra sezioni consecutive.
- `src/components/PrimaryButton.tsx` — bottone primario (colore brand, focus
  visibile), usato per entrambe le CTA della landing (hero e finale).
- `src/components/Card.tsx` — card per liste di trust point/servizi (bordo, sfondo
  bianco, ombra leggera), con `headingLevel` configurabile (`h2`/`h3`) per non
  rompere l'ordine logico degli heading.

### Header/footer

Rifiniti visivamente: logo in colore brand, footer con sfondo `bg-zinc-50` e link
con hover in colore brand. Struttura invariata rispetto a WEB-002/WEB-005 (logo +
link a `/de/endreinigung-oberwallis` nell'header; disclaimer di intermediazione +
link legali nel footer).

## Componenti

- Header/Footer condivisi (`src/app/de/layout.tsx`).
- `Section`, `PrimaryButton`, `Card` (vedi "Design system" sopra).
- Sezioni landing composte con questi componenti: Hero, TrustPoints, Process,
  Services, ServiceArea, Transparency, FAQ, FinalCTA.
- Form a due step (da realizzare in WEB-006/WEB-007): `FormStep1Request`,
  `FormStep2Contact`, con stato condiviso a livello di form container.
- Componenti di stato del form (da realizzare in WEB-008): field error, server
  error, submitting/success — useranno i token `success`/`error` del design system.

## Confine client/server

- Le pagine sono Server Components per default.
- Il form è un componente client per gestione stato/step, ma l'invio avviene tramite
  server action o route handler: la validazione server è sempre autorevole,
  indipendentemente da quella client.
- Nessun segreto (credenziali DB, e-mail, ecc.) è mai esposto al bundle client.

## Flusso del form

1. Utente compila step 1 (dati richiesta) → validazione client.
2. Utente compila step 2 (contatti + consenso) → validazione client.
3. Submit → server action/route handler.
4. Validazione server (Zod, autorevole).
5. Controllo anti-spam e duplicati.
6. Persistenza lead (Prisma/PostgreSQL).
7. Invio e-mail interna.
8. Invio e-mail di conferma cliente.
9. Aggiornamento `notificationStatus`.
10. Evento `lead_submit_success`.
11. Redirect a `/de/danke`.

Se il salvataggio riesce ma l'e-mail fallisce: il lead non va perso, si registra
`notification_failed`, si mostra comunque la conferma al cliente.

## Validazione

- Zod come unica fonte di verità per gli schemi, condivisa (dove possibile) tra client
  e server, ma **la validazione server è sempre quella autorevole**.
- Normalizzazione server-side di telefono ed e-mail.

## Persistenza

- PostgreSQL + Prisma.
- Schema lead secondo i campi minimi in `CLEYRA_WEBSITE_SPEC.md` sezione 8.
- Nessuna dashboard di lettura nel MVP: la persistenza serve solo a non perdere i lead e
  a permettere query manuali/dirette in caso di necessità.

## E-mail

- Adapter server-side (provider da scegliere in WEB-013, registrare in `DECISIONS.md`).
- Due invii per ogni lead valido: interno (Mirdita/Cleyra) e conferma cliente.
- Fallimento invio gestito senza perdere il lead (vedi `notificationStatus`).

## Analytics

- Vedi `docs/ANALYTICS.md` per eventi e regole sui dati.
- Nessun dato personale inviato agli analytics.
- UTM/GCLID catturati e salvati sul lead, non negli eventi con PII.

## Variabili ambiente

Validazione tipizzata centralizzata (`src/lib/env.ts`, previsto in WEB-002). Elenco
variabili verrà popolato via via che vengono introdotte (database, e-mail, analytics).
Nessun valore reale va mai scritto in questo file o nel repository: solo nomi e scopo.

| Variabile | Scopo | Introdotta in |
|---|---|---|
| `DATABASE_URL` | Connessione PostgreSQL | WEB-010 |
| (e-mail provider, da definire) | Invio e-mail transazionali | WEB-013 |
| (analytics ID, da definire) | Tracciamento eventi | WEB-016 |

## Sicurezza

- Validazione server sempre autorevole.
- Segreti solo lato server, mai nel bundle client.
- Rate limiting sull'endpoint di submit.
- Limiti di dimensione payload.
- Header di sicurezza standard (da configurare in WEB-002/WEB-021).
- Errori di produzione non dettagliati verso il client.
- Nessun dato personale in URL, log pubblici o analytics.
- Credenziali con privilegi minimi (es. utente DB con permessi limitati alla tabella
  lead).

## Deploy

Vedi `docs/DEPLOYMENT.md`.

## Gestione errori

- Errori di validazione: messaggi per campo, non generici.
- Errori server: messaggio generico al cliente, dettaglio solo nei log server.
- Lead salvato ma notifica fallita: non è un errore verso il cliente (vedi flusso form).
