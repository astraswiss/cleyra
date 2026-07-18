# CLEYRA — Website MVP + memoria persistente per Claude Code

> Documento master da mettere nella root del repository come `CLEYRA_WEBSITE_SPEC.md`.
>
> Obiettivo: costruire il primo sito Cleyra in tedesco per raccogliere lead di **Endreinigung im Oberwallis**, senza trasformare il progetto in un marketplace o in un software complesso.
>
> Regola fondamentale: **nessuna informazione importante deve vivere soltanto nella chat**. Stato, decisioni, problemi e prossimi passi devono essere salvati nei file `.md` del repository.

---

## 1. Prodotto da costruire

Cleyra è inizialmente un servizio di intermediazione:

1. una persona cerca una pulizia di fine locazione;
2. arriva sulla landing page Cleyra;
3. compila una richiesta breve e gratuita;
4. Cleyra salva e verifica il lead;
5. Mirdita riceve la richiesta;
6. il cliente riceve conferma;
7. Mirdita contatta il cliente e prepara l'offerta.

### Domanda da validare

> Cleyra riesce a generare richieste valide e profittevoli per Mirdita nel mercato dell'Oberwallis?

### Mercato iniziale

- lingua: tedesco;
- regione: Oberwallis;
- focus: Visp, Brig-Glis, Naters e dintorni realmente serviti;
- servizio principale: `Endreinigung zur Wohnungsabgabe`;
- servizio secondario: `Umzugsreinigung`;
- primo partner operativo: Mirdita.

### Posizionamento obbligatorio

Cleyra non deve fingere di essere l'impresa che esegue la pulizia.

Testo obbligatorio:

```text
Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Vertrag über die Reinigung entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.
```

### Fuori scope

Non costruire in questa fase:

- login o registrazione;
- area clienti;
- area partner;
- dashboard;
- marketplace;
- vendita automatica dei lead;
- pagamenti;
- preventivo automatico;
- calendario disponibilità;
- applicazione mobile;
- sistema recensioni;
- profili pubblici dei partner;
- chatbot;
- portale amministrativo complesso;
- versione francese;
- campagne pubblicitarie dentro il codice;
- CRM completo.

---

# 2. Memoria attiva obbligatoria

Claude Code deve creare e mantenere questa struttura:

```text
/
├── CLAUDE.md
├── README.md
├── CLEYRA_WEBSITE_SPEC.md
└── docs/
    ├── PROJECT_CHARTER.md
    ├── PROJECT_STATUS.md
    ├── IMPLEMENTATION_PLAN.md
    ├── ARCHITECTURE.md
    ├── CONTENT.md
    ├── FORM_SPEC.md
    ├── ANALYTICS.md
    ├── DECISIONS.md
    ├── KNOWN_ISSUES.md
    ├── QA_CHECKLIST.md
    ├── DEPLOYMENT.md
    ├── SESSION_LOG.md
    └── SESSION_HANDOFF.md
```

Questi file sono parte del prodotto. Una sessione non è conclusa se non sono aggiornati.

## 2.1 Gerarchia delle fonti

In caso di conflitto:

1. ultima istruzione esplicita dell'utente;
2. `CLEYRA_WEBSITE_SPEC.md`;
3. decisioni accettate in `docs/DECISIONS.md`;
4. `CLAUDE.md`;
5. `docs/PROJECT_STATUS.md`;
6. `docs/IMPLEMENTATION_PLAN.md`;
7. altri documenti;
8. assunzioni della sessione corrente.

Non risolvere un conflitto in silenzio. Documentarlo e scegliere l'opzione minima e reversibile.

## 2.2 `CLAUDE.md`

Deve contenere le regole operative permanenti.

Contenuto minimo:

