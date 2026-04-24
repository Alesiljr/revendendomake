# Epic 4 — Painel Administrativo

**Projeto:** Revendendo Make  
**Epic:** 4 de 5  
**Objetivo:** Implementar o painel admin completo para gestão autônoma do site pela proprietária.  
**Critério de Conclusão:** Proprietária consegue realizar todas as operações de gestão (produtos, leads, depoimentos, blog, configurações) sem suporte técnico.  
**Prioridade:** MUST (Stories 4.1, 4.3, 4.4, 4.5, 4.7) | SHOULD (Stories 4.2, 4.6)

**Pré-requisito obrigatório:** Epic 1 completo (especialmente Stories 1.3 e 1.4 — design system admin e banco de dados).

**Princípios de UX do Admin:**
- Interface em Português do Brasil — nenhum jargão técnico
- Mensagens de erro acessíveis (ex: "Foto muito grande. Use uma imagem menor que 5MB")
- Ações irreversíveis (excluir) exigem confirmação explícita via `ConfirmDialog`
- Similar ao WordPress ou Instagram em termos de familiaridade

**Documentos de referência:**
- `docs/tech-stack.md` — stack e variáveis de ambiente
- `docs/coding-standards.md` — padrões de código
- `docs/source-tree.md` — onde criar os arquivos
- `docs/fullstack-architecture.md` — autenticação, RLS, API routes
- `docs/prd.md` — FR-009 a FR-014

---

## Story 4.1 — Admin — Autenticação & Layout

**Prioridade:** MUST  
**FR associado:** NFR-002 (Segurança)  
**Pré-requisitos:** Stories 1.2, 1.3, 1.4  
**Estimativa:** 1–2 dias

### Descrição

Login seguro com Supabase Auth, layout do admin (sidebar, header, navegação), proteção de rotas via middleware, e funcionalidade de logout. Este story é pré-requisito para todos os outros stories do Epic 4.

### Acceptance Criteria

#### Página de Login (/login)

- [ ] Formulário com campos: Email e Senha
- [ ] Validação frontend: email válido, senha não vazia
- [ ] Submissão via `supabase.auth.signInWithPassword({ email, password })`
- [ ] Estado de loading no botão ("Entrando..." com spinner)
- [ ] Erro de credenciais inválidas exibe mensagem amigável em pt-BR: "Email ou senha incorretos. Tente novamente."
- [ ] Após login bem-sucedido: redirect para `/admin/dashboard`
- [ ] Usuário já autenticado que acessa `/login` → redirect para `/admin/dashboard` (via middleware)
- [ ] HTTPS obrigatório (SSL ativo via Vercel — não renderizar em HTTP)

#### Proteção de Rotas (Middleware)

- [ ] `src/middleware.ts` implementado conforme `fullstack-architecture.md` seção 5.1
- [ ] Qualquer rota `/admin/*` sem sessão válida → redirect para `/login?redirect={pathname}`
- [ ] Após login, redirect para a URL original (via `searchParams.redirect`)
- [ ] Sessão expirada em `/admin/*` → redirect para `/login`

#### Layout do Admin

- [ ] `src/app/admin/layout.tsx` aplica `AdminSidebar` + `AdminHeader` em todas as páginas
- [ ] `AdminSidebar` com links de navegação e ícones Lucide:
  - Dashboard (LayoutDashboard)
  - Produtos (Package)
  - Leads (Users) — com badge de contagem de leads com status "novo"
  - Depoimentos (MessageSquareQuote)
  - Blog (FileText)
  - Configurações (Settings)
- [ ] Badge de leads novos: número de leads com `status = 'novo'` — atualizado a cada render do Server Component
- [ ] `AdminHeader` com: título da seção atual + botão "Sair" (LogOut icon)
- [ ] Botão "Sair" chama `supabase.auth.signOut()` e redireciona para `/login`
- [ ] Layout responsivo: sidebar colapsável em mobile (drawer), visível em desktop
- [ ] `AdminErrorBoundary` envolvendo o conteúdo de cada página admin

### Fora de Escopo

- Múltiplos usuários admin (v1 é single admin)
- Recuperação de senha (pode ser feita via Supabase Dashboard diretamente)
- Two-factor authentication (não previsto na v1)

---

## Story 4.2 — Admin — Dashboard

**Prioridade:** SHOULD  
**FR associado:** FR-013  
**Pré-requisitos:** Story 4.1 (layout admin), Stories 1.4 (banco com leads e produtos)  
**Estimativa:** 1–2 dias

### Descrição

Página inicial do painel administrativo com visão geral das principais métricas do negócio. O dashboard é um Server Component que busca as métricas diretamente do Supabase.

