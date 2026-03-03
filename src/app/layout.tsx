import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { MouseGraviton } from "./components/mouse-graviton";
import { AgeVerificationModal } from "@/components/ui/age-verification-modal";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "./components/navbar";
import { LoginModalWrapper } from "@/components/ui/login-modal-wrapper";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chex Seeds | Semillas de Cannabis Premium",
  description:
    "Genéticas de cannabis autoflorecientes de la más alta calidad. Semillas feminizadas con 98% de germinación garantizada. Envíos discretos a todo el país.",
  openGraph: {
    images: ["/logoseed.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased`}
      >
        <AuthProvider>
          <AgeVerificationModal />
          <Navbar />
          <LoginModalWrapper />
          <MouseGraviton />
          {children}
          <Analytics />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
