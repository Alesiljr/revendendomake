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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const { data, error } = await db().from("products").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();

  // Allowlist to prevent mass assignment
  const allowed = {
    name: body.name ? String(body.name).slice(0, 200) : undefined,
    description: body.description !== undefined ? (body.description ? String(body.description).slice(0, 2000) : null) : undefined,
    images: body.images !== undefined ? (Array.isArray(body.images) ? body.images.slice(0, 10) : []) : undefined,
    cost_price: body.cost_price !== undefined ? Math.max(0, Number(body.cost_price) || 0) : undefined,
    suggested_price: body.suggested_price !== undefined ? Math.max(0, Number(body.suggested_price) || 0) : undefined,
    category_id: body.category_id !== undefined ? (body.category_id || null) : undefined,
    stock: body.stock !== undefined ? Math.max(0, Number(body.stock) || 0) : undefined,
    active: body.active !== undefined ? Boolean(body.active) : undefined,
    featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    updated_at: new Date().toISOString(),
  };

  const patch = Object.fromEntries(
    Object.entries(allowed).filter(([, v]) => v !== undefined)
  );

  const { error } = await db().from("products").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: "Erro ao atualizar produto." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const { error } = await db().from("products").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Erro ao deletar produto." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
