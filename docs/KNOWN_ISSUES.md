# Known Issues

Registro dei problemi noti. Ogni voce deve avere ID, severità, stato, riproduzione,
risultato atteso, risultato reale, workaround (se esiste) e task collegato.

Formato:

```md
## ISSUE-XXX — Titolo
Severity: low | medium | high | critical
Status: open | investigating | workaround | resolved
Reproduction:
Expected:
Actual:
Workaround:
Related task:
```

---

## ISSUE-001 — Contenuto legale (Impressum/Datenschutz/Vermittlungsbedingungen) non disponibile
Severity: medium
Status: workaround
Reproduction: Serve pubblicare `/de/datenschutz`, `/de/impressum`,
`/de/vermittlungsbedingungen` (task WEB-005) con dati reali dell'organizzazione
(ragione sociale, indirizzo, contatti, base legale del trattamento dati).
Expected: Le pagine legali contengono dati reali e corretti dell'organizzazione
Cleyra/Mirdita.
Actual: Questi dati non sono ancora stati forniti. Non vanno inventati (regola non
negoziabile).
Workaround (deciso dall'utente il 2026-07-18): le tre pagine restano pubblicate con un
testo esplicito "Diese Seite ist in Vorbereitung" invece di contenuto legale fittizio,
e sono marcate `noindex, nofollow` finché il contenuto reale non è disponibile. Non
utilizzabile così com'è per un lancio in produzione: prima del lancio reale (WEB-021)
questi dati devono essere raccolti e le pagine completate, rimuovendo il noindex.
Related task: WEB-005, WEB-021
