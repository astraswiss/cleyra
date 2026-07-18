# Decisions — Cleyra

Formato ADR leggero. Registrare solo decisioni durature, non correzioni minori.

## DEC-20260717-01 — Scelta stack iniziale

- Status: accepted
- Date: 2026-07-17
- Context: Nessun repository preesistente; la spec raccomanda uno stack
  specifico per un progetto nuovo (sezione 4).
- Decision: Next.js (App Router) + TypeScript strict + Tailwind CSS,
  React Hook Form + Zod per il modulo (da introdurre in Fase 3), nessun CMS.
- Alternatives considered: Remix, Astro — scartati perché la spec
  raccomanda esplicitamente Next.js e il proprietario non ha richiesto
  alternative.
- Consequences: le pagine marketing possono usare rendering statico/SSR;
  il modulo richiede componenti client.
- Related files/tasks: FOUND-005, `docs/ARCHITECTURE.md`

## DEC-20260717-02 — Provider database, e-mail e storage non ancora scelti

- Status: proposed
- Date: 2026-07-17
- Context: La spec raccomanda PostgreSQL gestito (es. Supabase) e un
  provider e-mail transazionale configurabile, ma non impone un fornitore
  specifico. Serve una decisione del proprietario prima della Fase 4.
- Decision: rimandata. Placeholder in `.env.example` senza valori.
- Alternatives considered: n/d
- Consequences: Fase 4 (backend minimo) è bloccata finché non arriva la
  decisione; vedi `PROJECT_STATUS.md` per i dati richiesti al proprietario.
- Related files/tasks: API-002, API-005

## DEC-20260718-01 — Sistema di design: palette e tipografia

- Status: accepted
- Date: 2026-07-18
- Context: Il primo scaffold usava i colori/font di default di Tailwind
  (slate/gray, font di sistema), che il proprietario ha giudicato privi
  di carattere visivo per un sito rivolto a privati nel Vallese.
- Decision: introdotta una palette dedicata in `tailwind.config.ts`:
  `brand` (verde alpino, per CTA primarie, link, sezione finale scura,
  footer), `clay` (terracotta caldo, uso sobrio per icone/accenti), `ink`
  (neutri caldi per testo, al posto di `slate`/`gray`). Tipografia:
  `Manrope` (display, per H1/H2/H3 e componenti UI enfatizzati) + `Inter`
  (corpo testo), entrambi self-hosted tramite `next/font/google` (nessuna
  richiesta esterna a runtime). Introdotto anche un piccolo set di icone
  SVG inline proprietarie (`components/ui/Icon.tsx`) al posto di
  bullet/checkmark testuali, senza aggiungere una libreria di icone come
  dipendenza.
- Alternatives considered: mantenere la palette neutra di default
  (scartata: "non ha molto carattere" — feedback esplicito del
  proprietario); usare una libreria di icone (es. lucide-react) — scartata
  per evitare una dipendenza non necessaria quando bastavano poche icone
  inline.
- Consequences: tutti i componenti `ui/`, `layout/`, `marketing/` e
  `lead-form/` sono stati aggiornati per usare la nuova palette; il
  sistema di design resta comunque "pulito, affidabile, locale,
  contemporaneo" e non "luxury", come richiesto dalla spec sezione 6.
- Related files/tasks: `tailwind.config.ts`, `app/layout.tsx`,
  `app/globals.css`, `components/ui/Icon.tsx`, tutti i componenti
  `components/marketing/*`
- **Status update (2026-07-18, stesso giorno): superseded.** Il
  proprietario ha chiesto di annullare completamente questa modifica di
  stile e tornare all'aspetto precedente (Tailwind slate/gray di
  default, font di sistema, nessun set di icone), rimandando il lavoro
  sul design a una fase successiva ("ce ne occupiamo alla fine"). Vedi
  DEC-20260718-02 per la decisione di rollback e il task di backlog
  aperto in `docs/IMPLEMENTATION_PLAN.md` (DESIGN-001).

## DEC-20260718-02 — Rollback del sistema di design, rimandato a fine progetto

