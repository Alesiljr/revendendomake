"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DepoimentoActions({ id, approved }: { id: string; approved: boolean }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any;
    await supabase.from("testimonials").update({ approved: !approved }).eq("id", id);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className="text-xs font-medium text-primary-700 hover:text-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "Salvando..." : approved ? "Remover aprovação" : "Aprovar"}
    </button>
  );
}
