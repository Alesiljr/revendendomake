# PRD — Revendendo Make

**Projeto:** Revendendo Make — Website Profissional  
**Versão:** 1.0  
**Data:** 24 de abril de 2026  
**Status:** Em Revisão  
**Autor:** Morgan (@pm) — Synkra AIOX  
**Baseado em:** `docs/project-brief.md` elaborado por Alex (@analyst)

---

## 1. Visão Geral do Produto

### 1.1 Declaração de Visão

Tornar o Revendendo Make a referência digital mais confiável e acessível no nicho de revenda de maquiagem no Brasil, por meio de um site profissional que transforma tráfego orgânico de redes sociais em leads qualificados, impulsiona vendas via WhatsApp e posiciona a marca como autoridade no segmento.

### 1.2 Declaração do Problema

A proprietária do Revendendo Make gera audiência orgânica qualificada no TikTok, Instagram/Reels e YouTube, mas perde conversões por falta de um destino digital profissional. A landing page atual no Canva:

- Não possui domínio próprio, comprometendo a credibilidade da marca.
- Não captura leads de forma estruturada — oportunidades de novos cadastros de revendedoras são perdidas diariamente.
- Não possui catálogo gerenciável, exigindo atualização manual e dependência de terceiros.
- Não oferece prova social estruturada para superar a desconfiança do público-alvo.
- Não é otimizada para SEO, deixando o negócio invisível no Google.
- Tem desempenho ruim em dispositivos móveis, prejudicando a experiência de 80–90% dos visitantes.

### 1.3 Visão Geral da Solução

Um site profissional, mobile-first, construído com tecnologia moderna (Next.js + Supabase), com domínio próprio (.com.br), que:

1. **Converte visitantes em leads** via página "Seja Revendedora" com formulário de captação.
2. **Direciona para vendas** via botão WhatsApp flutuante presente em todas as páginas.
3. **Exibe o portfólio de produtos** com catálogo visual gerenciável.
4. **Constrói autoridade** com blog SEO e depoimentos de revendedoras.
5. **Capacita a proprietária** com painel administrativo intuitivo, sem necessidade de suporte técnico.

---

## 2. Objetivos e Métricas de Sucesso

### 2.1 Objetivos de Negócio

| # | Objetivo | KPI | Meta | Prazo |
|---|----------|-----|------|-------|
| OBJ-1 | Aumentar captação de revendedoras | Leads de revendedoras/mês | ≥ 50 leads/mês | 3 meses |
| OBJ-2 | Converter tráfego social em ação | Taxa de conversão visitante → lead ou WhatsApp | ≥ 5% | 3 meses |
| OBJ-3 | Ativar revendedoras captadas | Taxa de conversão lead → revendedora ativa | ≥ 20% | 3 meses |
| OBJ-4 | Aumentar engajamento no site | Tempo médio na página | ≥ 2 minutos | 3 meses |
| OBJ-5 | Reduzir taxa de rejeição | Taxa de rejeição | ≤ 60% | 3 meses |
| OBJ-6 | Construir presença orgânica Google | Posição para termos-chave | Top 10 para 3+ termos | 6 meses |
| OBJ-7 | Crescer tráfego orgânico | Sessões/mês via Google | 500+ sessões/mês | 6 meses |

### 2.2 Objetivos Técnicos

| # | Objetivo | Critério de Sucesso |
|---|----------|---------------------|
| TEC-1 | Performance mobile | Lighthouse Score ≥ 90 em Performance, SEO, Accessibility |
| TEC-2 | Velocidade de carregamento | LCP < 2s em conexão 4G simulada |
| TEC-3 | Disponibilidade | Uptime ≥ 99.5% medido mensalmente |
| TEC-4 | Segurança | HTTPS obrigatório, admin protegido por autenticação robusta |
| TEC-5 | Manutenabilidade | Proprietária consegue atualizar produtos e leads sem suporte técnico |

### 2.3 Fora de Escopo — v1 (Non-Goals Explícitos)

Os itens a seguir **não serão implementados na v1**:

| Item Excluído | Justificativa |
|---------------|---------------|
| Gateway de pagamento / checkout online | Todas as vendas serão finalizadas via WhatsApp |
| Aplicativo mobile nativo (iOS/Android) | Site mobile-first atende a demanda; app nativo aumenta custo e prazo |
| Internacionalização (outros idiomas) | Público 100% brasileiro na v1 |
| Sistema de afiliados automatizado | Gestão manual de revendedoras é suficiente no estágio atual |
| CRM completo com pipeline de vendas | Painel básico de leads é suficiente; CRM pode ser adicionado na v2 |
| Chat online além do WhatsApp | WhatsApp já é o canal preferido do público-alvo |
| Programa de fidelidade / pontos | Complexidade desnecessária para v1 |
| Notificações push | Fora do escopo mobile-web atual |
| Múltiplos usuários admin / controle de acesso por papel | Single admin em v1 |
| Relatórios de analytics próprios | Google Analytics 4 embed é suficiente |

---

## 3. Personas de Usuário

### Persona 1 — Revendedora Potencial ("A Empreendedora")

**Perfil:** Mulher brasileira, 20–45 anos, classe C/D, busca renda extra.  
**Dispositivo:** Smartphone Android, rede 4G.  
**Canal de chegada:** TikTok, Reels, YouTube — vídeos sobre "como ganhar dinheiro em casa".  
**Motivação:** Renda extra com flexibilidade de horário, sem precisar sair de casa.  
**Medos:** "Será que é golpe?", medo do investimento inicial, dúvida sobre como vender.

**O site precisa responder:**
- Quanto preciso investir para começar?
- Como funciona o processo de compra e revenda?
- Quais são os ganhos reais de outras revendedoras?
- Terei suporte da empresa?

**Jornada principal:** Vê vídeo no TikTok → acessa o link na bio → chega na home → vai para "Seja Revendedora" → preenche formulário → é redirecionada ao WhatsApp.

---

### Persona 2 — Comprador Final ("A Consumidora")

**Perfil:** Mulher brasileira, 18–40 anos.  
**Dispositivo:** Smartphone, acesso via redes sociais.  
**Canal de chegada:** Indicação de revendedora, redes sociais, busca orgânica.  
**Motivação:** Comprar maquiagem de qualidade a preço acessível.  
**Medos:** Produto falsificado, dificuldade de encontrar variedade.

**O site precisa oferecer:**
- Catálogo visual com fotos reais dos produtos.
- Preços claros ou indicação de consulta via WhatsApp.
- CTA direto para compra via WhatsApp.

**Jornada principal:** Indicada por revendedora → acessa o site → navega pelo catálogo → clica em "Comprar via WhatsApp" → conclui compra no WhatsApp.

---

