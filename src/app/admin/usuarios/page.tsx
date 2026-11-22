// 22/11/2026: as contas do painel (criar, travar, trocar senha, apagar) passaram a ser cuidadas só pelo administrador,
// fora daqui. A tela antiga (convidar, aprovar, gerar senha) saiu do menu; quem abrir o endereço vê este aviso.
export default function Usuarios() {
  return (
    <div className="max-w-xl rounded-2xl border border-neutral-200 bg-white p-6">
      <h1 className="font-playfair font-bold text-2xl text-neutral-900 mb-2">Usuários</h1>
      <p className="text-neutral-500 text-sm">Novas contas, trocas de senha e acessos ao painel agora são feitos só pelo administrador.</p>
    </div>
  );
}
