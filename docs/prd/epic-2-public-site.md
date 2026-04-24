# Epic 2 — Public Website: Core Pages

**Projeto:** Revendendo Make  
**Epic:** 2 de 5  
**Objetivo:** Implementar todas as páginas públicas do site com conteúdo real e integrações funcionais.  
**Critério de Conclusão:** Todas as páginas públicas acessíveis no domínio, responsivas, com CTAs funcionais para WhatsApp e dados reais carregados do Supabase.  
**Prioridade:** MUST (Stories 2.1–2.4) | SHOULD (Story 2.5)

**Pré-requisito obrigatório:** Epic 1 completo (especialmente Stories 1.2, 1.3 e 1.4).

**Documentos de referência:**
- `docs/tech-stack.md` — stack e variáveis de ambiente
- `docs/coding-standards.md` — padrões de código
- `docs/source-tree.md` — onde criar os arquivos
- `docs/fullstack-architecture.md` — fluxo de dados, rotas de API
- `docs/front-end-spec.md` — design system, wireframes por página, componentes

---

## Story 2.1 — Landing Page (Home)

**Prioridade:** MUST  
**FR associado:** FR-001, FR-007 (WhatsApp FAB), FR-008 (redes sociais — seção embed)  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 3–4 dias

### Descrição

Implementação completa da página inicial do site. A Home é o principal ponto de entrada de visitantes vindos de redes sociais e deve comunicar a proposta de valor em menos de 5 segundos, direcionar para "Seja Revendedora" ou catálogo de produtos, e carregar em menos de 2 segundos em 4G.

A página usa **SSG + ISR com revalidação de 60 segundos**. Dados de produtos em destaque e depoimentos são carregados no build/revalidação via Server Component.

### Acceptance Criteria

#### Hero Section

- [ ] Headline focada em benefício (ex: "Ganhe dinheiro revendendo maquiagem de qualidade") em Playfair Display 700
- [ ] Subheadline de apoio em Inter, visível above the fold em mobile (375px)
- [ ] CTA primário "Seja Revendedora" → `/seja-revendedora` (Button variante primary, tamanho lg)
- [ ] CTA secundário "Ver Produtos" → `/produtos` (Button variante secondary)
- [ ] Hero image com `priority` prop (preload obrigatório para LCP < 2.5s)
- [ ] Layout totalmente visível em mobile sem scroll (above the fold)

#### Seção de Benefícios

- [ ] Mínimo 3 diferenciais do negócio com ícone Lucide React e texto curto
- [ ] Ícones conforme `front-end-spec.md`: TrendingUp (Renda), Clock (Flexibilidade), HeadphonesIcon (Suporte)
- [ ] Grid responsivo: 1 coluna mobile, 3 colunas desktop
- [ ] Textos configuráveis via `site_settings` (benefit_1_title, benefit_1_description, etc.)

#### Produtos em Destaque

- [ ] Máximo 6 produtos com `featured = true` carregados do Supabase
- [ ] `ProductCard` com: foto WebP otimizada, nome, categoria, preço (ou "Consultar"), botão "Comprar via WhatsApp"
- [ ] Botão WhatsApp usa mensagem contextual: `"Olá! Tenho interesse no produto: {nome}"`
- [ ] Link "Ver todos os produtos" → `/produtos`
- [ ] Estado vazio (sem produtos em destaque): exibe mensagem amigável, não quebra o layout

#### Depoimentos Preview

- [ ] Máximo 3 depoimentos com status `aprovado` carregados do Supabase (ordenados por display_order)
- [ ] `TestimonialCard` com: foto (ou avatar genérico), nome, cidade, depoimento, resultado em destaque
- [ ] Link "Ver todos os depoimentos" → `/depoimentos`
- [ ] Estado vazio (sem depoimentos aprovados): seção não é exibida

#### Seção de Redes Sociais

