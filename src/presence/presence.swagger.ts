import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export class PresenceSwagger {
  static getOnlineUsers() {
    return applyDecorators(
      ApiOperation({
        summary: 'Listar usuários online',
        description:
          'Retorna uma lista contendo os IDs de todos os usuários (médicos e cuidadores) atualmente conectados no WebSocket.',
      }),
      ApiResponse({
        status: 200,
        description: 'Lista de usuários online retornada com sucesso.',
        schema: {
          type: 'object',
          properties: {
            onlineUsers: {
              type: 'array',
              items: { type: 'string', example: 'cuid1234567890' },
            },
          },
        },
      }),
      ApiResponse({
        status: 401,
        description: 'Usuário não autenticado.',
      }),
    );
  }
}
