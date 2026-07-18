# Analytics

## Conversione primaria

```text
lead_submit_success
```

## Eventi

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

## Parametri suggeriti per evento

- Tutti gli eventi: `formVersion`, `sourceUrl`/pagina corrente, `language` (`de`).
- `cta_click`: identificatore della CTA cliccata (es. posizione nella pagina).
- `form_validation_error`: nome del campo in errore (mai il valore inserito).
- `lead_submit_attempt` / `lead_submit_success` / `lead_submit_error`: `leadId` (solo
  dopo la creazione), esito, codice errore generico (mai messaggi con PII).

## UTM

Parametri catturati dalla query string della landing di ingresso e salvati sul lead
(non inviati come evento con dati personali):

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

## GCLID

Catturato dalla query string (`gclid`) e salvato sul lead, per collegare in futuro lead
qualificati e lavori vinti alle campagne Google Ads.

## Consenso

- Nessun evento di tracciamento non essenziale prima del consenso, se e quando verrà
  introdotto un banner di consenso (non presente nel MVP iniziale: da valutare in
  base allo strumento di analytics scelto — vedi nota sotto).
- Il consenso alla privacy policy per l'elaborazione del lead (`privacyConsent` nel
  form) è distinto dal consenso ai cookie/analytics ed è sempre obbligatorio per
  l'invio della richiesta.

## Test

- Verifica manuale con lo strumento di debug del provider di analytics scelto prima del
  lancio (WEB-016).
- Verifica che `lead_submit_success` si attivi una sola volta per lead (nessun doppio
  conteggio su doppio submit/refresh della pagina grazie).
- Verifica che nessun evento contenga PII ispezionando il payload di rete in
  ambiente di test.

## Dati vietati negli eventi

Non inviare mai agli analytics:

- nome;
- telefono;
- e-mail;
- note;
- indirizzo (oltre a CAP/città, che sono dati di localizzazione a bassa granularità già
  presenti nel lead, non necessari negli eventi);
- qualsiasi altro dato personale identificativo.

## Nota aperta

Lo strumento di analytics (es. Google Analytics 4, Google Ads conversion tracking, o
altro) non è ancora stato scelto: registrare la decisione in `DECISIONS.md` quando presa,
come parte del task WEB-016.
