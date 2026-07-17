Last updated: 2026-07-17 23:45 Europe/Zurich
Current phase: Fase 1 completata (fondazioni), pronta per Fase 2/3
Overall status: in_progress
Current branch: claude/new-session-huwuyt
Last verified commit: 7d6a6b1 (Fase 0 + scaffold iniziale) — questa sessione aggiunge un nuovo commit sopra, vedi `git log` per l'hash esatto dopo il push

## Cosa è già funzionante

- File di continuità (Fase 0) e scaffold Next.js 14 + TypeScript strict +
  Tailwind (invariato rispetto al checkpoint precedente).
- Tutte le 14 rotte `/de/*` previste dalla spec sezione 5 esistono e
  rispondono `200` (verificato con `curl` manuale), più `/` (`307` →
  `/de`) e `/api/leads` (stub, `501` su POST, non un 404/500 silenzioso).
- `/de/danke` ha correttamente `noindex, nofollow` (verificato nell'HTML
  renderizzato).
- Header (logo, nav desktop, CTA "Kostenlose Anfrage") e Footer (link
  principali, link legali, contatti, dichiarazione di intermediazione,
  copyright dinamico) implementati e montati in `app/de/layout.tsx` per
  tutte le pagine tedesche.
- Menu mobile accessibile: toggle con `aria-expanded`/`aria-controls`,
  chiusura con Escape o selezione link, blocco scroll del body mentre
  aperto.
- Skip link "Zum Hauptinhalt springen" presente nel layout `/de`.
- Modello dati `LocationLanding` (`lib/locations.ts`) con dati reali
  (CAP, comuni vicini) per Visp, Brig-Glis, Naters; le tre landing usano
  questi dati invece di duplicare testo hardcoded.
- `npm run build` (build + typecheck + lint) e `npm run lint` passano
  senza errori/warning con tutte le nuove rotte.

## Cosa è parzialmente funzionante

- Homepage `/de`: solo hero, sezioni 8.2–8.9 mancanti (HOME-001).
- Landing locali (Visp/Brig/Naters): solo hero + intro + comuni vicini,
  non la struttura completa a 10 sezioni con FAQ locale (LOCAL-002/003/004).
- Pagine informative (`so-funktionierts`, `faq`, `ueber-cleyra`, `kontakt`):
  solo H1/placeholder minimo, copy completo mancante (INFO-001).
- Pagine legali: placeholder corretti (`TODO LEGAL REVIEW`), struttura
  layout minima — da arricchire quando arriva il testo approvato.
- Pagina `/de/danke`: copy statico presente, ma non ancora collegata a un
  leadId reale né protetta dalla duplicazione dell'evento `lead_submitted`
  (dipende da API-006, non ancora implementato).

## Cosa non è ancora iniziato

- Modulo lead multi-step (Fase 3: schema Zod, 4 step, upload foto, stato
  sessione).
- Backend reale: database, storage foto, provider e-mail, antispam
  (Fase 4). L'endpoint `/api/leads` è solo uno stub che rifiuta con 501.
  Nessun dato viene salvato ancora.
- SEO tecnico oltre ai metadata di base: sitemap.xml, robots.txt, JSON-LD
  (Fase 5).
- Analytics/GTM, dataLayer, persistenza attribution, consent management
  (Fase 5).
- Test automatici (unit/component/integration/e2e) — zero test scritti
  finora (Fase 6).
- `components/marketing/*`, `components/lead-form/*`, `components/seo/*`
  non ancora creati.

## Attività attualmente in corso

Nessuna: checkpoint di fine sessione. In attesa di indicazione su quale
attività proseguire (Fase 2 contenuti marketing, Fase 3 modulo lead, o
altro).

## Blocchi e decisioni richieste

- Provider database, e-mail transazionale e storage foto non ancora
  scelti (`docs/DECISIONS.md` DEC-20260717-02) — bloccante per Fase 4.
- Testi legali definitivi non ancora forniti — bloccante per la
  pubblicazione in produzione (DEC-20260717-03).
- Contatti reali (e-mail, telefono, orari, indirizzo) non ancora forniti
  — necessari per `/de/kontakt` e footer (attualmente vuoti perché
  `NEXT_PUBLIC_CONTACT_EMAIL`/`NEXT_PUBLIC_CONTACT_PHONE` non sono
  impostati).
- I "comuni vicini" per Naters in `lib/locations.ts` (Blatten bei Naters,
  Birgisch, Mund) sono una stima geografica plausibile, **non confermata**
  come zona realmente servita — da verificare con il proprietario prima
  di pubblicare la landing Naters (la spec impone di elencare solo
  località "realmente servite").

## Test attualmente verdi

- `npm run build` (compila, typecheck e lint durante la build, genera
  18 route incl. `/api/leads`)
- `npm run lint`
- Verifica manuale `curl` su tutte le 14 rotte `/de/*` (200), `/` (307),
  `/api/leads` POST (501), `/de/danke` (meta robots `noindex, nofollow`
  confermato nell'HTML), title univoco confermato su `/de/faq`

## Test falliti o non eseguiti

- Nessun test automatico ancora scritto. Non verificato: navigazione da
  tastiera end-to-end del menu mobile, contrasto colori, screen reader.

## Debito tecnico noto

- Vulnerabilità npm audit residue di severità alta in dipendenze dev
  (`eslint-config-next` → `glob`/`minimatch`), non runtime.
- Nessun test automatico.
- Nav header voci "Leistungen" e "Regionen" puntano ad ancore
  (`/de#leistungen`, `/de#regionen`) che non esistono ancora come sezioni
  reali nella homepage (verranno create in HOME-001).

## Placeholder ancora presenti

- Tutte le pagine marketing/informative oltre l'hero.
- Le tre pagine legali (`TODO LEGAL REVIEW`).
- CTA "Kostenlose Anfrage" punta a `/de#anfrage`, un'ancora vuota nella
  homepage — il modulo vero verrà collegato in Fase 3 (FORM-002).

## Dati o credenziali ancora necessari dal proprietario

- Scelta provider database, e-mail transazionale, storage foto.
- Contatti reali (e-mail, telefono, orari, indirizzo).
- Testi legali approvati.
- Conferma delle località realmente servite attorno a Naters.
- ID Google Tag Manager (Fase 5).

## Prossime attività consigliate (max 5)

1. FORM-001 — Schema dati lead condiviso (`lib/lead-schema.ts`, Zod) con
   unit test (CAP, date future, rooms 1–20, approxSqm 10–2000)
2. HOME-001 — Completare le sezioni homepage 8.2–8.9 e collegare le
   ancore `#leistungen`/`#regionen`/`#anfrage` a contenuto reale
3. FORM-002..007 — Modulo lead multi-step (stato, 4 step, upload, errori)
4. API-001 — Implementare davvero `/api/leads` (validazione server-side,
   honeypot, rate limit) anche prima di collegare un database reale
5. Chiedere al proprietario i dati mancanti elencati sopra (provider,
   contatti, testi legali, conferma zone Naters)
