# Epic 5 — Performance & Launch

**Projeto:** Revendendo Make  
**Epic:** 5 de 5  
**Objetivo:** Garantir que o site atende todos os critérios de performance, qualidade e SEO antes do lançamento público.  
**Critério de Conclusão:** Lighthouse ≥ 90 em todas as métricas nas páginas principais, zero erros críticos, analytics configurado, domínio ativo com SSL, checklist de lançamento 100% concluído.  
**Prioridade:** MUST (Stories 5.1, 5.2, 5.4) | SHOULD (Story 5.3)

**Pré-requisito obrigatório:** Epics 1, 2, 3 e 4 completos (ou pelo menos todos os stories MUST completos).

**Documentos de referência:**
- `docs/tech-stack.md` — stack e variáveis de ambiente
- `docs/coding-standards.md` — padrões de code e performance
- `docs/fullstack-architecture.md` — seções 7 (Performance) e Apêndice A (Checklist de Lançamento)
- `docs/prd.md` — NFR-001 (Performance), NFR-005 (Responsividade), FR-016, FR-017

---

## Story 5.1 — Otimização de Performance

**Prioridade:** MUST  
**FR associado:** FR-016, NFR-001  
**Pré-requisitos:** Epic 2 completo (todas as páginas públicas implementadas)  
**Estimativa:** 2–3 dias

### Descrição

Auditoria completa de Lighthouse nas páginas principais e correção de todos os problemas de performance encontrados. O objetivo é atingir Lighthouse Score ≥ 90 em Performance, SEO, Acessibilidade e Best Practices nas páginas Home, "Seja Revendedora" e Catálogo.

### Acceptance Criteria

#### Lighthouse Score — Metas

- [ ] Lighthouse Performance ≥ 90 na página Home (mobile simulado, 4G)
- [ ] Lighthouse Performance ≥ 90 na página "Seja Revendedora" (mobile simulado, 4G)
- [ ] Lighthouse Performance ≥ 90 na página Catálogo de Produtos (mobile simulado, 4G)
- [ ] Lighthouse SEO ≥ 90 em todas as páginas públicas
- [ ] Lighthouse Acessibilidade ≥ 90 em todas as páginas públicas
- [ ] Lighthouse Best Practices ≥ 90 em todas as páginas públicas

#### Core Web Vitals — Metas

- [ ] LCP (Largest Contentful Paint) < 2.5s em todas as páginas principais
- [ ] CLS (Cumulative Layout Shift) < 0.1 em todas as páginas
- [ ] INP (Interaction to Next Paint) < 200ms

#### Otimização de Imagens

