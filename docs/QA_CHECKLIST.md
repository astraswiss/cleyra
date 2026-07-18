# QA Checklist

Da eseguire prima del rilascio (task WEB-020) e ripetere dopo modifiche rilevanti.
Nessuna voce va spuntata senza verifica reale.

## Mobile
- [ ] Landing usabile a 320px di larghezza.
- [ ] Form completabile su viewport mobile reale/emulato.
- [ ] Nessun overflow orizzontale.
- [ ] Touch target sufficientemente grandi.

## Desktop
- [ ] Layout coerente su viewport desktop comuni (1280px, 1440px, 1920px).
- [ ] Nessuna sezione rotta a larghezze intermedie.

## Tastiera
- [ ] Intera landing navigabile con Tab/Shift+Tab.
- [ ] Form completabile e inviabile solo da tastiera.
- [ ] Focus sempre visibile.
- [ ] Nessuna trappola di focus.

## Screen reader
- [ ] Heading in ordine logico (H1 unico, H2/H3 coerenti).
- [ ] Label associate a tutti i campi form.
- [ ] Errori annunciati (`aria-live`).
- [ ] Progress step annunciato.

## Form valido
- [ ] Compilazione completa step 1 + step 2 → submit riuscito → redirect `/de/danke`.
- [ ] Lead visibile nel database con tutti i campi attesi.

## Form non valido
- [ ] Ogni campo obbligatorio mancante genera errore specifico.
- [ ] CAP non a 4 cifre rifiutato.
- [ ] Data passata rifiutata.
- [ ] E-mail malformata rifiutata.
- [ ] Consenso privacy non spuntato blocca l'invio.

## Doppio invio
- [ ] Doppio click sul pulsante di invio non crea due lead.
- [ ] Refresh della pagina grazie non duplica il lead.

## Server error
- [ ] Errore server simulato mostra messaggio generico, non dettagli tecnici.
- [ ] Campi validi non vengono persi dopo un errore server.

## E-mail
- [ ] E-mail interna ricevuta con tutti i campi attesi.
- [ ] E-mail cliente ricevuta con oggetto/corpo corretti.
- [ ] Scenario "e-mail fallita" non perde il lead (`notification_failed`).

## Database
- [ ] Tutti i campi minimi del lead popolati correttamente.
- [ ] Stato iniziale del lead corretto (`new`/`notification_pending`).
- [ ] Nessun dato duplicato per submission legittime distinte.

## Analytics
- [ ] `lead_submit_success` si attiva una sola volta per lead.
- [ ] Nessun dato personale nei payload analytics (verifica di rete).
- [ ] Eventi principali (`form_view`, `form_start`, `cta_click`, ecc.) verificati con lo
      strumento di debug.

## UTM/GCLID
- [ ] UTM e GCLID in query string vengono salvati sul lead.
- [ ] Assenza di UTM/GCLID non blocca l'invio.

## Consenso
- [ ] Checkbox privacy non preselezionata.
- [ ] `privacyConsentAt` e `privacyTextVersion` salvati correttamente.

## SEO
- [ ] Title/description/H1 della landing corretti.
- [ ] Canonical presente sulle pagine indicizzabili.
- [ ] Sitemap valida e raggiungibile.
- [ ] Robots corretto.
- [ ] `/de/danke` `noindex`.

## 404
- [ ] Pagina 404 esiste e non espone dati sensibili.

## Link legali
- [ ] Link a Datenschutz/Impressum/Vermittlungsbedingungen presenti e funzionanti da
      ogni pagina (footer).

## Performance
- [ ] Landing principale carica in tempi ragionevoli su connessione mobile simulata.
- [ ] Nessun asset pesante non necessario.

## Produzione
- [ ] Smoke test post-deploy eseguito (vedi `DEPLOYMENT.md`).
- [ ] Variabili ambiente di produzione verificate (nessun segreto nel repository).