```md
# Claude Code — Regole operative Cleyra

## All'inizio di ogni sessione
1. Leggi CLEYRA_WEBSITE_SPEC.md.
2. Leggi docs/PROJECT_STATUS.md.
3. Leggi docs/SESSION_HANDOFF.md.
4. Leggi docs/IMPLEMENTATION_PLAN.md.
5. Leggi le decisioni rilevanti in docs/DECISIONS.md.
6. Esegui git status.
7. Seleziona un solo task piccolo.

## Prima di modificare
- Comunica task ID, obiettivo, file coinvolti e criteri di accettazione.
- Non ampliare lo scope.
- Non cambiare stack senza una decisione registrata.

## Prima di chiudere
- Esegui i controlli pertinenti.
- Aggiorna IMPLEMENTATION_PLAN.md.
- Aggiorna PROJECT_STATUS.md.
- Aggiorna DECISIONS.md se necessario.
- Aggiorna KNOWN_ISSUES.md.
- Aggiungi una voce a SESSION_LOG.md.
- Riscrivi SESSION_HANDOFF.md con il punto esatto da cui ripartire.

## Regole non negoziabili
- Cleyra è un intermediario.
- MVP solo in tedesco.
- Una sola landing principale.
- Form breve in due passaggi.
- Nessun account, dashboard, pagamento o marketplace.
- Non inventare recensioni, numeri, certificazioni o garanzie.
- Non dichiarare completato un task senza verifica.
```

## 2.3 `PROJECT_CHARTER.md`

Documento stabile con:

- scopo del progetto;
- cliente target;
- mercato;
- proposta di valore;
- KPI del pilot;
- confini MVP;
- stakeholder;
- vincoli;
- posizionamento legale.

## 2.4 `PROJECT_STATUS.md`

Fotografia sintetica dello stato attuale.

Formato obbligatorio:

```md
# Project Status

Last updated: YYYY-MM-DD HH:MM Europe/Zurich
Current phase:
Current branch:
Current task:
Overall state: not started | in progress | blocked | review | deployed

## Completed
- ...

## In progress
- ...

## Next three tasks
1. ...
2. ...
3. ...

## Blockers
- none | ...

## Test status
- lint:
- typecheck:
- tests:
- build:

## Deployment
- ...
```

Non usarlo come diario: deve rimanere breve.

## 2.5 `IMPLEMENTATION_PLAN.md`

Backlog ufficiale. Ogni task deve avere un ID stabile.

Formato:

```md
## WEB-001 — Titolo
Status: todo | in_progress | blocked | review | done
Priority: P0 | P1 | P2
Dependencies: none

### Goal
...

### Acceptance criteria
- [ ] ...
- [ ] ...

### Validation
- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`

### Notes
...
```

Regole:

- un solo task `in_progress`;
- non cancellare i task completati;
- non segnare `done` con checkbox incomplete;
- ogni nuovo problema crea un nuovo task o una voce in `KNOWN_ISSUES.md`.

## 2.6 `ARCHITECTURE.md`

Deve descrivere:

- stack;
- struttura cartelle;
- rotte;
- componenti;
- confine client/server;
- flusso del form;
- validazione;
- persistenza;
- e-mail;
- analytics;
- variabili ambiente;
- sicurezza;
- deploy;
- gestione errori.

Ogni modifica strutturale aggiorna questo file nella stessa sessione.

## 2.7 `CONTENT.md`

Unica fonte per i testi finali del sito:

- navigazione;
- hero;
- CTA;
- trust point;
- sezioni;
- FAQ;
- form;
- errori;
- pagina grazie;
- e-mail;
- footer;
- disclaimer.

Una modifica al copy nel codice richiede una modifica a `CONTENT.md`.

## 2.8 `FORM_SPEC.md`

Deve contenere:

- campi;
- tipi;
- obbligatorietà;
- validazione;
- logica condizionale;
- errori;
- consenso;
- payload;
- mapping database;
- eventi;
- anti-spam;
- accessibilità;
- stati di invio.

Il form non può divergere silenziosamente dal documento.

## 2.9 `ANALYTICS.md`

Deve contenere:

- conversione primaria;
- eventi;
- parametri;
- UTM;
- GCLID;
- consenso;
- test;
- dati vietati negli eventi.

## 2.10 `DECISIONS.md`

Registro append-only.

```md
## ADR-001 — Titolo
Date: YYYY-MM-DD
Status: proposed | accepted | superseded
Context:
Decision:
Alternatives:
Consequences:
Affected files:
Supersedes:
```

Non cancellare decisioni vecchie: marcarle `superseded`.

## 2.11 `KNOWN_ISSUES.md`

Per ogni problema:

- ID;
- severità;
- stato;
- riproduzione;
- risultato atteso;
- risultato reale;
- workaround;
- task collegato.

## 2.12 `QA_CHECKLIST.md`

Checklist per:

- mobile;
- desktop;
- tastiera;
- screen reader;
- form valido;
- form non valido;
- doppio invio;
- server error;
- e-mail;
- database;
- analytics;
- UTM/GCLID;
- consenso;
- SEO;
- 404;
- link legali;
- performance;
- produzione.

## 2.13 `DEPLOYMENT.md`

Deve documentare:

- ambienti;
- variabili;
- dominio;
- DNS;
- build;
- migrazioni;
- smoke test;
- rollback;
- backup;
- controlli post-deploy.

Mai salvare segreti.

## 2.14 `SESSION_LOG.md`

Aggiungere una voce per ogni sessione:

```md
## YYYY-MM-DD HH:MM — Titolo

