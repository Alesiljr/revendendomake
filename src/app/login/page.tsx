"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cancelarCodigo, confirmarCodigo, entrar } from "./actions";

// Entrada da dona (23/11/2026): o servidor confere primeiro (actions.ts). Para quem não é a dona ele responde
// "navegador" e o login segue no navegador, como sempre. Com a senha do painel do dono, a tela pede o "Código do app"
// (a tela não diz de onde é a senha).
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [pedeCodigo, setPedeCodigo] = useState(false);
  const [codigo, setCodigo] = useState("");

  // Aviso vindo de um redirecionamento (?erro=…). Lido aqui para não exigir Suspense do useSearchParams.
  useEffect(() => {
    const aviso = new URLSearchParams(window.location.search).get("erro");
    if (aviso) setError(aviso.slice(0, 200));
  }, []);

  async function handleCodigo(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const r = await confirmarCodigo(codigo);
      if (r.ir) { window.location.assign(r.ir); return; }
      if (!r.codigo) { setPedeCodigo(false); setPassword(""); }
      setCodigo("");
      setError(r.erro ?? "Não deu para entrar agora. Tente de novo.");
    } catch {
      setError("Não deu para entrar agora. Tente de novo.");
    }
    setLoading(false);
  }

  async function voltar() {
    await cancelarCodigo().catch(() => null);
    setPedeCodigo(false);
    setCodigo("");
    setPassword("");
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    let r: Awaited<ReturnType<typeof entrar>>;
    try {
      r = await entrar(email, password);
    } catch {
      setError("Não deu para entrar agora. Tente de novo.");
      setLoading(false);
      return;
    }
    if (r.ir) { window.location.assign(r.ir); return; }
    if (r.codigo) { setPedeCodigo(true); setLoading(false); return; }
    if (!r.navegador) {
      setError(r.erro ?? "Não deu para entrar agora. Tente de novo.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (authError) {
      setError("E-mail ou senha incorretos."); // igual à resposta da dona: a tela não entrega qual e-mail é o dela
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-7 h-7 text-primary-700" />
            <span className="font-playfair font-bold text-2xl text-primary-700">
              Revendendo Make
            </span>
          </Link>
          <h1 className="font-playfair font-bold text-2xl text-neutral-900">
            Área Administrativa
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            Acesso restrito a administradores.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-2xl shadow-md border border-neutral-100 p-8">
          {pedeCodigo ? (
          <form onSubmit={handleCodigo} noValidate className="space-y-5">
            <div>
              <label htmlFor="codigo" className="block text-sm font-medium text-neutral-700 mb-1">
                Código do app
              </label>
              <input
                id="codigo"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={7}
                required
                autoFocus
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="000000"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px] tracking-widest"
              />
              <p className="text-xs text-neutral-500 mt-1">Digite os 6 números que aparecem no app agora.</p>
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || codigo.replace(/\D/g, "").length !== 6}
              className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 min-h-[48px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Conferindo...
                </>
              ) : (
                "Entrar"
              )}
            </button>
            <button
              type="button"
              onClick={voltar}
              disabled={loading}
              className="w-full text-sm text-neutral-500 hover:text-primary-700 transition-colors"
            >
              Voltar
            </button>
          </form>
          ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                E-mail
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px]"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:border-transparent transition-shadow min-h-[48px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p role="alert" className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full flex items-center justify-center gap-2 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 min-h-[48px]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
          )}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-6">
          <Link href="/" className="hover:text-primary-700 transition-colors">
            ← Voltar ao site
          </Link>
        </p>
      </div>
    </div>
  );
}
