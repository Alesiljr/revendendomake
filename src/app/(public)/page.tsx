import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle, Star, ChevronRight, AlertCircle, Shield, Zap, TrendingUp, Users, Award, DollarSign, Smartphone, Package } from "lucide-react";
import { PurchasePopup } from "@/components/public/purchase-popup";

// ─── SEO Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Revendendo Make | Lucre R$ 1.500 a R$ 3.000/mês Revendendo Maquiagem de Casa",
  description:
    "Mais de 500 mulheres já estão lucrando de R$ 1.500 a R$ 3.000 por mês revendendo maquiagem de qualidade pelo celular. Sem estoque obrigatório, sem experiência. Acesso por apenas R$ 29,99. Comece hoje!",
  keywords: [
    "revendedora de maquiagem",
    "revenda make",
    "ganhar dinheiro com maquiagem",
    "renda extra mulher",
    "como revender cosméticos",
    "revendedora cosméticos",
    "trabalhar em casa venda maquiagem",
    "renda extra sem sair de casa",
    "revenda maquiagem lucro",
  ],
  openGraph: {
    title: "Revendendo Make | R$ 1.500 a R$ 3.000/mês Revendendo Maquiagem de Casa",
    description:
      "500+ mulheres lucrando de casa vendendo maquiagem de qualidade. Sem estoque, sem experiência, 100% pelo celular. Acesso por apenas R$ 29,99.",
    type: "website",
    locale: "pt_BR",
    siteName: "Revendendo Make",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revendendo Make | Lucre Revendendo Maquiagem de Casa",
    description: "500+ mulheres lucrando de R$ 1.500 a R$ 3.000/mês revendendo maquiagem. Acesso por apenas R$ 29,99.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://revendendomake.com.br",
  },
};

// ─── Products ─────────────────────────────────────────────────────────────────

