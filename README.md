# Cleyra

Sito Next.js per Cleyra, servizio di intermediazione per pulizie di fine
locazione (Endreinigung) nel Canton Vallese.

Per il contesto di prodotto vedi `CLEYRA_WEBSITE_SPEC.md` e `docs/`.

## Prerequisiti

- Node.js 20+
- npm 10+

## Installazione

```bash
npm install
```

## Configurazione

```bash
cp .env.example .env
```

Nessuna variabile è ancora obbligatoria per lo sviluppo locale in questa
fase (nessun database, e-mail o storage collegato). Vedi
`docs/DECISIONS.md` (DEC-20260717-02) per lo stato delle decisioni sui
provider.

## Avvio locale

```bash
npm run dev
```

Apri http://localhost:3000 — reindirizza a `/de`.

## Comandi disponibili

```bash
npm run dev        # sviluppo locale
npm run build      # build produzione (include typecheck e lint)
npm run start      # avvio build produzione
npm run lint       # lint
npm run typecheck  # controllo tipi (tsc --noEmit)
```

## Database e migrazioni

Non ancora collegati. Vedi `docs/ARCHITECTURE.md` e `docs/DECISIONS.md`.

## Test

Nessun test automatico ancora presente (Fase 6). Vedi
`docs/IMPLEMENTATION_PLAN.md` per l'elenco pianificato.

## Build

```bash
npm run build
```

## Deploy

Piattaforma non ancora scelta. Lo stack è compatibile con qualsiasi
piattaforma che supporti Next.js (App Router).

## Struttura essenziale del repository

```
app/            # rotte Next.js (App Router)
lib/            # config e logica condivisa
docs/           # documentazione di continuità del progetto
CLAUDE.md       # istruzioni operative per sessioni Claude Code
CLEYRA_WEBSITE_SPEC.md  # specifica di prodotto
```

## Documenti di progetto

- `docs/PROJECT_OVERVIEW.md` — cos'è Cleyra, per chi, scope
- `docs/ARCHITECTURE.md` — struttura tecnica reale e aggiornata
- `docs/IMPLEMENTATION_PLAN.md` — piano di lavoro con task ID
- `docs/PROJECT_STATUS.md` — stato sintetico attuale
- `docs/DECISIONS.md` — decisioni architetturali
- `docs/SESSION_HANDOFF.md` — punto esatto da cui riprendere
- `docs/CHANGELOG.md` — storico delle modifiche

## Problemi comuni

- **`next lint` chiede una configurazione interattiva**: già risolto con
  `.eslintrc.json` presente nel repository; non serve rispondere al
  prompt.
- **Variabili d'ambiente mancanti**: in questa fase nessuna è
  obbligatoria per l'avvio locale; verranno richieste quando database,
  e-mail e storage saranno collegati (Fase 4).
