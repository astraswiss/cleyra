# CLEYRA — Specifica completa per il sito web

> **Versione 2 — include continuità tra sessioni e memoria operativa del progetto.**
>
> Documento operativo per Claude Code. Questo file riguarda esclusivamente progettazione, copy, sviluppo, SEO tecnico, modulo lead, analytics del sito, privacy tecnica, test e pubblicazione del sito Cleyra.
>
> **Non costruire in questa fase:** dashboard clienti, area partner, marketplace, sistema di vendita lead, fatturazione, CRM completo, app mobile, portale amministrativo avanzato o automazioni commerciali complesse.

---

## 0. Memoria operativa e continuità tra sessioni

### 0.1 Principio fondamentale

Claude Code non deve affidarsi alla cronologia della chat, alla memoria della sessione corrente o a informazioni ricordate implicitamente.

Tutto ciò che serve per comprendere, costruire, verificare e riprendere il progetto deve essere salvato nel repository in file leggibili e mantenuti aggiornati.

Una nuova sessione deve poter riprendere il lavoro correttamente anche quando:

- non dispone della conversazione precedente;
- è eseguita da una nuova istanza di Claude Code;
- il progetto è stato fermo per settimane;
- sono cambiate alcune dipendenze;
- una fase è rimasta incompleta;
- esistono modifiche locali non ancora concluse.

### 0.2 File di continuità obbligatori

Claude Code deve creare e mantenere questi file nel repository:

```txt
CLAUDE.md
README.md
docs/
  PROJECT_OVERVIEW.md
  ARCHITECTURE.md
  IMPLEMENTATION_PLAN.md
  PROJECT_STATUS.md
  DECISIONS.md
  SESSION_HANDOFF.md
  CHANGELOG.md
```

Non creare più file di stato con funzioni sovrapposte senza una ragione concreta. I file sopra sono le fonti canoniche.

### 0.3 Gerarchia delle fonti

In caso di conflitto, usare questo ordine di autorità:

1. `CLEYRA_WEBSITE_SPEC.md` — requisiti di prodotto e criteri di accettazione;
2. istruzioni esplicite più recenti del proprietario del progetto;
3. `docs/DECISIONS.md` — decisioni deliberate e ancora valide;
4. `docs/ARCHITECTURE.md` — architettura tecnica corrente;
5. `docs/IMPLEMENTATION_PLAN.md` — piano e ordine del lavoro;
6. `docs/PROJECT_STATUS.md` — fotografia dello stato attuale;
7. `docs/SESSION_HANDOFF.md` — punto preciso da cui riprendere;
8. codice e test esistenti;
9. `README.md` — istruzioni operative per sviluppatori.

Se due fonti sono in conflitto, non scegliere silenziosamente. Registrare il conflitto in `PROJECT_STATUS.md`, proporre la soluzione e aggiornare la fonte corretta dopo la decisione.

### 0.4 Contenuto di `CLAUDE.md`

`CLAUDE.md` deve essere breve, operativo e letto per primo a ogni sessione.

Deve contenere almeno:

- scopo del progetto;
- limiti dello scope;
- lingua e mercato iniziali;
- riferimenti ai documenti canonici;
- stack rilevato;
- comandi di installazione, sviluppo, lint, typecheck e test;
- convenzioni principali;
- regole su privacy, dati personali e segreti;
- divieto di inventare dati aziendali o testi legali definitivi;
- procedura obbligatoria di inizio e fine sessione;
- indicazione di non marcare un'attività come completata senza verifica;
- istruzione a non sovrascrivere decisioni esistenti senza registrarle.

Inserire in `CLAUDE.md` anche questa istruzione:

> Prima di iniziare qualsiasi modifica, leggi `CLEYRA_WEBSITE_SPEC.md`, `docs/PROJECT_STATUS.md`, `docs/SESSION_HANDOFF.md`, `docs/DECISIONS.md`, controlla `git status` e verifica i comandi disponibili nel repository.

### 0.5 Contenuto di `docs/PROJECT_OVERVIEW.md`

Deve spiegare il progetto a una persona che non lo conosce:

- problema risolto da Cleyra;
- ruolo di Cleyra come intermediario;
- utente principale;
- servizio e regioni della prima versione;
- obiettivo di conversione;
- principali flussi utente;
- pagine previste;
- elementi esplicitamente fuori scope;
- glossario dei termini commerciali e tecnici importanti.

Aggiornare questo file quando cambia il prodotto, non per ogni piccola modifica tecnica.

### 0.6 Contenuto di `docs/ARCHITECTURE.md`

Deve mostrare sempre la struttura tecnica corrente, non quella desiderata in astratto.

Includere:

- stack e versioni principali;
- diagramma testuale del flusso browser → backend → database → e-mail;
- struttura delle directory importanti;
- mappa delle rotte;
- componenti principali;
- posizione dei contenuti configurabili;
- modello dati lead;
- upload e storage;
- analytics e consent management;
- servizi esterni;
- variabili d'ambiente, senza valori segreti;
- scelte di sicurezza;
- punti tecnici ancora provvisori.

Aggiungere una sezione `File map` con i file più importanti e una descrizione di una riga per ciascuno. Aggiornarla quando si introducono, si spostano o si eliminano file strutturali.

### 0.7 Contenuto di `docs/IMPLEMENTATION_PLAN.md`

Deve trasformare questa specifica in un piano eseguibile con checkbox.

Formato minimo:

```md
## Fase X — Nome fase

- [ ] TASK-ID Descrizione attività
  - Dipendenze:
  - File previsti:
  - Criteri di accettazione:
  - Test richiesti:
```

Regole:

- assegnare a ogni attività un ID stabile, per esempio `FOUND-001`, `FORM-004`, `SEO-003`;
- non cancellare le attività completate;
- usare `[x]` soltanto dopo avere verificato i criteri di accettazione;
- marcare le attività bloccate con `BLOCKED` e indicarne la causa;
- collegare le attività alle sezioni rilevanti di questa specifica;
- dividere attività troppo grandi prima di implementarle;
- mantenere una sezione `Next recommended tasks` con massimo cinque attività ordinate.

### 0.8 Contenuto di `docs/PROJECT_STATUS.md`

Questo file è la fotografia sintetica e aggiornata del progetto.

Deve iniziare con:

```md
Last updated: YYYY-MM-DD HH:mm Europe/Zurich
Current phase:
Overall status: not_started | in_progress | blocked | ready_for_review | released
Current branch:
Last verified commit:
```

Deve poi contenere:

- cosa è già funzionante;
- cosa è parzialmente funzionante;
- cosa non è ancora iniziato;
- attività attualmente in corso;
- blocchi e decisioni richieste;
- test attualmente verdi;
- test falliti o non eseguiti;
- debito tecnico noto;
- placeholder ancora presenti;
- dati o credenziali ancora necessari dal proprietario;
- massimo cinque prossime attività consigliate.

Non trasformare `PROJECT_STATUS.md` in un diario lungo. Lo storico appartiene a `CHANGELOG.md`.

### 0.9 Contenuto di `docs/DECISIONS.md`

Registrare le decisioni che influenzano il progetto nel tempo.

Usare un formato ADR leggero:

