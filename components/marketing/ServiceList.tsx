const services = [
  "Reinigung von Wohnräumen",
  "Küche und Küchengeräten",
  "Badezimmer und sanitären Anlagen",
  "Fenster und Fensterrahmen",
  "Balkon oder Terrasse",
  "Kellerabteil",
  "Umzugsreinigung",
  "Reinigung einer leeren oder möblierten Wohnung",
];

export function ServiceList() {
  return (
    <section id="leistungen" className="py-12">
      <h2 className="text-3xl font-semibold">Reinigung zur Wohnungsabgabe</h2>
      <p className="mt-4 text-lg">
        Über Cleyra können Sie eine Anfrage für folgende Arbeiten stellen:
      </p>
      <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {services.map((service) => (
          <li key={service} className="flex items-start gap-2">
            <span aria-hidden="true">•</span>
            {service}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-slate-600">
        Der genaue Leistungsumfang wird in der Offerte des ausführenden
        Reinigungspartners festgehalten.
      </p>
    </section>
  );
}
