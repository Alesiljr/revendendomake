import { NextResponse, type NextRequest } from "next/server";
import { adminDb } from "@/lib/supabase/admin-db";
import { criarConta, emailsDaDona } from "@/lib/contas-atlas";
import { SISTEMA, conferir } from "@/lib/atlas";

export const dynamic = "force-dynamic";

// Contas pelo painel do dono (22/11/2026). Pedido assinado (LIBERAR_SEGREDO): { t: "contas", s: "revendendomake", iat
// (máx. 60 s), n (número do pedido), acao, … }. ler · criar · senha · apagar. Não há "acesso" para escolher: quem está
// liberado vê o painel inteiro. A conta da dona nunca muda por aqui. Apagar = sai do login e do painel.

type Pedido = { t?: unknown; s?: unknown; iat?: unknown; n?: unknown; acao?: unknown; email?: unknown; senha?: unknown; nome?: unknown; user_id?: unknown };

const erro = (texto: string, status = 400) => NextResponse.json({ erro: texto }, { status, headers: { "cache-control": "no-store" } });
const ok = (corpo: object = { ok: true }) => NextResponse.json(corpo, { headers: { "cache-control": "no-store" } });

export async function POST(request: NextRequest) {
  const corpo = (await request.json().catch(() => ({}))) as { t?: unknown };
  const d = await conferir<Pedido>(typeof corpo.t === "string" ? corpo.t : undefined);
  if (!d || d.t !== "contas" || d.s !== SISTEMA || typeof d.iat !== "number" || Math.abs(Date.now() / 1000 - d.iat) > 60
    || typeof d.n !== "string" || d.n.length < 16) return erro("pedido inválido");
  const donas = await emailsDaDona();
  if (!donas) return erro("não deu para ler o painel agora", 503);
  if (donas.size === 0) return erro("a dona não está configurada neste sistema", 503);
  const db = adminDb();

  if (d.acao === "ler") {
    // Leitura que falha vira erro (nunca lista vazia que parece verdade).
    const { data: painel, error: ep } = await db.from("admin_users").select("user_id, role, approved");
    if (ep) return erro("não deu para ler o painel agora", 503);
    const noPainel = new Map((painel ?? []).map((l) => [l.user_id as string, l as { role: string; approved: boolean }]));
    const contas: object[] = [];
    for (let page = 1; ; page++) {
      const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
      if (error) return erro("não deu para ler as contas agora", 503);
      for (const u of data.users) {
        if ((u as { deleted_at?: string | null }).deleted_at) continue;
        const p = noPainel.get(u.id);
        contas.push({
          id: u.id, email: u.email ?? "", nome: (u.user_metadata?.full_name as string | undefined) ?? null, criada: u.created_at ?? null,
          ultimo_login: u.last_sign_in_at ?? null, dono: p?.role === "owner",
          papel: p?.role === "owner" ? "dona" : p ? (p.approved ? "painel" : "fora do painel (travada)") : "fora do painel",
        });
      }
      if (data.users.length < 1000) break;
    }
    return ok({ contas });
  }

  if (d.acao === "criar") {
    const r = await criarConta(d.email, d.senha, d.nome);
    return r.erro ? erro(r.erro) : ok({ ok: true, id: r.id, email: r.email });
  }

  if (d.acao === "acesso") return erro("no Revendendo Make quem está liberado vê o painel inteiro: não há acesso para escolher");

  // As outras mexem numa conta que já existe, nunca na da dona.
  const id = typeof d.user_id === "string" ? d.user_id : "";
  if (!/^[0-9a-f-]{36}$/i.test(id)) return erro("conta inválida");
  const { data: u, error } = await db.auth.admin.getUserById(id);
  if (error || !u?.user) return erro("conta não encontrada");
  const { data: linha, error: el } = await db.from("admin_users").select("role").eq("user_id", id).maybeSingle();
  if (el) return erro("não deu para ler o painel agora", 503);
  if (linha?.role === "owner" || donas.has((u.user.email ?? "").toLowerCase())) return erro("a conta da dona não muda por aqui");

  if (d.acao === "senha") {
    if (typeof d.senha !== "string" || d.senha.length < 8 || d.senha.length > 200) return erro("a senha precisa de 8 caracteres ou mais");
    const { error: e } = await db.auth.admin.updateUserById(id, { password: d.senha });
    return e ? erro(e.message) : ok();
  }
  if (d.acao === "apagar") {
    // Primeiro sai do painel (as regras do banco olham admin_users), depois do login.
    const { error: e1 } = await db.from("admin_users").delete().eq("user_id", id).neq("role", "owner");
    if (e1) return erro("não deu para tirar do painel");
    const { error: e } = await db.auth.admin.deleteUser(id, true);
    return e ? erro(e.message) : ok();
  }
  return erro("ação desconhecida");
}
