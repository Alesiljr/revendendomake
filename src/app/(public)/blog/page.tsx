import Link from "next/link";
import { ChevronRight, Calendar, Clock } from "lucide-react";

export const metadata = {
  title: "Blog | Revendendo Make",
  description: "Dicas de beleza, maquiagem e empreendedorismo para revendedoras.",
};

const posts = [
  {
    id: 1,
    slug: "como-vender-maquiagem-pelo-whatsapp",
    title: "Como Vender Maquiagem pelo WhatsApp e Dobrar suas Vendas",
    excerpt: "Aprenda as melhores técnicas para usar o WhatsApp como canal de vendas e fidelizar sua clientela com facilidade.",
    category: "Vendas",
    date: "20/04/2026",
    readTime: "5 min",
    emoji: "📱",
    gradient: "from-primary-100 to-primary-200",
  },
  {
    id: 2,
    slug: "tendencias-maquiagem-2026",
    title: "Tendências de Maquiagem 2026: O que Suas Clientes Vão Querer",
    excerpt: "Fique por dentro das cores, técnicas e produtos que vão dominar o mercado de beleza em 2026.",
    category: "Tendências",
    date: "15/04/2026",
    readTime: "7 min",
    emoji: "🎨",
    gradient: "from-secondary-100 to-secondary-200",
  },
  {
    id: 3,
    slug: "como-organizar-financas-como-revendedora",
    title: "Como Organizar suas Finanças como Revendedora",
    excerpt: "Dicas práticas de gestão financeira para revendedoras que querem crescer de forma sustentável.",
    category: "Negócios",
    date: "10/04/2026",
    readTime: "6 min",
    emoji: "💰",
    gradient: "from-neutral-100 to-neutral-200",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 md:py-16 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mb-2">
            Blog Revendendo Make
          </h1>
          <p className="text-neutral-600">
            Dicas de beleza, vendas e empreendedorismo para você prosperar.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-md transition-shadow"
              >
                {/* Thumbnail placeholder */}
                <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                  <span className="text-6xl" role="img" aria-label={post.title}>
                    {post.emoji}
                  </span>
                </div>
                <div className="p-6">
                  <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full mb-3">
                    {post.category}
                  </span>
                  <h2 className="font-playfair font-bold text-lg text-neutral-900 mb-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center gap-1 text-primary-700 font-medium text-sm hover:text-primary-800 transition-colors"
                    >
                      Ler
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
