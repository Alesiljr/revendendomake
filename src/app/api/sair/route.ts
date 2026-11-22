import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { COOKIE_ACESSO } from "@/lib/atlas";

// Sair (usado pela página de acesso não liberado): encerra a sessão e volta para o login.
export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  const r = NextResponse.redirect(new URL("/login", request.url), 303);
  r.cookies.delete(COOKIE_ACESSO);
  return r;
}
