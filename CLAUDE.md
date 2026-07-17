# CLAUDE.md — Cleyra Website

Letto per primo a ogni sessione. Breve e operativo.

## Scopo del progetto

Sito Next.js mobile-first per Cleyra, un servizio di intermediazione che
raccoglie richieste di pulizia di fine locazione (Endreinigung) nel Canton
Vallese (Oberwallis) e le vermitta a un partner di pulizia regionale.
Conversione primaria: `lead_submitted` tramite un modulo a quattro passaggi.

## Limiti dello scope (fase attuale)

Non costruire: dashboard clienti, area partner, marketplace, sistema di
vendita lead, fatturazione, CRM completo, app mobile, portale amministrativo
avanzato, automazioni commerciali complesse. Vedi `CLEYRA_WEBSITE_SPEC.md`
sezione 0.17 per il controllo anti-deriva.

## Lingua e mercato iniziali

Tedesco (`de-CH`). Zone: Visp, Brig-Glis, Naters, Oberwallis. Il codice deve
essere predisposto per i18n ma `/fr` non va pubblicato vuoto.

## Documenti canonici (ordine di autorità in caso di conflitto)

1. `CLEYRA_WEBSITE_SPEC.md` — requisiti di prodotto e criteri di accettazione
2. Istruzioni esplicite più recenti del proprietario del progetto
3. `docs/DECISIONS.md`
4. `docs/ARCHITECTURE.md`
5. `docs/IMPLEMENTATION_PLAN.md`
6. `docs/PROJECT_STATUS.md`
7. `docs/SESSION_HANDOFF.md`
8. Codice e test esistenti
9. `README.md`

Se due fonti sono in conflitto, non scegliere silenziosamente: registrare il
conflitto in `PROJECT_STATUS.md`, proporre una soluzione, poi aggiornare la
fonte corretta dopo la decisione.

## Stack rilevato

Next.js (App Router) + TypeScript strict + Tailwind CSS. Nessun database,
provider e-mail o CMS ancora collegato (placeholder in `.env.example`).
Vedi `docs/ARCHITECTURE.md` per lo stato tecnico reale e aggiornato.

## Comandi

```bash
npm install
npm run dev        # sviluppo locale
npm run build      # build produzione
npm run start      # avvio build produzione
npm run lint       # lint
npm run typecheck  # controllo tipi
```

## Convenzioni principali

- TypeScript strict, niente `any` non giustificato.
- Copy in tedesco conservato in file TS/JSON strutturati (nessun CMS in
  questa fase).
- Componenti divisi per `layout/`, `ui/`, `marketing/`, `lead-form/`, `seo/`
  (vedi spec sezione 23).
- Contenuti configurabili centralizzati in `lib/site-config.ts` (spec 24).

## Privacy, dati personali e segreti

- Nessun segreto lato client; solo variabili `NEXT_PUBLIC_*` documentate.
- Nessun dato personale (nome, email, telefono, note) inviato a GA4/GTM/Ads.
- Validare e sanitizzare input sia client sia server.
- Foto utente: storage privato, URL firmati temporanei, mai pubblici.

## Divieti

- Non inventare dati aziendali, numeri, testimonianze o testi legali
  definitivi. I placeholder legali devono restare marcati
  `TODO LEGAL REVIEW` finché non approvati dal proprietario.
- Non promettere garanzie di consegna incondizionate (vedi spec sezione 2).

## Procedura obbligatoria di inizio sessione

Prima di iniziare qualsiasi modifica, leggi `CLEYRA_WEBSITE_SPEC.md`,
`docs/PROJECT_STATUS.md`, `docs/SESSION_HANDOFF.md`, `docs/DECISIONS.md`,
controlla `git status` e verifica i comandi disponibili nel repository.

## Procedura obbligatoria di fine sessione

Esegui test/lint/typecheck pertinenti, controlla `git diff` per segreti,
poi aggiorna in questo ordine: `IMPLEMENTATION_PLAN.md`,
`PROJECT_STATUS.md`, `SESSION_HANDOFF.md`, `DECISIONS.md` (se necessario),
`ARCHITECTURE.md` (se la struttura è cambiata), `CHANGELOG.md`, `README.md`
e `.env.example` (se il setup è cambiato).

## Regole di verifica

Non marcare un'attività come completata (`[x]` in `IMPLEMENTATION_PLAN.md`)
senza avere verificato i criteri di accettazione. Non sovrascrivere una
decisione registrata in `DECISIONS.md` senza prima registrare la nuova
decisione e il motivo del cambiamento.
