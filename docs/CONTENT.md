# Content — fonte unica dei testi (tedesco)

Questo file è l'unica fonte per i testi finali del sito. Ogni modifica al copy nel
codice richiede una modifica corrispondente qui, nella stessa sessione.

Tutti i testi sono in tedesco (unica lingua del MVP). Non tradurre, non parafrasare, non
aggiungere numeri, recensioni o garanzie non presenti qui.

## Disclaimer di intermediazione (obbligatorio, footer + sezione dedicata)

```text
Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der Vertrag über die Reinigung entsteht direkt zwischen dem Kunden und dem ausführenden Partnerunternehmen.
```

## Hero (landing `/de/endreinigung-oberwallis`)

H1:

```text
Endreinigung im Oberwallis einfach anfragen
```

Sottotitolo:

```text
Beschreiben Sie kurz Ihre Wohnung und den gewünschten Termin. Cleyra prüft Ihre Anfrage und vermittelt sie an einen ausgewählten regionalen Reinigungspartner.
```

CTA primaria:

```text
Kostenlose Anfrage starten
```

Microcopy sotto la CTA:

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

## Problema/soluzione

Testo aggiunto durante WEB-004 (2026-07-18): la spec non fornisce un testo letterale
per questa sezione, solo la sua posizione nell'ordine della landing. Rispetta i
vincoli (nessun dato inventato, nessuna promessa non verificabile).

Titolo:

```text
Die Endreinigung muss stimmen — die Suche kostet Zeit
```

Testo:

```text
Bei der Wohnungsabgabe zählt eine saubere Endreinigung. Statt selbst einen passenden Anbieter zu suchen, senden Sie Ihre Anfrage an Cleyra. Wir vermitteln sie an einen regionalen Reinigungspartner für Ihre Zone und Ihren Wunschtermin.
```

## Processo in tre passaggi

Titolo sezione:

```text
So funktioniert's
```

1. `Anfrage ausfüllen`
2. `Anfrage wird geprüft`
3. `Offerte erhalten und entscheiden`

## Servizi (cosa può comprendere la pulizia)

Testo aggiunto durante WEB-004 (2026-07-18). Le tre opzioni corrispondono
esattamente a `serviceType` nel form (vedi `FORM_SPEC.md`): nessuna promessa di
prezzo, nessuna lista tecnica dettagliata (quella la raccoglie Mirdita nel contatto
diretto).

Titolo sezione:

```text
Welche Reinigung Sie anfragen können
```

```text
Endreinigung zur Wohnungsabgabe
Für die Rückgabe Ihrer Mietwohnung.
```

```text
Umzugsreinigung
Für den Umzug in eine neue Wohnung.
```

```text
Andere Reinigung
Für weitere Reinigungsanliegen im Oberwallis.
```

## Zona servita

Testo aggiunto durante WEB-004 (2026-07-18). Non promette copertura totale della
regione; non crea pagine dedicate per singola città (vietato dalla spec in questa
fase).

Titolo sezione:

```text
Serviceregion
```

```text
Cleyra vermittelt Anfragen aus dem Oberwallis, unter anderem aus Visp, Brig-Glis und Naters.
```

## Spiegazione dell'intermediazione (trasparenza)

Titolo sezione:

```text
Cleyra ist Vermittler, nicht Ausführender
```

Testo: il disclaimer di intermediazione obbligatorio (vedi sezione dedicata in cima a
questo documento), riportato identico anche in questa sezione della landing.

## FAQ

Testo aggiunto durante WEB-005 (2026-07-18): la spec non fornisce domande/risposte
letterali, solo la posizione della sezione. Contenuto scritto usando solo fatti già
stabiliti altrove in questo documento/nella spec, nessun dato inventato. Usato sia
nella sezione FAQ della landing sia nella pagina dedicata `/de/faq`.

**Ist die Anfrage kostenlos?**
Ja. Die Anfrage über Cleyra ist kostenlos und unverbindlich. Ein Auftrag entsteht
erst, wenn Sie eine Offerte des ausführenden Partners akzeptieren.

**Wer führt die Reinigung aus?**
Cleyra ist ein Vermittlungsservice und führt selbst keine Reinigungsarbeiten aus. Die
Reinigung wird von einem ausgewählten regionalen Partnerunternehmen ausgeführt, mit
dem der Vertrag direkt entsteht.

**In welchen Gebieten ist Cleyra aktiv?**
Cleyra vermittelt Anfragen aus dem Oberwallis, unter anderem aus Visp, Brig-Glis und
Naters.

**Was passiert nach dem Absenden der Anfrage?**
Cleyra prüft Ihre Angaben und klärt, welcher regionale Reinigungspartner Ihre Region
und Ihren Wunschtermin abdecken kann. Sie werden anschliessend kontaktiert.

**Muss ich die Offerte annehmen?**
Nein. Sie entscheiden erst nach Erhalt der Offerte des Partnerunternehmens, ob Sie
den Auftrag erteilen möchten.

## CTA finale

Testo aggiunto durante WEB-004/WEB-005 (2026-07-18): stessa CTA della hero, ripetuta
prima del footer.

