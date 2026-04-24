# Arquitetura Full-Stack — Revendendo Make

**Projeto:** Revendendo Make — Website Profissional  
**Versão:** 1.0  
**Data:** 24 de abril de 2026  
**Status:** Aprovado para Desenvolvimento  
**Autora:** Aria (@architect) — Synkra AIOX  
**Baseado em:** `docs/project-brief.md`, `docs/prd.md`, `docs/front-end-spec.md`

---

## Índice

1. [Visão Geral do Sistema](#1-visão-geral-do-sistema)
2. [Arquitetura da Aplicação](#2-arquitetura-da-aplicação)
3. [Schema do Banco de Dados](#3-schema-do-banco-de-dados-supabasepostgresql)
4. [Design das Rotas de API](#4-design-das-rotas-de-api)
5. [Autenticação e Segurança](#5-autenticação-e-segurança)
6. [Arquitetura de Deploy](#6-arquitetura-de-deploy)
7. [Arquitetura de Performance](#7-arquitetura-de-performance)
8. [Arquitetura de SEO](#8-arquitetura-de-seo)
9. [Análise de Impacto nas Stories do PRD](#9-análise-de-impacto-nas-stories-do-prd)
10. [Diretrizes de Desenvolvimento](#10-diretrizes-de-desenvolvimento)

---

## 1. Visão Geral do Sistema

### 1.1 Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USUÁRIOS                                    │
│  [Revendedora Potencial]  [Comprador Final]  [Proprietária/Admin]   │
│        (mobile 4G)            (mobile)          (notebook/celular)  │
└───────────────┬──────────────────┬──────────────────┬──────────────┘
                │                  │                  │
                ▼                  ▼                  ▼
┌──────────────────────────────────────────────────────────────────┐
│                        VERCEL EDGE NETWORK                        │
│              (CDN Global + SSL/TLS automático)                    │
│                   revendendomake.com.br                           │
└─────────────────────────────┬────────────────────────────────────┘
                              │
                ┌─────────────▼─────────────┐
                │    NEXT.JS 15 (App Router) │
                │    Runtime: Node.js        │
                │                           │
                │  ┌───────────────────┐    │
                │  │ Páginas Públicas  │    │
                │  │ (SSG + ISR)       │    │
                │  │ /                 │    │
                │  │ /seja-revendedora │    │
                │  │ /produtos/[slug]  │    │
                │  │ /depoimentos      │    │
                │  │ /blog/[slug]      │    │
                │  │ /sobre            │    │
                │  └───────────────────┘    │
                │                           │
                │  ┌───────────────────┐    │
                │  │ Painel Admin      │    │
                │  │ (SSR + Auth)      │    │
                │  │ /admin/*          │    │
                │  └───────────────────┘    │
                │                           │
                │  ┌───────────────────┐    │
                │  │ API Routes        │    │
                │  │ /api/leads        │    │
                │  │ /api/revalidate   │    │
                │  │ /api/auth/*       │    │
                │  └───────────────────┘    │
                └─────────────┬─────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
┌──────────────┐   ┌───────────────────┐  ┌──────────────┐
│   SUPABASE   │   │     RESEND        │  │   GOOGLE     │
│              │   │  (Notificações    │  │  ANALYTICS 4 │
│  PostgreSQL  │   │   de novos leads  │  │              │
│  Auth        │   │   por e-mail)     │  │  (Analytics  │
│  Storage     │   └───────────────────┘  │   de tráfego)│
│  (Imagens)   │                          └──────────────┘
└──────────────┘
```

### 1.2 Decisões Arquiteturais Chave

| Decisão | Escolha | Justificativa |
|---------|---------|---------------|
| Renderização | SSG + ISR para público, SSR para admin | SEO máximo nas páginas públicas + dados sempre frescos no admin sem rebuilds completos |
| Banco de Dados | Supabase (PostgreSQL) | Auth integrado, Storage para imagens, RLS nativo, SDK TypeScript, free tier generoso |
| Hosting | Vercel | Deploy zero-config para Next.js, CDN edge global, preview deployments, domínio customizado gratuito |
| Autenticação | Supabase Auth (email/senha) | Single admin, sem complexidade de multi-tenant, JWT gerenciado pelo Supabase |
| Notificações de Leads | Resend | API simples, confiável, free tier (3.000 emails/mês) suficiente para o volume inicial |
| Rich Text | Tiptap | Open source, React nativo, JSON serializável (ideal para armazenar no PostgreSQL como JSONB) |
| Estilização | Tailwind CSS + shadcn/ui | Mobile-first por padrão, zero CSS morto, tokens de design do front-end-spec mapeáveis como variáveis CSS |
| Animações | Framer Motion | API declarativa, SSR compatível, animations acessíveis (respeita `prefers-reduced-motion`) |

### 1.3 Stack Tecnológica Completa

| Camada | Tecnologia | Versão | Justificativa |
|--------|-----------|--------|---------------|
| **Framework** | Next.js App Router | 15.x | SSG/ISR/SSR nativos, metadata API, server components, route handlers — tudo necessário para este projeto |
| **Linguagem** | TypeScript | 5.x | Type safety — previne bugs em runtime, especialmente na integração com Supabase |
| **Estilização** | Tailwind CSS | 3.x | Mobile-first, purge automático, tokens do front-end-spec mapeiam diretamente como CSS variables |
| **Componentes UI** | shadcn/ui | latest | Acessível (radix-ui), sem lock-in de vendor, compatível com Tailwind — perfeito para admin |
| **Animações** | Framer Motion | 11.x | SSR seguro, `prefers-reduced-motion` respeitado, API declarativa |
| **Ícones** | Lucide React | latest | Tree-shakeable, open source, 1000+ ícones — alinhado com front-end-spec |
| **Banco** | Supabase PostgreSQL | latest | Relacional (ideal para produtos/leads), Auth + Storage integrados, RLS nativo |
| **Auth** | Supabase Auth | latest | JWT, session management, middleware helpers para Next.js |
| **Storage** | Supabase Storage | latest | CDN integrado, signed URLs, transformações de imagem |
| **Deploy** | Vercel | latest | Native Next.js, edge network, HTTPS automático, preview PRs |
| **Email** | Resend | latest | API REST simples, React Email templates, 3.000 emails/mês grátis |
| **Rich Text** | Tiptap | 2.x | JSON output (JSONB no Postgres), React nativo, extensível |
| **Validação** | Zod | 3.x | Runtime type safety para inputs de API e formulários |
| **Sitemap** | next-sitemap | 4.x | Geração automática no build, suporte a ISR revalidation |
| **Analytics** | Google Analytics 4 | — | Padrão de mercado, integra com Search Console, gratuito |
| **Monitoramento** | Vercel Analytics | — | Core Web Vitals por rota sem código extra |

---

## 2. Arquitetura da Aplicação

### 2.1 Estrutura do Next.js App Router

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (fontes, GA4, providers globais)
│   ├── globals.css                   # Design tokens CSS, Tailwind base
│   ├── not-found.tsx                 # Página 404 customizada
│   │
│   ├── (public)/                     # Route group — páginas públicas
│   │   ├── layout.tsx                # Header + Footer + WhatsApp FAB
│   │   ├── page.tsx                  # Home (SSG + ISR 60s)
│   │   │
│   │   ├── seja-revendedora/
│   │   │   └── page.tsx              # Página captação de leads (SSG)
│   │   │
│   │   ├── produtos/
│   │   │   ├── page.tsx              # Catálogo (SSG + ISR 60s)
│   │   │   └── [slug]/
│   │   │       └── page.tsx          # Detalhe do produto (SSG + ISR 60s)
│   │   │
│   │   ├── depoimentos/
│   │   │   └── page.tsx              # Galeria de depoimentos (SSG + ISR 60s)
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx              # Listagem de artigos (SSG + ISR 60s)
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx          # Artigo individual (SSG + ISR 60s)
│   │   │   └── categoria/
│   │   │       └── [categoria]/
│   │   │           └── page.tsx      # Artigos por categoria
│   │   │
│   │   ├── sobre/
│   │   │   └── page.tsx              # Sobre Nós (SSG + ISR 3600s)
│   │   │
│   │   └── contato/
│   │       └── page.tsx              # Contato (SSG)
│   │
│   ├── admin/                        # Rota admin (SSR, protegida por middleware)
│   │   ├── layout.tsx                # Admin layout: sidebar + header + auth check
│   │   ├── page.tsx                  # Redirect → /admin/dashboard
│   │   │
│   │   ├── dashboard/
│   │   │   └── page.tsx              # Dashboard com métricas e leads recentes
│   │   │
│   │   ├── produtos/
│   │   │   ├── page.tsx              # Listagem de produtos
│   │   │   ├── novo/
│   │   │   │   └── page.tsx          # Formulário criação de produto
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Formulário edição de produto
│   │   │
│   │   ├── leads/
│   │   │   ├── page.tsx              # Tabela de leads com filtros
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Detalhe do lead
│   │   │
│   │   ├── depoimentos/
│   │   │   ├── page.tsx              # Listagem de depoimentos
│   │   │   ├── novo/
│   │   │   │   └── page.tsx          # Formulário criação
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Formulário edição
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx              # Listagem de artigos
│   │   │   ├── novo/
│   │   │   │   └── page.tsx          # Editor de artigo
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Edição de artigo
│   │   │
│   │   └── configuracoes/
│   │       └── page.tsx              # Configurações gerais do site
│   │
│   ├── login/
│   │   └── page.tsx                  # Tela de login do admin
│   │
│   └── api/
│       ├── leads/
│       │   └── route.ts              # POST — submissão de lead do formulário público
│       ├── leads/
│       │   └── export/
│       │       └── route.ts          # GET — exportação CSV de leads (admin)
│       ├── revalidate/
│       │   └── route.ts              # POST — webhook ISR revalidation
│       └── auth/
│           └── callback/
│               └── route.ts          # Callback OAuth Supabase Auth
│
├── components/
│   ├── ui/                           # shadcn/ui components (gerados via CLI)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── toast.tsx
│   │   └── ...
│   │
│   ├── public/                       # Componentes das páginas públicas
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── FeaturedProducts.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── SocialFeedSection.tsx
│   │   ├── LeadForm.tsx
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── TestimonialCard.tsx
│   │   ├── BlogPostCard.tsx
│   │   ├── BlogGrid.tsx
│   │   ├── FaqAccordion.tsx
│   │   └── WhatsAppFAB.tsx           # Botão flutuante WhatsApp
│   │
│   ├── admin/                        # Componentes do painel admin
│   │   ├── AdminSidebar.tsx
│   │   ├── AdminHeader.tsx
│   │   ├── MetricCard.tsx
│   │   ├── LeadsTable.tsx
│   │   ├── ProductsTable.tsx
│   │   ├── TestimonialsTable.tsx
│   │   ├── BlogTable.tsx
│   │   ├── ImageUpload.tsx           # Upload múltiplo para Supabase Storage
│   │   ├── RichTextEditor.tsx        # Wrapper do Tiptap
│   │   ├── StatusBadge.tsx
│   │   └── ConfirmDialog.tsx
│   │
│   └── layout/                       # Componentes de layout globais
│       ├── Header.tsx
│       ├── Footer.tsx
│       ├── MobileDrawer.tsx
│       └── Providers.tsx             # Client providers (Toaster, etc.)
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase browser client (singleton)
│   │   ├── server.ts                 # Supabase server client (cookies)
│   │   ├── middleware.ts             # Supabase auth middleware helper
│   │   └── types.ts                 # Tipos gerados via supabase gen types
│   ├── validations/
│   │   ├── lead.ts                  # Zod schema para formulário de lead
│   │   ├── product.ts               # Zod schema para produto
│   │   ├── testimonial.ts           # Zod schema para depoimento
│   │   └── post.ts                  # Zod schema para artigo de blog
│   ├── utils/
│   │   ├── whatsapp.ts              # Gerador de links wa.me com mensagem codificada
│   │   ├── slug.ts                  # Gerador de slugs a partir de texto
│   │   ├── format.ts                # Formatação de moeda, datas, telefone (pt-BR)
│   │   ├── seo.ts                   # Helpers de metadata e JSON-LD
│   │   └── csv.ts                   # Gerador de CSV para exportação de leads
│   └── resend/
│       └── emails.ts                # Templates de email para notificação de lead
│
├── hooks/
│   ├── useLeadForm.ts               # State + submit do formulário de captação
│   ├── useProductFilters.ts         # State dos filtros do catálogo
│   ├── useSiteSettings.ts           # Leitura das configurações do site (WhatsApp, etc.)
│   └── useDebounce.ts               # Debounce para busca em tempo real
│
├── types/
│   ├── database.ts                  # Tipos do Supabase (gerados + estendidos)
│   ├── site-settings.ts             # Tipo SiteSettings
│   └── index.ts                     # Re-exports
│
└── middleware.ts                     # Next.js middleware (proteção de rotas admin)
```

### 2.2 Organização de Componentes

**Princípios:**

- **`components/ui/`** — Átomos puros do shadcn/ui. Sem lógica de negócio. Gerados e customizados via `npx shadcn@latest add`.
- **`components/public/`** — Componentes das páginas públicas. Podem ser Server Components (buscam dados diretamente) ou Client Components (interativos com `'use client'`). Seguem o design system do `front-end-spec.md`.
- **`components/admin/`** — Componentes do painel admin. Majoritariamente Client Components por serem formulários e tabelas interativas.
- **`components/layout/`** — Header, Footer, Drawer — compartilhados entre todas as páginas públicas via `(public)/layout.tsx`.
- **`lib/`** — Lógica pura sem JSX: integrações externas, validações, utilitários. Sempre testáveis de forma isolada.
- **`hooks/`** — Apenas hooks React com `'use client'`. Encapsulam state e lógica de interação dos componentes.
- **`types/`** — Definições TypeScript compartilhadas. `database.ts` é gerado pelo Supabase CLI e nunca editado manualmente.

### 2.3 Fluxo de Dados

#### Páginas Públicas (SSG + ISR)

```
Build Time:
Vercel Build → Next.js generateStaticParams() → Supabase (service role)
→ Renderiza HTML estático → Serve via CDN Vercel

Runtime (ISR Revalidation):
Admin salva produto → POST /api/revalidate → Next.js revalidatePath('/produtos')
→ Vercel regenera a página em background → Próximo request serve versão nova

Fluxo de dados em Server Component:
app/(public)/produtos/page.tsx
  └── supabase/server.ts (createServerClient com cookies read-only)
  └── query: SELECT * FROM products WHERE active = true
  └── Retorna dados para renderização do componente
```

#### Formulário de Lead (Client → API → Supabase → Email)

```
Usuário preenche formulário (/seja-revendedora)
  └── LeadForm.tsx (Client Component)
  └── Validação Zod no frontend (UX imediata)
  └── POST /api/leads { name, phone, city, message }
      └── Validação Zod no servidor (segurança)
      └── Rate limiting (5 req/IP/10min via Upstash Redis ou in-memory)
      └── supabase.from('leads').insert({ ... })
      └── resend.emails.send({ subject: 'Novo Lead!', ... })
      └── Response: { success: true } | { error: 'mensagem' }
  └── Sucesso: exibe tela de confirmação + botão WhatsApp pré-formatado
  └── Erro: exibe mensagem amigável em pt-BR
```

#### Admin (SSR com Auth)

```
Proprietária acessa /admin/leads
  └── middleware.ts verifica cookie de sessão Supabase
  └── Se não autenticada: redirect para /login
  └── Se autenticada:
      └── app/admin/leads/page.tsx (Server Component)
      └── supabase/server.ts (createServerClient com cookies da sessão)
      └── RLS garante que apenas admin autenticado vê leads
      └── Renderiza tabela de leads no servidor
      └── Client components recebem dados como props (sem waterfall)
```

---

## 3. Schema do Banco de Dados (Supabase/PostgreSQL)

### 3.1 DDL Completo

```sql
-- ============================================================
-- EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUM TYPES
-- ============================================================
CREATE TYPE lead_status AS ENUM (
  'novo',
  'contatado',
  'convertido',
  'descartado'
);

CREATE TYPE post_status AS ENUM (
  'draft',
  'published'
);

CREATE TYPE testimonial_status AS ENUM (
  'pendente',
  'aprovado',
  'reprovado'
);

-- ============================================================
-- TABELA: categories
-- ============================================================
CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_categories_slug ON categories (slug);

COMMENT ON TABLE categories IS 'Categorias de produtos do catálogo';

-- ============================================================
-- TABELA: products
-- ============================================================
CREATE TABLE products (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  description      TEXT,
  images           TEXT[] NOT NULL DEFAULT '{}',    -- Array de URLs do Supabase Storage
  cost_price       NUMERIC(10, 2),                  -- Preço de custo (visível apenas no admin)
  suggested_price  NUMERIC(10, 2),                  -- Preço sugerido (visível publicamente)
  category_id      UUID REFERENCES categories (id) ON DELETE SET NULL,
  stock            INTEGER NOT NULL DEFAULT 0,
  active           BOOLEAN NOT NULL DEFAULT TRUE,
  featured         BOOLEAN NOT NULL DEFAULT FALSE,   -- Aparece na Home (máx 6)
  alt_text         TEXT,                             -- Alt text para acessibilidade/SEO
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_products_slug     ON products (slug);
CREATE INDEX idx_products_active   ON products (active);
CREATE INDEX idx_products_featured ON products (featured) WHERE featured = TRUE;
CREATE INDEX idx_products_category ON products (category_id);

COMMENT ON TABLE products IS 'Catálogo de produtos para revenda';
COMMENT ON COLUMN products.images IS 'Array de URLs públicas do Supabase Storage (formato WebP)';
COMMENT ON COLUMN products.featured IS 'Máximo 6 produtos podem ser marcados como destaque simultaneamente';

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA: leads
-- ============================================================
CREATE TABLE leads (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,               -- Formato: +55DDDNNNNNNNNN
  city        TEXT NOT NULL,
  state       TEXT,
  message     TEXT,                        -- Mensagem/dúvidas opcionais
  source      TEXT DEFAULT 'seja-revendedora', -- UTM source ou página de origem
  status      lead_status NOT NULL DEFAULT 'novo',
  notes       TEXT,                        -- Notas internas da admin
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_leads_status     ON leads (status);
CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_phone      ON leads (phone);

COMMENT ON TABLE leads IS 'Leads captados via formulário "Seja Revendedora"';
COMMENT ON COLUMN leads.phone IS 'Número de WhatsApp no formato internacional +55DDD9XXXXXXXX';
COMMENT ON COLUMN leads.notes IS 'Notas internas — não visíveis ao lead';

CREATE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA: testimonials
-- ============================================================
CREATE TABLE testimonials (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reseller_name    TEXT NOT NULL,                   -- Ex: "Maria S." (pode ser parcial)
  city             TEXT NOT NULL,
  state            TEXT,
  photo_url        TEXT,                            -- URL do Supabase Storage (opcional)
  testimonial_text TEXT NOT NULL,                  -- Máximo 500 caracteres
  result_highlight TEXT NOT NULL,                  -- Ex: "Ganhei R$1.200 no primeiro mês"
  rating           INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  status           testimonial_status NOT NULL DEFAULT 'pendente',
  display_order    INTEGER NOT NULL DEFAULT 0,     -- Ordem de exibição (menor = primeiro)
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_testimonials_status       ON testimonials (status);
CREATE INDEX idx_testimonials_display_order ON testimonials (display_order) WHERE status = 'aprovado';

COMMENT ON TABLE testimonials IS 'Depoimentos de revendedoras — apenas status "aprovado" é exibido publicamente';

CREATE TRIGGER testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA: posts (Blog)
-- ============================================================
CREATE TABLE posts (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  content          JSONB NOT NULL DEFAULT '{}',    -- Output JSON do Tiptap
  excerpt          TEXT NOT NULL,                  -- Resumo, máx 300 chars, usado como meta description padrão
  cover_image      TEXT NOT NULL,                  -- URL do Supabase Storage
  cover_image_alt  TEXT,                           -- Alt text da imagem de capa
  author           TEXT NOT NULL DEFAULT 'Revendendo Make',
  category         TEXT,
  status           post_status NOT NULL DEFAULT 'draft',
  published_at     TIMESTAMPTZ,                    -- NULL se draft; definido ao publicar
  meta_title       TEXT,                           -- Máx 60 chars — SEO
  meta_description TEXT,                           -- Máx 160 chars — SEO
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_posts_slug        ON posts (slug);
CREATE INDEX idx_posts_status      ON posts (status);
CREATE INDEX idx_posts_published_at ON posts (published_at DESC) WHERE status = 'published';
CREATE INDEX idx_posts_category    ON posts (category) WHERE status = 'published';

COMMENT ON TABLE posts IS 'Artigos do blog — apenas status "published" é exibido publicamente';
COMMENT ON COLUMN posts.content IS 'JSON serializado do Tiptap Editor — renderizado via @tiptap/react no frontend';

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA: site_settings
-- ============================================================
CREATE TABLE site_settings (
  id                   INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1), -- Sempre linha única
  whatsapp_number      TEXT NOT NULL DEFAULT '',             -- Formato: 5511999999999 (sem +, sem espaços)
  instagram_url        TEXT DEFAULT '',
  tiktok_url           TEXT DEFAULT '',
  facebook_url         TEXT DEFAULT '',
  youtube_url          TEXT DEFAULT '',
  logo_url             TEXT DEFAULT '',
  favicon_url          TEXT DEFAULT '',
  og_image_url         TEXT DEFAULT '',                      -- 1200x630px para Open Graph
  contact_email        TEXT DEFAULT '',
  hero_headline        TEXT DEFAULT 'Ganhe Dinheiro Revendendo Maquiagem de Qualidade',
  hero_subheadline     TEXT DEFAULT 'Seja sua própria chefe com flexibilidade total de horários',
  benefit_1_title      TEXT DEFAULT 'Renda Extra',
  benefit_1_description TEXT DEFAULT 'Comece a ganhar dinheiro a partir do primeiro mês',
  benefit_2_title      TEXT DEFAULT 'Flexibilidade Total',
  benefit_2_description TEXT DEFAULT 'Trabalhe quando e onde quiser, no seu ritmo',
  benefit_3_title      TEXT DEFAULT 'Suporte Direto',
  benefit_3_description TEXT DEFAULT 'Suporte personalizado direto no WhatsApp',
  about_text           TEXT DEFAULT '',                      -- Texto da página "Sobre Nós"
  privacy_policy_text  TEXT DEFAULT '',                      -- Texto da política de privacidade (LGPD)
  ga4_measurement_id   TEXT DEFAULT '',                      -- Ex: G-XXXXXXXXXX
  updated_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Garante que sempre existe uma linha
INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

COMMENT ON TABLE site_settings IS 'Configurações globais do site — tabela singleton (sempre id=1)';
COMMENT ON COLUMN site_settings.whatsapp_number IS 'Número no formato internacional SEM +: 5511999999999';

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE categories   ENABLE ROW LEVEL SECURITY;
ALTER TABLE products     ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------
-- CATEGORIES: Leitura pública, escrita apenas por admin autenticado
-- -----------------------------------------------------------------
CREATE POLICY "categories_select_public"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "categories_insert_admin"
  ON categories FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "categories_update_admin"
  ON categories FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "categories_delete_admin"
  ON categories FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- PRODUCTS: Leitura pública (apenas ativos), CRUD por admin
-- -----------------------------------------------------------------
CREATE POLICY "products_select_public"
  ON products FOR SELECT
  USING (active = true OR auth.role() = 'authenticated');

CREATE POLICY "products_insert_admin"
  ON products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "products_update_admin"
  ON products FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "products_delete_admin"
  ON products FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- LEADS: Insert por anônimos (formulário público), leitura/edição apenas admin
-- -----------------------------------------------------------------
CREATE POLICY "leads_insert_anonymous"
  ON leads FOR INSERT
  WITH CHECK (true);  -- Qualquer usuário pode inserir (formulário público)

CREATE POLICY "leads_select_admin"
  ON leads FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "leads_update_admin"
  ON leads FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Leads não podem ser excluídos (soft-delete via status 'descartado')
-- Não há policy DELETE — acesso negado por padrão

-- -----------------------------------------------------------------
-- TESTIMONIALS: Leitura pública (apenas aprovados), CRUD por admin
-- -----------------------------------------------------------------
CREATE POLICY "testimonials_select_public"
  ON testimonials FOR SELECT
  USING (status = 'aprovado' OR auth.role() = 'authenticated');

CREATE POLICY "testimonials_insert_admin"
  ON testimonials FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "testimonials_update_admin"
  ON testimonials FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "testimonials_delete_admin"
  ON testimonials FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- POSTS: Leitura pública (apenas publicados), CRUD por admin
-- -----------------------------------------------------------------
CREATE POLICY "posts_select_public"
  ON posts FOR SELECT
  USING (status = 'published' OR auth.role() = 'authenticated');

CREATE POLICY "posts_insert_admin"
  ON posts FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "posts_update_admin"
  ON posts FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "posts_delete_admin"
  ON posts FOR DELETE
  USING (auth.role() = 'authenticated');

-- -----------------------------------------------------------------
-- SITE_SETTINGS: Leitura pública, atualização apenas por admin
-- -----------------------------------------------------------------
CREATE POLICY "site_settings_select_public"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "site_settings_update_admin"
  ON site_settings FOR UPDATE
  USING (auth.role() = 'authenticated');
```

### 3.2 Configuração do Supabase Storage

```sql
-- Buckets de Storage (configurar via Supabase Dashboard ou CLI)

-- Bucket para imagens de produtos (público)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'products',
  'products',
  true,
  5242880,  -- 5MB máximo
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Bucket para fotos de depoimentos (público)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'testimonials',
  'testimonials',
  true,
  2097152,  -- 2MB máximo
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Bucket para assets do site (logo, favicon, og-image) (público)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/x-icon']
);

-- Bucket para imagens de artigos do blog (público)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog',
  'blog',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Policies de Storage: upload apenas por usuário autenticado, leitura pública
CREATE POLICY "storage_products_upload_admin"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "storage_products_read_public"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- (Repetir padrão para testimonials, site-assets, blog)
```

---

## 4. Design das Rotas de API

### 4.1 POST /api/leads — Submissão de Lead

**Descrição:** Recebe dados do formulário "Seja Revendedora", valida, persiste no Supabase e envia notificação por email.

```typescript
// src/app/api/leads/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { sendLeadNotification } from '@/lib/resend/emails';

const leadSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100),
  phone: z
    .string()
    .regex(/^\+?55\d{10,11}$/, 'Número de WhatsApp inválido. Use formato: (11) 99999-9999'),
  city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').max(100),
  message: z.string().max(1000).optional(),
  source: z.string().optional().default('seja-revendedora'),
});

// Rate limiting simples em memória (em produção: Upstash Redis)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutos

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? '0.0.0.0';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.' },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Requisição inválida.' }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('leads')
    .insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      city: parsed.data.city,
      message: parsed.data.message ?? null,
      source: parsed.data.source,
      status: 'novo',
    })
    .select('id')
    .single();

  if (error) {
    console.error('[/api/leads] Supabase error:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar cadastro. Tente novamente.' },
      { status: 500 }
    );
  }

  // Notificação por email — falha silenciosa (não impede o cadastro)
  try {
    await sendLeadNotification({
      leadId: data.id,
      name: parsed.data.name,
      phone: parsed.data.phone,
      city: parsed.data.city,
    });
  } catch (emailError) {
    console.error('[/api/leads] Resend error (non-critical):', emailError);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
```

**Respostas:**

| Status | Situação |
|--------|----------|
| 200 | Lead salvo com sucesso |
| 400 | Dados inválidos (validação Zod) |
| 429 | Rate limit excedido (5 req/IP/10min) |
| 500 | Erro interno do servidor |

---

### 4.2 POST /api/revalidate — Webhook ISR

**Descrição:** Permite que o admin acione a regeneração de páginas estáticas após salvar conteúdo.

```typescript
// src/app/api/revalidate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const body = await request.json();
  const { path, tag } = body as { path?: string; tag?: string };

  try {
    if (tag) {
      revalidateTag(tag);
    } else if (path) {
      revalidatePath(path);
    } else {
      // Revalidar tudo
      revalidatePath('/');
      revalidatePath('/produtos');
      revalidatePath('/blog');
      revalidatePath('/depoimentos');
    }

    return NextResponse.json({ revalidated: true, timestamp: Date.now() });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao revalidar.' }, { status: 500 });
  }
}
```

**Chamadas automáticas:** O admin deve chamar este endpoint após:
- Salvar/ativar/desativar produto → `revalidatePath('/produtos')`
- Publicar/despublicar artigo de blog → `revalidatePath('/blog')`
- Aprovar/reprovar depoimento → `revalidatePath('/depoimentos')` + `revalidatePath('/')`
- Salvar configurações do site → `revalidatePath('/')`

---

### 4.3 GET /api/leads/export — Exportação CSV

**Descrição:** Gera CSV dos leads filtrados para download pelo admin.

```typescript
// src/app/api/leads/export/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { generateLeadsCSV } from '@/lib/utils/csv';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  // Verificar autenticação
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const from   = searchParams.get('from');
  const to     = searchParams.get('to');

  let query = supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (from)   query = query.gte('created_at', from);
  if (to)     query = query.lte('created_at', to);

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: 'Erro ao buscar leads.' }, { status: 500 });
  }

  const csv = generateLeadsCSV(data);
  const filename = `leads-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}
```

---

## 5. Autenticação e Segurança

### 5.1 Autenticação do Admin

**Fluxo de Login:**

```
1. Proprietária acessa /login
2. Preenche email + senha
3. supabase.auth.signInWithPassword({ email, password })
4. Supabase valida credenciais e retorna JWT
5. JWT é armazenado em cookie httpOnly via Supabase SSR helpers
6. middleware.ts verifica o cookie em cada request para /admin/*
7. Se válido: prossegue; Se inválido/expirado: redirect para /login
```

**Configuração do Middleware:**

```typescript
// src/middleware.ts

import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Proteger todas as rotas /admin/* (exceto /admin/login não existe — é /login)
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/login';
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirecionar usuário autenticado da tela de login para o admin
  if (request.nextUrl.pathname === '/login' && user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = '/admin/dashboard';
    return NextResponse.redirect(redirectUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
```

### 5.2 Políticas de Segurança

| Camada | Medida | Implementação |
|--------|--------|---------------|
| **Transport** | HTTPS obrigatório | Vercel (automático via Let's Encrypt) |
| **Transport** | HSTS header | Configurado via `next.config.js` headers |
| **Autenticação** | JWT httpOnly cookie | Supabase SSR (`@supabase/ssr`) |
| **Autorização** | RLS no banco | Policies no Supabase (ver seção 3.1) |
| **Input** | Validação dupla | Zod no frontend + Zod na API route |
| **Rate Limiting** | 5 req/IP/10min em `/api/leads` | In-memory map (produção: Upstash Redis) |
| **XSS** | Sanitização do rich text | DOMPurify ao renderizar conteúdo Tiptap |
| **CSRF** | Tokens implícitos | Next.js App Router usa Server Actions com verificação de origin |
| **Secrets** | Variáveis de ambiente | Nunca no bundle client (sem `NEXT_PUBLIC_` para secrets) |
| **Deps** | Auditoria | `npm audit` no CI antes do deploy |

### 5.3 Headers de Segurança

```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control',   value: 'on' },
  { key: 'X-XSS-Protection',         value: '1; mode=block' },
  { key: 'X-Frame-Options',          value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options',   value: 'nosniff' },
  { key: 'Referrer-Policy',          value: 'origin-when-cross-origin' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https://*.supabase.co",
      "connect-src 'self' https://*.supabase.co https://www.google-analytics.com",
      "frame-src https://www.instagram.com https://www.tiktok.com",
    ].join('; '),
  },
];
```

### 5.4 Conformidade LGPD

| Requisito | Implementação |
|-----------|---------------|
| Consentimento explícito | Checkbox de aceite na política de privacidade no formulário de lead |
| Texto da política | Configurável via admin > configurações (`privacy_policy_text`) |
| Dados coletados | Apenas nome, WhatsApp, cidade — sem dados sensíveis |
| Finalidade declarada | "Entrar em contato sobre oportunidade de revenda" |
| Retenção | Leads com status "descartado" são soft-deleted (não excluídos fisicamente) |
| Portabilidade | Exportação CSV disponível no admin |
| Segurança | HTTPS + RLS + dados não expostos publicamente |

---

## 6. Arquitetura de Deploy

### 6.1 Ambientes

| Ambiente | URL | Branch | Banco de Dados |
|----------|-----|--------|----------------|
| **Desenvolvimento** | `localhost:3000` | qualquer | Supabase local (`supabase start`) |
| **Preview** | `*.vercel.app` | PRs | Supabase local ou staging |
| **Produção** | `revendendomake.com.br` | `main` | Supabase Cloud (produção) |

### 6.2 CI/CD Pipeline

```
Developer (ou Claude Code @dev)
  └── git push origin main
      └── GitHub → Vercel (webhook automático)
          └── Vercel Build:
              ├── npm install
              ├── npm run typecheck     # tsc --noEmit
              ├── npm run lint          # eslint
              ├── npm run build         # next build
              │   ├── SSG: gera HTML para todas as páginas estáticas
              │   ├── next-sitemap: gera sitemap.xml e robots.txt
              │   └── Bundle analysis (opcional)
              └── Deploy para Edge Network
                  └── Cache bust automático para assets estáticos
```

### 6.3 Configuração de Domínio

```
1. Registrar revendendomake.com.br no Registro.br
2. No painel Vercel:
   - Settings > Domains > Add Domain: revendendomake.com.br
   - Vercel fornece os DNS records (CNAME ou A records)
3. No painel do Registro.br:
   - Atualizar DNS com os records fornecidos pelo Vercel
   - TTL recomendado: 300s (para propagação rápida)
4. Vercel provisiona SSL via Let's Encrypt automaticamente
5. Configurar redirect www → sem www (ou vice-versa) no Vercel

Resultado:
- revendendomake.com.br → HTTPS ativo
- www.revendendomake.com.br → redirect 301 para revendendomake.com.br
- HTTP → redirect 301 para HTTPS
```

### 6.4 Variáveis de Ambiente

```bash
# .env.local (desenvolvimento) — nunca versionar no Git

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...        # Chave pública (anon)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...             # Chave secreta — NUNCA expor no cliente

# Email
RESEND_API_KEY=re_xxxxx                          # API key do Resend
RESEND_FROM_EMAIL=notificacoes@revendendomake.com.br
RESEND_NOTIFICATION_TO=proprietaria@email.com    # Email de destino das notificações

# Segurança
REVALIDATE_SECRET=uma-string-aleatoria-segura-32-chars  # Para webhook ISR

# WhatsApp (fallback — o principal vem do banco)
NEXT_PUBLIC_WHATSAPP_DEFAULT=5511999999999

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Configuração na Vercel:**
- Variáveis com `NEXT_PUBLIC_` → expostas no bundle cliente (apenas dados não sensíveis)
- Demais variáveis → apenas disponíveis no servidor (API routes, Server Components)
- Configurar em: Vercel Dashboard > Project > Settings > Environment Variables

### 6.5 Custo Operacional Estimado

| Serviço | Plano | Custo Mensal |
|---------|-------|-------------|
| Vercel | Hobby (gratuito) | R$ 0 |
| Supabase | Free Tier (500MB DB, 1GB Storage) | R$ 0 |
| Registro de Domínio .com.br | — | ~R$ 40/ano (~R$ 3,30/mês) |
| Resend | Free (3.000 emails/mês) | R$ 0 |
| UptimeRobot | Free | R$ 0 |
| **Total inicial** | | **~R$ 3,30/mês** |

**Upgrade triggers:**
- Supabase Pro (~R$ 125/mês): quando banco ultrapassar 500MB ou Storage 1GB
- Vercel Pro (~R$ 100/mês): se precisar de mais de 1 membro no time ou builds ilimitados

---

## 7. Arquitetura de Performance

### 7.1 Estratégia de Renderização por Rota

| Rota | Estratégia | Revalidação | Justificativa |
|------|-----------|-------------|---------------|
| `/` (Home) | SSG + ISR | 60 segundos | Conteúdo muda raramente; ISR garante atualização após mudanças no admin |
| `/seja-revendedora` | SSG | Static (build) | Conteúdo quase estático; revalida via webhook ao salvar configurações |
| `/produtos` | SSG + ISR | 60 segundos | Catálogo pode mudar com frequência |
| `/produtos/[slug]` | SSG + ISR | 60 segundos | Detalhe de produto — generateStaticParams para todos os produtos ativos |
| `/depoimentos` | SSG + ISR | 300 segundos | Depoimentos mudam com menos frequência |
| `/blog` | SSG + ISR | 60 segundos | Novos artigos publicados devem aparecer rapidamente |
| `/blog/[slug]` | SSG + ISR | 300 segundos | Artigos raramente editados após publicação |
| `/sobre` | SSG + ISR | 3600 segundos | Conteúdo estável |
| `/admin/*` | SSR | — | Dados sempre frescos, sem cache — RLS protege os dados |
| `/login` | Static | — | Sem dados dinâmicos |

### 7.2 Otimização de Imagens

```typescript
// Configuração em next.config.js
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],  // AVIF preferencial, WebP fallback
    deviceSizes: [375, 428, 768, 1024, 1280, 1440],
    imageSizes: [64, 128, 256, 384],
  },
};

// Uso no componente:
// Hero image — preload obrigatório para LCP
<Image
  src={heroImage}
  alt="Revendedora Revendendo Make"
  priority         // preload — evita LCP penalty
  fill
  className="object-cover"
  sizes="100vw"
/>

// Produtos — lazy loading
<Image
  src={product.images[0]}
  alt={product.alt_text ?? product.name}
  width={400}
  height={400}
  className="object-cover aspect-square"
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  loading="lazy"
/>
```

### 7.3 Orçamento de JavaScript

| Bundle | Meta | Estratégia |
|--------|------|-----------|
| First Load JS (home) | < 100KB | Server Components máximos, Client Components mínimos |
| Admin bundle | < 250KB | Aceitável — admin não tem restrição de performance como o público |
| Framer Motion | ~40KB | Lazy import apenas para animações (`dynamic` import) |
| Tiptap (editor) | ~80KB | Carregado apenas nas páginas de edição do admin |

### 7.4 Fontes

```typescript
// src/app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',               // Evita FOIT
  variable: '--font-playfair',
  preload: true,
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});
```

### 7.5 Metas de Core Web Vitals

| Métrica | Meta | Como Atingir |
|---------|------|-------------|
| **LCP** | < 2.5s | Hero image com `priority`, servidor próximo via Vercel Edge, SSG |
| **INP** | < 200ms | Minimal client JS, React Server Components onde possível |
| **CLS** | < 0.1 | `aspect-ratio` definido em todas as imagens, `font-display: swap`, skeleton loaders |
| **TTFB** | < 800ms | Vercel Edge Network, SSG (HTML pré-gerado), ISR |
| **Lighthouse** | ≥ 90 | SSG + CDN + imagens WebP + fontes otimizadas + CSS purge |

---

## 8. Arquitetura de SEO

### 8.1 Metadata Dinâmica por Página

```typescript
// Exemplo: src/app/(public)/produtos/[slug]/page.tsx

import { type Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const supabase = createClient();
  const { data: product } = await supabase
    .from('products')
    .select('name, description, images, slug')
    .eq('slug', params.slug)
    .single();

  if (!product) return { title: 'Produto não encontrado' };

  const title = `${product.name} | Revendendo Make`;
  const description = product.description?.slice(0, 160)
    ?? `Compre ${product.name} com as melhores condições. Entrega via WhatsApp.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: product.images[0], width: 800, height: 800, alt: product.name }],
      type: 'website',
      locale: 'pt_BR',
      siteName: 'Revendendo Make',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [product.images[0]],
    },
    alternates: {
      canonical: `https://revendendomake.com.br/produtos/${product.slug}`,
    },
  };
}
```

### 8.2 Structured Data (JSON-LD)

```typescript
// src/lib/utils/seo.ts

// Schema Organization — Home
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Revendendo Make',
    url: 'https://revendendomake.com.br',
    logo: 'https://revendendomake.com.br/logo.png',
    sameAs: [
      'https://instagram.com/revendendomake',
      'https://tiktok.com/@revendendomake',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'Portuguese',
    },
  };
}

// Schema Product
export function productSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    offers: product.suggested_price
      ? {
          '@type': 'Offer',
          priceCurrency: 'BRL',
          price: product.suggested_price,
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'Revendendo Make' },
        }
      : undefined,
  };
}

// Schema Article — Blog
export function articleSchema(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Revendendo Make',
      logo: { '@type': 'ImageObject', url: 'https://revendendomake.com.br/logo.png' },
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
    mainEntityOfPage: `https://revendendomake.com.br/blog/${post.slug}`,
  };
}

// Schema BreadcrumbList
export function breadcrumbSchema(crumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}
```

### 8.3 Sitemap e Robots.txt

```javascript
// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://revendendomake.com.br',
  generateRobotsTxt: true,
  exclude: ['/admin', '/admin/*', '/login', '/api/*'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/admin', '/api', '/login'] },
    ],
    additionalSitemaps: [
      'https://revendendomake.com.br/sitemap-products.xml',
      'https://revendendomake.com.br/sitemap-blog.xml',
    ],
  },
  // Sitemaps dinâmicos gerados via getServerSideSitemap (produtos e artigos)
  transform: async (config, path) => {
    // Páginas de produto e blog recebem changefreq 'weekly'
    if (path.startsWith('/produtos/') || path.startsWith('/blog/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
```

---

## 9. Análise de Impacto nas Stories do PRD

### 9.1 Stories sem Mudanças Necessárias

As stories do PRD estão bem definidas e cobertas pela arquitetura acima. Nenhuma story precisa ser dividida ou removida.

### 9.2 Ajustes Sugeridos (Adições de Critérios de Aceite)

**Story 1.2 — Tech Stack Setup** — Adicionar ACs:
- [ ] `supabase gen types typescript --project-id XXX > src/types/database.ts` configurado como script npm
- [ ] `src/middleware.ts` com proteção de rotas `/admin/*` implementada e testada
- [ ] Variáveis de ambiente documentadas em `.env.example` (sem valores reais)
- [ ] `next.config.js` com headers de segurança e `remotePatterns` do Supabase configurados

**Story 2.2 — Seja Revendedora** — Adicionar ACs relacionados à LGPD:
- [ ] Checkbox de aceite aos termos de privacidade obrigatório antes do envio do formulário
- [ ] Link para política de privacidade no checkbox (texto configurável via admin)
- [ ] Campo `source` captura UTM params da URL (`?utm_source=tiktok&utm_medium=bio`)

**Story 4.3 — Admin — Gestão de Produtos** — Adicionar AC:
- [ ] Validação de máximo 6 produtos em destaque implementada no servidor (não apenas no frontend)
- [ ] Upload de imagens envia para Supabase Storage bucket `products/` e salva URL no array `images`
- [ ] Endpoint `/api/revalidate` é chamado automaticamente ao ativar/desativar produto

**Story 4.7 — Admin — Configurações** — Adicionar ACs:
- [ ] Salvar configurações chama `/api/revalidate` para atualizar o site público sem redeploy
- [ ] Campo `whatsapp_number` sanitizado para formato `5511999999999` (remove +, espaços, traços)

### 9.3 Nova Story Sugerida

**Story 1.4 — Configuração do Banco de Dados e Storage**  
**Epic:** 1 — Foundation & Infrastructure  
**Prioridade:** MUST (pré-requisito para todas as outras)  
**Resumo:** Aplicar o DDL completo no Supabase (tabelas, enums, RLS policies, triggers), criar os buckets de Storage, configurar a primeira conta de admin no Supabase Auth, e verificar que as policies de RLS funcionam corretamente via testes manuais.

**ACs:**
- [ ] Todas as tabelas criadas com constraints e índices conforme DDL deste documento
- [ ] RLS habilitado em todas as tabelas com policies corretas
- [ ] Buckets `products`, `testimonials`, `site-assets`, `blog` criados com MIME types restritos
- [ ] Linha inicial em `site_settings` inserida com valores padrão
- [ ] Conta de admin criada via Supabase Dashboard (email/senha forte)
- [ ] Tipos TypeScript gerados via `supabase gen types` e commitados em `src/types/database.ts`
- [ ] Teste manual: usuário anônimo consegue inserir lead mas não consegue ler leads existentes
- [ ] Teste manual: usuário anônimo consegue ler produtos ativos mas não produtos inativos

---

## 10. Diretrizes de Desenvolvimento

### 10.1 TypeScript Strict Mode

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "exactOptionalPropertyTypes": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Regras:**
- Sem `any` — usar `unknown` quando necessário e narrowing com `as`
- Props de componentes sempre tipadas (sem `React.FC`, preferir `function Component(props: Props)`)
- Tipos do Supabase gerados via CLI — nunca criar tipos manualmente para o schema do banco

### 10.2 Imports Absolutos

```typescript
// CORRETO
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/server';
import type { Product } from '@/types/database';

// PROIBIDO
import { Button } from '../../../components/ui/button';
```

### 10.3 Error Boundaries

```typescript
// src/components/admin/AdminErrorBoundary.tsx
'use client';

import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; fallback?: ReactNode; }
interface State { hasError: boolean; error?: Error; }

export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[AdminErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Ocorreu um erro inesperado
          </h2>
          <p className="mt-2 text-neutral-600">
            {this.state.error?.message ?? 'Tente recarregar a página.'}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
```

**Aplicar em:** Cada seção principal do admin (`/admin/produtos`, `/admin/leads`, etc.) para evitar que um erro em um módulo derrube todo o painel.

### 10.4 Estratégia de Logging

| Ambiente | Nível | Destino |
|----------|-------|---------|
| Desenvolvimento | DEBUG + INFO + ERROR | Console |
| Produção | ERROR apenas | Vercel Logs (acessível via dashboard) |

```typescript
// src/lib/utils/logger.ts
const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  debug: (...args: unknown[]) => isDev && console.debug('[DEBUG]', ...args),
  info:  (...args: unknown[]) => isDev && console.info('[INFO]', ...args),
  error: (...args: unknown[]) => console.error('[ERROR]', ...args),
  warn:  (...args: unknown[]) => console.warn('[WARN]', ...args),
};
```

### 10.5 Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componente React | PascalCase | `ProductCard.tsx` |
| Hook | camelCase com `use` | `useProductFilters.ts` |
| Utilitário/lib | camelCase | `whatsapp.ts`, `slug.ts` |
| Variáveis/funções | camelCase | `handleSubmit`, `isLoading` |
| Constantes | SCREAMING_SNAKE | `MAX_FEATURED_PRODUCTS = 6` |
| Tipo/Interface | PascalCase | `type Product`, `interface LeadFormData` |
| Arquivo de rota API | `route.ts` | `src/app/api/leads/route.ts` |
| Página | `page.tsx` | `src/app/(public)/page.tsx` |
| Layout | `layout.tsx` | `src/app/admin/layout.tsx` |

### 10.6 Variável de WhatsApp Global

O número de WhatsApp vem do banco de dados (`site_settings.whatsapp_number`) e deve ser carregado via Server Component no layout público. Nunca hardcoded em componentes individuais.

```typescript
// src/components/layout/Providers.tsx ou via context
// O número é passado como prop do Server Component para todos os Client Components que precisam

// src/lib/utils/whatsapp.ts
export function buildWhatsAppLink(
  phone: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

export const WHATSAPP_MESSAGES = {
  general:
    'Olá! Vim pelo site Revendendo Make e gostaria de mais informações.',
  becomeReseller:
    'Olá! Quero saber mais sobre como me tornar revendedora.',
  product: (productName: string) =>
    `Olá! Tenho interesse no produto: ${productName}.`,
} as const;
```

---

## Apêndice A — Checklist de Lançamento (Arquitetura)

Antes do go-live, verificar:

- [ ] Todas as variáveis de ambiente configuradas no Vercel (produção)
- [ ] Supabase project em plano adequado ao volume esperado
- [ ] RLS testado com usuário anônimo (não deve ver leads, não deve ver produtos inativos)
- [ ] Conta admin criada e testada no fluxo de login
- [ ] Domínio configurado no Vercel + SSL ativo + redirect www verificado
- [ ] Sitemap acessível em `https://revendendomake.com.br/sitemap.xml`
- [ ] Robots.txt bloqueando `/admin` e `/api`
- [ ] Lighthouse ≥ 90 nas páginas Home, Seja Revendedora e Catálogo
- [ ] Formulário de lead testado end-to-end (submissão → banco → email de notificação)
- [ ] Botão WhatsApp testado em iOS e Android
- [ ] Google Analytics 4 configurado e recebendo eventos
- [ ] UptimeRobot configurado com alerta por email
- [ ] Google Search Console verificado + sitemap submetido

---

*Documento gerado por Aria (@architect) — Synkra AIOX v2.0*  
*Para uso interno — Revendendo Make*  
*Próximo passo: @sm criar story 1.4 (Configuração do Banco de Dados), @dev iniciar Epic 1*
