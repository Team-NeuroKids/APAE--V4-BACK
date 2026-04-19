# APAE V4 - Backend

Este é o repositório do backend do sistema APAE V4, desenvolvido com NestJS e Prisma ORM.

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:
- [Node.js](https://nodejs.org/) (recomendado v18 ou superior)
- [NPM](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## Configuração Local

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd APAE--V4-BACK
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```bash
cp .env.example .env
```
Certifique-se de que as variáveis de banco de dados no `.env` estão corretas.

### 3. Instalar Dependências
```bash
npm install
```

### 4. Subir o Banco de Dados (Docker)
O projeto utiliza PostgreSQL via Docker. Para subir o banco:
```bash
docker-compose up -d
```

### 5. Configurar o Prisma
Gere o cliente do Prisma e rode as migrações para preparar o banco de dados:
```bash
# Gerar o Prisma Client
npx prisma generate

# Rodar as migrações (sincronizar banco)
npx prisma migrate dev

# Popular o banco com dados iniciais (Seed)
npx prisma db seed
```

## Executando a Aplicação

Para iniciar o servidor em modo de desenvolvimento (com hot-reload):
```bash
npm run start:dev
```

A aplicação estará disponível em `http://localhost:3000` (ou na porta configurada).

## Outros Comandos

- `npm run build`: Gera a build de produção.
- `npm run start:prod`: Inicia o servidor com a build de produção.
- `npm run lint`: Executa o linter para verificar padrões de código.
- `npm run test`: Executa os testes unitários.

---

# Comandos pro prisma:

## 1. Crie a migration (apenas o arquivo SQL, sem aplicar)
Isso garante que você revise o SQL antes de executar.

```bash
npx prisma migrate dev --name <nome-da-migration>
````

## 3. Aplique a migration

```bash
npx prisma migrate dev
```

## 3. Gere o Prisma Client atualizado

```bash
npx prisma generate
```

## 4. Popular o banco com dados iniciais (Seed)

```bash
npx prisma db seed
```