// Desligado em 22/11/2026: o convite antigo não cria mais conta (conta nova só pelo link /criar-acesso).
export const dynamic = "force-dynamic";

export default function Convite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-sm">
        <h1 className="font-playfair font-bold text-2xl text-neutral-900 mb-2">Link inválido</h1>
        <p className="text-neutral-500 text-sm">Este link não vale mais. Peça um novo a quem te enviou.</p>
      </div>
    </div>
  );
}
