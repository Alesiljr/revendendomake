export type DemoProduct = {
  id: string;
  name: string;
  description: string;
  category: string;
  suggested_price: number;
  cost_price: number;
  stock: number;
  active: boolean;
  featured: boolean;
  emoji: string;
};

export type DemoLead = {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  status: "novo" | "contatado" | "convertido" | "descartado";
  created_at: string;
  source: string;
};

export type DemoTestimonial = {
  id: string;
  reseller_name: string;
  city: string;
  result_text: string;
  rating: number;
  approved: boolean;
};

export const demoProducts: DemoProduct[] = [
  { id: "1", name: "Batom Vermelho Intenso", description: "Batom cremoso de longa duração, cor vermelho clássico.", category: "Batons", suggested_price: 29.90, cost_price: 12.00, stock: 45, active: true, featured: true, emoji: "💄" },
  { id: "2", name: "Base Líquida FPS 30", description: "Cobertura média a alta, fórmula leve para pele mista.", category: "Bases", suggested_price: 49.90, cost_price: 20.00, stock: 30, active: true, featured: true, emoji: "🫙" },
  { id: "3", name: "Paleta de Sombras Nude", description: "12 cores neutras para looks do dia a dia.", category: "Sombras", suggested_price: 59.90, cost_price: 22.00, stock: 25, active: true, featured: true, emoji: "🎨" },
  { id: "4", name: "Máscara de Cílios Volume", description: "Fórmula de volume extremo, resistente à água.", category: "Máscaras", suggested_price: 34.90, cost_price: 14.00, stock: 60, active: true, featured: false, emoji: "👁️" },
  { id: "5", name: "Blush Rosê Duochrome", description: "Blush rosê com brilho sofisticado.", category: "Blush", suggested_price: 39.90, cost_price: 16.00, stock: 20, active: true, featured: false, emoji: "🌸" },
  { id: "6", name: "Gloss Labial Hidratante", description: "Hidratação e brilho para os lábios.", category: "Batons", suggested_price: 19.90, cost_price: 8.00, stock: 80, active: true, featured: false, emoji: "✨" },
];

export const demoLeads: DemoLead[] = [
  { id: "1", name: "Ana Lima", phone: "(11) 98765-4321", city: "São Paulo", state: "SP", status: "novo", created_at: "2026-04-24T10:30:00Z", source: "seja-revendedora" },
  { id: "2", name: "Carla Santos", phone: "(21) 97654-3210", city: "Rio de Janeiro", state: "RJ", status: "contatado", created_at: "2026-04-23T14:15:00Z", source: "tiktok" },
  { id: "3", name: "Maria Oliveira", phone: "(31) 96543-2109", city: "Belo Horizonte", state: "MG", status: "convertido", created_at: "2026-04-22T09:00:00Z", source: "instagram" },
  { id: "4", name: "Fernanda Costa", phone: "(41) 95432-1098", city: "Curitiba", state: "PR", status: "novo", created_at: "2026-04-24T08:45:00Z", source: "youtube" },
  { id: "5", name: "Juliana Pereira", phone: "(51) 94321-0987", city: "Porto Alegre", state: "RS", status: "contatado", created_at: "2026-04-21T16:20:00Z", source: "seja-revendedora" },
  { id: "6", name: "Patrícia Souza", phone: "(85) 93210-9876", city: "Fortaleza", state: "CE", status: "descartado", created_at: "2026-04-20T11:10:00Z", source: "direct" },
];

export const demoTestimonials: DemoTestimonial[] = [
  { id: "1", reseller_name: "Camila R.", city: "São Paulo, SP", result_text: "Comecei do zero e em 2 meses já faturei R$ 1.800! O suporte é incrível.", rating: 5, approved: true },
  { id: "2", reseller_name: "Letícia M.", city: "Campinas, SP", result_text: "Achei que seria difícil, mas as clientes adoraram os produtos. Já estou no meu 3º pedido.", rating: 5, approved: true },
  { id: "3", reseller_name: "Bianca T.", city: "Rio de Janeiro, RJ", result_text: "Trabalho de casa, no meu tempo livre, e já complemento minha renda em R$ 900/mês.", rating: 5, approved: true },
];
