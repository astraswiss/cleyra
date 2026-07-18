import Link from "next/link";

export default function DeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-zinc-200 px-6 py-4">
        <Link href="/de/endreinigung-oberwallis" className="font-semibold">
          Cleyra
        </Link>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-zinc-200 px-6 py-6 text-sm text-zinc-600">
        <nav className="flex flex-wrap gap-4">
          <Link href="/de/datenschutz">Datenschutz</Link>
          <Link href="/de/impressum">Impressum</Link>
          <Link href="/de/vermittlungsbedingungen">Vermittlungsbedingungen</Link>
          <Link href="/de/kontakt">Kontakt</Link>
        </nav>
      </footer>
    </>
  );
}
