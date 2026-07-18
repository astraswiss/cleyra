Last updated: 2026-07-18 01:00 Europe/Zurich
Current phase: Fase 1–2–3 avanzate in parallelo (fondazioni, homepage, modulo lead); Fase 4 (backend) parziale; sistema di design ripristinato ai default, rimandato a fine progetto
Overall status: in_progress
Current branch: claude/new-session-huwuyt
Last verified commit: da2b64e (homepage + lead form + API-001) — questa sessione aggiunge un nuovo commit sopra

## Cosa è già funzionante

- Tutto il checkpoint precedente (Fase 0/1: continuity docs, scaffold, 14 rotte, header/footer/menu mobile).
- **Sistema di design**: era stato introdotto un sistema di design
  dedicato (palette verde alpino/terracotta, font Manrope+Inter, icone
  SVG — DEC-20260718-01), ma **il proprietario ha chiesto di annullarlo
  completamente e tornare com'era prima**, rimandando il lavoro sul
  design a fine progetto (DEC-20260718-02, task DESIGN-001 in
  `docs/IMPLEMENTATION_PLAN.md`). Il sito usa di nuovo i colori/font di
  default di Tailwind. Nessuna logica applicativa è stata toccata da
  questo rollback — solo styling/markup.
- Homepage `/de` completa con tutte le sezioni 8.1–8.9 (Hero, TrustStrip,
  Problem, ProcessSteps, ServiceList, RegionLinks, BenefitsGrid,
  PartnerTransparency con la dichiarazione di intermediazione, FaqPreview
  con accordion accessibile, sezione `#anfrage` con il modulo incorporato,
  FinalCta).
- Modulo lead multi-step completo e funzionante end-to-end (verificato con
  Playwright headless): 4 step (luogo/servizio, immobile, dettagli+foto,
  contatti+consenso), progress bar "Schritt X von 4", persistenza in
  `sessionStorage`, navigazione avanti/indietro senza perdita dati, focus
  sul primo campo errato, riepilogo errori accessibile (`aria-live`),
  honeypot invisibile, prevenzione doppio invio, redirect a `/de/danke`
  dopo invio riuscito.
- Endpoint `/api/leads` reale (non più uno stub): valida con Zod,
  normalizza email/telefono, sanitizza `notes`, applica rate limiting
  (5 richieste/60s per IP) e honeypot server-side, risponde con i codici
  della spec (`200` successo, `400 VALIDATION_ERROR` con `fieldErrors`,
  `429 RATE_LIMITED`). Log senza dati personali.
- Schema dati `lib/lead-schema.ts` con 21 unit test verdi (Vitest).
- `lib/attribution.ts`: cattura UTM/GCLID/GBRAID/WBRAID/referrer al primo
  touch della sessione, non sovrascritta in seguito; inclusa nel payload
  inviato a `/api/leads` (ma non ancora persistita né usata da analytics).
- `npm run build`, `npm run lint`, `npx vitest run` tutti verdi.

## Cosa è parzialmente funzionante

- **Foto**: l'utente può selezionare/rimuovere foto nello step 3
  (validazione client su conteggio/dimensione/tipo), ma **nessun upload
  reale avviene**: solo `photoCount` viene inviato al server, non i file.
  Bloccato su API-003 (storage privato non ancora scelto/collegato).
- **Persistenza lead**: l'endpoint valida e "accetta" la richiesta ma la
  tiene solo in un array in memoria di processo (`inMemoryLeads`), non in
  un database. Si perde a ogni riavvio/cold start. **Non è una
  persistenza reale** — bloccato su API-002.
- **E-mail**: nessuna e-mail di conferma o notifica interna viene inviata
  (nessun provider collegato) — bloccato su API-005.
- Landing locali (Visp/Brig/Naters), `so-funktionierts`, `faq`,
  `ueber-cleyra`, `kontakt`: ancora solo placeholder minimi (invariato dal
  checkpoint precedente), non il copy/struttura completa della spec.
- `/de/danke`: copy statico presente ma non mostra ancora dati reali del
  lead (leadId, città, data, servizio) né emette l'evento
  `lead_submitted` (dipende da TRACK-001, non ancora iniziato).

## Cosa non è ancora iniziato