### Acceptance Criteria

#### Cards de Métricas

- [ ] Card: "Leads hoje" — COUNT de leads com `created_at >= início do dia atual (pt-BR timezone)`
- [ ] Card: "Leads nos últimos 7 dias" — COUNT de leads com `created_at >= 7 dias atrás`
- [ ] Card: "Leads no mês" — COUNT de leads com `created_at >= início do mês corrente`
- [ ] Card: "Leads novos (aguardando contato)" — COUNT de leads com `status = 'novo'`
- [ ] Card: "Produtos ativos" — COUNT de produtos com `active = true`
- [ ] Card: "Produtos em destaque" — COUNT de produtos com `featured = true`
- [ ] Cada `MetricCard` exibe: ícone Lucide, label em pt-BR, valor numérico, cor de destaque contextual

#### Tabela de Leads Recentes

- [ ] Tabela dos 5 leads mais recentes com colunas: Nome, WhatsApp (clicável → `wa.me`), Cidade, Data/Hora, Status (badge colorido)
- [ ] Link "Ver todos os leads" → `/admin/leads`

#### Ações Rápidas

- [ ] Botão "Adicionar produto" → `/admin/produtos/novo`
- [ ] Botão "Ver todos os leads" → `/admin/leads`
- [ ] Botão "Configurações" → `/admin/configuracoes`

#### Google Analytics 4 Embed (Opcional)

- [ ] Se `site_settings.ga4_measurement_id` estiver preenchido, exibe iframe do GA4 (ou link para abrir o painel GA4)
- [ ] Se não configurado, exibe card informativo orientando configurar em Configurações

#### Performance

- [ ] Dashboard carrega em menos de 3 segundos (queries otimizadas com `COUNT` no Supabase)
- [ ] Página é Server Component (sem client-side data fetching para as métricas)

---

## Story 4.3 — Admin — Gestão de Produtos

**Prioridade:** MUST  
**FR associado:** FR-009  
**Pré-requisitos:** Story 4.1 (layout admin), Story 1.4 (tabelas products e categories)  
**Estimativa:** 4–5 dias

### Descrição

CRUD completo de produtos via painel admin. Inclui listagem com filtros, formulário de criação/edição com upload de múltiplas fotos no Supabase Storage, toggles de ativo/destaque e exclusão com confirmação. Após salvar, aciona revalidação ISR das páginas públicas.

### Acceptance Criteria

#### Listagem de Produtos (/admin/produtos)

- [ ] Tabela com colunas: thumbnail (minatura 48x48px), nome, categoria, preço (ou "Consultar"), status ativo (toggle inline), destaque (toggle inline), ações (Editar, Excluir)
- [ ] Busca por nome de produto (debounce 300ms)
- [ ] Filtro por categoria (select)
- [ ] Filtro por status: Todos, Ativos, Inativos
- [ ] Ordenação padrão: criados mais recentemente primeiro
- [ ] Link "Adicionar produto" → `/admin/produtos/novo`

#### Formulário de Criação/Edição (/admin/produtos/novo e /admin/produtos/[id])

- [ ] Campo: Nome (texto, obrigatório, label em pt-BR)
- [ ] Campo: Descrição (textarea simples, ou rich text básico — não Tiptap)
- [ ] Campo: Categoria (select com opções do banco + botão "Criar nova categoria")
- [ ] Campo: Preço sugerido (numérico, opcional — se vazio exibe "Consultar" no site público)
- [ ] Campo: Preço de custo (numérico, opcional — visível apenas no admin)
- [ ] Campo: Estoque (numérico, padrão 0)
- [ ] Campo: Alt text da imagem principal (texto, para SEO e acessibilidade)
- [ ] Campo: Slug/URL amigável (gerado automaticamente via `generateSlug(nome)`, editável manualmente)
- [ ] Toggle: Ativo (produto visível no catálogo público)
- [ ] Toggle: Destaque (produto aparece na Home — máx 6)
- [ ] Upload de Imagens (`ImageUpload` component):
  - Upload múltiplo: mínimo 1, máximo 10 fotos
  - Aceita: JPG, PNG, WebP — máx 5MB cada
  - Preview de cada imagem antes de salvar
  - Reordenação por drag-and-drop
  - Botão de remoção em cada imagem
  - Upload envia para Supabase Storage bucket `products/` e salva URL no array `images[]`
  - Feedback de progresso durante upload