Task:
Summary:
Files changed:
Commands run:
Tests:
Decisions:
Issues discovered:
Next recommended action:
```

## 2.15 `SESSION_HANDOFF.md`

Va sostituito alla fine di ogni sessione:

```md
# Session Handoff

Updated: YYYY-MM-DD HH:MM Europe/Zurich

## Current objective
...

## Current task
Task ID:
Status:

## Completed
- ...

## Remaining
- ...

## Exact next action
1. Apri ...
2. Modifica ...
3. Esegui ...
4. Verifica ...

## Relevant files
- ...

## Commands to run first
- ...

## Blockers
- none | ...

## Do not forget
- ...

## Working assumptions
- ...
```

Il prossimo Claude deve poter ripartire senza leggere la chat.

---

# 3. Protocollo delle sessioni

## Inizio sessione

Claude deve:

1. leggere `CLAUDE.md`;
2. leggere questa specifica;
3. leggere stato, handoff e piano;
4. leggere le decisioni rilevanti;
5. eseguire `git status`;
6. controllare modifiche non concluse;
7. confermare un solo task;
8. dichiarare obiettivo, file e criteri;
9. iniziare soltanto dopo.

## Durante la sessione

- modifiche piccole e coerenti;
- progetto sempre avviabile;
- niente refactoring non collegati;
- copy aggiornato anche in `CONTENT.md`;
- form aggiornato anche in `FORM_SPEC.md`;
- analytics aggiornati anche in `ANALYTICS.md`;
- architettura aggiornata anche in `ARCHITECTURE.md`;
- problemi registrati subito;
- nessun file temporaneo inspiegato.

## Fine sessione

1. eseguire test pertinenti;
2. eseguire lint;
3. eseguire typecheck;
4. eseguire build quando necessario;
5. controllare `git diff`;
6. controllare che non ci siano segreti;
7. verificare i criteri;
8. aggiornare task;
9. aggiornare stato;
10. aggiornare decisioni;
11. aggiornare problemi;
12. aggiornare log;
13. riscrivere handoff;
14. dichiarare cosa è passato e cosa no.

---

# 4. Stack tecnico

Prima ispezionare il repository.

Se esiste già un progetto:

- usare lo stack esistente;
- non migrare framework senza approvazione;
- aggiungere solo dipendenze necessarie.

Se il repository è vuoto, default consigliato:

- Next.js con App Router;
- TypeScript strict;
- Tailwind CSS;
- Zod;
- server action o route server per il form;
- database PostgreSQL compatibile;
- Prisma o layer tipizzato equivalente;
- adapter e-mail server-side;
- Vitest;
- Playwright;
- ESLint.

Principi:

- mobile-first;
- server validation autorevole;
- poco JavaScript client;
- niente segreti nel browser;
- niente global state inutile;
- niente microservizi;
- niente overengineering;
- niente librerie pesanti senza motivo.

---

# 5. Rotte MVP

```text
/de/endreinigung-oberwallis
/de/so-funktionierts
/de/faq
/de/ueber-cleyra
/de/kontakt
/de/datenschutz
/de/impressum
/de/vermittlungsbedingungen
/de/danke
```

Per il primo lancio Google Ads porta a:

```text
/de/endreinigung-oberwallis
```

`/de/danke` deve essere `noindex`.

Non creare subito pagine Visp, Brig e Naters. Diventano task futuri solo dopo che la landing principale funziona.

---

# 6. Landing page principale

Ordine:

1. header;
2. hero;
3. tre elementi di fiducia;
4. form;
5. problema/soluzione;
6. processo in tre passaggi;
7. cosa può comprendere la pulizia;
8. zona servita;
9. spiegazione dell'intermediazione;
10. FAQ;
11. CTA finale;
12. footer.

## Hero

H1:

```text
Endreinigung im Oberwallis einfach anfragen
```

Sottotitolo:

```text
Beschreiben Sie kurz Ihre Wohnung und den gewünschten Termin. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen Reinigungspartner.
```

CTA:

```text
Kostenlose Anfrage starten
```

Microcopy:

```text
Kostenlos und unverbindlich. Sie entscheiden erst nach Erhalt der Offerte.
```

## Tre elementi di fiducia

```text
Kostenlose Anfrage
Keine Kosten für die Vermittlungsanfrage.
```

```text
Offerte vor Auftrag
Sie entscheiden erst nach Erhalt der Offerte.
```

```text
Regionale Vermittlung
Ihre Anfrage wird an einen passenden Partner für Ihre Region weitergeleitet.
```

Non usare:

- recensioni inventate;
- contatori inventati;
- certificazioni non verificate;
- timer;
- falsa scarsità;
- garanzie non contrattuali.

## Processo

1. `Anfrage ausfüllen`
2. `Anfrage wird geprüft`
3. `Offerte erhalten und entscheiden`

---

# 7. Form definitivo MVP

Due passaggi, 60–90 secondi.

Mostrare:

```text
Schritt 1 von 2
Dauert etwa 1 Minute
```

## Passaggio 1 — richiesta

Titolo:

```text
Wo und wann soll gereinigt werden?
```

Campi:

### `postalCode`
- label: `Postleitzahl`
- obbligatorio;
- quattro cifre;
- esempio `3930`.

### `city`
- label: `Ort`
- obbligatorio;
- esempio `Visp`.

### `serviceType`
- label: `Welche Reinigung benötigen Sie?`
- obbligatorio;
- opzioni:
  - `Endreinigung zur Wohnungsabgabe`
  - `Umzugsreinigung`
  - `Andere Reinigung`

### `dateMode`
- label: `Wann soll gereinigt werden?`
- opzioni:
  - `Ich kenne das genaue Datum`
  - `Ich bin flexibel`

### `desiredDate`
- appare con data esatta;
- non accetta date passate.

### `desiredPeriod`
- appare con modalità flessibile;
- opzioni:
  - `Innerhalb der nächsten 7 Tage`
  - `Innerhalb der nächsten 14 Tage`
  - `Innerhalb der nächsten 30 Tage`
  - `Später`

### `rooms`
- label: `Wie viele Zimmer hat die Wohnung?`
- opzioni:
  - `1 bis 1.5 Zimmer`
  - `2 bis 2.5 Zimmer`
  - `3 bis 3.5 Zimmer`
  - `4 bis 4.5 Zimmer`
  - `5 bis 5.5 Zimmer`
  - `6 oder mehr Zimmer`

### `propertyEmpty`
- label: `Ist die Wohnung bei der Reinigung leer?`
- opzioni:
  - `Ja`
  - `Teilweise`
  - `Nein`
  - `Noch nicht bekannt`

### `notes`
- label: `Bemerkungen oder besondere Wünsche`
- facoltativo;
- helper:
  `Zum Beispiel Fenster, Balkon, Keller oder ein besonderer Termin.`

Pulsante:

```text
Weiter zu den Kontaktdaten
```

## Passaggio 2 — contatti

Titolo:

```text
Wie dürfen wir Sie kontaktieren?
```

### `fullName`
- `Vorname und Nachname`;
- obbligatorio.

### `phone`
- `Telefonnummer`;
- obbligatorio;
- normalizzazione server-side;
- supporto formati svizzeri e internazionali ragionevoli.

### `email`
- `E-Mail-Adresse`;
- obbligatorio.

### `preferredContact`
- `Bevorzugter Kontakt`;
- facoltativo;
- `Telefon`, `E-Mail`, `WhatsApp`.

### `privacyConsent`
Checkbox obbligatoria e non preselezionata:

```text
Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass Cleyra meine Angaben zur Bearbeitung der Anfrage und zur Erstellung einer Offerte an einen ausgewählten Reinigungspartner übermittelt.
```

Pulsante:

```text
Kostenlose Anfrage senden
```

Microcopy:

```text
Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des ausführenden Reinigungspartners akzeptieren.
```

## Non chiedere nel primo form

- metri quadrati;
- piano;
- ascensore;
- animali;
- elettrodomestici;
- muffa;
- fotografie;
- file;
- cantina separata;
- garage;
- data consegna;
- newsletter;
- fascia oraria;
- checklist tecnica.

Mirdita raccoglie questi dettagli durante il contatto.

## Campi tecnici nascosti

Salvare, se disponibili:

- `utm_source`;
- `utm_medium`;
- `utm_campaign`;
- `utm_content`;
- `utm_term`;
- `gclid`;
- URL landing;
- referrer;
- timestamp;
- versione form;
- versione privacy;
- lingua.

Non fare fingerprinting.

## Stati UI

- idle;
- validating;
- submitting;
- success;
- field error;
- server error;
- protezione doppio invio.

Dopo errore recuperabile, non cancellare i campi validi.

## Antispam

- honeypot;
- rate limiting;
- tempo minimo realistico;
- deduplicazione breve;
- limite payload;
- validazione server;
- niente CAPTCHA finché non serve davvero.

---

# 8. Dati del lead

Campi minimi:

```text
id
createdAt
updatedAt
status
postalCode
city
serviceType
dateMode
desiredDate
desiredPeriod
rooms
propertyEmpty
notes
fullName
phone
email
preferredContact
privacyConsentAt
privacyTextVersion
sourceUrl
referrer
utmSource
utmMedium
utmCampaign
utmContent
utmTerm
gclid
formVersion
notificationStatus
```

Stati iniziali:

```text
new
notification_pending
notification_sent
notification_failed
contacted
qualified
unqualified
quote_sent
won
lost
```

Nessuna dashboard nel MVP.

---

# 9. Flusso di invio

Dopo submit valido:

1. validare sul server;
2. verificare spam e duplicato;
3. salvare il lead;
4. inviare e-mail interna;
5. inviare conferma al cliente;
6. aggiornare lo stato notifiche;
7. emettere evento conversione;
8. mostrare `/de/danke`.

Se il lead è salvato ma l'e-mail fallisce:

- non perdere il lead;
- registrare `notification_failed`;
- mostrare comunque conferma se la persistenza è riuscita;
- documentare un metodo di retry;
- non mostrare errori tecnici al cliente.

---

# 10. Pagina grazie

Titolo:

```text
Vielen Dank. Ihre Anfrage wurde übermittelt.
```

Testo:

```text
Cleyra prüft nun Ihre Angaben und klärt, welcher regionale Reinigungspartner Ihre Region und den gewünschten Termin abdecken kann.
```

Passi:

1. `Anfrage wird geprüft`
2. `Partner wird ausgewählt`
3. `Sie erhalten eine Rückmeldung`

Mostrare ID richiesta, ma mai dati personali nell'URL.

---

# 11. E-mail

## Interna

Deve includere:

- lead ID;
- data/ora;
- zona;
- servizio;
- data/periodo;
- locali;
- immobile vuoto;
- note;
- nome;
- telefono;
- e-mail;
- preferenza contatto;
- attribution.

## Cliente

Oggetto:

```text
Ihre Anfrage bei Cleyra ist eingegangen
```

Corpo base:

```text
Grüezi [Name]