- [ ] Seção com embed de posts recentes do Instagram e/ou TikTok (via oEmbed ou widget oficial)
- [ ] Embeds carregam de forma lazy (não bloqueiam first load)
- [ ] Fallback gracioso se embed falhar: link para o perfil social em vez do embed
- [ ] Links para perfis sociais (Instagram, TikTok, Facebook, YouTube) com ícones Lucide

#### Header e Footer

- [ ] Header: logo, navegação, links sociais, hamburger mobile (componente `Header.tsx` do Story 1.3)
- [ ] Footer: logo, links de navegação, redes sociais, copyright
- [ ] WhatsApp FAB presente e funcional (componente `WhatsAppFAB.tsx` do Story 1.3)
- [ ] Número de WhatsApp lido de `site_settings.whatsapp_number`

#### Open Graph e SEO da Home

- [ ] `generateMetadata()` retorna: title "Revendendo Make — Revenda Maquiagem de Qualidade", description, og:image de `site_settings.og_image_url`
- [ ] Schema.org `Organization` inserido como JSON-LD via `seo.ts`

#### Performance

- [ ] Lighthouse Score ≥ 90 em Performance, SEO, Acessibilidade e Best Practices
- [ ] LCP < 2.5s em conexão 4G simulada
- [ ] Layout responsivo testado em 375px, 768px e 1280px

### Fora de Escopo

- Sistema de blog (Epic 3)
- Funcionalidades de admin (Epic 4)

---

## Story 2.2 — Página "Seja Revendedora"

**Prioridade:** MUST  
**FR associado:** FR-002, FR-007 (WhatsApp CTA)  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 3–4 dias

### Descrição

Principal funil de captação de leads do site. Deve responder todas as dúvidas da Persona 1 (Revendedora Potencial), eliminar objeções e converter visitantes em cadastros. O formulário salva o lead no Supabase via `POST /api/leads` e redireciona para WhatsApp após sucesso.

### Acceptance Criteria

#### Hero e Conteúdo da Página

- [ ] Hero com headline voltada à revendedora potencial e CTA de formulário visível above the fold
- [ ] Seção "Como Funciona" com 3–5 passos ilustrados: investimento inicial → compra de produtos → venda → ganhos
- [ ] Seção "Benefícios" lista vantagens de ser revendedora (flexibilidade, suporte, margem, etc.)
- [ ] Seção de depoimentos de revendedoras ativas (mínimo 3, carregados do Supabase)
- [ ] FAQ com mínimo de 5 perguntas frequentes sobre como se tornar revendedora (componente `FaqAccordion`)

#### Formulário de Captação

- [ ] Campos do formulário:
  - Nome completo (obrigatório, min 2 chars)
  - Número de WhatsApp (obrigatório, formato brasileiro — validação regex)
  - Cidade (obrigatório)
  - Mensagem/dúvidas (opcional, máx 1000 chars)
- [ ] Checkbox de aceite à Política de Privacidade (LGPD) — obrigatório para habilitar o botão de envio
- [ ] Texto do checkbox inclui link para `/politica-privacidade` que abre em nova aba
- [ ] Validação no frontend (Zod) com feedback de erro imediato em pt-BR
- [ ] Estado de loading no botão de envio ("Enviando..." com spinner)
- [ ] Após envio com sucesso:
  - Exibe mensagem de confirmação em pt-BR
  - Exibe botão "Falar no WhatsApp agora" com link `wa.me/{numero}?text=Olá! Me cadastrei para ser revendedora Revendendo Make.`
  - Esconde o formulário
- [ ] Formulário exibe mensagem de erro clara em pt-BR em caso de falha no envio (ex: "Erro ao enviar. Tente novamente.")

#### API Route — POST /api/leads

