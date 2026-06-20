import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "placeholder";

export async function requireAdmin(): Promise<{ authorized: true } | NextResponse> {
  if (DEMO_MODE) return { authorized: true };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  return { authorized: true };
}
