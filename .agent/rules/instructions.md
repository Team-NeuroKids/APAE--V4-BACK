---
trigger: always_on
---

# Diretrizes de Codificação e Padrões do Sistema
Este documento descreve os padrões de codificação, arquitetura e convenções utilizados no projeto APAE V4 BACK (NestJS + Prisma).

## Visão Geral do Projeto
- **Framework**: NestJS (v11+)
- **ORM**: Prisma (v6+)
- **Banco de Dados**: PostgreSQL
- **Linguagem**: TypeScript

## 📂 Estrutura de Pastas
O projeto segue uma organização baseada em funcionalidades (features):
- `src/<feature>/`: Pasta principal da funcionalidade.
  - `dto/`: Objetos de Transferência de Dados (DTOs) usando `class-validator`.
  - `types/`: Interfaces TypeScript para Input/Output de serviços (ex: `index.ts`).
  - `<feature>.controller.ts`: Controladores REST.
  - `<feature>.service.ts`: Lógica de negócio e interação com Prisma.
  - `<feature>.module.ts`: Definição do módulo NestJS.
- `src/common/`: Recursos compartilhados (filtros, guardas, decoradores, enums, utils).
- `src/auth/`: Lógica de autenticação e JWT.

## 🏷️ Nomenclatura (Naming Conventions)
### Arquivos
- Nomes de arquivos em `kebab-case`: `user.controller.ts`, `create-user.dto.ts`.

### TypeScript/NestJS
- **Classes**: `PascalCase` (ex: `UserService`, `UserController`).
- **Interfaces**: `PascalCase` (ex: `CreateUserInput`, `GetUserOutput`).
- **Métodos/Variáveis**: `camelCase` (ex: `createUser`, `listUsers`).
- **Decoradores**: Seguir o padrão NestJS (ex: `@Injectable()`, `@Controller()`).

### Banco de Dados (Prisma)
- **Modelos**: `PascalCase` (ex: `model UserChild`).
- **Tabelas**: `snake_case` via `@@map` (ex: `@@map("user_children")`).
- **Campos**: `snake_case` (ex: `created_at`, `updated_at`, `deleted_at`).
- **IDs**: Usar `String` com `cuid(2)` (`@default(cuid(2))`).

## 🛠 Padrões NestJS
### Controladores
- Usar DTOs para validação de corpo de requisições (`@Body()`).
- Definir tipos de retorno explícitos usando interfaces de `types/`.
- Aplicar guardas de autenticação e autorização no nível da classe ou método:
  ```typescript
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  ```

### Serviços
- Injetar `PrismaService` para operações de banco de dados.
- Injetar `UtilsService` para utilitários comuns (ex: hash de senha).
- Tratar erros lançando exceções nativas do NestJS (ex: `NotFoundException`, `ConflictException`).

### Configurações Globais
- **Validação**: Global `ValidationPipe` com `transform: true`.
- **Filtros**: `PrismaExceptionFilter` global para mapear erros do Prisma para HTTP.
- **Serialização**: `ClassSerializerInterceptor` global para respeitar decoradores como `@Exclude()`.

## 🗄 Padrões Prisma
- Sempre incluir campos de auditoria nos modelos: `created_at`, `updated_at`, `deleted_at`.
- Usar nomes descritivos para relações e chaves estrangeiras seguindo `snake_case`.

## 💬 Mensagens e Idioma
- **Código**: Variáveis, classes e nomes de funções em **Inglês**.
- **Erros/Mensagens**: Mensagens de erro voltadas ao usuário final em **Português**.

## ✅ Validação
- Utilizar `class-validator` nos DTOs para garantir a integridade dos dados de entrada.