### Persona 3 — Proprietária / Administradora ("A Gestora")

**Perfil:** Proprietária do negócio, gerencia tudo sozinha, sem equipe técnica.  
**Dispositivo:** Smartphone e notebook.  
**Motivação:** Atualizar produtos, ver leads captados, publicar conteúdo sem depender de desenvolvedor.  
**Limitação:** Sem conhecimento técnico de código ou sistemas complexos.

**O admin precisa ser:**
- Intuitivo o suficiente para uso independente.
- Rápido para tarefas do dia a dia (ver novos leads, ativar/desativar produto).
- Confiável e com dados sempre atualizados.

---

## 4. Requisitos Funcionais

### FR-001: Landing Page Principal

**Descrição:** Página inicial do site, otimizada para converter visitantes vindos de redes sociais. Deve comunicar a proposta de valor em menos de 5 segundos e direcionar o usuário para as principais ações: tornarem-se revendedoras ou comprarem produtos.

**Critérios de Aceitação:**
- [ ] Hero section exibe headline focada em benefício (ex: "Ganhe dinheiro revendendo maquiagem de qualidade"), subheadline e CTA primário visível acima do fold em mobile.
- [ ] CTA primário "Seja Revendedora" redireciona para `/seja-revendedora`.
- [ ] CTA secundário "Ver Produtos" redireciona para `/catalogo`.
- [ ] Seção de benefícios exibe no mínimo 3 diferenciais do negócio com ícone e texto curto.
- [ ] Seção de depoimentos destaque (preview, máximo 3 cards) com link para página completa de depoimentos.
- [ ] Seção de produtos em destaque (máximo 6 produtos marcados como "destaque" no admin) com link para catálogo completo.
- [ ] Seção de integração com redes sociais (embed de posts TikTok/Instagram ou feed de vídeos).
- [ ] Links para perfis sociais no header e footer.
- [ ] Página carrega em menos de 2 segundos em conexão 4G simulada (Lighthouse).
- [ ] Layout totalmente responsivo e testado em mobile (375px), tablet (768px) e desktop (1280px).

**Prioridade:** MUST  
**Persona:** Persona 1 e Persona 2

---

### FR-002: Página "Seja Revendedora"

**Descrição:** Principal funil de captação de leads do site. Deve responder todas as dúvidas da Persona 1, eliminar objeções e converter visitantes em cadastros.

**Critérios de Aceitação:**
- [ ] Seção hero com headline voltada à revendedora potencial e CTA de formulário visível above the fold.
- [ ] Seção "Como Funciona" explica o processo em 3–5 passos ilustrados (investimento inicial, compra de produtos, venda, ganhos).
- [ ] Seção "Benefícios" lista vantagens de ser revendedora Revendendo Make (flexibilidade, suporte, margem de lucro, etc.).
- [ ] Seção de depoimentos de revendedoras ativas (mínimo 3, preferencialmente com resultado financeiro real).
- [ ] Formulário de captação com campos: Nome completo (obrigatório), Número de WhatsApp (obrigatório, formato brasileiro), Cidade (obrigatório), Mensagem/dúvidas (opcional).
- [ ] Validação de formulário no frontend (campos obrigatórios, formato de telefone).
- [ ] Após envio com sucesso: exibe mensagem de confirmação e botão "Falar no WhatsApp agora" com mensagem pré-formatada ("Olá! Me cadastrei para ser revendedora Revendendo Make.").
- [ ] Lead é salvo automaticamente no banco de dados com: nome, WhatsApp, cidade, mensagem (se houver), data/hora do cadastro, status inicial "novo".
- [ ] Formulário exibe feedback de erro claro em caso de falha no envio.
- [ ] FAQ com mínimo de 5 perguntas frequentes sobre como se tornar revendedora.
- [ ] Checkbox de aceite à Política de Privacidade (LGPD) é obrigatório antes do envio do formulário — formulário bloqueado se não marcado.
- [ ] Texto do checkbox inclui link para `/politica-de-privacidade` que abre em nova aba; texto da política é configurável via admin > configurações.
- [ ] Campo `source` captura UTM params da URL quando presentes (ex: `?utm_source=tiktok`) e salva no banco; padrão `"seja-revendedora"` se não houver UTM params.

**Prioridade:** MUST  
**Persona:** Persona 1

---

### FR-003: Catálogo de Produtos

**Descrição:** Galeria visual de todos os produtos disponíveis para revenda e compra direta, com funcionalidade de filtro e CTA para WhatsApp por produto.

**Critérios de Aceitação:**
- [ ] Grid de produtos responsivo: 1 coluna em mobile, 2 em tablet, 3–4 em desktop.
- [ ] Cada card de produto exibe: foto principal (otimizada WebP), nome do produto, categoria, preço (ou "Consultar" se sem preço), botão "Comprar via WhatsApp".
- [ ] Botão "Comprar via WhatsApp" abre link `wa.me/{numero}` com mensagem pré-formatada contendo o nome do produto.
- [ ] Filtro por categoria funcional (ex: batom, base, paleta, sombra, cuidados com a pele).
- [ ] Filtro por faixa de preço (ex: Até R$30, R$30–R$60, Acima de R$60).
- [ ] Campo de busca por nome de produto.
- [ ] Página de detalhe do produto exibe: todas as fotos (galeria/carrossel), descrição completa, categoria, preço, e botão "Comprar via WhatsApp".
- [ ] Produtos inativos não são exibidos no catálogo público.
- [ ] Estado vazio (sem produtos na categoria) exibe mensagem amigável.
- [ ] Paginação ou infinite scroll para catálogos com muitos produtos.

**Prioridade:** MUST  
**Persona:** Persona 1 e Persona 2

---

### FR-004: Página de Depoimentos

**Descrição:** Galeria completa de depoimentos de revendedoras e clientes, principal elemento de prova social para superar a desconfiança da Persona 1.

**Critérios de Aceitação:**
- [ ] Grid ou lista de depoimentos em formato de cards, responsivos para mobile.
- [ ] Cada card exibe: foto da revendedora/cliente (opcional, exibe avatar genérico se não houver), nome (pode ser parcial por privacidade), cidade, depoimento em texto, resultado financeiro ou transformação destacada (ex: "Ganhei R$1.200 no primeiro mês"), data do depoimento.
- [ ] Mínimo de 6 depoimentos exibidos ao lançamento.
- [ ] Depoimentos aprovados no admin são exibidos automaticamente no site.
- [ ] CTA ao final da página direcionando para "Seja Revendedora".

**Prioridade:** MUST  
**Persona:** Persona 1 e Persona 2

---

### FR-005: Blog / Conteúdo para SEO

**Descrição:** Sistema de blog com artigos otimizados para SEO, permitindo que a proprietária publique conteúdo via painel admin sem conhecimento técnico.