- [ ] Validação Zod: nome obrigatório, máx 6 em destaque (validação também no servidor)
- [ ] Botão "Salvar" com estado de loading
- [ ] Feedback de sucesso: toast "Produto salvo com sucesso"
- [ ] Feedback de erro: toast com mensagem amigável em pt-BR

#### Revalidação ISR

- [ ] Ao ativar/desativar produto: `POST /api/revalidate?secret={secret}` com `{ path: '/produtos' }` e `{ path: '/produtos/{slug}' }`
- [ ] Ao marcar/desmarcar como destaque: revalida também `{ path: '/' }` (home exibe produtos em destaque)
- [ ] Ao salvar produto novo: revalida `/produtos` e `/produtos/{slug}`

#### Exclusão de Produto

- [ ] Botão "Excluir" abre `ConfirmDialog`: "Tem certeza que deseja excluir o produto {nome}? Esta ação não pode ser desfeita."
- [ ] Apenas após confirmação: `supabase.from('products').delete().eq('id', id)`
- [ ] Após exclusão: revalida `/produtos` e redirect para `/admin/produtos`
- [ ] Imagens do Storage NÃO são excluídas automaticamente na v1 (cleanup manual via Supabase Dashboard)

#### Validação de Destaque (Servidor)

- [ ] Antes de salvar com `featured = true`, verificar: COUNT de produtos com `featured = true` < 6
- [ ] Se atingiu o limite: retorna erro 400 com mensagem "Máximo de 6 produtos em destaque já atingido. Remova o destaque de outro produto primeiro."

### Fora de Escopo

- Editor rich text para descrição de produto (textarea simples é suficiente na v1)
- Gestão de variantes de produto (cor, tamanho) — não previsto na v1
- Histórico de alterações de produto

---

## Story 4.4 — Admin — Gestão de Leads

**Prioridade:** MUST  
**FR associado:** FR-010  
**Pré-requisitos:** Story 4.1 (layout admin), Story 1.4 (tabela leads), Story 2.2 (formulário de captação)  
**Estimativa:** 2–3 dias

### Descrição

Visualização e gestão dos leads captados via formulário "Seja Revendedora". Permite que a proprietária acompanhe e qualifique os contatos, altere status e exporte para CSV.

### Acceptance Criteria

#### Tabela de Leads (/admin/leads)

- [ ] Tabela com colunas: nome, WhatsApp (clicável → `wa.me/{numero}`), cidade, data/hora do cadastro (DD/MM/AAAA HH:mm), status (badge colorido), ações
- [ ] Ordenação padrão: leads mais recentes primeiro (`created_at DESC`)
- [ ] Filtro por status: Todos, Novo, Contatado, Convertido, Descartado
- [ ] Filtro por período: data inicial e data final (date picker)
- [ ] Busca por nome, WhatsApp ou cidade (debounce 300ms)
- [ ] Paginação: 20 leads por página
- [ ] Badge/contador de leads com status "Novo" visível no topo da tabela: "X leads aguardando contato"

#### Alteração de Status

- [ ] Select de status inline na tabela (ou na página de detalhe) com opções: Novo, Contatado, Convertido, Descartado
- [ ] Ao alterar status: `supabase.from('leads').update({ status: novoStatus }).eq('id', id)`
- [ ] Feedback visual: badge de status atualiza imediatamente (optimistic update ou reload)

#### Exportação CSV

- [ ] Botão "Exportar CSV" — exporta os leads atualmente filtrados
- [ ] Chama `GET /api/leads/export?status={status}&from={from}&to={to}`
- [ ] CSV inclui todas as colunas: id, nome, WhatsApp, cidade, mensagem, source, status, notas, data de cadastro
- [ ] Nome do arquivo: `leads-{AAAA-MM-DD}.csv`
- [ ] Encoding UTF-8 com BOM (para compatibilidade com Excel em pt-BR)

#### Página de Detalhe do Lead (/admin/leads/[id])

- [ ] Exibe todos os dados do lead: nome, WhatsApp (link wa.me), cidade, mensagem, source (origem UTM), data de cadastro, status atual
- [ ] Campo "Notas internas" (textarea) para anotações da proprietária — salvo em `leads.notes`
- [ ] Select para alterar status diretamente nesta página
- [ ] Botão "Contatar no WhatsApp" → `wa.me/{numero}?text=Olá, {nome}! ...`
- [ ] Link "Voltar para lista de leads"

#### Regra de Negócio

- [ ] Leads NÃO podem ser excluídos — soft-delete apenas via status "Descartado"
- [ ] Botão de exclusão NÃO existe na interface (confirmado no design)

### Fora de Escopo

- Histórico detalhado de mudanças de status (log de auditoria) — não previsto na v1
- CRM completo com pipeline de vendas (v2)
- Notificações por email ao alterar status

