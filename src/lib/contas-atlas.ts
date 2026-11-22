import { adminDb } from "@/lib/supabase/admin-db";
import { ATLAS, SISTEMA, assinar, conferir } from "@/lib/atlas";

// Contas pelo painel do dono (22/11/2026). Conta nova só nasce por aqui: o painel manda um pedido assinado para
// /api/atlas/contas, ou a pessoa abre o link de criar senha (/criar-acesso). Conta nova entra no /admin como editora,
// aprovada (a trava do painel do dono é quem diz se ela entra). A conta da dona (role "owner") nunca muda por aqui.

export function emailValido(entrada: unknown): string | null {
  const e = typeof entrada === "string" ? entrada.trim().toLowerCase() : "";
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e) && e.length <= 200 ? e : null;
}

/** E-mails da dona (role owner). Leitura que falha = null (aí ninguém é criado nem mudado). */
export async function emailsDaDona(): Promise<Set<string> | null> {
  const { data, error } = await adminDb().from("admin_users").select("user_id, email").eq("role", "owner");
  if (error) return null;
  return new Set((data ?? []).map((l) => String(l.email ?? "").toLowerCase()));
}

/** Cria a conta já confirmada e já no painel (editora). Nunca a da dona. */
export async function criarConta(entrada: unknown, senha: unknown, nome: unknown): Promise<{ id?: string; email?: string; erro?: string }> {
  const email = emailValido(entrada);
  if (!email) return { erro: "e-mail inválido" };
  const donas = await emailsDaDona();
  if (!donas) return { erro: "não deu para conferir a conta da dona agora" };
  if (donas.has(email)) return { erro: "essa é a conta da dona" };
  if (typeof senha !== "string" || senha.length < 8 || senha.length > 200) return { erro: "a senha precisa de 8 caracteres ou mais" };
  const nomeLimpo = typeof nome === "string" ? nome.trim().slice(0, 80) : "";
  const db = adminDb();
  const { data, error } = await db.auth.admin.createUser({
    email, password: senha, email_confirm: true, user_metadata: nomeLimpo ? { full_name: nomeLimpo } : {},
  });
  if (error || !data.user) return { erro: /already|registered|exists/i.test(error?.message ?? "") ? "já existe conta com esse login" : (error?.message ?? "não deu para criar") };
  const { error: e2 } = await db.from("admin_users").upsert({ user_id: data.user.id, email, role: "editor", approved: true }, { onConflict: "user_id" });
  if (e2) {
    await db.auth.admin.deleteUser(data.user.id); // sem a linha do painel a conta não serviria: desfaz
    return { erro: "não deu para pôr a conta no painel" };
  }
  return { id: data.user.id, email };
}

/** Link de criar senha (assinado pelo painel do dono com a chave deste sistema): id do convite, ou null se não vale. */
export async function conviteDoLink(token: string | undefined | null): Promise<string | null> {
  const d = await conferir<{ t?: unknown; s?: unknown; c?: unknown; exp?: unknown }>(token ?? undefined);
  if (!d || d.t !== "convite" || d.s !== SISTEMA || typeof d.c !== "string" || !d.c || typeof d.exp !== "number" || d.exp < Date.now() / 1000) return null;
  return d.c;
}

export type RespostaConvite = { valido?: boolean; motivo?: string; email?: string; nome?: string | null; erro?: string };

/** Pergunta ao painel do dono sobre o link. erro "fora do ar" = não respondeu. */
export async function perguntarConvite(c: string, acao: "ver" | "usar" | "desfazer"): Promise<RespostaConvite> {
  const t = await assinar({ t: "convite-pedido", s: SISTEMA, c, acao, iat: Math.floor(Date.now() / 1000) });
  if (!t) return { erro: "sem chave" };
  try {
    const r = await fetch(`${ATLAS}/api/convite`, {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ s: SISTEMA, t }), cache: "no-store", signal: AbortSignal.timeout(8000),
    });
    const j = (await r.json().catch(() => ({}))) as RespostaConvite;
    return r.ok ? j : { ...j, valido: false, erro: j.erro ?? j.motivo ?? `resposta ${r.status}` };
  } catch { return { erro: "fora do ar" }; }
}
