import { Star } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Depoimentos | Revendendo Make",
  description: "Veja o que nossas revendedoras falam sobre a Revendendo Make.",
};

const testimonials = [
  { id: 1, name: "Ana Paula S.", city: "São Paulo, SP", result: "R$ 2.400 no 1° mês", avatar: "👩", stars: 5, text: "Nunca pensei que ia ganhar tanto dinheiro vendendo maquiagem. Os produtos são incríveis e as clientes adoram. Recomendo muito!" },
  { id: 2, name: "Mariana C.", city: "Belo Horizonte, MG", result: "50 clientes em 3 meses", avatar: "👩‍🦰", stars: 5, text: "A qualidade dos produtos fala por si só. Minhas clientes me indicam para amigas e a cartela só cresce." },
  { id: 3, name: "Juliana R.", city: "Recife, PE", result: "R$ 1.800/mês de renda extra", avatar: "👩‍🦱", stars: 5, text: "Comecei com medo, mas o suporte da equipe me deu confiança. Hoje tenho uma renda extra consistente." },
  { id: 4, name: "Fernanda M.", city: "Curitiba, PR", result: "Deixou o emprego fixo", avatar: "👩‍💼", stars: 5, text: "Em 6 meses faturando como revendedora, consegui largar meu emprego CLT. Hoje sou minha própria chefe!" },
  { id: 5, name: "Carla B.", city: "Salvador, BA", result: "R$ 3.500/mês", avatar: "👩‍🦳", stars: 5, text: "Comecei as vendas no WhatsApp e no Instagram. Em pouco tempo minhas clientes me procuram sozinhas." },
  { id: 6, name: "Patricia N.", city: "Porto Alegre, RS", result: "100+ clientes fiéis", avatar: "🧕", stars: 5, text: "Os produtos vendem sozinhos porque a qualidade é real. Minha clientela cresceu organicamente — boca a boca." },
];

export default function DepoimentosPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-50 to-white py-12 md:py-16 border-b border-neutral-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mb-2">
            Histórias de Sucesso
          </h1>
          <p className="text-neutral-600 max-w-xl mx-auto">
            Mais de 500 revendedoras já transformaram sua vida com a Revendendo Make.
            Veja o que elas dizem.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary-400 text-secondary-400" />
                  ))}
                </div>
                <p className="text-neutral-700 leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl" role="img" aria-label={t.name}>{t.avatar}</span>
                  <div>
                    <p className="font-semibold text-neutral-900">{t.name}</p>
                    <p className="text-sm text-neutral-500">{t.city}</p>
                  </div>
                </div>
                <div className="mt-3 bg-primary-50 text-primary-700 text-xs font-semibold px-3 py-1 rounded-full inline-block">
                  {t.result}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-4">Sua história de sucesso pode ser a próxima!</p>
            <Link
              href="/seja-revendedora"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 hover:scale-105 min-h-[48px]"
            >
              Quero Ser Revendedora
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
