import { NextResponse, type NextRequest } from "next/server";
import { ATLAS, COOKIE_OPCOES, SISTEMA } from "@/lib/atlas";
import { COOKIE_NUMERO, numeroDoPedido } from "@/lib/liberado-dona";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const ERRO = "/login?erro=" + encodeURIComponent("Não deu para entrar agora. Tente de novo.");

/** Entrada direta pela barra do painel do dono (23/11/2026): manda para o /liberar de lá, que devolve o liberado em
 *  /api/duas-etapas/volta. Antes, pergunta se o painel está no ar (2,5 s): fora do ar = tela de login daqui. */
export async function GET(request: NextRequest) {
  try {
    const r = await fetch(`${ATLAS}/api/saude`, { cache: "no-store", signal: AbortSignal.timeout(2500) });
    if (!r.ok) throw new Error(String(r.status));
  } catch {
    return NextResponse.redirect(new URL(ERRO, request.url));
  }
  // Com login: número calculado pela conta. Sem login: número sorteado (1 clique = 1 pedido).
  const { data: { user } } = await (await createClient()).auth.getUser();
  const sorteado = () => Buffer.from(crypto.getRandomValues(new Uint8Array(18))).toString("base64url");
  const numero = request.cookies.get(COOKIE_NUMERO)?.value || (user ? await numeroDoPedido(user.id) : sorteado());
  if (!numero) return NextResponse.redirect(new URL(ERRO, request.url));
  const resposta = NextResponse.redirect(`${ATLAS}/liberar?s=${SISTEMA}&n=${numero}`);
  resposta.cookies.set(COOKIE_NUMERO, numero, { ...COOKIE_OPCOES, maxAge: 600 });
  return resposta;
}
