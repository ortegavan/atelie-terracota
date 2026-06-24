# Ateliê Terracota — Backend

API REST em NestJS com PostgreSQL. Expõe endpoints de produtos e pedidos para o frontend Angular.

## Pré-requisitos

- Node.js 18+
- pnpm 8+
- PostgreSQL (instalação via Homebrew — veja seção abaixo)

## Instalando o PostgreSQL no macOS

> Use o Homebrew. O instalador gráfico do EnterpriseDB (postgresql.org/download/macos)
> cria um usuário de sistema separado e um diretório de dados fora do padrão, o que
> gera conflitos de permissão em dev local. O Homebrew é mais simples e roda como
> seu próprio usuário macOS.

### 1. Instalar

```bash
brew install postgresql@17
```

### 2. Adicionar ao PATH

```bash
echo 'export PATH="/opt/homebrew/opt/postgresql@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### 3. Iniciar o servidor (e configurar para iniciar automaticamente no login)

```bash
brew services start postgresql@17
```

Para parar: `brew services stop postgresql@17`

### 4. Criar o banco

```bash
createdb atelie_terracota
```

Com Homebrew não há senha nem flag `-U` — o superuser é o seu próprio usuário macOS.

---

## Setup do projeto

### 1. Instalar dependências

Execute a partir da **raiz do monorepo** (não dentro de `backend/`):

```bash
pnpm install
```

O pnpm instala as dependências de `frontend` e `backend` juntos, num único `node_modules` compartilhado na raiz — diferente do npm, onde cada pasta teria o seu próprio.

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Abra `backend/.env`. Com Homebrew, `DB_USER` é o seu usuário macOS e `DB_PASS` fica em branco:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=ortegavan   # seu usuário macOS
DB_PASS=            # vazio no Homebrew
DB_NAME=atelie_terracota
PORT=3000
```

O arquivo `.env` está no `.gitignore` e nunca deve ser commitado.

| Variável  | Descrição                  | Padrão com Homebrew |
|-----------|----------------------------|---------------------|
| `DB_HOST` | Host do PostgreSQL         | `localhost`         |
| `DB_PORT` | Porta do PostgreSQL        | `5432`              |
| `DB_USER` | Usuário do banco           | seu usuário macOS   |
| `DB_PASS` | Senha do banco             | *(vazio)*           |
| `DB_NAME` | Nome do banco              | `atelie_terracota`  |
| `PORT`    | Porta em que a API sobe    | `3000`              |

## Rodando em desenvolvimento

```bash
pnpm --filter backend run start:dev
```

Na primeira inicialização, o TypeORM cria as tabelas automaticamente (`synchronize: true`) e o seed insere as 6 peças de cerâmica na tabela `products`.

A API ficará disponível em `http://localhost:3000`.

## Endpoints

### Produtos

| Método | Rota        | Descrição               |
|--------|-------------|-------------------------|
| GET    | `/products` | Lista todos os produtos |

### Pedidos

| Método | Rota      | Descrição                              |
|--------|-----------|----------------------------------------|
| POST   | `/orders` | Cria um novo pedido                    |
| GET    | `/orders` | Lista pedidos (mais recentes primeiro) |

### Exemplos com curl

```bash
# Listar produtos
curl http://localhost:3000/products

# Criar um pedido
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Ana Lima",
    "customerEmail": "ana@exemplo.com",
    "items": [
      {
        "productId": 1,
        "productName": "Tigela de grês esmaltada",
        "quantity": 2,
        "unitPrice": 89.90
      }
    ]
  }'

# Listar pedidos
curl http://localhost:3000/orders
```

## Estrutura de pastas

```
backend/
├── src/
│   ├── main.ts                  # Bootstrap: ValidationPipe, CORS, porta
│   ├── app.module.ts            # Módulo raiz: TypeORM + Config + features
│   ├── products/
│   │   ├── product.entity.ts    # Tabela products
│   │   ├── products.module.ts
│   │   ├── products.service.ts  # Seed na inicialização + listagem
│   │   └── products.controller.ts
│   └── orders/
│       ├── order.entity.ts      # Tabela orders
│       ├── order-item.entity.ts # Tabela order_items
│       ├── create-order.dto.ts  # Validação de entrada (class-validator)
│       ├── orders.module.ts
│       ├── orders.service.ts
│       └── orders.controller.ts
├── .env.example                 # Template de variáveis de ambiente
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## Observações de desenvolvimento

- **`synchronize: true`** — o TypeORM cria e atualiza tabelas automaticamente comparando as entidades com o banco. Conveniente em desenvolvimento, mas **nunca deve ser usado em produção** (risco de perda de dados).
- **Seed automático** — o `ProductsService` implementa `OnModuleInit` (equivalente ao `ngOnInit` do Angular) e insere as peças de cerâmica na primeira vez que a tabela estiver vazia.
- **Validação** — o `ValidationPipe` global ativa os decoradores do `class-validator` em todos os endpoints. `whitelist: true` descarta campos não declarados no DTO. `transform: true` converte o JSON bruto em instâncias das classes DTO.
