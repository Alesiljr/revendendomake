# PO Validation Report — Revendendo Make

**Validado por:** Pax (@po) — Synkra AIOX  
**Data:** 24 de abril de 2026  
**Status:** APPROVED (com story updates obrigatórios aplicados)

---

## Resultado por Documento

### project-brief.md — PASS

| Critério | Status | Observação |
|----------|--------|------------|
| Problema claramente declarado | PASS | Seção 1 e tabela comparativa Canva vs. Site Próprio são objetivos e mensuráveis |
| Público-alvo definido | PASS | Persona 1 (Revendedora) e Persona 2 (Comprador Final) documentadas com profundidade |
| Objetivos de negócio mensuráveis | PASS | 3 objetivos com metas indicativas em 3 e 6 meses (OBJ-1: 50 leads/mês; OBJ-2: ≥5% conversão; OBJ-3: SEO Top 10) |
| Escopo claro (in/out) | PASS | Seção 9 "Fora de Escopo — v1" lista 7 itens excluídos com justificativa |
| Premissas documentadas | PASS | Seção 8 — 5 premissas com impacto documentado |
| Riscos identificados | PASS | Seção 8 — 5 riscos com probabilidade, impacto e mitigação |

**Observação menor:** A Persona 3 (Proprietária/Administradora) está presente no PRD mas não está explicitamente descrita no project-brief. Isso não bloqueia — o brief descreve a proprietária como usuária admin na Seção F6, apenas sem formalizar como persona.

**Veredicto: PASS** — 6/6 critérios atendidos.

---

### prd.md — PASS

| Critério | Status | Observação |
|----------|--------|------------|
| Todos os FRs têm IDs únicos (FR-XXX) | PASS | FR-001 a FR-017, sem duplicatas |
| Todos os FRs têm critérios de aceitação | PASS | Todos os 17 FRs têm lista de ACs com checkbox |
| Todos os FRs têm prioridade (MUST/SHOULD/COULD) | PASS | Declarado em cada FR — 11 MUST, 6 SHOULD, 0 COULD |
| NFRs cobrem performance, segurança, acessibilidade e SEO | PASS | NFR-001 (Performance), NFR-002 (Segurança), NFR-003 (Acessibilidade WCAG 2.1 AA), NFR-004 (SEO) — todos com critérios mensuráveis |
| Épicos são coesos (stories agrupadas logicamente) | PASS | 5 épicos com objetivo claro e critério de conclusão definido |
| Stories têm critérios "done when" claros | PASS | Resumo e prioridade em cada story; ACs detalhados nos FRs correspondentes |
| Nenhuma story depende de requisito indefinido | PASS | Apêndice A rastreia FR→Epic→Story; sem dependência circular |
| Questões em aberto documentadas | PASS | Seção 10 — 12 questões com responsável e prazo para decisão |
| Premissas listadas | PASS | Seção 8 — 10 premissas (P-1 a P-10) |
| Sem conflito entre FRs | PASS | Revisão transversal: sem conflito identificado entre os 17 FRs |

**Issues menores identificados:**
- A **Story 1.4** (Configuração do Banco de Dados e Supabase Storage) sugerida pelo @architect não existe ainda no PRD — será adicionada como parte das atualizações obrigatórias desta validação.
- O **Story 2.2** não inclui explicitamente o checkbox de LGPD e a captura de UTM params na Story — inclusão necessária.
- Os **Stories 4.3 e 4.7** não incluem o trigger de ISR revalidation nos ACs da Story — inclusão necessária.
- A **Story 1.2** não menciona middleware de proteção de rotas nem tipagem via Supabase CLI — inclusão sugerida (menor, não bloqueia).

**Veredicto: PASS** — 10/10 critérios atendidos. Story updates obrigatórios identificados (4 itens — ver seção específica abaixo).

---

### front-end-spec.md — PASS

