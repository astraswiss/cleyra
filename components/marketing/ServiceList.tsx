import { Icon } from "@/components/ui/Icon";

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
    <section id="leistungen" className="py-14">
      <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900">
        Reinigung zur Wohnungsabgabe
      </h2>
      <p className="mt-4 text-lg text-ink-600">
        Über Cleyra können Sie eine Anfrage für folgende Arbeiten stellen:
      </p>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <li
            key={service}
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 shadow-soft"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <Icon name="check" className="h-3.5 w-3.5" />
            </span>
            <span className="text-ink-700">{service}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-ink-500">
        Der genaue Leistungsumfang wird in der Offerte des ausführenden
        Reinigungspartners festgehalten.
      </p>
    </section>
  );
}
