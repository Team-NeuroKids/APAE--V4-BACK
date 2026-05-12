# Banco de Dados

O sistema utiliza **PostgreSQL** como banco de dados relacional e **Prisma ORM** para mapeamento objeto-relacional.

## Modelagem de Dados

### Usuários (`users`)
Armazena as informações de acesso dos profissionais e administradores.
- `id`: CUID (v2)
- `name`: Nome completo
- `email`: E-mail único
- `cpf`: CPF único (utilizado também para login)
- `password`: Hash da senha
- `role`: Papel do usuário (ADMIN, DOCTOR, CAREGIVER)

### Crianças (`children`)
Entidade principal que representa os pacientes atendidos.
- `id`: CUID (v2)
- `name`: Nome da criança
- `birth_date`: Data de nascimento
- `diagnosis`: Diagnóstico (opcional)
- `avatar_url`: Link para foto de perfil (opcional)

### Relacionamento Usuário-Criança (`user_children`)
Tabela de ligação (muitos-para-muitos) que define quais profissionais ou responsáveis têm acesso aos dados de uma criança.

### Sessões e Histórico de Jogos (Planejado)
Modelos existentes para futura implementação de gamificação:
- `games`: Catálogo de jogos disponíveis.
- `sessions`: Registro de sessões de atendimento.
- `game_histories`: Resultados detalhados de cada partida jogada pelo paciente.

## Comandos Úteis
- Gerar cliente Prisma: `npx prisma generate`
- Rodar migrações: `npx prisma migrate dev`
- Visualizar banco: `npx prisma studio`
