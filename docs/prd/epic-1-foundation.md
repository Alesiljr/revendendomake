# Epic 1 — Foundation & Infrastructure

**Projeto:** Revendendo Make  
**Epic:** 1 de 5  
**Objetivo:** Configurar toda a infraestrutura técnica necessária para desenvolvimento e deploy do projeto.  
**Critério de Conclusão:** Ambiente de desenvolvimento funcional, domínio configurado, design system base implementado e pipeline de deploy ativo.  
**Prioridade:** MUST — pré-requisito para todos os outros epics.

**Documentos de referência:**
- `docs/tech-stack.md` — stack tecnológica e variáveis de ambiente
- `docs/coding-standards.md` — padrões de código
- `docs/source-tree.md` — estrutura de diretórios esperada
- `docs/fullstack-architecture.md` — arquitetura completa com DDL do banco
- `docs/front-end-spec.md` — design system, tokens, componentes

---

## Story 1.1 — Environment Setup & Domain Configuration

**Prioridade:** MUST  
**Pré-requisitos:** Nenhum — é o primeiro story.  
**Estimativa:** 1–2 dias

### Descrição

Configuração do repositório GitHub, ambiente de desenvolvimento local, variáveis de ambiente, registro e configuração do domínio `.com.br`, DNS e HTTPS. Este story não envolve código de aplicação — é puramente infraestrutura e configuração.

### Acceptance Criteria