- [ ] Hero image com `priority` prop em todas as páginas que têm hero (preload obrigatório)
- [ ] Todas as imagens below the fold com `loading="lazy"`
- [ ] Prop `sizes` definida em todos os componentes `<Image>`:
  - Imagens de produto em grid: `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
  - Hero: `sizes="100vw"`
- [ ] `formats: ['image/avif', 'image/webp']` configurado no `next.config.ts`
- [ ] `deviceSizes: [375, 428, 768, 1024, 1280, 1440]` configurado no `next.config.ts`
- [ ] Imagens no Supabase Storage armazenadas em WebP (ou convertidas pelo Next.js Image automaticamente)
- [ ] Dimensões definidas em todas as imagens para evitar CLS (usar `fill` com container fixo ou `width`/`height` explícitos)

#### Fontes

- [ ] Playfair Display e Inter carregadas via `next/font/google` com `display: 'swap'`
- [ ] `preload: true` nas fontes críticas para evitar FOIT/FOUT
- [ ] Nenhuma fonte carregada via CDN externo fora do `next/font`

#### JavaScript e Renderização

- [ ] Framer Motion importado via `dynamic(() => import('framer-motion'), { ssr: false })` onde não é crítico
- [ ] Tiptap (editor) carregado apenas nas páginas de edição do admin (não no bundle público)
- [ ] First Load JS da Home < 100KB (verificado via `npm run build` output)
- [ ] Zero render-blocking resources (scripts com `defer`/`async` ou carregados via Next.js Script)
- [ ] CSS crítico inlined automaticamente pelo Next.js (padrão — não requer configuração manual)

#### Cache e CDN

- [ ] Vercel CDN ativo para todos os assets estáticos
- [ ] ISR configurado corretamente nas páginas públicas (revalidate conforme tabela em `tech-stack.md`)
- [ ] `Cache-Control` headers corretos para assets estáticos (Vercel gerencia automaticamente)

#### Ações de Correção (executar conforme necessidade)

- [ ] Auditar e corrigir todos os avisos de Performance no Lighthouse ≥ "medium" impacto
- [ ] Auditar e corrigir todos os avisos de Acessibilidade no Lighthouse
- [ ] Verificar e corrigir CLS: usar `aspect-ratio` em containers de imagem, `font-display: swap`
- [ ] Verificar e corrigir LCP: garantir `priority` na imagem maior above the fold

### Fora de Escopo

- Otimização do bundle do admin (não tem restrição de performance como o público)
- Service Worker / PWA (não previsto na v1)
- Edge caching customizado além do Vercel padrão

---

## Story 5.2 — Mobile UX Polish & Testing

**Prioridade:** MUST  
**FR associado:** NFR-005 (Responsividade Mobile)  
**Pré-requisitos:** Epic 2 completo, Story 5.1 (performance auditada)  
**Estimativa:** 2–3 dias

### Descrição

Testes detalhados em dispositivos reais e emulados nos principais breakpoints do público-alvo. Revisão de todos os touch targets, ajustes de layout mobile e teste de formulários com teclado virtual. O público é 80–90% mobile (Android, 4G).

### Acceptance Criteria

#### Testes por Breakpoint

- [ ] 375px (iPhone SE, menor dispositivo suportado): layout funcional e sem overflow horizontal
- [ ] 390px (iPhone 14): layout funcional, hero visível above the fold
- [ ] 412px (Android médio — Pixel, Galaxy A): layout funcional
- [ ] 768px (tablet): layout funcional em modo portrait e landscape
- [ ] 1280px (desktop): layout funcional

Para cada breakpoint, verificar:
- [ ] Nenhum elemento cortado horizontalmente (overflow-x: hidden garantido)
- [ ] Texto legível sem precisar fazer zoom
- [ ] Botões e links clicáveis facilmente (sem sobrepor uns nos outros)
- [ ] Imagens não distorcidas

#### Touch Targets

- [ ] Todos os botões com `min-height: 48px` e `min-width: 48px` (WCAG 2.5.5)
  - Botão primário de CTA: ≥ 48px altura
  - Botões de filtro: ≥ 44px altura
  - Links de navegação do header: ≥ 44px área de toque
  - WhatsApp FAB: ≥ 56px (mais visível)
  - Itens do menu mobile: ≥ 48px altura
- [ ] Verificar via DevTools "Accessibility" que não há elementos sobrepostos

#### Formulários em Mobile

- [ ] Formulário de lead (página "Seja Revendedora"):
  - Campos de input com `font-size` ≥ 16px (evita zoom automático no iOS)
  - Teclado numérico em campo de telefone (`inputMode="tel"`)
  - Teclado de email em campo de email (`type="email"`)
  - Teclado virtual não quebra o layout (scroll para o campo ativo funciona)
  - Botão de submit visível mesmo com teclado virtual aberto
- [ ] Formulário de login do admin:
  - Mesmo padrão de font-size e inputMode

#### Navegação Mobile

- [ ] Hamburger menu abre e fecha corretamente
- [ ] `MobileDrawer` ocupa largura adequada (≤ 85% da viewport)
- [ ] Drawer fecha ao clicar fora ou pressionar ESC
- [ ] Scroll do body travado enquanto drawer está aberto (overflow: hidden no body)
- [ ] Menu hamburger acessível via teclado (Tab + Enter)

#### Testes em Dispositivo Real (ou Emulação Chrome DevTools)

- [ ] Página Home — carga e interação em 4G simulado (Chrome DevTools > Network throttling)
- [ ] Formulário de lead — submissão completa em mobile
- [ ] Botão WhatsApp FAB — toque e abertura do WhatsApp funcionam (testar em Android real se possível)
- [ ] Catálogo — scroll, filtros e botão de compra funcionam em mobile
- [ ] Admin login — formulário utilizável em mobile (a proprietária acessa pelo celular)

#### Ausência de Hover-Only Interactions

- [ ] Verificar que nenhuma informação crítica é exibida APENAS em hover (não funciona em touch)
- [ ] Tooltips críticos devem ter alternativa touch (ex: tap para expandir)

### Fora de Escopo

- Teste em Safari iOS (desejável mas não obrigatório para lançamento)
- Teste em dispositivos físicos específicos além do emulador (desejável se disponível)

---

## Story 5.3 — Integração Google Analytics 4

**Prioridade:** SHOULD  
**FR associado:** FR-013 (Dashboard com GA4)  
**Pré-requisitos:** Story 4.7 (configurações do site com campo GA4 ID)  
**Estimativa:** 1–2 dias

### Descrição

Configuração completa do Google Analytics 4 e implementação do snippet no site via configuração do admin. Inclui eventos customizados para as principais ações de conversão do negócio.

### Acceptance Criteria

#### Configuração da Propriedade GA4

- [ ] Propriedade GA4 criada no Google Analytics (feito pela proprietária)
- [ ] Measurement ID (G-XXXXXXXXXX) configurado em admin > configurações > campo "Google Analytics 4 ID"
- [ ] Snippet GA4 inserido automaticamente no `<head>` de todas as páginas públicas quando o Measurement ID estiver preenchido
- [ ] Snippet NÃO é carregado se o Measurement ID estiver vazio (sem trackeamento desnecessário)
- [ ] Snippet carregado via `next/script` com `strategy="afterInteractive"` (não bloqueia o render)

#### Implementação do Snippet

```typescript
// src/app/layout.tsx — carregado quando ga4_measurement_id estiver configurado
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
  strategy="afterInteractive"
