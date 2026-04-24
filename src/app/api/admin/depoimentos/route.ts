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
  const { reseller_name, city, result_text, rating, approved } = body;

  if (!reseller_name || !result_text) {
    return NextResponse.json({ error: "reseller_name e result_text obrigatórios." }, { status: 400 });
  }

  const { data, error } = await db()
    .from("testimonials")
    .insert({
      reseller_name,
      city: city || null,
      result_text,
      rating: Number(rating) || 5,
      approved: Boolean(approved),
      display_order: 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
