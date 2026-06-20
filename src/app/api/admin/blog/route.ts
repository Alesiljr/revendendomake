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

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await db()
    .from("posts")
    .select("id, title, slug, category, status, published_at, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Erro ao buscar posts." }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { title, slug, content, excerpt, cover_image, author, category, status } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "title e slug obrigatórios." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("posts")
    .insert({
      title: String(title).slice(0, 200),
      slug: String(slug).slice(0, 200),
      content: content || null,
      excerpt: excerpt ? String(excerpt).slice(0, 500) : null,
      cover_image: cover_image ? String(cover_image).slice(0, 500) : null,
      author: author ? String(author).slice(0, 100) : "Revendendo Make",
      category: category ? String(category).slice(0, 100) : null,
      status: status === "published" ? "published" : "draft",
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Erro ao criar post." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
