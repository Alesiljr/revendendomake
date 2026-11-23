"use server";

import { cookies } from "next/headers";
import { COOKIE_OPCOES } from "@/lib/atlas";
import { abrirSessaoDona, donaDoPainel, liberarAqui, quemPede } from "@/lib/entrada-dona";
import { COOKIE_PEDIDO, donaLigada, emailDonoPainel, pedirEntrada } from "@/lib/liberado-dona";
import { createClient } from "@/lib/supabase/server";

// Entrada da dona (23/11/2026, pedido do dono). Com a senha DESTE sistema entra só aqui, sem código; com a senha do painel
// do dono, a tela pede o código do app e libera tudo. A senha do painel é conferida primeiro: com ela nunca se entra sem
// o código (mesmo se as duas senhas forem iguais). Quem não é a dona recebe "navegador" e entra como sempre (login no
// navegador + trava de contas). A tela não fala o nome do painel do dono.

export type Resposta = { navegador?: true; codigo?: true; ir?: string; erro?: string };

const ERRO = "E-mail ou senha incorretos.";
const DE_NOVO = "Não deu para entrar agora. Tente de novo.";
const travado = (min: number) => `Muitas tentativas erradas. Tente de novo em ${min} min.`;

export async function entrar(emailDigitado: string, senha: string): Promise<Resposta> {
  const email = String(emailDigitado ?? "").trim().toLowerCase();
  const password = String(senha ?? "");
  if (!email || !password || !donaLigada()) return { navegador: true };
  const painel = emailDonoPainel();
  const dona = await donaDoPainel();
  if (!dona || (email !== dona.email && (!painel || email !== painel))) return { navegador: true };

  const de = await quemPede();
  // 1º a senha do painel do dono (vai sempre com o e-mail do dono lá).
  if (painel) {
    const r = await pedirEntrada({ t: "senha-atlas", email: painel, senha: password, ...de });
    if (r?.travado) return { erro: travado(r.travado) };
    if (r?.ok && r.pedido) {
      (await cookies()).set(COOKIE_PEDIDO, r.pedido, { ...COOKIE_OPCOES, maxAge: 300 });
      return { codigo: true };
    }
  }
  // 2º a senha deste sistema, na conta da dona daqui.
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email: dona.email, password });
  if (error || !data.user || data.user.id !== dona.userId) {
    if (!error) await supabase.auth.signOut({ scope: "local" });
    if (painel) await pedirEntrada({ t: "falhou", email: painel, ...de }); // conta na trava contra adivinhação
    return { erro: ERRO };
  }
  if (!(await liberarAqui(data.user.id, data.session?.access_token, "s"))) {
    await supabase.auth.signOut({ scope: "local" });
    return { erro: DE_NOVO };
  }
  return { ir: "/admin/dashboard" };
}

/** Segunda etapa da senha do painel do dono: o código do app. Certo = tudo liberado (aqui e lá). */
export async function confirmarCodigo(codigo: string): Promise<Resposta> {
  const loja = await cookies();
  const pedido = loja.get(COOKIE_PEDIDO)?.value;
  if (!pedido) return { erro: "O tempo acabou. Entre de novo." };
  const r = await pedirEntrada({ t: "codigo", pedido, codigo: String(codigo ?? ""), ...(await quemPede()) });
  if (r?.travado) { loja.delete(COOKIE_PEDIDO); return { erro: travado(r.travado) }; }
  if (!r || r.vencido) { loja.delete(COOKIE_PEDIDO); return { erro: r ? "O tempo acabou. Entre de novo." : "Não deu para conferir agora. Tente de novo." }; }
  if (!r.ok || !r.entrada) return { codigo: true, erro: "Código errado ou vencido. Use o número que está no app agora." };
  let entrada: URL;
  try { entrada = new URL(r.entrada); } catch { return { erro: DE_NOVO }; }
  if (entrada.protocol !== "https:") return { erro: DE_NOVO };
  const dona = await abrirSessaoDona();
  if (!dona || !(await liberarAqui(dona.userId, dona.token, "a"))) return { erro: DE_NOVO };
  loja.delete(COOKIE_PEDIDO);
  return { ir: entrada.toString() };
}

/** Desistir na tela do código. */
export async function cancelarCodigo(): Promise<void> {
  (await cookies()).delete(COOKIE_PEDIDO);
}