- [ ] Validação Zod no servidor (independente da validação do frontend)
- [ ] Rate limiting: máximo 5 submissões por IP em 10 minutos
- [ ] Response 429 com mensagem amigável em pt-BR se rate limit excedido
- [ ] Lead salvo no Supabase com: name, phone, city, message (se houver), source (UTM param ou "seja-revendedora"), status inicial "novo"
- [ ] Campo `source` captura UTM params da URL (`?utm_source=tiktok&utm_medium=bio`) e salva no banco; padrão "seja-revendedora" se não houver UTM
- [ ] Notificação por email enviada via Resend após cadastro bem-sucedido (falha silenciosa — não impede o cadastro)
- [ ] Response 200 `{ success: true }` em caso de sucesso
- [ ] Response 400 com mensagem de validação em caso de dados inválidos
- [ ] Response 500 com mensagem amigável em caso de erro interno

#### SEO

- [ ] `generateMetadata()` com title e description específicos para a página
- [ ] H1 único: voltado à revendedora potencial

### Fora de Escopo

- Painel admin de gestão de leads (Story 4.4)
- Exportação de leads em CSV (Story 4.4)

---

## Story 2.3 — Catálogo de Produtos

**Prioridade:** MUST  
**FR associado:** FR-003, FR-007 (WhatsApp por produto)  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 3–4 dias

### Descrição

Galeria visual de todos os produtos disponíveis para revenda e compra direta. Inclui filtros por categoria e faixa de preço, campo de busca, e página de detalhe com galeria de fotos. Cada produto tem CTA direto para WhatsApp com mensagem contextual.

A listagem usa **SSG + ISR 60s**. Páginas de detalhe usam `generateStaticParams` para gerar todas as páginas de produto em build time.

### Acceptance Criteria

#### Listagem de Produtos (/produtos)

- [ ] Grid responsivo de produtos: 1 coluna mobile, 2 tablet, 3–4 desktop
- [ ] `ProductCard` exibe: foto principal (WebP otimizada, lazy load), nome, categoria, preço (ou "Consultar" se null), botão "Comprar via WhatsApp"
- [ ] Botão "Comprar via WhatsApp" gera link `wa.me/{numero}?text=Olá! Tenho interesse no produto: {nome}`
- [ ] Produtos com `active = false` NÃO são exibidos no catálogo público
- [ ] Estado vazio (sem produtos ativos na categoria/filtro): exibe mensagem amigável com CTA para WhatsApp
- [ ] Paginação ou infinite scroll para catálogos com muitos produtos (≥ 20 produtos)

#### Filtros e Busca

- [ ] Filtro por categoria: lista de categorias existentes com contagem (ex: "Batons (12)")
- [ ] Filtro por faixa de preço: "Até R$30", "R$30–R$60", "Acima de R$60", "Todos"
- [ ] Campo de busca por nome de produto com debounce (300ms)
- [ ] Filtros aplicados no cliente (sem reload de página) para melhor UX
- [ ] URL atualizada com filtros para permitir compartilhamento (ex: `/produtos?categoria=batons`)
- [ ] Botão "Limpar filtros" visível quando algum filtro estiver ativo

#### Página de Detalhe (/produtos/[slug])

- [ ] `generateStaticParams()` gera páginas para todos os produtos com `active = true`
- [ ] Galeria/carrossel de todas as fotos do produto (imagem principal + miniaturas)
- [ ] Exibe: nome (H1), descrição completa, categoria, preço (ou "Consultar"), botão "Comprar via WhatsApp"
- [ ] Botão WhatsApp com mensagem: `"Olá! Tenho interesse no produto: {nome do produto}."`
- [ ] Breadcrumb: Home > Produtos > {Nome do Produto}
- [ ] Schema.org `Product` como JSON-LD
- [ ] `generateMetadata()` com title, description e OG específicos do produto
- [ ] Página 404 personalizada se produto não encontrado ou inativo

#### ISR e Revalidação

- [ ] `revalidate = 60` configurado nas páginas `/produtos` e `/produtos/[slug]`
- [ ] Após salvar produto no admin, `POST /api/revalidate` é chamado para revalidar `/produtos` e `/produtos/{slug}`