const products = [
  {
    id: 1,
    name: "Batom Matte Longa Duração",
    tag: "🔥 Mais Vendido",
    badge: "847 vendas este mês",
    margin: "45% de margem",
    profit: "Vende 10 = R$ 160 de lucro",
    hook: "Clientes que compram, pedem mais 3 na semana seguinte",
    src: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
  {
    id: 2,
    name: "Base Cobertura Total FPS30",
    tag: "⭐ Top Recompra",
    badge: "93% de recompra",
    margin: "38% de margem",
    profit: "Vende 10 = R$ 130 de lucro",
    hook: "Pele perfeita que faz a cliente te ligar pedindo mais",
    src: "https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
  {
    id: 3,
    name: "Paleta de Sombras 12 Cores",
    tag: "✨ Mais Compartilhado",
    badge: "Viral no Instagram",
    margin: "42% de margem",
    profit: "Vende 5 = R$ 120 de lucro",
    hook: "Uma paleta viraliza. Sua cliente posta e vende por você",
    src: "https://images.pexels.com/photos/2813462/pexels-photo-2813462.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
  {
    id: 4,
    name: "Máscara de Cílios Volume Extremo",
    tag: "💜 Efeito Imediato",
    badge: "Resultado em 1 aplicação",
    margin: "35% de margem",
    profit: "Vende 15 = R$ 150 de lucro",
    hook: "Cílios que impressionam — a cliente fecha na primeira vez que vê",
    src: "https://images.pexels.com/photos/3762878/pexels-photo-3762878.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
  {
    id: 5,
    name: "Gloss Labial Brilho Intenso",
    tag: "💋 Mais Desejado",
    badge: "50% de margem",
    margin: "50% de margem",
    profit: "Vende 10 = R$ 200 de lucro",
    hook: "Lábios que ninguém ignora — vende em 1 foto no story",
    src: "https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
  {
    id: 6,
    name: "Gloss Labial Hidratante",
    tag: "🌸 Lançamento",
    badge: "Esgotou em 48h no lançamento",
    margin: "48% de margem",
    profit: "Vende 10 = R$ 190 de lucro",
    hook: "Hidrata e deixa brilhoso — cliente faz pedido recorrente",
    src: "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Ana Paula S.",
    city: "São Paulo, SP",
    result: "R$ 2.400 no 1º mês",
    text: "Entrei com medo de não conseguir. Na primeira semana já tinha vendido pra 7 amigas do trabalho, sem precisar convencer ninguém — elas mesmas pediram. No fim do mês, R$ 2.400 de lucro líquido. Ainda não acredito que funcionou tão rápido.",
    src: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
    stars: 5,
    timeAgo: "há 12 dias",
  },
  {
    id: 2,
    name: "Mariana C.",
    city: "Belo Horizonte, MG",
    result: "50 clientes fixas em 3 meses",
    text: "O que me surpreendeu mesmo foi a qualidade. Minha primeira cliente comprou um batom e voltou na semana seguinte pedindo mais 3 pra presentear amigas. Hoje tenho 50 clientes que mandam mensagem toda semana sem eu precisar correr atrás. É renda que chega sozinha.",
    src: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
    stars: 5,
    timeAgo: "há 3 dias",
  },
  {
    id: 3,
    name: "Juliana R.",
    city: "Recife, PE",
    result: "R$ 1.800/mês sendo mãe solo",
    text: "Sou mãe solo, trabalho 8 horas por dia de carteira assinada e ainda tiro R$ 1.800 por mês revendendo. Faço tudo no celular, no intervalo do almoço e à noite depois que meu filho dorme. Se eu consegui, qualquer mulher decidida consegue.",
    src: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=80&h=80&fit=crop",
    stars: 5,
    timeAgo: "há 1 semana",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "Preciso de experiência com vendas para começar?",
    a: "Não precisa ter vendido nada na vida. A maioria das nossas revendedoras entrou do zero e faturou no primeiro mês. Você recebe roteiro de abordagem pronto, modelos de mensagens que convertem, e uma equipe de suporte que orienta cada passo.",
  },
  {
    q: "Quanto eu realmente posso lucrar?",
    a: "Em média 40% de lucro por produto. Um batom que você compra por R$ 18 vende por R$ 30. Uma paleta por R$ 40 vende por R$ 70. Venda 15 produtos por mês — e muitas revendedoras vendem mais do que isso só no WhatsApp — e já são R$ 180 a R$ 400 de lucro. As mais ativas passam de R$ 3.000.",
  },
  {
    q: "Consigo vender morando no interior ou em cidade pequena?",
    a: "Sim — e as revendedoras de cidades menores costumam ir melhor. Menos concorrência, todo mundo se conhece, a indicação corre mais rápido. Entregamos para todos os 27 estados, qualquer CEP. A sua localização não te limita em nada.",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden relative">
      {/* Urgency bar */}
      <div className="bg-red-600 text-white text-center text-[10px] md:text-sm font-bold py-1.5 tracking-wide">
        <span className="inline-flex items-center justify-center gap-1.5 flex-wrap">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
          ⚠️ ATENÇÃO: Apenas <strong className="underline">11 vagas</strong> com a condição especial — não feche essa página
        </span>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-20 text-center">
        <div className="inline-block bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-[10px] md:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-5">
          Outra mulher da sua cidade está faturando com maquiagem agora
        </div>

        <h1 className="font-playfair font-bold text-2xl md:text-3xl lg:text-4xl leading-tight mb-6">
          Como Mulheres Comuns Estão Faturando
          <br className="hidden md:block" />
          <span className="text-yellow-300 underline decoration-wavy decoration-yellow-400/50">
            R$ 1.500 a R$ 3.000
          </span>{" "}
          por Mês
          <br className="hidden md:block" />
          com Maquiagem — Só pelo Celular
        </h1>

        <p className="text-base md:text-lg text-pink-100 leading-relaxed mb-3 max-w-2xl mx-auto">
          <strong className="text-white">Sem experiência. Sem estoque. Por apenas R$ 29,99.</strong> Só um celular, os produtos certos, e um método que já provou funcionar para mais de 500 revendedoras em todo o Brasil.
        </p>

        <p className="text-pink-200 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
          Se você está cansada de ver o salário acabar antes do fim do mês e quer uma renda que realmente muda o jogo — o que você vai ler agora vai abrir um caminho que você não sabia que existia.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            "✅ Acesso por apenas R$ 29,99",
            "✅ Pagamento único — sem mensalidade",
            "✅ Entrega em todo o Brasil",
            "✅ Suporte 6 dias/sem",
            "✅ Sem estoque obrigatório",
          ].map((item) => (
            <span key={item} className="bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-pink-100 text-xs font-medium">
              {item}
            </span>
          ))}
        </div>

        {/* Social proof stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/20">
          {[
            { value: "500+", label: "Revendedoras ativas agora", icon: "👩" },
            { value: "R$ 2.100", label: "Lucro médio por mês", icon: "💰" },
            { value: "4.9★", label: "Avaliação das revendedoras", icon: "⭐" },
            { value: "27", label: "Estados atendidos", icon: "📦" },
          ].map((s) => (
            <div key={s.label} className="text-center bg-white/5 rounded-xl py-4 px-2">
              <p className="text-2xl md:text-3xl font-bold text-yellow-300">{s.value}</p>
              <p className="text-xs text-pink-300 mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pain → Gain (merged Problem + Transformation) ────────────────────────────

function PainToGainSection() {
  return (
    <section className="py-16 md:py-20 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Pain */}
        <div className="text-center mb-10">
          <span className="inline-block bg-red-900/60 text-red-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            Isso é para você?
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4 leading-tight">
            O salário cai na conta e já some antes do dia 15.{" "}
            <span className="text-red-400">Você trabalha duro, mas a vida financeira nunca muda.</span>
          </h2>
        </div>

        <div className="space-y-3 max-w-2xl mx-auto mb-12">
          {[
            "Você trabalha todo dia mas o dinheiro nunca sobra — chega no fim do mês e mais uma vez faltou",
            "Já tentou renda extra antes (revendas, aplicativos, freelas) e nada deu resultado de verdade",
            "Tem medo de arriscar de novo e perder o pouco que tem com algo que não vai funcionar",
            "Vê outras mulheres prosperando online e não entende o que elas sabem que você não sabe",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 bg-neutral-800/80 border border-neutral-700 rounded-xl p-4">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-neutral-200 text-sm leading-relaxed">{item}</p>
            </div>
          ))}
        </div>

        {/* Transformation */}
        <div className="text-center mb-8">
          <span className="text-primary-400 text-sm font-semibold uppercase tracking-widest">
            Agora imagine por 30 segundos
          </span>
          <h3 className="font-playfair font-bold text-2xl md:text-3xl text-white mt-3 leading-tight">
            Como seria a sua vida com{" "}
            <span className="text-yellow-300">R$ 2.000 a mais</span> todo mês?
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6">
            <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest mb-4">❌ Hoje sem renda extra</p>
            <div className="space-y-2.5">
              {[
                "Conta bancária no zero antes do dia 20",
                "Recusando convites porque \"não tem dinheiro\"",
                "Adiando sonhos — viagem, curso, presentear os filhos",
                "Dependência total de um único salário",
              ].map((item) => (
                <p key={item} className="text-neutral-400 text-sm flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✗</span> {item}
                </p>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-2xl p-6">
            <p className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-4">✅ Em 30 dias como revendedora</p>
            <div className="space-y-2.5">
              {[
                "R$ 1.500 a R$ 3.000 extras caindo todo mês",
                "Liberdade para dizer \"sim\" para o que importa",
                "Realizando aquele sonho que estava parado",
                "Dinheiro que você controla, no seu horário",
              ].map((item) => (
                <p key={item} className="text-white text-sm flex items-start gap-2">
                  <span className="text-yellow-300 font-bold shrink-0">✓</span> {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="text-center text-neutral-400 text-sm max-w-lg mx-auto leading-relaxed">
          Essa transformação está acontecendo agora mesmo com mais de 500 mulheres — muitas delas exatamente na mesma situação que você estava antes de clicar nessa página.
        </p>
      </div>
    </section>
  );
}

// ─── Solution / Benefits ──────────────────────────────────────────────────────

function SolutionSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            O método que já funcionou para 500+ mulheres
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mt-3 leading-tight">
            A oportunidade mais inteligente para renda extra —{" "}
            <span className="text-primary">com até 50% de lucro por produto</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[
            {
              Icon: DollarSign,
              color: "bg-green-100 text-green-700",
              borderColor: "border-green-200",
              title: "Até 50% de lucro em cada produto",
              text: "Um gloss que você compra por R$ 20 vende por R$ 40. Uma paleta por R$ 40 vende por R$ 70. Venda 10 produtos por semana — o que muitas fazem só pelo WhatsApp — e já são R$ 500+ de lucro limpo.",
              highlight: "Exemplo real: R$ 500+ por semana",
            },
            {
              Icon: Smartphone,
              color: "bg-blue-100 text-blue-700",
              borderColor: "border-blue-200",
              title: "100% pelo celular, sem horário fixo",
              text: "Sem chefe, sem meta obrigatória, sem sair de casa. Você vende quando quiser — de madrugada, no almoço, no final de semana. Manda o catálogo no WhatsApp, recebe o pedido, repassa ao fornecedor. Em 3 cliques você fez uma venda.",
              highlight: "Vendedoras ativas faturam até às 23h",
            },
            {
              Icon: Package,
              color: "bg-purple-100 text-purple-700",
              borderColor: "border-purple-200",
              title: "Sem estoque, sem risco, sem prejuízo",
              text: "Você não guarda nada em casa. O pedido vai direto do fornecedor para a sua cliente. Não tem produto parado, não tem capital preso. Você compra só o que já tem comprador.",
              highlight: "Zero risco de ficar no prejuízo",
            },
            {
              Icon: Award,
              color: "bg-pink-100 text-pink-700",
              borderColor: "border-pink-200",
              title: "200+ produtos — marcas que as clientes já amam",
              text: "Batom, base, sombra, gloss, máscara de cílios — catálogo completo com os mais vendidos do mercado. Inclui marcas tradicionais, premium e as das influenciadoras que viralizam no TikTok.",
              highlight: "Acesso ao catálogo completo desde o dia 1",
            },
          ].map((b) => (
            <div key={b.title} className={`bg-white rounded-2xl p-6 border-2 ${b.borderColor} hover:shadow-lg transition-all duration-300 group`}>
              <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <b.Icon className="w-6 h-6" />
              </div>
              <h3 className="font-playfair font-bold text-xl text-neutral-900 mb-2">{b.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm mb-4">{b.text}</p>
              <div className="flex items-center gap-2 bg-neutral-50 rounded-lg px-3 py-2">
                <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                <span className="text-green-700 text-xs font-bold">{b.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#oferta"
            data-track="cta-solution-quero-essa-oportunidade"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-extrabold text-sm md:text-lg px-6 py-3 md:px-12 md:py-5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
          >
            QUERO ESSA OPORTUNIDADE AGORA
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-neutral-400 text-sm mt-3">Acesso imediato · Apenas R$ 29,99 · Sem mensalidade</p>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-20 bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-pink-400 text-sm font-semibold uppercase tracking-widest">
            É simples, rápido e funciona de verdade
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-white mt-3">
            3 passos. Primeira venda em{" "}
            <span className="text-yellow-300">menos de 7 dias.</span>
          </h2>
          <p className="text-neutral-400 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Não é promessa — é o relato das nossas revendedoras. A maioria faz a primeira venda na primeira semana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              step: "01",
              title: "Garanta seu acesso agora",
              text: "Clique no botão, conclua o pagamento de R$ 29,99 e receba acesso imediato ao catálogo completo, ao roteiro de vendas pronto e ao grupo VIP de suporte. Todo o material chega em menos de 2 minutos, sem burocracia.",
              badge: "👆 R$ 29,99 — acesso imediato",
            },
            {
              step: "02",
              title: "Receba o catálogo e estratégia",
              text: "Nossa equipe te indica os produtos que mais vendem na sua região e te entrega roteiro de abordagem pronto. Você já sabe exatamente o que mandar, pra quem mandar e o que falar.",
              badge: "📲 Catálogo + script prontos",
            },
            {
              step: "03",
              title: "Venda e receba seu lucro",
              text: "Manda o catálogo no WhatsApp das amigas, posta no story, compartilha no grupo. A cliente pede, você confirma, repassa o produto — e o lucro fica com você. Assim toda semana.",
              badge: "💸 Lucro líquido direto pra você",
            },
          ].map((s) => (
            <div key={s.step} className="bg-neutral-800 border border-neutral-700 rounded-2xl p-6 text-center">
              <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-5 mx-auto">
                {s.step}
              </div>
              <h3 className="font-playfair font-bold text-base text-white mb-3">{s.title}</h3>
              <p className="text-neutral-400 leading-relaxed text-sm mb-4">{s.text}</p>
              <span className="inline-block bg-green-900/50 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full border border-green-800">
                {s.badge}
              </span>
            </div>
          ))}
        </div>

        {/* Tip box */}
        <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-2xl p-5 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-neutral-900" />
            </div>
            <p className="text-yellow-300 text-xs font-bold uppercase tracking-widest">
              Dica das revendedoras que mais faturam
            </p>
          </div>
          <p className="text-white text-sm leading-relaxed mb-4">
            Você pode vender tanto <strong className="text-yellow-300">pessoalmente</strong> quanto{" "}
            <strong className="text-yellow-300">100% online</strong> — e as revendedoras com maior retorno faturam principalmente pelo digital.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white text-xs font-bold mb-1">Lives de vendas</p>
              <p className="text-neutral-400 text-xs leading-snug">
                Uma live de 30 min no Instagram ou TikTok gera dezenas de pedidos em tempo real — sem sair de casa.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white text-xs font-bold mb-1">Grupos no WhatsApp</p>
              <p className="text-neutral-400 text-xs leading-snug">
                Grupos de 50 a 200 clientes recebem pedidos todos os dias — sem precisar abordar ninguém.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="#oferta"
            data-track="cta-howitworks-comecar-agora"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-extrabold text-sm md:text-lg px-6 py-3 md:px-12 md:py-5 rounded-xl shadow-2xl transition-all duration-200 hover:scale-105"
          >
            COMEÇAR AGORA
            <ChevronRight className="w-5 h-5" />
          </a>
          <p className="text-neutral-500 text-sm mt-3">Apenas R$ 29,99 · Acesso imediato · Pagamento único</p>
        </div>
      </div>
    </section>
  );
}

// ─── Products + Brands strip ──────────────────────────────────────────────────

function ProductsSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Produtos que se vendem sozinhos
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mt-3">
            Maquiagem de qualidade premium —
            <br className="hidden md:block" />
            <span className="text-primary">clientes que voltam toda semana</span>
          </h2>
          <p className="text-neutral-500 mt-3 max-w-xl mx-auto text-base leading-relaxed">
            Esses são os produtos que mais convertem na nossa rede. Alta qualidade, preço acessível, fidelização natural.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mb-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer"
              style={{ minHeight: "320px" }}
            >
              <Image
                src={product.src}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
                <span className="bg-primary text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                  {product.tag}
                </span>
                <span className="bg-yellow-400 text-neutral-900 text-xs font-extrabold px-2 py-1 rounded-full shadow-lg whitespace-nowrap">
                  {product.margin}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-playfair font-bold text-white text-base leading-snug mb-1.5">
                  {product.name}
                </h3>
                <p className="text-yellow-300 text-xs font-bold mb-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {product.profit}
                </p>
                <p className="text-neutral-300 text-xs leading-tight mb-3">
                  {product.hook}
                </p>
                <div className="bg-white/15 border border-white/25 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                  <span className="text-white text-xs font-semibold">{product.badge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-neutral-400 text-sm mb-6">
          + mais de 200 produtos no catálogo completo disponível após o acesso
        </p>

        {/* Brands strip */}
        <div className="bg-neutral-900 rounded-2xl p-6 mb-10">
          <p className="text-yellow-400 text-xs font-bold uppercase tracking-widest text-center mb-3">
            Isso aqui vai te surpreender
          </p>
          <p className="text-white text-center text-sm font-semibold mb-4 leading-relaxed">
            Nossos fornecedores têm <span className="text-yellow-300">todas as marcas do mercado</span> — incluindo as das influenciadoras que viralizam no TikTok e Instagram
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Marcas tradicionais", desc: "Avon, Natura, O Boticário e mais" },
              { label: "Marcas de influencers", desc: "As que viralizam no TikTok e Reels" },
              { label: "Marcas premium", desc: "Alta linha com ótima margem" },
              { label: "Lançamentos exclusivos", desc: "Antes de chegarem nas lojas físicas" },
            ].map((b) => (
              <div key={b.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-left">
                <CheckCircle className="w-4 h-4 text-yellow-400 mb-1.5" />
                <p className="text-white text-xs font-semibold leading-snug mb-1">{b.label}</p>
                <p className="text-neutral-500 text-xs leading-snug">{b.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-neutral-400 text-xs mt-4">
            Você vende o que sua cliente já quer comprar. <strong className="text-white">Não fica presa a um catálogo genérico.</strong>
          </p>
        </div>

        <div className="text-center">
          <a
            href="#oferta"
            data-track="cta-products-quero-revender"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-extrabold text-sm md:text-lg px-6 py-3 md:px-12 md:py-5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
          >
            QUERO REVENDER ESSES PRODUTOS
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-20 bg-neutral-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Resultados reais. Nomes reais. Vidas reais.
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mt-3">
            Elas duvidaram. Tentaram. <span className="text-primary">Não pararam mais.</span>
          </h2>
          <p className="text-neutral-500 mt-3 max-w-xl mx-auto text-base">
            Essas são as histórias de mulheres que estavam exatamente onde você está agora. A única diferença foi uma decisão.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-1">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-neutral-400">{t.timeAgo}</span>
              </div>

              <div className="bg-green-50 text-green-700 text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 shrink-0" />
                {t.result}
              </div>

              <p className="text-neutral-700 leading-relaxed mb-5 text-sm">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-neutral-100">
                <Image
                  src={t.src}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div>
                  <p className="font-semibold text-neutral-900 text-sm flex items-center gap-1.5">
                    {t.name}
                    <span className="inline-flex items-center gap-0.5 bg-blue-100 text-blue-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verificada
                    </span>
                  </p>
                  <p className="text-xs text-neutral-500">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Social proof bar */}
        <div className="bg-white border border-neutral-100 rounded-2xl p-6 text-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { icon: <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />, text: "500+ ativas" },
              { icon: <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-yellow-400 shrink-0" />, text: "4.9 de satisfação" },
              { icon: <Award className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 shrink-0" />, text: "87% venderam na 1ª sem" },
              { icon: <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-primary shrink-0" />, text: "R$ 2.100/mês de lucro" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-center gap-1.5 text-[10px] sm:text-sm font-semibold text-neutral-600">
                {item.icon}
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Urgency / Offer ──────────────────────────────────────────────────────────

function OfferSection() {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary-900 to-primary-800 text-white" id="oferta">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-4 leading-tight">
          Os fornecedores liberaram preço promocional{" "}
          <span className="text-yellow-300">só para quem entrar agora.</span>
        </h2>

        <p className="text-pink-100 text-base leading-relaxed mb-8 max-w-2xl mx-auto">
          Os fornecedores parceiros abriram uma janela de desconto essa semana para novos cadastros. <strong className="text-white">Quem entrar hoje trava o acesso com os preços de hoje — permanentemente.</strong> Quando essa janela fechar, a condição muda.
        </p>

        {/* What's included */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-8 mb-8 text-left max-w-lg mx-auto">
          <p className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-5 text-center">
            O que você recebe ao entrar hoje
          </p>
          <div className="space-y-3">
            {[
              { item: "Acesso ao catálogo completo com 200+ produtos", value: "Incluso" },
              { item: "Margem de até 50% de lucro por produto", value: "Incluso" },
              { item: "Roteiro de vendas pronto pra usar no WhatsApp", value: "Incluso" },
              { item: "Material de divulgação exclusivo para redes sociais", value: "Incluso" },
              { item: "Grupo VIP de suporte com equipe humana", value: "Incluso" },
              { item: "Entrega em todos os 27 estados", value: "Incluso" },
              { item: "Preço promocional dos fornecedores desta semana", value: "🔒 Só hoje" },
            ].map(({ item, value }) => (
              <div key={item} className="flex items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                  <p className="text-white text-sm">{item}</p>
                </div>
                <span className="text-yellow-300 text-xs font-bold whitespace-nowrap">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Price anchoring */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 max-w-sm mx-auto text-center">
          <p className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-3">
            Investimento especial esta semana
          </p>
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-neutral-400 text-base line-through">De R$ 97,00</span>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">-69%</span>
          </div>
          <p className="text-white font-extrabold text-4xl mb-1">
            R$ 29<span className="text-2xl">,99</span>
          </p>
          <p className="text-yellow-300 text-xs font-semibold mb-3">
            Você economiza R$ 67,01 hoje
          </p>
          <div className="flex items-center justify-center gap-1.5 text-green-400 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            Acesso imediato após o pagamento
          </div>
        </div>

        {/* Scarcity bar */}
        <div className="bg-white/10 border border-white/20 rounded-xl p-5 mb-8 max-w-sm mx-auto">
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="font-bold text-pink-200 uppercase tracking-wide">Vagas com condição especial</span>
            <span className="font-bold text-red-400 animate-pulse">QUASE ESGOTADO</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-yellow-400 to-red-500 rounded-full" style={{ width: "84%" }} />
          </div>
          <p className="text-xs text-pink-200 mt-2">
            Apenas <strong className="text-white text-sm">11 vagas</strong> com a condição desta semana
          </p>
        </div>

        <a
          href="https://checkout.perfectpay.com.br/pay/PPU38CPONGJ"
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta-offer-garantir-minha-vaga"
          className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-extrabold text-sm md:text-xl px-6 py-3 md:px-12 md:py-5 rounded-xl shadow-2xl transition-all duration-200 hover:scale-105"
        >
          GARANTIR MINHA VAGA AGORA
          <ChevronRight className="w-6 h-6" />
        </a>

        <p className="text-pink-300 text-sm mt-5">
          <Shield className="w-4 h-4 inline mr-1.5" />
          Acesso por R$ 29,99 · Pagamento único · Sem mensalidade
        </p>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Sem dúvidas sem resposta
          </span>
          <h2 className="font-playfair font-bold text-3xl md:text-4xl text-neutral-900 mt-3">
            As perguntas que toda mulher faz antes de entrar
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100 hover:border-primary-200 transition-colors">
              <h3 className="font-semibold text-neutral-900 mb-3 flex items-start gap-2">
                <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                {faq.q}
              </h3>
              <p className="text-neutral-600 leading-relaxed text-sm pl-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-900 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-neutral-400 text-sm font-semibold uppercase tracking-widest mb-4">
          Você chegou até aqui. Isso já diz algo sobre você.
        </p>

        <h2 className="font-playfair font-bold text-3xl md:text-4xl mb-6 leading-tight">
          Daqui a 30 dias, você vai olhar pra trás
          <br className="hidden md:block" />
          e agradecer por{" "}
          <br className="hidden md:block" />
          <span className="text-yellow-400">ter tomado essa decisão hoje.</span>
        </h2>

        <p className="text-neutral-300 text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
          Mais de 500 mulheres tomaram essa decisão e hoje têm renda extra de verdade. A única diferença entre elas e você é que elas clicaram no botão. As vagas com a condição especial desta semana estão acabando agora.
        </p>

        <a
          href="https://checkout.perfectpay.com.br/pay/PPU38CPONGJ"
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta-final-quero-ser-revendedora-agora"
          className="inline-flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 text-neutral-900 font-extrabold text-xl px-12 py-5 rounded-xl shadow-2xl transition-all duration-200 hover:scale-105 mb-5"
        >
          SIM, EU QUERO COMEÇAR AGORA →
        </a>

        <p className="text-red-400 text-sm font-bold mb-6 animate-pulse">
          ⚠️ Restam apenas 11 vagas com a condição especial desta semana
        </p>

      </div>
    </section>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PainToGainSection />
      <SolutionSection />
      <HowItWorksSection />
      <ProductsSection />
      <TestimonialsSection />
      <OfferSection />
      <FAQSection />
      <FinalCTASection />
      <PurchasePopup />
    </>
  );
}
