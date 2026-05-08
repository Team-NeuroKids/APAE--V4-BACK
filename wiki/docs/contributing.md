# Como Contribuir

Este guia orienta como configurar o ambiente de desenvolvimento e começar a contribuir para o backend do APAE V4.

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
> [!IMPORTANT]
> Certifique-se de que as variáveis de banco de dados no `.env` estão corretas.

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

## Fluxo de Trabalho (Git)

Siga este fluxo para realizar suas alterações e integrá-las ao projeto:

### 1. Criar uma nova Branch
Sempre crie uma nova branch a partir da `develop` para suas alterações:
```bash
git checkout develop
git pull origin develop
git checkout -b feature/nome-da-sua-feature
# ou
git checkout -b fix/nome-do-seu-ajuste
```

### 2. Commitar e Subir Alterações
Após realizar suas alterações, faça o commit e o push para o repositório remoto:
```bash
git add .
git commit -m "feat: descrição curta da alteração"
git push origin feature/nome-da-sua-feature
```

### 3. Abrir um Pull Request (PR)
Ao abrir o Pull Request no GitHub:

> [!IMPORTANT]
> **ATENÇÃO:** Certifique-se de que o destino (base branch) do seu Pull Request seja para **`TEAM-NEUROKIDS/develop`**.
> Nunca abra PRs diretamente para a branch `main` a menos que seja uma release oficial.

## Outros Comandos Úteis

- `npm run build`: Gera a build de produção.
- `npm run start:prod`: Inicia o servidor com a build de produção.
- `npm run lint`: Executa o linter para verificar padrões de código.
- `npm run test`: Executa os testes unitários.

### Comandos Avançados do Prisma

#### Gerar migration (sem aplicar)
Útil para revisar o SQL antes de executar:
```bash
npx prisma migrate dev --name <nome-da-migration>
```

#### Aplicar migrations pendentes
```bash
npx prisma migrate dev
```

#### Gerar Cliente Prisma
```bash
npx prisma generate
```

#### Popular banco (Seed)
```bash
npx prisma db seed
```