### Fora de Escopo

- Admin de gestão de produtos (Story 4.3)
- Upload de fotos de produtos (Story 4.3)

---

## Story 2.4 — Página de Depoimentos

**Prioridade:** MUST  
**FR associado:** FR-004  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 1–2 dias

### Descrição

Galeria completa de depoimentos de revendedoras e clientes. É o principal elemento de prova social para superar a desconfiança da Persona 1. Todos os depoimentos exibidos devem ter status `aprovado` no Supabase.

### Acceptance Criteria

- [ ] Grid ou lista de depoimentos em formato de cards, responsivos para mobile
- [ ] `TestimonialCard` exibe: foto da revendedora (ou avatar genérico se não houver), nome (pode ser parcial, ex: "Maria S."), cidade, depoimento em texto, resultado em destaque (ex: "Ganhei R$1.200 no primeiro mês"), data do depoimento formatada em pt-BR
- [ ] Apenas depoimentos com `status = 'aprovado'` são exibidos
- [ ] Depoimentos ordenados por `display_order` ASC (conforme configurado no admin)
- [ ] Mínimo de 6 depoimentos esperados ao lançamento (conteúdo fornecido pela proprietária)
- [ ] Estado vazio (sem depoimentos aprovados): exibe mensagem amigável e CTA para "Seja Revendedora"
- [ ] CTA ao final da página: "Quero me tornar revendedora" → `/seja-revendedora`
- [ ] `generateMetadata()` com title e description específicos
- [ ] ISR com revalidação de 300s; revalida via webhook ao aprovar/reprovar depoimento no admin

### Fora de Escopo

- Admin de gestão de depoimentos (Story 4.5)
- Upload de fotos de depoimentos (Story 4.5)

---

## Story 2.5 — Sobre Nós & Contato

**Prioridade:** SHOULD  
**FR associado:** FR-006  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 1–2 dias

### Descrição

Páginas que humanizam o negócio e aumentam a confiança do visitante. O conteúdo da página "Sobre Nós" é editável via admin > configurações. A página de Contato direciona para WhatsApp e redes sociais.

### Acceptance Criteria

#### Página Sobre Nós (/sobre)

- [ ] Seção com história da marca — conteúdo carregado de `site_settings.about_text` (texto livre)
- [ ] Foto da proprietária ou da marca — configurável via admin (campo de upload de imagem)
- [ ] Seção de missão e valores (texto livre, pode ser parte do `about_text` ou campo separado)
- [ ] CTA ao final: "Seja Revendedora" → `/seja-revendedora` ou botão WhatsApp
- [ ] Links para redes sociais
- [ ] ISR com revalidação de 3600s; revalida via webhook ao salvar configurações

#### Página de Contato (/contato)

- [ ] Botão de WhatsApp com mensagem geral: "Olá! Vim pelo site Revendendo Make e gostaria de mais informações."
- [ ] Email de contato (se configurado em `site_settings.contact_email`) exibido como link `mailto:`
- [ ] Links para redes sociais (Instagram, TikTok, Facebook, YouTube) carregados do `site_settings`
- [ ] CTA para "Seja Revendedora"

#### Política de Privacidade (/politica-privacidade)

- [ ] Texto da política carregado de `site_settings.privacy_policy_text`
- [ ] Página necessária para o checkbox LGPD do formulário de lead (Story 2.2)
- [ ] Fallback: se texto não configurado, exibe mensagem orientando a configurar via admin

#### SEO

- [ ] `generateMetadata()` específico para cada página
- [ ] H1 único e hierarquia de headings correta

### Fora de Escopo

- Formulário de contato (vendas são via WhatsApp — sem formulário de contato na v1)
- Chat online

---

*Epic 2 — Total: 5 stories | Estimativa total: 11–16 dias*  
*Synkra AIOX — @po (Pax) — v1.0*
