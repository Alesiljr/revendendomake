import { createClient } from "@supabase/supabase-js";
import { Plus } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/lib/supabase/types";

function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

async function getProducts(): Promise<Product[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const { data } = await supabase
    .from("products")
    .select("*, categories(name)")
    .order("created_at", { ascending: false });
  return (data ?? []) as Product[];
}

export default async function ProdutosPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Produtos</h2>
          <p className="text-neutral-500 text-sm mt-1">
            {products.length} produto{products.length !== 1 ? "s" : ""} no catálogo.
          </p>
        </div>
        <Link
          href="/admin/produtos/novo"
          className="flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Novo Produto
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-neutral-400 mb-4">Nenhum produto cadastrado ainda.</p>
            <Link
              href="/admin/produtos/novo"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-700 text-white rounded-lg text-sm font-medium hover:bg-primary-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Cadastrar primeiro produto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-100 text-neutral-500 text-xs uppercase tracking-wide bg-neutral-50">
                  <th className="px-6 py-3 text-left font-medium">Produto</th>
                  <th className="px-6 py-3 text-left font-medium">Categoria</th>
                  <th className="px-6 py-3 text-left font-medium">Preço Venda</th>
                  <th className="px-6 py-3 text-left font-medium">Custo</th>
                  <th className="px-6 py-3 text-left font-medium">Estoque</th>
                  <th className="px-6 py-3 text-left font-medium">Status</th>
                  <th className="px-6 py-3 text-left font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.images[0] ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-neutral-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-400 text-xs">
                            💄
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-neutral-900">{product.name}</p>
                          {product.description && (
                            <p className="text-xs text-neutral-400 mt-0.5 max-w-[200px] truncate">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {product.categories?.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 font-medium text-neutral-900">
                      {formatPrice(product.suggested_price)}
                    </td>
                    <td className="px-6 py-4 text-neutral-600">
                      {formatPrice(product.cost_price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-medium ${product.stock <= 10 ? "text-red-600" : "text-neutral-900"}`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        product.active ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {product.active ? "Ativo" : "Inativo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/produtos/${product.id}`}
                        className="text-xs text-primary-700 hover:text-primary-800 font-medium"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
