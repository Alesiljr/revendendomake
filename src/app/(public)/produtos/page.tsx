import Link from "next/link";
import { ChevronRight } from "lucide-react";

const products = [
  { id: 1, name: "Batom Líquido Framboesa", price: 29.9, category: "Batom", emoji: "💄", tag: "Mais Vendido", gradient: "from-primary-100 to-primary-200" },
  { id: 2, name: "Base HD Cobertura Total", price: 49.9, category: "Base", emoji: "✨", tag: "Destaque", gradient: "from-secondary-100 to-secondary-200" },
  { id: 3, name: "Paleta de Sombras Sunset", price: 59.9, category: "Olhos", emoji: "🎨", tag: "Novidade", gradient: "from-primary-50 to-secondary-100" },
  { id: 4, name: "Blush Rosé Cremoso", price: 34.9, category: "Blush", emoji: "🌸", tag: null, gradient: "from-primary-100 to-white" },
  { id: 5, name: "Máscara de Cílios Volume", price: 39.9, category: "Olhos", emoji: "👁️", tag: null, gradient: "from-neutral-100 to-neutral-200" },
  { id: 6, name: "Primer Hidratante Luminoso", price: 44.9, category: "Base", emoji: "🌟", tag: "Novidade", gradient: "from-secondary-100 to-white" },
];

const categories = ["Todos", "Batom", "Base", "Olhos", "Blush"];

export const metadata = {
  title: "Produtos | Revendendo Make",
  description: "Catálogo completo de maquiagem para revendedoras. Mais de 200 produtos de qualidade com ótimas margens.",
};

export default function ProdutosPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 md:py-16 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mb-2">
            Catálogo de Produtos
          </h1>
          <p className="text-neutral-600">
            Mais de 200 produtos para você revender com alta margem de lucro.
          </p>
        </div>
      </section>

      {/* Category filter (visual only — real filter in future stories) */}
      <section className="py-6 bg-white border-b border-neutral-100 sticky top-16 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors min-h-[40px] ${
                  cat === "Todos"
                    ? "bg-primary-700 text-white"
                    : "bg-neutral-100 text-neutral-600 hover:bg-primary-50 hover:text-primary-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
              >
                <div className={`h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center relative`}>
                  <span className="text-6xl" role="img" aria-label={product.name}>
                    {product.emoji}
                  </span>
                  {product.tag && (
                    <span className="absolute top-3 left-3 bg-primary-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <h2 className="font-playfair font-bold text-lg text-neutral-900 mb-3">
                    {product.name}
                  </h2>
                  <div className="flex items-center justify-between">
                    <span className="text-primary-700 font-bold text-xl">
                      R${" "}
                      {product.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                    <Link
                      href="/seja-revendedora"
                      className="text-sm bg-primary-700 hover:bg-primary-800 text-white px-4 py-2 rounded-lg transition-colors min-h-[44px] flex items-center gap-1"
                    >
                      Revender
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-4">
              Este é só o começo. Como revendedora, você tem acesso a mais de 200 produtos.
            </p>
            <Link
              href="/seja-revendedora"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 hover:scale-105 min-h-[48px]"
            >
              Quero Acesso Completo ao Catálogo
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
