# Módulo de Usuários

O módulo de usuários é responsável pelo gerenciamento de acesso e perfis dos profissionais (Administradores, Médicos e Cuidadores).

## Endpoints

### Criar Usuário
- **POST** `/users`
- **Acesso**: `ADMIN`
- **Corpo**:
  - `name`: string
  - `email`: string
  - `cpf`: string
  - `password`: string
  - `role`: `ADMIN` | `DOCTOR` | `CAREGIVER`

### Listar Usuários
- **GET** `/users`
- **Acesso**: `ADMIN`
- **Parâmetros de Query**: Suporta paginação e filtros (dependendo da implementação atual).

### Buscar Usuário por ID
- **GET** `/users/:id`
- **Acesso**: `ADMIN`

## Lógica de Negócio
- Apenas administradores podem criar novos usuários.
- O e-mail e CPF devem ser únicos no sistema.
- As senhas são armazenadas como hash seguro.
