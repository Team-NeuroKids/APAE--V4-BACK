# Gamificação (Planejado)

Embora o banco de dados já possua as tabelas necessárias, os endpoints de gamificação ainda não estão expostos na API atual.

## Modelos Reservados

### Games
Catálogo de jogos interativos destinados ao estímulo cognitivo e motor.

### Sessões (`sessions`)
Uma sessão agrupa múltiplos registros de jogabilidade em um único atendimento controlado.

### Histórico de Jogos (`game_histories`)
Armazena métricas de desempenho:
- **Score**: Pontuação total.
- **Acertos/Erros**: Para análise de precisão.
- **Tempo**: Duração da atividade.
- **Observações**: Notas do profissional sobre o comportamento durante o jogo.

## Próximos Passos
- Implementar o `GamesController`.
- Desenvolver lógica de geração de relatórios baseada nos históricos.
