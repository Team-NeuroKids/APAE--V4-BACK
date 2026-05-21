import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/user.dto';
import { PaginatedUsersResponseDto } from './dto/list-users-response.dto';

export class UserSwagger {
  static createUser() {
    return applyDecorators(
      ApiOperation({
        summary: 'Criar novo usuário',
        description:
          'Cadastra um novo usuário no sistema (Administrador, Médico ou Cuidador).',
      }),
      ApiBody({
        type: CreateUserDto,
        description: 'Dados do usuário a ser criado',
      }),
      ApiResponse({
        status: 201,
        description: 'Usuário criado com sucesso.',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cuid1234567890' },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas administradores (ADMIN) podem realizar esta ação.',
      }),
      ApiResponse({
        status: 409,
        description: 'Conflito de dados (ex: CPF ou Email já cadastrado).',
      }),
    );
  }

  static listUsers() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar usuários',
        description:
          'Retorna uma lista paginada de usuários do sistema. Permite busca por nome, email ou CPF.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de usuários retornada com sucesso.',
        type: PaginatedUsersResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas administradores (ADMIN) podem realizar esta ação.',
      }),
    );
  }

  static getUser() {
    return applyDecorators(
      ApiOperation({
        summary: 'Obter detalhes de um usuário',
        description:
          'Retorna os dados detalhados de um usuário específico pelo seu ID.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID do usuário',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Detalhes do usuário retornados com sucesso.',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cuid1234567890' },
            name: { type: 'string', example: 'João' },
            email: { type: 'string', example: 'user@example.com' },
            cpf: { type: 'string', example: '18765210077' },
            role: { type: 'string', example: 'ADMIN' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
            deleted_at: { type: 'string', format: 'date-time', nullable: true },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado (token ausente ou inválido).',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas administradores (ADMIN) podem realizar esta ação.',
      }),
      ApiResponse({
        status: 404,
        description: 'Usuário não encontrado.',
      }),
    );
  }
}