Vielen Dank für Ihre Anfrage bei Cleyra.

Wir prüfen nun Ihre Angaben und klären, welcher regionale Reinigungspartner Ihre Anfrage bearbeiten kann.

Ihre Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des ausführenden Partners akzeptieren.

Referenz: [Lead-ID]

Freundliche Grüsse
Cleyra
```

Non promettere tempi precisi non garantiti.

---

# 12. Analytics

Conversione primaria:

```text
lead_submit_success
```

Eventi:

```text
cta_click
form_view
form_start
form_step_1_complete
form_step_2_view
form_validation_error
lead_submit_attempt
lead_submit_success
lead_submit_error
phone_click
email_click
legal_link_click
```

Non inviare agli analytics:

- nome;
- telefono;
- e-mail;
- note;
- indirizzo;
- altri dati personali.

Conservare UTM e GCLID per collegare in futuro lead qualificati e lavori vinti.

---

# 13. SEO

Pagina principale:

```text
Title: Endreinigung Oberwallis unverbindlich anfragen | Cleyra
Description: Endreinigung im Oberwallis gesucht? Wohnung, Ort und Termin angeben und kostenlos eine unverbindliche Anfrage über Cleyra senden.
H1: Endreinigung im Oberwallis einfach anfragen
```

Requisiti:

- canonical;
- sitemap;
- robots;
- success page noindex;
- ambienti di test noindex;
- heading ordinati;
- Open Graph base;
- niente indirizzo LocalBusiness inventato;
- niente review schema falso;
- niente city page duplicate.

---

# 14. UX, accessibilità e sicurezza

## UX

- mobile-first;
- una CTA primaria;
- niente slider;
- niente video automatico;
- niente popup iniziale;
- niente fake urgency;
- niente chat;
- pochi badge;
- form usabile a 320 px;
- messaggio coerente tra annuncio, pagina e form.

## Accessibilità

- HTML semantico;
- label per ogni campo;
- errori collegati ai campi;
- focus visibile;
- tastiera;
- `aria-live`;
- contrasto;
- nessun significato solo tramite colore;
- ordine logico;
- progress accessibile.

## Sicurezza

- validazione server;
- segreti solo server;
- rate limit;
- encoding sicuro;
- limiti payload;
- header sicurezza;
- errori produzione non dettagliati;
- niente dati personali in URL, analytics o log pubblici;
- credenziali con privilegi minimi;
- backup e restore documentati.

---

# 15. Test minimi

## Unit

- schema;
- date;
- CAP;
- normalizzazione telefono/e-mail;
- UTM/GCLID;
- payload e-mail.

## Integration

- lead valido salvato;
- payload invalido rifiutato;
- rate limit;
- notifiche;
- errore provider e-mail;
- consenso;
- attribution.

## End-to-end

1. visita landing;
2. avvia form;
3. completa step 1;
4. completa step 2;
5. accetta privacy;
6. invia;
7. vede pagina grazie;
8. lead salvato;
9. evento emesso;
10. doppio clic non crea duplicato.

Testare anche:

- e-mail errata;
- telefono errato;
- data passata;
- modalità flessibile;
- server error;
- rete lenta;
- tastiera;
- viewport mobile.

---

# 16. Sequenza di implementazione

## Fase 0 — memoria

Prima di costruire il sito:

- creare tutti i file memoria;
- inizializzarli;
- creare backlog;
- registrare architettura;
- impostare un solo task `in_progress`;
- creare primo handoff.

## Fase 1 — fondazioni

- stack;
- TypeScript strict;
- lint;
- test;
- environment validation;
- layout;
- styling;
- rotte.

## Fase 2 — landing

- header;
- hero;
- trust;
- processo;
- servizi;
- zona;
- trasparenza;
- FAQ;
- footer.

## Fase 3 — form

- due step;
- validazione client;
- accessibilità;
- errori;
- responsive.

## Fase 4 — backend

- validazione server;
- database;
- anti-spam;
- deduplicazione;
- persistenza;
- redirect.

## Fase 5 — notifiche

- e-mail interna;
- conferma cliente;
- stato;
- retry.

## Fase 6 — analytics e SEO

- UTM;
- GCLID;
- eventi;
- consenso;
- metadata;
- sitemap;
- robots.

## Fase 7 — QA e deploy

- test;
- mobile;
- accessibilità;
- performance;
- produzione;
- smoke test;
- documentazione.

---

# 17. Definition of Done

## Prodotto

- [ ] Landing tedesca chiara.
- [ ] Cleyra dichiarata come intermediario.
- [ ] Form in due passaggi.
- [ ] Form mobile funzionante.
- [ ] Lead salvato.
- [ ] E-mail interna inviata.
- [ ] Conferma cliente inviata.
- [ ] Pagina grazie funzionante.
- [ ] Richiesta presentata come gratuita e non vincolante.
- [ ] Nessuna funzione fuori scope.

## Tecnico

- [ ] Lint passa.
- [ ] Typecheck passa.
- [ ] Test passano.
- [ ] Build passa.
- [ ] Variabili documentate.
- [ ] Nessun segreto nel repository.
- [ ] Spam protection attiva.
- [ ] Doppio invio gestito.
- [ ] UTM/GCLID salvati.
- [ ] Eventi verificati.
- [ ] Success page noindex.
- [ ] Sitemap e robots corretti.

## Memoria

- [ ] `CLAUDE.md` aggiornato.
- [ ] `PROJECT_STATUS.md` aggiornato.
- [ ] Piano coerente con il codice.
- [ ] Architettura coerente con il codice.
- [ ] Copy coerente con `CONTENT.md`.
- [ ] Form coerente con `FORM_SPEC.md`.
- [ ] Analytics coerenti con `ANALYTICS.md`.
- [ ] Decisioni registrate.
- [ ] Problemi registrati.
- [ ] QA aggiornata.
- [ ] Deploy documentato.
- [ ] Session log aggiornato.
- [ ] Handoff preciso.
- [ ] Nessuna informazione critica esiste soltanto nella chat.

---

# 18. Primo prompt da dare a Claude Code

```text
Leggi integralmente CLEYRA_WEBSITE_SPEC.md.