```md
## DEC-YYYYMMDD-XX — Titolo

- Status: proposed | accepted | superseded | rejected
- Date:
- Context:
- Decision:
- Alternatives considered:
- Consequences:
- Related files/tasks:
```

Registrare, per esempio:

- scelta dello stack;
- provider database;
- provider e-mail;
- metodo di upload;
- strategia di rendering;
- struttura i18n;
- scelta della CMP;
- modifiche al modello dati;
- deviazioni consapevoli dalla specifica.

Non registrare come decisione ogni rinomina o correzione minore.

### 0.10 Contenuto di `docs/SESSION_HANDOFF.md`

Questo è il file più importante per riprendere una nuova sessione.

Deve essere riscritto alla fine di ogni sessione e contenere:

```md
# Session handoff

Last updated: YYYY-MM-DD HH:mm Europe/Zurich
Session objective:
Result: completed | partial | blocked

## What changed
- ...

## Exact current state
- ...

## Files touched
- `path/file` — motivo

## Verification performed
- comando — risultato

## Known problems
- ...

## Exact next actions
1. ...
2. ...
3. ...

## Before continuing
- file da leggere;
- variabili o servizi richiesti;
- decisioni da non modificare;
- eventuali modifiche locali non committate.
```

Le `Exact next actions` devono essere abbastanza specifiche da poter essere eseguite senza rileggere tutta la cronologia.

Esempio corretto:

> Implementare `StepProperty.tsx` usando lo schema già definito in `lib/lead-schema.ts`; aggiungere test per rooms 1–20 e approxSqm 10–2000; non modificare ancora l'upload foto.

Esempio insufficiente:

> Continuare il modulo.

### 0.11 Contenuto di `docs/CHANGELOG.md`

Mantenere uno storico comprensibile delle modifiche rilevanti.

Formato suggerito:

```md
## YYYY-MM-DD

### Added
- ...

### Changed
- ...

### Fixed
- ...

### Removed
- ...

### Verification
- ...
```

Aggiornare il changelog per funzionalità, correzioni importanti, cambi di dipendenze e modifiche architetturali. Non elencare ogni singola riga di codice.

### 0.12 Contenuto di `README.md`

Il README deve permettere a uno sviluppatore di avviare il progetto senza chiedere informazioni aggiuntive.

Includere:

- prerequisiti;
- installazione;
- copia di `.env.example`;
- variabili obbligatorie;
- avvio locale;
- comandi disponibili;
- database e migrazioni;
- test;
- build;
- deploy;
- struttura essenziale del repository;
- link ai documenti in `docs/`;
- problemi comuni e risoluzione.

Non usare il README come registro di stato del progetto.

### 0.13 Procedura obbligatoria all'inizio di ogni sessione

Prima di modificare il codice, Claude Code deve:

1. leggere `CLAUDE.md`;
2. leggere questa specifica;
3. leggere `docs/PROJECT_STATUS.md`;
4. leggere `docs/SESSION_HANDOFF.md`;
5. leggere le decisioni rilevanti in `docs/DECISIONS.md`;
6. controllare `git status` e non sovrascrivere modifiche locali sconosciute;
7. controllare gli ultimi commit, se Git è disponibile;
8. verificare stack, script e dipendenze reali;
9. identificare l'attività corrente tramite ID;
10. scrivere un piano breve della sessione prima di implementare;
11. verificare che l'attività sia dentro lo scope;
12. eseguire un controllo di base iniziale, per esempio typecheck o test mirati, quando ragionevole.

Se i file di continuità non esistono, crearli prima di iniziare nuove funzionalità.

Se i documenti non corrispondono al codice, considerare il codice e i test come evidenza dello stato tecnico, segnalare la divergenza e aggiornare i documenti senza nasconderla.

### 0.14 Procedura obbligatoria durante la sessione

Durante il lavoro:

- implementare un'attività o un gruppo piccolo e coerente alla volta;
- aggiornare il piano quando emerge una dipendenza reale;
- registrare immediatamente le decisioni architetturali importanti;
- non segnare task completati prima dei test;
- non modificare contemporaneamente aree non correlate;
- mantenere il repository eseguibile quando possibile;
- non eliminare note o TODO senza risolverli o ricollocarli;
- usare TODO con riferimento a un task ID;
- non lasciare valori fittizi senza etichetta evidente;
- documentare migrazioni, nuove variabili d'ambiente e nuovi servizi esterni nello stesso cambiamento che li introduce.

Formato TODO consigliato:

```ts
// TODO(FORM-007): gestire retry upload dopo errore di rete.
```

### 0.15 Procedura obbligatoria alla fine di ogni sessione

Prima di terminare, Claude Code deve:

1. eseguire i test pertinenti;
2. eseguire lint e typecheck, se disponibili;
3. verificare `git diff` e assicurarsi che non siano entrati segreti o modifiche estranee;
4. aggiornare `IMPLEMENTATION_PLAN.md`;
5. aggiornare `PROJECT_STATUS.md`;
6. riscrivere `SESSION_HANDOFF.md` con lo stato esatto;
7. aggiornare `DECISIONS.md` se sono state prese decisioni durature;
8. aggiornare `ARCHITECTURE.md` se è cambiata la struttura;
9. aggiornare `CHANGELOG.md` con le modifiche rilevanti;
10. aggiornare `README.md` e `.env.example` quando cambiano setup o configurazione;
11. elencare test eseguiti e relativi risultati;
12. indicare chiaramente ciò che non è stato verificato;
13. lasciare massimo cinque azioni successive concrete e ordinate.

La sessione non è considerata correttamente chiusa se `SESSION_HANDOFF.md` e `PROJECT_STATUS.md` non riflettono il codice corrente.

### 0.16 Regole Git per la continuità

Se il repository usa Git:

- non eseguire `git reset --hard`, rebase distruttivi o force push;
- non cancellare modifiche locali non riconosciute;
- preferire commit piccoli e coerenti;
- usare messaggi collegati al task, per esempio `feat(FORM-003): add property step validation`;
- non fare push o merge senza autorizzazione esplicita;
- registrare in `SESSION_HANDOFF.md` eventuali modifiche non committate;
- salvare in `PROJECT_STATUS.md` il branch corrente e l'ultimo commit verificato.

### 0.17 Controllo anti-deriva

A ogni nuova fase, confrontare il lavoro con:

- obiettivo del sito;
- scope della prima versione;
- rotte approvate;
- Definition of Done;
- decisioni accettate.

Se una richiesta richiede dashboard, marketplace, CRM completo, fatturazione, app mobile o automazioni commerciali complesse, registrarla come proposta futura ma non implementarla in questa fase.

### 0.18 Criterio di successo della memoria operativa

La continuità è corretta quando una nuova sessione può rispondere, leggendo soltanto il repository, a queste domande:

- Che cosa stiamo costruendo?
- Per chi?
- Qual è lo scope attuale?
- Quale stack è realmente in uso?
- Che cosa funziona già?
- Che cosa è incompleto?
- Quale attività devo eseguire adesso?
- Quali decisioni non devo riaprire senza motivo?
- Quali test devo eseguire?
- Quali dati, credenziali o decisioni mancano?
- Come avvio e verifico il progetto?

Se una risposta non è reperibile, aggiornare i file canonici prima di proseguire.

---

