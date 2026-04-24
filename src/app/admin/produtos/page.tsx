import { demoProducts } from "@/lib/demo-data";
import { Plus } from "lucide-react";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ProdutosPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Produtos</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {demoProducts.length} produtos no catálogo — dados de demonstração.
          </p>
        </div>
        <button
          disabled
          title="Disponível com Supabase configurado"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                <th className="px-6 py-3 text-left font-medium">Produto</th>
                <th className="px-6 py-3 text-left font-medium">Categoria</th>
                <th className="px-6 py-3 text-left font-medium">Preço Venda</th>
                <th className="px-6 py-3 text-left font-medium">Estoque</th>
                <th className="px-6 py-3 text-left font-medium">Status</th>
                <th className="px-6 py-3 text-left font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {demoProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl" role="img" aria-label={product.name}>
                        {product.emoji}
                      </span>
                      <div>
                        <p className="font-medium text-neutral-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-neutral-400 mt-0.5 max-w-[200px] truncate">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-neutral-900">
                    {formatPrice(product.suggested_price)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`font-medium ${product.stock <= 10 ? "text-red-600" : "text-neutral-900"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.active
                          ? "bg-green-100 text-green-700"
                          : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {product.active ? "Ativo" : "Inativo"}
                    </span>
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
