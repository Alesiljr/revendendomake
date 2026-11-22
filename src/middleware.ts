import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACESSO, COOKIE_OPCOES, PAGINA_TRAVADA, assinar, conferir, conferirAcesso, papelDe, travaLigada } from "@/lib/atlas";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "placeholder";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // In demo mode, allow access to admin without auth
  if (DEMO_MODE) {
    return NextResponse.next();
  }

  // Production: use Supabase session
  const { updateSession } = await import("@/lib/supabase/middleware");
  const { supabaseResponse, user } = await updateSession(request);

  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // Trava por conta (22/11/2026): no painel, quem não é a dona só passa com a conta liberada no painel do dono.
  // /api/atlas/ (pedido assinado) e /criar-acesso (link de criar senha) não pedem login: a credencial é a assinatura.
  const protegido = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (user && protegido && travaLigada()) {
    const d = await conferir<{ t: string; u: string; exp: number }>(request.cookies.get(COOKIE_ACESSO)?.value);
    const agora = Math.floor(Date.now() / 1000);
    if (!(d && d.t === "ac" && d.u === user.id && d.exp > agora)) {
      const papel = await papelDe(user.id);
      // Não deu para ler o painel: segue sem gravar nada (o requireAdmin e as regras do banco ainda conferem).
      if (papel === undefined) return supabaseResponse;
      let cookie: string | null;
      if (papel?.role === "owner") cookie = await assinar({ t: "ac", u: user.id, exp: agora + 600 });
      else {
        const r = await conferirAcesso(undefined, user.id, user.email ?? user.id);
        if (r.travada) {
          if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Acesso não liberado." }, { status: 403 });
          return NextResponse.redirect(new URL(PAGINA_TRAVADA, request.url));
        }
        cookie = r.cookie;
      }
      if (cookie) supabaseResponse.cookies.set(COOKIE_ACESSO, cookie, { ...COOKIE_OPCOES, maxAge: 600 });
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
