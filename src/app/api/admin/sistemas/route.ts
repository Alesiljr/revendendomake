import { NextResponse, type NextRequest } from "next/server";
import { papelDe } from "@/lib/atlas";
import { COOKIE_LIBERADO, donaLigada, lerLiberado, sessaoDoToken } from "@/lib/liberado-dona";
import { ATUAL, DIRETO, PAINEL_DONO, SISTEMAS } from "@/lib/sistemas";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const nada = () => NextResponse.json({ sistemas: [] }, { headers: { "cache-control": "no-store" } });

/** Menu "Sistemas" do painel (23/11/2026): só para a dona. Modo "s" (entrou com a senha daqui) = os outros sistemas com
 *  o endereço normal deles e sem o painel do dono; modo "a" (senha do painel do dono + código, ou a barra de lá) = com
 *  o painel do dono e com entrada direta nos sistemas que aceitam. Confere tudo aqui (não confia em cabeçalho). */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return nada();
  const papel = await papelDe(user.id);
  if (papel?.role !== "owner") return nada();
  let modo: "s" | "a" = "s";
  if (donaLigada()) {
    // O getUser acima acabou de conferir este token no Supabase.
    const sid = sessaoDoToken((await supabase.auth.getSession()).data.session?.access_token);
    const l = await lerLiberado(request.cookies.get(COOKIE_LIBERADO)?.value, user.id, sid);
    if (!l) return nada();
    modo = l.m;
  }
  const sistemas = SISTEMAS
    .filter((s) => modo === "a" || s.nome !== PAINEL_DONO)
    .map((s) => ({
      nome: s.nome,
      logo: s.logo,
      atual: s.nome === ATUAL,
      url: s.nome === ATUAL || modo !== "a" || !DIRETO.has(s.nome) ? s.url : `${new URL(s.url).origin}/api/duas-etapas/ir`,
    }));
  return NextResponse.json({ sistemas }, { headers: { "cache-control": "no-store" } });
}
