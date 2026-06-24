# Ateliê Terracota — Frontend

SPA Angular 22 com formulário de pedidos de cerâmicas artesanais.
Consome a API REST do `backend/`.

## Pré-requisitos

- Node.js 18+
- pnpm 8+
- Backend rodando em `http://localhost:3000` (ver `backend/README.md`)

## Rodando em desenvolvimento

Execute a partir da **raiz do monorepo**:

```bash
pnpm dev:frontend
```

Ou diretamente:

```bash
pnpm --filter frontend run start
```

Acesse `http://localhost:4200`. O Angular recarrega automaticamente ao salvar arquivos.

## Build de produção

```bash
pnpm --filter frontend run build
```

Os artefatos são gerados em `frontend/dist/`.

## Testes

```bash
pnpm --filter frontend run test
```

## Estrutura de pastas

```
frontend/src/app/
├── app.ts                              # Componente raiz
├── app.html                            # Template raiz
├── app.scss                            # Estilos globais
├── app.config.ts                       # Configuração da aplicação (providers)
├── app.routes.ts                       # Rotas
└── orders/
    ├── orders.service.ts               # HttpClient: GET /products, POST /orders, GET /orders
    └── orders-page/
        ├── orders-page.component.ts    # Lógica: signals, computed, Reactive Forms
        ├── orders-page.component.html  # Template: formulário + tabela + lista
        └── orders-page.component.css   # Estilos do componente
```

## Convenções

- **Componentes standalone** — sem NgModules, sem `standalone: true` (padrão no Angular 22)
- **Signals** para estado local (`signal()`, `computed()`)
- **`inject()`** em vez de injeção por construtor
- **Reactive Forms** em vez de template-driven
- **Control flow nativo** (`@if`, `@for`) em vez de `*ngIf`, `*ngFor`
- **Arquivos separados** para template (`.html`), componente (`.ts`) e estilos (`.css`)
- Sem `ngClass` — usar bindings de `class`
- Sem `ngStyle` — usar bindings de `style`

## Notas sobre o Angular 22

- `provideHttpClient()` **não é necessário** no `app.config.ts` — o Angular 22 já o provê automaticamente.
