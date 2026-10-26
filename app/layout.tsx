import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buddy — Ton partenaire d'entraînement, pas ton âme sœur.",
  description:
    "Prototype de fonctionnalité communautaire de matching partenaire d'entraînement.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- App Router (pas pages/_document.js) : la règle ne s'applique pas ici. next/font/google ne peut pas être utilisé car ce sandbox de build n'a pas accès à fonts.googleapis.com ; le navigateur du visiteur final, lui, y accède normalement. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}