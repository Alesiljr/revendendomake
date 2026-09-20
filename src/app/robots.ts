import type { MetadataRoute } from "next";

// O domínio revendendomake.com.br ainda não existe (não resolve em DNS).
// Hoje o site vive no endereço da Vercel. Quando o domínio próprio entrar,
// basta definir NEXT_PUBLIC_SITE_URL e estes arquivos acompanham sozinhos.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://revendendomake.vercel.app";

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
