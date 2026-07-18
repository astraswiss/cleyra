# Project Charter — Cleyra Website MVP

## Scopo del progetto

Costruire il primo sito Cleyra, in tedesco, per raccogliere richieste (lead) di
`Endreinigung im Oberwallis` e inoltrarle a un partner esecutivo regionale, senza
costruire un marketplace o un software complesso.

Domanda da validare con il pilot:

> Cleyra riesce a generare richieste valide e profittevoli per Mirdita nel mercato
> dell'Oberwallis?

## Cliente target

- Privati che lasciano un appartamento in affitto nell'Oberwallis e devono organizzare
  la `Endreinigung zur Wohnungsabgabe` (pulizia di fine locazione) richiesta dal
  proprietario/agenzia.
- Persone in fase di trasloco che necessitano di `Umzugsreinigung`.

## Mercato

- Lingua: tedesco (unica lingua del MVP).
- Regione: Oberwallis (Vallese superiore, Svizzera).
- Focus geografico iniziale: Visp, Brig-Glis, Naters e dintorni realmente serviti dal
  partner operativo.
- Nessuna pagina dedicata per singola città nel MVP.

## Proposta di valore

Per il cliente:

- una richiesta breve (60–90 secondi), gratuita e non vincolante;
- nessun impegno prima di ricevere un'offerta;
- un solo partner regionale selezionato per la richiesta, senza dover cercare e
  confrontare autonomamente fornitori.

Per Mirdita (partner operativo):

- richieste di pulizia già filtrate per zona, servizio e tempistica;
- contatto diretto con il cliente per definire l'offerta.

## KPI del pilot

- Numero di richieste (lead) valide ricevute per settimana.
- Tasso di conversione `form_view → lead_submit_success`.
- Percentuale di lead che Mirdita considera profittevoli/qualificati (`qualified` vs
  `unqualified` nello stato del lead).
- Percentuale di lead che generano un'offerta (`quote_sent`) e un lavoro vinto (`won`).
- Costo per lead qualificato (una volta attive le campagne Google Ads).

Questi KPI si misurano manualmente in questa fase: il MVP non include una dashboard.

## Confini MVP

Dentro lo scope: vedi `CLEYRA_WEBSITE_SPEC.md` sezione 1 (landing in tedesco, form in due
passaggi, salvataggio lead, notifiche e-mail, analytics essenziali, SEO base).

Fuori scope (elenco completo in `CLEYRA_WEBSITE_SPEC.md` sezione 1): login/registrazione,
area clienti, area partner, dashboard, marketplace, vendita automatica dei lead,
pagamenti, preventivo automatico, calendario disponibilità, app mobile, recensioni,
profili pubblici dei partner, chatbot, portale amministrativo complesso, versione
francese, campagne pubblicitarie nel codice, CRM completo.

## Stakeholder

- **Owner / decisore prodotto**: utente che coordina il progetto (contatto:
  fatbardh_berisha@icloud.com).
- **Partner operativo pilot**: Mirdita — riceve i lead, contatta i clienti, prepara le
  offerte, esegue le pulizie.
- **Claude Code**: agente di sviluppo che implementa e mantiene il sito seguendo questa
  memoria di progetto.

## Vincoli

- Nessuna informazione critica di stato deve esistere solo in chat: tutto va scritto nei
  file `.md` del repository.
- Un solo task `in_progress` alla volta nel backlog.
- Nessun cambio di stack tecnico senza una decisione registrata in `DECISIONS.md`.
- Mobile-first, validazione server autorevole, niente segreti nel browser.
- Niente overengineering: niente microservizi, niente librerie pesanti senza motivo.

## Posizionamento legale

Cleyra è un intermediario, non l'impresa esecutrice. Testo obbligatorio da mostrare sul
sito (vedi `CONTENT.md`):

```text
Cleyra ist ein Vermittlungsservice. Cleyra führt keine Reinigungsarbeiten aus. Der
Vertrag über die Reinigung entsteht direkt zwischen dem Kunden und dem ausführenden
Partnerunternehmen.
```

Implicazioni:

- nessuna promessa di prezzo, tempi o garanzie contrattuali sul sito Cleyra;
- il contratto di pulizia nasce tra cliente e partner esecutore, non con Cleyra;
- nessuna recensione, certificazione o numero inventato.
