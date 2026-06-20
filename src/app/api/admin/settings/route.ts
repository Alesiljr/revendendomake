import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/supabase/require-admin";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function db(): any {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  ) as unknown as ReturnType<typeof createClient>;
}

export async function GET() {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const { data, error } = await db()
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) return NextResponse.json({ error: "Erro ao buscar configurações." }, { status: 500 });
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();

  // Allowlist to prevent mass assignment
  const allowed = {
    whatsapp_number: body.whatsapp_number ? String(body.whatsapp_number).slice(0, 20) : undefined,
    instagram_url: body.instagram_url !== undefined ? (body.instagram_url ? String(body.instagram_url).slice(0, 300) : null) : undefined,
    tiktok_url: body.tiktok_url !== undefined ? (body.tiktok_url ? String(body.tiktok_url).slice(0, 300) : null) : undefined,
    youtube_url: body.youtube_url !== undefined ? (body.youtube_url ? String(body.youtube_url).slice(0, 300) : null) : undefined,
    hero_headline: body.hero_headline ? String(body.hero_headline).slice(0, 200) : undefined,
    updated_at: new Date().toISOString(),
  };

  const patch = Object.fromEntries(
    Object.entries(allowed).filter(([, v]) => v !== undefined)
  );

  const { error } = await db().from("site_settings").update(patch).eq("id", 1);
  if (error) return NextResponse.json({ error: "Erro ao salvar configurações." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
