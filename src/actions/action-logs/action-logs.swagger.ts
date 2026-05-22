import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PaginatedActionLogsResponseDto } from './dto/list-action-logs-response.dto';

export class ActionLogsSwagger {
  static getActionLogsBySession() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar logs de ações de uma sessão',
        description:
          'Retorna a lista paginada de logs de ações (cliques em cards) gerados dentro de uma sessão específica. O usuário deve estar vinculado à criança associada a essa sessão.',
      }),
      ApiParam({
        name: 'sessionId',
        description: 'ID da sessão',
        type: 'string',
        example: 'cuid0987654321',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de logs retornada com sucesso.',
        type: PaginatedActionLogsResponseDto,
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

  static getActionLogsByChild() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar logs de ações de uma criança',
        description:
          'Retorna a lista paginada de logs de ações (cliques em cards) de uma criança específica. Pode ser filtrado por sessionId através da query string. O usuário deve estar vinculado à criança.',
      }),
      ApiParam({
        name: 'childId',
        description: 'ID da criança',
        type: 'string',
        example: 'cuid1234567890',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista paginada de logs retornada com sucesso.',
        type: PaginatedActionLogsResponseDto,
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
}