## 1. Obiettivo del sito

Costruire un sito rapido, credibile e mobile-first che permetta a una persona nel Canton Vallese di richiedere gratuitamente una pulizia di fine locazione.

Il sito deve:

1. spiegare in modo chiaro che Cleyra è un servizio di intermediazione;
2. ridurre l'incertezza dell'utente;
3. far compilare un modulo in quattro passaggi;
4. salvare correttamente la richiesta;
5. inviare una conferma all'utente e una notifica interna;
6. registrare eventi analytics e parametri di acquisizione;
7. essere predisposto per pagine locali SEO e campagne Google Ads;
8. rispettare accessibilità, performance, privacy e trasparenza.

### Conversione primaria

`lead_submitted`

### Conversioni secondarie

- `form_view`
- `form_start`
- `form_step_1_complete`
- `form_step_2_complete`
- `form_step_3_complete`
- `form_step_4_complete`
- `form_error`
- `phone_click`
- `email_click`
- `cta_click`

---

## 2. Posizionamento da comunicare

Cleyra non deve presentarsi come l'impresa che esegue direttamente la pulizia.

### Promessa principale

> Kostenlos und unverbindlich eine Endreinigung im Wallis anfragen.

### Spiegazione

> Beschreiben Sie Ihre Wohnung, den Ort und den gewünschten Termin. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen Reinigungspartner.

### Dichiarazione obbligatoria

Questa frase deve comparire nel footer, nella pagina “Über Cleyra” e vicino alla sezione sul funzionamento:

> Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Reinigungsvertrag entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.

### Garanzia di consegna

Non affermare che è sempre inclusa.

Usare soltanto:

> Eine Abnahmegarantie gilt nur, wenn sie vom ausführenden Reinigungspartner ausdrücklich in der Offerte bestätigt wird.

### Promesse vietate

Non usare:

- beste Reinigungsfirma im Wallis;
- günstigster Preis garantiert;
- sofortige Antwort;
- garantierte Verfügbarkeit;
- zertifizierte Partner, se non verificato;
- centinaia di partner o clienti, se non dimostrabile;
- countdown, disponibilità o recensioni inventate.

---

## 3. Ambito della prima versione

### Lingua iniziale

Tedesco.

Preparare il codice per l'internazionalizzazione, ma non costruire ancora tutte le pagine francesi.

### Zone iniziali

- Visp
- Brig-Glis
- Naters
- Oberwallis

### Servizio principale

- Endreinigung zur Wohnungsabgabe

### Servizio secondario

- Umzugsreinigung

### Non includere nella prima versione

- pulizia regolare;
- pulizia uffici;
- Airbnb;
- industria;
- traslochi;
- sgomberi;
- manutenzione;
- giardinaggio.

---

## 4. Stack tecnico

### Regola principale

Claude Code deve prima ispezionare il repository esistente e rispettarne stack, convenzioni e dipendenze.

### Stack consigliato per un progetto nuovo

- Next.js con App Router
- TypeScript in modalità strict
- Tailwind CSS
- React Hook Form
- Zod per validazione condivisa client/server
- API Route o Server Action per invio modulo
- database PostgreSQL gestito, per esempio Supabase
- provider e-mail transazionale configurabile
- Google Tag Manager
- Google Analytics 4 tramite GTM
- Google Ads conversion tag tramite GTM
- piattaforma di deployment compatibile con Next.js

### Regole tecniche

- evitare dipendenze non necessarie;
- non usare un CMS nella prima versione;
- tutto il copy iniziale può essere conservato in file TypeScript/JSON strutturati;
- nessun segreto nel client;
- validazione sia client sia server;
- sanitizzare tutti gli input testuali;
- limitare dimensioni e tipi degli allegati;
- predisporre protezione antispam;
- usare variabili d'ambiente documentate in `.env.example`.

---

## 5. Architettura delle rotte

Creare queste pagine:

| Rotta | Scopo | Indicizzazione |
|---|---|---|
| `/de` | Homepage generale | index |
| `/de/endreinigung-visp` | Landing locale Visp | index |
| `/de/endreinigung-brig` | Landing locale Brig | index |
| `/de/endreinigung-naters` | Landing locale Naters | index |
| `/de/umzugsreinigung-oberwallis` | Pagina servizio secondario | index |
| `/de/so-funktionierts` | Processo Cleyra | index |
| `/de/faq` | FAQ complete | index |
| `/de/ueber-cleyra` | Identità e trasparenza | index |
| `/de/kontakt` | Contatti | index |
| `/de/datenschutz` | Privacy | index |
| `/de/impressum` | Impressum | index |
| `/de/vermittlungsbedingungen` | Condizioni di intermediazione | index |
| `/de/danke` | Conferma invio | noindex, nofollow |
| `/api/leads` | Endpoint lead | non pubblico |

### Redirect

- `/` → `/de`
- aggiungere slash handling coerente;
- evitare duplicati tra URL con e senza slash;
- prevedere in futuro `/fr`, ma non pubblicarlo vuoto.

---

## 6. Sistema di design

### Obiettivo visivo

Il sito deve apparire:

- pulito;
- affidabile;
- locale;
- contemporaneo;
- semplice;
- non “luxury”;
- non simile a un portale generico di comparazione.

### Layout

- larghezza massima contenuto: circa `1180px`;
- spaziatura generosa;
- griglia responsive;
- mobile-first;
- nessuno scroll orizzontale;
- CTA primaria sempre evidente;
- una sola azione dominante per sezione.

### Tipografia

- font sans-serif leggibile;
- H1 desktop: 46–52 px;
- H1 mobile: 32–36 px;
- H2 desktop: 32–38 px;
- corpo: 17–19 px;
- testo secondario: almeno 15–16 px;
- line-height confortevole;
- non usare testo leggerissimo o grigio con poco contrasto.

### Pulsanti

CTA primaria standard:

> Kostenlose Anfrage starten

Requisiti:

- altezza minima 50 px;
- contrasto WCAG AA;
- stato hover, focus, loading e disabled;
- testo coerente su tutto il sito;
- non usare contemporaneamente più CTA primarie differenti.

### Immagini

Predisporre componenti ottimizzati per immagini autentiche future.

Per la prima implementazione è accettabile usare:

- fotografie fornite dal proprietario;
- placeholder locali dichiarati;
- grafica astratta molto discreta.

Non scaricare automaticamente immagini stock casuali.

Tutte le immagini devono avere:

- dimensioni esplicite;
- lazy loading quando opportuno;
- formato moderno;
- `alt` descrittivo;
- nessun testo importante incorporato nell'immagine.

---

## 7. Header

### Desktop

A sinistra:

- logo Cleyra con link a `/de`.

Navigazione:

- Leistungen
- So funktioniert’s
- Regionen
- Häufige Fragen

A destra:

- CTA `Kostenlose Anfrage`

### Mobile

- logo;
- menu accessibile;
- CTA ben visibile;
- chiusura menu tramite pulsante, Escape e selezione link;
- blocco dello scroll della pagina quando il menu è aperto.

### Da non mostrare

- Login;
- Registrieren;
- dashboard;
- link social nell'header;
- menu con più di 5–6 elementi principali.

---

## 8. Homepage `/de`

