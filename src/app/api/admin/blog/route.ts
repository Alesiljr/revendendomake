import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function db(): any { // eslint-disable-line @typescript-eslint/no-explicit-any
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const { data, error } = await db()
    .from("posts")
    .select("id, title, slug, category, status, published_at, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, slug, content, excerpt, cover_image, author, category, status } = body;

  if (!title || !slug) {
    return NextResponse.json({ error: "title e slug obrigatórios." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("posts")
    .insert({
      title,
      slug,
      content: content || null,
      excerpt: excerpt || null,
      cover_image: cover_image || null,
      author: author || "Revendendo Make",
      category: category || null,
      status: status || "draft",
      published_at: status === "published" ? new Date().toISOString() : null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