- Database reale, storage foto, provider e-mail (Fase 4 rimanente).
- SEO tecnico oltre ai metadata di base: sitemap.xml, robots.txt, JSON-LD.
- GTM, dataLayer, consent management (Fase 5).
- Test automatici formalizzati oltre agli unit test dello schema: nessun
  component test per gli step del modulo, nessuna suite e2e Playwright
  committata (la verifica e2e di questa sessione è stata uno script
  ad-hoc, non salvato nel repository).
- Contenuto completo delle landing locali e delle pagine informative.

## Attività attualmente in corso

Nessuna: checkpoint di fine sessione.

## Blocchi e decisioni richieste

- Provider database, e-mail transazionale e storage foto non ancora
  scelti (`docs/DECISIONS.md` DEC-20260717-02) — bloccante per
  persistenza lead reale, upload foto reale, e invio e-mail.
- Testi legali definitivi non ancora forniti — bloccante per pubblicazione.
- Contatti reali non ancora forniti.
- Conferma zone servite attorno a Naters non ancora ricevuta.
- Il rate limiter e lo store lead in memoria **non sono adatti a un
  ambiente multi-istanza o serverless** — da sostituire insieme alla
  scelta del database (decisione tecnica collegata a DEC-20260717-02).

## Test attualmente verdi

- `npm run build` (18 route, typecheck+lint inclusi)
- `npm run lint`
- `npx vitest run` — 21/21 unit test su `lib/lead-schema.ts`
- Verifica e2e manuale con Playwright headless (script temporaneo, non
  committato): flusso completo homepage → modulo 4 step → invio →
  redirect `/de/danke`; navigazione indietro preserva i dati; submit
  senza `privacyConsent` mostra il riepilogo errori senza reindirizzare
- Verifica manuale `curl` su `/api/leads`: successo, validazione fallita,
  rate limit (429 alla 6ª richiesta in 60s), honeypot (risposta fittizia)

## Test falliti o non eseguiti

- Nessun component test automatico per i singoli step del modulo.
- Nessuna suite e2e Playwright committata nel repository (solo verifica
  manuale ad-hoc in questa sessione).
- Non verificato: contrasto colori, screen reader reale, performance
  Lighthouse.

## Debito tecnico noto

- Vulnerabilità npm audit residue di severità alta in dipendenze dev
  (`eslint-config-next` → `glob`/`minimatch`), non runtime.
- `inMemoryLeads` e il rate limiter in `lib/rate-limit.ts` sono
  implementazioni temporanee a singola istanza — **non usare in
  produzione così come sono**.
- Nessun favicon configurato (richiesta `GET /favicon.ico` risulta in
  404 nel browser) — cosmetico, da sistemare in Fase 5 (SEO-001).
- `zod` è alla v4; alcune API sono cambiate rispetto a v3 (`errorMap` →
  `error`, `z.literal(true)` incompatibile con `defaultValues` di RHF —
  risolto usando `z.boolean().refine()` per `privacyConsent`, vedi nota
  in `docs/IMPLEMENTATION_PLAN.md` FORM-006).
- `playwright` è stato aggiunto come devDependency per la verifica manuale
  di questa sessione; nessun file di test e2e è stato ancora creato
  (previsto in QA-002).

## Placeholder ancora presenti

- Landing locali (Visp/Brig/Naters): solo hero minimo.
- Pagine informative (`so-funktionierts`, `faq`, `ueber-cleyra`,
  `kontakt`): solo H1/placeholder minimo.
- Pagine legali: `TODO LEGAL REVIEW`.
- `/de/danke`: nessun dato dinamico del lead mostrato.

## Dati o credenziali ancora necessari dal proprietario

- Provider database, e-mail transazionale, storage foto.
- Contatti reali (e-mail, telefono, orari, indirizzo).
- Testi legali approvati.
- Conferma delle località realmente servite attorno a Naters.
- ID Google Tag Manager (Fase 5).

## Prossime attività consigliate (max 5)

1. API-002 — Scegliere e collegare un database reale (sblocca la
   persistenza vera dei lead, oggi solo in memoria)
2. LOCAL-002/003/004 — Contenuto completo a 10 sezioni per le landing
   locali (oggi solo hero minimo)
3. QA-001/QA-002 — Formalizzare test automatici (component test per gli
   step del modulo, suite e2e Playwright committata)
4. API-003/FORM-005 — Storage privato per allegati e upload reale
5. INFO-001 — Copy completo per le pagine informative rimanenti