| Critério | Status | Observação |
|----------|--------|------------|
| Design tokens definidos (cores, tipografia, espaçamento) | PASS | Seção 1 completa: paleta com 8 grupos de tokens, escala tipográfica mobile e desktop, espaçamento base 4px, border-radius, sombras |
| Todas as páginas do PRD têm wireframe | PASS | 13 wireframes: Home, Seja Revendedora, Catálogo, Detalhe Produto, Depoimentos, Blog Listagem, Blog Artigo, Sobre, Contato, Dashboard Admin, Produtos Admin, Leads Admin, Depoimentos Admin, Blog Admin, Configurações Admin |
| Biblioteca de componentes cobre todos os elementos UI necessários | PASS | Átomos (Button, Input, Checkbox, Badge, Avatar, Image), Moléculas (ProductCard, TestimonialCard, LeadForm, BlogPostCard, NavBar, Footer), Organismos (Hero, Benefits, HowItWorks, FeaturedProducts, TestimonialsCarousel, SocialFeedSection, FAQAccordion, WhatsAppFAB), Admin Components (StatsCard, DataTable, StatusBadge, RichTextEditor, FileUpload) |
| Mobile-first documentado | PASS | Seção 1.4 (Grid e Breakpoints), Seção 5.4 (UX Mobile Regras Gerais), wireframes prioritariamente em 375px mobile |
| Admin panel UX descrito | PASS | Seções 2.4 (Componentes Admin), 3.8–3.13 (wireframes admin completos) |
| Requisitos de acessibilidade declarados | PASS | Seção 6 (Acessibilidade) com WCAG 2.1 AA, contraste 4.5:1, touch targets 44px, aria-labels, foco visível, `prefers-reduced-motion` |
| Pontos de integração com WhatsApp especificados | PASS | Seção 5.1 — tabela completa de mensagens por página/contexto; formato wa.me; botão flutuante especificado em 2.3 |

**Observação menor:** O wireframe da página `/politica-de-privacidade` está listado em Seção 4.1 como rota auxiliar mas não possui wireframe dedicado na Seção 3. Dado que o conteúdo é texto simples (política LGPD configurável via admin), isso não é um bloqueador — o padrão de layout pode ser derivado do wireframe "Sobre".

**Veredicto: PASS** — 7/7 critérios atendidos.

---

### fullstack-architecture.md — PASS

| Critério | Status | Observação |
|----------|--------|------------|
| Stack tecnológica justificada | PASS | Seções 1.2 e 1.3 — cada tecnologia tem justificativa documentada (Next.js 15: SSG/ISR/SSR; Supabase: Auth+Storage+RLS; Vercel: CDN+deploy; Tiptap: JSONB; etc.) |
| Schema cobre todos os dados do PRD | PASS | 5 tabelas + enums: `categories`, `products`, `leads`, `testimonials`, `posts`, `site_settings` — mapeiam diretamente para FR-001–FR-017 |
| Rotas de API cobrem todas as operações de dados | PASS | POST /api/leads, POST /api/revalidate, GET /api/leads/export; operações admin via Supabase SDK em Server Components |
| Autenticação/Autorização projetada | PASS | Seção 5: Supabase Auth com JWT httpOnly cookies, middleware Next.js, RLS em todas as tabelas, flow de login documentado |
| Pipeline de deploy descrito | PASS | Seção 6.2: CI/CD via Vercel webhook automático, etapas typecheck → lint → build → deploy; Seção 6.1: 3 ambientes (dev/preview/prod) |
| Estratégia de performance aborda NFR-001 | PASS | Seção 7: SSG+ISR por rota, orçamento JS (<100KB first load), otimização de imagens (AVIF/WebP, priority para hero), Core Web Vitals targets alinhados com NFR-001 |
| Segurança aborda NFR-002 | PASS | Seção 5.2 + 5.3: HTTPS, HSTS, RLS, rate limiting, validação Zod dupla, DOMPurify, headers CSP/X-Frame-Options/etc., secrets via env vars |
| Arquitetura SEO aborda NFR-004 | PASS | Seção 8: metadata dinâmica, JSON-LD (Organization, Product, Article, Breadcrumb), sitemap automático via next-sitemap, robots.txt, canonical URLs |

**Observação menor:** O rate limiting em produção está descrito como "in-memory map (produção: Upstash Redis)" — a escolha de Upstash Redis não está listada na stack tecnológica (Seção 1.3). Isso é uma lacuna de documentação menor; a nota na seção 4.1 é suficiente para o desenvolvedor entender a intenção. Não bloqueia.

**Veredicto: PASS** — 8/8 critérios atendidos.

---

## Consistência entre Documentos — PASS

