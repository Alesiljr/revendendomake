"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

interface HeaderClientProps {
  navLinks: NavLink[];
}

export function HeaderClient({ navLinks }: HeaderClientProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden p-2 text-neutral-600 hover:text-primary-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label="Abrir menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-neutral-900/50" />
          {/* Drawer */}
          <div
            className="absolute top-0 right-0 w-72 h-full bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <span className="font-playfair font-bold text-lg text-primary-700">
                Revendendo Make
              </span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-neutral-600 hover:text-primary-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Fechar menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block px-3 py-3 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center",
                    link.highlight
                      ? "bg-primary-700 text-white hover:bg-primary-800"
                      : "text-neutral-700 hover:bg-neutral-100 hover:text-primary-700"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
