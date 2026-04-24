# Epic 3 — SEO & Conteúdo

**Projeto:** Revendendo Make  
**Epic:** 3 de 5  
**Objetivo:** Implementar todas as funcionalidades de SEO técnico, sistema de blog e integração de redes sociais.  
**Critério de Conclusão:** Lighthouse SEO ≥ 90 em todas as páginas, sitemap.xml e robots.txt funcionais, artigos publicáveis pelo admin, Schema.org validado no Google Rich Results Test.  
**Prioridade:** MUST (Story 3.2) | SHOULD (Stories 3.1, 3.3)

**Pré-requisito obrigatório:** Epic 1 completo + Epic 2 completo (páginas públicas existentes para aplicar SEO).

**Documentos de referência:**
- `docs/tech-stack.md` — stack e variáveis de ambiente
- `docs/coding-standards.md` — padrões de código
- `docs/source-tree.md` — onde criar os arquivos
- `docs/fullstack-architecture.md` — seção 8 (Arquitetura de SEO), Schema.org, sitemap config
- `docs/prd.md` — FR-005 (Blog), FR-008 (Redes Sociais), FR-015 (SEO Técnico)

---

## Story 3.1 — Blog — Sistema de Artigos

**Prioridade:** SHOULD  
**FR associado:** FR-005  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4, Story 4.6 (admin de blog para criar conteúdo)  
**Nota:** Esta story pode ser desenvolvida em paralelo com Story 4.6, mas depende que a tabela `posts` exista (Story 1.4).  
**Estimativa:** 2–3 dias

### Descrição

Sistema de blog completo no site público. Permite à proprietária publicar artigos sobre maquiagem, revenda e dicas de empreendedorismo via painel admin, gerando tráfego orgânico via SEO. Apenas artigos com `status = 'published'` são exibidos publicamente.

### Acceptance Criteria

#### Listagem de Artigos (/blog)

- [ ] Grid responsivo de artigos com: thumbnail (cover_image), título, excerpt (resumo), data de publicação formatada em pt-BR, categoria
- [ ] Apenas artigos com `status = 'published'` e `published_at <= NOW()` são exibidos
- [ ] Artigos ordenados por `published_at DESC` (mais recentes primeiro)
- [ ] Filtro/navegação por categoria (links para `/blog/categoria/{categoria}`)
- [ ] Campo de busca por palavra-chave (filtra título e excerpt)
- [ ] Estado vazio (sem artigos publicados): mensagem amigável com CTA para WhatsApp
- [ ] ISR com revalidação de 60s; revalida via webhook ao publicar/despublicar artigo

#### Página de Artigo Individual (/blog/[slug])

- [ ] `generateStaticParams()` gera páginas para todos os artigos publicados
- [ ] Exibe: imagem de capa com alt text, título (H1), data de publicação em pt-BR, autor (fixo: "Revendendo Make"), categoria, corpo do artigo (renderizado a partir do JSON Tiptap)
- [ ] Renderização do Tiptap JSON: cabeçalhos H2/H3, negrito, itálico, listas, links, imagens, blocos de código
- [ ] Links internos para produtos do catálogo funcionam corretamente dentro dos artigos
- [ ] Seção "Artigos Relacionados" ao final: mínimo 2 sugestões da mesma categoria (se existirem)
- [ ] CTA para "Seja Revendedora" ao final do artigo
- [ ] Breadcrumb: Home > Blog > {Título do Artigo}
- [ ] Página 404 personalizada se artigo não encontrado ou não publicado

#### Categoria de Artigos (/blog/categoria/[categoria])

- [ ] Lista de artigos filtrados pela categoria
- [ ] Título da página: "Artigos sobre {categoria}"
- [ ] Comportamento idêntico à listagem principal, mas filtrado

#### SEO do Blog

- [ ] `generateMetadata()` em cada artigo com: title (meta_title ou título do artigo), description (meta_description ou excerpt), OG tags, Twitter Card
- [ ] Schema.org `Article` como JSON-LD em cada artigo (via `seo.ts`)
- [ ] Schema inclui: headline, description, image, author, publisher (Revendendo Make com logo), datePublished, dateModified, mainEntityOfPage
- [ ] URLs canônicas em cada artigo

