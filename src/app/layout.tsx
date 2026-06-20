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
  title: {
    default: "Revendendo Make | Lucre R$ 1.500 a R$ 3.000/mês Revendendo Maquiagem",
    template: "%s | Revendendo Make",
  },
  description:
    "Mais de 500 mulheres já estão lucrando de R$ 1.500 a R$ 3.000 por mês revendendo maquiagem de qualidade pelo celular. Sem estoque, sem experiência, cadastro gratuito. Comece hoje!",
  keywords: [
    "revendedora de maquiagem",
    "revenda make",
    "ganhar dinheiro com maquiagem",
    "renda extra mulher",
    "como revender cosméticos",
    "trabalhar em casa venda maquiagem",
    "renda extra sem sair de casa",
  ],
  authors: [{ name: "Revendendo Make" }],
  creator: "Revendendo Make",
  metadataBase: new URL("https://revendendomake.com.br"),
  openGraph: {
    title: "Revendendo Make | R$ 1.500 a R$ 3.000/mês Revendendo Maquiagem",
    description:
      "500+ mulheres lucrando de casa. Sem estoque, sem experiência, 100% pelo celular. Cadastro gratuito.",
    type: "website",
    locale: "pt_BR",
    siteName: "Revendendo Make",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revendendo Make | Lucre Revendendo Maquiagem de Casa",
    description: "500+ mulheres lucrando de R$ 1.500 a R$ 3.000/mês. Cadastro gratuito.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "x9qrvbb4gt");
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
