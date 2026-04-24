import Link from "next/link";
import { Sparkles, Instagram, Youtube } from "lucide-react";
import { HeaderClient } from "@/components/layout/HeaderClient";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/seja-revendedora", label: "Seja Revendedora", highlight: true },
  { href: "/depoimentos", label: "Depoimentos" },
  { href: "/blog", label: "Blog" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-700" />
            <span className="font-playfair font-bold text-xl text-primary-700">
              Revendendo Make
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  link.highlight
                    ? "bg-primary-700 text-white px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors text-sm font-semibold"
                    : "text-neutral-600 hover:text-primary-700 transition-colors text-sm font-medium"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Social + mobile trigger */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-primary-700 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 hover:text-primary-700 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <HeaderClient navLinks={navLinks} />
          </div>
        </div>
      </div>
    </header>
  );
}