/>
<Script id="ga4-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${ga4Id}');
  `}
</Script>
```

#### Eventos Customizados

- [ ] Evento `lead_submitted` — disparado após envio bem-sucedido do formulário de captação de lead
  - Parâmetros: `{ source: utm_source || 'seja-revendedora' }`
- [ ] Evento `whatsapp_click` — disparado ao clicar em qualquer botão WhatsApp no site
  - Parâmetros: `{ button_type: 'fab' | 'cta_revendedora' | 'product' | 'contato', product_name?: string }`
- [ ] Evento `product_view` — disparado ao visualizar página de detalhe de produto
  - Parâmetros: `{ product_name: string, product_category: string }`

#### Metas de Conversão

- [ ] Meta "Lead Captado" configurada no GA4 baseada no evento `lead_submitted`
- [ ] Meta "WhatsApp Click" configurada baseada no evento `whatsapp_click`

#### Verificação

- [ ] GA4 Realtime Report exibe visitas ao site após implementação
- [ ] Evento `lead_submitted` aparece no Realtime após submissão de teste
- [ ] Evento `whatsapp_click` aparece ao clicar no FAB

### Fora de Escopo

- Banners de consentimento de cookies (LGPD) — decisão da proprietária/jurídico, não implementado na v1
- Google Tag Manager (GA4 direto é suficiente na v1)
- Conversões de e-commerce (sem checkout na v1)

---

## Story 5.4 — Checklist de Lançamento & Go-Live

**Prioridade:** MUST  
**FR associado:** FR-017 (Domínio e SSL), CON-001  
**Pré-requisitos:** Todos os stories MUST dos Epics 1–4 + Stories 5.1, 5.2  
**Estimativa:** 1–2 dias

### Descrição

Verificação final de todos os critérios de aceite do projeto, configuração definitiva do domínio e DNS, submissão do sitemap ao Google Search Console, configuração do monitoramento de uptime, teste end-to-end completo e treinamento da proprietária no painel admin.

### Acceptance Criteria

#### Infraestrutura e Domínio

- [ ] `revendendomake.com.br` acessível via HTTPS em produção
- [ ] SSL/TLS válido e com renovação automática ativa (verificar via browser: certificado válido, sem avisos)
- [ ] HTTP → HTTPS redirect: `http://revendendomake.com.br` → `https://revendendomake.com.br` (301)
- [ ] WWW redirect: `https://www.revendendomake.com.br` → `https://revendendomake.com.br` (301)
- [ ] HSTS header ativo: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- [ ] Todas as variáveis de ambiente configuradas no Vercel (produção) — verificar lista do `tech-stack.md`

#### Banco de Dados em Produção

- [ ] Supabase Cloud (produção) com todas as migrations aplicadas
- [ ] RLS testado em produção: usuário anônimo não acessa leads, não acessa produtos inativos
- [ ] Conta admin configurada e testada em produção (login → dashboard funcional)
- [ ] Linha inicial em `site_settings` com número de WhatsApp definitivo e outras configurações

#### Performance Final

- [ ] Lighthouse Performance ≥ 90 nas páginas Home, Seja Revendedora e Catálogo — testado em produção
- [ ] LCP < 2.5s em conexão 4G simulada
- [ ] CLS < 0.1

