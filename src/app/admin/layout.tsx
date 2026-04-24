import Link from "next/link";
import { DemoBanner } from "@/components/admin/demo-banner";
import {
  LayoutDashboard,
  Package,
  Users,
  Star,
  FileText,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produtos", label: "Produtos", icon: Package },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/depoimentos", label: "Depoimentos", icon: Star },
  { href: "/admin/blog", label: "Blog", icon: FileText },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <DemoBanner />
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-[calc(100vh-36px)] bg-white border-r border-neutral-200 flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary-700" />
              <span className="font-playfair font-bold text-primary-700">
                Admin Panel
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">Revendendo Make</p>
          </div>
          {/* Nav */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 hover:bg-primary-50 hover:text-primary-700 transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          {/* Footer */}
          <div className="p-4 border-t border-neutral-100">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-primary-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Ver Site
            </Link>
          </div>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
