import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CreateSessionDto } from './dto/create-session.dto';
import { PaginatedSessionsResponseDto } from './dto/list-sessions-response.dto';

export class SessionsSwagger {
  static createSession() {
    return applyDecorators(
      ApiOperation({
        summary: 'Criar nova sessão de jogo',
        description:
          'Inicia uma nova sessão para uma criança específica. Retorna os dados da sessão e um token JWT (sessionToken) para autenticação no WebSocket.',
      }),
      ApiBody({
        type: CreateSessionDto,
        description: 'Dados necessários para iniciar a sessão',
      }),
      ApiResponse({
        status: 201,
        description: 'Sessão criada com sucesso.',
        schema: {
          type: 'object',
          properties: {
            session: {
              type: 'object',
              properties: {
                id: { type: 'string', example: 'cuid1234567890' },
                child_id: { type: 'string', example: 'cuid0987654321' },
                user_id: { type: 'string', example: 'cuid1122334455' },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' },
              },
            },
            sessionToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
          },
        },
      }),
      ApiResponse({
        status: 400,
        description: 'Dados inválidos fornecidos no corpo da requisição.',
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Apenas médicos e cuidadores vinculados à criança.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
    );
  }

  static getSessionsByUserMe() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar sessões criadas pelo usuário logado',
        description:
          'Retorna a lista paginada de todas as sessões iniciadas pelo usuário autenticado.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de sessões retornada com sucesso.',
        type: PaginatedSessionsResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Apenas médicos e cuidadores.',
      }),
    );
  }

  static getSessionsByChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar sessões de uma criança',
        description:
          'Retorna a lista paginada de todas as sessões associadas a uma criança específica. O usuário logado deve estar vinculado a esta criança.',
      }),
      ApiParam({
        name: 'childId',
        description: 'ID da criança',
        type: 'string',
        example: 'cuid0987654321',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de sessões retornada com sucesso.',
        type: PaginatedSessionsResponseDto,
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description: 'Acesso negado. Usuário não vinculado à criança.',
      }),
      ApiResponse({
        status: 404,
        description: 'Criança não encontrada.',
      }),
    );
  }

  static getSessionById() {
    return applyDecorators(
      ApiOperation({
        summary: 'Obter detalhes de uma sessão',
        description:
          'Retorna os detalhes de uma sessão específica pelo seu ID. O usuário deve ser o criador da sessão ou estar vinculado à criança da sessão.',
      }),
      ApiParam({
        name: 'id',
        description: 'ID da sessão',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Detalhes da sessão retornados com sucesso.',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'cuid1234567890' },
            child_id: { type: 'string', example: 'cuid0987654321' },
            user_id: { type: 'string', example: 'cuid1122334455' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
      ApiResponse({
        status: 403,
        description:
          'Acesso negado. Usuário não vinculado à criança da sessão.',
      }),
      ApiResponse({
        status: 404,
        description: 'Sessão não encontrada.',
      }),
    );
  }
}