- [ ] Repositório GitHub criado com nome `revendendomake` (ou equivalente acordado)
- [ ] Branch principal: `main`. Branch de desenvolvimento padrão: `develop` ou feature branches diretos
- [ ] `.gitignore` configurado corretamente (node_modules, .env.local, .next, supabase/.temp, etc.)
- [ ] Conta Vercel conectada ao repositório GitHub com deploy automático na branch `main`
- [ ] Vercel configurado com projeto Next.js e ambiente de produção apontando para `revendendomake.com.br`
- [ ] Domínio `revendendomake.com.br` registrado no Registro.br (ou alternativa definida)
- [ ] DNS configurado: registros CNAME/A do domínio apontando para os servidores do Vercel
- [ ] Certificado SSL/TLS provisionado automaticamente pelo Vercel (Let's Encrypt)
- [ ] HTTPS funcionando: `https://revendendomake.com.br` acessível (mesmo que exiba página padrão do Vercel)
- [ ] Redirecionamento automático HTTP → HTTPS ativo (301)
- [ ] Redirecionamento `www.revendendomake.com.br` → `revendendomake.com.br` configurado
- [ ] Conta Supabase criada e projeto configurado (region: South America ou US East)
- [ ] Arquivo `.env.local.example` criado com todos os nomes de variáveis (sem valores reais)
- [ ] Variáveis de ambiente configuradas no Vercel (produção): todas as variáveis do `.env.local.example`
- [ ] Monitoramento de uptime configurado no UptimeRobot com alerta por email para `revendendomake.com.br`

### Fora de Escopo

- Código da aplicação Next.js (Story 1.2)
- Schema do banco de dados (Story 1.4)
- Design system (Story 1.3)
- Configuração de e-mail profissional (pode ser feita antes do lançamento)

### Dependências Externas

| Dependência | Responsável | Impacto se Não Resolvida |
|-------------|-------------|--------------------------|
| Registro do domínio .com.br | Proprietária | Bloqueia deploy com domínio próprio |
| Conta Supabase criada | @devops | Bloqueia Story 1.4 e todas as integrações |
| Conta Vercel conectada ao GitHub | @devops | Bloqueia deploy contínuo |

---

## Story 1.2 — Tech Stack Setup

**Prioridade:** MUST  
**Pré-requisitos:** Story 1.1 (repositório e Vercel configurados)  
**Estimativa:** 1–2 dias

### Descrição

Inicialização do projeto Next.js com App Router, configuração do TypeScript em modo strict, integração com Supabase (auth + database), configuração do Vercel para deploy contínuo, configuração de ambientes (dev/staging/prod) e estrutura de diretórios base do projeto.

### Acceptance Criteria

- [ ] Projeto Next.js 15 inicializado com App Router (`npx create-next-app@latest --typescript --tailwind --app --src-dir`)
- [ ] TypeScript configurado em modo strict conforme `docs/coding-standards.md` (strict, noUncheckedIndexedAccess, noImplicitReturns, exactOptionalPropertyTypes)
- [ ] Alias `@/*` configurado no `tsconfig.json` mapeando para `./src/*`
- [ ] Tailwind CSS configurado com fontes personalizadas (Playfair Display, Inter via next/font/google)
- [ ] shadcn/ui inicializado (`npx shadcn@latest init`) com tema compatível com o design system
- [ ] Pacotes instalados: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `lucide-react`, `framer-motion`, `next-sitemap`
- [ ] `src/lib/supabase/client.ts` — Supabase browser client (singleton)
- [ ] `src/lib/supabase/server.ts` — Supabase server client (com cookies)
- [ ] `src/lib/supabase/middleware.ts` — helper de auth middleware
- [ ] `src/middleware.ts` com proteção de rotas `/admin/*` implementada e testada:
  - Usuário não autenticado em `/admin/*` → redirect para `/login`
  - Usuário autenticado em `/login` → redirect para `/admin/dashboard`
- [ ] `next.config.ts` configurado com:
  - `remotePatterns` para `*.supabase.co` (imagens do Storage)
  - Headers de segurança (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, HSTS)
  - `formats: ['image/avif', 'image/webp']` para otimização de imagens
- [ ] Script npm `type-gen` configurado: `supabase gen types typescript --project-id XXX > src/types/database.ts`
- [ ] `npm run lint` passa sem erros
- [ ] `npm run typecheck` passa sem erros
- [ ] `npm run build` conclui com sucesso
- [ ] Deploy automático no Vercel funcionando: push em `main` → deploy em produção
- [ ] Variáveis de ambiente documentadas em `.env.local.example` (sem valores reais)

### Fora de Escopo

- Schema do banco de dados e RLS (Story 1.4)
- Componentes de design system (Story 1.3)
- Páginas de conteúdo (Epic 2)

---

## Story 1.3 — Design System & Component Library

**Prioridade:** MUST  
**Pré-requisitos:** Story 1.2 (projeto Next.js configurado com Tailwind e shadcn/ui)  
**Estimativa:** 2–3 dias

### Descrição

Implementação completa do design system baseado em `docs/front-end-spec.md`: tokens de design como CSS variables, configuração do Tailwind com a paleta de cores e tipografia do projeto, componentes base (Button, Card, Input, Badge), e componentes de layout globais (Header, Footer, WhatsApp FAB).

### Acceptance Criteria

#### Design Tokens

- [ ] `src/app/globals.css` contém todas as CSS variables conforme `front-end-spec.md`:
  - Cores primárias: `--color-primary-50` a `--color-primary-900` (framboesa)
  - Cores secundárias: `--color-secondary-100` a `--color-secondary-700` (dourado/cobre)
  - Neutros: `--color-neutral-0` a `--color-neutral-900`
  - WhatsApp: `--color-whatsapp` (#25D366), `--color-whatsapp-dark` (#128C7E)
  - Estados: `--color-success`, `--color-error`, `--color-warning`, `--color-info`
  - Sombras: `--shadow-xs` a `--shadow-xl`, `--shadow-primary`, `--shadow-whatsapp`
  - Border radius: `--radius-xs` (4px) a `--radius-full` (9999px)
  - Espaçamento: `--space-1` (4px) a `--space-32` (128px)
- [ ] `tailwind.config.ts` estende o tema padrão com os tokens do design system
- [ ] Fontes configuradas via `next/font/google`: Playfair Display (400, 600, 700, 900) e Inter (400, 500, 600, 700) com `display: 'swap'`

#### Componentes Base (shadcn/ui customizados)

- [ ] `Button` — variantes: primary (framboesa), secondary (outline), ghost, whatsapp (verde), destructive; tamanhos: sm, md, lg; min-height 48px (acessibilidade)
- [ ] `Card` — shadow-sm padrão, radius-md, hover com shadow-md
- [ ] `Input` — com label associado, estados de erro (border-error, texto de erro abaixo), placeholder em pt-BR
- [ ] `Badge` — variantes de status: novo (warning), contatado (info), convertido (success), descartado (neutral); e destaque (secondary/dourado)
- [ ] `Dialog` — modal com confirmação para ações destrutivas

#### Componentes de Layout

- [ ] `src/components/layout/Header.tsx` — Server Component:
  - Logo do site (carregado de `site_settings.logo_url` ou fallback estático)
  - Navegação: Home, Seja Revendedora, Produtos, Depoimentos, Blog, Sobre, Contato
  - Links de redes sociais (Instagram, TikTok, Facebook, YouTube) com ícones Lucide
  - Hamburger menu em mobile (`Menu` icon) que abre `MobileDrawer`
- [ ] `src/components/layout/Footer.tsx` — Server Component:
  - Logo, descrição curta do negócio
  - Links de navegação e redes sociais
  - Copyright "© 2026 Revendendo Make"
- [ ] `src/components/layout/MobileDrawer.tsx` — Client Component:
  - Drawer lateral com os mesmos links do Header
  - Fecha ao clicar fora ou no ícone X
- [ ] `src/components/public/WhatsAppFAB.tsx` — Client Component:
  - Botão flutuante verde (`--color-whatsapp`) no canto inferior direito
  - Ícone WhatsApp (MessageCircle com cor verde)
  - Link `wa.me/{numero}?text={mensagem_padrão}` onde número vem de `site_settings`
  - `aria-label="Falar no WhatsApp"` para acessibilidade
  - `--shadow-whatsapp` aplicada
  - Tamanho mínimo 56x56px (touch target)
- [ ] `src/app/(public)/layout.tsx` — aplica Header + Footer + WhatsAppFAB em todas as páginas públicas

#### Utilitários

- [ ] `src/lib/utils/cn.ts` — função `cn()` usando `clsx` + `tailwind-merge`
- [ ] `src/lib/utils/whatsapp.ts` — `buildWhatsAppLink(phone, message)` + constante `WHATSAPP_MESSAGES`
- [ ] `src/lib/utils/format.ts` — `formatPrice(value)`, `formatDate(date)`, `formatPhone(phone)` em pt-BR
- [ ] `src/lib/utils/slug.ts` — `generateSlug(text)` com suporte a caracteres especiais do português

#### Layout Admin Base

- [ ] `src/components/admin/AdminSidebar.tsx` — navegação lateral com ícones Lucide e badge de contagem de leads novos
- [ ] `src/components/admin/AdminHeader.tsx` — título da página atual + botão de logout
- [ ] `src/app/admin/layout.tsx` — aplica AdminSidebar + AdminHeader em todas as páginas admin

### Fora de Escopo

- Conteúdo real das páginas (Epic 2)
- Integração com dados do Supabase (depende de Story 1.4)
- Componentes específicos de formulários de produtos/leads/etc. (Epic 4)

---

## Story 1.4 — Database Setup & Supabase Storage Configuration

**Prioridade:** MUST — pré-requisito para todos os stories do Epic 2 em diante  
**Pré-requisitos:** Story 1.1 (conta Supabase criada), Story 1.2 (tipos TypeScript configurados)  
**Estimativa:** 1–2 dias

### Descrição

Aplicar o DDL completo no Supabase (tabelas, enums, índices, triggers, RLS policies), criar os buckets de Storage com restrições de MIME type, configurar a conta de admin via Supabase Auth, inserir dados iniciais, e gerar os tipos TypeScript. Verificar que as políticas de RLS funcionam corretamente via testes manuais.

O DDL completo está em `docs/fullstack-architecture.md` seção 3.1.

### Acceptance Criteria

#### Tabelas e Schema

- [ ] Migration SQL criada em `supabase/migrations/001_initial_schema.sql`
- [ ] Extensão `uuid-ossp` habilitada
- [ ] Enum types criados: `lead_status`, `post_status`, `testimonial_status`
- [ ] Tabela `categories` criada com colunas: id, name, slug (UNIQUE), created_at; índice em slug
- [ ] Tabela `products` criada com todas as colunas e constraints: id, name, slug (UNIQUE), description, images (TEXT[]), cost_price, suggested_price, category_id (FK), stock, active, featured, alt_text, created_at, updated_at
- [ ] Tabela `leads` criada: id, name, phone, city, state, message, source, status (lead_status), notes, created_at, updated_at
- [ ] Tabela `testimonials` criada: id, reseller_name, city, state, photo_url, testimonial_text, result_highlight, rating (CHECK 1-5), status, display_order, created_at, updated_at
- [ ] Tabela `posts` criada: id, title, slug (UNIQUE), content (JSONB), excerpt, cover_image, cover_image_alt, author, category, status (post_status), published_at, meta_title, meta_description, created_at, updated_at
- [ ] Tabela `site_settings` criada com PRIMARY KEY (id = 1, CHECK id = 1) — singleton; todos os campos de configuração conforme arquitetura
- [ ] Todos os triggers `updated_at` criados para: products, leads, testimonials, posts
- [ ] Todos os índices criados conforme DDL da arquitetura
- [ ] Linha inicial em `site_settings` inserida com valores padrão via `seed.sql`

#### Row Level Security (RLS)

- [ ] RLS habilitado em todas as 6 tabelas
- [ ] `categories`: SELECT público, INSERT/UPDATE/DELETE apenas autenticado
- [ ] `products`: SELECT público (apenas active=true) OU autenticado, INSERT/UPDATE/DELETE apenas autenticado
- [ ] `leads`: INSERT anônimo (formulário público), SELECT/UPDATE apenas autenticado; sem policy DELETE
- [ ] `testimonials`: SELECT público (apenas status='aprovado') OU autenticado, CRUD apenas autenticado
- [ ] `posts`: SELECT público (apenas status='published') OU autenticado, CRUD apenas autenticado
- [ ] `site_settings`: SELECT público, UPDATE apenas autenticado

#### Supabase Storage

- [ ] Bucket `products` criado: público, 5MB máx, MIME: jpeg/png/webp
- [ ] Bucket `testimonials` criado: público, 2MB máx, MIME: jpeg/png/webp
- [ ] Bucket `site-assets` criado: público, 5MB máx, MIME: jpeg/png/webp/svg+xml/x-icon
- [ ] Bucket `blog` criado: público, 5MB máx, MIME: jpeg/png/webp
- [ ] Policy de Storage: upload apenas por usuário autenticado; leitura pública para todos os 4 buckets

#### Autenticação

- [ ] Conta de admin criada via Supabase Dashboard (email + senha forte: ≥12 chars, maiúsculas, números, especiais)
- [ ] Login testado com sucesso: email/senha → sessão válida → acesso a `/admin/dashboard`
- [ ] Tipos TypeScript gerados via `supabase gen types` e commitados em `src/lib/supabase/types.ts`

#### Testes Manuais de RLS (obrigatórios)

- [ ] Teste: usuário anônimo consegue inserir lead (POST /api/leads com dados válidos) ✓
- [ ] Teste: usuário anônimo NÃO consegue ler leads via Supabase client → erro de permissão ✓
- [ ] Teste: usuário anônimo consegue ler produtos com `active = true` ✓
- [ ] Teste: usuário anônimo NÃO consegue ler produtos com `active = false` ✓
- [ ] Teste: usuário autenticado (admin) consegue ler todos os produtos (ativos e inativos) ✓
- [ ] Teste: usuário anônimo consegue ler site_settings ✓
- [ ] Teste: usuário anônimo NÃO consegue atualizar site_settings ✓

### Fora de Escopo

- Dados reais de produtos, depoimentos ou artigos (conteúdo será inserido via admin)
- Seed de dados de demonstração (seed.sql contém apenas site_settings inicial)

### Referência Técnica

O DDL completo (com todos os CREATEs, triggers, índices e RLS policies) está em `docs/fullstack-architecture.md` seção 3.1 e 3.2. Copiar diretamente para `supabase/migrations/001_initial_schema.sql`.

---

*Epic 1 — Total: 4 stories | Estimativa total: 5–9 dias*  
*Synkra AIOX — @po (Pax) — v1.0*
