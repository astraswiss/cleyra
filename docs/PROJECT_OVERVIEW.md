# Project overview — Cleyra

## Problema risolto

Chi lascia un appartamento nel Canton Vallese deve trovare un'impresa di
pulizia di fine locazione (Endreinigung), confrontare offerte e fissare un
appuntamento, spesso sotto pressione di tempo. Cleyra centralizza questa
richiesta in un unico modulo.

## Ruolo di Cleyra

Cleyra è un servizio di **intermediazione** (Vermittlungsservice), non
un'impresa di pulizia. Riceve la richiesta, la verifica e la vermitta a un
partner di pulizia regionale selezionato. Il contratto di pulizia nasce
direttamente tra il cliente e il partner esecutore, non con Cleyra.

## Utente principale

Privati nel Canton Vallese (Oberwallis) che devono restituire un
appartamento in affitto e necessitano di una pulizia di fine locazione,
tipicamente entro poche settimane dalla data di consegna.

## Servizio e regioni della prima versione

- Servizio principale: Endreinigung zur Wohnungsabgabe
- Servizio secondario: Umzugsreinigung
- Regioni: Visp, Brig-Glis, Naters, Oberwallis

## Obiettivo di conversione

Evento primario `lead_submitted`: invio completo del modulo a quattro
passaggi. Eventi secondari: `form_view`, `form_start`,
`form_step_{1..4}_complete`, `form_error`, `phone_click`, `email_click`,
`cta_click`.

## Principali flussi utente

1. Utente arriva da homepage, landing locale o campagna Google Ads.
2. Legge la promessa e la spiegazione del ruolo di intermediazione.
3. Avvia il modulo (luogo/servizio → immobile → dettagli/foto →
   contatti/consenso).
4. Riceve conferma a schermo (`/de/danke`) e via e-mail.
5. Cleyra vermitta la richiesta al partner regionale; il partner contatta
   l'utente con un'offerta.

## Pagine previste (prima versione)

`/de`, `/de/endreinigung-visp`, `/de/endreinigung-brig`,
`/de/endreinigung-naters`, `/de/umzugsreinigung-oberwallis`,
`/de/so-funktionierts`, `/de/faq`, `/de/ueber-cleyra`, `/de/kontakt`,
`/de/datenschutz`, `/de/impressum`, `/de/vermittlungsbedingungen`,
`/de/danke`, `/api/leads`.

## Fuori scope (esplicito)

Dashboard clienti, area partner, marketplace, sistema di vendita lead,
fatturazione, CRM completo, app mobile, portale amministrativo avanzato,
automazioni commerciali complesse, pulizia regolare, pulizia uffici,
Airbnb, industria, traslochi, sgomberi, manutenzione, giardinaggio.

## Glossario

- **Lead**: la richiesta inviata tramite il modulo (`CleaningLead`).
- **Vermittlung**: l'atto di inoltrare la richiesta a un partner regionale.
- **Partner esecutore**: l'impresa di pulizia che esegue effettivamente il
  lavoro ed emette l'offerta.
- **Abnahmegarantie**: garanzia di consegna dell'appartamento accettata dal
  locatore; vale solo se esplicitamente confermata dal partner nell'offerta.
- **UTM / GCLID / GBRAID / WBRAID**: parametri di attribution marketing
  raccolti in fase di lead e non inviati come dati personali ad analytics.

Aggiornare questo file quando cambia il prodotto (nuove regioni, nuovi
servizi, nuovo mercato linguistico), non per modifiche tecniche minori.
