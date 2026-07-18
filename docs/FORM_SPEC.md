# Form Spec — richiesta Cleyra (due passaggi)

Il form non può divergere silenziosamente da questo documento: ogni modifica ai campi,
alla validazione o al comportamento va riflessa qui nella stessa sessione.

Durata target: 60–90 secondi, due passaggi.

## Passaggio 1 — richiesta

Titolo: `Wo und wann soll gereinigt werden?`
Indicatore: `Schritt 1 von 2` / `Dauert etwa 1 Minute`

| Campo | Label | Tipo | Obbligatorio | Validazione |
|---|---|---|---|---|
| `postalCode` | Postleitzahl | testo (numerico) | sì | esattamente 4 cifre, esempio `3930` |
| `city` | Ort | testo | sì | non vuoto |
| `serviceType` | Welche Reinigung benötigen Sie? | select/radio | sì | una tra: `Endreinigung zur Wohnungsabgabe`, `Umzugsreinigung`, `Andere Reinigung` |
| `dateMode` | Wann soll gereinigt werden? | radio | sì | una tra: `Ich kenne das genaue Datum`, `Ich bin flexibel` |
| `desiredDate` | (mostrato se `dateMode` = data esatta) | date | condizionale | non può essere una data passata |
| `desiredPeriod` | (mostrato se `dateMode` = flessibile) | select | condizionale | una tra: `Innerhalb der nächsten 7 Tage`, `Innerhalb der nächsten 14 Tage`, `Innerhalb der nächsten 30 Tage`, `Später` |
| `rooms` | Wie viele Zimmer hat die Wohnung? | select | sì | una tra: `1 bis 1.5 Zimmer`, `2 bis 2.5 Zimmer`, `3 bis 3.5 Zimmer`, `4 bis 4.5 Zimmer`, `5 bis 5.5 Zimmer`, `6 oder mehr Zimmer` |
| `propertyEmpty` | Ist die Wohnung bei der Reinigung leer? | radio | sì | una tra: `Ja`, `Teilweise`, `Nein`, `Noch nicht bekannt` |
| `notes` | Bemerkungen oder besondere Wünsche | textarea | no | testo libero, lunghezza massima ragionevole (da definire in implementazione, es. 1000 caratteri) |

Logica condizionale: `dateMode` determina quale tra `desiredDate` e `desiredPeriod` è
visibile e richiesto; l'altro campo non viene inviato/validato.

Pulsante: `Weiter zu den Kontaktdaten`

### Messaggi di errore (Passaggio 1)

Scritti in WEB-006 (2026-07-18), fonte di verità per `src/lib/validation/requestStep1.ts`:

| Campo | Messaggio |
|---|---|
| `postalCode` | `Bitte geben Sie eine 4-stellige Postleitzahl ein.` |
| `city` | `Bitte geben Sie einen Ort ein.` |
| `serviceType` | `Bitte wählen Sie eine Reinigungsart.` |
| `dateMode` | `Bitte wählen Sie eine Option.` |
| `desiredDate` (mancante) | `Bitte wählen Sie ein Datum.` |
| `desiredDate` (data passata) | `Das Datum darf nicht in der Vergangenheit liegen.` |
| `desiredPeriod` | `Bitte wählen Sie einen Zeitraum.` |
| `rooms` | `Bitte wählen Sie die Zimmerzahl.` |
| `propertyEmpty` | `Bitte wählen Sie eine Option.` |
| `notes` (troppo lungo) | `Bitte kürzen Sie Ihre Bemerkung.` |

### Stato implementazione (WEB-006)

Il passaggio 1 è implementato con validazione client (Zod, `src/lib/validation/requestStep1.ts`,
condiviso in futuro con la validazione server di WEB-009) e cattura dei campi tecnici
nascosti (UTM/GCLID/referrer/timestamp/versione form/lingua) come input nascosti nel
form. Un campo honeypot (`honeypot`, input nascosto) è presente nel markup ma non
ancora verificato lato server (WEB-011). Dopo un submit valido del passaggio 1, il
form mostra un segnaposto per il passaggio 2 (`Wie dürfen wir Sie kontaktieren?`) con
un link per tornare al passaggio 1 senza perdere i dati inseriti; il passaggio 2 reale
(campi, consenso privacy, invio) è compito di WEB-007. Nessun invio al server: quello
è WEB-009.

