import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revendendo Make — Ganhe Dinheiro Revendendo Maquiagem",
  description:
    "Seja revendedora de maquiagem e ganhe renda extra em casa. Produtos de qualidade, suporte completo e as melhores margens do mercado.",
  keywords:
    "revendedora maquiagem, ganhar dinheiro em casa, revenda cosméticos",
  openGraph: {
    title: "Revendendo Make",
    description: "Ganhe dinheiro revendendo maquiagem de qualidade",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