---

## Story 4.5 — Admin — Gestão de Depoimentos

**Prioridade:** MUST  
**FR associado:** FR-011  
**Pré-requisitos:** Story 4.1 (layout admin), Story 1.4 (tabela testimonials)  
**Estimativa:** 2–3 dias

### Descrição

Interface para cadastrar, editar, aprovar e reprovar depoimentos de revendedoras e clientes exibidos no site. Apenas depoimentos com status "Aprovado" aparecem no site público.

### Acceptance Criteria

#### Listagem de Depoimentos (/admin/depoimentos)

- [ ] Tabela com colunas: nome, cidade, status (badge), data de cadastro, ações (Editar, Excluir)
- [ ] Filtro por status: Todos, Pendente, Aprovado, Reprovado
- [ ] Botão de aprovação/reprovação rápida inline na tabela (sem abrir a página de edição)
- [ ] Link "Adicionar depoimento" → `/admin/depoimentos/novo`

#### Formulário de Criação/Edição

- [ ] Campo: Nome (texto, obrigatório — pode ser parcial, ex: "Maria S.")
- [ ] Campo: Cidade (texto, obrigatório)
- [ ] Campo: Foto (upload opcional — JPG/PNG/WebP até 2MB — envia para bucket `testimonials/`)
- [ ] Preview da foto antes de salvar
- [ ] Campo: Texto do depoimento (textarea, obrigatório, máx 500 caracteres com contador)
- [ ] Campo: Resultado/transformação (texto, obrigatório, ex: "Ganhei R$1.200 no primeiro mês")
- [ ] Campo: Avaliação (select 1–5 estrelas, padrão 5)
- [ ] Campo: Ordem de exibição (numérico — menor número aparece primeiro)
- [ ] Select: Status (Pendente / Aprovado / Reprovado)
- [ ] Preview de como o card aparecerá no site antes de salvar

#### Revalidação ISR

- [ ] Ao aprovar ou reprovar depoimento: `POST /api/revalidate` para `/depoimentos` e `/` (home exibe depoimentos preview)

#### Exclusão

- [ ] Botão "Excluir" abre `ConfirmDialog`: "Tem certeza que deseja excluir o depoimento de {nome}?"
- [ ] Após confirmação: deleta do banco (depoimentos podem ser excluídos, diferente de leads)

### Fora de Escopo

- Coleta automática de depoimentos via formulário público (v2)
- Integração com Google Reviews

---

## Story 4.6 — Admin — Gestão de Blog

**Prioridade:** SHOULD  
**FR associado:** FR-012  
**Pré-requisitos:** Story 4.1 (layout admin), Story 1.4 (tabela posts)  
**Estimativa:** 3–4 dias

### Descrição

Sistema de criação e edição de artigos para o blog, com editor rich text Tiptap e configuração de metadados SEO. Artigos com status "Rascunho" nunca aparecem no site público.

### Acceptance Criteria

#### Listagem de Artigos (/admin/blog)

- [ ] Tabela com colunas: título, categoria, status (badge Publicado/Rascunho), data de publicação, ações
- [ ] Filtro por status: Todos, Publicado, Rascunho
- [ ] Link "Novo artigo" → `/admin/blog/novo`

#### Formulário de Criação/Edição (/admin/blog/novo e /admin/blog/[id])

- [ ] Campo: Título (texto, obrigatório)
- [ ] Campo: Slug/URL (gerado automaticamente via `generateSlug(título)`, editável)
- [ ] Campo: Imagem de capa (upload obrigatório — JPG/PNG/WebP até 5MB — bucket `blog/`)
- [ ] Campo: Alt text da imagem de capa (texto, para SEO)
- [ ] Campo: Excerpt/resumo (textarea, máx 300 caracteres com contador — usado como meta description padrão)
- [ ] Campo: Categoria (texto livre com sugestões das categorias existentes)
- [ ] Corpo do artigo: editor Tiptap (`RichTextEditor` component) com toolbar:
  - Cabeçalhos H2 e H3
  - Negrito, itálico
  - Listas ordenadas e não ordenadas
  - Links (com campo de URL)
  - Inserção de imagens (upload para bucket `blog/`)
  - Blocos de código
- [ ] Campo SEO: Meta title (texto, máx 60 caracteres com contador)
- [ ] Campo SEO: Meta description (textarea, máx 160 caracteres com contador)
- [ ] Select: Status (Rascunho / Publicado)
- [ ] Campo: Data de publicação (date picker — permite agendar publicação futura)
- [ ] Botão "Preview" — abre preview em nova aba (ou modal)
- [ ] Botão "Salvar" com estado de loading e feedback de sucesso

