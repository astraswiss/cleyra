# Decisions (ADR) — registro append-only

Non cancellare decisioni vecchie: marcarle `superseded` e aggiungerne una nuova.

---

## ADR-001 — Stack tecnico per il sito Cleyra MVP
Date: 2026-07-18
Status: accepted
Context: Il repository era vuoto (nessun commit) all'inizio della Fase 0. La specifica
`CLEYRA_WEBSITE_SPEC.md` (sezione 4) indica di ispezionare il repository e, se vuoto, di
usare lo stack di default consigliato, evitando overengineering.
Decision: Adottare lo stack di default della specifica: Next.js con App Router,
TypeScript strict, Tailwind CSS, Zod per la validazione, una server action/route
handler server-side per il form (nessuna API pubblica separata non necessaria),
PostgreSQL come database, Prisma come layer di accesso tipizzato, un adapter e-mail
server-side (provider specifico da decidere al task WEB-013), Vitest per unit/integration
test, Playwright per end-to-end, ESLint per il linting. Nessuna dashboard, nessun
account/login, nessun marketplace.
Alternatives: (a) Framework diverso da Next.js (es. Remix, Astro): scartato perché la
specifica indica esplicitamente Next.js come default e non esistono vincoli pregressi
nel repository che lo sconsiglino. (b) Database NoSQL: scartato perché i dati del lead
sono strutturati e relazionali per natura, e PostgreSQL è il default indicato dalla
specifica. (c) ORM alternativo a Prisma: scartato in assenza di un motivo specifico per
deviare dal default.
Consequences: Tutte le sessioni successive devono usare questo stack senza migrazioni
non autorizzate. WEB-001 implementa l'inizializzazione concreta del progetto.
Affected files: `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md` (WEB-001,
WEB-002).
Supersedes: none

---

## ADR-002 — Provider e-mail transazionale
Date: —
Status: proposed
Context: La spec richiede un adapter e-mail server-side per l'invio dell'e-mail interna
e della conferma cliente (sezione 11, task WEB-013/WEB-014), ma non indica un provider
specifico.
Decision: Non ancora presa. Da decidere e registrare come `accepted` durante il task
WEB-013, valutando un provider transazionale server-side compatibile con l'assenza di
segreti nel client (es. servizio SMTP/API con chiave solo server-side).
Alternatives: da valutare al momento della decisione.
Consequences: WEB-013 e WEB-014 restano bloccati su questa scelta prima
dell'implementazione finale, ma non bloccano il lavoro di fondazione (WEB-001/WEB-002)
né la landing (WEB-003/WEB-005).
Affected files: `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md` (WEB-013,
WEB-014).
Supersedes: none

---

## ADR-003 — Strumento di analytics
Date: —
Status: proposed
Context: La spec richiede eventi di conversione e analytics (sezione 12, task WEB-016)
senza indicare uno strumento specifico.
Decision: Non ancora presa. Da decidere e registrare come `accepted` durante il task
WEB-016.
Alternatives: da valutare al momento della decisione (es. Google Analytics 4, Google Ads
conversion tracking diretto, altro strumento leggero).
Consequences: WEB-016 e WEB-017 (SEO/metadata) non sono bloccati da questa decisione,
ma l'implementazione degli eventi lo è.
Affected files: `docs/ANALYTICS.md`, `docs/IMPLEMENTATION_PLAN.md` (WEB-016).
Supersedes: none

---

## ADR-004 — Redirect della root `/` verso la landing principale
Date: 2026-07-18
Status: accepted
Context: La spec (`CLEYRA_WEBSITE_SPEC.md` sezione 5) elenca solo rotte sotto `/de/...`
e non specifica cosa mostrare sulla root `/`. Il task WEB-002 richiede uno scheletro di
rotte completo; lasciare la root come pagina separata o come 404 non è esplicitamente
deciso dalla spec.
Decision: Configurare un redirect (temporaneo, HTTP 307) da `/` a
`/de/endreinigung-oberwallis` tramite `next.config.ts` (`redirects()`), invece di
avere una pagina propria sulla root o lasciarla non gestita. Coerente con "una sola
landing principale" e con il fatto che il MVP è solo in tedesco.
Alternatives: (a) Pagina root separata con contenuto proprio: scartata, ridondante
con l'unica landing principale prevista dalla spec. (b) Nessuna gestione della root
(404): scartata, peggiore esperienza per visite dirette al dominio senza percorso.
(c) Redirect permanente (308): scartato per ora, preferibile un redirect reversibile
finché la struttura delle rotte non è stabile; da rivalutare in WEB-017 (SEO) prima
del lancio in produzione.
Consequences: `src/app/page.tsx` non esiste più; la root non ha una pagina propria.
Il redirect va riverificato quando si introdurranno pagine per singole città (fuori
scope MVP) o una eventuale versione multilingua futura.
Affected files: `next.config.ts`, `src/app/page.tsx` (rimosso),
`docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md` (WEB-002).
Supersedes: none