- Status: accepted
- Date: 2026-07-18
- Context: Dopo l'implementazione di DEC-20260718-01, il proprietario ha
  chiesto esplicitamente di cancellare tutto lo stile introdotto e
  tornare com'era prima, indicando che il lavoro sul design verrà ripreso
  più avanti, non ora.
- Decision: ripristinati tutti i file toccati da DEC-20260718-01 (e dal
  fix successivo sulla transizione CTA→footer) allo stato del commit
  `da2b64e` (prima di qualsiasi modifica di stile): palette Tailwind di
  default (slate/gray), nessun font custom, `components/ui/Icon.tsx`
  rimosso. Nessuna modifica di logica applicativa è stata toccata da
  questo rollback.
- Alternatives considered: mantenere la nuova palette ma disattivarla
  dietro un flag — scartata, il proprietario ha chiesto esplicitamente la
  cancellazione completa, non una via di mezzo.
- Consequences: il sito torna visivamente "senza carattere" come prima
  della sessione di design; questo è intenzionale e temporaneo. Il
  lavoro sul sistema di design va ripreso a fine progetto (vedi task
  DESIGN-001 in `docs/IMPLEMENTATION_PLAN.md`, sezione "Backlog design").
- Related files/tasks: tutti i file elencati in DEC-20260718-01 sotto
  "Related files/tasks", ripristinati; `docs/IMPLEMENTATION_PLAN.md`
  (DESIGN-001)

## DEC-20260718-03 — Rimozione di dateFlexibility, floor ed elevator dal modulo lead

- Status: accepted
- Date: 2026-07-18
- Context: Il proprietario ha trovato il modulo lead troppo lungo e ha
  chiesto esplicitamente di velocizzarlo eliminando i campi opzionali
  `dateFlexibility` (Terminflexibilität, passaggio 1), `floor`
  (Stockwerk, passaggio 2) ed `elevator` (Lift, passaggio 2), mantenendo
  invece `notes` e le foto (passaggio 3). Questa è una **deviazione
  consapevole** dalla spec sezioni 10.2/10.3, che elencava questi tre
  campi come opzionali.
- Decision: rimossi `dateFlexibilitySchema`, `dateFlexibility`, `floor`
  ed `elevator` da `lib/lead-schema.ts` (`stepLocationServiceSchema`,
  `stepPropertySchema`, e di conseguenza da `leadFormSchema` e
  `cleaningLeadSchema`); rimossi i relativi campi dai componenti
  `StepLocationService.tsx` e `StepProperty.tsx` e dai `defaultValues`/
  `FIELD_LABELS` di `LeadForm.tsx`. Il numero di passaggi (4) e la loro
  struttura restano invariati — solo il contenuto di due step è più
  snello.
- Alternatives considered: rendere questi campi nascosti/avanzati dietro
  un accordion invece di rimuoverli — scartata, il proprietario ha
  chiesto esplicitamente di eliminarli, non di nasconderli.
- Consequences: il modello dati `CleaningLead` non include più questi tre
  campi; se in futuro servissero (es. per instradare meglio i partner in
  base al piano/lift), andranno reintrodotti con una nuova decisione. Il
  modulo risulta più rapido da compilare.
- Related files/tasks: `lib/lead-schema.ts`,
  `components/lead-form/{StepLocationService,StepProperty,LeadForm}.tsx`

## DEC-20260717-03 — Placeholder legali non pubblicabili

- Status: accepted
- Date: 2026-07-17
- Context: La spec vieta di inventare testi legali definitivi (Datenschutz,
  Impressum, Vermittlungsbedingungen).
- Decision: le pagine legali conterranno layout e testo marcato
  `TODO LEGAL REVIEW` finché non arriva un testo approvato dal proprietario
  o da un consulente legale. La pubblicazione in produzione resta bloccata
  fino alla sostituzione.
- Alternatives considered: nessuna — vincolo esplicito della spec.
- Consequences: Definition of Done non raggiungibile senza approvazione
  legale esterna.
- Related files/tasks: LEGAL-001, QA-006