#### Revalidação ISR

- [ ] Ao publicar artigo: `POST /api/revalidate` para `/blog` e `/blog/{slug}`
- [ ] Ao despublicar artigo: `POST /api/revalidate` para `/blog` e `/blog/{slug}`

#### Regras de Negócio

- [ ] Artigos com `status = 'draft'` NUNCA aparecem no site público (verificado via RLS)
- [ ] Artigos agendados (published_at no futuro) não aparecem até atingir a data (verificado na query pública)
- [ ] Slug deve ser único — validação no servidor com mensagem amigável

### Fora de Escopo

- Histórico de versões de artigos (não previsto na v1)
- Comentários de leitores
- Categorias estruturadas como entidades separadas (texto livre é suficiente)

---

## Story 4.7 — Admin — Configurações do Site

**Prioridade:** MUST  
**FR associado:** FR-014  
**Pré-requisitos:** Story 4.1 (layout admin), Story 1.4 (tabela site_settings)  
**Estimativa:** 2–3 dias

### Descrição

Painel de configurações gerais do site. Permite que a proprietária atualize número de WhatsApp, redes sociais, textos da home, uploads de logo/favicon/og-image e GA4 ID sem necessidade de código ou redeploy.

### Acceptance Criteria

#### Seção: Contato e WhatsApp

- [ ] Campo: Número de WhatsApp principal (obrigatório)
  - Placeholder: "+55 (11) 99999-9999"
  - Sanitização ao salvar: remove `+`, espaços, traços, parênteses — armazena apenas dígitos no formato `5511999999999` (12–13 dígitos)
  - Validação: regex `/^55\d{10,11}$/` com mensagem "Número inválido. Use o formato: +55 (11) 99999-9999"
- [ ] Campo: E-mail de contato (opcional)

#### Seção: Redes Sociais

- [ ] Campo: URL do Instagram (opcional, ex: `https://instagram.com/revendendomake`)
- [ ] Campo: URL do TikTok (opcional)
- [ ] Campo: URL do Facebook (opcional)
- [ ] Campo: URL do YouTube (opcional)

#### Seção: Textos da Home

- [ ] Campo: Headline do hero (texto livre)
- [ ] Campo: Subheadline do hero (texto livre)
- [ ] Campos de 3 benefícios, cada um com: Título e Descrição

#### Seção: Sobre Nós

- [ ] Campo: Texto sobre a marca (textarea grande — carregado na página /sobre)
- [ ] Campo: Texto da Política de Privacidade (textarea — carregado na página /politica-privacidade)

#### Seção: Identidade Visual

- [ ] Upload: Logo do site (PNG/SVG — exibido no header) — envia para bucket `site-assets/`
- [ ] Upload: Favicon (ICO/PNG — exibido na aba do browser) — envia para bucket `site-assets/`
- [ ] Upload: Imagem padrão Open Graph (JPG/PNG, 1200x630px recomendado) — envia para bucket `site-assets/`
- [ ] Preview de cada imagem enviada

#### Seção: Analytics

- [ ] Campo: Google Analytics 4 Measurement ID (ex: `G-XXXXXXXXXX`)
- [ ] Texto explicativo: "Quando preenchido, o código do Google Analytics é inserido automaticamente em todas as páginas"
- [ ] Link para tutorial: "Como criar uma propriedade GA4"

#### Salvar e Revalidar

- [ ] Botão "Salvar Configurações" na parte inferior do formulário
- [ ] Estado de loading durante o salvamento
- [ ] Ao salvar com sucesso:
  - Toast: "Configurações salvas com sucesso!"
  - Chamada automática: `POST /api/revalidate` para `/` e `/seja-revendedora` e `/sobre`
- [ ] Ao salvar com erro: toast de erro com mensagem amigável em pt-BR
- [ ] Todas as alterações aplicadas ao site público sem redeploy

#### Validações de Segurança (Servidor)

- [ ] Endpoint de update de `site_settings` verifica autenticação via Supabase RLS
- [ ] `whatsapp_number` sanitizado e validado no servidor (não apenas no frontend)
- [ ] Uploads de imagem verificam MIME type e tamanho no servidor

### Fora de Escopo

- Múltiplos idiomas ou temas visuais
- Configuração de domínio (feita via Vercel Dashboard)
- Configuração de email transacional (Resend — variável de ambiente)

---

*Epic 4 — Total: 7 stories | Estimativa total: 15–22 dias*  
*Synkra AIOX — @po (Pax) — v1.0*
