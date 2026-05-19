# Escalabilidade e Débito Técnico (Tech Debt)

À medida que o APAE V4 crescer e atingir centenas ou milhares de crianças jogando simultaneamente, a arquitetura atual (focada em Go-Live / MVP) precisará de evoluções. Abaixo estão mapeados os principais gargalos e como resolvê-los no futuro.

## 1. Gargalo de Escrita no Banco (High-Frequency Writes)
**O Cenário:** Toda vez que um evento `save_score` bate no WebSocket, chamamos `prisma.gameHistory.create()`.
**O Risco:** Com milhares de jogadores simultâneos salvando a pontuação a cada minuto, o pico de I/O no banco (PostgreSQL) pode derrubar o *pool* de conexões e travar transações (Lock Contention).
**Solução (Fila/Cache):** Implementar um **Write-Behind Cache**. O WebSocket deve salvar a pontuação primeiro na memória ultrarrápida (ex: Redis ou BullMQ). Um *Cron Job* em background recolhe essas pontuações a cada minuto e faz um `insertMany` no banco de forma assíncrona.

## 2. Escalabilidade Horizontal e o PresenceService
**O Cenário:** O `PresenceService` atual gerencia as conexões utilizando um `Map` armazenado na memória RAM nativa da instância Node.js.
**O Risco:** Se escalarmos a API (usando AWS ECS, Kubernetes ou PM2 Cluster) para múltiplas instâncias, o estado ficará fragmentado. O "Servidor A" não saberá que a criança está conectada no "Servidor B".
**Solução (Redis):** Substituir o `Map` por um estado centralizado no Redis ou utilizar o [Adapter Oficial do Socket.io para Redis](https://socket.io/docs/v4/redis-adapter/).

## 3. Crescimento Exponencial da Tabela `game_histories`
**O Cenário:** É esperado que uma mesma criança gere dezenas de registros históricos por mês.
**O Risco:** Em pouco tempo, a tabela `game_histories` chegará à casa dos milhões de linhas, deixando consultas de Dashboard (ex: `getGameHistoriesByChild`) lentas.
**Solução (Índices e Particionamento):**
- Garantir a presença de **Índices Compostos** (`child_id` + `created_at`) no Prisma para evitar *table scans*.
- Se o banco crescer dezenas de Gigabytes, adotar estratégias de **Particionamento de Tabelas** (dividir a tabela por mês).

## 4. Idempotência e Conexões Intermitentes
**O Cenário:** Dispositivos móveis têm perda de pacotes e quedas de rede frequentes. A engine do jogo (Unity) tentará enviar o *score* e, caso a conexão caia, poderá reenviar o payload após reconectar.
**O Risco:** Se não tratarmos essa duplicação, a criança terá sua curva de aprendizado ou pontos corrompidos artificialmente por repetições do mesmo evento.
**Solução (Idempotency Key):** O Unity deve gerar um UUID único para cada rodada jogada. O Backend utiliza esse UUID para realizar um `upsert` (ou checar existência prévia) em vez de sempre fazer um `create()`, bloqueando pontos duplicados.
