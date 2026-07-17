import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cleyra",
  description: "Cleyra vermittelt Endreinigungen im Wallis.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-CH">
      <body>{children}</body>
    </html>
  );
}
