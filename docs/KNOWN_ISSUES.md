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
Status: open
Reproduction: Serve pubblicare `/de/datenschutz`, `/de/impressum`,
`/de/vermittlungsbedingungen` (task WEB-005) con dati reali dell'organizzazione
(ragione sociale, indirizzo, contatti, base legale del trattamento dati).
Expected: Le pagine legali contengono dati reali e corretti dell'organizzazione
Cleyra/Mirdita.
Actual: Questi dati non sono ancora stati forniti al momento della Fase 0. Non vanno
inventati.
Workaround: nessuno — il task WEB-005 deve raccogliere i dati reali prima della
pubblicazione, non usare placeholder in produzione.
Related task: WEB-005

---

Nessun altro problema noto al termine della Fase 0 (2026-07-18): non è ancora stato
scritto codice applicativo.
