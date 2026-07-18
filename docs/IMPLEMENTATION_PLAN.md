# Implementation Plan — Backlog

Regole: un solo task `in_progress` alla volta; non cancellare i task completati; non
segnare `done` con checkbox incomplete; ogni nuovo problema crea un nuovo task o una voce
in `KNOWN_ISSUES.md`.

---

## WEB-000 — Memoria di progetto (Fase 0)
Status: done
Priority: P0
Dependencies: none

### Goal
Creare e inizializzare tutta la struttura di memoria obbligatoria del repository prima
di scrivere qualsiasi codice applicativo.

### Acceptance criteria
- [x] `CLAUDE.md` creato con le regole operative.
- [x] `CLEYRA_WEBSITE_SPEC.md` presente nella root.
- [x] Tutti i file obbligatori creati dentro `docs/`.
- [x] Backlog iniziale con task ID e criteri di accettazione.
- [x] Decisione architetturale iniziale registrata in `DECISIONS.md`.
- [x] Un solo prossimo task impostato `in_progress` (WEB-001).
- [x] `PROJECT_STATUS.md` aggiornato.
- [x] `SESSION_HANDOFF.md` scritto con l'azione esatta successiva.

### Validation
- Revisione manuale della struttura file.

### Notes
Nessun codice applicativo scritto in questa fase, come richiesto dalla specifica.

---

## WEB-001 — Setup dello stack tecnico
Status: done
Priority: P0
Dependencies: WEB-000

### Goal
Inizializzare il progetto Next.js (App Router) con TypeScript strict, Tailwind CSS,
ESLint, Vitest e Playwright, secondo lo stack di default registrato in ADR-001. Il
repository era vuoto: nessuno stack esistente da rispettare.

### Acceptance criteria
- [x] Progetto Next.js con App Router inizializzato (Next.js 16, `src/app`).
- [x] `tsconfig.json` con `strict: true`.
- [x] Tailwind CSS configurato e funzionante.
- [x] ESLint configurato con regole Next.js/TypeScript (`eslint.config.mjs`).
- [x] Vitest configurato con almeno un test di esempio verde
      (`tests/unit/sanity.test.ts`).
