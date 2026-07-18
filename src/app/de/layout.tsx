import Link from "next/link";

export default function DeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="border-b border-zinc-200 px-6 py-4">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/de/endreinigung-oberwallis"
            className="text-lg font-semibold text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Cleyra
          </Link>
        </div>
      </header>
      <div className="flex-1">{children}</div>
      <footer className="border-t border-zinc-200 bg-zinc-50 px-6 py-8 text-sm text-zinc-600">
        <div className="mx-auto max-w-3xl">
          <p>
            Cleyra ist ein Vermittlungsservice. Cleyra führt keine
            Reinigungsarbeiten aus. Der Vertrag über die Reinigung entsteht direkt
            zwischen dem Kunden und dem ausführenden Partnerunternehmen.
          </p>
          <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            <Link
              href="/de/datenschutz"
              className="hover:text-brand hover:underline"
            >
              Datenschutz
            </Link>
            <Link
              href="/de/impressum"
              className="hover:text-brand hover:underline"
            >
              Impressum
            </Link>
            <Link
              href="/de/vermittlungsbedingungen"
              className="hover:text-brand hover:underline"
            >
              Vermittlungsbedingungen
            </Link>
            <Link href="/de/kontakt" className="hover:text-brand hover:underline">
              Kontakt
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
