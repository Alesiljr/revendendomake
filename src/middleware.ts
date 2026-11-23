import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_ACESSO, COOKIE_OPCOES, PAGINA_TRAVADA, assinar, conferir, conferirAcesso, papelDe, travaLigada, type Ac } from "@/lib/atlas";
import { COOKIE_LIBERADO, LONGO, donaLigada, lerLiberado, perguntarPainel, precisaConferir, sessaoDoToken } from "@/lib/liberado-dona";

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
  const { user, supabase, resposta } = await updateSession(request);

  if (pathname.startsWith("/admin") && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Trava por conta (22/11/2026): no painel, quem não é a dona só passa com a conta liberada no painel do dono.
  // /api/atlas/ (pedido assinado) e /criar-acesso (link de criar senha) não pedem login: a credencial é a assinatura.
  // 23/11/2026: o cookie da trava (10 min) diz também se a conta é a dona (p "o") ou editora (p "e").
  const protegido = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const naLogin = pathname === "/login";
  const agora = Math.floor(Date.now() / 1000);
  let dona: boolean | undefined;
  let acesso: string | null = null;
  if (user && (protegido || naLogin) && (travaLigada() || donaLigada())) {
    const d = await conferir<Ac>(request.cookies.get(COOKIE_ACESSO)?.value);
    if (d && d.t === "ac" && d.u === user.id && d.exp > agora && (d.p === "o" || d.p === "e")) dona = d.p === "o";
    else {
      const papel = await papelDe(user.id);
      // Não deu para ler o painel: segue sem gravar nada (o requireAdmin e as regras do banco ainda conferem).
      if (papel !== undefined) {
        dona = papel?.role === "owner";
        if (dona) acesso = await assinar({ t: "ac", u: user.id, exp: agora + 600, p: "o" });
        else if (protegido && travaLigada()) {
          const r = await conferirAcesso(undefined, user.id, user.email ?? user.id);
          if (r.travada) {
            if (pathname.startsWith("/api/")) return NextResponse.json({ error: "Acesso não liberado." }, { status: 403 });
            return NextResponse.redirect(new URL(PAGINA_TRAVADA, request.url));
          }
          acesso = r.cookie;
        }
      }
    }
  }

  // Entrada da dona (23/11/2026, lib/liberado-dona.ts): a dona só usa o painel com o liberado desta sessão, ganho na tela
  // de login daqui (senha daqui = modo "s"; senha do painel do dono + código = modo "a") ou pela barra do painel do dono.
  // No modo "a", a cada 10 min pergunta se ele clicou "Desconectar" lá (fora do ar = segue valendo).
  let falta = false, apagar = false, renovar: string | null = null;
  if (user && dona && donaLigada()) {
    // O getUser do updateSession acabou de conferir este token no Supabase.
    const sid = sessaoDoToken((await supabase.auth.getSession()).data.session?.access_token);
    const l = await lerLiberado(request.cookies.get(COOKIE_LIBERADO)?.value, user.id, sid);
    if (!l) falta = true;
    else if (precisaConferir(l)) {
      const vale = await perguntarPainel(l.iat);
      if (vale === false) { falta = true; apagar = true; }
      else if (vale) renovar = await assinar({ ...l, chk: agora });
    }
  }

  const final = (r: NextResponse) => {
    const atual = resposta();
    if (r !== atual) atual.cookies.getAll().forEach((c) => r.cookies.set(c)); // sessão renovada do Supabase
    if (acesso) r.cookies.set(COOKIE_ACESSO, acesso, { ...COOKIE_OPCOES, maxAge: 600 });
    if (renovar) r.cookies.set(COOKIE_LIBERADO, renovar, { ...COOKIE_OPCOES, maxAge: LONGO });
    if (apagar) r.cookies.delete(COOKIE_LIBERADO);
    return r;
  };

  if (naLogin && user) {
    // Dona sem liberado na tela de login = sessão velha: sai dela aqui mesmo (o pedido segue sem login), para o
    // "Entrar" desta tela funcionar.
    if (falta) {
      await supabase.auth.signOut({ scope: "local" });
      return final(resposta());
    }
    if (request.method === "GET") return final(NextResponse.redirect(new URL("/admin/dashboard", request.url)));
  }

  // Dona sem liberado no painel: volta para a tela de login daqui (nunca para o painel do dono).
  if (falta && protegido) {
    if (pathname.startsWith("/api/")) return final(NextResponse.json({ error: "Entre de novo." }, { status: 403 }));
    return final(NextResponse.redirect(new URL("/login", request.url)));
  }

  return final(resposta());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
