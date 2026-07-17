import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site-config";

const mainLinks = [
  { label: "So funktioniert's", href: "/de/so-funktionierts" },
  { label: "Häufige Fragen", href: "/de/faq" },
  { label: "Über Cleyra", href: "/de/ueber-cleyra" },
  { label: "Kontakt", href: "/de/kontakt" },
];

const legalLinks = [
  { label: "Datenschutz", href: "/de/datenschutz" },
  { label: "Impressum", href: "/de/impressum" },
  { label: "Vermittlungsbedingungen", href: "/de/vermittlungsbedingungen" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-brand-900 text-brand-100">
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Cleyra
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-200">
              Kostenlose Vermittlung von Endreinigungen im Wallis.
            </p>
          </div>

          <nav aria-label="Footer Hauptlinks">
            <ul className="space-y-2.5 text-sm">
              {mainLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm">
            <nav aria-label="Footer rechtliche Links">
              <ul className="space-y-2.5">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {siteConfig.contactEmail ? (
              <p className="mt-4">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="hover:text-white"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            ) : null}
            {siteConfig.contactPhone ? (
              <p>
                <a
                  href={`tel:${siteConfig.contactPhone}`}
                  className="hover:text-white"
                >
                  {siteConfig.contactPhone}
                </a>
              </p>
            ) : null}
          </div>
        </div>

        <div className="border-t border-brand-700/60 py-6 text-xs text-brand-300">
          <p>{siteConfig.intermediaryDisclaimer}</p>
          <p className="mt-2">
            © {year} {siteConfig.name}
          </p>
        </div>
      </Container>
    </footer>
  );
}