**Critérios de Aceitação:**
- [ ] Listagem de artigos com: thumbnail, título, resumo (excerpt), data de publicação, categoria.
- [ ] Página de artigo individual com: título, meta description, Open Graph tags, data, autor (fixo: "Revendendo Make"), categoria, corpo do artigo com rich text formatado, imagem de capa.
- [ ] URLs amigáveis e únicas para cada artigo (slug gerado automaticamente a partir do título).
- [ ] Filtro/navegação por categoria na listagem.
- [ ] Busca de artigos por palavra-chave.
- [ ] Artigos rascunho não são exibidos no site público; apenas artigos publicados são visíveis.
- [ ] Seção "Artigos Relacionados" ao final de cada artigo (mínimo 2 sugestões da mesma categoria).
- [ ] Links internos para produtos do catálogo funcionam corretamente dentro dos artigos.
- [ ] Integração de Schema.org `Article` markup para cada artigo.

**Prioridade:** SHOULD  
**Persona:** Persona 1, Persona 2

---

### FR-006: Página Sobre Nós

**Descrição:** Página que conta a história da marca, missão e valores, humanizando o negócio e aumentando a confiança do visitante.

**Critérios de Aceitação:**
- [ ] Seção de história da marca (texto livre editável via admin > configurações).
- [ ] Foto da proprietária ou da marca (imagem configurável via admin).
- [ ] Seção de missão e valores (texto livre editável via admin).
- [ ] CTA ao final direcionando para "Seja Revendedora" ou WhatsApp.
- [ ] Links para redes sociais.

**Prioridade:** SHOULD  
**Persona:** Persona 1 e Persona 2

---

### FR-007: Integração WhatsApp — Botão Flutuante e CTAs Contextuais

**Descrição:** WhatsApp é o canal primário de conversão. Deve estar acessível em todas as páginas com mensagens pré-formatadas contextuais para cada tipo de interesse.

**Critérios de Aceitação:**
- [ ] Botão flutuante de WhatsApp (ícone do WhatsApp verde) fixo no canto inferior direito em todas as páginas do site público.
- [ ] Botão flutuante usa mensagem padrão: "Olá! Vim pelo site Revendendo Make e gostaria de mais informações."
- [ ] Página "Seja Revendedora": CTA WhatsApp com mensagem "Olá! Quero saber mais sobre como me tornar revendedora."
- [ ] Catálogo de Produtos: cada produto tem botão "Comprar via WhatsApp" com mensagem "Olá! Tenho interesse no produto: [Nome do Produto]."
- [ ] Número de WhatsApp configurável pelo painel admin (sem necessidade de redeploy).
- [ ] Links usam formato `wa.me/{numero}?text={mensagem_codificada}` sem dependência de API paga.
- [ ] Botão flutuante é acessível (aria-label descritivo, contraste adequado).

**Prioridade:** MUST  
**Persona:** Persona 1 e Persona 2

---

### FR-008: Integração com Redes Sociais

**Descrição:** Exibição de conteúdo das redes sociais da marca no site para aumentar o tempo de permanência, reforçar prova social e incentivar seguidores.

**Critérios de Aceitação:**
- [ ] Seção na Home com embed de posts recentes do Instagram e/ou TikTok (via oEmbed ou widget oficial).
- [ ] Links para perfis sociais (Instagram, TikTok, Facebook, YouTube) no header e footer com ícones reconhecíveis.
- [ ] Open Graph tags completas em todas as páginas: `og:title`, `og:description`, `og:image`, `og:url`.
- [ ] Twitter Card tags presentes para compatibilidade com X/Twitter.
- [ ] Imagem de compartilhamento padrão (og:image) configurável via admin.
- [ ] Embeds carregam de forma lazy (não bloqueiam o carregamento da página).
- [ ] Fallback gracioso se embed de rede social falhar (link para o perfil em vez do embed).

**Prioridade:** SHOULD  
**Persona:** Persona 1 e Persona 2

---

### FR-009: Admin — Gestão de Produtos

**Descrição:** Interface administrativa completa para criação, edição e remoção de produtos do catálogo, sem necessidade de conhecimento técnico.

**Critérios de Aceitação:**
- [ ] Listagem de todos os produtos com colunas: thumbnail, nome, categoria, preço, status (ativo/inativo), destaque (sim/não), ações (editar, excluir).
- [ ] Busca e filtro por categoria na listagem do admin.
- [ ] Formulário de criação/edição de produto com campos: Nome (obrigatório), Descrição (rich text básico ou textarea), Categoria (select, com opção de criar nova), Preço (campo numérico, opcional — se vazio exibe "Consultar"), Fotos (upload múltiplo, mínimo 1, máximo 10, aceita JPG/PNG/WebP até 5MB cada), Ativo (toggle), Destaque (toggle — aparece na home), Slug (URL amigável, gerado automaticamente mas editável).
- [ ] Upload de imagens com preview antes de salvar.
- [ ] Reordenação de fotos do produto por drag-and-drop.
- [ ] Confirmação antes de excluir produto.
- [ ] Produto inativo some do catálogo público imediatamente após salvar.
- [ ] Máximo de 6 produtos podem ser marcados como "destaque" simultaneamente (validação no admin e no servidor — não apenas no frontend).
- [ ] Upload de imagens envia para Supabase Storage bucket `products/` e salva URL pública no array `images[]` do produto.
- [ ] Ao ativar, desativar ou salvar produto, o sistema chama `POST /api/revalidate` automaticamente para atualizar `/produtos` e `/produtos/[slug]` sem necessidade de redeploy.
- [ ] Ao marcar ou desmarcar produto como destaque, o sistema também revalida `POST /api/revalidate` para `/` (home exibe produtos em destaque).

**Prioridade:** MUST  
**Persona:** Persona 3

---

### FR-010: Admin — Gestão de Leads

**Descrição:** Visualização e gestão dos leads captados via formulário "Seja Revendedora", permitindo que a proprietária acompanhe e qualifique os contatos.

**Critérios de Aceitação:**
- [ ] Tabela de leads com colunas: nome, WhatsApp (clicável para abrir wa.me), cidade, data/hora do cadastro, status, ações.
- [ ] Status configurável por lead: Novo, Contatado, Convertido, Descartado.
- [ ] Filtro por status e por período (data inicial/data final).
- [ ] Busca por nome, WhatsApp ou cidade.
- [ ] Exportação de leads filtrados em CSV com todos os campos.
- [ ] Badge/contador de leads com status "Novo" no menu do admin (notificação visual).
- [ ] Página de detalhe do lead exibe todos os dados e histórico de status.
- [ ] Ordenação padrão: mais recentes primeiro.
- [ ] Leads não podem ser excluídos (soft-delete apenas via status "Descartado").

