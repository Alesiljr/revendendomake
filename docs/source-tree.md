# Source Tree — Revendendo Make

**Referência:** Estrutura completa esperada do projeto. Use como guia de onde criar cada arquivo.

---

```
revendendomake/
├── src/
│   ├── app/
│   │   ├── layout.tsx                          # Root layout: fontes (Playfair + Inter), GA4, providers globais
│   │   ├── globals.css                         # Design tokens CSS (--color-*, --font-*, --space-*), Tailwind base
│   │   ├── not-found.tsx                       # Página 404 personalizada com links para home e catálogo
│   │   │
│   │   ├── (public)/                           # Route group — todas as páginas públicas do site
│   │   │   ├── layout.tsx                      # Layout público: Header + Footer + WhatsApp FAB
│   │   │   ├── page.tsx                        # Home — SSG + ISR 60s
│   │   │   │
│   │   │   ├── seja-revendedora/
│   │   │   │   └── page.tsx                    # Captação de leads — SSG, revalida via webhook
│   │   │   │
│   │   │   ├── produtos/
│   │   │   │   ├── page.tsx                    # Catálogo de produtos — SSG + ISR 60s
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                # Detalhe do produto — SSG + ISR 60s, generateStaticParams
│   │   │   │
│   │   │   ├── depoimentos/
│   │   │   │   └── page.tsx                    # Galeria de depoimentos — SSG + ISR 300s
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx                    # Listagem de artigos — SSG + ISR 60s
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx                # Artigo individual — SSG + ISR 300s
│   │   │   │   └── categoria/
│   │   │   │       └── [categoria]/
│   │   │   │           └── page.tsx            # Artigos por categoria
│   │   │   │
│   │   │   ├── sobre/
│   │   │   │   └── page.tsx                    # Sobre Nós — SSG + ISR 3600s, conteúdo do admin
│   │   │   │
│   │   │   ├── contato/
│   │   │   │   └── page.tsx                    # Contato — SSG, links WhatsApp e redes sociais
│   │   │   │
│   │   │   └── politica-privacidade/
│   │   │       └── page.tsx                    # Política de privacidade — texto configurável via admin
│   │   │
│   │   ├── admin/                              # Painel admin — SSR, protegido por middleware
│   │   │   ├── layout.tsx                      # Admin layout: sidebar + header + verificação de auth
│   │   │   ├── page.tsx                        # Redirect → /admin/dashboard
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx                    # Dashboard: métricas de leads, produtos, leads recentes
│   │   │   │
│   │   │   ├── produtos/
│   │   │   │   ├── page.tsx                    # Listagem de produtos com busca e filtros
│   │   │   │   ├── novo/
│   │   │   │   │   └── page.tsx                # Formulário de criação de produto
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx                # Formulário de edição de produto
│   │   │   │
│   │   │   ├── leads/
│   │   │   │   ├── page.tsx                    # Tabela de leads com filtros e exportação CSV
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx                # Detalhe do lead com histórico de status
│   │   │   │
│   │   │   ├── depoimentos/
│   │   │   │   ├── page.tsx                    # Listagem de depoimentos com aprovação
│   │   │   │   ├── novo/
│   │   │   │   │   └── page.tsx                # Formulário de criação de depoimento
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx                # Formulário de edição de depoimento
│   │   │   │
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx                    # Listagem de artigos com status
│   │   │   │   ├── novo/
│   │   │   │   │   └── page.tsx                # Editor de artigo com Tiptap + campos SEO
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx                # Edição de artigo existente
│   │   │   │
│   │   │   └── configuracoes/
│   │   │       └── page.tsx                    # Configurações: WhatsApp, redes sociais, textos, uploads
│   │   │
│   │   ├── login/
│   │   │   └── page.tsx                        # Tela de login do admin (email + senha via Supabase Auth)
│   │   │
│   │   └── api/
│   │       ├── leads/
│   │       │   ├── route.ts                    # POST — submissão de lead com rate limiting + Zod + Resend
│   │       │   └── export/
│   │       │       └── route.ts                # GET — exportação CSV de leads (admin autenticado)
│   │       ├── revalidate/
│   │       │   └── route.ts                    # POST — webhook ISR para revalidar páginas estáticas
│   │       └── auth/
│   │           └── callback/
│   │               └── route.ts                # Callback OAuth do Supabase Auth
│   │
│   ├── components/
│   │   ├── ui/                                 # Componentes shadcn/ui — gerados via `npx shadcn@latest add`
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── table.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── checkbox.tsx
│   │   │   ├── label.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── ...                             # Adicionar via CLI conforme necessário
│   │   │
│   │   ├── public/                             # Componentes das páginas públicas
│   │   │   ├── HeroSection.tsx                 # Hero com CTA primário e secundário
│   │   │   ├── BenefitsSection.tsx             # Grid de 3 benefícios com ícones Lucide
│   │   │   ├── HowItWorks.tsx                  # Passos ilustrados (Como Funciona)
│   │   │   ├── FeaturedProducts.tsx            # Grid de produtos em destaque (máx 6)
│   │   │   ├── TestimonialsCarousel.tsx        # Carrossel de depoimentos para a Home
│   │   │   ├── SocialFeedSection.tsx           # Embed Instagram/TikTok (lazy loaded)
│   │   │   ├── LeadForm.tsx                    # Formulário de captação com validação Zod + LGPD checkbox
│   │   │   ├── FaqAccordion.tsx                # FAQ da página Seja Revendedora
│   │   │   ├── ProductCard.tsx                 # Card de produto com botão WhatsApp contextual
│   │   │   ├── ProductGrid.tsx                 # Grid responsivo com filtros e busca
│   │   │   ├── ProductFilters.tsx              # Filtros de categoria e preço (client component)
│   │   │   ├── TestimonialCard.tsx             # Card de depoimento com foto, nome, resultado
│   │   │   ├── BlogPostCard.tsx                # Card de artigo com thumbnail, título, excerpt
│   │   │   ├── BlogGrid.tsx                    # Grid de artigos com busca e filtro por categoria
│   │   │   └── WhatsAppFAB.tsx                 # Botão flutuante WhatsApp — fixo bottom-right em todas as páginas
│   │   │
│   │   ├── admin/                              # Componentes do painel administrativo
│   │   │   ├── AdminSidebar.tsx                # Navegação lateral com ícones Lucide e badge de leads novos
│   │   │   ├── AdminHeader.tsx                 # Header do admin com nome da página e botão logout
│   │   │   ├── MetricCard.tsx                  # Card de métrica do dashboard (valor + label + ícone)
│   │   │   ├── LeadsTable.tsx                  # Tabela de leads com filtros e paginação
│   │   │   ├── ProductsTable.tsx               # Tabela de produtos com toggles ativo/destaque
│   │   │   ├── TestimonialsTable.tsx           # Tabela de depoimentos com aprovação inline
│   │   │   ├── BlogTable.tsx                   # Tabela de artigos com status publicado/rascunho
│   │   │   ├── ImageUpload.tsx                 # Upload múltiplo para Supabase Storage com preview
│   │   │   ├── RichTextEditor.tsx              # Wrapper do Tiptap com toolbar customizada
│   │   │   ├── StatusBadge.tsx                 # Badge colorido para status de lead/depoimento/artigo
│   │   │   ├── ConfirmDialog.tsx               # Modal de confirmação para ações destrutivas
│   │   │   └── AdminErrorBoundary.tsx          # Error boundary para seções do admin
│   │   │
│   │   └── layout/                             # Componentes de layout compartilhados
│   │       ├── Header.tsx                      # Header público: logo, navegação, hamburger mobile
│   │       ├── Footer.tsx                      # Footer: links sociais, navegação, copyright
│   │       ├── MobileDrawer.tsx                # Menu drawer para mobile (hamburger)
│   │       └── Providers.tsx                   # Client providers: Toaster, etc.
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts                       # Supabase browser client (singleton para Client Components)
│   │   │   ├── server.ts                       # Supabase server client (com cookies para Server Components)
│   │   │   ├── middleware.ts                   # Supabase auth middleware helper
│   │   │   └── types.ts                        # Tipos gerados via `supabase gen types` — NUNCA editar manualmente
│   │   │
│   │   ├── validations/
│   │   │   ├── lead.ts                         # Zod schema para formulário de captação de lead
│   │   │   ├── product.ts                      # Zod schema para criação/edição de produto
│   │   │   ├── testimonial.ts                  # Zod schema para depoimento
│   │   │   └── post.ts                         # Zod schema para artigo de blog
│   │   │
│   │   ├── utils/
│   │   │   ├── whatsapp.ts                     # buildWhatsAppLink() + WHATSAPP_MESSAGES constants
│   │   │   ├── slug.ts                         # Gerador de slugs a partir de texto em pt-BR
│   │   │   ├── format.ts                       # formatPrice(), formatDate(), formatPhone() — locale pt-BR
│   │   │   ├── seo.ts                          # organizationSchema(), productSchema(), articleSchema(), breadcrumbSchema()
│   │   │   ├── csv.ts                          # generateLeadsCSV() para exportação de leads
│   │   │   └── cn.ts                           # cn() utility — clsx + tailwind-merge
│   │   │
│   │   └── resend/
│   │       └── emails.ts                       # sendLeadNotification() — template de email para novo lead
│   │
│   ├── hooks/
│   │   ├── useLeadForm.ts                      # State + submit + validação do formulário de captação
│   │   ├── useProductFilters.ts                # State dos filtros (categoria, preço, busca) do catálogo
│   │   ├── useSiteSettings.ts                  # Leitura das configurações do site (WhatsApp, redes sociais)
│   │   └── useDebounce.ts                      # Debounce para campos de busca em tempo real
│   │
│   ├── types/
│   │   ├── database.ts                         # Tipos do Supabase (gerados pelo CLI + extensões manuais)
│   │   ├── site-settings.ts                    # Tipo SiteSettings extraído da tabela site_settings
│   │   └── index.ts                            # Re-exports de todos os tipos públicos
│   │
│   └── middleware.ts                           # Next.js middleware: proteção /admin/*, redirect /login
│
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql              # DDL completo: tabelas, enums, índices, triggers, RLS policies
│   └── seed.sql                                # Dados iniciais: row em site_settings, categorias padrão
│
├── public/
│   ├── images/
│   │   └── og-default.jpg                      # Imagem Open Graph padrão (1200x630px)
│   └── icons/
│       └── favicon.ico                         # Favicon padrão (substituído via admin)
│
├── middleware.ts                               # Next.js middleware (raiz do projeto)
├── next.config.ts                              # Config Next.js: remotePatterns Supabase, security headers, images
├── next-sitemap.config.js                      # Config next-sitemap: siteUrl, exclude /admin, robots.txt
├── tailwind.config.ts                          # Config Tailwind: design tokens, fontes, breakpoints customizados
├── tsconfig.json                               # TypeScript strict mode + paths @/* → ./src/*
├── package.json                                # Dependências e scripts npm
├── .env.local.example                          # Template de variáveis de ambiente (sem valores reais)
├── .env.local                                  # Variáveis de ambiente locais — NUNCA versionar no Git
├── .gitignore                                  # node_modules, .env.local, .next, etc.
└── .eslintrc.json                              # Configuração ESLint (Next.js + TypeScript)
```

---

## Notas de Estrutura

### Route Groups

O diretório `(public)` é um route group do Next.js App Router — não aparece na URL. Serve apenas para organizar as páginas públicas e aplicar um layout compartilhado (Header, Footer, WhatsApp FAB).

### Imports Absolutos

O alias `@/` mapeia para `./src/`. Sempre usar:
- `@/components/ui/button` — não `../../components/ui/button`
- `@/lib/supabase/server` — não `../../../lib/supabase/server`

### Tipos Gerados

`src/lib/supabase/types.ts` é gerado automaticamente pelo Supabase CLI. Nunca editar manualmente. Regenerar com:
```bash
npm run type-gen
```

### shadcn/ui

Componentes em `src/components/ui/` são gerados via CLI e podem ser customizados localmente:
```bash
npx shadcn@latest add button card input dialog table
```

---

*Synkra AIOX — @po (Pax) — Source tree v1.0*
