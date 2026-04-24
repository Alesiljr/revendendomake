import { Star } from "lucide-react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import type { Testimonial } from "@/lib/supabase/types";

export const metadata = {
  title: "Depoimentos | Revendendo Make",
  description: "Veja o que nossas revendedoras falam sobre a Revendendo Make.",
};

async function getTestimonials(): Promise<Testimonial[]> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase: any = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("approved", true)
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });
  return (data ?? []) as Testimonial[];
}

const fallbackTestimonials = [
  { id: "1", reseller_name: "Ana Paula S.", city: "São Paulo, SP", result_text: "Nunca pensei que ia ganhar tanto dinheiro vendendo maquiagem. Os produtos são incríveis e as clientes adoram. Recomendo muito!", rating: 5, approved: true, display_order: 0, created_at: "", photo_url: null },
  { id: "2", reseller_name: "Mariana C.", city: "Belo Horizonte, MG", result_text: "A qualidade dos produtos fala por si só. Minhas clientes me indicam para amigas e a cartela só cresce.", rating: 5, approved: true, display_order: 1, created_at: "", photo_url: null },
  { id: "3", reseller_name: "Juliana R.", city: "Recife, PE", result_text: "Comecei com medo, mas o suporte da equipe me deu confiança. Hoje tenho uma renda extra consistente.", rating: 5, approved: true, display_order: 2, created_at: "", photo_url: null },
  { id: "4", reseller_name: "Fernanda M.", city: "Curitiba, PR", result_text: "Em 6 meses faturando como revendedora, consegui largar meu emprego CLT. Hoje sou minha própria chefe!", rating: 5, approved: true, display_order: 3, created_at: "", photo_url: null },
  { id: "5", reseller_name: "Carla B.", city: "Salvador, BA", result_text: "Comecei as vendas no WhatsApp e no Instagram. Em pouco tempo minhas clientes me procuram sozinhas.", rating: 5, approved: true, display_order: 4, created_at: "", photo_url: null },
  { id: "6", reseller_name: "Patricia N.", city: "Porto Alegre, RS", result_text: "Os produtos vendem sozinhos porque a qualidade é real. Minha clientela cresceu organicamente — boca a boca.", rating: 5, approved: true, display_order: 5, created_at: "", photo_url: null },
] as Testimonial[];

export default async function DepoimentosPage() {
  const dbTestimonials = await getTestimonials();
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;

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
              <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary-400 text-secondary-400" />
                  ))}
                </div>
                <p className="text-neutral-700 leading-relaxed mb-5 italic">
                  &ldquo;{t.result_text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {t.reseller_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{t.reseller_name}</p>
                    <p className="text-sm text-neutral-500">{t.city}</p>
                  </div>
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
