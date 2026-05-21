# Changelog

Acompanhamento de todas as mudanças e versões do sistema **APAE V4**.

<!-- Faça atualização da versão nesse modelo: -->
<!-- ## (Versão) - (Data) | Ex: 4.2.0 - 10/05/2026

### **Tipo de alteração | Ex: Novas Funcionalidades | Correção de Bugs | Melhorias**:
- **Detalhes da alteração**: Em tópicos

### 🚀 Novidades & Melhorias
### 🐞 Correções de Bugs
### 🧹 Melhorias
-->

## 4.4.1 - 19/05/2026

### 🧹 Melhorias

- **Documentação**: Adição de documentação Swagger para todos os endpoints.

## 4.4.0 - 18/05/2026

### 🚀 Novidades & Melhorias

- **Histórico e Sessões de Jogos**: Implementação dos modelos, serviços e controladores para gestão de sessões e histórico de partidas com paginação de alta performance por cursor.
- **WebSocket Global**: Criação de gateway global com autenticação JWT integrada, filtro de exceções customizado e evento em tempo real para salvar pontuações (`save_score`).
- **Documentação**: Adição de documentação arquitetural sobre escalabilidade na Wiki.

### 🐞 Correções de Bugs

- **Autenticação**: Ajuste e limpeza na tipagem do payload JWT de sessões (`SessionJwtPayload`).

## 4.3.0 - 15/05/2026

### 1. WebSockets e Sessões

  **Refatoração Global de WebSocket**: Você substituiu o antigo `SessionGateway` por um `WebsocketModule` global.
  **Gestão de Presença (`SessionsModule`)**: Implementou um serviço e controller de sessões para rastrear usuários online em tempo real, validando a conexão via JWT e permitindo que o frontend consulte quem está ativo.

## 4.2.0 - 07/05/2026

### 📚 Documentação

- **Instruções para IA**: Adição de regras e convençãoes de código para a IA seguir em `.agent/rules`

### 🚀 Novidades

- **Sessões**: Acompanhamento de sessões em tempo real via Gateway Websocket, permitindo receber informações do uso da plataforma pelas crianças ao Vivo

## 4.1.0 - 06/05/2026

**Resumo do Sistema**:
O **APAE V4 - Backend** é uma solução robusta desenvolvida em NestJS para centralizar a gestão de pacientes (crianças) e seus respectivos responsáveis na APAE. O sistema foca em **acompanhamento terapêutico gamificado**, permitindo o rastreio de desempenho e evolução clínica através de dados.

### 🚀 Novidades & Melhorias

- **Documentação Técnica**: Adição da primeira versão da wiki utilizando VitePress.
- **Arquitetura Modular**: Estruturação completa dos módulos de negócio (Users, Children, Games, Sessions).
- **Persistência**: Implementação do Prisma ORM com suporte a PostgreSQL.
- **Segurança**: Sistema de autenticação JWT e controle de acesso baseado em cargos (RBAC).
- **Validação de Ownership**: Lógica para garantir que dados sensíveis sejam acessados apenas pelos responsáveis autorizados.
- **Infraestrutura**: Configuração de ambiente Dockerizada.