#### SEO e Indexação

- [ ] `sitemap.xml` acessível em `https://revendendomake.com.br/sitemap.xml`
- [ ] `robots.txt` acessível em `https://revendendomake.com.br/robots.txt` e bloqueando `/admin` e `/api`
- [ ] Google Search Console: propriedade verificada com o domínio de produção
- [ ] Sitemap submetido ao Google Search Console
- [ ] Schema.org validado via Google Rich Results Test para: Organization (home), Product (um produto), Article (um artigo se houver)

#### Teste End-to-End Completo

- [ ] **Fluxo da Revendedora:** Acessa site → Vai para "Seja Revendedora" → Preenche formulário → Lead salvo no banco → Botão WhatsApp aparece → Notificação por email recebida pela proprietária
- [ ] **Fluxo do Comprador:** Acessa catálogo → Filtra por categoria → Clica no produto → Clica "Comprar via WhatsApp" → Link WhatsApp abre com mensagem pré-formatada
- [ ] **Botão WhatsApp FAB:** Visível em todas as páginas, clicável, abre WhatsApp com mensagem padrão
- [ ] **Admin — Produto:** Login → Adicionar produto com foto → Produto aparece no catálogo público (aguardar ISR 60s ou chamar revalidate manualmente)
- [ ] **Admin — Lead:** Login → Ver lead cadastrado no teste acima → Alterar status para "Contatado"
- [ ] **Admin — Configurações:** Alterar número de WhatsApp → Salvar → Verificar que o botão FAB usa o novo número

#### Monitoramento

- [ ] UptimeRobot configurado para monitorar `https://revendendomake.com.br` a cada 5 minutos
- [ ] Alerta por email configurado para `baladario01@gmail.com` (ou email da proprietária)
- [ ] Google Analytics 4 verificado: Realtime mostrando visitas após acesso manual ao site

#### Treinamento da Proprietária

- [ ] Sessão de treinamento realizada (presencial ou videochamada) cobrindo:
  - Login no painel admin
  - Adicionar/editar/desativar produto com upload de fotos
  - Ver e qualificar leads (alterar status)
  - Adicionar depoimento e aprovar
  - Publicar artigo de blog (se Epic 3 completo)
  - Atualizar configurações (número WhatsApp, textos)
- [ ] Documento simples de "Como usar o admin" entregue (formato Google Docs ou PDF)
- [ ] Número de suporte técnico/email definido para dúvidas pós-lançamento

#### Verificação Final de Qualidade

- [ ] Nenhum link quebrado nas páginas públicas (verificação manual das páginas principais)
- [ ] Nenhum console error em produção (Chrome DevTools > Console)
- [ ] Formulário de lead com dados reais funciona end-to-end (não apenas em test/staging)
- [ ] Número de WhatsApp definitivo configurado e testado em iOS e Android
- [ ] Logo, favicon e OG image configurados e exibindo corretamente

### Fora de Escopo

- Configuração de e-mail profissional (contato@revendendomake.com.br) — pode ser feito pós-lançamento
- Campanhas de marketing (fora do escopo técnico)
- Treinamento avançado de SEO para a proprietária

---

## Checklist Pré-Go-Live (Resumo Executivo)

| # | Item | Story | Status |
|---|------|-------|--------|
| 1 | HTTPS ativo e SSL válido | 5.4 | [ ] |
| 2 | Domínio com.br configurado e acessível | 5.4 | [ ] |
| 3 | RLS testado em produção | 5.4 | [ ] |
| 4 | Lighthouse ≥ 90 nas páginas principais | 5.1 | [ ] |
| 5 | Formulário de lead funciona end-to-end | 5.4 | [ ] |
| 6 | Botão WhatsApp testado em Android | 5.2 | [ ] |
| 7 | Sitemap submetido ao Google Search Console | 5.4 | [ ] |
| 8 | robots.txt bloqueando /admin | 3.2 | [ ] |
| 9 | UptimeRobot configurado | 5.4 | [ ] |
| 10 | Admin treinada e documentação entregue | 5.4 | [ ] |
| 11 | Número WhatsApp definitivo configurado | 5.4 | [ ] |
| 12 | Google Analytics 4 recebendo eventos | 5.3 | [ ] |

---

*Epic 5 — Total: 4 stories | Estimativa total: 6–10 dias*  
*Synkra AIOX — @po (Pax) — v1.0*
