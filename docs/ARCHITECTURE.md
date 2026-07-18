# Architecture

Questo documento descrive lo stack e la struttura tecnica del progetto. Ogni modifica
strutturale deve aggiornare questo file nella stessa sessione in cui avviene.

Stato: fondazioni tecniche (WEB-001) e scheletro rotte (WEB-002) completati. Tutte le
rotte MVP esistono con contenuto placeholder minimo. Form, backend, contenuti finali,
notifiche e analytics non esistono ancora: previsti da WEB-003 in poi.

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
│   │       ├── datenschutz/page.tsx
│   │       ├── impressum/page.tsx
│   │       ├── vermittlungsbedingungen/page.tsx
│   │       └── danke/page.tsx  (metadata.robots noindex,nofollow)
│   └── lib/
│       └── env.ts              (validazione env con Zod, schema vuoto per ora)
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

Struttura ancora da realizzare (WEB-003 in poi): `src/components/`, contenuti finali
delle pagine da `docs/CONTENT.md`, `src/lib/validation/`, `src/lib/email/`,
`src/lib/db/`, `prisma/schema.prisma`.

## Rotte

Vedi `CLEYRA_WEBSITE_SPEC.md` sezione 5. Punto di ingresso per Google Ads:
`/de/endreinigung-oberwallis`. `/de/danke` è `noindex`.

## Componenti (previsti)

- Header/Footer condivisi (layout `de`).
- Sezioni landing: Hero, TrustPoints, Process, Services, ServiceArea, Transparency, FAQ,
  FinalCTA.
- Form a due step: `FormStep1Request`, `FormStep2Contact`, con stato condiviso a livello
  di form container.
- Componenti di stato: field error, server error, submitting/success.

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
