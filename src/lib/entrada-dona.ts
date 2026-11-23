import { cookies, headers } from "next/headers";
import { COOKIE_OPCOES } from "@/lib/atlas";
import { COOKIE_LIBERADO, LONGO, cookieLiberado, sessaoDoToken, type Modo } from "@/lib/liberado-dona";
import { adminDb } from "@/lib/supabase/admin-db";
import { createClient } from "@/lib/supabase/server";

// Entrada da dona (23/11/2026). Só roda no servidor. Regras em lib/liberado-dona.ts.

/** IP e aparelho de quem está na tela (vão no pedido ao painel do dono, para a trava e o registro). */
export async function quemPede() {
  const h = await headers();
  return { ip: ((h.get("x-forwarded-for") ?? "").split(",")[0] ?? "").trim() || null, ua: h.get("user-agent") ?? null };
}

/** A dona daqui (role "owner" em admin_users). null = não deu para ler, ou não há exatamente uma. */
export async function donaDoPainel(): Promise<{ userId: string; email: string } | null> {
  const { data, error } = await adminDb().from("admin_users").select("user_id, email").eq("role", "owner");
  const linha = !error && data?.length === 1 ? data[0] : undefined;
  if (!linha) return null;
  const email = String(linha.email ?? "").trim().toLowerCase();
  return email && linha.user_id ? { userId: String(linha.user_id), email } : null;
}

/** Abre a sessão da dona aqui sem a senha deste sistema (o painel do dono já conferiu senha e código). */
export async function abrirSessaoDona(): Promise<{ userId: string; token: string } | null> {
  const dona = await donaDoPainel();
  if (!dona) return null;
  const { data: link } = await adminDb().auth.admin.generateLink({ type: "magiclink", email: dona.email });
  const hash = link?.properties?.hashed_token;
  if (!hash) return null;
  const { data, error } = await (await createClient()).auth.verifyOtp({ type: "magiclink", token_hash: hash });
  if (error || !data.user || data.user.id !== dona.userId || !data.session) return null;
  return { userId: data.user.id, token: data.session.access_token };
}

/** Grava o liberado desta sessão da dona (cookie assinado). false = não deu (sem LIBERAR_SEGREDO ou sem sessão). */
export async function liberarAqui(userId: string, token: string | undefined, m: Modo) {
  const sid = sessaoDoToken(token);
  if (!sid) return false;
  const valor = await cookieLiberado(userId, sid, m);
  if (!valor) return false;
  (await cookies()).set(COOKIE_LIBERADO, valor, { ...COOKIE_OPCOES, maxAge: LONGO });
  return true;
}