Implementare le sezioni nell'ordine seguente.

### 8.1 Hero

**Eyebrow facoltativa**

> Endreinigung im Oberwallis

**H1**

> Endreinigung im Wallis einfach anfragen

**Testo**

> Beschreiben Sie Ihre Wohnung, den Ort und den gewünschten Termin. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen Reinigungspartner.

**Riga di riduzione del rischio**

> Kostenlos, unverbindlich und ohne mühsames Telefonieren.

**CTA primaria**

> Kostenlose Anfrage starten

**CTA secondaria**

> So funktioniert Cleyra

**Microcopy sotto CTA**

> Dauert etwa 2 Minuten. Kein Benutzerkonto erforderlich.

**Trust strip**

- Kostenlose Anfrage
- Regionale Vermittlung
- Offerte vor Auftrag

Il click sulla CTA deve portare al modulo incorporato nella pagina oppure aprire una sezione dedicata senza cambiare dominio.

### 8.2 Problema

**H2**

> Ein Umzug ist schon aufwendig genug

**Testo**

> Kurz vor der Wohnungsabgabe bleibt oft wenig Zeit, mehrere Reinigungsfirmen anzurufen, Leistungen zu vergleichen und freie Termine zu suchen. Cleyra vereinfacht diesen Prozess. Sie senden uns einmal die wichtigsten Angaben. Wir prüfen, ob die Anfrage vollständig ist, und leiten sie an einen passenden regionalen Reinigungspartner weiter.

### 8.3 Come funziona

**H2**

> So funktioniert Cleyra

Mostrare tre passaggi numerati.

**1. Anfrage ausfüllen**

> Teilen Sie uns mit, wo und wann gereinigt werden soll, wie gross die Wohnung ist und welche zusätzlichen Bereiche berücksichtigt werden sollen.

**2. Anfrage wird geprüft**

> Cleyra kontrolliert die Angaben und vermittelt die Anfrage an einen ausgewählten Reinigungspartner für Ihre Region.

**3. Offerte erhalten und entscheiden**

> Der Reinigungspartner kontaktiert Sie und erstellt eine Offerte. Erst nach Ihrer Zustimmung entsteht ein Auftrag zwischen Ihnen und dem ausführenden Unternehmen.

**Microcopy**

> Die Anfrage bei Cleyra ist kostenlos und unverbindlich.

### 8.4 Servizi inclusi

**H2**

> Reinigung zur Wohnungsabgabe

**Intro**

> Über Cleyra können Sie eine Anfrage für folgende Arbeiten stellen:

Elenco:

- Reinigung von Wohnräumen
- Küche und Küchengeräten
- Badezimmer und sanitären Anlagen
- Fenster und Fensterrahmen
- Balkon oder Terrasse
- Kellerabteil
- Umzugsreinigung
- Reinigung einer leeren oder möblierten Wohnung

**Nota**

> Der genaue Leistungsumfang wird in der Offerte des ausführenden Reinigungspartners festgehalten.

### 8.5 Regioni

**H2**

> Für Visp, Brig, Naters und das Oberwallis

**Testo**

> Cleyra bearbeitet zunächst Anfragen aus Visp, Brig-Glis, Naters und den umliegenden Gemeinden. Geben Sie im Formular Ihre Postleitzahl ein. Wir prüfen anschliessend, ob ein Reinigungspartner Ihre Region und den gewünschten Termin abdecken kann.

Mostrare link verso le tre landing locali.

### 8.6 Benefici

Mostrare quattro elementi.

**Nur eine Anfrage**

> Sie müssen nicht mehrere Unternehmen einzeln kontaktieren.

**Regionale Vermittlung**

> Ihre Anfrage wird an einen Reinigungspartner weitergeleitet, der die entsprechende Region bedient.

**Transparente Entscheidung**

> Sie erhalten eine Offerte und entscheiden danach, ob Sie den Auftrag erteilen möchten.

**Direkter Kontakt**

> Nach der Vermittlung können Sie Details, Termin und Leistungsumfang direkt mit dem ausführenden Partner klären.

### 8.7 Trasparenza partner

**H2**

> Was bedeutet „ausgewählter Partner“?

**Testo introduttivo**

> Bei der Auswahl unserer Reinigungspartner achten wir unter anderem auf:

Elenco:

- vollständige Unternehmens- und Kontaktdaten;
- klare Zuständigkeiten;
- definierte Einsatzregionen;
- nachvollziehbare Offerten;
- zuverlässige Kommunikation;
- Rückmeldungen zu vermittelten Aufträgen.

Mostrare subito dopo la dichiarazione obbligatoria sul ruolo di Cleyra.

### 8.8 FAQ breve

Mostrare da cinque a sei domande con accordion accessibile.

#### Ist die Anfrage kostenlos?

> Ja. Das Ausfüllen und Übermitteln der Anfrage über Cleyra ist kostenlos und unverbindlich.

#### Muss ich die erhaltene Offerte annehmen?

> Nein. Sie entscheiden selbst, ob Sie die Offerte des Reinigungspartners akzeptieren.

#### Wer führt die Reinigung aus?

> Die Reinigung wird von dem Unternehmen ausgeführt, an das Cleyra Ihre Anfrage vermittelt und dessen Offerte Sie akzeptieren.

#### Gibt es eine Abnahmegarantie?

> Eine Abnahmegarantie gilt nur dann, wenn sie vom ausführenden Reinigungspartner ausdrücklich in der Offerte bestätigt wird.

#### Wann werde ich kontaktiert?

> Vollständige Anfragen werden während der Geschäftszeiten möglichst rasch geprüft. Die genaue Reaktionszeit hängt von Region, Termin und Verfügbarkeit des Partners ab.

#### Welche Daten werden weitergegeben?

> Cleyra übermittelt die für die Bearbeitung und Erstellung einer Offerte erforderlichen Angaben an den ausgewählten Reinigungspartner. Weitere Informationen finden Sie in unserer Datenschutzerklärung.

### 8.9 CTA finale

**H2**

> Endreinigung jetzt unverbindlich anfragen

**Testo**

> Senden Sie uns die wichtigsten Angaben zu Ihrer Wohnung und zum gewünschten Termin.

**CTA**

> Kostenlose Anfrage starten

**Microcopy**

> Dauert etwa 2 Minuten. Sie entscheiden erst nach Erhalt der Offerte.

---

## 9. Landing page locali

Creare un template riutilizzabile basato su dati strutturati.

### Modello dati suggerito

```ts
export type LocationLanding = {
  slug: string;
  cityName: string;
  regionName: string;
  postalCodes: string[];
  nearbyPlaces: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
};
```

### Requisito fondamentale

Non creare pagine duplicate sostituendo soltanto il nome della città.

Ogni landing deve avere:

- H1 locale;
- testo introduttivo locale;
- località vicine realmente servite;
- FAQ con almeno una domanda locale;
- link verso altre località pertinenti;
- meta title e description unici;
- modulo con città precompilata quando la provenienza è chiara.

### 9.1 Visp

**URL**

`/de/endreinigung-visp`

**Meta title**

> Endreinigung Visp unverbindlich anfragen | Cleyra

**Meta description**

> Endreinigung in Visp gesucht? Wohnung und Termin angeben und eine unverbindliche Offerte über einen regionalen Reinigungspartner anfragen.

