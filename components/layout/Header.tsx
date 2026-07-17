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
    <header className="sticky top-0 z-30 border-b border-ink-100 bg-[#FBFAF8]/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/de"
            className="font-display text-xl font-bold tracking-tight text-brand-800"
          >
            Cleyra
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm font-medium text-ink-700">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-brand-700">
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
