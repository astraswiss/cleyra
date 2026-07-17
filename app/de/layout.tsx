import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Zum Hauptinhalt springen
      </a>
      <Header />
      <div id="main-content">{children}</div>
      <Footer />
    </>
  );
}
