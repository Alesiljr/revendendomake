import type { MetadataRoute } from "next";

// O domínio revendendomake.com.br ainda não existe (não resolve em DNS).
// Hoje o site vive no endereço da Vercel. Quando o domínio próprio entrar,
// basta definir NEXT_PUBLIC_SITE_URL e estes arquivos acompanham sozinhos.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revendendomake.vercel.app";

// Só as páginas públicas. /admin, /login e /convite ficam de fora de propósito.
const PAGINAS_PUBLICAS: Array<{
  caminho: string;
  prioridade: number;
  frequencia: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { caminho: "/", prioridade: 1, frequencia: "weekly" },
  { caminho: "/seja-revendedora", prioridade: 0.9, frequencia: "weekly" },
  { caminho: "/produtos", prioridade: 0.8, frequencia: "weekly" },
  { caminho: "/depoimentos", prioridade: 0.7, frequencia: "monthly" },
  { caminho: "/blog", prioridade: 0.7, frequencia: "weekly" },
  { caminho: "/sobre", prioridade: 0.5, frequencia: "monthly" },
  { caminho: "/politica-privacidade", prioridade: 0.3, frequencia: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  return PAGINAS_PUBLICAS.map(({ caminho, prioridade, frequencia }) => ({
    url: `${SITE_URL}${caminho}`,
    lastModified: agora,
    changeFrequency: frequencia,
    priority: prioridade,
  }));
}
