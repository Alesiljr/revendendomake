import Link from "next/link";
import { Sparkles, Instagram, Youtube } from "lucide-react";

const footerLinks = [
  { href: "/seja-revendedora", label: "Seja Revendedora" },
  { href: "/produtos", label: "Produtos" },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/politica-privacidade", label: "Política de Privacidade" },
];

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary-400" />
              <span className="font-playfair font-bold text-white text-lg">
                Revendendo Make
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Cosméticos e maquiagem de qualidade para revendedoras. Transformando
              mulheres em empreendedoras de sucesso.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-inter font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-2 text-sm">
              {footerLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-primary-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-inter font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Redes Sociais
            </h4>
            <div className="flex gap-3 mb-6">
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-neutral-800 rounded-lg hover:bg-primary-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-neutral-500">
              © {new Date().getFullYear()} Revendendo Make. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
