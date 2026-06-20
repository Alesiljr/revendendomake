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

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  const body = await request.json();
  const { reseller_name, city, result_text, rating, approved } = body;

  if (!reseller_name || !result_text) {
    return NextResponse.json({ error: "reseller_name e result_text obrigatórios." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("testimonials")
    .insert({
      reseller_name: String(reseller_name).slice(0, 100),
      city: city ? String(city).slice(0, 100) : null,
      result_text: String(result_text).slice(0, 1000),
      rating: Math.min(5, Math.max(1, Number(rating) || 5)),
      approved: Boolean(approved),
      display_order: 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Erro ao criar depoimento." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
