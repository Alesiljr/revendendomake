import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { adminDb } from "@/lib/supabase/admin-db";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "placeholder";

export async function requireAdmin(): Promise<{ authorized: true } | NextResponse> {
  if (DEMO_MODE) return { authorized: true };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  // Verifica se o usuário está na tabela admin_users
  const { data: adminUser } = await adminDb()
    .from("admin_users")
    .select("approved, role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (adminUser) {
    // Proprietário sempre tem acesso; demais precisam de aprovação
    if (adminUser.role === "owner" || adminUser.approved) return { authorized: true };
    return NextResponse.json(
      { error: "Acesso pendente de aprovação pelo administrador." },
      { status: 403 }
    );
  }

  // Fora da tabela = fora do painel. (Até 22/11/2026, com a tabela vazia a 1ª conta logada virava dona sozinha: saiu.
  // Conta nova só nasce pelo painel do dono, e quem entra no painel é decidido lá.)
  return NextResponse.json({ error: "Acesso não autorizado." }, { status: 403 });
}
