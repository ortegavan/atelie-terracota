# Ateliê Terracota

Projeto de estudo de **arquitetura event-driven** construído de forma incremental.
Um mini e-commerce de cerâmicas artesanais com frontend Angular e backend NestJS.

## Sobre o projeto

O objetivo é aprender infraestrutura passo a passo, entendendo cada decisão antes de avançar.
Cada passo adiciona uma camada de complexidade — sem pular etapas, sem abstrações prematuras.

| Passo | Descrição | Status |
|-------|-----------|--------|
| 1 | Caminho síncrono: formulário Angular → API NestJS → PostgreSQL | ✅ Concluído |
| 2 | A definir | — |

## Estrutura do monorepo

```
atelie-terracota/
├── frontend/          # SPA Angular 22
├── backend/           # API REST NestJS 11 + PostgreSQL
├── pnpm-workspace.yaml
└── package.json
```

## Pré-requisitos

- Node.js 18+
- pnpm 8+
- PostgreSQL (ver instruções em `backend/README.md`)

## Instalação

Na raiz do monorepo:

```bash
pnpm install
```

O pnpm instala as dependências de `frontend` e `backend` juntos, num único `node_modules` na raiz.

## Rodando em desenvolvimento

```bash
# Backend (porta 3000)
pnpm dev:backend

# Frontend (porta 4200) — em outro terminal
pnpm dev:frontend
```

Acesse `http://localhost:4200`.

## Documentação por pacote

- [`backend/README.md`](backend/README.md) — setup do PostgreSQL, endpoints, estrutura
- [`frontend/README.md`](frontend/README.md) — estrutura de componentes, convenções

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Angular 22, signals, Reactive Forms |
| Backend | NestJS 11, TypeORM, class-validator |
| Banco | PostgreSQL 17 |
| Pacotes | pnpm workspaces |
