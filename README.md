# Cleyra — Website MVP

Cleyra è un servizio di intermediazione (Vermittlungsservice) che raccoglie richieste di
`Endreinigung im Oberwallis` (Svizzera, regione Vallese tedesco) e le inoltra al partner
operativo Mirdita. Cleyra non esegue pulizie: il contratto per il servizio nasce direttamente
tra il cliente e il partner esecutore.

Questo repository contiene il sito MVP: una landing page in tedesco con un form di richiesta
in due passaggi, senza login, dashboard, pagamenti o marketplace.

## Memoria di progetto

Prima di lavorare su questo repository, leggi in ordine:

1. [`CLAUDE.md`](./CLAUDE.md) — regole operative permanenti.
2. [`CLEYRA_WEBSITE_SPEC.md`](./CLEYRA_WEBSITE_SPEC.md) — specifica master del prodotto.
3. [`docs/PROJECT_STATUS.md`](./docs/PROJECT_STATUS.md) — stato attuale.
4. [`docs/SESSION_HANDOFF.md`](./docs/SESSION_HANDOFF.md) — punto esatto da cui ripartire.
5. [`docs/IMPLEMENTATION_PLAN.md`](./docs/IMPLEMENTATION_PLAN.md) — backlog con task ID.
6. [`docs/DECISIONS.md`](./docs/DECISIONS.md) — decisioni architetturali registrate.

Nessuna informazione importante sullo stato del progetto deve vivere soltanto in una
conversazione con Claude Code: tutto ciò che conta è nei file `.md` di questo repository.

## Documentazione

| File | Contenuto |
|---|---|
| `docs/PROJECT_CHARTER.md` | Scopo, mercato, KPI, confini MVP, vincoli legali |
| `docs/PROJECT_STATUS.md` | Fotografia sintetica dello stato attuale |
| `docs/IMPLEMENTATION_PLAN.md` | Backlog con task ID e criteri di accettazione |
| `docs/ARCHITECTURE.md` | Stack, struttura cartelle, rotte, flussi |
| `docs/CONTENT.md` | Fonte unica dei testi del sito (tedesco) |
| `docs/FORM_SPEC.md` | Specifica del form di richiesta in due passaggi |
| `docs/ANALYTICS.md` | Eventi, conversioni, UTM/GCLID, privacy |
| `docs/DECISIONS.md` | Registro append-only delle decisioni (ADR) |
| `docs/KNOWN_ISSUES.md` | Problemi noti |
| `docs/QA_CHECKLIST.md` | Checklist di verifica pre-rilascio |
| `docs/DEPLOYMENT.md` | Ambienti, variabili, deploy, rollback |
| `docs/SESSION_LOG.md` | Log append-only delle sessioni di lavoro |
| `docs/SESSION_HANDOFF.md` | Stato di passaggio tra una sessione e la successiva |

## Stato attuale

Il progetto è in **Fase 0 (memoria)**: nessun codice applicativo è stato ancora scritto.
Vedi `docs/PROJECT_STATUS.md` per lo stato aggiornato.
