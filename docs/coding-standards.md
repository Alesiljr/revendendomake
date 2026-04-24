# Coding Standards — Revendendo Make

**Referência:** Padrões obrigatórios para todos os desenvolvedores. Leia antes de iniciar qualquer implementação.

---

## TypeScript

### Modo Strict Obrigatório

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

### Regras TypeScript

- **Sem `any`** — usar `unknown` quando o tipo é desconhecido e narrowing com type guards
- **Type imports** explícitos quando importando apenas tipos: `import type { Product } from '@/types'`
- **Props de componentes sempre tipadas** — sem `React.FC`, usar `function Component(props: Props)`
- **Tipos do Supabase** gerados via CLI — nunca criar tipos manualmente para o schema do banco
- Usar `type` para aliases de tipo e `interface` para shapes que podem ser extendidos
- Exportar tipos que são usados em mais de um arquivo

```typescript
// CORRETO
import type { Database } from '@/lib/supabase/types'
type Product = Database['public']['Tables']['products']['Row']

// PROIBIDO
const data: any = await supabase.from('products').select('*')
```

---

## Nomenclatura de Arquivos

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| Componente React | PascalCase | `ProductCard.tsx`, `LeadForm.tsx` |
| Hook React | camelCase com `use` | `useProductFilters.ts`, `useLeadForm.ts` |
| Utilitário/lib | kebab-case | `whatsapp.ts`, `slug.ts`, `format.ts` |
| Página (App Router) | sempre `page.tsx` | `app/(public)/produtos/page.tsx` |
| Layout | sempre `layout.tsx` | `app/admin/layout.tsx` |
| Rota de API | sempre `route.ts` | `app/api/leads/route.ts` |
| Constantes | SCREAMING_SNAKE nas variáveis | `MAX_FEATURED_PRODUCTS = 6` |
| Tipo/Interface | PascalCase | `type Product`, `interface LeadFormData` |
| Variáveis e funções | camelCase | `handleSubmit`, `isLoading`, `fetchProducts` |

---

## Estrutura de Imports

### Imports Absolutos Obrigatórios

```typescript
// CORRETO — sempre usar @/ alias
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/types/database'
import { buildWhatsAppLink } from '@/lib/utils/whatsapp'

// PROIBIDO — imports relativos profundos
import { Button } from '../../../components/ui/button'
```

### Ordem de Imports

1. Imports do Node.js/Next.js (ex: `next/image`, `next/navigation`)
2. Imports de bibliotecas externas (ex: `zod`, `lucide-react`)
3. Imports internos com `@/` (componentes, lib, types, hooks)
4. Imports de tipos com `import type`

---

## Estrutura de Componentes

### Server Components como Padrão

Componentes são Server Components por padrão (sem diretiva no topo). Usar `'use client'` apenas quando necessário:

```typescript
// Server Component (padrão) — pode buscar dados diretamente
export default async function ProductsPage() {
  const supabase = createClient() // server client
  const { data: products } = await supabase.from('products').select('*')
  return <ProductGrid products={products ?? []} />
}

// Client Component — somente quando necessário
'use client'
export function LeadForm() {
  const [isLoading, setIsLoading] = useState(false)
  // ...
}
```

### Quando Usar `'use client'`

- Hooks React (useState, useEffect, useRef, etc.)
- Event handlers (onClick, onChange, onSubmit)
- Browser APIs (localStorage, window, document)
- Bibliotecas que não suportam SSR
- Formulários interativos com validação em tempo real

### Estrutura de um Componente

```typescript
// 1. Imports
import type { ComponentProps } from '@/types'

// 2. Tipos locais (se necessário)
interface Props {
  product: Product
  className?: string
}

// 3. Componente — function declaration (não arrow function para componentes exportados)
export function ProductCard({ product, className }: Props) {
  // 4. Hooks (se 'use client')
  // 5. Derived state / computed values
  // 6. Event handlers
  // 7. JSX
  return (
    <div className={cn('...', className)}>
      {/* ... */}
    </div>
  )
}
```

---

## Gerenciamento de Estado

- **Zustand** para estado global do cliente (ex: filtros do catálogo, estado do carrinho futuro)
- **Server Actions / API Routes** para mutações (criar lead, atualizar produto)
- **URL state** para filtros que devem ser compartilháveis (ex: categoria, busca)
- **useState local** para estado de UI efêmero (modais, toggles, loading states)
- **Nunca** usar Context para estado que poderia ser URL state ou server state

---

## Tratamento de Erros

### API Routes

```typescript
// src/app/api/leads/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = leadSchema.safeParse(body)
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      )
    }
    
    const { data, error } = await supabase.from('leads').insert({ ... })
    
    if (error) {
      console.error('[/api/leads] Supabase error:', error)
      return NextResponse.json(
        { error: 'Erro ao salvar cadastro. Tente novamente.' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[/api/leads] Unexpected error:', error)
    return NextResponse.json(
      { error: 'Erro interno. Tente novamente.' },
      { status: 500 }
    )
  }
}
```

### Server Components

```typescript
// Preferir early return com fallback ao invés de throw
export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', params.slug)
    .single()
  
  if (!product) {
    notFound() // Redireciona para /not-found
  }
  
  return <ProductDetail product={product} />
}
```

### Error Boundaries no Admin

Cada seção principal do admin deve ter um Error Boundary para evitar que um erro derrube todo o painel:

