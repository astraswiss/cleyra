import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "@/components/layout/MobileMenu";

const navItems = [
  { label: "Leistungen", href: "/de#leistungen" },
  { label: "So funktioniert's", href: "/de/so-funktionierts" },
  { label: "Regionen", href: "/de#regionen" },
  { label: "Häufige Fragen", href: "/de/faq" },
];

export function Header() {
  return (
    <header className="border-b border-slate-200">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/de" className="text-lg font-semibold">
            Cleyra
          </Link>

          <nav
            aria-label="Hauptnavigation"
            className="hidden md:block"
          >
            <ul className="flex items-center gap-6 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-slate-600">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:block">
            <Button href="/de#anfrage">Kostenlose Anfrage</Button>
          </div>

          <MobileMenu />
        </div>
      </Container>
    </header>
  );
}