- [x] Playwright configurato con almeno uno smoke test di esempio
      (`tests/e2e/smoke.spec.ts`, eseguito con Chromium preinstallato
      dell'ambiente).
- [x] `package.json` con script `lint`, `typecheck`, `test`, `build` (più `dev`,
      `start`, `e2e`).
- [x] Progetto avviabile in locale (`npm run dev`) senza errori — verificato con
      richiesta HTTP 200 su `/`.
- [x] Nessuna dipendenza non necessaria aggiunta (solo Next/React/Tailwind/Zod/
      Vitest/Playwright/ESLint e relativi type/plugin).

### Validation
- `npm run lint` — verde
- `npm run typecheck` — verde
- `npm test` — verde (1/1 test)
- `npm run build` — verde

### Notes
Non implementate ancora landing, form o backend: solo fondazioni di progetto, come
previsto. La home page (`src/app/page.tsx`) è un placeholder minimo ("Cleyra — Projekt
in Aufbau"), non la landing finale (task WEB-003). Zod installato ma non ancora
utilizzato (verrà usato da WEB-006 in poi). Il browser Chromium per Playwright non è
scaricato automaticamente nell'ambiente di sviluppo: `playwright.config.ts` punta a
`/opt/pw-browsers/chromium` preinstallato.

---

## WEB-002 — Environment validation e scheletro rotte
Status: done
Priority: P0
Dependencies: WEB-001

### Goal
Creare la struttura di rotte App Router per tutte le pagine MVP (vedi sezione 5 della
spec) con validazione delle variabili d'ambiente tipizzata, layout di base e styling
condiviso, senza ancora contenuti finali.

### Acceptance criteria
- [x] Rotte create per: `/de/endreinigung-oberwallis`, `/de/so-funktionierts`,
      `/de/faq`, `/de/ueber-cleyra`, `/de/kontakt`, `/de/datenschutz`,
      `/de/impressum`, `/de/vermittlungsbedingungen`, `/de/danke`.
- [x] Layout condiviso (header/footer placeholder) applicato a tutte le rotte
      (`src/app/de/layout.tsx`).
- [x] Validazione tipizzata delle variabili d'ambiente con Zod (`src/lib/env.ts`);
      schema attualmente vuoto in assenza di variabili richieste, pronto a
      espandersi (es. `DATABASE_URL` in WEB-010) e a fallire il parsing/build quando
      variabili obbligatorie mancano.
- [x] `/de/danke` marcata `noindex` (`metadata.robots`, verificato via HTML renderizzato:
      `<meta name="robots" content="noindex, nofollow"/>`).
- [x] Ogni pagina renderizza senza errori con contenuto placeholder minimo (verificato
      con `next build` — 9 rotte statiche generate — e controllo manuale di
      `/de/kontakt` e `/de/danke` via server di sviluppo).

### Validation
- `npm run lint` — verde
- `npm run typecheck` — verde
- `npm test` — verde (2/2, incluso nuovo test per `env.ts`)
- `npm run build` — verde (9 rotte `/de/*` generate come contenuto statico)
- `npx playwright test` — verde (smoke test aggiornato per il redirect della root)

### Notes
`docs/ARCHITECTURE.md` aggiornato con la struttura cartelle e le rotte reali. La root
`/` non ha più una pagina propria: redirect (307) verso `/de/endreinigung-oberwallis`
configurato in `next.config.ts`, decisione registrata in ADR-004. Contenuti delle
pagine ancora placeholder minimi (solo H1 + "Seite in Aufbau."): i testi finali
arrivano con WEB-003 (landing), WEB-005 (FAQ/footer/legal), WEB-012 (danke).

---

## WEB-003 — Header, Hero, elementi di fiducia
Status: done
Priority: P0
Dependencies: WEB-002

### Goal
Implementare header, sezione hero e i tre elementi di fiducia della landing principale
`/de/endreinigung-oberwallis`, con i testi definiti in `CONTENT.md`.

### Acceptance criteria
- [x] Header con navigazione minima (logo/nome Cleyra, link legali essenziali) — logo
      "Cleyra" nell'header condiviso (`src/app/de/layout.tsx`, da WEB-002), link legali
      (Datenschutz/Impressum/Vermittlungsbedingungen/Kontakt) nel footer condiviso,
      presente su ogni pagina incluso `/de/endreinigung-oberwallis`.
- [x] Hero con H1, sottotitolo, CTA e microcopy esatti da `CONTENT.md`.
- [x] Tre elementi di fiducia (Kostenlose Anfrage, Offerte vor Auftrag, Regionale
      Vermittlung) presenti e coerenti col copy approvato.
- [x] Nessun elemento vietato (recensioni, contatori, timer, urgenza finta) — verifica
      manuale del markup, nessuno di questi elementi presente.
- [x] Layout mobile-first, usabile a 320px — verificato con screenshot Playwright a
      viewport 320×700, nessun overflow, contenuto leggibile.

### Validation
- `npm run lint` — verde
- `npm run typecheck` — verde
- `npm test` — verde (2/2)
- `npm run build` — verde
- `npx playwright test` — verde (1/1, heading Hero verificato via substring match)

### Notes
La CTA "Kostenlose Anfrage starten" punta per ora a un'ancora placeholder
(`#anfrage`) senza funzionalità di invio: il form vero e proprio arriva con
WEB-006/WEB-007, quando la sezione con `id="anfrage"` verrà creata. Il `<title>`
della pagina resta il placeholder impostato in WEB-002 (`Endreinigung im Oberwallis —
Cleyra`): il title/description SEO definitivi da spec sezione 13 sono compito di
WEB-017.

---

## WEB-004 — Processo, servizi, zona servita, trasparenza
Status: in_progress
Priority: P1
Dependencies: WEB-003

### Goal
Implementare le sezioni: processo in tre passaggi, cosa può comprendere la pulizia, zona
servita, spiegazione dell'intermediazione (disclaimer legale obbligatorio).

### Acceptance criteria
- [ ] Sezione processo con i tre passaggi testuali esatti.
- [ ] Sezione servizi coerente con `serviceType` del form (nessuna promessa di prezzo).
- [ ] Sezione zona servita che menziona Visp, Brig-Glis, Naters senza creare pagine
      dedicate per città.
- [ ] Disclaimer di intermediazione (testo obbligatorio) visibile e non modificato.
- [ ] Copy coerente con `CONTENT.md`.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-005 — FAQ, footer, pagine legali
Status: todo
Priority: P1
Dependencies: WEB-004

### Goal
Implementare la sezione FAQ e il footer della landing, oltre alle pagine
`/de/datenschutz`, `/de/impressum`, `/de/vermittlungsbedingungen` con contenuto reale
(non placeholder).

### Acceptance criteria
- [ ] Sezione FAQ con domande/risposte coerenti con `CONTENT.md`.
- [ ] Footer con link a tutte le pagine legali e disclaimer di intermediazione.
- [ ] Pagine `/de/datenschutz`, `/de/impressum`, `/de/vermittlungsbedingungen`
      pubblicate con contenuto reale, non lorem ipsum.
- [ ] Link legali raggiungibili da ogni pagina.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
Il contenuto legale definitivo (Impressum/Datenschutz) richiede dati reali
dell'organizzazione: se non disponibili, registrare un blocco in `KNOWN_ISSUES.md`
invece di inventare dati.

---

## WEB-006 — Form step 1 (richiesta) — UI e validazione client
Status: todo
Priority: P0
Dependencies: WEB-003

### Goal
Implementare il passaggio 1 del form (postalCode, city, serviceType, dateMode,
desiredDate/desiredPeriod, rooms, propertyEmpty, notes) secondo `FORM_SPEC.md`, con
validazione client e logica condizionale.

### Acceptance criteria
- [ ] Tutti i campi del passaggio 1 implementati con i tipi ed etichette esatte.
- [ ] Logica condizionale `dateMode` → `desiredDate` / `desiredPeriod` funzionante.
- [ ] Validazione client (CAP a 4 cifre, data non passata, campi obbligatori).
- [ ] Indicatore `Schritt 1 von 2` e microcopy tempo stimato.
- [ ] Campi tecnici nascosti (UTM/GCLID/referrer/timestamp/versioni) catturati
      client-side.
- [ ] Accessibilità di base: label associate, errori collegati ai campi, tastiera.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
Non implementare ancora l'invio al server: solo UI e stato locale del form.

---

## WEB-007 — Form step 2 (contatti) — UI, consenso e validazione client
Status: todo
Priority: P0
Dependencies: WEB-006

### Goal
Implementare il passaggio 2 del form (fullName, phone, email, preferredContact,
privacyConsent) secondo `FORM_SPEC.md`.

### Acceptance criteria
- [ ] Tutti i campi del passaggio 2 implementati con etichette esatte.
- [ ] Checkbox di consenso privacy non preselezionata, testo esatto da `CONTENT.md`.
- [ ] Pulsante di invio con testo esatto `Kostenlose Anfrage senden`.
- [ ] Validazione client (email, telefono, consenso obbligatorio).
- [ ] Possibilità di tornare al passaggio 1 senza perdere i dati inseriti.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-008 — Stati del form, errori e accessibilità completa
Status: todo
Priority: P1
Dependencies: WEB-007

### Goal
Completare gli stati UI del form (idle, validating, submitting, success, field error,
server error, protezione doppio invio) e rifinire accessibilità e responsive.

### Acceptance criteria
- [ ] Tutti gli stati UI elencati in `FORM_SPEC.md` implementati.
- [ ] Dopo un errore recuperabile i campi validi non vengono cancellati.
- [ ] Protezione doppio invio (pulsante disabilitato durante submitting).
- [ ] `aria-live` per messaggi di errore/successo.
- [ ] Test manuale a 320px di larghezza e con sola tastiera.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-009 — Validazione server e endpoint di invio
Status: todo
Priority: P0
Dependencies: WEB-007

### Goal
Creare la route/server action che riceve il payload del form, lo valida con Zod come
fonte autorevole (indipendentemente dalla validazione client) e prepara il flusso di
salvataggio.

### Acceptance criteria
- [ ] Schema Zod server-side coerente con `FORM_SPEC.md`.
- [ ] Payload invalido rifiutato con errori strutturati per campo.
- [ ] Normalizzazione server-side di telefono ed e-mail.
- [ ] Limite dimensione payload applicato.
- [ ] Nessun segreto esposto al client.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-010 — Database e persistenza del lead
Status: todo
Priority: P0
Dependencies: WEB-009

### Goal
Definire lo schema del lead (campi minimi da spec sezione 8) con Prisma su database
PostgreSQL compatibile, e persistere i lead validi.

### Acceptance criteria
- [ ] Schema Prisma con tutti i campi minimi elencati nella spec sezione 8.
- [ ] Stati lead iniziali implementati come enum (`new`, `notification_pending`, ecc.).
- [ ] Migrazione applicabile in locale.
- [ ] Lead valido salvato correttamente end-to-end (test di integrazione).
- [ ] Nessuna dashboard o UI di lettura dei lead creata.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
Registrare la scelta del provider PostgreSQL (locale/hosted) in `DECISIONS.md` quando
nota.

---

## WEB-011 — Anti-spam e deduplicazione
Status: todo
Priority: P1
Dependencies: WEB-010

### Goal
Implementare honeypot, rate limiting, tempo minimo di compilazione realistico,
deduplicazione breve e limiti di payload sull'endpoint di invio.

### Acceptance criteria
- [ ] Campo honeypot invisibile che scarta submission automatiche.
- [ ] Rate limiting per IP/finestra temporale.
- [ ] Controllo tempo minimo tra `form_view` e submit.
- [ ] Deduplicazione di submission identiche in una finestra breve.
- [ ] Nessun CAPTCHA introdotto in questa fase.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-012 — Pagina grazie e redirect
Status: todo
Priority: P0
Dependencies: WEB-010

### Goal
Completare il flusso: dopo submit valido, redirect a `/de/danke` con i contenuti definiti
in `CONTENT.md`, mostrando l'ID richiesta senza dati personali nell'URL.

### Acceptance criteria
- [ ] Redirect a `/de/danke` dopo submit riuscito.
- [ ] Titolo, testo e passi mostrati esattamente come da `CONTENT.md`.
- [ ] ID richiesta mostrato, nessun dato personale in query string o URL.
- [ ] Pagina `noindex`.
- [ ] Doppio submit non crea un secondo lead (verifica con WEB-011).

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-013 — E-mail interna
Status: todo
Priority: P0
Dependencies: WEB-010

### Goal
Inviare un'e-mail interna a Mirdita/Cleyra ad ogni lead salvato, con tutti i campi
richiesti dalla spec sezione 11.

### Acceptance criteria
- [ ] Adapter e-mail server-side scelto e registrato in `DECISIONS.md`.
- [ ] E-mail interna contiene tutti i campi elencati nella spec (lead ID, data/ora,
      zona, servizio, data/periodo, locali, immobile vuoto, note, nome, telefono,
      e-mail, preferenza contatto, attribution).
- [ ] Fallimento invio non blocca la persistenza del lead già salvato.
- [ ] Test con provider e-mail mockato.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
Decisione sul provider e-mail (es. SMTP transazionale) ancora da registrare: vedi
`DECISIONS.md` (nessuna decisione presa in Fase 0).

---

## WEB-014 — E-mail di conferma al cliente
Status: todo
Priority: P0
Dependencies: WEB-013

### Goal
Inviare al cliente l'e-mail di conferma con oggetto e corpo esatti da `CONTENT.md`
(spec sezione 11), includendo il riferimento lead ID.

### Acceptance criteria
- [ ] Oggetto e corpo e-mail esatti, nessuna promessa di tempi non garantiti.
- [ ] Riferimento (Lead-ID) incluso.
- [ ] Fallimento invio registrato ma non mostrato come errore tecnico al cliente.
- [ ] Test con provider e-mail mockato.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-015 — Stato notifiche e retry
Status: todo
Priority: P1
Dependencies: WEB-014

### Goal
Aggiornare `notificationStatus` del lead in base all'esito degli invii e-mail
(`notification_pending` → `notification_sent`/`notification_failed`) e documentare un
metodo di retry.

### Acceptance criteria
- [ ] Stato notifiche aggiornato correttamente per ogni esito.
- [ ] Metodo di retry documentato in `ARCHITECTURE.md` (anche se manuale in MVP).
- [ ] Lead mai perso in caso di fallimento e-mail.
- [ ] Test di integrazione per lo scenario "lead salvato, e-mail fallita".

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-016 — Analytics: eventi, UTM, GCLID, consenso
Status: todo
Priority: P1
Dependencies: WEB-012

### Goal
Implementare tutti gli eventi elencati in `ANALYTICS.md`, la cattura di UTM/GCLID e il
rispetto del consenso, senza inviare dati personali agli analytics.

### Acceptance criteria
- [ ] Tutti gli eventi della spec sezione 12 implementati.
- [ ] `lead_submit_success` come conversione primaria verificata.
- [ ] UTM e GCLID salvati sul lead e non inviati come evento con dati personali.
- [ ] Nessun dato personale (nome, telefono, email, note, indirizzo) presente nei
      payload analytics.
- [ ] Verifica manuale con strumento di debug eventi.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
Registrare in `DECISIONS.md` lo strumento di analytics scelto quando deciso (non
deciso in Fase 0).

---

## WEB-017 — SEO: metadata, sitemap, robots
Status: todo
Priority: P1
Dependencies: WEB-005

### Goal
Completare i requisiti SEO minimi: title/description/H1 della landing, canonical,
sitemap, robots, noindex per success page e ambienti di test, Open Graph base.

### Acceptance criteria
- [ ] Title/description/H1 esatti da spec sezione 13 sulla landing principale.
- [ ] Canonical impostato su tutte le pagine indicizzabili.
- [ ] Sitemap generata con le rotte MVP indicizzabili.
- [ ] Robots configurato correttamente (danke e ambienti di test esclusi).
- [ ] Open Graph di base presente.
- [ ] Nessun dato LocalBusiness o review schema inventato.

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-018 — Test unitari e di integrazione
Status: todo
Priority: P0
Dependencies: WEB-011, WEB-015, WEB-016

### Goal
Coprire con test unitari e di integrazione gli scenari minimi della spec sezione 15
(schema, date, CAP, normalizzazione telefono/e-mail, UTM/GCLID, payload e-mail, lead
valido/invalido, rate limit, notifiche, consenso, attribution).

### Acceptance criteria
- [ ] Tutti gli scenari unit elencati in spec sezione 15 coperti.
- [ ] Tutti gli scenari integration elencati in spec sezione 15 coperti.
- [ ] `npm test` verde.
- [ ] Copertura ragionevole su validazione e persistenza (nessuna soglia arbitraria
      imposta).

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
—

---

## WEB-019 — Test end-to-end (Playwright)
Status: todo
Priority: P0
Dependencies: WEB-018

### Goal
Implementare il flusso end-to-end completo (spec sezione 15) più gli scenari di errore
(email/telefono errati, data passata, modalità flessibile, server error, rete lenta,
tastiera, viewport mobile).

### Acceptance criteria
- [ ] Flusso e2e completo (visita → form step 1 → step 2 → consenso → invio → danke)
      verde.
- [ ] Doppio clic non crea un lead duplicato (verifica e2e).
- [ ] Scenari di errore elencati nella spec coperti da test.
- [ ] Test eseguibili in CI locale (`npx playwright test`).

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npx playwright test`

### Notes
—

---

## WEB-020 — QA checklist e rifinitura
Status: todo
Priority: P1
Dependencies: WEB-019

### Goal
Eseguire manualmente `QA_CHECKLIST.md` (mobile, desktop, tastiera, screen reader,
performance, link legali, ecc.) e correggere i problemi trovati.

### Acceptance criteria
- [ ] Ogni voce di `QA_CHECKLIST.md` verificata e spuntata o collegata a un problema in
      `KNOWN_ISSUES.md`.
- [ ] Nessun blocco critico aperto.

### Validation
- Esecuzione manuale della checklist.

### Notes
—

---

## WEB-021 — Deploy produzione e smoke test
Status: todo
Priority: P0
Dependencies: WEB-020

### Goal
Distribuire il sito in produzione secondo `DEPLOYMENT.md`, eseguire lo smoke test
post-deploy e documentare rollback e backup.

### Acceptance criteria
- [ ] Ambiente di produzione configurato con le variabili documentate (nessun segreto
      nel repository).
- [ ] Dominio e DNS configurati.
- [ ] Smoke test post-deploy eseguito e verde.
- [ ] Procedura di rollback documentata e verificata almeno concettualmente.
- [ ] `DEPLOYMENT.md` aggiornato con lo stato reale.

### Validation
- Smoke test manuale in produzione.

### Notes
—
