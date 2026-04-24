import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Login | Revendendo Make Admin",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
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
          <p className="text-neutral-600 text-sm mt-1">
            Acesso restrito a administradores.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-neutral-100 p-8">
          <div className="bg-primary-50 border border-primary-200 rounded-xl p-4 text-center text-sm text-primary-800">
            <strong>Login em breve</strong>
            <br />
            A autenticação com Supabase Auth será implementada na Story 4.1.
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/admin/dashboard"
              className="text-sm text-primary-700 hover:text-primary-800 underline"
            >
              Acessar painel (modo demo)
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
