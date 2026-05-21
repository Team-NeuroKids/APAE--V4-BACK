# Módulo de Crianças (Pacientes)

Este módulo é o coração do sistema, onde são gerenciados os dados das crianças atendidas.

## Endpoints

### Criar Criança
- **POST** `/children`
- **Acesso**: `DOCTOR`
- **Responsabilidade**: Ao criar, a criança é automaticamente vinculada ao médico que a cadastrou.

### Listar Crianças (Geral)
- **GET** `/children`
- **Acesso**: `ADMIN`

### Listar Minhas Crianças
- **GET** `/children/me`
- **Acesso**: `DOCTOR` | `CAREGIVER`
- **Funcionalidade**: Retorna apenas as crianças vinculadas ao usuário autenticado.

### Buscar por ID
- **GET** `/children/:id`
- **Acesso**: `DOCTOR` | `CAREGIVER` (se vinculados)

### Atualizar e Deletar
- **PUT/DELETE** `/children/:id`
- **Acesso**: `DOCTOR`

### Restaurar (Soft Delete)
- **POST** `/children/:id/restore`
- **Acesso**: `ADMIN`

## Lógica de Negócio
- **Vinculação**: O acesso aos dados da criança é restrito aos usuários vinculados na tabela `user_children`.
- **Soft Delete**: Crianças não são removidas permanentemente ao serem deletadas, permitindo recuperação posterior.
