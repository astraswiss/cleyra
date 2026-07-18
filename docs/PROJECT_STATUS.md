Last updated: 2026-07-18 02:40 Europe/Zurich
Current phase: Fase 1–2–3 avanzate in parallelo (fondazioni, homepage, landing locali, modulo lead ristrutturato a 3 passaggi); Fase 4 (backend) parziale; sistema di design ripristinato ai default, rimandato a fine progetto
Overall status: in_progress
Current branch: claude/new-session-huwuyt
Last verified commit: 25e2773 (form snellito, 4 step) — questa sessione aggiunge un nuovo commit sopra

## Cosa è già funzionante

- Tutto il checkpoint precedente (Fase 0/1: continuity docs, scaffold, 14 rotte, header/footer/menu mobile).
- **Sistema di design**: era stato introdotto e poi completamente
  annullato su richiesta del proprietario (DEC-20260718-01/02); il sito
  usa i colori/font di default di Tailwind. Rimandato a fine progetto
  (task DESIGN-001 `BLOCKED` in `docs/IMPLEMENTATION_PLAN.md`).
- Homepage `/de` completa con tutte le sezioni 8.1–8.9.
- **Landing locali complete** (Visp, Brig-Glis, Naters): template
  condiviso `components/marketing/LocationLandingPage.tsx` che assembla
  le 10 sezioni richieste dalla spec (sezione 9) usando i dati di
  `lib/locations.ts` — hero locale, trust strip, modulo con
  città/CAP precompilati, come funziona, servizi, zone vicine con link
  reciproci verso le altre due landing (nessun self-link), trasparenza
  Cleyra, FAQ con almeno una domanda locale unica per città, CTA finale,
  footer globale. Verificato con Playwright: H1 corretto, modulo
  precompilato, FAQ locale visibile, link incrociati corretti, tutte le
  route rispondono `200`.
- **Modulo lead ristrutturato a 3 passaggi** (DEC-20260718-04, proposta
  del proprietario elaborata con ChatGPT), completo e funzionante
  end-to-end:
  - Passaggio 1 (Wo und wann): CAP, Ort, Art der Reinigung, data esatta
    o "Ich bin flexibel" (il campo data appare solo se si sceglie
    "Genaues Datum").
  - Passaggio 2 (Wohnung): Anzahl Zimmer, Wohnfläche a fasce (<50/
    50–80/81–110/>110/nicht bekannt), "Ist die Wohnung leer?"
    (Ja/Teilweise/Nein), Zusätzliche Bereiche (Fenster/Balkon/Keller +
    opzione "Keine" che azzera gli altri), Bemerkungen. **Nessun campo
    Art der Immobilie** (rimosso, non richiesto dalla proposta).
  - Passaggio 3 (Kontakt): nome, telefono, email, contatto preferito
    (ora incluso **WhatsApp**), consenso privacy. **Nessun consenso
    marketing separato** (rimosso).
  - **Foto**: non più nel modulo principale — proposte come passo
    facoltativo nella pagina `/de/danke` dopo l'invio riuscito, così non
    rallentano la richiesta principale.
  - Persistenza in `sessionStorage`, navigazione avanti/indietro senza
    perdita dati, focus sul primo campo errato, riepilogo errori
    accessibile, honeypot, prevenzione doppio invio. Accetta
    `initialValues` per precompilare città/CAP dalle landing locali.
  - Verificato con Playwright: il campo data si nasconde/mostra
    correttamente, "Keine" azzera gli altri checkbox e viceversa, il
    campo Art der Immobilie non esiste più, WhatsApp è selezionabile, il
    flusso completo termina su `/de/danke?lead=<leadId>` con la
    referenza visibile e il prompt foto funzionante (invio confermato,
    log server senza PII).
- Endpoint `/api/leads` reale (non uno stub): valida con Zod,
  normalizza email/telefono, sanitizza `notes`, applica rate limiting
  (5 richieste/60s per IP) e honeypot server-side, risponde con i codici
  della spec, e ora include `?lead=<leadId>` nel `redirectUrl`. Log
  senza dati personali.
- Nuovo endpoint `/api/leads/photos` per l'invio facoltativo di foto
  dalla pagina di conferma: stessa logica "nessuna persistenza reale"
  del resto del sito (TODO API-003), log senza PII.
- Schema dati `lib/lead-schema.ts` e dati location `lib/locations.ts`
  con 28 unit test verdi (Vitest): 23 sullo schema lead (incl. la
  validazione incrociata `dateOption`/`desiredDate`), 5 sui dati delle
  landing locali.
- `lib/attribution.ts`: cattura UTM/GCLID/GBRAID/WBRAID/referrer al primo
  touch della sessione, inclusa nel payload verso `/api/leads` (non
  ancora persistita né usata da analytics).