**Prioridade:** MUST  
**Persona:** Persona 3

---

### FR-011: Admin — Gestão de Depoimentos

**Descrição:** Interface para cadastrar, editar e aprovar depoimentos de revendedoras e clientes exibidos no site.

**Critérios de Aceitação:**
- [ ] Listagem de depoimentos com colunas: nome, cidade, status (aprovado/pendente/reprovado), data, ações.
- [ ] Formulário de criação/edição com campos: Nome (obrigatório, pode ser parcial ex: "Maria S."), Cidade (obrigatório), Foto (upload opcional, JPG/PNG/WebP até 2MB), Texto do depoimento (obrigatório, máximo 500 caracteres), Resultado/transformação destacada (ex: "Ganhei R$1.200 no primeiro mês", obrigatório), Status (Pendente/Aprovado/Reprovado).
- [ ] Apenas depoimentos com status "Aprovado" aparecem no site público.
- [ ] Preview de como o card aparecerá no site antes de salvar.
- [ ] Confirmação antes de excluir depoimento.

**Prioridade:** MUST  
**Persona:** Persona 3

---

### FR-012: Admin — Gestão de Blog

**Descrição:** Sistema de criação e edição de artigos para o blog, com editor rich text e configuração de metadados SEO.

**Critérios de Aceitação:**
- [ ] Listagem de artigos com colunas: título, categoria, status (publicado/rascunho), data, ações.
- [ ] Formulário de criação/edição com campos: Título (obrigatório), Slug/URL (gerado automaticamente, editável), Imagem de capa (upload obrigatório, JPG/PNG/WebP até 5MB), Excerpt/resumo (textarea, máximo 300 caracteres, usado como meta description padrão), Categoria (select, com opção de criar nova), Corpo do artigo (editor rich text com suporte a: cabeçalhos H2/H3, negrito, itálico, listas, links, inserção de imagens, blocos de código), Meta title (texto livre, máximo 60 caracteres, com contador), Meta description (textarea, máximo 160 caracteres, com contador), Status (Rascunho/Publicado), Data de publicação (date picker — permite agendar).
- [ ] Preview do artigo antes de publicar.
- [ ] Artigos rascunho nunca aparecem no site público.
- [ ] Histórico de versões não é obrigatório na v1.

**Prioridade:** SHOULD  
**Persona:** Persona 3

---

### FR-013: Admin — Dashboard

**Descrição:** Página inicial do painel administrativo com visão geral das principais métricas do negócio.

**Critérios de Aceitação:**
- [ ] Cards de métricas: Total de leads hoje, Total de leads nos últimos 7 dias, Total de leads no mês corrente, Total de leads com status "Novo" (pendente de contato), Total de produtos ativos, Total de produtos em destaque.
- [ ] Tabela dos 5 leads mais recentes com link para ver todos.
- [ ] Link direto para "Ver todos os leads" e "Adicionar produto".
- [ ] Embed de Google Analytics (via Google Analytics 4 snippet) para visualização básica de tráfego — opcional, configurável via admin > configurações.
- [ ] Dashboard carrega em menos de 3 segundos.

**Prioridade:** SHOULD  
**Persona:** Persona 3

---

### FR-014: Admin — Configurações do Site

**Descrição:** Painel de configurações gerais do site, permitindo que a proprietária personalize textos, imagens e informações de contato sem necessidade de código.

**Critérios de Aceitação:**
- [ ] Campo: Número de WhatsApp principal (obrigatório, formato +55DDDNNNNNNNNN, usado em todos os botões e links do site).
- [ ] Campos de redes sociais: URL do Instagram, URL do TikTok, URL do Facebook, URL do YouTube (todos opcionais).
- [ ] Campo: E-mail de contato (opcional, exibido na página de contato).
- [ ] Campos de texto da Home: Headline do hero, Subheadline do hero, Texto dos benefícios (3 benefícios com título e descrição cada).
- [ ] Upload de logo do site (PNG/SVG, exibido no header).
- [ ] Upload de favicon.
- [ ] Upload de imagem padrão para Open Graph (JPG/PNG, 1200x630px recomendado).
- [ ] Campo: Google Analytics 4 Measurement ID (ex: G-XXXXXXXXXX) — quando preenchido, o snippet GA4 é inserido automaticamente no site.
- [ ] Todas as alterações nas configurações são aplicadas ao site público sem necessidade de redeploy.
- [ ] Botão "Salvar Configurações" com feedback de sucesso/erro.
- [ ] Ao salvar configurações, o sistema chama automaticamente `POST /api/revalidate` para `/` e `/seja-revendedora` para atualizar o site público.
- [ ] Campo `whatsapp_number` é sanitizado ao salvar: remove `+`, espaços, traços e parênteses — armazena apenas dígitos no formato `5511999999999` (12–13 dígitos validados no servidor).

**Prioridade:** MUST  
**Persona:** Persona 3

---

### FR-015: SEO Técnico

**Descrição:** Implementação de todos os elementos técnicos de SEO para maximizar a visibilidade orgânica no Google.

**Critérios de Aceitação:**
- [ ] Meta title e meta description únicos e otimizados para todas as páginas (Home, Seja Revendedora, Catálogo, Depoimentos, Blog, Sobre, cada produto, cada artigo).
- [ ] Tags Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) em todas as páginas.
- [ ] Twitter Card tags em todas as páginas.
- [ ] `sitemap.xml` gerado automaticamente e atualizado quando novo produto ou artigo é publicado. Acessível em `/sitemap.xml`.
- [ ] `robots.txt` configurado corretamente (permite indexação das páginas públicas, bloqueia `/admin`). Acessível em `/robots.txt`.
- [ ] Schema.org markup implementado: `Organization` na home, `Product` nas páginas de produto, `Article` nos artigos do blog, `BreadcrumbList` em páginas internas.
- [ ] URLs canônicas (`<link rel="canonical">`) em todas as páginas.
- [ ] Heading hierarchy correta (H1 único por página, H2/H3 hierárquicos).
- [ ] Alt text obrigatório em todas as imagens (campo no admin para imagens de produto e artigo).
- [ ] URLs amigáveis (slugs) para produtos e artigos, sem parâmetros desnecessários.
- [ ] Página 404 personalizada com links para home e catálogo.

**Prioridade:** MUST  
**Persona:** N/A (técnico)

---

### FR-016: Performance e Otimização de Imagens

**Descrição:** Garantir que o site carregue rápido em dispositivos móveis com conexões 4G, que é o contexto de uso da maioria dos visitantes.

