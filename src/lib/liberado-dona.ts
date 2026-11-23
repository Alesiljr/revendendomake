import { ATLAS, SISTEMA, assinar, conferir } from "@/lib/atlas";

// Entrada da dona com duas senhas (23/11/2026, pedido do dono). Só vale para a dona do painel (role "owner" em
// admin_users); editoras e contas criadas pelo painel do dono entram como antes. Na tela de login, com o e-mail da dona
// (o daqui ou EMAIL_DONO_PAINEL):
//   senha deste sistema       → entra só aqui, sem código (modo "s"), até Sair;
//   senha do painel do dono   → a tela pede o código do app; certo = tudo liberado (modo "a"), até "Desconectar" lá.
// A dona só usa o /admin com o cookie "liberado" (assinado com LIBERAR_SEGREDO, preso à conta e à sessão do Supabase).
// Emergência: ENTRADA_DONO=desligada na Vercel + publicar (a dona volta a entrar como antes, sem o liberado).
// Web Crypto (sem node:crypto) porque o middleware também usa.

export type Modo = "s" | "a";
export type Liberado = { t: "dona"; u: string; sid: string; iat: number; exp: number; chk: number; m: Modo };

export const COOKIE_LIBERADO = "rm_dona";
export const COOKIE_PEDIDO = "rm_dona_p"; // pedido do código (5 min)
export const COOKIE_NUMERO = "rm_dona_n"; // número da ida pela barra do painel do dono (10 min)
export const LONGO = 400 * 86400; // prazo técnico: os dois modos valem até alguém encerrar
const CONFERIR = 600; // no modo "a", a cada 10 min pergunta se ele clicou "Desconectar"

export const donaLigada = () => process.env.ENTRADA_DONO !== "desligada";
/** E-mail do dono no painel dele (não é o e-mail da dona daqui). Vazio = só a senha deste sistema funciona. */
export const emailDonoPainel = () => (process.env.EMAIL_DONO_PAINEL ?? "").trim().toLowerCase();

const deB64 = (t: string) => Uint8Array.from(atob(t.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((t.length + 3) % 4)), (c) => c.charCodeAt(0));

/** Número da sessão do Supabase (session_id), de dentro do token de acesso. Só usar com token que o Supabase acabou de
 *  conferir (getUser): aqui a assinatura do token não é conferida de novo. */
export function sessaoDoToken(token: string | null | undefined): string | null {
  try {
    const dados = JSON.parse(new TextDecoder().decode(deB64((token ?? "").split(".")[1] ?? ""))) as { session_id?: unknown };
    return typeof dados.session_id === "string" && /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(dados.session_id) ? dados.session_id.toLowerCase() : null;
  } catch { return null; }
}

export async function cookieLiberado(userId: string, sessao: string, m: Modo, agora = Math.floor(Date.now() / 1000)) {
  return assinar({ t: "dona", u: userId, sid: sessao, iat: agora, exp: agora + LONGO, chk: agora, m } satisfies Liberado);
}

export async function lerLiberado(valor: string | undefined, userId: string, sessao: string | null) {
  const d = await conferir<Liberado>(valor);
  const ok = d && d.t === "dona" && d.u === userId && !!sessao && d.sid === sessao && (d.m === "s" || d.m === "a")
    && typeof d.iat === "number" && typeof d.chk === "number" && d.exp > Date.now() / 1000 && d.exp - d.iat <= LONGO;
  return ok ? d : null;
}

/** Só o modo "a" pergunta se ele clicou "Desconectar" no painel dele; o "s" vale até Sair. */
export const precisaConferir = (d: Liberado) => d.m === "a" && Date.now() / 1000 - d.chk > CONFERIR;

/** O liberado do modo "a" ainda vale? true/false; null = o painel do dono não respondeu (segue valendo). */
export async function perguntarPainel(iat: number): Promise<boolean | null> {
  const t = await assinar({ t: "pergunta", s: SISTEMA, iat });
  if (!t) return null;
  try {
    const r = await fetch(`${ATLAS}/api/liberado-vale?s=${SISTEMA}&t=${encodeURIComponent(t)}`, { cache: "no-store", signal: AbortSignal.timeout(1500) });
    if (!r.ok) return null;
    return ((await r.json()) as { vale?: unknown }).vale === true;
  } catch { return null; }
}

export type RespostaEntrada = { ok?: boolean; pedido?: string; entrada?: string; travado?: number; vencido?: boolean };

/** Pergunta ao painel do dono pela entrada feita AQUI (senha de lá + código). null = não respondeu. */
export async function pedirEntrada(dados: Record<string, unknown>): Promise<RespostaEntrada | null> {
  const t = await assinar({ ...dados, s: SISTEMA, iat: Math.floor(Date.now() / 1000) });
  if (!t) return null;
  try {
    const r = await fetch(`${ATLAS}/api/entrar-de-sistema`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ s: SISTEMA, t }), cache: "no-store", signal: AbortSignal.timeout(10000),
    });
    return r.ok ? ((await r.json()) as RespostaEntrada) : null;
  } catch { return null; }
}

/** Número do pedido ao painel do dono pela barra: calculado (conta + janela de 5 min, com a chave), igual para pedidos
 *  simultâneos (no Guarda-Roupa, sorteado, o navegador às vezes ficava com outro). */
export async function numeroDoPedido(userId: string, agora = Date.now()) {
  const t = await assinar({ t: "numero", u: userId, j: Math.floor(agora / 300_000) });
  return t?.split(".")[1]?.slice(0, 32) || null;
}
