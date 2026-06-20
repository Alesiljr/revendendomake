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
  const { data, error } = await db().from("posts").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: "Post não encontrado." }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const body = await request.json();

  // Allowlist to prevent mass assignment
  const allowed = {
    title: body.title ? String(body.title).slice(0, 200) : undefined,
    slug: body.slug ? String(body.slug).slice(0, 200) : undefined,
    content: body.content ?? undefined,
    excerpt: body.excerpt ? String(body.excerpt).slice(0, 500) : undefined,
    cover_image: body.cover_image ? String(body.cover_image).slice(0, 500) : undefined,
    author: body.author ? String(body.author).slice(0, 100) : undefined,
    category: body.category ? String(body.category).slice(0, 100) : undefined,
    status: body.status === "published" ? "published" : body.status === "draft" ? "draft" : undefined,
    published_at: body.status === "published" ? (body.published_at ?? new Date().toISOString()) : body.published_at,
    updated_at: new Date().toISOString(),
  };

  const patch = Object.fromEntries(
    Object.entries(allowed).filter(([, v]) => v !== undefined)
  );

  const { error } = await db().from("posts").update(patch).eq("id", id);
  if (error) return NextResponse.json({ error: "Erro ao atualizar post." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { id } = await params;
  const { error } = await db().from("posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Erro ao deletar post." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