Non costruire ancora il sito.

Esegui soltanto la Fase 0:

1. Ispeziona il repository.
2. Esegui git status e identifica il branch.
3. Crea CLAUDE.md.
4. Crea tutti i file obbligatori dentro docs/.
5. Inizializzali con contenuti concisi e coerenti con la specifica.
6. Crea un backlog dettagliato con task ID e criteri di accettazione.
7. Registra la decisione iniziale sull'architettura senza overengineering.
8. Imposta un solo prossimo task come in_progress.
9. Aggiorna PROJECT_STATUS.md.
10. Scrivi SESSION_HANDOFF.md con l'azione esatta successiva.

Non aggiungere login, dashboard, pagamenti, marketplace, francese o preventivi automatici.

Alla fine comunica:
- file creati;
- decisioni registrate;
- task corrente;
- verifiche eseguite;
- azione esatta successiva.
```

# 19. Prompt per ogni nuova sessione

```text
Segui il protocollo di memoria del repository.

Leggi:
- CLAUDE.md
- CLEYRA_WEBSITE_SPEC.md
- docs/PROJECT_STATUS.md
- docs/SESSION_HANDOFF.md
- docs/IMPLEMENTATION_PLAN.md
- le decisioni rilevanti in docs/DECISIONS.md

Poi:
1. Esegui git status.
2. Conferma il task ID corrente.
3. Comunica obiettivo, file e criteri.
4. Implementa soltanto quel task.
5. Esegui test, lint, typecheck e build pertinenti.
6. Aggiorna tutta la documentazione interessata.
7. Aggiungi SESSION_LOG.md.
8. Riscrivi SESSION_HANDOFF.md con il punto esatto da cui continuare.

Non ampliare lo scope e non dichiarare completato nulla senza verifica.
```

---

# Principio finale

Una nuova sessione deve poter leggere:

1. `CLAUDE.md`;
2. `PROJECT_STATUS.md`;
3. `SESSION_HANDOFF.md`;
4. `IMPLEMENTATION_PLAN.md`;
5. `DECISIONS.md`;

e capire immediatamente:

- che cos'è Cleyra;
- cosa si sta costruendo;
- cosa è fuori scope;
- cosa è stato completato;
- cosa è rotto;
- quali decisioni sono state prese;
- qual è il prossimo passo esatto.

Questa è la memoria attiva obbligatoria del progetto.
