# Autenticação e Autorização

O sistema implementa segurança baseada em **JWT (JSON Web Tokens)** e **RBAC (Role-Based Access Control)**.

## Fluxo de Autenticação
1. O usuário envia `email` (ou CPF conforme implementação) e `password` para `/auth/login`.
2. O sistema valida as credenciais e retorna um `access_token`.
3. O cliente deve enviar este token no header `Authorization: Bearer <token>` em todas as requisições protegidas.

## Papéis (Roles)
Existem três tipos principais de usuários:
- `ADMIN`: Acesso total ao sistema, gerência de usuários e configurações globais.
- `DOCTOR`: Profissional de saúde que gerencia seus pacientes (children), cria sessões e analisa resultados.
- `CAREGIVER`: Responsável pela criança, com acesso visual aos dados e progresso.

## Proteção de Rotas
As rotas são protegidas pelos guards:
- `JwtAuthGuard`: Valida a assinatura e expiração do token.
- `RolesGuard`: Verifica se o usuário possui o cargo necessário para acessar o recurso.

Exemplo de uso no controller:
```typescript
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Get()
async listUsers() { ... }
```
