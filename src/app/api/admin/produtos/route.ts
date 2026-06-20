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
  const { name, description, images, cost_price, suggested_price, category_id, stock, active, featured } = body;

  if (!name || suggested_price === undefined) {
    return NextResponse.json({ error: "name e suggested_price obrigatórios." }, { status: 400 });
  }

  const suggestedNum = Number(suggested_price);
  if (isNaN(suggestedNum) || suggestedNum < 0) {
    return NextResponse.json({ error: "suggested_price inválido." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("products")
    .insert({
      name: String(name).slice(0, 200),
      description: description ? String(description).slice(0, 2000) : null,
      images: Array.isArray(images) ? images.slice(0, 10) : [],
      cost_price: Math.max(0, Number(cost_price) || 0),
      suggested_price: suggestedNum,
      category_id: category_id || null,
      stock: Math.max(0, Number(stock) || 0),
      active: Boolean(active),
      featured: Boolean(featured),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Erro ao criar produto." }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