## Passaggio 2 — contatti

Titolo: `Wie dürfen wir Sie kontaktieren?`

| Campo | Label | Tipo | Obbligatorio | Validazione |
|---|---|---|---|---|
| `fullName` | Vorname und Nachname | testo | sì | non vuoto |
| `phone` | Telefonnummer | tel | sì | normalizzato server-side; supporto formati svizzeri e internazionali ragionevoli |
| `email` | E-Mail-Adresse | email | sì | formato e-mail valido |
| `preferredContact` | Bevorzugter Kontakt | select | no | una tra: `Telefon`, `E-Mail`, `WhatsApp` |
| `privacyConsent` | (testo checkbox, vedi `CONTENT.md`) | checkbox | sì | deve essere `true`; non preselezionata |

Pulsante: `Kostenlose Anfrage senden`

## Campi esplicitamente esclusi dal form MVP

Non chiedere: metri quadrati, piano, ascensore, animali, elettrodomestici, muffa,
fotografie, upload file, cantina separata, garage, data di consegna chiavi, iscrizione
newsletter, fascia oraria, checklist tecnica. Questi dettagli vengono raccolti da
Mirdita durante il contatto diretto.

## Campi tecnici nascosti (attribution)

Catturati se disponibili, non mostrati all'utente:

- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`
- `gclid`
- URL della landing di ingresso (`sourceUrl`)
- `referrer`
- `timestamp` di inizio compilazione
- `formVersion`
- `privacyTextVersion` (versione del testo di consenso mostrato)
- lingua (`de`, fissa nel MVP)

Nessun fingerprinting del dispositivo/browser.

## Mapping verso il database (lead)

Il payload del form mappa 1:1 sui campi del lead descritti in
`CLEYRA_WEBSITE_SPEC.md` sezione 8: `postalCode`, `city`, `serviceType`, `dateMode`,
`desiredDate`, `desiredPeriod`, `rooms`, `propertyEmpty`, `notes`, `fullName`, `phone`,
`email`, `preferredContact`, `privacyConsentAt` (timestamp server al momento
dell'accettazione), `privacyTextVersion`, `sourceUrl`, `referrer`, `utmSource`,
`utmMedium`, `utmCampaign`, `utmContent`, `utmTerm`, `gclid`, `formVersion`. I campi
`id`, `createdAt`, `updatedAt`, `status`, `notificationStatus` sono generati/gestiti
server-side, non dal form.

## Eventi collegati

Vedi `ANALYTICS.md` per la lista completa. In sintesi: `form_view`, `form_start`,
`form_step_1_complete`, `form_step_2_view`, `form_validation_error`,
`lead_submit_attempt`, `lead_submit_success`, `lead_submit_error`.

## Anti-spam

- Honeypot: campo nascosto che, se compilato, scarta la submission silenziosamente
  lato server.
- Rate limiting per IP/finestra temporale sull'endpoint di submit.
- Tempo minimo realistico tra `form_view` e submit (submission troppo rapide vengono
  rifiutate o marcate sospette).
- Deduplicazione breve: submission identiche (stesso payload) in una finestra breve non
  creano lead duplicati.
- Limite dimensione payload.
- La validazione server è sempre autorevole, indipendentemente dalla validazione client.
- Nessun CAPTCHA nel MVP, finché non risulta necessario.

## Accessibilità

- Ogni campo ha una `label` associata esplicitamente.
- Errori collegati al campo tramite `aria-describedby` (o equivalente).
- Focus visibile su tutti gli elementi interattivi.
- Form completamente utilizzabile da tastiera.
- Messaggi di stato/errore annunciati via `aria-live`.
- Indicatore di progresso (`Schritt 1 von 2`) accessibile agli screen reader.
- Nessun significato veicolato solo tramite colore.

## Stati di invio (UI)

- `idle` — form non ancora toccato.
- `validating` — validazione client in corso/eseguita sul blur o al submit dello step.
- `submitting` — richiesta al server in corso, pulsante disabilitato (protezione
  doppio invio).
- `success` — submit riuscito, redirect a `/de/danke`.
- `field error` — errori di validazione per campo specifico, form non inviato.
- `server error` — errore lato server (validazione fallita o errore tecnico), messaggio
  generico mostrato, campi validi preservati.

Dopo un errore recuperabile, i campi già validi non vengono mai cancellati.
