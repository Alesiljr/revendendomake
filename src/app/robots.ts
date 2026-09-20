import type { MetadataRoute } from "next";

// Domínio real do site, confirmado com o usuário em 20/09/2026.
// Atenção: o `metadataBase` do layout.tsx ainda aponta para revendendomake.com.br,
// que NÃO existe em DNS. Corrigir lá também quando for mexer naquele arquivo.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.revendendomake.shop";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Área interna e rotas de sistema não entram em buscador.
      disallow: ["/admin", "/login", "/convite", "/api"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
