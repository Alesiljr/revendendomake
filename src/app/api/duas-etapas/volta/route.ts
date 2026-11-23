import { NextResponse, type NextRequest } from "next/server";
import { SISTEMA, conferir } from "@/lib/atlas";
import { abrirSessaoDona, donaDoPainel, liberarAqui } from "@/lib/entrada-dona";
import { COOKIE_NUMERO } from "@/lib/liberado-dona";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

/** Volta do painel do dono com o liberado {s, n, exp} (23/11/2026): confere assinatura, sistema, validade e o número
 *  deste navegador. Lá já conferiram senha e código: abre a sessão da dona aqui (se preciso) no modo "a". */
export async function GET(request: NextRequest) {
  const erro = () => {
    const r = NextResponse.redirect(new URL("/login?erro=" + encodeURIComponent("Não deu para entrar agora. Tente de novo."), request.url));
    r.cookies.delete(COOKIE_NUMERO);
    return r;
  };
  const d = await conferir<{ s?: unknown; n?: unknown; exp?: unknown }>(request.nextUrl.searchParams.get("t") ?? "");
  const numero = request.cookies.get(COOKIE_NUMERO)?.value;
  if (!d || d.s !== SISTEMA || typeof d.exp !== "number" || d.exp < Date.now() / 1000 || !numero || d.n !== numero) return erro();

  const dona = await donaDoPainel();
  if (!dona) return erro();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let entrada: { userId: string; token: string } | null;
  if (user && user.id === dona.userId) {
    // O getUser acima acabou de conferir este mesmo token no Supabase.
    const token = (await supabase.auth.getSession()).data.session?.access_token;
    entrada = token ? { userId: user.id, token } : null;
  } else {
    entrada = await abrirSessaoDona();
  }
  if (!entrada || !(await liberarAqui(entrada.userId, entrada.token, "a"))) return erro();
  const resposta = NextResponse.redirect(new URL("/admin/dashboard", request.url));
  resposta.cookies.delete(COOKIE_NUMERO);
  return resposta;
}
