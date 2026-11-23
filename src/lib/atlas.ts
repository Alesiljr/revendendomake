// Contas pelo painel do dono (22/11/2026, pedido dele: "só eu crio conta, com total controle"). O painel do dono manda
// pedidos assinados com LIBERAR_SEGREDO (a mesma chave fica lá como LIBERAR_REVENDENDOMAKE): criar, trocar senha e
// apagar conta (/api/atlas/contas), e o link para a pessoa criar a própria senha (/criar-acesso).
// Trava por conta: quem não é a dona (role "owner" em admin_users) só usa o /admin com a conta LIBERADA lá. A resposta
// fica num cookie assinado por 10 min; painel do dono fora do ar = deixa entrar (ninguém fica trancado por isso).
// A trava também acerta admin_users.approved, que é o que as regras do banco olham (migração 008).
// Emergência: TRAVA_CONTAS=desligada na Vercel + publicar.
// Web Crypto (sem node:crypto) porque o middleware também usa.

export const SISTEMA = "revendendomake";
export const ATLAS = process.env.ATLAS_URL || "https://atlas-five-pearl.vercel.app";
export const COOKIE_ACESSO = "rm_ac";
export const PAGINA_TRAVADA = "/acesso-travado";
const LIBERADA = 600; // segundos até perguntar de novo
const FORA = 120; // painel não respondeu: tenta de novo em 2 min

export const travaLigada = () => process.env.TRAVA_CONTAS !== "desligada";
export const COOKIE_OPCOES = { httpOnly: true, secure: true, sameSite: "lax" as const, path: "/" };

const paraB64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const deB64 = (t: string) => Uint8Array.from(atob(t.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((t.length + 3) % 4)), (c) => c.charCodeAt(0));
const texto = (t: string) => new TextEncoder().encode(t);

async function chave() {
  const segredo = process.env.LIBERAR_SEGREDO;
  if (!segredo) return null;
  return crypto.subtle.importKey("raw", texto(segredo), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function assinar(dados: object) {
  const k = await chave();
  if (!k) return null;
  const corpo = paraB64(texto(JSON.stringify(dados)));
  return `${corpo}.${paraB64(new Uint8Array(await crypto.subtle.sign("HMAC", k, texto(corpo))))}`;
}

/** Confere a assinatura (mesma conta do painel do dono) e devolve os dados, ou null. */
export async function conferir<T>(token: string | undefined): Promise<T | null> {
  const k = await chave();
  if (!k || !token) return null;
  const [corpo, ass] = token.split(".");
  if (!corpo || !ass) return null;
  try {
    if (!(await crypto.subtle.verify("HMAC", k, deB64(ass), texto(corpo)))) return null;
    return JSON.parse(new TextDecoder().decode(deB64(corpo))) as T;
  } catch { return null; }
}

/** admin_users pela chave de serviço (REST puro: o middleware também usa). */
const rest = (caminho: string, init: RequestInit = {}) => {
  const k = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  return fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/${caminho}`, {
    ...init, cache: "no-store",
    headers: { apikey: k, Authorization: `Bearer ${k}`, "content-type": "application/json", ...(init.headers ?? {}) },
  });
};

/** Papel no painel: "owner" | "editor" | null (fora do painel). undefined = não deu para ler agora. */
export async function papelDe(userId: string): Promise<{ role: string; approved: boolean } | null | undefined> {
  try {
    const r = await rest(`admin_users?user_id=eq.${encodeURIComponent(userId)}&select=role,approved`);
    if (!r.ok) return undefined;
    const [linha] = (await r.json()) as { role: string; approved: boolean }[];
    return linha ?? null;
  } catch { return undefined; }
}

/** Acerta o painel pela trava: liberada = entra no painel (editora); travada = sai. Nunca mexe na dona. */
async function acertarPainel(userId: string, email: string, liberada: boolean) {
  try {
    if (liberada) {
      await rest("admin_users?on_conflict=user_id", {
        method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
        body: JSON.stringify({ user_id: userId, email, role: "editor", approved: true }),
      });
    } else {
      await rest(`admin_users?user_id=eq.${encodeURIComponent(userId)}&role=neq.owner`, {
        method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ approved: false }),
      });
    }
  } catch { /* na próxima conferência tenta de novo */ }
}

/** Pergunta ao painel do dono. true/false; null = não respondeu. */
async function perguntar(conta: string): Promise<boolean | null> {
  const t = await assinar({ t: "acesso", s: SISTEMA, c: conta, iat: Math.floor(Date.now() / 1000) });
  if (!t) return null;
  try {
    const r = await fetch(`${ATLAS}/api/acesso?s=${SISTEMA}&t=${encodeURIComponent(t)}`, { cache: "no-store", signal: AbortSignal.timeout(2000) });
    if (!r.ok) return null;
    const j = (await r.json()) as { liberada?: unknown };
    return typeof j.liberada === "boolean" ? j.liberada : null;
  } catch { return null; }
}

// p (23/11/2026): "o" = dona, "e" = editora. O middleware só aceita o cookie com p (diz se pede o liberado da dona).
export type Ac = { t: "ac"; u: string; exp: number; p?: "o" | "e" };

/**
 * Confere a conta (não chamar para a dona). `travada` = mandar para a página de acesso não liberado.
 * `cookie` = valor novo para gravar em COOKIE_ACESSO (ou null para não mexer).
 */
export async function conferirAcesso(valorCookie: string | undefined, userId: string, email: string) {
  const agora = Math.floor(Date.now() / 1000);
  const d = await conferir<Ac>(valorCookie);
  if (d && d.t === "ac" && d.u === userId && d.exp > agora) return { travada: false, cookie: null };
  const ok = await perguntar(email.toLowerCase().trim());
  if (ok !== null) await acertarPainel(userId, email.toLowerCase().trim(), ok);
  if (ok === false) return { travada: true, cookie: null };
  return { travada: false, cookie: await assinar({ t: "ac", u: userId, exp: agora + (ok ? LIBERADA : FORA), p: "e" }) };
}