- `npm run build`, `npm run lint`, `npx vitest run` tutti verdi.

## Cosa è parzialmente funzionante

- **Foto**: ora proposte nella pagina `/de/danke` (non più nel modulo
  principale), selezione/rimozione lato client con validazione, ma
  **nessun upload reale**: solo `photoCount` viene inviato al nuovo
  endpoint `/api/leads/photos`. Bloccato su API-003 (storage privato non
  ancora scelto/collegato).
- **Persistenza lead**: l'endpoint valida e "accetta" la richiesta ma la
  tiene solo in un array in memoria di processo (`inMemoryLeads`), non
  in un database. Si perde a ogni riavvio/cold start. **Non è una
  persistenza reale** — bloccato su API-002.
- **E-mail**: nessuna e-mail di conferma o notifica interna viene inviata
  (nessun provider collegato) — bloccato su API-005.
- `so-funktionierts`, `faq`, `ueber-cleyra`, `kontakt`: ancora solo
  placeholder minimi, non il copy/struttura completa della spec.
- `/de/danke`: copy statico presente ma non mostra ancora dati reali del
  lead né emette l'evento `lead_submitted` (dipende da TRACK-001).

## Cosa non è ancora iniziato

- Database reale, storage foto, provider e-mail (Fase 4 rimanente).
- SEO tecnico oltre ai metadata di base: sitemap.xml, robots.txt, JSON-LD.
- GTM, dataLayer, consent management (Fase 5).
- Test automatici formalizzati oltre agli unit test: nessun component
  test per gli step del modulo, nessuna suite e2e Playwright committata
  (le verifiche e2e finora sono state script ad-hoc, non salvati nel
  repository).
- Contenuto completo delle pagine informative (`so-funktionierts`,
  `faq`, `ueber-cleyra`, `kontakt`).
- Sistema di design (rimandato di proposito, vedi DESIGN-001).

## Attività attualmente in corso

Nessuna: checkpoint di fine sessione.

## Blocchi e decisioni richieste

- Provider database, e-mail transazionale e storage foto non ancora
  scelti (`docs/DECISIONS.md` DEC-20260717-02) — bloccante per
  persistenza lead reale, upload foto reale, e invio e-mail.
- Testi legali definitivi non ancora forniti — bloccante per pubblicazione.
- Contatti reali non ancora forniti.
- Conferma zone servite attorno a Naters non ancora ricevuta (i comuni
  vicini elencati in `lib/locations.ts` sono una stima geografica, non
  confermata dal proprietario).
- Il rate limiter e lo store lead in memoria **non sono adatti a un
  ambiente multi-istanza o serverless** — da sostituire insieme alla
  scelta del database.
- Sistema di design: rimandato di proposito a fine progetto (DESIGN-001,
  `BLOCKED`) — non riprendere senza richiesta esplicita del proprietario.

## Test attualmente verdi

- `npm run build` (18 route, typecheck+lint inclusi)
- `npm run lint`
- `npx vitest run` — 28/28 (23 schema lead + 5 dati location)
- Verifica e2e manuale con Playwright headless (script ad-hoc, non
  committati): modulo lead completo dalla homepage; landing Visp con
  precompilazione città/CAP, FAQ locale, link incrociati corretti

## Test falliti o non eseguiti

- Nessun component test automatico per i singoli step del modulo.
- Nessuna suite e2e Playwright committata nel repository.
- Non verificato: contrasto colore, screen reader reale, performance
  Lighthouse.

## Debito tecnico noto

- Vulnerabilità npm audit residue di severità alta in dipendenze dev
  (`eslint-config-next` → `glob`/`minimatch`), non runtime.
- `inMemoryLeads` e il rate limiter in `lib/rate-limit.ts` sono
  implementazioni temporanee a singola istanza — **non usare in
  produzione così come sono**.
- Nessun favicon configurato.
- `zod` è alla v4; vedi nota in `docs/IMPLEMENTATION_PLAN.md` (FORM-006)
  sulla scelta `z.boolean().refine()` invece di `z.literal(true)`.
- `playwright` è una devDependency usata solo per verifiche manuali
  ad-hoc finora; nessun file di test e2e committato (QA-002).

## Placeholder ancora presenti

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
2. INFO-001 — Copy completo per le pagine informative rimanenti
3. QA-001/QA-002 — Formalizzare test automatici (component test per gli
   step del modulo, suite e2e Playwright committata)
4. API-003/FORM-005 — Storage privato per allegati e upload reale
5. SEO-001 — Metadata avanzati, canonical, sitemap.xml, robots.txt
