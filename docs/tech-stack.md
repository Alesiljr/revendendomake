# Tech Stack — Revendendo Make

**Referência:** Usado em todas as stories de desenvolvimento. Leia este arquivo antes de iniciar qualquer implementação.

---

## Stack Tecnológica Completa

| Camada | Tecnologia | Versão | Uso |
|--------|-----------|--------|-----|
| **Framework** | Next.js App Router | 15.x | SSG/ISR/SSR nativos, metadata API, server components, route handlers |
| **Linguagem** | TypeScript | 5.x | Type safety com strict mode — obrigatório |
| **Estilização** | Tailwind CSS | 3.x | Mobile-first, purge automático, design tokens como CSS variables |
| **Componentes UI** | shadcn/ui | latest | Acessível (radix-ui), sem lock-in, compatível com Tailwind |
| **Animações** | Framer Motion | 11.x | SSR seguro, `prefers-reduced-motion` respeitado |
| **Ícones** | Lucide React | latest | Tree-shakeable, 1000+ ícones, open source |
| **Banco de Dados** | Supabase (PostgreSQL) | latest | Auth + Storage + RLS integrados, SDK TypeScript |
| **Autenticação** | Supabase Auth | latest | JWT, session management, middleware helpers para Next.js |
| **Storage de Imagens** | Supabase Storage | latest | CDN integrado, signed URLs, transformações de imagem |
| **Deploy** | Vercel | latest | Native Next.js, edge network, HTTPS automático, preview PRs |
| **Email** | Resend | latest | Notificações de novos leads, 3.000 emails/mês grátis |
| **Rich Text** | Tiptap | 2.x | JSON output (JSONB no Postgres), React nativo, extensível |
| **Validação** | Zod | 3.x | Runtime type safety para inputs de API e formulários |
| **Sitemap** | next-sitemap | 4.x | Geração automática no build, suporte a ISR revalidation |
| **Analytics** | Google Analytics 4 | — | Padrão de mercado, integra com Search Console, gratuito |
| **Monitoramento** | Vercel Analytics | — | Core Web Vitals por rota sem código extra |

---

## Package Manager

**Usar npm** (não pnpm, não yarn).

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

---

## Comandos de Desenvolvimento

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento em `localhost:3000` |
| `npm run build` | Build de produção (SSG de todas as páginas estáticas) |
| `npm run start` | Inicia servidor com o build de produção |
| `npm run lint` | ESLint — deve passar antes de qualquer commit |
| `npm run typecheck` | `tsc --noEmit` — deve passar antes de qualquer commit |
| `npm run type-gen` | `supabase gen types typescript --project-id XXX > src/types/database.ts` |
| `supabase start` | Inicia Supabase local para desenvolvimento |
| `supabase db push` | Aplica migrations no banco |
| `supabase migration list` | Lista status das migrations |

---

## Variáveis de Ambiente

Arquivo: `.env.local` (nunca versionar no Git). Use `.env.local.example` como template.

### Supabase

| Variável | Visibilidade | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Cliente + Servidor | URL do projeto Supabase (ex: `https://xxxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Cliente + Servidor | Chave pública anon — segura para expor no bundle |
| `SUPABASE_SERVICE_ROLE_KEY` | Servidor apenas | Chave secreta — NUNCA usar com prefixo `NEXT_PUBLIC_` |

### Email (Resend)

| Variável | Visibilidade | Descrição |
|----------|-------------|-----------|
| `RESEND_API_KEY` | Servidor apenas | API key do Resend |
| `RESEND_FROM_EMAIL` | Servidor apenas | Email remetente (ex: `notificacoes@revendendomake.com.br`) |
| `RESEND_NOTIFICATION_TO` | Servidor apenas | Email de destino das notificações de leads |

### Segurança

| Variável | Visibilidade | Descrição |
|----------|-------------|-----------|
| `REVALIDATE_SECRET` | Servidor apenas | String aleatória (32+ chars) para autenticar webhook ISR |

### Opcionais

| Variável | Visibilidade | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_WHATSAPP_DEFAULT` | Cliente + Servidor | Número fallback (ex: `5511999999999`) — o principal vem do banco |
| `NEXT_PUBLIC_GA_ID` | Cliente + Servidor | Google Analytics 4 Measurement ID (ex: `G-XXXXXXXXXX`) |

---

## Configuração do Supabase

### URLs de Projeto

- **Desenvolvimento local:** `http://localhost:54321`
- **Produção:** `https://{project-id}.supabase.co`

### Buckets de Storage

| Bucket | Acesso | Tamanho Máx | MIME Types |
|--------|--------|-------------|-----------|
| `products` | Público | 5MB | `image/jpeg`, `image/png`, `image/webp` |
| `testimonials` | Público | 2MB | `image/jpeg`, `image/png`, `image/webp` |
| `site-assets` | Público | 5MB | `image/jpeg`, `image/png`, `image/webp`, `image/svg+xml` |
| `blog` | Público | 5MB | `image/jpeg`, `image/png`, `image/webp` |

### Tabelas Principais

`categories`, `products`, `leads`, `testimonials`, `posts`, `site_settings`

---

## Configuração do Vercel

### Ambientes

| Ambiente | Branch | Banco de Dados | URL |
|----------|--------|----------------|-----|
| Desenvolvimento | qualquer | Supabase local | `localhost:3000` |
| Preview | PRs | Supabase staging | `*.vercel.app` |
| Produção | `main` | Supabase Cloud | `revendendomake.com.br` |

### Variáveis de Ambiente no Vercel

- Configurar em: Vercel Dashboard > Project > Settings > Environment Variables
- Variáveis com `NEXT_PUBLIC_` → expostas no bundle cliente (apenas dados não sensíveis)
- Demais variáveis → disponíveis apenas no servidor

---

## Estratégia de Renderização

| Rota | Estratégia | Revalidação |
|------|-----------|-------------|
| `/` (Home) | SSG + ISR | 60 segundos |
| `/seja-revendedora` | SSG | Via webhook |
| `/produtos` | SSG + ISR | 60 segundos |
| `/produtos/[slug]` | SSG + ISR | 60 segundos |
| `/depoimentos` | SSG + ISR | 300 segundos |
| `/blog` | SSG + ISR | 60 segundos |
| `/blog/[slug]` | SSG + ISR | 300 segundos |
| `/sobre` | SSG + ISR | 3600 segundos |
| `/admin/*` | SSR | — (sem cache) |
| `/login` | Static | — |

---

## Notas de Configuração

- **Domínio:** `revendendomake.com.br` — configurado no Vercel, DNS no Registro.br
- **SSL:** Let's Encrypt via Vercel (automático)
- **Redirect:** `www.` → sem www, HTTP → HTTPS (301)
- **HSTS:** `max-age=63072000; includeSubDomains; preload`
- **Images:** `remotePatterns` do Supabase configurado no `next.config.ts`
- **Imports:** Sempre absolutos com alias `@/` (mapeado para `./src/*` no tsconfig)

---

*Synkra AIOX — @po (Pax) — Documento de referência técnica v1.0*
