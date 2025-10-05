# Documentação Técnica — ApiChamados

Esta documentação descreve a arquitetura, configuração, execução e os principais módulos da API de chamados (tickets) desenvolvida em Node.js/TypeScript com Express e Prisma.

## Visão Geral
- Linguagem: TypeScript (compilado para JavaScript)
- Framework: Express
- ORM: Prisma
- Autenticação: JWT via cookie (httpOnly, secure, sameSite: none)
- Validações: Zod (onde aplicável)
- Segurança: Helmet, Rate Limit, CORS

## Estrutura do Projeto
- src/
  - core/
    - middlewares/ — Autenticação e utilitários
    - prisma/ — Singleton do Prisma Client
    - errors/ — Classes de erro padronizadas (AppError e derivadas)
    - utils/ — Utilidades (ex.: responseHandler)
  - modules/
    - auth/ — Login, logout e recuperação de usuário da sessão
    - user/ — CRUD de usuários e mudança de role
    - chamados/ — CRUD e listagens de tickets
    - comentarios/ — CRUD de comentários dos tickets
    - categoria/ — CRUD de categorias
    - department/ — CRUD de departamentos e associação de usuários
  - server.ts / app.ts — Bootstrap do servidor

## Dependências e Scripts
- Instalação de dependências: `npm install`
- Scripts (package.json):
  - `npm run dev` — desenvolvimento com nodemon
  - `npm run build` — compila TypeScript para dist/
  - `npm run start` — executa servidor com Node (dist/server.js)

## Configuração (.env)
Crie um arquivo `.env` na raiz do projeto com as variáveis abaixo (exemplos):
```
# JWT
JWT_SECRET=uma_chave_segura_aleatoria

# Banco de dados (exemplo Postgres)
DATABASE_URL="postgresql://usuario:senha@localhost:5432/apichamados?schema=public"
```
Observações:
- Use uma JWT_SECRET forte e mantenha-a em segredo.
- Ajuste a DATABASE_URL para seu banco.

## Banco de Dados (Prisma)
- Schema: `prisma/schema.prisma`
- Migrations: `prisma/migrations/*`
- Enum de roles: `RolesUser { USER, AGENT, ADMIN }`
- Comandos úteis:
  - `npx prisma generate` — gerar cliente Prisma
  - `npx prisma migrate dev` — aplicar migrações no ambiente de desenvolvimento
  - `npx prisma studio` — UI para inspecionar o banco

## Autenticação
- Login gera um JWT assinado com `id` do usuário e define um cookie `token` com flags de segurança (httpOnly, secure, sameSite: "none").
- Middleware `isAuthenticated` valida o token, busca o usuário no banco e injeta `req.user`.
- Erros comuns: Token ausente, expirado ou inválido — retornos 401 com mensagens claras.

## Autorização e Roles (RBAC)
- Papéis disponíveis: `USER`, `AGENT`, `ADMIN`.
- Estado atual: As rotas exigem autenticação. Algumas regras de negócio estão nos serviços (ex.: apenas o autor atualiza seu comentário). Ainda não há um middleware centralizado de autorização por role.
- Recomendações:
  - Adicionar middleware `authorizeRoles(...roles)` para restringir rotas por papel.
  - Padronizar no service quando um papel tem permissão especial (ex.: ADMIN pode atualizar qualquer entidade).

## Principais Endpoints
- Auth
  - POST `/auth/login` — autenticação e criação do cookie de sessão
  - POST `/auth/logout` — limpa cookie de sessão
  - GET `/auth/me` — retorna dados do usuário atual

- Users
  - POST `/users` — cria usuário (recomendado: apenas ADMIN)
  - GET `/users` — lista usuários (autenticado)
  - GET `/users/:id` — busca usuário por id (autenticado)
  - PUT `/users/:id` — altera role do usuário (recomendado: apenas ADMIN)

- Chamados (Tickets)
  - POST `/chamados` — cria chamado (USER, AGENT)
  - GET `/chamados/user` — lista chamados do usuário autenticado
  - GET `/chamados/assignee` — lista chamados atribuídos ao agente (AGENT/ADMIN)
  - POST `/chamados/department` — lista chamados por departamento (AGENT/ADMIN)
  - GET `/chamados` — lista geral (recomendado: ADMIN)
  - GET `/chamados/:id` — detalhes do chamado
  - PUT `/chamados/:id` — atualiza um chamado (AGENT/ADMIN; validar assignee no service)

- Comentários
  - POST `/comentarios/:chamadoId` — cria comentário para um chamado
  - PUT `/comentarios/:commentId` — atualiza comentário (autor; recomendação: ADMIN override)
  - GET `/comentarios/:chamadoId` — lista comentários do chamado

- Categorias
  - POST `/categorias` — cria categoria (recomendado: ADMIN)
  - GET `/categorias` — lista categorias
  - GET `/categorias/:id` — detalhes
  - PUT `/categorias/:id` — atualiza categoria (recomendado: ADMIN)

- Departamentos
  - POST `/departamentos` — cria departamento (ADMIN)
  - PUT `/departamentos/:id` — atualiza departamento (ADMIN)
  - GET `/departamentos` — lista (AGENT/ADMIN)
  - GET `/departamentos/:id` — detalhes (AGENT/ADMIN)
  - POST `/departamentos/:id/users` — associa usuário ao departamento (ADMIN)

Observação: os nomes reais das rotas podem variar conforme arquivos de rota; os exemplos acima seguem o padrão encontrado no código.

## Padrão de Respostas e Erros
- `sendSuccess(res, data)` — utilitário para respostas padronizadas de sucesso.
- Erros:
  - `UnauthorizedError` — 401
  - `NotFoundError` — 404
  - `BadRequestError` — 400
  - `ConflictError` e `ToManyRequestsError` — conforme aplicável

## Segurança
- Cookies httpOnly + secure + sameSite: none (requer HTTPS para browsers aplicarem secure).
- Helmet para cabeçalhos de segurança.
- Rate limit para mitigar abuso.
- CORS configurado para uso com clientes front-end.

## Execução Local
1) `npm install`
2) Configure `.env`
3) `npx prisma migrate dev` e `npx prisma generate`
4) `npm run dev` (ambiente de desenvolvimento) ou `npm run build` + `npm run start` (produção)

## Deploy
- Compile com `npm run build`.
- Configure variáveis de ambiente seguras (JWT_SECRET, DATABASE_URL).
- Sirva `dist/server.js` com um processo gerenciado (PM2, Docker, etc.).
- Garanta HTTPS para que o cookie `secure` funcione corretamente.

## Manutenção e Observações
- Centralize autorização com middleware de roles para tornar regras explícitas e reutilizáveis.
- Padronize tipagem de `req.user` como `User` do Prisma.
- Use o `prisma` singleton em todos os módulos/middlewares para evitar múltiplas conexões.