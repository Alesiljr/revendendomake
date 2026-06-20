"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AdminSidebarFooterProps {
  demoMode: boolean;
}

export function AdminSidebarFooter({ demoMode }: AdminSidebarFooterProps) {
  const router = useRouter();

  async function handleLogout() {
    if (demoMode) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="p-4 border-t border-neutral-100 space-y-1">
      <Link
        href="/"
        target="_blank"
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
  );
}
