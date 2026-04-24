import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, state, source, lgpd_consent } = body;

    if (!name || !phone || !lgpd_consent) {
      return NextResponse.json(
        { error: "Campos obrigatórios: name, phone, lgpd_consent." },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("leads") as any).insert({
      name: String(name).trim(),
      phone: String(phone).trim(),
      city: city ? String(city).trim() : null,
      state: state ? String(state).trim() : null,
      source: source ? String(source).trim() : "website",
      lgpd_consent: Boolean(lgpd_consent),
      status: "novo",
    });

    if (error) {
      console.error("Supabase insert lead error:", error);
      return NextResponse.json({ error: "Erro ao salvar lead." }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("Lead route error:", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