### Fora de Escopo

- Editor de artigos (Story 4.6)
- Comentários em artigos (não previsto na v1)
- Newsletter/assinatura de blog (não previsto na v1)

---

## Story 3.2 — SEO Técnico

**Prioridade:** MUST  
**FR associado:** FR-015  
**Pré-requisitos:** Stories 1.2, 1.3, Epic 2 completo (todas as páginas públicas existentes)  
**Estimativa:** 2–3 dias

### Descrição

Implementação de todos os elementos técnicos de SEO para maximizar a visibilidade orgânica no Google. Inclui metadata dinâmica em todas as páginas, Open Graph, sitemap.xml automático, robots.txt, Schema.org markup, canonical tags e página 404 personalizada.

### Acceptance Criteria

#### Metadata e Open Graph — Todas as Páginas Públicas

- [ ] `generateMetadata()` implementado em todas as páginas públicas com title e description únicos e otimizados:
  - Home: "Revendendo Make — Revenda Maquiagem de Qualidade"
  - Seja Revendedora: "Seja Revendedora — Ganhe com Maquiagem de Qualidade | Revendendo Make"
  - Catálogo: "Catálogo de Produtos | Revendendo Make"
  - Produto individual: "{Nome do Produto} | Revendendo Make"
  - Depoimentos: "Depoimentos de Revendedoras | Revendendo Make"
  - Blog: "Blog — Dicas de Maquiagem e Revenda | Revendendo Make"
  - Artigo individual: "{Meta title do artigo} | Revendendo Make"
  - Sobre Nós: "Sobre Nós | Revendendo Make"
  - Contato: "Contato | Revendendo Make"