| Critério | Status | Observação |
|----------|--------|------------|
| Stories do PRD alinhadas com sugestões da arquitetura | PASS (após updates) | Arquitetura sugere Story 1.4 e ACs adicionais — sendo incorporados nesta validação |
| Componentes front-end cobrem os FRs | PASS | WhatsAppFAB (FR-007), LeadForm (FR-002), ProductCard+Grid (FR-003), TestimonialCard (FR-004), RichTextEditor (FR-012), FileUpload (FR-009/011) — todos presentes |
| Tabelas do banco cobrem entidades do PRD | PASS | `leads` → FR-002/FR-010; `products` → FR-003/FR-009; `testimonials` → FR-004/FR-011; `posts` → FR-005/FR-012; `site_settings` → FR-014/FR-007 |
| Personas do project-brief coincidem com PRD | PASS | Persona 1 (Revendedora) e Persona 2 (Comprador Final) idênticas; PRD adiciona Persona 3 (Gestora/Admin) — extensão consistente |
| Variáveis de ambiente da arquitetura cobrem o deployment | PASS | 8 variáveis documentadas em Seção 6.4: SUPABASE_URL, ANON_KEY, SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_FROM, REVALIDATE_SECRET, WHATSAPP_DEFAULT, GA_ID |

**Veredicto: PASS** — 5/5 critérios de consistência atendidos.

---

## Issues Encontrados

### Issues Críticos

Nenhum issue crítico identificado. Todos os documentos são coerentes, rastreáveis e executáveis.

### Issues Menores (não bloqueiam desenvolvimento)

| # | Documento | Issue | Recomendação |
|---|-----------|-------|--------------|
| M-1 | project-brief.md | Persona 3 (Proprietária/Gestora) não está formalizada como persona, apenas descrita implicitamente | Aceito como-está — PRD formaliza a Persona 3 adequadamente |
| M-2 | prd.md | Story 1.4 (DB Setup) ausente — pré-requisito para todos os outros stories | **Adicionada nesta validação** (ver Story Updates) |
| M-3 | prd.md | Story 2.2 sem ACs de LGPD (checkbox) e UTM capture | **Atualizada nesta validação** |
| M-4 | prd.md | Stories 4.3 e 4.7 sem AC de ISR revalidation trigger | **Atualizadas nesta validação** |
| M-5 | fullstack-architecture.md | Upstash Redis não consta na tabela de stack (Seção 1.3) | Adicionar Upstash Redis como dependência opcional em v2 da arquitetura |
| M-6 | front-end-spec.md | Página /politica-de-privacidade sem wireframe dedicado | Não bloqueia — padrão de layout derivável de /sobre; criar wireframe simples na Story 2.2 |
| M-7 | prd.md | Q-4 (texto LGPD) e Q-11 (banner de cookies) em aberto — afetam Story 2.2 diretamente | Resolver antes de iniciar Story 2.2 (pré-requisito legal) |

---

## Story Updates Necessários

### Story 1.4 — NOVA: Configuração do Banco de Dados e Supabase Storage

**Epic:** 1 — Foundation & Infrastructure  
**Prioridade:** MUST (pré-requisito para todos os demais stories)  
**Posição:** Após Story 1.2 (Tech Stack Setup), antes de qualquer story do Epic 2

**Resumo:** Aplicar o DDL completo no Supabase Cloud (tabelas, enums, índices, triggers, RLS policies), criar os buckets de Storage com restrições de MIME type, configurar a conta de admin via Supabase Auth, e verificar que as policies de RLS funcionam corretamente via testes manuais.

**Critérios de Aceitação:**
- [ ] Todas as tabelas criadas conforme DDL da arquitetura: `categories`, `products`, `leads`, `testimonials`, `posts`, `site_settings` — com constraints, índices e triggers de `updated_at`
- [ ] ENUMs criados: `lead_status`, `post_status`, `testimonial_status`
- [ ] RLS habilitado em todas as tabelas com policies corretas (leitura pública condicional, escrita apenas autenticado, leads: insert anônimo / select admin)
- [ ] Buckets de Supabase Storage criados: `products` (5MB, jpg/png/webp), `testimonials` (2MB), `site-assets` (5MB, +svg/ico), `blog` (5MB)
- [ ] Storage policies criadas: upload apenas autenticado, leitura pública
- [ ] Linha inicial em `site_settings` inserida com valores padrão via `INSERT ... ON CONFLICT DO NOTHING`
- [ ] Conta de admin criada via Supabase Dashboard com senha forte (mínimo 12 caracteres, maiúsculas, números, especiais)
- [ ] Tipos TypeScript gerados via `supabase gen types typescript` e commitados em `src/types/database.ts`
- [ ] Script npm `db:types` configurado em `package.json` para regenerar tipos
- [ ] Variáveis de ambiente documentadas em `.env.example` (sem valores reais)
- [ ] Teste manual PASS: usuário anônimo consegue inserir lead, NÃO consegue ler leads existentes
- [ ] Teste manual PASS: usuário anônimo consegue ler produtos ativos, NÃO consegue ver produtos inativos
- [ ] Teste manual PASS: usuário autenticado como admin consegue ler/editar todas as tabelas