**H1**

> Endreinigung in Visp einfach anfragen

**Intro**

> Senden Sie uns einmal die wichtigsten Angaben. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten Reinigungspartner für Visp und Umgebung.

**Località vicine, solo se realmente servite**

- Eyholz
- Baltschieder
- Lalden
- Eggerberg

### 9.2 Brig-Glis

**URL**

`/de/endreinigung-brig`

**Meta title**

> Endreinigung Brig-Glis unverbindlich anfragen | Cleyra

**H1**

> Endreinigung in Brig-Glis einfach anfragen

**Località vicine, solo se realmente servite**

- Gamsen
- Ried-Brig
- Termen
- Lalden

### 9.3 Naters

**URL**

`/de/endreinigung-naters`

**Meta title**

> Endreinigung Naters unverbindlich anfragen | Cleyra

**H1**

> Endreinigung in Naters einfach anfragen

### Struttura di ogni landing

1. Hero locale;
2. trust strip;
3. modulo;
4. come funziona;
5. contenuto del servizio;
6. zone vicine;
7. trasparenza Cleyra;
8. FAQ;
9. CTA finale;
10. footer.

---

## 10. Modulo lead multi-step

Il modulo è il componente più importante del sito.

### 10.1 Requisiti UX

- quattro passaggi;
- barra di progresso con `Schritt X von 4`;
- un solo gruppo logico per passaggio;
- nessun account;
- contatti richiesti soltanto alla fine;
- salvataggio dello stato nella sessione del browser;
- navigazione avanti e indietro senza perdita dati;
- invio possibile da tastiera;
- focus sul primo errore;
- messaggi di errore associati ai campi;
- riepilogo errori accessibile quando necessario;
- stato loading durante l'invio;
- prevenzione dei doppi invii;
- messaggio chiaro in caso di errore server;
- piena usabilità a 320 px di larghezza.

### 10.2 Passaggio 1 — luogo e servizio

**Titolo**

> Wo soll gereinigt werden?

Campi:

- `postalCode`: stringa, obbligatoria;
- `city`: stringa, obbligatoria;
- `serviceType`: enum, obbligatorio;
- `desiredDate`: data, obbligatoria;
- `dateFlexibility`: enum facoltativo.

Opzioni `serviceType`:

- `end_cleaning` → Endreinigung zur Wohnungsabgabe
- `moving_cleaning` → Umzugsreinigung
- `other` → Andere Reinigung

Opzioni `dateFlexibility`:

- `fixed` → Termin ist fix
- `plus_minus_1_day` → ± 1 Tag flexibel
- `plus_minus_3_days` → ± 3 Tage flexibel

CTA:

> Weiter zur Wohnung

Validazioni:

- CAP svizzero di quattro cifre;
- data non precedente a oggi;
- città minimo due caratteri;
- servizio obbligatorio.

### 10.3 Passaggio 2 — immobile

**Titolo**

> Um welche Wohnung geht es?

Campi:

- `propertyType`: `apartment | house`;
- `rooms`: numero o enum;
- `approxSqm`: numero;
- `furnishedState`: `empty | furnished | partially_furnished`;
- `floor`: stringa facoltativa;
- `elevator`: booleano facoltativo.

CTA:

> Weiter zu den Details

Validazioni suggerite:

- locali tra 1 e 20;
- superficie tra 10 e 2.000 m²;
- tipo immobile obbligatorio;
- stato arredamento obbligatorio.

### 10.4 Passaggio 3 — dettagli

**Titolo**

> Was soll berücksichtigt werden?

Checkbox:

- `windows`
- `balconyTerrace`
- `cellar`
- `oven`
- `fridge`
- `blindsShutters`
- `garage`
- `otherAreas`

Campi:

- `notes`: testo facoltativo, massimo 1.500 caratteri;
- `photos`: facoltative.

Allegati:

- massimo 5 file;
- massimo 8 MB per file;
- tipi consentiti: JPEG, PNG, WebP, HEIC se supportato dal backend;
- rinominare i file lato server;
- non rendere pubblico l'URL originale;
- scansione o controllo MIME server-side;
- mostrare anteprima e possibilità di rimozione.

CTA:

> Weiter zu Ihren Kontaktdaten

### 10.5 Passaggio 4 — contatti e consenso

**Titolo**

> Wie dürfen wir Sie kontaktieren?

Campi:

- `fullName`: obbligatorio;
- `phone`: obbligatorio;
- `email`: obbligatorio;
- `preferredContact`: `phone | email`;
- `privacyConsent`: obbligatorio;
- `marketingConsent`: facoltativo e separato.

Testo consenso obbligatorio:

> Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass Cleyra meine Anfrage zur Bearbeitung und Angebotserstellung an einen ausgewählten Reinigungspartner übermittelt.

Testo marketing facoltativo:

> Ich möchte gelegentlich Informationen und Angebote von Cleyra erhalten. Diese Einwilligung kann ich jederzeit widerrufen.

CTA finale:

> Kostenlose Anfrage senden

Microcopy:

> Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des Reinigungspartners akzeptieren.

### 10.6 Campi tecnici nascosti

Raccogliere senza mostrarli:

- `leadId` generato server-side;
- `createdAt` server-side;
- `landingPage`;
- `referrer`;
- `language`;
- `utmSource`;
- `utmMedium`;
- `utmCampaign`;
- `utmTerm`;
- `utmContent`;
- `gclid`;
- `gbraid`;
- `wbraid`;
- `deviceType` se determinato in modo non invasivo;
- `privacyPolicyVersion`;
- `privacyConsentTimestamp` server-side.

Non affidarsi esclusivamente a valori forniti dal client per timestamp, ID o stato.

---

## 11. Modello dati minimo

Usare nomi coerenti con lo stack esistente.

```ts
export type LeadStatus = "new" | "submitted" | "failed";

export type CleaningLead = {
  id: string;
  createdAt: string;
  status: LeadStatus;

  language: "de";
  landingPage: string;
  referrer?: string;

  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  gclid?: string;
  gbraid?: string;
  wbraid?: string;

  postalCode: string;
  city: string;
  serviceType: "end_cleaning" | "moving_cleaning" | "other";
  desiredDate: string;
  dateFlexibility?: "fixed" | "plus_minus_1_day" | "plus_minus_3_days";

  propertyType: "apartment" | "house";
  rooms: number;
  approxSqm: number;
  furnishedState: "empty" | "furnished" | "partially_furnished";
  floor?: string;
  elevator?: boolean;

  extras: {
    windows: boolean;
    balconyTerrace: boolean;
    cellar: boolean;
    oven: boolean;
    fridge: boolean;
    blindsShutters: boolean;
    garage: boolean;
    otherAreas: boolean;
  };

  notes?: string;
  photoKeys: string[];

  fullName: string;
  phone: string;
  email: string;
  preferredContact: "phone" | "email";

  privacyConsent: true;
  privacyPolicyVersion: string;
  privacyConsentTimestamp: string;
  marketingConsent: boolean;
};
```

### Dati da non salvare inutilmente

- IP completo per periodi indefiniti;
- fingerprinting;
- dati sensibili non richiesti;
- informazioni finanziarie;
- password, poiché non esiste account cliente.

