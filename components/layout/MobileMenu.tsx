"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "Leistungen", href: "/de#leistungen" },
  { label: "So funktioniert's", href: "/de/so-funktionierts" },
  { label: "Regionen", href: "/de#regionen" },
  { label: "Häufige Fragen", href: "/de/faq" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={menuId}
        aria-label={isOpen ? "Menü schliessen" : "Menü öffnen"}
        onClick={() => setIsOpen((open) => !open)}
        className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
      >
        <span aria-hidden="true">{isOpen ? "✕" : "☰"}</span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          className="fixed inset-0 top-[64px] z-40 bg-white px-4 py-6"
        >
          <nav aria-label="Hauptnavigation mobil">
            <ul className="flex flex-col gap-4 text-lg">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setIsOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8">
            <Button href="/de#anfrage" className="w-full">
              Kostenlose Anfrage
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
