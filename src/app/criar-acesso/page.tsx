import { conviteDoLink, perguntarConvite } from "@/lib/contas-atlas";
import { criarAcesso } from "./actions";

export const dynamic = "force-dynamic";

// Link de criar senha (22/11/2026): conta nova no painel só nasce por aqui ou pelo painel do dono. Sem login (livre no
// middleware); a credencial é o link assinado, conferido de novo ao criar. O erro vem por código (nunca texto solto).
const ERROS: Record<string, string> = {
  senha: "A senha precisa de 8 caracteres ou mais.",
  igual: "As duas senhas não são iguais.",
  existe: "Já existe uma conta com esse e-mail. Entre pela tela de login.",
  falhou: "Não deu para criar a conta agora. Tente de novo.",
  fora: "Não deu para conferir o link agora. Tente de novo em alguns minutos.",
};

const campo = "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm text-neutral-900 focus:border-primary-500 focus:outline-none";

export default async function CriarAcesso({ searchParams }: { searchParams: Promise<{ c?: string; erro?: string }> }) {
  const { c, erro } = await searchParams;
  const id = await conviteDoLink(c);
  const r = id ? await perguntarConvite(id, "ver") : null;
  const vale = !!c && !!r?.valido && !!r.email;
  const motivo = r?.erro === "fora do ar" ? ERROS.fora
    : r?.motivo === "usado" ? "Este link já foi usado. Entre pela tela de login."
    : "Este link não vale mais. Peça um novo a quem te enviou.";
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        <h1 className="font-playfair font-bold text-2xl text-neutral-900 mb-2">{vale ? "Crie sua senha" : "Link inválido"}</h1>
        {vale
          ? <p className="text-neutral-500 text-sm mb-6">Acesso para <b>{r!.email}</b>{r!.nome ? ` (${r!.nome})` : ""}</p>
          : <p role="alert" className="text-red-600 text-sm">{motivo}</p>}
        {vale && erro && ERROS[erro] && <p role="alert" className="text-red-600 text-sm mb-4">{ERROS[erro]}</p>}
        {vale && (
          <form action={criarAcesso} className="space-y-4">
            <input type="hidden" name="c" value={c} />
            <label className="block text-sm text-neutral-700">Senha
              <input name="senha" type="password" required minLength={8} autoComplete="new-password" className={campo} />
            </label>
            <label className="block text-sm text-neutral-700">Repita a senha
              <input name="confirma" type="password" required minLength={8} autoComplete="new-password" className={campo} />
            </label>
            <button type="submit" className="w-full rounded-xl bg-primary-700 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-800">Criar senha e entrar</button>
          </form>
        )}
      </div>
    </div>
  );
}
