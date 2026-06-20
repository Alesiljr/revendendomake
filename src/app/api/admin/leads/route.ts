import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function db(): any {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const VALID_STATUSES = ["novo", "contactado", "convertido", "descartado"];

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await db()
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
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "id e status obrigatórios." }, { status: 400 });
  }

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json(
      { error: `Status inválido. Valores aceitos: ${VALID_STATUSES.join(", ")}.` },
      { status: 400 }
    );
  }

  const { error } = await db()
    .from("leads")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Erro ao atualizar lead." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