---

### Story 2.2 — Atualização de ACs: LGPD + UTM Capture

**Adicionar aos Critérios de Aceitação existentes:**
- [ ] Checkbox de aceite à Política de Privacidade é obrigatório antes do envio do formulário (campo `lgpd_consent: boolean` — formulário bloqueado se não marcado)
- [ ] Texto do checkbox inclui link âncora para `/politica-de-privacidade` que abre em nova aba
- [ ] Texto da política de privacidade é o configurado via admin > configurações (campo `privacy_policy_text`)
- [ ] Campo `source` no lead captura UTM params da URL quando presentes (ex: `?utm_source=tiktok&utm_medium=bio&utm_campaign=reels` → salvo como `source: "tiktok"` ou concatenação legível)
- [ ] Se não houver UTM params, `source` é preenchido com `"seja-revendedora"` (padrão)
- [ ] Lead salvo inclui `lgpd_consent: true` como evidência de consentimento (campo `notes` ou coluna adicional se necessário)

---

### Story 4.3 — Atualização de ACs: ISR Revalidation Trigger

**Adicionar aos Critérios de Aceitação existentes:**
- [ ] Ao ativar, desativar ou salvar qualquer produto, o admin chama automaticamente `POST /api/revalidate` com `{ path: '/produtos' }` e `{ path: '/produtos/[slug]' }` após salvar com sucesso no banco
- [ ] Ao marcar produto como destaque ou remover destaque, revalida também `{ path: '/' }` (home exibe produtos em destaque)
- [ ] Validação no servidor (não apenas frontend) impede mais de 6 produtos simultâneos com `featured = true`
- [ ] Upload de imagens envia para Supabase Storage bucket `products/` e salva URL pública no array `images[]` do produto

---

### Story 4.7 — Atualização de ACs: ISR Revalidation + Sanitização WhatsApp

**Adicionar aos Critérios de Aceitação existentes:**
- [ ] Ao salvar configurações, o admin chama automaticamente `POST /api/revalidate` com `{ path: '/' }` e `{ path: '/seja-revendedora' }` para atualizar conteúdo público sem necessidade de redeploy
- [ ] Campo `whatsapp_number` é sanitizado automaticamente ao salvar: remove `+`, espaços, traços e parênteses — armazena apenas dígitos no formato `5511999999999`
- [ ] Validação no servidor confirma que o número tem 12–13 dígitos (código país 55 + DDD + número)

---

## Veredicto Final

**APPROVED**

**Justificativa:** Todos os 4 documentos de planejamento passaram na validação. Os documentos são coesos, rastreáveis entre si e executáveis pelo time de desenvolvimento. As personas do project-brief estão alinhadas com as do PRD; o schema do banco cobre todas as entidades funcionais; os componentes da front-end-spec cobrem todos os FRs do PRD; a arquitetura endereça todos os NFRs. Os 7 issues encontrados são todos menores — nenhum é crítico ou bloqueador para iniciar o desenvolvimento. Os 4 story updates (1 nova story + 3 atualizações de ACs) foram incorporados ao `prd.md` como parte desta validação.

**Resumo quantitativo:**
- Issues críticos: **0**
- Issues menores: **7** (dos quais 4 foram resolvidos via story updates ao PRD)
- Story updates aplicados: **4** (Story 1.4 adicionada; Stories 2.2, 4.3, 4.7 atualizadas)
- Documentos aprovados: **4/4**

---

## Próximos Passos

1. **@sm (River)** — Criar o arquivo de story `docs/stories/1.4.story.md` com base nos ACs definidos para Story 1.4 neste relatório
2. **@sm (River)** — Atualizar os arquivos de story `2.2.story.md`, `4.3.story.md` e `4.7.story.md` com os ACs adicionados (se os arquivos já existirem)
3. **Proprietária** — Resolver Q-4 (texto da política de privacidade LGPD) e Q-11 (banner de cookies) antes de iniciar Story 2.2 — são pré-requisitos legais
4. **Proprietária** — Resolver Q-1 (disponibilidade do domínio revendendomake.com.br) antes de iniciar Epic 1
5. **@dev (Dex)** — Iniciar Epic 1 pelo Story 1.1 (Environment Setup & Domain Configuration), seguido de Story 1.2 e Story 1.4
6. **@architect (Aria)** — Atualizar Seção 1.3 da arquitetura para incluir Upstash Redis como dependência opcional de produção (rate limiting)

---

*Relatório gerado por Pax (@po) — Synkra AIOX v2.0*  
*Para uso interno — Revendendo Make*
