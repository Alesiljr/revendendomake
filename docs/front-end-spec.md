# Especificação Front-End — Revendendo Make

**Projeto:** Revendendo Make — Website Profissional  
**Versão:** 1.0  
**Data:** 24 de abril de 2026  
**Status:** Aprovado para Desenvolvimento  
**Autora:** Uma (@ux-design-expert) — Synkra AIOX  
**Baseado em:** `docs/project-brief.md` e `docs/prd.md`

---

## Índice

1. [Sistema de Design — Fundação](#1-sistema-de-design--fundação)
2. [Biblioteca de Componentes](#2-biblioteca-de-componentes)
3. [Wireframes por Página](#3-wireframes-por-página)
4. [Estrutura de Navegação](#4-estrutura-de-navegação)
5. [Padrões de UX e Interações](#5-padrões-de-ux-e-interações)
6. [Acessibilidade](#6-acessibilidade)
7. [Design Tokens — Entrega para Desenvolvedor](#7-design-tokens--entrega-para-desenvolvedor)

---

## 1. Sistema de Design — Fundação

### 1.1 Paleta de Cores

A paleta foi construída para comunicar feminilidade vibrante com credibilidade profissional — evitando o rosa infantil e priorizando tons quentes e sofisticados que remetem ao universo da beleza e do empreendedorismo feminino brasileiro.

#### Cores Primárias

| Token | Nome | Hex | Uso Principal |
|-------|------|-----|---------------|
| `--color-primary-50` | Rose Claro | `#FFF0F3` | Fundos de seção alternados |
| `--color-primary-100` | Rose Suave | `#FFD6E0` | Hover states, badges claros |
| `--color-primary-200` | Rose Médio | `#FFB3C1` | Bordas de destaque, ícones secundários |
| `--color-primary-400` | Rose Vibrante | `#FF4D6D` | CTAs secundários, destaques |
| `--color-primary-500` | Framboesa | `#C9184A` | **Cor primária principal** — CTAs, links ativos, destaques |
| `--color-primary-600` | Framboesa Escuro | `#A4133C` | Hover do botão primário |
| `--color-primary-700` | Vinho | `#800F2F` | Estados pressionados, text links ativos |
| `--color-primary-900` | Vinho Profundo | `#370617` | Uso esparso — texto em fundo claro de alto contraste |

> **Racional de cor primária:** `#C9184A` (Framboesa) é vibrante sem ser infantil. Remete a batons de qualidade, transmite confiança e energia. Contraste AA com branco: 5.6:1 (aprovado para texto normal e grande).

#### Cores Secundárias (Dourado/Cobre)

| Token | Nome | Hex | Uso Principal |
|-------|------|-----|---------------|
| `--color-secondary-100` | Dourado Claro | `#FFF3E0` | Fundos de seção benefícios |
| `--color-secondary-300` | Âmbar Suave | `#FFCC80` | Estrelas de avaliação, ícones de destaque |
| `--color-secondary-500` | Cobre Vibrante | `#FF8F00` | Badges "Destaque", ícones de benefícios |
| `--color-secondary-700` | Cobre Escuro | `#E65100` | Hover de elementos secundários |

> **Racional:** O dourado/cobre remete a luxo acessível, status e conquista — perfeito para badges de "Produto em Destaque" e ícones de benefícios. Cria contraste elegante com o framboesa primário.

#### Neutros

| Token | Nome | Hex | Uso Principal |
|-------|------|-----|---------------|
| `--color-neutral-0` | Branco | `#FFFFFF` | Fundos principais, textos em fundo escuro |
| `--color-neutral-50` | Off-White | `#FAFAFA` | Fundos alternativos, cards |
| `--color-neutral-100` | Cinza Clarissimo | `#F5F5F5` | Fundos de input, seções zebradas |
| `--color-neutral-200` | Cinza Claro | `#E5E5E5` | Bordas, divisores |
| `--color-neutral-300` | Cinza Médio | `#D4D4D4` | Bordas de input, placeholders |
| `--color-neutral-500` | Cinza | `#737373` | Texto secundário, legendas |
| `--color-neutral-700` | Cinza Escuro | `#404040` | Corpo de texto principal |
| `--color-neutral-900` | Quase Preto | `#171717` | Títulos, texto de alto contraste |

#### WhatsApp Green

| Token | Nome | Hex | Uso Principal |
|-------|------|-----|---------------|
| `--color-whatsapp` | Verde WhatsApp | `#25D366` | Todos os botões e ícones de WhatsApp |
| `--color-whatsapp-dark` | Verde WhatsApp Escuro | `#128C7E` | Hover do botão WhatsApp |
| `--color-whatsapp-light` | Verde WhatsApp Claro | `#DCF8C6` | Fundos leves de confirmação |

> **Regra:** O verde do WhatsApp é sagrado — nunca substituir por outra cor. É o identificador visual da ação mais importante do site.

#### Estados do Sistema

| Token | Nome | Hex | Uso |
|-------|------|-----|-----|
| `--color-success` | Verde Sucesso | `#16A34A` | Formulário enviado, produto ativo |
| `--color-success-light` | Verde Claro | `#DCFCE7` | Fundo de banner de sucesso |
| `--color-error` | Vermelho Erro | `#DC2626` | Erros de validação, campos inválidos |
| `--color-error-light` | Vermelho Claro | `#FEE2E2` | Fundo de mensagem de erro |
| `--color-warning` | Âmbar Aviso | `#D97706` | Avisos, leads "Novos" não contatados |
| `--color-warning-light` | Âmbar Claro | `#FEF3C7` | Fundo de banner de aviso |
| `--color-info` | Azul Info | `#2563EB` | Links informativos, dicas |
| `--color-info-light` | Azul Claro | `#DBEAFE` | Fundo de tooltips informativos |

---

### 1.2 Tipografia

#### Famílias de Fonte

**Fonte de Títulos: Playfair Display**
- Fonte: Google Fonts — `Playfair Display`
- Weights: 400, 600, 700, 900
- Uso: H1, H2, H3 em páginas públicas — transmite elegância e feminilidade sofisticada
- Fallback: `Georgia, 'Times New Roman', serif`

**Fonte de Corpo: Inter**
- Fonte: Google Fonts — `Inter`
- Weights: 400, 500, 600, 700
- Uso: H4-H6, corpo de texto, labels, admin, formulários — clareza máxima em telas pequenas
- Fallback: `system-ui, -apple-system, sans-serif`

> **Racional:** Playfair Display nos títulos cria impacto visual elegante característico de marcas de beleza premium. Inter no corpo garante legibilidade perfeita em Android com fontes pequenas e conexões 4G. Esta combinação é clássica e altamente legível em português.

#### Escala Tipográfica

##### Páginas Públicas — Mobile (base)

| Token | Elemento | Família | Tamanho | Weight | Line Height | Letter Spacing |
|-------|----------|---------|---------|--------|-------------|----------------|
| `--text-hero` | H1 Hero | Playfair Display | 32px | 700 | 1.2 | -0.02em |
| `--text-h1` | H1 | Playfair Display | 28px | 700 | 1.25 | -0.01em |
| `--text-h2` | H2 | Playfair Display | 24px | 600 | 1.3 | -0.01em |
| `--text-h3` | H3 | Playfair Display | 20px | 600 | 1.35 | 0 |
| `--text-h4` | H4 | Inter | 18px | 600 | 1.4 | 0 |
| `--text-h5` | H5 | Inter | 16px | 600 | 1.4 | 0 |
| `--text-h6` | H6 | Inter | 14px | 600 | 1.5 | 0.01em |
| `--text-body-lg` | Corpo Grande | Inter | 17px | 400 | 1.6 | 0 |
| `--text-body` | Corpo | Inter | 15px | 400 | 1.65 | 0 |
| `--text-body-sm` | Corpo Pequeno | Inter | 13px | 400 | 1.6 | 0 |
| `--text-caption` | Legenda | Inter | 12px | 400 | 1.5 | 0.02em |
| `--text-label` | Label | Inter | 13px | 500 | 1.4 | 0.03em |
| `--text-button` | Botão | Inter | 15px | 600 | 1 | 0.01em |
| `--text-overline` | Overline | Inter | 11px | 600 | 1.4 | 0.08em |

##### Páginas Públicas — Desktop (md: 768px+)

| Elemento | Tamanho Desktop |
|----------|----------------|
| H1 Hero | 52px |
| H1 | 44px |
| H2 | 36px |
| H3 | 28px |
| H4 | 22px |
| H5 | 18px |
| Corpo | 16px |
| Corpo Grande | 18px |

##### Painel Admin

| Elemento | Família | Tamanho | Weight |
|----------|---------|---------|--------|
| Título de página | Inter | 24px | 700 |
| Título de seção | Inter | 18px | 600 |
| Label de tabela | Inter | 12px | 600 (uppercase) |
| Dado de tabela | Inter | 14px | 400 |
| Label de formulário | Inter | 13px | 500 |
| Input text | Inter | 15px | 400 |
| Botão admin | Inter | 14px | 600 |

---

### 1.3 Sistema de Espaçamento

**Unidade base: 4px**

| Token | Valor | Uso Típico |
|-------|-------|-----------|
| `--space-0` | 0px | Reset |
| `--space-1` | 4px | Espaçamento mínimo, ícone + texto |
| `--space-2` | 8px | Padding interno de badge, gap entre ícone e texto |
| `--space-3` | 12px | Padding de input, gap entre elementos de formulário |
| `--space-4` | 16px | Padding padrão de card, gap de grid mobile |
| `--space-5` | 20px | Margem entre parágrafos, padding de seção interna |
| `--space-6` | 24px | Gap de grid desktop, padding de card grande |
| `--space-8` | 32px | Padding de seção, margem entre componentes |
| `--space-10` | 40px | Margem entre seções menores |
| `--space-12` | 48px | Padding vertical de seção mobile |
| `--space-16` | 64px | Padding vertical de seção desktop |
| `--space-20` | 80px | Margem grande entre seções |
| `--space-24` | 96px | Hero padding vertical mobile |
| `--space-32` | 128px | Hero padding vertical desktop |

**Regra de aplicação:** Usar sempre múltiplos de 4px. Nunca usar valores arbitrários como 5px, 7px, 9px.

---

### 1.4 Grid e Breakpoints

| Nome | Breakpoint | Colunas | Gutter | Margem lateral |
|------|-----------|---------|--------|----------------|
| Mobile S | 320px | 4 | 16px | 16px |
| Mobile M | 375px | 4 | 16px | 20px |
| Mobile L | 428px | 4 | 16px | 20px |
| Tablet | 768px | 8 | 24px | 32px |
| Desktop S | 1024px | 12 | 24px | 40px |
| Desktop M | 1280px | 12 | 32px | 48px |
| Desktop L | 1440px | 12 | 32px | auto (max 1320px) |

**Container máximo:** 1320px centralizado.

---

### 1.5 Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 4px | Badges pequenos, tags |
| `--radius-sm` | 8px | Inputs, selects, botões pequenos |
| `--radius-md` | 12px | Cards de produto, cards de depoimento |
| `--radius-lg` | 16px | Cards de destaque, modais |
| `--radius-xl` | 24px | Cards hero, seções com fundo colorido |
| `--radius-2xl` | 32px | Botões grandes de CTA |
| `--radius-full` | 9999px | Botões pílula, avatares, badges de status |

---

### 1.6 Sombras

| Token | Valor CSS | Uso |
|-------|-----------|-----|
| `--shadow-xs` | `0 1px 2px rgba(0,0,0,0.05)` | Inputs em foco, separadores sutis |
| `--shadow-sm` | `0 2px 4px rgba(0,0,0,0.08)` | Cards em estado padrão |
| `--shadow-md` | `0 4px 12px rgba(0,0,0,0.10)` | Cards em hover, dropdowns |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.12)` | Modais, drawers, overlays |
| `--shadow-xl` | `0 16px 48px rgba(0,0,0,0.15)` | Hero cards, elementos flutuantes |
| `--shadow-primary` | `0 4px 16px rgba(201,24,74,0.30)` | Botão primário em hover/focus |
| `--shadow-whatsapp` | `0 4px 16px rgba(37,211,102,0.40)` | Botão WhatsApp flutuante |

---

### 1.7 Ícones

**Biblioteca: Lucide React**

- Razão: Open source, tree-shakeable, estilo limpo e moderno, 1000+ ícones, totalmente compatível com React/Next.js, sem dependência de CDN.
- Tamanhos padrão: 16px (inline), 20px (botões), 24px (nav), 32px (features), 48px (benefícios)
- Stroke width padrão: 1.5px (leve, feminino) — ajustar para 2px apenas em contextos de alerta/erro

**Ícones-chave do projeto:**

| Uso | Ícone Lucide |
|-----|-------------|
| WhatsApp | `MessageCircle` (custom color `#25D366`) |
| Produto adicionado | `ShoppingBag` |
| Benefício: Renda | `TrendingUp` |
| Benefício: Flexibilidade | `Clock` |
| Benefício: Suporte | `HeadphonesIcon` |
| Benefício: Qualidade | `Award` |
| Passo 1 (Como funciona) | `Package` |
| Passo 2 | `ShoppingCart` |
| Passo 3 | `DollarSign` |
| Depoimento/Estrela | `Star` (fill para preenchidas) |
| Menu hamburger | `Menu` |
| Fechar | `X` |
| Seta/Link | `ChevronRight`, `ArrowRight` |
| Admin: Dashboard | `LayoutDashboard` |
| Admin: Produtos | `Package` |
| Admin: Leads | `Users` |
| Admin: Depoimentos | `MessageSquareQuote` |
| Admin: Blog | `FileText` |
| Admin: Config | `Settings` |
| Admin: Logout | `LogOut` |
| Status: Novo | `Bell` |
| Status: Contatado | `Phone` |
| Status: Convertido | `CheckCircle2` |
| Status: Descartado | `XCircle` |

---

## 2. Biblioteca de Componentes

### 2.1 Átomos

#### Button

**Variantes e especificações:**

```
Variante: Primary
- Background: var(--color-primary-500) → #C9184A
- Texto: #FFFFFF
- Hover: var(--color-primary-600) + shadow-primary
- Active: var(--color-primary-700)
- Focus: outline 2px offset 2px var(--color-primary-400)
- Border-radius: var(--radius-full) [pílula] ou var(--radius-md) [padrão]
- Padding: 14px 28px (md), 10px 20px (sm), 18px 36px (lg)
- Font: Inter 600, 15px, letter-spacing 0.01em
- Min-height: 48px (acessibilidade — touch target)
- Transition: all 150ms ease

Variante: Secondary (Outline Primary)
- Background: transparent
- Border: 2px solid var(--color-primary-500)
- Texto: var(--color-primary-500)
- Hover: Background var(--color-primary-50)
- Mesmo tamanho e radius do Primary

Variante: Ghost
- Background: transparent
- Texto: var(--color-primary-500)
- Hover: Background var(--color-primary-50)
- Sem borda

Variante: WhatsApp
- Background: var(--color-whatsapp) → #25D366
- Texto: #FFFFFF
- Hover: var(--color-whatsapp-dark) + shadow-whatsapp
- Ícone: MessageCircle 20px à esquerda do texto
- Texto padrão: "Falar no WhatsApp"
- Border-radius: var(--radius-full)
- Font-weight: 700

Variante: Neutral / Outline Neutral
- Background: transparent / #FFFFFF
- Border: 1px solid var(--color-neutral-300)
- Texto: var(--color-neutral-700)
- Hover: Background var(--color-neutral-50)

Estado: Disabled
- Opacity: 0.45
- cursor: not-allowed
- pointer-events: none

Estado: Loading
- Spinner (Loader2 com animation spin) substituindo texto
- Min-width preservado para evitar layout shift
```

#### Input / Textarea / Select

```
Input padrão:
- Border: 1px solid var(--color-neutral-300)
- Border-radius: var(--radius-sm) → 8px
- Padding: 12px 16px
- Font: Inter 15px, color var(--color-neutral-700)
- Background: #FFFFFF
- Min-height: 48px (touch target)
- Placeholder: var(--color-neutral-400), italic
- Focus: border-color var(--color-primary-500), box-shadow var(--shadow-xs) com primary tint
- Error: border-color var(--color-error), background var(--color-error-light) suave
- Disabled: background var(--color-neutral-100), cursor not-allowed, opacity 0.6
- Label: Inter 13px 500, var(--color-neutral-700), margin-bottom 6px
- Helper text: Inter 12px, var(--color-neutral-500), margin-top 4px
- Error text: Inter 12px, var(--color-error), com ícone AlertCircle 14px

Textarea:
- Igual ao Input, min-height: 120px
- resize: vertical, max-height: 400px

Select:
- Igual ao Input visualmente
- Ícone ChevronDown custom em vez do padrão do browser
- Dropdown com shadow-md, border-radius md
```

#### Checkbox

```
- Tamanho: 20px x 20px (acessível em touch)
- Cor não marcado: border 1.5px solid var(--color-neutral-300)
- Cor marcado: background var(--color-primary-500), ícone Check branco
- Foco: outline 2px offset 2px var(--color-primary-400)
- Label à direita, Inter 14px, espaçamento 10px
```

#### Badge / Tag

```
Badge Status (admin leads):
- Novo: background #FEF3C7, texto #D97706, •
- Contatado: background #DBEAFE, texto #2563EB, •
- Convertido: background #DCFCE7, texto #16A34A, •
- Descartado: background #F5F5F5, texto #737373, •
- Padding: 4px 10px, border-radius full, font Inter 12px 600 uppercase

Badge Destaque (produto):
- background var(--color-secondary-500), texto #FFFFFF
- Texto "DESTAQUE", Inter 11px 700 uppercase
- Posição: absolute top-right no card

Tag Categoria:
- background var(--color-primary-50), texto var(--color-primary-600)
- Padding: 4px 12px, border-radius xs
- Font: Inter 12px 500
```

#### Avatar

```
- Tamanhos: 32px, 40px, 48px, 64px, 96px
- Border-radius: full (circular)
- Fallback: Iniciais do nome com background var(--color-primary-100) e texto var(--color-primary-700)
- Border: 2px solid #FFFFFF com shadow-sm (depoimentos)
```

#### Image

```
- Sempre com aspect-ratio definido (evita CLS)
- Produtos: aspect-ratio 1/1 (quadrado) com object-fit: cover
- Blog cover: aspect-ratio 16/9
- Hero: aspect-ratio 4/3 mobile, 16/9 desktop
- Depoimentos (avatar): aspect-ratio 1/1
- Placeholder/skeleton: background linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%), animation shimmer 1.5s infinite
```

---

### 2.2 Moléculas

#### Product Card

```
Estrutura:
┌─────────────────────────────────┐
│  [DESTAQUE]               [CAT] │  ← badges absolute
│                                  │
│         [Foto do Produto]        │  ← aspect-ratio 1:1, object-fit cover
│         (altura fixa 240px)      │
│                                  │
├─────────────────────────────────┤
│  Nome do Produto                 │  ← H4, Inter 16px 600, neutral-900
│  Categoria                       │  ← Tag categoria
│                                  │
│  R$ 29,90                        │  ← Inter 20px 700, primary-500
│  (ou "Consultar preço")          │  ← Inter 14px, neutral-500
│                                  │
│  [🟢 Comprar via WhatsApp]      │  ← Button WhatsApp, full width
└─────────────────────────────────┘

- Card: background #FFFFFF, border-radius md (12px), shadow-sm
- Hover: shadow-md, transform translateY(-2px), transition 200ms
- Padding interno: 16px
- Gap entre elementos: 8px
- Largura mobile: 100% (1 coluna com espaçamento)
- Largura tablet: calc(50% - 12px) [2 colunas]
- Largura desktop: calc(33.33% - 16px) [3 colunas] ou 25% [4 colunas]
```

#### Testimonial Card

```
Estrutura:
┌─────────────────────────────────┐
│  ★★★★★                          │  ← 5 estrelas, secondary-300 fill
│                                  │
│  "Texto do depoimento em         │
│  aspas duplas, máximo 200        │
│  caracteres visíveis aqui"       │  ← Inter 15px, neutral-700, italic
│                                  │
│  ┌────┐  Maria S.                │  ← Avatar 48px circular
│  │Foto│  Curitiba - PR           │  ← neutral-900 600 + neutral-500 400
│  └────┘  💰 Ganhei R$1.200/mês  │  ← primary-500 700, destaque em cor
└─────────────────────────────────┘

- Card: background #FFFFFF, border-radius md, shadow-sm
- Borda superior: 4px solid var(--color-primary-400)
- Padding: 24px
- Quote icon: " grande, primary-100, absolute top-left, opacity 0.5
```

#### Lead Form — "Quero ser Revendedora"

```
Estrutura:
┌─────────────────────────────────┐
│  Quero começar agora            │  ← H3 Playfair 24px
│  Preencha e entraremos em       │
│  contato pelo WhatsApp          │  ← body sm, neutral-600
│                                  │
│  Nome completo *                 │  ← label
│  [________________________]     │  ← input
│                                  │
│  WhatsApp com DDD *              │
│  [(11) 9____-____]              │  ← input com máscara telefone
│                                  │
│  Cidade *                        │
│  [________________________]     │
│                                  │
│  Dúvidas ou mensagem (opcional) │
│  [________________________]     │
│  [________________________]     │
│  [________________________]     │  ← textarea 80px
│                                  │
│  [🟢 Quero Começar Agora!]     │  ← Button WhatsApp, full width, lg
│                                  │
│  🔒 Seus dados estão seguros.   │
│  Não enviamos spam.              │  ← caption, neutral-500, ícone Lock 12px
└─────────────────────────────────┘

- Background: white ou primary-50 com borda primary-200
- Border-radius: xl (24px)
- Padding: 32px (desktop) / 24px (mobile)
- Sombra: shadow-lg
- Estado de sucesso: seção verde com CheckCircle, mensagem e botão WhatsApp
```

#### Blog Post Card

```
Estrutura:
┌─────────────────────────────────┐
│   [Imagem de Capa 16:9]         │  ← 200px altura, object-fit cover
│   [TAG CATEGORIA]               │  ← badge absolute bottom-left
├─────────────────────────────────┤
│  Data — 15 de abril de 2026     │  ← caption, neutral-500
│                                  │
│  Título do Artigo em Duas       │
│  Linhas Máximo                  │  ← H4, Playfair 18px 600, neutral-900
│                                  │
│  Resumo do artigo com no máximo  │
│  dois parágrafos visíveis...    │  ← body sm, neutral-600, 2 linhas max
│                                  │
│  Ler artigo completo →          │  ← link, primary-500, ArrowRight 16px
└─────────────────────────────────┘

- Hover: título muda para primary-500, underline
- Cursor: pointer em todo o card
```

#### Navigation Bar

```
Mobile:
┌──────────────────────────────────────┐
│ [Logo]                    [≡ Menu]   │  ← Logo esq, hamburger dir, height 64px
└──────────────────────────────────────┘

Drawer mobile (slide in from right):
┌────────────────────────┐
│ [X] Fechar             │
│                        │
│ Seja Revendedora ←     │  ← CTA destacada, primary-500, bold
│ Produtos               │
│ Depoimentos            │
│ Blog                   │
│ Sobre                  │
│ Contato                │
│                        │
│ [🟢 WhatsApp]          │  ← Button WhatsApp full width
│                        │
│ Instagram TikTok       │  ← ícones sociais
└────────────────────────┘

Desktop:
┌────────────────────────────────────────────────────────────────┐
│ [Logo]   Seja Revendedora  Produtos  Depoimentos  Blog  Sobre │ [🟢 WhatsApp]│
└────────────────────────────────────────────────────────────────┘

- Background: #FFFFFF com shadow-sm
- Sticky top-0, z-index: 100
- Altura: 64px
- "Seja Revendedora" tem cor primary-500 e font-weight 700 (destaque visual)
- Link ativo: underline de 2px primary-500 abaixo
- Transição do drawer: 250ms ease-in-out
```

#### Footer

```
Desktop (3 colunas):
┌────────────────┬────────────────┬──────────────────┐
│ [Logo]         │ Links Rápidos  │ Contato          │
│ Descrição      │ Seja Revend.   │ [WhatsApp]       │
│ breve marca    │ Produtos       │ [Instagram]      │
│                │ Depoimentos    │ [TikTok]         │
│ Redes Sociais  │ Blog           │ [YouTube]        │
│ [IG][TK][YT]   │ Sobre          │ email@            │
│                │ Contato        │                  │
└────────────────┴────────────────┴──────────────────┘
│ © 2026 Revendendo Make. Todos os direitos reservados. | Política de Privacidade │

- Background: neutral-900 (quase preto #171717)
- Texto: neutral-300 e neutral-500
- Links: neutral-300, hover: primary-300
- Logo: versão clara/branca
- Padding vertical: 64px
- Divider: 1px solid neutral-700
```

---

### 2.3 Organismos

#### Hero Section

```
Mobile:
┌─────────────────────────────────────┐
│                                      │
│  [Imagem de fundo ou gradiente]     │
│  overlay rgba(0,0,0,0.45)          │
│                                      │
│  Ganhe Dinheiro                     │  ← H1 Playfair 32px 700, branco
│  Revendendo Maquiagem               │
│  de Qualidade                       │
│                                      │
│  Seja sua própria chefe com         │  ← body-lg, branco, opacity 0.9
│  flexibilidade total de horários    │
│                                      │
│  [🟢 Quero Ser Revendedora]        │  ← Button WhatsApp LG, pílula
│  [Ver Produtos →]                   │  ← Button ghost/outline branco
│                                      │
│  ✓ Sem estoque obrigatório          │  ← 3 micro-benefícios, branco 80%
│  ✓ Suporte direto no WhatsApp       │
│  ✓ Ganhos a partir do 1º mês       │
└─────────────────────────────────────┘

- Altura mínima mobile: 100svh (short viewport height)
- Padding: 96px 20px 64px
- Image: background-image com WebP, preload obrigatório
- Gradiente de sobreposição: linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)
- Animação: fade-in + slide-up do texto, 600ms ease, delay 100ms
```

#### Benefits Section

```
┌──────────────────────────────────────────────────────┐
│  Por que Ser Revendedora Revendendo Make?            │  ← H2 center
│  Veja o que diferencia nossas revendedoras           │  ← subtitle
│                                                      │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐   │
│  │ [Icon] │  │ [Icon] │  │ [Icon] │  │ [Icon] │   │
│  │ Renda  │  │ Flexib │  │Suporte │  │Qualidade│  │
│  │ Extra  │  │ Total  │  │Direto  │  │ Premium │  │
│  │ texto  │  │ texto  │  │ texto  │  │ texto   │  │
│  └────────┘  └────────┘  └────────┘  └────────┘   │
└──────────────────────────────────────────────────────┘

Mobile: 2 colunas (2x2)
Desktop: 4 colunas
Ícone: 48px, secondary-500 (cobre/dourado)
Background da seção: primary-50
Padding vertical: 80px
Card benefício: background branco, border-radius xl, shadow-sm, padding 28px, text-center
Número destaque (se aplicável): ex "R$1.200+" em Playfair 28px primary-500
```

#### How It Works — 3 Passos

```
┌───────────────────────────────────────────────────┐
│  Como Funciona?                                   │  ← H2 center
│  Em 3 passos simples você já pode começar         │
│                                                   │
│  [① Cadastre-se]──────[② Escolha]──────[③ Venda]│
│    Preencha o         Escolha seus     Venda para
│    formulário e       produtos com     seus clientes
│    entre em contato   a melhor margem  e lucre!
└───────────────────────────────────────────────────┘

- Linha conectora entre steps: border dashed primary-200, desktop only
- Número do step: círculo 48px, background primary-500, texto branco, Playfair 20px
- Mobile: empilhado verticalmente com linha vertical conectora à esquerda
- Ícone de step: Lucide 32px secondary-500
- Cada step: padding 24px, border-radius lg, background branco, shadow-sm
```

#### Featured Products Grid

```
Desktop: grade de 3-4 colunas
Mobile: grade de 1 coluna com scroll-snap horizontal opcional (carrossel)
Heading: H2 center + link "Ver todos os produtos →"
CTA abaixo: Button Primary "Ver Catálogo Completo"
```

#### Testimonials Carousel

```
Desktop: 3 cards visíveis simultaneamente
Mobile: 1 card por vez com swipe/arrasto + dots indicadores
Auto-play: 5 segundos com pause on hover/touch
Controles: setas ChevronLeft/ChevronRight (desktop), swipe touch (mobile)
Dots: 8px, primary-200 inativo, primary-500 ativo
Heading: H2 center
Contador: "XX revendedoras já transformaram suas vidas"  ← número grande, Playfair
```

#### Instagram/TikTok Feed Section

```
┌────────────────────────────────────────────────┐
│  📱 Siga Nossas Redes Sociais                  │  ← H2 center
│                                                │
│  [Post] [Post] [Post] [Post]   ← 4 posts      │
│  [Post] [Post] [Post] [Post]   ← mobile: 2x2  │
│                                                │
│  [Instagram] [TikTok] [YouTube]               │  ← botões outline com ícone
└────────────────────────────────────────────────┘

- Embed: oEmbed iframe lazy-load
- Fallback se embed falhar: foto estática com link para perfil
- Mobile: 2 colunas, aspect-ratio 1:1
- Background: neutral-50
```

#### FAQ Accordion

```
┌────────────────────────────────────────────────┐
│  Perguntas Frequentes                          │
│                                                │
│  ┌──────────────────────────────────────────┐ │
│  │ Quanto preciso investir para começar? [+]│ │  ← header, cursor pointer
│  └──────────────────────────────────────────┘ │
│  ┌──────────────────────────────────────────┐ │
│  │ Como recebo os produtos?             [-] │ │  ← aberto, ícone rotaciona
│  │   Texto de resposta com explicação       │ │
│  │   detalhada em Inter 15px neutral-700    │ │
│  └──────────────────────────────────────────┘ │
└────────────────────────────────────────────────┘

- Animação: height transition 250ms ease
- Ícone: ChevronDown, rotação 180° quando aberto
- Border: 1px solid neutral-200, border-radius md
- Primeiro item aberto por padrão
- Máximo 1 aberto de cada vez (accordion exclusivo)
```

#### WhatsApp Floating Button

```
Posição: fixed bottom-6 right-6 (24px de cada lado)
Z-index: 9999
Visual:
  - Círculo 60px x 60px
  - Background: var(--color-whatsapp) #25D366
  - Ícone: MessageCircle 28px branco (Lucide)
  - Shadow: var(--shadow-whatsapp)
  - Hover: scale(1.1), background var(--color-whatsapp-dark)
  - Active: scale(0.95)
  - Transição: all 200ms ease

Tooltip (desktop hover):
  - "Falar no WhatsApp" à esquerda do botão
  - Background neutral-900, texto branco, border-radius sm
  - Animação: fade-in 150ms

Animação de entrada:
  - Bounce sutil na entrada, 1 vez após 3s do load
  - Pulse ring: ring verde translucido pulsando a cada 4s

Comportamento:
  - Sempre visível em todas as páginas públicas
  - Oculto apenas em páginas do admin (/admin/*)
  - Abre wa.me com mensagem padrão
  - Mensagem muda por página (ver Seção 5)

Acessibilidade:
  - aria-label="Falar com a gente no WhatsApp"
  - role="link"
  - Foco visível com outline primary
```

---

### 2.4 Componentes de Admin

#### Stats Card (Dashboard)

```
┌─────────────────────────────────┐
│ [Icon]  Leads Hoje              │  ← label, Inter 13px 500, neutral-500
│                                  │
│    47                           │  ← número, Inter 36px 700, neutral-900
│                                  │
│ ↑ +12 vs ontem                  │  ← trend, Inter 13px, success ou error
└─────────────────────────────────┘

- Border-radius: lg (16px)
- Shadow: shadow-sm
- Background: branco
- Border: 1px solid neutral-200
- Ícone: 24px, background primary-50 em círculo 40px, cor primary-500
- Padding: 24px
- Grid: 2x2 mobile, 3x2 ou 4 colunas desktop
```

#### Data Table

```
Estrutura:
┌─────┬────────────────┬──────────────────┬─────────────┬──────────────┐
│ #   │ Nome           │ WhatsApp         │ Status      │ Ações        │
├─────┼────────────────┼──────────────────┼─────────────┼──────────────┤
│ 1   │ Maria Santos   │ (11) 9xxxx-xxxx  │ [NOVO]      │ [👁] [✏️]   │
│ 2   │ Ana Lima       │ (21) 9xxxx-xxxx  │ [CONTATADO] │ [👁] [✏️]   │
└─────┴────────────────┴──────────────────┴─────────────┴──────────────┘

- Header: background neutral-50, Inter 12px 600 uppercase neutral-500
- Row: border-bottom 1px neutral-100, hover: background primary-50
- Padding célula: 14px 16px
- Ações: ícones Lucide 16px, neutral-400, hover: primary-500
- Scroll horizontal em mobile (overflow-x: auto)
- Ordenação: ChevronUp/Down no header, click para ordenar
- Zebra striping: não (muito ocupado), usar hover highlight
- Seleção de linha: checkbox à esquerda (para ações em massa)
```

#### Status Badge (Admin Leads)

```
Novo:        bg #FEF3C7, texto #92400E, borda #FDE68A  — ponto âmbar
Contatado:   bg #DBEAFE, texto #1E40AF, borda #BFDBFE  — ponto azul
Convertido:  bg #DCFCE7, texto #166534, borda #BBF7D0  — ponto verde
Descartado:  bg #F5F5F5, texto #525252, borda #E5E5E5  — ponto cinza

Font: Inter 11px 600 uppercase
Border-radius: full
Padding: 3px 10px
Dropdown select in-line para mudar status direto na tabela
```

#### Rich Text Editor

```
Biblioteca: Tiptap com extensões
Extensões necessárias:
  - Bold, Italic, Underline
  - Heading (H2, H3 apenas — H1 é o título do artigo)
  - BulletList, OrderedList
  - Link (com abertura em nova aba por padrão)
  - Image (com upload e alt text obrigatório)
  - Blockquote
  - Code, CodeBlock
  - HorizontalRule

Toolbar style:
  - Sticky top da área de edição
  - Background neutral-50
  - Border-bottom 1px neutral-200
  - Ícones Lucide 16px
  - Grupos separados por divider: [B I U] | [H2 H3] | [Lista] | [Link Img]
  
Editor:
  - Min-height: 400px
  - Font: Inter 16px neutral-700 (preview real de como ficará)
  - Border: 1px neutral-200, border-radius md
  - Focus: border primary-300
```

#### File Upload

```
Área de drag-and-drop:
┌─────────────────────────────────────────────────────┐
│                                                     │
│         [Upload] ou ↑ ícone UploadCloud 48px        │
│                                                     │
│   Arraste as fotos aqui ou clique para selecionar   │
│   JPG, PNG ou WebP · máximo 5MB por arquivo         │
│                                                     │
└─────────────────────────────────────────────────────┘
Drag-over: border primary-500, background primary-50
Preview: grade de thumbnails 80x80px com botão X para remover
Reordenação: drag-and-drop entre thumbnails
Progress bar por arquivo durante upload
Erro: mensagem em vermelho abaixo (arquivo muito grande, formato inválido)
```

---

## 3. Wireframes por Página

### 3.1 Home (Landing Page)

**Objetivo UX:** Comunicar a proposta de valor em 3 segundos, converter visitante em clique para "Seja Revendedora" ou WhatsApp.

```
MOBILE LAYOUT — 375px
══════════════════════

[HEADER — sticky]
Logo + Menu (hamburger)

────────────────────────
SEÇÃO 1: HERO
(100svh)

[Foto de fundo: mulher com maquiagem, sorrindo]
[Overlay escuro gradiente]

  GANHE DINHEIRO
  REVENDENDO
  MAQUIAGEM          ← H1 Playfair 32px branco
  DE QUALIDADE

  Flexibilidade total + renda
  extra sem sair de casa    ← subtitle branco 80%

  [🟢 Quero Ser Revendedora]   ← CTA primário full-width
  [Ver Produtos ↓]              ← CTA secundário ghost

  ✓ Sem estoque obrigatório
  ✓ Suporte via WhatsApp
  ✓ Ganhe desde o 1º mês    ← 3 checks brancos, caption

────────────────────────
SEÇÃO 2: NÚMEROS DE IMPACTO
(background primary-500)

  +500        R$2.400      97%
revendedoras  ganho médio  satisfação
  ativas      mensal

  [chips brancos centralizados em 3 colunas]

────────────────────────
SEÇÃO 3: BENEFÍCIOS
(background primary-50)
padding 80px 0

  Por que Ser Revendedora?  ← H2 center
  Veja o que nos diferencia

  [grid 2x2 de cards de benefício]
  Renda Extra | Flexibilidade
  Suporte     | Qualidade

────────────────────────
SEÇÃO 4: COMO FUNCIONA
(background branco)

  Como Funciona?  ← H2 center

  [3 steps empilhados mobile]
  ① Cadastre-se → ② Escolha → ③ Venda

  [CTA: Começar Agora →]

────────────────────────
SEÇÃO 5: PRODUTOS EM DESTAQUE
(background neutral-50)

  Produtos em Destaque  ← H2 center

  [grid 1 coluna mobile, scroll]
  [Product Card 1]
  [Product Card 2]
  [Product Card 3]
  [Product Card 4]

  [Ver Catálogo Completo →]

────────────────────────
SEÇÃO 6: DEPOIMENTOS
(background primary-50)

  O Que Dizem Nossas
  Revendedoras          ← H2 center

  [Carousel 1 card]
  [dots indicadores]

────────────────────────
SEÇÃO 7: FEED SOCIAL
(background branco)

  Siga Nossas Redes     ← H2 center

  [grid 2x2 de posts]

  [Instagram] [TikTok] [YouTube]

────────────────────────
SEÇÃO 8: CTA FINAL
(background primary-500)

  Pronta Para Começar?  ← H2 branco Playfair

  Junte-se a mais de 500 revendedoras
  que já transformaram suas vidas

  [🟢 Quero Ser Revendedora!]

────────────────────────
[FOOTER]

[WhatsApp floating button — fixed]

```

**Decisões UX da Home:**
- Seção de números (social proof quantitativo) logo após o hero para quebrar desconfiança imediata
- CTA final repete o tom emocional do hero, não apenas repete o botão
- Produtos em destaque com máximo 4-6 cards para não sobrecarregar; link para catálogo completo

---

### 3.2 Seja Revendedora

**Objetivo UX:** Responder todas as objeções da Persona 1 antes de pedir o cadastro. Formulário posicionado após a argumentação completa.

```
MOBILE LAYOUT
══════════════════════

[HEADER]

────────────────────────
SEÇÃO 1: HERO REVENDEDORA
(altura: 70vh mínimo)

[Foto: revendedora feliz no celular ou com produtos]
[Overlay mais suave — não cobrir rosto]

  Seja Revendedora
  Revendendo Make       ← H1 Playfair 30px

  Comece a ganhar dinheiro
  com maquiagem de qualidade,
  no seu ritmo, de casa     ← subtitle

  [🟢 Quero Começar!]  ← scroll down to form anchor

────────────────────────
SEÇÃO 2: BENEFÍCIOS COM NÚMEROS

  Por que Escolher a
  Revendendo Make?    ← H2

  [4 cards com destaque numérico]
  
  ┌──────────────────┐
  │      R$1.200+    │  ← número grande primary
  │  Ganho médio     │
  │  por mês         │
  └──────────────────┘
  
  [Sem investimento inicial obrigatório]
  [Suporte direto no WhatsApp]
  [Produtos com alta saída]

────────────────────────
SEÇÃO 3: COMO FUNCIONA (DETALHADO)

  Como Funciona — Passo a Passo

  ①  Cadastre-se no formulário abaixo
  ②  Entraremos em contato pelo WhatsApp
  ③  Você escolhe os produtos para revender
  ④  Vende para suas clientes
  ⑤  Lucra na diferença!

  [ilustrações simples por step — SVG flat]

────────────────────────
SEÇÃO 4: DEPOIMENTOS
(3 cards em carrossel)

────────────────────────
SEÇÃO 5: FAQ

  Dúvidas Frequentes

  [accordion — mínimo 5 perguntas]
  - Quanto preciso investir?
  - Preciso ter CNPJ?
  - Como recebo os produtos?
  - Tem estoque mínimo?
  - Como consigo clientes?

────────────────────────
SEÇÃO 6: FORMULÁRIO DE CAPTAÇÃO
(id="cadastro" — target do anchor CTA)
background primary-50 com padding 64px 20px

  ┌───────────────────────────────────┐
  │    Quero Começar Agora! 🚀        │
  │                                   │
  │  [Lead Form Component]            │
  │                                   │
  │  [🟢 Quero Ser Revendedora!]     │
  │                                   │
  │  🔒 Privacidade garantida. LGPD. │
  └───────────────────────────────────┘

────────────────────────
[FOOTER]
[WhatsApp floating — mensagem específica "revendedora"]
```

---

### 3.3 Catálogo de Produtos

**Objetivo UX:** Navegação rápida pelo portfólio; cada produto com CTA imediato para WhatsApp.

```
MOBILE LAYOUT
══════════════════════

[HEADER]

────────────────────────
HERO MINI (sem imagem de fundo)
background primary-50, padding 48px 20px

  Catálogo de Produtos   ← H1 Playfair center
  Escolha, peça pelo WhatsApp
  e receba em casa        ← subtitle center

────────────────────────
BARRA DE FILTROS (sticky abaixo do header)
background #FFFFFF, shadow-sm, padding 12px 20px

  [🔍 Buscar produto...]          ← input de busca
  
  Scroll horizontal de pills de categoria:
  [Todos] [Batons] [Bases] [Sombras] [Paletas] [Cuidados] ...

  [Preço ▾]  ← dropdown de faixa de preço

────────────────────────
GRID DE PRODUTOS

  [sem produtos na categoria]:
  Ícone Package 64px primary-200
  "Nenhum produto encontrado"
  [Ver todos os produtos]

  [com produtos]:
  1 coluna mobile, cards empilhados
  
  [Product Card]
  [Product Card]
  [Product Card]
  ...

  [Carregar mais] ← botão de paginação, ou infinite scroll
  
────────────────────────
[FOOTER]
[WhatsApp floating]

──────────────────────────────
PÁGINA DE DETALHE DO PRODUTO
/catalogo/[slug]
──────────────────────────────

[HEADER]

Breadcrumb: Home › Catálogo › [Nome do Produto]

────────────────────────
GALERIA DE FOTOS
(carrossel mobile, thumbs lateral desktop)
aspect-ratio 1:1, border-radius md

[foto 1] [foto 2] [foto 3]
[dots]

────────────────────────
INFORMAÇÕES DO PRODUTO

  Nome do Produto         ← H1 Playfair 28px
  [Tag: Categoria]

  R$ 29,90                ← H2 primary-500
  Preço sugerido de revenda: R$ 59,90  ← caption, success (margem highlight)

  Margem de lucro: R$30,00 (100%)  ← badge success highlight

  ─────────────────────
  Descrição
  [texto rico da descrição]
  ─────────────────────

  [🟢 Comprar via WhatsApp]   ← full width, LG, mensagem com nome do produto
  
  [Compartilhar] [Salvar]     ← ações secundárias

────────────────────────
SEÇÃO: MAIS PRODUTOS RELACIONADOS
H2 + grid 2 colunas mobile

[FOOTER]
```

---

### 3.4 Depoimentos

**Objetivo UX:** Maximizar credibilidade. Grid denso de histórias reais. Resultados financeiros em destaque.

```
MOBILE LAYOUT
══════════════════════

[HEADER]

HERO MINI
  Histórias Reais        ← H1
  de Revendedoras        
  que Transformaram
  Sua Vida               ← subtitle center

────────────────────────
NÚMERO DE IMPACTO
background primary-500 — 1 linha
  +500 Revendedoras Satisfeitas  ← Playfair 24px branco

────────────────────────
GRID DE DEPOIMENTOS
(sem filtro — mostrar todos aprovados)

  [Testimonial Card]
  [Testimonial Card]
  [Testimonial Card]
  ... (todos os aprovados)

  1 coluna mobile
  2 colunas tablet
  3 colunas desktop

────────────────────────
CTA FINAL
background primary-50

  Quer ser a próxima história?  ← H2
  [🟢 Quero Ser Revendedora!]

[FOOTER]
```

---

### 3.5 Blog

**Objetivo UX:** SEO + autoridade. Layout limpo que prioriza leitura.

```
LISTAGEM /blog
══════════════════════

[HEADER]

HERO MINI
  Blog Revendendo Make     ← H1
  Dicas, tutoriais e       
  guias para revendedoras  ← subtitle

────────────────────────
BUSCA + FILTRO CATEGORIA

  [🔍 Buscar artigos...]
  
  Pills de categoria:
  [Todos] [Dicas de Venda] [Maquiagem] [Negócios] [Tutoriais]

────────────────────────
GRID DE ARTIGOS

  [Blog Post Card]
  [Blog Post Card]
  [Blog Post Card]
  ... (paginação de 9)

  1 coluna mobile, 2 tablet, 3 desktop
  
  [Paginação numérica]

────────────────────────
[FOOTER]

────────────────────────────────
PÁGINA DE ARTIGO /blog/[slug]
────────────────────────────────

[HEADER]

Breadcrumb: Home › Blog › [Categoria] › [Título]

────────────────────────
IMAGEM DE CAPA
100% largura, aspect-ratio 16:9, object-fit cover
border-radius não (imagem full-bleed)
max-height: 400px desktop

────────────────────────
CONTAINER DO ARTIGO
max-width: 760px, centralizado, padding 0 20px

  [Tag Categoria]  ·  15 de abril de 2026     ← caption, neutral-500

  Título Completo do Artigo          ← H1 Playfair 28px mobile
  
  por Revendendo Make                 ← author, neutral-500

  ─────────────────────
  [RICH TEXT DO ARTIGO]
  
  Parágrafo: Inter 16px, line-height 1.7, neutral-700
  H2: Playfair 22px, margin-top 40px
  H3: Inter 18px 600, margin-top 28px
  Links: primary-500, underline
  Imagens: 100% width, border-radius md, caption italic abaixo
  Citações: border-left 4px primary-400, padding-left 16px, italic
  ─────────────────────
  
  Compartilhar: [Instagram] [WhatsApp] [Copiar link]  ← ícones com texto

────────────────────────
ARTIGOS RELACIONADOS
H2 "Veja Também"
Grid 2 colunas, Blog Post Card compact

────────────────────────
CTA ARTIGO
background primary-50, padding 48px 24px, border-radius xl

  Gostou do conteúdo?
  Seja uma revendedora!  ← H2
  [🟢 Quero Ser Revendedora!]

[FOOTER]
```

---

### 3.6 Sobre Nós

```
MOBILE LAYOUT
══════════════════════

[HEADER]

────────────────────────
SEÇÃO: HERO SOBRE

[Foto da proprietária/marca]
aspect-ratio 4:3 no topo da página

  Sobre a Revendendo Make   ← H1

────────────────────────
SEÇÃO: NOSSA HISTÓRIA
padding 64px 20px

  [Texto da história — configurável via admin]
  
  [Foto da proprietária + caption]

────────────────────────
SEÇÃO: MISSÃO E VALORES
background primary-50

  [3 cards de valores]
  Missão | Visão | Valores

────────────────────────
SEÇÃO: CTA
  [🟢 Falar no WhatsApp]
  [Seja Revendedora →]

[FOOTER]
```

---

### 3.7 Contato

```
MOBILE LAYOUT
══════════════════════

[HEADER]

HERO MINI
  Entre em Contato    ← H1
  Estamos prontas
  para te ajudar!    ← subtitle

────────────────────────
CARDS DE CONTATO

  ┌───────────────────┐
  │ [WhatsApp]        │
  │ Fale conosco      │  ← principal
  │ (11) 9XXXX-XXXX  │
  │ [🟢 Abrir Chat]  │
  └───────────────────┘

  ┌───────────────────┐
  │ [E-mail]          │
  │ contato@...       │
  │ [Enviar E-mail →] │
  └───────────────────┘

────────────────────────
REDES SOCIAIS

  Siga nossas redes:
  [Instagram] [TikTok] [Facebook] [YouTube]
  (cards com ícone + @handle + botão "Seguir")

[FOOTER]
```

---

### 3.8 Admin — Dashboard

```
LAYOUT ADMIN (sidebar + main)
══════════════════════════════

[SIDEBAR — 260px]
[Logo admin]
─────────────
Dashboard  ←ativo
Produtos
Leads  [3] ← badge novos
Depoimentos
Blog
Configurações
─────────────
[Sair →]

[MAIN CONTENT]

[TOPBAR]
≡ Menu (mobile)    Olá, Admin 👋    [Avatar]

────────────────────────────────────
STATS CARDS (2x2 mobile, 4 colunas desktop)

┌───────────────┐ ┌───────────────┐
│ Leads Hoje    │ │ Leads 7 Dias  │
│      12       │ │      47       │
│ ↑ +3 vs ontem │ │               │
└───────────────┘ └───────────────┘

┌───────────────┐ ┌───────────────┐
│ Leads Novos   │ │ Produtos Ativos│
│       8       │ │      24       │
│ ⚠ Contactar  │ │ 6 em destaque │
└───────────────┘ └───────────────┘

────────────────────────────────────
TABELA DE LEADS RECENTES

H2 "Leads Recentes"  [Ver todos →]

[Data Table component — 5 linhas]
Colunas: Nome | WhatsApp | Cidade | Status | Data

────────────────────────────────────
AÇÕES RÁPIDAS

[+ Adicionar Produto]   [📥 Exportar Leads]
[+ Novo Artigo]         [⚙️ Configurações]
```

---

### 3.9 Admin — Produtos

```
[SIDEBAR] + [MAIN]

TOPBAR: "Produtos"  [+ Adicionar Produto]

────────────────────────────────────
FILTROS

[🔍 Buscar produto...]   [Categoria ▾]   [Status ▾]

────────────────────────────────────
TABELA DE PRODUTOS

Colunas:
[thumb 48px] | Nome | Categoria | Preço | Status (toggle) | Destaque (toggle) | Ações [✏️][🗑️]

────────────────────────────────────
MODAL / PÁGINA DE CRIAÇÃO/EDIÇÃO
(página separada /admin/produtos/novo)

Tab: "Informações"  |  "Fotos"  |  "SEO"

[INFORMAÇÕES]
Nome do produto *
Categoria * [select + "criar nova"]
Preço de custo (R$) [opcional]
Preço de venda sugerido (R$) [opcional]
Descrição [Textarea, futuro rich text]

[Toggle] Produto ativo
[Toggle] Produto em destaque (max 6)

[FOTOS]
[File Upload component]
Até 10 fotos, drag para reordenar

[SEO]
Slug (URL amigável)  [input, auto-gerado]
Alt text da foto principal *

─────
[Salvar Produto]  [Cancelar]
```

---

### 3.10 Admin — Leads

```
TOPBAR: "Leads"  [📥 Exportar CSV]

────────────────────────────────────
FILTROS

[🔍 Buscar nome/WhatsApp/cidade]
[Status ▾]  [Data início]  [Data fim]  [Filtrar]

────────────────────────────────────
TABELA DE LEADS

Colunas:
Nome | WhatsApp (link wa.me) | Cidade | Data/Hora | Status [select inline] | [👁 Ver]

Ordenação padrão: mais recente primeiro

────────────────────────────────────
MODAL DE DETALHE DO LEAD (click em Ver)

┌────────────────────────────────────┐
│ Lead: Maria Santos                 │
├────────────────────────────────────┤
│ WhatsApp: (11) 9xxxx-xxxx [Abrir] │
│ Cidade: São Paulo - SP             │
│ Cadastro: 15/04/2026 14:32        │
│ Mensagem: "Tenho interesse em..."  │
│                                    │
│ Status atual: [select ▾]          │
│                                    │
│ [Salvar Status]  [Fechar]         │
└────────────────────────────────────┘
```

---

### 3.11 Admin — Depoimentos

```
TOPBAR: "Depoimentos"  [+ Adicionar Depoimento]

────────────────────────────────────
GRADE DE CARDS

[grid 2 colunas desktop, 1 mobile]

┌────────────────────────────────────┐
│ [Foto 48px] Maria S. — SP         │
│ [APROVADO ▾] ← select de status   │
│                                    │
│ "Texto do depoimento resumido..."  │
│ 💰 Ganhei R$1.200 no 1º mês      │
│                                    │
│ [Pré-visualizar] [✏️ Editar] [🗑️]│
└────────────────────────────────────┘

────────────────────────────────────
MODAL/PÁGINA DE CRIAÇÃO

Nome *
Cidade *
Foto [upload, opcional]
Texto do depoimento * [textarea 500 chars]
Resultado/transformação * [input]
Status [Pendente/Aprovado/Reprovado]

[Pré-visualizar Card]  ← mostra como ficará no site
[Salvar]  [Cancelar]
```

---

### 3.12 Admin — Blog

```
TOPBAR: "Artigos do Blog"  [+ Novo Artigo]

────────────────────────────────────
TABELA

Colunas: Título | Categoria | Status [Publicado/Rascunho] | Data | Ações

────────────────────────────────────
PÁGINA DE EDIÇÃO /admin/blog/[id]

Layout: 2 colunas desktop (editor largo + sidebar de meta)

[EDITOR — coluna principal, 65%]
Título do artigo *
[Rich Text Editor — Tiptap]

[SIDEBAR — 35%]
Status: [Rascunho / Publicado]
Data de publicação: [date picker]
─────────
Categoria: [select]
─────────
Imagem de capa: [upload]
─────────
Excerpt/Resumo (meta description) [textarea 300 chars]
─────────
SEO
Meta title [60 chars max, contador]
Meta description [160 chars max, contador]
Slug [input]
─────────
[Salvar Rascunho]
[Publicar Artigo]
```

---

### 3.13 Admin — Configurações

```
TOPBAR: "Configurações do Site"

────────────────────────────────────
ABAS: [Geral] [Redes Sociais] [Aparência] [SEO & Analytics] [Conteúdo Home]

[GERAL]
Número de WhatsApp *
(11) 9XXXX-XXXX ← com máscara, formatação
E-mail de contato

[REDES SOCIAIS]
Instagram URL
TikTok URL
Facebook URL
YouTube URL

[APARÊNCIA]
Logo do site [upload PNG/SVG]
Favicon [upload ICO/PNG]
Imagem Open Graph padrão [upload 1200x630px]

[SEO & ANALYTICS]
Google Analytics 4 Measurement ID (G-XXXXXXXX)
Nota: "Quando preenchido, o tracking é ativado automaticamente"

[CONTEÚDO HOME]
Headline do hero principal
Subheadline do hero

Benefício 1: Título + Descrição
Benefício 2: Título + Descrição
Benefício 3: Título + Descrição

─────────────────────────────────────
[Salvar Configurações]  ← botão primário fixo no fundo (sticky footer do form)
[Confirmação verde: "Configurações salvas com sucesso!"]
```

---

## 4. Estrutura de Navegação

### 4.1 Navegação Pública

```
Nível 0 (Raiz):
├── / (Home)
├── /seja-revendedora
├── /catalogo
│   └── /catalogo/[slug] (detalhe do produto)
├── /depoimentos
├── /blog
│   └── /blog/[slug] (artigo)
├── /sobre
└── /contato

Rotas auxiliares:
├── /politica-de-privacidade
└── /404 (página personalizada)

Header Nav Order: Logo | Seja Revendedora | Produtos | Depoimentos | Blog | Sobre | Contato | [WhatsApp CTA]
```

**Hierarquia visual de importância no menu:**
1. "Seja Revendedora" — cor primary-500, bold 700 (CTA mais importante)
2. "Produtos" — texto padrão
3. Restante — texto padrão

**Mobile navigation behavior:**
- Hamburger menu topo direito
- Drawer deslizando da direita (não overlay de página inteira)
- Overlay semitransparente (#000000 com opacity 0.4) cobrindo o resto
- Tap fora do drawer fecha o menu
- Esc key fecha o menu

### 4.2 Navegação do Admin

```
/admin (redirect para /admin/dashboard)
/admin/dashboard
/admin/produtos
/admin/produtos/novo
/admin/produtos/[id]
/admin/leads
/admin/leads/[id]
/admin/depoimentos
/admin/depoimentos/novo
/admin/depoimentos/[id]
/admin/blog
/admin/blog/novo
/admin/blog/[id]
/admin/configuracoes

Sidebar Order: Dashboard | Produtos | Leads | Depoimentos | Blog | Configurações | Sair

/admin/login (pública — sem sidebar)
```

**Comportamento admin mobile:**
- Sidebar colapsa em drawer (hambúrger no topbar)
- Topbar com logo + título da página + avatar/menu
- Bottom tab bar opcional como alternativa para mobile (Dashboard | Produtos | Leads | Mais)

---

## 5. Padrões de UX e Interações

### 5.1 WhatsApp — Mensagens Contextuais por Página

| Página | Mensagem Pré-formatada |
|--------|----------------------|
| Botão flutuante (todas) | `Olá! Vim pelo site Revendendo Make e gostaria de mais informações.` |
| /seja-revendedora (form enviado) | `Olá! Me cadastrei para ser revendedora Revendendo Make. Meu nome é {nome}.` |
| /seja-revendedora (CTA no hero) | `Olá! Quero saber mais sobre como me tornar revendedora da Revendendo Make.` |
| /catalogo/[slug] (por produto) | `Olá! Tenho interesse no produto: {nome do produto}. Pode me dar mais informações?` |
| /contato | `Olá! Gostaria de entrar em contato com a Revendendo Make.` |
| /sobre | `Olá! Vi o site da Revendendo Make e gostaria de saber mais.` |
| Blog (CTA ao final) | `Olá! Li o artigo "{título do artigo}" e gostaria de ser revendedora!` |

**Formato do link:** `https://wa.me/55{DDD}{NUMERO}?text={mensagem_url_encoded}`

### 5.2 Formulário de Captação de Leads

**Máscara de telefone:** `(99) 99999-9999` — automática ao digitar  
**Validação em tempo real** (on blur, não on change — menos intrusivo):
- Nome: mínimo 3 caracteres, não pode conter números
- WhatsApp: formato válido brasileiro, 10 ou 11 dígitos
- Cidade: mínimo 2 caracteres

**Estados do formulário:**

```
Estado normal:
→ Campos com labels flutuantes (float label pattern)
→ Botão verde WhatsApp "Quero Começar Agora!"

Estado loading (após submit):
→ Botão: spinner + "Enviando..." — desabilitar duplo clique
→ Inputs bloqueados

Estado sucesso:
→ Animação: formulário faz fade-out, success state faz fade-in
→ Ícone CheckCircle 64px success-verde animado
→ H3: "Cadastro realizado! 🎉"
→ Texto: "Em breve entraremos em contato pelo WhatsApp. Para agilizar, você já pode falar com a gente agora!"
→ Botão WhatsApp grande: "Falar no WhatsApp Agora"
→ Não redirecionar — manter na página (não perder contexto)

Estado erro (falha de rede):
→ Banner vermelho no topo do form: "Ops! Erro ao enviar. Tente novamente ou fale diretamente no WhatsApp."
→ Botão WhatsApp alternativo aparece
→ Campos preenchidos são preservados
```

### 5.3 Catálogo — Filtros e Busca

- Filtro de categoria: scroll horizontal de pills em mobile (sem dropdown para agilidade)
- Busca: debounce de 300ms antes de filtrar — não bloqueia UI
- Estado de carregamento: skeleton loaders (2 colunas de cards pulsando) em vez de spinner de página inteira
- Nenhum resultado: ilustração amigável + "Que tal ver todos os produtos?" com botão

### 5.4 UX Mobile — Regras Gerais

**Tap targets:**
- Todos os botões, links e elementos interativos: mínimo 44px x 44px
- Preferência por 48px ou 52px para elementos principais

**Gestos:**
- Carrossel de depoimentos: swipe left/right (touch events)
- Galeria de produto: swipe entre fotos
- Drawer do menu: swipe right para fechar
- Sem gestos complexos (long-press, pinch em conteúdo de texto)

**Scroll e feedback:**
- overscroll-behavior: contain em modais e drawers (não vaza para a página)
- Bouncing natural do iOS preservado (não desabilitar)
- Feedback visual imediato em tap: ripple effect ou opacity change em 100ms

**Teclado virtual em formulários:**
- WhatsApp input: `inputmode="tel"` — abre teclado numérico no Android
- E-mail: `type="email"` — abre teclado com @ visível
- Nome e cidade: `type="text"` com `autocomplete="name"` e `autocomplete="address-level2"`
- Scroll automático para o campo focado (comportamento nativo do browser)

### 5.5 Animações e Transições

**Princípio:** Animações servem ao conteúdo, não ao design. Sutis e rápidas.

| Elemento | Animação | Duração | Easing |
|----------|----------|---------|--------|
| Entrada de página | fade-in | 300ms | ease-out |
| Cards (scroll reveal) | fade-in + slide-up 16px | 400ms | ease-out |
| Botões (hover/tap) | scale / color | 150ms | ease |
| Drawer (abertura) | slide-in-right | 250ms | ease-in-out |
| Modal (abertura) | fade-in + scale 0.95→1 | 200ms | ease-out |
| Accordion (expansão) | height auto → px | 250ms | ease |
| Carrossel (slide) | translate | 350ms | ease-in-out |
| Notificações/toast | slide-down + fade | 250ms | ease |
| WhatsApp bounce | keyframe bounce | 600ms | — |

**Respeitar `prefers-reduced-motion`:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 5.6 Performance UX — Skeleton Loaders

Usar skeleton loaders em vez de spinners para seções com muitos dados visuais:

- Grid de produtos: skeleton de 3-6 cards (fundo cinza pulsante com forma do card)
- Dashboard stats: skeleton de 4 cards
- Tabela de leads: skeleton de 5 linhas
- Imagem de produto: placeholder de cor sólida neutral-100 com animação shimmer

### 5.7 Toast Notifications (Admin)

```
Posição: top-right, 24px de margem
Empilhamento: máximo 3 toasts visíveis
Auto-dismiss: 4 segundos
Fechar manual: botão X

Tipos:
✓ Sucesso — bg success-light, borda success, ícone CheckCircle
⚠ Aviso — bg warning-light, borda warning, ícone AlertTriangle
✕ Erro — bg error-light, borda error, ícone XCircle
ℹ Info — bg info-light, borda info, ícone Info

Mensagens padrão:
"Produto salvo com sucesso!"
"Lead atualizado."
"Configurações salvas."
"Erro ao salvar. Tente novamente."
"Depoimento aprovado e publicado!"
```

---

## 6. Acessibilidade

### 6.1 Contraste de Cores (WCAG 2.1 AA)

| Combinação | Rácio | Status | Uso |
|------------|-------|--------|-----|
| `#C9184A` sobre `#FFFFFF` | 5.6:1 | ✅ AA | Botão primário |
| `#C9184A` sobre `#FFF0F3` | 5.2:1 | ✅ AA | Links em fundo rose |
| `#FFFFFF` sobre `#C9184A` | 5.6:1 | ✅ AA | Texto em botão primário |
| `#171717` sobre `#FFFFFF` | 19.3:1 | ✅ AAA | Títulos |
| `#404040` sobre `#FFFFFF` | 9.7:1 | ✅ AAA | Corpo de texto |
| `#737373` sobre `#FFFFFF` | 4.6:1 | ✅ AA | Texto secundário |
| `#FFFFFF` sobre `#25D366` | 2.2:1 | ⚠️ fail texto normal | Usar bold/large para texto em botão WhatsApp |
| `#FFFFFF` sobre `#128C7E` (hover) | 3.6:1 | ✅ Large Text AA | Texto grande em botão WhatsApp |
| `#D97706` sobre `#FEF3C7` | 3.2:1 | ✅ Large/Bold AA | Badge "Novo" |

> **Nota botão WhatsApp:** A cor verde oficial `#25D366` tem contraste insuficiente com branco para texto normal. Solução: usar `font-weight: 700` (bold) e `font-size >= 16px` no botão WhatsApp, o que satisfaz o critério de "large text" (3:1). Alternativa: usar `#128C7E` como background (melhor contraste 3.6:1).

### 6.2 Foco e Navegação por Teclado

```css
/* Focus visible para todos os elementos interativos */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
  border-radius: 4px;
}

/* Remover outline apenas quando não for navegação por teclado */
:focus:not(:focus-visible) {
  outline: none;
}
```

**Tab order lógico em todas as páginas:**
- Header: Logo → itens de nav → CTA WhatsApp
- Forms: campo a campo de cima para baixo, submit por último
- Cards de produto: card inteiro como elemento focável, ou botão interno
- Modal: foco armadilhado dentro do modal enquanto aberto
- Drawer: foco vai para o primeiro item do drawer ao abrir, retorna ao trigger ao fechar

### 6.3 ARIA e Semântica

```html
<!-- Botão WhatsApp flutuante -->
<a href="https://wa.me/..." 
   aria-label="Falar com a gente no WhatsApp"
   role="link">
  <MessageCircle aria-hidden="true" />
</a>

<!-- Formulário de leads -->
<form aria-label="Formulário de cadastro de revendedora">
  <label for="nome">Nome completo <span aria-label="obrigatório">*</span></label>
  <input id="nome" required aria-required="true" aria-describedby="nome-error" />
  <span id="nome-error" role="alert" aria-live="polite"></span>
</form>

<!-- Carrossel de depoimentos -->
<section aria-label="Depoimentos de revendedoras" aria-roledescription="carrossel">
  <div role="group" aria-roledescription="slide" aria-label="Depoimento 1 de 8">...</div>
  <button aria-label="Próximo depoimento">...</button>
  <button aria-label="Depoimento anterior">...</button>
</section>

<!-- Menu mobile -->
<button aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu de navegação">
  <Menu aria-hidden="true" />
</button>
<nav id="mobile-menu" aria-label="Menu principal">...</nav>

<!-- FAQ Accordion -->
<div>
  <button aria-expanded="false" aria-controls="faq-1-answer" id="faq-1-trigger">
    Quanto preciso investir?
    <ChevronDown aria-hidden="true" />
  </button>
  <div id="faq-1-answer" role="region" aria-labelledby="faq-1-trigger" hidden>
    <p>Resposta aqui...</p>
  </div>
</div>
```

### 6.4 Alt Text para Imagens

**Estratégia:**

| Tipo de Imagem | Alt Text | Exemplo |
|----------------|----------|---------|
| Produto | Descritivo do produto | `Batom Matte vermelho cereja, acabamento fosco, Revendendo Make` |
| Foto da revendedora (depoimento) | Nome e papel | `Foto de Maria Santos, revendedora Revendendo Make de Curitiba` |
| Hero de página | Contexto visual | `Mulher sorrindo segurando produtos de maquiagem` |
| Ícone decorativo | Vazio (`alt=""`) | Ícones de features, bullets decorativos |
| Logo | `Logo Revendendo Make` | — |
| Blog cover | Título + contexto | `Capa do artigo: 5 dicas para vender mais maquiagem no WhatsApp` |

**Admin — campo obrigatório de alt text:**
- Produtos: campo "Texto alternativo da foto principal" obrigatório no formulário
- Blog: campo "Alt text da imagem de capa" obrigatório

### 6.5 Formulários Acessíveis

- Todos os inputs têm `<label>` associado via `for/id` ou `aria-labelledby`
- Mensagens de erro associadas ao campo via `aria-describedby`
- Erros de validação anunciados via `role="alert"` ou `aria-live="polite"`
- Campos obrigatórios marcados com `*` E `aria-required="true"` (não apenas visualmente)
- Placeholder NUNCA substitui label — ambos presentes

---

## 7. Design Tokens — Entrega para Desenvolvedor

### 7.1 CSS Custom Properties (variáveis CSS)

```css
:root {
  /* ═══════════════════════════════════════════
     CORES PRIMÁRIAS (Framboesa)
  ═══════════════════════════════════════════ */
  --color-primary-50:  #FFF0F3;
  --color-primary-100: #FFD6E0;
  --color-primary-200: #FFB3C1;
  --color-primary-300: #FF85A1;
  --color-primary-400: #FF4D6D;
  --color-primary-500: #C9184A;  /* COR PRIMÁRIA PRINCIPAL */
  --color-primary-600: #A4133C;
  --color-primary-700: #800F2F;
  --color-primary-800: #590D22;
  --color-primary-900: #370617;

  /* ═══════════════════════════════════════════
     CORES SECUNDÁRIAS (Dourado/Cobre)
  ═══════════════════════════════════════════ */
  --color-secondary-50:  #FFFDE7;
  --color-secondary-100: #FFF3E0;
  --color-secondary-200: #FFE082;
  --color-secondary-300: #FFCC80;
  --color-secondary-400: #FFB74D;
  --color-secondary-500: #FF8F00;  /* COR SECUNDÁRIA PRINCIPAL */
  --color-secondary-600: #F57F17;
  --color-secondary-700: #E65100;

  /* ═══════════════════════════════════════════
     NEUTROS
  ═══════════════════════════════════════════ */
  --color-neutral-0:   #FFFFFF;
  --color-neutral-50:  #FAFAFA;
  --color-neutral-100: #F5F5F5;
  --color-neutral-200: #E5E5E5;
  --color-neutral-300: #D4D4D4;
  --color-neutral-400: #A3A3A3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #171717;

  /* ═══════════════════════════════════════════
     WHATSAPP
  ═══════════════════════════════════════════ */
  --color-whatsapp:       #25D366;
  --color-whatsapp-dark:  #128C7E;
  --color-whatsapp-light: #DCF8C6;

  /* ═══════════════════════════════════════════
     ESTADOS DO SISTEMA
  ═══════════════════════════════════════════ */
  --color-success:        #16A34A;
  --color-success-light:  #DCFCE7;
  --color-success-dark:   #14532D;
  --color-error:          #DC2626;
  --color-error-light:    #FEE2E2;
  --color-error-dark:     #7F1D1D;
  --color-warning:        #D97706;
  --color-warning-light:  #FEF3C7;
  --color-warning-dark:   #78350F;
  --color-info:           #2563EB;
  --color-info-light:     #DBEAFE;
  --color-info-dark:      #1E3A8A;

  /* ═══════════════════════════════════════════
     TIPOGRAFIA
  ═══════════════════════════════════════════ */
  --font-heading: 'Playfair Display', Georgia, 'Times New Roman', serif;
  --font-body:    'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;

  /* Tamanhos (mobile-first) */
  --text-xs:    0.6875rem;  /* 11px */
  --text-sm:    0.75rem;    /* 12px */
  --text-base:  0.8125rem;  /* 13px */
  --text-md:    0.9375rem;  /* 15px */
  --text-lg:    1.0625rem;  /* 17px */
  --text-xl:    1.125rem;   /* 18px */
  --text-2xl:   1.25rem;    /* 20px */
  --text-3xl:   1.5rem;     /* 24px */
  --text-4xl:   1.75rem;    /* 28px */
  --text-5xl:   2rem;       /* 32px */
  --text-6xl:   2.25rem;    /* 36px */
  --text-hero:  2rem;       /* 32px mobile → 52px desktop */

  /* Line Heights */
  --leading-tight:  1.2;
  --leading-snug:   1.35;
  --leading-normal: 1.5;
  --leading-relaxed: 1.65;
  --leading-loose:  1.8;

  /* Font Weights */
  --font-regular:   400;
  --font-medium:    500;
  --font-semibold:  600;
  --font-bold:      700;
  --font-extrabold: 900;

  /* ═══════════════════════════════════════════
     ESPAÇAMENTO (base 4px)
  ═══════════════════════════════════════════ */
  --space-0:  0px;
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-7:  28px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-14: 56px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  /* ═══════════════════════════════════════════
     BORDER RADIUS
  ═══════════════════════════════════════════ */
  --radius-xs:   4px;
  --radius-sm:   8px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-2xl:  32px;
  --radius-full: 9999px;

  /* ═══════════════════════════════════════════
     SOMBRAS
  ═══════════════════════════════════════════ */
  --shadow-xs:        0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm:        0 2px 4px rgba(0, 0, 0, 0.08);
  --shadow-md:        0 4px 12px rgba(0, 0, 0, 0.10);
  --shadow-lg:        0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-xl:        0 16px 48px rgba(0, 0, 0, 0.15);
  --shadow-primary:   0 4px 16px rgba(201, 24, 74, 0.30);
  --shadow-whatsapp:  0 4px 16px rgba(37, 211, 102, 0.40);

  /* ═══════════════════════════════════════════
     Z-INDEX
  ═══════════════════════════════════════════ */
  --z-base:         0;
  --z-raised:       10;
  --z-dropdown:     100;
  --z-sticky:       200;
  --z-overlay:      300;
  --z-modal:        400;
  --z-toast:        500;
  --z-floating:     600;   /* botão WhatsApp */
  --z-tooltip:      700;

  /* ═══════════════════════════════════════════
     TRANSIÇÕES
  ═══════════════════════════════════════════ */
  --transition-fast:   150ms ease;
  --transition-base:   200ms ease;
  --transition-slow:   300ms ease;
  --transition-drawer: 250ms ease-in-out;

  /* ═══════════════════════════════════════════
     BREAKPOINTS (referência — usar em Tailwind config)
  ═══════════════════════════════════════════ */
  /* sm: 640px | md: 768px | lg: 1024px | xl: 1280px | 2xl: 1440px */

  /* ═══════════════════════════════════════════
     LAYOUT
  ═══════════════════════════════════════════ */
  --container-max:    1320px;
  --header-height:    64px;
  --admin-sidebar-w:  260px;
}
```

### 7.2 Tailwind CSS Config — Extensão de Tema

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#FFF0F3',
          100: '#FFD6E0',
          200: '#FFB3C1',
          300: '#FF85A1',
          400: '#FF4D6D',
          500: '#C9184A',
          600: '#A4133C',
          700: '#800F2F',
          800: '#590D22',
          900: '#370617',
        },
        secondary: {
          50:  '#FFFDE7',
          100: '#FFF3E0',
          300: '#FFCC80',
          500: '#FF8F00',
          700: '#E65100',
        },
        whatsapp: {
          DEFAULT: '#25D366',
          dark:    '#128C7E',
          light:   '#DCF8C6',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        body:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xs:   '4px',
        sm:   '8px',
        md:   '12px',
        lg:   '16px',
        xl:   '24px',
        '2xl':'32px',
      },
      boxShadow: {
        xs:        '0 1px 2px rgba(0,0,0,0.05)',
        sm:        '0 2px 4px rgba(0,0,0,0.08)',
        md:        '0 4px 12px rgba(0,0,0,0.10)',
        lg:        '0 8px 24px rgba(0,0,0,0.12)',
        xl:        '0 16px 48px rgba(0,0,0,0.15)',
        primary:   '0 4px 16px rgba(201,24,74,0.30)',
        whatsapp:  '0 4px 16px rgba(37,211,102,0.40)',
      },
      spacing: {
        '18': '72px',
        '22': '88px',
        '30': '120px',
      },
      maxWidth: {
        container: '1320px',
        article:   '760px',
      },
      height: {
        header: '64px',
      },
      zIndex: {
        dropdown: '100',
        sticky:   '200',
        overlay:  '300',
        modal:    '400',
        toast:    '500',
        floating: '600',
        tooltip:  '700',
      },
    },
  },
  plugins: [],
}
```

### 7.3 Google Fonts — Importação

```html
<!-- No <head> — preconnect primeiro para performance -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;900&display=swap"
  rel="stylesheet"
/>
```

```javascript
// Next.js — next/font (recomendado para performance)
import { Inter, Playfair_Display } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  display: 'swap',
  variable: '--font-playfair',
})
```

### 7.4 Componentes shadcn/ui — Customizações

O projeto usa `shadcn/ui` como base de componentes. Customizações necessárias:

```javascript
// components.json (shadcn config)
{
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "rose",  // mais próximo da paleta primary
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

**Componentes shadcn/ui a instalar:**
- `button`, `input`, `textarea`, `select`, `checkbox`, `label`
- `card`, `badge`, `avatar`, `separator`
- `dialog` (modais), `sheet` (drawer), `accordion`
- `table`, `tabs`, `toggle`
- `toast` (sonner), `skeleton`
- `dropdown-menu`, `popover`

---

## Apêndice A — Checklist de Implementação Front-End

### Design System
- [ ] CSS custom properties (variáveis) configuradas globalmente
- [ ] Tailwind config extendido com tokens do design system
- [ ] Google Fonts (Inter + Playfair Display) carregadas com next/font
- [ ] shadcn/ui instalado e customizado com paleta primary

### Acessibilidade
- [ ] Contraste de cores validado em todas as combinações texto/fundo
- [ ] Focus-visible estilizado em todos os elementos interativos
- [ ] aria-labels em todos os botões icônicos (WhatsApp, menu, carrossel)
- [ ] Formulários com labels e error messages acessíveis
- [ ] prefers-reduced-motion aplicado

### Mobile
- [ ] Touch targets mínimo 44x44px verificados
- [ ] Layout testado em 375px, 390px, 412px
- [ ] Drawer de menu funciona com swipe e tap-outside
- [ ] Carrossel funciona com swipe touch
- [ ] Overflow-x bloqueado na página principal

### Performance
- [ ] Imagens em WebP com lazy loading abaixo do fold
- [ ] Hero image com preload
- [ ] Skeleton loaders nos grids de produtos e leads
- [ ] Fontes com font-display: swap (via next/font)
- [ ] Embeds de redes sociais com lazy load

### WhatsApp
- [ ] Botão flutuante presente em todas as páginas públicas
- [ ] Mensagens contextuais por página implementadas
- [ ] Número de WhatsApp lido do banco de dados (configurações)
- [ ] aria-label no botão WhatsApp flutuante

---

*Documento gerado por Uma (@ux-design-expert) — Synkra AIOX v2.0*  
*Para uso interno — Revendendo Make*  
*Próximo passo: Aprovação pela proprietária e início da Story 1.3 — Design System & Component Library*
