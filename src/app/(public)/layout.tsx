import Link from "next/link";
import Script from "next/script";
import { Sparkles } from "lucide-react";
import { AnalyticsTracker } from "@/components/public/analytics-tracker";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnalyticsTracker />

      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-config" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}</Script>
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}</Script>
      )}

      {/* DR Minimal Header — logo + single CTA, sem menu */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <Sparkles className="w-4 h-4 text-primary-700" />
            <span className="font-playfair font-bold text-primary-700 text-sm md:text-lg whitespace-nowrap">
              Revendendo Make
            </span>
          </Link>
          <a
            href="#oferta"
            data-track="cta-header-quero-comecar"
            className="inline-flex items-center gap-1 bg-primary hover:bg-primary-800 text-white text-xs md:text-sm font-bold px-3 py-2 md:px-5 md:py-2.5 rounded-lg transition-all duration-200 hover:scale-105 shadow whitespace-nowrap"
          >
            Começar Agora
          </a>
        </div>
      </header>

      <main>{children}</main>

      {/* DR Minimal Footer */}
      <footer className="bg-neutral-900 text-neutral-400 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="font-playfair font-bold text-white text-base">
              Revendendo Make
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Revendendo Make. Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link href="/politica-privacidade" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
