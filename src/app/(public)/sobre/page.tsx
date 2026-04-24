import Link from "next/link";
import { ChevronRight, Sparkles, Heart, Award } from "lucide-react";

export const metadata = {
  title: "Sobre Nós | Revendendo Make",
  description: "Conheça a história da Revendendo Make e nossa missão de empoderar mulheres através da beleza.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Sparkles className="w-12 h-12 text-primary-200 mx-auto mb-4" />
          <h1 className="font-playfair font-bold text-3xl md:text-5xl mb-4">
            Nossa História
          </h1>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Nascemos da vontade de transformar a vida de mulheres brasileiras
            por meio do empreendedorismo na beleza.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none text-neutral-700 space-y-6">
            <p className="text-xl leading-relaxed">
              A <strong className="text-primary-700">Revendendo Make</strong> surgiu com um propósito claro:
              oferecer às mulheres brasileiras uma oportunidade real de renda,
              com liberdade, flexibilidade e produtos de alta qualidade.
            </p>
            <p className="leading-relaxed">
              Sabemos que conciliar família, trabalho e sonhos pessoais não é fácil. Por
              isso, criamos um modelo de revenda que se adapta à sua rotina — você vende
              quando quiser, para quem quiser, no canal que preferir.
            </p>
            <p className="leading-relaxed">
              Hoje, mais de 500 revendedoras em todo o Brasil confiam na Revendendo Make
              para complementar sua renda e, em muitos casos, substituir empregos fixos por
              uma jornada de autonomia e prosperidade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Heart, title: "Nossa Missão", text: "Empoderar mulheres por meio da beleza e do empreendedorismo." },
              { icon: Sparkles, title: "Nossa Visão", text: "Ser a plataforma de revenda de maquiagem mais amada do Brasil." },
              { icon: Award, title: "Nossos Valores", text: "Qualidade, transparência, suporte genuíno e resultados reais." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-playfair font-bold text-lg text-neutral-900 mb-2">{title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/seja-revendedora"
              className="inline-flex items-center gap-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold px-8 py-4 rounded-xl shadow-primary transition-all duration-200 hover:scale-105 min-h-[48px]"
            >
              Faça Parte da Nossa História
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
