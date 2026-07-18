import { adminDb } from "@/lib/supabase/admin-db";

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

const VALID_STATUSES = ["novo", "contatado", "convertido", "descartado"];

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await adminDb()
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Erro ao buscar leads." }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { id, status, notes } = body;

  if (!id) {
    return NextResponse.json({ error: "id obrigatório." }, { status: 400 });
  }

  if (status !== undefined && !VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `Status inválido. Valores aceitos: ${VALID_STATUSES.join(", ")}.` },
      { status: 400 }
    );
  }

  const updates: Record<string, string | null> = { updated_at: new Date().toISOString() };
  if (status !== undefined) updates.status = status;
  if (notes !== undefined) updates.notes = notes === "" ? null : String(notes).slice(0, 2000);

  const { error } = await adminDb()
    .from("leads")
    .update(updates)
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Erro ao atualizar lead." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
