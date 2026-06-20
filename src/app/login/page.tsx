"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Loader2, Eye, EyeOff } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const NICKNAME_MAP: Record<string, string> = {
  junas: "junas@admin.local",
};

export default function LoginPage() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = NICKNAME_MAP[nickname.trim().toLowerCase()];
    if (!email) {
      setError("Usuário ou senha incorretos. Tente novamente.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Usuário ou senha incorretos. Tente novamente.");
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
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Nickname */}
            <div>
              <label
                htmlFor="nickname"
                className="block text-sm font-medium text-neutral-700 mb-1"
              >
                Usuário
              </label>
              <input
                id="nickname"
                type="text"
                autoComplete="username"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="seu usuário"
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
              disabled={loading || !nickname || !password}
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
