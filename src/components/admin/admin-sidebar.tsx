"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Package, Users, Star, FileText,
  Settings, Sparkles, BarChart2, UserCog,
  Menu, X, ExternalLink, LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/admin/dashboard",     label: "Dashboard",      icon: BarChart2 },
  { href: "/admin/produtos",      label: "Produtos",       icon: Package },
  { href: "/admin/leads",         label: "CRM",            icon: Users },
  { href: "/admin/depoimentos",   label: "Depoimentos",    icon: Star },
  { href: "/admin/blog",          label: "Blog",           icon: FileText },
  { href: "/admin/usuarios",      label: "Usuários",       icon: UserCog },
  { href: "/admin/configuracoes", label: "Configurações",  icon: Settings },
];

function NavLinks({ onClose, demoMode }: { onClose?: () => void; demoMode: boolean }) {
  const pathname = usePathname();
  const router   = useRouter();

  async function handleLogout() {
    if (demoMode) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-neutral-100 space-y-1">
        <Link
          href="/"
          target="_blank"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-primary-700 hover:bg-primary-50 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Ver Site
        </Link>
        {!demoMode && (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        )}
      </div>
    </>
  );
}

function SidebarLogo() {
  return (
    <div className="p-5 border-b border-neutral-100 shrink-0">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary-700" />
        <span className="font-playfair font-bold text-primary-700">Admin Panel</span>
      </div>
      <p className="text-xs text-neutral-400 mt-1">Revendendo Make</p>
    </div>
  );
}

export function AdminSidebar({ demoMode }: { demoMode: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ── Mobile top bar ─────────────────────────────────────── */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-neutral-200 flex items-center gap-3 px-4 h-14">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary-700" />
          <span className="font-playfair font-bold text-primary-700 text-sm">Admin Panel</span>
        </div>
      </header>

      {/* ── Mobile drawer overlay ───────────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-neutral-900/50" />
          <div
            className="absolute top-0 left-0 h-full w-64 max-w-[calc(100vw-3rem)] bg-white shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary-700" />
                <span className="font-playfair font-bold text-primary-700">Admin Panel</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label="Fechar menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NavLinks onClose={() => setOpen(false)} demoMode={demoMode} />
          </div>
        </div>
      )}

      {/* ── Desktop sidebar ────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 min-h-screen bg-white border-r border-neutral-200 sticky top-0 self-start">
        <SidebarLogo />
        <NavLinks demoMode={demoMode} />
      </aside>
    </>
  );
}