- [ ] Tags Open Graph em todas as páginas: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:locale: 'pt_BR'`, `og:site_name: 'Revendendo Make'`
- [ ] Twitter Card tags em todas as páginas: `twitter:card: 'summary_large_image'`, `twitter:title`, `twitter:description`, `twitter:image`
- [ ] Imagem OG padrão (`site_settings.og_image_url`, 1200x630px) usada como fallback em páginas sem imagem específica
- [ ] URLs canônicas (`alternates.canonical`) em todas as páginas

#### Sitemap e Robots.txt

- [ ] `next-sitemap` configurado em `next-sitemap.config.js`:
  - `siteUrl: 'https://revendendomake.com.br'`
  - `generateRobotsTxt: true`
  - Excluir: `/admin`, `/admin/*`, `/login`, `/api/*`
- [ ] `sitemap.xml` acessível em `https://revendendomake.com.br/sitemap.xml` após build
- [ ] `robots.txt` acessível em `https://revendendomake.com.br/robots.txt` com:
  - `Allow: /` para todas as páginas públicas
  - `Disallow: /admin`, `Disallow: /api`, `Disallow: /login`
  - Link para o sitemap
- [ ] Sitemap inclui todas as páginas públicas estáticas e dinâmicas (produtos e artigos)
- [ ] `changefreq: 'weekly'` e `priority: 0.8` para páginas de produto e artigo
- [ ] `changefreq: 'monthly'` e `priority: 0.7` para páginas estáticas

#### Schema.org Markup (JSON-LD)

Todos os schemas são inseridos como `<script type="application/ld+json">` via Server Component.

- [ ] `Organization` na Home (via `seo.ts` → `organizationSchema()`):
  - name, url, logo, sameAs (Instagram, TikTok, Facebook, YouTube)
  - contactPoint com availableLanguage: Portuguese
- [ ] `Product` em cada página de produto (via `seo.ts` → `productSchema()`):
  - name, description, image, offers (priceCurrency: BRL, price, availability: InStock)
- [ ] `Article` em cada artigo de blog (via `seo.ts` → `articleSchema()`):
  - headline, description, image, author, publisher (Revendendo Make), datePublished, dateModified
- [ ] `BreadcrumbList` em páginas internas (via `seo.ts` → `breadcrumbSchema()`):
  - Produto: Home > Produtos > {Nome}
  - Artigo: Home > Blog > {Título}
  - Demais páginas internas conforme hierarquia
- [ ] Schema.org validado via Google Rich Results Test antes de marcar como completo

#### Heading Hierarchy

- [ ] H1 único por página em todas as páginas públicas (verificação manual)
- [ ] H2/H3 hierárquicos e semânticos (H3 nunca aparece sem H2 pai)
- [ ] Nenhum heading pulado (H1 → H2 → H3, não H1 → H3)

#### Alt Text nas Imagens

- [ ] Todas as imagens de produto usam `product.alt_text ?? product.name` como alt
- [ ] Todas as imagens de artigo usam `post.cover_image_alt ?? post.title` como alt
- [ ] Imagens decorativas (sem conteúdo semântico) usam `alt=""`
- [ ] `WhatsAppFAB` tem `aria-label="Falar no WhatsApp"` (sem texto visível)

#### Página 404

- [ ] `src/app/not-found.tsx` implementado com:
  - Mensagem amigável em pt-BR
  - Link para Home
  - Link para Catálogo de Produtos
  - WhatsApp FAB presente

#### Lighthouse SEO

- [ ] Lighthouse SEO Score ≥ 90 nas páginas: Home, Seja Revendedora, Catálogo, pelo menos 1 produto individual
- [ ] Zero erros críticos de SEO no Lighthouse

### Fora de Escopo

- Submissão do sitemap ao Google Search Console (Story 5.4)
- Analytics (Story 5.3)
- Performance de imagens (Story 5.1)

---

## Story 3.3 — Integração Redes Sociais

**Prioridade:** SHOULD  
**FR associado:** FR-008  
**Pré-requisitos:** Story 2.1 (Home implementada), Story 3.2 (Open Graph implementado)  
**Estimativa:** 1–2 dias

### Descrição

Implementação da seção de embed de redes sociais na Home e confirmação de que Open Graph e Twitter Cards estão funcionando corretamente para compartilhamentos nas redes sociais.

### Acceptance Criteria

#### Embed de Redes Sociais na Home

- [ ] Seção na Home com embed de posts recentes do Instagram e/ou TikTok:
  - Opção 1: oEmbed/widget oficial do Instagram (via `<blockquote>` + script do Instagram)
  - Opção 2: widget do TikTok (via `<blockquote>` + script do TikTok)
  - Decisão: usar oEmbed/widget oficial (sem custo, sem API paga)
- [ ] Embeds carregam de forma lazy — não bloqueiam o first load da página
- [ ] Script dos embeds carregado com `strategy="lazyOnload"` (Next.js Script component)
- [ ] Fallback gracioso se embed falhar: link para o perfil social com ícone e texto "Siga no Instagram/TikTok" em vez do embed
- [ ] Embed não causa layout shift (CLS = 0 na área do embed)

#### Links de Redes Sociais

- [ ] Header: ícones para Instagram, TikTok, Facebook, YouTube — todos com `aria-label` descritivo
- [ ] Footer: ícones para Instagram, TikTok, Facebook, YouTube
- [ ] URLs dos perfis sociais lidas de `site_settings` (instagram_url, tiktok_url, facebook_url, youtube_url)
- [ ] Links que não têm URL configurada não são exibidos (não quebram o layout com links vazios)
- [ ] Todos os links de redes sociais abrem em nova aba (`target="_blank" rel="noopener noreferrer"`)

#### Open Graph e Compartilhamento

- [ ] Testar compartilhamento da Home no Facebook Debug Tool: título, descrição e imagem exibidos corretamente
- [ ] Testar compartilhamento de produto no WhatsApp: preview com imagem e título corretos
- [ ] Testar compartilhamento de artigo de blog: Schema.org Article reconhecido
- [ ] Imagem OG padrão configurável via admin (`site_settings.og_image_url`, 1200x630px recomendado)

### Fora de Escopo

- Feed automático de redes sociais em tempo real (sem API paga)
- Stories do Instagram embutidos
- Gestão de redes sociais pelo admin (apenas URLs configuradas)

---

*Epic 3 — Total: 3 stories | Estimativa total: 5–8 dias*  
*Synkra AIOX — @po (Pax) — v1.0*
