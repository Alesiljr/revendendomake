import { Plus } from "lucide-react";

const samplePosts = [
  {
    id: "1",
    title: "Como Começar a Revender Maquiagem do Zero",
    category: "Dicas de Negócio",
    status: "published" as const,
    date: "2026-04-20",
  },
  {
    id: "2",
    title: "5 Produtos de Maquiagem Mais Vendidos no Verão",
    category: "Produtos",
    status: "published" as const,
    date: "2026-04-18",
  },
  {
    id: "3",
    title: "Como Divulgar Seus Produtos nas Redes Sociais",
    category: "Marketing",
    status: "draft" as const,
    date: "2026-04-24",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Blog</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {samplePosts.length} artigos — dados de demonstração.
          </p>
        </div>
        <button
          disabled
          title="Disponível com Supabase configurado"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Novo Artigo
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                <th className="px-6 py-3 text-left font-medium">Título</th>
                <th className="px-6 py-3 text-left font-medium">Categoria</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Data</th>
                <th className="px-6 py-3 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {samplePosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-neutral-900 max-w-[280px]">
                    {post.title}
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {post.category}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        post.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {post.status === "published" ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">
                    {formatDate(post.date)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        disabled
                        title="Disponível com Supabase"
                        className="text-xs text-primary-700 opacity-40 cursor-not-allowed"
                      >
                        Editar
                      </button>
                      <span className="text-neutral-200">|</span>
                      <button
                        disabled
                        title="Disponível com Supabase"
                        className="text-xs text-red-500 opacity-40 cursor-not-allowed"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