**Critérios de Aceitação:**
- [ ] Lighthouse Score ≥ 90 em Performance, SEO, Acessibilidade e Best Practices na página Home e na página "Seja Revendedora".
- [ ] LCP (Largest Contentful Paint) < 2.5s.
- [ ] CLS (Cumulative Layout Shift) < 0.1.
- [ ] FID/INP (Interaction to Next Paint) < 200ms.
- [ ] Imagens servidas em formato WebP com fallback para JPEG/PNG.
- [ ] Lazy loading aplicado a todas as imagens below the fold.
- [ ] Hero image pré-carregada (preload) para evitar impacto no LCP.
- [ ] Fontes do Google Fonts carregadas com `font-display: swap`.
- [ ] CSS crítico inlined, restante carregado de forma assíncrona.
- [ ] JavaScript não bloqueante (defer/async onde aplicável).
- [ ] CDN ativo para assets estáticos (imagens, fontes, scripts).

**Prioridade:** MUST  
**Persona:** N/A (técnico)

---

### FR-017: Domínio Próprio e SSL

**Descrição:** O site deve ser acessível via domínio próprio profissional com HTTPS obrigatório.

**Critérios de Aceitação:**
- [ ] Site acessível via domínio `revendendomake.com.br` (ou alternativa definida antes do lançamento).
- [ ] Certificado SSL/TLS válido e renovação automática ativa (Let's Encrypt ou equivalente via Vercel/hosting).
- [ ] Redirecionamento automático de HTTP para HTTPS (301).
- [ ] Redirecionamento de `www.revendendomake.com.br` para `revendendomake.com.br` (ou vice-versa, definir canonical).
- [ ] DNS configurado com TTL adequado.
- [ ] HSTS header ativo.

**Prioridade:** MUST  
**Persona:** N/A (técnico)

---

## 5. Requisitos Não-Funcionais

### NFR-001: Performance (Core Web Vitals)

**Descrição:** O site deve atingir ou superar os limiares "Good" do Google Core Web Vitals para garantir boa classificação orgânica e experiência de usuário.

**Critérios Mensuráveis:**
- LCP (Largest Contentful Paint): < 2.5s (Good) em conexão 4G mobile simulada.
- INP (Interaction to Next Paint): < 200ms (Good).
- CLS (Cumulative Layout Shift): < 0.1 (Good).
- Time to First Byte (TTFB): < 800ms.
- Lighthouse Performance Score: ≥ 90 nas páginas Home, "Seja Revendedora" e Catálogo.
- Tamanho total da página: < 1MB (sem imagens lazy-loaded).

**Referência:** Google PageSpeed Insights, Web Vitals Extension.

---

### NFR-002: Segurança

**Descrição:** O site deve implementar práticas básicas de segurança para proteger dados de leads e o painel administrativo.

**Critérios Mensuráveis:**
- HTTPS obrigatório em 100% das URLs (sem conteúdo misto).
- HSTS header com `max-age` ≥ 31536000.
- Painel admin acessível apenas após autenticação (usuário + senha forte ou SSO via Supabase Auth).
- Senha de admin com requisito mínimo: 12 caracteres, letras maiúsculas/minúsculas, números e caracteres especiais.
- Rate limiting no endpoint de submissão de formulário de leads (máximo 5 submissões por IP em 10 minutos).
- Proteção contra CSRF nos formulários.
- Inputs de formulário sanitizados antes de salvar no banco (prevenção de SQL Injection e XSS).
- Rota `/admin` e todas as sub-rotas retornam 401/403 se não autenticado — nunca vaza dados.
- Variáveis de ambiente sensíveis (chaves de API, credenciais de banco) nunca expostas no frontend.
- Dependências do projeto sem vulnerabilidades críticas conhecidas (verificado via `npm audit`).

---

### NFR-003: Acessibilidade (WCAG 2.1 AA)

**Descrição:** O site deve ser acessível para usuários com necessidades especiais, respeitando as diretrizes WCAG 2.1 nível AA.

**Critérios Mensuráveis:**
- Lighthouse Accessibility Score ≥ 90 em todas as páginas públicas.
- Contraste de cores mínimo de 4.5:1 para texto normal e 3:1 para texto grande (verificado via axe ou similar).
- Todos os elementos interativos acessíveis via teclado (Tab/Enter/Escape).
- Imagens com `alt` descritivo — imagens decorativas com `alt=""`.
- Formulários com `<label>` associados a cada input.
- Botões com `aria-label` quando apenas iconográficos (ex: botão WhatsApp flutuante).
- Hierarquia de headings correta (H1 único por página).
- Links com texto descritivo (sem "Clique aqui" genérico).
- Foco visível em elementos interativos (`:focus-visible` estilizado).

---

### NFR-004: SEO

**Descrição:** Estrutura técnica de SEO que maximize a indexabilidade e ranqueamento no Google.

**Critérios Mensuráveis:**
- Lighthouse SEO Score ≥ 90 em todas as páginas públicas.
- 100% das páginas públicas indexáveis (sem noindex acidental).
- `sitemap.xml` submetido ao Google Search Console antes do lançamento.
- Tempo de indexação estimado: < 7 dias após submissão do sitemap.
- Zero erros de rastreamento críticos no Google Search Console após 30 dias do lançamento.
- Schema.org markup validado via Google Rich Results Test.

---

### NFR-005: Responsividade Mobile

**Descrição:** O site deve oferecer experiência excelente em dispositivos móveis, que representam 80–90% do tráfego esperado.

**Critérios Mensuráveis:**
- Layout funcional e visualmente correto nos breakpoints: 375px (iPhone SE), 390px (iPhone 14), 412px (Android médio), 768px (tablet), 1280px (desktop).
- Touch targets (botões, links) com altura mínima de 44px e largura mínima de 44px.
- Nenhum conteúdo cortado horizontalmente em mobile (overflow-x: hidden).
- Formulários utilizáveis em mobile (inputs legíveis sem zoom, teclado virtual não quebra layout).
- Nenhum uso de hover-only interactions como fonte de informação crítica.
- Menus de navegação collapsíveis em mobile (hamburger menu ou equivalente).

---

### NFR-006: Disponibilidade

**Descrição:** O site deve estar disponível de forma confiável para não perder conversões de visitantes vindos de redes sociais.

**Critérios Mensuráveis:**
- Uptime ≥ 99.5% medido mensalmente (equivalente a ≤ 3h36min de downtime/mês).
- Plataforma de hosting com SLA que suporte este uptime (ex: Vercel, Railway, Render).
- Tempo de recuperação após falha (RTO): < 15 minutos para falhas de infraestrutura resolvidas pelo provider.
- Monitoramento de uptime externo configurado (ex: UptimeRobot free tier) com alerta por e-mail.

---

## 6. Restrições Técnicas

### CON-001: Domínio Próprio Obrigatório

**Descrição:** O site deve ser acessível via domínio próprio profissional. Não é aceitável usar subdomínio de plataforma (ex: revendendomake.vercel.app) como URL principal.

**Implicação de Design:** A plataforma de hosting escolhida deve suportar custom domains sem custo adicional. Vercel (free tier) e Netlify suportam isso.

**Prioridade:** MUST — pré-requisito para lançamento.

---

### CON-002: Painel Admin Sem Conhecimento Técnico

**Descrição:** A proprietária do negócio é a única usuária do painel admin e não possui conhecimento técnico de código, bancos de dados ou sistemas complexos.

**Implicação de Design:**
- UI do admin deve seguir padrões de UX familiar (similar ao WordPress ou Instagram).
- Terminologia em português claro, sem jargões técnicos.
- Ações irreversíveis (excluir) exigem confirmação explícita.
- Mensagens de erro em linguagem acessível (ex: "Foto muito grande. Use uma imagem menor que 5MB" em vez de "413 Request Entity Too Large").
- Treinamento ou documentação mínima deve ser providenciada no momento da entrega.

---

### CON-003: Todo o Conteúdo em Português do Brasil

**Descrição:** Todo o conteúdo do site (público e admin), textos de erro, labels de formulário, notificações e documentação de uso devem estar em Português do Brasil.

**Implicação de Design:** Bibliotecas com tradução devem ser configuradas com locale `pt-BR`. Formatação de datas (DD/MM/AAAA), moeda (R$ 00,00) e telefone (+55 DD 9XXXX-XXXX) seguem padrão brasileiro.

---

### CON-004: Sem Gateway de Pagamento na v1

**Descrição:** Nenhuma funcionalidade de checkout, carrinho de compras ou processamento de pagamento será implementada na v1. Todas as transações são conduzidas via WhatsApp.

**Implicação de Design:** CTAs de produtos levam ao WhatsApp. Não há "adicionar ao carrinho". Preços são informativos, não transacionais. Isso simplifica significativamente a stack e elimina requisitos de PCI DSS.

---

### CON-005: WhatsApp como Canal Primário de Conversão

**Descrição:** O WhatsApp é o canal de fechamento de todas as vendas e o principal canal de comunicação com leads e clientes. Não haverá chat online, e-commerce ou outro canal de conversão.

**Implicação de Design:**
- Número de WhatsApp configurável no admin — deve ser atualizado em todos os links automaticamente.
- Links usam formato `wa.me` (sem API paga), garantindo funcionamento independente de mudanças de API.
- Mensagens pré-formatadas por contexto (produto específico, interesse em ser revendedora, contato geral).
- Se WhatsApp não estiver disponível (número errado, etc.), é o único canal perdido — verificar número antes do lançamento.

---

### CON-006: Custo Operacional Acessível para Negócio Solo

**Descrição:** O negócio é conduzido por uma única proprietária sem equipe e sem budget de marketing pago. A solução técnica deve ter custo operacional acessível.

**Implicação de Design:**
- Hosting: Vercel (free/pro), Railway, Render ou equivalente com tier acessível.
- Banco de dados: Supabase (free tier suporta projetos iniciais, paid tier quando necessário).
- CDN: Incluso no Vercel/Cloudflare.
- Custo estimado mensal total: < R$100/mês no tier inicial.
- Sem licenças de software proprietário.

---

## 7. Épicos e Stories (Alto Nível)

### Epic 1: Foundation & Infrastructure

**Objetivo:** Configurar toda a infraestrutura técnica necessária para desenvolvimento e deploy do projeto.

**Critério de Conclusão do Epic:** Ambiente de desenvolvimento funcional, domínio configurado, design system base implementado e pipeline de deploy ativo.

| Story | Título | Resumo | Prioridade |
|-------|--------|--------|------------|
| 1.1 | Environment Setup & Domain Configuration | Configuração do repositório GitHub, ambiente local, variáveis de ambiente, registro e configuração do domínio .com.br, DNS e HTTPS. | MUST |
| 1.2 | Tech Stack Setup | Inicialização do projeto Next.js com App Router, integração Supabase (auth + database), configuração do Vercel para deploy contínuo, configuração de ambientes (dev/staging/prod). | MUST |
| 1.3 | Design System & Component Library | Definição de paleta de cores, tipografia, tokens de design. Criação de componentes base: Button, Card, Input, Modal, Layout (Header, Footer), sistema de grid responsivo. | MUST |
| 1.4 | Database Setup & Supabase Storage Configuration | Aplicar DDL completo no Supabase (tabelas, enums, índices, triggers, RLS policies), criar buckets de Storage com restrições de MIME type, configurar conta de admin via Supabase Auth, e verificar RLS via testes manuais. Pré-requisito para todos os stories do Epic 2 em diante. | MUST |

---

### Epic 2: Public Website — Core Pages

**Objetivo:** Implementar todas as páginas públicas do site com conteúdo real e integrações funcionais.

**Critério de Conclusão do Epic:** Todas as páginas públicas acessíveis no domínio, responsivas, com CTAs funcionais para WhatsApp e dados reais carregados do Supabase.

| Story | Título | Resumo | Prioridade |
|-------|--------|--------|------------|
| 2.1 | Landing Page (Home) | Implementação completa da Home: hero com CTA, seção de benefícios, produtos em destaque (carregados do Supabase), depoimentos preview, embed de redes sociais, header e footer com links sociais. | MUST |
| 2.2 | Página "Seja Revendedora" | Implementação da página de captação: hero, como funciona, benefícios, depoimentos, FAQ e formulário de captação com salvamento de lead no Supabase e redirecionamento para WhatsApp. | MUST |
| 2.3 | Catálogo de Produtos | Grid de produtos com filtros (categoria, preço), busca, página de detalhe por produto, botão "Comprar via WhatsApp" com mensagem contextual. | MUST |
| 2.4 | Página de Depoimentos | Galeria completa de depoimentos aprovados, cards responsivos, CTA para "Seja Revendedora". | MUST |
| 2.5 | Sobre Nós & Contato | Página "Sobre Nós" com história da marca (conteúdo do admin > configurações). Página de contato com links WhatsApp e redes sociais. | SHOULD |

---

### Epic 3: SEO & Conteúdo

**Objetivo:** Implementar todas as funcionalidades de SEO técnico, sistema de blog e integração de redes sociais.

**Critério de Conclusão do Epic:** Lighthouse SEO ≥ 90, sitemap e robots.txt funcionais, artigos publicáveis pelo admin, Schema.org validado.

| Story | Título | Resumo | Prioridade |
|-------|--------|--------|------------|
| 3.1 | Blog — Sistema de Artigos | Listagem de artigos, página de artigo individual, categorias, busca, artigos relacionados. Integração com admin (FR-012). | SHOULD |
| 3.2 | SEO Técnico | Meta tags dinâmicas em todas as páginas, Open Graph, sitemap.xml automático, robots.txt, Schema.org markup (Organization, Product, Article, Breadcrumb), canonical tags, página 404 personalizada. | MUST |
| 3.3 | Integração Redes Sociais | Embed de posts Instagram/TikTok na Home, links de redes sociais no header/footer, Open Graph images por página, Twitter Cards. | SHOULD |

---

### Epic 4: Painel Administrativo

**Objetivo:** Implementar o painel admin completo para gestão autônoma do site pela proprietária.

**Critério de Conclusão do Epic:** Proprietária consegue realizar todas as operações de gestão (produtos, leads, depoimentos, blog, configurações) sem suporte técnico.

| Story | Título | Resumo | Prioridade |
|-------|--------|--------|------------|
| 4.1 | Admin — Autenticação & Layout | Login seguro com Supabase Auth, layout do admin (sidebar, header, navegação), proteção de rotas, logout. | MUST |
| 4.2 | Admin — Dashboard | Cards de métricas (leads hoje/semana/mês, leads novos, produtos ativos, produtos destaque), tabela de leads recentes, links de ação rápida, embed GA4. | SHOULD |
| 4.3 | Admin — Gestão de Produtos | CRUD completo de produtos: listagem com filtros, formulário de criação/edição com upload de múltiplas fotos, toggle ativo/destaque, exclusão com confirmação. | MUST |
| 4.4 | Admin — Gestão de Leads | Tabela de leads com filtros (status, período), busca, alteração de status por lead, exportação CSV, badge de leads novos. | MUST |
| 4.5 | Admin — Gestão de Depoimentos | CRUD de depoimentos com upload de foto, aprovação/reprovação, preview do card. | MUST |
| 4.6 | Admin — Gestão de Blog | CRUD de artigos com editor rich text, campos SEO (meta title/description), categorias, status (rascunho/publicado), agendamento de publicação. | SHOULD |
| 4.7 | Admin — Configurações do Site | Formulário de configurações: número WhatsApp, redes sociais, textos da home, upload de logo/favicon/og-image, GA4 Measurement ID. | MUST |

---

### Epic 5: Performance & Launch

**Objetivo:** Garantir que o site atende todos os critérios de performance, qualidade e SEO antes do lançamento público.

**Critério de Conclusão do Epic:** Lighthouse ≥ 90 em todas as métricas, zero erros críticos, analytics configurado, domínio ativo com SSL, checklist de lançamento 100% concluído.

| Story | Título | Resumo | Prioridade |
|-------|--------|--------|------------|
| 5.1 | Otimização de Performance | Auditoria Lighthouse, otimização de imagens (WebP + lazy loading + preload hero), eliminação de render-blocking resources, otimização de fontes, análise e correção de CLS. | MUST |
| 5.2 | Mobile UX Polish & Testing | Testes em dispositivos reais e emulados (iPhone SE, Android médio, tablet), revisão de touch targets, ajustes de layout mobile, teste de formulários em mobile com teclado virtual. | MUST |
| 5.3 | Integração Google Analytics 4 | Configuração da propriedade GA4, implementação do snippet via admin > configurações, criação de eventos customizados (lead_submitted, whatsapp_click, product_view), configuração de metas de conversão. | SHOULD |
| 5.4 | Checklist de Lançamento & Go-Live | Verificação final de todos os critérios de aceite, configuração do domínio e DNS, submissão do sitemap ao Google Search Console, configuração do monitoramento de uptime, teste end-to-end completo, treinamento da proprietária no admin. | MUST |

---

## 8. Premissas

| # | Premissa | Impacto se Incorreta |
|---|----------|---------------------|
| P-1 | A proprietária será a única usuária do painel admin. | Se houver múltiplos usuários, o sistema de permissões precisará ser expandido na v2. |
| P-2 | Todo o marketing é e continuará sendo orgânico (sem budget de anúncios pagos). | Crescimento mais lento — SEO e conteúdo são a única fonte de tráfego além das redes sociais. |
| P-3 | O público-alvo é 100% brasileiro e opera com língua portuguesa. | Site em português apenas — sem necessidade de internacionalização. |
| P-4 | WhatsApp permanece como canal de fechamento de vendas e suporte. | Se o canal mudar, todos os CTAs e integrações precisarão ser revisados. |
| P-5 | O tráfego é majoritariamente mobile (80–90%). | Design mobile-first já mitiga este risco — se perfil mudar, experiência desktop ainda é funcional. |
| P-6 | O domínio `revendendomake.com.br` ou `.com` está disponível para registro. | Se indisponível, uma alternativa deve ser discutida e decidida antes do início do desenvolvimento. |
| P-7 | A proprietária tem acesso regular ao site para atualizar conteúdo (produtos, leads, blog). | Se o conteúdo não for atualizado, o SEO e a relevância do catálogo se degradarão. |
| P-8 | Supabase free tier é suficiente para o volume inicial do projeto. | Se o volume de dados ou requisições ultrapassar o free tier, upgrade para Supabase Pro será necessário (~$25/mês). |
| P-9 | As fotos de produtos e depoimentos serão fornecidas pela proprietária em qualidade adequada. | Fotos de baixa qualidade comprometerão o impacto visual do catálogo — orientação sobre requisitos de imagem deve ser dada na entrega. |
| P-10 | O número de WhatsApp de contato é estável e não mudará frequentemente. | A configuração via admin mitiga este risco — número pode ser alterado sem redeploy. |

---

## 9. Dependências

### 9.1 Dependências Técnicas

| Dependência | Tipo | Impacto | Responsável |
|-------------|------|---------|-------------|
| Registro do domínio .com.br | Externa | Bloqueia Story 1.1 e deploy final | Proprietária |
| Conta Supabase criada e projeto configurado | Infraestrutura | Bloqueia Story 1.2 | @devops / @dev |
| Conta Vercel conectada ao repositório GitHub | Infraestrutura | Bloqueia deploy contínuo | @devops |
| Credenciais de API do Supabase (URL + anon key) | Configuração | Bloqueia todas as integrações com banco | @devops |
| Número de WhatsApp definitivo | Conteúdo | Bloqueia teste de CTAs WhatsApp | Proprietária |
| Identidade visual: logo, paleta de cores, fontes | Design | Bloqueia Story 1.3 (Design System) | @ux-design-expert / Proprietária |
| Fotos dos produtos para catálogo inicial | Conteúdo | Bloqueia Story 2.3 com dados reais | Proprietária |
| Depoimentos iniciais (mínimo 6) | Conteúdo | Bloqueia Stories 2.4 e lançamento | Proprietária |
| Google Analytics 4 Property criada | Analytics | Bloqueia Story 5.3 | Proprietária |
| Google Search Console verificado | SEO | Bloqueia submissão do sitemap | Proprietária |

### 9.2 Dependências de Negócio

| Dependência | Impacto |
|-------------|---------|
| Aprovação do wireframe/protótipo pela proprietária antes da implementação | Evita retrabalho em Epic 2 e 4 |
| Definição final dos preços de produtos antes do lançamento | Catálogo não pode ser publicado sem decisão sobre exibir preços ou usar "Consultar" |
| Política de privacidade para coleta de leads (LGPD) | Formulário de captação deve incluir consentimento — texto da política deve ser fornecido |

---

## 10. Questões em Aberto

| # | Questão | Impacto | Responsável | Prazo para Decisão |
|---|---------|---------|-------------|-------------------|
| Q-1 | O domínio `revendendomake.com.br` está disponível? Se não, qual alternativa? | Bloqueia Story 1.1 | Proprietária | Antes de iniciar Epic 1 |
| Q-2 | Os preços dos produtos serão exibidos publicamente no catálogo ou apenas via "Consultar via WhatsApp"? | Afeta FR-003 e FR-009 | Proprietária | Antes de Story 2.3 |
| Q-3 | A identidade visual (logo, paleta de cores, tipografia) já está definida? Há guia de marca disponível? | Afeta Story 1.3 | Proprietária + @ux-design-expert | Antes de iniciar Epic 2 |
| Q-4 | Qual é o texto da política de privacidade para conformidade com LGPD? (necessário no formulário de captação de leads) | Afeta FR-002 — risco legal | Proprietária / Jurídico | Antes de Story 2.2 |
| Q-5 | Quais categorias de produtos existem atualmente no portfólio? (necessário para configurar filtros do catálogo) | Afeta FR-003 e FR-009 | Proprietária | Antes de Story 2.3 |
| Q-6 | A integração de embed de Instagram/TikTok será via widget nativo (oEmbed) ou via alguma ferramenta terceira? | Afeta FR-008 e Story 3.3 | @architect | Antes de Story 3.3 |
| Q-7 | Haverá necessidade de blog imediatamente no lançamento (v1.0) ou pode ser ativado na v1.1? | Afeta priorização do Epic 3 | Proprietária + @pm | Antes de Planning do Epic 3 |
| Q-8 | Qual plataforma de hosting será usada? Vercel (recomendado) ou outra? | Afeta Story 1.2 e configuração de deploy | @architect | Antes de Story 1.2 |
| Q-9 | Os depoimentos já existem? Se sim, em qual formato e quantidade? | Afeta Stories 2.4 e 4.5 | Proprietária | Antes de Story 2.4 |
| Q-10 | Há necessidade de e-mail profissional (ex: contato@revendendomake.com.br) configurado para comunicação com leads? | Pode afetar Story 5.4 | Proprietária | Antes do lançamento |
| Q-11 | Serão necessários cookies/banners de consentimento de cookies (LGPD + Google Analytics)? | Afeta implementação do GA4 em Story 5.3 | Proprietária / Jurídico | Antes de Story 5.3 |
| Q-12 | Qual é o SLA esperado para suporte pós-lançamento (correções de bugs, novas funcionalidades)? | Afeta expectativas do cliente e planejamento de v2 | @pm + Proprietária | Antes do lançamento |

---

## Apêndice A — Mapa de Rastreabilidade FR → Epic → Story

| Requisito Funcional | Epic | Story Principal |
|--------------------|------|----------------|
| FR-001: Landing Page Principal | Epic 2 | Story 2.1 |
| FR-002: Página "Seja Revendedora" | Epic 2 | Story 2.2 |
| FR-003: Catálogo de Produtos | Epic 2 | Story 2.3 |
| FR-004: Página de Depoimentos | Epic 2 | Story 2.4 |
| FR-005: Blog / Conteúdo SEO | Epic 3 | Story 3.1 |
| FR-006: Sobre Nós | Epic 2 | Story 2.5 |
| FR-007: Integração WhatsApp | Epic 2 | Stories 2.1–2.5 (transversal) |
| FR-008: Integração Redes Sociais | Epic 3 | Story 3.3 |
| FR-009: Admin — Gestão de Produtos | Epic 4 | Story 4.3 |
| FR-010: Admin — Gestão de Leads | Epic 4 | Story 4.4 |
| FR-011: Admin — Gestão de Depoimentos | Epic 4 | Story 4.5 |
| FR-012: Admin — Gestão de Blog | Epic 4 | Story 4.6 |
| FR-013: Admin — Dashboard | Epic 4 | Story 4.2 |
| FR-014: Admin — Configurações | Epic 4 | Story 4.7 |
| FR-015: SEO Técnico | Epic 3 | Story 3.2 |
| FR-016: Performance | Epic 5 | Story 5.1 |
| FR-017: Domínio Próprio & SSL | Epic 1 | Story 1.1 |
| Schema do Banco + RLS + Storage | Epic 1 | Story 1.4 |

---

## Apêndice B — Stack Tecnológica Recomendada

> **Nota:** Stack sujeita a validação e decisão final pelo @architect.

| Camada | Tecnologia Recomendada | Justificativa |
|--------|----------------------|---------------|
| Framework | Next.js 14+ (App Router) | SSR/SSG nativo para SEO, React ecosystem, suporte nativo a Vercel |
| Banco de Dados | Supabase (PostgreSQL) | Autenticação inclusa, Storage para imagens, free tier generoso, SDK para Next.js |
| Storage de Imagens | Supabase Storage | Integrado ao Supabase, CDN incluso |
| Hosting | Vercel | Custom domain gratuito, deploy contínuo, Edge Network global, integração nativa Next.js |
| Editor Rich Text (Blog/Admin) | Tiptap ou Quill | Open source, extensível, bom suporte a React |
| Estilização | Tailwind CSS | Mobile-first nativo, sem CSS custom para manter, bundle otimizado |
| Componentes UI | shadcn/ui | Componentes acessíveis, sem lock-in, compatível com Tailwind |
| Analytics | Google Analytics 4 | Gratuito, padrão de mercado, integra com Search Console |
| Geração de Sitemap | next-sitemap | Automático, integrado ao build do Next.js |
| Schema Markup | next-seo ou head nativo | Inserção de JSON-LD por página |
| Monitoramento de Uptime | UptimeRobot (free) | Monitoramento externo, alertas por e-mail |

---

*Documento gerado por Morgan (@pm) — Synkra AIOX v2.0*  
*Para uso interno — Revendendo Make*  
*Próximo passo: Aprovação pelo @po (Pax) e definição de arquitetura pelo @architect (Aria)*
