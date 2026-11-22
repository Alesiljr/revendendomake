"use server";

import { redirect } from "next/navigation";
import { conviteDoLink, criarConta, perguntarConvite } from "@/lib/contas-atlas";
import { createClient } from "@/lib/supabase/server";

// Link de criar senha (22/11/2026): confere o link, marca usado (uma vez só), cria a conta e já entra no painel.
// Se a conta não sair, o link volta a valer. Erros voltam para a página por código (ver ERROS em page.tsx).

const voltar = (c: string, erro: string): never => redirect(`/criar-acesso?c=${encodeURIComponent(c)}&erro=${erro}`);

export async function criarAcesso(f: FormData) {
  const token = String(f.get("c") ?? "");
  const senha = String(f.get("senha") ?? "");
  if (senha.length < 8) voltar(token, "senha");
  if (senha !== String(f.get("confirma") ?? "")) voltar(token, "igual");
  const id = await conviteDoLink(token);
  if (!id) return voltar(token, "link");
  const r = await perguntarConvite(id, "usar");
  if (!r.valido || !r.email) return voltar(token, r.erro === "fora do ar" ? "fora" : "link");
  const conta = await criarConta(r.email, senha, r.nome ?? null);
  if (conta.erro || !conta.email) {
    await perguntarConvite(id, "desfazer");
    return voltar(token, conta.erro === "já existe conta com esse login" ? "existe" : "falhou");
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email: conta.email, password: senha });
  redirect(error ? "/login" : "/admin/dashboard");
}
