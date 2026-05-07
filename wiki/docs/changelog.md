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
