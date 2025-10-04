import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MouseGraviton } from "./components/mouse-graviton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chex Seeds | Semillas de Cannabis Premium",
  description: "Genéticas de cannabis autoflorecientes de la más alta calidad. Semillas feminizadas con 98% de germinación garantizada. Envíos discretos a todo el país.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MouseGraviton />
        {children}
      </body>
    </html>
  );
}