---

## 12. Endpoint `/api/leads`

### Metodo

`POST`

### Responsabilità server

1. verificare metodo e content type;
2. applicare rate limiting;
3. verificare honeypot o token antispam;
4. validare payload con schema server-side;
5. normalizzare telefono ed e-mail;
6. sanitizzare testo libero;
7. verificare allegati;
8. generare `leadId`;
9. salvare il lead;
10. salvare parametri attribution;
11. inviare notifica interna;
12. inviare conferma all'utente;
13. restituire risposta JSON senza dati sensibili.

### Risposta positiva

```json
{
  "success": true,
  "leadId": "CLY-2026-XXXXXX",
  "redirectUrl": "/de/danke?lead=CLY-2026-XXXXXX"
}
```

### Risposta di validazione

HTTP `400`:

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "fieldErrors": {
    "email": "Bitte geben Sie eine gültige E-Mail-Adresse ein."
  }
}
```

### Errore generico

HTTP `500`:

```json
{
  "success": false,
  "code": "SUBMISSION_FAILED",
  "message": "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch."
}
```

Non restituire stack trace o dettagli infrastrutturali.

---

## 13. Antispam e sicurezza

Implementare almeno:

- campo honeypot invisibile agli utenti e ai lettori di schermo;
- tempo minimo realistico di compilazione;
- rate limiting per IP o identificatore equivalente;
- limite massimo richieste per intervallo;
- validazione server-side;
- protezione CSRF quando richiesta dallo stack;
- headers di sicurezza;
- Content Security Policy compatibile con GTM;
- escaping output;
- sanitizzazione `notes`;
- verifica MIME allegati;
- storage privato per fotografie;
- URL firmati e temporanei per accesso interno;
- nessun file eseguibile;
- log senza corpo completo del lead;
- gestione errori centralizzata.

Predisporre una soluzione CAPTCHA non invasiva soltanto se honeypot e rate limiting non sono sufficienti.

---

## 14. E-mail generate dal sito

### 14.1 Conferma all'utente

**Oggetto**

> Ihre Anfrage bei Cleyra ist eingegangen

**Corpo**

> Grüezi [Vorname]
>
> Vielen Dank für Ihre Anfrage bei Cleyra.
>
> Wir prüfen nun die Angaben zur Reinigung in [Ort] und klären, welcher regionale Reinigungspartner die gewünschte Region und den Termin abdecken kann.
>
> Ihre Referenznummer lautet: [Lead-ID]
>
> Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des ausführenden Reinigungspartners akzeptieren.
>
> Freundliche Grüsse  
> Cleyra

### 14.2 Notifica interna

**Oggetto**

> Neue Cleyra-Anfrage: [Ort] – [Datum] – [Lead-ID]

Contenuto strutturato:

- lead ID;
- nome;
- telefono;
- e-mail;
- località;
- servizio;
- data;
- immobile;
- locali;
- superficie;
- extra;
- note;
- landing page;
- source/medium/campaign;
- link interno allo storage o al record, se esistente.

Non inserire foto come allegati pesanti; usare link privati e temporanei.

---

## 15. Pagina di conferma `/de/danke`

### SEO

- `noindex, nofollow`;
- non includere dati personali nell'URL;
- consentire nell'URL soltanto un riferimento non sensibile.

### Contenuto

**H1**

> Vielen Dank. Ihre Anfrage ist bei Cleyra eingegangen.

**Testo**

> Wir prüfen nun, ob alle notwendigen Angaben vorhanden sind und welcher Reinigungspartner die gewünschte Region und den Termin abdecken kann.

**Passaggi successivi**

1. Cleyra prüft die Anfrage.
2. Bei Rückfragen kontaktieren wir Sie.
3. Ein ausgewählter Reinigungspartner meldet sich bezüglich der Offerte.

**Nota**

> Bitte achten Sie in den nächsten Stunden auf Anrufe und E-Mails.

Mostrare:

- numero richiesta;
- località;
- data richiesta;
- servizio;
- contatto Cleyra;
- link privacy;
- pulsante per tornare alla homepage.

Non mostrare nome, telefono o e-mail se la pagina può essere riaperta da URL senza autenticazione.

L'evento `lead_submitted` deve essere emesso una sola volta, non a ogni refresh.

---

## 16. Pagine informative

### 16.1 `/de/so-funktionierts`

Contenuto:

- spiegazione dei tre passaggi;
- ruolo di Cleyra;
- ruolo del partner;
- cosa accade dopo il modulo;
- libertà di accettare o rifiutare l'offerta;
- nota sulla Abnahmegarantie;
- CTA finale.

### 16.2 `/de/faq`

Categorie:

- richiesta e costi;
- processo e tempistiche;
- impresa esecutrice;
- offerta e contratto;
- Abnahmegarantie;
- dati personali;
- zone servite;
- modifica o cancellazione della richiesta.

Implementare FAQPage structured data soltanto se il contenuto è realmente visibile nella pagina e conforme alle linee guida vigenti.

### 16.3 `/de/ueber-cleyra`

Spiegare:

- perché esiste Cleyra;
- quale problema semplifica;
- che è un servizio di intermediazione;
- come vengono gestite le richieste;
- cosa significa partner selezionato;
- limiti del servizio;
- contatti reali.

Non inventare storia aziendale, persone, uffici o numeri.

### 16.4 `/de/kontakt`

Mostrare soltanto dati reali:

- e-mail;
- telefono;
- orari;
- indirizzo, se pubblicabile;
- modulo di contatto semplice separato dal modulo preventivo.

Il modulo contatto deve avere una finalità chiara e non essere conteggiato come lead commerciale principale.

### 16.5 Pagine legali

Creare layout e placeholder chiaramente marcati per:

- Datenschutz;
- Impressum;
- Vermittlungsbedingungen.

Non inventare testi legali definitivi. Inserire avviso nel codice/contenuto:

> `TODO LEGAL REVIEW: sostituire con testo approvato prima della pubblicazione.`

La pubblicazione in produzione è bloccata finché i placeholder legali non sono sostituiti.

---

## 17. Footer

Il footer deve includere:

- logo o wordmark Cleyra;
- breve descrizione;
- link alle pagine principali;
- link alle tre pagine legali;
- contatti;
- copyright dinamico;
- dichiarazione di intermediazione.

Testo:

> Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Reinigungsvertrag entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.

Non mostrare badge, certificazioni o metodi di pagamento non pertinenti.

---

## 18. SEO tecnico

### Requisiti globali

- title unico per ogni pagina;
- meta description unica;
- una sola H1;
- struttura H2/H3 logica;
- canonical assoluto;
- sitemap XML;
- robots.txt;
- pagina grazie esclusa dall'indice;
- Open Graph;
- Twitter/X cards di base;
- favicon e web manifest;
- URL leggibili;
- breadcrumb sulle pagine interne;
- link interni contestuali;
- nessuna pagina orfana;
- nessun contenuto duplicato tra località;
- immagini ottimizzate;
- JSON-LD coerente con ciò che è realmente visibile.

### Structured data suggeriti

- `Organization` o `LocalBusiness` solo con dati reali e tipo corretto;
- `WebSite`;
- `BreadcrumbList`;
- `FAQPage` soltanto dove appropriato.

Non usare markup di recensioni senza recensioni reali e idonee.

### Contenuti locali

Ogni landing locale deve avere almeno:

- un'introduzione unica;
- zone vicine;
- indicazione del servizio;
- processo;
- una FAQ locale;
- link verso le altre pagine locali;
- meta dati unici.

---

## 19. Analytics e Tag Manager

### Regola privacy

Non inviare dati personali a GA4, Google Ads, Tag Manager o dataLayer.

Non inviare:

- nome;
- e-mail;
- telefono;
- note;
- indirizzo completo;
- ID contenente dati personali.

### Eventi dataLayer

#### CTA

```js
window.dataLayer.push({
  event: "cta_click",
  cta_name: "hero_primary",
  page_type: "homepage",
  locale: "de"
});
```

#### Avvio modulo

```js
window.dataLayer.push({
  event: "form_start",
  form_name: "cleaning_lead",
  page_type: "location_landing",
  locale: "de"
});
```

#### Completamento passaggio

```js
window.dataLayer.push({
  event: "form_step_complete",
  form_name: "cleaning_lead",
  step_number: 1,
  service_type: "end_cleaning",
  locale: "de"
});
```

#### Invio riuscito

```js
window.dataLayer.push({
  event: "lead_submitted",
  form_name: "cleaning_lead",
  service_type: "end_cleaning",
  city: "Visp",
  locale: "de"
});
```

La città può essere trasmessa soltanto come località generica del servizio, mai come indirizzo completo.

### Persistenza attribution

Conservare durante la sessione e nel record lead:

- UTM;
- GCLID;
- GBRAID;
- WBRAID;
- landing page iniziale;
- referrer.

Non sovrascrivere l'attribuzione iniziale durante la stessa sessione senza una regola esplicita.

---

## 20. Cookie e consenso

Implementare una Consent Management Platform compatibile con lo stack e configurabile.

Categorie minime:

- necessari;
- analytics;
- marketing.

Requisiti:

- nessun tag analytics/marketing prima del consenso quando richiesto dalla configurazione legale;
- possibilità di rifiutare con facilità analoga all'accettazione;
- link per riaprire le preferenze;
- lingua tedesca;
- registrazione della versione del banner e delle preferenze;
- Consent Mode configurato correttamente se utilizzato;
- nessun checkbox marketing preselezionato nel modulo.

Il testo e la configurazione finale devono essere approvati professionalmente prima della pubblicazione.

---

## 21. Accessibilità

Obiettivo minimo: WCAG 2.2 AA dove ragionevolmente applicabile.

Verificare:

- navigazione completa da tastiera;
- focus visibile;
- ordine del focus logico;
- skip link;
- landmark semantici;
- label collegate ai campi;
- errori annunciati con `aria-live`;
- accordion accessibile;
- menu mobile accessibile;
- contrasto;
- testo ridimensionabile;
- target touch adeguati;
- nessuna informazione comunicata soltanto tramite colore;
- supporto `prefers-reduced-motion`;
- titoli pagina descrittivi;
- lingua documento impostata su `de-CH`.

---

## 22. Performance

Obiettivi indicativi su mobile:

- Lighthouse Performance ≥ 90 sulle pagine principali;
- Accessibility ≥ 95;
- Best Practices ≥ 95;
- SEO ≥ 95;
- LCP inferiore a 2,5 s in condizioni realistiche;
- CLS inferiore a 0,1;
- INP inferiore a 200 ms quando possibile.

Ottimizzazioni:

- server rendering/static generation dove adatto;
- JavaScript client minimo;
- immagini responsive;
- font ottimizzati e self-hosted se consentito;
- preload soltanto risorse critiche;
- niente carousel pesanti;
- niente video autoplay;
- niente librerie animation grandi;
- lazy load per sezioni non critiche;
- bundle analysis prima del rilascio.

---

## 23. Componenti richiesti

Struttura indicativa:

```txt
components/
  layout/
    Header.tsx
    MobileMenu.tsx
    Footer.tsx
    Container.tsx
  ui/
    Button.tsx
    Input.tsx
    Select.tsx
    Checkbox.tsx
    RadioGroup.tsx
    Textarea.tsx
    ProgressBar.tsx
    Accordion.tsx
    Alert.tsx
  marketing/
    Hero.tsx
    TrustStrip.tsx
    ProcessSteps.tsx
    ServiceList.tsx
    RegionLinks.tsx
    BenefitsGrid.tsx
    PartnerTransparency.tsx
    FaqPreview.tsx
    FinalCta.tsx
  lead-form/
    LeadForm.tsx
    StepLocationService.tsx
    StepProperty.tsx
    StepExtras.tsx
    StepContact.tsx
    PhotoUploader.tsx
    FormNavigation.tsx
    FormErrorSummary.tsx
  seo/
    JsonLd.tsx
    Breadcrumbs.tsx
