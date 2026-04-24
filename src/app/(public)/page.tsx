import Image from "next/image";
import Link from "next/link";
import { CheckCircle, TrendingUp, Heart, Award, Star, ChevronRight, Package, Users, Smartphone, MapPin, Sparkles } from "lucide-react";
import { PurchasePopup } from "@/components/public/purchase-popup";

// ─── Product data — no links, not clickable ──────────────────────────────────

const products = [
  {
    id: 1,
    name: "Batom Matte Longa Duração",
    category: "Batons",
    tag: "Mais Vendido",
    src: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Base Cobertura Total FPS30",
    category: "Bases",
    tag: "Destaque",
    src: "https://images.pexels.com/photos/3685538/pexels-photo-3685538.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Paleta de Sombras 12 Cores",
    category: "Sombras",
    tag: "Novidade",
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Máscara de Cílios Volume Extremo",
    category: "Olhos",
    tag: "Top 10",
    src: "https://images.pexels.com/photos/3762878/pexels-photo-3762878.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  },
  {
    id: 5,
    name: "Kit Pincéis Profissional",
    category: "Acessórios",
    tag: "Favorito",
    src: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Gloss Labial Hidratante",
    category: "Lábios",
    tag: "Lançamento",
    src: "https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop",
  },
];

// ─── Urgency Thermometer (client interaction via CSS animation) ───────────────

function UrgencyBar() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-6 max-w-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
          Vagas disponíveis hoje
        </span>
        <span className="text-xs font-bold text-red-600">QUASE ESGOTADO</span>
      </div>
      <div className="w-full bg-amber-100 rounded-full h-4 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-400 to-red-500 rounded-full animate-thermo"
          style={{ width: "78%" }}
        />
      </div>
      <p className="text-xs text-amber-700 mt-2 font-medium">
        Apenas <strong className="text-red-600">7 vagas</strong> restantes para hoje
      </p>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-100 py-16 md:py-24 overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100 rounded-full opacity-30 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-secondary-200 rounded-full opacity-20 translate-y-1/2 -translate-x-1/3" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: copy */}
          <div>
            <span className="inline-block bg-primary-100 text-primary-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Oportunidade de Renda Extra
            </span>
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-neutral-900 leading-tight mb-6">
              Ganhe Dinheiro
              <br />
              <span className="text-primary">Revendendo</span>
              <br />
              Maquiagem
            </h1>
            <p className="text-lg text-neutral-600 mb-6 leading-relaxed">
              Trabalhe em casa, no seu tempo, com produtos que as clientes amam.
              Mais de 500 revendedoras já transformaram sua renda com a Revendendo Make.
            </p>

            <UrgencyBar />

            <div className="mt-8">
              <Link
                href="/seja-revendedora"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 text-base min-h-[52px]"
              >
                Quero Ser Revendedora
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-5 text-sm text-neutral-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Sem mensalidade
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Suporte completo
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Entrega rápida
              </span>
            </div>
          </div>

          {/* Right: product photo grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-square shadow-md">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────

const stats = [
  { icon: Users, value: "500+", label: "Revendedoras ativas" },
  { icon: Package, value: "200+", label: "Produtos no catálogo" },
  { icon: Star, value: "4.9/5", label: "Avaliação média" },
  { icon: TrendingUp, value: "40%", label: "Margem de lucro" },
];

function StatsSection() {
  return (
    <section className="py-12 bg-primary text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="flex justify-center mb-2">
                <s.icon className="w-6 h-6 text-pink-200" />
              </div>
              <div className="font-heading font-bold text-3xl md:text-4xl mb-1">{s.value}</div>
              <div className="text-pink-200 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Benefits ────────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: TrendingUp,
    title: "Margens Atrativas",
    description: "Lucre até 40% em cada venda. Quanto mais você vende, melhor fica seu desconto de revendedora.",
  },
  {
    icon: Heart,
    title: "Produtos que as Clientes Amam",
    description: "Maquiagem de alta qualidade a preços acessíveis. Suas clientes vão pedir de volta toda semana.",
  },
  {
    icon: Award,
    title: "Suporte e Treinamento",
    description: "Você não fica sozinha. Temos materiais de venda, grupo de suporte e consultoria personalizada.",
  },
];

function BenefitsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Por que escolher a Revendendo Make?
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2">
            Tudo que você precisa para prosperar
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((b) => (
            <div key={b.title} className="bg-neutral-50 rounded-2xl p-8 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary flex items-center justify-center mb-4">
                <b.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-neutral-900 mb-3">{b.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App Section ─────────────────────────────────────────────────────────────

function AppSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-900 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <span className="inline-block bg-primary/20 text-pink-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              Exclusivo para revendedoras
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
              Receba também o{" "}
              <span className="text-primary-400">Aplicativo</span>{" "}
              de Gestão de Vendas
            </h2>
            <p className="text-neutral-300 leading-relaxed mb-8">
              Ao se tornar revendedora, você recebe acesso ao nosso aplicativo exclusivo
              para controlar seus pedidos, clientes, estoque e comissões — tudo no celular.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Catálogo digital para mostrar para suas clientes",
                "Controle de pedidos e pagamentos",
                "Histórico completo de vendas",
                "Suporte direto com a equipe via app",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-200">
                  <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/seja-revendedora"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 min-h-[52px]"
            >
              Quero o App + Revenda
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Right: phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-[500px]">
              {/* Phone frame */}
              <div className="absolute inset-0 bg-neutral-800 rounded-[40px] border-4 border-neutral-600 shadow-2xl overflow-hidden">
                {/* Screen */}
                <div className="absolute inset-2 rounded-[32px] bg-gradient-to-br from-primary-900 via-primary-800 to-neutral-900 overflow-hidden">
                  {/* Status bar */}
                  <div className="flex items-center justify-between px-5 pt-4 pb-2">
                    <span className="text-xs text-white/60">9:41</span>
                    <div className="w-16 h-4 bg-black rounded-full mx-auto" />
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-white/20" />
                    </div>
                  </div>
                  {/* App header */}
                  <div className="px-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-primary-300" />
                      <span className="text-white font-bold text-sm">Revendendo Make</span>
                    </div>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {[
                      { label: "Vendas hoje", value: "R$ 340" },
                      { label: "Pedidos", value: "8" },
                      { label: "Clientes", value: "47" },
                      { label: "Comissão", value: "R$ 136" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/10 rounded-xl p-3">
                        <p className="text-white/50 text-xs">{item.label}</p>
                        <p className="text-white font-bold text-base">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  {/* Recent orders */}
                  <div className="px-3">
                    <p className="text-white/50 text-xs mb-2 px-1">Pedidos recentes</p>
                    {[
                      { name: "Maria S.", product: "Batom + Base", value: "R$ 89" },
                      { name: "Carla O.", product: "Paleta Sombras", value: "R$ 59" },
                      { name: "Ana P.", product: "Kit Labial", value: "R$ 49" },
                    ].map((order) => (
                      <div key={order.name} className="flex items-center justify-between bg-white/5 rounded-lg p-2 mb-1">
                        <div>
                          <p className="text-white text-xs font-medium">{order.name}</p>
                          <p className="text-white/40 text-xs">{order.product}</p>
                        </div>
                        <span className="text-green-400 text-xs font-bold">{order.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const steps = [
  {
    step: "01",
    title: "Cadastre-se Gratuitamente",
    description: "Preencha o formulário em 2 minutos. Sem taxa, sem burocracia. Nossa equipe entra em contato para te orientar.",
  },
  {
    step: "02",
    title: "Escolha seus Produtos",
    description: "Acesse nosso catálogo exclusivo com mais de 200 produtos e escolha o que tem mais saída na sua região.",
  },
  {
    step: "03",
    title: "Venda e Lucre",
    description: "Divulgue nas redes sociais, para amigas, no trabalho. Você recebe e repassa — simples assim.",
  },
];

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Como Funciona
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2">
            Simples, rápido e lucrativo
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-px bg-primary-200 -translate-x-1/2 z-0" />
              )}
              <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg mb-4">
                  {s.step}
                </div>
                <h3 className="font-heading font-bold text-xl text-neutral-900 mb-3">{s.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/seja-revendedora"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 min-h-[52px]"
          >
            Começar Agora — E Gratis
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Products (NOT clickable) ─────────────────────────────────────────────────

function ProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Produtos em Destaque
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2">
            O que está bombando agora
          </h2>
          <p className="text-neutral-500 mt-3 max-w-xl mx-auto">
            Produtos com alta saída e margem garantida para suas revendedoras.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            /* NOT wrapped in Link — not clickable */
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm"
            >
              <div className="relative h-48 md:h-56 bg-neutral-100">
                <Image
                  src={product.src}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <span className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {product.tag}
                </span>
              </div>
              <div className="p-4">
                <p className="text-xs text-neutral-400 uppercase tracking-wide mb-1">
                  {product.category}
                </p>
                <h3 className="font-heading font-semibold text-neutral-900 text-sm md:text-base leading-snug">
                  {product.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/seja-revendedora"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-10 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 min-h-[52px]"
          >
            Revenda Esses Produtos
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Brazil Coverage ──────────────────────────────────────────────────────────

const brazilStates = [
  "AC","AL","AM","AP","BA","CE","DF","ES","GO",
  "MA","MG","MS","MT","PA","PB","PE","PI","PR",
  "RJ","RN","RO","RR","RS","SC","SE","SP","TO",
];

function BrazilCoverageSection() {
  return (
    <section className="py-16 md:py-24 bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: map visual */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm aspect-square">
              <Image
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop&auto=format"
                alt="Fornecedores em todo o Brasil"
                fill
                className="object-cover rounded-3xl shadow-lg"
                sizes="400px"
              />
              {/* Overlay with state badges */}
              <div className="absolute inset-0 bg-primary/60 rounded-3xl flex flex-col items-center justify-center">
                <MapPin className="w-12 h-12 text-white mb-3" />
                <p className="text-white font-heading font-bold text-2xl text-center">
                  27 Estados
                </p>
                <p className="text-pink-200 text-sm mt-1">cobertura nacional</p>
              </div>
            </div>
          </div>

          {/* Right: copy + state grid */}
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Cobertura Nacional
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2 mb-4">
              Fornecedores em Todo o Brasil
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Nossa rede de fornecedores cobre todos os 27 estados brasileiros.
              Produtos entregues direto para você ou para sua cliente, com rapidez e segurança,
              independente de onde você mora.
            </p>

            {/* State badges */}
            <div className="flex flex-wrap gap-2 mb-8">
              {brazilStates.map((state) => (
                <span
                  key={state}
                  className="bg-primary-50 text-primary-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-primary-100"
                >
                  {state}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { value: "60+", label: "Fornecedores ativos" },
                { value: "27", label: "Estados cobertos" },
                { value: "3-5 dias", label: "Prazo médio de entrega" },
                { value: "10k+", label: "Revendedoras na rede" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-4 border border-neutral-100">
                  <p className="font-heading font-bold text-2xl text-primary">{item.value}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/seja-revendedora"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary-800 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 min-h-[52px]"
            >
              Entrar para a Rede
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Ana Paula S.",
    city: "São Paulo, SP",
    result: "Lucrou R$ 2.400 no 1 mes",
    text: "Nunca pensei que ia ganhar tanto dinheiro vendendo maquiagem. Os produtos são incríveis e as clientes adoram. Recomendo muito!",
    initials: "AP",
    stars: 5,
  },
  {
    id: 2,
    name: "Mariana C.",
    city: "Belo Horizonte, MG",
    result: "50 clientes em 3 meses",
    text: "A qualidade dos produtos fala por si só. Minhas clientes me indicam para amigas e a cartela só cresce. Suporte excelente!",
    initials: "MC",
    stars: 5,
  },
  {
    id: 3,
    name: "Juliana R.",
    city: "Recife, PE",
    result: "Renda extra de R$ 1.800/mes",
    text: "Comecei com medo, mas o suporte da equipe me deu confiança. Hoje tenho uma renda extra consistente que faz diferença.",
    initials: "JR",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Depoimentos
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2">
            Quem começou, não parou
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-neutral-700 leading-relaxed mb-5 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-neutral-900 text-sm">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.city}</p>
                </div>
              </div>
              <div className="mt-3 bg-primary-50 text-primary text-xs font-semibold px-3 py-1 rounded-full inline-block">
                {t.result}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-primary text-sm font-semibold uppercase tracking-widest">
              Nossa História
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-neutral-900 mt-2 mb-6">
              Nascemos para empoderar mulheres
            </h2>
            <p className="text-xl text-neutral-700 leading-relaxed mb-4">
              A <strong className="text-primary-700">Revendendo Make</strong> surgiu com um propósito claro:
              oferecer às mulheres brasileiras uma oportunidade real de renda,
              com liberdade, flexibilidade e produtos de alta qualidade.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-4">
              Sabemos que conciliar família, trabalho e sonhos pessoais não é fácil. Por
              isso, criamos um modelo de revenda que se adapta à sua rotina — você vende
              quando quiser, para quem quiser, no canal que preferir.
            </p>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Hoje, mais de 500 revendedoras em todo o Brasil confiam na Revendendo Make
              para complementar sua renda e transformar sua vida.
            </p>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
            >
              Conheça nossa história completa
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {[
              {
                icon: Heart,
                title: "Nossa Missão",
                text: "Empoderar mulheres por meio da beleza e do empreendedorismo.",
              },
              {
                icon: Sparkles,
                title: "Nossa Visão",
                text: "Ser a plataforma de revenda de maquiagem mais amada do Brasil.",
              },
              {
                icon: Award,
                title: "Nossos Valores",
                text: "Qualidade, transparência, suporte genuíno e resultados reais.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-neutral-100 shadow-sm"
              >
                <div className="w-10 h-10 bg-primary-100 text-primary-700 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-neutral-900 mb-1">{title}</h3>
                  <p className="text-neutral-600 text-sm leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-800 text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
          Pronta para começar sua jornada?
        </h2>
        <p className="text-lg text-pink-100 mb-4 leading-relaxed">
          Cadastre-se hoje, é gratuito. Nossa equipe vai te guiar do primeiro
          passo até sua primeira venda com sucesso.
        </p>
        {/* Urgency inline */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-lg px-4 py-2 mb-8 text-sm text-pink-100">
          <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          Apenas <strong className="text-white">7 vagas</strong> disponíveis hoje
        </div>
        <div>
          <Link
            href="/seja-revendedora"
            className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 text-primary font-bold px-10 py-5 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 text-lg min-h-[56px]"
          >
            Quero Ser Revendedora Agora
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <p className="text-sm text-pink-200 mt-4">
          Gratuito · Sem compromisso · Resposta em ate 24h
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
      <StatsSection />
      <BenefitsSection />
      <AppSection />
      <HowItWorksSection />
      <ProductsSection />
      <BrazilCoverageSection />
      <TestimonialsSection />
      <StorySection />
      <FinalCTASection />
      <PurchasePopup />
    </>
  );
}
