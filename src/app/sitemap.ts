import type { MetadataRoute } from "next";

// Domínio real do site, confirmado com o usuário em 20/09/2026.
// Atenção: o `metadataBase` do layout.tsx ainda aponta para revendendomake.com.br,
// que NÃO existe em DNS. Corrigir lá também quando for mexer naquele arquivo.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.revendendomake.shop";

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