```text
Kostenlose Anfrage starten
```

## Footer — disclaimer di intermediazione

Il footer condiviso (`src/app/de/layout.tsx`) riporta, oltre ai link legali, il
disclaimer di intermediazione obbligatorio per intero (stesso testo della sezione
dedicata in cima a questo documento).

## Form — Schritt 1 (Anfrage)

Indicatore progresso:

```text
Schritt 1 von 2
Dauert etwa 1 Minute
```

Titolo step:

```text
Wo und wann soll gereinigt werden?
```

Campi — vedi `FORM_SPEC.md` per struttura completa; testi:

- `Postleitzahl` (esempio: `3930`)
- `Ort` (esempio: `Visp`)
- `Welche Reinigung benötigen Sie?`
  - `Endreinigung zur Wohnungsabgabe`
  - `Umzugsreinigung`
  - `Andere Reinigung`
- `Wann soll gereinigt werden?`
  - `Ich kenne das genaue Datum`
  - `Ich bin flexibel`
- Periodo flessibile:
  - `Innerhalb der nächsten 7 Tage`
  - `Innerhalb der nächsten 14 Tage`
  - `Innerhalb der nächsten 30 Tage`
  - `Später`
- `Wie viele Zimmer hat die Wohnung?`
  - `1 bis 1.5 Zimmer`
  - `2 bis 2.5 Zimmer`
  - `3 bis 3.5 Zimmer`
  - `4 bis 4.5 Zimmer`
  - `5 bis 5.5 Zimmer`
  - `6 oder mehr Zimmer`
- `Ist die Wohnung bei der Reinigung leer?`
  - `Ja`
  - `Teilweise`
  - `Nein`
  - `Noch nicht bekannt`
- `Bemerkungen oder besondere Wünsche` (facoltativo)
  - helper: `Zum Beispiel Fenster, Balkon, Keller oder ein besonderer Termin.`

Pulsante avanti:

```text
Weiter zu den Kontaktdaten
```

## Form — Schritt 2 (Kontakt)

Titolo step:

```text
Wie dürfen wir Sie kontaktieren?
```

Campi:

- `Vorname und Nachname`
- `Telefonnummer`
- `E-Mail-Adresse`
- `Bevorzugter Kontakt` (facoltativo): `Telefon`, `E-Mail`, `WhatsApp`

Checkbox consenso privacy (obbligatoria, non preselezionata):

```text
Ich habe die Datenschutzerklärung gelesen und bin damit einverstanden, dass Cleyra meine Angaben zur Bearbeitung der Anfrage und zur Erstellung einer Offerte an einen ausgewählten Reinigungspartner übermittelt.
```

Pulsante invio:

```text
Kostenlose Anfrage senden
```

Microcopy sotto il pulsante:

```text
Die Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des ausführenden Reinigungspartners akzeptieren.
```

## Pagina grazie (`/de/danke`)

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

Regola: mostrare l'ID richiesta, mai dati personali nell'URL.

## E-mail interna (Mirdita/Cleyra)

Contenuto minimo (nessun testo di marketing, solo dati): lead ID, data/ora, zona,
servizio, data/periodo desiderato, numero locali, stato immobile (vuoto/parziale/pieno),
note, nome, telefono, e-mail, preferenza di contatto, dati di attribution (UTM/GCLID).

## E-mail al cliente

Oggetto:

```text
Ihre Anfrage bei Cleyra ist eingegangen
```

Corpo:

```text
Grüezi [Name]

Vielen Dank für Ihre Anfrage bei Cleyra.

Wir prüfen nun Ihre Angaben und klären, welcher regionale Reinigungspartner Ihre Anfrage bearbeiten kann.

Ihre Anfrage ist kostenlos und unverbindlich. Ein Auftrag entsteht erst, wenn Sie eine Offerte des ausführenden Partners akzeptieren.

Referenz: [Lead-ID]

Freundliche Grüsse
Cleyra
```

Regola: non promettere tempi precisi non garantiti.

## SEO — landing principale

```text
Title: Endreinigung Oberwallis unverbindlich anfragen | Cleyra
Description: Endreinigung im Oberwallis gesucht? Wohnung, Ort und Termin angeben und kostenlos eine unverbindliche Anfrage über Cleyra senden.
H1: Endreinigung im Oberwallis einfach anfragen
```

## Testi non ancora definiti

I seguenti testi non sono ancora stati scritti in dettaglio e vanno completati quando si
lavora sui task corrispondenti, senza inventare contenuti nel frattempo:

- copy completo di `/de/so-funktionierts`, `/de/ueber-cleyra`, `/de/kontakt`
  (`/de/faq` è invece coperta dalla sezione "FAQ" qui sopra, scritta in WEB-005);
- contenuto legale di `/de/datenschutz`, `/de/impressum`, `/de/vermittlungsbedingungen`
  (richiede dati reali dell'organizzazione — vedi `KNOWN_ISSUES.md`, ISSUE-001);
- messaggi di errore specifici per campo del form.

Quando questi testi vengono scritti, vanno aggiunti qui prima o insieme all'implementazione
nel codice.
