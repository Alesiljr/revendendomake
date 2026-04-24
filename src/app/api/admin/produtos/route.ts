import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

function db(): any { // eslint-disable-line @typescript-eslint/no-explicit-any
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, description, images, cost_price, suggested_price, category_id, stock, active, featured } = body;

  if (!name || suggested_price === undefined) {
    return NextResponse.json({ error: "name e suggested_price obrigatórios." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("products")
    .insert({
      name,
      description: description || null,
      images: images || [],
      cost_price: Number(cost_price) || 0,
      suggested_price: Number(suggested_price),
      category_id: category_id || null,
      stock: Number(stock) || 0,
      active: Boolean(active),
      featured: Boolean(featured),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
