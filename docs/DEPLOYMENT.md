# Deployment

Mai salvare segreti in questo file o altrove nel repository: solo nomi, scopi e
procedure.

## Ambienti

| Ambiente | Scopo | Stato |
|---|---|---|
| Locale | Sviluppo | da configurare in WEB-001 |
| Produzione | Sito pubblico | da configurare in WEB-021 |

Nessun ambiente di staging previsto nel MVP, salvo necessità emersa durante
l'implementazione (da registrare come decisione se introdotto).

## Variabili

Elenco (nomi, non valori) da mantenere sincronizzato con `docs/ARCHITECTURE.md`:

| Variabile | Scopo | Obbligatoria in produzione |
|---|---|---|
| `DATABASE_URL` | Connessione PostgreSQL | sì |
| (e-mail provider, da definire in WEB-013) | Invio e-mail transazionali | sì |
| (analytics ID, da definire in WEB-016) | Tracciamento eventi | no (facoltativa) |

## Dominio

Da definire. Nessun dominio ancora registrato/configurato al termine della Fase 0.

## DNS

Da definire insieme al dominio.

## Build

Comando previsto: `npm run build` (Next.js). Da verificare/aggiornare quando WEB-001 è
completato.

## Migrazioni

Da eseguire con Prisma (`prisma migrate deploy` in produzione) una volta introdotto lo
schema in WEB-010. Nessuna migrazione esiste ancora.

## Smoke test

Da definire in dettaglio in WEB-021. Come minimo dovrà verificare:

- landing principale raggiungibile e renderizzata correttamente;
- form completabile end-to-end in produzione con un lead di test;
- e-mail interna e di conferma ricevute;
- `/de/danke` raggiungibile e `noindex`.

## Rollback

Da documentare in dettaglio in WEB-021, in base alla piattaforma di hosting scelta.
Principio generale: mantenere la possibilità di tornare al deploy precedente senza
perdita di lead già salvati (i lead vivono nel database, non nel deploy applicativo).

## Backup

Da documentare in WEB-021: backup del database PostgreSQL (frequenza e procedura di
restore) prima del lancio in produzione.

## Controlli post-deploy

- Smoke test eseguito e verde.
- Variabili ambiente verificate.
- Certificato HTTPS attivo.
- Sitemap/robots verificati in produzione.
