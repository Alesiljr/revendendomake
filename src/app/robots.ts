import type { MetadataRoute } from "next";

const SITE_URL = "https://revendendomake.com.br";

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