```typescript
// src/components/admin/AdminErrorBoundary.tsx
'use client'
import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode; fallback?: ReactNode }
interface State { hasError: boolean; error?: Error }

export class AdminErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error('[AdminErrorBoundary]', error, info)
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="p-8 text-center">
          <h2 className="text-lg font-semibold text-red-600">Ocorreu um erro inesperado</h2>
          <p className="mt-2 text-neutral-600">
            {this.state.error?.message ?? 'Tente recarregar a página.'}
          </p>
        </div>
      )
    }
    return this.props.children
  }
}
```

---

## CSS e Estilização

### Tailwind Utility Classes — Único Método

```typescript
// CORRETO — Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-xl bg-white shadow-sm">

// CORRETO — cn() para classes condicionais
import { cn } from '@/lib/utils'
<button className={cn(
  'px-6 py-3 rounded-full font-semibold transition-all',
  isLoading && 'opacity-50 cursor-not-allowed',
  variant === 'primary' && 'bg-primary-500 text-white hover:bg-primary-600'
)}>

// PROIBIDO — inline styles
<div style={{ marginTop: '16px', color: '#C9184A' }}>

// PROIBIDO — CSS custom fora de globals.css (exceto design tokens)
```

### Design Tokens como CSS Variables

Definidos em `globals.css`, usados via Tailwind config ou classes arbitrárias:

```css
/* globals.css */
:root {
  --color-primary-500: #C9184A;
  --color-whatsapp: #25D366;
  --font-playfair: 'Playfair Display', Georgia, serif;
  --font-inter: 'Inter', system-ui, sans-serif;
}
```

### Sem Inline Styles

Exceção: transformações dinâmicas que não têm equivalente Tailwind (ex: `style={{ transform: `translateX(${offset}px)` }}`).

---

## Rotas de API

### Validação com Zod — Obrigatória

Toda API route deve validar inputs com Zod antes de qualquer operação:

```typescript
const schema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().regex(/^\+?55\d{10,11}$/),
  city: z.string().min(2).max(100),
})

const parsed = schema.safeParse(await request.json())
if (!parsed.success) {
  return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 })
}
```

### Mensagens de Erro em Português

Todas as mensagens de erro retornadas ao usuário devem estar em português claro, sem jargões técnicos.

---

## Supabase

### Usar Sempre o Cliente Tipado

```typescript
// CORRETO — com tipos gerados
import { createClient } from '@/lib/supabase/server'
const supabase = createClient() // retorna SupabaseClient<Database>

// PROIBIDO — createClient sem tipos
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(url, key) // sem tipo Database
```

### Server Client vs Browser Client

```typescript
// Server Component / API Route / Server Action
import { createClient } from '@/lib/supabase/server'

// Client Component
import { createClient } from '@/lib/supabase/client'
```

### RLS Sempre Habilitado

Nunca usar `service_role` key no cliente browser. Nunca desabilitar RLS em tabelas de produção.

---

## Git Commits

### Formato Conventional Commits — Obrigatório

```
feat: adiciona formulário de captação de leads [Story 2.2]
fix: corrige validação de telefone no formulário de lead [Story 2.2]
chore: configura eslint e prettier
docs: atualiza story 1.2 com novos ACs
style: ajusta padding do hero em mobile
refactor: extrai lógica de WhatsApp para lib/utils/whatsapp.ts
test: adiciona testes unitários para slug generator
```

### Prefixos Aceitos

| Prefixo | Uso |
|---------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `chore:` | Configuração, build, dependências |
| `docs:` | Documentação (stories, README) |
| `style:` | Formatação, CSS — sem mudança de lógica |
| `refactor:` | Refatoração — sem nova funcionalidade ou bug fix |
| `test:` | Adição ou correção de testes |
| `perf:` | Otimização de performance |

### Referência de Story

Sempre incluir `[Story X.Y]` no commit quando o trabalho é rastreado por uma story.

---

## Testes

Para v1, não há framework de testes obrigatório. No entanto:

- **Funções utilitárias críticas** devem ter testes unitários: `slug.ts`, `whatsapp.ts`, `format.ts`, `csv.ts`
- **Schemas Zod** devem ser testados com casos de borda (inputs inválidos)
- **Testes manuais** de RLS do Supabase são obrigatórios antes de marcar Story 1.4 como completa
- **Teste end-to-end** do formulário de lead (submissão → banco → email) é obrigatório antes de Story 2.2 completa

---

## Performance

- **Server Components máximos** — somente `'use client'` quando necessário
- **`priority`** em hero images para evitar LCP penalty
- **`loading="lazy"`** em imagens below the fold
- **`sizes`** sempre definido em `<Image>` para evitar download desnecessário
- **Dynamic imports** para componentes pesados que não são críticos no first load: `dynamic(() => import('...'), { ssr: false })`
- **Framer Motion:** importar com `dynamic` para evitar adicionar ao bundle do servidor

---

## Acessibilidade

- `alt` descritivo em todas as imagens (`alt=""` para imagens decorativas)
- `aria-label` em botões iconográficos (ex: botão WhatsApp flutuante)
- `<label>` associado a cada `<input>` via `htmlFor`
- Foco visível (`focus-visible:ring-2 focus-visible:ring-primary-500`)
- Touch targets mínimos: 44x44px (usar `min-h-[44px] min-w-[44px]`)
- Hierarquia de headings correta: H1 único por página, H2/H3 hierárquicos

---

## Idioma

Todo o conteúdo (UI, mensagens de erro, labels, tooltips, feedbacks) deve estar em **Português do Brasil**.

- Datas: `DD/MM/AAAA`
- Moeda: `R$ 00,00`
- Telefone: `(11) 9 9999-9999` para exibição, `5511999999999` para links `wa.me`
- Locale de bibliotecas: `pt-BR`

---

*Synkra AIOX — @po (Pax) — Padrões de desenvolvimento v1.0*