```

Evitare componenti troppo generici o sistemi di design sovradimensionati.

---

## 24. Contenuti configurabili

Centralizzare:

- dati aziendali;
- contatti;
- orari;
- zone servite;
- pagine locali;
- copy CTA;
- versione privacy;
- limiti allegati;
- feature flags;
- indirizzi e-mail destinatari.

Esempio:

```ts
export const siteConfig = {
  name: "Cleyra",
  locale: "de-CH",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
  serviceAreas: ["Visp", "Brig-Glis", "Naters"],
  privacyPolicyVersion: "2026-01",
};
```

Non inserire dati fittizi in produzione.

---

## 25. Variabili d'ambiente

Creare `.env.example` con nomi espliciti, senza valori reali.

```bash
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_CONTACT_PHONE=

DATABASE_URL=

EMAIL_PROVIDER_API_KEY=
EMAIL_FROM=
INTERNAL_LEAD_NOTIFICATION_EMAIL=

UPLOAD_BUCKET=
UPLOAD_MAX_FILE_SIZE_MB=8

NEXT_PUBLIC_GTM_ID=

RATE_LIMIT_SECRET=
ANTISPAM_SECRET=
```

Documentare quali variabili sono obbligatorie e quali facoltative.

---

## 26. Logging e monitoraggio

Registrare:

- errori API;
- invii falliti;
- errori upload;
- errori e-mail;
- tempi risposta endpoint;
- rate limit attivati.

Non registrare nei log:

- corpo completo del lead;
- note complete;
- telefono ed e-mail in chiaro;
- contenuto delle foto;
- consenso in forma non necessaria.

Mascherare dati personali nei log.

Predisporre un endpoint di health check solo se necessario e non esporre dettagli sensibili.

---

## 27. Test automatici

### Unit test

- schema Zod;
- normalizzazione telefono;
- validazione CAP;
- data futura;
- serializzazione attribution;
- generazione lead ID;
- utility SEO.

### Component test

- navigazione tra passaggi;
- mantenimento stato;
- errori campo;
- consenso obbligatorio;
- upload e rimozione foto;
- loading e disabled;
- accordion;
- menu mobile.

### Integration test

- invio lead valido;
- payload invalido;
- errore database;
- errore provider e-mail senza perdita del lead;
- rate limit;
- honeypot;
- upload non valido;
- redirect pagina grazie.

### End-to-end

Usare Playwright o equivalente.

Scenari minimi:

1. utente completa il modulo da homepage;
2. utente completa da landing Visp;
3. utente torna indietro nel modulo;
4. utente corregge un errore;
5. utente invia con marketing non selezionato;
6. utente usa soltanto tastiera;
7. utente mobile a 320 px;
8. doppio click non crea due lead;
9. refresh pagina grazie non duplica evento;
10. pagina legale accessibile dal footer.

---

## 28. Controlli manuali prima del lancio

Testare almeno:

- iPhone Safari;
- Android Chrome;
- desktop Chrome;
- desktop Safari;
- Firefox;
- rete mobile lenta;
- tastiera;
- screen reader di base;
- zoom 200%;
- modulo completo;
- modulo incompleto;
- e-mail invalida;
- telefono invalido;
- data passata;
- file troppo grande;
- file non consentito;
- errore server;
- refresh e back button;
- parametri UTM;
- GCLID;
- consenso cookie accettato e rifiutato;
- e-mail conferma;
- e-mail interna;
- noindex pagina grazie;
- canonical;
- sitemap;
- robots.txt;
- metadata social;
- 404;
- redirects.

---

## 29. Sequenza di implementazione per Claude Code

### Fase 0 — memoria e orientamento

1. ispezionare repository e stato Git;
2. creare o aggiornare `CLAUDE.md`;
3. creare la directory `docs/`;
4. creare `PROJECT_OVERVIEW.md`;
5. creare `ARCHITECTURE.md` con struttura reale iniziale;
6. trasformare la sequenza di lavoro in `IMPLEMENTATION_PLAN.md` con task ID;
7. inizializzare `PROJECT_STATUS.md`;
8. inizializzare `DECISIONS.md`;
9. inizializzare `SESSION_HANDOFF.md`;
10. inizializzare `CHANGELOG.md`;
11. aggiornare il `README.md`;
12. verificare che una nuova sessione possa capire cosa fare leggendo soltanto questi file.

### Fase 1 — fondazioni

1. ispezionare repository;
2. documentare stack rilevato;
3. creare struttura rotte;
4. configurare TypeScript strict;
5. creare layout, header e footer;
6. definire token e componenti UI di base;
7. aggiungere configurazione contenuti;
8. aggiornare i file di continuità al termine della fase.

### Fase 2 — pagine marketing

1. homepage;
2. template landing locali;
3. Visp;
4. Brig-Glis;
5. Naters;
6. come funziona;
7. FAQ;
8. chi siamo;
9. contatto;
10. placeholder pagine legali.

### Fase 3 — modulo

1. schema dati;
2. stato multi-step;
3. quattro passaggi;
4. validazioni;
5. salvataggio sessione;
6. upload;
7. gestione errori;
8. responsive e accessibilità.

### Fase 4 — backend minimo

1. endpoint lead;
2. database;
3. storage privato;
4. antispam;
5. notifica interna;
6. conferma utente;
7. pagina grazie;
8. idempotenza.

### Fase 5 — SEO e analytics

1. metadata;
2. canonical;
3. sitemap;
4. robots;
5. JSON-LD;
6. dataLayer;
7. GTM;
8. attribution;
9. consent management.

### Fase 6 — qualità

1. test automatici;
2. test e2e;
3. audit accessibilità;
4. audit performance;
5. verifica mobile;
6. controllo sicurezza;
7. controllo contenuti;
8. controllo legale.

---

## 30. Definition of Done

Il sito è pronto soltanto quando:

- tutte le rotte previste funzionano;
- non esistono link rotti;
- il sito è utilizzabile da 320 px in su;
- il modulo funziona con tastiera;
- validazione client/server è attiva;
- doppio invio è impedito;
- il lead viene salvato prima dell'invio e-mail;
- l'utente riceve conferma;
- la notifica interna arriva;
- gli allegati sono privati;
- i parametri UTM e click ID vengono salvati;
- nessun dato personale viene inviato ad analytics;
- la pagina grazie è `noindex`;
- sitemap, robots e canonical sono corretti;
- le pagine locali non sono duplicate;
- tutti i testi sul ruolo di Cleyra sono presenti;
- non ci sono promesse non verificabili;
- cookie banner e preferenze funzionano;
- i placeholder legali sono stati sostituiti e approvati;
- Lighthouse e Core Web Vitals sono accettabili;
- test automatici e controlli manuali essenziali passano;
- `.env.example` e README di avvio sono completi;
- il repository non contiene segreti;
- `CLAUDE.md` contiene la routine di ripresa;
- `PROJECT_OVERVIEW.md` descrive correttamente prodotto e scope;
- `ARCHITECTURE.md` corrisponde alla struttura reale del codice;
- `IMPLEMENTATION_PLAN.md` riflette attività completate, bloccate e successive;
- `PROJECT_STATUS.md` è aggiornato e sintetico;
- `DECISIONS.md` contiene le decisioni architetturali rilevanti;
- `SESSION_HANDOFF.md` permette di riprendere il lavoro senza la chat precedente;
- `CHANGELOG.md` registra le modifiche rilevanti;
- branch, ultimo commit verificato, test e problemi aperti sono documentati.

---

## 31. Istruzione finale per Claude Code

Eseguire il lavoro in piccoli incrementi verificabili e lasciare sempre il progetto riprendibile da una nuova sessione.

### Prima di modificare

1. leggere `CLAUDE.md`;
2. leggere questa specifica;
3. leggere `docs/PROJECT_STATUS.md`;
4. leggere `docs/SESSION_HANDOFF.md`;
5. leggere le decisioni rilevanti;
6. controllare repository, branch, `git status` e ultimi commit;
7. identificare stack e convenzioni reali;
8. identificare il task ID corrente;
9. elencare i file che verranno modificati;
10. segnalare eventuali conflitti tecnici reali.

### Durante l'implementazione

- non inventare dati aziendali;
- non pubblicare placeholder come contenuto definitivo;
- non ampliare lo scope;
- non costruire dashboard o marketplace;
- non introdurre librerie pesanti senza necessità;
- non disattivare TypeScript o lint per aggirare errori;
- mantenere il sito accessibile e mobile-first;
- scrivere test per la logica critica;
- collegare TODO e cambiamenti al task ID;
- aggiornare le decisioni e l'architettura quando cambiano davvero;
- non fare affidamento sulla memoria della conversazione.

### Prima di chiudere la sessione

1. eseguire i test pertinenti;
2. controllare il diff e l'assenza di segreti;
3. aggiornare `IMPLEMENTATION_PLAN.md`;
4. aggiornare `PROJECT_STATUS.md`;
5. riscrivere `SESSION_HANDOFF.md`;
6. aggiornare `DECISIONS.md`, `ARCHITECTURE.md` e `CHANGELOG.md` quando necessario;
7. aggiornare README e `.env.example` se configurazione o setup sono cambiati.

A ogni fase completata, riportare:

- task ID;
- file creati o modificati;
- decisioni tecniche;
- test eseguiti e risultati;
- problemi rimasti;
- modifiche non committate;
- istruzioni necessarie per configurare ambiente e deployment;
- massimo cinque azioni successive esatte.

Il lavoro non è correttamente consegnato se il codice è cambiato ma i file di continuità non descrivono lo stato corrente.
